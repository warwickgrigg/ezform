const e=({elements:e})=>{const l={};for(const{type:t,name:a,checked:r,selectedOptions:n,value:i}of e)if("select-multiple"===t){l[a]=[];for(const{value:e}of n)l[a].push(e)}else"checkbox"===t?(l[a]||(l[a]=[]),r&&l[a].push(i)):"submit"===t||"radio"===t&&!r||(l[a]=i);return l},l=e=>{let l=e;return"string"==typeof l?{ezTitle:l}:(Array.isArray(l)&&(l={ezTitle:l[0],children:l[1]}),Array.isArray(l.children)?{...l,children:l.children.map(e=>"string"==typeof e?{label:e}:e)}:l)},t=(l,{idPrefix:t=""}={})=>{const a=t,r=({children:e,...t})=>l("div",{className:"form-group",...t},...e),n=e=>(e=e.toLowerCase(),["number","email","textarea","submit"].find(l=>e.includes(l))||"text");return{Field:({ezTitle:e,ezState:t,label:i=e,placeholder:c=e,name:o=(e||c).replace(/ /g,"_").toLowerCase(),id:s=a+o,key:m=s,children:u,...d})=>(t&&!d.value&&(d.value=t[o]||""),u?"select"===d.type?(({name:e,key:t,label:n,children:i,...c})=>{delete c.type;const o=i.map(({label:t,value:r=t,...n},i)=>{const c=a+e+"_"+i;return l("option",{id:c,key:c,value:r,...n},t)});return r({key:t,children:[n&&l("label",{htmlFor:c.id},n),l("select",{name:e,...c},...o)]})})({label:i,key:m,id:s,name:o,children:u,className:"form-control",...d}):(({type:e,name:t,key:n,label:i,children:c,...o})=>{e=e||"checkbox";const s=c.map((r,n)=>(({type:e,name:t,id:a,label:r,value:n=r,...i})=>l("div",{className:`custom-control custom-${e} custom-control-inline`,key:a},l("input",{id:a,name:t,className:"custom-control-input",type:e,value:n,...i}),l("label",{htmlFor:a,className:"custom-control-label"},r)))({type:e,name:t,...o,id:a+t+"_"+n,...r}));return r({key:n,children:[i&&l("label",null,i),l("div",null,...s)]})})({label:i,key:m,id:s,name:o,children:u,...d}):(({name:e,type:t=n(e),key:a,label:i,...c})=>{const o="submit"===t?[l("input",{type:t,name:e,...c,value:i,className:"btn btn-primary"})]:[i&&l("label",{htmlFor:c.id},i),"textarea"===t?l("textarea",{name:e,...(s=["value"],e=>Object.fromEntries(Object.entries(e).filter(([e])=>!s.includes(e))))(c)},c.value):l("input",{type:t,name:e,...c})];var s;return r({key:a,children:o})})({label:i,key:m,id:s,name:o,placeholder:c,className:"form-control",...d})),Form:({onSubmit:t,children:a,...r})=>(t&&(r.onSubmit=l=>{l.preventDefault(),t(e(l.target))}),l("form",r,...a))}};export{t as ezForm,l as fromExtraTerse,e as parseFormInputs};
//# sourceMappingURL=ezform.modern.js.map
