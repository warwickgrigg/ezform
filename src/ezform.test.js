/* eslint-env jest, browser */
import {
  Form,
  Field,
  expandShorthand,
  parseFormInputs,
} from "../dist/ezform.js";
import h from "vhtml";
/* @jsx h */

beforeEach(() => {
  // setup a DOM element as a render target
  //container = document.createElement("div");
  // container *must* be attached to document so events work correctly.
  //document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  //unmountComponentAtNode(container);
  //container.remove();
  //container = null;
});

const tests = {
  "Simple text input": {
    name: "Simple text input",
    field: "Simple text input",
    result: (
      <div class="form-group" key="simple_text_input">
        <label for="simple_text_input">Simple text input</label>
        <input
          type="text"
          name="simple_text_input"
          id="simple_text_input"
          placeholder="Simple text input"
          class="form-control"
        />
      </div>
    ),
  },
  Textarea: {
    name: "Textarea",
    field: { ezTitle: "Textarea", rows: 5, defaultValue: "this is value data" },
    result: (
      <div class="form-group" key="textarea">
        <label for="textarea">Textarea</label>
        <textarea
          name="textarea"
          rows="5"
          defaultValue="this is value data"
          id="textarea"
          placeholder="Textarea"
          class="form-control"
        ></textarea>
      </div>
    ),
  },
  "Text input with value": {
    name: "Text input with value", // named with no label
    field: { name: "Text input with value", defaultValue: "text value" },
    result: (
      <div class="form-group" key="Text input with value">
        <input
          type="text"
          name="Text input with value"
          defaultValue="text value"
          id="Text input with value"
          class="form-control"
        />
      </div>
    ),
  },
  "Required input": {
    name: "Required input",
    field: { ezTitle: "Required input", required: true },
    result: (
      <div class="form-group" key="required_input">
        <label for="required_input">Required input</label>
        <input
          type="text"
          name="required_input"
          required="true"
          id="required_input"
          placeholder="Required input"
          class="form-control"
        />
      </div>
    ),
  },
  "Required email": {
    name: "Required email",
    field: { ezTitle: "Required email", required: true },
    result: (
      <div class="form-group" key="required_email">
        <label for="required_email">Required email</label>
        <input
          type="email"
          name="required_email"
          required="true"
          id="required_email"
          placeholder="Required email"
          class="form-control"
        />
      </div>
    ),
  },
  "Required number": {
    name: "Required number",
    field: { ezTitle: "Required number", required: true },
    result: (
      <div class="form-group" key="required_number">
        <label for="required_number">Required number</label>
        <input
          type="number"
          name="required_number"
          required="true"
          id="required_number"
          placeholder="Required number"
          class="form-control"
        />
      </div>
    ),
  },
  "Placeholder without label": {
    name: "Placeholder without label",
    field: { placeholder: ".. further information" },
    result: (
      <div class="form-group" key=".._further_information">
        <input
          type="text"
          name=".._further_information"
          id=".._further_information"
          placeholder=".. further information"
          class="form-control"
        />
      </div>
    ),
  },
  Checkboxes: {
    name: "Checkboxes",
    field: {
      ezTitle: "Checkboxes",
      options: [
        { label: "Apple", defaultChecked: true },
        "Pear",
        "Passion fruit",
      ],
    },
    result: (
      <div class="form-group" key="checkboxes">
        <label>Checkboxes</label>
        <div>
          <div
            class="custom-control custom-checkbox custom-control-inline"
            key="checkboxes_0"
          >
            <input
              id="checkboxes_0"
              name="checkboxes"
              class="custom-control-input"
              type="checkbox"
              value="Apple"
              defaultChecked="true"
            />
            <label for="checkboxes_0" class="custom-control-label">
              Apple
            </label>
          </div>
          <div
            class="custom-control custom-checkbox custom-control-inline"
            key="checkboxes_1"
          >
            <input
              id="checkboxes_1"
              name="checkboxes"
              class="custom-control-input"
              type="checkbox"
              value="Pear"
            />
            <label for="checkboxes_1" class="custom-control-label">
              Pear
            </label>
          </div>
          <div
            class="custom-control custom-checkbox custom-control-inline"
            key="checkboxes_2"
          >
            <input
              id="checkboxes_2"
              name="checkboxes"
              class="custom-control-input"
              type="checkbox"
              value="Passion fruit"
            />
            <label for="checkboxes_2" class="custom-control-label">
              Passion fruit
            </label>
          </div>
        </div>
      </div>
    ),
  },
  "Radio button choices": {
    name: "Radio button choices",
    field: {
      ezTitle: "Radio button choices",
      type: "radio",
      options: [
        "Apple",
        { label: "Pear", defaultChecked: true },
        "Passion fruit",
      ],
    },
    result: (
      <div class="form-group" key="radio_button_choices">
        <label>Radio button choices</label>
        <div>
          <div
            class="custom-control custom-radio custom-control-inline"
            key="radio_button_choices_0"
          >
            <input
              id="radio_button_choices_0"
              name="radio_button_choices"
              class="custom-control-input"
              type="radio"
              value="Apple"
            />
            <label for="radio_button_choices_0" class="custom-control-label">
              Apple
            </label>
          </div>
          <div
            class="custom-control custom-radio custom-control-inline"
            key="radio_button_choices_1"
          >
            <input
              id="radio_button_choices_1"
              name="radio_button_choices"
              class="custom-control-input"
              type="radio"
              value="Pear"
              defaultChecked="true"
            />
            <label for="radio_button_choices_1" class="custom-control-label">
              Pear
            </label>
          </div>
          <div
            class="custom-control custom-radio custom-control-inline"
            key="radio_button_choices_2"
          >
            <input
              id="radio_button_choices_2"
              name="radio_button_choices"
              class="custom-control-input"
              type="radio"
              value="Passion fruit"
            />
            <label for="radio_button_choices_2" class="custom-control-label">
              Passion fruit
            </label>
          </div>
        </div>
      </div>
    ),
  },
  "Select box": {
    name: "Select box",
    field: {
      type: "select",
      name: "Select fruit",
      multiple: true,
      options: [
        { label: "Apple", value: "apple", defaultSelected: true },
        "Pear",
        "Passion fruit",
      ],
    },
    result: (
      <div class="form-group" key="Select fruit">
        <select
          name="Select fruit"
          multiple="true"
          id="Select fruit"
          class="form-control"
        >
          <option
            id="Select fruit_0"
            key="Select fruit_0"
            value="apple"
            defaultSelected="true"
          >
            Apple
          </option>
          <option id="Select fruit_1" key="Select fruit_1" value="Pear">
            Pear
          </option>
          <option
            id="Select fruit_2"
            key="Select fruit_2"
            value="Passion fruit"
          >
            Passion fruit
          </option>
        </select>
      </div>
    ),
  },
};

Object.entries(tests).map(([name, { field, result }]) =>
  test(name, () => expect(Field(expandShorthand(field))).toBe(result))
);

const expectedFormMarkupOrig = (
  <form>
    <div class="form-group" key="simple_text_input">
      <label for="simple_text_input">Simple text input</label>
      <input
        type="text"
        name="simple_text_input"
        id="simple_text_input"
        placeholder="Simple text input"
        class="form-control"
      />
    </div>
    <div class="form-group" key="submit">
      <button name="submit" type="submit" class="btn btn-primary">
        Submit
      </button>
    </div>
  </form>
);

const expectedFormMarkup = (
  <form>
    <div class="form-group" key="simple_text_input">
      <label for="simple_text_input">Simple text input</label>
      <input
        type="text"
        name="simple_text_input"
        id="simple_text_input"
        placeholder="Simple text input"
        class="form-control"
      />
    </div>
    <div class="form-group" key="submit">
      <input
        type="submit"
        name="submit"
        id="submit"
        placeholder="Submit"
        class="btn btn-primary"
        value="Submit"
      />
    </div>
  </form>
);

(({ field }) =>
  test("Form markup", () =>
    expect(
      Form({
        children: [
          Field(expandShorthand(field)),
          Field(expandShorthand("Submit")),
        ],
      })
    ).toBe(expectedFormMarkup)))(tests["Simple text input"]);

const defaultToReal = (o) =>
  Object.fromEntries(
    Object.entries(o).map(([k, v]) => [
      k === "defaultValue"
        ? "value"
        : k === "defaultChecked"
        ? "checked"
        : k === "defaultSelected"
        ? "selected"
        : k,
      Array.isArray(v) ? v.map(defaultToReal) : v,
    ])
  );
test("Form submission", (done) => {
  const fieldNames = [
    "Text input with value",
    "Checkboxes",
    "Radio button choices",
    "Select box",
  ];
  const children = fieldNames
    .map((n) => tests[n])
    .map(({ field }) => expandShorthand(field))
    .map(defaultToReal)
    .map(Field);
  //const results = fieldNames.map(({ result }) => result);
  const f = Form({
    //onSubmit: (inputs) => console.log({ inputs }),
    children: [...children, Field(expandShorthand("Submit"))],
  });
  document.body.innerHTML = f;
  const form = document.querySelector("form");
  // workaround to test parseFormInputs because jsDom lacks onSubmit property
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = parseFormInputs(event.target);
    //console.log(JSON.stringify({ result }));
    expect(result).toStrictEqual({
      "Text input with value": "text value",
      checkboxes: ["Apple"],
      radio_button_choices: "Pear",
      "Select fruit": ["apple"],
    });
    done();
  });
  const button = document.querySelector("#submit");
  button.dispatchEvent(new window.MouseEvent("click"));
});

//submit.dispatchEvent(new window.MouseEvent("click"));

//to debug: node --inspect-brk node_modules/.bin/jest --runInBand
