/** @module ezform */

import React from "react";
//import { useState } from "react";
const h = React.createElement;
const iClass = "custom-control-input";
const lClass = "custom-control-label";
const gClass = "form-group";
const cClass = "form-control";
const bClass = "btn btn-primary";

/*
const omit = (fields) => (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !fields.includes(key))
  );
*/

const FormGroup = ({ children, ...props }) =>
  h("div", { className: gClass, ...props }, ...children);

const TickBox = ({ type, name, id, label, value = label, ...props }) => {
  const className = `custom-control custom-${type} custom-control-inline`;
  return h(
    "div",
    { className, key: id },
    h("input", { id, name, className: iClass, type, value, ...props }),
    h("label", { htmlFor: id, className: lClass }, label)
  );
};

const TickBoxes = ({ type, name, id, key, label, options, ...p }) => {
  type = type || "checkbox";
  const xChildren = options.map((cProps, i) =>
    TickBox({ type, name, ...p, id: id + "_" + i, ...cProps })
  );

  return FormGroup({
    key,
    children: [label && h("label", null, label), h("div", null, ...xChildren)],
  });
};

const SelectBox = ({ name, key, label, options, ...props }) => {
  delete props.type;
  const xChildren = options.map(({ label, value = label, ...cProps }, i) => {
    const id = props.id + "_" + i;
    return h("option", { id, key: id, value, ...cProps }, label);
  });

  return FormGroup({
    key,
    children: [
      label && h("label", { htmlFor: props.id }, label),
      h("select", { name, ...props }, ...xChildren),
    ],
  });
};

const inferType = (name) => {
  name = name.toLowerCase();
  const types = ["number", "email", "textarea", "submit"];
  return types.find((v) => name.includes(v)) || "text";
};

const Text = ({ name, type = inferType(name), key, label, ...props }) => {
  //type = type || inferType(name);
  const children =
    type === "submit"
      ? [h("input", { type, name, ...props, value: label, className: bClass })]
      : [
          label && h("label", { htmlFor: props.id }, label),
          type === "textarea"
            ? //? h("textarea", { name, ...omit(["value"])(props) }, props.value)
              h("textarea", { name, ...props })
            : h("input", { type, name, ...props }),
        ];
  return FormGroup({ key, children });
};

/**
 * High level user input field inc optional label, multiple options etc
 * @param {Object} f field proerties
 * @param {string} [f.ezTitle] meaningful title for field
 * @param {string} [f.label = f.ezTitle] label element
 * @param {string} [f.placeholder = f.ezTitle] placeholder property
 * @param {string} [f.name] name property - defaults to ezTitle or placeholder snake-cased
 * @param {string} [f.prefix = ""] id prefix (eg. for use if >=2 forms on page)
 * @param {string} [f.id = f.prefix + f.name] id for input/textarea; number will be suffixed  for options' ids
 * @param {string} [f.type] html input type or "textarea"
 * @param {Object[]} [f.options] array of options' attributes for checkbox, radio and select
 * @param {Object} [f.values] container for a controlled form's input values
 * @param {Object} [f....props] other dom/vdom/react attributes
 * @return {Object} vnode with optional label
 *
 * @example Field({placeholder: "email"})
 *
 * @example Field({placeholder: "email", style:{color: red}})
 *
 * @example <Field placeholder="email"></Field>
 *
 */
const Field = ({
  ezTitle,
  label = ezTitle,
  placeholder = ezTitle,
  name = (ezTitle || placeholder).replace(/ /g, "_").toLowerCase(),
  prefix = "",
  id = prefix + name,
  key = id,
  options,
  values,
  ...props
}) => {
  if (values && !props.value) props.value = values[name] || "";
  const className = cClass;
  const commonProps = { ...props, label, key, id, name };
  if (!options) return Text({ ...commonProps, placeholder, className });
  return props.type === "select"
    ? SelectBox({ ...commonProps, options, className })
    : TickBoxes({ ...commonProps, options });
};

/**
 * Creates form element
 * @param {Object} f Form properties
 * @param {function} [f.onSubmit] callback will receive object containing values entered after submit suppressed
 * @param {function} [f.children] child elements (as in React for example)
 * @param {function} [f....props] form properties/attributes
 * @return {Object} vnode
 *
 * @example
 *
 *     <Form onSubmit={({email}) => console.log({email})}>
 *        <Field placeholder="email"> </Field>
 *     <Form>
 */

const Form = ({ onSubmit, children, ...props }) => {
  /*
  const [values, setValues] = useState({});
  const onChange = ({ target: { name, value } }) =>
    setValues((values) => {
      //console.log({ name, value });
      return { ...values, [name]: value };
    });
  const withState = (e) => React.cloneElement(e, { values: values });
  */
  if (onSubmit)
    props.onSubmit = (e) => {
      e.preventDefault();
      onSubmit(parseFormInputs(e.target));
    };

  return h("form", props, ...children);

  /*
  return h("form", { ...props, onChange, children: props.children.map(withState) });
  */
};

/** Expand field definition from shorthand: simple string, or array
 *
 * @param {string|array|Object} field shorthand field definition
 * @return {Object} field definition as an argument for Field()
 *
 */
const expandShorthand = (field) => {
  let f = field;
  if (typeof f === "string") return { ezTitle: f };
  if (Array.isArray(f)) f = { ezTitle: f[0], options: f[1] };
  if (Array.isArray(f.options))
    return {
      ...f,
      options: f.options.map((option) =>
        typeof option === "string" ? { label: option } : option
      ),
    };
  return f;
};

/** Parse form values, eg for onSubmit. Exposed for testing purposes.
 *
 * @param {Object} elements event.target
 * @return {Object} event target values in a convenient form
 *
 * @example
 *
 * example return value:
 *
 * {
 *  "inputs": {
 *   "text_input_with_value": "quick brown fox",
 *   "textarea": "quick brown fox jumped.\nYes he did.\n",
 *   "checkboxes": [
 *     "Apple"
 *   ],
 *   "radios": "Pear",
 *   "select_fruit": [
 *     "apple",
 *     "Pear"
 *   ]
 *  }
 * }
 */
const parseFormInputs = ({ elements }) => {
  const result = {};
  for (const { type, name, checked, selectedOptions, value } of elements) {
    if (type === "select-multiple") {
      result[name] = [];
      for (const { value } of selectedOptions) result[name].push(value);
    } else if (type === "checkbox") {
      if (!result[name]) result[name] = [];
      if (checked) result[name].push(value);
    } else if (type !== "submit" && (!(type === "radio") || checked)) {
      result[name] = value;
    }
  }
  return result;
};

export { Field, Form, expandShorthand, parseFormInputs };
