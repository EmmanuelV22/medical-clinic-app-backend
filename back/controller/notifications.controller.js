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
    const notifications = results;
    return res
      .status(200)
      .json({ message: "Get notifications success", notifications });
  });
};

exports.getNotificationsByIdForEmployee = async (req, res, next) => {
  const medical_id = req.params.medical_id;
  const query = "SELECT * FROM notifications WHERE medical_id = ?";
  const values = [medical_id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error loading patient notifications",
        error: error.message,
      });
    }
    const notifications = results;
    return res
      .status(200)
      .json({ message: "Get notifications success", notifications });
  });
};

exports.stateNotifications = async (req, res, next) => {
  const notificationsId = req.params.notificationsId;
  const newState = req.body.state;

  const query = "UPDATE notifications SET state = ? WHERE id = ?";
  const values = [newState, notificationsId];

  connectDB.query(query, values, (error, results) => {
    if (error) {
      return res.status(400).json({
        message: "Error updating appointment state",
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({ message: "Update notification state success", results });
  });
};

exports.deleteNotifications = async (req, res, next) => {
  const id = req.params.id;
  const query = "DELETE FROM notifications WHERE id=?";
  const values = [id];
  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error deleting notification",
        error: error.message,
      });
    }
    return res.status(200).json({ message: "Delete notification success" });
  });
};
