const { sendNotificationEmail } = require("../auth/auth");
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
      "INSERT INTO treatment (patient_id, resume, initial_date, exp_date, medical_id, patologies, surgey, finish_treatment, medicine_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

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


    connectDB.query(
      query,
      values,
      async (createTreatmentError, createTreatmentResults) => {
        if (createTreatmentError) {
          return res.status(400).json({
            message: "Error creando tratamiento",
            error: createTreatmentError.message,
          });
        }

    const query2 = `SELECT specialist FROM employees WHERE id = ? `;
    const values2 = [medical_id];

    connectDB.query(query2, values2, (error, results) => {
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

      
      
      const specialistType = results[0].specialist;


        const msg =  `Tienes un nuevo tratamiento, para tratar la siguiente patologia:  ${patologies}. Inicia el dia:  ${initial_date}, con el siguiente detalle:  ${resume} .  
        Saludos cordiales`

         
        sendNotificationEmail(patient_id, msg, medical_id, res)

        const treatmentId = createTreatmentResults.insertId;

       
        const notificationQuery =
          "INSERT INTO notifications (patient_id, medical_id, treatment_id, treatment_message) VALUES (?, ?, ?, ?)";

        const notificationValues = [
          patient_id,
          medical_id,
          treatmentId,
          `Nuevo tratamiento creado por el ${specialistType} ${req.user.firstname} ${req.user.lastname} para el dia ${initial_date}.`,
        ];

        try {
          connectDB.query(notificationQuery, notificationValues);

          

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
      }
    );
  });
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
        .json({ message: "Error actualizando tratamiento", error: error.message });
    }
    return res
      .status(200)
      .json({ message: "Tratamiento actualizado con exito", treatment: id });
  });
};

exports.getTreatmentsMedical = async (req, res, next) => {
  const medical_id = req.params.medical_id;
  const query = "SELECT * FROM treatment WHERE medical_id = ?";
  const values = [medical_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error cargando tratamientos",
        error: error.message,
      });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Tratamientos no encontrados" });
    }
    const treatments = results;
    return res
      .status(200)
      .json({ message: "Tratamientos obtenidos con exito", treatments });
  });
};

exports.getTreatmentsPatient = async (req, res, next) => {
  const patient_id = req.params.patient_id;
  const query = "SELECT * FROM treatment WHERE patient_id = ?";
  const values = [patient_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error obteniendo tratamientos",
        error: error.message,
      });
    }
    const treatments = results;
    return res
      .status(200)
      .json({ message: "Tratamientos obtenidos con exito", treatments });
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
        .json({ message: "Error obteniendo tratamiento", error: error.message });
    }
    const treatment = results[0];
    return res
      .status(200)
      .json({ message: "Tratamiento obtenido con exito", treatment });
  });
};

exports.getTreatments = async (req, res, next) => {
  const query = "SELECT * FROM treatment";

  connectDB.query(query, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error obteniendo tratamientos", error: error.message });
    }
    return res.status(200).json(results);
  });
};
