function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main-entry-home-user-activity-user-activity-module"], {
  /***/
  "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/home/user-activity/user-activity.page.html":
  /*!*************************************************************************************************************!*\
    !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/home/user-activity/user-activity.page.html ***!
    \*************************************************************************************************************/

  /*! exports provided: default */

  /***/
  function node_modulesRawLoaderDistCjsJsSrcAppMainEntryHomeUserActivityUserActivityPageHtml(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "<ion-header>\n  <ion-toolbar>\n    <ion-title>Hoạt động của thành viên</ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <!-- Hieu Add Table Bootstrap -->\n  <!-- TABLE BEGIN ------------------------------------------------------------------------------->\n  <ion-row>\n    <ion-col size-lg=\"12\">\n      <div class=\"main-card mb-3 card\">\n        <div class=\"card-header\">\n          <div class=\"row\">\n            <div class=\"col-md-6\">\n              <div\n                class=\"card-header-title font-size-md text-capitalize font-weight-normal\"\n              >\n                Hoạt động\n              </div>\n            </div>\n            <div class=\"col-md-6\">\n              <div class=\"form-group row\">\n                <div class=\"text-center col-md-3 offset-2\">\n                  <label>Tìm kiếm</label>\n                </div>\n                <div class=\"col-md-6\">\n                  <input type=\"text\" (input) = \"onFilterNameString($event)\" class=\"form-control\" >\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <div class=\"table-responsive\">\n          <table\n            class=\"align-middle text-truncate mb-0 table table-borderless table-hover\"\n          >\n            <thead>\n              <tr>\n                <th class=\"d-none d-lg-table-cell text-center\">#</th>\n                <th class=\"text-center\">Avatar</th>\n                <th class=\"text-center\">Tên</th>\n                <th class=\"d-none d-lg-table-cell text-center\">Ý tưởng</th>\n                <th class=\"d-none d-lg-table-cell text-center\">Vote</th>\n                <th class=\"d-none d-lg-table-cell text-center\">Comment</th>\n                <!-- <th class=\"text-center\">SL YT Đã Cmt</th> -->\n                <th class=\"text-center\">Điểm</th>\n                <!-- <th class=\"text-center\">Hạng</th> -->\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let user of userActionFilterArr; let i = index\">\n                <td\n                  class=\"d-none d-lg-table-cell text-center text-muted\"\n                  style=\"width: 50px;\"\n                >\n                  {{i+1}}\n                </td>\n                <td class=\"text-center\" style=\"width: 20px;\">\n                  <img\n                    width=\"25\"\n                    class=\"rounded-circle\"\n                    src=\"{{user?.avatar}}\"\n                    alt=\"\"\n                  />\n                </td>\n                <td class=\"text-center\">\n                  <a [routerLink]=\"\">{{user.fullname}}</a>\n                </td>\n                <td class=\"d-none d-lg-table-cell text-center\">\n                  <div class=\"badge badge-pill badge-success\">\n                    {{user.count_ideas}}\n                  </div>\n                </td>\n\n                <td class=\"d-none d-lg-table-cell text-center\">\n                  <div class=\"badge badge-pill badge-secondary\">\n                    {{user.count_voted}}\n                  </div>\n                </td>\n                <td class=\"d-none d-lg-table-cell text-center\">\n                  <div class=\"badge badge-pill badge-danger\">\n                    {{user.count_commented}}\n                  </div>\n                </td>\n                <!-- <td class=\"text-center\">\n                  <div class=\"badge badge-pill badge-warning\">{{user.count_commented_ideas}}</div>\n                </td> -->\n                <td class=\"text-center\">\n                  <div class=\"badge badge-pill badge-warning\">\n                    {{user.total_action}}\n                  </div>\n                </td>\n                <!-- <td *ngIf=\"i === 0\" class=\"text-center\" style=\"width: 30px;\">\n                  <img\n                    width=\"25\"\n                    class=\"rounded-circle\"\n                    src=\"assets/imgs/1st.png\"\n                    alt=\"\"\n                  />\n                </td>\n                <td *ngIf=\"i === 1\" class=\"text-center\" style=\"width: 30px;\">\n                  <img\n                    width=\"25\"\n                    class=\"rounded-circle\"\n                    src=\"assets/imgs/2nd.png\"\n                    alt=\"\"\n                  />\n                </td>\n                <td *ngIf=\"i === 2\" class=\"text-center\" style=\"width: 30px;\">\n                  <img\n                    width=\"25\"\n                    class=\"rounded-circle\"\n                    src=\"assets/imgs/3rd.png\"\n                    alt=\"\"\n                  />\n                </td> -->\n              </tr>\n            </tbody>\n          </table>\n        </div>\n        <div class=\"d-block p-4 text-center card-footer\">\n          <!-- pager -->\n          <ul *ngIf=\"pagination.pages && pagination.pages.length\" class=\"pagination\">\n            <li [ngClass]=\"{disabled:pagination.currentPage === 1}\">\n                <a (click)=\"setPage(1)\">First</a>\n            </li>\n            <li [ngClass]=\"{disabled:pagination.currentPage === 1}\">\n                <a (click)=\"setPage(pagination.currentPage - 1)\">Previous</a>\n            </li>\n            <li *ngFor=\"let page of pagination.pages\" [ngClass]=\"{active:pagination.currentPage === page}\">\n                <a (click)=\"setPage(page)\">{{page}}</a>\n            </li>\n            <li [ngClass]=\"{disabled:pagination.currentPage === pagination.totalPages}\">\n                <a (click)=\"setPage(pagination.currentPage + 1)\">Next</a>\n            </li>\n            <li [ngClass]=\"{disabled:pagination.currentPage === pagination.totalPages}\">\n                <a (click)=\"setPage(pagination.totalPages)\">Last</a>\n            </li>\n        </ul>\n        </div>\n      </div>\n    </ion-col>\n  </ion-row>\n  <!-- TABLE END ------------------------------------------------------------------------------->\n</ion-content>\n";
    /***/
  },

  /***/
  "./src/app/main-entry/home/user-activity/user-activity-routing.module.ts":
  /*!*******************************************************************************!*\
    !*** ./src/app/main-entry/home/user-activity/user-activity-routing.module.ts ***!
    \*******************************************************************************/

  /*! exports provided: UserActivityPageRoutingModule */

  /***/
  function srcAppMainEntryHomeUserActivityUserActivityRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UserActivityPageRoutingModule", function () {
      return UserActivityPageRoutingModule;
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


    var _user_activity_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./user-activity.page */
    "./src/app/main-entry/home/user-activity/user-activity.page.ts");

    var routes = [{
      path: '',
      component: _user_activity_page__WEBPACK_IMPORTED_MODULE_3__["UserActivityPage"]
    }];

    var UserActivityPageRoutingModule = function UserActivityPageRoutingModule() {
      _classCallCheck(this, UserActivityPageRoutingModule);
    };

    UserActivityPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
      exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })], UserActivityPageRoutingModule);
    /***/
  },

  /***/
  "./src/app/main-entry/home/user-activity/user-activity.module.ts":
  /*!***********************************************************************!*\
    !*** ./src/app/main-entry/home/user-activity/user-activity.module.ts ***!
    \***********************************************************************/

  /*! exports provided: UserActivityPageModule */

  /***/
  function srcAppMainEntryHomeUserActivityUserActivityModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UserActivityPageModule", function () {
      return UserActivityPageModule;
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


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/fesm2015/forms.js");
    /* harmony import */


    var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @ionic/angular */
    "./node_modules/@ionic/angular/dist/fesm5.js");
    /* harmony import */


    var _user_activity_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./user-activity-routing.module */
    "./src/app/main-entry/home/user-activity/user-activity-routing.module.ts");
    /* harmony import */


    var _user_activity_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./user-activity.page */
    "./src/app/main-entry/home/user-activity/user-activity.page.ts");

    var UserActivityPageModule = function UserActivityPageModule() {
      _classCallCheck(this, UserActivityPageModule);
    };

    UserActivityPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"], _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"], _user_activity_routing_module__WEBPACK_IMPORTED_MODULE_5__["UserActivityPageRoutingModule"]],
      declarations: [_user_activity_page__WEBPACK_IMPORTED_MODULE_6__["UserActivityPage"]]
    })], UserActivityPageModule);
    /***/
  },

  /***/
  "./src/app/main-entry/home/user-activity/user-activity.page.scss":
  /*!***********************************************************************!*\
    !*** ./src/app/main-entry/home/user-activity/user-activity.page.scss ***!
    \***********************************************************************/

  /*! exports provided: default */

  /***/
  function srcAppMainEntryHomeUserActivityUserActivityPageScss(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony default export */


    __webpack_exports__["default"] = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4tZW50cnkvaG9tZS91c2VyLWFjdGl2aXR5L3VzZXItYWN0aXZpdHkucGFnZS5zY3NzIn0= */";
    /***/
  },

  /***/
  "./src/app/main-entry/home/user-activity/user-activity.page.ts":
  /*!*********************************************************************!*\
    !*** ./src/app/main-entry/home/user-activity/user-activity.page.ts ***!
    \*********************************************************************/

  /*! exports provided: UserActivityPage */

  /***/
  function srcAppMainEntryHomeUserActivityUserActivityPageTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "UserActivityPage", function () {
      return UserActivityPage;
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


    var src_app_services_pagination_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! src/app/services/pagination.service */
    "./src/app/services/pagination.service.ts");

    var UserActivityPage =
    /*#__PURE__*/
    function () {
      function UserActivityPage(apiAuth, pageService) {
        _classCallCheck(this, UserActivityPage);

        this.apiAuth = apiAuth;
        this.pageService = pageService;
        this.userNameSearch = '';
        this.pagination = {};
      }

      _createClass(UserActivityPage, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          this.init();
        }
      }, {
        key: "setPage",
        value: function setPage(page) {
          // get pager object from service
          this.pagination = this.pageService.getPager(this.userActions.length, page); // get current page of items

          this.pagedItems = this.userActions.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
        }
      }, {
        key: "onFilterNameString",
        value: function onFilterNameString(event) {
          this.userNameSearch = event.target.value;

          if (this.userActions.length === 0 || this.userNameSearch === '') {
            this.userActionFilterArr = this.userActions;
            this.setPage(1); // console.log(this.userActionFilterArr)
          } else {
            var resultArray = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.userActions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var item = _step.value;

                if (item.fullname.toLowerCase().includes(this.userNameSearch.toLowerCase())) {
                  resultArray.push(item);
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            this.userActionFilterArr = resultArray;
          }
        }
      }, {
        key: "init",
        value: function init() {
          var _this = this;

          this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-top-actions").then(function (data) {
            console.log('Data: ', data);
            _this.userActions = data;
            _this.userActionFilterArr = data;

            _this.setPage(1);
          }).catch(function (err) {// console.log('Lỗi: ', err);
          });
        }
      }]);

      return UserActivityPage;
    }();

    UserActivityPage.ctorParameters = function () {
      return [{
        type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"]
      }, {
        type: src_app_services_pagination_service__WEBPACK_IMPORTED_MODULE_3__["PagerService"]
      }];
    };

    UserActivityPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
      selector: 'app-user-activity',
      template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! raw-loader!./user-activity.page.html */
      "./node_modules/raw-loader/dist/cjs.js!./src/app/main-entry/home/user-activity/user-activity.page.html")).default,
      providers: [src_app_services_pagination_service__WEBPACK_IMPORTED_MODULE_3__["PagerService"]],
      styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(
      /*! ./user-activity.page.scss */
      "./src/app/main-entry/home/user-activity/user-activity.page.scss")).default]
    }), tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_2__["AuthService"], src_app_services_pagination_service__WEBPACK_IMPORTED_MODULE_3__["PagerService"]])], UserActivityPage);
    /***/
  },

  /***/
  "./src/app/services/pagination.service.ts":
  /*!************************************************!*\
    !*** ./src/app/services/pagination.service.ts ***!
    \************************************************/

  /*! exports provided: PagerService */

  /***/
  function srcAppServicesPaginationServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "PagerService", function () {
      return PagerService;
    });
    /* harmony import */


    var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! tslib */
    "./node_modules/tslib/tslib.es6.js");

    var PagerService =
    /*#__PURE__*/
    function () {
      function PagerService() {
        _classCallCheck(this, PagerService);
      }

      _createClass(PagerService, [{
        key: "getPager",
        value: function getPager(totalItems) {
          var currentPage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
          var pageSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
          // calculate total pages
          var totalPages = Math.ceil(totalItems / pageSize); // ensure current page isn't out of range

          if (currentPage < 1) {
            currentPage = 1;
          } else if (currentPage > totalPages) {
            currentPage = totalPages;
          }

          var startPage, endPage;

          if (totalPages <= 10) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage = totalPages;
          } else {
            // more than 10 total pages so calculate start and end pages
            if (currentPage <= 6) {
              startPage = 1;
              endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
              startPage = totalPages - 9;
              endPage = totalPages;
            } else {
              startPage = currentPage - 5;
              endPage = currentPage + 4;
            }
          } // calculate start and end item indexes


          var startIndex = (currentPage - 1) * pageSize;
          var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1); // create an array of pages to ng-repeat in the pager control

          var pages = Array.from(Array(endPage + 1 - startPage).keys()).map(function (i) {
            return startPage + i;
          }); // return object with all pager properties required by the view

          return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
          };
        }
      }]);

      return PagerService;
    }();
    /***/

  }
}]);
//# sourceMappingURL=main-entry-home-user-activity-user-activity-module-es5.js.map