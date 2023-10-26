const connectDB = require("../server");

exports.createHistory = async (req, res, next) => {
  const { patient_id, description } = req.body;
  const date = new Date().toISOString().split("T")[0]; // Obtiene la fecha actual en formato 'YYYY-MM-DD'

  const query =
    "INSERT INTO history (patient_id, description, date) VALUES (?, ?, ?)";
  const values = [patient_id, description, date];

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
