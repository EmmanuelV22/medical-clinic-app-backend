const { sendNotificationEmail } = require("../auth/auth");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl:true
});
/* patient_id will be used from store loged data*/

exports.getAppointmentPatients = async (req, res, next) => {
  const patient_id = req.params.patient_id;

  const query = "SELECT * FROM clinic.agenda WHERE patient_id = $1";

  const values = [patient_id];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error , no hay resultados de la busqueda",
        error: error.message,
      });
    }

    const agenda = results.rows;
    return res
      .status(200)
      .json({ message: "Citas obtenidas con exito", patient_id, agenda });
  });
};

exports.getAppointmenByIdPatient = async (req, res, next) => {
  const patient_id = req.params.patient_id;

  const query = "SELECT * FROM clinic.agenda WHERE id = $1";

  const values = [patient_id];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error , no hay resultados de citas en la busqueda",
        error: error.message,
      });
    }
    const agenda = results.rows[0];
    return res.status(200).json({ message: "Cita obtenida con exito", agenda });
  });
};

exports.getAppointmentById = async (req, res, next) => {
  const id = req.params.id;

  const query = "SELECT * FROM clinic.agenda WHERE id = $1";

  const values = [id];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error, no hay resultados de la busqueda",
        error: error.message,
      });
    }

    const agenda = results.rows[0];
    return res.status(200).json({ message: "Cita obtenida con exito", agenda });
  });
};

/////////////////////////////////////////////
exports.getAllAppointment = async (req, res, next) => {
  const query = "SELECT * FROM clinic.agenda";

  pool.query(query, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error obteniendo todas la citas",
        error: error.message,
      });
    }
    const agenda = results.rows;
    return res
      .status(200)
      .json({ message: "Citas obtenidas con exito", agenda });
  });
};

/////////////////////////////

exports.createAppointment = async (req, res, next) => {
  const { date, month, year, day, time, medical_id } = req.body;
  const patient_id = req.params.id;
  const available = 0;
  const state = "confirmado";
  const query =
    "INSERT INTO clinic.agenda (date, month, year, day, time, state, patient_id, medical_id, available) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id";
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

  pool.query(query, values, async (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error creando cita", error: error.message });
    }

    const appointmentId = results.rows[0].id;

    const msg = `¡Turno confirmado para el dia ${date}/${month}/${year} , a las ${time} horas. 
    Te esperamos!`;

    sendNotificationEmail(patient_id, msg, medical_id, res);

    const querySpecialist = `SELECT firstname , lastname , specialist FROM clinic.employees WHERE id = $1 `;
    const valuesSpecialist = [medical_id];

    pool.query(querySpecialist, valuesSpecialist, (error, results) => {
      if (error) {
        return res.status(500).json({
          status: "error",
          message: "Error en la consulta a la base de datos",
          error: error.message,
        });
      }

      if (results.rows.length == 0) {
        return res.status(500).json({ message: "Datos incorrectos" });
      }

      const specialistType = results.rows[0].specialist;
      const medicalFirstName = results.rows[0].firstname;
      const medicalLastName = results.rows[0].lastname;

      const notificationQueryPatient =
        "INSERT INTO clinic.notifications (patient_id, medical_id, agenda_id, appointment_message_patient) VALUES ($1, $2, $3, $4) RETURNING id";

      const notificationValuesPatient = [
        patient_id,
        medical_id,
        appointmentId,
        `¡Turno confirmado con el ${specialistType} ${medicalFirstName} ${medicalLastName} para el dia ${date}/${month}/${year} a las ${time} horas!`,
      ];

      try {
        pool.query(notificationQueryPatient, notificationValuesPatient);
      } catch (notificationError) {
        return res.status(500).json({
          message: "Error creando cita",
          error: notificationError.message,
        });
      }
      const query2 = `SELECT firstname , lastname FROM clinic.patients WHERE id = $1 `;
      const values2 = [patient_id];

      pool.query(query2, values2, (error, results) => {
        if (error) {
          return res.status(500).json({
            status: "error",
            message: "Error en la consulta a la base de datos",
            error: error.message,
          });
        }

        if (results.length == 0) {
          return res.status(500).json({ message: "Datos incorrectos" });
        }

        const userFirstName = results.rows[0].firstname;
        const userLastName = results.rows[0].lastname;

        const doctorNotificationQuery =
          "INSERT INTO clinic.notifications (patient_id, medical_id, agenda_id, appointment_message_employee) VALUES ($1, $2, $3, $4)";

        const doctorNotificationValues = [
          patient_id,
          medical_id,
          appointmentId,
          `¡Nuevo turno agendado por el paciente ${userFirstName} ${userLastName} el dia ${date}/${month}/${year} a las ${time} horas!`,
        ];

        try {
          pool.query(doctorNotificationQuery, doctorNotificationValues);

          return res.status(201).json({
            message: "Cita creada con exito",
            appointment: appointmentId,
          });
        } catch (doctorNotificationError) {
          return res.status(500).json({
            message: "Error creando cita",
            error: doctorNotificationError.message,
          });
        }
      });
    });
  });
};

////////////////////////////////////

(exports.changeAppointment = async (req, res, next) => {
  const id = req.params.id;
  const { date, month, year, day, time, medical_id, patient_id } = req.body;
  const state = "confirmado";
  const updated_at = new Date();

  const query =
    "UPDATE clinic.agenda SET date= $1, month= $2, year= $3, day= $4, time= $5, state= $6, medical_id= $7, patient_id= $8, updated_at= $9 WHERE id= $10";

  const values = [
    date,
    month,
    year,
    day,
    time,
    state,
    medical_id,
    patient_id,
    updated_at,
    id,
  ];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error cambiando cita", error: error });
    }
    return res
      .status(200)
      .json({ message: "Cita cambiada con exito", appointment: id });
  });
}),
  ////////////////////////////////////

  (exports.deleteAppointment = async (req, res, next) => {
    const id = req.params.id;

    const client = await pool.connect();

    try {
      await client.query("BEGIN");

      const deleteNotificationsQuery =
        "DELETE FROM clinic.notifications WHERE agenda_id = $1";
      const notificationsValues = [id];

      await client.query(deleteNotificationsQuery, notificationsValues);

      const deleteAgendaQuery = "DELETE FROM clinic.agenda WHERE id = $1";
      const agendaValues = [id];

      await client.query(deleteAgendaQuery, agendaValues);

      await client.query("COMMIT");

      res.status(200).json({ message: "Eliminado con éxito" });
    } catch (error) {
      await client.query("ROLLBACK");
      res
        .status(400)
        .json({ message: "Error eliminando cita", error: error.message });
    } finally {
      client.release();
    }
  });

/////////////////////////////////////////

exports.getMedicalAppointments = async (req, res, next) => {
  const medical_id = req.params.medical_id;
  const query = "SELECT * FROM clinic.agenda WHERE medical_id = $1";
  const values = [medical_id];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error obteniendo agenda del especialista",
        error: error.message,
      });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Agenda no encontrada" });
    }
    const agenda = results.rows;
    return res
      .status(200)
      .json({ message: "Agenda obtenida con exito", agenda });
  });
};

//////////////////////////////////////

exports.ConfirmationAgendaById = async (req, res, next) => {
  const appointmentId = req.params.appointmentId;
  const newState = req.body.state;
  const query = "UPDATE clinic.agenda SET state = $1 WHERE id = $2";
  const values = [newState, appointmentId];

  pool.query(query, values, (error, results) => {
    if (error) {
      return res.status(400).json({
        message: "Error al actualizar el estado de la cita",
        error: error.message,
      });
    }
    return res
      .status(200)
      .json({
        message: "Estado de la cita actualizado con exito",
        results: results.rows[0],
      });
  });
};
