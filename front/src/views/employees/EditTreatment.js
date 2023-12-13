/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../../store/appContext";
// { patient_id, medical_id }

const EditTreatment = () => {
  const { actions, store } = useContext(Context);

  const { treatment_id } = useParams();

  useEffect(() => {
    getTreatmentData();
  }, [treatment_id]);

  useEffect(() => {
    // Actualizar los estados locales cuando treatment en el store cambie
    const initialDate = new Date(store.treatment.initial_date);
    const formattedDate = `${initialDate.getFullYear()}-${(
      initialDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${initialDate.getDate().toString().padStart(2, "0")}`;

    const expDate = new Date(store.treatment.exp_date);
    const formattedExpDate = `${expDate.getFullYear()}-${(
      expDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${expDate.getDate().toString().padStart(2, "0")}`;

    setPatientId(store.treatment.patient_id);
    setResume(store.treatment.resume);
    setMedicine(store.treatment.medicine);
    setQuantity(store.treatment.quantity);
    setInitialDate(formattedDate);
    setExpDate(formattedExpDate);
    setPatologies(store.treatment.patologies);
    setSurgey(store.treatment.surgey);
    setFinishTreatment(store.treatment.finish_treatment);
  }, [store.treatment]);

  const getPatientData = async () => {
    try {
      const patientDetails = await actions.getPatientById(
        store.treatment.patient_id
      );
      // Si vous avez besoin de faire quelque chose avec les détails du patient, vous pouvez le faire ici
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du patient",
        error
      );
      // Gérer l'erreur ici, peut-être rediriger vers une page d'erreur
    }
  };

  const getTreatmentData = async () => {
    try {
      const TreatmentDetails = await actions.getTreatmentById(treatment_id);
      await getPatientData();
    } catch (error) {
      console.error("Error recuperando info del tratamiento", error);
    }
  };

  const medical_id = store.employee.id;
  const [patient_id, setPatientId] = useState(store.treatment.patient_id);
  const [resume, setResume] = useState(store.treatment.resume);
  const [medicine, setMedicine] = useState(store.treatment.medicine);
  const [quantity, setQuantity] = useState(store.treatment.quantity);
  const [initial_date, setInitialDate] = useState(new Date());
  const [exp_date, setExpDate] = useState(new Date());
  //   const [medical_id, setMedicalId] = useState(medical_id);
  const [patologies, setPatologies] = useState(store.treatment.patologies);
  const [surgey, setSurgey] = useState(store.treatment.surgey);
  const [finish_treatment, setFinishTreatment] = useState(
    store.treatment.finish_treatment
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions
      .updateTreatmentById(
        treatment_id,
        patient_id,
        resume,
        medicine,
        quantity,
        initial_date,
        exp_date,
        medical_id,
        patologies,
        surgey,
        finish_treatment
      )

      .then((res) => {
        console.log("Tratamiento modificado con exito", res);
        //   window.location.reload()
      });
  };

  //   const handleClear = (e) => {
  //     e.preventDefault();
  //     // setPatientId("");
  //     setResume("");
  //     setMedicine("");
  //     setQuantity("");
  //     setInitialDate("");
  //     setExpDate("");
  //     // setMedicalId("");
  //     setPatologies("");
  //     setSurgey("");
  //     setFinishTreatment("");
  //   };

  return (
    <div>
      <h1>
        Editar tratamiento para{" "}
        {store.patientData.patientData &&
          store.patientData.patientData.firstname}{" "}
        {store.patientData.patientData &&
          store.patientData.patientData.lastname}
      </h1>
      <div className="w-full max-w-xs">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="resume"
            >
              Resumen:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="resume"
              type="text"
              placeholder="Resumen del tratamiento"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="medicine"
            >
              Medicina:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="medicine"
              type="text"
              placeholder="Medicina del tratamiento"
              value={medicine}
              onChange={(e) => setMedicine(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Cantidad:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="quantity"
              type="text"
              placeholder="Cantidad de medicamento"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="initial_date"
            >
              Fecha de Inicio:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="initial_date"
              type="date"
              placeholder="Fecha de Inicio"
              value={initial_date}
              onChange={(e) => setInitialDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="exp_date"
            >
              Fecha de finalizacion:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="exp_date"
              type="date"
              placeholder="Fecha de finalizacion"
              value={exp_date}
              onChange={(e) => setExpDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="patologies"
            >
              Patologias:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="patologies"
              type="text"
              placeholder="Patologias a tener en cuenta"
              value={patologies}
              onChange={(e) => setPatologies(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="surgey"
            >
              Cirugia:
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="surgey"
              value={surgey}
              onChange={(e) => setSurgey(e.target.value)}
            >
              <option value="SI">Sí</option>
              <option value="NO">No</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="finish_treatment"
            >
              ¿Finalizar tratamiento?
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="finish_treatment"
              value={finish_treatment}
              onChange={(e) => setFinishTreatment(e.target.value)}
            >
              <option value="0">No</option>
              <option value="1">Sí</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Guardar Modificacion
            </button>
            <button
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={() => window.location.reload()}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTreatment;
