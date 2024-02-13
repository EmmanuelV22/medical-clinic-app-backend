/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

const CreateHistoric = ({ id }) => {
  const { store, actions } = useContext(Context);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [agenda_id, setAgendaId] = useState(null);
  const [treatment_id, setTreatment_id] = useState(null);
  const medical_id = store.employee.id;

  const getPatientId = async () => {
    if (id !== null) {
      await actions.getPatientById(id);
    }
  };
  useEffect(() => {
    if (id) {
      getPatientId();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions
      .createHistoric(
        id,
        medical_id,
        agenda_id,
        treatment_id,
        description,
        date
      )
      .catch((err) => {
        return err
      });
    setDate("");
    setDescription("");
    window.location.reload();
  };
  return (

    <>
      {store.employee && store.employee.specialist !== "admin" ? (
        <div className="text-center mx-auto mb-3">
          <form onSubmit={handleSubmit}>
           <div className="mb-4 d-flex flex-column justify-content-center
">
           <label htmlFor="description">Descripción</label>{" "}
            <textarea
              className="shadow area-resume appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              rows="7"
              cols="80"
              style={{
                maxWidth: "100%",
                resize: "both",
                margin: "auto",
              }}
              type="text"
              value={description}
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            />
           </div>
            <label htmlFor="date">Fecha</label>{" "}
            <input
            className="me-2"
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <button className="button1 w-25 text-black">crear historia</button>
          </form>
        </div>
      ) : (
        <h1>denegado</h1>
      )}
    </>

  );
};

export default CreateHistoric;
