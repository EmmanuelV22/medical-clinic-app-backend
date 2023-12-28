/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router";

const MyNotifications = () => {
  const { store, actions } = useContext(Context);
  const { patient_id } = useParams();
  const [read, setRead] = useState(false);
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
    try {
      await updateNotificationState(notificationId, "leído");
      setNotificationStatus((prevStatus) => ({
        ...prevStatus,
        [notificationId]: "leído",
      }));
      setRead(true);
    } catch (error) {
      console.log("Error updating notification state:", error);
    }
  };

  const handleNotRead = async (notificationId) => {
    console.log("Mark as Unread clicked for notificationId:", notificationId);
    try {
      await updateNotificationState(notificationId, "no leído");
      setNotificationStatus((prevStatus) => ({
        ...prevStatus,
        [notificationId]: "no leído",
      }));
      setRead(false);
    } catch (error) {
      console.log("Error updating notification state:", error);
    }
  };

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
      <ul>
        {store.notificationById &&
          store.notificationById.map((notification) => (
            <div key={notification.id}>
              <li>{notification.message}</li>
              {!read ? (
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "red",
                    marginLeft: "10px",
                  }}
                  title="marcar como leído"
                  onClick={() => handleRead(notification.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-mail-exclamation"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#000"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M15 19h-10a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v5.5" />
                    <path d="M3 7l9 6l9 -6" />
                    <path d="M19 16v3" />
                    <path d="M19 22v.01" />
                  </svg>
                </button>
              ) : (
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "green",
                    marginLeft: "10px",
                  }}
                  title="marcar como no leído"
                  onClick={() => handleNotRead(notification.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-mail-opened"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#000"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 9l9 6l9 -6l-9 -6l-9 6" />
                    <path d="M21 9v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10" />
                    <path d="M3 19l6 -6" />
                    <path d="M15 13l6 6" />
                  </svg>
                </button>
              )}
            </div>
          ))}
      </ul>
    </div>
  );
};

export default MyNotifications;
