/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import AppointmentScheduler from "./AppointmentScheduler";

const SpecialistPicker = () => {
  const { store, actions } = useContext(Context);
  const [selectedSpecialist, setSelectedSpecialist] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [choiceSpecialist, setChoiceSpecialist] = useState(false);
  const [choiceDoc, setChoiceDoc] = useState(false);
  const [specialistPicker, setSpecialistPicker] = useState([
    "general",
    "neumonólogo",
    "cirujano",
    "oftalmólogo",
    "ORL",
    "psicólogo",
    "dentista",
    "dermatólogo",
  ]);

  useEffect(() => {
    actions.getAllEmployees();
  }, []);

  const handleSpecialistChange = (event) => {
    setSelectedSpecialist(event.target.value);
    setChoiceSpecialist(true);
  };

  const handleDoctorChange = (event) => {
    setSelectedDoctor(event.target.value);
    setChoiceDoc(true);
  };

  return (
    <div className="container-fluid vh-100">

      {store.patient || store.employee.specialist === "admin" ? (
        <>
    <div className='container-fluid  bg-white '>
            <select
              className="form-select"
              aria-label="Select a specialty"
              onChange={handleSpecialistChange}
              value={selectedSpecialist}
            >
              <option value="" disabled>
                Selecciona una especialidad
              </option>
              {specialistPicker.map((speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              ))}
            </select>
          </div>
          {choiceSpecialist && (
            <div className="container-fluid">
              <select
                className="form-select"
                aria-label="Select a doctor"
                onChange={handleDoctorChange}
                value={selectedDoctor}
              >
                <option value="" disabled>
                  Selecciona un médico
                </option>
                {store.employees &&
                  store.employees.length >= 1 &&
                  store.employees
                    .filter(
                      (employee) => employee.specialist === selectedSpecialist
                    )
                    .map((employee) => (
                      <option key={employee.id} value={employee.lastname}>
                        Dr.{employee.lastname}
                      </option>
                    ))}
              </select>
            </div>
          )}
          {choiceSpecialist && choiceDoc && (
            <div className="d-flex justify-content-center mt-1">
              <AppointmentScheduler
                doctorId={
                  store.employees.find(
                    (employee) => employee.lastname === selectedDoctor
                  ).id
                }
                daysOff={
                  store.employees.find(
                    (employee) => employee.lastname === selectedDoctor
                  ).days_off
                }
                startTime={
                  store.employees.find(
                    (employee) => employee.lastname === selectedDoctor
                  ).start_time
                }
                endTime={
                  store.employees.find(
                    (employee) => employee.lastname === selectedDoctor
                  ).end_time
                }
              />
            </div>
          )}
        </>
      ) : (
        <h1>denegado</h1>
      )}
    </div>
  );
};

export default SpecialistPicker;
