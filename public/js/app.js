getLog("/logs").then((data) => printContainerLogs(data));

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
          ? postLog("/logs", newLog).then((data) => {
              clearContainerLogs();
              printContainerLogs(data);
              ["city", "feelings"].map((item) => (getById(item).value = ""));
            })
          : switchElementDisplay(alertContainer)(switchDisplay);
      });
  } else {
    switchElementDisplay(alertContainer)(switchDisplay);
  }
});
