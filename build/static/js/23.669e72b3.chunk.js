(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[23],{654:function(e,a,t){"use strict";t.r(a);var n=t(54),l=t(9),r=t.n(l),c=t(14),i=t(72),o=t(0),m=t.n(o),u=t(18),s=t(15),d=t.n(s),E=t(170),p=t.n(E),v=t(22),f=t(107),g=t(155),b=t(164),h=t(106),k=t(218),w=t(168),I=t(165),y=t(78),O=t(50),j=t(37),C=t(98),S=t(53),F=t(7),x=t(99),N=t(652),A=t(397),P=t.n(A),G=(t(413),t(414),t(415)),L=t.n(G);a.default=function(e){var a=e.history,t=e.match,l=Object(o.useState)(1),s=Object(i.a)(l,2),E=s[0],A=s[1],G=Object(o.useState)(0),R=Object(i.a)(G,2),_=R[0],D=R[1],T=Object(o.useState)(""),B=Object(i.a)(T,2),Y=B[0],q=B[1],H=Object(o.useState)(""),W=Object(i.a)(H,2),J=W[0],M=W[1],z=Object(o.useState)({}),Q=Object(i.a)(z,2),U=Q[0],V=Q[1],K=Object(v.b)(),X=Object(v.c)((function(e){return e.productDetails})),Z=X.loading,$=X.error,ee=X.product,ae=Object(v.c)((function(e){return e.userLogin})).userInfo,te=Object(v.c)((function(e){return e.productReviewCreate})),ne=te.success,le=te.loading,re=te.error,ce=null===ee||void 0===ee?void 0:ee.images.filter((function(e){return!e.isBannerImage}));Object(o.useEffect)((function(){ne&&(D(0),M(""),K(Object(S.e)(t.params.id))),(null===ee||void 0===ee?void 0:ee._id)&&(null===ee||void 0===ee?void 0:ee._id)===t.params.id||(K(Object(S.e)(t.params.id)),K({type:F.f}))}),[K,ee._id,t,ne]);var ie=function(){var e=Object(c.a)(r.a.mark((function e(a){var n,l,c,i,o;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(a.preventDefault(),e.prev=1,n={withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}},(l=new FormData).append("folder","reviews"),l.append("subFolder",ee._id),l.append("modelName","product-".concat(ee._id)),c=0;c<=Object.keys(U).length-1;c++)l.append("images",U[c]);return e.next=10,d.a.post("/api/upload",l,n);case 10:i=e.sent,o=i.data,K(Object(S.b)(t.params.id,{name:Y,rating:_,comment:J,images:o})),e.next=18;break;case 15:e.prev=15,e.t0=e.catch(1),console.log(e.t0);case 18:case"end":return e.stop()}}),e,null,[[1,15]])})));return function(a){return e.apply(this,arguments)}}(),oe={customPaging:function(e){return m.a.createElement(f.a,{variant:"link",style:{width:"100%",height:"100%"}},m.a.createElement(g.a,{src:ce[e].url,fluid:!0}))},dots:!0,dotsClass:"slick-dots slick-thumb",infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1},me={replace:function(e){if(e.attribs&&"remove"===e.attribs.class)return m.a.createElement(m.a.Fragment,null)}};return m.a.createElement(m.a.Fragment,null,m.a.createElement(u.Link,{className:"btn btn-light my-3",to:"/"},m.a.createElement("i",{className:"fas fa-home"})," Go Back"),Z?m.a.createElement(j.a,null):$?m.a.createElement(O.a,{variant:"danger"},$):m.a.createElement(m.a.Fragment,null,m.a.createElement(C.a,{title:ee.name}),m.a.createElement(b.a,null,m.a.createElement(h.a,{md:6,style:{zIndex:"1"},className:"product-image-wrapper"},m.a.createElement(P.a,oe,console.log(ee.images.filter((function(e){return!e.isBannerImage}))),(null===ee||void 0===ee?void 0:ee.images.length)&&ee.images.filter((function(e){return!e.isBannerImage})).map((function(e,a){return m.a.createElement("div",{key:"slide_".concat(a)},m.a.createElement(N.a,{smallImage:{alt:ee.name,isFluidWidth:!0,src:e.url},largeImage:{src:e.url,width:800,height:1e3},lensStyle:{backgroundColor:"rgba(0,0,0,.6)"},shouldHideHintAfterFirstActivation:!1,enlargedImagePosition:"over",isHintEnabled:!0}))})))),m.a.createElement(h.a,{md:3},m.a.createElement(k.a,{variant:"flush"},m.a.createElement(k.a.Item,null,m.a.createElement("h3",null,ee.name)),m.a.createElement(k.a.Item,null,m.a.createElement(y.a,{value:ee.rating,text:"".concat(parseFloat(ee.rating).toFixed(1),"  |  ").concat(ee.numReviews," reviews")})),m.a.createElement(k.a.Item,null,"Price: \u20b1",ee.price),m.a.createElement(k.a.Item,null,"Description:",L()("".concat(ee.description),me)))),m.a.createElement(h.a,{md:3},m.a.createElement(w.a,null,m.a.createElement(k.a,{variant:"flush"},m.a.createElement(k.a.Item,null,m.a.createElement(b.a,null,m.a.createElement(h.a,null,"Price:"),m.a.createElement(h.a,null,m.a.createElement("strong",null,"\u20b1",ee.price)))),m.a.createElement(k.a.Item,null,m.a.createElement(b.a,null,m.a.createElement(h.a,null,"Status:"),m.a.createElement(h.a,null,ee.countInStock>0?"In Stock":"Out Of Stock"))),ee.countInStock>0&&m.a.createElement(k.a.Item,null,m.a.createElement(b.a,null,m.a.createElement(h.a,null,"Qty"),m.a.createElement(h.a,null,m.a.createElement(I.a.Control,{as:"select",value:E,onChange:function(e){return A(e.target.value)}},Object(n.a)(Array(ee.countInStock).keys()).map((function(e){return m.a.createElement("option",{key:e+1,value:e+1},e+1)})))))),m.a.createElement(k.a.Item,null,m.a.createElement(f.a,{onClick:function(){a.push("/cart/".concat(t.params.id,"?qty=").concat(E))},className:"btn-block",type:"button",disabled:ee.countInStock<=0},m.a.createElement("i",{className:"fas fa-cart-plus"})," Add To Cart")))))),m.a.createElement(b.a,null,m.a.createElement(h.a,{md:6,className:"reviews-wrap"},m.a.createElement("h2",null,"Reviews"),0===ee.reviews.length&&m.a.createElement(O.a,null,"No Reviews"),m.a.createElement(x.a,null,m.a.createElement(k.a,{variant:"flush"},ee.reviews.map((function(e){return e.isReviewed&&m.a.createElement(k.a.Item,{key:e._id},m.a.createElement("strong",null,e.name),m.a.createElement(y.a,{value:e.rating}),m.a.createElement("p",null,p()(e.createdAt).format("MM-DD-YYYY h:mmA")),m.a.createElement(b.a,null,e.images.map((function(e){return m.a.createElement(g.a,{src:e,fluid:!0,style:{maxWidth:" 100px"}})}))),m.a.createElement("p",null,e.comment))})),((null===ee||void 0===ee?void 0:ee.isPurchased)||(null===ae||void 0===ae?void 0:ae.isAdmin))&&m.a.createElement(k.a.Item,null,m.a.createElement("h2",null,"Write a Customer Review"),ne&&m.a.createElement(O.a,{variant:"success"},"Thank you for your feedback!"),le&&m.a.createElement(j.a,null),re&&m.a.createElement(O.a,{variant:"danger"},re),ae?m.a.createElement(I.a,{onSubmit:ie},ae.isAdmin&&m.a.createElement(I.a.Group,null,m.a.createElement(I.a.Label,null,"Enter Name"),m.a.createElement(I.a.Control,{onChange:function(e){q(e.target.value)}})),m.a.createElement(I.a.Group,{controlId:"rating"},m.a.createElement(I.a.Label,null,"Rating"),m.a.createElement(I.a.Control,{as:"select",value:_,onChange:function(e){return D(e.target.value)},required:!0},m.a.createElement("option",{value:""},"Select..."),m.a.createElement("option",{value:"1"},"1 - Poor"),m.a.createElement("option",{value:"2"},"2 - Fair"),m.a.createElement("option",{value:"3"},"3 - Good"),m.a.createElement("option",{value:"4"},"4 - Very Good"),m.a.createElement("option",{value:"5"},"5 - Excellent"))),m.a.createElement(I.a.Group,{controlId:"comment"},m.a.createElement(I.a.Label,null,"Comment"),m.a.createElement(I.a.Control,{as:"textarea",row:"3",value:J,required:!0,onChange:function(e){return M(e.target.value)}})),m.a.createElement(I.a.Group,null,m.a.createElement(I.a.Label,null,"Upload Photo"),m.a.createElement(I.a.File,{id:"image-file",onChange:function(e){V(e.target.files)},multiple:!0})),m.a.createElement(f.a,{disabled:le,type:"submit",variant:"primary"},"Submit")):m.a.createElement(O.a,null,"Please ",m.a.createElement(u.Link,{to:"/login"},"sign in")," to write a review"," "))))))))}}}]);