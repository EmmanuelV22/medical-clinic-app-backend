/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import SortingTable from "./SortingTable";

const PatientTreatement = () => {
  const { actions , store} = useContext(Context);
  let navigate = useNavigate();
  const patient_id = "8" //se recibe como prop en el componente

  useEffect(()=>{
    handleGetTreatments()
  },[])

  const handleGetTreatments = async () =>{
    patient_id && await actions.getTreatmentsPatient(patient_id)
  }

  const headers = [
    { field: "id", label: "ID" },
    { field: "resume", label: "Resumen" },
    { field: "medicine", label: "Medicina" },
    { field: "quantity", label: "Cantidad" },
    { field: "initial_date", label: "Fecha de inicio" },
    { field: "exp_date", label: "Fecha de finalizacion" },
    { field: "patologies", label: "Patologias" },
    { field: "surgey", label: "Cirugia" },
    { field: "medical", label: "Doctor" },
    { field: "finish_treatment", label: "Terminado?" },
    { field: "updated_at", label: "Actualizado" },
  ];

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
        <td>
          <button
            title="historial clínica"
            style={{ border: "none", background: "transparent" }}
          >
            {/* Votre icône SVG */}
          </button>
        </td>
      </tr>
    </React.Fragment>
  );

  return (
   <>
   <h1>Lista de Tratamientos de pepito</h1>
   <div
          className="table-responsive"
          style={{ width: "100%", margin: "0 auto" }}
        >
          <SortingTable
            headers={headers}
            data={
              store.patientData.treatment
            }
            renderRow={renderRow}
          />
        </div>
   </>
  );
};

export default PatientTreatement;
