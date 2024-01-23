/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import ConfirmUpdatePatient from "./ConfirmUpdatePatient";

const PatientDetails = ({ patientData }) => {
  const { actions } = useContext(Context);

  useEffect(() => {}, [patientData]);

  const [firstname, setFirstname] = useState(patientData.firstname);
  const [lastname, setLastname] = useState(patientData.lastname);
  const [email, setEmail] = useState(patientData.email);
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(patientData.address);
  const [id, setId] = useState(patientData.id);
  const [phone, setPhone] = useState(patientData.phone);
  const [dni, setDNI] = useState(patientData.dni);
  const [birthday, setBirthday] = useState(patientData.birthday);
  const [sex, setSex] = useState(patientData.sex);
  const [blood, setBlood] = useState(patientData.blood_group);
  const [createdAt, setCreated] = useState(patientData.createdAt);
  const [updatedAt, setUpdated] = useState(patientData.updatedAt);

  const handleUpdatePatient = async () => {
    if (password.length <= 7) {
      try {
        const response = await actions.updatePatient(
          firstname,
          lastname,
          phone,
          email,
          address,
          password,
          id
        );
        window.location.reload();
      } catch (error) {
        console.log("Error updating patient", error);
      }
    } else {
      alert("El password debe ser de 8 caracteres");
    }
  };

  return (
    <>
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
              <form className="row g-3 needs-validation">
                <div className="col-md-6">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="firstname"
                    aria-describedby="patient-firstname"
                    placeholder="firstname"
                    value={firstname}
                    readOnly
                    disabled
                  />
                </div>
                <div className="col-md-6 ">
                  <label>Apellido</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="lastname"
                    aria-describedby="patient-lastname"
                    placeholder="lastname"
                    value={lastname}
                    readOnly
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label>DNI</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="dni"
                    aria-describedby="patient-lastname"
                    value={dni}
                    readOnly
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label>Sexo</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="sex"
                    aria-describedby="patient-lastname"
                    value={sex}
                    readOnly
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label>Fecha de nacimiento</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="birthday"
                    aria-describedby="patient-lastname"
                    value={actions.dateFormater(birthday)}
                    readOnly
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label>Grupo sanguíneo</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="blood"
                    aria-describedby="patient-lastname"
                    value={blood}
                    readOnly
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label className="block text-gray-700 text-sm font-bold">
                    Telefono
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>E-mail</label>
                  <input
                    type="email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="email"
                    aria-describedby="patient-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>Dirección</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="address"
                    aria-describedby="patient-address"
                    placeholder="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="password"
                    aria-describedby="patient-password"
                    placeholder="Contraseña"
                    value={""}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label>Cuenta creada</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="created"
                    aria-describedby="patient-lastname"
                    value={actions.dateFormater(createdAt)}
                    readOnly
                    disabled
                  />
                </div>
                <div className="col-md-6">
                  <label>Cuenta actualizada</label>
                  <input
                    type="text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    aria-label="created"
                    aria-describedby="patient-lastname"
                    value={actions.dateFormater(updatedAt)}
                    readOnly
                    disabled
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer m-auto">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target={"#updatePatient-" + patientData.id}
              >
                GUARDAR CAMBIOS
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmUpdatePatient
        patientData={patientData}
        editPatientData={handleUpdatePatient}
      />
    </>
  );
};

export default PatientDetails;
