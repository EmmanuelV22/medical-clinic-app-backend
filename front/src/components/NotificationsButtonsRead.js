/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";

const NotificationsButtonsRead = ({ notification }) => {
  const { store, actions } = useContext(Context);
  const [notificationStatus, setNotificationStatus] = useState({});
  const { patient_id } = useParams();

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
      window.location.reload();
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
      window.location.reload();
    } catch (error) {
      console.log("Error updating notification state:", error);
    }
  };

  return (
    <>
      {notification.state === "no leído" && (
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
            className="icon icon-tabler icon-tabler-eye-off"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ff2825"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
            <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
            <path d="M3 3l18 18" />
          </svg>
        </button>
      )}
      {notification.state === "leído" && (
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
            className="icon icon-tabler icon-tabler-eye"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ff2825"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
            <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
          </svg>
        </button>
      )}
    </>
  );
};

export default NotificationsButtonsRead;
