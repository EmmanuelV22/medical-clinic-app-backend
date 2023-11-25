import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";

const PatientDetails = ({ patientData }) => {
  const {actions} = useContext(Context)

  useEffect(() => {
    console.log(patientData);
  }, [patientData]);

  const [firstname, setFirstname] = useState(patientData.firstname);
  const [lastname, setLastname] = useState(patientData.lastname);
  const [email, setEmail] = useState(patientData.email);
  const [password, setPassword] = useState(patientData.password);
  const [address , setAddress] = useState(patientData.address);
  const [id, setId] = useState(patientData.id);
  const [dni, setDni] = useState(patientData.dni);
  const [blood_group, setBloodGroup] = useState(patientData.blood_group);
  const [birthday, setBirthday] = useState(patientData.birthday);


const handleUpdatePatient = async () => {
  try{
 const response =  await actions.updatePatient(firstname, lastname, email, address, password, id);
 window.location.reload()
  }catch (error){
    console.log("Error updating patient",error)
  }
}


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
              Ficha de {firstname} {lastname}
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
                  aria-describedby="patient-lastname"
                  placeholder="lastname"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  defaultValue={blood_group}
                  readOnly
                  required
                />
              </div>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control border-l-0"
                  aria-label="dni"
                  aria-describedby="patient-dni"
                  placeholder="dni"
                  defaultValue={dni}
                  readOnly
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
                  aria-describedby="patient-password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  defaultValue={birthday}
                  readOnly
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
              
            >
              Close
            </button>
            <button
            onClick={handleUpdatePatient}
             type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
