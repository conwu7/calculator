(this.webpackJsonpcalculator=this.webpackJsonpcalculator||[]).push([[0],{11:function(e,t,a){e.exports={collapsibleSection:"collapsible-card_collapsibleSection__1u5Md"}},18:function(e,t,a){"use strict";a.r(t);var r=a(1),c=a(0),n=a.n(c),l=a(10),s=a.n(l),o=a(4),i=a(3),u=a(2),b=a.n(u),d=a(7),p=a(9),m=a(20),j=a(11),O=a.n(j);function f(e){var t=e.cardHeader,a=e.hideOnFocusLost,l=e.disableHeaderButton,s=e.wrapperClassName,o=e.isCollapsed,u=e.toggleCollapse,b=Object(m.a)(),d=Object(i.a)(b,2),j=d[0],f=d[1].height,_=n.a.createRef(),g=n.a.createRef(),N=Object(p.b)({to:{height:o?0:f+10}});return Object(c.useEffect)((function(){if(a){var e=document.getElementById("App");return e.addEventListener("click",t),function(){e.removeEventListener("click",t)}}function t(e){var t=_.current,a=g.current;t.contains(e.target)||t.isSameNode(e.target)||!a||a.contains(e.target)||a.isSameNode(e.target)||u("collapse")}}),[a,g,_,u]),Object(r.jsxs)("div",{className:s,children:[Object(r.jsx)("div",{ref:g,onClick:l?void 0:function(){u()},children:t}),Object(r.jsx)(p.a.div,{style:N,ref:_,className:O.a.collapsibleSection,children:Object(r.jsx)("div",{className:"collapsibleSectionItems",ref:j,children:e.children})})]})}var _=function(){var e=Object(c.useState)("0"),t=Object(i.a)(e,2),a=t[0],n=t[1],l=Object(c.useState)(null),s=Object(i.a)(l,2),u=s[0],p=s[1],m=Object(c.useState)(""),j=Object(i.a)(m,2),O=j[0],_=j[1],g=Object(c.useState)(null),N=Object(i.a)(g,2),h=N[0],v=N[1],x=Object(c.useState)(!1),C=Object(i.a)(x,2),S=C[0],y=C[1],k=Object(c.useState)(!1),w=Object(i.a)(k,2),E=w[0],R=w[1],L=Object(c.useState)(!1),B=Object(i.a)(L,2),P=B[0],I=B[1],D=Object(c.useState)([]),F=Object(i.a)(D,2),A=F[0],H=F[1],T=Object(c.useState)(!1),M=Object(i.a)(T,2),U=M[0],z=M[1],J="pastedNumberField";Object(c.useEffect)((function(){H(JSON.parse(localStorage.getItem("calculatorPastResults"))||[])}),[]),Object(c.useEffect)((function(){$()}),[]);var K=Object(c.useCallback)((function(e){if(isNaN(Number(e)))return e;if("."===e.toString().slice(-1))return"".concat(Number(e.slice(0,-1)).toLocaleString(),".");if("0"===e.toString().slice(-1)&&e.toString().includes(".")){var t=e.split(".");return"".concat(t[0].toLocaleString(),".").concat(t[1])}return Number(e).toLocaleString("en-US",{style:"decimal",maximumFractionDigits:10,maximumSignificantDigits:14})}),[]),W=Object(c.useCallback)((function(e){return K(null===e?u:e)}),[K,u]),G=Object(c.useCallback)((function(e){var t=Object(o.a)(A);A.length>=5&&t.pop(),t.unshift(e),H(t),localStorage.setItem("calculatorPastResults",JSON.stringify(t))}),[A]),Z=Object(c.useCallback)((function(e){return function(){var t=e.replace(/,/g,"");return isNaN(Number(t))?window.alert(e+" is not a valid number"):t.length>14?window.alert("Number is too big - 14 digits max (".concat(t.length,")")):(P?ee():u&&_(K(u)),R(!1),S?(y(!1),n(t),"="===h&&(_(""),p(null),v(null))):n(t),void z(!1))}}),[h,K,P,S,u]),q=Object(c.useCallback)((function(e){e.preventDefault();var t=document.getElementById(J).value;""!==t&&Z(t)()}),[Z]),V=Object(c.useCallback)((function(e){return function(){P||function(e){if(null===e)return!1;var t=e.toString(),a=e.length;t.includes(".")&&a--;t.includes("-")&&a--;return a>=13}(a)&&!S||a&&a.includes(".")&&"."===e||(u&&_(K(u)),R(!1),S?(y(!1),n(e.toString()),"="===h&&(_(""),p(null),v(null))):n("."===e?"".concat(a).concat(e):"0"!==a&&a?"-0"===a?"-".concat(e.toString()):"".concat(a).concat(e):e.toString()))}}),[a,h,P,S,u,K]),Y=Object(c.useCallback)((function(e){return function(){if(!P){var t;if(y(!0),null!==u&&null!==a&&h){switch(h){case"+":t=Number(u)+Number(a);break;case"-":t=Number(u)-Number(a);break;case"*":t=Number(u)*Number(a);break;case"/":t=Number(u)/Number(a);break;case"^":t=Math.pow(Number(u),Number(a));break;case"=":t=Number(u);break;default:t=Number(u)}if(_("="===h?K(u):"".concat(K(u)," ").concat(h," ").concat(K(a))),!isFinite(t)||isNaN(t))return I(!0),void n("ERROR, CLEAR");if(t>999999999999999||t<-999999999999999)return I(!0),void n("TOO LONG, CLEAR");n(null),R(!0),G(K(t)),p(K(t).replace(/,/g,""))}v(e),"undefined"===typeof t&&a&&(p(Number(a)),n(null))}}}),[a,h,K,P,u,G]),Q=Object(c.useCallback)((function(){if(!(E||S||P)){var e=a.length;if(e<=1)return n("0");n(a.slice(0,e-1))}}),[a,E,P,S]),X=Object(c.useCallback)((function(e){if(e.target.id!==J){if(e.key>=0&&e.key<=9)return V(e.key)();if(["*","-","/","+","=","^"].includes(e.key))return Y(e.key)();switch(e.key){case".":V(".")();break;case"Backspace":Q();break;case"Escape":ee();break;case"Enter":Y("=")()}}}),[V,Y,Q]);function $(){var e=document.getElementsByClassName("".concat(b.a.container))[0],t=!0===window.navigator.standalone?window.innerHeight-40:window.innerHeight;e.style.height="".concat(t,"px")}function ee(){p(null),v(null),n("0"),R(!1),_(null),I(!1)}Object(c.useEffect)((function(){var e=function(){document.body.scrollTop=0,window.scrollTop=0,document.body.scrollTo(0,0),window.scrollTo(0,0)};return e(),document.getElementById(J).addEventListener("focusout",e),window.addEventListener("keyup",X),function(){document.getElementById(J).removeEventListener("focusout",e),window.removeEventListener("keyup",X)}}),[X]),window.onresize=$;var te=[["Clr","operator","clear",ee],[Object(r.jsx)(d.c,{}),"operator","backspace",Q],[Object(r.jsxs)(r.Fragment,{children:["y",Object(r.jsx)("sup",{children:"a"})]}),"operator","powerOf",Y("^")],["\xf7","operator","divide",Y("/")],["7","regular","seven",V(7)],["8","regular","eight",V(8)],["9","regular","nine",V(9)],["\xd7","operator","multiply",Y("*")],["4","regular","four",V(4)],["5","regular","five",V(5)],["6","regular","six",V(6)],["-","operator","subtract",Y("-")],["1","regular","one",V(1)],["2","regular","two",V(2)],["3","regular","three",V(3)],["+","operator","add",Y("+")],["0","regular","zero",V(0)],[".","regular","dot",V(".")],["\xb1","regular","plusMinus",function(){P||S||("-"===a[0]?n(a.slice(1)):n("-".concat(a)))}],["=","operator","equals",Y("=")]];function ae(e){if(e&&"collapse"===e)return z(!1);z(!U)}return Object(r.jsxs)("div",{className:"App",id:"App",children:[Object(r.jsxs)("div",{className:b.a.container,children:[Object(r.jsxs)("div",{className:b.a.displayContainer,children:[Object(r.jsxs)("div",{className:b.a.operatorAndPreviousExpression,children:[Object(r.jsx)("span",{className:b.a.previousExpressionDisplay,children:O}),Object(r.jsx)("span",{className:b.a.currentOperatorDisplay,children:h})]}),Object(r.jsxs)("span",{className:"".concat(b.a.currentNumberDisplay," ").concat(P?b.a.errorCurrentNumber:""),children:[Object(r.jsx)("span",{className:b.a.answer,children:E?"(Ans)":""}),W(a)]})]}),Object(r.jsx)("div",{className:b.a.moreOptionsContainer,children:Object(r.jsx)(f,{cardHeader:Object(r.jsx)("button",{onClick:ae,tabIndex:"-1",className:"".concat(b.a.moreButton," ").concat(U?b.a.expanded:""),children:Object(r.jsx)(d.b,{})}),wrapperClassName:b.a.optionsWrapper,isCollapsed:!U,toggleCollapse:ae,hideOnFocusLost:!1,disableHeaderButton:!0,children:Object(r.jsx)("div",{className:b.a.optionsContainer,children:Object(r.jsxs)("div",{children:[Object(r.jsxs)("form",{onSubmit:q,className:b.a.pasteContainer,children:[Object(r.jsx)("input",{className:b.a.pasteNumberField,id:J,type:"text",placeholder:"Paste a number"}),Object(r.jsx)("button",{type:"submit",className:b.a.applyPastedNumber,children:Object(r.jsx)(d.a,{})})]}),0===A.length?Object(r.jsx)("span",{className:b.a.pastResultsHeader,children:"NO RESULTS"}):Object(r.jsx)("span",{className:b.a.pastResultsHeader,children:"PAST RESULTS"}),A.map((function(e,t){return Object(r.jsx)("button",{className:b.a.pastResult,onClick:Z(e),children:e},t)})),A.length>0&&Object(r.jsx)("button",{className:b.a.clearPastResults,onClick:function(){H([]),localStorage.setItem("calculatorPastResults",JSON.stringify([]))},children:"Clear All Results"})]})})})}),Object(r.jsx)("div",{className:b.a.buttonContainer,children:te.map((function(e){return Object(r.jsx)("button",{onClick:e[3],className:"".concat(b.a[e[1]]," ").concat(b.a[e[2]]),"data-operator":e[2],tabIndex:"-1",children:Object(r.jsx)("span",{children:P&&"Clr"!==e[0]?"":e[0]})},e[2])}))})]}),Object(r.jsx)("div",{className:b.a.shadeBottomOnStandalone})]})},g=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,21)).then((function(t){var a=t.getCLS,r=t.getFID,c=t.getFCP,n=t.getLCP,l=t.getTTFB;a(e),r(e),c(e),n(e),l(e)}))};s.a.render(Object(r.jsx)(n.a.StrictMode,{children:Object(r.jsx)(_,{})}),document.getElementById("root")),g()},2:function(e,t,a){e.exports={container:"calculator_container__erLDa",displayContainer:"calculator_displayContainer__N_Z89",operatorAndPreviousExpression:"calculator_operatorAndPreviousExpression__1kCpj",previousExpressionDisplay:"calculator_previousExpressionDisplay__1UPcv",answer:"calculator_answer__1IiIg",moreOptionsContainer:"calculator_moreOptionsContainer__1uz2W",optionsWrapper:"calculator_optionsWrapper__pdYmM",optionsContainer:"calculator_optionsContainer__1bEgD",pastResultsHeader:"calculator_pastResultsHeader__1AKMK",pastResult:"calculator_pastResult__1xkiL",clearPastResults:"calculator_clearPastResults__GIK2u",pasteContainer:"calculator_pasteContainer__Uvivy",pasteNumberField:"calculator_pasteNumberField__eDKgk",applyPastedNumber:"calculator_applyPastedNumber__2ElBz",moreButton:"calculator_moreButton__1TVzB",expanded:"calculator_expanded__2uhyE",buttonContainer:"calculator_buttonContainer__3bHps",currentNumberDisplay:"calculator_currentNumberDisplay__2Rjfr",errorCurrentNumber:"calculator_errorCurrentNumber__LcM2C",operator:"calculator_operator__l6BBo",clear:"calculator_clear__1MR2H",backspace:"calculator_backspace__3zj3M",powerOf:"calculator_powerOf__3SGrJ",multiply:"calculator_multiply__39pZU",shadeBottomOnStandalone:"calculator_shadeBottomOnStandalone__n3UUZ"}}},[[18,1,2]]]);
//# sourceMappingURL=main.a5730605.chunk.js.map