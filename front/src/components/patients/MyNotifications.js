/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router";
import NotifcationsDelete from "./NotifcationsDelete";

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

  return (
    <div>
      {store.notificationById &&
        store.notificationById.map((notification) => (
          <li key={notification.id} className="d-flex">
            {notification.treatment_message}
            <NotifcationsDelete notification={notification} />
          </li>
        ))}
    </div>
  );
};

export default MyNotifications;
