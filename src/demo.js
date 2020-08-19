import React from "react";
import { Field, Form, parseFormInputs, fromExtraTerse } from "ezform";
const h = React.createElement;
//const { Field, Form } = ezForm(h, {idPrefix: "r-"});

const App = h(Form, {
  onSubmit: (inputs) => console.log(JSON.stringify({ inputs }, null, 2)),
  children: [
    { ezTitle: "Text input with value", defaultValue: "xxx" },
    { placeholder: "Textarea", rows: 5 },
    {
      ezTitle: "Checkboxes",
      children: [{ label: "Apple", defaultChecked: true }, { label: "Pear" }],
    },
    {
      ezTitle: "Radios",
      type: "radio",
      children: [{ label: "Apple" }, { label: "Pear", defaultChecked: true }],
    },
    {
      type: "select",
      ezTitle: "Select fruit",
      multiple: true,
      children: [
        { label: "Apple", value: "apple" },
        { label: "Pear" },
        { label: "Passion fruit" },
      ],
    },
    { ezTitle: "Submit" },
  ]
    //.map(fromExtraTerse)
    .map((f, i) => Field({ ...f, key: i })),
});

export default App;
