(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[13],{190:function(e,t,n){"use strict";var o=n(0),a=n.n(o),r=n(160),i=n(164),s=n(106);t.a=function(e){var t=e.children,n=e.fluid;return a.a.createElement(r.a,{fluid:n},a.a.createElement(i.a,{className:"justify-content-md-center"},a.a.createElement(s.a,{xs:12,md:6},t)))}},247:function(e,t,n){"use strict";var o=n(0),a=n.n(o),r=n(22),i=n(379),s=n(107),c=n(66);t.a=function(e){var t=e.size,n=void 0===t?"lg":t,o=e.title,l=e.children,u=e.closeText,f=void 0===u?"close":u,p=e.showClose,d=e.closeButton,b=e.className,m=Object(r.b)(),h=Object(r.c)((function(e){return e.appSettings})).modal,y=function(){return m({type:c.a})};return a.a.createElement(i.a,{show:h,size:n,"aria-labelledby":"contained-modal-title-vcenter",centered:!0,onHide:y,className:b},a.a.createElement(i.a.Header,{closeButton:d},a.a.createElement(i.a.Title,{id:"contained-modal-title-vcenter"},o)),a.a.createElement(i.a.Body,null,l),a.a.createElement(i.a.Footer,null,p&&a.a.createElement(s.a,{onClick:y},f)))}},429:function(e,t,n){var o;e.exports=(o=n(0),function(e){function t(o){if(n[o])return n[o].exports;var a=n[o]={exports:{},id:o,loaded:!1};return e[o].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=n(8)},function(e,t,n){e.exports=n(6)()},function(e,t){e.exports=o},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){return decodeURIComponent(e.replace(new RegExp("^(?:.*[&\\?]"+encodeURIComponent(t).replace(/[\.\+\*]/g,"\\$&")+"(?:\\=([^&]*))?)?.*$","i"),"$1"))}},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=o(n(2)),l=o(n(1)),u=o(n(5)),f=o(n(3)),p=function(e){function t(){var e,n,o;a(this,t);for(var s=arguments.length,c=Array(s),l=0;l<s;l++)c[l]=arguments[l];return n=o=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),o.state={isSdkLoaded:!1,isProcessing:!1},o.responseApi=function(e){window.FB.api("/me",{locale:o.props.language,fields:o.props.fields},(function(t){i(t,e),o.props.callback(t)}))},o.checkLoginState=function(e){o.setStateIfMounted({isProcessing:!1}),e.authResponse?o.responseApi(e.authResponse):o.props.onFailure?o.props.onFailure({status:e.status}):o.props.callback({status:e.status})},o.checkLoginAfterRefresh=function(e){"connected"===e.status?o.checkLoginState(e):window.FB.login((function(e){return o.checkLoginState(e)}),!0)},o.click=function(e){if(o.state.isSdkLoaded&&!o.state.isProcessing&&!o.props.isDisabled){o.setState({isProcessing:!0});var t=o.props,n=t.scope,a=t.appId,r=t.onClick,i=t.returnScopes,s=t.responseType,c=t.redirectUri,l=t.disableMobileRedirect,f=t.authType,p=t.state;if("function"!=typeof r||(r(e),!e.defaultPrevented)){var d={client_id:a,redirect_uri:c,state:p,return_scopes:i,scope:n,response_type:s,auth_type:f};if(o.props.isMobile&&!l)window.location.href="https://www.facebook.com/dialog/oauth"+(0,u.default)(d);else{if(!window.FB)return void(o.props.onFailure&&o.props.onFailure({status:"facebookNotLoaded"}));window.FB.login(o.checkLoginState,{scope:n,return_scopes:i,auth_type:d.auth_type})}}}},r(o,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),s(t,[{key:"componentDidMount",value:function(){if(this._isMounted=!0,document.getElementById("facebook-jssdk"))this.sdkLoaded();else{this.setFbAsyncInit(),this.loadSdkAsynchronously();var e=document.getElementById("fb-root");e||((e=document.createElement("div")).id="fb-root",document.body.appendChild(e))}}},{key:"componentWillReceiveProps",value:function(e){this.state.isSdkLoaded&&e.autoLoad&&!this.props.autoLoad&&window.FB.getLoginStatus(this.checkLoginAfterRefresh)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"setStateIfMounted",value:function(e){this._isMounted&&this.setState(e)}},{key:"setFbAsyncInit",value:function(){var e=this,t=this.props,n=t.appId,o=t.xfbml,a=t.cookie,r=t.version,i=t.autoLoad;window.fbAsyncInit=function(){window.FB.init({version:"v"+r,appId:n,xfbml:o,cookie:a}),e.setStateIfMounted({isSdkLoaded:!0}),(i||e.isRedirectedFromFb())&&window.FB.getLoginStatus(e.checkLoginAfterRefresh)}}},{key:"isRedirectedFromFb",value:function(){var e=window.location.search;return(0,f.default)(e,"code")||(0,f.default)(e,"granted_scopes")}},{key:"sdkLoaded",value:function(){this.setState({isSdkLoaded:!0})}},{key:"loadSdkAsynchronously",value:function(){var e=this.props.language;!function(t,n,o){var a=t.getElementsByTagName(n)[0],r=a,i=a;t.getElementById(o)||((i=t.createElement(n)).id=o,i.src="https://connect.facebook.net/"+e+"/sdk.js",r.parentNode.insertBefore(i,r))}(document,"script","facebook-jssdk")}},{key:"render",value:function(){var e=this.props.render;if(!e)throw new Error("ReactFacebookLogin requires a render prop to render");var t={onClick:this.click,isDisabled:!!this.props.isDisabled,isProcessing:this.state.isProcessing,isSdkLoaded:this.state.isSdkLoaded};return this.props.render(t)}}]),t}(c.default.Component);p.propTypes={isDisabled:l.default.bool,callback:l.default.func.isRequired,appId:l.default.string.isRequired,xfbml:l.default.bool,cookie:l.default.bool,authType:l.default.string,scope:l.default.string,state:l.default.string,responseType:l.default.string,returnScopes:l.default.bool,redirectUri:l.default.string,autoLoad:l.default.bool,disableMobileRedirect:l.default.bool,isMobile:l.default.bool,fields:l.default.string,version:l.default.string,language:l.default.string,onClick:l.default.func,onFailure:l.default.func,render:l.default.func.isRequired},p.defaultProps={redirectUri:"undefined"!=typeof window?window.location.href:"/",scope:"public_profile,email",returnScopes:!1,xfbml:!1,cookie:!1,authType:"",fields:"name",version:"2.3",language:"en_US",disableMobileRedirect:!1,isMobile:function(){var e=!1;try{e=!!(window.navigator&&window.navigator.standalone||navigator.userAgent.match("CriOS")||navigator.userAgent.match(/mobile/i))}catch(t){}return e}(),onFailure:null,state:"facebookdirect",responseType:"code"},t.default=p},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return"?"+Object.keys(e).map((function(t){return t+"="+encodeURIComponent(e[t])})).join("&")}},function(e,t,n){"use strict";function o(){}var a=n(7);e.exports=function(){function e(e,t,n,o,r,i){if(i!==a){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e;var n={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t};return n.checkPropTypes=o,n.PropTypes=n,n}},function(e,t){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}Object.defineProperty(t,"__esModule",{value:!0});var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e},s=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),c=o(n(2)),l=o(n(1)),u=o(n(9)),f=o(n(4)),p=function(e){function t(){return a(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),s(t,[{key:"style",value:function(){var e=this.constructor.defaultProps.cssClass;return this.props.cssClass===e&&c.default.createElement("style",{dangerouslySetInnerHTML:{__html:u.default}})}},{key:"containerStyle",value:function(e){var t=e.isProcessing,n=e.isSdkLoaded,o=e.isDisabled,a={transition:"opacity 0.5s"};return(t||!n||o)&&(a.opacity=.6),i(a,this.props.containerStyle)}},{key:"renderOwnButton",value:function(e){var t=this.props,n=t.cssClass,o=t.size,a=t.icon,r=t.textButton,s=t.typeButton,l=t.buttonStyle,u=e.onClick,f="string"==typeof a,p={};return e.isDisabled&&function(e){return["button","input","select","textarea","optgroup","option","fieldset"].indexOf((e+"").toLowerCase())>=0}(this.props.tag)&&(p.disabled=!0),c.default.createElement("span",{style:this.containerStyle(e)},f&&c.default.createElement("link",{rel:"stylesheet",href:"https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"}),c.default.createElement(this.props.tag,i({type:s,className:n+" "+o,style:l,onClick:u},p),a&&f&&c.default.createElement("i",{className:"fa "+a}),a&&!f&&a,r),this.style())}},{key:"render",value:function(){var e=this;return c.default.createElement(f.default,i({},this.props,{render:function(t){return e.renderOwnButton(t)}}))}}]),t}(c.default.Component);p.propTypes={textButton:l.default.string,typeButton:l.default.string,size:l.default.string,cssClass:l.default.string,icon:l.default.any,containerStyle:l.default.object,buttonStyle:l.default.object,tag:l.default.oneOfType([l.default.node,l.default.func])},p.defaultProps={textButton:"Login with Facebook",typeButton:"button",size:"metro",fields:"name",cssClass:"kep-login-facebook",tag:"button"},t.default=p},function(e,t,n){(t=e.exports=n(10)()).push([e.id,".kep-login-facebook{font-family:Helvetica,sans-serif;font-weight:700;-webkit-font-smoothing:antialiased;color:#fff;cursor:pointer;display:inline-block;font-size:calc(.27548vw + 12.71074px);text-decoration:none;text-transform:uppercase;transition:background-color .3s,border-color .3s;background-color:#4c69ba;border:calc(.06887vw + .67769px) solid #4c69ba;padding:calc(.34435vw + 13.38843px) calc(.34435vw + 18.38843px)}.kep-login-facebook.small{padding:calc(.34435vw + 3.38843px) calc(.34435vw + 8.38843px)}.kep-login-facebook.medium{padding:calc(.34435vw + 8.38843px) calc(.34435vw + 13.38843px)}.kep-login-facebook.metro{border-radius:0}.kep-login-facebook .fa{margin-right:calc(.34435vw + 3.38843px)}",""]),t.locals={"kep-login-facebook":"kep-login-facebook",small:"small",medium:"medium",metro:"metro",fa:"fa"}},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},a=0;a<this.length;a++){var r=this[a][0];"number"==typeof r&&(o[r]=!0)}for(a=0;a<t.length;a++){var i=t[a];"number"==typeof i[0]&&o[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),e.push(i))}},e}}]))},656:function(e,t,n){"use strict";n.r(t);var o=n(8),a=n(72),r=n(0),i=n.n(r),s=n(18),c=n(22),l=n(165),u=n(107),f=n(164),p=n(106),d=n(429),b=n.n(d),m=n(50),h=n(37),y=n(247),g=n(190),v=n(34),k=n(66);t.default=function(e){var t=e.location,n=e.history,d=Object(r.useState)(""),w=Object(a.a)(d,2),E=w[0],O=w[1],j=Object(r.useState)(""),_=Object(a.a)(j,2),S=_[0],x=_[1],C=Object(r.useState)(""),L=Object(a.a)(C,2),P=L[0],I=L[1],R=Object(r.useState)(!1),T=Object(a.a)(R,2),F=T[0],B=T[1],M=Object(c.b)(),N=Object(c.c)((function(e){return e.userLogin})),A=N.loading,D=N.error,U=N.userInfo,z=Object(c.c)((function(e){return e.userCheck})),q=z.userExist,H=z.isFacebookButtonClicked,$=t.search?t.search.split("=")[1]:"/",G=Object(r.useState)({}),W=Object(a.a)(G,2),J=W[0],Y=W[1];Object(r.useEffect)((function(){U?n.push($):H&&M(q?Object(v.e)(J.email):{type:k.b})}),[M,J,q,H,n,U,$]);return i.a.createElement(i.a.Fragment,null,i.a.createElement(y.a,{size:"md",title:"Enter Phone Number",showClose:!1},i.a.createElement(l.a,{onSubmit:function(e){e.preventDefault();var t=J.firstName,n=J.lastName,o=J.email,a=J.id;M(Object(v.g)({firstName:t,lastName:n,phone:P,email:o,isFbAutheticated:!0,facebookID:a}))}},i.a.createElement(l.a.Group,{controlId:"formPhone"},i.a.createElement(l.a.Control,{type:"tel",pattern:"^(09|\\+639)\\d{9}$",placeholder:"E.g 09123456789",value:P,onChange:function(e){return I(e.target.value)}})),i.a.createElement(u.a,{variant:"primary",type:"submit",size:"sm"},"Submit"))),i.a.createElement(g.a,{fluid:"sm"},i.a.createElement("h1",null,"Sign In"),D&&i.a.createElement(m.a,{variant:"danger"},D),A&&i.a.createElement(h.a,null),i.a.createElement(l.a,{onSubmit:function(e){e.preventDefault(),M(Object(v.e)(E,S))}},i.a.createElement(l.a.Group,{controlId:"email"},i.a.createElement(l.a.Label,null,"Email Address"),i.a.createElement(l.a.Control,{type:"email",placeholder:"Enter email",value:E,onChange:function(e){return O(e.target.value)}})),i.a.createElement(l.a.Group,{controlId:"password"},i.a.createElement(l.a.Label,null,"Password"),i.a.createElement("div",{style:{position:"relative"}},i.a.createElement(l.a.Control,{type:F?"text":"password",placeholder:"Enter password",value:S,onChange:function(e){return x(e.target.value)},required:!0}),i.a.createElement(u.a,{variant:"link",onClick:function(e){e.preventDefault(),B(!F)},style:{position:"absolute",right:"20px",top:"50%",transform:"translateY(-50%)"}},i.a.createElement("i",{className:"fas fa-eye".concat(F?"":"-slash")})))),i.a.createElement(u.a,{type:"submit",variant:"primary",size:"md",block:!0},"Sign In"),i.a.createElement("div",{className:"separator"},"or"),i.a.createElement(b.a,{appId:"1068718970238644",autoLoad:!1,fields:"name,email,picture",scope:"public_profile,email",callback:function(e){e.accessToken&&(M(Object(v.c)(e.email)),Y(Object(o.a)(Object(o.a)({},e),function(e){var t=e.split(" ");return{firstName:t.filter((function(e,n){return n!==t.length-1})).join(" "),lastName:t[t.length-1]}}(e.name))),console.log(z))},disableMobileRedirect:!0,isMobile:!1,redirectUri:"https://dabestdeal.com/",icon:"fa-facebook"})),i.a.createElement(f.a,{className:"py-3"},i.a.createElement(p.a,null,"New Customer?"," ",i.a.createElement(s.Link,{to:$?"/register?redirect=".concat($):"/register"},"Register")))))}}}]);