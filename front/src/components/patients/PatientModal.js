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
  const [password, setPassword] = useState("11111");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(0);
  const [sex, setSex] = useState("");
  const [bloodGropu, setBloodGroup] = useState("");
  const [dni, setDni] = useState("");

  const getPatientData = async () => {
    if (id) {
      await actions.getPatientById(id);
      const patientData = store.patientData?.patientData;

      if (patientData) {
        const isSex = patientData.sex;
        setFirstname(patientData.firstname || "");
        setLastname(patientData.lastname || "");
        setPhone(patientData.phone || "");
        setEmail(patientData.email || "");
        setAddress(patientData.address || "");
        setSex((isSex.toUpperCase() === "H" ? "Hombre" : "Mujer") || "");
        setDni(patientData.dni || "");
        setBloodGroup(patientData.blood_group || "");
      }
    }
  };

  useEffect(() => {
    if (id) {
      getPatientData();
    }
  }, [id]);

  const handleUpdatePatient = async () => {
    const verifyPass = password.length >= 8 || password === "11111";
    if (phone && email && address && verifyPass) {
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
      actions.showNotification("Verifica los datos ingresados", "danger");
    }
  };

  return (
    <>
      <Navbar />
      {store.patient?.id === store.patientData?.patientData?.id &&
      store.patientData ? (
        <div className="text-center d-flex justify-content-center row">
          <div className="text-center d-flex row justify-content-center ">
            <h1 className="">
              {" "}
              {firstname} {lastname}, edita tu informacion:
            </h1>
          </div>
          <div className="text-center d-flex justify-content-center row   w-75 mb-5 rounded">
            <form className=" text-start ">
              <div className="form m-3">
                <label htmlFor="dni">DNI</label>
                <input
                  className=" m-2 w-100"
                  id="dni"
                  type="number"
                  placeholder="DNI"
                  value={dni}
                  disabled
                />
              </div>
              <div className="form m-3">
                <label htmlFor="Phone">Nombre</label>
                <input
                  className="w-100  m-2"
                  id="name"
                  type="text"
                  placeholder="Nombre"
                  value={firstname}
                  disabled
                />
              </div>
              <div className="form m-3">
                <label htmlFor="Phone">Apellido</label>
                <input
                  className="w-100  m-2"
                  id="lastname"
                  type="text"
                  placeholder="Apellido"
                  value={lastname}
                  disabled
                />
              </div>
              <div className="form m-3">
                <label htmlFor="Phone">Sexo</label>
                <input
                  className="w-100  m-2"
                  id="sex"
                  type="text"
                  placeholder="Sexo"
                  value={sex}
                  disabled
                />
              </div>
              <div className="form m-3">
                <label htmlFor="Phone">Grupo Sanguineo</label>
                <input
                  className="w-100  m-2"
                  id="blood"
                  type="text"
                  placeholder="Grupo Sanguineo"
                  value={bloodGropu}
                  disabled
                />
              </div>
              <div className="form m-3">
                <label htmlFor="Phone">Telefono</label>
                <input
                  className="w-100  m-2"
                  id="Phone"
                  type="number"
                  placeholder="Telefono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form m-3">
                <label>E-mail</label>
                <input
                  type="email"
                  className="w-100 m-2"
                  aria-label="email"
                  aria-describedby="patient-email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form m-3">
                <label>Dirección</label>
                <input
                  type="text"
                  className="w-100 m-2"
                  aria-label="address"
                  aria-describedby="patient-address"
                  placeholder="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form m-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="w-100 m-2"
                  aria-label="password"
                  aria-describedby="patient-password"
                  placeholder="Contraseña"
                  value={password === "" ? "" : password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-center d-flex justify-content-center">
                <button
                  type="button"
                  className="button3 text-center text-black   m-2 h-100 "
                  onClick={() => navigate("/dashboard-patient")}
                >
                  VOLVER
                </button>
                <button
                  type="button"
                  className="button1 text-center text-black h-100   m-2"
                  onClick={handleUpdatePatient} // Se corrigió el manejo del evento onClick
                >
                  GUARDAR CAMBIOS
                </button>
              </div>
            </form>
          </div>
          <ConfirmUpdateMyInfo editPatientData={handleUpdatePatient} />
        </div>
      ) : (
        <AccessDenied />
      )}
    </>
  );
};

export default PatientModal;
