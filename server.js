const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: "./config/config.env" });
require("colors");

const PORT = process.env.PORT;

const app = express();

// set public directory
app.use(express.static(path.join(__dirname, "/public")));

app.use(cors());

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.listen(PORT, (err) => {
  try {
    console.log(`Server running on PORT: ${PORT}`.yellow.inverse);
  } catch (err) {
    console.log(`An error happned ... ${err.message}`.red.inverse);
  }
});
