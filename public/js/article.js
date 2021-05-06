const createArticle = (log) => {
  const title = createElementContent("h3")(["class", "log__date"])(
    `${log.city}`
  );
  const subTitle = createElementContent("span")(["class", "log__time"])(
    ` ${log.date.day} ${log.date.time}`
  );
  const completeTitle = _insertElement(title)(subTitle);

  const imgArticle = _createElement("img")(
    ["alt", "weather icon"],
    ["src", `http://openweathermap.org/img/wn/${log.weather.icon}@2x.png`],
    ["class", "weather__icon"]
  );
  const pweather = createElementContent("p")(["class", "weather__degree"])(
    `${log.weather.temp}C`
  );
  const divWeather = _createElement("div")(["class", "log__weather"]);
  divWeatherBundle = _insertElement(divWeather)(imgArticle, pweather);

  const feelingp = createElementContent("p")()(`${log.feelings}`);
  const feelingDiv = _createElement("div")(["class", "log__feeling"]);
  const feelingBundle = _insertElement(feelingDiv)(feelingp);

  const articleLog = _createElement("article")(["class", "log"]);
  const articleLogBundle = _insertElement(articleLog)(
    completeTitle,
    divWeatherBundle,
    feelingBundle
  );
  return articleLogBundle;
};

const logContainer = getByClass("display-log__container");

const printLogs = (container = logContainer) => (logs) => {
  logs.map((log) => _insertElement(container)(createArticle(log)));
};

clearLogs = (container) => () => {
  container.innerHTML = "";
};
const clearContainerLogs = clearLogs(logContainer);
const printContainerLogs = printLogs(logContainer);
