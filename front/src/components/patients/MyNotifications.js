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
    if (store.patient.id) {
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
    } else if (store.employee.id) {
      try {
        if (patient_id) {
          await actions.getNotificationsByIdForDr(patient_id);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du dr",
          error
        );
      }
    }
  };

  useEffect(() => {
    if (patient_id) {
      getNotification();
    }
  }, [patient_id, store.employee, store.patient]);

  const treatmentMessages = store.notificationById
    ? store.notificationById.filter((notif) => notif.treatment_message)
    : [];

  const appointmentMessages = store.notificationById
    ? store.notificationById.filter(
        (notif) =>
          notif.appointment_message_patient !== null ||
          notif.appointment_message_employee !== null
      )
    : [];

  return (
    <>
      {store.patient.id ? (
        <div>
          {treatmentMessages.map((notification) => (
            <li key={notification.id} className="d-flex">
              {notification.treatment_message}
              <NotifcationsDelete notification={notification} />
              <NotificationsButtonsRead notification={notification} />
            </li>
          ))}

          {appointmentMessages.map(
            (notification) =>
              notification.appointment_message_patient !== null && (
                <li key={notification.id} className="d-flex">
                  {notification.appointment_message_patient}
                  <NotifcationsDelete notification={notification} />
                  <NotificationsButtonsRead notification={notification} />
                </li>
              )
          )}
        </div>
      ) : store.employee.id ? (
        <div>
          {appointmentMessages.map(
            (notification) =>
              notification.appointment_message_employee !== null && (
                <li key={notification.id} className="d-flex">
                  {notification.appointment_message_employee}
                  <NotifcationsDelete notification={notification} />
                  <NotificationsButtonsRead notification={notification} />
                </li>
              )
          )}
        </div>
      ) : (
        <h1>denegado</h1>
      )}
    </>
  );
};

export default MyNotifications;
