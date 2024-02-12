const { Client } = require("pg");
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "clinic",
  password: "1a2b3c",
  port: 5432,
});
client.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  // SQL Query

  //insert into Personas(ci,nom,edad) values (\'53393343\', \'Mateo Vargas\', 21);
  client.query("SELECT * FROM clinic.EMPLOYEES;", (err, resu) => {
    if (err) console.error("Error al ejecutar la consulta");
    else console.log("Query result: ", resu.rows);

    // Close the connection when done
    client
      .end()
      .then(() => {
        console.log("Connection to PostgreSQL closed");
      })
      .catch((err) => {
        console.error("Error closing connection", err);
      });
  });
});
