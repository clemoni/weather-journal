// function
const designElement = (type) => (...attributes) => {
  const element = document.createElement(type);
  !attributes[0]
    ? null
    : attributes.map((att) => element.setAttribute(att[0], att[1]));
  return element;
};

const createContent = (text) => {
  const content = document.createTextNode(text);
  return content;
};

const compose = (f, g) => (type) => (attributes) => (text) => {
  const el = f(type)(attributes);
  el.appendChild(g(text));
  return el;
};

const insertElement = (element) => (...children) => {
  children.map((child) => element.appendChild(child));
  return element;
};

const createElementContent = compose(designElement, createContent);

const createArticle = (log) => {
  const title = createElementContent("h3")(["class", "log__date"])(
    `${log.city}`
  );
  const subTitle = createElementContent("span")(["class", "log__time"])(
    ` ${log.date.day} ${log.date.time}`
  );
  const completeTitle = insertElement(title)(subTitle);

  const imgArticle = designElement("img")(
    ["alt", "weather icon"],
    ["src", `http://openweathermap.org/img/wn/${log.weather.icon}@2x.png`],
    ["class", "weather__icon"]
  );
  const pweather = createElementContent("p")(["class", "weather__degree"])(
    `${log.weather.temp}C`
  );
  const divWeather = designElement("div")(["class", "log__weather"]);
  divWeatherBundle = insertElement(divWeather)(imgArticle, pweather);

  const feelingp = createElementContent("p")()(`${log.feelings}`);
  const feelingDiv = designElement("div")(["class", "log__feeling"]);
  const feelingBundle = insertElement(feelingDiv)(feelingp);

  const articleLog = designElement("article")(["class", "log"]);
  const articleLogBundle = insertElement(articleLog)(
    completeTitle,
    divWeatherBundle,
    feelingBundle
  );
  return articleLogBundle;
};

const logContainer = getByClass("display-log__container");

const printLogs = (container = logContainer) => (logs) => {
  logs.map((log) => insertElement(container)(createArticle(log)));
};

clearLogs = (container) => () => {
  container.innerHTML = "";
};
const clearContainerLogs = clearLogs(logContainer);
const printContainerLogs = printLogs(logContainer);
