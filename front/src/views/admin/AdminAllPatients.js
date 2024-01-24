/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import PatientDetails from "../../components/admin/PatientDetails";
import SortingTable from "../../components/SortingTable";
import SearchBar from "../../components/SearchBar";
import ConfirmDeletePatient from "../../components/admin/ConfirmDeletePatient";
import Navbar from "../../components/Navbar";
import AccessDenied from "../../views/AccessDenied";


const AdminAllPatients = () => {
  const { store, actions } = useContext(Context);
  const [searchError, setSearchError] = useState(false);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getAllPatients();
  }, []);

  const headers = [
    { field: "firstname", label: "Nombre", sortable: true },
    { field: "lastname", label: "Apellido", sortable: true },
    { field: "dni", label: "DNI", sortable: true },
    { field: "address", label: "Dirección", sortable: true },
    { field: "birthday", label: "Fecha de nacimiento", sortable: true },
    { field: "email", label: "Email", sortable: true },
    { field: "phone", label: "Teléfono", sortable: true },
    { field: "updatedAt", label: "Actualizado", sortable: true },
    { field: "actions", label: "Acciones" },
  ];

  const handleDelete = async (id) => {
    try {
      await actions.deletePatient(id);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar paciente", error);
    }
  };

  const renderRow = (patient, index) => (
    <React.Fragment key={patient.id}>
      <tr
        className={`infos-contain ${
          index % 2 === 0 ? "table-row-even" : "table-row-odd"
        }`}
      >
        <td>{patient.firstname}</td>
        <td>{patient.lastname}</td>
        <td>{patient.dni}</td>
        <td>{patient.address}</td>
        <td>{actions.dateFormater(patient.birthday)}</td>
        <td>{patient.email}</td>
        <td>{patient.phone}</td>
        <td>
          {patient.updatedAt !== null
            ? actions.dateFormater(patient.updatedAt)
            : null}
        </td>
        {store.employee && store.employee.specialist === "admin" ? (
          <td className="text-center d-flex justitfy-content-center align-items-center">
            <button
              title="ver y editar datos"
              className="btn-edit"
              style={{
                color: "white",
                border: " 2px solid white",
                padding: "0px 4px",
                borderRadius: "6px",
              }}
              data-bs-toggle="modal"
              data-bs-target={"#patientData-" + patient.id}
            >
              <span style={{ fontSize: "18px", verticalAlign: "middle" }}>
                {" "}
                <span> &#9998;</span>
              </span>
            </button>
            <button
              title="eliminar cuenta"
              style={{
                color: "white",
                border: " 2px solid white",
                borderRadius: "6px",
                padding: "2px 6px",
                marginRight: "2px",
              }}
              data-bs-toggle="modal"
              data-bs-target={"#deletePatient-" + patient.id}
              className="button btn-eliminar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 14"
                class="svgIcon bin-top"
              >
                <g clip-path="url(#clip0_35_24)">
                  <path
                    fill="black"
                    d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_24">
                    <rect fill="white" height="14" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 69 57"
                class="svgIcon bin-bottom"
              >
                <g clip-path="url(#clip0_35_22)">
                  <path
                    fill="black"
                    d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                  ></path>
                </g>
                <defs>
                  <clipPath id="clip0_35_22">
                    <rect fill="white" height="57" width="69"></rect>
                  </clipPath>
                </defs>
              </svg>
            </button>
            <button
              title="agendar turno"
              className="bg-warning btn-turno"
              style={{
                background: "white",
                color: "white",
                border: " 2px solid white",
                padding: "0px 3px",
                borderRadius: "6px",
                marginRight: "2px",
              }}
            >
              <svg
                cursor="pointer"
                onClick={() => navigate(`/planificar-turno/${patient.id}`)}
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-calendar-plus"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ff2825"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
                <path d="M16 3v4" />
                <path d="M8 3v4" />
                <path d="M4 11h16" />
                <path d="M16 19h6" />
                <path d="M19 16v6" />
              </svg>
            </button>
            <button
              title="ver turnos del paciente"
              className="btn-turno"
              style={{
                background: "grey",
                color: "white",
                border: " 2px solid white",
                padding: "0px 3px",
                borderRadius: "6px",
              }}
            >
              <svg
                cursor="pointer"
                onClick={() => navigate(`/turnos-paciente/${patient.id}`)}
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-list-search"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ff2825"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M15 15m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                <path d="M18.5 18.5l2.5 2.5" />
                <path d="M4 6h16" />
                <path d="M4 12h4" />
                <path d="M4 18h4" />
              </svg>
            </button>
          </td>
        ) : (
          <td>
            <button
              title="historia clínica"
              onClick={() => navigate(`/patient-history/${patient.id}`)}
              style={{ border: "none", background: "transparent" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-report-medical"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#36a2a3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ border: "none" }}
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                <path d="M10 14l4 0" />
                <path d="M12 12l0 4" />
              </svg>
            </button>
          </td>
        )}
      </tr>
      <PatientDetails patientData={patient} />
      <ConfirmDeletePatient patientData={patient} handleDelete={handleDelete} />
    </React.Fragment>
  );

  const handleSearch = (query) => {
    const filtered = store.patients.filter(
      (patient) =>
        patient.firstname.toLowerCase().includes(query.toLowerCase()) ||
        patient.lastname.toLowerCase().includes(query.toLowerCase()) ||
        patient.dni.toString().includes(query)
    );
    setSearchError(filtered.length === 0);
    setFilteredPatients(filtered);
  };

  return (
    <>
      {store?.employee && store.employee?.specialist ? (

        <>
          <Navbar />
          <div className="admin-patient-content">
            <h1
              className="text-center font-bold my-4"
              style={{ fontSize: "2.5rem" }}
            >
              Lista De Pacientes
            </h1>
            <SearchBar onSearch={handleSearch} />
            {searchError && (
              <p className="text-center text-danger search-nf">
                ¡No se encontraron pacientes!
              </p>
            )}
            <div
              className="table-responsive vh-100"
              style={{ width: "100%", margin: "0 auto" }}
            >
              <SortingTable
                headers={headers}
                data={
                  filteredPatients.length > 0
                    ? filteredPatients
                    : store.patients
                }
                renderRow={renderRow}
              />
            </div>

          </div>
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default AdminAllPatients;
