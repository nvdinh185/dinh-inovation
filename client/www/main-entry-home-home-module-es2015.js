(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main-entry-home-home-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/home/home.page.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/home/home.page.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n\n    <ion-title>\n      {{homeForm?.title}}\n    </ion-title>\n    \n    <ion-buttons slot=\"end\">\n      <ion-button shape=\"round\" (click)=\"onClickLogin()\">\n        <ion-icon slot=\"start\" name=\"{{userInfo?'contact':'log-in'}}\"></ion-icon>\n        {{userInfo?.username}}\n      </ion-button>\n    </ion-buttons>\n\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n\n  <!-- Nút lệnh phía dưới cùng -->\n  <ion-fab horizontal=\"end\" vertical=\"bottom\" slot=\"fixed\">\n    <ion-fab-button color=\"secondary\" (click)=\"onClickChatbot()\">\n      <ion-icon name=\"chatbubbles\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n\n  <!-- Tổ chức kiểu web thì phân định ra bảng kéo dài ra -->\n  <ion-grid>\n    <ion-row>\n\n      <ion-col *ngIf=\"homeForm?.card\" size=\"12\" size-sm=\"6\" size-md=\"6\" size-lg=\"12\" size-xl=\"12\">\n        <ion-card class=\"welcome-card\">\n\n          <div *ngIf=\"homeForm?.card?.image\" class=\"welcome-card-image-height\"\n            [style.background-image]=\"'url('+homeForm.card.image+')'\"></div>\n          <ion-card-header>\n            <ion-card-subtitle *ngIf=\"homeForm?.card?.subtitle\">{{homeForm?.card?.subtitle}}</ion-card-subtitle>\n            <ion-card-title *ngIf=\"homeForm?.card?.title\">{{homeForm?.card?.title}}</ion-card-title>\n          </ion-card-header>\n          <ion-card-content *ngIf=\"homeForm?.card?.content\">\n            <div slot=\"start\" [innerHTML]=\"homeForm.card.content\"></div>\n            \n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n      <ion-col *ngIf=\"homeForm?.list\" size=\"12\" size-sm=\"6\" size-md=\"6\" size-lg=\"6\" size-xl=\"6\">\n        <ion-list lines=\"none\">\n          <ion-list-header>\n            <ion-label>{{homeForm?.list?.title}}</ion-label>\n          </ion-list-header>\n          <ion-item *ngFor=\"let item of homeForm.list.items; let idx = index\" href=\"{{item.url}}\">\n            <ion-icon slot=\"{{(item?.icon?.slot?item.icon.slot:'start')}}\"\n              color=\"{{(item?.icon?.color?item.icon.color:'medium')}}\"\n              name=\"{{(item?.icon?.name?item.icon.name:item?.icon?item?.icon:'book')}}\"></ion-icon>\n            <ion-label>{{item.title}}</ion-label>\n          </ion-item>\n          \n        </ion-list>\n      </ion-col>\n    </ion-row>\n    <!-- Hieu Add Table Bootstrap -->\n    <!-- TABLE BEGIN ------------------------------------------------------------------------------->\n    <ion-row>\n      <ion-col size-lg=\"12\">\n        <div class=\"main-card mb-3 card\">\n          <div class=\"card-header\">\n            <div class=\"card-header-title font-size-md text-capitalize font-weight-normal\">Hoạt động</div>\n          </div>\n          <div class=\"table-responsive\">\n            <table class=\"align-middle text-truncate mb-0 table table-borderless table-hover\">\n              <thead>\n              <tr>\n                <th class=\"d-none d-lg-table-cell text-center\">#</th>\n                <th class=\"text-center\">Avatar</th>\n                <th class=\"text-center\">Tên</th>\n                <th class=\"d-none d-lg-table-cell text-center\">Ý tưởng</th>\n                <th class=\"d-none d-lg-table-cell text-center\">Vote</th>\n                <th class=\"d-none d-lg-table-cell text-center\">Comment</th>\n                <!-- <th class=\"text-center\">SL YT Đã Cmt</th> -->\n                <th class=\"text-center\">Điểm</th>\n                <th class=\"text-center\">Hạng</th>\n              </tr>\n              </thead>\n              <tbody>\n              <tr *ngFor=\"let user of topUsersActions | slice:0:10; let i = index\">\n                <td class=\"d-none d-lg-table-cell text-center text-muted\" style=\"width: 50px;\">{{i+1}}</td>\n                <td class=\"text-center\" style=\"width: 20px;\">\n                  <img width=\"25\" class=\"rounded-circle\" src=\"{{user?.avatar}}\" alt=\"\">\n                </td>\n                <td class=\"text-center\"><a [routerLink]=\"\">{{user.fullname}}</a></td>\n                <td class=\"d-none d-lg-table-cell text-center\">\n                  <div class=\"badge badge-pill badge-success\">{{user.count_ideas}}</div>\n                <td class=\"d-none d-lg-table-cell text-center\">\n                  <div class=\"badge badge-pill badge-secondary\">{{user.count_voted}}</div>\n                </td>\n                <td class=\"d-none d-lg-table-cell text-center\">\n                  <div class=\"badge badge-pill badge-danger\">{{user.count_commented}}</div>\n                </td>\n                <!-- <td class=\"text-center\">\n                  <div class=\"badge badge-pill badge-warning\">{{user.count_commented_ideas}}</div>\n                </td> -->\n                <td class=\"text-center\">\n                  <div class=\"badge badge-pill badge-warning\">{{user.total_action}}</div>\n                </td>\n                <td *ngIf=\"i === 0\" class=\"text-center\" style=\"width: 30px;\">\n                  <img width=\"25\" class=\"rounded-circle\" src=\"assets/imgs/1st.png\" alt=\"\">\n                </td>\n                <td *ngIf=\"i === 1\" class=\"text-center\" style=\"width: 30px;\">\n                  <img width=\"25\" class=\"rounded-circle\" src=\"assets/imgs/2nd.png\" alt=\"\">\n                </td>\n                <td *ngIf=\"i === 2\" class=\"text-center\" style=\"width: 30px;\">\n                  <img width=\"25\" class=\"rounded-circle\" src=\"assets/imgs/3rd.png\" alt=\"\">\n                </td>\n              </tr>\n              </tbody>\n            </table>\n          </div>\n          <div class=\"d-block p-4 text-center card-footer\">\n            <button class=\"btn-pill btn-shadow btn-wide fsize-1 btn btn-dark btn-md\" routerLink=\"/user-activity\">\n              <span class=\"mr-2 opacity-7\">\n                  <i class=\"fa fa-cog fa-spin\"></i>\n              </span>\n              <span class=\"mr-1\">Xem hoạt động tất cả thành viên</span>\n            </button>\n          </div>\n        </div>\n      </ion-col>\n    </ion-row>\n    <!-- TABLE END ------------------------------------------------------------------------------->\n  </ion-grid>\n</ion-content>");

/***/ }),

/***/ "./src/app/main-entry/home/home.module.ts":
/*!************************************************!*\
  !*** ./src/app/main-entry/home/home.module.ts ***!
  \************************************************/
/*! exports provided: HomePageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home.page */ "./src/app/main-entry/home/home.page.ts");







let HomePageModule = class HomePageModule {
};
HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["RouterModule"].forChild([
                {
                    path: '',
                    component: _home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]
                }
            ])
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_6__["HomePage"]]
    })
], HomePageModule);



/***/ }),

/***/ "./src/app/main-entry/home/home.page.scss":
/*!************************************************!*\
  !*** ./src/app/main-entry/home/home.page.scss ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".welcome-card img {\n  max-height: 35vh;\n  overflow: hidden;\n}\n\n.welcome-card .welcome-card-image-height {\n  min-height: 35vh;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: cover;\n}\n\n.btn-actions-pane-right {\n  margin-left: auto;\n  white-space: nowrap;\n  padding: 0.75rem 0 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9jdW9uZ2RxL0lPTklDL20taW5vdmF0aW9uL2NsaWVudC9zcmMvYXBwL21haW4tZW50cnkvaG9tZS9ob21lLnBhZ2Uuc2NzcyIsInNyYy9hcHAvbWFpbi1lbnRyeS9ob21lL2hvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0UsZ0JBQUE7RUFDQSxnQkFBQTtBQ0FKOztBREdFO0VBQ0UsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGtDQUFBO0VBQ0Esc0JBQUE7QUNBSjs7QURHRTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvbWFpbi1lbnRyeS9ob21lL2hvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIC53ZWxjb21lLWNhcmQgaW1nIHtcbiAgICBtYXgtaGVpZ2h0OiAzNXZoO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cbiAgXG4gIC53ZWxjb21lLWNhcmQgLndlbGNvbWUtY2FyZC1pbWFnZS1oZWlnaHQge1xuICAgIG1pbi1oZWlnaHQ6IDM1dmg7XG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcbiAgfVxuXG4gIC5idG4tYWN0aW9ucy1wYW5lLXJpZ2h0IHtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIHBhZGRpbmc6IDAuNzVyZW0gMCAwO1xuICB9XG4iLCIud2VsY29tZS1jYXJkIGltZyB7XG4gIG1heC1oZWlnaHQ6IDM1dmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi53ZWxjb21lLWNhcmQgLndlbGNvbWUtY2FyZC1pbWFnZS1oZWlnaHQge1xuICBtaW4taGVpZ2h0OiAzNXZoO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuXG4uYnRuLWFjdGlvbnMtcGFuZS1yaWdodCB7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBwYWRkaW5nOiAwLjc1cmVtIDAgMDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/main-entry/home/home.page.ts":
/*!**********************************************!*\
  !*** ./src/app/main-entry/home/home.page.ts ***!
  \**********************************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngxi4-dynamic-service */ "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/main.service */ "./src/app/services/main.service.ts");





let HomePage = class HomePage {
    constructor(apiAuth, router, mainService) {
        this.apiAuth = apiAuth;
        this.router = router;
        this.mainService = mainService;
        this.homeForm = {
            title: 'Văn phòng sáng tạo',
            card: {
                image: 'assets/imgs/background-idea.jpg',
                title: 'Văn phòng sáng tạo cho mọi người',
                subtitle: 'M.INOVATION',
                content: `Chương trình hỗ trợ sáng tạo và quản lý ý tưởng.`
            },
            list: {
                title: 'Tài liệu:',
                items: [
                    {
                        url: 'assets/docs/ManualGuide_v1.1.pdf',
                        title: 'Hướng dẫn sử dụng chương trình',
                        icon: { slot: 'start', color: 'medium', name: 'book' }
                    }
                ]
            }
        };
    }
    // khi trang bắt đầu load
    ngOnInit() {
        this.init();
    }
    // khởi tạo trang chủ ban đầu
    init() {
        setTimeout(() => {
            this.userInfo = this.mainService.getUserInfo();
        }, 1000);
        this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-top-actions")
            .then(data => {
            // console.log('Data: ', data);
            this.topUsersActions = data;
            // console.log(this.topUsersActions);
        })
            .catch(err => {
            // console.log('Lỗi: ', err);
        });
    }
    // gọi đến trang login
    onClickLogin() {
        this.router.navigate(['/login']);
    }
    // Gọi đến trang chat-bot
    onClickChatbot() {
        this.router.navigate(['/chat-bot']);
    }
};
HomePage.ctorParameters = () => [
    { type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
    { type: src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__["MainService"] }
];
HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/home/home.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.page.scss */ "./src/app/main-entry/home/home.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
        src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__["MainService"]])
], HomePage);



/***/ })

}]);
//# sourceMappingURL=main-entry-home-home-module-es2015.js.map