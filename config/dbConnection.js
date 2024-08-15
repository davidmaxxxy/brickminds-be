const mysql = require("mysql");
require("dotenv").config();

const dbConnection = mysql.createConnection({
  host: process.env.DB_CONNECTION_ADDRESS,
  user: process.env.DB_CONNECTION_USER,
  password: process.env.DB_CONNECTION_PASSWORD,
  database: process.env.DB_CONNECTION_DATABASE_NAME,
});

dbConnection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as to lego_project_database ");
});

module.exports = dbConnection;
