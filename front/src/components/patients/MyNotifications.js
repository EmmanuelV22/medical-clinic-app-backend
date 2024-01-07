/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router";
import NotifcationsDelete from "./NotifcationsDelete";
import NotificationsButtonsRead from "../NotificationsButtonsRead";

const MyNotifications = () => {
  const { store, actions } = useContext(Context);
  const { patient_id } = useParams();

  const getNotification = async () => {
    try {
      if (patient_id) {
        await actions.getNotificationsById(patient_id);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du patient",
        error
      );
    }
  };

  useEffect(() => {
    if (patient_id) {
      getNotification();
    }
  }, [patient_id]);

  const treatmentMessages = store.notificationById
    ? store.notificationById.filter((notif) => notif.treatment_message)
    : [];

  const appointmentMessages = store.notificationById
    ? store.notificationById.filter((notif) => notif.appointment_message)
    : [];

  return (
    <>
      {store.patient && store.patient.id ? (
        <div>
          {treatmentMessages.map((notification) => (
            <li key={notification.id} className="d-flex">
              {notification.treatment_message}
              <NotifcationsDelete notification={notification} />
              <NotificationsButtonsRead notification={notification} />
            </li>
          ))}

          {appointmentMessages.map((notification) => (
            <li key={notification.id} className="d-flex">
              {notification.appointment_message}
              <NotifcationsDelete notification={notification} />
              <NotificationsButtonsRead notification={notification} />
            </li>
          ))}
        </div>
      ) : (
        <h1>DENEGADO</h1>
      )}
    </>
  );
};

export default MyNotifications;
