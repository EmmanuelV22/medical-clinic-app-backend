const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connectDB = require("../server");
const nodemailer = require("nodemailer");

/*************************************************************
 * ********** AUTH EMPLOYEES *************************************
 **********************************************************/

exports.getEmployeeById = async (req, res, next) => {
  const id = req.params.id; 

  const query = "SELECT * FROM employees WHERE id = ?";
  const values = [id];

  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error obteniendo paciente", error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    const employee = results[0];
    return res.status(200).json({ employee });
  });
};

////////////////////////////////////////////////

exports.getAllEmployees = (req, res, next) => {
  const query = "SELECT * FROM employees"; 

  connectDB.query(query, (error, results, fields) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Empleado no encontrado", error: error.message });
      return;
    }

    res.status(200).json(results); 
  });
};

////////////////////////////////////////////////////////////

exports.register = async (req, res, next) => {
  const {
    firstname,
    lastname,
    phone,
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

  if (!Array.isArray(days_off)) {
    return res.status(400).json({
      message: "Error creando empleado",
      error: "days_off is not an array",
    });
  }

  const daysOffArray = days_off.map((dayNumber, index) => dayNumber);
  const formattedBirthday = new Date(birthday).toISOString().split("T")[0];
  const createdAt = new Date().toISOString().split("T")[0];

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hasheando password" });
    }

    const query =
      "INSERT INTO employees (firstname, lastname, phone, sex, email, address, birthday, dni, specialist, personalID, createdAt, days_off, start_time, end_time, password ) VALUES (?, ?, ? , ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      firstname,
      lastname,
      phone,
      sex,
      email,
      address,
      formattedBirthday,
      dni,
      specialist,
      personalID,
      createdAt,
      JSON.stringify(daysOffArray),
      start_time,
      end_time,
      hash,
    ];


    connectDB.query(query, values, async (error, results, fields) => {
      if (error) {
        return res.status(400).json({
          message: "Error crando empleado",
          error: error.message,
        });
      }

     
      sendConfirmationEmail(email, firstname, lastname);

      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        {
          firstname,
          lastname,
          phone,
          sex,
          email,
          address,
          birthday,
          dni,
          specialist,
          personalID,
          days_off: daysOffArray,
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
        message: "Empleado creado con exito",
        employee: results.insertId,
      });
    });
  });
};

//////////////////////////////////////////////////

const sendConfirmationEmail = (userEmail, userFirstname, userLastname) => {
  const EMAIL = process.env.USERMAIL; 
  const PASSWORD = process.env.PASSMAIL; 

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
      console.log("Email enviado con exito");
    })
    .catch((error) => {
      console.error("Fallo al enviar email", error);
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
        .json({ message: "Error al iniciar sesion", error: error.message });
    }

    const employee = results[0];

    if (!employee) {
      return res.status(500).json({ message: "Datos incorrectos" });
    }

    bcrypt.compare(password, employee.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Contraseña invalida" });
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
          message: "Inicio de sesion exitoso",
          status: 201,
          employees: results,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Datos incorrectos" });
      }
    });
  });
};

/////////////////////////////////////////////////////////////////////////////////////

exports.update = async (req, res, next) => {
  const {
    firstname,
    lastname,
    phone,
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

  if (!Array.isArray(days_off)) {
    console.error("Error: days_off is not an array");
    return res.status(400).json({
      message: "Error actualizando datos del empleado",
      error: "days_off is not an array",
    });
  }



  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hasheando password" });
    }
    const query =
      "UPDATE employees SET firstname = ?, lastname = ?, phone = ?, personalID = ?, email = ?, specialist = ?, address = ?, updatedAt = ?, days_off = ?, start_time = ?, end_time = ?, password = ? WHERE id = ?";
    const values = [
      firstname,
      lastname,
      phone,
      personalID,
      email,
      specialist,
      address,
      updatedAt,
      JSON.stringify(days_off),
      start_time,
      end_time,
      hash,
      id,
    ];

    connectDB.query(query, values, (error, results, fields) => {
      if (error) {
        return res
          .status(400)
          .json({ message: "Error actualizando datos del empleado", error: error.message });
      }
    });

    return res.status(201).json({
      message: "Datos del empleado actualizado con exito",
      employee: id,
    });
  });
};

//////////////////////////////////////////////////////////////////////

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const query = "DELETE FROM employees WHERE id = ?";
  const values = [id];
  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error borrando empleado", error: error.message });
    }
    return res
      .status(200)
      .json({ message: "Empleado borrado con exito", id: results.insertId });
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
        .json({ message: "Paciente no encontrado", error: error.message });
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
        .json({ message: "Pacientes no encontrados", error: error.message });
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
    phone,
    sex,
    email,
    address,
    dni,
    birthday,
    password,
    blood_group,
  } = req.body;
  const createdAt = new Date().toISOString().split("T")[0];
  const birthdayDate = new Date(birthday);

  if (isNaN(birthdayDate.getTime())) {
    return res.status(400).json({ message: "Fecha invalida" });
  }

  const formattedBirthday = birthdayDate.toISOString().split("T")[0];

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hasehando password" });
    }

    const query =
      "INSERT INTO patients (firstname, lastname, phone, sex,  email, address, dni, birthday, password, blood_group, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      firstname,
      lastname,
      phone,
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
          .json({ message: "Error creando paciente", error: error.message });
      }

      sendConfirmationEmail(email, firstname, lastname);

      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        {
          firstname,
          lastname,
          phone,
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
        message: "Paciente creado exitosamente",
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
      return results
        .status(400)
        .json({ message: "Datos incorrectos, paciente no encontrado", error: error.message });
    }

    const patient = results[0];

    if (!patient) {
      return res.status(500).json({ message: "Datos incorrectos, paciente no encontrado" });
    }

    bcrypt.compare(password, patient.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Datos incorrectos" });
      }
      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          {
            id: patient.id,
            firstname: patient.firstname,
            lastname: patient.lastname,
            phone: patient.phone,
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
          message: "Inicio de sesion exitoso",
          patients: results,
          token: token,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Contraseña incorrecta", error });
      }
    });
  });
};

///////////////////////////////////////////////////

exports.updatePatient = async (req, res, next) => {
  const { firstname, lastname, phone, email, address, password, id } = req.body;
  const updatedAt = new Date();

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hasehando password" });
    }

    const query =
      "UPDATE patients SET firstname = ?, lastname = ?, phone=?, email = ?, address = ?, password = ?, updatedAt = ? WHERE id = ?";
    const values = [
      firstname,
      lastname,
      phone,
      email,
      address,
      hash,
      updatedAt,
      id,
    ];
    connectDB.query(query, values, (error, results, fields) => {
      if (error) {
        return res
          .status(400)
          .json({ message: "Error actualizando datos del paciente ", error: error.message });
      }

      return res
        .status(201)
        .json({ message: "Paciente actualizado correctamente", patient: id });
    });
  });
};

exports.deletePatient = async (req, res, next) => {
  const id = req.params.id;

  const query = "DELETE FROM patients WHERE id = ?";
  const values = [id];
  connectDB.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error eliminando paciente", error: error.message });
    }
    return res
      .status(201)
      .json({ message: "Paciente eliminado con exito", id: id });
  });
};

exports.updatePasswordPatient = async (req, res, next) => {
  const { password } = req.body;
  const dni = req.params.dni;


  const updatedAt = new Date();

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hasheando password" });
    }

    const query =
      "UPDATE patients SET password = ?, updatedAt = ? WHERE dni = ?";

    const values = [hash, updatedAt, dni];

    connectDB.query(query, values, (error, results, fields) => {
      if (error) {
        return res.status(400).json({
          message: "Error actualizando password",
          error: error.message,
        });
      }

      return res.status(201).json({
        message: "Password actualziado con exito",
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
          return res.status(500).json({
            status: "error",
            message: "Datos incorrectos",
            error: error.message,
          });
        }

        let transporter = nodemailer.createTransport(config);

        const query = `SELECT email , firstname FROM patients WHERE dni = ? `;
        const values = [dni];

        connectDB.query(query, values, (error, results) => {
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

          const userEmail = results[0].email;
          const userName = results[0].firstname;

          const htmlContent = `
            <html>
              <head>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
                <title>Clinic'app</title>
              </head>
              <body>
                <div>
                  <h1>Hola ${userName}! Olvidaste la contraseña de Clínic'app? :( </h1>
                  <a href="https://ibb.co/BPfRjjk"><img src="https://i.ibb.co/BPfRjjk/Cli-NIC-APP.png" alt="Cli-NIC-APP" border="0"></a>
                  <p>No te preocupes es rapido y sencillo!</p>
                  <p>Estimado paciente de Clinic'app: Para obtener una nueva contraseña debes hacer click en el siguiente boton que te llevara a una nueva pestaña donde podras ingresar tu nueva contraseña</p>
                  <button class="btn btn-primary rounded"><a href="http://localhost:3000/patients/update-password/${dni}/${temporalToken}">CLICK AQUI</a></button>
                  <p>Si este mail no es para ti ignoralo por favor</p>
                  <h2>Gracias por confiar en Clinic'app</h2>
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
              return res
                .status(200)
                .json({ message: "Email enviado correctamente" });
            })
            .catch((error) => {
              return res.status(500).json({
                status: "error",
                message: "Error enviando email",
                error: error.message,
              });
            });
        });
      });
    })
    .catch((error) => {
      return res.status(500).json({
        status: "error",
        message: "Datos incorrectos",
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
    const currentDate = new Date();
    const currentTimestamp = currentDate.getTime();

    const hashedDate = await bcrypt.hash(currentTimestamp.toString(), 10);

    const base64Token = Buffer.from(hashedDate).toString("base64");

    return {
      token: base64Token,
      expirationTimestamp: currentTimestamp + 60 * 1000,
    };
  } catch (error) {
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
          message: "Token invalido",
        });
      }

      next();
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Error validando token",
      error: error.message,
    });
  }
};

exports.sendNotificationEmail = (id, msg, medical_id, res) => {
  const EMAIL = process.env.USERMAIL; 
  const PASSWORD = process.env.PASSMAIL; 

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  const query = `SELECT email , firstname , lastname FROM patients WHERE id = ? `;
  const values = [id];

  const queryEmployee =
    "SELECT firstname, lastname, specialist FROM employees WHERE id = ?";
  const valuesEmployee = [medical_id];

  connectDB.query(queryEmployee, valuesEmployee, (error, results) => {
    if (error) {
      return res.status(500).json({
        status: "error",
        message: "Error en la consulta a la base de datos",
        error: error.message,
      });
    }
    const medicalname = results[0].firstname;
    const medicallastname = results[0].lastname;
    const specialist = results[0].specialist;

    connectDB.query(query, values, (error, results) => {
      if (error) {
        return res.status(500).json({
          status: "error",
          message: "Error en la consulta a la base de datos",
          error: error.message,
        });
      }

      const userEmail = results[0].email;
      const userName = results[0].firstname;
      const userLastName = results[0].lastname;

      const htmlContent = `
    <html>
      <head>
      <title>Clinic'app</title>
      </head>
      <body>
        <div>
          <h1>Nuevo mensaje de Clínic'app</h1>
          <a href="https://ibb.co/BPfRjjk"><img src="https://i.ibb.co/BPfRjjk/Cli-NIC-APP.png" alt="Cli-NIC-APP" border="0"></a>
          
          <p>Hola ${userName} ${userLastName}, tenemos el siguiente mensaje para ti del ${specialist} ${medicalname} ${medicallastname}: 
          ${msg} </p>
          <h2>Gracias por confiar en Clinic'app</h2>
        </div>
      </body>
    </html>
  `;

      let message = {
        from: EMAIL,
        to: userEmail,
        subject: "Nueva notificacion en tu Clinic App",
        html: htmlContent,
      };

      transporter
        .sendMail(message)
        .then(() => {
          console.log("Email enviado con exito");
        })
        .catch((error) => {
          console.error("Error enviando email", error);
        });
    });
  });
};
