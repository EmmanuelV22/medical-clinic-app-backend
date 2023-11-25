import React from "react";

const ConfirmDeleteEmployee = ({ employeeData, handleDeleteEmployee }) => {
  return (
    <div
      className="modal fade"
      id={"deleteEmployee-" + employeeData?.id}
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
            ¿Está seguro de querer eliminar el empleado &nbsp;
            {employeeData && employeeData.firstname}{" "}
            {employeeData && employeeData.lastname} con el id personal{" "}
            {employeeData && employeeData.personalID}?
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
              onClick={() => handleDeleteEmployee(employeeData.id)}
            >
              Sí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteEmployee;
