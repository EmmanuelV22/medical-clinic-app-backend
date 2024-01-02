/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router";

const TreatmentById = () => {
  const { store, actions } = useContext(Context);
  const { treatment_id } = useParams();

  const getTreatmentByNotif = async () => {
    await actions.getTreatmentById(treatment_id);
  };

  useEffect(() => {
    getTreatmentByNotif();
  }, []);

  return (
    <div>
      <p>{store.treatment.id}</p>
      <p>{store.treatment.resume}</p>
    </div>
  );
};

export default TreatmentById;
