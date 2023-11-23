/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

const EmployeeDetail = ({ employeeData }) => {
  const { actions } = useContext(Context);
  const [firstname, setFirstname] = useState(employeeData.firstname);
  const [lastname, setLastname] = useState(employeeData.lastname);
  const [personalID, setPersonalID] = useState(employeeData.personalID);
  const [email, setEmail] = useState(employeeData.email);
  const [specialist, setSpecialist] = useState(employeeData.specialist);
  const [dni, setDni] = useState(employeeData.dni);
  const [address, setAddress] = useState(employeeData.address);
  const [password, setPassword] = useState(employeeData.password);
  const [id, setId] = useState(employeeData.id);
  useEffect(() => {}, [employeeData]);

  const editEmployeeData = async () => {
    try {
      const updatedData = await actions.updateEmployee(
        id,
        firstname,
        lastname,
        personalID,
        email,
        address,
        dni,
        specialist,
        password
      );
      window.location.reload();
      console.log("Updated data:", updatedData);
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  return (
    <div
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      className="modal fade"
      id={"employeeModal-" + employeeData?.id}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Ficha de {employeeData && firstname}
              {employeeData && lastname}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {employeeData && (
              <form className="mx-auto w-75">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control border-l-0"
                    aria-label="firstname"
                    aria-describedby="employee-firstname"
                    placeholder="firstname"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
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
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control border-l-0"
                    aria-label="Username"
                    aria-describedby="employee-personalID"
                    placeholder="personalID"
                    value={personalID}
                    onChange={(e) => setPersonalID(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    value={specialist}
                    onChange={(e) => setSpecialist(e.target.value)}
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
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </form>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              CERRAR
            </button>
            <button
              type="button"
              onClick={editEmployeeData}
              className="btn btn-primary"
            >
              GUARDAR CAMBIOS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
