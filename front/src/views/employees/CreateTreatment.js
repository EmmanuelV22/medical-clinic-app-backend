/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Context } from "../../store/appContext";

const CreateTreatment = () => {
  const navigate = useNavigate()
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
  const [resume, setResume] = useState("");
  const [medicines, setMedicines] = useState([{ name: "", quantity: 0 }]);
  const [initial_date, setInitialDate] = useState("");
  const [exp_date, setExpDate] = useState("");
  const [patologies, setPatologies] = useState("");
  const [surgey, setSurgey] = useState("SI");
  const [finish_treatment, setFinishTreatment] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const medicineData = medicines.map(({ name, quantity }) => ({
        medicine_name: name,
        quantity: parseInt(quantity, 10),
      }));


      await actions.createTreatment(
        patient_id,
        resume,
        medicineData,
        initial_date,
        exp_date,
        medical_id,
        patologies,
        surgey,
        finish_treatment
      );
      window.location.reload();
    } catch (error) {
      return error
    }
  };

  const handleMedicineChange = (index, key, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][key] = value;
    setMedicines(updatedMedicines);
  };

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: "", quantity: 0 }]);
  };

  const handleRemoveMedicine = (index) => {
    const updatedMedicines = [...medicines];
    updatedMedicines.splice(index, 1);
    setMedicines(updatedMedicines);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setResume("");
    setMedicines([{ name: "", quantity: 0 }]);
    setInitialDate("");
    setExpDate("");
    setPatologies("");
    setSurgey("SI");
    setFinishTreatment(0);
    navigate(`/patients/${store.patientData.patientData.id}`)

  };

  return (
    <>
      {store.employee &&
      (store.employee.specialist !== "admin" ||
        store.employee.specialist !== "enfermera" ||
        store.employee.specialist !== "enfermero") ? (
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

              {medicines.map((medicine, index) => (
                <div key={index} className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={`medicine${index}`}
                  >
                    Medicina #{index + 1}:
                  </label>
                  <div className="flex items-center">
                    <input
                      className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id={`medicine${index}`}
                      type="text"
                      placeholder="Nombre de la medicina"
                      value={medicine.name}
                      onChange={(e) =>
                        handleMedicineChange(index, "name", e.target.value)
                      }
                    />
                    <input
                      className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2"
                      type="number"
                      placeholder="Cantidad"
                      value={medicine.quantity}
                      onChange={(e) =>
                        handleMedicineChange(index, "quantity", e.target.value)
                      }
                    />
                    {index > 0 && (
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() => handleRemoveMedicine(index)}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="mb-4 text-blue-500"
                onClick={handleAddMedicine}
              >
                Agregar Medicina
              </button>

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
      ) : (
        <h1>denegado</h1>
      )}
    </>
  );
};

export default CreateTreatment;
