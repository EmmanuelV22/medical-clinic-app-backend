const connectDB = require("../server");

exports.getNotifications = async (req, res, next) => {
  const query = "SELECT * FROM notifications";

  connectDB.query(query, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error notifications not found",
        error: error.message,
      });
    }

    return res.status(200).json(results);
  });
};

exports.getNotificationsById = async (req, res, next) => {
  const patient_id = req.params.patient_id;
  const query = "SELECT * FROM notifications WHERE patient_id = ?";
  const values = [patient_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error loading patient notifications",
        error: error.message,
      });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "notifications not found" });
    }
    const notifications = results;
    return res
      .status(200)
      .json({ message: "Get notifications success", notifications });
  });
};
