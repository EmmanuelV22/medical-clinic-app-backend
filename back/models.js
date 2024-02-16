const bcrypt = require("bcryptjs");

function connectToDB(pool) {
  pool.connect((err) => {
    if (err) {
      console.error("Error connecting to database: ", err.stack);
      return;
    }

    console.log("Successfull connected to db: ", process.env.DB_NAME || "postgres");
    checkAndCreateDefaultEmployee(pool);
  });
}

function checkAndCreateDefaultEmployee(pool) {
  const query = "SELECT COUNT(*) AS total FROM clinic.employees";

  pool.query(query, (error, results) => {
    if (error) {
      console.error("Error checking employees count:", error.stack);
      return;
    }

    const totalEmployees = results.rows[0].total;
    if (totalEmployees === "0") {
      createDefaultAdmin(pool);
    } else {
      console.log("All ok: Default admin already exists");
    }
  });
}

function createDefaultAdmin(pool) {
  const password = "admin";

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hasheando password" });
    }

    const query =
      "INSERT INTO clinic.employees (firstname, lastname, phone, sex, email, address, birthday, dni, specialist, personal_id, days_off, start_time, end_time, password ) VALUES ('admin', 'adminLastname', 11111111, 'H', 'admin@gmail.com', 'admin 123','2024/01/01', '789345123', 'admin', 'admin', '[0,0]', 9, 17, '" +
      hash +
      "')";

    pool.query(query, (error, results, fields) => {
      if (error) {
        console.error("Error creating default admin:", error);
        return;
      }
      console.log("Default admin created successfully");
    });
  });
}

module.exports = { connectToDB, checkAndCreateDefaultEmployee };
