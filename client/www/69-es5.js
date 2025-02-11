function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[69], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-tab_2.entry.js":
  /*!**************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-tab_2.entry.js ***!
    \**************************************************************/

  /*! exports provided: ion_tab, ion_tabs */

  /***/
  function node_modulesIonicCoreDistEsmIonTab_2EntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_tab", function () {
      return Tab;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_tabs", function () {
      return Tabs;
    });
    /* harmony import */


    var _core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./core-feeeff0d.js */
    "./node_modules/@ionic/core/dist/esm/core-feeeff0d.js");
    /* harmony import */


    var _config_3c7f3790_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ./config-3c7f3790.js */
    "./node_modules/@ionic/core/dist/esm/config-3c7f3790.js");
    /* harmony import */


    var _framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./framework-delegate-c2e2e1f4.js */
    "./node_modules/@ionic/core/dist/esm/framework-delegate-c2e2e1f4.js");

    var Tab = /*#__PURE__*/function () {
      function Tab(hostRef) {
        _classCallCheck(this, Tab);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.loaded = false;
        /** @internal */

        this.active = false;
      }

      _createClass(Tab, [{
        key: "componentWillLoad",
        value: function componentWillLoad() {}
        /** Set the active component for the tab */

      }, {
        key: "setActive",
        value: function () {
          var _setActive = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.prepareLazyLoaded();

                  case 2:
                    this.active = true;

                  case 3:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function setActive() {
            return _setActive.apply(this, arguments);
          }

          return setActive;
        }()
      }, {
        key: "prepareLazyLoaded",
        value: function prepareLazyLoaded() {
          if (!this.loaded && this.component != null) {
            this.loaded = true;

            try {
              return Object(_framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_2__["a"])(this.delegate, this.el, this.component, ['ion-page']);
            } catch (e) {
              console.error(e);
            }
          }

          return Promise.resolve(undefined);
        }
      }, {
        key: "render",
        value: function render() {
          var tab = this.tab,
              active = this.active,
              component = this.component;
          return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
            role: "tabpanel",
            "aria-hidden": !active ? 'true' : null,
            "aria-labelledby": "tab-button-".concat(tab),
            "class": {
              'ion-page': component === undefined,
              'tab-hidden': !active
            }
          }, Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null));
        }
      }, {
        key: "el",
        get: function get() {
          return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
        }
      }], [{
        key: "style",
        get: function get() {
          return ":host(.tab-hidden){display:none!important}";
        }
      }]);

      return Tab;
    }();

    var Tabs = /*#__PURE__*/function () {
      function Tabs(hostRef) {
        var _this = this;

        _classCallCheck(this, Tabs);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.transitioning = false;
        /** @internal */

        this.useRouter = false;

        this.onTabClicked = function (ev) {
          var _ev$detail = ev.detail,
              href = _ev$detail.href,
              tab = _ev$detail.tab;

          if (_this.useRouter && href !== undefined) {
            var router = document.querySelector('ion-router');

            if (router) {
              router.push(href);
            }
          } else {
            _this.select(tab);
          }
        };

        this.ionNavWillLoad = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionNavWillLoad", 7);
        this.ionTabsWillChange = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionTabsWillChange", 3);
        this.ionTabsDidChange = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionTabsDidChange", 3);
      }

      _createClass(Tabs, [{
        key: "componentWillLoad",
        value: function () {
          var _componentWillLoad = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            var tabs;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!this.useRouter) {
                      this.useRouter = !!document.querySelector('ion-router') && !this.el.closest('[no-router]');
                    }

                    if (this.useRouter) {
                      _context2.next = 5;
                      break;
                    }

                    tabs = this.tabs;
                    _context2.next = 5;
                    return this.select(tabs[0]);

                  case 5:
                    this.ionNavWillLoad.emit();

                  case 6:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function componentWillLoad() {
            return _componentWillLoad.apply(this, arguments);
          }

          return componentWillLoad;
        }()
      }, {
        key: "componentWillRender",
        value: function componentWillRender() {
          var tabBar = this.el.querySelector('ion-tab-bar');

          if (tabBar) {
            var tab = this.selectedTab ? this.selectedTab.tab : undefined;
            tabBar.selectedTab = tab;
          }
        }
        /**
         * Select a tab by the value of its `tab` property or an element reference.
         *
         * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
         */

      }, {
        key: "select",
        value: function () {
          var _select = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(tab) {
            var selectedTab;
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    selectedTab = _getTab(this.tabs, tab);

                    if (this.shouldSwitch(selectedTab)) {
                      _context3.next = 3;
                      break;
                    }

                    return _context3.abrupt("return", false);

                  case 3:
                    _context3.next = 5;
                    return this.setActive(selectedTab);

                  case 5:
                    _context3.next = 7;
                    return this.notifyRouter();

                  case 7:
                    this.tabSwitch();
                    return _context3.abrupt("return", true);

                  case 9:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          function select(_x) {
            return _select.apply(this, arguments);
          }

          return select;
        }()
        /**
         * Get a specific tab by the value of its `tab` property or an element reference.
         *
         * @param tab The tab instance to select. If passed a string, it should be the value of the tab's `tab` property.
         */

      }, {
        key: "getTab",
        value: function () {
          var _getTab2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(tab) {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    return _context4.abrupt("return", _getTab(this.tabs, tab));

                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          function getTab(_x2) {
            return _getTab2.apply(this, arguments);
          }

          return getTab;
        }()
        /**
         * Get the currently selected tab.
         */

      }, {
        key: "getSelected",
        value: function getSelected() {
          return Promise.resolve(this.selectedTab ? this.selectedTab.tab : undefined);
        }
        /** @internal */

      }, {
        key: "setRouteId",
        value: function () {
          var _setRouteId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(id) {
            var _this2 = this;

            var selectedTab;
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    selectedTab = _getTab(this.tabs, id);

                    if (this.shouldSwitch(selectedTab)) {
                      _context5.next = 3;
                      break;
                    }

                    return _context5.abrupt("return", {
                      changed: false,
                      element: this.selectedTab
                    });

                  case 3:
                    _context5.next = 5;
                    return this.setActive(selectedTab);

                  case 5:
                    return _context5.abrupt("return", {
                      changed: true,
                      element: this.selectedTab,
                      markVisible: function markVisible() {
                        return _this2.tabSwitch();
                      }
                    });

                  case 6:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));

          function setRouteId(_x3) {
            return _setRouteId.apply(this, arguments);
          }

          return setRouteId;
        }()
        /** @internal */

      }, {
        key: "getRouteId",
        value: function () {
          var _getRouteId = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            var tabId;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    tabId = this.selectedTab && this.selectedTab.tab;
                    return _context6.abrupt("return", tabId !== undefined ? {
                      id: tabId,
                      element: this.selectedTab
                    } : undefined);

                  case 2:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          function getRouteId() {
            return _getRouteId.apply(this, arguments);
          }

          return getRouteId;
        }()
      }, {
        key: "setActive",
        value: function setActive(selectedTab) {
          if (this.transitioning) {
            return Promise.reject('transitioning already happening');
          }

          this.transitioning = true;
          this.leavingTab = this.selectedTab;
          this.selectedTab = selectedTab;
          this.ionTabsWillChange.emit({
            tab: selectedTab.tab
          });
          return selectedTab.setActive();
        }
      }, {
        key: "tabSwitch",
        value: function tabSwitch() {
          var selectedTab = this.selectedTab;
          var leavingTab = this.leavingTab;
          this.leavingTab = undefined;
          this.transitioning = false;

          if (!selectedTab) {
            return;
          }

          if (leavingTab !== selectedTab) {
            if (leavingTab) {
              leavingTab.active = false;
            }

            this.ionTabsDidChange.emit({
              tab: selectedTab.tab
            });
          }
        }
      }, {
        key: "notifyRouter",
        value: function notifyRouter() {
          if (this.useRouter) {
            var router = document.querySelector('ion-router');

            if (router) {
              return router.navChanged('forward');
            }
          }

          return Promise.resolve(false);
        }
      }, {
        key: "shouldSwitch",
        value: function shouldSwitch(selectedTab) {
          var leavingTab = this.selectedTab;
          return selectedTab !== undefined && selectedTab !== leavingTab && !this.transitioning;
        }
      }, {
        key: "tabs",
        get: function get() {
          return Array.from(this.el.querySelectorAll('ion-tab'));
        }
      }, {
        key: "render",
        value: function render() {
          return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
            onIonTabButtonClick: this.onTabClicked
          }, Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
            name: "top"
          }), Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
            "class": "tabs-inner"
          }, Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)), Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
            name: "bottom"
          }));
        }
      }, {
        key: "el",
        get: function get() {
          return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
        }
      }], [{
        key: "style",
        get: function get() {
          return ":host{left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%;z-index:0}.tabs-inner,:host{contain:layout size style}.tabs-inner{position:relative;-ms-flex:1;flex:1}";
        }
      }]);

      return Tabs;
    }();

    var _getTab = function _getTab(tabs, tab) {
      var tabEl = typeof tab === 'string' ? tabs.find(function (t) {
        return t.tab === tab;
      }) : tab;

      if (!tabEl) {
        console.error("tab with id: \"".concat(tabEl, "\" does not exist"));
      }

      return tabEl;
    };
    /***/

  }
}]);
//# sourceMappingURL=69-es5.js.map