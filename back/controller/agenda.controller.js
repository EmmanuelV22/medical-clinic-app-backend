const connectDB = require("../server");

/* patient_id will be used from store loged data*/


exports.getAppointmentPatients = async (req, res, next) => {

  const patient_id = req.params.patient_id

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

    const agenda = results;
    return res.status(200).json({ agenda });
  });
};

/////////////////////////////

exports.createAppointment = async (req, res, next) => {
  const { date, month, year, day, time, state, patient_id, medical_id } = req.body;
  const query =
    "INSERT INTO agenda (date, month, year, day, time, state, patient_id, medical_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [date, month, year, day, time, state, patient_id, medical_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error making agenda", error: error.message });
    }
    return res
      .status(201)
      .json({ message: "Agenda Success created", agenda: results.insertId });
  });
};

////////////////////////////////////

exports.deleteAppointment = async (req, res, next) => {
  const  id  = req.params.id;
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

/////////////////////////////////////////

exports.getMedicalAppointments = async (req, res, next) => {
  const  medical_id  = req.params.medical_id;
  const query = "SELECT * FROM agenda WHERE medical_id = ?";
  const values = [medical_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error getting agenda", error: error.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Agenda not found" });
    }
    const agenda = results[0];
    return res.status(200).json({ message: "Get agenda success" , agenda});
  });
};

//////////////////////////////////////

// exports.StateAgendaById = async (req, res, next) => {
//   const  id  = req.params.id;
//   const query = "UPDATE agenda SET state = 1 WHERE id = ?"; 
//   const values = [id];

//   connectDB.query(query, values, (error, results, fields) => {
//     if (error) {
//       return res
//         .status(400)
//         .json({ message: "Error updating agenda", error: error.message });
//     }
//     return res.status(200).json({ message: "Confirm success" });
//   });
// };

