(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chatbot-chat-bot-chat-bot-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/chatbot/chat-bot/chat-bot.page.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/chatbot/chat-bot/chat-bot.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n\n    <ion-title>AI-Trò chuyên với máy</ion-title>\n\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-item lines=\"none\" class=\"idea-created\">\n    <ion-avatar slot=\"start\">\n      <img src=\"{{chatbot?.avatar}}\">\n    </ion-avatar>\n    <ion-label class=\"ion-text-wrap\">\n      <strong slot=\"start\">\n        {{chatbot?.username}}\n      </strong>\n      <br>\n      {{chatbot?.fullname}}\n      <br>\n      <ion-note>{{chatbot?.created_time | timeAgo}}</ion-note>\n    </ion-label>\n    <ion-button (click)=\"onClickMore($event)\" slote=\"end\" shape=\"round\" fill=\"clear\" size=\"small\">\n      <ion-icon slot=\"icon-only\" name=\"ios-more\"></ion-icon>\n    </ion-button>\n  </ion-item>\n\n\n\n  <!-- Nhập nội dung câu hỏi yêu cầu cho máy -->\n  <ion-card *ngIf=\"!isRepairing\" class=\"input-comment\">\n    <ion-item lines=\"none\">\n      <ion-avatar slot=\"start\">\n        <img src=\"{{(userInfo?.avatar?userInfo.avatar:'assets/imgs/avatar.jpg')}}\">\n      </ion-avatar>\n      <ion-textarea autosize type=\"text\" placeholder=\"Bạn có yêu cầu gì?\" [(ngModel)]=\"message\"\n        (keyup.enter)=\"keyInput()\">\n      </ion-textarea>\n      <ion-button color=\"{{(message?'secondary':'light')}}\" (click)=\"onClickSend()\" fill=\"clear\" shape=\"round\">\n        <ion-icon slot=\"icon-only\" name=\"send\"></ion-icon>\n      </ion-button>\n    </ion-item>\n  </ion-card>\n\n  <!-- Lịch sử chatbot ở đây -->\n  <ion-list class=\"comment-list\">\n    <!-- Hiển thị khi người dùng vừa gõ enter gửi đi máy chủ chưa trả lời -->\n    <div *ngIf=\"!conversion?.response && !isRepairing && conversion?.request\">\n      <ion-item lines=\"none\">\n        <ion-avatar slot=\"end\">\n          <img src=\"{{(userInfo?.avatar?userInfo.avatar:'assets/imgs/avatar.jpg')}}\">\n        </ion-avatar>\n        <ion-label class=\"ion-text-wrap user-backgound\">\n          <strong slot=\"start\">\n            {{userInfo?.fullname}}\n          </strong>\n          <br>\n          <ion-label class=\"ion-text-wrap\">\n            <div [innerHTML]=\"conversion.request | newline | safe\"></div>\n          </ion-label>\n        </ion-label>\n      </ion-item>\n      <ion-note [style.padding-left]=\"'100px'\"> {{conversion?.created_time | timeAgo}} </ion-note>\n    </div>\n\n    <!-- Nhập nội dung trả lời sửa lại -->\n    <ion-card *ngIf=\"isRepairing\" class=\"input-train\">\n\n      <!-- Nút đóng không chỉnh sửa nằm ở góc trái trên cùng -->\n      <div class='close-button' tappable>\n\t\t\t\t<ion-icon slot=\"icon-only\" name=\"close\" color=\"danger\" (click)=\"onClickClose()\"></ion-icon>\n      </div>\n\n      <ion-item color=\"primary\">\n        <ion-label color=\"light\">DẠY CHO MÁY:</ion-label>\n      </ion-item>\n\n      <!-- Hiển thị lại nội dung câu hỏi của bạn -->\n      <ion-item>\n        <ion-avatar slot=\"end\">\n          <img src=\"{{(userInfo?.avatar?userInfo.avatar:'assets/imgs/avatar.jpg')}}\">\n        </ion-avatar>\n        <ion-label class=\"ion-text-wrap user-backgound\">\n          <strong slot=\"start\">\n            {{userInfo?.fullname}}\n          </strong>\n          <br>\n          <ion-label class=\"ion-text-wrap\">\n            <div [innerHTML]=\"conversion?.request | newline | safe\"></div>\n          </ion-label>\n        </ion-label>\n      </ion-item>\n\n      <!-- Lựa chọn ý định hoặc nhập ý định -->\n      <ion-item class=\"background-item-round\">\n        <ion-icon slot=\"start\" color=\"primary\" name=\"logo-reddit\"></ion-icon>\n        <ion-label position=\"stacked\" class=\"ion-text-wrap\" color=\"{{(conversion.invalid?'danger':'')}}\"\n          style=\"text-align: justify;\">\n          Ý định này là gì?(*)\n        </ion-label>\n        <ion-input type=\"text\" placeholder=\"Nhập ý định\" [(ngModel)]=\"conversion.intent_name\"></ion-input>\n      </ion-item>\n\n      <!-- Nhập câu trả lời -->\n      <ion-item>\n        <ion-label class=\"form-title-item\" color=\"tertiary\">Câu trả lời dạy cho máy (*):</ion-label>\n      </ion-item>\n      <ion-item class=\"background-item-round\">\n        <ion-avatar slot=\"start\">\n          <img src=\"{{chatbot?.avatar}}\">\n        </ion-avatar>\n        <ion-textarea autosize type=\"text\" placeholder=\"Nhập câu trả lời\" color=\"{{(conversion?.response?'':'danger')}}\"\n          [(ngModel)]=\"conversion.response\">\n        </ion-textarea>\n        <ion-button color=\"{{(conversion?.response?'danger':'light')}}\" (click)=\"onClickRepair()\" fill=\"clear\"\n          shape=\"round\">\n          <ion-icon slot=\"icon-only\" name=\"save\"></ion-icon>\n        </ion-button>\n      </ion-item>\n\n\n\n    </ion-card>\n\n    <!-- Khi máy chủ trả lời thì mặt nhiên nó sẽ ẩn đi và thông tin trả lời đã hiển thị ở mảng rồi -->\n    <div *ngFor=\"let comment of conversations\">\n\n      <div *ngIf=\"comment?.response && (!isRepairing || conversion.created_time !== comment.created_time)\">\n        <ion-item lines=\"none\">\n          <ion-avatar slot=\"start\">\n            <img src=\"{{chatbot?.avatar}}\">\n          </ion-avatar>\n          <ion-label class=\"ion-text-wrap bot-backgound\">\n            <strong slot=\"start\">\n              {{chatbot?.username}}\n            </strong>\n            <br>\n            <ion-label class=\"ion-text-wrap\">\n              <div [innerHTML]=\"comment.response | newline | safe\"></div>\n            </ion-label>\n          </ion-label>\n          <!-- Nút này chỉ xuất hiện ở câu chat cuối thôi nhé -->\n          <ion-button *ngIf=\"conversion.created_time === comment.created_time\" (click)=\"onClickRepair()\" slote=\"end\"\n            shape=\"round\" fill=\"clear\" size=\"small\">\n            <ion-icon slot=\"icon-only\" name=\"{{isRepairing?'save':'ios-create'}}\"\n              color=\"{{isRepairing?'danger':'secondary'}}\"></ion-icon>\n          </ion-button>\n        </ion-item>\n      </div>\n\n      <div *ngIf=\"comment?.request && (!isRepairing || conversion.created_time !== comment.created_time)\">\n        <ion-item lines=\"none\">\n          <ion-avatar slot=\"end\">\n            <img src=\"{{(userInfo?.avatar?userInfo.avatar:'assets/imgs/avatar.jpg')}}\">\n          </ion-avatar>\n          <ion-label class=\"ion-text-wrap user-backgound\">\n            <strong slot=\"start\">\n              {{userInfo?.fullname}}\n            </strong>\n            <br>\n            <ion-label class=\"ion-text-wrap\">\n              <div [innerHTML]=\"comment.request | newline | safe\"></div>\n            </ion-label>\n          </ion-label>\n        </ion-item>\n        <ion-note [style.padding-left]=\"'100px'\"> {{comment.created_time | timeAgo}} </ion-note>\n      </div>\n    </div>\n  </ion-list>\n\n</ion-content>");

/***/ }),

/***/ "./src/app/chatbot/chat-bot/chat-bot-routing.module.ts":
/*!*************************************************************!*\
  !*** ./src/app/chatbot/chat-bot/chat-bot-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: ChatBotPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatBotPageRoutingModule", function() { return ChatBotPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _chat_bot_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chat-bot.page */ "./src/app/chatbot/chat-bot/chat-bot.page.ts");




const routes = [
    {
        path: '',
        component: _chat_bot_page__WEBPACK_IMPORTED_MODULE_3__["ChatBotPage"]
    }
];
let ChatBotPageRoutingModule = class ChatBotPageRoutingModule {
};
ChatBotPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], ChatBotPageRoutingModule);



/***/ }),

/***/ "./src/app/chatbot/chat-bot/chat-bot.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/chatbot/chat-bot/chat-bot.module.ts ***!
  \*****************************************************/
/*! exports provided: ChatBotPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatBotPageModule", function() { return ChatBotPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _chat_bot_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./chat-bot-routing.module */ "./src/app/chatbot/chat-bot/chat-bot-routing.module.ts");
/* harmony import */ var _chat_bot_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chat-bot.page */ "./src/app/chatbot/chat-bot/chat-bot.page.ts");
/* harmony import */ var src_app_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared.module */ "./src/app/shared.module.ts");
/* harmony import */ var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngxi4-dynamic-service */ "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");









let ChatBotPageModule = class ChatBotPageModule {
};
ChatBotPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            src_app_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
            ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_8__["Ngxi4DynamicServiceModule"],
            _chat_bot_routing_module__WEBPACK_IMPORTED_MODULE_5__["ChatBotPageRoutingModule"]
        ],
        declarations: [_chat_bot_page__WEBPACK_IMPORTED_MODULE_6__["ChatBotPage"]]
    })
], ChatBotPageModule);



/***/ }),

/***/ "./src/app/chatbot/chat-bot/chat-bot.page.scss":
/*!*****************************************************!*\
  !*** ./src/app/chatbot/chat-bot/chat-bot.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".file-over {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n}\n\n.idea-created {\n  border-radius: 2em;\n  opacity: 0.9;\n  margin: 5px;\n  border-style: solid;\n  border-color: gray;\n  border-width: 1px;\n}\n\n.background-item-round {\n  margin: 3px;\n  border-radius: 1.5em;\n}\n\n.input-comment {\n  border-radius: 2em;\n  opacity: 0.9;\n  margin: 15px;\n  border-style: solid;\n  border-color: green;\n  border-width: 1px;\n  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);\n}\n\n.input-train {\n  position: relative;\n  border-radius: 2em;\n  opacity: 0.9;\n  margin: 15px;\n  border-style: solid;\n  border-color: red;\n  border-width: 1px;\n  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);\n}\n\n.input-train .close-button {\n  position: absolute;\n  z-index: 99;\n  top: 0%;\n  left: 90%;\n  font-size: 45px;\n}\n\n.bot-backgound {\n  position: relative;\n  margin-right: 10px;\n  min-width: 10px;\n  border-radius: 1em;\n  opacity: 0.9;\n  padding: 8px;\n  background-color: #E5E4E9;\n  color: #363636;\n}\n\n.user-backgound {\n  margin-left: 40px;\n  min-width: 10px;\n  border-radius: 1em;\n  opacity: 0.7;\n  padding: 8px;\n  background-color: #2095FE;\n  color: #fff;\n  text-align: right;\n}\n\n.comment-list {\n  margin: 15px;\n}\n\n.image-comment-size {\n  max-width: 200px;\n  margin: 2px;\n  border-radius: 0.5em;\n  border-style: solid;\n  border-color: black;\n  border-width: 1px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jdW9uZ2RxL0lPTklDL20taW5vdmF0aW9uL2NsaWVudC9zcmMvYXBwL2NoYXRib3QvY2hhdC1ib3QvY2hhdC1ib3QucGFnZS5zY3NzIiwic3JjL2FwcC9jaGF0Ym90L2NoYXQtYm90L2NoYXQtYm90LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQ0NKOztBREdBO0VBQ0ksV0FBQTtFQUNBLG9CQUFBO0FDQUo7O0FER0E7RUFFSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsMkNBQUE7QUNESjs7QURLQTtFQUNJLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLDJDQUFBO0FDRko7O0FES0E7RUFDSSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7QUNGSjs7QURLQTtFQUNJLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtBQ0ZKOztBREtBO0VBQ0ksaUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsV0FBQTtFQUNBLGlCQUFBO0FDRko7O0FETUE7RUFDSSxZQUFBO0FDSEo7O0FETUE7RUFDSSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQ0hKIiwiZmlsZSI6InNyYy9hcHAvY2hhdGJvdC9jaGF0LWJvdC9jaGF0LWJvdC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZmlsZS1vdmVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgei1pbmRleDogMjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3BhY2l0eTogMDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5pZGVhLWNyZWF0ZWR7XG4gICAgYm9yZGVyLXJhZGl1czogMmVtO1xuICAgIG9wYWNpdHk6IDAuOTtcbiAgICBtYXJnaW46IDVweDtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjogZ3JheTtcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbn1cblxuXG4uYmFja2dyb3VuZC1pdGVtLXJvdW5kIHtcbiAgICBtYXJnaW46IDNweDtcbiAgICBib3JkZXItcmFkaXVzOiAxLjVlbTtcbn1cblxuLmlucHV0LWNvbW1lbnR7XG4gICAgLy8gcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJvcmRlci1yYWRpdXM6IDJlbTtcbiAgICBvcGFjaXR5OiAwLjk7XG4gICAgbWFyZ2luOiAxNXB4O1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgYm9yZGVyLWNvbG9yOiBncmVlbjtcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xufVxuXG4vLyBLaOG7kWkgZOG6oXkgaOG7jWMgY2hvIG3DoXlcbi5pbnB1dC10cmFpbntcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYm9yZGVyLXJhZGl1czogMmVtO1xuICAgIG9wYWNpdHk6IDAuOTtcbiAgICBtYXJnaW46IDE1cHg7XG4gICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICBib3JkZXItY29sb3I6IHJlZDtcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xufVxuXG4uaW5wdXQtdHJhaW4gLmNsb3NlLWJ1dHRvbntcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgei1pbmRleDogOTk7XG4gICAgdG9wOiAwJTtcbiAgICBsZWZ0OiA5MCU7XG4gICAgZm9udC1zaXplOiA0NXB4O1xufVxuXG4uYm90LWJhY2tnb3VuZHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWFyZ2luLXJpZ2h0OiAxMHB4O1xuICAgIG1pbi13aWR0aDogMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiAxZW07XG4gICAgb3BhY2l0eTogMC45O1xuICAgIHBhZGRpbmc6IDhweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRTVFNEU5O1xuICAgIGNvbG9yOiAjMzYzNjM2O1xufVxuXG4udXNlci1iYWNrZ291bmR7XG4gICAgbWFyZ2luLWxlZnQ6IDQwcHg7XG4gICAgbWluLXdpZHRoOiAxMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDFlbTtcbiAgICBvcGFjaXR5OiAwLjc7XG4gICAgcGFkZGluZzogOHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMyMDk1RkU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG5cblxuLmNvbW1lbnQtbGlzdHtcbiAgICBtYXJnaW46IDE1cHg7XG59XG5cbi5pbWFnZS1jb21tZW50LXNpemV7XG4gICAgbWF4LXdpZHRoOiAyMDBweDtcbiAgICBtYXJnaW46IDJweDtcbiAgICBib3JkZXItcmFkaXVzOiAwLjVlbTtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjpibGFjaztcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbn0iLCIuZmlsZS1vdmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDI7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9wYWNpdHk6IDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmlkZWEtY3JlYXRlZCB7XG4gIGJvcmRlci1yYWRpdXM6IDJlbTtcbiAgb3BhY2l0eTogMC45O1xuICBtYXJnaW46IDVweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiBncmF5O1xuICBib3JkZXItd2lkdGg6IDFweDtcbn1cblxuLmJhY2tncm91bmQtaXRlbS1yb3VuZCB7XG4gIG1hcmdpbjogM3B4O1xuICBib3JkZXItcmFkaXVzOiAxLjVlbTtcbn1cblxuLmlucHV0LWNvbW1lbnQge1xuICBib3JkZXItcmFkaXVzOiAyZW07XG4gIG9wYWNpdHk6IDAuOTtcbiAgbWFyZ2luOiAxNXB4O1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6IGdyZWVuO1xuICBib3JkZXItd2lkdGg6IDFweDtcbiAgYm94LXNoYWRvdzogMHB4IDNweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC41KTtcbn1cblxuLmlucHV0LXRyYWluIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBib3JkZXItcmFkaXVzOiAyZW07XG4gIG9wYWNpdHk6IDAuOTtcbiAgbWFyZ2luOiAxNXB4O1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6IHJlZDtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJveC1zaGFkb3c6IDBweCAzcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuNSk7XG59XG5cbi5pbnB1dC10cmFpbiAuY2xvc2UtYnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB6LWluZGV4OiA5OTtcbiAgdG9wOiAwJTtcbiAgbGVmdDogOTAlO1xuICBmb250LXNpemU6IDQ1cHg7XG59XG5cbi5ib3QtYmFja2dvdW5kIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIG1pbi13aWR0aDogMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xuICBvcGFjaXR5OiAwLjk7XG4gIHBhZGRpbmc6IDhweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0U1RTRFOTtcbiAgY29sb3I6ICMzNjM2MzY7XG59XG5cbi51c2VyLWJhY2tnb3VuZCB7XG4gIG1hcmdpbi1sZWZ0OiA0MHB4O1xuICBtaW4td2lkdGg6IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcbiAgb3BhY2l0eTogMC43O1xuICBwYWRkaW5nOiA4cHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMDk1RkU7XG4gIGNvbG9yOiAjZmZmO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cblxuLmNvbW1lbnQtbGlzdCB7XG4gIG1hcmdpbjogMTVweDtcbn1cblxuLmltYWdlLWNvbW1lbnQtc2l6ZSB7XG4gIG1heC13aWR0aDogMjAwcHg7XG4gIG1hcmdpbjogMnB4O1xuICBib3JkZXItcmFkaXVzOiAwLjVlbTtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiBibGFjaztcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/chatbot/chat-bot/chat-bot.page.ts":
/*!***************************************************!*\
  !*** ./src/app/chatbot/chat-bot/chat-bot.page.ts ***!
  \***************************************************/
/*! exports provided: ChatBotPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatBotPage", function() { return ChatBotPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngxi4-dynamic-service */ "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");
/* harmony import */ var src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/main.service */ "./src/app/services/main.service.ts");





let ChatBotPage = class ChatBotPage {
    constructor(route, apiCommons, apiAuth, mainService) {
        this.route = route;
        this.apiCommons = apiCommons;
        this.apiAuth = apiAuth;
        this.mainService = mainService;
        this.chatbot = {
            avatar: "assets/imgs/avatar-ai.jpg",
            username: "AI-NLP-Mobifone-C3",
            fullname: "Tôi là máy học, tôi đang ở độ tuổi đi học, bạn hãy dạy cho tôi học nhé!",
            created_time: Date.now()
        };
        this.conversion = {};
        this.conversations = [];
        this.isRepairing = false;
        /**
         * Hàm gọi lại
         */
        this.callbackProcess = function (res) {
            return new Promise((resolve, reject) => {
                if (res.error) {
                    this.apiCommons.presentAlert('Error:<br>' + (res.error.message != undefined ? res.error.message : res.message ? res.message : ("Error Unknow: " + JSON.stringify(res.error, null, 2))));
                }
                resolve({ next: "CLOSE" });
            });
        }.bind(this);
    }
    ngOnInit() {
        this.init();
        this.route.queryParams.subscribe(item => {
            this.refresh(item);
        });
    }
    // đọc dữ liệu user
    init() {
        this.userInfo = this.mainService.getUserInfo();
    }
    // làm mới trang
    refresh(item) {
        this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.SOCKET_SERVER + '/request-answer', {
            message: 'Xin chào'
        }, true)
            .then(answer => {
            if (answer && answer.status === "OK") {
                // ban đầu máy sẽ tự động trả lời theo câu chào hỏi ban đầu
                this.conversations.unshift({
                    response: answer.message,
                    created_time: Date.now()
                });
            }
        })
            .catch(err => console.log('Lỗi lấy chi tiết', err));
    }
    // Gửi nội dung comment đi bằng nút bấm
    onClickSend() {
        if (this.message) {
            this.message = this.message.replace(/\r?\n|\r/g, '');
            if (this.message.length > 0) {
                // khai báo bản ghi người hỏi
                this.conversion = {
                    request: this.message,
                    created_time: Date.now()
                };
                this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.SOCKET_SERVER + '/request-answer', {
                    message: this.message
                }, true)
                    .then(answer => {
                    if (answer && answer.status === "OK") {
                        // ghi nhận bảng ghi máy trả lời
                        this.conversations.unshift({
                            request: this.conversion.request,
                            response: answer.message,
                            created_time: this.conversion.created_time
                        });
                        // muốn sửa câu trả lời thì sửa ngay cái đối tượng này
                        // thì gán đối tượng đàm thoại bằng bảng ghi cuối cùng để sửa
                        this.conversion = this.conversations[0];
                    }
                    this.message = '';
                })
                    .catch(err => {
                    console.log(err);
                    this.message = '';
                });
                this.message = '';
            }
        }
    }
    // khi bấm enter để gửi lệnh
    keyInput() {
        this.onClickSend();
    }
    // bấm vào menu
    onClickMore(evt) {
        const allMenu = [
            //  chỉ cho admin 98,99 và user_id của ý tưởng trùng với nó
            // Cho tất cả mọi người trừ userInfo==idea
            {
                id: 1,
                name: "Giảng bài cho máy",
                value: "EDIT-INTENT",
                icon: {
                    name: "create",
                    color: "success"
                }
            },
            {
                id: 2,
                name: "Kiểm tra độ chính xác",
                value: "VIEW-PROB",
                icon: {
                    name: "checkmark-circle",
                    color: "secondary"
                }
            },
            {
                id: 3,
                name: "Huấn luyện cho máy",
                value: "TRAIN",
                icon: {
                    name: "microphone",
                    color: "warning"
                }
            }
        ];
        // Nếu user không login thì không cho chạy huấn luyện
        if (!this.userInfo) {
            allMenu.splice(2, 1);
        }
        if (!this.conversion || !this.conversion.request) {
            allMenu.splice(1, 1);
        }
        this.apiCommons.presentPopover(evt, ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["PopoverCardComponent"], {
            type: 'single-choice',
            title: "Tác vụ",
            color: "primary",
            menu: allMenu
        })
            .then(data => {
            this.processDetails(data);
        })
            .catch(err => {
            // console.log('err: ', err);
        });
    }
    // Thực thi lệnh của end user chọn menu setting
    processDetails(itemOrItems) {
        let cmd = itemOrItems.value;
        // thực hiện gọi hàm huấn luyện
        // kết quả huấn luyện thành công sẽ mở cửa sổ alert
        if (cmd === 'TRAIN') {
            // kiểm tra user đã đánh giá hay chưa
            this.apiCommons.showLoader('Đang huấn luyện cho máy vui lòng đợi...');
            this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.SOCKET_SERVER + "/run-train", { command: 'run-train' }, true)
                .then(result => {
                this.apiCommons.hideLoader();
                this.apiCommons.showToast(result && result.message ? result.message : 'Đã huấn luyện thành công, bạn có thể test thử nhé', 2000, 'success');
            })
                .catch(err => {
                // console.log('err', err);
                this.apiCommons.hideLoader();
                this.apiCommons.showToast(err && err.message ? err.message : 'Lỗi huấn luyện cho máy', 3000, 'danger');
            });
        }
        // truy vấn xác suất của câu hỏi vừa mới đưa lên
        // kết quả trả về hiển thị lên màn hình popup
        if (cmd === 'VIEW-PROB') {
            this.checkProbRequest();
        }
        // mở trang intent câu hỏi và câu trả lời
        if (cmd === 'EDIT-INTENT') {
        }
    }
    // sửa câu trả lời
    // thì hiển thị câu trả lời ngay ở dưới ô
    onClickRepair() {
        if (this.isRepairing && (!this.conversion.response || !this.conversion.intent_name)) {
            // yêu cầu nhập đủ ý định và đáp ứng mới cho lưu được
            this.conversion.invalid = true;
            return;
        }
        // nếu yêu cầu lưu trữ thông tin đã chỉnh sửa
        if (this.isRepairing && this.conversion.request && this.conversion.response && this.conversion.intent_name) {
            // console.log(this.conversion);
            // các thông tin đã đầy đủ thì post lên máy chủ và trả kết quả về
            this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.SOCKET_SERVER + "/train-answer", {
                request: this.conversion.request,
                response: this.conversion.response,
                intent_name: this.conversion.intent_name
            }, true)
                .then(result => {
                // console.log('data', result);
                this.apiCommons.showToast(result && result.message ? result.message : 'Soạn bài giảng cho máy thành công', 2000, 'success');
            })
                .catch(err => {
                // console.log('err', err);
                this.apiCommons.showToast(err && err.message ? err.message : 'Lỗi soạn bài giảng cho máy', 3000, 'danger');
            });
        }
        this.isRepairing = !this.isRepairing;
    }
    // Đóng cửa sổ huấn luyện
    onClickClose() {
        this.isRepairing = false;
    }
    /**
     * Gửi lệnh lênh máy chủ thông tin yêu cầu, máy chủ trả về 3 chuỗi xác suất nhé
     */
    checkProbRequest() {
        this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.SOCKET_SERVER + "/get-predict?message=" + this.conversion.request, true)
            .then(results => {
            this.showResultCheck(results);
        })
            .catch(err => {
            this.apiCommons.showToast(err && err.message ? err.message : 'Lỗi kiểm tra xác suất', 3000, 'danger');
        });
    }
    showResultCheck(results) {
        let details = {
            type: "details",
            details: []
        };
        let title = "Câu nói: ";
        for (let idx = 0; idx < results.length; idx++) {
            let el = results[idx];
            if (idx === 0)
                title += el.text;
            details.details.push({
                name: (el.intent && el.intent.name ? el.intent.id + "# " + el.intent.name : el.label),
                value: (el.value * 100).toFixed(2) + "%"
            });
        }
        let form = {
            title: 'Hệ thống tìm thấy',
            buttons: [
                { color: 'danger', icon: 'close', next: 'CLOSE' }
            ],
            items: [
                { type: 'title', name: title },
                details
            ]
        };
        // call popup window for form login
        this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["DynamicFormMobilePage"], {
            parent: this,
            callback: this.callbackProcess,
            form: form
        });
    }
};
ChatBotPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["CommonsService"] },
    { type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
    { type: src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__["MainService"] }
];
ChatBotPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-chat-bot',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./chat-bot.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/chatbot/chat-bot/chat-bot.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./chat-bot.page.scss */ "./src/app/chatbot/chat-bot/chat-bot.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["CommonsService"],
        ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
        src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__["MainService"]])
], ChatBotPage);



/***/ })

}]);
//# sourceMappingURL=chatbot-chat-bot-chat-bot-module-es2015.js.map