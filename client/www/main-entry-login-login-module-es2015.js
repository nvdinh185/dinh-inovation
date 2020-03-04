(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main-entry-login-login-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/login/login.page.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/login/login.page.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\n  <ion-toolbar color=\"primary\">\n\n    <ion-buttons slot=\"start\">\n      <ion-menu-button></ion-menu-button>\n    </ion-buttons>\n\n    <ion-title>{{(formLogin?.title?formLogin.title:'LOGIN')}}</ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content class=\"background-none background-image\">\n\n  <!-- Các dữ liệu form nhập liệu động, gồm các form nhập liệu và nút xử lý -->\n  <ion-list class=\"background-transparent\" *ngFor=\"let it of formLogin.items\">\n\n    <!-- QrCode generator Phải là text hoặc dạng base64 hoặc hex với độ dài giới hạn, nếu lớn quá sẽ lỗi-->\n    <ion-grid *ngIf=\"it?.type == 'qrcode' && it?.value?.length<=2000 \">\n      <ion-row>\n        <ion-col style=\"text-align: center;\" size=\"12\">\n          <ion-card>\n            <ngx-qrcode [qrc-value]=\"it.value\"></ngx-qrcode>\n          </ion-card>\n        </ion-col>\n        <ion-col *ngIf=\"it.is_show_value\" style=\"text-align: center;\" size=\"12\">\n          {{ it.value }}\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n    <!-- BarCode generator là dạng số và chữ số  -->\n    <ion-grid *ngIf=\"it?.type == 'barcode' && it?.value?.length<=100 \">\n      <ion-row>\n        <ion-col style=\"text-align: center;\" size=\"12\">\n          <ion-card>\n            <ngx-barcode [bc-value]=\"it.value\" [bc-display-value]=\"true\"></ngx-barcode>\n            <!-- <ion-card-content *ngIf=\"it.is_show_value\">\n\t\t\t\t\t\t<div>{{ it.value }}</div>\n\t\t\t\t\t  </ion-card-content> -->\n          </ion-card>\n        </ion-col>\n        <ion-col *ngIf=\"it.is_show_value\" style=\"text-align: center;\">\n          {{ it.value }}\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n\n    <!-- Thêm card ảnh theo base64 cắt hình backgroud card-->\n    <ion-card *ngIf=\"it?.type == 'image-viewer'\" class='form-welcome-card card-background-image'>\n\n      <!-- Ảnh hiển thị mẫu của card -->\n      <ion-card-header *ngIf=\"it.name\">\n        <ion-card-subtitle *ngIf=\"it.hint\">{{it.hint}}</ion-card-subtitle>\n        <ion-card-title>{{it.name}}</ion-card-title>\n      </ion-card-header>\n\n      <!-- Hiển thị ảnh đủ dung lượng độ rộng \n\t\t\t\thoặc độ cao tối thiểu\n\t\t\t\tCách này sử dụng hiển thị toàn bộ ảnh thật,\n\t\t\t\tnhưng sẽ tràn màn hình, hoặc bé tý\n\t\t\t\tẢnh to sẽ bị méo rất xấu\n\t\t\t-->\n      <img *ngIf=\"it.value\" [src]=\"it.value\">\n\n      <!-- Hiển thị ảnh dưới độ rộng, độ cao, \n\t\t\t\tcho trước bằng style tối đa \n\t\t\t\tCách này dùng làm ảnh nền cho một card nào đó, mà nó sẽ không bị méo hình\n\t\t\t\tẢnh to sẽ không bị méo nhưng ảnh nhỏ sẽ bị nằm lọt bên trong\n\t\t\t-->\n      <!-- <div *ngIf=\"it.value\" class=\"card-image-height\" [style.background-image]=\"'url('+it.value+')'\"></div> -->\n\n      <!-- nút load file ảnh nằm ở góc trái màn hình, cho phép gọi trình openfile -->\n      <!-- <div class='card-button' tappable>\n        <input class=\"file-over\" type=\"file\" (change)=\"imageUploadEvent($event, it)\"\n          accept=\"image/gif, image/jpeg, image/png\" />\n        <ion-icon slot=\"icon-only\" name=\"camera\" color=\"medium\"></ion-icon>\n      </div> -->\n\n    </ion-card>\n\n    <!-- Thêm thẻ ảnh thumnail -->\n    <ion-item *ngIf=\"it?.type == 'image'\" class=\"background-round\">\n      <ion-thumbnail tappable slot=\"start\" (click)=\"showImage(it)\">\n        <ion-img [src]=\"it.value\"></ion-img>\n      </ion-thumbnail>\n      <ion-label>{{it.name}}</ion-label>\n      <ion-buttons slot=\"end\">\n        <ion-button color='danger' shape=\"round\" fill=\"outline\" (click)=\"openCamera(it)\">\n          <ion-icon slot=\"icon-only\" name=\"videocam\"></ion-icon>\n        </ion-button>\n        <ion-button color='secondary' shape=\"round\" fill=\"outline\">\n          <input tappable class=\"file-over\" type=\"file\" (change)=\"imageUploadEvent($event, it)\"\n            accept=\"image/gif, image/jpeg, image/png\" />\n          <ion-icon slot=\"icon-only\" name=\"camera\"></ion-icon>\n        </ion-button>\n        <ion-button color='primary' shape=\"round\" fill=\"outline\" (click)=\"cropImage(it)\">\n          <ion-icon slot=\"icon-only\" name=\"crop\"></ion-icon>\n        </ion-button>\n      </ion-buttons>\n    </ion-item>\n    <ion-card *ngIf=\"it?.type == 'image' && it.visible\" class='form-welcome-card card-background-image'>\n      <img *ngIf=\"it.value\" [src]=\"it.value\">\n    </ion-card>\n\n    <!-- title with avatar -->\n    <ion-item class=\"background-none\" *ngIf=\"it?.type == 'avatar'\">\n      <ion-avatar slot=\"start\" *ngIf=\"it.url\"><img [src]=\"it.url\"></ion-avatar>\n      <ion-title slot=\"start\" class=\"form-title-item\" color=\"{{it.color}}\">{{it.name}}</ion-title>\n    </ion-item>\n\n    <!-- title -->\n    <ion-item class=\"background-none\" *ngIf=\"it?.type == 'title'\">\n      <ion-label class=\"form-title-item\" color=\"{{it.color}}\">{{it.name}}</ion-label>\n    </ion-item>\n\n    <!-- form chi tiet -->\n    <ion-list class=\"background-round\" *ngIf=\"it?.type == 'details'\">\n      <ion-item *ngFor=\"let dt of it.details\">\n        <strong slot=\"start\">\n          {{dt.name}}\n        </strong>\n        <ion-label class=\"ion-text-wrap\" color=\"{{it.color}}\" *ngIf=\"dt.pipe_date\">\n          {{dt.value | date:dt.pipe_date}}\n        </ion-label>\n        <ion-label class=\"ion-text-wrap\" color=\"{{it.color}}\" *ngIf=\"!dt.pipe_date\">\n          {{dt.value}}\n        </ion-label>\n      </ion-item>\n    </ion-list>\n\n\n    <!-- input text inline=default null/fixed/floating/stacked-->\n    <ion-item *ngIf=\"it?.type == 'text'\" class=\"background-none background-round form-input-item\">\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\n      <ion-label position=\"stacked\" class=\"ion-text-wrap\" color=\"{{(it.invalid?'danger':'')}}\"\n        style=\"text-align: justify;\">\n        {{it.invalid?it.hint:it.name}}{{it.validators?'(*)':''}}</ion-label>\n      <ion-input type=\"{{it.input_type}}\" placeholder=\"{{it.hint}}\" [(ngModel)]=\"it.value\" [disabled]=\"it.disabled\">\n      </ion-input>\n    </ion-item>\n\n    <!-- Thêm captcha hình ảnh kiểu svg text file -->\n    <ion-item *ngIf=\"it?.type == 'svg'\" class=\"background-none background-round form-input-item\">\n      <!-- thêm OTP bằng hình ảnh -->\n      <div slot=\"start\" [innerHTML]=\"it.svg\"></div>\n      <ion-label position=\"stacked\" class=\"ion-text-wrap\" color=\"{{(it.invalid?'danger':'')}}\"\n        style=\"text-align: justify;\">\n        {{it.invalid?it.hint:it.name}}{{it.validators?'(*)':''}}</ion-label>\n      <ion-input type=\"text\" placeholder=\"{{it.hint}}\" [(ngModel)]=\"it.value\"></ion-input>\n    </ion-item>\n\n    <!-- input text-area -->\n    <ion-item *ngIf=\"it?.type == 'text_area'\" class=\"background-none background-round form-input-item\">\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\n      <ion-label *ngIf=\"it.invalid\" position=\"floating\" color=\"danger\" class=\"ion-text-wrap\"\n        style=\"text-align: justify;\">\n        {{it.hint}}(*)\n      </ion-label>\n      <ion-textarea rows=\"6\" cols=\"20\" placeholder={{it.name?it.name:it.hint}} [(ngModel)]=\"it.value\">\n      </ion-textarea>\n    </ion-item>\n\n    <!-- check box -->\n    <ion-item *ngIf=\"it?.type === 'check'\" class=\"background-none background-round form-input-item\">\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\n      <ion-label class=\"ion-text-wrap\" style=\"text-align: justify;\">{{it.name?it.name:it.hint}}</ion-label>\n      <ion-checkbox [(ngModel)]=\"it.value\"></ion-checkbox>\n    </ion-item>\n\n    <!-- radio select -->\n    <ion-list *ngIf=\"it?.type === 'radio'\" class=\"background-none background-round form-input-item\">\n      <ion-radio-group allow-empty-selection=\"true\" name=\"radio-group\" [(ngModel)]=\"it.value\">\n\n        <ion-list-header>\n          <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"primary\" name=\"{{it.icon}}\"></ion-icon>\n          <ion-label color=\"primary\" class=\"ion-text-wrap\" style=\"text-align: justify;\">{{it.name}}\n          </ion-label>\n        </ion-list-header>\n\n        <ion-item *ngFor=\"let myRad of it.options\">\n          <ion-label color=\"secondary\" class=\"ion-text-wrap\" style=\"text-align: justify;\">{{myRad.name}}\n          </ion-label>\n          <ion-radio slot=\"start\" color=\"secondary\" value=\"{{myRad.value}}\"></ion-radio>\n        </ion-item>\n\n      </ion-radio-group>\n    </ion-list>\n\n    <!-- multiple select -->\n    <ion-item *ngIf=\"it?.type === 'select_multiple'\" class=\"background-none background-round form-input-item\">\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\n      <ion-label color=\"{{it.color?it.color:'primary'}}\" class=\"ion-text-wrap\" style=\"text-align: justify;\">\n        {{it.name?it.name:it.hint}}\n      </ion-label>\n      <ion-select [(ngModel)]=\"it.value\" multiple=\"true\"\n        style=\"background-color: rgb(0, 190, 73); color:whitesmoke; border-radius: 1em;\">\n        <ion-select-option *ngFor=\"let mySet of it.options\" value=\"{{mySet.value}}\">{{mySet.name}}\n        </ion-select-option>\n      </ion-select>\n    </ion-item>\n\n    <!-- toggle check -->\n    <ion-item *ngIf=\"it?.type === 'toggle'\" class=\"background-none background-round form-input-item\">\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\n      <ion-label color=\"primary\" class=\"ion-text-wrap\" style=\"text-align: justify;\">{{it.name?it.name:it.hint}}\n      </ion-label>\n      <ion-toggle color=\"{{it.color}}\" [(ngModel)]=\"it.value\"></ion-toggle>\n    </ion-item>\n\n    <!-- range adjust -->\n    <ion-item *ngIf=\"it?.type === 'range'\" class=\"background-none background-round form-input-item\">\n      <ion-label *ngIf=\"it.name\" color=\"{{it.color?it.color:'primary'}}\" class=\"ion-text-wrap\"\n        style=\"text-align: justify;\">\n        {{it.name}}\n      </ion-label>\n      <ion-range min=\"{{it.min}}\" max=\"{{it.max}}\" pin=\"true\" snaps=\"true\" color=\"{{it.color?it.color:'primary'}}\"\n        [(ngModel)]=\"it.value\">\n        <ion-icon *ngIf=\"it.icon\" size=\"small\" slot=\"start\" name=\"{{it.icon}}\"></ion-icon>\n        <ion-icon *ngIf=\"it.icon\" slot=\"end\" name=\"{{it.icon}}\"></ion-icon>\n      </ion-range>\n    </ion-item>\n\n    <!-- rang title with value -->\n    <ion-item *ngIf=\"it?.type === 'range-text'\" class=\"background-none background-round form-input-item\">\n      <ion-range min=\"{{it.min}}\" max=\"{{it.max}}\" snaps=\"{{it.snaps}}\" color=\"{{(it.color?it.color:'secondary')}}\"\n        [(ngModel)]=\"it.value\">\n        <ion-label slot=\"start\" color=\"primary\" [style.font-size]=\"(it.size?it.size:'1.5em')\">{{it.name}}</ion-label>\n        <ion-input slot=\"end\" type=\"text\" [(ngModel)]=\"it.value\" [disabled]=\"it.disabled\" maxlength=\"5\"\n          style=\"border-radius: 0.5em; background-color: rgb(40, 112, 219); color:whitesmoke; padding: 3px; align-self: center; min-width: 40px; max-width: 60px;\">\n        </ion-input>\n      </ion-range>\n    </ion-item>\n\n    <!-- date time-->\n    <ion-item *ngIf=\"it?.type === 'datetime'\" class=\"background-none background-round form-input-item\">\n      <ion-label *ngIf=\"it.invalid\" color=\"danger\">{{it.hint}}(*)</ion-label>\n      <ion-label *ngIf=\"!it.invalid\">{{it.name}}</ion-label>\n      <ion-datetime displayFormat=\"{{it.display}}\" placeholder=\"{{it.hint}}\" pickerFormat=\"{{it.picker}}\"\n        [(ngModel)]=\"it.value\"></ion-datetime>\n    </ion-item>\n\n    <!-- button action -->\n    <ion-grid class=\"ion-no-padding\" *ngIf=\"it?.type == 'button'\">\n      <ion-row>\n        <ion-col *ngFor=\"let myBtn of it.options\" style=\"text-align: center;\">\n          <ion-button class=\"form-button-item\" color=\"{{it.color?it.color:''}}\" shape=\"round\" (click)=\"onClick(myBtn)\">\n            <ion-icon *ngIf=\"it.icon\" name=\"{{it.icon}}\"></ion-icon>\n            {{myBtn?.name}}\n          </ion-button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n  </ion-list>\n\n</ion-content>");

/***/ }),

/***/ "./src/app/main-entry/login/login-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/main-entry/login/login-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: LoginPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageRoutingModule", function() { return LoginPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.page */ "./src/app/main-entry/login/login.page.ts");




const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]
    }
];
let LoginPageRoutingModule = class LoginPageRoutingModule {
};
LoginPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], LoginPageRoutingModule);



/***/ }),

/***/ "./src/app/main-entry/login/login.module.ts":
/*!**************************************************!*\
  !*** ./src/app/main-entry/login/login.module.ts ***!
  \**************************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login-routing.module */ "./src/app/main-entry/login/login-routing.module.ts");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "./src/app/main-entry/login/login.page.ts");
/* harmony import */ var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngxi4-dynamic-service */ "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");








let LoginPageModule = class LoginPageModule {
};
LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_7__["Ngxi4DynamicServiceModule"],
            _login_routing_module__WEBPACK_IMPORTED_MODULE_5__["LoginPageRoutingModule"]
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
    })
], LoginPageModule);



/***/ }),

/***/ "./src/app/main-entry/login/login.page.scss":
/*!**************************************************!*\
  !*** ./src/app/main-entry/login/login.page.scss ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("@charset \"UTF-8\";\n.background-none {\n  --background:none;\n}\n.background-transparent {\n  background: transparent;\n}\n/* .background-color {\n\tbackground-color: #2d96de;   //thiết lập màu cho nền\n} */\n.background-image {\n  background-image: url(\"/assets/imgs/gradient.png\");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n.background-round {\n  margin: 3px;\n  border-radius: 1.5em;\n}\n.background-links {\n  margin: 1px;\n  border-radius: 0.5em;\n}\n.form-input-item {\n  background-color: #fefefe;\n  color: #081875;\n  opacity: 0.95;\n  font-size: 1em;\n}\n.form-button-item {\n  border: solid 0.1em;\n  border-radius: 1.5em;\n}\n.form-title-item {\n  color: white;\n  text-align: center;\n  font-size: 1.4em;\n}\n.file-over {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n}\n.form-welcome-card {\n  margin: 1px;\n  background-color: #fefefe;\n  color: #081875;\n  border-radius: 0.5em;\n}\n.form-welcome-card img {\n  overflow: hidden;\n}\n.card-background-image {\n  position: relative;\n  text-align: right;\n  padding: 5px;\n  min-height: 100px;\n}\n.card-background-image .card-button {\n  position: absolute;\n  top: 3%;\n  left: 5%;\n  font-size: 50px;\n}\n.card-background-image .card-image-height {\n  min-height: 35vh;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: cover;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFpbi1lbnRyeS9sb2dpbi9sb2dpbi5wYWdlLnNjc3MiLCIvVXNlcnMvY3VvbmdkcS9JT05JQy9tLWlub3ZhdGlvbi9jbGllbnQvc3JjL2FwcC9tYWluLWVudHJ5L2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUNFZjtFQUNDLGlCQUFBO0FEQUY7QUNHQztFQUNDLHVCQUFBO0FEQUY7QUNHQzs7R0FBQTtBQUlBO0VBQ0Msa0RBQUE7RUFDQSwyQkFBQTtFQUNBLDRCQUFBO0VBQ0Esc0JBQUE7QURERjtBQ0lDO0VBQ0MsV0FBQTtFQUNBLG9CQUFBO0FEREY7QUNLQztFQUNDLFdBQUE7RUFDQSxvQkFBQTtBREZGO0FDTUM7RUFDQyx5QkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtBREhGO0FDTUM7RUFDQyxtQkFBQTtFQUNBLG9CQUFBO0FESEY7QUNPQztFQUNDLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FESkY7QUNRQztFQUNDLGtCQUFBO0VBQ00sTUFBQTtFQUNBLE9BQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtBRExSO0FDU0M7RUFDQyxXQUFBO0VBQ0EseUJBQUE7RUFDQSxjQUFBO0VBRUEsb0JBQUE7QURQRjtBQ1lDO0VBS0MsZ0JBQUE7QURiRjtBQ2lCQztFQUNDLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxZQUFBO0VBR0EsaUJBQUE7QURoQkY7QUNtQkM7RUFDQyxrQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtBRGhCRjtBQzRCQztFQUNDLGdCQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQ0FBQTtFQUNBLHNCQUFBO0FEekJGIiwiZmlsZSI6InNyYy9hcHAvbWFpbi1lbnRyeS9sb2dpbi9sb2dpbi5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG4uYmFja2dyb3VuZC1ub25lIHtcbiAgLS1iYWNrZ3JvdW5kOm5vbmU7XG59XG5cbi5iYWNrZ3JvdW5kLXRyYW5zcGFyZW50IHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG59XG5cbi8qIC5iYWNrZ3JvdW5kLWNvbG9yIHtcblx0YmFja2dyb3VuZC1jb2xvcjogIzJkOTZkZTsgICAvL3RoaeG6v3QgbOG6rXAgbcOgdSBjaG8gbuG7gW5cbn0gKi9cbi5iYWNrZ3JvdW5kLWltYWdlIHtcbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiL2Fzc2V0cy9pbWdzL2dyYWRpZW50LnBuZ1wiKTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufVxuXG4uYmFja2dyb3VuZC1yb3VuZCB7XG4gIG1hcmdpbjogM3B4O1xuICBib3JkZXItcmFkaXVzOiAxLjVlbTtcbn1cblxuLmJhY2tncm91bmQtbGlua3Mge1xuICBtYXJnaW46IDFweDtcbiAgYm9yZGVyLXJhZGl1czogMC41ZW07XG59XG5cbi5mb3JtLWlucHV0LWl0ZW0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO1xuICBjb2xvcjogIzA4MTg3NTtcbiAgb3BhY2l0eTogMC45NTtcbiAgZm9udC1zaXplOiAxZW07XG59XG5cbi5mb3JtLWJ1dHRvbi1pdGVtIHtcbiAgYm9yZGVyOiBzb2xpZCAwLjFlbTtcbiAgYm9yZGVyLXJhZGl1czogMS41ZW07XG59XG5cbi5mb3JtLXRpdGxlLWl0ZW0ge1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxLjRlbTtcbn1cblxuLmZpbGUtb3ZlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiAyO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvcGFjaXR5OiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5mb3JtLXdlbGNvbWUtY2FyZCB7XG4gIG1hcmdpbjogMXB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlO1xuICBjb2xvcjogIzA4MTg3NTtcbiAgYm9yZGVyLXJhZGl1czogMC41ZW07XG59XG5cbi5mb3JtLXdlbGNvbWUtY2FyZCBpbWcge1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4uY2FyZC1iYWNrZ3JvdW5kLWltYWdlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0ZXh0LWFsaWduOiByaWdodDtcbiAgcGFkZGluZzogNXB4O1xuICBtaW4taGVpZ2h0OiAxMDBweDtcbn1cblxuLmNhcmQtYmFja2dyb3VuZC1pbWFnZSAuY2FyZC1idXR0b24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMyU7XG4gIGxlZnQ6IDUlO1xuICBmb250LXNpemU6IDUwcHg7XG59XG5cbi5jYXJkLWJhY2tncm91bmQtaW1hZ2UgLmNhcmQtaW1hZ2UtaGVpZ2h0IHtcbiAgbWluLWhlaWdodDogMzV2aDtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn0iLCIvLzpob3N0IHtcblxuXHQuYmFja2dyb3VuZC1ub25lIHtcblx0XHQtLWJhY2tncm91bmQ6bm9uZTsgICAgICAgICAgICAgLy9raMO0bmcgdGhp4bq/dCBs4bqtcCBiYWNrZ3JvdWRcblx0fVxuXG5cdC5iYWNrZ3JvdW5kLXRyYW5zcGFyZW50IHtcblx0XHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgICAgICAgLy90aGnhur90IGzhuq1wIG7hu4FuIHRyb25nIHN14buRdFxuXHR9XG5cblx0LyogLmJhY2tncm91bmQtY29sb3Ige1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMyZDk2ZGU7ICAgLy90aGnhur90IGzhuq1wIG3DoHUgY2hvIG7hu4FuXG5cdH0gKi9cblxuXHQuYmFja2dyb3VuZC1pbWFnZSB7XG5cdFx0YmFja2dyb3VuZC1pbWFnZTogdXJsKFwiL2Fzc2V0cy9pbWdzL2dyYWRpZW50LnBuZ1wiKTtcblx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG5cdFx0YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcblx0XHRiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuXHR9XG5cblx0LmJhY2tncm91bmQtcm91bmQge1xuXHRcdG1hcmdpbjogM3B4O1xuXHRcdGJvcmRlci1yYWRpdXM6IDEuNWVtO1xuXHR9XG5cdFxuXHRcblx0LmJhY2tncm91bmQtbGlua3Mge1xuXHRcdG1hcmdpbjogMXB4O1xuXHRcdGJvcmRlci1yYWRpdXM6IDAuNWVtO1xuXHR9XG5cblx0XG5cdC5mb3JtLWlucHV0LWl0ZW0ge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7ICAgLy90aGnhur90IGzhuq1wIG3DoHUgY2hvIG7hu4FuXG5cdFx0Y29sb3I6ICMwODE4NzU7ICAgXHRcdFx0IC8vdGhp4bq/dCBs4bqtcCBtw6B1IGNobyBjaOG7r1xuXHRcdG9wYWNpdHk6IDAuOTU7XHRcdFx0XHRcdCAgIC8vbMOgbSBt4budIGNoxakgdsOgIG7hu4FuIMSRaSBt4buZdCBsxrDhu6NuZyBu4bq/dSBj4bqnbiBsw6AgPDEgdsOgID4wXG5cdFx0Zm9udC1zaXplOiAxZW07XG5cdH1cblxuXHQuZm9ybS1idXR0b24taXRlbSB7XG5cdFx0Ym9yZGVyOiBzb2xpZCAwLjFlbTtcblx0XHRib3JkZXItcmFkaXVzOiAxLjVlbTtcblx0fVxuXG5cblx0LmZvcm0tdGl0bGUtaXRlbSB7XG5cdFx0Y29sb3I6IHdoaXRlO1xuXHRcdHRleHQtYWxpZ246IGNlbnRlcjtcblx0XHRmb250LXNpemU6IDEuNGVtO1xuXHR9XG5cblx0Ly8gdGhp4bq/dCBs4bqtcCBjaG8g4bqpbiBuw7p0IGZpbGUgdXBsb2FkXG5cdC5maWxlLW92ZXIge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiAwO1xuICAgICAgICBsZWZ0OiAwO1xuICAgICAgICB6LWluZGV4OiAyO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICBvcGFjaXR5OiAwO1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG5cdH1cblx0XG5cdC8vIGNhcmQgdGjhu4MgaGnhu4duIOG7nyB3ZWxjb21lXG5cdC5mb3JtLXdlbGNvbWUtY2FyZCB7XG5cdFx0bWFyZ2luOiAxcHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTsgICAvL3RoaeG6v3QgbOG6rXAgbcOgdSBjaG8gbuG7gW5cblx0XHRjb2xvcjogIzA4MTg3NTsgICBcdFx0XHQgLy90aGnhur90IGzhuq1wIG3DoHUgY2hvIGNo4buvXG5cdFx0XG5cdFx0Ym9yZGVyLXJhZGl1czogMC41ZW07XG5cdH1cblx0XG5cdFxuXHQvLyBjaOG6vyDEkeG7mSBuw6B5IHPhu60gZOG7pW5nIMSRxrBhIOG6o25oIGljb24gdGhlbyBu4buZaSBkdW5nXG5cdC5mb3JtLXdlbGNvbWUtY2FyZCBpbWcge1xuXHRcdC8vIGdp4bubaSBo4bqhbiDhuqNuaCBjaOG7iSBs4bubbiBuaOG6pXQgY8OzIMSR4buZIGNhbyBsw6AgY2jhu6tuZyBuw6B5XG5cdFx0Ly8ga2hpIOG6o25oIG5o4buPIHRow6wgbsOzIHPhur0gaGnhu4NuIHRo4buLIG5o4buPXG5cdFx0Ly8ga2h1bmcg4bqjbmggY8WpbmcgY28gbOG6oWkgbmjhu48gdGhlb1xuXHRcdC8vIG1heC1oZWlnaHQ6IDI1MHB4OyAvLyBi4buPIGPDoWkgbsOgeSB0aMOsIMSRxrDhu6NjXG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0fVxuXG5cdC8vIHRoaeG6v3QgbOG6rXAg4bqpbiBuw7p0IGzhu4duaCB0csOqbiBraHVuZyBow6xuaFxuXHQuY2FyZC1iYWNrZ3JvdW5kLWltYWdlIHtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0dGV4dC1hbGlnbjogcmlnaHQ7XG5cdFx0cGFkZGluZzogNXB4O1xuXHRcdC8vIG3hu58g4bqjbmggbeG7mXQga2h1bmcgdOG7kWkgdGhp4buDdSBsw6AgMjAwcHggYmFuIMSR4bqndVxuXHRcdC8vIMSR4buDIGhp4buDbiB0aOG7iyBjYW1lcmEgbG9hZCDhuqNuaCBsw6puXG5cdFx0bWluLWhlaWdodDogMTAwcHg7IFxuXHR9XG5cblx0LmNhcmQtYmFja2dyb3VuZC1pbWFnZSAuY2FyZC1idXR0b24ge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHR0b3A6IDMlO1xuXHRcdGxlZnQ6IDUlO1xuXHRcdGZvbnQtc2l6ZTogNTBweDtcblx0fVxuXG5cdC8vIEdp4bubaSBo4bqhbiDEkeG7mSBjYW8gY+G7p2Eg4bqjbmggXG5cdC8vIGPhu5EgxJHhu4tuaCBt4buZdCDEkeG7mSBjYW8gY+G7p2Eg4bqjbmgsIOG6o25oIGPDsyB0byBoYXkgbmjhu49cblx0Ly8gdGjDrCBjaOG7iSBoaeG7g24gdGjhu4sgdHJvbmcga2h1IGjDrG5oIG7DoHkgdGjDtGlcblx0Ly8gbsOzIHPhur0gxJHhu5NuZyBjaOG7iW5oIHRydW5nIHTDom0gY+G7p2Eg4bqjbmggXG5cdC8vIGTDuW5nIGPDoWNoIG7DoHkgxJHhu4MgaGnhu4NuIHRo4buLIGPhu5EgxJHhu4tuaCDEkeG7mSBjYW8gY+G7p2EgY2FyZFxuXG5cdC8vIEtoaSDhuqNuaCBuaOG7jyB0aMOsIOG6o25oIG7hurFtIGzhu410IHRo4buPbiB0cm9uZyBraHVuZ1xuXHQvLyB2w6AgbuG7gW4gdHLhu5FuZyB0aOG7q2EgdHLDtG5nIHLhuqV0IHjhuqV1LFxuXHQvLyBuaMawbmcg4bqjbmggbOG7m24gc+G6vSBraMO0bmcgYuG7iyBtw6lvLCBtw6Agc+G6vSBsw6BtIG7hu4FuIHLhuqV0IMSR4bq5cFxuXHQuY2FyZC1iYWNrZ3JvdW5kLWltYWdlIC5jYXJkLWltYWdlLWhlaWdodCB7XG5cdFx0bWluLWhlaWdodDogMzV2aDtcblx0XHRiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7XG5cdFx0YmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcblx0XHRiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuXHR9XG5cblx0XG5cdFxuLy99XG4iXX0= */");

/***/ }),

/***/ "./src/app/main-entry/login/login.page.ts":
/*!************************************************!*\
  !*** ./src/app/main-entry/login/login.page.ts ***!
  \************************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngxi4-dynamic-service */ "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");
/* harmony import */ var _services_main_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/main.service */ "./src/app/services/main.service.ts");




let LoginPage = class LoginPage {
    constructor(apiCommons, apiAuth, mainService, apiImage) {
        this.apiCommons = apiCommons;
        this.apiAuth = apiAuth;
        this.mainService = mainService;
        this.apiImage = apiImage;
        this.formLogin = {
            title: `Login`
        };
        /**
         * Hàm gọi lại cho form popup
         */
        this.callbackLogin = function (res) {
            // allway return Promise for callback
            return new Promise((resolve, reject) => {
                if (res.error) {
                    // console.log('res', res.error.message , res.message,'Error:<br>' + (res.error.message!=undefined ? res.error.message : res.message ? res.message : ("Error Unknow: " + JSON.stringify(res.error, null, 2))))
                    this.apiCommons.presentAlert('Error:<br>' + (res.error.message != undefined ? res.error.message : res.message ? res.message : ("Error Unknow: " + JSON.stringify(res.error, null, 2))));
                }
                else if (res.response_data) {
                    if (res.button.command === "LOGIN") {
                        this.checkRight(res.response_data);
                    }
                    if (res.button.command === "CREATE-USER") {
                        this.saveToken(res.button.token, res.response_data.data);
                    }
                    if (res.button.command === "EDIT-USER") {
                        this.userInfo = res.response_data.data;
                        this.mainService.saveUserInfo(this.userInfo);
                        this.showUserInfo();
                    }
                }
                // close form
                resolve({ next: "CLOSE" });
            });
        }.bind(this);
    }
    ngOnInit() {
        this.mainService.getTokenInfo()
            .then(userInfo => {
            if (userInfo) {
                this.userInfo = userInfo;
                this.showUserInfo();
            }
        })
            .catch(err => {
            this.showUserInfo();
            // chưa login thì yêu cầu login thôi
            this.login();
        });
    }
    /**
     * xử lý nút bấm
     * @param btn
     */
    onClick(btn) {
        // lệnh login
        if (btn.command === 'LOGIN') {
            this.login();
        }
        // lệnh logout
        if (btn.command === 'LOGOUT') {
            this.mainService.logout();
            this.userInfo = null;
            this.showUserInfo();
        }
        // sửa thông tin user
        if (btn.command === 'EDIT' && this.userInfo) {
            this.editUser();
        }
    }
    /**
     * xử lý upload ảnh mới
     * @param evt
     */
    imageUploadEvent(evt, item) {
        if (!evt.target) {
            return;
        }
        if (!evt.target.files) {
            return;
        }
        if (evt.target.files.length !== 1) {
            return;
        }
        const file = evt.target.files[0];
        if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif' && file.type !== 'image/jpg') {
            return;
        }
        //gán sự kiện chọn ảnh
        //this.imageChangedEvent = evt;
        //gán sự kiện chọn ảnh crop
        // = evt;
        this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["Ionic4CroppieComponent"], {
            parent: this,
            item: item,
            event: evt,
            options: item.options
        })
            .then(data => {
            item.value = data ? data : item.value;
        });
    }
    /**
     * xử lý cắt ảnh
     * @param item
     */
    cropImage(item) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let imageBase64 = yield this.apiImage.createBase64Image(item.value, 600);
            this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["Ionic4CroppieComponent"], {
                parent: this,
                item: item,
                // nếu giá trị là url thì chuyển thành base64 để crop
                // giảm kích thước xuống còn 600x600 là tối đa nhé
                image: imageBase64,
                options: item.options
            })
                .then(data => {
                item.value = data ? data : item.value;
            });
        });
    }
    /** mở webcam trên máy */
    openCamera(item) {
        this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["CameraCardComponent"], {
            parent: this,
        })
            .then(data => {
            // console.log('ảnh nhận được: ', data ? data.length : undefined);
            item.value = data ? data : item.value;
        });
    }
    /**
     * Hiển thị ảnh thật
     * @param item
     */
    showImage(item) {
        item.visible = !item.visible;
    }
    /**
     * Gọi chức năng login
     */
    login() {
        let form = {
            title: 'Login',
            buttons: [
                { color: 'danger', icon: 'close', next: 'CLOSE' }
            ],
            items: [
                { type: 'title', name: 'Nhập user của email @mobifone.vn' },
                // form login gồm nhập số điện thoại username và pass
                {
                    type: 'text' // input text
                    ,
                    key: 'username' // json_key + value input ==> {username:value}
                    ,
                    value: '' // default value
                    ,
                    name: 'Tên đăng nhập:',
                    hint: 'Sử dụng user của email',
                    input_type: 'userName' // input type as ionic
                    ,
                    icon: 'ios-contact' // icon of ionic list
                    ,
                    validators: [{ required: true, min: 3, max: 30, validators: [{ pattern: "^[a-z0-9._%+-]" }] }]
                },
                { type: "password", key: "password", name: "password", hint: "Mật khẩu phải có chữ hoa, chữ thường, ký tự đặc biệt, số", input_type: "password", icon: "md-key", validators: [{ required: true, min: 3, max: 20 }] },
                {
                    type: 'button',
                    options: [
                        {
                            name: 'Đăng nhập' // button name
                            ,
                            next: 'CALLBACK' // callback get resulte or json
                            ,
                            url: this.apiAuth.serviceUrls.AUTH_SERVER + '/login',
                            token: true // token login before interceptor or token string
                            ,
                            command: 'LOGIN' // extra parameter for callback process
                        }
                    ]
                }
            ]
        };
        // call popup window for form login
        this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["DynamicFormMobilePage"], {
            parent: this,
            callback: this.callbackLogin,
            form: form // form dynamic 
        });
    }
    /**
     * 5. Hiển thị thông tin sau khi đăng nhập thành công
     *  hiển thị dữ liệu cho chính form login này
     */
    showUserInfo() {
        if (this.userInfo)
            this.formLogin = {
                title: "ĐÃ ĐĂNG NHẬP",
                color: 'primary',
                items: [
                    /* {
                      type: 'qrcode',
                      value: token
                    }
                    , */
                    {
                        type: 'barcode',
                        value: this.userInfo.username
                    },
                    {
                        type: "details",
                        details: [
                            {
                                name: "Username(*)",
                                value: this.userInfo.username
                            },
                            {
                                name: "Họ và tên(*)",
                                value: this.userInfo.fullname
                            },
                            {
                                name: "Nickname(*)",
                                value: this.userInfo.nickname
                            },
                            {
                                name: "Địa chỉ(*)",
                                value: this.userInfo.address
                            },
                            {
                                name: "Điện thoại(*)",
                                value: this.userInfo.phone
                            },
                            {
                                name: "Email(*)",
                                value: this.userInfo.email
                            }
                        ]
                    },
                    { id: "avatar", type: "image-viewer", name: "ẢNH ĐẠI DIỆN", value: this.userInfo.avatar ? this.userInfo.avatar : "assets/imgs/avatar.jpg" },
                    { id: "background", type: "image-viewer", name: "ẢNH NỀN", value: this.userInfo.background ? this.userInfo.background : "assets/imgs/background-idea.jpg" },
                    {
                        type: "button",
                        options: [
                            { name: "Sửa (*)", command: "EDIT" },
                            { name: "Logout", command: "LOGOUT" }
                        ]
                    }
                ]
            };
        else
            this.formLogin = {
                title: "LOGIN",
                color: 'primary',
                items: [
                    {
                        type: "button",
                        options: [
                            { name: "Đăng nhập", command: "LOGIN" }
                        ]
                    }
                ]
            };
    }
    /**
     * Lưu trữ token và userInfo
     * @param token
     * @param userInfo
     */
    saveToken(token, userInfo) {
        // console.log(token, userInfo);
        this.userInfo = userInfo;
        this.mainService.saveToken(token, userInfo);
        this.showUserInfo();
    }
    /**
     * Sửa thông tin cá nhân
     */
    editUser() {
        let form = {
            title: "SỬA THÔNG TIN CÁ NHÂN",
            buttons: [
                { color: 'danger', icon: 'close', next: 'CLOSE' }
            ],
            items: [
                { name: "Cập nhập các thông tin sau", type: "title" },
                { key: "nickname", value: this.userInfo.nickname, name: "Biệt danh", hint: "Nickname", type: "text", input_type: "text", icon: "heart", validators: [{ required: true, min: 1 }] },
                { key: "fullname", value: this.userInfo.fullname, name: "Họ và tên", hint: "Họ và tên đầy đủ", type: "text", input_type: "text", icon: "person", validators: [{ required: true, min: 5 }] },
                { key: "address", value: this.userInfo.address, name: "Địa chỉ", hint: "Địa chỉ đầy đủ", type: "text", input_type: "text", icon: "pin", validators: [{ required: true, min: 5 }] },
                { key: "phone", value: this.userInfo.phone, name: "Điện thoại liên hệ", hint: "Yêu cầu định dạng số điện thoại nhé", type: "text", input_type: "tel", icon: "call", validators: [{ pattern: "^[0-9]*$" }] },
                { key: "email", value: this.userInfo.email, name: "email", hint: "Yêu cầu định dạng email nhé", type: "text", input_type: "email", icon: "mail", validators: [{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }] },
                { key: "avatar", type: "image", name: "ẢNH ĐẠI DIỆN", value: this.userInfo.avatar ? this.userInfo.avatar : "assets/imgs/avatar.jpg", options: { ratio: 1 / 1, max_width: 80 } },
                { key: "background", type: "image", name: "ẢNH NỀN", value: this.userInfo.background ? this.userInfo.background : "assets/imgs/background-idea.jpg", options: { ratio: 16 / 9, max_width: 300 } },
                {
                    type: "button",
                    options: [
                        { name: "Bỏ qua", next: "CLOSE" },
                        { name: "Cập nhập", command: "EDIT-USER", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + "/edit-user", token: true, next: "CALLBACK" }
                    ]
                }
            ]
        };
        // call popup window for form login
        this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["DynamicFormMobilePage"], {
            parent: this,
            callback: this.callbackLogin,
            form: form // form dynamic 
        });
    }
    /**
     * Tạo user mới
     * @param token
     */
    createNewUser(username, token) {
        let form = {
            title: "TẠO THÔNG TIN CÁ NHÂN"
            //khong cho nut hom
            ,
            items: [
                { name: "Điền đầy đủ thông tin sau", type: "title" },
                { key: "nickname", name: "Biệt danh", hint: "Nickname", type: "text", input_type: "text", icon: "heart", validators: [{ required: true, min: 1 }] },
                { key: "fullname", name: "Họ và tên", hint: "Họ và tên đầy đủ", type: "text", input_type: "text", icon: "person", validators: [{ required: true, min: 5 }] },
                { key: "address", name: "Địa chỉ", hint: "Địa chỉ đầy đủ", type: "text", input_type: "text", icon: "pin", validators: [{ required: true, min: 5 }] },
                { key: "phone", name: "Điện thoại liên hệ", hint: "Yêu cầu định dạng số điện thoại nhé", type: "text", input_type: "tel", icon: "call", validators: [{ pattern: "^[0-9]*$" }] },
                { key: "email", value: username + "@mobifone.vn", name: "email", hint: "Yêu cầu định dạng email nhé", type: "text", input_type: "email", icon: "mail", validators: [{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }] },
                { key: "avatar", type: "image", name: "ẢNH ĐẠI DIỆN", value: "assets/imgs/avatar.jpg" },
                { key: "background", type: "image", name: "ẢNH NỀN", value: "assets/imgs/background-idea.jpg" },
                {
                    type: "button",
                    options: [
                        { name: "Tạo mới", command: "CREATE-USER", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + "/create-user", token: token, next: "CALLBACK" }
                    ]
                }
            ]
        };
        // call popup window for form login
        this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["DynamicFormMobilePage"], {
            parent: this,
            callback: this.callbackLogin,
            form: form // form dynamic 
        });
    }
    /**
     * Kiểm tra quyền truy cập
     * @param resData
     */
    checkRight(resData) {
        // nếu user chưa có hoặc cần khai báo thông tin cá nhân để đăng nhập
        this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-user-info', resData.token)
            .then(result => {
            // console.log('result: ', result);
            if (result && result.status === 'OK') {
                if (result.data) {
                    // login thanh cong
                    this.apiCommons.showToast('Login thành công', 3000);
                    this.saveToken(resData.token, result.data);
                }
                else {
                    // Chưa có user cần khai báo
                    this.createNewUser(resData.username, resData.token);
                }
            }
        })
            .catch(err => {
            console.log('Lỗi: ', err);
            this.apiCommons.showToast('Lỗi login!', 3000);
        });
    }
};
LoginPage.ctorParameters = () => [
    { type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["CommonsService"] },
    { type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"] },
    { type: _services_main_service__WEBPACK_IMPORTED_MODULE_3__["MainService"] },
    { type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["ImageService"] }
];
LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/login/login.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login.page.scss */ "./src/app/main-entry/login/login.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["CommonsService"],
        ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
        _services_main_service__WEBPACK_IMPORTED_MODULE_3__["MainService"],
        ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["ImageService"]])
], LoginPage);



/***/ })

}]);
//# sourceMappingURL=main-entry-login-login-module-es2015.js.map