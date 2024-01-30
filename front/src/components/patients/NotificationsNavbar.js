/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import NotificationsButtonsRead from "../NotificationsButtonsRead";

const NotificationsNavbar = () => {
  const { store, actions } = useContext(Context);
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  let navigate = useNavigate();

  const handleNotification = async (patientId) => {
    try {
      const patientDetails = await actions.getPatientById(patientId);
      navigate(`/notifications/${patientId}`);
    } catch (error) {
      return error;
      return error;
    }
  };

  const getNotifications = async () => {
    await actions.getNotifications();
    const filteredNotifications = store.notifications.filter(
      (notification) =>
        notification.state === "no leído" &&
        notification.patient_id === store.patient.id &&
        notification.appointment_message_employee === null &&
        store.patient
    );
    setUnreadNotifications(filteredNotifications);
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="">
      <ul
      style={{width:"350px", overflow:"scroll"}}
        className="dropdown-menu dropdown dropdown-toggle-split"
        aria-labelledby="navbarDropdown"
      >
        {unreadNotifications.length > 0 ? (
          <>
            {unreadNotifications
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
              .slice(0, 10)
              .map((notification, index) => (
                <>
                  {/* {notification.treatment_id !== null && (
                    <span
                      onClick={() =>
                        navigate(
                          `/patient-treatment/${notification.treatment_id}`
                        )
                      }
                    >
                      {notification.treatment_message}
                    </span>
                  )} */}
                  {(notification !== null)  && (
                    <li
                      key={notification.id}
                      className="dropdown-item d-flex"
                      style={{ cursor: "pointer" }}
                    >
                      {notification.treatment_message &&<span
                        onClick={() =>
                          navigate(
                            `/patient-treatment/${notification.treatment_id}`
                          )
                        }
                      >
                        {notification.treatment_message}
                      </span>}
                      {notification.appointment_message_patient && (
                        <span
                          onClick={() =>
                            navigate(
                              `/patient-appointment/${notification.agenda_id}`
                            )
                          }
                        >
                          {notification.appointment_message_patient}
                        </span>
                      )}
                      <NotificationsButtonsRead notification={notification} />
                    </li>
                  )}
                </>
              ))}
            <hr />
            <li className="text-center text-black">
              <h5 onClick={() => handleNotification(store.patient.id)}>
                Ver todas mis notificaciones
              </h5>
            </li>
          </>
        ) : (
          <>
            <li>¡No tienes notificaciones!</li>
            <li>
              <Link onClick={() => handleNotification(store.patient.id)}>
                Ver todas mis notificaciones
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default NotificationsNavbar;
