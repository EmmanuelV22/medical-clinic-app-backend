/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";

const Notifications = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();

  const handleNotification = async (patientId) => {
    try {
      const patientDetails = await actions.getPatientById(patientId);
      // Naviguer vers la route des détails du patient avec l'ID
      navigate(`/notifications/${patientId}`);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du patient",
        error
      );
    }
  };

  return (
    <div>
      <div>
        <svg
          onClick={() => handleNotification(store.patient.id)}
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-bell-exclamation"
          width="40"
          height="40"
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
      </div>
    </div>
  );
};

export default Notifications;
