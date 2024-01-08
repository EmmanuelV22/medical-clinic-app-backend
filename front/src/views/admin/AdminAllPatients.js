/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import PatientDetails from "../../components/admin/PatientDetails";
import SortingTable from "../../components/SortingTable";
import SearchBar from "../../components/SearchBar";
import ConfirmDeletePatient from "../../components/admin/ConfirmDeletePatient";

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
    { field: "createdAt", label: "Creado", sortable: true },
    { field: "updatedAt", label: "Actualizado", sortable: true },
    { field: "actions", label: "Acciones" },
  ];

  const handleDelete = async (id) => {
    console.log("Deleting patient with ID:", id);
    try {
      await actions.deletePatient(id);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar paciente", error);
    }
  };

  const renderRow = (patient) => (
    <React.Fragment key={patient.id}>
      <tr className="infos-contain">
        <td>{patient.firstname}</td>
        <td>{patient.lastname}</td>
        <td>{patient.dni}</td>
        <td>{patient.address}</td>
        <td>{actions.dateFormater(patient.birthday)}</td>
        <td>{patient.email}</td>
        <td>{actions.dateFormater(patient.createdAt)}</td>
        <td>
          {patient.updatedAt !== null
            ? actions.dateFormater(patient.updatedAt)
            : null}
        </td>
        {store.employee && store.employee.specialist === "admin" ? (
          <td className="text-center">
            <button
              style={{
                background: "blue",
                color: "white",
                border: " 2px solid white",
                padding: "2px 3px",
                borderRadius: "6px",
              }}
              data-bs-toggle="modal"
              data-bs-target={"#patientData-" + patient.id}
            >
              &#9998;
            </button>
            <button
              style={{
                background: "red",
                color: "white",
                border: " 2px solid white",
                padding: "2px 3px",
              }}
              data-bs-toggle="modal"
              data-bs-target={"#deletePatient-" + patient.id}
            >
              &#10008;
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
    // Set searchError to true if no employees found
    setSearchError(filtered.length === 0);
    setFilteredPatients(filtered);
  };

  return (
    <>
      {store?.employee && store.employee?.specialist ? (
        <div className="admin-patient-content">
          <h1
            className="text-center font-bold my-4"
            style={{ fontSize: "2.5rem" }}
          >
            Lista de pacientes:
          </h1>
          <SearchBar onSearch={handleSearch} />
          {searchError && (
            <p className="text-center text-danger">
              No se encontraron pacientes.
            </p>
          )}
          <div
            className="table-responsive"
            style={{ width: "100%", margin: "0 auto" }}
          >
            <SortingTable
              headers={headers}
              data={
                filteredPatients.length > 0 ? filteredPatients : store.patients
              }
              renderRow={renderRow}
            />
          </div>
        </div>
      ) : (
        <h2>componente denegado</h2>
      )}
    </>
  );
};

export default AdminAllPatients;
