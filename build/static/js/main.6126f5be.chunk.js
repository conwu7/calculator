(this.webpackJsonpcalculator=this.webpackJsonpcalculator||[]).push([[0],{12:function(e,r,t){"use strict";t.r(r);var a=t(1),n=t(0),c=t.n(n),o=t(5),i=t.n(o),l=t(3),u=t(2),s=t.n(u),b=t(6);var p=function(){var e=Object(n.useState)("0"),r=Object(l.a)(e,2),t=r[0],c=r[1],o=Object(n.useState)(null),i=Object(l.a)(o,2),u=i[0],p=i[1],d=Object(n.useState)(""),j=Object(l.a)(d,2),m=j[0],f=j[1],O=Object(n.useState)(null),g=Object(l.a)(O,2),_=g[0],N=g[1],k=Object(n.useState)(!1),h=Object(l.a)(k,2),v=h[0],x=h[1],y=Object(n.useState)(!1),C=Object(l.a)(y,2),w=C[0],S=C[1],E=Object(n.useState)(!1),D=Object(l.a)(E,2),L=D[0],F=D[1];Object(n.useEffect)((function(){I()}),[]);var A=Object(n.useCallback)((function(e){return isNaN(Number(e))?e:Number(e).toLocaleString("en-US",{style:"decimal",maximumFractionDigits:10,maximumSignificantDigits:14})}),[]),P=Object(n.useCallback)((function(e){return A(null===e?u:e)}),[A,u]),R=Object(n.useCallback)((function(e){return e.toString().includes("e")?Number.parseFloat(e).toPrecision(6):e.toLocaleString("en-US",{style:"decimal",maximumFractionDigits:10,maximumSignificantDigits:14}).replace(/,/g,"")}),[]),M=Object(n.useCallback)((function(e){return function(){L||function(e){if(null===e)return!1;var r=e.toString(),t=e.length;r.includes(".")&&t--;r.includes("-")&&t--;return t>=12}(t)&&!v||t&&t.includes(".")&&"."===e||(u&&f(A(u)),S(!1),v?(x(!1),c(e.toString()),"="===_&&(f(""),p(null),N(null))):c("."===e?"".concat(t).concat(e):"0"!==t&&t?"-0"===t?"-".concat(e.toString()):"".concat(t).concat(e):e.toString()))}}),[t,_,L,v,u,A]),B=Object(n.useCallback)((function(e){return function(){if(!L){var r;if(x(!0),null!==u&&null!==t&&_){switch(_){case"+":r=Number(u)+Number(t);break;case"-":r=Number(u)-Number(t);break;case"*":r=Number(u)*Number(t);break;case"/":r=Number(u)/Number(t);break;case"^":r=Math.pow(Number(u),Number(t));break;case"=":r=Number(u);break;default:r=Number(u)}if(f("="===_?A(u):"".concat(A(u)," ").concat(_," ").concat(A(t))),!isFinite(r)||isNaN(r))return F(!0),void c("ERROR, CLEAR");if(r>99999999999999||r<-99999999999999)return F(!0),void c("TOO LONG, CLEAR");c(null),S(!0),p(R(r))}N(e),!r&&t&&(p(Number(t)),c(null))}}}),[t,_,A,R,L,u]),H=Object(n.useCallback)((function(e){if(e.key>=0&&e.key<=9)return console.log(e.key),M(e.key)();if(["*","-","/","+","="].includes(e.key))return B(e.key)();switch(console.log(e.key),e.key){case"Escape":z();break;case"Enter":B("=")();break;default:console.log("Hey there!")}}),[M,B]);function I(){var e=document.getElementsByClassName("".concat(s.a.container))[0],r=!0===window.navigator.standalone?window.innerHeight-40:window.innerHeight;e.style.height="".concat(r,"px")}function z(){p(null),N(null),c("0"),S(!1),f(null),F(!1)}Object(n.useEffect)((function(){return window.addEventListener("keyup",H),function(){return window.removeEventListener("keyup",H)}}),[H]),window.onresize=I;var U=[["Clr","operator","clear",z],[Object(a.jsx)(b.a,{}),"operator","backspace",function(){if(!(w||v||L)){var e=t.length;if(e<=1)return c("0");c(t.slice(0,e-1))}}],[Object(a.jsxs)(a.Fragment,{children:["z",Object(a.jsx)("sup",{children:"a"})]}),"operator","powerOf",B("^")],["\xf7","operator","divide",B("/")],["7","regular","seven",M(7)],["8","regular","eight",M(8)],["9","regular","nine",M(9)],["\xd7","operator","multiply",B("*")],["4","regular","four",M(4)],["5","regular","five",M(5)],["6","regular","six",M(6)],["-","operator","subtract",B("-")],["1","regular","one",M(1)],["2","regular","two",M(2)],["3","regular","three",M(3)],["+","operator","add",B("+")],["0","regular","zero",M(0)],[".","regular","dot",M(".")],["\xb1","regular","plusMinus",function(){L||v||("-"===t[0]?c(t.slice(1)):c("-".concat(t)))}],["=","operator","equals",B("=")]];return Object(a.jsx)("div",{className:"App",children:Object(a.jsxs)("div",{className:s.a.container,id:"kawa",children:[Object(a.jsxs)("div",{className:s.a.displayContainer,children:[Object(a.jsxs)("div",{className:s.a.operatorAndPreviousExpression,children:[Object(a.jsx)("span",{className:s.a.previousExpressionDisplay,children:m}),Object(a.jsx)("span",{className:s.a.currentOperatorDisplay,children:_})]}),Object(a.jsxs)("span",{className:"".concat(s.a.currentNumberDisplay," ").concat(L?s.a.errorCurrentNumber:""),children:[Object(a.jsx)("span",{className:s.a.answer,children:w?"(Ans)":""}),P(t)]})]}),Object(a.jsx)("div",{className:s.a.buttonContainer,children:U.map((function(e){return Object(a.jsx)("button",{onClick:e[3],className:"".concat(s.a[e[1]]," ").concat(s.a[e[2]]),"data-operator":e[2],tabIndex:"-1",children:Object(a.jsx)("span",{children:L&&"Clr"!==e[0]?"":e[0]})},e[2])}))})]})})},d=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,13)).then((function(r){var t=r.getCLS,a=r.getFID,n=r.getFCP,c=r.getLCP,o=r.getTTFB;t(e),a(e),n(e),c(e),o(e)}))};i.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(p,{})}),document.getElementById("root")),d()},2:function(e,r,t){e.exports={container:"calculator_container__erLDa",displayContainer:"calculator_displayContainer__N_Z89",operatorAndPreviousExpression:"calculator_operatorAndPreviousExpression__1kCpj",previousExpressionDisplay:"calculator_previousExpressionDisplay__1UPcv",answer:"calculator_answer__1IiIg",buttonContainer:"calculator_buttonContainer__3bHps",currentNumberDisplay:"calculator_currentNumberDisplay__2Rjfr",errorCurrentNumber:"calculator_errorCurrentNumber__LcM2C",operator:"calculator_operator__l6BBo",clear:"calculator_clear__1MR2H",backspace:"calculator_backspace__3zj3M",powerOf:"calculator_powerOf__3SGrJ",multiply:"calculator_multiply__39pZU"}}},[[12,1,2]]]);
//# sourceMappingURL=main.6126f5be.chunk.js.map