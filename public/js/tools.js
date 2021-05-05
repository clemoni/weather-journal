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
