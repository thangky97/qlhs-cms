(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[151],{1363:function(e,t,a){"use strict";a.r(t);var c=a(19),n=(a(566),a(1)),s=a(820),i=a(468),r=a(528),o=a(514),d=a(515),u=a(516),l=a(482),A=a(495),j=a(1258),b=a(1259),O=a(491),p=a(493),h=a(11),f=a(26),v=a(473),w=a(67),g=a.n(w),m=a(479),x=a.n(m),y=a(486),_=a(488),E=a(476),B=a(96),C=a(487),L=a(525),D=a(1248),F=a(542),T=a(471),Y=a(31),k=a(13),M=a(37),G=a(68),S=a(102),Q=a(7),H=Object(B.c)((function(e){var t=e.selected,a=(e.intl,Object(E.c)()),s=(a.register,a.errors),u=a.handleSubmit,l=Object(r.g)(),A=Object(G.c)((function(e){return e.common.language})),j=Object(n.useState)(),b=Object(c.a)(j,2),O=b[0],p=b[1],w=Object(n.useState)(C.a),m=Object(c.a)(w,2),B=(m[0],m[1]),H=Object(n.useState)(),R=Object(c.a)(H,2),z=(R[0],R[1],Object(n.useState)()),I=Object(c.a)(z,2),U=(I[0],I[1],Object(n.useState)(null)),q=Object(c.a)(U,2),W=q[0],X=q[1],J=Object(n.useState)(!1),V=Object(c.a)(J,2),N=V[0],K=V[1],P=Object(n.useState)(y.EditorState.createEmpty()),Z=Object(c.a)(P,2),$=Z[0],ee=Z[1];Object(n.useEffect)((function(){W&&B(W.image)}),[W]),Object(n.useEffect)((function(){(null!==t||null!==t&&null!==W&&t.id!==W.id)&&X(t)}),[t,W]),Object(n.useEffect)((function(){Object(f.a)(Object(h.a)().mark((function e(){var t,a,c,n,s,i,r;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Y.a.send({method:k.a.LIST_ABOUT.method,path:k.a.LIST_ABOUT.path,query:{lang:A}});case 2:(null===(c=e.sent)||void 0===c||null===(t=c.data)||void 0===t||null===(a=t.data)||void 0===a?void 0:a.length)>0&&(p(null===c||void 0===c||null===(n=c.data)||void 0===n||null===(s=n.data[0])||void 0===s?void 0:s.id),ee(Object(v.c)((null===c||void 0===c||null===(i=c.data)||void 0===i||null===(r=i.data[0])||void 0===r?void 0:r.user_guide_cloud)||" ")));case 4:case"end":return e.stop()}}),e)})))()}),[]);var te=function(){var e=Object(f.a)(Object(h.a)().mark((function e(){var t,a,c,n;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=x()(Object(y.convertToRaw)($.getCurrentContent())),K(!0),e.next=4,Y.a.send({method:k.a.GET_ABOUT.method,path:k.a.GET_ABOUT.path,query:{lang:A,id:O}});case 4:return a=e.sent,c=a.data,n={id:c.id,data:{about:c.about||" ",lang:c.lang,address_1:c.address_1||" ",address_2:c.address_2||" ",section_intro_1:c.section_intro_1||" ",section_intro_2:c.section_intro_2||" ",section_intro_3:c.section_intro_3||" ",section_product:c.section_product||" ",section_partner:c.section_partner||" ",section_service:c.section_service||" ",section_about:c.section_about||" ",privacy_policy:c.privacy_policy||" ",company_name:c.company_name||" ",founded:c.founded||" ",officer:c.officer||" ",advisor:c.advisor||" ",faq:c.faq||" ",terms_of_use:c.terms_of_use||" ",my_cloud:c.my_cloud||" ",user_guide_cloud:t||" ",link_cloud:c.link_cloud||" "}},e.next=9,Y.a.send({method:k.a.UPDATE_ABOUT.method,path:k.a.UPDATE_ABOUT.path,data:n}).then((function(e){if(e){var t=e.statusCode;e.data;200===t?(M.c.success(Object(Q.jsx)(i.a,{id:"Update successful!"})),l.goBack()):400==t&&(M.c.warn(Object(Q.jsx)(i.a,{id:"Update failed!"})),K(!1))}})).catch((function(e){K(!1)}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ae=function(){var e=Object(f.a)(Object(h.a)().mark((function e(t){var a,c,n,s,i;return Object(h.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=C.a,e.next=3,Object(S.a)(t);case 3:if(!(c=e.sent)){e.next=10;break}if(!(n=c.replace(/,/gi,"").split("base64"))[1]){e.next=10;break}return i={imageData:n[1],imageFormat:(null===t||void 0===t||null===(s=t.type)||void 0===s?void 0:s.split("/")[1])||"png"},e.next=10,Object(S.g)(i,t).then((function(e){a=null===e||void 0===e?void 0:e.data}));case 10:return e.abrupt("return",new Promise((function(e,t){e({data:{link:a}})})));case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(Q.jsx)(o.a,{children:Object(Q.jsx)(d.a,{sm:"12",children:Object(Q.jsxs)(L.a,{onSubmit:u(te),children:[Object(Q.jsxs)(D.a,{children:[Object(Q.jsxs)(F.a,{for:"privacy_description",children:[Object(Q.jsx)(i.a,{id:"Description"})," ",Object(Q.jsx)("span",{className:"text-danger"})]}),Object(Q.jsx)(_.Editor,{stripPastedStyles:!0,toolbar:{image:{uploadCallback:ae}},defaultEditorState:$,editorState:$,onEditorStateChange:function(e){return ee(e)},name:"privacy_description",className:g()({"is-invalid":s.privacy_description})}),Object(Q.jsx)("small",{className:"text-danger",children:(null===s||void 0===s?void 0:s.description_en)&&s.description_en.message})]}),Object(Q.jsxs)("div",{style:{textAlign:"end"},children:[Object(Q.jsx)(T.a,{type:"submit",className:"mr-1",color:"primary",disabled:N,children:Object(Q.jsx)(i.a,{id:"update"})}),Object(Q.jsx)(T.a,{type:"reset",color:"secondary",outline:!0,onClick:function(){return l.goBack()},children:Object(Q.jsx)(i.a,{id:"Cancel"})})]})]})})})}));t.default=function(){var e=Object(n.useState)(null),t=Object(c.a)(e,2),a=t[0],h=(t[1],Object(n.useState)("1")),f=Object(c.a)(h,2),v=f[0],w=f[1];Object(r.i)().id;return Object(Q.jsx)(o.a,{className:"app-user-edit",children:Object(Q.jsx)(d.a,{sm:"12",children:Object(Q.jsx)(u.a,{children:Object(Q.jsxs)(l.a,{className:"pt-2",children:[Object(Q.jsx)(A.a,{pills:!0,children:Object(Q.jsx)(j.a,{children:Object(Q.jsxs)(b.a,{active:"1"===v,onClick:function(){return w("1")},children:[Object(Q.jsx)(s.a,{size:14}),Object(Q.jsx)("span",{className:"align-middle d-none d-sm-block",children:Object(Q.jsx)(i.a,{id:"User guide cloud"})})]})})}),Object(Q.jsx)(O.a,{activeTab:v,children:Object(Q.jsx)(p.a,{tabId:"1",children:Object(Q.jsx)(H,{selected:a})})})]})})})})}},487:function(e,t,a){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA8AAAAMcAQMAAACl5F6MAAAABlBMVEW8vsDn6OnyCdevAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEbUlEQVR4AezBMQEAAADCoPVP7WsIoAcAAAAAAAAAAAAAAAAAAAAAAIydO0iOk4eCAGyVXNEuukF0FB1NHE1H0RG0ZEHRf5A99WYMk1T+Kvolw+vVjBf+CkMLoRCFWQkuqCquB3QOOQKrCpwBKJ1i6Jxk/EzTubaArgAHQOeyjhu8aMEafUrYolLjLRMfLrpw5cMYadeBnTLcrwN7ZXi+DhyuCi8GG/xy8Gyw3SRe7n7cLzfnajah5z87keFJ//lYf0WAAq+vv+rDX+fir+zpr2Xqr95qrle/ywr9OxX+/nF19fGRmR/yrzCJCudRqNHiNDHhIlquTBgCF2aX3V2BwYT9nUYdNoNojnqjiKJ56q0xiRaok4EsWqQO2EW0RJ3wQbTMvDc6iFaYswEvkx5Hnf8E0Tx1xhcfj3gh1lhOLHVWnx8vLvBq/FAnYpGBhwEElVfjhyETjVjj5bFanATpLrHIcpDkIstpJRdZLmRykaW63CLLMZKLLGeVXGS5jvlFluZKq8k1lnGMXGMZuck1lnsVu8ZydybXWOYj5BrLDIxcY5lz8mrML/JupPIC02osf3tyjeVqY9dYikys8QlTAUIsFovFYrFYLJaIP8hq8D4GG2ywwQYbbLDBBhtssMEGG2ywwQYb3N9+G/ePwQYbbLDBBhtssMEGG5yhA3ugqcARmFXgDKwqcAGgAsu+J1zYy94UXDjIRxosH+crwUm2euHCWX43Fy7YciUYI9N1YIeRavDpsMdIM9jgs+BOh4PBavA3ras6aMFRC06TEpyrLsy/H5emBKOrwvxZpsOsA3ssOk8SQQ9edZ4WI6DzfJwU4Ym/FCE7ofFXfQoJlnUugRsHdl9GTKBzlxRF6vzVW9kngr5eLTB5hT6MUhPgLfdDRhwQCQ79TQXe756tAWcp10XgIuMYF8aWxoedLtz5sB/wzIeDLrzw4QiRqHBSgOvnwLWFCrc7eCLCbnwrXFh2ZMdHKhEOyx3ciHBch8OHE2TtCZ0IZ0wCz1S4jhGTDhc0ecN9IcLja/qEVwIswqwC+/H3zfgMDw7j95cbPBFg+YEKnIaGWyoNzpvmcEujws0rwGX7LnCnwWOgDLhlZsFuaJEP+zFCC7yw4DCAhFtWFhwHl/lwwpeowRMJzlpw+QpXEgwl2O3gxoH9Du4cOOzgmQNHLTjt4OXF4byDVw5csAsHhhLssM/EgD32qQw4aMER+zQtuDPgpAVn7DMz4IJ9FgYMJdgdwSsB9jgKAQ5acDyEJy24ng8nLTgfwu18uBzC/XwYSrA7hmfCeyCHWU6Hw18Gr4R3fY5zOpy04PwEngj/KfYw9WwYSrB7BjfCW4qH6a8Kh2fwTHgF9jDLyXDSgvMzeKW8UX6Uk2Eowe45PL0m7J/D9VQ4aMG/isH/JwYbbLDBBhtssMEGG2ywtz3K/2tvDmQAAAAABvlbn+NbCSQWi8VisVgsFovFYrFYLBYvAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEHVJjR5bJLd8AAAAASUVORK5CYII="}}]);
//# sourceMappingURL=151.4f5af559.chunk.js.map