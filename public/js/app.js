// Fetch Logs stored on the server - one default element
// Later could create MongoDB
getLog("/logs").then((data) => printContainerLogs(data));

/**
 * Main Function
 * Get element - add event listener click
 */
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // clear the alert container of alert if any
  alertContainerDom.innerHTML = "";
  alertContainerDom.style.display = "none";

  // store each input {name, value} in array
  const form = ["city", "feelings"].map((item) => getInputValueID(item));

  // check if value from form are valid (not undefined)
  const resForm = formHandler(form);

  // If not mistake
  if (resForm === 0) {
    // extract value
    const { value: city } = form[0];
    const { value: feelings } = form[1];

    // create route to be call on the server
    const url = `/weather/${city}`;

    // fetch weather data from server side
    getWeatherData(url)
      .then((result) => dispatchWeatherData(result, city, feelings)) //dispach data if error > crate alert
      .then((newLog) => {
        // if newLog has been created (meaning no error)
        // post data and return all the logs
        // then clear the log container
        // then insert all the logs
        // later only insert the last element created
        return newLog
          ? postLog("/logs", newLog).then((data) => {
              clearContainerLogs();
              printContainerLogs(data);
              ["city", "feelings"].map((item) => (getById(item).value = ""));
              insertAlertDom(alertSuccess)("New log added"); // create success alert
              _switchElementDisplay(alertContainerDom)(_switchDisplay);
            })
          : _switchElementDisplay(alertContainerDom)(_switchDisplay);
      });
  } else {
    //Alert has been previously inserted then displayed
    _switchElementDisplay(alertContainerDom)(_switchDisplay);
  }
});
