(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-622246b1"],{"2fdb":function(t,e,n){"use strict";var a=n("5ca1"),o=n("d2c8"),i="includes";a(a.P+a.F*n("5147")(i),"String",{includes:function(t){return!!~o(this,t,i).indexOf(t,arguments.length>1?arguments[1]:void 0)}})},5147:function(t,e,n){var a=n("2b4c")("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[a]=!1,!"/./"[t](e)}catch(o){}}return!0}},"675b":function(t,e,n){"use strict";var a=n("f34c"),o=n.n(a);o.a},6762:function(t,e,n){"use strict";var a=n("5ca1"),o=n("c366")(!0);a(a.P,"Array",{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),n("9c6c")("includes")},aae3:function(t,e,n){var a=n("d3f4"),o=n("2d95"),i=n("2b4c")("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},d2c8:function(t,e,n){var a=n("aae3"),o=n("be13");t.exports=function(t,e,n){if(a(e))throw TypeError("String#"+n+" doesn't accept regex!");return String(o(t))}},eec5:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"welcome"}},[n("el-dialog",{attrs:{title:"Is This You?",visible:t.verifyStudent,"before-close":t.cancelCheckIn,"custom-class":"verify-dialog",width:"80%",center:""},on:{"update:visible":function(e){t.verifyStudent=e}}},[n("span",{staticClass:"student-info-wrapper"},[n("span",{staticClass:"student-name"},[t._v(" Name: "+t._s(t.studentInfo.value))]),t.studentInfo.country?n("span",{staticClass:"student-country"},[t._v(" Country: "+t._s(t.studentInfo.country))]):t._e(),t.studentInfo.email?n("span",{staticClass:"student-email"},[t._v(" Email: "+t._s(t.studentInfo.email))]):t._e()]),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{staticClass:"cancel-check-button",attrs:{type:"text"},on:{click:t.cancelCheckIn}},[t._v("\n        Cancel\n      ")]),n("el-button",{staticClass:"check-in-button",on:{click:t.checkIn}},[t._v("\n        Check In\n      ")])],1)]),n("el-dialog",{attrs:{title:"Enter Your Information",visible:t.registerStudent,"before-close":t.cancelCheckIn,width:"80%"},on:{"update:visible":function(e){t.registerStudent=e}}},[n("el-form",{attrs:{model:t.addFormInfo}},[n("el-form-item",{attrs:{label:"First name","label-width":t.formLabelWidth}},[n("el-input",{attrs:{autocomplete:"off",placeholder:"John"},model:{value:t.addFormInfo.firstName,callback:function(e){t.$set(t.addFormInfo,"firstName",e)},expression:"addFormInfo.firstName"}})],1),n("el-form-item",{attrs:{label:"Last name","label-width":t.formLabelWidth}},[n("el-input",{attrs:{autocomplete:"off",placeholder:"Smith"},model:{value:t.addFormInfo.lastName,callback:function(e){t.$set(t.addFormInfo,"lastName",e)},expression:"addFormInfo.lastName"}})],1),n("el-form-item",{attrs:{label:"Student #","label-width":t.formLabelWidth}},[n("el-input",{attrs:{autocomplete:"off",placeholder:"1234567"},model:{value:t.addFormInfo.id,callback:function(e){t.$set(t.addFormInfo,"id",e)},expression:"addFormInfo.id"}})],1),n("el-form-item",{attrs:{label:"Country","label-width":t.formLabelWidth}},[n("el-input",{attrs:{autocomplete:"off",placeholder:"Canada"},model:{value:t.addFormInfo.country,callback:function(e){t.$set(t.addFormInfo,"country",e)},expression:"addFormInfo.country"}})],1),n("el-form-item",{attrs:{label:"Email","label-width":t.formLabelWidth}},[n("el-input",{attrs:{autocomplete:"off",placeholder:"john.smith@email.com"},model:{value:t.addFormInfo.email,callback:function(e){t.$set(t.addFormInfo,"email",e)},expression:"addFormInfo.email"}})],1)],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{staticClass:"cancel-check-button",attrs:{type:"text"},on:{click:t.cancelCheckIn}},[t._v("\n        Cancel\n      ")]),n("el-button",{staticClass:"check-in-button",on:{click:t.checkIn}},[t._v("\n        Check In\n      ")])],1)],1),t.registerStudent||t.verifyStudent?t._e():n("div",{staticClass:"welcome-content"},[n("transition",{attrs:{name:"fade",mode:"out-in"}},[n("div",{key:t.welcomeString,staticClass:"welcome-header"},[t._v("\n        "+t._s(t.welcomeString)+"\n      ")])]),n("div",{staticClass:"welcome-modal"},[n("el-autocomplete",{staticClass:"name-input",attrs:{placeholder:"Enter Name","trigger-on-focus":!1,"fetch-suggestions":t.queryStudents},on:{select:t.handleNameSelect},model:{value:t.studentName,callback:function(e){t.studentName=e},expression:"studentName"}},[n("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})]),t.inDatabase?t._e():n("el-button",{attrs:{type:"text"},on:{click:t.addingStudent}},[t._v("\n        Can't Find Your Name?\n      ")])],1)],1)],1)},o=[],i=(n("8e6e"),n("ac6a"),n("456d"),n("6762"),n("2fdb"),n("75fc")),r=n("bd86"),s=n("2f62");function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),n.push.apply(n,a)}return n}function l(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(n,!0).forEach(function(e){Object(r["a"])(t,e,n[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(n).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))})}return t}var u={name:"Welcome",components:{},data:function(){return{studentName:null,inDatabase:!0,registerStudent:!1,welcomeStringIndex:0,welcomeTimer:0,checkedIn:!1,verifyStudent:!1,formLabelWidth:"120px",studentNameArray:[],addFormInfo:{firstName:"",lastName:"",country:"",email:"",id:""},studentInfo:{value:null,country:null,email:null,dbID:null},welcomeStringArray:["Welcome","Nnọọ","歡迎","Bienvenu","خوش آمدید","स्वागत हे","Pjila'Si","Bienvenida","Sannu da zuwâ","환영합니다","સ્વાગત છે","Ób’ókhían","Welkom","Chào Mừng","स्वागतम","ようこそ","Herzlich Willkommen","Xoş gəlmişsiniz","Tervetuloa","Selamat Datang","Ek’abo","Murakaza neza","வாருங்கள்","أهلاً و سهلاً"]}},computed:l({},Object(s["c"])(["allStudents"]),{welcomeString:function(){return this.welcomeStringArray[this.welcomeStringIndex]}}),methods:l({},Object(s["b"])(["checkInStudent","addStudent"]),{addingStudent:function(){console.log("User is adding a student"),this.registerStudent=!0},setWelcomeString:function(){this.welcomeStringIndex>=this.welcomeStringArray.length?this.welcomeStringIndex=0:++this.welcomeStringIndex},changeWelcomeString:function(){var t=this;clearInterval(this.welcomeTimer),this.setWelcomeString(),setTimeout(function(){t.changeWelcomeString()},3e3)},handleNameSelect:function(t){this.studentName=t.value,this.studentInfo=l({},t),console.log("Verifying student"),this.verifyStudent=!0},queryStudents:function(t,e){var n=Object(i["a"])(this.studentNameArray),a=t?n.filter(this.nameFilter(t)):n;0===a.length?this.inDatabase=!1:this.inDatabase=!0,e(a)},nameFilter:function(t){return function(e){return e.value.toLowerCase().includes(t.toLowerCase())}},setUpStudentNames:function(){var t=this;this.allStudents.map(function(e){var n="".concat(e.firstName," ").concat(e.lastName);return t.studentNameArray.push({value:n,country:e.country,email:e.email,dbID:e.dbID}),e})},cancelCheckIn:function(){this.resetStudentInfo(),this.resetFormInfo(),this.studentName="",this.registerStudent=!1,this.verifyStudent=!1,this.inDatabase=!0,console.log("User has cancelled check in")},checkIn:function(){var t;this.verifyStudent?(t={dbID:this.studentInfo.dbID},this.checkInStudent(t)):this.registerStudent&&(t=l({},this.addFormInfo),this.addStudent(t)),console.log("User has checked in!"),this.$router.push("check")},resetStudentInfo:function(){this.studentInfo={value:null,country:null,email:null,dbID:null}},resetFormInfo:function(){this.addFormInfo={firstName:"",lastName:"",country:"",email:"",id:""}}}),mounted:function(){this.changeWelcomeString(),this.setUpStudentNames()}},d=u,m=(n("675b"),n("2877")),f=Object(m["a"])(d,a,o,!1,null,null,null);e["default"]=f.exports},f34c:function(t,e,n){}}]);
//# sourceMappingURL=chunk-622246b1.201f8cea.js.map