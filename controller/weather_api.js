const fetch = require("node-fetch");

const weather_api = {
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

module.exports = weather_api;
