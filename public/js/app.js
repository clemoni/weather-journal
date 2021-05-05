const alertContainer = getByClass("message");

const submitBtn = getByClass("add-log__submit");

const insertAlertContainer = insertAlert(alertContainer);

const formHandler = (form) => {
  const response = Object.entries(form)
    .map((element) => {
      const { name, value } = element[1];
      return errorMessage(isUndefined(value))(`${name} field is missing`);
    })
    .filter((message) => message)
    .map((message) => insertAlertContainer(alertDanger)(message));
  return response.length;
};

const getWeatherData = async (url) => {
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData;
};

const dispatchWeatherData = (result, city, feelings) => {
  if (result.code === 200) {
    const { code, ...weather } = result;
    const newLog = { city, weather, feelings };
    return newLog;
  } else {
    insertAlertContainer(alertDanger)(result.message);
  }
};

const postWeatherData = async (url, newLog) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newLog),
  });
  return response.json();
};

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  alertContainer.innerHTML = "";
  alertContainer.style.display = "none";

  const getIdValue = getInputValue(getById);

  const form = ["city", "feelings"].map((item) => getIdValue(item));

  const resForm = formHandler(form);
  if (resForm === 0) {
    const { value: city } = form[0];
    const { value: feelings } = form[1];

    const url = `/weather/${city}`;

    getWeatherData(url)
      .then((result) => dispatchWeatherData(result, city, feelings))
      .then((newLog) => {
        return newLog
          ? postWeatherData("/logs", newLog).then((data) => {
              console.log(data);
            })
          : switchElementDisplay(alertContainer)(switchDisplay);
      });
  } else {
    switchElementDisplay(alertContainer)(switchDisplay);
  }
});
