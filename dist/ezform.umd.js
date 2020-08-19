!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("react")):"function"==typeof define&&define.amd?define(["exports","react"],t):t((e=e||self).ezform={},e.react)}(this,function(e,t){function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(this,arguments)}function n(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)t.indexOf(r=l[n])>=0||(a[r]=e[r]);return a}function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function l(e,t){var r;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return a(e,void 0);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(e,void 0):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0;return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}return(r=e[Symbol.iterator]()).next.bind(r)}var o=(t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t).createElement,i=function(e){for(var t,r={},n=l(e.elements);!(t=n()).done;){var a=t.value,o=a.type,i=a.name,u=a.checked,c=a.selectedOptions,d=a.value;if("select-multiple"===o){r[i]=[];for(var m,f=l(c);!(m=f()).done;)r[i].push(m.value.value)}else"checkbox"===o?(r[i]||(r[i]=[]),u&&r[i].push(d)):"submit"===o||"radio"===o&&!u||(r[i]=d)}return r},u=function(e){var t=e.children,a=n(e,["children"]);return o.apply(void 0,["div",r({className:"form-group"},a)].concat(t))};e.Field=function(e){var t=e.ezTitle,a=e.ezState,l=e.label,i=void 0===l?t:l,c=e.placeholder,d=void 0===c?t:c,m=e.name,f=void 0===m?(t||d).replace(/ /g,"_").toLowerCase():m,p=e.idP,s=void 0===p?"":p,v=e.id,y=void 0===v?s+f:v,b=e.key,h=void 0===b?y:b,k=e.children,g=n(e,["ezTitle","ezState","label","placeholder","name","idP","id","key","children"]);a&&!g.value&&(g.value=a[f]||"");var x=r({},g,{label:i,key:h,id:y,name:f,idP:s});return k?"select"===g.type?function(e){var t=e.name,a=e.idP,l=e.key,i=e.label,c=e.children,d=n(e,["name","idP","key","label","children"]);delete d.type;var m=c.map(function(e,l){var i=e.label,u=e.value,c=void 0===u?i:u,d=n(e,["label","value"]),m=a+t+"_"+l;return o("option",r({id:m,key:m,value:c},d),i)});return u({key:l,children:[i&&o("label",{htmlFor:d.id},i),o.apply(void 0,["select",r({name:t},d)].concat(m))]})}(r({},x,{children:k,className:"form-control"})):function(e){var t=e.type,a=e.name,l=e.idP,i=e.key,c=e.label,d=e.children,m=n(e,["type","name","idP","key","label","children"]);t=t||"checkbox";var f=d.map(function(e,i){return function(e){var t=e.type,a=e.name,l=e.id,i=e.label,u=e.value,c=void 0===u?i:u,d=n(e,["type","name","id","label","value"]);return o("div",{className:"custom-control custom-"+t+" custom-control-inline",key:l},o("input",r({id:l,name:a,className:"custom-control-input",type:t,value:c},d)),o("label",{htmlFor:l,className:"custom-control-label"},i))}(r({type:t,name:a},m,{id:l+a+"_"+i},e))});return u({key:i,children:[c&&o("label",null,c),o.apply(void 0,["div",null].concat(f))]})}(r({},x,{children:k})):function(e){var t,a=e.name,l=e.type,i=void 0===l?function(e){return e=e.toLowerCase(),["number","email","textarea","submit"].find(function(t){return e.includes(t)})||"text"}(a):l,c=e.key,d=e.label,m=n(e,["name","type","key","label"]),f="submit"===i?[o("input",r({type:i,name:a},m,{value:d,className:"btn btn-primary"}))]:[d&&o("label",{htmlFor:m.id},d),"textarea"===i?o("textarea",r({name:a},(t=["value"],function(e){return Object.fromEntries(Object.entries(e).filter(function(e){return!t.includes(e[0])}))})(m)),m.value):o("input",r({type:i,name:a},m))];return u({key:c,children:f})}(r({},x,{placeholder:d,className:"form-control"}))},e.Form=function(e){var t=e.onSubmit,r=n(e,["onSubmit"]);return t&&(r.onSubmit=function(e){e.preventDefault(),t(i(e.target))}),o("form",r)},e.fromExtraTerse=function(e){var t=e;return"string"==typeof t?{ezTitle:t}:(Array.isArray(t)&&(t={ezTitle:t[0],children:t[1]}),Array.isArray(t.children)?r({},t,{children:t.children.map(function(e){return"string"==typeof e?{label:e}:e})}):t)},e.parseFormInputs=i});
//# sourceMappingURL=ezform.umd.js.map
