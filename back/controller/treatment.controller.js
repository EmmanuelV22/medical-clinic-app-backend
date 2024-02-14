const { sendNotificationEmail } = require("../auth/auth");
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST_EXTERNAL,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

exports.createTreatment = async (req, res, next) => {
  try {
    const {
      patient_id,
      resume,
      medicineData,
      initial_date,
      exp_date,
      medical_id,
      patologies,
      surgey,
      finish_treatment,
    } = req.body;

    if (!Array.isArray(medicineData)) {
      return res.status(400).json({
        message: "Error creando tratamiento",
        error: "medicineData is not an array",
      });
    }

    const medicineDataArray = medicineData.map(
      ({ medicine_name, quantity }) => ({
        medicine_name,
        quantity,
      })
    );

    const medicineDataString = JSON.stringify(medicineDataArray);

    const query =
      "INSERT INTO clinic.treatment (patient_id, resume, initial_date, exp_date, medical_id, patologies, surgey, finish_treatment, medicine_data) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id";

    const values = [
      patient_id,
      resume,
      initial_date,
      exp_date,
      medical_id,
      patologies,
      surgey,
      finish_treatment,
      medicineDataString,
    ];

    pool.query(
      query,
      values,
      async (createTreatmentError, createTreatmentResults) => {
        if (createTreatmentError) {
          return res.status(400).json({
            message: "Error creando tratamiento",
            error: createTreatmentError.message,
          });
        }

        const query2 = `SELECT specialist FROM clinic.employees WHERE id = $1 `;
        const values2 = [medical_id];

        pool.query(query2, values2, (error, results) => {
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

          const msg = `Tienes un nuevo tratamiento, para tratar la siguiente patologia:  ${patologies}. Inicia el dia:  ${initial_date}, con el siguiente detalle:  ${resume} .  
        Saludos cordiales`;

          sendNotificationEmail(patient_id, msg, medical_id, res);

          const treatmentId = createTreatmentResults.rows[0].id;

          const notificationQuery =
            "INSERT INTO clinic.notifications (patient_id, medical_id, treatment_id, treatment_message) VALUES ($1, $2, $3, $4)";

          const notificationValues = [
            patient_id,
            medical_id,
            treatmentId,
            `Nuevo tratamiento creado por el ${specialistType} ${req.user.firstname} ${req.user.lastname} para el dia ${initial_date}.`,
          ];

          try {
            pool.query(notificationQuery, notificationValues);

            return res.status(201).json({
              message: "Tratamiento creado con exito",
              treatment: treatmentId,
            });
          } catch (error) {
            return res.status(500).json({
              message: "Error creando notificacion",
              error: error.message,
            });
          }
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Error creando tratamiento",
      error: error.message,
    });
  }
};

exports.updateTreatment = async (req, res, next) => {
  const id = req.params.id;
  const {
    patient_id,
    resume,
    medicineData,
    initial_date,
    exp_date,
    medical_id,
    patologies,
    surgey,
    finish_treatment,
  } = req.body;

  // Verificar si medicineData está definido
  if (!Array.isArray(medicineData)) {
    return res.status(400).json({
      message: "Error actualizando tratamiento",
      error: "medicineData is not an array",
    });
  }

  const medicineDataArray = medicineData.map(({ medicine_name, quantity }) => ({
    medicine_name,
    quantity,
  }));

  const medicineDataString = JSON.stringify(medicineDataArray);

  const updated_at = new Date();

  const query =
    "UPDATE clinic.treatment SET patient_id= $1, resume= $2, initial_date= $3, exp_date= $4, medical_id= $5, patologies= $6, surgey= $7, finish_treatment= $8, medicine_data= $9, updated_at= $10 WHERE id= $11";

  const values = [
    patient_id,
    resume,
    initial_date,
    exp_date,
    medical_id,
    patologies,
    surgey,
    finish_treatment,
    medicineDataString,
    updated_at,
    id,
  ];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error actualizando tratamiento",
        error: error.message,
      });
    }
    return res
      .status(200)
      .json({ message: "Tratamiento actualizado con exito", treatment: id });
  });
};

exports.getTreatmentsMedical = async (req, res, next) => {
  const medical_id = req.params.medical_id;
  const query = "SELECT * FROM clinic.treatment WHERE medical_id = $1";
  const values = [medical_id];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error cargando tratamientos",
        error: error.message,
      });
    }
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "Tratamientos no encontrados" });
    }
    const treatments = results.rows;
    return res
      .status(200)
      .json({ message: "Tratamientos obtenidos con exito", treatments });
  });
};

exports.getTreatmentsPatient = async (req, res, next) => {
  const patient_id = req.params.patient_id;
  const query = "SELECT * FROM clinic.treatment WHERE patient_id = $1";
  const values = [patient_id];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error obteniendo tratamientos",
        error: error.message,
      });
    }
    const treatments = results.rows;
    return res
      .status(200)
      .json({ message: "Tratamientos obtenidos con exito", treatments });
  });
};

exports.getTreatmentById = async (req, res, next) => {
  const id = req.params.id;
  const query = "SELECT * FROM clinic.treatment WHERE id = $1";
  const values = [id];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error obteniendo tratamiento",
        error: error.message,
      });
    }
    const treatment = results.rows[0];
    return res
      .status(200)
      .json({ message: "Tratamiento obtenido con exito", treatment });
  });
};

exports.getTreatments = async (req, res, next) => {
  const query = "SELECT * FROM clinic.treatment";

  pool.query(query, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error obteniendo tratamientos",
        error: error.message,
      });
    }
    return res.status(200).json({results: results.rows});
  });
};
