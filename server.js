const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });
require("colors");

const PORT = process.env.PORT;

const app = express();

// set public directory
app.use(express.static("/public"));

app.use(cors());

app.get("/weather", (req, res) => {
  res.send("ok");
});

app.listen(PORT, (err) => {
  try {
    console.log(`Server running on PORT: ${PORT}`.yellow.inverse);
  } catch (err) {
    console.log(`An error happned ... ${err.message}`.red.inverse);
  }
});
