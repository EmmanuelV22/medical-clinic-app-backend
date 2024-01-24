const connectDB = require("../server");

exports.createHistory = async (req, res, next) => {
  const { patient_id, medical_id, agenda_id, treatment_id, description } =
    req.body;
  const date = new Date().toISOString().split("T")[0]; 

  const query =
    "INSERT INTO history (patient_id, medical_id, agenda_id, treatment_id, description, date) VALUES (?, ?, ?, ?, ?, ?)";
  const values = [
    patient_id,
    medical_id,
    agenda_id,
    treatment_id,
    description,
    date,
  ];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error creando historia", error: error.message });
    }
    return res
      .status(201)
      .json({ message: "Historia creada con exito", history: results.insertId });
  });
};

exports.getHistories = (req, res, next) => {
  const query = "SELECT * from history";

  connectDB.query(query, (error, results, fields) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Historias no encontradas", error: error.message });
    }

    res.status(200).json(results);
  });
};

exports.getHistoryByPatient = async (req, res, next) => {
  const patient_id = req.params.id;
  const query = "SELECT * FROM history WHERE patient_id = ?";
  const values = [patient_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error historias no encontradas",
        error: error.message,
      });
    }
   
    const historic = results;
    return res.status(200).json({ message: "Historias obtenidas con exito", historic });
  });
};
