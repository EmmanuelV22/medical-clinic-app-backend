/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Context } from "../../store/appContext";
import DoctorInfo from "../../components/DoctorInfo ";

const AppointmentById = () => {
  const { store, actions } = useContext(Context);
  const { appointment_id } = useParams();

  const getAppointmentByNotif = async () => {
    await actions.loadPatientAppointments(appointment_id);
  };
  const getDoctorData = async (id) => {
    const doctorData = await actions.getEmployeeById(id);
    return doctorData
    
  };



  const formattedDay = String(store.appointment.date).padStart(2, "0");

  useEffect(() => {
    getAppointmentByNotif();
    getDoctorData(store.appointment.medical_id);

  }, [store.appointment.medical_id]);
  return (
    <div>
      <h1>Detalles de turno confirmado:</h1>
      <h3>Fecha Reservada:</h3>
      <p>
        {formattedDay}/{store.appointment.month}/{store.appointment.year}
      </p>
      <h3>Estado de la consulta:</h3>
      <p>
        {store.appointment.state}
      </p>
      <h3>Nombre del especialista:</h3>
      <p>
      <DoctorInfo
        medicalId={store.appointment.medical_id}
        getDoctorData={getDoctorData}
      />
      </p>
      <h3>Especialidad:</h3>
      <p>
        {store.docData?.docData?.specialist}
      </p>
      
    </div>
  );
};

export default AppointmentById;
