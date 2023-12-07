/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import SortingTable from "../../components/SortingTable";
import SearchBar from "../../components/SearchBar";

const MyPatients = () => {
  const { store, actions } = useContext(Context);
  const doctorID = store.employee ? store.employee.id : null;
  const [searchError, setSearchError] = useState(false);
  const [filteredPatientsList, setFilteredPatientsList] = useState([]);

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

  // Filtrer les patients en fonction des rendez-vous médicaux
  const filteredPatients = store.patients.filter((patient) =>
    store.myAppointments.some(
      (appointment) => appointment.patient_id === patient.id
    )
  );

  const headers = [
    { field: "id", label: "ID" },
    { field: "firstname", label: "Nombre" },
    { field: "lastname", label: "Apellido" },
    { field: "dni", label: "DNI" },
    { field: "address", label: "Dirección" },
    { field: "birthday", label: "Fecha de nacimiento" },
    { field: "email", label: "Email" },
    { field: "createdAt", label: "Creado" },
    { field: "updatedAt", label: "Actualizado" },
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
            style={{ border: "none", background: "transparent" }}
          >
            {/* Votre icône SVG */}
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
