const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/config.env" });
require("colors");

const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.listen(PORT, (err) => {
  try {
    console.log(`Server running on PORT: ${PORT}`.yellow.inverse);
  } catch (err) {
    console.log(`An error happned ... ${err.message}`.red.inverse);
  }
});
