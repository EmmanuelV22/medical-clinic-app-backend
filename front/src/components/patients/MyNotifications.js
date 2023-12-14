/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router";

const MyNotifications = () => {
  const { store, actions } = useContext(Context);
  const { patient_id } = useParams();
  const [notificationStatus, setNotificationStatus] = useState({});

  const updateNotificationState = async (notificationId, newState) => {
    try {
      await actions.updateNotificationsState(notificationId, newState);
      actions.getNotificationsById(patient_id);
    } catch (error) {
      console.log("Error updating notification state:", error);
    }
  };

  const handleRead = async (notificationId) => {
    console.log("Mark as Read clicked for notificationId:", notificationId);
    await updateNotificationState(notificationId, "leído");
    setNotificationStatus((prevStatus) => ({
      ...prevStatus,
      [notificationId]: "leído",
    }));
  };

  const handleNotRead = async (notificationId) => {
    console.log("Mark as Unread clicked for notificationId:", notificationId);
    await updateNotificationState(notificationId, "no leído");
    setNotificationStatus((prevStatus) => ({
      ...prevStatus,
      [notificationId]: "no leído",
    }));
  };

  const getNotification = async () => {
    try {
      await actions.getNotificationsById(patient_id);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du patient",
        error
      );
    }
  };

  useEffect(() => {
    getNotification();
  }, [patient_id]);

  return (
    <div>
      <ul>
        {store.notificationById &&
          store.notificationById.map((notification) => (
            <div key={notification.id}>
              <li>{notification.message}</li>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  color: "green",
                  marginLeft: "10px",
                }}
                title="Mark as Read"
                onClick={() => handleRead(notification.id)}
              >
                &#10003;
              </button>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  color: "red",
                  marginLeft: "10px",
                }}
                title="Mark as Unread"
                onClick={() => handleNotRead(notification.id)}
              >
                &#10005;
              </button>
            </div>
          ))}
      </ul>
    </div>
  );
};

export default MyNotifications;
