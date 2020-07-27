(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main-entry-home-home-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/home/home.page.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/home/home.page.html ***!
  \**************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar color=\"primary\">\r\n\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n    </ion-buttons>\r\n\r\n    <ion-title>\r\n      {{homeForm.title}}\r\n    </ion-title>\r\n\r\n    <ion-buttons slot=\"end\">\r\n      <ion-button shape=\"round\" (click)=\"onClickLogin()\">\r\n        <ion-icon slot=\"start\" name=\"{{userInfo?'contact':'log-in'}}\"></ion-icon>\r\n        {{userInfo?.username}}\r\n      </ion-button>\r\n    </ion-buttons>\r\n\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n  <ion-grid>\r\n    <ion-row>\r\n\r\n      <ion-col *ngIf=\"homeForm.card\" size=\"12\" size-sm=\"12\" size-md=\"12\" size-lg=\"6\" size-xl=\"6\">\r\n        <ion-card class=\"welcome-card\">\r\n\r\n          <div *ngIf=\"homeForm.card.image\" class=\"welcome-card-image-height\"\r\n            [style.background-image]=\"'url('+homeForm.card.image+')'\"></div>\r\n          <ion-card-header>\r\n            <ion-card-subtitle *ngIf=\"homeForm.card.subtitle\">{{homeForm.card.subtitle}}</ion-card-subtitle>\r\n            <ion-card-title *ngIf=\"homeForm.card.title\">{{homeForm.card.title}}</ion-card-title>\r\n          </ion-card-header>\r\n          <ion-card-content *ngIf=\"homeForm.card.content\">\r\n            <div slot=\"start\" [innerHTML]=\"homeForm.card.content\"></div>\r\n          </ion-card-content>\r\n        </ion-card>\r\n      </ion-col>\r\n      <ion-col *ngIf=\"homeForm.list\" size=\"12\" size-sm=\"12\" size-md=\"12\" size-lg=\"6\" size-xl=\"6\">\r\n        <ion-list lines=\"none\">\r\n          <ion-list-header>\r\n            <ion-label>{{homeForm.list.title}}</ion-label>\r\n          </ion-list-header>\r\n          <ion-item *ngFor=\"let item of homeForm.list.items\" href=\"{{item.url}}\">\r\n            <ion-icon slot=\"{{(item.icon.slot?item.icon.slot:'start')}}\"\r\n              color=\"{{(item.icon.color?item.icon.color:'medium')}}\"\r\n              name=\"{{(item.icon.name?item.icon.name:item.icon?item?.icon:'book')}}\"></ion-icon>\r\n            <ion-label>{{item.title}}</ion-label>\r\n          </ion-item>\r\n\r\n        </ion-list>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-grid>\r\n</ion-content>");

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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home.page */ "./src/app/main-entry/home/home.page.ts");






let HomePageModule = class HomePageModule {
};
HomePageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild([
                {
                    path: '',
                    component: _home_page__WEBPACK_IMPORTED_MODULE_5__["HomePage"]
                }
            ])
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_5__["HomePage"]]
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
/* harmony default export */ __webpack_exports__["default"] = (".welcome-card img {\n  max-height: 35vh;\n  overflow: hidden;\n}\n\n.welcome-card .welcome-card-image-height {\n  min-height: 35vh;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: cover;\n}\n\n.btn-actions-pane-right {\n  margin-left: auto;\n  white-space: nowrap;\n  padding: 0.75rem 0 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFpbi1lbnRyeS9ob21lL0Q6XFxESU5ITlZcXE15RGF0YVxcTEFQVFJJTkhcXE5PREU0XFxub2RlNC1pbm92YXRpb25cXGNsaWVudC9zcmNcXGFwcFxcbWFpbi1lbnRyeVxcaG9tZVxcaG9tZS5wYWdlLnNjc3MiLCJzcmMvYXBwL21haW4tZW50cnkvaG9tZS9ob21lLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBRTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7QUNDSjs7QURFRTtFQUNFLGdCQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQ0FBQTtFQUNBLHNCQUFBO0FDQ0o7O0FERUU7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL21haW4tZW50cnkvaG9tZS9ob21lLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiAgLndlbGNvbWUtY2FyZCBpbWcge1xyXG4gICAgbWF4LWhlaWdodDogMzV2aDtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgfVxyXG4gIFxyXG4gIC53ZWxjb21lLWNhcmQgLndlbGNvbWUtY2FyZC1pbWFnZS1oZWlnaHQge1xyXG4gICAgbWluLWhlaWdodDogMzV2aDtcclxuICAgIGJhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtcclxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG4gIH1cclxuXHJcbiAgLmJ0bi1hY3Rpb25zLXBhbmUtcmlnaHQge1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgcGFkZGluZzogMC43NXJlbSAwIDA7XHJcbiAgfVxyXG4iLCIud2VsY29tZS1jYXJkIGltZyB7XG4gIG1heC1oZWlnaHQ6IDM1dmg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi53ZWxjb21lLWNhcmQgLndlbGNvbWUtY2FyZC1pbWFnZS1oZWlnaHQge1xuICBtaW4taGVpZ2h0OiAzNXZoO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuXG4uYnRuLWFjdGlvbnMtcGFuZS1yaWdodCB7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBwYWRkaW5nOiAwLjc1cmVtIDAgMDtcbn0iXX0= */");

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
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var src_app_services_main_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/main.service */ "./src/app/services/main.service.ts");




let HomePage = class HomePage {
    constructor(router, mainService) {
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
    // Đợi 1s để xác nhận đăng nhập (nếu có)
    // để lấy userInfo
    ngOnInit() {
        setTimeout(() => {
            this.userInfo = this.mainService.getUserInfo();
        }, 1000);
    }
    // gọi đến trang login
    onClickLogin() {
        this.router.navigate(['/login']);
    }
};
HomePage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
    { type: src_app_services_main_service__WEBPACK_IMPORTED_MODULE_3__["MainService"] }
];
HomePage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-home',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./home.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/home/home.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./home.page.scss */ "./src/app/main-entry/home/home.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        src_app_services_main_service__WEBPACK_IMPORTED_MODULE_3__["MainService"]])
], HomePage);



/***/ })

}]);
//# sourceMappingURL=main-entry-home-home-module-es2015.js.map