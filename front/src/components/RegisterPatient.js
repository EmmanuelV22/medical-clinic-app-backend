import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const RegisterPatient = () => {
  const { actions } = useContext(Context);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [DNI, setDNI] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [password, setPassword] = useState("");
  const [bloodGroup, setBloodGroop] = useState("");

  const handleSubmitPatient = async (e) => {
    e.preventDefault();
    const request = await actions.registerPatient(
      firstname,
      lastname,
      email,
      DNI,
      address,
      birthday,
      password,
      bloodGroup
    );
    console.log(request);
    if (request) {
      setFirstname("");
      setLastName("");
      setEmail("");
      setDNI("");
      setAddress("");
      setPassword("");
      setBirthDay("");
      setBloodGroop("");
    } else {
      console.log("Error creating patient");
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFirstname("");
    setLastName("");
    setEmail("");
    setDNI("");
    setAddress("");
    setPassword("");
    setBirthDay("");
  };
  return (
    <>
      <div className="w-full max-w-xs">
        <h2>Formulario paciente:</h2>
        <form
          onSubmit={handleSubmitPatient}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="FirstNamePatient"
            >
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="FirstNamePatient"
              type="text"
              placeholder="Gabriel"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="LastNamePatient"
            >
              Apellido
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="LastNamePatient"
              type="text"
              placeholder="Batistuta"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="DNIPatient"
            >
              DNI
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="DNIPatient"
              type="text"
              placeholder="DNI"
              value={DNI}
              onChange={(e) => setDNI(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="emailpatient"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="emailpatient"
              type="text"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="birthdayPatient"
            >
              Fecha de nacimiento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="birthdayPatient"
              type="text"
              placeholder="12/12/2000"
              value={birthday}
              onChange={(e) => setBirthDay(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="AdressPatient"
            >
              Dirección
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="AdressPatient"
              type="text"
              placeholder="calle Pampa"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bloodGroup"
            >
              Grupo sanguíneo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bloodGroup"
              type="text"
              placeholder="AB+, O-..."
              value={bloodGroup}
              onChange={(e) => setBloodGroop(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="passwordPatient"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="passwordPatient"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password === "" ? (
              <p className="text-red-500 text-xs italic">
                Por favor cambie la contraseña.
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Crear cuenta
            </button>
            <button
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={handleClear}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPatient;
