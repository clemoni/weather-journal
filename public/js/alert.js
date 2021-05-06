const _createAlertContainer = (_createElement) => (type) => (attribute) => (
  typeAlert
) => {
  const att = `${attribute[1]}${typeAlert}`;

  return _createElement(type)([attribute[0], att]);
};

const alertContainer = _createAlertContainer(_createElement)("div")([
  "class",
  `message__container message--`,
]);

const alertMessage = createElementContent("p")(["class", "message__text"]);

const _PipeAlert = (container, message) => (typeAlert) => (content) => {
  const divContainer = container(typeAlert);
  const pMessage = message(content);
  divContainer.appendChild(pMessage);
  return divContainer;
};

const alert = _PipeAlert(alertContainer, alertMessage);

// const alertMessage = createAlertContainer(createAlertMessage);
const alertDanger = alert("danger");
const alertSuccess = alert("success");
const alertWarning = alert("warning");

const _insertAlertDom = (domContainer) => (alert) => (message) => {
  domContainer.appendChild(alert(message));
  return domContainer;
};

const _switchDisplay = (state) => {
  return state === "block" ? { state: "none" } : { state: "block" };
};

const _switchElementDisplay = (element) => (switchDisplay) => {
  console.log(element);
  element.style.display = switchDisplay(element.style.display).state;
};
