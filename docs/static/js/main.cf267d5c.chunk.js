(this.webpackJsonpcalculator=this.webpackJsonpcalculator||[]).push([[0],{11:function(e,t,a){e.exports={collapsibleSection:"collapsible-card_collapsibleSection__1u5Md"}},18:function(e,t,a){"use strict";a.r(t);var r=a(1),c=a(0),n=a.n(c),s=a(10),l=a.n(s),o=a(4),i=a(3),u=a(2),b=a.n(u),p=a(9),d=a(8),j=a(20),O=a(11),m=a.n(O);function f(e){var t=e.cardHeader,a=e.hideOnFocusLost,s=e.disableHeaderButton,l=e.wrapperClassName,o=e.isCollapsed,u=e.toggleCollapse,b=Object(j.a)(),p=Object(i.a)(b,2),O=p[0],f=p[1].height,_=n.a.createRef(),g=n.a.createRef(),h=Object(d.b)({to:{height:o?0:f+10}});return Object(c.useEffect)((function(){if(a){var e=document.getElementById("App");return e.addEventListener("click",t),function(){e.removeEventListener("click",t)}}function t(e){var t=_.current,a=g.current;t.contains(e.target)||t.isSameNode(e.target)||!a||a.contains(e.target)||a.isSameNode(e.target)||u("collapse")}}),[a,g,_,u]),Object(r.jsxs)("div",{className:l,children:[Object(r.jsx)("div",{ref:g,onClick:s?void 0:function(){u()},children:t}),Object(r.jsx)(d.a.div,{style:h,ref:_,className:m.a.collapsibleSection,children:Object(r.jsx)("div",{className:"collapsibleSectionItems",ref:O,children:e.children})})]})}var _=function(){var e=Object(c.useState)("0"),t=Object(i.a)(e,2),a=t[0],n=t[1],s=Object(c.useState)(null),l=Object(i.a)(s,2),u=l[0],d=l[1],j=Object(c.useState)(""),O=Object(i.a)(j,2),m=O[0],_=O[1],g=Object(c.useState)(null),h=Object(i.a)(g,2),N=h[0],v=h[1],x=Object(c.useState)(!1),C=Object(i.a)(x,2),S=C[0],k=C[1],y=Object(c.useState)(!1),w=Object(i.a)(y,2),E=w[0],R=w[1],L=Object(c.useState)(!1),B=Object(i.a)(L,2),P=B[0],A=B[1],D=Object(c.useState)([]),H=Object(i.a)(D,2),I=H[0],F=H[1],M=Object(c.useState)(!1),T=Object(i.a)(M,2),U=T[0],J=T[1];Object(c.useEffect)((function(){F(JSON.parse(localStorage.getItem("calculatorPastResults"))||[])}),[]),Object(c.useEffect)((function(){Q()}),[]);var z=Object(c.useCallback)((function(e){if(isNaN(Number(e)))return e;if("."===e.toString().slice(-1))return"".concat(Number(e.slice(0,-1)).toLocaleString(),".");if("0"===e.toString().slice(-1)&&e.toString().includes(".")){var t=e.split(".");return"".concat(t[0].toLocaleString(),".").concat(t[1])}return Number(e).toLocaleString("en-US",{style:"decimal",maximumFractionDigits:10,maximumSignificantDigits:14})}),[]),W=Object(c.useCallback)((function(e){return z(null===e?u:e)}),[z,u]),G=Object(c.useCallback)((function(e){var t=Object(o.a)(I);I.length>=5&&t.pop(),t.unshift(e),F(t),localStorage.setItem("calculatorPastResults",JSON.stringify(t))}),[I]),K=Object(c.useCallback)((function(e){return function(){var t=e.replace(/,/g,"");P?X():u&&_(z(u)),R(!1),S?(k(!1),n(t),"="===N&&(_(""),d(null),v(null))):n(t),J(!1)}}),[N,z,P,S,u]),Z=Object(c.useCallback)((function(e){return function(){P||function(e){if(null===e)return!1;var t=e.toString(),a=e.length;t.includes(".")&&a--;t.includes("-")&&a--;return a>=13}(a)&&!S||a&&a.includes(".")&&"."===e||(u&&_(z(u)),R(!1),S?(k(!1),n(e.toString()),"="===N&&(_(""),d(null),v(null))):n("."===e?"".concat(a).concat(e):"0"!==a&&a?"-0"===a?"-".concat(e.toString()):"".concat(a).concat(e):e.toString()))}}),[a,N,P,S,u,z]),q=Object(c.useCallback)((function(e){return function(){if(!P){var t;if(k(!0),null!==u&&null!==a&&N){switch(N){case"+":t=Number(u)+Number(a);break;case"-":t=Number(u)-Number(a);break;case"*":t=Number(u)*Number(a);break;case"/":t=Number(u)/Number(a);break;case"^":t=Math.pow(Number(u),Number(a));break;case"=":t=Number(u);break;default:t=Number(u)}if(_("="===N?z(u):"".concat(z(u)," ").concat(N," ").concat(z(a))),!isFinite(t)||isNaN(t))return A(!0),void n("ERROR, CLEAR");if(t>999999999999999||t<-999999999999999)return A(!0),void n("TOO LONG, CLEAR");n(null),R(!0),G(z(t)),d(z(t).replace(/,/g,""))}v(e),"undefined"===typeof t&&a&&(d(Number(a)),n(null))}}}),[a,N,z,P,u,G]),V=Object(c.useCallback)((function(){if(!(E||S||P)){var e=a.length;if(e<=1)return n("0");n(a.slice(0,e-1))}}),[a,E,P,S]),Y=Object(c.useCallback)((function(e){if(e.key>=0&&e.key<=9)return Z(e.key)();if(["*","-","/","+","=","^"].includes(e.key))return q(e.key)();switch(e.key){case".":Z(".")();break;case"Backspace":V();break;case"Escape":X();break;case"Enter":q("=")()}}),[Z,q,V]);function Q(){var e=document.getElementsByClassName("".concat(b.a.container))[0],t=!0===window.navigator.standalone?window.innerHeight-40:window.innerHeight;e.style.height="".concat(t,"px")}function X(){d(null),v(null),n("0"),R(!1),_(null),A(!1)}Object(c.useEffect)((function(){return window.addEventListener("keyup",Y),function(){return window.removeEventListener("keyup",Y)}}),[Y]),window.onresize=Q;var $=[["Clr","operator","clear",X],[Object(r.jsx)(p.b,{}),"operator","backspace",V],[Object(r.jsxs)(r.Fragment,{children:["y",Object(r.jsx)("sup",{children:"a"})]}),"operator","powerOf",q("^")],["\xf7","operator","divide",q("/")],["7","regular","seven",Z(7)],["8","regular","eight",Z(8)],["9","regular","nine",Z(9)],["\xd7","operator","multiply",q("*")],["4","regular","four",Z(4)],["5","regular","five",Z(5)],["6","regular","six",Z(6)],["-","operator","subtract",q("-")],["1","regular","one",Z(1)],["2","regular","two",Z(2)],["3","regular","three",Z(3)],["+","operator","add",q("+")],["0","regular","zero",Z(0)],[".","regular","dot",Z(".")],["\xb1","regular","plusMinus",function(){P||S||("-"===a[0]?n(a.slice(1)):n("-".concat(a)))}],["=","operator","equals",q("=")]];function ee(e){if(e&&"collapse"===e)return J(!1);J(!U)}return Object(r.jsxs)("div",{className:"App",id:"App",children:[Object(r.jsxs)("div",{className:b.a.container,children:[Object(r.jsxs)("div",{className:b.a.displayContainer,children:[Object(r.jsxs)("div",{className:b.a.operatorAndPreviousExpression,children:[Object(r.jsx)("span",{className:b.a.previousExpressionDisplay,children:m}),Object(r.jsx)("span",{className:b.a.currentOperatorDisplay,children:N})]}),Object(r.jsxs)("span",{className:"".concat(b.a.currentNumberDisplay," ").concat(P?b.a.errorCurrentNumber:""),children:[Object(r.jsx)("span",{className:b.a.answer,children:E?"(Ans)":""}),W(a)]})]}),Object(r.jsx)("div",{className:b.a.moreOptionsContainer,children:Object(r.jsx)(f,{cardHeader:Object(r.jsx)("button",{onClick:ee,tabIndex:"-1",className:"".concat(b.a.moreButton," ").concat(U?b.a.expanded:""),children:Object(r.jsx)(p.a,{})}),wrapperClassName:b.a.optionsWrapper,isCollapsed:!U,toggleCollapse:ee,hideOnFocusLost:!1,disableHeaderButton:!0,children:Object(r.jsx)("div",{className:b.a.optionsContainer,children:Object(r.jsxs)("div",{children:[0===I.length?Object(r.jsx)("span",{className:b.a.pastResultsHeader,children:"NO RESULTS"}):Object(r.jsx)("span",{className:b.a.pastResultsHeader,children:"PAST RESULTS"}),I.map((function(e,t){return Object(r.jsx)("button",{className:b.a.pastResult,onClick:K(e),children:e},t)})),I.length>0&&Object(r.jsx)("button",{className:b.a.clearPastResults,onClick:function(){F([]),localStorage.setItem("calculatorPastResults",JSON.stringify([]))},children:"Clear All Results"})]})})})}),Object(r.jsx)("div",{className:b.a.buttonContainer,children:$.map((function(e){return Object(r.jsx)("button",{onClick:e[3],className:"".concat(b.a[e[1]]," ").concat(b.a[e[2]]),"data-operator":e[2],tabIndex:"-1",children:Object(r.jsx)("span",{children:P&&"Clr"!==e[0]?"":e[0]})},e[2])}))})]}),Object(r.jsx)("div",{className:b.a.shadeBottomOnStandalone})]})},g=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,21)).then((function(t){var a=t.getCLS,r=t.getFID,c=t.getFCP,n=t.getLCP,s=t.getTTFB;a(e),r(e),c(e),n(e),s(e)}))};l.a.render(Object(r.jsx)(n.a.StrictMode,{children:Object(r.jsx)(_,{})}),document.getElementById("root")),g()},2:function(e,t,a){e.exports={container:"calculator_container__erLDa",displayContainer:"calculator_displayContainer__N_Z89",operatorAndPreviousExpression:"calculator_operatorAndPreviousExpression__1kCpj",previousExpressionDisplay:"calculator_previousExpressionDisplay__1UPcv",answer:"calculator_answer__1IiIg",moreOptionsContainer:"calculator_moreOptionsContainer__1uz2W",optionsWrapper:"calculator_optionsWrapper__pdYmM",optionsContainer:"calculator_optionsContainer__1bEgD",pastResultsHeader:"calculator_pastResultsHeader__1AKMK",pastResult:"calculator_pastResult__1xkiL",clearPastResults:"calculator_clearPastResults__GIK2u",moreButton:"calculator_moreButton__1TVzB",expanded:"calculator_expanded__2uhyE",buttonContainer:"calculator_buttonContainer__3bHps",currentNumberDisplay:"calculator_currentNumberDisplay__2Rjfr",errorCurrentNumber:"calculator_errorCurrentNumber__LcM2C",operator:"calculator_operator__l6BBo",clear:"calculator_clear__1MR2H",backspace:"calculator_backspace__3zj3M",powerOf:"calculator_powerOf__3SGrJ",multiply:"calculator_multiply__39pZU",shadeBottomOnStandalone:"calculator_shadeBottomOnStandalone__n3UUZ"}}},[[18,1,2]]]);
//# sourceMappingURL=main.cf267d5c.chunk.js.map