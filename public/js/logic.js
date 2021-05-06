const alertContainerDom = getByClass("message"); // get Container Error DOM
const submitBtn = getByClass("add-log__submit"); // get button submit of form
// partial currying of  Container > appendChild > alert
const insertAlertDom = _insertAlertDom(alertContainerDom);

/**
 * Form validator
 * get elemnt from from the dom
 * test not undefined input, IF true create element alert-danger-message
 * @param {*} form
 * @returns array count if 0 no error
 */
const formHandler = (form) => {
  const response = Object.entries(form)
    .map((element) => {
      const { name, value } = element[1];
      // for each input > if undefined create error message return [ error message. error message]
      return _errorMessage(_isUndefined(value))(`${name} field is missing`);
    })
    .filter((message) => message) // filter error message array, keep only entry whit message (filter null)
    .map((message) => insertAlertDom(alertDanger)(message)); // for each error message create alert
  return response.length;
};

/**
 * Fetch weather by first pullign request from server side
 * @param {string} url - server url
 * @returns
 */
const getWeatherData = async (url) => {
  const response = await fetch(url);
  const responseData = await response.json();
  return responseData;
};

/**
 * Dispatch from retrieved data
 * code is fron the OpenWeather API
 * if not 200 error include city not found
 * of error triggered new error
 * if no error create object newLog
 * @param {*} result weather API
 * @param {*} city from form
 * @param {*} feelings form
 * @returns
 */
const dispatchWeatherData = (result, city, feelings) => {
  if (result.code === 200) {
    const { code, ...weather } = result;
    const newLog = { city, weather, feelings };
    return newLog;
  } else {
    insertAlertDom(alertDanger)(result.message);
  }
};

/**
 * Fech to server post request
 * @param {*} url
 * @param {*} newLog data created
 * @returns
 */
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

/**
 * Get all logs stored to insert then in the DOM
 * @param {*} url
 * @returns
 */
const getLog = async (url) => {
  const response = await fetch(url);
  return response.json();
};
