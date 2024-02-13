import React from "react";

const ConfirmDeleteAppointment = ({ handleDelete, appointment }) => {
  return (
    <div
      className="modal fade"
      id={"deleteAppointment-" + appointment?.id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content modal-dark">
          <div className="modal-body">
            {" "}
            ¿Está seguro de querer eliminar el siguiente turno : {" "}
            {appointment.date}/{appointment.month}/{appointment.year} a las {" "}
            {appointment.time}?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="button3 w-25 m-2"
              data-bs-dismiss="modal"
            >
              No
            </button>
            <button
              type="button"
              className="button1 w-25 m-2"
              onClick={() => handleDelete(appointment.id)}
            >
              Sí
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteAppointment;
