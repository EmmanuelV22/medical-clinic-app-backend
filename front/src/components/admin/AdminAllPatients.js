import React, { useContext, useState } from "react";
import { Context } from "../../store/appContext";
// import Cookies from "js-cookie";
import PatientDetails from "./PatientDetails";

const AdminAllPatients = () => {
  const { store, actions } = useContext(Context);
  const [patientData, setPatientData] = useState({});

  const handleDelete = async (id) => {
    console.log("Deleting patient with ID:", id);
    try {
      await actions.deletePatient(id);
    } catch (error) {
      console.error("Error al eliminar paciente", error);
    }
  };

  const editPatient = async (patient) => {
    try {
      const data = await actions.getPatientById(patient.id);
      setPatientData(data);
      console.log(patientData);
      // openModal();
    } catch (error) {
      console.error("Error al intentar modificar paciente:", error);
    }
  };

  return (
    <div className="admin-patient-content">
      <h1 className="text-center font-bold my-4" style={{ fontSize: "2.5rem" }}>
        Lista de pacientes:
      </h1>
      <div
        className="table-responsive"
        style={{ width: "100%", margin: "0 auto" }}
      >
        <table className="table">
          <thead>
            <tr>
              <th className="th-id">ID</th>
              <th className="th-patient-name th-general">Firstname</th>
              <th className="th-patient-name th-general">Lastname</th>
              <th className="th-patient-name th-general">DNI</th>
              <th className="th-patient-name th-general">Address</th>
              <th className="th-patient-name th-general">Birthday</th>
              <th className="th-email th-general">Email</th>
              <th className="th-patient-name th-general">Created at</th>
              <th className="th-patient-name th-general">Updated at</th>
              <th className="th-actions">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {store.patients &&
              store.patients.length >= 1 &&
              store.patients.map((patient) => (
                <>
                  <tr className="infos-contain" key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.firstname}</td>
                    <td>{patient.lastname}</td>
                    <td>{patient.dni}</td>
                    <td>{patient.address}</td>
                    <td>{patient.birthday}</td>
                    <td>{patient.email}</td>
                    <td>{patient.createdAt}</td>
                    <td>{patient.updatedAt}</td>
                    <td className="text-center">
                      <button
                        style={{
                          background: "blue",
                          color: "white",
                          border: " 2px solid white",
                          padding: "2px 3px",
                          borderRadius: "6px",
                        }}
                        onClick={() => editPatient(patient)}
                        data-bs-toggle="modal"
                        data-bs-target={"#patientData-" + patient.id}
                      >
                        &#9998;
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        style={{
                          background: "red",
                          color: "white",
                          border: " 2px solid white",
                          padding: "2px 3px",
                        }}
                      >
                        &#10008;
                      </button>
                    </td>
                  </tr>
                  <PatientDetails patientData={patient} />
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllPatients;
