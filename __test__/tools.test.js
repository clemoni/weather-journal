const {
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
} = require("../public/js/tools");

// Test isUndefined
test("Is output undefined", () => {
  const element = _isUndefined(" ");
  expect(element).toBe(true);
});
test("Is output undefined", () => {
  const element = _isUndefined(null);
  expect(element).toBe(true);
});
test("Is output undefined", () => {
  const element = _isUndefined(undefined);
  expect(element).toBe(true);
});
test("Is output undefined", () => {
  const element = _isUndefined("something");
  expect(element).toBe(false);
});

// test errorMessage
test("Should generate a message because test true", () => {
  const message = _errorMessage(true)("Test was true, therefore message");
  expect(message).toBe("Test was true, therefore message");
});
test("Should NOT generate a message because test false", () => {
  const message = _errorMessage(_isUndefined("soemthing"))(
    "Test was true, therefore message"
  );
  expect(message).toBe(null);
});

test("Should generate a message because undefined true", () => {
  const message = _errorMessage(_isUndefined(" "))(
    "isUndefined true, therefore message triggered"
  );
  expect(message).toBe("isUndefined true, therefore message triggered");
});

test("get element #test", () => {
  document.body.innerHTML = '<div id="test">An element of the Dom</div>';
  require("../public/js/tools");
  const element = _getElement("#")("test");
  //   expect(element.tagName).toBe("DIV")
});
test("get element .class", () => {
  document.body.innerHTML = '<div class="test">An element of the Dom</div>';
  const element = _getElement(".")("test");
  expect(element.tagName).toBe("DIV");
});

test("get value of element", () => {
  document.body.innerHTML = '<input id="test" value="An element of the Dom">';
  //   require('../public/js/tools');
  const value = getInputValue("#")("test");
  expect(value).toEqual({ name: "test", value: "An element of the Dom" });
});
