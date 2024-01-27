/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";
import ConfirmUpdateMyInfo from "./ConfirmUpdateMyInfo";
import { useNavigate, useParams } from "react-router";
import Navbar from "../Navbar";
import AccessDenied from "../../views/AccessDenied";

const PatientModal = () => {
  const { store, actions } = useContext(Context);
  let navigate = useNavigate();
  const { id } = useParams();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);

  const funcioncita = async () => {
    if (id) {
      await actions.getPatientById(id);
      const patientData = store.patientData?.patientData;
      if (patientData) {
        setFirstname(patientData.firstname || "");
        setLastname(patientData.lastname || "");
        setPhone(patientData.phone || "");
        setEmail(patientData.email || "");
        setAddress(patientData.address || "");
      }
    }
  };

  useEffect(() => {
    if (id) {
      funcioncita();
    }
  }, [id]);

  const handleUpdatePatient = async () => {
    if (password.length >= 3) {
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
        navigate("/dashboard-patient");
        window.location.reload();
        return response;
      } catch (error) {
        return error;
      }
    } else {
      actions.showNotification("Password incorrecto", "danger");
    }
  };

  return (
    <>
      <Navbar />
      {store.patient?.id === store.patientData?.patientData?.id &&
      store.patientData ? (
        <>
          <div className="text-center d-flex row justify-content-center mb-5">
            <h1 className="mt-3"> {firstname} {lastname}, edita tu informacion:</h1>
          </div>
          <div className="text-center d-flex justify-content-center row">
            <form className="">
              <div className="form m-3">
                <label htmlFor="Phone">Telefono</label>
                <input
                  className=" w-50"
                  id="Phone"
                  type="number"
                  placeholder="Telefono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="m-3">
                <label>E-mail</label>
                <input
                  type="email"
                  className="w-50"
                  aria-label="email"
                  aria-describedby="patient-email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="m-3">
                <label>Dirección</label>
                <input
                  type="text"
                  className="w-50"
                  aria-label="address"
                  aria-describedby="patient-address"
                  placeholder="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  aria-label="password"
                  aria-describedby="patient-password"
                  placeholder="Contraseña"
                  value={password === "" ? "" : password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="button"
                className="button3 text-black w-50 mt-3 w-50"
                onClick={() => navigate("/dashboard-patient")}
              >
                VOLVER
              </button>
              <button
                type="button"
                className="button1 text-black mb-5 w-50"
                onClick={handleUpdatePatient} // Se corrigió el manejo del evento onClick
              >
                GUARDAR CAMBIOS
              </button>
            </form>
          </div>
          <ConfirmUpdateMyInfo editPatientData={handleUpdatePatient} />
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default PatientModal;
