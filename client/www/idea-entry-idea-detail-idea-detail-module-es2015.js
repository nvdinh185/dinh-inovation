(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["idea-entry-idea-detail-idea-detail-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/idea-entry/idea-detail/idea-detail.page.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/idea-entry/idea-detail/idea-detail.page.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n\n    <ion-buttons slot=\"start\">\n      <ion-back-button></ion-back-button>\n    </ion-buttons>\n\n    <ion-title>Chủ đề ý tưởng</ion-title>\n\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-item lines=\"none\" class=\"idea-created\">\n    <ion-avatar slot=\"start\">\n      <img src=\"{{ideaInfo?.idea?.avatar}}\">\n    </ion-avatar>\n    <ion-label>\n      <strong slot=\"start\">\n        {{ideaInfo?.idea?.username}}\n      </strong>\n      <br>\n      <ion-note>{{ideaInfo?.idea?.created_time | timeAgo}}</ion-note>\n    </ion-label>\n    <ion-button (click)=\"onClickMore($event)\" slote=\"end\" shape=\"round\" fill=\"clear\" size=\"small\">\n      <ion-icon slot=\"icon-only\" name=\"ios-more\"></ion-icon>\n    </ion-button>\n  </ion-item>\n  <ion-list>\n    <ion-item>\n      <strong slot=\"start\">\n        Chủ đề #{{ideaInfo?.idea?.id}}:\n      </strong>\n      <ion-label class=\"ion-text-wrap\">\n        {{ideaInfo?.idea?.title}}\n      </ion-label>\n    </ion-item>\n    <ion-item>\n      <strong slot=\"start\">\n        Nội dung:\n      </strong>\n      <ion-label class=\"ion-text-wrap\">\n        <div [innerHTML]=\"ideaInfo?.idea?.description | newline | safe\"></div>\n      </ion-label>\n    </ion-item>\n    <ion-item>\n      <strong slot=\"start\">\n        Lĩnh vực:\n      </strong>\n      <ion-label class=\"ion-text-wrap\">\n        {{ideaInfo?.idea?.category_name}}\n      </ion-label>\n    </ion-item>\n    <ion-item>\n      <strong slot=\"start\">\n        Giai đoạn:\n      </strong>\n      <ion-label class=\"ion-text-wrap\">\n        {{ideaInfo?.idea?.status_name}}\n      </ion-label>\n    </ion-item>\n  </ion-list>\n\n  <ion-item lines=\"none\">\n    <ion-button slot=\"start\" color=\"{{(ideaInfo?.isUserVoted?'secondary':'light')}}\" (click)=\"likeIdea(ideaInfo?.idea)\"\n      shape=\"round\" size=\"small\">\n      {{ideaInfo?.idea?.voted_count}} likes\n    </ion-button>\n    <ion-button slot=\"start\" color=\"{{(ideaInfo?.isUserCommented?'success':'light')}}\" shape=\"round\" size=\"small\">\n      {{ideaInfo?.comments?.length}} comments\n    </ion-button>\n    <ion-button slot=\"start\" color=\"{{(ideaInfo?.isUserCommented?'success':'light')}}\" shape=\"round\" size=\"small\">\n      {{ideaInfo?.idea?.total_point}} điểm\n    </ion-button>\n    <ion-label *ngIf=\"ideaInfo?.idea?.attach_id_list?.length>0\" class=\"ion-text-wrap\">\n      {{ideaInfo.idea.attach_id_list.length}} Files đính kèm\n    </ion-label>\n  </ion-item>\n\n  <!-- Hiển thị nội dung file và image đính kèm của ý tưởng -->\n  <div [style.padding-left]=\"'20px'\">\n    <img tappable *ngFor=\"let image of ideaInfo?.idea?.images;\" src=\"{{image.src}}\" (click)=\"onClickViewImage(image.id)\" class=\"image-comment-size\">\n  </div>\n  <ion-item [style.padding-left]=\"'20px'\" *ngIf=\"ideaInfo?.idea?.attachs?.length>0\" lines=\"none\">\n    <ion-label class=\"ion-text-wrap\">\n      <span *ngFor=\"let file of ideaInfo?.idea?.attachs;\">\n        <ion-button color=\"primary\" (click)=\"onClickViewFile(file.id)\" fill=\"outline\" shape=\"round\" style=\"text-transform:none!important;\">\n          {{file.file_name}}\n          <ion-icon slot=\"end\" name=\"eye\"></ion-icon>\n        </ion-button>\n      </span>\n    </ion-label>\n  </ion-item>\n\n\n  <!-- Nhập nội dung comment để góp ý ở ô này -->\n  <ion-card class=\"input-comment\">\n    <ion-item lines=\"none\">\n      <ion-avatar slot=\"start\">\n        <img src=\"{{userInfo?.avatar}}\">\n      </ion-avatar>\n      <ion-textarea autosize type=\"text\" placeholder=\"Đóng góp ý kiến .... \" [(ngModel)]=\"message\"></ion-textarea>\n      <ion-button color=\"medium\" fill=\"clear\" shape=\"round\">\n        <input class=\"file-over\" type=\"file\" multiple=\"multiple\" (change)=\"uploadFilesEvent($event)\" accept=\"image/gif, image/jpeg, image/png\n                  , application/pdf\n                  , .txt, .md\n                  , .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel\n                  , application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document\" />\n        <ion-icon slot=\"icon-only\" name=\"attach\"></ion-icon>\n      </ion-button>\n      <ion-button color=\"{{(message||uploadingFiles.length>0?'secondary':'light')}}\" (click)=\"onClickSend()\"\n        fill=\"clear\" shape=\"round\">\n        <ion-icon slot=\"icon-only\" name=\"send\"></ion-icon>\n      </ion-button>\n    </ion-item>\n    <ion-item *ngIf=\"uploadingFiles?.length>0\" lines=\"none\">\n      <ion-label class=\"ion-text-wrap\">\n        <span *ngFor=\"let file of uploadingFiles; let idx=index;\">\n          <ion-button *ngIf=\"!file.isImage\" color=\"secondary\" (click)=\"onClickRemoveFile(idx)\" fill=\"outline\" shape=\"round\" style=\"text-transform:none!important;\">\n            {{file.name}}\n            <ion-icon slot=\"end\" name=\"close\"></ion-icon>\n          </ion-button>\n          <div *ngIf=\"file.isImage\" class=\"image-upload-size\">\n            <img src=\"{{file.image}}\">\n            <div class='close-button' tappable>\n              <ion-icon slot=\"icon-only\" name=\"close\" color=\"medium\" (click)=\"onClickRemoveFile(idx)\"></ion-icon>\n            </div>\n          </div>\n        </span>\n      </ion-label>\n    </ion-item>\n  </ion-card>\n\n  <!-- Lịch sử góp ý hiển thị theo hình cây ở dưới đây -->\n  <ion-list class=\"comment-list\">\n    <div *ngFor=\"let comment of ideaInfo?.comments\" [style.padding-left]=\"comment.parent_id?'20px':'0px'\">\n      <ion-item lines=\"none\">\n        <ion-avatar slot=\"start\">\n          <img src=\"{{comment.avatar}}\">\n        </ion-avatar>\n        <ion-label class=\"ion-text-wrap comment-backgound\">\n          <strong slot=\"start\">\n            {{comment.username}}\n          </strong>\n          <br>\n          <ion-label class=\"ion-text-wrap\">\n            <div [innerHTML]=\"comment.content | newline | safe\"></div>\n          </ion-label>\n        </ion-label>\n      </ion-item>\n      <ion-note [style.padding-left]=\"comment.parent_id?'100px':'80px'\"> {{comment.created_time | timeAgo}} </ion-note>\n      <br>\n      <div [style.padding-left]=\"comment.parent_id?'80px':'60px'\">\n        <img tappable *ngFor=\"let image of comment.images;\" src=\"{{image.src}}\" (click)=\"onClickViewImage(image.id)\" class=\"image-comment-size\">\n      </div>\n      <ion-item [style.padding-left]=\"comment.parent_id?'80px':'60px'\" *ngIf=\"comment.attachs?.length>0\" lines=\"none\">\n        <ion-label class=\"ion-text-wrap\">\n          <span *ngFor=\"let file of comment.attachs; let idx=index;\">\n            <ion-button color=\"dark\" (click)=\"onClickViewFile(file.id)\" fill=\"outline\" shape=\"round\" style=\"text-transform:none!important;\">\n              {{file.file_name}}\n              <ion-icon slot=\"end\" name=\"eye\"></ion-icon>\n            </ion-button>\n          </span>\n        </ion-label>\n      </ion-item>\n    </div>\n  </ion-list>\n\n</ion-content>");

/***/ }),

/***/ "./src/app/idea-entry/idea-detail/idea-detail-routing.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/idea-entry/idea-detail/idea-detail-routing.module.ts ***!
  \**********************************************************************/
/*! exports provided: IdeaDetailPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaDetailPageRoutingModule", function() { return IdeaDetailPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _idea_detail_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./idea-detail.page */ "./src/app/idea-entry/idea-detail/idea-detail.page.ts");




const routes = [
    {
        path: '',
        component: _idea_detail_page__WEBPACK_IMPORTED_MODULE_3__["IdeaDetailPage"]
    }
];
let IdeaDetailPageRoutingModule = class IdeaDetailPageRoutingModule {
};
IdeaDetailPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], IdeaDetailPageRoutingModule);



/***/ }),

/***/ "./src/app/idea-entry/idea-detail/idea-detail.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/idea-entry/idea-detail/idea-detail.module.ts ***!
  \**************************************************************/
/*! exports provided: IdeaDetailPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaDetailPageModule", function() { return IdeaDetailPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _idea_detail_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./idea-detail-routing.module */ "./src/app/idea-entry/idea-detail/idea-detail-routing.module.ts");
/* harmony import */ var _idea_detail_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./idea-detail.page */ "./src/app/idea-entry/idea-detail/idea-detail.page.ts");
/* harmony import */ var src_app_shared_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared.module */ "./src/app/shared.module.ts");
/* harmony import */ var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngxi4-dynamic-service */ "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");









let IdeaDetailPageModule = class IdeaDetailPageModule {
};
IdeaDetailPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_8__["Ngxi4DynamicServiceModule"],
            src_app_shared_module__WEBPACK_IMPORTED_MODULE_7__["SharedModule"],
            _idea_detail_routing_module__WEBPACK_IMPORTED_MODULE_5__["IdeaDetailPageRoutingModule"]
        ],
        declarations: [_idea_detail_page__WEBPACK_IMPORTED_MODULE_6__["IdeaDetailPage"]]
    })
], IdeaDetailPageModule);



/***/ }),

/***/ "./src/app/idea-entry/idea-detail/idea-detail.page.scss":
/*!**************************************************************!*\
  !*** ./src/app/idea-entry/idea-detail/idea-detail.page.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".file-over {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n}\n\n.idea-created {\n  border-radius: 2em;\n  opacity: 0.9;\n  margin: 5px;\n  border-style: solid;\n  border-color: gray;\n  border-width: 1px;\n}\n\n.input-comment {\n  border-radius: 2em;\n  opacity: 0.9;\n  margin: 15px;\n  border-style: solid;\n  border-color: green;\n  border-width: 1px;\n  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);\n}\n\n.comment-backgound {\n  position: relative;\n  border-radius: 1em;\n  opacity: 0.9;\n  padding: 8px;\n  background: whitesmoke;\n}\n\n.comment-list {\n  margin: 15px;\n}\n\n.image-comment-size {\n  max-width: 200px;\n  margin: 2px;\n  border-radius: 0.5em;\n  border-style: solid;\n  border-color: black;\n  border-width: 1px;\n}\n\n.image-upload-size {\n  position: relative;\n  max-width: 200px;\n  margin: 2px;\n  padding: 3px;\n  border-radius: 0.5em;\n  border-style: solid;\n  border-color: black;\n  border-width: 1px;\n}\n\n.image-upload-size .close-button {\n  position: absolute;\n  top: 2%;\n  left: 80%;\n  font-size: 30px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jdW9uZ2RxL0lPTklDL20taW5vdmF0aW9uL2NsaWVudC9zcmMvYXBwL2lkZWEtZW50cnkvaWRlYS1kZXRhaWwvaWRlYS1kZXRhaWwucGFnZS5zY3NzIiwic3JjL2FwcC9pZGVhLWVudHJ5L2lkZWEtZGV0YWlsL2lkZWEtZGV0YWlsLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtBQ0NKOztBREVBO0VBQ0ksa0JBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQ0NKOztBRENBO0VBRUksa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLDJDQUFBO0FDQ0o7O0FEQ0E7RUFDSSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtBQ0VKOztBRENBO0VBQ0ksWUFBQTtBQ0VKOztBRENBO0VBQ0ksZ0JBQUE7RUFDQSxXQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUNFSjs7QURDQTtFQUNJLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0FDRUo7O0FEQ0E7RUFDSSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtBQ0VKIiwiZmlsZSI6InNyYy9hcHAvaWRlYS1lbnRyeS9pZGVhLWRldGFpbC9pZGVhLWRldGFpbC5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuZmlsZS1vdmVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgei1pbmRleDogMjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgb3BhY2l0eTogMDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5pZGVhLWNyZWF0ZWR7XG4gICAgYm9yZGVyLXJhZGl1czogMmVtO1xuICAgIG9wYWNpdHk6IDAuOTtcbiAgICBtYXJnaW46IDVweDtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjogZ3JheTtcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbn1cbi5pbnB1dC1jb21tZW50e1xuICAgIC8vIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3JkZXItcmFkaXVzOiAyZW07XG4gICAgb3BhY2l0eTogMC45O1xuICAgIG1hcmdpbjogMTVweDtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjogZ3JlZW47XG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gICAgYm94LXNoYWRvdzogMHB4IDNweCAxMHB4IHJnYmEoMCwgMCwgMCwgMC41KTtcbn1cbi5jb21tZW50LWJhY2tnb3VuZHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgYm9yZGVyLXJhZGl1czogMWVtO1xuICAgIG9wYWNpdHk6IDAuOTtcbiAgICBwYWRkaW5nOiA4cHg7XG4gICAgYmFja2dyb3VuZDogd2hpdGVzbW9rZTtcbn1cblxuLmNvbW1lbnQtbGlzdHtcbiAgICBtYXJnaW46IDE1cHg7XG59XG5cbi5pbWFnZS1jb21tZW50LXNpemV7XG4gICAgbWF4LXdpZHRoOiAyMDBweDtcbiAgICBtYXJnaW46IDJweDtcbiAgICBib3JkZXItcmFkaXVzOiAwLjVlbTtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjpibGFjaztcbiAgICBib3JkZXItd2lkdGg6IDFweDtcbn1cblxuLmltYWdlLXVwbG9hZC1zaXple1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBtYXgtd2lkdGg6IDIwMHB4O1xuICAgIG1hcmdpbjogMnB4O1xuICAgIHBhZGRpbmc6IDNweDtcbiAgICBib3JkZXItcmFkaXVzOiAwLjVlbTtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjogYmxhY2s7XG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XG59XG5cbi5pbWFnZS11cGxvYWQtc2l6ZSAuY2xvc2UtYnV0dG9uIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAyJTtcbiAgICBsZWZ0OiA4MCU7XG4gICAgZm9udC1zaXplOiAzMHB4O1xufSIsIi5maWxlLW92ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3BhY2l0eTogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uaWRlYS1jcmVhdGVkIHtcbiAgYm9yZGVyLXJhZGl1czogMmVtO1xuICBvcGFjaXR5OiAwLjk7XG4gIG1hcmdpbjogNXB4O1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6IGdyYXk7XG4gIGJvcmRlci13aWR0aDogMXB4O1xufVxuXG4uaW5wdXQtY29tbWVudCB7XG4gIGJvcmRlci1yYWRpdXM6IDJlbTtcbiAgb3BhY2l0eTogMC45O1xuICBtYXJnaW46IDE1cHg7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogZ3JlZW47XG4gIGJvcmRlci13aWR0aDogMXB4O1xuICBib3gtc2hhZG93OiAwcHggM3B4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xufVxuXG4uY29tbWVudC1iYWNrZ291bmQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJvcmRlci1yYWRpdXM6IDFlbTtcbiAgb3BhY2l0eTogMC45O1xuICBwYWRkaW5nOiA4cHg7XG4gIGJhY2tncm91bmQ6IHdoaXRlc21va2U7XG59XG5cbi5jb21tZW50LWxpc3Qge1xuICBtYXJnaW46IDE1cHg7XG59XG5cbi5pbWFnZS1jb21tZW50LXNpemUge1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICBtYXJnaW46IDJweDtcbiAgYm9yZGVyLXJhZGl1czogMC41ZW07XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XG4gIGJvcmRlci13aWR0aDogMXB4O1xufVxuXG4uaW1hZ2UtdXBsb2FkLXNpemUge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1heC13aWR0aDogMjAwcHg7XG4gIG1hcmdpbjogMnB4O1xuICBwYWRkaW5nOiAzcHg7XG4gIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6IGJsYWNrO1xuICBib3JkZXItd2lkdGg6IDFweDtcbn1cblxuLmltYWdlLXVwbG9hZC1zaXplIC5jbG9zZS1idXR0b24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMiU7XG4gIGxlZnQ6IDgwJTtcbiAgZm9udC1zaXplOiAzMHB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/idea-entry/idea-detail/idea-detail.page.ts":
/*!************************************************************!*\
  !*** ./src/app/idea-entry/idea-detail/idea-detail.page.ts ***!
  \************************************************************/
/*! exports provided: IdeaDetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaDetailPage", function() { return IdeaDetailPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngxi4-dynamic-service */ "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");
/* harmony import */ var src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/main.service */ "./src/app/services/main.service.ts");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");






let IdeaDetailPage = class IdeaDetailPage {
    constructor(route, apiCommons, apiAuth, mainService, iab) {
        this.route = route;
        this.apiCommons = apiCommons;
        this.apiAuth = apiAuth;
        this.mainService = mainService;
        this.iab = iab;
        this.uploadingFiles = [];
        // hàm gọi lại xử lý form popup
        this.callbackProcess = function (res) {
            // allway return Promise for callback
            return new Promise((resolve, reject) => {
                // console.log(res);
                if (res.error) {
                    //If error 
                    this.apiCommons.presentAlert('Error:<br>' + (res.message ? res.message : "Error Unknow: " + JSON.stringify(res.error, null, 2)));
                }
                else if (res.response_data) {
                    // Data return when server response or sqlite app respone
                    // next="CALLBACK", url="http://..." [,token: true | wzI...]
                    if (res.button.command === "MARK") {
                        // Do any for command
                        this.refresh(res.button.id);
                    }
                    if (res.button.command === "EDIT") {
                        // Do any for command
                        this.refresh(res.button.id);
                    }
                }
                // close form
                resolve({ next: "CLOSE" });
            });
        }.bind(this);
    }
    ngOnInit() {
        this.init();
        this.route.queryParams.subscribe(item => {
            // console.log('item', item);
            // đọc chi tiết để hiển thị nội dung chi tiết ra
            this.refresh(item.id);
        });
    }
    init() {
        this.userInfo = this.mainService.getUserInfo();
    }
    // làm mới ý tưởng này
    refresh(id) {
        this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea?id=' + id, true)
            .then(ideaDetail => {
            this.ideaInfo = ideaDetail;
            this.refreshUserAction();
        })
            .catch(err => console.log('Lỗi lấy chi tiết', err));
    }
    refreshUserAction() {
        if (this.ideaInfo && this.ideaInfo.likes && this.ideaInfo.comments) {
            if (this.ideaInfo.idea && this.ideaInfo.idea.attach_id_list) {
                // thực hiện truy vấn lấy danh sách file đính kèm - tên file, kiểu file, id để hiển thị ra
                this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-attach-files?id_list=' + JSON.stringify(this.ideaInfo.idea.attach_id_list), true)
                    .then(list => {
                    if (list && Array.isArray(list.images)) {
                        this.ideaInfo.idea.images = list.images;
                        this.ideaInfo.idea.images.forEach(file => file.src = this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-file-id?id=" + file.id);
                    }
                    if (list && Array.isArray(list.files)) {
                        this.ideaInfo.idea.attachs = list.files;
                    }
                })
                    .catch(err => {
                    console.log('Lỗi lấy file: ', err);
                });
            }
            this.ideaInfo.isUserVoted = this.ideaInfo.likes.findIndex(x => x.user_id === this.userInfo.id && x.activities_type > 0) >= 0;
            this.ideaInfo.isUserCommented = this.ideaInfo.comments.findIndex(x => x.user_id === this.userInfo.id) >= 0;
            this.ideaInfo.comments.forEach(el => {
                // if (!el.content) el.content = "Co noi dung nay";
                if (el.attach_id_list) {
                    // thực hiện truy vấn lấy danh sách file đính kèm - tên file, kiểu file, id để hiển thị ra
                    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-attach-files?id_list=' + JSON.stringify(el.attach_id_list), true)
                        .then(list => {
                        if (list && Array.isArray(list.images)) {
                            el.images = list.images;
                            el.images.forEach(file => file.src = this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-file-id?id=" + file.id);
                        }
                        if (list && Array.isArray(list.files)) {
                            el.attachs = list.files;
                        }
                    })
                        .catch(err => {
                        console.log('Lỗi lấy file: ', err);
                    });
                }
            });
        }
    }
    // Gửi nội dung comment đi
    onClickSend() {
        if (this.message || this.uploadingFiles.length > 0) {
            this.apiCommons.showLoader('Đang xử lý dữ liệu trên máy chủ....');
            let form_data = new FormData();
            form_data.append("id", this.ideaInfo.idea.id);
            form_data.append("content", this.message ? this.message : this.uploadingFiles.length + ' files');
            let i = 0;
            for (let file of this.uploadingFiles) {
                form_data.append('file_' + i++, file, file.filename);
            }
            this.apiAuth.postDynamicFormData(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/comment-idea', form_data, true)
                .then(idea => {
                this.apiCommons.hideLoader();
                this.ideaInfo = idea; // lấy lại nội dung này
                this.refreshUserAction();
            })
                .catch(err => {
                this.apiCommons.hideLoader();
                // console.log('Lỗi: ', err);
            });
            this.message = '';
            this.uploadingFiles = [];
        }
    }
    // Bấm vào nút more 
    onClickMore(ev) {
        // kiểm tra quyền của userInfo mà hiển thị menu khác nhau
        // nếu user không thuộc ý tưởng, thì có quyền đánh giá và khảo sát mức độ của ý tưởng này
        // menu đánh giá (cho điểm ý tưởng này - mỗi người chỉ được đánh giá cho điểm --)
        // hiển thị các tiêu chí để đánh giá .... khảo sát như là biên bản khảo sát đánh giá cho điểm vậy
        // nếu là ý tưởng thuộc user thì cho phép sửa nội dung
        // nếu user có quyền role như sau
        /**
         *
          1	User thường	User -- hiển thị mỗi một menu đánh giá
          
          --- hiển thị menu đánh giá -- ý tưởng này - cho điểm theo từng tiêu chí
          2	Chủ tịch hội đồng KHCN	Chủ tịch hội đồng KHCN
          3	Thành viên Hội đồng KHCN	Thành viên Hội đồng KHCN
    
          -- hiển thị tất cả các menu
          98	Admin	Quản trị hệ thống -- hiển thị hết menu
          99	Developper	Người phát triển -- hiển thị hết menu
    
          -- xem kết quả đánh giá khảo sát ý tưởng này ....
    
    
         */
        let settingsMenu = [];
        // menu đầy đủ
        // trường hợp nào thì sẽ xóa bỏ menu tương ứng
        const allMenu = [
            //  chỉ cho admin 98,99 và user_id của ý tưởng trùng với nó
            // Cho tất cả mọi người trừ userInfo==idea
            {
                id: 1,
                name: "Đánh giá ý tưởng này",
                value: "MARK",
                icon: {
                    name: "microphone",
                    color: "warning"
                }
            },
            {
                id: 2,
                name: "Sửa ý tưởng này",
                value: "EDIT",
                icon: {
                    name: "create",
                    color: "primary"
                }
            },
            // chỉ cho admin 98,99, và user_id của ý tưởng trùng với nó
            {
                id: 3,
                name: "Chuyển trạng thái",
                value: "CHANGE",
                icon: {
                    name: "hourglass",
                    color: "primary"
                }
            },
            // chỉ cho admin 98,99 soát và merge
            {
                id: 4,
                name: "Ghép với ...",
                value: "MERGE",
                icon: {
                    name: "git-merge",
                    color: "primary"
                }
            },
            // chỉ cho admin 98,99 soát và merge
            {
                id: 5,
                name: "Chưa phù hợp",
                value: "TRASH",
                icon: {
                    name: "trash",
                    color: "danger"
                }
            }
        ];
        // console.log(this.ideaInfo.idea, this.userInfo);
        if (this.userInfo && this.ideaInfo && this.ideaInfo.idea) {
            if (this.ideaInfo.idea.user_id === this.userInfo.id) {
                settingsMenu = allMenu.filter(x => x.id === 2 || x.id === 3);
            }
            else {
                settingsMenu = allMenu.filter(x => x.id === 1);
            }
            if (this.userInfo.role === 98) {
                settingsMenu = settingsMenu.concat(allMenu.filter(x => x.id !== 1 && x.id !== 2 && x.id !== 3));
            }
            else if (this.userInfo.role === 99) {
                settingsMenu = allMenu;
            }
            else if (this.userInfo.role === 2
                ||
                    this.userInfo.role === 3) {
            }
            else {
            }
        }
        else {
        }
        this.apiCommons.presentPopover(ev, ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["PopoverCardComponent"], {
            type: 'single-choice',
            title: "Thực thi",
            color: "primary",
            menu: settingsMenu
        })
            .then(data => {
            this.processDetails(data);
        })
            .catch(err => {
            console.log('err: ', err);
        });
    }
    // Thực thi lệnh của end user chọn menu setting
    processDetails(itemOrItems) {
        let cmd = itemOrItems.value;
        // console.log('lenh', cmd);
        if (this.ideaInfo && this.ideaInfo.idea) {
            if (cmd === 'MARK') {
                // kiểm tra user đã đánh giá hay chưa
                // gọi form đánh giá
                this.markIdea(this.ideaInfo.idea);
            }
            if (cmd === 'EDIT') {
                //  sửa ý tưởng này
                this.editIdea(this.ideaInfo.idea);
            }
            if (cmd === 'CHANGE') {
                //  thay đổi trạng thái ý tưởng
                this.changeStatusIdea(this.ideaInfo.idea);
            }
            if (cmd === 'MERGE') {
                //  ghép ý tưởng
                this.mergeIdea(this.ideaInfo.idea);
            }
            if (cmd === 'TRASH') {
                //  loại bỏ ý tưởng này
                this.trashIdea(this.ideaInfo.idea);
            }
        }
    }
    // Người dùng bấm nút like
    // Gửi lên máy chủ lệnh like từ token này
    likeIdea(item) {
        // id và token chứa user like id này
        this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/like-idea', { id: item.id }, true)
            .then(idea => {
            this.ideaInfo = idea; // lấy lại nội dung này
            this.refreshUserAction();
        })
            .catch(err => console.log(err));
    }
    // Sự kiện khi người dùng chọn file lên để upload
    uploadFilesEvent(evt) {
        if (!evt.target || !evt.target.files || !evt.target.files.length)
            return;
        for (let file of evt.target.files) {
            if (file.type.indexOf('image') >= 0) {
                file.isImage = true;
                const fr = new FileReader();
                fr.onloadend = (loadEvent) => {
                    file.image = fr.result;
                };
                fr.readAsDataURL(file);
            }
            if (!this.uploadingFiles.find(x => x.name === file.name))
                this.uploadingFiles.push(file);
        }
    }
    onClickRemoveFile(idx) {
        this.uploadingFiles.splice(idx, 1);
    }
    // Đọc hiển thị file ra
    onClickViewFile(fileId) {
        const browser = this.iab.create(this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-file-id?id=" + fileId, `_system`);
    }
    // Hiển thị ảnh thật
    onClickViewImage(fileId) {
        const browser = this.iab.create(this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-file-id?id=" + fileId, `_system`);
    }
    // chấm điểm ý tưởng này theo các tiêu chí định nghĩa
    markIdea(idea) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // popup cửa sổ này lên và cho phép chỉnh sửa ý tưởng này
            let questions;
            let userMarkIdea;
            try {
                questions = yield this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-questions', true);
                userMarkIdea = yield this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/user-mark-idea?id=' + idea.id, true);
            }
            catch (_a) { }
            // Chuyển json trả về thành dạng mảng chứa phần tử của dynamic form
            let arrayTestDemo = [];
            for (let ques of questions) {
                let oldMarkQues = userMarkIdea.find(x => x.question_id === ques.id);
                let oldMark = oldMarkQues ? oldMarkQues.point : 0;
                let obj = {
                    type: "range-text",
                    key: "question_" + ques.id,
                    name: ques.question,
                    icon: "help",
                    disabled: true,
                    value: oldMark,
                    min: ques.min_point,
                    max: ques.max_point
                };
                arrayTestDemo.push(obj);
            }
            // let categoryOptions = parameters && parameters.ideas_categories ? parameters.ideas_categories : [];
            // Chấm điểm ý tưởng - popup cửa sổ chấm điểm
            let form = {
                title: 'Chấm điểm ý tưởng',
                buttons: [
                    { color: 'danger', icon: 'close', next: 'CLOSE' }
                ],
                items: [
                    { type: 'title', name: idea.title, key: 'id', value: idea.id },
                    ...arrayTestDemo // sử dụng spread operation ở đây để load động các questions đánh giá
                    ,
                    {
                        type: 'button',
                        options: [
                            {
                                name: 'Gửi đánh giá' // button name
                                ,
                                next: 'CALLBACK' // callback get resulte or json
                                ,
                                id: idea.id,
                                url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/mark-idea',
                                token: true // token login before interceptor or token string
                                ,
                                command: 'MARK' // extra parameter for callback process
                            }
                        ]
                    }
                ]
            };
            // call popup window for form login
            this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["DynamicFormMobilePage"], {
                parent: this,
                callback: this.callbackProcess,
                form: form // form dynamic 
            });
        });
    }
    // sửa lại ý tưởng này
    editIdea(idea) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // popup cửa sổ này lên và cho phép chỉnh sửa ý tưởng này
            let parameters;
            try {
                parameters = yield this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true);
            }
            catch (_a) { }
            let categoryOptions = parameters && parameters.ideas_categories ? parameters.ideas_categories : [];
            let statusOptions = parameters && parameters.ideas_statuses ? parameters.ideas_statuses : [];
            // Chấm điểm ý tưởng - popup cửa sổ chấm điểm
            let form = {
                title: 'Sửa ý tưởng',
                buttons: [
                    { color: 'danger', icon: 'close', next: 'CLOSE' }
                ],
                items: [
                    // Danh sách các trường nhập liệu
                    { type: "hidden", key: "id", value: idea.id },
                    { type: "text", key: "title", value: idea.title, name: "Chủ đề là gì? ", hint: "Nhập chủ đề của ý tưởng này từ 5-200 ký tự", input_type: "text", icon: "md-help", validators: [{ required: true, min: 5, max: 200 }] },
                    { type: "text_area", key: "description", value: idea.description, name: "Mô tả nội dung ý tưởng của bạn từ 50 đến 1000 từ", hint: "Nhập mô tả ý tưởng của bạn", input_type: "text", icon: "md-information-circle", validators: [{ required: true, min: 10 }] },
                    { type: "select", key: "category_id", value: "" + idea.category_id, name: "Phân loại ý tưởng?", icon: "contrast", options: categoryOptions, color: "warning" },
                    { type: "select", key: "status", value: "" + idea.status, name: "Trạng thái của ý tưởng?", icon: "clock", options: statusOptions, color: "secondary" },
                    {
                        type: 'button',
                        options: [
                            {
                                name: 'Gửi sửa ý tưởng' // button name
                                ,
                                id: idea.id // trả lại id của ý tưởng này
                                ,
                                next: 'CALLBACK' // callback get resulte or json
                                ,
                                url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/edit-idea', type: "FORM-DATA", token: true,
                                command: 'EDIT' // extra parameter for callback process
                            }
                        ]
                    }
                ]
            };
            // call popup window for form login
            this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["DynamicFormMobilePage"], {
                parent: this,
                callback: this.callbackProcess,
                form: form // form dynamic 
            });
        });
    }
    // Chuyển trạng thái của ý tưởng
    changeStatusIdea(idea) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let parameters;
            try {
                parameters = yield this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true);
            }
            catch (_a) { }
            let statusOptions = parameters && parameters.ideas_statuses ? parameters.ideas_statuses : [];
            let form = {
                title: 'Thay đổi trạng thái',
                buttons: [
                    { color: 'danger', icon: 'close', next: 'CLOSE' }
                ],
                items: [
                    // Danh sách các trường nhập liệu
                    { type: "hidden", key: "id", value: idea.id },
                    { type: "select", key: "status", value: "" + idea.status, name: "Trạng thái của ý tưởng?", icon: "clock", options: statusOptions, color: "warning" },
                    {
                        type: 'button',
                        options: [
                            {
                                name: 'Chuyển trạng thái ý tưởng này' // button name
                                ,
                                id: idea.id // trả lại id của ý tưởng này
                                ,
                                next: 'CALLBACK' // callback get resulte or json
                                ,
                                url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/edit-idea', type: "FORM-DATA", token: true,
                                command: 'EDIT' // extra parameter for callback process
                            }
                        ]
                    }
                ]
            };
            // call popup window for form login
            this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["DynamicFormMobilePage"], {
                parent: this,
                callback: this.callbackProcess,
                form: form // form dynamic 
            });
        });
    }
    // Ghép ý tưởng
    mergeIdea(idea) {
    }
    // loại bỏ ý tưởng này
    trashIdea(idea) {
        let form = {
            title: 'Dừng ý tưởng',
            buttons: [
                { color: 'danger', icon: 'close', next: 'CLOSE' }
            ],
            items: [
                // Danh sách các trường nhập liệu
                { type: "hidden", key: "id", value: idea.id },
                { type: "select", key: "status", value: "0", name: "Trạng thái của ý tưởng?", icon: "clock", options: [{ value: "0", name: "Triển khai sau" }], color: "secondary" },
                {
                    type: 'button',
                    options: [
                        {
                            name: 'Dừng ý tưởng này' // button name
                            ,
                            id: idea.id // trả lại id của ý tưởng này
                            ,
                            next: 'CALLBACK' // callback get resulte or json
                            ,
                            url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/edit-idea', type: "FORM-DATA", token: true,
                            command: 'EDIT' // extra parameter for callback process
                        }
                    ]
                }
            ]
        };
        // call popup window for form login
        this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["DynamicFormMobilePage"], {
            parent: this,
            callback: this.callbackProcess,
            form: form // form dynamic 
        });
    }
};
IdeaDetailPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["CommonsService"] },
    { type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
    { type: src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__["MainService"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__["InAppBrowser"] }
];
IdeaDetailPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-idea-detail',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./idea-detail.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/idea-entry/idea-detail/idea-detail.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./idea-detail.page.scss */ "./src/app/idea-entry/idea-detail/idea-detail.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["CommonsService"],
        ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
        src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__["MainService"],
        _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__["InAppBrowser"]])
], IdeaDetailPage);



/***/ })

}]);
//# sourceMappingURL=idea-entry-idea-detail-idea-detail-module-es2015.js.map