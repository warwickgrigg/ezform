function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}function t(){return(t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function n(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t.indexOf(n=o[r])>=0||(a[n]=e[n]);return a}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function a(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0;return function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(n=e[Symbol.iterator]()).next.bind(n)}var o=e(require("react")).default.createElement,l=function(e){var r=e.children,a=n(e,["children"]);return o.apply(void 0,["div",t({className:"form-group"},a)].concat([].concat(r)))},i=function(e){for(var t,n={},r=a(e.elements);!(t=r()).done;){var o=t.value,l=o.type,i=o.name,u=o.checked,c=o.selectedOptions,p=o.value;if("select-multiple"===l){n[i]=[];for(var s,d=a(c);!(s=d()).done;)n[i].push(s.value.value)}else"checkbox"===l?(n[i]||(n[i]=[]),u&&n[i].push(p)):"submit"===l||"radio"===l&&!u||(n[i]=p)}return n};exports.Field=function(e){var r=e.ezTitle,a=e.label,i=void 0===a?r:a,u=e.placeholder,c=void 0===u?r:u,p=e.name,s=void 0===p?(r||c).replace(/ /g,"_").toLowerCase():p,d=e.prefix,m=e.id,f=void 0===m?(void 0===d?"":d)+s:m,y=e.key,v=void 0===y?f:y,b=e.options,h=n(e,["ezTitle","label","placeholder","name","prefix","id","key","options"]),k="form-control",g=t({},h,{label:i,key:v,id:f,name:s});return b?"select"===h.type?function(e){var r=e.name,a=e.key,i=e.label,u=e.options,c=n(e,["name","key","label","options"]);delete c.type;var p=u.map(function(e,r){var a=e.label,l=e.value,i=void 0===l?a:l,u=n(e,["label","value"]),p=c.id+"_"+r;return o("option",t({id:p,key:p,value:i},u),a)});return l({key:a,children:[i&&o("label",{htmlFor:c.id},i),o.apply(void 0,["select",t({name:r},c)].concat(p))]})}(t({},g,{options:b,className:k})):function(e){var r=e.type,a=e.name,i=e.id,u=e.key,c=e.label,p=e.options,s=n(e,["type","name","id","key","label","options"]);r=r||"checkbox";var d=p.map(function(e,l){return function(e){var r=e.type,a=e.name,l=e.id,i=e.label,u=e.value,c=void 0===u?i:u,p=n(e,["type","name","id","label","value"]);return o("div",{className:"form-check form-check-inline",key:l},o("input",t({id:l,name:a,className:"form-check-input",type:r,value:c},p)),o("label",{htmlFor:l,className:"form-check-label"},i))}(t({type:r,name:a},s,{id:i+"_"+l},e))});return l({key:u,children:[c&&o("label",null,c),o.apply(void 0,["div",null].concat(d))]})}(t({},g,{options:b})):function(e){var r=e.name,a=e.type,i=void 0===a?function(e){return e=e.toLowerCase(),["number","email","textarea","submit"].find(function(t){return e.includes(t)})||"text"}(r):a,u=e.key,c=e.label,p=n(e,["name","type","key","label"]),s="submit"===i?[o("input",t({type:i,name:r},p,{value:c,className:"btn btn-primary"}))]:[c&&o("label",{htmlFor:p.id},c),"textarea"===i?o("textarea",t({name:r},p)):o("input",t({type:i,name:r},p))];return l({key:u,children:s})}(t({},g,{placeholder:c,className:k}))},exports.Form=function(e){var t=e.onSubmit,r=e.children,a=n(e,["onSubmit","children"]);return t&&(a.onSubmit=function(e){e.preventDefault(),t(i(e.target))}),o.apply(void 0,["form",a].concat([].concat(r)))},exports.expandShorthand=function(e){var n=e;return"string"==typeof n?{ezTitle:n}:(Array.isArray(n)&&(n={ezTitle:n[0],options:n[1]}),Array.isArray(n.options)?t({},n,{options:n.options.map(function(e){return"string"==typeof e?{label:e}:e})}):n)},exports.parseFormInputs=i;
//# sourceMappingURL=ezform.js.map
