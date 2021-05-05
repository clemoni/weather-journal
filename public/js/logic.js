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

const postLog = async (url, newLog) => {
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

const getLog = async (url) => {
  const response = await fetch(url);
  return response.json();
};
