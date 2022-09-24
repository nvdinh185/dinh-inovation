function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[49], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-range-md.entry.js":
  /*!*****************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-range-md.entry.js ***!
    \*****************************************************************/

  /*! exports provided: ion_range */

  /***/
  function node_modulesIonicCoreDistEsmIonRangeMdEntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_range", function () {
      return Range;
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


    var _helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./helpers-46f4a262.js */
    "./node_modules/@ionic/core/dist/esm/helpers-46f4a262.js");
    /* harmony import */


    var _theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./theme-18cbe2cc.js */
    "./node_modules/@ionic/core/dist/esm/theme-18cbe2cc.js");

    var Range = /*#__PURE__*/function () {
      function Range(hostRef) {
        var _this = this;

        _classCallCheck(this, Range);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.noUpdate = false;
        this.hasFocus = false;
        this.ratioA = 0;
        this.ratioB = 0;
        /**
         * How long, in milliseconds, to wait to trigger the
         * `ionChange` event after each change in the range value.
         */

        this.debounce = 0;
        /**
         * The name of the control, which is submitted with the form data.
         */

        this.name = '';
        /**
         * Show two knobs.
         */

        this.dualKnobs = false;
        /**
         * Minimum integer value of the range.
         */

        this.min = 0;
        /**
         * Maximum integer value of the range.
         */

        this.max = 100;
        /**
         * If `true`, a pin with integer value is shown when the knob
         * is pressed.
         */

        this.pin = false;
        /**
         * If `true`, the knob snaps to tick marks evenly spaced based
         * on the step property value.
         */

        this.snaps = false;
        /**
         * Specifies the value granularity.
         */

        this.step = 1;
        /**
         * If `true`, tick marks are displayed based on the step value.
         * Only applies when `snaps` is `true`.
         */

        this.ticks = true;
        /**
         * If `true`, the user cannot interact with the range.
         */

        this.disabled = false;
        /**
         * the value of the range.
         */

        this.value = 0;

        this.clampBounds = function (value) {
          return Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["c"])(_this.min, value, _this.max);
        };

        this.ensureValueInBounds = function (value) {
          if (_this.dualKnobs) {
            return {
              lower: _this.clampBounds(value.lower),
              upper: _this.clampBounds(value.upper)
            };
          } else {
            return _this.clampBounds(value);
          }
        };

        this.handleKeyboard = function (knob, isIncrease) {
          var step = _this.step;
          step = step > 0 ? step : 1;
          step = step / (_this.max - _this.min);

          if (!isIncrease) {
            step *= -1;
          }

          if (knob === 'A') {
            _this.ratioA = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["c"])(0, _this.ratioA + step, 1);
          } else {
            _this.ratioB = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["c"])(0, _this.ratioB + step, 1);
          }

          _this.updateValue();
        };

        this.onBlur = function () {
          if (_this.hasFocus) {
            _this.hasFocus = false;

            _this.ionBlur.emit();

            _this.emitStyle();
          }
        };

        this.onFocus = function () {
          if (!_this.hasFocus) {
            _this.hasFocus = true;

            _this.ionFocus.emit();

            _this.emitStyle();
          }
        };

        this.ionChange = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionChange", 7);
        this.ionStyle = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionStyle", 7);
        this.ionFocus = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionFocus", 7);
        this.ionBlur = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionBlur", 7);
      }

      _createClass(Range, [{
        key: "debounceChanged",
        value: function debounceChanged() {
          this.ionChange = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["d"])(this.ionChange, this.debounce);
        }
      }, {
        key: "minChanged",
        value: function minChanged() {
          if (!this.noUpdate) {
            this.updateRatio();
          }
        }
      }, {
        key: "maxChanged",
        value: function maxChanged() {
          if (!this.noUpdate) {
            this.updateRatio();
          }
        }
      }, {
        key: "disabledChanged",
        value: function disabledChanged() {
          if (this.gesture) {
            this.gesture.setDisabled(this.disabled);
          }

          this.emitStyle();
        }
      }, {
        key: "valueChanged",
        value: function valueChanged(value) {
          if (!this.noUpdate) {
            this.updateRatio();
          }

          value = this.ensureValueInBounds(value);
          this.ionChange.emit({
            value: value
          });
        }
      }, {
        key: "connectedCallback",
        value: function connectedCallback() {
          this.updateRatio();
          this.debounceChanged();
          this.disabledChanged();
        }
      }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {
          if (this.gesture) {
            this.gesture.destroy();
            this.gesture = undefined;
          }
        }
      }, {
        key: "componentDidLoad",
        value: function () {
          var _componentDidLoad = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _this2 = this;

            var rangeSlider;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    rangeSlider = this.rangeSlider;

                    if (!rangeSlider) {
                      _context.next = 6;
                      break;
                    }

                    _context.next = 4;
                    return Promise.resolve().then(__webpack_require__.bind(null,
                    /*! ./index-624eea58.js */
                    "./node_modules/@ionic/core/dist/esm/index-624eea58.js"));

                  case 4:
                    this.gesture = _context.sent.createGesture({
                      el: rangeSlider,
                      gestureName: 'range',
                      gesturePriority: 100,
                      threshold: 0,
                      onStart: function onStart(ev) {
                        return _this2.onStart(ev);
                      },
                      onMove: function onMove(ev) {
                        return _this2.onMove(ev);
                      },
                      onEnd: function onEnd(ev) {
                        return _this2.onEnd(ev);
                      }
                    });
                    this.gesture.setDisabled(this.disabled);

                  case 6:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function componentDidLoad() {
            return _componentDidLoad.apply(this, arguments);
          }

          return componentDidLoad;
        }()
      }, {
        key: "getValue",
        value: function getValue() {
          var value = this.value || 0;

          if (this.dualKnobs) {
            if (typeof value === 'object') {
              return value;
            }

            return {
              lower: 0,
              upper: value
            };
          } else {
            if (typeof value === 'object') {
              return value.upper;
            }

            return value;
          }
        }
      }, {
        key: "emitStyle",
        value: function emitStyle() {
          this.ionStyle.emit({
            'interactive': true,
            'interactive-disabled': this.disabled
          });
        }
      }, {
        key: "onStart",
        value: function onStart(detail) {
          var rect = this.rect = this.rangeSlider.getBoundingClientRect();
          var currentX = detail.currentX; // figure out which knob they started closer to

          var ratio = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["c"])(0, (currentX - rect.left) / rect.width, 1);

          if (document.dir === 'rtl') {
            ratio = 1 - ratio;
          }

          this.pressedKnob = !this.dualKnobs || Math.abs(this.ratioA - ratio) < Math.abs(this.ratioB - ratio) ? 'A' : 'B';
          this.setFocus(this.pressedKnob); // update the active knob's position

          this.update(currentX);
        }
      }, {
        key: "onMove",
        value: function onMove(detail) {
          this.update(detail.currentX);
        }
      }, {
        key: "onEnd",
        value: function onEnd(detail) {
          this.update(detail.currentX);
          this.pressedKnob = undefined;
        }
      }, {
        key: "update",
        value: function update(currentX) {
          // figure out where the pointer is currently at
          // update the knob being interacted with
          var rect = this.rect;
          var ratio = Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["c"])(0, (currentX - rect.left) / rect.width, 1);

          if (document.dir === 'rtl') {
            ratio = 1 - ratio;
          }

          if (this.snaps) {
            // snaps the ratio to the current value
            ratio = valueToRatio(ratioToValue(ratio, this.min, this.max, this.step), this.min, this.max);
          } // update which knob is pressed


          if (this.pressedKnob === 'A') {
            this.ratioA = ratio;
          } else {
            this.ratioB = ratio;
          } // Update input value


          this.updateValue();
        }
      }, {
        key: "valA",
        get: function get() {
          return ratioToValue(this.ratioA, this.min, this.max, this.step);
        }
      }, {
        key: "valB",
        get: function get() {
          return ratioToValue(this.ratioB, this.min, this.max, this.step);
        }
      }, {
        key: "ratioLower",
        get: function get() {
          if (this.dualKnobs) {
            return Math.min(this.ratioA, this.ratioB);
          }

          return 0;
        }
      }, {
        key: "ratioUpper",
        get: function get() {
          if (this.dualKnobs) {
            return Math.max(this.ratioA, this.ratioB);
          }

          return this.ratioA;
        }
      }, {
        key: "updateRatio",
        value: function updateRatio() {
          var value = this.getValue();
          var min = this.min,
              max = this.max;

          if (this.dualKnobs) {
            this.ratioA = valueToRatio(value.lower, min, max);
            this.ratioB = valueToRatio(value.upper, min, max);
          } else {
            this.ratioA = valueToRatio(value, min, max);
          }
        }
      }, {
        key: "updateValue",
        value: function updateValue() {
          this.noUpdate = true;
          var valA = this.valA,
              valB = this.valB;
          this.value = !this.dualKnobs ? valA : {
            lower: Math.min(valA, valB),
            upper: Math.max(valA, valB)
          };
          this.noUpdate = false;
        }
      }, {
        key: "setFocus",
        value: function setFocus(knob) {
          if (this.el.shadowRoot) {
            var knobEl = this.el.shadowRoot.querySelector(knob === 'A' ? '.range-knob-a' : '.range-knob-b');

            if (knobEl) {
              knobEl.focus();
            }
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _barStyle,
              _Object$assign,
              _this3 = this;

          var min = this.min,
              max = this.max,
              step = this.step,
              el = this.el,
              handleKeyboard = this.handleKeyboard,
              pressedKnob = this.pressedKnob,
              disabled = this.disabled,
              pin = this.pin,
              ratioLower = this.ratioLower,
              ratioUpper = this.ratioUpper;
          var mode = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
          var barStart = "".concat(ratioLower * 100, "%");
          var barEnd = "".concat(100 - ratioUpper * 100, "%");
          var doc = document;
          var isRTL = doc.dir === 'rtl';
          var start = isRTL ? 'right' : 'left';
          var end = isRTL ? 'left' : 'right';

          var tickStyle = function tickStyle(tick) {
            return _defineProperty({}, start, tick[start]);
          };

          var barStyle = (_barStyle = {}, _defineProperty(_barStyle, start, barStart), _defineProperty(_barStyle, end, barEnd), _barStyle);
          var ticks = [];

          if (this.snaps && this.ticks) {
            for (var value = min; value <= max; value += step) {
              var ratio = valueToRatio(value, min, max);
              var tick = {
                ratio: ratio,
                active: ratio >= ratioLower && ratio <= ratioUpper
              };
              tick[start] = "".concat(ratio * 100, "%");
              ticks.push(tick);
            }
          }

          Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["a"])(true, el, this.name, JSON.stringify(this.getValue()), disabled);
          return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
            onFocusin: this.onFocus,
            onFocusout: this.onBlur,
            "class": Object.assign(Object.assign({}, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["c"])(this.color)), (_Object$assign = {}, _defineProperty(_Object$assign, mode, true), _defineProperty(_Object$assign, 'in-item', Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["h"])('ion-item', el)), _defineProperty(_Object$assign, 'range-disabled', disabled), _defineProperty(_Object$assign, 'range-pressed', pressedKnob !== undefined), _defineProperty(_Object$assign, 'range-has-pin', pin), _Object$assign))
          }, Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
            name: "start"
          }), Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
            "class": "range-slider",
            ref: function ref(rangeEl) {
              return _this3.rangeSlider = rangeEl;
            }
          }, ticks.map(function (tick) {
            return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
              style: tickStyle(tick),
              role: "presentation",
              "class": {
                'range-tick': true,
                'range-tick-active': tick.active
              }
            });
          }), Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
            "class": "range-bar",
            role: "presentation"
          }), Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
            "class": "range-bar range-bar-active",
            role: "presentation",
            style: barStyle
          }), renderKnob(isRTL, {
            knob: 'A',
            pressed: pressedKnob === 'A',
            value: this.valA,
            ratio: this.ratioA,
            pin: pin,
            disabled: disabled,
            handleKeyboard: handleKeyboard,
            min: min,
            max: max
          }), this.dualKnobs && renderKnob(isRTL, {
            knob: 'B',
            pressed: pressedKnob === 'B',
            value: this.valB,
            ratio: this.ratioB,
            pin: pin,
            disabled: disabled,
            handleKeyboard: handleKeyboard,
            min: min,
            max: max
          })), Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("slot", {
            name: "end"
          }));
        }
      }, {
        key: "el",
        get: function get() {
          return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
        }
      }], [{
        key: "watchers",
        get: function get() {
          return {
            "debounce": ["debounceChanged"],
            "min": ["minChanged"],
            "max": ["maxChanged"],
            "disabled": ["disabledChanged"],
            "value": ["valueChanged"]
          };
        }
      }, {
        key: "style",
        get: function get() {
          return ":host{--knob-handle-size:calc(var(--knob-size) * 2);display:-ms-flexbox;display:flex;position:relative;-ms-flex:3;flex:3;-ms-flex-align:center;align-items:center;font-family:var(--ion-font-family,inherit);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.range-disabled){pointer-events:none}::slotted(ion-label){-ms-flex:initial;flex:initial}::slotted(ion-icon[slot]){font-size:24px}.range-slider{position:relative;-ms-flex:1;flex:1;width:100%;height:var(--height);contain:size layout style;cursor:-webkit-grab;cursor:grab;-ms-touch-action:pan-y;touch-action:pan-y}:host(.range-pressed) .range-slider{cursor:-webkit-grabbing;cursor:grabbing}.range-pin{position:absolute;background:var(--ion-color-base);color:var(--ion-color-contrast);-webkit-box-sizing:border-box;box-sizing:border-box}.range-knob-handle{left:0;top:calc((var(--height) - var(--knob-handle-size)) / 2);margin-left:calc(0px - var(--knob-handle-size) / 2);position:absolute;width:var(--knob-handle-size);height:var(--knob-handle-size);text-align:center}:host-context([dir=rtl]) .range-knob-handle,[dir=rtl] .range-knob-handle{right:unset;right:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.range-knob-handle{margin-left:unset;-webkit-margin-start:calc(0px - var(--knob-handle-size) / 2);margin-inline-start:calc(0px - var(--knob-handle-size) / 2)}}:host-context([dir=rtl]) .range-knob-handle,[dir=rtl] .range-knob-handle{left:unset}.range-knob-handle:active,.range-knob-handle:focus{outline:none}.range-bar{border-radius:var(--bar-border-radius);left:0;top:calc((var(--height) - var(--bar-height)) / 2);position:absolute;width:100%;height:var(--bar-height);background:var(--bar-background);pointer-events:none}:host-context([dir=rtl]) .range-bar,[dir=rtl] .range-bar{right:unset;right:0;left:unset}.range-knob{border-radius:var(--knob-border-radius);left:calc(50% - var(--knob-size) / 2);top:calc(50% - var(--knob-size) / 2);position:absolute;width:var(--knob-size);height:var(--knob-size);background:var(--knob-background);-webkit-box-shadow:var(--knob-box-shadow);box-shadow:var(--knob-box-shadow);pointer-events:none}:host-context([dir=rtl]) .range-knob,[dir=rtl] .range-knob{right:unset;right:calc(50% - var(--knob-size) / 2);left:unset}:host(.range-pressed) .range-bar-active{will-change:left,right}:host(.in-item){width:100%}:host(.in-item) ::slotted(ion-label){-ms-flex-item-align:center;align-self:center}:host{--knob-border-radius:50%;--knob-background:var(--bar-background-active);--knob-box-shadow:none;--knob-size:18px;--bar-height:2px;--bar-background:rgba(var(--ion-color-primary-rgb,56,128,255),0.26);--bar-background-active:var(--ion-color-primary,#3880ff);--bar-border-radius:0;--height:42px;--pin-background:var(--ion-color-primary,#3880ff);--pin-color:var(--ion-color-primary-contrast,#fff);padding-left:14px;padding-right:14px;padding-top:8px;padding-bottom:8px;font-size:12px}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){:host{padding-left:unset;padding-right:unset;-webkit-padding-start:14px;padding-inline-start:14px;-webkit-padding-end:14px;padding-inline-end:14px}}:host(.ion-color) .range-bar{background:rgba(var(--ion-color-base-rgb),.26)}:host(.ion-color) .range-bar-active,:host(.ion-color) .range-knob,:host(.ion-color) .range-pin,:host(.ion-color) .range-pin:before,:host(.ion-color) .range-tick{background:var(--ion-color-base);color:var(--ion-color-contrast)}::slotted([slot=start]){margin-left:0;margin-right:14px;margin-top:0;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted([slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:0;margin-inline-start:0;-webkit-margin-end:14px;margin-inline-end:14px}}::slotted([slot=end]){margin-left:14px;margin-right:0;margin-top:0;margin-bottom:0}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){::slotted([slot=end]){margin-left:unset;margin-right:unset;-webkit-margin-start:14px;margin-inline-start:14px;-webkit-margin-end:0;margin-inline-end:0}}:host(.range-has-pin){padding-top:28px}.range-bar-active{bottom:0;width:auto;background:var(--bar-background-active)}.range-knob{-webkit-transform:scale(.67);transform:scale(.67);-webkit-transition-duration:.12s;transition-duration:.12s;-webkit-transition-property:background-color,border,-webkit-transform;transition-property:background-color,border,-webkit-transform;transition-property:transform,background-color,border;transition-property:transform,background-color,border,-webkit-transform;-webkit-transition-timing-function:ease;transition-timing-function:ease;z-index:2}.range-tick{position:absolute;top:calc((var(--height) - var(--bar-height)) / 2);width:var(--bar-height);height:var(--bar-height);background:var(--bar-background-active);z-index:1;pointer-events:none}.range-tick-active{background:transparent}.range-pin{padding-left:0;padding-right:0;padding-top:8px;padding-bottom:8px;border-radius:50%;-webkit-transform:translateZ(0) scale(.01);transform:translateZ(0) scale(.01);display:inline-block;position:relative;min-width:28px;height:28px;-webkit-transition:background .12s ease,-webkit-transform .12s ease;transition:background .12s ease,-webkit-transform .12s ease;transition:transform .12s ease,background .12s ease;transition:transform .12s ease,background .12s ease,-webkit-transform .12s ease;color:var(--pin-color);text-align:center}.range-pin,.range-pin:before{background:var(--pin-background)}.range-pin:before{left:50%;top:3px;margin-left:-13px;border-radius:50% 50% 50% 0;position:absolute;width:26px;height:26px;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);-webkit-transition:background .12s ease;transition:background .12s ease;content:\"\";z-index:-1}:host-context([dir=rtl]) .range-pin:before,[dir=rtl] .range-pin:before{right:unset;right:50%}\@supports ((-webkit-margin-start:0) or (margin-inline-start:0)) or (-webkit-margin-start:0){.range-pin:before{margin-left:unset;-webkit-margin-start:-13px;margin-inline-start:-13px}}:host-context([dir=rtl]) .range-pin:before,[dir=rtl] .range-pin:before{left:unset}.range-knob-pressed .range-pin{-webkit-transform:translate3d(0,-24px,0) scale(1);transform:translate3d(0,-24px,0) scale(1)}:host(:not(.range-has-pin)) .range-knob-pressed .range-knob{-webkit-transform:scale(1);transform:scale(1)}:host(.range-disabled) .range-bar,:host(.range-disabled) .range-bar-active,:host(.range-disabled) .range-knob,:host(.range-disabled) .range-tick{background-color:var(--ion-color-step-250,#bfbfbf)}:host(.range-disabled) .range-knob{-webkit-transform:scale(.55);transform:scale(.55);outline:5px solid #fff}";
        }
      }]);

      return Range;
    }();

    var renderKnob = function renderKnob(isRTL, _ref2) {
      var knob = _ref2.knob,
          value = _ref2.value,
          ratio = _ref2.ratio,
          min = _ref2.min,
          max = _ref2.max,
          disabled = _ref2.disabled,
          pressed = _ref2.pressed,
          pin = _ref2.pin,
          handleKeyboard = _ref2.handleKeyboard;
      var start = isRTL ? 'right' : 'left';

      var knobStyle = function knobStyle() {
        var style = {};
        style[start] = "".concat(ratio * 100, "%");
        return style;
      };

      return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        onKeyDown: function onKeyDown(ev) {
          var key = ev.key;

          if (key === 'ArrowLeft' || key === 'ArrowDown') {
            handleKeyboard(knob, false);
            ev.preventDefault();
            ev.stopPropagation();
          } else if (key === 'ArrowRight' || key === 'ArrowUp') {
            handleKeyboard(knob, true);
            ev.preventDefault();
            ev.stopPropagation();
          }
        },
        "class": {
          'range-knob-handle': true,
          'range-knob-a': knob === 'A',
          'range-knob-b': knob === 'B',
          'range-knob-pressed': pressed,
          'range-knob-min': value === min,
          'range-knob-max': value === max
        },
        style: knobStyle(),
        role: "slider",
        tabindex: disabled ? -1 : 0,
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-disabled": disabled ? 'true' : null,
        "aria-valuenow": value
      }, pin && Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        "class": "range-pin",
        role: "presentation"
      }, Math.round(value)), Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
        "class": "range-knob",
        role: "presentation"
      }));
    };

    var ratioToValue = function ratioToValue(ratio, min, max, step) {
      var value = (max - min) * ratio;

      if (step > 0) {
        value = Math.round(value / step) * step + min;
      }

      return Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["c"])(min, value, max);
    };

    var valueToRatio = function valueToRatio(value, min, max) {
      return Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["c"])(0, (value - min) / (max - min), 1);
    };
    /***/

  }
}]);
//# sourceMappingURL=49-es5.js.map