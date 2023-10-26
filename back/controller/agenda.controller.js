const connectDB = require("../server");

exports.getAgendaPatient = async (req, res, next) => {
  const { patient_id } = req.params; // Je suppose que l'patient_id est dans les paramètres de l'URL

  const query = "SELECT * FROM agenda WHERE patient_id = ?";
  const values = [patient_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error fetching patient", error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "agenda not found" });
    }

    const agenda = results[0];
    return res.status(200).json({ agenda });
  });
};

/////////////////////////////

exports.createAgenda = async (req, res, next) => {
  const { date, description, patient_id, medical_id } = req.body;
  const query =
    "INSERT INTO agenda (date, description, patient_id, medical_id) VALUES (?, ?, ?, ?)";
  const values = [date, description, patient_id, medical_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error agenda", error: error.message });
    }
    return res
      .status(201)
      .json({ message: "Agenda Success", agenda: results.insertId });
  });
};

////////////////////////////////////

exports.deleteAgenda = async (req, res, next) => {
  const { id } = req.body;
  const query = "DELETE FROM agenda WHERE id = ?";
  const values = [id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error deleting agenda", error: error.message });
    }
    return res.status(200).json({ message: "Delete sucess" });
  });
};
