const messageContainer = getByClass("message");
const submitBtn = getByClass("add-log__submit");

const formHandler = async (form) => {
  const response = await Object.entries(form)
    .map((element) => {
      const { name, value } = element[1];
      return errorMessage(isUndefined(value))(`${name} field is missing`);
    })
    .filter((message) => message)
    .map((message) => alertDanger(message))
    .map((alertMessage) => messageContainer.appendChild(alertMessage));
  return response;
};
const obj = {
  key: "6daef4f9504a9ac32da1e7284323fd5a",
  city: "London",
  url: `http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.key}`,
  getData: async function () {
    console.log(this.url);
    // const response = await fetch(this.url);
    // const responseData = await response.json();
    // console.log(responseData.weather[0]);
  },
};
const getWeather = async (city) => {
  //   const key = "6daef4f9504a9ac32da1e7284323fd5a";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${obj.city}&appid=${obj.key}`;
  const response = await fetch(url);
  const responseData = await response.json();
  console.log(responseData.weather[0]);
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  messageContainer.innerHTML = "";
  messageContainer.style.display = "none";

  const getIdValue = getInputValue(getById);

  const form = ["city", "feelings"].map((item) => getIdValue(item));
  console.log(form);
  formHandler(form)
    .then((response) => {
      if (response.length === 0) {
        const { value: city } = form[0];
        const response = obj.getData();

        // getWeather(city);
      } else {
        messageContainer.style.display = "block";
      }
    })
    .catch((err) => console.log(err));

  // get city temperature
  //   const { value: city } = form[0];
  //   console.log(city);
  //   const newRequest = Object.create(weather_api);
  //   newRequest.city = form;
  //   add entry

  // refresg entries log
});
