const weather_api = {
  key: "6daef4f9504a9ac32da1e7284323fd5a",
  url: `http://api.openweathermap.org/data/2.5/weather?q=London&appid=${this.key}`,
  city: "cork",
  getData: async function () {
    const response = await fetch(this.url);
    const responseData = await response.json();
    return responseData;
  },
};
