/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

const Notifications = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const unreadNotifications = store.notifications.filter((notification) => {
    if (notification.state === "no leído") {
      if (
        (notification.patient_id === store.patient.id &&
          notification.appointment_message_patient) ||
        (notification.medical_id === store.employee.id &&
          notification.appointment_message_employee)
      ) {
        return true;
      }
    }
    return false;
  });

  return (
    <>
      {unreadNotifications.length > 0 && unreadNotifications ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-bell-exclamation"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#e03f3e"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 17h-11a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6a2 2 0 1 1 4 0a7 7 0 0 1 4 6v1.5" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
          <path d="M19 16v3" />
          <path d="M19 22v.01" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-bell"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#36a2a3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </svg>
      )}
    </>
  );
};

export default Notifications;
