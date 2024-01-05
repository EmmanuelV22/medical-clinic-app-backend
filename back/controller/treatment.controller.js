const connectDB = require("../server");

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

    // Vérifiez si medicineData est défini avant d'utiliser map
    if (!Array.isArray(medicineData)) {
      console.error("Error: medicineData is not an array");
      return res.status(400).json({
        message: "Error creating treatment",
        error: "medicineData is not an array",
      });
    }

    // Créez un tableau d'objets avec les données des médicaments
    const medicineDataArray = medicineData.map(
      ({ medicine_name, quantity }) => ({
        medicine_name,
        quantity,
      })
    );

    // Convertissez le tableau d'objets en une chaîne JSON
    const medicineDataString = JSON.stringify(medicineDataArray);

    // Requête SQL pour insérer les données
    const query =
      "INSERT INTO treatment (patient_id, resume, initial_date, exp_date, medical_id, patologies, surgey, finish_treatment, medicine_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Valeurs à insérer dans la requête SQL
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

    // Affichez le contenu de medicine_data avant l'exécution de la requête
    console.log("Medicine Data Before Query:", medicineDataString);

    // Exécutez la requête SQL
    connectDB.query(
      query,
      values,
      async (createTreatmentError, createTreatmentResults) => {
        if (createTreatmentError) {
          console.error("Error creating treatment:", createTreatmentError);
          return res.status(400).json({
            message: "Error creating treatment",
            error: createTreatmentError.message,
          });
        }

        const treatmentId = createTreatmentResults.insertId;

        // Continuez avec la création de la notification ou d'autres actions si nécessaires
        const notificationQuery =
          "INSERT INTO notifications (patient_id, medical_id, treatment_id, treatment_message) VALUES (?, ?, ?, ?)";

        const notificationValues = [
          patient_id,
          medical_id,
          treatmentId,
          `Nuevo tratamiento creado por el Dr. ${req.user.firstname} ${req.user.lastname}.`,
        ];

        try {
          await connectDB.query(notificationQuery, notificationValues);

          return res.status(201).json({
            message: "Treatment successfully created",
            treatment: treatmentId,
          });
        } catch (error) {
          console.error("Error creating notification:", error);
          return res.status(500).json({
            message: "Error creating notification",
            error: error.message,
          });
        }
      }
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      message: "Unexpected error",
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
    console.error("Error: medicineData is not an array");
    return res.status(400).json({
      message: "Error updating treatment",
      error: "medicineData is not an array",
    });
  }

  // Créez un tableau d'objets avec les données des médicaments
  const medicineDataArray = medicineData.map(({ medicine_name, quantity }) => ({
    medicine_name,
    quantity,
  }));

  // Convertissez le tableau d'objets en une chaîne JSON
  const medicineDataString = JSON.stringify(medicineDataArray);

  const updatedAt = new Date();

  const query =
    "UPDATE treatment SET patient_id=?, resume=?, initial_date=?, exp_date=?, medical_id=?, patologies=?, surgey=?, finish_treatment=?, medicine_data=?, updatedAt=? WHERE id=?";

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
      .json({ message: "Treatment successfully updated", treatment: id });
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
