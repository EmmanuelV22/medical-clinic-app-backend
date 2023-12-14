/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Context } from "../../store/appContext";
// { patient_id, medical_id }

const CreateTreatment = () => {
  const { actions, store } = useContext(Context);

  const { patient_id } = useParams();

  useEffect(() => {
    if (patient_id) {
      getPatientData();
    }
  }, [patient_id]);

  const getPatientData = async () => {
    try {
      const patientDetails = await actions.getPatientById(patient_id);
    } catch (error) {
      console.error("Error recuperando info del paciente", error);
    }
  };

  const medical_id = store.employee.id;
  //   const [patient_id, setPatientId] = useState(patient_id);
  const [resume, setResume] = useState("");
  const [medicine, setMedicine] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [initial_date, setInitialDate] = useState("");
  const [exp_date, setExpDate] = useState("");
  //   const [medical_id, setMedicalId] = useState(medical_id);
  const [patologies, setPatologies] = useState("");
  const [surgey, setSurgey] = useState("SI");
  const [finish_treatment, setFinishTreatment] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await actions
      .createTreatment(
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
      .then((res) => console.log("Tratamiento creado con exito", res));
  };

  const handleClear = (e) => {
    e.preventDefault();
    // setPatientId("");
    setResume("");
    setMedicine("");
    setQuantity("");
    setInitialDate("");
    setExpDate("");
    // setMedicalId("");
    setPatologies("");
    setSurgey("");
    setFinishTreatment("");
  };

  return (
    <div>
      <h1>
        Crear tratamiento para{" "}
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

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Crear Tratamiento
            </button>
            <button
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={handleClear}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTreatment;
