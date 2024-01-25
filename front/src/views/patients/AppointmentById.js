/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../../store/appContext";
import Navbar from "../../components/Navbar";

const AppointmentById = () => {
  const { store, actions } = useContext(Context);
  const { appointment_id } = useParams();
  const [doctorData, setDoctorData] = useState(null);

  const getAppointmentByNotif = async () => {
    try {
      const data = await actions.loadPatientAppointmentById(appointment_id);
    } catch (error) {
      return error;
    }
  };

  const getDoctorData = async (id) => {
    try {
      const doctorData = await actions.getEmployeeById(id);
      setDoctorData(doctorData);
    } catch (error) {
      return error;
    }
  };

  const formattedDay = String(store.appointment?.date).padStart(2, "0");

  useEffect(() => {
    const fetchData = async () => {
      if (appointment_id) {
        await getAppointmentByNotif();
        await getDoctorData(store.appointment?.medical_id);
      }
    };

    fetchData();
  }, [store.appointment?.medical_id]);

  return (
    <div className="">
      <Navbar />
      <h1>Detalles de turno confirmado:</h1>
      <h3>Fecha Reservada:</h3>
      <p>
        {formattedDay}/{store.appointment?.month}/{store.appointment?.year}
      </p>
      <h3>Estado de la consulta:</h3>
      <p>{store.appointment?.state}</p>
      <h3>Nombre del especialista:</h3>
      <p>
        Dr. {store.docData?.docData?.firstname} {""}{" "}
        {store.docData?.docData?.lastname}
        {/* <DoctorInfo
          medicalId={store.appointment?.medical_id}
          getDoctorData={getDoctorData}
        /> */}
      </p>
      <h3>Especialidad:</h3>
      <p>{store.docData?.docData?.specialist}</p>
    </div>
  );
};

export default AppointmentById;
