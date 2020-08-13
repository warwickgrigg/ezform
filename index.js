import React from "react";

let h = React.createElement;
let idP = "";

//const className = `custom-control custom-${type} custom-control-inline`;
const iclassName = "custom-control-input";
const lclassName = "custom-control-label";
const gclassName = "form-group";
const cclassName = "form-control";
const bclassName = "btn btn-primary";

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

const omit = (fields) => (obj) => {
  const r = Object.fromEntries(
    Object.entries(obj).filter(([key]) => !fields.includes(key))
  );
  return r;
};

const FormGroup = ({ children, ...props }) =>
  h("div", { className: gclassName, ...props }, ...children);

const TickBox = ({ type, name, id, label, value = label, ...props }) => {
  const className = `custom-control custom-${type} custom-control-inline`;
  return h(
    "div",
    { className, key: id },
    h("input", { id, name, className: iclassName, type, value, ...props }),
    h("label", { htmlFor: id, className: lclassName }, label)
  );
};

const TickBoxes = ({ type, name, key, label, children, ...props }) => {
  type = type || "checkbox";
  const xChildren = children.map((cProps, i) =>
    TickBox({ type, name, ...props, id: idP + name + "_" + i, ...cProps })
  );

  return FormGroup({
    key,
    children: [label && h("label", null, label), h("div", null, ...xChildren)],
  });
};

const SelectBox = ({ name, key, label, children, ...props }) => {
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
  return (
    ["number", "email", "textarea"].find((v) => name.includes(v)) || "text"
  );
};

const Text = ({ name, type, key, label, ...props }) => {
  type = type || inferType(name);
  return FormGroup({
    key,
    children: [
      label && h("label", { htmlFor: props.id }, label),
      type === "textarea"
        ? h("textarea", { name, ...omit(["value"])(props) }, props.value)
        : h("input", { type, name, ...props }),
    ],
  });
};

const Field = ({
  ezTitle,
  ezState,
  label = ezTitle,
  placeholder = ezTitle,
  name = (ezTitle || placeholder).replace(/ /g, "_").toLowerCase(),
  id = idP + name,
  key = id,
  children,
  ...props
}) => {
  if (ezState && !props.value) props.value = ezState[name] || "";
  const className = cclassName;
  if (children) {
    return props.type === "select"
      ? SelectBox({ label, key, id, name, children, className, ...props })
      : TickBoxes({ label, key, id, name, children, ...props });
  } else {
    return Text({ label, key, id, name, placeholder, className, ...props });
  }
};

const Form = ({ onSubmit, children, ...props }) => {
  if (onSubmit)
    props.onSubmit = (e) => {
      e.preventDefault();
      onSubmit(parseFormInputs(e.target));
    };
  //prettier-ignore
  return h("form", 
      props,
      ...children,
      FormGroup({ key: "submit", children: [ h(
        "button",
        { name: "submit", type: "submit", className: bclassName },
        "Submit"
      )]})
    );
};

const fromExtraTerse = (field) => {
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

// ezForm factory export for testing and backwards compatibility

const ezForm = (createElement, { idPrefix = "" } = {}) => {
  h = createElement;
  idP = idPrefix;
  return {
    Field,
    Form,
    fromExtraTerse,
    parseFormInputs,
  };
};

export default ezForm;
export { fromExtraTerse, Field, Form, parseFormInputs };
