const connectDB = require("../server");

exports.createHistory = async (req, res, next) => {
  const { patient_id, medical_id, agenda_id, treatment_id, description } =
    req.body;
  const date = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'

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
        .json({ message: "Error creating history", error: error.message });
    }
    return res
      .status(201)
      .json({ message: "History success created", history: results.insertId });
  });
};

exports.getHistories = (req, res, next) => {
  const query = "SELECT * from history";

  connectDB.query(query, (error, results, fields) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error histories not found", error: error.message });
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
        message: "Error loading patient historic",
        error: error.message,
      });
    }
   
    const historic = results;
    return res.status(200).json({ message: "Get historic success", historic });
  });
};
