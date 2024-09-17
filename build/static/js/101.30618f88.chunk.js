(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[101],{1366:function(e,a,t){"use strict";t.r(a);var s=t(19),i=t(1),r=t(852),n=t(468),c=t(528),d=t(514),u=t(515),l=t(516),m=t(482),o=t(495),j=t(1258),b=t(1259),h=t(491),O=t(493),x=t(494),g=t(13),v=t(31),f=t(11),p=t(0),q=t(26),T=t(473),L=t(67),y=t.n(L),E=t(476),N=t(96),P=t(37),I=t(1256),A=t(525),C=t(1248),M=t(542),_=t(1255),S=t(471),w=t(474),R=t(7),D=Object(N.c)((function(e){var a,t,r=e.selected,l=(e.intl,Object(E.c)()),m=l.register,o=l.errors,j=l.handleSubmit,b=Object(c.g)(),h=Object(i.useState)(!1),O=Object(s.a)(h,2),x=O[0],L=O[1],N=w.a.CityOptions,D=Object(c.i)().id,U=function(){var e=Object(q.a)(Object(f.a)().mark((function e(a){return Object(f.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:Object(T.d)(o)&&(L(!0),k({id:D,data:Object(p.a)({},a)}));case 1:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),k=function(e){v.a.send({method:g.a.UPDATE_CITY.method,path:g.a.UPDATE_CITY.path,data:e}).then((function(e){if(e){var a=e.statusCode;e.data;200===a?(P.c.success(Object(R.jsx)(n.a,{id:"Update successful!"})),b.goBack()):400==a&&(P.c.warn(Object(R.jsx)(n.a,{id:"Update failed!"})),L(!1))}})).catch((function(e){L(!1)}))};return Object(R.jsxs)(d.a,{children:[Object(R.jsx)(u.a,{sm:"12",children:Object(R.jsx)(I.a,{className:"mb-2",children:Object(R.jsx)(I.a,{className:"mt-50",body:!0,children:Object(R.jsxs)("h4",{children:[r.username," "]})})})}),Object(R.jsx)(u.a,{sm:"12",children:Object(R.jsxs)(A.a,{onSubmit:j(U),children:[Object(R.jsxs)(C.a,{children:[Object(R.jsxs)(M.a,{for:"name",children:[Object(R.jsx)(n.a,{id:"name"})," ",Object(R.jsx)("span",{className:"text-danger",children:"*"})]}),Object(R.jsx)(_.a,{name:"name",id:"name",placeholder:" ",innerRef:m(N.name),onBlur:function(){var e=document.getElementById("name");e&&e.value&&(e.value=e.value.trim())},defaultValue:null===r||void 0===r?void 0:r.name,className:y()({"is-invalid":o.name})}),Object(R.jsx)("small",{className:"text-danger",children:(null===o||void 0===o?void 0:o.name)&&o.name.message}),"validate"==(null===o||void 0===o||null===(a=o.name)||void 0===a?void 0:a.type)&&Object(R.jsx)("small",{className:"text-danger",children:Object(R.jsx)(n.a,{id:"Invalid city name"})})]}),Object(R.jsxs)(C.a,{children:[Object(R.jsxs)(M.a,{for:"code",children:[Object(R.jsx)(n.a,{id:"city code"})," ",Object(R.jsx)("span",{className:"text-danger",children:"*"})]}),Object(R.jsx)(_.a,{name:"code",id:"code",placeholder:" ",innerRef:m(N.code),onBlur:function(){var e=document.getElementById("code");e&&e.value&&(e.value=e.value.trim())},defaultValue:null===r||void 0===r?void 0:r.code,className:y()({"is-invalid":o.code})}),Object(R.jsx)("small",{className:"text-danger",children:(null===o||void 0===o?void 0:o.code)&&o.code.message}),"validate"==(null===o||void 0===o||null===(t=o.code)||void 0===t?void 0:t.type)&&Object(R.jsx)("small",{className:"text-danger",children:Object(R.jsx)(n.a,{id:"Invalid city code"})})]}),Object(R.jsxs)("div",{style:{textAlign:"end"},children:[Object(R.jsx)(S.a,{type:"submit",className:"mr-1",color:"primary",disabled:x,children:Object(R.jsx)(n.a,{id:"update"})}),Object(R.jsx)(S.a,{type:"reset",color:"secondary",outline:!0,onClick:function(){return b.goBack()},children:Object(R.jsx)(n.a,{id:"Cancel"})})]})]})})]})}));a.default=function(){var e=Object(i.useState)(null),a=Object(s.a)(e,2),t=a[0],f=a[1],p=Object(i.useState)("1"),q=Object(s.a)(p,2),T=q[0],L=q[1],y=Object(c.i)().id;return Object(i.useEffect)((function(){v.a.send({method:g.a.GET_CITY.method,path:g.a.GET_CITY.path,query:{id:y}}).then((function(e){if(e){var a=e.statusCode,t=e.data;200===a&&f(t)}}))}),[]),null!==t&&void 0!==t?Object(R.jsx)(d.a,{className:"app-user-edit",children:Object(R.jsx)(u.a,{sm:"12",children:Object(R.jsx)(l.a,{children:Object(R.jsxs)(m.a,{className:"pt-2",children:[Object(R.jsx)(o.a,{pills:!0,children:Object(R.jsx)(j.a,{children:Object(R.jsxs)(b.a,{active:"1"===T,onClick:function(){return L("1")},children:[Object(R.jsx)(r.a,{size:14}),Object(R.jsx)("span",{className:"align-middle d-none d-sm-block",children:Object(R.jsx)(n.a,{id:"city"})})]})})}),Object(R.jsx)(h.a,{activeTab:T,children:Object(R.jsx)(O.a,{tabId:"1",children:Object(R.jsx)(D,{selected:t})})})]})})})}):Object(R.jsx)(x.a,{color:"danger",children:Object(R.jsx)("h4",{className:"alert-heading",children:"Not found"})})}},474:function(e,a,t){"use strict";var s=t(468),i=t(139),r=(t(478),t(7)),n={AboutOptions:{about:{maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"About title up to 255 characters"})}}},PartnerOptions:{name:{required:Object(r.jsx)(s.a,{id:"The name field is required"}),maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"Partner name up to 255 characters"})}}},DocumentOptions:{label:{required:Object(r.jsx)(s.a,{id:"the label field is required"}),validate:function(e){return!i.a.TITLE.test(e)},maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"Label up to 255 characters"})}},sort_order:{required:Object(r.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(r.jsx)(s.a,{id:"Number Input"})}},short_content:{required:Object(r.jsx)(s.a,{id:"the short content field is required"}),validate:function(e){return!i.a.TITLE.test(e)},maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"Short content up to 255 characters"})}}},DiscountOptions:{discount:{required:Object(r.jsx)(s.a,{id:"the discount field is required"}),min:{value:0,message:Object(r.jsx)(s.a,{id:"The discount is not suitable"})}},time:{required:Object(r.jsx)(s.a,{id:"The time price field is required"}),min:{value:function(e){return parseInt(e)},message:Object(r.jsx)(s.a,{id:"The extended time is not suitable"})}}},PriceOptions:{price:{required:Object(r.jsx)(s.a,{id:"The price field is required"}),min:{value:function(e){return parseInt(e)},message:Object(r.jsx)(s.a,{id:"Invalid price"})}}},Document_Link_Options:{document_link:{required:Object(r.jsx)(s.a,{id:"The time document link field is required"}),min:{value:function(e){return parseInt(e)},message:Object(r.jsx)(s.a,{id:"The extended time is not suitable"})}}},CategoryOptions:{code:{required:Object(r.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Category must be 70 characters max"})}},message_content:{maxLength:{value:30,message:Object(r.jsx)(s.a,{id:"Category must be 30 characters max"})}}},BranchOptions:{name:{required:Object(r.jsx)(s.a,{id:"The branch name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Branch name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Branch name must be 70 characters max"})}},code_branch:{required:Object(r.jsx)(s.a,{id:"The branch code field is required"})},email:{required:Object(r.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},phone:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}},addpress:{required:Object(r.jsx)(s.a,{id:"The address field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Address must be at least 3 characters"})}}},EditBranchOptions:{name:{required:Object(r.jsx)(s.a,{id:"The branch name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Branch name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Branch name must be 70 characters max"})}},code_branch:{required:Object(r.jsx)(s.a,{id:"The branch code field is required"})},email:{required:Object(r.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},phone:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}},addpress:{required:Object(r.jsx)(s.a,{id:"The address field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Address must be at least 3 characters"})}}},Document_course:{name:{required:Object(r.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Category must be 70 characters max"})}}},EditCategoryOptions:{name:{required:Object(r.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Category must be 70 characters max"})}}},EditDocumentOptions:{name:{required:Object(r.jsx)(s.a,{id:"The category name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Category name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Category must be 70 characters max"})}},sort_order:{required:Object(r.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(r.jsx)(s.a,{id:"Number Input"})}},author:{required:Object(r.jsx)(s.a,{id:"The Author name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Author name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Author must be 70 characters max"})}}},EditQuizOptions:{title:{required:Object(r.jsx)(s.a,{id:"The title field is required"})},contenttext:{required:Object(r.jsx)(s.a,{id:"The content field is required"})},answer:{required:Object(r.jsx)(s.a,{id:"The answer field is required"})},sort_order:{required:Object(r.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(r.jsx)(s.a,{id:"Number Input"})}}},TermOptions:{title:{required:Object(r.jsx)(s.a,{id:"The title field is required"})},sort_order:{required:Object(r.jsx)(s.a,{id:"The sort order field is required"}),pattern:{value:/^\d+$/,message:Object(r.jsx)(s.a,{id:"Number Input"})}}},KindOptions:{name:{required:Object(r.jsx)(s.a,{id:"The solution name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Solution name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Solution must be 70 characters max"})}}},EditKindOptions:{name:{required:Object(r.jsx)(s.a,{id:"The solution name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Solution name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Solution must be 70 characters max"})}}},TranscriptOptions:{name:{required:Object(r.jsx)(s.a,{id:"The student name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Student name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Student name must be 70 characters max"})}},score:{required:Object(r.jsx)(s.a,{id:"The score field is required"})}},EditTranscriptOptions:{student_code:{required:Object(r.jsx)(s.a,{id:"The student code field is required"})},name:{required:Object(r.jsx)(s.a,{id:"The student name field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Student name must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Student name must be 70 characters max"})}},score:{required:Object(r.jsx)(s.a,{id:"The score field is required"})}},CertificateOptions:{},UserCertificateOptions:{},EditCertificateOptions:{title:{required:Object(r.jsx)(s.a,{id:"The title field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"The title must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"The title must be 70 characters max"})}},provider:{required:Object(r.jsx)(s.a,{id:"Provider field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Provider must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Provider must be 70 characters max"})}},position:{required:Object(r.jsx)(s.a,{id:"Position field is required"}),minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Position must be at least 3 characters"})},maxLength:{value:70,message:Object(r.jsx)(s.a,{id:"Position must be 70 characters max"})}}},ProductOptions:{product_name:{required:Object(r.jsx)(s.a,{id:"The product's name field is required"}),validate:function(e){return!i.a.NAME2.test(e)},minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Product name must be at least 3 characters"})},maxLength:{value:100,message:Object(r.jsx)(s.a,{id:"Product name up to 100 characters"})},alidate:function(e){return!i.a.SPACE.test(e)}},vat:{required:Object(r.jsx)(s.a,{id:"The VAT field is required"}),min:{value:0,message:Object(r.jsx)(s.a,{id:"VAT more than 0"})},max:{value:100,message:Object(r.jsx)(s.a,{id:"VAT less than 100"})}},number_trial:{min:{value:0,message:Object(r.jsx)(s.a,{id:"Number day must be greater than or equal to 0"})},max:{value:30,message:Object(r.jsx)(s.a,{id:"Number day must be less than or equal to 30"})},validate:function(e){return e>=0||Object(r.jsx)(s.a,{id:"Number day must be a positive number"})}},categoryId:{required:Object(r.jsx)(s.a,{id:"The category field is required"}),min:{value:0}},service_price_local:{required:Object(r.jsx)(s.a,{id:"The price field is required"}),validate:function(e){return!i.a.PRICE.test(e)},pattern:{value:/^0*/g,message:Object(r.jsx)(s.a,{id:"Invalid price"})},maxLength:{value:255}},service_price_cloud:{required:Object(r.jsx)(s.a,{id:"The price field is required"}),validate:function(e){return!i.a.PRICE.test(e)},pattern:{value:/^0*/g,message:Object(r.jsx)(s.a,{id:"Invalid price"})},maxLength:{value:255}}},VersionOptions:{version:{required:Object(r.jsx)(s.a,{id:"The version field is required"}),maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"Version up to 255 characters"})}},infor:{maxLength:{value:500,message:Object(r.jsx)(s.a,{id:"Information up to 500 characters"})}}},StaffOptions:{last_name:{required:Object(r.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(r.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(r.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(r.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(r.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:i.a.USERNAME,message:Object(r.jsx)(s.a,{id:"Invalid username"})}},email:{required:Object(r.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(r.jsx)(s.a,{id:"The password field is required"}),minLength:{value:8,message:Object(r.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},EditStaffOptions:{last_name:{required:Object(r.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(r.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(r.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(r.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(r.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:i.a.USERNAME,message:Object(r.jsx)(s.a,{id:"Invalid username"})}},email:{required:Object(r.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(r.jsx)(s.a,{id:"The password field is required"}),minLength:{value:8,message:Object(r.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},UserOptions:{last_name:{required:Object(r.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(r.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(r.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(r.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(r.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:i.a.USERNAME,message:Object(r.jsx)(s.a,{id:"Invalid username"})}},email:{validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(r.jsx)(s.a,{id:"The password field is required"}),validate:function(e){return!i.a.PASSWORD.test(null===e||void 0===e?void 0:e.trim())},minLength:{value:8,message:Object(r.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{pattern:{value:/^(0|\\d)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},EditUserOptions:{last_name:{required:Object(r.jsx)(s.a,{id:"The last name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Last name up to 25 characters"})}},first_name:{required:Object(r.jsx)(s.a,{id:"The first name field is required"}),validate:function(e){return!i.a.NAME.test(e)},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"First name up to 25 characters"})}},username:{required:Object(r.jsx)(s.a,{id:"The username field is required"}),minLength:{value:6,message:Object(r.jsx)(s.a,{id:"Username must be at least 6 characters"})},maxLength:{value:50,message:Object(r.jsx)(s.a,{id:"username must be 50 characters max"})},pattern:{value:i.a.USERNAME,message:Object(r.jsx)(s.a,{id:"Invalid username"})}},email:{validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},password:{required:Object(r.jsx)(s.a,{id:"The password field is required"}),validate:function(e){return!i.a.PASSWORD.test(null===e||void 0===e?void 0:e.trim())},minLength:{value:8,message:Object(r.jsx)(s.a,{id:"Password minimum 8 characters"})}},phone:{pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}}},CityOptions:{name:{required:Object(r.jsx)(s.a,{id:"The city name field is required"}),validate:function(e){return!i.a.NAME.test(e)}},code:{required:Object(r.jsx)(s.a,{id:"The city code field is required"}),alidate:function(e){return!i.a.NAME.test(e)}}},CountryOptions:{name:{required:Object(r.jsx)(s.a,{id:"The country name field is required"}),validate:function(e){return!i.a.NAME.test(e)}},code:{required:Object(r.jsx)(s.a,{id:"The country code field is required"}),validate:function(e){return!i.a.NAME.test(e)}},phone_code:{required:Object(r.jsx)(s.a,{id:"The phone code field is required"}),validate:function(e){return i.a.PHONE_CODE.test(e)}}},StudentOptions:{name:{required:Object(r.jsx)(s.a,{id:"The name field is required"}),maxLength:{value:255,message:Object(r.jsx)(s.a,{id:"Partner name up to 255 characters"})}},email:{required:Object(r.jsx)(s.a,{id:"The email field is required"}),validate:function(e){if(""!=e)return i.a.EMAIL.test(e)},maxLength:{value:125,message:Object(r.jsx)(s.a,{id:"Email up to 125 characters"})}},phone:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"}),pattern:{value:/^(0|84)(2(0[3-9]|1[0-6|8|9]|2[0-2|5-9]|3[2-9]|4[0-9]|5[1|2|4-9]|6[0-3|9]|7[0-7]|8[0-9]|9[0-4|6|7|9])|3[2-9]|5[5|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])([0-9]{7})$/i,message:Object(r.jsx)(s.a,{id:"Invalid phone number"})},maxLength:{value:25,message:Object(r.jsx)(s.a,{id:"Phone number up to 25 characters"})}},date:{required:Object(r.jsx)(s.a,{id:"The phone number field is required"})}},CloudOptions:{product_name:{required:Object(r.jsx)(s.a,{id:"The cloud name field is required"}),validate:function(e){return!i.a.NAME2.test(e)},minLength:{value:3,message:Object(r.jsx)(s.a,{id:"Cloud name must be at least 3 characters"})},maxLength:{value:100,message:Object(r.jsx)(s.a,{id:"Cloud name up to 100 characters"})},alidate:function(e){return!i.a.SPACE.test(e)}}}};a.a=n},475:function(e,a,t){"use strict";t.d(a,"a",(function(){return i}));var s=t(1),i=t.n(s).a.createContext({})},482:function(e,a,t){"use strict";var s=t(17),i=t(18),r=t(1),n=t.n(r),c=t(6),d=t.n(c),u=t(67),l=t.n(u),m=t(100),o={tag:m.q,className:d.a.string,cssModule:d.a.object,innerRef:d.a.oneOfType([d.a.object,d.a.string,d.a.func])},j=function(e){var a=e.className,t=e.cssModule,r=e.innerRef,c=e.tag,d=Object(i.a)(e,["className","cssModule","innerRef","tag"]),u=Object(m.m)(l()(a,"card-body"),t);return n.a.createElement(c,Object(s.a)({},d,{className:u,ref:r}))};j.propTypes=o,j.defaultProps={tag:"div"},a.a=j},491:function(e,a,t){"use strict";var s=t(17),i=t(138),r=t(1),n=t.n(r),c=t(6),d=t.n(c),u=t(67),l=t.n(u),m=t(475),o=t(100),j={tag:o.q,activeTab:d.a.any,className:d.a.string,cssModule:d.a.object},b=function(e){function a(a){var t;return(t=e.call(this,a)||this).state={activeTab:t.props.activeTab},t}return Object(i.a)(a,e),a.getDerivedStateFromProps=function(e,a){return a.activeTab!==e.activeTab?{activeTab:e.activeTab}:null},a.prototype.render=function(){var e=this.props,a=e.className,t=e.cssModule,i=e.tag,r=Object(o.n)(this.props,Object.keys(j)),c=Object(o.m)(l()("tab-content",a),t);return n.a.createElement(m.a.Provider,{value:{activeTabId:this.state.activeTab}},n.a.createElement(i,Object(s.a)({},r,{className:c})))},a}(r.Component);a.a=b,b.propTypes=j,b.defaultProps={tag:"div"}},493:function(e,a,t){"use strict";t.d(a,"a",(function(){return b}));var s=t(17),i=t(18),r=t(1),n=t.n(r),c=t(6),d=t.n(c),u=t(67),l=t.n(u),m=t(475),o=t(100),j={tag:o.q,className:d.a.string,cssModule:d.a.object,tabId:d.a.any};function b(e){var a=e.className,t=e.cssModule,r=e.tabId,c=e.tag,d=Object(i.a)(e,["className","cssModule","tabId","tag"]),u=function(e){return Object(o.m)(l()("tab-pane",a,{active:r===e}),t)};return n.a.createElement(m.a.Consumer,null,(function(e){var a=e.activeTabId;return n.a.createElement(c,Object(s.a)({},d,{className:u(a)}))}))}b.propTypes=j,b.defaultProps={tag:"div"}},494:function(e,a,t){"use strict";var s=t(17),i=t(18),r=t(2),n=t(1),c=t.n(n),d=t(6),u=t.n(d),l=t(67),m=t.n(l),o=t(100),j=t(481);function b(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,s)}return t}function h(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?b(Object(t),!0).forEach((function(a){Object(r.a)(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):b(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}var O={children:u.a.node,className:u.a.string,closeClassName:u.a.string,closeAriaLabel:u.a.string,cssModule:u.a.object,color:u.a.string,fade:u.a.bool,isOpen:u.a.bool,toggle:u.a.func,tag:o.q,transition:u.a.shape(j.a.propTypes),innerRef:u.a.oneOfType([u.a.object,u.a.string,u.a.func])},x={color:"success",isOpen:!0,tag:"div",closeAriaLabel:"Close",fade:!0,transition:h(h({},j.a.defaultProps),{},{unmountOnExit:!0})};function g(e){var a=e.className,t=e.closeClassName,r=e.closeAriaLabel,n=e.cssModule,d=e.tag,u=e.color,l=e.isOpen,b=e.toggle,O=e.children,x=e.transition,g=e.fade,v=e.innerRef,f=Object(i.a)(e,["className","closeClassName","closeAriaLabel","cssModule","tag","color","isOpen","toggle","children","transition","fade","innerRef"]),p=Object(o.m)(m()(a,"alert","alert-"+u,{"alert-dismissible":b}),n),q=Object(o.m)(m()("close",t),n),T=h(h(h({},j.a.defaultProps),x),{},{baseClass:g?x.baseClass:"",timeout:g?x.timeout:0});return c.a.createElement(j.a,Object(s.a)({},f,T,{tag:d,className:p,in:l,role:"alert",innerRef:v}),b?c.a.createElement("button",{type:"button",className:q,"aria-label":r,onClick:b},c.a.createElement("span",{"aria-hidden":"true"},"\xd7")):null,O)}g.propTypes=O,g.defaultProps=x,a.a=g},495:function(e,a,t){"use strict";var s=t(17),i=t(18),r=t(1),n=t.n(r),c=t(6),d=t.n(c),u=t(67),l=t.n(u),m=t(100),o={tabs:d.a.bool,pills:d.a.bool,vertical:d.a.oneOfType([d.a.bool,d.a.string]),horizontal:d.a.string,justified:d.a.bool,fill:d.a.bool,navbar:d.a.bool,card:d.a.bool,tag:m.q,className:d.a.string,cssModule:d.a.object},j=function(e){var a=e.className,t=e.cssModule,r=e.tabs,c=e.pills,d=e.vertical,u=e.horizontal,o=e.justified,j=e.fill,b=e.navbar,h=e.card,O=e.tag,x=Object(i.a)(e,["className","cssModule","tabs","pills","vertical","horizontal","justified","fill","navbar","card","tag"]),g=Object(m.m)(l()(a,b?"navbar-nav":"nav",!!u&&"justify-content-"+u,function(e){return!1!==e&&(!0===e||"xs"===e?"flex-column":"flex-"+e+"-column")}(d),{"nav-tabs":r,"card-header-tabs":h&&r,"nav-pills":c,"card-header-pills":h&&c,"nav-justified":o,"nav-fill":j}),t);return n.a.createElement(O,Object(s.a)({},x,{className:g}))};j.propTypes=o,j.defaultProps={tag:"ul",vertical:!1},a.a=j}}]);
//# sourceMappingURL=101.30618f88.chunk.js.map