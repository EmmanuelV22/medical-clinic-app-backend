/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import SortingTable from "../../components/SortingTable";
import SearchBar from "../../components/SearchBar";

const PatientAppointments = () => {
  const { store, actions } = useContext(Context);
  const patientID = store.patient ? store.patient.id : null;
  const [searchError, setSearchError] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [sortedAppointments, setSortedAppointments] = useState([]);

  useEffect(() => {
    if (patientID) {
      getMyAppointments();
      console.log(filteredDr);
    }
  }, [patientID]);

  const filteredDr =
    // store?.appointmentsPatient &&
    // store.appointmentsPatient?.length > 0 &&
    store.employees.filter((employee) =>
      store.appointmentsPatient.some(
        (appointment) => appointment.medical_id === employee.id
      )
    );

  const headers = [
    { field: "date", label: "Fecha", sortable: false },
    { field: "time", label: "Hora", sortable: false },
    {
      field: "employee.firstname",
      label: "Nombre del doctor",
      sortable: false,
    },
    {
      field: "employee.lastname",
      label: "Apellido del doctor",
      sortable: false,
    },
    { field: "employee.specialist", label: "Especialidad", sortable: false },
    { field: "actions", label: "Acciones", sortable: false },
  ];

  const getMyAppointments = async () => {
    if (patientID) {
      await actions.loadPatientAppointments(patientID);
      console.log(
        "Appointments Patient after load:",
        store.appointmentsPatient
      );
      actions.getAllEmployees();

      // Filtrer les rendez-vous passés
      const currentDate = new Date();
      const filteredAppointments = store.appointmentsPatient.filter(
        (appointment) => {
          const appointmentDate = new Date(
            `${appointment.year}-${appointment.month}-${appointment.date} ${appointment.time}`
          );

          return appointmentDate >= currentDate;
        }
      );

      const sortedAppointments = filteredAppointments.sort((a, b) => {
        const dateA = new Date(`${a.year}-${a.month}-${a.date} ${a.time}`);
        const dateB = new Date(`${b.year}-${b.month}-${b.date} ${b.time}`);

        return dateA - dateB;
      });

      setSortedAppointments(sortedAppointments);
    }
  };

  const renderRow = (appointment) => {
    // Formater le jour avec deux chiffres
    const formattedDay = String(appointment.date).padStart(2, "0");

    return (
      <React.Fragment key={appointment.id}>
        <tr className="infos-contain">
          <td>
            {formattedDay}/{appointment.month}/{appointment.year}
          </td>
          <td>{appointment.time}</td>
          {filteredDr &&
            filteredDr.length > 0 &&
            filteredDr
              .filter((employee) => appointment.medical_id === employee.id)
              .map((employee) => (
                <React.Fragment key={employee.id}>
                  <td>{employee.firstname}</td>
                  <td>{employee.lastname}</td>
                  <td>{employee.specialist}</td>
                </React.Fragment>
              ))}
          <td style={{ margin: "auto" }}>
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "green",
              }}
              title="modificar"
              // onClick={() => handleConfirmation(appointment.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-rotate"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ff2825"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5" />
              </svg>
            </button>
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "red",
                marginLeft: "15px",
              }}
              title="cancelar"
              // onClick={() => handleCancellation(appointment.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-trash"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ff2825"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 7l16 0" />
                <path d="M10 11l0 6" />
                <path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </button>
          </td>
        </tr>
      </React.Fragment>
    );
  };

  const handleSearch = (query) => {
    const filteredAppointments = store.myAppointments.filter((appointment) => {
      // Trouver le patient correspondant dans store.patients
      const employee = store.employees.find(
        (p) => p.id === appointment.medical_id
      );

      // Effectuer la recherche sur les données du patient
      return (
        employee &&
        (employee.firstname.toLowerCase().includes(query.toLowerCase()) ||
          employee.lastname.toLowerCase().includes(query.toLowerCase()))
      );
    });

    setSearchError(filteredAppointments.length === 0);
    setFilteredAppointments(filteredAppointments);
  };

  return (
    <>
      {store?.patient ? (
        <div className="admin-appointments-content">
          <h1
            className="text-center font-bold my-4"
            style={{ fontSize: "2.5rem" }}
          >
            Lista de Citas Médicas:
          </h1>
          <SearchBar onSearch={handleSearch} />
          {searchError && (
            <p className="text-center text-danger">
              No se encontraron citas médicas.
            </p>
          )}
          <div
            className="table-responsive"
            style={{ width: "100%", margin: "0 auto" }}
          >
            <SortingTable
              headers={headers}
              data={
                filteredAppointments.length > 0
                  ? filteredAppointments
                  : sortedAppointments
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

export default PatientAppointments;
