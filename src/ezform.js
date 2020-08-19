import React from "react";
//import { useState } from "react";
const h = React.createElement;
const iClass = "custom-control-input";
const lClass = "custom-control-label";
const gClass = "form-group";
const cClass = "form-control";
const bClass = "btn btn-primary";

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

const omit = (fields) => (obj) =>
  Object.fromEntries(
    Object.entries(obj).filter(([key]) => !fields.includes(key))
  );

const expandShorthand = (field) => {
  let f = field;
  if (typeof f === "string") return { ezTitle: f };
  if (Array.isArray(f)) f = { ezTitle: f[0], children: f[1] };
  if (Array.isArray(f.children))
    return {
      ...f,
      children: f.children.map((option) =>
        typeof option === "string" ? { label: option } : option
      ),
    };
  return f;
};

/**
 * @typedef ezFormFactory
 * @function
 * @param {function} h createElement function (eg. React.createElement)
 * @return {{Form: function(Object): Array<Array<T>| T>, push: function(Array<T>, T): Array<T>}} an object containing the functions to manage the queue
 */

/** @type {SharedLib.PriorityQueueFactory} */

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

const TickBoxes = ({ type, name, idP, key, label, children, ...props }) => {
  type = type || "checkbox";
  const xChildren = children.map((cProps, i) =>
    TickBox({ type, name, ...props, id: idP + name + "_" + i, ...cProps })
  );

  return FormGroup({
    key,
    children: [label && h("label", null, label), h("div", null, ...xChildren)],
  });
};

const SelectBox = ({ name, idP, key, label, children, ...props }) => {
  delete props.type;
  const xChildren = children.map(({ label, value = label, ...cProps }, i) => {
    const id = idP + name + "_" + i;
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
/** This is a description of the Text function. */
const Text = ({ name, type = inferType(name), key, label, ...props }) => {
  //type = type || inferType(name);
  const children =
    type === "submit"
      ? [h("input", { type, name, ...props, value: label, className: bClass })]
      : [
          label && h("label", { htmlFor: props.id }, label),
          type === "textarea"
            ? h("textarea", { name, ...omit(["value"])(props) }, props.value)
            : h("input", { type, name, ...props }),
        ];
  return FormGroup({ key, children });
};

/**
 * High level user input field inc optional label, multiple options etc
 * @function ezField~Field
 * @param {Object} f field proerties
 * @param {Object} [f._state] container for properties for intermediate values
 * @param {string} [f.ezTitle] meaningful title for field
 * @param {string} [f.type] html input type plus "select-multiple"
 * @param {string[]} [f.options] options for checkbox, radio, select and select-multiple types
 * @param {string} [f.label = f.ezTitle] label element
 * @param {string} [f.placeholder = f.ezTitle] placeholder property
 * @param {string} [f.name] name property - defaults to ezTitle or placeholder snake-cased
 * @return {Object} vnode with optional label
 *
 * @example Field({placeholder: email})
 *
 */
const Field = ({
  ezTitle,
  _state,
  label = ezTitle,
  placeholder = ezTitle,
  name = (ezTitle || placeholder).replace(/ /g, "_").toLowerCase(),
  idP = "",
  id = idP + name,
  key = id,
  children,
  ...props
}) => {
  if (_state && !props.value) props.value = _state[name] || "";
  const className = cClass;
  const derivedProps = { ...props, label, key, id, name, idP };
  if (children) {
    return props.type === "select"
      ? SelectBox({ ...derivedProps, children, className })
      : TickBoxes({ ...derivedProps, children });
  } else {
    return Text({ ...derivedProps, placeholder, className });
  }
};

/**
 * Creates form element
 * @param {function} onSubmit callback
 * @return {string} A good string
 *
 * @example
 *
 *     <Form onSubmit={({email}) => console.log({email})}>
 *        <Field
 */

const Form = ({ onSubmit, ...props }) => {
  /*
  const [values, setValues] = useState({});
  const onChange = ({ target: { name, value } }) =>
    setValues((values) => {
      console.log({ name, value });
      return { ...values, [name]: value };
    });
  const withState = (e) => React.cloneElement(e, { _state: values });
  */
  if (onSubmit)
    props.onSubmit = (e) => {
      e.preventDefault();
      onSubmit(parseFormInputs(e.target));
    };

  return h("form", props);

  /*
  return h("form", { ...props, onChange, children: props.children.map(withState) });
  */
};

export { Field, Form, expandShorthand, parseFormInputs };
