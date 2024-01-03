/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Context } from "../../store/appContext";

const AppointmentById = () => {
  const { store, actions } = useContext(Context);
  const { appointment_id } = useParams();

  const getAppointmentByNotif = async () => {
    await actions.loadPatientAppointments(appointment_id);
  };
  const formattedDay = String(store.appointment.date).padStart(2, "0");

  useEffect(() => {
    getAppointmentByNotif();
  }, []);
  return (
    <div>
      <p>{store.appointment.id}</p>
      <p>
        {formattedDay}/{store.appointment.month}/{store.appointment.year}
      </p>
    </div>
  );
};

export default AppointmentById;
