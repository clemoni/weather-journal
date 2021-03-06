const express = require("express");
const cors = require("cors");
const path = require("path");
const getWeatherData = require("./controller/weather_api");

require("dotenv").config({ path: "./config/config.env" });
require("colors");

// store data variable
const projectData = [
  {
    date: { day: "6/4/2021", time: "15:18" },
    city: "Arras",
    weather: { icon: "02d", temp: 40.17 },
    feelings:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, doloremque.",
  },
];

const PORT = process.env.PORT || 8080;

const app = express();

// set public directory
app.use(express.static(path.join(__dirname, "/public")));

app.use(cors());

// create application/json parser
// express now includes urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// index page
app.get("/", (req, res) => {
  res.sendFile("/index.html");
});

// fetch data from OpenWeather
app.get("/weather/:city", getWeatherData);

//Post data
app.post("/logs", (req, res) => {
  const d = new Date();
  const date = {
    day: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
    time: `${d.getUTCHours()}:${d.getUTCMinutes()}`,
  };

  const { body } = req;
  const data = { date, ...body };
  projectData.unshift(data);

  res.json(projectData);
});

// get all data
app.get("/logs", (req, res) => {
  res.json(projectData);
});

app.listen(PORT, (err) => {
  try {
    console.log(
      `Server running on PORT: ${PORT} on mode ${process.env.NODE_ENV}`.yellow
        .inverse
    );
  } catch (err) {
    console.log(`An error happned ... ${err.message}`.red.inverse);
  }
});
