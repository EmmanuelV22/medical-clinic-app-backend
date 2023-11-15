import React, { useEffect, useState } from "react";

const EmployeeDetail = ({ employeeData, setEmployeeData, closeModal }) => {
  // const employeeData = {

  // }
  useEffect(() => {
    console.log(employeeData);
  }, [employeeData]);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Ficha de {employeeData.firstname} {employeeData.lastname}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form className="mx-auto w-75">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-l-0"
                  aria-label="firstname"
                  aria-describedby="employee-firstname"
                  placeholder="firstname"
                  value={employeeData.firstname}
                  // onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-l-0"
                  aria-label="lastname"
                  aria-describedby="employee-lastname"
                  placeholder="lastname"
                  value={employeeData.lastname}
                  // onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="personalID"
                  className="form-control border-l-0"
                  aria-label="Username"
                  aria-describedby="employee-personalID"
                  placeholder="personalID"
                  value={employeeData.personalID}
                  // onChange={(e) => setPersonalID(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control border-l-0"
                  aria-label="email"
                  aria-describedby="employee-email"
                  placeholder="email"
                  value={employeeData.email}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-l-0"
                  aria-label="specialist"
                  aria-describedby="employee-specialist"
                  placeholder="specialist"
                  value={employeeData.specialist}
                  // onChange={(e) => setSpecialist(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-l-0"
                  aria-label="Username"
                  aria-describedby="employee-dni"
                  placeholder="personalID"
                  value={employeeData.dni}
                  // onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-l-0"
                  aria-label="address"
                  aria-describedby="employee-address"
                  placeholder="address"
                  value={employeeData.address}
                  // onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control border-l-0"
                  aria-label="password"
                  aria-describedby="employee-password"
                  placeholder="Contraseña"
                  value={employeeData.password}
                  // onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mx-auto text-center">
                <button className="w-40 text-center bg-blue-500">
                  Guardar datos
                </button>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={closeModal}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
