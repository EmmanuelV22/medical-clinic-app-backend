const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database");

  createTables();
  checkAndCreateDefaultEmployee();

});

function createTables() {
  const tables = [
    `CREATE TABLE IF NOT EXISTS employees (
      id INT(10) NOT NULL AUTO_INCREMENT,
      firstname VARCHAR(50) NOT NULL,
      lastname VARCHAR(50) NOT NULL,
      address VARCHAR(50) NOT NULL,
      specialist VARCHAR(50) NOT NULL,
      dni INT(10) NOT NULL,
      password VARCHAR(150) NOT NULL,
      email VARCHAR(50) NOT NULL,
      createdAt DATE NULL DEFAULT NULL,
      updatedAt DATE NULL DEFAULT NULL,
      personalID VARCHAR(50) NOT NULL,
      start_time INT(10) NULL DEFAULT NULL,
      end_time INT(10) NULL DEFAULT NULL,
      days_off VARCHAR(255) NULL DEFAULT NULL,
      sex VARCHAR(50) NULL DEFAULT NULL,
      birthday DATE NULL DEFAULT NULL,
      phone BIGINT(19) NULL DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE INDEX id (id),
      UNIQUE INDEX dni (dni),
      UNIQUE INDEX email (email)
    )`,
    `CREATE TABLE IF NOT EXISTS patients (
      id INT(10) NOT NULL AUTO_INCREMENT,
      firstname VARCHAR(50) NOT NULL,
      lastname VARCHAR(50) NOT NULL,
      dni INT(10) NOT NULL,
      email VARCHAR(50) NOT NULL,
      password VARCHAR(150) NOT NULL,
      createdAt DATE NULL DEFAULT NULL,
      updatedAt DATE NULL DEFAULT NULL,
      blood_group VARCHAR(10) NOT NULL,
      birthday DATE NOT NULL,
      address VARCHAR(250) NULL DEFAULT NULL,
      temporalToken VARCHAR(700) NULL DEFAULT NULL,
      sex VARCHAR(50) NULL DEFAULT NULL,
      phone BIGINT(19) NULL DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE INDEX id (id),
      UNIQUE INDEX dni (dni),
      UNIQUE INDEX email (email)
    )`,
    `CREATE TABLE IF NOT EXISTS agenda (
      id INT(10) NOT NULL AUTO_INCREMENT,
      date VARCHAR(2) NOT NULL,
      month VARCHAR(2) NOT NULL,
      year VARCHAR(4) NOT NULL,
      day VARCHAR(1) NOT NULL,
      time VARCHAR(5) NOT NULL,
      available TINYINT(1) NULL DEFAULT '1',
      state ENUM('confirmado','cancelado','asistido','no asistido') NULL DEFAULT NULL,
      medical_id INT(10) NULL DEFAULT NULL,
      patient_id INT(10) NULL DEFAULT NULL,
      created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id),
      INDEX medical_id (medical_id),
      INDEX patient_id (patient_id),
      CONSTRAINT FK_agenda_medical_id FOREIGN KEY (medical_id) REFERENCES employees (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
      CONSTRAINT FK_agenda_patient_id FOREIGN KEY (patient_id) REFERENCES patients (id) ON UPDATE NO ACTION ON DELETE NO ACTION
    )`,
    `CREATE TABLE IF NOT EXISTS treatment (
      id INT(10) NOT NULL AUTO_INCREMENT,
      patient_id INT(10) NULL DEFAULT NULL,
      resume VARCHAR(1000) NULL DEFAULT '0',
      initial_date DATE NULL DEFAULT NULL,
      exp_date DATE NULL DEFAULT NULL,
      patologies VARCHAR(250) NULL DEFAULT '',
      surgey VARCHAR(500) NULL DEFAULT '',
      medical_id INT(10) NULL DEFAULT NULL,
      finish_treatment TINYINT(3) NULL DEFAULT '0',
      updatedAt DATE NULL DEFAULT NULL,
      medicine_data VARCHAR(1000) NULL DEFAULT NULL,
      PRIMARY KEY (id),
      INDEX patient_id (patient_id),
      INDEX FK_treatment_medical_id (medical_id),
      CONSTRAINT FK_treatment_medical_id FOREIGN KEY (medical_id) REFERENCES employees (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
      CONSTRAINT FK_treatment_patient_id FOREIGN KEY (patient_id) REFERENCES patients (id) ON UPDATE NO ACTION ON DELETE NO ACTION
    )`,
    `CREATE TABLE IF NOT EXISTS history (
      id INT(10) NOT NULL AUTO_INCREMENT,
      medical_id INT(10) NOT NULL,
      patient_id INT(10) NOT NULL,
      description TEXT NOT NULL,
      date DATE NOT NULL,
      treatment_id INT(10) NULL DEFAULT NULL,
      agenda_id INT(10) NULL DEFAULT NULL,
      PRIMARY KEY (id),
      INDEX FK_history_medical_id (medical_id),
      INDEX FK_history_patient_id (patient_id),
      INDEX FK_history_treatment_id (treatment_id),
      INDEX FK_history_agenda_id (agenda_id),
      CONSTRAINT FK_history_medical_id FOREIGN KEY (medical_id) REFERENCES employees (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
      CONSTRAINT FK_history_patient_id FOREIGN KEY (patient_id) REFERENCES patients (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
      CONSTRAINT FK_history_treatment_id FOREIGN KEY (treatment_id) REFERENCES treatment (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
      CONSTRAINT FK_history_agenda_id FOREIGN KEY (agenda_id) REFERENCES agenda (id) ON UPDATE NO ACTION ON DELETE NO ACTION
    )`,
    `CREATE TABLE IF NOT EXISTS notifications (
      id INT(10) NOT NULL AUTO_INCREMENT,
      patient_id INT(10) NOT NULL,
      medical_id INT(10) NOT NULL,
      treatment_message VARCHAR(500) NULL DEFAULT NULL,
      created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      state ENUM('no leído','leído') NULL DEFAULT 'no leído',
      appointment_message_patient VARCHAR(500) NULL DEFAULT NULL,
      treatment_id INT(10) NULL DEFAULT NULL,
      agenda_id INT(10) NULL DEFAULT NULL,
      appointment_message_employee VARCHAR(500) NULL DEFAULT NULL,
      PRIMARY KEY (id),
      INDEX FK_notifications_patient_id (patient_id),
      INDEX FK_notifications_medical_id (medical_id),
      INDEX FK_notifications_treatment_id (treatment_id),
      INDEX FK_notifications_agenda_id (agenda_id),
      CONSTRAINT FK_notifications_medical_id FOREIGN KEY (medical_id) REFERENCES employees (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
      CONSTRAINT FK_notifications_patient_id FOREIGN KEY (patient_id) REFERENCES patients (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
      CONSTRAINT FK_notifications_treatment_id FOREIGN KEY (treatment_id) REFERENCES treatment (id) ON UPDATE NO ACTION ON DELETE NO ACTION,
      CONSTRAINT FK_notifications_agenda_id FOREIGN KEY (agenda_id) REFERENCES agenda (id) ON UPDATE NO ACTION ON DELETE NO ACTION
    )`
  ];

  tables.forEach((table) => {
    connection.query(table, (err, results) => {
      if (err) {
        console.error("Error creating table: ", err);
      } else {
        console.log("Table created successfully or exist");
      }
    });
  });
}

function checkAndCreateDefaultEmployee() {
    const query = "SELECT COUNT(*) AS total FROM employees";
    connection.query(query, (error, results, fields) => {
      if (error) {
        console.error("Error checking employees count:", error);
        return;
      }
  
      const totalEmployees = results[0].total;
      if (totalEmployees === 0) {
        createDefaultAdmin();
      }else{
        console.log("All ok: Default admin allready exist")
      }
    });
  }

function createDefaultAdmin() {
    const password = "admin"
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res.status(500).json({ message: "Error hasheando password" });
        }
      const createdAt = new Date().toISOString().split("T")[0];
    
      const defaultAdmin = {
        firstname: "admin",
        lastname: "admin",
        phone: 11111111,
        sex: "H",
        email: "admin@admin.com",
        address: "admin 123",
        birthday: "2024/01/01",
        dni: "789456123",
        specialist: "admin",
        personalID: "admin",
        days_off: "[0,0]",
        createdAt: createdAt,
        start_time : 9,
        end_time: 17,
        password: hash
        };
    
      const query = "INSERT INTO employees SET ?";
      connection.query(query, defaultAdmin, (error, results, fields) => {
        if (error) {
          console.error("Error creating default admin:", error);
          return;
        }
        console.log("Default admin created successfully");
      });});
    }

module.exports = connection;
