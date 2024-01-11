import { React, useContext } from "react";
import { Context } from "../../store/appContext";

const ConfirmUpdateMyInfo = ({ editPatientData }) => {
  const { store } = useContext(Context);
  return (
    <div
      className="modal fade"
      id={"confirmPatient-" + store.patientData.patientData?.id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            ¿Está seguro de querer modificar los datos del paciente &nbsp;
            <span className="bold">
              {store.patientData.patientData &&
                store.patientData?.patientData?.firstname}{" "}
            </span>
            <span className="bold">
              {store.patientData.patientData &&
                store.patientData.patientData?.lastname}{" "}
            </span>
            <span className="bold">
              con el DNI ?
              {store.patientData.patientData &&
                store.patientData.patientData?.dni}{" "}
            </span>
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
              className="btn btn-danger"
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

export default ConfirmUpdateMyInfo;
