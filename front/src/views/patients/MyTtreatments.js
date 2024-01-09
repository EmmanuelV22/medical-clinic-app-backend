/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, useParams } from "react-router";
import DoctorInfo from "../../components/DoctorInfo ";

const MyTtreatments = () => {
  const { actions, store } = useContext(Context);
  const { patient_id } = useParams();
  let navigate = useNavigate();

  const handleGetTreatments = async () => {
    patient_id && (await actions.getTreatmentsPatient(patient_id));
    console.log(store.patientData.treatments);
  };

  useEffect(() => {
    handleGetTreatments();
  }, [patient_id]);

  const filteredPatientId =
    Array.isArray(store.patientData.treatments) &&
    store.patientData.treatments.filter(
      (treatment) => treatment.patient_id === store.patient.id
    );

  const getDoctorData = async (id) => {
    const doctorData = await actions.getEmployeeById(id);
    return doctorData;
  };

  const isAuthorized = store.patient.id === parseInt(patient_id);

  return (
    <>
      {isAuthorized ? (
        <>
          <h1>
            Lista de Tratamientos de {store.patient.firstname}{" "}
            {store.patient.lastname}
          </h1>
          <table>
            <thead>
              <tr>
                <th>Resumen</th>
                <th>Fecha de inicio</th>
                <th>Fecha de finalización</th>
                <th>Cirugía</th>
                <th>Doctor</th>
                <th>Terminado</th>
                <th>Actualizado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {store.patient.id &&
                store.patientData?.treatments &&
                (filteredPatientId.length > 0 ? (
                  filteredPatientId.slice(0, 10).map((treatment, index) => (
                    <tr key={index}>
                      <td>{treatment.resume}</td>
                      <td>{actions.dateFormater(treatment.initial_date)}</td>
                      <td>{actions.dateFormater(treatment.exp_date)}</td>
                      <td>
                        {treatment.surgey === "" ? "NO" : treatment.surgey}
                      </td>
                      <td>
                        <DoctorInfo
                          medicalId={treatment.medical_id}
                          getDoctorData={getDoctorData}
                        />
                      </td>
                      <td>{treatment.finish_treatment ? "SI" : "NO"}</td>
                      <td>
                        {treatment.updatedAt !== null
                          ? actions.dateFormater(treatment.updatedAt)
                          : "NO"}
                      </td>
                      <td>
                        {" "}
                        <svg
                          onClick={() =>
                            navigate(`/patient-treatment/${treatment.id}`)
                          }
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-eye"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#ff2825"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
                        </svg>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <h1>¡No estás autorizado!</h1>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      ) : (
        <h1>Acceso denegado</h1>
      )}
    </>
  );
};

export default MyTtreatments;
