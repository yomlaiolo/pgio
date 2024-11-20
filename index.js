// Add required packages
require("dotenv").config();
const express = require("express");
const app = express();

// Set up EJS
app.set("view engine", "ejs");

// Start listener
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started (http://localhost:3000/) !");
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM CACA ORDER BY PROD_ID";
  pool.query(sql, [], (err, result) => {
    let message = "";
    let model = {};
    if (err) {
      message = `Error - ${err.message}`;
    } else {
      message = "success";
      model = result.rows;
    }
    res.render("index", {
      message: message,
      model: model,
    });
  });
});

// Add database package and connection string (can remove ssl)
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  max: 2,
});
