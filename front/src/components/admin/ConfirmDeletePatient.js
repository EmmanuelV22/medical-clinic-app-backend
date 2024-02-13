import React from "react";

const ConfirmDeletePatient = ({ patientData, handleDelete }) => {
  return (
    <div
      className="modal fade modal-dark"
      id={"deletePatient-" + patientData?.id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body modal-dark">
            {" "}
            ¿Está seguro de querer eliminar el paciente {" "}
            {patientData && patientData.firstname}{" "}
            {patientData && patientData.lastname} con el DNI{" "}
            {patientData && patientData.dni}{" "}
            ?
          </div>
          <div className="modal-footer modal-dark">
            <button
              type="button"
              className=" button3 w-100"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              className=" button1 w-100"
              onClick={() => handleDelete(patientData.id)}
            >
              Sí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePatient;
