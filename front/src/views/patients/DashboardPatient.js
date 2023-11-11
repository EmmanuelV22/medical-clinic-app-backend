/* eslint-disable no-lone-blocks */
/* eslint-disable no-unreachable */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";

const DashboardPatient = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllPatients();
  }, []); // Assurez-vous que votre useEffect dépend de ce qui est nécessaire, sinon supprimez le tableau de dépendances []

  return (
    <div>
      {store.patients.length > 0 &&
        store.patients.map((patient) => (
          <ul key={patient.id}>
            <li>{patient.firstname}</li>
            <li>{patient.lastname}</li>
            <li>{patient.dni}</li>
            <li>{patient.birthday}</li>
            <li>{patient.email}</li>
            <li>{patient.createdAt}</li>
          </ul>
        ))}
    </div>
  );
};

export default DashboardPatient;
