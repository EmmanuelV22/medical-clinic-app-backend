const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
exports.createHistory = async (req, res, next) => {
  const { patient_id, medical_id, agenda_id, treatment_id, description } =
    req.body;
  const date = new Date().toISOString().split("T")[0];

  const query =
    "INSERT INTO clinic.history (patient_id, medical_id, agenda_id, treatment_id, description, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
  const values = [
    patient_id,
    medical_id,
    agenda_id,
    treatment_id,
    description,
    date,
  ];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error creando historia", error: error.message });
    }
    return res
      .status(201)
      .json({
        message: "Historia creada con exito",
        history: results.rows[0].id,
      });
  });
};

exports.getHistories = (req, res, next) => {
  const query = "SELECT * from clinic.history";

  pool.query(query, (error, results, fields) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Historias no encontradas", error: error.message });
    }

    res.status(200).json({results: results.rows});
  });
};

exports.getHistoryByPatient = async (req, res, next) => {
  const patient_id = req.params.id;
  const query = "SELECT * FROM clinic.history WHERE patient_id = $1";
  const values = [patient_id];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error historias no encontradas",
        error: error.message,
      });
    }

    const historic = results.rows;
    return res
      .status(200)
      .json({ message: "Historias obtenidas con exito", historic });
  });
};
