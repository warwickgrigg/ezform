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

const ezForm = (h, { idPrefix = "" } = {}) => {
  const idP = idPrefix;
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

  const TickBoxes = ({ type, name, key, label, children, ...props }) => {
    type = type || "checkbox";
    const xChildren = children.map((cProps, i) =>
      TickBox({ type, name, ...props, id: idP + name + "_" + i, ...cProps })
    );

    return FormGroup({
      key,
      children: [
        label && h("label", null, label),
        h("div", null, ...xChildren),
      ],
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
    const types = ["number", "email", "textarea", "submit"];
    return types.find((v) => name.includes(v)) || "text";
  };

  const Text = ({ name, type = inferType(name), key, label, ...props }) => {
    //type = type || inferType(name);
    const children =
      type === "submit"
        ? [
            h("input", {
              type,
              name,
              ...props,
              value: label,
              className: bClass,
            }),
          ]
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
   *
   * @param {Object} f field proerties
   * @param {Object} [f.ezState] container for properties for intermediate values
   * @param {string} [f.ezTitle] meaningful title for field
   * @param {string} [f.type] html input type plus "select-multiple"
   * @param {string[]} [f.options] options for checkbox, radio, select and select-multiple types
   * @param {string} [f.label = f.ezTitle] label element
   * @param {string} [f.placeholder = f.ezTitle] placeholder property
   * @param {string} [f.name] name property - defaults to ezTitle or placeholder snake-cased
   * @param {Object} [f] remaining field properties
   * @returns {Object} vnode with optional label
   *
   * @example Field({placeholder: email})
   *
   */
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
    const className = cClass;
    if (children) {
      return props.type === "select"
        ? SelectBox({ label, key, id, name, children, className, ...props })
        : TickBoxes({ label, key, id, name, children, ...props });
    } else {
      return Text({ label, key, id, name, placeholder, className, ...props });
    }
  };

  /**
   * This is a function.
   *
   * @param {function} onSubmit callback
   * @return {string} A good string
   *
   * @example
   *
   *     <Form onSubmit={({email}) => console.log({email})}>
   *        <Field
   */

  const Form = ({ onSubmit, children, ...props }) => {
    if (onSubmit)
      props.onSubmit = (e) => {
        e.preventDefault();
        onSubmit(parseFormInputs(e.target));
      };
    return h("form", props, ...children);
  };

  return { Field, Form };
};

export { ezForm, fromExtraTerse, parseFormInputs };
