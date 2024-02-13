/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

import { Context } from "../../store/appContext";

const EditTreatment = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const { treatment_id } = useParams();
  const medical_id = store.employee.id;
  const [patient_id, setPatientId] = useState(store.treatment.patient_id);
  const [resume, setResume] = useState(store.treatment.resume);
  const [medicineData, setMedicineData] = useState(
    store.treatment.medicineData
  );
  const [initial_date, setInitialDate] = useState(store.treatment.initial_date);
  const [exp_date, setExpDate] = useState(store.treatment.exp_date);
  const [patologies, setPatologies] = useState(store.treatment.patologies);
  const [surgey, setSurgey] = useState(store.treatment.surgey);
  const [finish_treatment, setFinishTreatment] = useState(
    store.treatment.finish_treatment
  );

  useEffect(() => {
    if (treatment_id) {
      getTreatmentData();
    }
  }, [treatment_id]);

  useEffect(() => {
    // Actualiser les états locaux lorsque le traitement dans le store change
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

    if (
      Array.isArray(store.treatment.medicineData) &&
      store.treatment.medicineData.length > 0
    ) {
      setMedicineData(store.treatment.medicineData);
    } else {
      // Si la valeur de medicine_data est une chaîne JSON, parsez-la en tableau
      const parsedMedicineData = JSON.parse(
        store.treatment.medicine_data || "[]"
      );

      // Assurez-vous que parsedMedicineData est un tableau avant de l'assigner
      if (Array.isArray(parsedMedicineData)) {
        setMedicineData(parsedMedicineData);
      } else {
        setMedicineData([{ medicine_name: "", quantity: "" }]);
      }
    }

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToUpdate = {
      patient_id,
      resume,
      medicineData,
      initial_date,
      exp_date,
      medical_id,
      patologies,
      surgey,
      finish_treatment,
    };

    await actions
      .updateTreatmentById(treatment_id, ...Object.values(dataToUpdate))
      .then((res) => {
        navigate(`/patient-treatments/${patient_id}`);
      })
      .catch((error) => {
        return error;
      });
  };

  const handleMedicineChange = (index, value) => {
    const updatedMedicineData = [...medicineData];
    updatedMedicineData[index].medicine_name = value;
    setMedicineData(updatedMedicineData);
  };

  const handleQuantityChange = (index, value) => {
    const updatedMedicineData = [...medicineData];
    updatedMedicineData[index].quantity = value;
    setMedicineData(updatedMedicineData);
  };

  const handleAddMedicine = (e) => {
    // Ajoutez un nouvel objet médicament avec des valeurs par défaut
    e.preventDefault();
    setMedicineData([...medicineData, { medicine_name: "", quantity: "" }]);
  };

  const isDoctor = store.employee.id;

  return (
    <>
      <Navbar />
      {isDoctor ? (
        <div className="text-center d-flex justify-content-center row">
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
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 form-treatment"
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
                {Array.isArray(medicineData) &&
                  medicineData.map((medicineItem, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Nombre del medicamento"
                        value={medicineItem.medicine_name}
                        onChange={(e) =>
                          handleMedicineChange(index, e.target.value)
                        }
                      />
                      <input
                        className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                        type="text"
                        placeholder="Cantidad"
                        value={medicineItem.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                      />
                    </div>
                  ))}

                {/* Ajoutez un bouton pour ajouter de nouveaux médicaments */}
                <button
                  className="button1 text-black w-50"
                  onClick={handleAddMedicine}
                >
                  Agregar + Medicina
                </button>
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
                  className="shadow select-treatment appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="shadow select-treatment appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="finish_treatment"
                  value={finish_treatment}
                  onChange={(e) => setFinishTreatment(e.target.value)}
                >
                  <option value="0">No</option>
                  <option value="1">Sí</option>
                </select>
              </div>

              <div className="d-flex row justify-content-center">
                <button className="button1 text-black w-50 mb-3">
                  Guardar Modificacion
                </button>
                <button
                  className="button3 w-50 text-black"
                  onClick={() =>
                    navigate(`/patients/${store.patientData.patientData.id}`)
                  }
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <h1>DENEGADO</h1>
      )}
    </>
  );
};

export default EditTreatment;
