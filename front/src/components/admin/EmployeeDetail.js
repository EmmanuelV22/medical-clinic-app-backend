/* eslint-disable no-unused-vars */

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import ConfirmUpdateEmployee from "./ConfirmUpdateEmployee";
import AccessDenied from "../../views/AccessDenied";

const EmployeeDetail = ({ employeeData }) => {
  const { store, actions } = useContext(Context);
  const [id, setId] = useState(employeeData.id);
  const [firstname, setFirstname] = useState(employeeData.firstname);
  const [lastname, setLastname] = useState(employeeData.lastname);
  const [phone, setPhone] = useState(employeeData.phone);
  const [personal_id, setpersonal_id] = useState(employeeData.personal_id);
  const [email, setEmail] = useState(employeeData.email);
  const [specialist, setSpecialist] = useState(employeeData.specialist);
  const [address, setAddress] = useState(employeeData.address);
  const [password, setPassword] = useState("11111");
  const daysOffArray = employeeData.days_off;
  const [days_off1, setDays_off1] = useState(daysOffArray[1]);
  const [days_off2, setDays_off2] = useState(daysOffArray[3]);
  const [start_time, setStart_time] = useState(employeeData.start_time);
  const [end_time, setEnd_time] = useState(employeeData.end_time);
  const [birthday, setBirthday] = useState(employeeData.birthday);
  const [sex, setSex] = useState(
    employeeData.sex.toUpperCase() === "H" ? "Hombre" : "Mujer"
  );
  const [dni, setDNI] = useState(employeeData.dni);
  const [created_at, setCreated] = useState(employeeData.created_at);
  const [updated_at, setUpdated] = useState(employeeData.updated_at);

  const numberToDay = {
    0: "domingo",
    1: "lunes",
    2: "martes",
    3: "miércoles",
    4: "jueves",
    5: "viernes",
    6: "sábado",
  };

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
    if (
      (password.length >= 8 || password === "11111") &&
      days_off1 &&
      days_off2 &&
      firstname &&
      lastname &&
      phone &&
      personal_id &&
      email &&
      address &&
      specialist &&
      start_time &&
      end_time
    ) {
      const numberToDay = {
        0: "domingo",
        1: "lunes",
        2: "martes",
        3: "miércoles",
        4: "jueves",
        5: "viernes",
        6: "sábado",
      };

      const day1 = days_off1.length > 1 ? days_off1 : numberToDay[days_off1];
      const day2 = days_off2.length > 1 ? days_off2 : numberToDay[days_off2];

      const daysOffToArray = [day1, day2];

      const daysOffArray = daysOffToArray.map((day) => dayNameToNumber[day]);

      try {
        const updatedData = await actions.updateEmployee(
          firstname,
          lastname,
          phone,
          personal_id,
          email,
          specialist,
          address,
          daysOffArray,
          start_time,
          end_time,
          password,
          employeeData.id
        );
        window.location.reload();
        return updatedData;
      } catch (error) {
        actions.showNotification("Error actualizando datos", "danger");

        console.error("Error updating employee:", error);
      }
    } else {
      actions.showNotification("Verifica los datos ingresados", "danger");
    }
  };

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
            <div className="modal-dialog mx-auto ">
              <div
                className="modal-content "
                // style={{ width: "800px", transformOrigin: "left" }}
              >
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
                    <form className="row g-3 needs-validation">
                      <div className="col-md-6">
                        <label>Nombre</label>
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          aria-label="firstname"
                          aria-describedby="employee-firstname"
                          placeholder="firstname"
                          value={firstname}
                          onChange={(e) => setFirstname(e.target.value)}
                          readOnly
                          disabled
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Apellido</label>
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          aria-label="lastname"
                          aria-describedby="employee-lastname"
                          placeholder="lastname"
                          value={lastname}
                          onChange={(e) => setLastname(e.target.value)}
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
                        <label
                          className="block text-gray-700 text-sm font-bold "
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
                      <div className="col-md-6">
                        <label>ID personal</label>
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          aria-label="Username"
                          aria-describedby="employee-personal_id"
                          placeholder="personal_id"
                          value={personal_id}
                          onChange={(e) => setpersonal_id(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label>E-mail</label>
                        <input
                          type="email"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          aria-label="email"
                          aria-describedby="employee-email"
                          placeholder="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Especialidad</label>
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          aria-label="specialist"
                          aria-describedby="employee-specialist"
                          placeholder="specialist"
                          value={specialist}
                          onChange={(e) => setSpecialist(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Dirección</label>
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          aria-label="address"
                          aria-describedby="employee-address"
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
                          aria-describedby="employee-password"
                          placeholder="Contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Día 1</label>
                        <select
                          type="text"
                          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={numberToDay[days_off1]}
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
                      <div className="col-md-6">
                        <label>Día 2</label>
                        <select
                          type="text"
                          className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={numberToDay[days_off2]}
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
                      <div className="col-md-6 ">
                        <label>Hora de inicio</label>
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
                      <div className="col-md-6">
                        <label>Hora de salida</label>
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
                      <div className="col-md-6">
                        <label>Cuenta creada</label>
                        <input
                          type="text"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          aria-label="created"
                          aria-describedby="patient-lastname"
                          value={actions.dateFormater(created_at)}
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
                          value={actions.dateFormater(updated_at)}
                          readOnly
                          disabled
                        />
                      </div>
                    </form>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className=" button3 w-100"
                    data-bs-dismiss="modal"
                  >
                    CERRAR
                  </button>
                  <button
                    type="button"
                    className=" button1 w-100"
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
        <AccessDenied />
      )}
    </>
  );
};

export default EmployeeDetail;
