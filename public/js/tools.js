/**
 * Get DOM element by param 'type' (id, class) and 'name'
 * @param {string} type
 * @param {string} name
 * @returns element
 */
const _getElement = (type) => (name) => {
  return document.querySelector(`${type}${name}`);
};

/**
 * Get value of given input
 * @param {Element} input
 * @returns value of input
 */
const _getValue = (input) => {
  return input.value;
};

/**
 * Return value after reveive type (id, class) and name
 * @param {funtion} getElement
 * @param {funtion} getValue
 * @param {string} type
 * @param {string} name
 * @returns Object with input name of elenent and value assciated to it
 */
const _PipeInputValue = (getElement, getValue) => (type) => (name) => {
  return { name, value: getValue(getElement(type)(name)) };
};

/**
 * Test if value is undefined
 * @param {string} value
 * @returns bool
 */
const _isUndefined = (value) => {
  return !value || value === " ";
};

/**
 * Return message if test is valid
 * @param {function} test return bool
 * @returns string message
 */
const _errorMessage = (test) => (message) => {
  return test ? message : null;
};

const getById = _getElement("#");
const getByClass = _getElement(".");
const getInputValue = _PipeInputValue(_getElement, _getValue);
const getInputValueID = getInputValue("#");
const getInputValueClass = getInputValue(".");

const _createElement = (type) => (...attributes) => {
  const element = document.createElement(type);
  !attributes[0]
    ? null
    : attributes.map((att) => element.setAttribute(att[0], att[1]));
  return element;
};

const _createContent = (text) => {
  const content = document.createTextNode(text);
  return content;
};

const _PipeElementContent = (f, g) => (type) => (attributes) => (text) => {
  const el = f(type)(attributes);
  el.appendChild(g(text));
  return el;
};

const _insertElement = (element) => (...children) => {
  children.map((child) => element.appendChild(child));
  return element;
};

const createElementContent = _PipeElementContent(
  _createElement,
  _createContent
);

module.exports = {
  _getElement,
  _getValue,
  _PipeInputValue,
  _isUndefined,
  _errorMessage,
  getById,
  getByClass,
  getInputValue,
  getInputValueID,
  getInputValueClass,
};
