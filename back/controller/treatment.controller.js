const connectDB = require("../server");

exports.createTreatment = async (req, res, next) => {
  const {
    patient_id,
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
    "INSERT INTO treatment (patient_id, resume , medicine , quantity , initial_date , exp_date, medical_id , patologies, surgey, finish_treatment) VALUES (?,?,?,?,?,?,?,?,?,?)";

  const values = [
    patient_id,
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

  connectDB.query(query, values, async (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error creating treatment",
        error: error.message,
      });
    }

    const notificationQuery =
      "INSERT INTO notifications (patient_id, medical_id, treatment_id, treatment_message) VALUES (?, ?, ?, ?)";

    const notificationValues = [
      patient_id,
      medical_id,
      results.insertId,
      `Nuevo tratamiento creado por el Dr. ${req.user.firstname} ${req.user.lastname}.`,
    ];

    try {
      await connectDB.query(notificationQuery, notificationValues);
      return res.status(201).json({
        message: "Treatment successfully created",
        treatment: results.insertId,
      });
    } catch (notificationError) {
      console.error("Error creating notification:", notificationError);
      return res.status(500).json({
        message: "Error creating treatment and notification",
        error: notificationError.message,
      });
    }
  });
};

exports.updateTreatment = async (req, res, next) => {
  const id = req.params.id;

  const {
    patient_id,
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

  const updatedAt = new Date();

  const query =
    "UPDATE treatment SET patient_id=?, resume=? , medicine=? , quantity=? , initial_date=? , exp_date=?, medical_id=? , patologies=?, surgey=? , finish_treatment=?, updatedAt=? WHERE id=?";

  const values = [
    patient_id,
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
      return res.status(400).json({
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
      return res.status(400).json({
        message: "Error loading patient treatments",
        error: error.message,
      });
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
    const treatment = results[0];
    return res
      .status(200)
      .json({ message: "Get treatment success", treatment });
  });
};

exports.getTreatments = async (req, res, next) => {
  const query = "SELECT * FROM treatment";

  connectDB.query(query, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error loading treatment", error: error.message });
    }
    return res.status(200).json(results);
  });
};
