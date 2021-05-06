/**
 * User func _createElement (see tool)
 * to create the div container for the alert
 * @param {function} _createElement
 * @param {function} type div
 * @returns
 */
const _createAlertContainer = (_createElement) => (type = "div") => (
  attribute
) => (typeAlert) => {
  const att = `${attribute[1]}${typeAlert}`;

  return _createElement(type)([attribute[0], att]);
};

const alertContainer = _createAlertContainer(_createElement)("div")([
  "class",
  `message__container message--`,
]);

// use createElementContent from tool to create the alert content
const alertMessage = createElementContent("p")(["class", "message__text"]);

/**
 * Compose the container function with message function
 * @param {function} container
 * @param {funtion} message
 * @param {string} tyepAlert danger, success, warning
 * @param {string} content
 * @returns
 */
const _PipeAlert = (container, message) => (typeAlert) => (content) => {
  const divContainer = container(typeAlert);
  const pMessage = message(content);
  divContainer.appendChild(pMessage);
  return divContainer;
};

const alert = _PipeAlert(alertContainer, alertMessage);

// partial currying pre-created alert type
const alertDanger = alert("danger");
const alertSuccess = alert("success");
const alertWarning = alert("warning");

/**
 * Infertion alert to DON by appendChild to DOM container
 * @param {*} domContainer
 * @returns
 */
const _insertAlertDom = (domContainer) => (alert) => (message) => {
  domContainer.appendChild(alert(message));
  return domContainer;
};

const _switchDisplay = (state) => {
  return state === "block" ? { state: "none" } : { state: "block" };
};

const _switchElementDisplay = (element) => (switchDisplay) => {
  element.style.display = switchDisplay(element.style.display).state;
};
