const weather_api = {
  key: "6daef4f9504a9ac32da1e728432ol3fd5a",
  city: "London",
  setUrl: function () {
    return `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.key}`;
  },
  getData: async function () {
    const url = this.setUrl();
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
  },
};
