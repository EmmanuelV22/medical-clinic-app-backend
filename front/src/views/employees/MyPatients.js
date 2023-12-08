/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import SortingTable from "../../components/SortingTable";
import SearchBar from "../../components/SearchBar";
import { useNavigate } from "react-router-dom";

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
    { field: "id", label: "ID", sortable: true },
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

  const renderRow = (patient) => (
    <React.Fragment key={patient.id}>
      <tr className="infos-contain">
        <td>{patient.id}</td>
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
      <div className="admin-patient-content">
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
          className="table-responsive"
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
    </>
  );
};

export default MyPatients;
