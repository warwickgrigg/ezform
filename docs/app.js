import React from "react";
import { Field, Form, parseFormInputs, expandShorthand } from "ezform";

const App = React.createElement(Form, {
  onSubmit: (inputs) => console.log(JSON.stringify({ inputs }, null, 2)),
  children: [
    { ezTitle: "Text input with value", defaultValue: "xxx" },
    { placeholder: "Textarea", rows: 5 },
    {
      ezTitle: "Checkboxes",
      options: [{ label: "Apple", defaultChecked: true }, { label: "Pear" }],
    },
    {
      ezTitle: "Radios",
      type: "radio",
      options: [{ label: "Apple" }, { label: "Pear", defaultChecked: true }],
    },
    {
      type: "select",
      ezTitle: "Select fruit",
      multiple: true,
      options: [
        { label: "Apple", value: "apple" },
        { label: "Pear" },
        { label: "Passion fruit" },
      ],
    },
    { ezTitle: "Submit" },
  ]
    //.map(expandShorthand)
    .map((f, i) => Field({ ...f, key: i })),
});

export default App;
