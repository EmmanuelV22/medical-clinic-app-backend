/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import NotificationsButtonsRead from "../NotificationsButtonsRead";

const NotificationAppointment = () => {
  const { store, actions } = useContext(Context);
  const [unreadNotifications, setUnreadNotifications] = useState([]);
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
    const filteredNotifications = store.notifications.filter(
      (notification) =>
        notification.state === "no leído" &&
        notification.medical_id === store.employee.id &&
        store.employee
    );
    setUnreadNotifications(filteredNotifications);
  };
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <ul className="dropdown-menu" aria-labelledby="navbarDrop">
      {unreadNotifications && unreadNotifications.length > 0 ? (
        <>
          {unreadNotifications
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 10)
            .map(
              (notification, index) =>
                // Added parentheses around the conditional rendering block
                notification.appointment_message_employee !== null && (
                  <li
                    key={notification.id}
                    className="dropdown-item d-flex"
                    style={{ cursor: "pointer" }}
                  >
                    <span
                      onClick={() =>
                        navigate(
                          `/patient-appointment/${notification.agenda_id}`
                        )
                      }
                    >
                      {/* Corrected syntax for displaying the notification message */}
                      {notification.appointment_message_employee}
                    </span>

                    {/* Assuming NotificationsButtonsRead is a valid component */}
                    <NotificationsButtonsRead notification={notification} />
                  </li>
                )
            )}

          <hr />
          {/* Assuming `handleNotification` and `store.employee.id` are defined */}
          <Link onClick={() => handleNotification(store.employee.id)}>
            Ver todas mis notificaciones
          </Link>
        </>
      ) : (
        <>
          <li>¡No tienes notificaciones!</li>
          <div>
            {/* Assuming `handleNotification` and `store.employee.id` are defined */}
            <Link onClick={() => handleNotification(store.employee.id)}>
              Ver todas mis notificaciones
            </Link>
          </div>
        </>
      )}
    </ul>
  );
};

export default NotificationAppointment;
