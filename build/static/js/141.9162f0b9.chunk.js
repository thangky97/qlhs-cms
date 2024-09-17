(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[141],{1335:function(e,t,a){"use strict";a.r(t);var s=a(19),r=a(1),i=a(790),n=a(468),c=a(68),d=a(528),u=a(514),j=a(515),m=a(516),l=a(482),o=a(495),b=a(1258),h=a(1259),O=a(491),x=a(493),f=a(494),v=a(574),g=a(11),p=a(0),q=a(26),T=a(96),E=(a(484),a(473)),L=a(67),y=a.n(L),A=a(476),_=a(1256),I=a(525),C=a(1248),N=a(542),S=a(1255),P=a(471),w=a(474),R=a(479),D=a.n(R),M=a(486),G=a(488),k=(a(546),a(7)),U=Object(T.c)((function(e){var t,a,i,m=e.selected,l=e.intl,o=Object(c.c)((function(e){return e.category})),b=Object(A.c)(),h=b.register,O=b.errors,x=b.handleSubmit,f=Object(d.g)(),T=Object(r.useState)(null),L=Object(s.a)(T,2),R=L[0],U=L[1],Y=Object(c.c)((function(e){return e.common.language})),$=Object(c.b)(),B=Object(r.useState)(null),K=Object(s.a)(B,2),V=K[0],F=K[1],z=Object(r.useState)(!1),J=Object(s.a)(z,2),W=J[0],H=J[1],Q=Object(d.i)().id,X=(Object(c.c)((function(e){return e.kind})).data,Object(r.useState)()),Z=Object(s.a)(X,2),ee=Z[0],te=Z[1],ae={value:null===o||void 0===o||null===(t=o.categoryDetail)||void 0===t?void 0:t.id,label:null===o||void 0===o||null===(a=o.categoryDetail)||void 0===a?void 0:a.name},se=Object(r.useState)(ee),re=Object(s.a)(se,2),ie=(re[0],re[1]),ne=w.a.EditCategoryOptions;Object(r.useEffect)((function(){o&&te(ae)}),[o]),Object(r.useEffect)((function(){ee&&ie(ee)}),[ee]),Object(r.useEffect)((function(){var e;null!==o&&void 0!==o&&null!==(e=o.err)&&void 0!==e&&e.statusCode&&H(!1)}),[null===o||void 0===o?void 0:o.err]),Object(r.useEffect)((function(){$(Object(v.e)(null===m||void 0===m?void 0:m.categoryId))}),[$,null===m||void 0===m?void 0:m.categoryId]),Object(r.useEffect)((function(){$(Object(v.d)({filter:{status:1,lang:Y},skip:0,limit:20,order:{key:"name",value:"desc"}}))}),[$]);var ce=Object(r.useState)(M.EditorState.createEmpty()),de=Object(s.a)(ce,2),ue=de[0],je=de[1];Object(r.useEffect)((function(){(null!==m||null!==m&&null!==R&&m.id!==R.id)&&U(m)}),[m,R]),Object(r.useEffect)((function(){200===o.status&&(Object(E.g)(),f.push("/apps/category/list"))}),[o.status,f]);var me=function(){var e=Object(q.a)(Object(g.a)().mark((function e(t){var a;return Object(g.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=D()(Object(M.convertToRaw)(ue.getCurrentContent())),Object(E.d)(O)&&(H(!0),$(Object(v.f)({id:parseInt(Q),data:Object(p.a)(Object(p.a)({},t),{},{name:t.name,status:parseInt(t.status),description:a,categoryId:"52",lang:Y})})));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){R&&(F(R.status),je(Object(E.c)((null===R||void 0===R?void 0:R.description)||" ")))}),[R]),Object(k.jsxs)(u.a,{children:[Object(k.jsx)(j.a,{sm:"12",children:Object(k.jsx)(_.a,{className:"mb-2",children:Object(k.jsx)(_.a,{className:"mt-50",body:!0,children:Object(k.jsxs)("h4",{children:[m.name," "]})})})}),Object(k.jsx)(j.a,{sm:"12",children:Object(k.jsxs)(I.a,{onSubmit:x(me),children:[Object(k.jsxs)(C.a,{children:[Object(k.jsxs)(N.a,{for:"name",children:[Object(k.jsx)(n.a,{id:"catename"})," ",Object(k.jsx)("span",{className:"text-danger",children:"*"})]}),Object(k.jsx)(S.a,{name:"name",id:"name",innerRef:h(ne.name),onBlur:function(){var e=document.getElementById("name");e&&e.value&&(e.value=e.value.trim())},className:y()({"is-invalid":O.name}),defaultValue:R&&R.name}),Object(k.jsx)("small",{className:"text-danger",children:(null===O||void 0===O?void 0:O.name)&&O.name.message}),"validate"===(null===O||void 0===O||null===(i=O.name)||void 0===i?void 0:i.type)&&Object(k.jsx)("small",{className:"text-danger",children:Object(k.jsx)(n.a,{id:"Invalid category name"})})]}),Object(k.jsxs)(C.a,{children:[Object(k.jsxs)(N.a,{for:"description",children:[Object(k.jsx)(n.a,{id:"Description"})," "]}),Object(k.jsx)(G.Editor,{stripPastedStyles:!0,toolbar:{options:["inline","textAlign"],inline:{inDropdown:!1,options:["bold","italic","underline"]}},editorState:ue,onEditorStateChange:function(e){return je(e)},name:"description",innerRef:h(ne.description_en),className:y()({"is-invalid":O.description})}),Object(k.jsx)("small",{className:"text-danger",children:(null===O||void 0===O?void 0:O.description_en)&&O.description_en.message})]}),Object(k.jsxs)(C.a,{children:[Object(k.jsx)(N.a,{for:"status",children:Object(k.jsx)(n.a,{id:"Status"})}),Object(k.jsxs)(S.a,{type:"select",name:"status",value:V,onChange:function(e){return F(e.target.value)},id:"status",innerRef:h({required:!0}),children:[Object(k.jsx)("option",{value:"1",children:l.formatMessage({id:"Active"})}),Object(k.jsx)("option",{value:"2",children:l.formatMessage({id:"Blocked"})})]})]}),Object(k.jsxs)("div",{style:{textAlign:"end",marginTop:"145px"},children:[Object(k.jsx)(P.a,{type:"submit",className:"mr-1",color:"primary",disabled:W,children:Object(k.jsx)(n.a,{id:"update"})}),Object(k.jsx)(P.a,{type:"reset",color:"secondary",outline:!0,onClick:function(){return f.goBack()},children:Object(k.jsx)(n.a,{id:"Cancel"})})]})]})})]})}));t.default=function(){var e=Object(r.useState)("1"),t=Object(s.a)(e,2),a=t[0],g=t[1],p=Object(c.c)((function(e){return e.category})),q=Object(c.b)(),T=Object(d.i)().id;return Object(r.useEffect)((function(){q(Object(v.b)(parseInt(T)))}),[q]),null!==p.selected&&void 0!==p.selected?Object(k.jsx)(u.a,{className:"app-user-edit",children:Object(k.jsx)(j.a,{sm:"12",children:Object(k.jsx)(m.a,{children:Object(k.jsxs)(l.a,{className:"pt-2",children:[Object(k.jsx)(o.a,{pills:!0,children:Object(k.jsx)(b.a,{children:Object(k.jsxs)(h.a,{active:"1"===a,onClick:function(){return g("1")},children:[Object(k.jsx)(i.a,{size:14}),Object(k.jsx)("span",{className:"align-middle d-none d-sm-block",children:Object(k.jsx)(n.a,{id:"productCategoryCourse"})})]})})}),Object(k.jsx)(O.a,{activeTab:a,children:Object(k.jsx)(x.a,{tabId:"1",children:Object(k.jsx)(U,{selected:p.selected,store:p})})})]})})})}):Object(k.jsx)(f.a,{color:"danger",children:Object(k.jsx)("h4",{className:"alert-heading",children:"Not found"})})}},474:function(e,t,a){"use strict";var s=a(468),r=a(139),i=(a(478),a(7)),n={AboutOptions:{about:{maxLength:{value:255,message:Object(i.jsx)(s.a,{id:"About title up to 255 characters"})}}},PartnerOptions:{name:{required:Object(i.jsx)(s.a,{id:"The name field is required"}),maxLength:{value:255,message:Object(i.jsx)(s.a,{id:"Partner name up to 255 characters"})}}},DocumentOptions:{label:{required:Object(i.jsx)(s.a,{id:"the label field is required"}),validate:function(e){return!r.a.TITLE.test(e)},maxLength:{value:255,message:Object(i.jsx)(s.a,{id:"Label up to 255 characters"})}},sort_order:{required:Object(i.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(i.jsx)(s.a,{id:"Number Input"})}},short_content:{required:Object(i.jsx)(s.a,{id:"the short content field is required"}),validate:function(e){return!r.a.TITLE.test(e)},maxLength:{value:255,message:Object(i.jsx)(s.a,{id:"Short content up to 255 characters"})}}},DiscountOptions:{discount:{required:Object(i.jsx)(s.a,{id:"the discount field is required"}),min:{value:0,message:Object(i.jsx)(s.a,{id:"The discount is not suitable"})}},time:{required:Object(i.jsx)(s.a,{id:"The time price field is required"}),min:{value:function(e){return parseInt(e)},message:Object(i.jsx)(s.a,{id:"The extended time is not suitable"})}}},PriceOptions:{price:{required:Object(i.jsx)(s.a,{id:"The price field is required"}),min:{value:function(e){return parseInt(e)},message:Object(i.jsx)(s.a,{id:"Invalid price"})}}},Document_Link_Options:{document_link:{required:Object(i.jsx)(s.a,{id:"The time document link field is required"}),min:{value:function(e){return parseInt(e)},message:Object(i.jsx)(s.a,{id:"The extended time is not suitable"})}}},CategoryOptions:{code:{required:Object(i.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Category must be 70 characters max"})}},message_content:{maxLength:{value:30,message:Object(i.jsx)(s.a,{id:"Category must be 30 characters max"})}}},BranchOptions:{name:{required:Object(i.jsx)(s.a,{id:"The branch name field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Branch name must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Branch name must be 70 characters max"})}},code_branch:{required:Object(i.jsx)(s.a,{id:"The branch code field is required"})},email:{required:Object(i.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return r.a.EMAIL.test(e)},maxLength:{value:125,message:Object(i.jsx)(s.a,{id:"Email up to 125 characters"})}},phone:{required:Object(i.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(i.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"Phone number up to 25 characters"})}},addpress:{required:Object(i.jsx)(s.a,{id:"The address field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Address must be at least 3 characters"})}}},EditBranchOptions:{name:{required:Object(i.jsx)(s.a,{id:"The branch name field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Branch name must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Branch name must be 70 characters max"})}},code_branch:{required:Object(i.jsx)(s.a,{id:"The branch code field is required"})},email:{required:Object(i.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return r.a.EMAIL.test(e)},maxLength:{value:125,message:Object(i.jsx)(s.a,{id:"Email up to 125 characters"})}},phone:{required:Object(i.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(i.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"Phone number up to 25 characters"})}},addpress:{required:Object(i.jsx)(s.a,{id:"The address field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Address must be at least 3 characters"})}}},Document_course:{name:{required:Object(i.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Category must be 70 characters max"})}}},EditCategoryOptions:{name:{required:Object(i.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Category must be 70 characters max"})}}},EditDocumentOptions:{name:{required:Object(i.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Category must be 70 characters max"})}},sort_order:{required:Object(i.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(i.jsx)(s.a,{id:"Number Input"})}},author:{required:Object(i.jsx)(s.a,{id:"The Author name field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Author name must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Author must be 70 characters max"})}}},EditQuizOptions:{title:{required:Object(i.jsx)(s.a,{id:"The title field is required"})},contenttext:{required:Object(i.jsx)(s.a,{id:"The content field is required"})},answer:{required:Object(i.jsx)(s.a,{id:"The answer field is required"})},sort_order:{required:Object(i.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(i.jsx)(s.a,{id:"Number Input"})}}},TermOptions:{title:{required:Object(i.jsx)(s.a,{id:"The title field is required"})},sort_order:{required:Object(i.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(i.jsx)(s.a,{id:"Number Input"})}}},KindOptions:{name:{required:Object(i.jsx)(s.a,{id:"The solution name field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Solution name must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Solution must be 70 characters max"})}}},EditKindOptions:{name:{required:Object(i.jsx)(s.a,{id:"The solution name field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Solution name must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Solution must be 70 characters max"})}}},TranscriptOptions:{name:{required:Object(i.jsx)(s.a,{id:"The student name field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Student name must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Student name must be 70 characters max"})}},score:{required:Object(i.jsx)(s.a,{id:"The score field is required"})}},EditTranscriptOptions:{student_code:{required:Object(i.jsx)(s.a,{id:"The student code field is required"})},name:{required:Object(i.jsx)(s.a,{id:"The student name field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Student name must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Student name must be 70 characters max"})}},score:{required:Object(i.jsx)(s.a,{id:"The score field is required"})}},CertificateOptions:{},UserCertificateOptions:{},EditCertificateOptions:{title:{required:Object(i.jsx)(s.a,{id:"The title field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"The title must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"The title must be 70 characters max"})}},provider:{required:Object(i.jsx)(s.a,{id:"Provider field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Provider must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Provider must be 70 characters max"})}},position:{required:Object(i.jsx)(s.a,{id:"Position field is required"}),minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Position must be at least 3 characters"})},maxLength:{value:70,message:Object(i.jsx)(s.a,{id:"Position must be 70 characters max"})}}},ProductOptions:{product_name:{required:Object(i.jsx)(s.a,{id:"The product's name field is required"}),validate:function(e){return!r.a.NAME2.test(e)},minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Product name must be at least 3 characters"})},maxLength:{value:100,message:Object(i.jsx)(s.a,{id:"Product name up to 100 characters"})},alidate:function(e){return!r.a.SPACE.test(e)}},vat:{required:Object(i.jsx)(s.a,{id:"The VAT field is required"}),min:{value:0,message:Object(i.jsx)(s.a,{id:"VAT more than 0"})},max:{value:100,message:Object(i.jsx)(s.a,{id:"VAT less than 100"})}},number_trial:{min:{value:0,message:Object(i.jsx)(s.a,{id:"Number day must be greater than or equal to 0"})},max:{value:30,message:Object(i.jsx)(s.a,{id:"Number day must be less than or equal to 30"})},validate:function(e){return e>=0||Object(i.jsx)(s.a,{id:"Number day must be a positive number"})}},categoryId:{required:Object(i.jsx)(s.a,{id:"The category field is required"}),min:{value:0}},service_price_local:{required:Object(i.jsx)(s.a,{id:"The price field is required"}),validate:function(e){return!r.a.PRICE.test(e)},pattern:{value:/^0*/g,message:Object(i.jsx)(s.a,{id:"Invalid price"})},maxLength:{value:255}},service_price_cloud:{required:Object(i.jsx)(s.a,{id:"The price field is required"}),validate:function(e){return!r.a.PRICE.test(e)},pattern:{value:/^0*/g,message:Object(i.jsx)(s.a,{id:"Invalid price"})},maxLength:{value:255}}},VersionOptions:{version:{required:Object(i.jsx)(s.a,{id:"The version field is required"}),maxLength:{value:255,message:Object(i.jsx)(s.a,{id:"Version up to 255 characters"})}},infor:{maxLength:{value:500,message:Object(i.jsx)(s.a,{id:"Information up to 500 characters"})}}},StaffOptions:{last_name:{required:Object(i.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!r.a.NAME.test(e)},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(i.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!r.a.NAME.test(e)},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(i.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(i.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(i.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:r.a.USERNAME,message:Object(i.jsx)(s.a,{id:"Invalid username"})}},email:{required:Object(i.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return r.a.EMAIL.test(e)},maxLength:{value:125,message:Object(i.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(i.jsx)(s.a,{id:"The password field is required"}),minLength:{value:8,message:Object(i.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{required:Object(i.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(i.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},EditStaffOptions:{last_name:{required:Object(i.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!r.a.NAME.test(e)},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(i.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!r.a.NAME.test(e)},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(i.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(i.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(i.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:r.a.USERNAME,message:Object(i.jsx)(s.a,{id:"Invalid username"})}},email:{required:Object(i.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return r.a.EMAIL.test(e)},maxLength:{value:125,message:Object(i.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(i.jsx)(s.a,{id:"The password field is required"}),minLength:{value:8,message:Object(i.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{required:Object(i.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(i.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},UserOptions:{last_name:{required:Object(i.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!r.a.NAME.test(e)},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(i.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!r.a.NAME.test(e)},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(i.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(i.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(i.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:r.a.USERNAME,message:Object(i.jsx)(s.a,{id:"Invalid username"})}},email:{validate:function(e){if(""!=e)return r.a.EMAIL.test(e)},maxLength:{value:125,message:Object(i.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(i.jsx)(s.a,{id:"The password field is required"}),validate:function(e){return!r.a.PASSWORD.test(null===e||void 0===e?void 0:e.trim())},minLength:{value:8,message:Object(i.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{pattern:{value:/^(0|\\d)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(i.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},EditUserOptions:{last_name:{required:Object(i.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!r.a.NAME.test(e)},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(i.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!r.a.NAME.test(e)},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(i.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(i.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(i.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:r.a.USERNAME,message:Object(i.jsx)(s.a,{id:"Invalid username"})}},email:{validate:function(e){if(""!=e)return r.a.EMAIL.test(e)},maxLength:{value:125,message:Object(i.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(i.jsx)(s.a,{id:"The password field is required"}),validate:function(e){return!r.a.PASSWORD.test(null===e||void 0===e?void 0:e.trim())},minLength:{value:8,message:Object(i.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(i.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},CityOptions:{name:{required:Object(i.jsx)(s.a,{id:"The city name field is required"}),validate:function(e){return!r.a.NAME.test(e)}},code:{required:Object(i.jsx)(s.a,{id:"The city code field is required"}),alidate:function(e){return!r.a.NAME.test(e)}}},CountryOptions:{name:{required:Object(i.jsx)(s.a,{id:"The country name field is required"}),validate:function(e){return!r.a.NAME.test(e)}},code:{required:Object(i.jsx)(s.a,{id:"The country code field is required"}),validate:function(e){return!r.a.NAME.test(e)}},phone_code:{required:Object(i.jsx)(s.a,{id:"The phone code field is required"}),validate:function(e){return r.a.PHONE_CODE.test(e)}}},StudentOptions:{name:{required:Object(i.jsx)(s.a,{id:"The name field is required"}),maxLength:{value:255,message:Object(i.jsx)(s.a,{id:"Partner name up to 255 characters"})}},email:{required:Object(i.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return r.a.EMAIL.test(e)},maxLength:{value:125,message:Object(i.jsx)(s.a,{id:"Email up to 125 characters"})}},phone:{required:Object(i.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(i.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(i.jsx)(s.a,{id:"Phone number up to 25 characters"})}},date:{required:Object(i.jsx)(s.a,{id:"The phone number field is required"})}},CloudOptions:{product_name:{required:Object(i.jsx)(s.a,{id:"The cloud name field is required"}),validate:function(e){return!r.a.NAME2.test(e)},minLength:{value:3,message:Object(i.jsx)(s.a,{id:"Cloud name must be at least 3 characters"})},maxLength:{value:100,message:Object(i.jsx)(s.a,{id:"Cloud name up to 100 characters"})},alidate:function(e){return!r.a.SPACE.test(e)}}}};t.a=n},574:function(e,t,a){"use strict";a.d(t,"c",(function(){return c})),a.d(t,"d",(function(){return d})),a.d(t,"b",(function(){return u})),a.d(t,"e",(function(){return j})),a.d(t,"a",(function(){return m})),a.d(t,"f",(function(){return l}));var s=a(11),r=a(26),i=a(13),n=a(31),c=function(e){return function(){var t=Object(r.a)(Object(s.a)().mark((function t(a){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.send({method:i.a.LIST_CATEGORY.method,path:i.a.LIST_CATEGORY.path,data:e}).then((function(t){var s,r;a({type:"GET_DATA_CATEGORY",data:null===t||void 0===t||null===(s=t.data)||void 0===s?void 0:s.data,totalPages:null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.total,params:e})}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},d=function(e){return function(){var t=Object(r.a)(Object(s.a)().mark((function t(a){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.send({method:i.a.LIST_KIND.method,path:i.a.LIST_KIND.path,data:e}).then((function(t){var s,r;a({type:"GET_DATA_KIND",data:null===t||void 0===t||null===(s=t.data)||void 0===s?void 0:s.data,totalPages:null===t||void 0===t||null===(r=t.data)||void 0===r?void 0:r.total,params:e})}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},u=function(e){return function(){var t=Object(r.a)(Object(s.a)().mark((function t(a){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.send({method:i.a.GET_CATEGORY.method,path:i.a.GET_CATEGORY.path,query:{id:e}}).then((function(e){a({type:"GET_CATEGORY",selected:null===e||void 0===e?void 0:e.data})})).catch((function(e){return console.log(e)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},j=function(e){return function(){var t=Object(r.a)(Object(s.a)().mark((function t(a){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.send({method:i.a.GET_KIND.method,path:i.a.GET_KIND.path,query:{id:e}}).then((function(e){a({type:"GET_KindId",selected:null===e||void 0===e?void 0:e.data})})).catch((function(e){return console.log(e)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},m=function(e){return function(){var t=Object(r.a)(Object(s.a)().mark((function t(a,r){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.send({method:i.a.CREATE_CATEGORY.method,path:i.a.CREATE_CATEGORY.path,data:e}).then((function(e){a({type:"ADD_CATEGORY",response:e})})).catch((function(e){return a({type:"ADD_CATEGORY",err:e})}));case 2:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},l=function(e){return function(){var t=Object(r.a)(Object(s.a)().mark((function t(a,r){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.send({method:i.a.UPDATE_CATEGORY.method,path:i.a.UPDATE_CATEGORY.path,data:e}).then((function(e){a({type:"UPDATE_CATEGORY",response:e})})).catch((function(e){return a({type:"UPDATE_CATEGORY",err:e})}));case 2:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()}}}]);
//# sourceMappingURL=141.9162f0b9.chunk.js.map