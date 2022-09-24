function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-action-sheet-controller_8.entry.js":
  /*!**********************************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-action-sheet-controller_8.entry.js ***!
    \**********************************************************************************/

  /*! exports provided: ion_action_sheet_controller, ion_alert_controller, ion_anchor, ion_loading_controller, ion_modal_controller, ion_picker_controller, ion_popover_controller, ion_toast_controller */

  /***/
  function node_modulesIonicCoreDistEsmIonActionSheetController_8EntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_action_sheet_controller", function () {
      return ActionSheetController;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_alert_controller", function () {
      return AlertController;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_anchor", function () {
      return Anchor;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_loading_controller", function () {
      return LoadingController;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_modal_controller", function () {
      return ModalController;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_picker_controller", function () {
      return PickerController;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_popover_controller", function () {
      return PopoverController;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_toast_controller", function () {
      return ToastController;
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


    var _overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./overlays-10640d86.js */
    "./node_modules/@ionic/core/dist/esm/overlays-10640d86.js");
    /* harmony import */


    var _theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./theme-18cbe2cc.js */
    "./node_modules/@ionic/core/dist/esm/theme-18cbe2cc.js");

    var ActionSheetController = /*#__PURE__*/function () {
      function ActionSheetController(hostRef) {
        _classCallCheck(this, ActionSheetController);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
      }
      /**
       * Create an action sheet overlay with action sheet options.
       *
       * @param options The options to use to create the action sheet.
       */


      _createClass(ActionSheetController, [{
        key: "create",
        value: function create(options) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["h"])('ion-action-sheet', options);
        }
        /**
         * Dismiss the open action sheet overlay.
         *
         * @param data Any data to emit in the dismiss events.
         * @param role The role of the element that is dismissing the action sheet.
         * This can be useful in a button handler for determining which button was
         * clicked to dismiss the action sheet.
         * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
         * @param id The id of the action sheet to dismiss. If an id is not provided, it will dismiss the most recently opened action sheet.
         */

      }, {
        key: "dismiss",
        value: function dismiss(data, role, id) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["j"])(document, data, role, 'ion-action-sheet', id);
        }
        /**
         * Get the most recently opened action sheet overlay.
         */

      }, {
        key: "getTop",
        value: function () {
          var _getTop = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    return _context.abrupt("return", Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["k"])(document, 'ion-action-sheet'));

                  case 1:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function getTop() {
            return _getTop.apply(this, arguments);
          }

          return getTop;
        }()
      }]);

      return ActionSheetController;
    }();

    var AlertController = /*#__PURE__*/function () {
      function AlertController(hostRef) {
        _classCallCheck(this, AlertController);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
      }
      /**
       * Create an alert overlay with alert options.
       *
       * @param options The options to use to create the alert.
       */


      _createClass(AlertController, [{
        key: "create",
        value: function create(options) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["h"])('ion-alert', options);
        }
        /**
         * Dismiss the open alert overlay.
         *
         * @param data Any data to emit in the dismiss events.
         * @param role The role of the element that is dismissing the alert.
         * This can be useful in a button handler for determining which button was
         * clicked to dismiss the alert.
         * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
         * @param id The id of the alert to dismiss. If an id is not provided, it will dismiss the most recently opened alert.
         */

      }, {
        key: "dismiss",
        value: function dismiss(data, role, id) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["j"])(document, data, role, 'ion-alert', id);
        }
        /**
         * Get the most recently opened alert overlay.
         */

      }, {
        key: "getTop",
        value: function () {
          var _getTop2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    return _context2.abrupt("return", Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["k"])(document, 'ion-alert'));

                  case 1:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2);
          }));

          function getTop() {
            return _getTop2.apply(this, arguments);
          }

          return getTop;
        }()
      }]);

      return AlertController;
    }();

    var Anchor = /*#__PURE__*/function () {
      function Anchor(hostRef) {
        var _this = this;

        _classCallCheck(this, Anchor);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */

        this.routerDirection = 'forward';

        this.onClick = function (ev) {
          Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["o"])(_this.href, ev, _this.routerDirection);
        };
      }

      _createClass(Anchor, [{
        key: "componentDidLoad",
        value: function componentDidLoad() {
          console.warn('[DEPRECATED][ion-anchor] The <ion-anchor> component has been deprecated. Please use an <ion-router-link> if you are using a vanilla JS or Stencil project or an <a> with the Angular router.');
        }
      }, {
        key: "render",
        value: function render() {
          var _Object$assign;

          var mode = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
          var attrs = {
            href: this.href,
            rel: this.rel
          };
          return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
            onClick: this.onClick,
            "class": Object.assign(Object.assign({}, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["c"])(this.color)), (_Object$assign = {}, _defineProperty(_Object$assign, mode, true), _defineProperty(_Object$assign, 'ion-activatable', true), _Object$assign))
          }, Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("a", Object.assign({}, attrs), Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", null)));
        }
      }], [{
        key: "style",
        get: function get() {
          return ":host{--background:transparent;--color:var(--ion-color-primary,#3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}";
        }
      }]);

      return Anchor;
    }();

    var LoadingController = /*#__PURE__*/function () {
      function LoadingController(hostRef) {
        _classCallCheck(this, LoadingController);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
      }
      /**
       * Create a loading overlay with loading options.
       *
       * @param options The options to use to create the loading.
       */


      _createClass(LoadingController, [{
        key: "create",
        value: function create(options) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["h"])('ion-loading', options);
        }
        /**
         * Dismiss the open loading overlay.
         *
         * @param data Any data to emit in the dismiss events.
         * @param role The role of the element that is dismissing the loading.
         * This can be useful in a button handler for determining which button was
         * clicked to dismiss the loading.
         * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
         * @param id The id of the loading to dismiss. If an id is not provided, it will dismiss the most recently opened loading.
         */

      }, {
        key: "dismiss",
        value: function dismiss(data, role, id) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["j"])(document, data, role, 'ion-loading', id);
        }
        /**
         * Get the most recently opened loading overlay.
         */

      }, {
        key: "getTop",
        value: function () {
          var _getTop3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    return _context3.abrupt("return", Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["k"])(document, 'ion-loading'));

                  case 1:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3);
          }));

          function getTop() {
            return _getTop3.apply(this, arguments);
          }

          return getTop;
        }()
      }]);

      return LoadingController;
    }();

    var ModalController = /*#__PURE__*/function () {
      function ModalController(hostRef) {
        _classCallCheck(this, ModalController);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
      }
      /**
       * Create a modal overlay with modal options.
       *
       * @param options The options to use to create the modal.
       */


      _createClass(ModalController, [{
        key: "create",
        value: function create(options) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["h"])('ion-modal', options);
        }
        /**
         * Dismiss the open modal overlay.
         *
         * @param data Any data to emit in the dismiss events.
         * @param role The role of the element that is dismissing the modal.
         * This can be useful in a button handler for determining which button was
         * clicked to dismiss the modal.
         * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
         * @param id The id of the modal to dismiss. If an id is not provided, it will dismiss the most recently opened modal.
         */

      }, {
        key: "dismiss",
        value: function dismiss(data, role, id) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["j"])(document, data, role, 'ion-modal', id);
        }
        /**
         * Get the most recently opened modal overlay.
         */

      }, {
        key: "getTop",
        value: function () {
          var _getTop4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    return _context4.abrupt("return", Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["k"])(document, 'ion-modal'));

                  case 1:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4);
          }));

          function getTop() {
            return _getTop4.apply(this, arguments);
          }

          return getTop;
        }()
      }]);

      return ModalController;
    }();

    var PickerController = /*#__PURE__*/function () {
      function PickerController(hostRef) {
        _classCallCheck(this, PickerController);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
      }
      /**
       * Create a picker overlay with picker options.
       *
       * @param options The options to use to create the picker.
       */


      _createClass(PickerController, [{
        key: "create",
        value: function create(options) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["h"])('ion-picker', options);
        }
        /**
         * Dismiss the open picker overlay.
         *
         * @param data Any data to emit in the dismiss events.
         * @param role The role of the element that is dismissing the picker.
         * This can be useful in a button handler for determining which button was
         * clicked to dismiss the picker.
         * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
         * @param id The id of the picker to dismiss. If an id is not provided, it will dismiss the most recently opened picker.
         */

      }, {
        key: "dismiss",
        value: function dismiss(data, role, id) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["j"])(document, data, role, 'ion-picker', id);
        }
        /**
         * Get the most recently opened picker overlay.
         */

      }, {
        key: "getTop",
        value: function () {
          var _getTop5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    return _context5.abrupt("return", Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["k"])(document, 'ion-picker'));

                  case 1:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5);
          }));

          function getTop() {
            return _getTop5.apply(this, arguments);
          }

          return getTop;
        }()
      }]);

      return PickerController;
    }();

    var PopoverController = /*#__PURE__*/function () {
      function PopoverController(hostRef) {
        _classCallCheck(this, PopoverController);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
      }
      /**
       * Create a popover overlay with popover options.
       *
       * @param options The options to use to create the popover.
       */


      _createClass(PopoverController, [{
        key: "create",
        value: function create(options) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["h"])('ion-popover', options);
        }
        /**
         * Dismiss the open popover overlay.
         *
         * @param data Any data to emit in the dismiss events.
         * @param role The role of the element that is dismissing the popover.
         * This can be useful in a button handler for determining which button was
         * clicked to dismiss the popover.
         * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
         * @param id The id of the popover to dismiss. If an id is not provided, it will dismiss the most recently opened popover.
         */

      }, {
        key: "dismiss",
        value: function dismiss(data, role, id) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["j"])(document, data, role, 'ion-popover', id);
        }
        /**
         * Get the most recently opened popover overlay.
         */

      }, {
        key: "getTop",
        value: function () {
          var _getTop6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    return _context6.abrupt("return", Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["k"])(document, 'ion-popover'));

                  case 1:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6);
          }));

          function getTop() {
            return _getTop6.apply(this, arguments);
          }

          return getTop;
        }()
      }]);

      return PopoverController;
    }();

    var ToastController = /*#__PURE__*/function () {
      function ToastController(hostRef) {
        _classCallCheck(this, ToastController);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
      }
      /**
       * Create a toast overlay with toast options.
       *
       * @param options The options to use to create the toast.
       */


      _createClass(ToastController, [{
        key: "create",
        value: function create(options) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["h"])('ion-toast', options);
        }
        /**
         * Dismiss the open toast overlay.
         *
         * @param data Any data to emit in the dismiss events.
         * @param role The role of the element that is dismissing the toast. For example, 'cancel' or 'backdrop'.
         * @param id The id of the toast to dismiss. If an id is not provided, it will dismiss the most recently opened toast.
         */

      }, {
        key: "dismiss",
        value: function dismiss(data, role, id) {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["j"])(document, data, role, 'ion-toast', id);
        }
        /**
         * Get the most recently opened toast overlay.
         */

      }, {
        key: "getTop",
        value: function () {
          var _getTop7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    return _context7.abrupt("return", Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_2__["k"])(document, 'ion-toast'));

                  case 1:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7);
          }));

          function getTop() {
            return _getTop7.apply(this, arguments);
          }

          return getTop;
        }()
      }]);

      return ToastController;
    }();
    /***/

  }
}]);
//# sourceMappingURL=0-es5.js.map