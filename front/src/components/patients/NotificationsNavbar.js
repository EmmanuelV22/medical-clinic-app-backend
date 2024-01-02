/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import NotificationsButtonsRead from "../NotificationsButtonsRead";

const NotificationsNavbar = () => {
  const { store, actions } = useContext(Context);
  const [notificationStatus, setNotificationStatus] = useState({});
  const { patient_id } = useParams();
  let navigate = useNavigate();

  const handleNotification = async (patientId) => {
    try {
      const patientDetails = await actions.getPatientById(patientId);
      navigate(`/notifications/${patientId}`);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du patient",
        error
      );
    }
  };

  const getNotifications = async () => {
    await actions.getNotifications();
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const unreadNotifications = store.notifications.filter(
    (notification) =>
      notification.state === "no leído" &&
      notification.patient_id === store.patient.id
  );

  return (
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
      {unreadNotifications.length > 0 ? (
        unreadNotifications
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 10)
          .map((notification, index) => (
            <>
              <div
                key={notification.id}
                className="d-flex"
                style={{ cursor: "pointer" }}
              >
                <li
                  onClick={() =>
                    navigate(`/patient-treatment/${notification.treatment_id}`)
                  }
                  className="dropdown-item d-flex"
                >
                  {notification.treatment_message}
                </li>
                <NotificationsButtonsRead notification={notification} />
              </div>
              <hr />
              <div key={index}>
                <Link onClick={() => handleNotification(store.patient.id)}>
                  Ver todas mis notificaciones
                </Link>
              </div>
            </>
          ))
      ) : (
        <>
          <li>¡No tienes notificaciones!</li>
          <div>
            <Link onClick={() => handleNotification(store.patient.id)}>
              Ver todas mis notificaciones
            </Link>
          </div>
        </>
      )}
    </ul>
  );
};

export default NotificationsNavbar;
