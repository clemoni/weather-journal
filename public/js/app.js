getLog("/logs").then((data) => printContainerLogs(data));

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  alertContainerDom.innerHTML = "";
  alertContainerDom.style.display = "none";

  // const getIdValue = getInputValue(getById);

  const form = ["city", "feelings"].map((item) => getInputValueID(item));

  const resForm = formHandler(form);
  if (resForm === 0) {
    const { value: city } = form[0];
    const { value: feelings } = form[1];

    const url = `/weather/${city}`;

    getWeatherData(url)
      .then((result) => dispatchWeatherData(result, city, feelings))
      .then((newLog) => {
        return newLog
          ? postLog("/logs", newLog).then((data) => {
              clearContainerLogs();
              printContainerLogs(data);
              ["city", "feelings"].map((item) => (getById(item).value = ""));
              insertAlertDom(alertSuccess)("New log added");
              _switchElementDisplay(alertContainerDom)(_switchDisplay);
            })
          : _switchElementDisplay(alertContainerDom)(_switchDisplay);
      });
  } else {
    _switchElementDisplay(alertContainerDom)(_switchDisplay);
  }
});
