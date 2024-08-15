const mysql = require("mysql");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "bernard",
  database: "lego_project_database",
});

dbConnection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as to lego_project_database ");
});


module.exports = dbConnection;
