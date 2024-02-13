import React from "react";

const ConfirmUpdateEmployee = ({ employeeData, editEmployeeData }) => {
  return (
    <div
      className="modal fade modal-dark"
      id={"updateEmployee-" + employeeData?.id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body modal-dark">
            ¿Está seguro de querer modificar los datos del empleado{" "}
            {employeeData && employeeData.firstname}{" "}
            {employeeData && employeeData.lastname} con el dni{" "}
            {employeeData && employeeData.dni}{" "}
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
              onClick={editEmployeeData}
            >
              Sí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUpdateEmployee;
