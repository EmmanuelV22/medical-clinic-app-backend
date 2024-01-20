import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

const RegisterEmployee = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [DNI, setDNI] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [password, setPassword] = useState("");
  const [personalID, setPersonalID] = useState("");
  const [sex, setSex] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [days_off1, setDays_off1] = useState("");
  const [days_off2, setDays_off2] = useState("");
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const { actions } = useContext(Context);

  const dayNameToNumber = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miércoles: 3,
    jueves: 4,
    viernes: 5,
    sábado: 6,
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log("days_off (before conversion):", daysOfToArray);

      const daysOfToArray = [days_off1, days_off2];

      const daysOffArray =
        daysOfToArray && daysOfToArray.map((day) => dayNameToNumber[day]);

      // console.log("days off Data:", daysOffArray);

      const request = await actions.registerEmployee(
        firstname,
        lastname,
        phone,
        sex,
        email,
        address,
        birthday,
        DNI,
        specialist,
        personalID,
        daysOffArray,
        start_time,
        end_time,
        password
      );

      console.log(request);

      if (request) {
        setFirstname("");
        setLastName("");
        setPhone("");
        setSex("");
        setEmail("");
        setDNI("");
        setAddress("");
        setBirthDay("");
        setPassword("");
        setPersonalID("");
        setSpecialist("");
        setDays_off1("");
        setDays_off2("");
        setStart_time("");
        setEnd_time("");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFirstname("");
    setLastName("");
    setPhone("");
    setSex("");
    setEmail("");
    setDNI("");
    setAddress("");
    setPassword("");
    setPersonalID("");
    setSpecialist("");
    setDays_off1("");
    setDays_off2("");
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
              htmlFor="Phone"
            >
              Telefono
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Phone"
              type="number"
              placeholder="Telefono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="MalePatient"
            >
              Sexo
            </label>
            <div className="flex">
              <label className="mr-2">
                <input
                  type="radio"
                  id="MalePatient"
                  name="sex"
                  value="H"
                  checked={sex === "H"}
                  onChange={(e) => setSex(e.target.value)}
                />
                Hombre
              </label>
              <label>
                <input
                  type="radio"
                  id="FemalePatient"
                  name="sex"
                  value="M"
                  checked={sex === "M"}
                  onChange={(e) => setSex(e.target.value)}
                />
                Mujer
              </label>
            </div>
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
              htmlFor="birthdayPatient"
            >
              Fecha de nacimiento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="birthdayPatient"
              type="date"
              placeholder="12/12/2000"
              value={birthday}
              onChange={(e) => setBirthDay(e.target.value)}
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="daysOffSelect1"
            >
              Día 1
            </label>
            <select
              id="daysOffSelect1"
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={days_off1}
              onChange={(e) => setDays_off1(e.target.value)}
              required
            >
              <option value="">Selecciona un día</option>
              <option value="domingo">0: Domingo</option>
              <option value="lunes">1: Lunes</option>
              <option value="martes">2: Martes</option>
              <option value="miércoles">3: Miércoles</option>
              <option value="jueves">4: Jueves</option>
              <option value="viernes">5: Viernes</option>
              <option value="sábado">6: Sábado</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="daysOffSelect2"
            >
              Día 2
            </label>
            <select
              id="daysOffSelect2"
              className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={days_off2}
              onChange={(e) => setDays_off2(e.target.value)}
              required
            >
              <option value="">Selecciona un día</option>
              <option value="domingo">0: Domingo</option>
              <option value="lunes">1: Lunes</option>
              <option value="martes">2: Martes</option>
              <option value="miércoles">3: Miércoles</option>
              <option value="jueves">4: Jueves</option>
              <option value="viernes">5: Viernes</option>
              <option value="sábado">6: Sábado</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="PersonalID"
            >
              Hora de inicio
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              aria-label="start_time"
              aria-describedby="employee-start-time"
              placeholder="start_time"
              value={start_time}
              onChange={(e) => setStart_time(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="PersonalID"
            >
              Hora de finalizacion
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              aria-label="end-time"
              aria-describedby="employee-end-time"
              placeholder="end_time"
              value={end_time}
              onChange={(e) => setEnd_time(e.target.value)}
              required
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
