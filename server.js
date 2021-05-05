const express = require("express");
const cors = require("cors");
const path = require("path");
const weather_api = require("./controller/weather_api");

require("dotenv").config({ path: "./config/config.env" });
require("colors");

const PORT = process.env.PORT || 8080;

const app = express();

// set public directory
app.use(express.static(path.join(__dirname, "/public")));

app.use(cors());

// create application/json parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

app.get("/weather/:city", async (req, res) => {
  const { city } = req.params;
  console.log(city);
  const key = process.env.API_KEY;
  const newReq = { ...weather_api, city, key };
  const newRes = await newReq.getData();
  console.log(newRes);
  const newResJson = {
    icon: newRes.weather[0].icon,
    temp: newRes.main.temp,
  };
  res.json(newResJson);
});

app.listen(PORT, (err) => {
  try {
    console.log(`Server running on PORT: ${PORT}`.yellow.inverse);
  } catch (err) {
    console.log(`An error happned ... ${err.message}`.red.inverse);
  }
});
