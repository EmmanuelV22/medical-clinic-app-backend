/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router";
import NotifcationsDelete from "./NotifcationsDelete";
import NotificationsButtonsRead from "../NotificationsButtonsRead";
import Navbar from "../Navbar";
import AccessDenied from "../../views/AccessDenied";

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
          "Error recuperando info del paciente",
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
          "Error recuperando info del doctor",
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

    console.log(appointmentMessages)

  return (
    <>
      <Navbar />
      {store?.patient?.id ? (
        <div className="text-center row mb-5 d-flex justify-content-center ">
          <h1>Lista de notificaciones:</h1>
          {treatmentMessages.map((notification) => (
            <li className="list-unstyled d-flex column justify-content-center m-2" key={notification.id}>
              {notification.treatment_message}
              <NotifcationsDelete notification={notification} />
              <NotificationsButtonsRead notification={notification} />
            </li>
          ))}

          {appointmentMessages.map(
            (notification) =>
              notification.appointment_message_patient !== null && (
                <li className="list-unstyled d-flex column justify-content-center m-2" key={notification.id}>
                  {notification.appointment_message_patient}
                  <NotifcationsDelete notification={notification} />
                  <NotificationsButtonsRead notification={notification} />
                </li>
              )
          )}
        </div>
      ) : store.employee.id ? (
        <div className="text-center row mb-5 d-flex justify-content-center ">
          <h1>Lista de notificaciones:</h1>

          {appointmentMessages.map(
            (notification) =>
              notification.appointment_message_employee != null  && (
                <li className="list-unstyled d-flex column justify-content-center m-2" key={notification.id} >
                  {notification.appointment_message_employee}
                  <NotifcationsDelete notification={notification} />
                  <NotificationsButtonsRead notification={notification} />
                </li>
              )
          )}
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default MyNotifications;
