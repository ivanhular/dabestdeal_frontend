(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[17],{190:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(160),l=a(164),o=a(106);t.a=function(e){var t=e.children,a=e.fluid;return r.a.createElement(c.a,{fluid:a},r.a.createElement(l.a,{className:"justify-content-md-center"},r.a.createElement(o.a,{xs:12,md:6},t)))}},669:function(e,t,a){"use strict";a.r(t);var n=a(8),r=a(54),c=a(9),l=a.n(c),o=a(14),u=a(72),i=a(15),s=a.n(i),m=a(0),d=a.n(m),p=a(18),f=a(165),b=a(168),g=a(164),E=a(106),v=a(107),h=a(155),j=a(218),O=a(22),y=a(50),k=a(37),C=a(190),w=a(78),I=a(278),S=a(525),N=a(526),x=a.n(N),_=(a(527),function(e){var t=e.description,a=void 0===t?"":t,n=e.setHtmlDesc,r=Object(I.convertFromHTML)(a),c=I.ContentState.createFromBlockArray(r.contentBlocks,r.entityMap),l=Object(m.useState)(I.EditorState.createWithContent(c)),o=Object(u.a)(l,2),i=o[0],s=o[1];return d.a.createElement("div",null,d.a.createElement(S.Editor,{editorState:i,toolbarClassName:"toolbar-wrap",wrapperClassName:"editor-wrap",editorClassName:"editor__body",onEditorStateChange:function(e){s(e),n(x()(Object(I.convertToRaw)(e.getCurrentContent())))}}))}),F=a(53),L=a(59),B=a(36),G=function(e,t){return function(){var a=Object(o.a)(l.a.mark((function a(n,r){var c,o,u;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,c={headers:{withCredentials:!0}},n({type:B.b}),a.next=5,s.a.patch("/api/categories/".concat(e),{segments:t},c);case 5:o=a.sent,u=o.data,console.log(u),n({type:B.c,payload:u}),a.next=14;break;case 11:a.prev=11,a.t0=a.catch(0),n({type:B.a,payload:a.t0.response&&a.t0.response.data.message?a.t0.response.data.message:a.t0.message});case 14:case"end":return a.stop()}}),a,null,[[0,11]])})));return function(e,t){return a.apply(this,arguments)}}()},R=a(7);t.default=function(e){var t=e.match,a=e.history,c=t.params.id,i=Object(O.b)(),I=Object(O.c)((function(e){return e.segmentList})).segments,S=Object(O.c)((function(e){return e.categoryList})).categories,N=Object(O.c)((function(e){return e.productDetails})),x=N.loading,D=N.error,U=N.product,H=Object(O.c)((function(e){return e.productUpdate})),T=H.loading,A=H.error,J=H.success,M=Object(m.useState)(""),P=Object(u.a)(M,2),X=P[0],W=P[1],q=Object(m.useState)(0),z=Object(u.a)(q,2),K=z[0],Q=z[1],V=Object(m.useState)([]),Y=Object(u.a)(V,2)[1],Z=Object(m.useState)([]),$=Object(u.a)(Z,2),ee=$[0],te=$[1],ae=Object(m.useState)([]),ne=Object(u.a)(ae,2),re=ne[0],ce=ne[1],le=Object(m.useRef)(null),oe=Object(m.useRef)(null),ue=Object(m.useState)(),ie=Object(u.a)(ue,2),se=ie[0],me=ie[1],de=Object(m.useState)(),pe=Object(u.a)(de,2),fe=pe[0],be=pe[1],ge=Object(m.useState)(""),Ee=Object(u.a)(ge,2),ve=Ee[0],he=Ee[1],je=Object(m.useState)({}),Oe=Object(u.a)(je,2),ye=Oe[0],ke=Oe[1],Ce=Object(m.useState)([]),we=Object(u.a)(Ce,2),Ie=we[0],Se=we[1],Ne=Object(m.useState)(0),xe=Object(u.a)(Ne,2),_e=xe[0],Fe=xe[1],Le=Object(m.useState)(""),Be=Object(u.a)(Le,2),Ge=Be[0],Re=Be[1],De=Object(m.useState)([]),Ue=Object(u.a)(De,2),He=Ue[0],Te=Ue[1],Ae=Object(m.useState)(!1),Je=Object(u.a)(Ae,2),Me=Je[0],Pe=Je[1];Object(m.useEffect)((function(){console.log(Ge)}),[Ge]),Object(m.useEffect)((function(){i(function(){var e=Object(o.a)(l.a.mark((function e(t){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("/api/segments");case 3:a=e.sent,n=a.data,t({type:L.c,payload:n}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),t({type:L.a,payload:e.t0.response&&e.t0.response.data.message?e.t0.response.data.message:e.t0.message});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}()),i(function(){var e=Object(o.a)(l.a.mark((function e(t){var a,n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("/api/categories");case 3:a=e.sent,n=a.data,t({type:B.f,payload:n}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),t({type:B.d,payload:e.t0.response&&e.t0.response.data.message?e.t0.response.data.message:e.t0.message});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(t){return e.apply(this,arguments)}}())}),[i]),Object(m.useEffect)((function(){J?(i({type:R.B}),i({type:R.n}),a.push("/admin/productlist")):U&&U._id===c?Me||(W(U.name),Q(U.price),he(U.brand),te(U.images),ke(U.segment),Se(U.category),me(U.status),be(U.isFeatured),Fe(U.countInStock),Re(U.description),Te(U.reviews),Pe(!0)):i(Object(F.e)(c))}),[Me,i,a,c,U,J]);var Xe=function(e){return e?void 0!==e.name&&void 0!==e._id?{name:e.name,id:e._id}:e:""},We=function(){var e=Object(o.a)(l.a.mark((function e(t){var a,n,r,o,u,m,d,p;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),a=Xe(ye),n=Xe(Ie),r={withCredentials:!0,headers:{"Content-Type":"multipart/form-data"}},e.prev=4,o=ee,!re.length){e.next=19;break}for((u=new FormData).append("folder","product"),u.append("subFolder",U._id),u.append("modelName","product-".concat(U._id)),m=0;m<re.length;m++)u.append("images",re[m].file);return e.next=14,s.a.post("/api/upload",u,r);case 14:d=e.sent,p=d.data,Y(ee.concat(p.map((function(e,t){return{url:e,isfeaturedImage:!1}})))),o=ee.concat(p.map((function(e){return{url:e,isfeaturedImage:!1}}))),console.log("setNewImages");case 19:a&&n&&i(G(n.id,a.id)),i(Object(F.g)({_id:c,name:X,price:K,images:o,brand:ve,segment:a,category:n,description:Ge,countInStock:_e,status:se,isFeatured:fe,reviews:He})),console.log({_id:c,name:X,price:K,images:o,brand:ve,segment:a,category:n,description:Ge,countInStock:_e,status:se,isFeatured:fe}),e.next=27;break;case 24:e.prev=24,e.t0=e.catch(4),console.log(e.t0.response.message);case 27:case"end":return e.stop()}}),e,null,[[4,24]])})));return function(t){return e.apply(this,arguments)}}(),qe=function(){var e=Object(o.a)(l.a.mark((function e(t){var a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object.keys(t.target.files).map((function(e){return{file:t.target.files[e],blobUrl:window.URL.createObjectURL(t.target.files[e])}})),ce(re.concat(a));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),ze=function(e,t){if("uploaded"===t){var a=Object(r.a)(ee);a.splice(e,1),te(a)}else{var n=Object(r.a)(re);n.splice(e,1),ce(n)}};return d.a.createElement(d.a.Fragment,null,d.a.createElement(p.Link,{to:"/admin/productlist",className:"btn btn-light my-3"},"Go Back"),d.a.createElement(C.a,null,d.a.createElement("h1",null,"Edit Product"),T&&d.a.createElement(k.a,null),A&&d.a.createElement(y.a,{variant:"danger"},A),x?d.a.createElement(k.a,null):D?d.a.createElement(y.a,{variant:"danger"},D):d.a.createElement(f.a,{onSubmit:We},d.a.createElement(f.a.Group,{controlId:"name"},d.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},d.a.createElement(f.a.Label,null,"Name"),d.a.createElement(f.a.Check,{ref:le,type:"switch",id:"custom-switch",label:"Active",defaultChecked:se,onClick:function(e){me(le.current.checked)}})),d.a.createElement(f.a.Control,{type:"name",placeholder:"Enter name",value:X,onChange:function(e){return W(e.target.value)}})),d.a.createElement(f.a.Group,{controlId:"price"},d.a.createElement(f.a.Label,null,"Price"),d.a.createElement(f.a.Control,{type:"number",placeholder:"Enter price",value:K,onChange:function(e){return Q(e.target.value)}})),d.a.createElement(f.a.Group,null,d.a.createElement(f.a.Check,{ref:oe,type:"switch",id:"switch-featured",label:"Home Featured",defaultChecked:fe,onClick:function(e){be(oe.current.checked)}})),d.a.createElement(f.a.Group,null,d.a.createElement(f.a.Label,null,"Images"),d.a.createElement(b.a,null,d.a.createElement(b.a.Body,null,d.a.createElement(g.a,{className:"images-wrap"},ee&&ee.length?ee.map((function(e,t){return d.a.createElement(E.a,{md:3,key:t,className:"product-image",id:t},d.a.createElement("div",{className:"product-image--actions"},d.a.createElement(v.a,{variant:"light",onClick:function(){return ze(t,"uploaded")}},"X")," "),d.a.createElement(h.a,{src:e.url,fluid:!0}),d.a.createElement("div",{className:"product-image__btm--actions"},d.a.createElement(f.a.Check,{value:"isFeaturedImage",label:"Featured",defaultChecked:e.isFeaturedImage,onClick:function(e){!function(e,t){if("uploaded"===t){var a=Object(r.a)(ee);te(a.map((function(t,a){return a===e?Object(n.a)(Object(n.a)({},t),{},{isFeaturedImage:!t.isFeaturedImage}):Object(n.a)(Object(n.a)({},t),{},{isFeaturedImage:!1})})))}}(t,"uploaded")}}),d.a.createElement(f.a.Check,{label:"Banner",value:"isBannerImage",defaultChecked:e.isBannerImage,onClick:function(e){!function(e,t){if("uploaded"===t){var a=Object(r.a)(ee);te(a.map((function(t,a){return a===e?Object(n.a)(Object(n.a)({},t),{},{isBannerImage:!t.isBannerImage}):Object(n.a)(Object(n.a)({},t),{},{isBannerImage:!1})})))}}(t,"uploaded")}})))})):"",re.length?re.map((function(e,t){return d.a.createElement(E.a,{md:3,key:t,className:"product-image"},d.a.createElement("div",{className:"product-image--actions"},d.a.createElement(v.a,{variant:"light",onClick:function(){return ze(t,"new")}},"X")," "),d.a.createElement(h.a,{src:e.blobUrl,fluid:!0}))})):"")),d.a.createElement(b.a.Body,null,d.a.createElement(f.a.File,{id:"image-file",onChange:qe,multiple:!0})))),d.a.createElement(f.a.Group,{controlId:"brand"},d.a.createElement(f.a.Label,null,"Brand"),d.a.createElement(f.a.Control,{type:"text",placeholder:"Enter brand",value:ve,onChange:function(e){return he(e.target.value)}})),d.a.createElement(f.a.Group,{controlId:"countInStock"},d.a.createElement(f.a.Label,null,"Count In Stock"),d.a.createElement(f.a.Control,{type:"number",placeholder:"Enter countInStock",value:_e,onChange:function(e){return Fe(e.target.value)}})),d.a.createElement(f.a.Group,{controlId:"segments"},d.a.createElement(f.a.Label,null,"Segment"),d.a.createElement(f.a.Control,{as:"select",value:ye&&ye.name,onChange:function(e){return ke(I.find((function(t){return t.name===e.target.value})))}},I.length&&I.map((function(e){return d.a.createElement("option",{key:e._id},e.name)})))),d.a.createElement(f.a.Group,{controlId:"categories"},d.a.createElement(f.a.Label,null,"Category"),d.a.createElement(f.a.Control,{as:"select",value:Ie.name,onChange:function(e){return Se(S.find((function(t){return t.name===e.target.value})))}},S.length&&S.map((function(e){return d.a.createElement("option",{key:e._id},e.name)})))),d.a.createElement(f.a.Group,null,d.a.createElement(f.a.Label,null,"Description"),d.a.createElement(_,{description:null===U||void 0===U?void 0:U.description,setHtmlDesc:function(e){Re(e)}})),d.a.createElement(f.a.Group,null,d.a.createElement(f.a.Label,null,"Reviews"),d.a.createElement(b.a,null,d.a.createElement(b.a.Body,null,d.a.createElement(j.a,{variant:"flush"},He.length>0?He.map((function(e){return d.a.createElement(j.a.Item,{key:e._id,className:"review-list"},d.a.createElement(g.a,null,d.a.createElement(E.a,{xs:4,style:{display:"inline-flex"}},e.isReviewed&&d.a.createElement("i",{className:"fa fa-check","aria-hidden":"true",style:{color:"green"}}),d.a.createElement(w.a,{value:e.rating})),d.a.createElement(E.a,null,d.a.createElement("em",null,'"',e.comment,'"')),d.a.createElement(E.a,{className:"product-action-wrap"},d.a.createElement(v.a,{variant:"link"},d.a.createElement("i",{className:"fa fa-check","aria-hidden":"true",style:{color:"green"},onClick:function(t){Te(He.map((function(t){return t._id===e._id?Object(n.a)(Object(n.a)({},t),{},{isReviewed:!e.isReviewed}):Object(n.a)({},t)})))}})),d.a.createElement(v.a,{variant:"link",onClick:function(t){return Te(He.filter((function(t){return t._id!==e._id})))}},d.a.createElement("i",{className:"fa fa-trash","aria-hidden":"true",style:{color:"red"}})))))})):"No reviews yet")))),d.a.createElement(v.a,{type:"submit",variant:"primary"},"Update"))))}}}]);