import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import PatientDetails from "../../components/admin/PatientDetails";
import SortingTable from "../../components/SortingTable";

const AdminAllPatients = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getAllPatients();
  }, []);

  const headers = [
    { field: "id", label: "ID" },
    { field: "firstname", label: "Firstname" },
    { field: "lastname", label: "Lastname" },
    { field: "dni", label: "DNI" },
    { field: "address", label: "Address" },
    { field: "birthday", label: "Birthday" },
    { field: "email", label: "Email" },
    { field: "createdAt", label: "Created at" },
    { field: "updatedAt", label: "Updated at" },
    { field: "actions", label: "Acciones" },
  ];

  const handleDelete = async (id) => {
    console.log("Deleting patient with ID:", id);
    try {
      await actions.deletePatient(id);
    } catch (error) {
      console.error("Error al eliminar paciente", error);
    }
  };

  const renderRow = (patient) => (
    <React.Fragment key={patient.id}>
      <tr className="infos-contain">
        <td>{patient.id}</td>
        <td>{patient.firstname}</td>
        <td>{patient.lastname}</td>
        <td>{patient.dni}</td>
        <td>{patient.address}</td>
        <td>{actions.dateFormater(patient.birthday)}</td>
        <td>{patient.email}</td>
        <td>{actions.dateFormater(patient.createdAt)}</td>
        <td>
          {patient.updatedAt !== null
            ? actions.dateFormater(patient.updatedAt)
            : null}
        </td>
        <td className="text-center">
          <button
            style={{
              background: "blue",
              color: "white",
              border: " 2px solid white",
              padding: "2px 3px",
              borderRadius: "6px",
            }}
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
    </React.Fragment>
  );

  return (
    <div className="admin-patient-content">
      <h1 className="text-center font-bold my-4" style={{ fontSize: "2.5rem" }}>
        Lista de pacientes:
      </h1>
      <div
        className="table-responsive"
        style={{ width: "100%", margin: "0 auto" }}
      >
        <SortingTable
          headers={headers}
          data={store.patients}
          renderRow={renderRow}
        />
      </div>
    </div>
  );
};

export default AdminAllPatients;
