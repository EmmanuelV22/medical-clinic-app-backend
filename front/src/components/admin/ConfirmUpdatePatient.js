import React from "react";

const ConfirmUpdatePatient = ({ patientData, editPatientData }) => {
  return (
    <div
      className="modal fade modal-dark"
      id={"updatePatient-" + patientData?.id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body modal-dark">
            ¿Está seguro de querer modificar los datos del paciente{" "}
            <span className="bold">
              {patientData && patientData.firstname}{" "}
            </span>
            <span className="bold">{patientData && patientData.lastname} </span>
            <span className="bold">
              con el DNI {patientData && patientData.dni}{" "}?
            </span>
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
              onClick={editPatientData}
            >
              Sí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUpdatePatient;
