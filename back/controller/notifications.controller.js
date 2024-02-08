const pool = require("../server");

exports.getNotifications = async (req, res, next) => {
  const query = "SELECT * FROM notifications";

  pool.query(query, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Notificaciones no encontradas",
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

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error cargando notificaciones",
        error: error.message,
      });
    }
    const notifications = results;
    return res
      .status(200)
      .json({ message: "Notificaciones obtenidas con exito", notifications });
  });
};

exports.getNotificationsByIdForEmployee = async (req, res, next) => {
  const medical_id = req.params.medical_id;
  const query = "SELECT * FROM notifications WHERE medical_id = ?";
  const values = [medical_id];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Notificaciones no encontradas",
        error: error.message,
      });
    }
    const notifications = results;
    return res
      .status(200)
      .json({ message: "Notificaciones obtenidas con exito", notifications });
  });
};

exports.stateNotifications = async (req, res, next) => {
  const notificationsId = req.params.notificationsId;
  const newState = req.body.state;

  const query = "UPDATE notifications SET state = ? WHERE id = ?";
  const values = [newState, notificationsId];

  pool.query(query, values, (error, results) => {
    if (error) {
      return res.status(400).json({
        message: "Error actualizando estado de notificacion",
        error: error.message,
      });
    }

    return res
      .status(200)
      .json({
        message: "Estado de notificacion actualizada con exito",
        results,
      });
  });
};

exports.deleteNotifications = async (req, res, next) => {
  const id = req.params.id;
  const query = "DELETE FROM notifications WHERE id=?";
  const values = [id];
  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error eliminando notificacion",
        error: error.message,
      });
    }
    return res
      .status(200)
      .json({ message: "Notificacion eliminada con exito" });
  });
};
