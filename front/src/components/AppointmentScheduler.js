import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Context } from "../store/appContext";

const AppointmentScheduler = () => {
  const { actions } = useContext(Context);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleScheduleAppointment = () => {
    if (selectedDate) {
      // Ajoutez la logique pour extraire les composants de la date si nécessaire
      const date = selectedDate.getDate();
      const month = selectedDate.getMonth() + 1; // Les mois commencent à 0
      const year = selectedDate.getFullYear();
      const day = selectedDate.getDay();
      const time = selectedDate.toLocaleTimeString(); // Vous pouvez ajuster le format selon vos besoins
      const state = "reservado"; // ou une autre valeur par défaut
      const patient_id = null; // Remplacez par l'ID du patient
      const medical_id = null; // Remplacez par l'ID du médecin

      // Appel de la fonction postAppointment du contexte
      actions
        .postAppointment(
          date,
          month,
          year,
          day,
          time,
          state,
          patient_id,
          medical_id
        )
        .then((response) => {
          console.log(response.data); // Traitez la réponse de l'API comme nécessaire
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la planification du rendez-vous",
            error.message
          );
        });
    } else {
      console.warn(
        "Veuillez sélectionner une date et une heure pour planifier le rendez-vous."
      );
    }
  };

  return (
    <div>
      <h1>Planificateur de rendez-vous</h1>

      <div>
        <label>Sélectionnez une date et une heure :</label>
        <DatePicker
          inline
          calendarStartDay={0}
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="Pp"
        />
      </div>

      <button onClick={handleScheduleAppointment}>
        Planifier le rendez-vous
      </button>
    </div>
  );
};

export default AppointmentScheduler;
