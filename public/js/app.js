const messageContainer = getByClass("message");
const submitBtn = getByClass("add-log__submit");

const formHandler = (form) => {
  const response = Object.entries(form)
    .map((element) => {
      const { name, value } = element[1];
      return errorMessage(isUndefined(value))(`${name} field is missing`);
    })
    .filter((message) => message)
    .map((message) => alertDanger(message))
    .map((alertMessage) => messageContainer.appendChild(alertMessage));
  return response.length;
};

const getWeatherData = async (url) => {
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData;
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  messageContainer.innerHTML = "";
  messageContainer.style.display = "none";

  const getIdValue = getInputValue(getById);

  const form = ["city", "feelings"].map((item) => getIdValue(item));

  const resForm = formHandler(form);
  if (resForm === 0) {
    const { value: city } = form[0];

    const url = `/weather/${city}`;

    getWeatherData(url).then((result) => console.log(result));
  } else {
    messageContainer.style.display = "block";
  }
  // new asumc function

  //   console.log(resForm);
  // .then((response) => {
  //   if (response.length === 0) {
  //
  //   } else {
  //     messageContainer.style.display = "block";
  //   }
  // })
  // .catch((err) => console.log(err));
});
