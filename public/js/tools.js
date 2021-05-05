const getElement = (type) => (name) => {
  return document.querySelector(`${type}${name}`);
};

const getInputValue = (fn) => (name) => {
  return { name, value: fn(name).value };
};

const isUndefined = (value) => {
  return !value || value === " ";
};
const errorMessage = (test) => (message) => {
  return test ? message : null;
};

const getById = getElement("#");

const getByClass = getElement(".");

// Alert message
const createAlertMessage = (content) => {
  const message = document.createTextNode(content);
  const pMessage = document.createElement("p");
  pMessage.classList.add("message__text");
  pMessage.appendChild(message);
  return pMessage;
};

const createAlertContainer = (fn) => (type) => (content) => {
  const divMessage = document.createElement("div");
  divMessage.classList.add("message__container", `message--${type}`);
  divMessage.appendChild(fn(content));
  return divMessage;
};

const alertMessage = createAlertContainer(createAlertMessage);
const alertDanger = alertMessage("danger");
const alertSuccess = alertMessage("success");
const alertWarning = alertMessage("warning");

const insertAlert = (alertContainer) => (alert) => (message) => {
  alertContainer.appendChild(alert(message));
  return alertContainer;
};

const switchDisplay = (state) => {
  return state === "block" ? { state: "none" } : { state: "block" };
};

const switchElementDisplay = (element) => (switchDisplay) => {
  element.style.display = switchDisplay(element.style.display).state;
};
