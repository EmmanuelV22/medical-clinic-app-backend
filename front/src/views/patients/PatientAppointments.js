/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import SortingTable from "../../components/SortingTable";
import SearchBar from "../../components/SearchBar";
import ConfirmDeleteAppointment from "../../components/patients/ConfirmDeleteAppointment";
import { useNavigate, useParams } from "react-router";
import AccessDenied from "../../views/AccessDenied";
import Navbar from "../../components/Navbar";

const PatientAppointments = () => {
  const { store, actions } = useContext(Context);
  const { patient_id } = useParams();
  const patientID = store.patient ? store.patient.id : null;
  const [searchError, setSearchError] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [sortedAppointments, setSortedAppointments] = useState([]);
  let navgiate = useNavigate();

  useEffect(() => {
    if (patientID || patient_id) {
      getMyAppointments();
    }
  }, [patientID]);

  const filteredDr = store.employees.filter((employee) =>
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
    if (patientID || patient_id) {
      patientID
        ? await actions.loadPatientAppointments(patientID)
        : await actions.loadPatientAppointments(patient_id);

      actions.getAllEmployees();

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

  const handleDelete = async (id) => {
    await actions.deleteNotifications(id);
    await actions.deleteAppointment(id);
    window.location.reload();
  };

  const renderRow = (appointment) => {
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
          <td className="text-center" style={{ margin: "auto" }}>
            <button
              style={{
                border: "none",
                background: "transparent",
                color: "red",
                marginLeft: "15px",
              }}
              title="cancelar"
              data-bs-toggle="modal"
              data-bs-target={"#deleteAppointment-" + appointment.id}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-trash "
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
        <ConfirmDeleteAppointment
          handleDelete={handleDelete}
          appointment={appointment}
        />
      </React.Fragment>
    );
  };

  const handleSearch = (query) => {
    const filteredAppointments = store.myAppointments.filter((appointment) => {
      // Trouver le patient correspondant dans store.patients
      const employee = store.employees.find(
        (p) => p.id === appointment.medical_id
      );

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
    <Navbar />
      {store.patient || store.employee.specialist === "admin" ? (
        <div className="admin-appointments-content d-flex justify-content-center row">
          <h1
            className="text-center font-bold my-4"
            style={{ fontSize: "2.5rem" }}
          >
            Lista de Citas Médicas:
          </h1>
          <SearchBar onSearch={handleSearch} />
          <button
            style={{
              border: "none",
              background: "transparent",
              color: "green",
            }}
            title="planificar turno"
            onClick={() => navgiate(`/planificar-turno/${patient_id}`)}
          >
            <div className=" text-center m-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-calendar-plus "
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
              <path d="M12.5 21h-6.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v5" />
              <path d="M16 3v4" />
              <path d="M8 3v4" />
              <path d="M4 11h16" />
              <path d="M16 19h6" />
              <path d="M19 16v6" />
            </svg>
            </div>
          </button>
          {searchError && (
            <p className="text-center text-danger">
              No se encontraron citas médicas.
            </p>
          )}
          {store.appointmentsPatient.length > 0 ?<div
            className="table-responsive mb-5"
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
          </div> : <h5 className="text-center">No existen citas medicas para el paciente seleccionado</h5>
          
          }
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default PatientAppointments;
