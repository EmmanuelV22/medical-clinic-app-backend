/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import SortingTable from "../../components/SortingTable";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";
import AccessDenied from "../../views/AccessDenied";
import Navbar from "../../components/Navbar";

const MyPatients = () => {
  const { store, actions } = useContext(Context);
  const doctorID = store.employee ? store.employee.id : null;
  const [searchError, setSearchError] = useState(false);
  const [filteredPatientsList, setFilteredPatientsList] = useState([]);
  const navigate = useNavigate();

  const getMyPatients = async () => {
    if (doctorID) {
      await actions.getAllPatients();
      await actions.loadMedicalAppointmentsForDr(doctorID);
    }
  };

  useEffect(() => {
    if (doctorID !== null) {
      getMyPatients();
    }
  }, [doctorID]);

  const filteredPatients = store.patients.filter((patient) =>
    store.myAppointments.some(
      (appointment) => appointment.patient_id === patient.id
    )
  );

  const handlePatientDetails = async (patientId) => {
    try {
      const patientDetails = await actions.getPatientById(patientId);
      // Naviguer vers la route des détails du patient avec l'ID
      navigate(`/patients/${patientId}`);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du patient",
        error
      );
    }
  };

  const headers = [
    {
      field: "firstname",
      label: "Nombre",
      sortable: true,
      className: "table-name-sorting",
    },
    {
      field: "lastname",
      label: "Apellido",
      sortable: true,
      className: "table-lastname-sorting",
    },
    { field: "dni", label: "DNI", sortable: true, className: "table-dni" },
    {
      field: "address",
      label: "Dirección",
      sortable: true,
      className: "table-address-sorting",
    },
    {
      field: "birthday",
      label: "Fecha de nacimiento",
      sortable: true,
      className: "table-birthday-sorting",
    },
    {
      field: "email",
      label: "Email",
      sortable: true,
      className: "table-email-sorting",
    },
    {
      field: "phone",
      label: "Teléfono",
      sortable: true,
    },
    {
      field: "created_at",
      label: "Creado",
      sortable: true,
      className: "table-updated-sorting",
    },
    {
      field: "updated_at",
      label: "Actualizado",
      sortable: true,
      className: "table-updated-sorting",
    },
    { field: "actions", label: "Acciones" },
  ];

  const renderRow = (patient) => (
    <React.Fragment key={patient.id}>
      <tr className="infos-contain">
        <td className="table-name-sorting">{patient.firstname}</td>
        <td className="table-lastname-sorting">{patient.lastname}</td>
        <td className="table-dni">{patient.dni}</td>
        <td className="table-address-sorting">{patient.address}</td>
        <td className="table-birthday-sorting">
          {actions.dateFormater(patient.birthday)}
        </td>
        <td className="table-email-sorting">{patient.email}</td>
        <td className="table-updated-sorting">
          {actions.dateFormater(patient.created_at)}
        </td>
        <td className="table-phone-sorting">{patient.phone}</td>
        <td className="table-updated-sorting">
          {patient.updated_at !== null
            ? actions.dateFormater(patient.updated_at)
            : null}
        </td>
        <td>
          <button
            title="historial clínica"
            style={{
              border: "none",
              background: "transparent",
            }}
            onClick={() => handlePatientDetails(patient.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-id-badge-2"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#36a2a3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 12h3v4h-3z" />
              <path d="M10 6h-6a1 1 0 0 0 -1 1v12a1 1 0 0 0 1 1h16a1 1 0 0 0 1 -1v-12a1 1 0 0 0 -1 -1h-6" />
              <path d="M10 3m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" />
              <path d="M14 16h2" />
              <path d="M14 12h4" />
            </svg>
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
  const handleSearch = (query) => {
    const filtered = store.patients
      .filter((patient) =>
        store.myAppointments.some(
          (appointment) => appointment.patient_id === patient.id
        )
      )
      .filter(
        (patient) =>
          patient.firstname.toLowerCase().includes(query.toLowerCase()) ||
          patient.lastname.toLowerCase().includes(query.toLowerCase()) ||
          patient.dni.toString().includes(query)
      );

    setSearchError(filtered.length === 0);
    setFilteredPatientsList(filtered);
  };

  return (
    <>
      <Navbar />
      {store.employee &&
      store.employee?.specialist &&
      store?.employee?.specialist !== "admin" ? (
        <div className="admin-patient-content ">
          <h1
            className="text-center font-bold my-4"
            style={{ fontSize: "2.5rem" }}
          >
            Mis pacientes:
          </h1>
          <SearchBar onSearch={handleSearch} />
          {searchError && (
            <p className="text-center text-danger">
              No se encontraron pacientes.
            </p>
          )}
          <div
            className="table-responsive mb-5"
            style={{ width: "100%", margin: "0 auto" }}
          >
            <SortingTable
              headers={headers}
              data={
                filteredPatientsList.length > 0
                  ? filteredPatientsList
                  : filteredPatients
              }
              renderRow={renderRow}
            />
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default MyPatients;
