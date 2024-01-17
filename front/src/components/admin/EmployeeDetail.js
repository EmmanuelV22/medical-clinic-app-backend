/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import ConfirmUpdateEmployee from "./ConfirmUpdateEmployee";

const EmployeeDetail = ({ employeeData }) => {
  const { store, actions } = useContext(Context);
  const [firstname, setFirstname] = useState(employeeData.firstname);
  const [lastname, setLastname] = useState(employeeData.lastname);
  const [phone, setPhone] = useState(employeeData.phone);
  const [personalID, setPersonalID] = useState(employeeData.personalID);
  const [email, setEmail] = useState(employeeData.email);
  const [specialist, setSpecialist] = useState(employeeData.specialist);
  const [address, setAddress] = useState(employeeData.address);
  const [password, setPassword] = useState(employeeData.password);
  const [id, setId] = useState(employeeData.id);
  const [days_off, setDays_off] = useState({
    day1: employeeData.days_off[0] || "0",
    day2: employeeData.days_off[1] || "0",
  });
  const [start_time, setStart_time] = useState(employeeData.start_time);
  const [end_time, setEnd_time] = useState(employeeData.end_time);
  const dayNameToNumber = {
    domingo: 0,
    lunes: 1,
    martes: 2,
    miércoles: 3,
    jueves: 4,
    viernes: 5,
    sábado: 6,
  };

  useEffect(() => {}, [employeeData]);

  const editEmployeeData = async () => {
    try {
      const daysOffArray = Object.values(days_off).map(
        (day) => dayNameToNumber[day]
      );
      const updatedData = await actions.updateEmployee(
        firstname,
        lastname,
        phone,
        personalID,
        email,
        address,
        specialist,
        address,
        daysOffArray,
        start_time,
        end_time,
        password,
        id
      );
      window.location.reload();
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  function generateUniqueId(prefix = "uniqueId") {
    return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  // Exemple d'utilisation
  const uniqueId1 = generateUniqueId(); // génère quelque chose comme "uniqueId-1643810958282-567"
  const uniqueId2 = generateUniqueId(); // génère quelque chose comme "uniqueId-1643810961291-789"

  return (
    <>
      {store?.employee && store.employee?.specialist === "admin" ? (
        <>
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
                    Ficha de {employeeData && firstname}
                    {employeeData && lastname}
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
                        <label>Nombre</label>
                        <input
                          type="text"
                          className="form-control border-l-0"
                          aria-label="firstname"
                          aria-describedby="employee-firstname"
                          placeholder="firstname"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <label>Apellido</label>
                        <input
                          type="text"
                          className="form-control border-l-0"
                          aria-label="lastname"
                          aria-describedby="employee-lastname"
                          placeholder="lastname"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          // htmlFor="PhoneEmployee"
                        >
                          Telefono
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          // id="PhoneEmployee"
                          type="tel"
                          placeholder="Telefono"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                      <div className="input-group mb-3">
                        <label>ID personal</label>
                        <input
                          type="text"
                          className="form-control border-l-0"
                          aria-label="Username"
                          aria-describedby="employee-personalID"
                          placeholder="personalID"
                          value={personalID}
                          onChange={(e) => setPersonalID(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <label>E-mail</label>
                        <input
                          type="email"
                          className="form-control border-l-0"
                          aria-label="email"
                          aria-describedby="employee-email"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <label>Especialidad</label>
                        <input
                          type="text"
                          className="form-control border-l-0"
                          aria-label="specialist"
                          aria-describedby="employee-specialist"
                          placeholder="specialist"
                          value={specialist}
                          onChange={(e) => setSpecialist(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <label>Dirección</label>
                        <input
                          type="text"
                          className="form-control border-l-0"
                          aria-label="address"
                          aria-describedby="employee-address"
                          placeholder="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor={`daysOffSelect1Up-${uniqueId1}`}
                        >
                          Día 1
                        </label>
                        <select
                          id={`daysOffSelect1Up-${uniqueId1}`}
                          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={days_off.day1}
                          onChange={(e) =>
                            setDays_off({ ...days_off, day1: e.target.value })
                          }
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
                          htmlFor={`daysOffSelect1Up-${uniqueId2}`}
                        >
                          Día 1
                        </label>
                        <select
                          id={`daysOffSelect1Up-${uniqueId2}`}
                          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={days_off.day2}
                          onChange={(e) =>
                            setDays_off({ ...days_off, day2: e.target.value })
                          }
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
                      <div className="input-group mb-3">
                        <label>Hora de inicio</label>
                        <input
                          type="text"
                          className="form-control border-l-0"
                          aria-label="start_time"
                          aria-describedby="employee-start-time"
                          placeholder="start_time"
                          value={start_time}
                          onChange={(e) => setStart_time(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-group mb-3">
                        <label>Hora de salida</label>
                        <input
                          type="text"
                          className="form-control border-l-0"
                          aria-label="end-time"
                          aria-describedby="employee-end-time"
                          placeholder="end_time"
                          value={end_time}
                          onChange={(e) => setEnd_time(e.target.value)}
                          required
                        />
                      </div>

                      <div className="input-group mb-3">
                        <label>Contraseña</label>
                        <input
                          type="password"
                          className="form-control border-l-0"
                          aria-label="password"
                          aria-describedby="employee-password"
                          placeholder="Contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target={"#updateEmployee-" + employeeData.id}
                  >
                    GUARDAR CAMBIOS
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ConfirmUpdateEmployee
            employeeData={employeeData}
            editEmployeeData={editEmployeeData}
          />
        </>
      ) : (
        <h1>componente denegado</h1>
      )}
    </>
  );
};

export default EmployeeDetail;
