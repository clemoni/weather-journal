const fetch = require("node-fetch");
require("dotenv").config({ path: "./config/config.env" });
require("colors");

// Create Weather Api object
// key store in config > (config added to gitingore)
// I decided it was better to retrieve the WeatherApi data on the client side for better security
// The url needs to be compse with the setter setUrl otherwise does not parse const key and city
// getData() it's where fetch is triggered
const weatherApi = {
  key: null,
  city: "London",
  setUrl: function () {
    return `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&appid=${this.key}`;
  },
  getData: async function () {
    const url = this.setUrl();
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  },
};

const getValidData = (res) => {
  return {
    icon: res.weather[0].icon,
    temp: res.main.temp,
  };
};
const getErrorData = (res) => {
  return { message: res.message };
};

const getJsonRes = (res) => {
  return res.cod === 200 ? getValidData(res) : getErrorData(res);
};

const getWeatherData = async (req, res) => {
  const { city } = req.params;

  const key = process.env.API_KEY;

  const newReq = { ...weatherApi, city, key };

  try {
    const newRes = await newReq.getData();
    const newResJson = getJsonRes(newRes);
    res.json(newResJson);

    console.log(`Data retrieved with success`.rainbow); // include city not found
  } catch (err) {
    console.log(`${err.message}`.red.inverse);
  }
};

module.exports = getWeatherData;
