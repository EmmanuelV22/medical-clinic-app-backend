const connectDB = require("../server");

exports.createTreatment = async (req, res, next) => {
  const {
    patient_id,
    confirmation,
    resume,
    medicine,
    quantity,
    initial_date,
    exp_date,
    medical_id,
    patologies,
    surgey,
    finish_treatment,
  } = req.body;

  const query =
    "INSERT INTO treatment (patient_id, confirmation , resume , medicine , quantity , initial_date , exp_date, medical_id , patologies, surgey, finish_treatment) VALUES (?,?,?,?,?,?,?,?,?,?,?)";

  const values = [
    patient_id,
    confirmation,
    resume,
    medicine,
    quantity,
    initial_date,
    exp_date,
    medical_id,
    patologies,
    surgey,
    finish_treatment,
  ];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error creating treatment", error: error.message });
    }
    return res
      .status(201)
      .json({
        message: "Treatment successful created",
        treatment: results.insterId,
      });
  });
};

exports.updateTreatment = async (req, res, next) => {
const id = req.params.id;

  const {
    patient_id,
    confirmation,
    resume,
    medicine,
    quantity,
    initial_date,
    exp_date,
    medical_id,
    patologies,
    surgey,
    finish_treatment,
  } = req.body;

const updatedAt = new Date()

  const query =
    "UPDATE treatment SET patient_id=?, confirmation=? , resume=? , medicine=? , quantity=? , initial_date=? , exp_date=?, medical_id=? , patologies=?, surgey=? , finish_treatment=?, updatedAt=? WHERE id=?";

  const values = [
    patient_id,
    confirmation,
    resume,
    medicine,
    quantity,
    initial_date,
    exp_date,
    medical_id,
    patologies,
    surgey,
    finish_treatment,
    updatedAt,
    id,
  ];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error updating treatment", error: error.message });
    }
    return res
      .status(200)
      .json({ message: "Treatment successful updated", treatment: id });
  });
};

exports.getTreatmentsMedical = async (req, res, next) => {
  const medical_id = req.params.medical_id;
  const query = "SELECT * FROM treatment WHERE medical_id = ?";
  const values = [medical_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({
          message: "Error loading medical treatments",
          error: error.message,
        });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Treatments not found" });
    }
    const treatments = results;
    return res
      .status(200)
      .json({ message: "Get treatments success", treatments });
  });
};

exports.getTreatmentsPatient = async (req, res, next) => {
  const patient_id = req.params.patient_id;
  const query = "SELECT * FROM treatment WHERE patient_id = ?";
  const values = [patient_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({
          message: "Error loading patient treatments",
          error: error.message,
        });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Treatments not found" });
    }
    const treatments = results;
    return res
      .status(200)
      .json({ message: "Get treatments success", treatments });
  });
};

exports.getTreatmentById = async (req, res, next) => {
  const id = req.params.id;
  const query = "SELECT * FROM treatment WHERE id = ?";
  const values = [id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error loading treatment", error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Treatment not found" });
    }
    const treatment = results;
    return res
      .status(200)
      .json({ message: "Get treatment success", treatment });
  });
};
