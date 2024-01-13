const connectDB = require("../server");

/* patient_id will be used from store loged data*/

exports.getAppointmentPatients = async (req, res, next) => {
  const patient_id = req.params.patient_id;

  const query = "SELECT * FROM agenda WHERE patient_id = ?";

  const values = [patient_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error fetching patient", error: error.message });
    }

    const agenda = results;
    return res.status(200).json({ message: "Get appointment success", patient_id, agenda });
  });
};

exports.getAppointmenByIdPatient = async (req, res, next) => {
  const patient_id = req.params.patient_id;

  const query = "SELECT * FROM agenda WHERE id = ?";
  console.log("Patient ID:", patient_id);

  const values = [patient_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error fetching patient", error: error.message });
    }
    console.log(results);
    const agenda = results[0];
    return res.status(200).json({ message: "Get appointment success", agenda });
  });
};

exports.getAppointmentById = async (req, res, next) => {
  const id = req.params.id;

  const query = "SELECT * FROM agenda WHERE id = ?";

  const values = [id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error fetching patient", error: error.message });
    }

    const agenda = results[0];
    return res.status(200).json({ message: "Get appointment success", agenda });
  });
};

/////////////////////////////

exports.createAppointment = async (req, res, next) => {
  const { date, month, year, day, time, medical_id } = req.body;
  const patient_id = req.params.id;
  const available = 0;
  const state = "confirmado";
  const query =
    "INSERT INTO agenda (date, month, year, day, time, state, patient_id, medical_id, available) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    date,
    month,
    year,
    day,
    time,
    state,
    patient_id,
    medical_id,
    available,
  ];

  connectDB.query(query, values, async (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error making agenda", error: error.message });
    }

    const appointmentId = results.insertId;

    const notificationQueryPatient =
      "INSERT INTO notifications (patient_id, medical_id, agenda_id, appointment_message_patient) VALUES (?, ?, ?, ?)";

    const notificationValuesPatient = [
      patient_id,
      medical_id,
      appointmentId,
      `¡Turno confirmado el ${date}/${month}/${year} a las ${time}!`,
    ];

    try {
      await connectDB.query(
        notificationQueryPatient,
        notificationValuesPatient
      );
    } catch (notificationError) {
      console.error("Error creating patient notification:", notificationError);
      return res.status(500).json({
        message: "Error creating appointment and patient notification",
        error: notificationError.message,
      });
    }

    // const queryPatientById = 'SELECT firstname, lastname FROM patients WHERE id = ?'
    // const valuesPatient = [patient_id]
    // Send notification to the doctor
    const doctorNotificationQuery =
      "INSERT INTO notifications (patient_id, medical_id, agenda_id, appointment_message_employee) VALUES (?, ?, ?, ?)";

    const doctorNotificationValues = [
      patient_id,
      medical_id,
      appointmentId,
      `¡Nuevo turno agendado por el paciente ${patient_id} el ${date}/${month}/${year} a las ${time}!`,
    ];

    try {
      await connectDB.query(doctorNotificationQuery, doctorNotificationValues);

      return res.status(201).json({
        message: "Appointment successfully created",
        appointment: appointmentId,
      });
    } catch (doctorNotificationError) {
      console.error(
        "Error creating doctor notification:",
        doctorNotificationError
      );
      return res.status(500).json({
        message: "Error creating appointment and doctor notification",
        error: doctorNotificationError.message,
      });
    }
  });
};

////////////////////////////////////

(exports.changeAppointment = async (req, res, next) => {
  const id = req.params.id;
  const { date, month, year, day, time, medical_id, patient_id } = req.body;
  const state = "confirmado";
  const updatedAt = new Date();

  const query =
    "UPDATE agenda SET date=?, month=?, year=?, day=?, time=?, state=?, medical_id=?, patient_id=?, updatedAt=? WHERE id=?";

  const values = [
    date,
    month,
    year,
    day,
    time,
    state,
    medical_id,
    patient_id,
    updatedAt,
    id,
  ];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error changing appointment", error: error });
    }
    return res
      .status(200)
      .json({ message: "Appointment successfully changed", appointment: id });
  });
}),
  ////////////////////////////////////

  (exports.deleteAppointment = async (req, res, next) => {
    const id = req.params.id;

    // Iniciar la transacción
    connectDB.beginTransaction((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error starting transaction", error: err.message });
      }

      // Eliminar notificaciones relacionadas en la tabla 'notifications'
      const deleteNotificationsQuery =
        "DELETE FROM notifications WHERE agenda_id = ?";
      const notificationsValues = [id];

      connectDB.query(
        deleteNotificationsQuery,
        notificationsValues,
        (error, results, fields) => {
          if (error) {
            // Si hay un error, hacer rollback y manejar el error
            connectDB.rollback(() => {
              return res.status(400).json({
                message: "Error deleting notifications",
                error: error.message,
              });
            });
          }

          // Continuar con la eliminación en la tabla 'agenda'
          const deleteAgendaQuery = "DELETE FROM agenda WHERE id = ?";
          const agendaValues = [id];

          connectDB.query(
            deleteAgendaQuery,
            agendaValues,
            (error, results, fields) => {
              if (error) {
                // Si hay un error, hacer rollback y manejar el error
                connectDB.rollback(() => {
                  return res.status(400).json({
                    message: "Error deleting agenda",
                    error: error.message,
                  });
                });
              }

              // Confirmar la transacción si todo ha ido bien
              connectDB.commit((err) => {
                if (err) {
                  // Si hay un error en el commit, hacer rollback y manejar el error
                  connectDB.rollback(() => {
                    return res.status(500).json({
                      message: "Error committing transaction",
                      error: err.message,
                    });
                  });
                }

                return res.status(200).json({ message: "Delete success" });
              });
            }
          );
        }
      );
    });
  });

/////////////////////////////////////////

exports.getMedicalAppointments = async (req, res, next) => {
  const medical_id = req.params.medical_id;
  const query = "SELECT * FROM agenda WHERE medical_id = ?";
  const values = [medical_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error getting agenda", error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Agenda not found" });
    }
    const agenda = results;
    return res.status(200).json({ message: "Get agenda success", agenda });
  });
};

//////////////////////////////////////

exports.ConfirmationAgendaById = async (req, res, next) => {
  const appointmentId = req.params.appointmentId;
  const newState = req.body.state; // Assurez-vous que votre requête inclut le nouvel état

  // Votre requête SQL pour mettre à jour l'état du rendez-vous
  const query = "UPDATE agenda SET state = ? WHERE id = ?";
  const values = [newState, appointmentId];

  connectDB.query(query, values, (error, results) => {
    if (error) {
      return res.status(400).json({
        message: "Error updating appointment state",
        error: error.message,
      });
    }
    return res
      .status(200)
      .json({ message: "Update appointment state success", results });
  });
};
