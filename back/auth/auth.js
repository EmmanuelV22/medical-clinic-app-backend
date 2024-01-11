const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("../server");
const nodemailer = require("nodemailer");

/*************************************************************
 * ********** AUTH EMPLOYEES *************************************
 **********************************************************/

exports.getEmployeeById = async (req, res, next) => {
  const id = req.params.id; // Je suppose que l'ID est dans les paramètres de l'URL
  console.log("id from employee by id:", id);

  const query = "SELECT * FROM employees WHERE id = ?";
  const values = [id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error fetching patient", error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const employee = results[0];
    return res.status(200).json({ employee });
  });
};

////////////////////////////////////////////////

exports.getAllEmployees = (req, res, next) => {
  const query = "SELECT * FROM employees"; // Définis ta requête SQL ici

  connectDB.query(query, (error, results, fields) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error employees not found", error: error.message });
      return;
    }

    res.status(200).json(results); // Envoie les résultats en réponse
  });
};

////////////////////////////////////////////////////////////

exports.register = async (req, res, next) => {
  const {
    firstname,
    lastname,
    sex,
    email,
    address,
    birthday,
    dni,
    specialist,
    personalID,
    days_off,
    start_time,
    end_time,
    password,
  } = req.body;

  // Formate la fecha para la inserción de la base de datos (AAAA-MM-DD)
  const formattedBirthday = new Date(birthday).toISOString().split("T")[0];
  const createdAt = new Date().toISOString().split("T")[0];

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const query =
      "INSERT INTO employees (firstname, lastname, sex, email, address, birthday, dni, specialist, personalID, createdAt, days_off, start_time, end_time, password ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      firstname,
      lastname,
      sex,
      email,
      address,
      formattedBirthday,
      dni,
      specialist,
      personalID,
      createdAt,
      days_off,
      start_time,
      end_time,
      hash,
    ];
    console.log(values);
    connectDB.query(query, values, async (error, results, fields) => {
      if (error) {
        return res.status(400).json({
          message: "Error creating user from api auth",
          error: error.message,
        });
      }

      // Envoi de l'e-mail
      sendConfirmationEmail(email, firstname, lastname);

      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        {
          firstname,
          lastname,
          sex,
          email,
          address,
          birthday,
          dni,
          specialist,
          personalID,
          days_off,
          start_time,
          end_time,
          password,
        },
        process.env.jwtSecret,
        {
          expiresIn: maxAge,
        }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

      res.status(201).json({
        message: "Employee successfully created",
        employee: results.insertId,
      });
    });
  });
};

//////////////////////////////////////////////////

// Fonction pour envoyer l'e-mail de confirmation
const sendConfirmationEmail = (userEmail, userFirstname, userLastname) => {
  const EMAIL = process.env.USERMAIL; // Remplacez par votre adresse e-mail
  const PASSWORD = process.env.PASSMAIL; // Remplacez par votre mot de passe e-mail

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  const htmlContent = `
    <html>
      <head>
        <!-- Ajoutez des styles CSS si nécessaire -->
      </head>
      <body>
        <div>
          <h1>Bienvenido a Clínic'app</h1>
          <a href="https://ibb.co/BPfRjjk"><img src="https://i.ibb.co/BPfRjjk/Cli-NIC-APP.png" alt="Cli-NIC-APP" border="0"></a>
          <p>¡Te damos la bienvenida a nuestra clínica!</p>
          <p>Hola ${userFirstname} ${userLastname}, ahora que tenés tu cuenta vas a poder agendar turnos con nuestros médicos, ver los tratamientos, tu historial clínica y mucho más.</p>
          <p>Otra vez te damos la bienvenida =) </p>
        </div>
      </body>
    </html>
  `;

  let message = {
    from: EMAIL,
    to: userEmail,
    subject: "¡Cuenta clínic'app creada con éxito!",
    html: htmlContent,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("Email sent successfully");
    })
    .catch((error) => {
      console.error("Error sending email", error);
    });
};

///////////////////////////////////////////////////

exports.login = async (req, res, next) => {
  const { personalID, password } = req.body;
  const query = "SELECT * FROM employees WHERE personalID = ?";
  const values = [personalID];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error fetching employee", error: error.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Employee not found" });
    }

    const employee = results[0];
    console.log(employee);
    bcrypt.compare(password, employee.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          {
            id: employee.id,
            dni: employee.dni,
            email: employee.email,
            firstname: employee.firstname,
            lastname: employee.lastname,
            specialist: employee.specialist,
            address: employee.address,
            personalID: employee.personalID,
          },
          process.env.jwtSecret,
          {
            expiresIn: maxAge,
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        return res.status(201).json({
          message: "Employee successfully Logged in",
          employees: results,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Login not successful" });
      }
    });
  });
};

/////////////////////////////////////////////////////////////////////////////////////

exports.update = async (req, res, next) => {
  const {
    firstname,
    lastname,
    personalID,
    email,
    specialist,
    address,
    days_off,
    start_time,
    end_time,
    password,
    id,
  } = req.body;
  const updatedAt = new Date();
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }
    const query =
      "UPDATE employees SET firstname = ?, lastname = ?, personalID = ?, email = ?, specialist = ?, address = ?, updatedAt = ?, days_off = ?, start_time = ?, end_time = ?, password = ? WHERE id = ?";
    const values = [
      firstname,
      lastname,
      personalID,
      email,
      specialist,
      address,
      updatedAt,
      days_off,
      start_time,
      end_time,
      hash,
      id,
    ];

    connectDB.query(query, values, (error, results, fields) => {
      if (error) {
        console.error("Error executing query:", error);
        return res
          .status(400)
          .json({ message: "Error updating user", error: error.message });
      }
    });
    // Asegúrate de realizar un commit aquí si es necesario
    connectDB.commit((commitError) => {
      if (commitError) {
        console.error("Error committing transaction:", commitError);
        return res.status(400).json({
          message: "Error committing transaction",
          error: commitError.message,
        });
      }

      return res.status(201).json({
        message: "Employee successfully updated",
        employee: id,
      });
    });
  });
};

//////////////////////////////////////////////////////////////////////

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  console.log("Received DELETE request for ID:", id);
  const query = "DELETE FROM employees WHERE id = ?";
  const values = [id];
  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error delete", error: error.message });
    }
    return res
      .status(200)
      .json({ message: "Employee successfully deleted", id: results.insertId });
  });
};

/*************************************************************
 * ********** AUTH PATIENTS *************************************
 **********************************************************/

exports.getPatientById = async (req, res, next) => {
  const { id } = req.params; // Je suppose que l'ID est dans les paramètres de l'URL

  const query = "SELECT * FROM patients WHERE id = ?";
  const values = [id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error fetching patient", error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patient = results[0];
    return res.status(200).json({ patient });
  });
};

////////////////////////////////////////////////////////
exports.getAllPatients = async (req, res, next) => {
  const query = "SELECT * FROM patients";
  connectDB.query(query, (error, results, fields) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error, patients not found", error: error.message });
      return;
    }
    res.status(200).json({ results });
  });
};
//////////////////////////////////////////////////////////

exports.registerPatient = async (req, res, next) => {
  const {
    firstname,
    lastname,
    sex,
    email,
    address,
    dni,
    birthday,
    password,
    blood_group,
  } = req.body;
  const createdAt = new Date().toISOString().split("T")[0];
  // Convertir cadena a instancia de fecha
  const birthdayDate = new Date(birthday);

  // Compruebe si cumpleañosDate es una instancia de fecha válida
  if (isNaN(birthdayDate.getTime())) {
    return res.status(400).json({ message: "Birth date is not valid" });
  }

  // Formatee la fecha para la inserción de la base de datos (AAAA-MM-DD)
  const formattedBirthday = birthdayDate.toISOString().split("T")[0];

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const query =
      "INSERT INTO patients (firstname, lastname, sex,  email, address, dni, birthday, password, blood_group, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      firstname,
      lastname,
      sex,
      email,
      address,
      dni,
      formattedBirthday,
      hash,
      blood_group,
      createdAt,
    ];

    connectDB.query(query, values, (error, results, fields) => {
      if (error) {
        return res
          .status(400)
          .json({ message: "Error creating patient", error: error.message });
      }

      sendConfirmationEmail(email, firstname, lastname);

      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        {
          firstname,
          lastname,
          sex,
          email,
          address,
          dni,
          birthday,
          createdAt,
        },
        process.env.jwtSecret,
        {
          expiresIn: maxAge,
        }
      );

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

      res.status(201).json({
        message: "Patient successfully created",
        patient: results.insertId,
      });
    });
  });
};

///////////////////////////////////////////////

exports.loginPatient = async (req, res, next) => {
  const { dni, password } = req.body;

  const query = "SELECT * FROM patients WHERE dni = ?";
  const values = [dni];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error patient login", error: error.message });
    }
    if (results.length === 0) {
      return res
        .status(400)
        .json({ message: "Patient not found", error: error });
    }
    const patient = results[0];

    bcrypt.compare(password, patient.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Error comparing passwords" });
      }
      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          {
            id: patient.id,
            firstname: patient.firstname,
            lastname: patient.lastname,
            dni: patient.dni,
            email: patient.email,
            address: patient.address,
            birthday: patient.birthday,
            createdAt: patient.createdAt,
          },
          process.env.jwtSecret,
          {
            expiresIn: maxAge,
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        return res.status(201).json({
          message: "Patient successfully logged",
          patients: results,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Login not successful" });
      }
    });
  });
};

///////////////////////////////////////////////////

exports.updatePatient = async (req, res, next) => {
  const { firstname, lastname, email, address, password, id } = req.body;
  const updatedAt = new Date();

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const query =
      "UPDATE patients SET firstname = ?, lastname = ?, email = ?, address = ?, password = ?, updatedAt = ? WHERE id = ?";
    const values = [firstname, lastname, email, address, hash, updatedAt, id];
    connectDB.query(query, values, (error, results, fields) => {
      if (error) {
        return res
          .status(400)
          .json({ message: "Error Updating Patient ", error: error.message });
      }

      return res
        .status(201)
        .json({ message: "Patient successfully updated", patient: id });
    });
  });
};

exports.deletePatient = async (req, res, next) => {
  const id = req.params.id;
  console.log("Received DELETE request for ID:", id);

  const query = "DELETE FROM patients WHERE id = ?";
  const values = [id];
  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error deleting patient", error: error.message });
    }
    return res
      .status(201)
      .json({ message: "Patient successfully deleted", id: id });
  });
};

exports.updatePasswordPatient = async (req, res, next) => {
  const { password } = req.body;
  const dni = req.params.dni;
  // const token = req.params.token

  // validatePatientToken(dni , token)

  const updatedAt = new Date();

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const query =
      "UPDATE patients SET password = ?, updatedAt = ? WHERE dni = ?";

    const values = [hash, updatedAt, dni];

    connectDB.query(query, values, (error, results, fields) => {
      if (error) {
        return res.status(400).json({
          message: "Error Updating Patient Password ",
          error: error.message,
        });
      }

      return res.status(201).json({
        message: "Patient Password successfully updated",
        patient: dni,
      });
    });
  });
};

const changePasswordEmail = (dni, res) => {
  const EMAIL = process.env.USERMAIL;
  const PASSWORD = process.env.PASSMAIL;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  const query2 = `UPDATE patients SET temporalToken = ?  WHERE dni = ? `;
  generateToken()
    .then((result) => {
      let temporalToken = result.token;
      const values2 = [temporalToken, dni];

      connectDB.query(query2, values2, (error, results) => {
        if (error) {
          console.error("Error en la modificacion del nuevo token", error);
          return res.status(500).json({
            status: "error",
            message: "Error en la modificacion del nuevo token",
            error: error.message,
          });
        }

        let transporter = nodemailer.createTransport(config);

        const query = `SELECT email , firstname FROM patients WHERE dni = ? `;
        const values = [dni];

        connectDB.query(query, values, (error, results) => {
          if (error) {
            console.error("Error en la consulta a la base de datos", error);
            return res.status(500).json({
              status: "error",
              message: "Error en la consulta a la base de datos",
              error: error.message,
            });
          }

          const userEmail = results[0].email;
          const userName = results[0].firstname;

          const htmlContent = `
            <html>
              <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
              </head>
              <body>
                <div>
                  <h1>Hola ${userName}! Olvidaste la contraseña de Clínic'app? :( </h1>
                  <a href="https://ibb.co/BPfRjjk"><img src="https://i.ibb.co/BPfRjjk/Cli-NIC-APP.png" alt="Cli-NIC-APP" border="0"></a>
                  <p>No te preocupes es rapido y sencillo!</p>
                  <p>Estimado paciente de Clinic'app: Para obtener una nueva contraseña debes hacer click en el siguiente boton que te llevara a una nueva pestaña donde podras ingresar tu nueva contraseña</p>
                  <button class="btn-primary"><a href="http://localhost:3000/patients/update-password/${dni}/${temporalToken}">CLICK AQUI</a></button>
                  <p>Si este mail no es para ti ignoralo por favor</p>
                  <p>Gracias por confiar en Clinic'app</p>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V" crossorigin="anonymous"></script>
              </body>
            </html>
          `;

          let message = {
            from: EMAIL,
            to: userEmail,
            subject: "Cambio de contraseña para usuario de Clinic'app",
            html: htmlContent,
          };

          transporter
            .sendMail(message)
            .then(() => {
              console.log("Email sent successfully");
              // Después de enviar el correo electrónico con éxito
              return res
                .status(200)
                .json({ status: "200", message: "Email sent successfully" });
            })
            .catch((error) => {
              console.error("Error sending email", error);
              // En caso de error al enviar el correo electrónico
              return res.status(500).json({
                status: "error",
                message: "Error sending email",
                error: error.message,
              });
            });
        });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      return res.status(500).json({
        status: "error",
        message: "Error generando o verificando el token",
        error: error.message,
      });
    });
};

exports.sendMailChangePassword = async (req, res, next) => {
  const dni = req.params.dni;
  changePasswordEmail(dni, res);
};

async function generateToken() {
  try {
    // Obtiene la fecha actual en milisegundos
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();

    // Genera un hash único basado en la fecha actual
    const hashedDate = await bcrypt.hash(currentTimestamp.toString(), 10);

    // Codifica el token resultante en base64
    const base64Token = Buffer.from(hashedDate).toString("base64");

    return {
      token: base64Token,
      expirationTimestamp: currentTimestamp + 60 * 1000,
    }; // 60 segundos de expiración como ejemplo
  } catch (error) {
    console.error("Error generando el token:", error);
    throw error;
  }
}

exports.validateTokenPatient = async (req, res, next) => {
  const dni = req.params.dni;
  const token = req.params.token;

  try {
    const query = `SELECT temporalToken FROM patients WHERE dni = ? `;
    const values = [dni];

    connectDB.query(query, values, (error, results) => {
      if (error) {
        console.error("Error en la consulta a la base de datos", error);
        return res.status(500).json({
          status: "error",
          message: "Error en la consulta a la base de datos",
          error: error.message,
        });
      }

      const temporalToken = results[0] ? results[0].temporalToken : null;

      if (token !== temporalToken) {
        return res.status(400).json({
          status: "error",
          message: "Invalid token",
        });
      }

      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
