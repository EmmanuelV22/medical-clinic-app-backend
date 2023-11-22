import React, { useEffect } from "react";

const EmployeeDetail = ({ employeeData }) => {
  useEffect(() => {
    console.log(employeeData);
  }, [employeeData]);

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
              Ficha de {employeeData && employeeData.firstname}
              {employeeData && employeeData.lastname}
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
                    defaultValue={employeeData.firstname}
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
                    defaultValue={employeeData.lastname}
                    // onChange={(e) => setLastname(e.target.value)}
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
                    defaultValue={employeeData.personalID}
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
                    defaultValue={employeeData.email}
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
                    defaultValue={employeeData.specialist}
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
                    defaultValue={employeeData.dni}
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
                    defaultValue={employeeData.address}
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
                    defaultValue={employeeData.password}
                    // onChange={(e) => setPassword(e.target.value)}
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
            <button type="button" className="btn btn-primary">
              GUARDAR CAMBIOS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
