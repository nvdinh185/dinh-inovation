(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["idea-entry-idea-idea-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/idea-entry/idea/idea.page.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/idea-entry/idea/idea.page.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n\n    <ion-title>{{(formIdea?.title?formIdea.title:'')}}</ion-title>\n\n    <ion-buttons slot=\"end\" *ngIf=\"userInfo\" >\n      <ion-button shape=\"round\" (click)=\"onClickLogin()\">\n        <ion-icon slot=\"start\" name=\"{{userInfo?'contact':'log-in'}}\"></ion-icon>\n        {{userInfo?.username}}\n      </ion-button>\n    </ion-buttons>\n\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <ion-fab *ngIf=\"!isCardNewShow\" horizontal=\"start\" vertical=\"top\" slot=\"fixed\">\n    <ion-fab-button color=\"warning\" (click)=\"onClickAddNew()\">\n      <ion-icon name=\"add\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n\n  <ion-fab *ngIf=\"!isCardNewShow\" horizontal=\"end\" vertical=\"top\" slot=\"fixed\" edge>\n    <ion-fab-button color=\"secondary\">\n      <ion-icon name=\"md-share\"></ion-icon>\n    </ion-fab-button>\n    <ion-fab-list>\n      <ion-fab-button color=\"warning\" (click)=\"onClickChatbot()\">\n        <ion-icon name=\"ios-chatbubbles\"></ion-icon>\n      </ion-fab-button>\n      <ion-fab-button color=\"primary\">\n        <ion-icon name=\"logo-facebook\"></ion-icon>\n      </ion-fab-button>\n    </ion-fab-list>\n  </ion-fab>\n\n  <ion-card class=\"card-add-new\" *ngIf=\"isCardNewShow\" >\n    <card-dynamic-form [dynamicFormInput]=\"dynamicFormInput\" [dynamicFormValue]=\"dynamicFormValue\"\n      [dynamicCallback]=\"dynamicCallback\" (onSelectedFinish)=\"onSelectedFinish($event)\"></card-dynamic-form>\n  </ion-card>\n\n  <!-- Phần bộ công cụ kéo xuống đọc dữ liệu -->\n  <ion-refresher slot=\"fixed\" (ionRefresh)=\"doRefresh($event)\" pullFactor=\"0.8\" pullMin=\"60\" pullMax=\"120\">\n    <ion-refresher-content pullingIcon=\"arrow-dropdown\" pullingText=\"Kéo xuống để làm mới\" refreshingSpinner=\"bubbles\"\n      refreshingText=\"Đang tải...\">\n    </ion-refresher-content>\n  </ion-refresher>\n\n  <!-- Hiển thị danh sách các ý tưởng ra trên trang này sắp xếp thành các card theo các màu sắc ý tưởng khác nhau -->\n  <ion-grid fixed *ngIf=\"!isCardNewShow\">\n    <ion-row>\n      <ion-col *ngFor=\"let it of formIdea?.ideas; let idx=index;\" size=\"12\" size-sm=\"6\" size-md=\"4\" size-lg=\"4\"\n        size-xl=\"3\">\n        <app-idea-card [cardData]=\"it\" (onClickSub)=\"onClickIdeaCard($event)\"></app-idea-card>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>");

/***/ }),

/***/ "./src/app/idea-entry/idea/idea-routing.module.ts":
/*!********************************************************!*\
  !*** ./src/app/idea-entry/idea/idea-routing.module.ts ***!
  \********************************************************/
/*! exports provided: IdeaPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaPageRoutingModule", function() { return IdeaPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _idea_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./idea.page */ "./src/app/idea-entry/idea/idea.page.ts");




const routes = [
    {
        path: '',
        component: _idea_page__WEBPACK_IMPORTED_MODULE_3__["IdeaPage"]
    }
];
let IdeaPageRoutingModule = class IdeaPageRoutingModule {
};
IdeaPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], IdeaPageRoutingModule);



/***/ }),

/***/ "./src/app/idea-entry/idea/idea.module.ts":
/*!************************************************!*\
  !*** ./src/app/idea-entry/idea/idea.module.ts ***!
  \************************************************/
/*! exports provided: IdeaPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaPageModule", function() { return IdeaPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _idea_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./idea-routing.module */ "./src/app/idea-entry/idea/idea-routing.module.ts");
/* harmony import */ var _idea_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./idea.page */ "./src/app/idea-entry/idea/idea.page.ts");
/* harmony import */ var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngxi4-dynamic-service */ "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");
/* harmony import */ var src_app_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared.module */ "./src/app/shared.module.ts");









let IdeaPageModule = class IdeaPageModule {
};
IdeaPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_7__["Ngxi4DynamicServiceModule"],
            src_app_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
            _idea_routing_module__WEBPACK_IMPORTED_MODULE_5__["IdeaPageRoutingModule"]
        ],
        declarations: [
            _idea_page__WEBPACK_IMPORTED_MODULE_6__["IdeaPage"]
        ]
    })
], IdeaPageModule);



/***/ }),

/***/ "./src/app/idea-entry/idea/idea.page.scss":
/*!************************************************!*\
  !*** ./src/app/idea-entry/idea/idea.page.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".card-add-new {\n  margin: 10px;\n  border-radius: 2em;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jdW9uZ2RxL0lPTklDL20taW5vdmF0aW9uL2NsaWVudC9zcmMvYXBwL2lkZWEtZW50cnkvaWRlYS9pZGVhLnBhZ2Uuc2NzcyIsInNyYy9hcHAvaWRlYS1lbnRyeS9pZGVhL2lkZWEucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtFQUNBLGtCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9pZGVhLWVudHJ5L2lkZWEvaWRlYS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2FyZC1hZGQtbmV3IHtcbiAgICBtYXJnaW46IDEwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMmVtO1xufSIsIi5jYXJkLWFkZC1uZXcge1xuICBtYXJnaW46IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDJlbTtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/idea-entry/idea/idea.page.ts":
/*!**********************************************!*\
  !*** ./src/app/idea-entry/idea/idea.page.ts ***!
  \**********************************************/
/*! exports provided: IdeaPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaPage", function() { return IdeaPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngxi4-dynamic-service */ "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");
/* harmony import */ var src_app_services_main_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/main.service */ "./src/app/services/main.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");






let IdeaPage = class IdeaPage {
    constructor(router, apiAuth, mainService, modalController) {
        this.router = router;
        this.apiAuth = apiAuth;
        this.mainService = mainService;
        this.modalController = modalController;
        this.formIdea = {
            title: 'Phòng ý tưởng',
            ideas: []
        };
        this.isCardNewShow = false;
    }
    ngOnInit() {
        this.init();
        this.refresh();
    }
    init() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // lấy thông tin user đang login có chưa?
            this.userInfo = this.mainService.getUserInfo();
            try {
                this.parameters = yield this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true);
            }
            catch (_a) { }
            let categoryOptions = this.parameters && this.parameters.ideas_categories ? this.parameters.ideas_categories : [];
            let statusOptions = this.parameters && this.parameters.ideas_statuses ? this.parameters.ideas_statuses : [];
            // form nhập liệu này
            this.dynamicFormInput = JSON.stringify({
                okButton: { icon: "save", name: "Ý tưởng mới của bạn là gì?", color: "secondary", next: "CALLBACK", command: "ADD", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/create-idea', type: "FORM-DATA", token: true },
                cancelButton: { icon: "close", next: "CLOSE" },
                items: [
                    // Danh sách các trường nhập liệu
                    { type: "text", key: "title", name: "Chủ đề là gì? ", hint: "Nhập chủ đề của ý tưởng này từ 5-200 ký tự (letters)", input_type: "text", icon: "md-help", validators: [{ required: true, min: 5, max: 200 }] },
                    { type: "text_area", key: "description", name: "Mô tả nội dung ý tưởng của bạn từ 50 đến 1000 từ (words)", hint: "Nhập mô tả ý tưởng của bạn", input_type: "text", icon: "md-information-circle", validators: [{ required: true, min: 10 }] },
                    { type: "select", key: "category_id", name: "Phân loại ý tưởng?", icon: "contrast", options: categoryOptions, color: "warning" },
                    { type: "select", key: "status", name: "Trạng thái của ý tưởng?", icon: "clock", options: statusOptions, color: "secondary" },
                    { type: "upload-files", name: "Files đính kèm",
                        multiple: "multiple",
                        accept: `image/gif, image/jpeg, image/png
                                        , application/pdf
                                        , .txt, .md, .zip, .tar
                                        , .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel
                                        , application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document` }
                ]
            });
            // giá trị mặc định
            this.dynamicFormValue = JSON.stringify({
                title: '',
                description: '',
                category_id: '' + (categoryOptions.find(x => x.is_default === 1) ? categoryOptions.find(x => x.is_default === 1).id : 2),
                status: '' + (statusOptions.find(x => x.is_default === 1) ? statusOptions.find(x => x.is_default === 1).id : 2)
            });
            this.dynamicCallback = this.dynamicCallbackCard;
        });
    }
    refresh() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // lấy danh sách ý tưởng từ csdl mới nhất
            try {
                this.formIdea.ideas = yield this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-ideas', true);
                if (Array.isArray(this.formIdea.ideas)) {
                    this.formIdea.ideas.forEach(el => {
                        if (el.voted_users && el.voted_users.find(x => x === this.userInfo.id))
                            el.isUserVoted = true;
                        if (el.commented_users && el.commented_users.find(x => x === this.userInfo.id))
                            el.isUserCommented = true;
                    });
                }
            }
            catch (_a) { }
            // Đã có danh sách ý tưởng mới lấy được từ csdl rồi
        });
    }
    onClickChatbot() {
        this.router.navigate(['/chat-bot']);
    }
    // Hàm gọi trang login
    onClickLogin() {
        this.router.navigate(['/login']);
    }
    // hàm gọi lại xử lý ajax khi người dùng thay chọn lựa ở card nhập nội dung
    dynamicCallbackCard(ajaxItem) {
        return new Promise(resolve => {
            // console.log(ajaxItem);
            /* let ajaxReturn = {
              key: 'name',
              property_name: 'value',
              new_data: 'Tên mới thay đổi từ ajax'
            }
            // or
            // ajaxReturns = [{...ajaxReturn}]
            resolve(ajaxReturn); */
            resolve({});
        });
    }
    // hàm trả kết quả của form nhập mới ý tưởng
    onSelectedFinish(evt) {
        // this.formIdea.ideas = evt && evt.response_data ? evt.response_data : this.formIdea.ideas;
        this.refresh(); // làm mới ý tưởng mới
        this.isCardNewShow = false;
    }
    // thêm mới ý tưởng
    onClickAddNew() {
        this.isCardNewShow = true;
    }
    // Đọc lại các ý tưởng mới
    doRefresh(evt) {
        setTimeout(() => {
            this.refresh(); // làm mới ý tưởng mới
            evt.target.complete();
        }, 1000);
    }
    // sự kiện bấm ở card ý tưởng
    // có mấy tình huống sinh ra bằng command
    onClickIdeaCard(evt) {
        if (evt) {
            if (evt.command === 'VIEW') {
                this.viewIdea(evt.idea);
            }
            if (evt.command === 'LIKE') {
                this.likeIdea(evt.idea);
            }
            if (evt.command === 'COMMENT') {
                this.commentIdea(evt.idea);
            }
        }
    }
    // Hiển thị item ý tưởng đó cho mọi người thông tin để biết
    viewIdea(item) {
        // mở ra một component để hiển thị thông tin ý tưởng, các chức năng như comment, like, share, edit, ... nằm ở component này
        // Chuyển tham số kiểu queryParams --> { queryParams: { page: pageNum } }
        this.router.navigate(['/idea-detail'], { queryParams: { id: item.id } });
    }
    // Người dùng bấm nút like
    // Gửi lên máy chủ lệnh like từ token này
    likeIdea(item) {
        // id và token chứa user like id này
        this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/like-idea', { id: item.id }, true)
            .then(newIdea => {
            // console.log(newIdea);
            this.refresh(); // làm mới ý tưởng mới
        })
            .catch(err => console.log(err));
    }
    // người dùng bấm nút comment
    commentIdea(item) {
        this.router.navigate(['/idea-detail'], { queryParams: { id: item.id } });
    }
    openModal(componentPage, navParams) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const myModal = yield this.modalController.create({
                component: componentPage,
                componentProps: navParams,
                cssClass: 'cng-custom-modal-css'
            });
            return yield myModal.present();
        });
    }
};
IdeaPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
    { type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
    { type: src_app_services_main_service__WEBPACK_IMPORTED_MODULE_3__["MainService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"] }
];
IdeaPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-idea',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./idea.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/idea-entry/idea/idea.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./idea.page.scss */ "./src/app/idea-entry/idea/idea.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"],
        ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
        src_app_services_main_service__WEBPACK_IMPORTED_MODULE_3__["MainService"],
        _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["ModalController"]])
], IdeaPage);



/***/ })

}]);
//# sourceMappingURL=idea-entry-idea-idea-module-es2015.js.map