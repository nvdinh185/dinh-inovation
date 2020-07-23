(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main-entry-login-login-module"],{

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/login/login.page.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/login/login.page.html ***!
  \****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar color=\"primary\">\r\n\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n\r\n    <ion-title>{{(formLogin?.title?formLogin.title:'LOGIN')}}</ion-title>\r\n\r\n  </ion-toolbar>\r\n\r\n</ion-header>\r\n\r\n<ion-content class=\"background-none background-image\">\r\n\r\n  <!-- Các dữ liệu form nhập liệu động, gồm các form nhập liệu và nút xử lý -->\r\n  <ion-list class=\"background-transparent\" *ngFor=\"let it of formLogin.items\">\r\n\r\n    <!-- QrCode generator Phải là text hoặc dạng base64 hoặc hex với độ dài giới hạn, nếu lớn quá sẽ lỗi-->\r\n    <ion-grid *ngIf=\"it?.type == 'qrcode' && it?.value?.length<=2000 \">\r\n      <ion-row>\r\n        <ion-col style=\"text-align: center;\" size=\"12\">\r\n          <ion-card>\r\n            <ngx-qrcode [qrc-value]=\"it.value\"></ngx-qrcode>\r\n          </ion-card>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"it.is_show_value\" style=\"text-align: center;\" size=\"12\">\r\n          {{ it.value }}\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n\r\n    <!-- BarCode generator là dạng số và chữ số  -->\r\n    <ion-grid *ngIf=\"it?.type == 'barcode' && it?.value?.length<=100 \">\r\n      <ion-row>\r\n        <ion-col style=\"text-align: center;\" size=\"12\">\r\n          <ion-card>\r\n            <ngx-barcode [bc-value]=\"it.value\" [bc-display-value]=\"true\"></ngx-barcode>\r\n            <!-- <ion-card-content *ngIf=\"it.is_show_value\">\r\n\t\t\t\t\t\t<div>{{ it.value }}</div>\r\n\t\t\t\t\t  </ion-card-content> -->\r\n          </ion-card>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"it.is_show_value\" style=\"text-align: center;\">\r\n          {{ it.value }}\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n\r\n\r\n    <!-- Thêm card ảnh theo base64 cắt hình backgroud card-->\r\n    <ion-card *ngIf=\"it?.type == 'image-viewer'\" class='form-welcome-card card-background-image'>\r\n\r\n      <!-- Ảnh hiển thị mẫu của card -->\r\n      <ion-card-header *ngIf=\"it.name\">\r\n        <ion-card-subtitle *ngIf=\"it.hint\">{{it.hint}}</ion-card-subtitle>\r\n        <ion-card-title>{{it.name}}</ion-card-title>\r\n      </ion-card-header>\r\n\r\n      <!-- Hiển thị ảnh đủ dung lượng độ rộng \r\n\t\t\t\thoặc độ cao tối thiểu\r\n\t\t\t\tCách này sử dụng hiển thị toàn bộ ảnh thật,\r\n\t\t\t\tnhưng sẽ tràn màn hình, hoặc bé tý\r\n\t\t\t\tẢnh to sẽ bị méo rất xấu\r\n\t\t\t-->\r\n      <img *ngIf=\"it.value\" [src]=\"it.value\">\r\n\r\n      <!-- Hiển thị ảnh dưới độ rộng, độ cao, \r\n\t\t\t\tcho trước bằng style tối đa \r\n\t\t\t\tCách này dùng làm ảnh nền cho một card nào đó, mà nó sẽ không bị méo hình\r\n\t\t\t\tẢnh to sẽ không bị méo nhưng ảnh nhỏ sẽ bị nằm lọt bên trong\r\n\t\t\t-->\r\n      <!-- <div *ngIf=\"it.value\" class=\"card-image-height\" [style.background-image]=\"'url('+it.value+')'\"></div> -->\r\n\r\n      <!-- nút load file ảnh nằm ở góc trái màn hình, cho phép gọi trình openfile -->\r\n      <!-- <div class='card-button' tappable>\r\n        <input class=\"file-over\" type=\"file\" (change)=\"imageUploadEvent($event, it)\"\r\n          accept=\"image/gif, image/jpeg, image/png\" />\r\n        <ion-icon slot=\"icon-only\" name=\"camera\" color=\"medium\"></ion-icon>\r\n      </div> -->\r\n\r\n    </ion-card>\r\n\r\n    <!-- Thêm thẻ ảnh thumnail -->\r\n    <ion-item *ngIf=\"it?.type == 'image'\" class=\"background-round\">\r\n      <ion-thumbnail tappable slot=\"start\" (click)=\"showImage(it)\">\r\n        <ion-img [src]=\"it.value\"></ion-img>\r\n      </ion-thumbnail>\r\n      <ion-label>{{it.name}}</ion-label>\r\n      <ion-buttons slot=\"end\">\r\n        <ion-button color='danger' shape=\"round\" fill=\"outline\" (click)=\"openCamera(it)\">\r\n          <ion-icon slot=\"icon-only\" name=\"videocam\"></ion-icon>\r\n        </ion-button>\r\n        <ion-button color='secondary' shape=\"round\" fill=\"outline\">\r\n          <input tappable class=\"file-over\" type=\"file\" (change)=\"imageUploadEvent($event, it)\"\r\n            accept=\"image/gif, image/jpeg, image/png\" />\r\n          <ion-icon slot=\"icon-only\" name=\"camera\"></ion-icon>\r\n        </ion-button>\r\n        <ion-button color='primary' shape=\"round\" fill=\"outline\" (click)=\"cropImage(it)\">\r\n          <ion-icon slot=\"icon-only\" name=\"crop\"></ion-icon>\r\n        </ion-button>\r\n      </ion-buttons>\r\n    </ion-item>\r\n    <ion-card *ngIf=\"it?.type == 'image' && it.visible\" class='form-welcome-card card-background-image'>\r\n      <img *ngIf=\"it.value\" [src]=\"it.value\">\r\n    </ion-card>\r\n\r\n    <!-- title with avatar -->\r\n    <ion-item class=\"background-none\" *ngIf=\"it?.type == 'avatar'\">\r\n      <ion-avatar slot=\"start\" *ngIf=\"it.url\"><img [src]=\"it.url\"></ion-avatar>\r\n      <ion-title slot=\"start\" class=\"form-title-item\" color=\"{{it.color}}\">{{it.name}}</ion-title>\r\n    </ion-item>\r\n\r\n    <!-- title -->\r\n    <ion-item class=\"background-none\" *ngIf=\"it?.type == 'title'\">\r\n      <ion-label class=\"form-title-item\" color=\"{{it.color}}\">{{it.name}}</ion-label>\r\n    </ion-item>\r\n\r\n    <!-- form chi tiet -->\r\n    <ion-list class=\"background-round\" *ngIf=\"it?.type == 'details'\">\r\n      <ion-item *ngFor=\"let dt of it.details\">\r\n        <strong slot=\"start\">\r\n          {{dt.name}}\r\n        </strong>\r\n        <ion-label class=\"ion-text-wrap\" color=\"{{it.color}}\" *ngIf=\"dt.pipe_date\">\r\n          {{dt.value | date:dt.pipe_date}}\r\n        </ion-label>\r\n        <ion-label class=\"ion-text-wrap\" color=\"{{it.color}}\" *ngIf=\"!dt.pipe_date\">\r\n          {{dt.value}}\r\n        </ion-label>\r\n      </ion-item>\r\n    </ion-list>\r\n\r\n\r\n    <!-- input text inline=default null/fixed/floating/stacked-->\r\n    <ion-item *ngIf=\"it?.type == 'text'\" class=\"background-none background-round form-input-item\">\r\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\r\n      <ion-label position=\"stacked\" class=\"ion-text-wrap\" color=\"{{(it.invalid?'danger':'')}}\"\r\n        style=\"text-align: justify;\">\r\n        {{it.invalid?it.hint:it.name}}{{it.validators?'(*)':''}}</ion-label>\r\n      <ion-input type=\"{{it.input_type}}\" placeholder=\"{{it.hint}}\" [(ngModel)]=\"it.value\" [disabled]=\"it.disabled\">\r\n      </ion-input>\r\n    </ion-item>\r\n\r\n    <!-- Thêm captcha hình ảnh kiểu svg text file -->\r\n    <ion-item *ngIf=\"it?.type == 'svg'\" class=\"background-none background-round form-input-item\">\r\n      <!-- thêm OTP bằng hình ảnh -->\r\n      <div slot=\"start\" [innerHTML]=\"it.svg\"></div>\r\n      <ion-label position=\"stacked\" class=\"ion-text-wrap\" color=\"{{(it.invalid?'danger':'')}}\"\r\n        style=\"text-align: justify;\">\r\n        {{it.invalid?it.hint:it.name}}{{it.validators?'(*)':''}}</ion-label>\r\n      <ion-input type=\"text\" placeholder=\"{{it.hint}}\" [(ngModel)]=\"it.value\"></ion-input>\r\n    </ion-item>\r\n\r\n    <!-- input text-area -->\r\n    <ion-item *ngIf=\"it?.type == 'text_area'\" class=\"background-none background-round form-input-item\">\r\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\r\n      <ion-label *ngIf=\"it.invalid\" position=\"floating\" color=\"danger\" class=\"ion-text-wrap\"\r\n        style=\"text-align: justify;\">\r\n        {{it.hint}}(*)\r\n      </ion-label>\r\n      <ion-textarea rows=\"6\" cols=\"20\" placeholder={{it.name?it.name:it.hint}} [(ngModel)]=\"it.value\">\r\n      </ion-textarea>\r\n    </ion-item>\r\n\r\n    <!-- check box -->\r\n    <ion-item *ngIf=\"it?.type === 'check'\" class=\"background-none background-round form-input-item\">\r\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\r\n      <ion-label class=\"ion-text-wrap\" style=\"text-align: justify;\">{{it.name?it.name:it.hint}}</ion-label>\r\n      <ion-checkbox [(ngModel)]=\"it.value\"></ion-checkbox>\r\n    </ion-item>\r\n\r\n    <!-- radio select -->\r\n    <ion-list *ngIf=\"it?.type === 'radio'\" class=\"background-none background-round form-input-item\">\r\n      <ion-radio-group allow-empty-selection=\"true\" name=\"radio-group\" [(ngModel)]=\"it.value\">\r\n\r\n        <ion-list-header>\r\n          <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"primary\" name=\"{{it.icon}}\"></ion-icon>\r\n          <ion-label color=\"primary\" class=\"ion-text-wrap\" style=\"text-align: justify;\">{{it.name}}\r\n          </ion-label>\r\n        </ion-list-header>\r\n\r\n        <ion-item *ngFor=\"let myRad of it.options\">\r\n          <ion-label color=\"secondary\" class=\"ion-text-wrap\" style=\"text-align: justify;\">{{myRad.name}}\r\n          </ion-label>\r\n          <ion-radio slot=\"start\" color=\"secondary\" value=\"{{myRad.value}}\"></ion-radio>\r\n        </ion-item>\r\n\r\n      </ion-radio-group>\r\n    </ion-list>\r\n\r\n    <!-- multiple select -->\r\n    <ion-item *ngIf=\"it?.type === 'select_multiple'\" class=\"background-none background-round form-input-item\">\r\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\r\n      <ion-label color=\"{{it.color?it.color:'primary'}}\" class=\"ion-text-wrap\" style=\"text-align: justify;\">\r\n        {{it.name?it.name:it.hint}}\r\n      </ion-label>\r\n      <ion-select [(ngModel)]=\"it.value\" multiple=\"true\"\r\n        style=\"background-color: rgb(0, 190, 73); color:whitesmoke; border-radius: 1em;\">\r\n        <ion-select-option *ngFor=\"let mySet of it.options\" value=\"{{mySet.value}}\">{{mySet.name}}\r\n        </ion-select-option>\r\n      </ion-select>\r\n    </ion-item>\r\n\r\n    <!-- toggle check -->\r\n    <ion-item *ngIf=\"it?.type === 'toggle'\" class=\"background-none background-round form-input-item\">\r\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\r\n      <ion-label color=\"primary\" class=\"ion-text-wrap\" style=\"text-align: justify;\">{{it.name?it.name:it.hint}}\r\n      </ion-label>\r\n      <ion-toggle color=\"{{it.color}}\" [(ngModel)]=\"it.value\"></ion-toggle>\r\n    </ion-item>\r\n\r\n    <!-- range adjust -->\r\n    <ion-item *ngIf=\"it?.type === 'range'\" class=\"background-none background-round form-input-item\">\r\n      <ion-label *ngIf=\"it.name\" color=\"{{it.color?it.color:'primary'}}\" class=\"ion-text-wrap\"\r\n        style=\"text-align: justify;\">\r\n        {{it.name}}\r\n      </ion-label>\r\n      <ion-range min=\"{{it.min}}\" max=\"{{it.max}}\" pin=\"true\" snaps=\"true\" color=\"{{it.color?it.color:'primary'}}\"\r\n        [(ngModel)]=\"it.value\">\r\n        <ion-icon *ngIf=\"it.icon\" size=\"small\" slot=\"start\" name=\"{{it.icon}}\"></ion-icon>\r\n        <ion-icon *ngIf=\"it.icon\" slot=\"end\" name=\"{{it.icon}}\"></ion-icon>\r\n      </ion-range>\r\n    </ion-item>\r\n\r\n    <!-- rang title with value -->\r\n    <ion-item *ngIf=\"it?.type === 'range-text'\" class=\"background-none background-round form-input-item\">\r\n      <ion-range min=\"{{it.min}}\" max=\"{{it.max}}\" snaps=\"{{it.snaps}}\" color=\"{{(it.color?it.color:'secondary')}}\"\r\n        [(ngModel)]=\"it.value\">\r\n        <ion-label slot=\"start\" color=\"primary\" [style.font-size]=\"(it.size?it.size:'1.5em')\">{{it.name}}</ion-label>\r\n        <ion-input slot=\"end\" type=\"text\" [(ngModel)]=\"it.value\" [disabled]=\"it.disabled\" maxlength=\"5\"\r\n          style=\"border-radius: 0.5em; background-color: rgb(40, 112, 219); color:whitesmoke; padding: 3px; align-self: center; min-width: 40px; max-width: 60px;\">\r\n        </ion-input>\r\n      </ion-range>\r\n    </ion-item>\r\n\r\n    <!-- date time-->\r\n    <ion-item *ngIf=\"it?.type === 'datetime'\" class=\"background-none background-round form-input-item\">\r\n      <ion-label *ngIf=\"it.invalid\" color=\"danger\">{{it.hint}}(*)</ion-label>\r\n      <ion-label *ngIf=\"!it.invalid\">{{it.name}}</ion-label>\r\n      <ion-datetime displayFormat=\"{{it.display}}\" placeholder=\"{{it.hint}}\" pickerFormat=\"{{it.picker}}\"\r\n        [(ngModel)]=\"it.value\"></ion-datetime>\r\n    </ion-item>\r\n\r\n    <!-- button action -->\r\n    <ion-grid class=\"ion-no-padding\" *ngIf=\"it?.type == 'button'\">\r\n      <ion-row>\r\n        <ion-col *ngFor=\"let myBtn of it.options\" style=\"text-align: center;\">\r\n          <ion-button class=\"form-button-item\" color=\"{{it.color?it.color:''}}\" shape=\"round\" (click)=\"onClick(myBtn)\">\r\n            <ion-icon *ngIf=\"it.icon\" name=\"{{it.icon}}\"></ion-icon>\r\n            {{myBtn?.name}}\r\n          </ion-button>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n\r\n  </ion-list>\r\n\r\n</ion-content>");

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
/* harmony default export */ __webpack_exports__["default"] = ("@charset \"UTF-8\";\n.background-none {\n  --background:none;\n}\n.background-transparent {\n  background: transparent;\n}\n/* .background-color {\n\tbackground-color: #2d96de;   //thiết lập màu cho nền\n} */\n.background-image {\n  background-image: url(\"/assets/imgs/gradient.png\");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n.background-round {\n  margin: 3px;\n  border-radius: 1.5em;\n}\n.background-links {\n  margin: 1px;\n  border-radius: 0.5em;\n}\n.form-input-item {\n  background-color: #fefefe;\n  color: #081875;\n  opacity: 0.95;\n  font-size: 1em;\n}\n.form-button-item {\n  border: solid 0.1em;\n  border-radius: 1.5em;\n}\n.form-title-item {\n  color: white;\n  text-align: center;\n  font-size: 1.4em;\n}\n.file-over {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n}\n.form-welcome-card {\n  margin: 1px;\n  background-color: #fefefe;\n  color: #081875;\n  border-radius: 0.5em;\n}\n.form-welcome-card img {\n  overflow: hidden;\n}\n.card-background-image {\n  position: relative;\n  text-align: right;\n  padding: 5px;\n  min-height: 100px;\n}\n.card-background-image .card-button {\n  position: absolute;\n  top: 3%;\n  left: 5%;\n  font-size: 50px;\n}\n.card-background-image .card-image-height {\n  min-height: 35vh;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: cover;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFpbi1lbnRyeS9sb2dpbi9sb2dpbi5wYWdlLnNjc3MiLCJzcmMvYXBwL21haW4tZW50cnkvbG9naW4vRDpcXERJTkhOVlxcTXlEYXRhXFxMQVBUUklOSFxcTk9ERTRcXGRpbmgtaW5vdmF0aW9uXFxjbGllbnQvc3JjXFxhcHBcXG1haW4tZW50cnlcXGxvZ2luXFxsb2dpbi5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FDRWY7RUFDQyxpQkFBQTtBREFGO0FDR0M7RUFDQyx1QkFBQTtBREFGO0FDR0M7O0dBQUE7QUFJQTtFQUNDLGtEQUFBO0VBQ0EsMkJBQUE7RUFDQSw0QkFBQTtFQUNBLHNCQUFBO0FEREY7QUNJQztFQUNDLFdBQUE7RUFDQSxvQkFBQTtBRERGO0FDS0M7RUFDQyxXQUFBO0VBQ0Esb0JBQUE7QURGRjtBQ01DO0VBQ0MseUJBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGNBQUE7QURIRjtBQ01DO0VBQ0MsbUJBQUE7RUFDQSxvQkFBQTtBREhGO0FDT0M7RUFDQyxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBREpGO0FDUUM7RUFDQyxrQkFBQTtFQUNNLE1BQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7QURMUjtBQ1NDO0VBQ0MsV0FBQTtFQUNBLHlCQUFBO0VBQ0EsY0FBQTtFQUVBLG9CQUFBO0FEUEY7QUNZQztFQUtDLGdCQUFBO0FEYkY7QUNpQkM7RUFDQyxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUdBLGlCQUFBO0FEaEJGO0FDbUJDO0VBQ0Msa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7QURoQkY7QUM0QkM7RUFDQyxnQkFBQTtFQUNBLDRCQUFBO0VBQ0Esa0NBQUE7RUFDQSxzQkFBQTtBRHpCRiIsImZpbGUiOiJzcmMvYXBwL21haW4tZW50cnkvbG9naW4vbG9naW4ucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGNoYXJzZXQgXCJVVEYtOFwiO1xuLmJhY2tncm91bmQtbm9uZSB7XG4gIC0tYmFja2dyb3VuZDpub25lO1xufVxuXG4uYmFja2dyb3VuZC10cmFuc3BhcmVudCB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xufVxuXG4vKiAuYmFja2dyb3VuZC1jb2xvciB7XG5cdGJhY2tncm91bmQtY29sb3I6ICMyZDk2ZGU7ICAgLy90aGnhur90IGzhuq1wIG3DoHUgY2hvIG7hu4FuXG59ICovXG4uYmFja2dyb3VuZC1pbWFnZSB7XG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi9hc3NldHMvaW1ncy9ncmFkaWVudC5wbmdcIik7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuLmJhY2tncm91bmQtcm91bmQge1xuICBtYXJnaW46IDNweDtcbiAgYm9yZGVyLXJhZGl1czogMS41ZW07XG59XG5cbi5iYWNrZ3JvdW5kLWxpbmtzIHtcbiAgbWFyZ2luOiAxcHg7XG4gIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xufVxuXG4uZm9ybS1pbnB1dC1pdGVtIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcbiAgY29sb3I6ICMwODE4NzU7XG4gIG9wYWNpdHk6IDAuOTU7XG4gIGZvbnQtc2l6ZTogMWVtO1xufVxuXG4uZm9ybS1idXR0b24taXRlbSB7XG4gIGJvcmRlcjogc29saWQgMC4xZW07XG4gIGJvcmRlci1yYWRpdXM6IDEuNWVtO1xufVxuXG4uZm9ybS10aXRsZS1pdGVtIHtcbiAgY29sb3I6IHdoaXRlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMS40ZW07XG59XG5cbi5maWxlLW92ZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3BhY2l0eTogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uZm9ybS13ZWxjb21lLWNhcmQge1xuICBtYXJnaW46IDFweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcbiAgY29sb3I6ICMwODE4NzU7XG4gIGJvcmRlci1yYWRpdXM6IDAuNWVtO1xufVxuXG4uZm9ybS13ZWxjb21lLWNhcmQgaW1nIHtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmNhcmQtYmFja2dyb3VuZC1pbWFnZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIHBhZGRpbmc6IDVweDtcbiAgbWluLWhlaWdodDogMTAwcHg7XG59XG5cbi5jYXJkLWJhY2tncm91bmQtaW1hZ2UgLmNhcmQtYnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDMlO1xuICBsZWZ0OiA1JTtcbiAgZm9udC1zaXplOiA1MHB4O1xufVxuXG4uY2FyZC1iYWNrZ3JvdW5kLWltYWdlIC5jYXJkLWltYWdlLWhlaWdodCB7XG4gIG1pbi1oZWlnaHQ6IDM1dmg7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59IiwiLy86aG9zdCB7XHJcblxyXG5cdC5iYWNrZ3JvdW5kLW5vbmUge1xyXG5cdFx0LS1iYWNrZ3JvdW5kOm5vbmU7ICAgICAgICAgICAgIC8va2jDtG5nIHRoaeG6v3QgbOG6rXAgYmFja2dyb3VkXHJcblx0fVxyXG5cclxuXHQuYmFja2dyb3VuZC10cmFuc3BhcmVudCB7XHJcblx0XHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgICAgICAgLy90aGnhur90IGzhuq1wIG7hu4FuIHRyb25nIHN14buRdFxyXG5cdH1cclxuXHJcblx0LyogLmJhY2tncm91bmQtY29sb3Ige1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogIzJkOTZkZTsgICAvL3RoaeG6v3QgbOG6rXAgbcOgdSBjaG8gbuG7gW5cclxuXHR9ICovXHJcblxyXG5cdC5iYWNrZ3JvdW5kLWltYWdlIHtcclxuXHRcdGJhY2tncm91bmQtaW1hZ2U6IHVybChcIi9hc3NldHMvaW1ncy9ncmFkaWVudC5wbmdcIik7XHJcblx0XHRiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XHJcblx0XHRiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xyXG5cdFx0YmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuXHR9XHJcblxyXG5cdC5iYWNrZ3JvdW5kLXJvdW5kIHtcclxuXHRcdG1hcmdpbjogM3B4O1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMS41ZW07XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdC5iYWNrZ3JvdW5kLWxpbmtzIHtcclxuXHRcdG1hcmdpbjogMXB4O1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMC41ZW07XHJcblx0fVxyXG5cclxuXHRcclxuXHQuZm9ybS1pbnB1dC1pdGVtIHtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7ICAgLy90aGnhur90IGzhuq1wIG3DoHUgY2hvIG7hu4FuXHJcblx0XHRjb2xvcjogIzA4MTg3NTsgICBcdFx0XHQgLy90aGnhur90IGzhuq1wIG3DoHUgY2hvIGNo4buvXHJcblx0XHRvcGFjaXR5OiAwLjk1O1x0XHRcdFx0XHQgICAvL2zDoG0gbeG7nSBjaMWpIHbDoCBu4buBbiDEkWkgbeG7mXQgbMaw4bujbmcgbuG6v3UgY+G6p24gbMOgIDwxIHbDoCA+MFxyXG5cdFx0Zm9udC1zaXplOiAxZW07XHJcblx0fVxyXG5cclxuXHQuZm9ybS1idXR0b24taXRlbSB7XHJcblx0XHRib3JkZXI6IHNvbGlkIDAuMWVtO1xyXG5cdFx0Ym9yZGVyLXJhZGl1czogMS41ZW07XHJcblx0fVxyXG5cclxuXHJcblx0LmZvcm0tdGl0bGUtaXRlbSB7XHJcblx0XHRjb2xvcjogd2hpdGU7XHJcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblx0XHRmb250LXNpemU6IDEuNGVtO1xyXG5cdH1cclxuXHJcblx0Ly8gdGhp4bq/dCBs4bqtcCBjaG8g4bqpbiBuw7p0IGZpbGUgdXBsb2FkXHJcblx0LmZpbGUtb3ZlciB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICAgICAgdG9wOiAwO1xyXG4gICAgICAgIGxlZnQ6IDA7XHJcbiAgICAgICAgei1pbmRleDogMjtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblx0fVxyXG5cdFxyXG5cdC8vIGNhcmQgdGjhu4MgaGnhu4duIOG7nyB3ZWxjb21lXHJcblx0LmZvcm0td2VsY29tZS1jYXJkIHtcclxuXHRcdG1hcmdpbjogMXB4O1xyXG5cdFx0YmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTsgICAvL3RoaeG6v3QgbOG6rXAgbcOgdSBjaG8gbuG7gW5cclxuXHRcdGNvbG9yOiAjMDgxODc1OyAgIFx0XHRcdCAvL3RoaeG6v3QgbOG6rXAgbcOgdSBjaG8gY2jhu69cclxuXHRcdFxyXG5cdFx0Ym9yZGVyLXJhZGl1czogMC41ZW07XHJcblx0fVxyXG5cdFxyXG5cdFxyXG5cdC8vIGNo4bq/IMSR4buZIG7DoHkgc+G7rSBk4bulbmcgxJHGsGEg4bqjbmggaWNvbiB0aGVvIG7hu5lpIGR1bmdcclxuXHQuZm9ybS13ZWxjb21lLWNhcmQgaW1nIHtcclxuXHRcdC8vIGdp4bubaSBo4bqhbiDhuqNuaCBjaOG7iSBs4bubbiBuaOG6pXQgY8OzIMSR4buZIGNhbyBsw6AgY2jhu6tuZyBuw6B5XHJcblx0XHQvLyBraGkg4bqjbmggbmjhu48gdGjDrCBuw7Mgc+G6vSBoaeG7g24gdGjhu4sgbmjhu49cclxuXHRcdC8vIGtodW5nIOG6o25oIGPFqW5nIGNvIGzhuqFpIG5o4buPIHRoZW9cclxuXHRcdC8vIG1heC1oZWlnaHQ6IDI1MHB4OyAvLyBi4buPIGPDoWkgbsOgeSB0aMOsIMSRxrDhu6NjXHJcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xyXG5cdH1cclxuXHJcblx0Ly8gdGhp4bq/dCBs4bqtcCDhuqluIG7DunQgbOG7h25oIHRyw6puIGtodW5nIGjDrG5oXHJcblx0LmNhcmQtYmFja2dyb3VuZC1pbWFnZSB7XHJcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XHJcblx0XHR0ZXh0LWFsaWduOiByaWdodDtcclxuXHRcdHBhZGRpbmc6IDVweDtcclxuXHRcdC8vIG3hu58g4bqjbmggbeG7mXQga2h1bmcgdOG7kWkgdGhp4buDdSBsw6AgMjAwcHggYmFuIMSR4bqndVxyXG5cdFx0Ly8gxJHhu4MgaGnhu4NuIHRo4buLIGNhbWVyYSBsb2FkIOG6o25oIGzDqm5cclxuXHRcdG1pbi1oZWlnaHQ6IDEwMHB4OyBcclxuXHR9XHJcblxyXG5cdC5jYXJkLWJhY2tncm91bmQtaW1hZ2UgLmNhcmQtYnV0dG9uIHtcclxuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuXHRcdHRvcDogMyU7XHJcblx0XHRsZWZ0OiA1JTtcclxuXHRcdGZvbnQtc2l6ZTogNTBweDtcclxuXHR9XHJcblxyXG5cdC8vIEdp4bubaSBo4bqhbiDEkeG7mSBjYW8gY+G7p2Eg4bqjbmggXHJcblx0Ly8gY+G7kSDEkeG7i25oIG3hu5l0IMSR4buZIGNhbyBj4bunYSDhuqNuaCwg4bqjbmggY8OzIHRvIGhheSBuaOG7j1xyXG5cdC8vIHRow6wgY2jhu4kgaGnhu4NuIHRo4buLIHRyb25nIGtodSBow6xuaCBuw6B5IHRow7RpXHJcblx0Ly8gbsOzIHPhur0gxJHhu5NuZyBjaOG7iW5oIHRydW5nIHTDom0gY+G7p2Eg4bqjbmggXHJcblx0Ly8gZMO5bmcgY8OhY2ggbsOgeSDEkeG7gyBoaeG7g24gdGjhu4sgY+G7kSDEkeG7i25oIMSR4buZIGNhbyBj4bunYSBjYXJkXHJcblxyXG5cdC8vIEtoaSDhuqNuaCBuaOG7jyB0aMOsIOG6o25oIG7hurFtIGzhu410IHRo4buPbiB0cm9uZyBraHVuZ1xyXG5cdC8vIHbDoCBu4buBbiB0cuG7kW5nIHRo4burYSB0csO0bmcgcuG6pXQgeOG6pXUsXHJcblx0Ly8gbmjGsG5nIOG6o25oIGzhu5tuIHPhur0ga2jDtG5nIGLhu4sgbcOpbywgbcOgIHPhur0gbMOgbSBu4buBbiBy4bqldCDEkeG6uXBcclxuXHQuY2FyZC1iYWNrZ3JvdW5kLWltYWdlIC5jYXJkLWltYWdlLWhlaWdodCB7XHJcblx0XHRtaW4taGVpZ2h0OiAzNXZoO1xyXG5cdFx0YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O1xyXG5cdFx0YmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcclxuXHRcdGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcblx0fVxyXG5cclxuXHRcclxuXHRcclxuLy99XHJcbiJdfQ== */");

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
    constructor(apiCommons, apiAuth, mainService) {
        this.apiCommons = apiCommons;
        this.apiAuth = apiAuth;
        this.mainService = mainService;
        this.formLogin = {
            title: `Login`
        };
        /**
         * Hàm gọi lại cho form popup
         */
        this.callbackLogin = function (res) {
            return new Promise(resolve => {
                console.log(res);
                if (res.error) {
                    this.apiCommons.presentAlert('Error:<br>' + (res.error.message != undefined ? res.error.message : res.message ? res.message : ("Error Unknow: " + JSON.stringify(res.error, null, 2))));
                }
                else if (res.response_data) {
                    if (res.button.command === "LOGIN") {
                        this.checkRight(res.response_data);
                    }
                    if (res.button.command === "CREATE-USER") {
                        this.saveToken(res.button.token, res.response_data.data);
                        this.apiCommons.showToast('Tạo mới thành công', 3000);
                    }
                    if (res.button.command === "EDIT-USER") {
                        this.userInfo = res.response_data.data;
                        this.mainService.saveUserInfo(this.userInfo);
                        this.apiCommons.showToast('Cập nhật thành công', 3000);
                        this.showUserInfo();
                    }
                }
                // close form
                resolve({ next: "CLOSE" });
            });
        }.bind(this);
    }
    ngOnInit() {
        setTimeout(() => {
            this.userInfo = this.mainService.getUserInfo();
            this.showUserInfo();
        }, 1000);
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
        // sửa thông tin user
        if (btn.command === 'EDIT' && this.userInfo) {
            this.editUser();
        }
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
                // form login gồm nhập username và password
                { type: 'text', key: 'username', name: 'Tên đăng nhập:', hint: 'Vui lòng nhập tên đăng nhập!', icon: 'contact', validators: [{ required: true, min: 1, max: 30 }] },
                { type: "password", key: "password", name: "Mật khẩu", hint: "Vui lòng nhập mật khẩu!", icon: "key", validators: [{ required: true, min: 1, max: 20 }] },
                {
                    type: 'button',
                    options: [
                        {
                            name: 'Đăng nhập',
                            next: 'CALLBACK',
                            url: this.apiAuth.serviceUrls.AUTH_SERVER + '/login',
                            command: 'LOGIN'
                        }
                    ]
                }
            ]
        };
        this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["DynamicFormMobilePage"], {
            parent: this,
            callback: this.callbackLogin,
            form: form
        });
    }
    /**
     * Nếu đã đăng nhập thì hiển thị thông tin user đăng nhập
     * Nếu không thì gọi phương thức login() để popup form đăng nhập
     */
    showUserInfo() {
        if (this.userInfo)
            this.formLogin = {
                title: "ĐÃ ĐĂNG NHẬP",
                color: 'primary',
                items: [
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
            this.login();
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
                { key: "fullname", value: this.userInfo.fullname, name: "Họ và tên", hint: "Họ và tên đầy đủ", type: "text", input_type: "text", icon: "person", validators: [{ required: true, min: 1 }] },
                { key: "address", value: this.userInfo.address, name: "Địa chỉ", hint: "Địa chỉ đầy đủ", type: "text", input_type: "text", icon: "pin", validators: [{ required: true, min: 1 }] },
                { key: "phone", value: this.userInfo.phone, name: "Điện thoại liên hệ", hint: "Yêu cầu định dạng số điện thoại nhé", type: "text", input_type: "tel", icon: "call", validators: [{ pattern: "^[0-9]*$" }] },
                { key: "email", value: this.userInfo.email, name: "email", hint: "Yêu cầu định dạng email nhé", type: "text", input_type: "email", icon: "mail", validators: [{ pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" }] },
                { key: "avatar", type: "image", name: "ẢNH ĐẠI DIỆN", value: this.userInfo.avatar ? this.userInfo.avatar : "assets/imgs/avatar.jpg", options: { ratio: 1 / 1, max_width: 80 } },
                { key: "background", type: "image", name: "ẢNH NỀN", value: this.userInfo.background ? this.userInfo.background : "assets/imgs/background-idea.jpg", options: { ratio: 16 / 9, max_width: 300 } },
                {
                    type: "button",
                    options: [
                        { name: "Reset", next: "RESET" },
                        { name: "Cập nhật", command: "EDIT-USER", url: this.apiAuth.serviceUrls.RESOURCE_SERVER + "/edit-user", token: true, next: "CALLBACK" }
                    ]
                }
            ]
        };
        this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["DynamicFormMobilePage"], {
            parent: this,
            callback: this.callbackLogin,
            form: form
        });
    }
    /**
     * Tạo user mới
     * @param token
     */
    createNewUser(username, token) {
        let form = {
            title: "TẠO THÔNG TIN CÁ NHÂN",
            buttons: [
                { color: 'danger', icon: 'close', next: 'CLOSE' }
            ],
            items: [
                { name: "Điền đầy đủ thông tin sau", type: "title" },
                { key: "nickname", name: "Biệt danh", hint: "Nickname", type: "text", input_type: "text", icon: "heart", validators: [{ required: true, min: 1 }] },
                { key: "fullname", name: "Họ và tên", hint: "Họ và tên đầy đủ", type: "text", input_type: "text", icon: "person", validators: [{ required: true, min: 1 }] },
                { key: "address", name: "Địa chỉ", hint: "Địa chỉ đầy đủ", type: "text", input_type: "text", icon: "pin", validators: [{ required: true, min: 1 }] },
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
        this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["DynamicFormMobilePage"], {
            parent: this,
            callback: this.callbackLogin,
            form: form
        });
    }
    /**
     * Kiểm tra quyền truy cập
     * @param resData
     */
    checkRight(resData) {
        // Kiểm tra đã có username trong csdl chưa để xác nhận đăng nhập hoặc đăng ký username mới
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
    { type: _services_main_service__WEBPACK_IMPORTED_MODULE_3__["MainService"] }
];
LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/login/login.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login.page.scss */ "./src/app/main-entry/login/login.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["CommonsService"],
        ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"],
        _services_main_service__WEBPACK_IMPORTED_MODULE_3__["MainService"]])
], LoginPage);



/***/ })

}]);
//# sourceMappingURL=main-entry-login-login-module-es2015.js.map