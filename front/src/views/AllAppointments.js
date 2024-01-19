/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";
import SearchBar from "../components/SearchBar";

const AllAppointments = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();
  const [searchError, setSearchError] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    if (store.employee || store.patient) {
      getAllData();
    }
  }, []);

  const getAllData = async () => {
    await actions.getAllAppointments();
    await actions.getAllEmployees();
    await actions.getAllPatients();
  };

  const combinedData = store.allAppointments.map((appointment) => {
    const employee = store.employees.find(
      (emp) => emp.id === appointment.medical_id
    );
    const patient = store.patients.find(
      (patient) => patient.id === appointment.patient_id
    );

    return {
      ...appointment,
      employee,
      patient,
    };
  });

  const handleSearch = (query) => {
    const filteredEmployees = store.employees.filter(
      (employee) =>
        employee.firstname.toLowerCase().includes(query.toLowerCase()) ||
        employee.lastname.toLowerCase().includes(query.toLowerCase()) ||
        employee.specialist.toLowerCase().includes(query.toLowerCase())
    );

    const filteredPatients = store.patients.filter(
      (patient) =>
        patient.firstname.toLowerCase().includes(query.toLowerCase()) ||
        patient.lastname.toLowerCase().includes(query.toLowerCase()) ||
        patient.dni.toString().includes(query)
    );

    // Set searchError to true if no patients or employees found
    setSearchError(
      filteredEmployees.length === 0 && filteredPatients.length === 0
    );

    setFilteredEmployees(filteredEmployees);
    setFilteredPatients(filteredPatients);
  };

  return (
    <>
      {store?.employee && store.employee?.specialist === "admin" ? (
        <div className="admin-employee-content">
          <h1
            className="text-center font-bold my-4"
            style={{ fontSize: "2.5rem" }}
          >
            Lista de turnos:
          </h1>
          <SearchBar onSearch={handleSearch} />
          {searchError && (
            <p className="text-center text-danger">
              ¡No se encontraron turnos!
            </p>
          )}
          <div
            className="table-responsive"
            style={{ width: "100%", margin: "0 auto" }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th>Nombre paciente</th>
                  <th>Apellido paciente</th>
                  <th>DNI paciente</th>
                  <th>Teléfono paciente</th>
                  <th>Nombre Dr</th>
                  <th>Apellido Dr</th>
                  <th>Especialidad Dr</th>
                  <th>Fecha del turno</th>
                  <th>Hora del turno</th>
                </tr>
              </thead>
              <tbody>
                {combinedData?.length > 0 &&
                  combinedData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.patient.firstname}</td>
                      <td>{data.patient.lastname}</td>
                      <td>{data.patient.dni}</td>
                      <td>{data.patient.phone}</td>
                      <td>{data.employee.firstname}</td>
                      <td>{data.employee.lastname}</td>
                      <td>{data.employee.specialist}</td>
                      <td>
                        {data.date}/{data.month}/{data.year}
                      </td>
                      <td>{data.time}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h1>componente denegado</h1>
      )}
    </>
  );
};
export default AllAppointments;
