(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[21],{248:function(e,t,a){"use strict";var n=a(1),r=a(2),l=a(4),c=a.n(l),s=a(0),i=a.n(s),m=a(5),u=i.a.forwardRef((function(e,t){var a=e.bsPrefix,l=e.className,s=e.striped,u=e.bordered,o=e.borderless,d=e.hover,E=e.size,f=e.variant,p=e.responsive,b=Object(r.a)(e,["bsPrefix","className","striped","bordered","borderless","hover","size","variant","responsive"]),g=Object(m.a)(a,"table"),v=c()(l,g,f&&g+"-"+f,E&&g+"-"+E,s&&g+"-striped",u&&g+"-bordered",o&&g+"-borderless",d&&g+"-hover"),h=i.a.createElement("table",Object(n.a)({},b,{className:v,ref:t}));if(p){var N=g+"-responsive";return"string"===typeof p&&(N=N+"-"+p),i.a.createElement("div",{className:N},h)}return h}));t.a=u},665:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(27),c=a(164),s=a(106),i=a(107),m=a(248),u=a(162),o=a(22),d=a(50),E=a(37),f=a(97),p=a(155),b=a(53),g=a(7);t.default=function(e){var t=e.history,a=e.match.params.pageNumber||1,v=Object(o.b)(),h=Object(o.c)((function(e){return e.productList})),N=h.loading,O=h.error,j=h.products,w=h.page,y=h.pages,x=Object(o.c)((function(e){return e.productDelete})),A=x.loading,C=x.error,k=x.success,R=Object(o.c)((function(e){return e.productCreate})),I=R.loading,P=R.error,F=R.success,_=R.product,z=Object(o.c)((function(e){return e.userLogin})).userInfo;Object(n.useEffect)((function(){v({type:g.c}),z&&z.isAdmin||t.push("/login"),F?t.push("/admin/product/".concat(_._id,"/edit")):v(Object(b.f)("",a))}),[v,t,z,k,F,_,a]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{className:"align-items-center"},r.a.createElement(s.a,null,r.a.createElement("h1",null,"Products")),r.a.createElement(s.a,{className:"text-right"},r.a.createElement(i.a,{className:"my-3",size:"sm",onClick:function(){v(Object(b.a)())}},r.a.createElement("i",{className:"fas fa-plus"})," Create Product"))),A&&r.a.createElement(E.a,null),C&&r.a.createElement(d.a,{variant:"danger"},C),I&&r.a.createElement(E.a,null),P&&r.a.createElement(d.a,{variant:"danger"},P),N?r.a.createElement(E.a,null):O?r.a.createElement(d.a,{variant:"danger"},O):r.a.createElement(r.a.Fragment,null,r.a.createElement(m.a,{striped:!0,bordered:!0,hover:!0,responsive:!0,className:"table-sm"},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"IMAGE"),r.a.createElement("th",null,"NAME"),r.a.createElement("th",null,"PRICE"),r.a.createElement("th",null,"SEGMENT"),r.a.createElement("th",null,"CATEGORY"),r.a.createElement("th",null,"BRAND"),r.a.createElement("th",null))),r.a.createElement("tbody",null,j.map((function(e){return r.a.createElement("tr",{key:e._id},r.a.createElement("td",null,e.images[0]?r.a.createElement(p.a,{src:e.images.find((function(e){return e.isFeaturedImage}))?e.images.find((function(e){return e.isFeaturedImage})).url:"https://via.placeholder.com/500x500?text=noimage",fluid:!0,rounded:!0,style:{maxWidth:"50px",maxHeight:"50px"}}):""),r.a.createElement("td",null,e.name," ",e.reviews.reduce((function(e,t){return t.isReviewed?e:e+1}),0)>0&&r.a.createElement(u.a,{pill:!0,variant:"warning"},e.reviews.reduce((function(e,t){return t.isReviewed?e:e+1}),0)," ","new reviews")),r.a.createElement("td",null,"\u20b1",e.price),r.a.createElement("td",null,e.segment&&e.segment.name),r.a.createElement("td",null,e.category&&e.category.name),r.a.createElement("td",null,e.brand),r.a.createElement("td",null,r.a.createElement(l.LinkContainer,{to:"/admin/product/".concat(e._id,"/edit")},r.a.createElement(i.a,{variant:"light",className:"btn-sm"},r.a.createElement("i",{className:"fas fa-edit"}))),r.a.createElement(i.a,{variant:"danger",className:"btn-sm",onClick:function(){return t=e._id,void(window.confirm("Are you sure")&&v(Object(b.c)(t)));var t}},r.a.createElement("i",{className:"fas fa-trash"}))))})))),r.a.createElement(f.a,{pages:y,page:w,isAdmin:!0})))}}}]);