function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main-entry-login-login-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/login/login.page.html":
  /*!****************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/login/login.page.html ***!
    \****************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppMainEntryLoginLoginPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header>\r\n  <ion-toolbar color=\"primary\">\r\n\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n\r\n    <ion-title>{{(formLogin?.title?formLogin.title:'LOGIN')}}</ion-title>\r\n\r\n  </ion-toolbar>\r\n\r\n</ion-header>\r\n\r\n<ion-content class=\"background-none background-image\">\r\n\r\n  <!-- Các dữ liệu form nhập liệu động, gồm các form nhập liệu và nút xử lý -->\r\n  <ion-list class=\"background-transparent\" *ngFor=\"let it of formLogin.items\">\r\n\r\n    <!-- QrCode generator Phải là text hoặc dạng base64 hoặc hex với độ dài giới hạn, nếu lớn quá sẽ lỗi-->\r\n    <ion-grid *ngIf=\"it?.type == 'qrcode' && it?.value?.length<=2000 \">\r\n      <ion-row>\r\n        <ion-col style=\"text-align: center;\" size=\"12\">\r\n          <ion-card>\r\n            <ngx-qrcode [qrc-value]=\"it.value\"></ngx-qrcode>\r\n          </ion-card>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"it.is_show_value\" style=\"text-align: center;\" size=\"12\">\r\n          {{ it.value }}\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n\r\n    <!-- BarCode generator là dạng số và chữ số  -->\r\n    <ion-grid *ngIf=\"it?.type == 'barcode' && it?.value?.length<=100 \">\r\n      <ion-row>\r\n        <ion-col style=\"text-align: center;\" size=\"12\">\r\n          <ion-card>\r\n            <ngx-barcode [bc-value]=\"it.value\" [bc-display-value]=\"true\"></ngx-barcode>\r\n            <!-- <ion-card-content *ngIf=\"it.is_show_value\">\r\n\t\t\t\t\t\t<div>{{ it.value }}</div>\r\n\t\t\t\t\t  </ion-card-content> -->\r\n          </ion-card>\r\n        </ion-col>\r\n        <ion-col *ngIf=\"it.is_show_value\" style=\"text-align: center;\">\r\n          {{ it.value }}\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n\r\n\r\n    <!-- Thêm card ảnh theo base64 cắt hình backgroud card-->\r\n    <ion-card *ngIf=\"it?.type == 'image-viewer'\" class='form-welcome-card card-background-image'>\r\n\r\n      <!-- Ảnh hiển thị mẫu của card -->\r\n      <ion-card-header *ngIf=\"it.name\">\r\n        <ion-card-subtitle *ngIf=\"it.hint\">{{it.hint}}</ion-card-subtitle>\r\n        <ion-card-title>{{it.name}}</ion-card-title>\r\n      </ion-card-header>\r\n\r\n      <!-- Hiển thị ảnh đủ dung lượng độ rộng \r\n\t\t\t\thoặc độ cao tối thiểu\r\n\t\t\t\tCách này sử dụng hiển thị toàn bộ ảnh thật,\r\n\t\t\t\tnhưng sẽ tràn màn hình, hoặc bé tý\r\n\t\t\t\tẢnh to sẽ bị méo rất xấu\r\n\t\t\t-->\r\n      <img *ngIf=\"it.value\" [src]=\"it.value\">\r\n\r\n      <!-- Hiển thị ảnh dưới độ rộng, độ cao, \r\n\t\t\t\tcho trước bằng style tối đa \r\n\t\t\t\tCách này dùng làm ảnh nền cho một card nào đó, mà nó sẽ không bị méo hình\r\n\t\t\t\tẢnh to sẽ không bị méo nhưng ảnh nhỏ sẽ bị nằm lọt bên trong\r\n\t\t\t-->\r\n      <!-- <div *ngIf=\"it.value\" class=\"card-image-height\" [style.background-image]=\"'url('+it.value+')'\"></div> -->\r\n\r\n      <!-- nút load file ảnh nằm ở góc trái màn hình, cho phép gọi trình openfile -->\r\n      <!-- <div class='card-button' tappable>\r\n        <input class=\"file-over\" type=\"file\" (change)=\"imageUploadEvent($event, it)\"\r\n          accept=\"image/gif, image/jpeg, image/png\" />\r\n        <ion-icon slot=\"icon-only\" name=\"camera\" color=\"medium\"></ion-icon>\r\n      </div> -->\r\n\r\n    </ion-card>\r\n\r\n    <!-- Thêm thẻ ảnh thumnail -->\r\n    <ion-item *ngIf=\"it?.type == 'image'\" class=\"background-round\">\r\n      <ion-thumbnail tappable slot=\"start\" (click)=\"showImage(it)\">\r\n        <ion-img [src]=\"it.value\"></ion-img>\r\n      </ion-thumbnail>\r\n      <ion-label>{{it.name}}</ion-label>\r\n      <ion-buttons slot=\"end\">\r\n        <ion-button color='danger' shape=\"round\" fill=\"outline\" (click)=\"openCamera(it)\">\r\n          <ion-icon slot=\"icon-only\" name=\"videocam\"></ion-icon>\r\n        </ion-button>\r\n        <ion-button color='secondary' shape=\"round\" fill=\"outline\">\r\n          <input tappable class=\"file-over\" type=\"file\" (change)=\"imageUploadEvent($event, it)\"\r\n            accept=\"image/gif, image/jpeg, image/png\" />\r\n          <ion-icon slot=\"icon-only\" name=\"camera\"></ion-icon>\r\n        </ion-button>\r\n        <ion-button color='primary' shape=\"round\" fill=\"outline\" (click)=\"cropImage(it)\">\r\n          <ion-icon slot=\"icon-only\" name=\"crop\"></ion-icon>\r\n        </ion-button>\r\n      </ion-buttons>\r\n    </ion-item>\r\n    <ion-card *ngIf=\"it?.type == 'image' && it.visible\" class='form-welcome-card card-background-image'>\r\n      <img *ngIf=\"it.value\" [src]=\"it.value\">\r\n    </ion-card>\r\n\r\n    <!-- title with avatar -->\r\n    <ion-item class=\"background-none\" *ngIf=\"it?.type == 'avatar'\">\r\n      <ion-avatar slot=\"start\" *ngIf=\"it.url\"><img [src]=\"it.url\"></ion-avatar>\r\n      <ion-title slot=\"start\" class=\"form-title-item\" color=\"{{it.color}}\">{{it.name}}</ion-title>\r\n    </ion-item>\r\n\r\n    <!-- title -->\r\n    <ion-item class=\"background-none\" *ngIf=\"it?.type == 'title'\">\r\n      <ion-label class=\"form-title-item\" color=\"{{it.color}}\">{{it.name}}</ion-label>\r\n    </ion-item>\r\n\r\n    <!-- form chi tiet -->\r\n    <ion-list class=\"background-round\" *ngIf=\"it?.type == 'details'\">\r\n      <ion-item *ngFor=\"let dt of it.details\">\r\n        <strong slot=\"start\">\r\n          {{dt.name}}\r\n        </strong>\r\n        <ion-label class=\"ion-text-wrap\" color=\"{{it.color}}\" *ngIf=\"dt.pipe_date\">\r\n          {{dt.value | date:dt.pipe_date}}\r\n        </ion-label>\r\n        <ion-label class=\"ion-text-wrap\" color=\"{{it.color}}\" *ngIf=\"!dt.pipe_date\">\r\n          {{dt.value}}\r\n        </ion-label>\r\n      </ion-item>\r\n    </ion-list>\r\n\r\n\r\n    <!-- input text inline=default null/fixed/floating/stacked-->\r\n    <ion-item *ngIf=\"it?.type == 'text'\" class=\"background-none background-round form-input-item\">\r\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\r\n      <ion-label position=\"stacked\" class=\"ion-text-wrap\" color=\"{{(it.invalid?'danger':'')}}\"\r\n        style=\"text-align: justify;\">\r\n        {{it.invalid?it.hint:it.name}}{{it.validators?'(*)':''}}</ion-label>\r\n      <ion-input type=\"{{it.input_type}}\" placeholder=\"{{it.hint}}\" [(ngModel)]=\"it.value\" [disabled]=\"it.disabled\">\r\n      </ion-input>\r\n    </ion-item>\r\n\r\n    <!-- Thêm captcha hình ảnh kiểu svg text file -->\r\n    <ion-item *ngIf=\"it?.type == 'svg'\" class=\"background-none background-round form-input-item\">\r\n      <!-- thêm OTP bằng hình ảnh -->\r\n      <div slot=\"start\" [innerHTML]=\"it.svg\"></div>\r\n      <ion-label position=\"stacked\" class=\"ion-text-wrap\" color=\"{{(it.invalid?'danger':'')}}\"\r\n        style=\"text-align: justify;\">\r\n        {{it.invalid?it.hint:it.name}}{{it.validators?'(*)':''}}</ion-label>\r\n      <ion-input type=\"text\" placeholder=\"{{it.hint}}\" [(ngModel)]=\"it.value\"></ion-input>\r\n    </ion-item>\r\n\r\n    <!-- input text-area -->\r\n    <ion-item *ngIf=\"it?.type == 'text_area'\" class=\"background-none background-round form-input-item\">\r\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\r\n      <ion-label *ngIf=\"it.invalid\" position=\"floating\" color=\"danger\" class=\"ion-text-wrap\"\r\n        style=\"text-align: justify;\">\r\n        {{it.hint}}(*)\r\n      </ion-label>\r\n      <ion-textarea rows=\"6\" cols=\"20\" placeholder={{it.name?it.name:it.hint}} [(ngModel)]=\"it.value\">\r\n      </ion-textarea>\r\n    </ion-item>\r\n\r\n    <!-- check box -->\r\n    <ion-item *ngIf=\"it?.type === 'check'\" class=\"background-none background-round form-input-item\">\r\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\r\n      <ion-label class=\"ion-text-wrap\" style=\"text-align: justify;\">{{it.name?it.name:it.hint}}</ion-label>\r\n      <ion-checkbox [(ngModel)]=\"it.value\"></ion-checkbox>\r\n    </ion-item>\r\n\r\n    <!-- radio select -->\r\n    <ion-list *ngIf=\"it?.type === 'radio'\" class=\"background-none background-round form-input-item\">\r\n      <ion-radio-group allow-empty-selection=\"true\" name=\"radio-group\" [(ngModel)]=\"it.value\">\r\n\r\n        <ion-list-header>\r\n          <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"primary\" name=\"{{it.icon}}\"></ion-icon>\r\n          <ion-label color=\"primary\" class=\"ion-text-wrap\" style=\"text-align: justify;\">{{it.name}}\r\n          </ion-label>\r\n        </ion-list-header>\r\n\r\n        <ion-item *ngFor=\"let myRad of it.options\">\r\n          <ion-label color=\"secondary\" class=\"ion-text-wrap\" style=\"text-align: justify;\">{{myRad.name}}\r\n          </ion-label>\r\n          <ion-radio slot=\"start\" color=\"secondary\" value=\"{{myRad.value}}\"></ion-radio>\r\n        </ion-item>\r\n\r\n      </ion-radio-group>\r\n    </ion-list>\r\n\r\n    <!-- multiple select -->\r\n    <ion-item *ngIf=\"it?.type === 'select_multiple'\" class=\"background-none background-round form-input-item\">\r\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\r\n      <ion-label color=\"{{it.color?it.color:'primary'}}\" class=\"ion-text-wrap\" style=\"text-align: justify;\">\r\n        {{it.name?it.name:it.hint}}\r\n      </ion-label>\r\n      <ion-select [(ngModel)]=\"it.value\" multiple=\"true\"\r\n        style=\"background-color: rgb(0, 190, 73); color:whitesmoke; border-radius: 1em;\">\r\n        <ion-select-option *ngFor=\"let mySet of it.options\" value=\"{{mySet.value}}\">{{mySet.name}}\r\n        </ion-select-option>\r\n      </ion-select>\r\n    </ion-item>\r\n\r\n    <!-- toggle check -->\r\n    <ion-item *ngIf=\"it?.type === 'toggle'\" class=\"background-none background-round form-input-item\">\r\n      <ion-icon *ngIf=\"it.icon\" slot=\"start\" color=\"{{it.color?it.color:'primary'}}\" name=\"{{it.icon}}\"></ion-icon>\r\n      <ion-label color=\"primary\" class=\"ion-text-wrap\" style=\"text-align: justify;\">{{it.name?it.name:it.hint}}\r\n      </ion-label>\r\n      <ion-toggle color=\"{{it.color}}\" [(ngModel)]=\"it.value\"></ion-toggle>\r\n    </ion-item>\r\n\r\n    <!-- range adjust -->\r\n    <ion-item *ngIf=\"it?.type === 'range'\" class=\"background-none background-round form-input-item\">\r\n      <ion-label *ngIf=\"it.name\" color=\"{{it.color?it.color:'primary'}}\" class=\"ion-text-wrap\"\r\n        style=\"text-align: justify;\">\r\n        {{it.name}}\r\n      </ion-label>\r\n      <ion-range min=\"{{it.min}}\" max=\"{{it.max}}\" pin=\"true\" snaps=\"true\" color=\"{{it.color?it.color:'primary'}}\"\r\n        [(ngModel)]=\"it.value\">\r\n        <ion-icon *ngIf=\"it.icon\" size=\"small\" slot=\"start\" name=\"{{it.icon}}\"></ion-icon>\r\n        <ion-icon *ngIf=\"it.icon\" slot=\"end\" name=\"{{it.icon}}\"></ion-icon>\r\n      </ion-range>\r\n    </ion-item>\r\n\r\n    <!-- rang title with value -->\r\n    <ion-item *ngIf=\"it?.type === 'range-text'\" class=\"background-none background-round form-input-item\">\r\n      <ion-range min=\"{{it.min}}\" max=\"{{it.max}}\" snaps=\"{{it.snaps}}\" color=\"{{(it.color?it.color:'secondary')}}\"\r\n        [(ngModel)]=\"it.value\">\r\n        <ion-label slot=\"start\" color=\"primary\" [style.font-size]=\"(it.size?it.size:'1.5em')\">{{it.name}}</ion-label>\r\n        <ion-input slot=\"end\" type=\"text\" [(ngModel)]=\"it.value\" [disabled]=\"it.disabled\" maxlength=\"5\"\r\n          style=\"border-radius: 0.5em; background-color: rgb(40, 112, 219); color:whitesmoke; padding: 3px; align-self: center; min-width: 40px; max-width: 60px;\">\r\n        </ion-input>\r\n      </ion-range>\r\n    </ion-item>\r\n\r\n    <!-- date time-->\r\n    <ion-item *ngIf=\"it?.type === 'datetime'\" class=\"background-none background-round form-input-item\">\r\n      <ion-label *ngIf=\"it.invalid\" color=\"danger\">{{it.hint}}(*)</ion-label>\r\n      <ion-label *ngIf=\"!it.invalid\">{{it.name}}</ion-label>\r\n      <ion-datetime displayFormat=\"{{it.display}}\" placeholder=\"{{it.hint}}\" pickerFormat=\"{{it.picker}}\"\r\n        [(ngModel)]=\"it.value\"></ion-datetime>\r\n    </ion-item>\r\n\r\n    <!-- button action -->\r\n    <ion-grid class=\"ion-no-padding\" *ngIf=\"it?.type == 'button'\">\r\n      <ion-row>\r\n        <ion-col *ngFor=\"let myBtn of it.options\" style=\"text-align: center;\">\r\n          <ion-button class=\"form-button-item\" color=\"{{it.color?it.color:''}}\" shape=\"round\" (click)=\"onClick(myBtn)\">\r\n            <ion-icon *ngIf=\"it.icon\" name=\"{{it.icon}}\"></ion-icon>\r\n            {{myBtn?.name}}\r\n          </ion-button>\r\n        </ion-col>\r\n      </ion-row>\r\n    </ion-grid>\r\n\r\n  </ion-list>\r\n\r\n</ion-content>";
    /***/
  },

  /***/
  "./src/app/main-entry/login/login-routing.module.ts":
  /*!**********************************************************!*\
    !*** ./src/app/main-entry/login/login-routing.module.ts ***!
    \**********************************************************/

  /*! exports provided: LoginPageRoutingModule */

  /***/
  function srcAppMainEntryLoginLoginRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginPageRoutingModule", function () {
      return LoginPageRoutingModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/fesm2015/router.js");
    /* harmony import */


    var _login_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./login.page */
    "./src/app/main-entry/login/login.page.ts");

    var routes = [{
      path: '',
      component: _login_page__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]
    }];

    var LoginPageRoutingModule = /*#__PURE__*/_createClass(function LoginPageRoutingModule() {
      _classCallCheck(this, LoginPageRoutingModule);
    });

    LoginPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], LoginPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/main-entry/login/login.module.ts":
  /*!**************************************************!*\
    !*** ./src/app/main-entry/login/login.module.ts ***!
    \**************************************************/

  /*! exports provided: LoginPageModule */

  /***/
  function srcAppMainEntryLoginLoginModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginPageModule", function () {
      return LoginPageModule;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var _login_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./login-routing.module */
    "./src/app/main-entry/login/login-routing.module.ts");
    /* harmony import */


    var _login_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./login.page */
    "./src/app/main-entry/login/login.page.ts");
    /* harmony import */


    var src_app_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! src/app/shared.module */
    "./src/app/shared.module.ts");

    var LoginPageModule = /*#__PURE__*/_createClass(function LoginPageModule() {
      _classCallCheck(this, LoginPageModule);
    });

    LoginPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [src_app_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], _login_routing_module__WEBPACK_IMPORTED_MODULE_2__["LoginPageRoutingModule"]],
      declarations: [_login_page__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]]
    })], LoginPageModule);
    /***/
  },

  /***/
  "./src/app/main-entry/login/login.page.scss":
  /*!**************************************************!*\
    !*** ./src/app/main-entry/login/login.page.scss ***!
    \**************************************************/

  /*! exports provided: default */

  /***/
  function srcAppMainEntryLoginLoginPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "@charset \"UTF-8\";\n.background-none {\n  --background:none;\n}\n.background-transparent {\n  background: transparent;\n}\n/* .background-color {\n\tbackground-color: #2d96de;   //thiết lập màu cho nền\n} */\n.background-image {\n  background-image: url(\"/assets/imgs/gradient.png\");\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n}\n.background-round {\n  margin: 3px;\n  border-radius: 1.5em;\n}\n.background-links {\n  margin: 1px;\n  border-radius: 0.5em;\n}\n.form-input-item {\n  background-color: #fefefe;\n  color: #081875;\n  opacity: 0.95;\n  font-size: 1em;\n}\n.form-button-item {\n  border: solid 0.1em;\n  border-radius: 1.5em;\n}\n.form-title-item {\n  color: white;\n  text-align: center;\n  font-size: 1.4em;\n}\n.file-over {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n}\n.form-welcome-card {\n  margin: 1px;\n  background-color: #fefefe;\n  color: #081875;\n  border-radius: 0.5em;\n}\n.form-welcome-card img {\n  overflow: hidden;\n}\n.card-background-image {\n  position: relative;\n  text-align: right;\n  padding: 5px;\n  min-height: 100px;\n}\n.card-background-image .card-button {\n  position: absolute;\n  top: 3%;\n  left: 5%;\n  font-size: 50px;\n}\n.card-background-image .card-image-height {\n  min-height: 35vh;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: cover;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFpbi1lbnRyeS9sb2dpbi9sb2dpbi5wYWdlLnNjc3MiLCJzcmMvYXBwL21haW4tZW50cnkvbG9naW4vRTpcXE1ZREFUQVxcTEFQVFJJTkhcXE5PREU0XFxkaW5oLWlub3ZhdGlvblxcY2xpZW50L3NyY1xcYXBwXFxtYWluLWVudHJ5XFxsb2dpblxcbG9naW4ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0VmO0VBQ0MsaUJBQUE7QURBRjtBQ0dDO0VBQ0MsdUJBQUE7QURBRjtBQ0dDOztHQUFBO0FBSUE7RUFDQyxrREFBQTtFQUNBLDJCQUFBO0VBQ0EsNEJBQUE7RUFDQSxzQkFBQTtBRERGO0FDSUM7RUFDQyxXQUFBO0VBQ0Esb0JBQUE7QURERjtBQ0tDO0VBQ0MsV0FBQTtFQUNBLG9CQUFBO0FERkY7QUNNQztFQUNDLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxjQUFBO0FESEY7QUNNQztFQUNDLG1CQUFBO0VBQ0Esb0JBQUE7QURIRjtBQ09DO0VBQ0MsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QURKRjtBQ1FDO0VBQ0Msa0JBQUE7RUFDTSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0FETFI7QUNTQztFQUNDLFdBQUE7RUFDQSx5QkFBQTtFQUNBLGNBQUE7RUFFQSxvQkFBQTtBRFBGO0FDWUM7RUFLQyxnQkFBQTtBRGJGO0FDaUJDO0VBQ0Msa0JBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFHQSxpQkFBQTtBRGhCRjtBQ21CQztFQUNDLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0FEaEJGO0FDNEJDO0VBQ0MsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGtDQUFBO0VBQ0Esc0JBQUE7QUR6QkYiLCJmaWxlIjoic3JjL2FwcC9tYWluLWVudHJ5L2xvZ2luL2xvZ2luLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcbi5iYWNrZ3JvdW5kLW5vbmUge1xuICAtLWJhY2tncm91bmQ6bm9uZTtcbn1cblxuLmJhY2tncm91bmQtdHJhbnNwYXJlbnQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cblxuLyogLmJhY2tncm91bmQtY29sb3Ige1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiAjMmQ5NmRlOyAgIC8vdGhp4bq/dCBs4bqtcCBtw6B1IGNobyBu4buBblxufSAqL1xuLmJhY2tncm91bmQtaW1hZ2Uge1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvYXNzZXRzL2ltZ3MvZ3JhZGllbnQucG5nXCIpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG59XG5cbi5iYWNrZ3JvdW5kLXJvdW5kIHtcbiAgbWFyZ2luOiAzcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEuNWVtO1xufVxuXG4uYmFja2dyb3VuZC1saW5rcyB7XG4gIG1hcmdpbjogMXB4O1xuICBib3JkZXItcmFkaXVzOiAwLjVlbTtcbn1cblxuLmZvcm0taW5wdXQtaXRlbSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7XG4gIGNvbG9yOiAjMDgxODc1O1xuICBvcGFjaXR5OiAwLjk1O1xuICBmb250LXNpemU6IDFlbTtcbn1cblxuLmZvcm0tYnV0dG9uLWl0ZW0ge1xuICBib3JkZXI6IHNvbGlkIDAuMWVtO1xuICBib3JkZXItcmFkaXVzOiAxLjVlbTtcbn1cblxuLmZvcm0tdGl0bGUtaXRlbSB7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDEuNGVtO1xufVxuXG4uZmlsZS1vdmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDI7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG9wYWNpdHk6IDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmZvcm0td2VsY29tZS1jYXJkIHtcbiAgbWFyZ2luOiAxcHg7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7XG4gIGNvbG9yOiAjMDgxODc1O1xuICBib3JkZXItcmFkaXVzOiAwLjVlbTtcbn1cblxuLmZvcm0td2VsY29tZS1jYXJkIGltZyB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5jYXJkLWJhY2tncm91bmQtaW1hZ2Uge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBwYWRkaW5nOiA1cHg7XG4gIG1pbi1oZWlnaHQ6IDEwMHB4O1xufVxuXG4uY2FyZC1iYWNrZ3JvdW5kLWltYWdlIC5jYXJkLWJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAzJTtcbiAgbGVmdDogNSU7XG4gIGZvbnQtc2l6ZTogNTBweDtcbn1cblxuLmNhcmQtYmFja2dyb3VuZC1pbWFnZSAuY2FyZC1pbWFnZS1oZWlnaHQge1xuICBtaW4taGVpZ2h0OiAzNXZoO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXIgY2VudGVyO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xufSIsIi8vOmhvc3Qge1xyXG5cclxuXHQuYmFja2dyb3VuZC1ub25lIHtcclxuXHRcdC0tYmFja2dyb3VuZDpub25lOyAgICAgICAgICAgICAvL2tow7RuZyB0aGnhur90IGzhuq1wIGJhY2tncm91ZFxyXG5cdH1cclxuXHJcblx0LmJhY2tncm91bmQtdHJhbnNwYXJlbnQge1xyXG5cdFx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7ICAgICAgIC8vdGhp4bq/dCBs4bqtcCBu4buBbiB0cm9uZyBzdeG7kXRcclxuXHR9XHJcblxyXG5cdC8qIC5iYWNrZ3JvdW5kLWNvbG9yIHtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6ICMyZDk2ZGU7ICAgLy90aGnhur90IGzhuq1wIG3DoHUgY2hvIG7hu4FuXHJcblx0fSAqL1xyXG5cclxuXHQuYmFja2dyb3VuZC1pbWFnZSB7XHJcblx0XHRiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIvYXNzZXRzL2ltZ3MvZ3JhZGllbnQucG5nXCIpO1xyXG5cdFx0YmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xyXG5cdFx0YmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcclxuXHRcdGJhY2tncm91bmQtc2l6ZTogY292ZXI7XHJcblx0fVxyXG5cclxuXHQuYmFja2dyb3VuZC1yb3VuZCB7XHJcblx0XHRtYXJnaW46IDNweDtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDEuNWVtO1xyXG5cdH1cclxuXHRcclxuXHRcclxuXHQuYmFja2dyb3VuZC1saW5rcyB7XHJcblx0XHRtYXJnaW46IDFweDtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG5cdH1cclxuXHJcblx0XHJcblx0LmZvcm0taW5wdXQtaXRlbSB7XHJcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiAjZmVmZWZlOyAgIC8vdGhp4bq/dCBs4bqtcCBtw6B1IGNobyBu4buBblxyXG5cdFx0Y29sb3I6ICMwODE4NzU7ICAgXHRcdFx0IC8vdGhp4bq/dCBs4bqtcCBtw6B1IGNobyBjaOG7r1xyXG5cdFx0b3BhY2l0eTogMC45NTtcdFx0XHRcdFx0ICAgLy9sw6BtIG3hu50gY2jFqSB2w6AgbuG7gW4gxJFpIG3hu5l0IGzGsOG7o25nIG7hur91IGPhuqduIGzDoCA8MSB2w6AgPjBcclxuXHRcdGZvbnQtc2l6ZTogMWVtO1xyXG5cdH1cclxuXHJcblx0LmZvcm0tYnV0dG9uLWl0ZW0ge1xyXG5cdFx0Ym9yZGVyOiBzb2xpZCAwLjFlbTtcclxuXHRcdGJvcmRlci1yYWRpdXM6IDEuNWVtO1xyXG5cdH1cclxuXHJcblxyXG5cdC5mb3JtLXRpdGxlLWl0ZW0ge1xyXG5cdFx0Y29sb3I6IHdoaXRlO1xyXG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xyXG5cdFx0Zm9udC1zaXplOiAxLjRlbTtcclxuXHR9XHJcblxyXG5cdC8vIHRoaeG6v3QgbOG6rXAgY2hvIOG6qW4gbsO6dCBmaWxlIHVwbG9hZFxyXG5cdC5maWxlLW92ZXIge1xyXG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICAgIHRvcDogMDtcclxuICAgICAgICBsZWZ0OiAwO1xyXG4gICAgICAgIHotaW5kZXg6IDI7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgICAgIG9wYWNpdHk6IDA7XHJcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xyXG5cdH1cclxuXHRcclxuXHQvLyBjYXJkIHRo4buDIGhp4buHbiDhu58gd2VsY29tZVxyXG5cdC5mb3JtLXdlbGNvbWUtY2FyZCB7XHJcblx0XHRtYXJnaW46IDFweDtcclxuXHRcdGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7ICAgLy90aGnhur90IGzhuq1wIG3DoHUgY2hvIG7hu4FuXHJcblx0XHRjb2xvcjogIzA4MTg3NTsgICBcdFx0XHQgLy90aGnhur90IGzhuq1wIG3DoHUgY2hvIGNo4buvXHJcblx0XHRcclxuXHRcdGJvcmRlci1yYWRpdXM6IDAuNWVtO1xyXG5cdH1cclxuXHRcclxuXHRcclxuXHQvLyBjaOG6vyDEkeG7mSBuw6B5IHPhu60gZOG7pW5nIMSRxrBhIOG6o25oIGljb24gdGhlbyBu4buZaSBkdW5nXHJcblx0LmZvcm0td2VsY29tZS1jYXJkIGltZyB7XHJcblx0XHQvLyBnaeG7m2kgaOG6oW4g4bqjbmggY2jhu4kgbOG7m24gbmjhuqV0IGPDsyDEkeG7mSBjYW8gbMOgIGNo4burbmcgbsOgeVxyXG5cdFx0Ly8ga2hpIOG6o25oIG5o4buPIHRow6wgbsOzIHPhur0gaGnhu4NuIHRo4buLIG5o4buPXHJcblx0XHQvLyBraHVuZyDhuqNuaCBjxaluZyBjbyBs4bqhaSBuaOG7jyB0aGVvXHJcblx0XHQvLyBtYXgtaGVpZ2h0OiAyNTBweDsgLy8gYuG7jyBjw6FpIG7DoHkgdGjDrCDEkcaw4bujY1xyXG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcclxuXHR9XHJcblxyXG5cdC8vIHRoaeG6v3QgbOG6rXAg4bqpbiBuw7p0IGzhu4duaCB0csOqbiBraHVuZyBow6xuaFxyXG5cdC5jYXJkLWJhY2tncm91bmQtaW1hZ2Uge1xyXG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xyXG5cdFx0dGV4dC1hbGlnbjogcmlnaHQ7XHJcblx0XHRwYWRkaW5nOiA1cHg7XHJcblx0XHQvLyBt4bufIOG6o25oIG3hu5l0IGtodW5nIHThu5FpIHRoaeG7g3UgbMOgIDIwMHB4IGJhbiDEkeG6p3VcclxuXHRcdC8vIMSR4buDIGhp4buDbiB0aOG7iyBjYW1lcmEgbG9hZCDhuqNuaCBsw6puXHJcblx0XHRtaW4taGVpZ2h0OiAxMDBweDsgXHJcblx0fVxyXG5cclxuXHQuY2FyZC1iYWNrZ3JvdW5kLWltYWdlIC5jYXJkLWJ1dHRvbiB7XHJcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHR0b3A6IDMlO1xyXG5cdFx0bGVmdDogNSU7XHJcblx0XHRmb250LXNpemU6IDUwcHg7XHJcblx0fVxyXG5cclxuXHQvLyBHaeG7m2kgaOG6oW4gxJHhu5kgY2FvIGPhu6dhIOG6o25oIFxyXG5cdC8vIGPhu5EgxJHhu4tuaCBt4buZdCDEkeG7mSBjYW8gY+G7p2Eg4bqjbmgsIOG6o25oIGPDsyB0byBoYXkgbmjhu49cclxuXHQvLyB0aMOsIGNo4buJIGhp4buDbiB0aOG7iyB0cm9uZyBraHUgaMOsbmggbsOgeSB0aMO0aVxyXG5cdC8vIG7DsyBz4bq9IMSR4buTbmcgY2jhu4luaCB0cnVuZyB0w6JtIGPhu6dhIOG6o25oIFxyXG5cdC8vIGTDuW5nIGPDoWNoIG7DoHkgxJHhu4MgaGnhu4NuIHRo4buLIGPhu5EgxJHhu4tuaCDEkeG7mSBjYW8gY+G7p2EgY2FyZFxyXG5cclxuXHQvLyBLaGkg4bqjbmggbmjhu48gdGjDrCDhuqNuaCBu4bqxbSBs4buNdCB0aOG7j24gdHJvbmcga2h1bmdcclxuXHQvLyB2w6AgbuG7gW4gdHLhu5FuZyB0aOG7q2EgdHLDtG5nIHLhuqV0IHjhuqV1LFxyXG5cdC8vIG5oxrBuZyDhuqNuaCBs4bubbiBz4bq9IGtow7RuZyBi4buLIG3DqW8sIG3DoCBz4bq9IGzDoG0gbuG7gW4gcuG6pXQgxJHhurlwXHJcblx0LmNhcmQtYmFja2dyb3VuZC1pbWFnZSAuY2FyZC1pbWFnZS1oZWlnaHQge1xyXG5cdFx0bWluLWhlaWdodDogMzV2aDtcclxuXHRcdGJhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtcclxuXHRcdGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlciBjZW50ZXI7XHJcblx0XHRiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG5cdH1cclxuXHJcblx0XHJcblx0XHJcbi8vfVxyXG4iXX0= */";
    /***/
  },

  /***/
  "./src/app/main-entry/login/login.page.ts":
  /*!************************************************!*\
    !*** ./src/app/main-entry/login/login.page.ts ***!
    \************************************************/

  /*! exports provided: LoginPage */

  /***/
  function srcAppMainEntryLoginLoginPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "LoginPage", function () {
      return LoginPage;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/fesm2015/core.js");
    /* harmony import */


    var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ngxi4-dynamic-service */
    "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");
    /* harmony import */


    var _services_main_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../../services/main.service */
    "./src/app/services/main.service.ts");

    var LoginPage = /*#__PURE__*/function () {
      function LoginPage(apiCommons, apiAuth, mainService) {
        _classCallCheck(this, LoginPage);

        this.apiCommons = apiCommons;
        this.apiAuth = apiAuth;
        this.mainService = mainService;
        this.formLogin = {
          title: "Login"
        };
        /**
         * Hàm gọi lại cho form popup
         */

        this.callbackLogin = function (res) {
          var _this = this;

          return new Promise(function (resolve) {
            console.log(res);

            if (res.error) {
              _this.apiCommons.presentAlert('Error:<br>' + (res.error.message != undefined ? res.error.message : res.message ? res.message : "Error Unknow: " + JSON.stringify(res.error, null, 2)));
            } else if (res.response_data) {
              if (res.button.command === "LOGIN") {
                _this.checkRight(res.response_data);
              }

              if (res.button.command === "CREATE-USER") {
                _this.saveToken(res.button.token, res.response_data.data);

                _this.apiCommons.showToast('Tạo mới thành công', 3000);
              }

              if (res.button.command === "EDIT-USER") {
                _this.userInfo = res.response_data.data;

                _this.mainService.saveUserInfo(_this.userInfo);

                _this.apiCommons.showToast('Cập nhật thành công', 3000);

                _this.showUserInfo();
              }
            } // close form


            resolve({
              next: "CLOSE"
            });
          });
        }.bind(this);
      }

      _createClass(LoginPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this2 = this;

          setTimeout(function () {
            _this2.userInfo = _this2.mainService.getUserInfo();

            _this2.showUserInfo();
          }, 1000);
        }
        /**
         * xử lý nút bấm
         * @param btn
         */

      }, {
        key: "onClick",
        value: function onClick(btn) {
          // lệnh login
          if (btn.command === 'LOGIN') {
            this.login();
          } // lệnh logout


          if (btn.command === 'LOGOUT') {
            this.mainService.logout();
            this.userInfo = null;
            this.formLogin = {
              title: "LOGIN",
              color: 'primary',
              items: [{
                type: "button",
                options: [{
                  name: "Đăng nhập",
                  command: "LOGIN"
                }]
              }]
            };
          } // sửa thông tin user


          if (btn.command === 'EDIT' && this.userInfo) {
            this.editUser();
          }
        }
        /**
         * Gọi chức năng login
         */

      }, {
        key: "login",
        value: function login() {
          var form = {
            title: 'Login',
            buttons: [{
              color: 'danger',
              icon: 'close',
              next: 'CLOSE'
            }],
            items: [{
              type: 'title',
              name: 'Nhập user của email @mobifone.vn'
            }, // form login gồm nhập username và password
            {
              type: 'text',
              key: 'username',
              name: 'Tên đăng nhập:',
              hint: 'Vui lòng nhập tên đăng nhập!',
              icon: 'contact',
              validators: [{
                required: true,
                min: 1,
                max: 30
              }]
            }, {
              type: "password",
              key: "password",
              name: "Mật khẩu",
              hint: "Vui lòng nhập mật khẩu!",
              icon: "key",
              validators: [{
                required: true,
                min: 1,
                max: 20
              }]
            }, {
              type: 'button',
              options: [{
                name: 'Đăng nhập',
                next: 'CALLBACK',
                url: this.apiAuth.serviceUrls.AUTH_SERVER + '/login',
                command: 'LOGIN'
              }]
            }]
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

      }, {
        key: "showUserInfo",
        value: function showUserInfo() {
          if (this.userInfo) {
            this.formLogin = {
              title: "ĐÃ ĐĂNG NHẬP",
              color: 'primary',
              items: [{
                type: 'barcode',
                value: this.userInfo.username
              }, {
                type: "details",
                details: [{
                  name: "Username(*)",
                  value: this.userInfo.username
                }, {
                  name: "Họ và tên(*)",
                  value: this.userInfo.fullname
                }, {
                  name: "Nickname(*)",
                  value: this.userInfo.nickname
                }, {
                  name: "Địa chỉ(*)",
                  value: this.userInfo.address
                }, {
                  name: "Điện thoại(*)",
                  value: this.userInfo.phone
                }, {
                  name: "Email(*)",
                  value: this.userInfo.email
                }]
              }, {
                id: "avatar",
                type: "image-viewer",
                name: "ẢNH ĐẠI DIỆN",
                value: this.userInfo.avatar ? this.userInfo.avatar : "assets/imgs/avatar.jpg"
              }, {
                id: "background",
                type: "image-viewer",
                name: "ẢNH NỀN",
                value: this.userInfo.background ? this.userInfo.background : "assets/imgs/background-idea.jpg"
              }, {
                type: "button",
                options: [{
                  name: "Sửa (*)",
                  command: "EDIT"
                }, {
                  name: "Logout",
                  command: "LOGOUT"
                }]
              }]
            };
          } else {
            this.login();
          }
        }
        /**
         * Lưu trữ token và userInfo
         * @param token
         * @param userInfo
         */

      }, {
        key: "saveToken",
        value: function saveToken(token, userInfo) {
          // console.log(token, userInfo);
          this.userInfo = userInfo;
          this.mainService.saveToken(token, userInfo);
          this.showUserInfo();
        }
        /**
         * Sửa thông tin cá nhân
         */

      }, {
        key: "editUser",
        value: function editUser() {
          var form = {
            title: "SỬA THÔNG TIN CÁ NHÂN",
            buttons: [{
              color: 'danger',
              icon: 'close',
              next: 'CLOSE'
            }],
            items: [{
              name: "Cập nhập các thông tin sau",
              type: "title"
            }, {
              key: "nickname",
              value: this.userInfo.nickname,
              name: "Biệt danh",
              hint: "Nickname",
              type: "text",
              input_type: "text",
              icon: "heart",
              validators: [{
                required: true,
                min: 1
              }]
            }, {
              key: "fullname",
              value: this.userInfo.fullname,
              name: "Họ và tên",
              hint: "Họ và tên đầy đủ",
              type: "text",
              input_type: "text",
              icon: "person",
              validators: [{
                required: true,
                min: 1
              }]
            }, {
              key: "address",
              value: this.userInfo.address,
              name: "Địa chỉ",
              hint: "Địa chỉ đầy đủ",
              type: "text",
              input_type: "text",
              icon: "pin",
              validators: [{
                required: true,
                min: 1
              }]
            }, {
              key: "phone",
              value: this.userInfo.phone,
              name: "Điện thoại liên hệ",
              hint: "Yêu cầu định dạng số điện thoại nhé",
              type: "text",
              input_type: "tel",
              icon: "call",
              validators: [{
                pattern: "^[0-9]*$"
              }]
            }, {
              key: "email",
              value: this.userInfo.email,
              name: "email",
              hint: "Yêu cầu định dạng email nhé",
              type: "text",
              input_type: "email",
              icon: "mail",
              validators: [{
                pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              }]
            }, {
              key: "avatar",
              type: "image",
              name: "ẢNH ĐẠI DIỆN",
              value: this.userInfo.avatar ? this.userInfo.avatar : "assets/imgs/avatar.jpg",
              options: {
                ratio: 1 / 1,
                max_width: 80
              }
            }, {
              key: "background",
              type: "image",
              name: "ẢNH NỀN",
              value: this.userInfo.background ? this.userInfo.background : "assets/imgs/background-idea.jpg",
              options: {
                ratio: 16 / 9,
                max_width: 300
              }
            }, {
              type: "button",
              options: [{
                name: "Reset",
                next: "RESET"
              }, {
                name: "Cập nhật",
                command: "EDIT-USER",
                url: this.apiAuth.serviceUrls.AUTH_SERVER + "/edit-user",
                token: true,
                next: "CALLBACK"
              }]
            }]
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

      }, {
        key: "createNewUser",
        value: function createNewUser(username, token) {
          var form = {
            title: "TẠO THÔNG TIN CÁ NHÂN",
            buttons: [{
              color: 'danger',
              icon: 'close',
              next: 'CLOSE'
            }],
            items: [{
              name: "Điền đầy đủ thông tin sau",
              type: "title"
            }, {
              key: "nickname",
              name: "Biệt danh",
              hint: "Nickname",
              type: "text",
              input_type: "text",
              icon: "heart",
              validators: [{
                required: true,
                min: 1
              }]
            }, {
              key: "fullname",
              name: "Họ và tên",
              hint: "Họ và tên đầy đủ",
              type: "text",
              input_type: "text",
              icon: "person",
              validators: [{
                required: true,
                min: 1
              }]
            }, {
              key: "address",
              name: "Địa chỉ",
              hint: "Địa chỉ đầy đủ",
              type: "text",
              input_type: "text",
              icon: "pin",
              validators: [{
                required: true,
                min: 1
              }]
            }, {
              key: "phone",
              name: "Điện thoại liên hệ",
              hint: "Yêu cầu định dạng số điện thoại nhé",
              type: "text",
              input_type: "tel",
              icon: "call",
              validators: [{
                pattern: "^[0-9]*$"
              }]
            }, {
              key: "email",
              value: username + "@mobifone.vn",
              name: "email",
              hint: "Yêu cầu định dạng email nhé",
              type: "text",
              input_type: "email",
              icon: "mail",
              validators: [{
                pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              }]
            }, {
              key: "avatar",
              type: "image",
              name: "ẢNH ĐẠI DIỆN",
              value: "assets/imgs/avatar.jpg"
            }, {
              key: "background",
              type: "image",
              name: "ẢNH NỀN",
              value: "assets/imgs/background-idea.jpg"
            }, {
              type: "button",
              options: [{
                name: "Tạo mới",
                command: "CREATE-USER",
                url: this.apiAuth.serviceUrls.AUTH_SERVER + "/create-user",
                token: token,
                next: "CALLBACK"
              }]
            }]
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

      }, {
        key: "checkRight",
        value: function checkRight(resData) {
          var _this3 = this;

          // Kiểm tra đã có username trong csdl chưa để xác nhận đăng nhập hoặc đăng ký username mới
          this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.AUTH_SERVER + '/get-user-info', resData.token).then(function (result) {
            // console.log('result: ', result);
            if (result && result.status === 'OK') {
              if (result.data) {
                // login thanh cong
                _this3.saveToken(resData.token, result.data);

                _this3.apiCommons.showToast('Login thành công', 3000);
              } else {
                _this3.apiCommons.showToast('Login thất bại', 2000); //Gọi lại form login


                _this3.login();
              }
            } else {
              // Chưa có user cần khai báo
              _this3.createNewUser(resData.username, resData.token);
            }
          })["catch"](function (err) {
            console.log('Lỗi: ', err);

            _this3.apiCommons.showToast('Lỗi login!', 3000);
          });
        }
      }]);

      return LoginPage;
    }();

    LoginPage.ctorParameters = function () {
      return [{
        type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["CommonsService"]
      }, {
        type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]
      }, {
        type: _services_main_service__WEBPACK_IMPORTED_MODULE_3__["MainService"]
      }];
    };

    LoginPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-login',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./login.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/login/login.page.html"))["default"],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./login.page.scss */
      "./src/app/main-entry/login/login.page.scss"))["default"]]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["CommonsService"], ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], _services_main_service__WEBPACK_IMPORTED_MODULE_3__["MainService"]])], LoginPage);
    /***/
  }
}]);
//# sourceMappingURL=main-entry-login-login-module-es5.js.map