import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Context } from "../store/appContext";

const AppointmentScheduler = ({ doctorId }) => {
  const { actions, store } = useContext(Context);
  const [selectedDate, setSelectedDate] = useState(null);
  const [available, setAvailable] = useState(1); // Valor predeterminado o lógica de disponibilidad inicial

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleScheduleAppointment = async () => {
    if (selectedDate) {
      const date = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1;
      const year = selectedDate.getFullYear();
      const day = selectedDate.getDay();
      const time = selectedDate.toLocaleTimeString().substring(0, 5);
      const state = "confirmado"; // o cualquier valor por defecto
      const patient_id = store.patient.id; // Reemplaza con la lógica para obtener el ID del paciente
      const medical_id = doctorId;
      console.log(month, year, day, date, time);
      // Lógica de disponibilidad según tu aplicación
      // ...

      await actions
        .postAppointment(
          date,
          month,
          year,
          day,
          time,
          state,
          patient_id,
          medical_id,
          available
        )
        .catch((error) => {
          console.error("Error al planificar el turno", error.message);
        });
    } else {
      console.warn("Seleccione una fecha y hora para planificar el turno.");
    }
  };

  return (
    <div>
      <h1>Planificador de turnos</h1>

      <div>
        <label>Seleccione una fecha y hora:</label>
        <DatePicker
          inline
          calendarStartDay={0}
          selected={selectedDate}
          onChange={handleDateChange}
          minDate={new Date()}
          maxDate={new Date(new Date().getTime() + 60 * 24 * 60 * 60 * 1000)} // Establece el máximo a hoy + 60 días
          timeIntervals={15}
          showTimeSelect
          dateFormat="Pp"
          minTime={new Date().setHours(8, 0, 0)} // Establece el mínimo a las 8:00 AM
          maxTime={new Date().setHours(18, 0, 0)} // Establece el máximo a las 6:00 PM
        />
      </div>

      <button onClick={handleScheduleAppointment}>Planificar turno</button>
    </div>
  );
};

export default AppointmentScheduler;
