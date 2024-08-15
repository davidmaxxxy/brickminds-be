const express = require("express");
const app = express();
const connectToDatabase = require("./config/dbConnection");
const PORT = 5000;
const fs = require("fs");

app.listen(PORT, (req, res) => {
  console.log(`server running ${PORT}`);
});

app.get("/", (req, res) => {
  connectToDatabase.query("SELECT * FROM themes;", function (error, results) {
    if (error) {
      console.error("Error fetching users from the database: " + error.stack);
      return res.status(500).json({ error: "Failed to fetch users" });
    }

    // Send the fetched data as a response
    res.json(results);
  });
});
