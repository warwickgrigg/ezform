# ezform - Minimal forms layer for React etc in < 1Kb

## Minimal example with JSX

```
  import { Field, Form } from "ezform";
  const App = () => (
    <Form onSubmit={({email}) => console.log({email})}>
      <Field placeholder="email"> </Field>
    <Form>
  )
```

## Example code

See src/index.html and src/app.js

```
import ReactDOM from "react-dom";
import React from "react";
import { Field, Form } from "ezform";

const fields = [
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
];

const onSubmit = (inputs) => console.log(JSON.stringify({ inputs }, null, 2));

const App = React.createElement(
  Form,
  { onSubmit },
  ...fields.map((f, i) => Field({ ...f, key: i }))
);

ReactDOM.render(App, document.getElementById("react"));
```

## Example in action

(https://warwickgrigg.github.io/ezform/demo)

## CSS

Use ezForm's minimal styling (ezform.css as used in the example demo), Bootstrap 4, or roll your own.

ezform applies the following CSS classes:

```
const gClass = "form-group"; // div container
const bClass = "btn btn-primary"; // input[type="submit]
const cClass = "form-control"; // input, select, textarea
const checkClass = "form-check form-check-inline"; // div container for each checkbox and radio option
const checkiClass = "form-check-input";
const checklClass = "form-check-label";
```

## Example's console output on clicking Submit (after various updates)

```
{
  "inputs": {
   "text_input_with_value": "quick brown fox",
   "textarea": "quick brown fox jumped.\nYes he did.\n",
   "checkboxes": [
     "Apple"
   ],
   "radios": "Pear",
   "select_fruit": [
     "apple",
     "Pear"
   ]
  }
}
```

## API

(https://warwickgrigg.github.io/ezform/jsdoc)

Also see source code for jsdoc comments and "docs/jsdoc" directory for jsdoc output

## Sizes

```
  1812 B: ezform.js.gz
  1583 B: ezform.js.br
  1007 B: ezform.modern.js.gz
  884 B: ezform.modern.js.br
  1798 B: ezform.module.js.gz
  1572 B: ezform.module.js.br
  1876 B: ezform.umd.js.gz
  1649 B: ezform.umd.js.br
```
