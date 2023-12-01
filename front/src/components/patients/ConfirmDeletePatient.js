import React from "react";

const ConfirmDeletePatient = ({ patientData, handleDelete }) => {
  return (
    <div
      className="modal fade"
      id={"deletePatient-" + patientData?.id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            {" "}
            ¿Está seguro de querer eliminar el paciente &nbsp;
            {patientData && patientData.firstname}{" "}
            {patientData && patientData.lastname} con el DNI{" "}
            {patientData && patientData.dni}?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-primary"
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
