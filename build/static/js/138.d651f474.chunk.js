(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[138],{1373:function(e,t,a){"use strict";a.r(t);var s=a(19),i=a(1),r=a(779),n=a(468),c=a(68),d=a(528),u=a(514),j=a(515),m=a(516),l=a(482),o=a(495),b=a(1258),h=a(1259),x=a(491),O=a(493),p=a(494),f=a(581),g=a(0),v=a(473),q=a(67),T=a.n(q),E=a(476),L=a(96),_=a(1256),P=a(525),y=a(1248),C=a(542),I=a(1255),A=a(471),R=a(474),N=a(486),D=a(479),S=a.n(D),U=a(488),w=a(7),M=Object(L.c)((function(e){var t,a,r=e.selected,m=Object(c.c)((function(e){return e.products})),l=Object(c.c)((function(e){return e.common.language})),o=Object(E.c)(),b=o.register,h=o.errors,x=o.handleSubmit,O=Object(i.useState)(null),p=Object(s.a)(O,2),q=p[0],L=p[1],D=Object(c.c)((function(e){return e.discounts})),M=R.a.PriceOptions,k=Object(c.b)(),$=Object(d.g)(),V=Object(i.useState)(!1),B=Object(s.a)(V,2),F=B[0],G=B[1],z=Object(d.i)().id,J=Object(i.useState)(N.EditorState.createEmpty()),K=Object(s.a)(J,2),W=K[0],H=K[1];Object(i.useEffect)((function(){var e;null!==D&&void 0!==D&&null!==(e=D.err)&&void 0!==e&&e.statusCode&&G(!1)}),[null===D||void 0===D?void 0:D.err]),Object(i.useEffect)((function(){(null!==r||null!==r&&null!==q&&r.id!==q.id)&&(L(r),H(Object(v.c)((null===r||void 0===r?void 0:r.technical_assistance)||" ")))}),[r]);return Object(w.jsxs)(u.a,{children:[Object(w.jsx)(j.a,{sm:"12",children:Object(w.jsx)(_.a,{className:"mb-2",children:Object(w.jsx)(_.a,{className:"mt-50",body:!0,children:Object(w.jsxs)("h4",{children:[r.username," "]})})})}),Object(w.jsx)(j.a,{sm:"12",children:Object(w.jsxs)(P.a,{onSubmit:x((function(e){if(Object(v.d)(h)){var t=W&&S()(Object(N.convertToRaw)(null===W||void 0===W?void 0:W.getCurrentContent()))||null;G(!0),k(Object(f.e)({id:parseInt(z),data:Object(g.a)(Object(g.a)({},e),{},{type:null===r||void 0===r?void 0:r.type,lang:l,technical_assistance:t||""})}))}})),children:[Object(w.jsx)("div",{className:"mt-1"}),Object(w.jsxs)(y.a,{children:[Object(w.jsxs)(C.a,{for:"price",children:[Object(w.jsx)(n.a,{id:"price"}),Object(w.jsx)("span",{className:"text-danger",children:"*"})]}),Object(w.jsx)(I.a,{name:"price",id:"price",placeholder:" ",innerRef:b(M.price),className:T()({"is-invalid":h.price}),defaultValue:q&&q.price,type:"number"}),Object(w.jsx)("small",{className:"text-danger",children:(null===h||void 0===h?void 0:h.price)&&h.price.message})]}),3===(null===m||void 0===m||null===(t=m.selected)||void 0===t?void 0:t.product_type)&&Object(w.jsxs)(y.a,{children:[Object(w.jsx)(C.a,{for:"type",children:Object(w.jsx)(n.a,{id:"type"})}),Object(w.jsx)(I.a,{name:"type",id:"type",placeholder:" ",disabled:!0,defaultValue:null===(a={0:{text:"Free"},1:{text:"Basic"},2:{text:"Active personal"},3:{text:"Active professional"}}[(null===r||void 0===r?void 0:r.type)||0])||void 0===a?void 0:a.text,type:"text"})]}),Object(w.jsxs)(y.a,{children:[Object(w.jsx)(C.a,{for:"object",children:Object(w.jsx)(n.a,{id:"object"})}),Object(w.jsx)(I.a,{name:"object",id:"object",innerRef:b(M.object),defaultValue:q&&q.object})]}),Object(w.jsxs)(y.a,{children:[Object(w.jsx)(C.a,{for:"system_description",children:Object(w.jsx)(n.a,{id:"system_description"})}),Object(w.jsx)(I.a,{name:"system_description",id:"system_description",innerRef:b(M.system_description),defaultValue:q&&q.system_description})]}),Object(w.jsxs)(y.a,{children:[Object(w.jsx)(C.a,{for:"platform_description",children:Object(w.jsx)(n.a,{id:"platform_description"})}),Object(w.jsx)(I.a,{name:"platform_description",id:"platform_description",innerRef:b(M.platform_description),defaultValue:q&&q.platform_description})]}),Object(w.jsxs)(y.a,{children:[Object(w.jsx)(C.a,{for:"technical_assistance",children:Object(w.jsx)(n.a,{id:"technical_assistance"})}),Object(w.jsx)(U.Editor,{stripPastedStyles:!0,editorState:W,defaultEditorState:W,onEditorStateChange:function(e){return H(e)},name:"technical_assistance",innerRef:b(M.technical_assistance)})]}),Object(w.jsxs)("div",{style:{textAlign:"end"},children:[Object(w.jsx)(A.a,{type:"submit",className:"mr-1",color:"primary",disabled:F,children:Object(w.jsx)(n.a,{id:"update"})}),Object(w.jsx)(A.a,{type:"reset",color:"secondary",outline:!0,onClick:function(){return $.goBack()},children:Object(w.jsx)(n.a,{id:"Cancel"})})]})]})})]})}));t.default=function(){var e=Object(d.g)(),t=Object(i.useState)("1"),a=Object(s.a)(t,2),g=a[0],v=a[1],q=Object(c.c)((function(e){return e.prices})),T=Object(c.b)(),E=Object(d.i)().id;return Object(i.useEffect)((function(){T(Object(f.b)({id:parseInt(E)}))}),[]),console.log(q),Object(i.useEffect)((function(){200==q.status&&e.goBack()}),[q.status]),null!==q.selected&&void 0!==q.selected?Object(w.jsx)(u.a,{className:"app-user-edit",children:Object(w.jsx)(j.a,{sm:"12",children:Object(w.jsx)(m.a,{children:Object(w.jsxs)(l.a,{className:"pt-2",children:[Object(w.jsx)(o.a,{pills:!0,children:Object(w.jsx)(b.a,{children:Object(w.jsxs)(h.a,{active:"1"===g,onClick:function(){return v("1")},children:[Object(w.jsx)(r.a,{size:14}),Object(w.jsx)("span",{className:"align-middle d-none d-sm-block",children:Object(w.jsx)(n.a,{id:"price"})})]})})}),Object(w.jsx)(x.a,{activeTab:g,children:Object(w.jsx)(O.a,{tabId:"1",children:Object(w.jsx)(M,{selected:q.selected})})})]})})})}):Object(w.jsx)(p.a,{color:"danger",children:Object(w.jsx)("h4",{className:"alert-heading",children:"Not found"})})}},474:function(e,t,a){"use strict";var s=a(468),i=a(139),r=(a(478),a(7)),n={AboutOptions:{about:{maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"About title up to 255 characters"})}}},PartnerOptions:{name:{required:Object(r.jsx)(s.a,{id:"The name field is required"}),maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"Partner name up to 255 characters"})}}},DocumentOptions:{label:{required:Object(r.jsx)(s.a,{id:"the label field is required"}),validate:function(e){return!i.a.TITLE.test(e)},maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"Label up to 255 characters"})}},sort_order:{required:Object(r.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(r.jsx)(s.a,{id:"Number Input"})}},short_content:{required:Object(r.jsx)(s.a,{id:"the short content field is required"}),validate:function(e){return!i.a.TITLE.test(e)},maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"Short content up to 255 characters"})}}},DiscountOptions:{discount:{required:Object(r.jsx)(s.a,{id:"the discount field is required"}),min:{value:0,message:Object(r.jsx)(s.a,{id:"The discount is not suitable"})}},time:{required:Object(r.jsx)(s.a,{id:"The time price field is required"}),min:{value:function(e){return parseInt(e)},message:Object(r.jsx)(s.a,{id:"The extended time is not suitable"})}}},PriceOptions:{price:{required:Object(r.jsx)(s.a,{id:"The price field is required"}),min:{value:function(e){return parseInt(e)},message:Object(r.jsx)(s.a,{id:"Invalid price"})}}},Document_Link_Options:{document_link:{required:Object(r.jsx)(s.a,{id:"The time document link field is required"}),min:{value:function(e){return parseInt(e)},message:Object(r.jsx)(s.a,{id:"The extended time is not suitable"})}}},CategoryOptions:{code:{required:Object(r.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Category must be 70 characters max"})}},message_content:{maxLength:{value:30,message:Object(r.jsx)(s.a,{id:"Category must be 30 characters max"})}}},BranchOptions:{name:{required:Object(r.jsx)(s.a,{id:"The branch name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Branch name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Branch name must be 70 characters max"})}},code_branch:{required:Object(r.jsx)(s.a,{id:"The branch code field is required"})},email:{required:Object(r.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},phone:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}},addpress:{required:Object(r.jsx)(s.a,{id:"The address field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Address must be at least 3 characters"})}}},EditBranchOptions:{name:{required:Object(r.jsx)(s.a,{id:"The branch name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Branch name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Branch name must be 70 characters max"})}},code_branch:{required:Object(r.jsx)(s.a,{id:"The branch code field is required"})},email:{required:Object(r.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},phone:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}},addpress:{required:Object(r.jsx)(s.a,{id:"The address field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Address must be at least 3 characters"})}}},Document_course:{name:{required:Object(r.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Category must be 70 characters max"})}}},EditCategoryOptions:{name:{required:Object(r.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Category must be 70 characters max"})}}},EditDocumentOptions:{name:{required:Object(r.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Category must be 70 characters max"})}},sort_order:{required:Object(r.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(r.jsx)(s.a,{id:"Number Input"})}},author:{required:Object(r.jsx)(s.a,{id:"The Author name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Author name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Author must be 70 characters max"})}}},EditQuizOptions:{title:{required:Object(r.jsx)(s.a,{id:"The title field is required"})},contenttext:{required:Object(r.jsx)(s.a,{id:"The content field is required"})},answer:{required:Object(r.jsx)(s.a,{id:"The answer field is required"})},sort_order:{required:Object(r.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(r.jsx)(s.a,{id:"Number Input"})}}},TermOptions:{title:{required:Object(r.jsx)(s.a,{id:"The title field is required"})},sort_order:{required:Object(r.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(r.jsx)(s.a,{id:"Number Input"})}}},KindOptions:{name:{required:Object(r.jsx)(s.a,{id:"The solution name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Solution name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Solution must be 70 characters max"})}}},EditKindOptions:{name:{required:Object(r.jsx)(s.a,{id:"The solution name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Solution name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Solution must be 70 characters max"})}}},TranscriptOptions:{name:{required:Object(r.jsx)(s.a,{id:"The student name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Student name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Student name must be 70 characters max"})}},score:{required:Object(r.jsx)(s.a,{id:"The score field is required"})}},EditTranscriptOptions:{student_code:{required:Object(r.jsx)(s.a,{id:"The student code field is required"})},name:{required:Object(r.jsx)(s.a,{id:"The student name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Student name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Student name must be 70 characters max"})}},score:{required:Object(r.jsx)(s.a,{id:"The score field is required"})}},CertificateOptions:{},UserCertificateOptions:{},EditCertificateOptions:{title:{required:Object(r.jsx)(s.a,{id:"The title field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"The title must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"The title must be 70 characters max"})}},provider:{required:Object(r.jsx)(s.a,{id:"Provider field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Provider must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Provider must be 70 characters max"})}},position:{required:Object(r.jsx)(s.a,{id:"Position field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Position must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Position must be 70 characters max"})}}},ProductOptions:{product_name:{required:Object(r.jsx)(s.a,{id:"The product's name field is required"}),validate:function(e){return!i.a.NAME2.test(e)},minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Product name must be at least 3 characters"})},maxLength:{value:100,message:Object(r.jsx)(s.a,{id:"Product name up to 100 characters"})},alidate:function(e){return!i.a.SPACE.test(e)}},vat:{required:Object(r.jsx)(s.a,{id:"The VAT field is required"}),min:{value:0,message:Object(r.jsx)(s.a,{id:"VAT more than 0"})},max:{value:100,message:Object(r.jsx)(s.a,{id:"VAT less than 100"})}},number_trial:{min:{value:0,message:Object(r.jsx)(s.a,{id:"Number day must be greater than or equal to 0"})},max:{value:30,message:Object(r.jsx)(s.a,{id:"Number day must be less than or equal to 30"})},validate:function(e){return e>=0||Object(r.jsx)(s.a,{id:"Number day must be a positive number"})}},categoryId:{required:Object(r.jsx)(s.a,{id:"The category field is required"}),min:{value:0}},service_price_local:{required:Object(r.jsx)(s.a,{id:"The price field is required"}),validate:function(e){return!i.a.PRICE.test(e)},pattern:{value:/^0*/g,message:Object(r.jsx)(s.a,{id:"Invalid price"})},maxLength:{value:255}},service_price_cloud:{required:Object(r.jsx)(s.a,{id:"The price field is required"}),validate:function(e){return!i.a.PRICE.test(e)},pattern:{value:/^0*/g,message:Object(r.jsx)(s.a,{id:"Invalid price"})},maxLength:{value:255}}},VersionOptions:{version:{required:Object(r.jsx)(s.a,{id:"The version field is required"}),maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"Version up to 255 characters"})}},infor:{maxLength:{value:500,message:Object(r.jsx)(s.a,{id:"Information up to 500 characters"})}}},StaffOptions:{last_name:{required:Object(r.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(r.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(r.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(r.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(r.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:i.a.USERNAME,message:Object(r.jsx)(s.a,{id:"Invalid username"})}},email:{required:Object(r.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(r.jsx)(s.a,{id:"The password field is required"}),minLength:{value:8,message:Object(r.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},EditStaffOptions:{last_name:{required:Object(r.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(r.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(r.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(r.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(r.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:i.a.USERNAME,message:Object(r.jsx)(s.a,{id:"Invalid username"})}},email:{required:Object(r.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(r.jsx)(s.a,{id:"The password field is required"}),minLength:{value:8,message:Object(r.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},UserOptions:{last_name:{required:Object(r.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(r.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(r.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(r.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(r.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:i.a.USERNAME,message:Object(r.jsx)(s.a,{id:"Invalid username"})}},email:{validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(r.jsx)(s.a,{id:"The password field is required"}),validate:function(e){return!i.a.PASSWORD.test(null===e||void 0===e?void 0:e.trim())},minLength:{value:8,message:Object(r.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{pattern:{value:/^(0|\\d)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},EditUserOptions:{last_name:{required:Object(r.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(r.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(r.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(r.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(r.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:i.a.USERNAME,message:Object(r.jsx)(s.a,{id:"Invalid username"})}},email:{validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(r.jsx)(s.a,{id:"The password field is required"}),validate:function(e){return!i.a.PASSWORD.test(null===e||void 0===e?void 0:e.trim())},minLength:{value:8,message:Object(r.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},CityOptions:{name:{required:Object(r.jsx)(s.a,{id:"The city name field is required"}),validate:function(e){return!i.a.NAME.test(e)}},code:{required:Object(r.jsx)(s.a,{id:"The city code field is required"}),alidate:function(e){return!i.a.NAME.test(e)}}},CountryOptions:{name:{required:Object(r.jsx)(s.a,{id:"The country name field is required"}),validate:function(e){return!i.a.NAME.test(e)}},code:{required:Object(r.jsx)(s.a,{id:"The country code field is required"}),validate:function(e){return!i.a.NAME.test(e)}},phone_code:{required:Object(r.jsx)(s.a,{id:"The phone code field is required"}),validate:function(e){return i.a.PHONE_CODE.test(e)}}},StudentOptions:{name:{required:Object(r.jsx)(s.a,{id:"The name field is required"}),maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"Partner name up to 255 characters"})}},email:{required:Object(r.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},phone:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}},date:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"})}},CloudOptions:{product_name:{required:Object(r.jsx)(s.a,{id:"The cloud name field is required"}),validate:function(e){return!i.a.NAME2.test(e)},minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Cloud name must be at least 3 characters"})},maxLength:{value:100,message:Object(r.jsx)(s.a,{id:"Cloud name up to 100 characters"})},alidate:function(e){return!i.a.SPACE.test(e)}}}};t.a=n},581:function(e,t,a){"use strict";a.d(t,"c",(function(){return c})),a.d(t,"b",(function(){return d})),a.d(t,"a",(function(){return u})),a.d(t,"e",(function(){return j})),a.d(t,"d",(function(){return m}));var s=a(11),i=a(26),r=a(13),n=a(31),c=function(e){return function(){var t=Object(i.a)(Object(s.a)().mark((function t(a){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.send({method:r.a.LIST_PRODUCT_PRICE.method,path:r.a.LIST_PRODUCT_PRICE.path,data:e}).then((function(t){a({type:"GET_DATA_PRICE_PRODUCT",data:null===t||void 0===t?void 0:t.data,params:e})}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},d=function(e){return function(){var t=Object(i.a)(Object(s.a)().mark((function t(a){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.send({method:r.a.GET_PRICE.method,path:r.a.GET_PRICE.path,query:e}).then((function(e){a({type:"GET_PRICE_PRODUCT",selected:null===e||void 0===e?void 0:e.data})})).catch((function(e){console.log(e)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},u=function(e){return function(){var t=Object(i.a)(Object(s.a)().mark((function t(a,i){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.send({method:r.a.CREATE_PRODUCT_PRICE.method,path:r.a.CREATE_PRODUCT_PRICE.path,data:e}).then((function(e){a({type:"ADD_PRICE_PRODUCT",response:e})})).catch((function(e){return a({type:"ADD_PRICE_PRODUCT",err:e})}));case 2:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},j=function(e){return function(){var t=Object(i.a)(Object(s.a)().mark((function t(a,i){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.send({method:r.a.UPDATE_PRODUCT_PRICE.method,path:r.a.UPDATE_PRODUCT_PRICE.path,data:e}).then((function(e){a({type:"UPDATE_PRICE_PRODUCT",response:e})})).catch((function(e){return a({type:"UPDATE_PRICE_PRODUCT",err:e})}));case 2:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}()},m=function(e){return function(){var t=Object(i.a)(Object(s.a)().mark((function t(a){return Object(s.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,n.a.send({method:r.a.DELETE_PRODUCT_PRICE.method,path:r.a.DELETE_PRODUCT_PRICE.path,data:e}).then((function(e){a({type:"DELETE_PRICE_PRODUCT",response:e})})).catch((function(e){return console.log(e)}));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}}}]);
//# sourceMappingURL=138.d651f474.chunk.js.map