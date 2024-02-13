/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../store/appContext";
import SearchBar from "../components/SearchBar";
import AccessDenied from "../../src/views/AccessDenied";
import Navbar from "../components/Navbar";

const AllAppointments = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();
  const [searchError, setSearchError] = useState(false);
  const [allFilter, setAllFilter] = useState([]);

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
    const filterOn = combinedData.filter(
      (person) =>
        person.employee.firstname.toLowerCase().includes(query.toLowerCase()) ||
        person.employee.lastname.toLowerCase().includes(query.toLowerCase()) ||
        person.employee.specialist
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        person.patient.firstname.toLowerCase().includes(query.toLowerCase()) ||
        person.patient.lastname.toLowerCase().includes(query.toLowerCase()) ||
        person.patient.dni.toString().includes(query)
    );
    setSearchError(filterOn.length === 0);
    setAllFilter(filterOn);
  };

  return (
    <>
      <Navbar />
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

          <div className="mb-5" style={{ margin: "0 auto" }}>
            {combinedData?.length > 0 ? (
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th className="table-name">Nombre paciente</th>
                    <th className="table-lastname">Apellido paciente</th>
                    <th className="table-dni">DNI paciente</th>
                    <th className="table-phone">Teléfono paciente</th>
                    <th className="separate-table-dr">Nombre Dr</th>
                    <th className="table-name-dr">Apellido Dr</th>
                    <th className="separate-table-appointment">Especialidad</th>
                    <th className="table-turno">Fecha del turno</th>
                    <th className="table-hour">Hora del turno</th>
                  </tr>
                </thead>
                <tbody>
                  {allFilter.length > 0
                    ? allFilter.map((data) => (
                        <tr key={data.id}>
                          <td className="table-name">
                            {data.patient?.firstname}
                          </td>
                          <td className="table-lastname">
                            {data.patient?.lastname}
                          </td>
                          <td className="table-dni">{data.patient?.dni}</td>
                          <td className="table-phone">{data.patient?.phone}</td>
                          <td className="separate-table-dr">
                            {data.employee?.firstname}
                          </td>
                          <td className="table-name-dr">
                            {data.employee?.lastname}
                          </td>
                          <td className="separate-table-appointment">
                            {data.employee?.specialist}
                          </td>
                          <td className="table-turno">
                            {data.date}/{data.month}/{data.year}
                          </td>
                          <td className="table-hour">{data.time}</td>
                        </tr>
                      ))
                    : combinedData.map((data) => (
                        <tr key={data.id}>
                          <td className="table-name">
                            {data.patient?.firstname}
                          </td>
                          <td className="table-lastname">
                            {data.patient?.lastname}
                          </td>
                          <td className="table-dni">{data.patient?.dni}</td>
                          <td className="table-phone">{data.patient?.phone}</td>
                          <td className="separate-table-dr">
                            {data.employee?.firstname}
                          </td>
                          <td className="table-name-dr">
                            {data.employee?.lastname}
                          </td>
                          <td className="separate-table-appointment">
                            {data.employee?.specialist}
                          </td>
                          <td className="table-turno">
                            {data.date}/{data.month}/{data.year}
                          </td>
                          <td className="table-hour">{data.time}</td>
                        </tr>
                      ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-danger">
                No hay citas programadas
              </p>
            )}
          </div>
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};
export default AllAppointments;
