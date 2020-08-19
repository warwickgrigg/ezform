# ezform

##Example use

```
import React from "react";
import ReactDOM from "react-dom";
import {ezForm, parseFormInputs, fromExtraTerse} from "ezform";
const h = React.createElement;
const { Field, Form } = ezForm(h, {idPrefix: "r-"});
let f = Form({
onSubmit: (inputs) => console.log(JSON.stringify({ inputs }, null, 2)),
children: [
{ ezTitle: "Text input with value", value: "text value" },
{ placeholder: "Textarea", rows: 5 },
{
ezTitle: "Checkboxes",
children: [{ label: "Apple", checked: true }, { label: "Pear" }],
},
{
ezTitle: "Radios",
type: "radio",
children: [{ label: "Apple"}, { label: "Pear", checked: true }],
},
{
type: "select",
ezTitle: "Select fruit",
multiple: true,
children: [
{label: "Apple", value: "apple" },
{label: "Pear"},
{label: "Passion fruit"},
],
},
{ezTitle:"Submit"}
]
//.map(fromExtraTerse)
.map((f, i) => Field({ ...f, key: i })),
});
ReactDOM.render(f, document.getElementById("react"));
```
