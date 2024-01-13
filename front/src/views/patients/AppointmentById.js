/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../../store/appContext";
import DoctorInfo from "../../components/DoctorInfo ";

const AppointmentById = () => {
  const { store, actions } = useContext(Context);
  const { appointment_id } = useParams();
  const [appoint, setAppiont] = useState({})

  const getAppointmentByNotif = async () => {
    const response =  await actions.loadPatientAppointments(appointment_id);
    const data = response.data
   const newAppo = data.filter((appointment) => {
    const x =  appointment.agenda.id == appointment_id;
  return x})
    setAppiont(newAppo)
    console.log(data)
  };

  const getDoctorData = async (id) => {
    const doctorData = await actions.getEmployeeById(id);
    return doctorData;
  };

  const formattedDay = String(appoint
.date).padStart(2, "0");

  useEffect(() => {
    getAppointmentByNotif();
    getDoctorData(appoint
.medical_id);
  }, [appoint
.medical_id]);
  return (
    <div>
      <h1>Detalles de turno confirmado:</h1>
      <h3>Fecha Reservada:</h3>
      <p>
        {formattedDay}/{appoint
.month}/{appoint
.year}
      </p>
      <h3>Estado de la consulta:</h3>
      <p>{appoint
.state}</p>
      <h3>Nombre del especialista:</h3>
      <p>
        <DoctorInfo
          medicalId={appoint
.medical_id}
          getDoctorData={getDoctorData}
        />
      </p>
      <h3>Especialidad:</h3>
      <p>{store.docData?.docData?.specialist}</p>
    </div>
  );
};

export default AppointmentById;
