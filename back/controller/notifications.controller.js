const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl:true
});

exports.getNotifications = async (req, res, next) => {
  const query = "SELECT * FROM clinic.notifications";

  pool.query(query, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Notificaciones no encontradas",
        error: error.message,
      });
    }
    const notifications = results.rows;

    return res.status(200).json(notifications);
  });
};

exports.getNotificationsById = async (req, res, next) => {
  const patient_id = req.params.patient_id;
  const query = "SELECT * FROM clinic.notifications WHERE patient_id = $1";
  const values = [patient_id];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Error cargando notificaciones",
        error: error.message,
      });
    }
    const notifications = results.rows;
    return res
      .status(200)
      .json({ message: "Notificaciones obtenidas con exito", notifications });
  });
};

exports.getNotificationsByIdForEmployee = async (req, res, next) => {
  const medical_id = req.params.medical_id;
  const query = "SELECT * FROM clinic.notifications WHERE medical_id = $1";
  const values = [medical_id];

  pool.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Notificaciones no encontradas",
        error: error.message,
      });
    }
    const notifications = results.rows;
    return res
      .status(200)
      .json({ message: "Notificaciones obtenidas con exito", notifications });
  });
};

exports.stateNotifications = async (req, res, next) => {
  const notificationsId = req.params.notificationsId;
  const newState = req.body.state;

  const query = "UPDATE clinic.notifications SET state = $1 WHERE id = $2";
  const values = [newState, notificationsId];

  pool.query(query, values, (error, results) => {
    if (error) {
      return res.status(400).json({
        message: "Error actualizando estado de notificacion",
        error: error.message,
      });
    }

    return res.status(200).json({
      message: "Estado de notificacion actualizada con exito",
      results: results.rows,
    });
  });
};

exports.deleteNotifications = async (req, res, next) => {
  const id = req.params.id;
  const query = "DELETE FROM clinic.notifications WHERE id= $1";
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
