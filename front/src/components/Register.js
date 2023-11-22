import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
// import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Register = () => {
  const [employeeForm, setEmployeeForm] = useState("block");
  const [patientForm, setPatientForm] = useState("none");
  const [buttonText, setButtonText] = useState("Switch to register a patient");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [DNI, setDNI] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [password, setPassword] = useState("");
  const [personalID, setPersonalID] = useState("");
  const [bloodGroup, setBloodGroop] = useState("");

  const { actions } = useContext(Context);
  // let navigate = useNavigate();

  function changeEmployee() {
    employeeForm === "block"
      ? setEmployeeForm("none")
      : setEmployeeForm("block");
    buttonText === "Switch to register a patient"
      ? setButtonText("Switch to register an employee")
      : setButtonText("Switch to register a patient");
    patientForm === "none" ? setPatientForm("block") : setPatientForm("none");
  }

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
      setPersonalID("");
      setBloodGroop("");
    } else {
      console.log("Error creating patient");
    }
  };

  return (
    <>
      <button className="btn btn-success" onClick={changeEmployee}>
        {" "}
        {buttonText}
      </button>
      <div style={{ display: employeeForm }} className="w-full max-w-xs">
        <h2>Employee Form:</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="PersonalID"
            >
              personal ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="PersonalID"
              type="text"
              placeholder="PersonalID"
              value={personalID}
              onChange={(e) => setPersonalID(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="FirstName"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="FirstName"
              type="text"
              placeholder="FirstName"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor=""
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="LastName"
              type="text"
              placeholder="LastName"
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
              placeholder="DNI"
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
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Specialist"
            >
              Specialist
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="specialist"
              type="text"
              placeholder="specialist"
              value={specialist}
              onChange={(e) => setSpecialist(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Adress"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="Adress"
              type="text"
              placeholder="Adress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
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
                Please complete the password.
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Register
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Reset Form
            </Link>
          </div>
        </form>
      </div>

      {/* ------------------------------------- */}

      <div style={{ display: patientForm }} className="w-full max-w-xs">
        <h2>Patient form:</h2>
        <form
          onSubmit={handleSubmitPatient}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="bloodGropu"
            >
              Blood Group
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bloodGroup"
              type="text"
              placeholder="BloodGroup"
              value={bloodGroup}
              onChange={(e) => setBloodGroop(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="FirstName"
            >
              First Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="FirstNamePatient"
              type="text"
              placeholder="FirstName"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor=""
            >
              Last Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="LastNamePatient"
              type="text"
              placeholder="LastName"
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
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="emailpatient"
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="birthday"
            >
              BirthDay
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="birthdayPatient"
              type="text"
              placeholder="birthday"
              value={birthday}
              onChange={(e) => setBirthDay(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Adress"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="AdressPatient"
              type="text"
              placeholder="Adress"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
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
                Please complete the password.
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Register
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Reset Form
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
