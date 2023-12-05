import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const RegisterEmployee = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [DNI, setDNI] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [password, setPassword] = useState("");
  const [personalID, setPersonalID] = useState("");

  const { actions } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const request = await actions.registerEmployee(
      firstname,
      lastname,
      email,
      DNI,
      address,
      password,
      // birthday,
      personalID,
      specialist
    );
    console.log(request);
    if (request) {
      setFirstname("");
      setLastName("");
      setEmail("");
      setDNI("");
      setAddress("");
      setPassword("");
      // setBirthDay("")
      setPersonalID("");
      setSpecialist("");
    } else {
      console.log("Error creating employee");
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
    // setBirthDay("")
    setPersonalID("");
    setSpecialist("");
  };

  return (
    <>
      <div className="w-full max-w-xs">
        <h2>Formulario empleado:</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="FirstName"
            >
              Nombre
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="FirstName"
              type="text"
              placeholder="Diego"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="LastName"
            >
              Apellido
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="LastName"
              type="text"
              placeholder="Maradona"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="DNI"
            >
              DNI
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="DNI"
              type="text"
              placeholder="123456789"
              value={DNI}
              onChange={(e) => setDNI(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Adress"
            >
              Dirección
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Adress"
              type="text"
              placeholder="calle 1"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="specialist"
            >
              Especialidad
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="specialist"
              type="text"
              placeholder="general, dentista..."
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="PersonalID"
            >
              ID personal
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="PersonalID"
              type="text"
              placeholder="DENT0001"
              value={personalID}
              onChange={(e) => setPersonalID(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
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

      {/* ------------------------------------- */}
    </>
  );
};

export default RegisterEmployee;
