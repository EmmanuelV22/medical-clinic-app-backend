import React, { useEffect } from "react";

const PatientDetails = ({ patientData, setPatientData, closeModal }) => {
  useEffect(() => {
    console.log(patientData);
  }, [patientData]);

  return (
    <div
      className="modal fade"
      id={"patientData-" + patientData.id}
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Ficha de {patientData.firstname} {patientData.lastname}
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
                  aria-describedby="patient-firstname"
                  placeholder="firstname"
                  value={patientData.firstname}
                  // onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-l-0"
                  aria-label="lastname"
                  aria-describedby="patient-lastname"
                  placeholder="lastname"
                  value={patientData.lastname}
                  // onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control border-l-0"
                  aria-label="email"
                  aria-describedby="patient-email"
                  placeholder="email"
                  value={patientData.email}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-l-0"
                  aria-label="blood_group"
                  aria-describedby="patient-blood_group"
                  placeholder="blood_group"
                  value={patientData.blood_group}
                  // onChange={(e) => setBlood_group(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-l-0"
                  aria-label="Username"
                  aria-describedby="patient-dni"
                  placeholder="personalID"
                  value={patientData.dni}
                  // onChange={(e) => setDni(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-l-0"
                  aria-label="address"
                  aria-describedby="patient-address"
                  placeholder="address"
                  value={patientData.address}
                  // onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control border-l-0"
                  aria-label="password"
                  aria-describedby="patient-password"
                  placeholder="Contraseña"
                  value={patientData.password}
                  // onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="birthday"
                  className="form-control border-l-0"
                  aria-label="birthday"
                  aria-describedby="patient-birthday"
                  placeholder="Fecha de Nacimiento"
                  value={patientData.birthday}
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

export default PatientDetails;
