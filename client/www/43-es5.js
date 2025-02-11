function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[43], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-popover-md.entry.js":
  /*!*******************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-popover-md.entry.js ***!
    \*******************************************************************/

  /*! exports provided: ion_popover */

  /***/
  function node_modulesIonicCoreDistEsmIonPopoverMdEntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_popover", function () {
      return Popover;
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


    var _animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ./animation-af478fe9.js */
    "./node_modules/@ionic/core/dist/esm/animation-af478fe9.js");
    /* harmony import */


    var _constants_3c3e1099_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! ./constants-3c3e1099.js */
    "./node_modules/@ionic/core/dist/esm/constants-3c3e1099.js");
    /* harmony import */


    var _overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ./overlays-10640d86.js */
    "./node_modules/@ionic/core/dist/esm/overlays-10640d86.js");
    /* harmony import */


    var _theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./theme-18cbe2cc.js */
    "./node_modules/@ionic/core/dist/esm/theme-18cbe2cc.js");
    /* harmony import */


    var _framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./framework-delegate-c2e2e1f4.js */
    "./node_modules/@ionic/core/dist/esm/framework-delegate-c2e2e1f4.js");
    /* harmony import */


    var _index_4d91f03a_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./index-4d91f03a.js */
    "./node_modules/@ionic/core/dist/esm/index-4d91f03a.js");
    /**
     * iOS Popover Enter Animation
     */


    var iosEnterAnimation = function iosEnterAnimation(baseEl, ev) {
      var originY = 'top';
      var originX = 'left';
      var contentEl = baseEl.querySelector('.popover-content');
      var contentDimentions = contentEl.getBoundingClientRect();
      var contentWidth = contentDimentions.width;
      var contentHeight = contentDimentions.height;
      var bodyWidth = baseEl.ownerDocument.defaultView.innerWidth;
      var bodyHeight = baseEl.ownerDocument.defaultView.innerHeight; // If ev was passed, use that for target element

      var targetDim = ev && ev.target && ev.target.getBoundingClientRect();
      var targetTop = targetDim != null && 'top' in targetDim ? targetDim.top : bodyHeight / 2 - contentHeight / 2;
      var targetLeft = targetDim != null && 'left' in targetDim ? targetDim.left : bodyWidth / 2;
      var targetWidth = targetDim && targetDim.width || 0;
      var targetHeight = targetDim && targetDim.height || 0;
      var arrowEl = baseEl.querySelector('.popover-arrow');
      var arrowDim = arrowEl.getBoundingClientRect();
      var arrowWidth = arrowDim.width;
      var arrowHeight = arrowDim.height;

      if (targetDim == null) {
        arrowEl.style.display = 'none';
      }

      var arrowCSS = {
        top: targetTop + targetHeight,
        left: targetLeft + targetWidth / 2 - arrowWidth / 2
      };
      var popoverCSS = {
        top: targetTop + targetHeight + (arrowHeight - 1),
        left: targetLeft + targetWidth / 2 - contentWidth / 2
      }; // If the popover left is less than the padding it is off screen
      // to the left so adjust it, else if the width of the popover
      // exceeds the body width it is off screen to the right so adjust
      //

      var checkSafeAreaLeft = false;
      var checkSafeAreaRight = false; // If the popover left is less than the padding it is off screen
      // to the left so adjust it, else if the width of the popover
      // exceeds the body width it is off screen to the right so adjust
      // 25 is a random/arbitrary number. It seems to work fine for ios11
      // and iPhoneX. Is it perfect? No. Does it work? Yes.

      if (popoverCSS.left < POPOVER_IOS_BODY_PADDING + 25) {
        checkSafeAreaLeft = true;
        popoverCSS.left = POPOVER_IOS_BODY_PADDING;
      } else if (contentWidth + POPOVER_IOS_BODY_PADDING + popoverCSS.left + 25 > bodyWidth) {
        // Ok, so we're on the right side of the screen,
        // but now we need to make sure we're still a bit further right
        // cus....notchurally... Again, 25 is random. It works tho
        checkSafeAreaRight = true;
        popoverCSS.left = bodyWidth - contentWidth - POPOVER_IOS_BODY_PADDING;
        originX = 'right';
      } // make it pop up if there's room above


      if (targetTop + targetHeight + contentHeight > bodyHeight && targetTop - contentHeight > 0) {
        arrowCSS.top = targetTop - (arrowHeight + 1);
        popoverCSS.top = targetTop - contentHeight - (arrowHeight - 1);
        baseEl.className = baseEl.className + ' popover-bottom';
        originY = 'bottom'; // If there isn't room for it to pop up above the target cut it off
      } else if (targetTop + targetHeight + contentHeight > bodyHeight) {
        contentEl.style.bottom = POPOVER_IOS_BODY_PADDING + '%';
      }

      arrowEl.style.top = arrowCSS.top + 'px';
      arrowEl.style.left = arrowCSS.left + 'px';
      contentEl.style.top = popoverCSS.top + 'px';
      contentEl.style.left = popoverCSS.left + 'px';

      if (checkSafeAreaLeft) {
        contentEl.style.left = "calc(".concat(popoverCSS.left, "px + var(--ion-safe-area-left, 0px))");
      }

      if (checkSafeAreaRight) {
        contentEl.style.left = "calc(".concat(popoverCSS.left, "px - var(--ion-safe-area-right, 0px))");
      }

      contentEl.style.transformOrigin = originY + ' ' + originX;
      var baseAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      var backdropAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      var wrapperAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      backdropAnimation.addElement(baseEl.querySelector('ion-backdrop')).fromTo('opacity', 0.01, 0.08);
      wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper')).fromTo('opacity', 0.01, 1);
      return baseAnimation.addElement(baseEl).easing('ease').duration(100).addAnimation([backdropAnimation, wrapperAnimation]);
    };

    var POPOVER_IOS_BODY_PADDING = 5;
    /**
     * iOS Popover Leave Animation
     */

    var iosLeaveAnimation = function iosLeaveAnimation(baseEl) {
      var baseAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      var backdropAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      var wrapperAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      backdropAnimation.addElement(baseEl.querySelector('ion-backdrop')).fromTo('opacity', 0.08, 0);
      wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper')).fromTo('opacity', 0.99, 0);
      return baseAnimation.addElement(baseEl).easing('ease').duration(500).addAnimation([backdropAnimation, wrapperAnimation]);
    };
    /**
     * Md Popover Enter Animation
     */


    var mdEnterAnimation = function mdEnterAnimation(baseEl, ev) {
      var POPOVER_MD_BODY_PADDING = 12;
      var doc = baseEl.ownerDocument;
      var isRTL = doc.dir === 'rtl';
      var originY = 'top';
      var originX = isRTL ? 'right' : 'left';
      var contentEl = baseEl.querySelector('.popover-content');
      var contentDimentions = contentEl.getBoundingClientRect();
      var contentWidth = contentDimentions.width;
      var contentHeight = contentDimentions.height;
      var bodyWidth = doc.defaultView.innerWidth;
      var bodyHeight = doc.defaultView.innerHeight; // If ev was passed, use that for target element

      var targetDim = ev && ev.target && ev.target.getBoundingClientRect(); // As per MD spec, by default position the popover below the target (trigger) element

      var targetTop = targetDim != null && 'bottom' in targetDim ? targetDim.bottom : bodyHeight / 2 - contentHeight / 2;
      var targetLeft = targetDim != null && 'left' in targetDim ? isRTL ? targetDim.left - contentWidth + targetDim.width : targetDim.left : bodyWidth / 2 - contentWidth / 2;
      var targetHeight = targetDim && targetDim.height || 0;
      var popoverCSS = {
        top: targetTop,
        left: targetLeft
      }; // If the popover left is less than the padding it is off screen
      // to the left so adjust it, else if the width of the popover
      // exceeds the body width it is off screen to the right so adjust

      if (popoverCSS.left < POPOVER_MD_BODY_PADDING) {
        popoverCSS.left = POPOVER_MD_BODY_PADDING; // Same origin in this case for both LTR & RTL
        // Note: in LTR, originX is already 'left'

        originX = 'left';
      } else if (contentWidth + POPOVER_MD_BODY_PADDING + popoverCSS.left > bodyWidth) {
        popoverCSS.left = bodyWidth - contentWidth - POPOVER_MD_BODY_PADDING; // Same origin in this case for both LTR & RTL
        // Note: in RTL, originX is already 'right'

        originX = 'right';
      } // If the popover when popped down stretches past bottom of screen,
      // make it pop up if there's room above


      if (targetTop + targetHeight + contentHeight > bodyHeight && targetTop - contentHeight > 0) {
        popoverCSS.top = targetTop - contentHeight - targetHeight;
        baseEl.className = baseEl.className + ' popover-bottom';
        originY = 'bottom'; // If there isn't room for it to pop up above the target cut it off
      } else if (targetTop + targetHeight + contentHeight > bodyHeight) {
        contentEl.style.bottom = POPOVER_MD_BODY_PADDING + 'px';
      }

      var baseAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      var backdropAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      var wrapperAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      var contentAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      var viewportAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      backdropAnimation.addElement(baseEl.querySelector('ion-backdrop')).fromTo('opacity', 0.01, 0.32);
      wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper')).fromTo('opacity', 0.01, 1);
      contentAnimation.addElement(contentEl).beforeStyles({
        'top': "".concat(popoverCSS.top, "px"),
        'left': "".concat(popoverCSS.left, "px"),
        'transform-origin': "".concat(originY, " ").concat(originX)
      }).fromTo('transform', 'scale(0.001)', 'scale(1)');
      viewportAnimation.addElement(baseEl.querySelector('.popover-viewport')).fromTo('opacity', 0.01, 1);
      return baseAnimation.addElement(baseEl).easing('cubic-bezier(0.36,0.66,0.04,1)').duration(300).addAnimation([backdropAnimation, wrapperAnimation, contentAnimation, viewportAnimation]);
    };
    /**
     * Md Popover Leave Animation
     */


    var mdLeaveAnimation = function mdLeaveAnimation(baseEl) {
      var baseAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      var backdropAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      var wrapperAnimation = Object(_animation_af478fe9_js__WEBPACK_IMPORTED_MODULE_3__["c"])();
      backdropAnimation.addElement(baseEl.querySelector('ion-backdrop')).fromTo('opacity', 0.32, 0);
      wrapperAnimation.addElement(baseEl.querySelector('.popover-wrapper')).fromTo('opacity', 0.99, 0);
      return baseAnimation.addElement(baseEl).easing('ease').duration(500).addAnimation([backdropAnimation, wrapperAnimation]);
    };

    var Popover = /*#__PURE__*/function () {
      function Popover(hostRef) {
        var _this = this;

        _classCallCheck(this, Popover);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.presented = false;
        this.mode = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
        /**
         * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
         */

        this.keyboardClose = true;
        /**
         * If `true`, the popover will be dismissed when the backdrop is clicked.
         */

        this.backdropDismiss = true;
        /**
         * If `true`, a backdrop will be displayed behind the popover.
         */

        this.showBackdrop = true;
        /**
         * If `true`, the popover will be translucent.
         * Only applies when the mode is `"ios"` and the device supports
         * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
         */

        this.translucent = false;
        /**
         * If `true`, the popover will animate.
         */

        this.animated = true;

        this.onDismiss = function (ev) {
          ev.stopPropagation();
          ev.preventDefault();

          _this.dismiss();
        };

        this.onBackdropTap = function () {
          _this.dismiss(undefined, _overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_5__["B"]);
        };

        this.onLifecycle = function (modalEvent) {
          var el = _this.usersElement;
          var name = LIFECYCLE_MAP[modalEvent.type];

          if (el && name) {
            var event = new CustomEvent(name, {
              bubbles: false,
              cancelable: false,
              detail: modalEvent.detail
            });
            el.dispatchEvent(event);
          }
        };

        Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_5__["d"])(this.el);
        this.didPresent = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionPopoverDidPresent", 7);
        this.willPresent = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionPopoverWillPresent", 7);
        this.willDismiss = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionPopoverWillDismiss", 7);
        this.didDismiss = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionPopoverDidDismiss", 7);
      }
      /**
       * Present the popover overlay after it has been created.
       */


      _createClass(Popover, [{
        key: "present",
        value: function () {
          var _present = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var container, data;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (!this.presented) {
                      _context.next = 2;
                      break;
                    }

                    return _context.abrupt("return");

                  case 2:
                    container = this.el.querySelector('.popover-content');

                    if (container) {
                      _context.next = 5;
                      break;
                    }

                    throw new Error('container is undefined');

                  case 5:
                    data = Object.assign(Object.assign({}, this.componentProps), {
                      popover: this.el
                    });
                    _context.next = 8;
                    return Object(_framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_7__["a"])(this.delegate, container, this.component, ['popover-viewport', this.el['s-sc']], data);

                  case 8:
                    this.usersElement = _context.sent;
                    _context.next = 11;
                    return Object(_index_4d91f03a_js__WEBPACK_IMPORTED_MODULE_8__["d"])(this.usersElement);

                  case 11:
                    return _context.abrupt("return", Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_5__["e"])(this, 'popoverEnter', iosEnterAnimation, mdEnterAnimation, this.event));

                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));

          function present() {
            return _present.apply(this, arguments);
          }

          return present;
        }()
        /**
         * Dismiss the popover overlay after it has been presented.
         *
         * @param data Any data to emit in the dismiss events.
         * @param role The role of the element that is dismissing the popover. For example, 'cancel' or 'backdrop'.
         */

      }, {
        key: "dismiss",
        value: function () {
          var _dismiss = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(data, role) {
            var shouldDismiss;
            return _regeneratorRuntime().wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_5__["f"])(this, data, role, 'popoverLeave', iosLeaveAnimation, mdLeaveAnimation, this.event);

                  case 2:
                    shouldDismiss = _context2.sent;

                    if (!shouldDismiss) {
                      _context2.next = 6;
                      break;
                    }

                    _context2.next = 6;
                    return Object(_framework_delegate_c2e2e1f4_js__WEBPACK_IMPORTED_MODULE_7__["d"])(this.delegate, this.usersElement);

                  case 6:
                    return _context2.abrupt("return", shouldDismiss);

                  case 7:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));

          function dismiss(_x, _x2) {
            return _dismiss.apply(this, arguments);
          }

          return dismiss;
        }()
        /**
         * Returns a promise that resolves when the popover did dismiss.
         */

      }, {
        key: "onDidDismiss",
        value: function onDidDismiss() {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_5__["g"])(this.el, 'ionPopoverDidDismiss');
        }
        /**
         * Returns a promise that resolves when the popover will dismiss.
         */

      }, {
        key: "onWillDismiss",
        value: function onWillDismiss() {
          return Object(_overlays_10640d86_js__WEBPACK_IMPORTED_MODULE_5__["g"])(this.el, 'ionPopoverWillDismiss');
        }
      }, {
        key: "render",
        value: function render() {
          var _Object$assign;

          var mode = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
          var onLifecycle = this.onLifecycle;
          return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["H"], {
            "aria-modal": "true",
            "no-router": true,
            style: {
              zIndex: "".concat(20000 + this.overlayIndex)
            },
            "class": Object.assign(Object.assign({}, Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_6__["g"])(this.cssClass)), (_Object$assign = {}, _defineProperty(_Object$assign, mode, true), _defineProperty(_Object$assign, 'popover-translucent', this.translucent), _Object$assign)),
            onIonPopoverDidPresent: onLifecycle,
            onIonPopoverWillPresent: onLifecycle,
            onIonPopoverWillDismiss: onLifecycle,
            onIonPopoverDidDismiss: onLifecycle,
            onIonDismiss: this.onDismiss,
            onIonBackdropTap: this.onBackdropTap
          }, Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("ion-backdrop", {
            tappable: this.backdropDismiss,
            visible: this.showBackdrop
          }), Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
            "class": "popover-wrapper"
          }, Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
            "class": "popover-arrow"
          }), Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["h"])("div", {
            "class": "popover-content"
          })));
        }
      }, {
        key: "el",
        get: function get() {
          return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
        }
      }], [{
        key: "style",
        get: function get() {
          return ".sc-ion-popover-md-h{--background:var(--ion-background-color,#fff);--min-width:0;--min-height:0;--max-width:auto;--height:auto;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:fixed;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--ion-text-color,#000);z-index:1001}.overlay-hidden.sc-ion-popover-md-h{display:none}.popover-wrapper.sc-ion-popover-md{opacity:0;z-index:10}.popover-content.sc-ion-popover-md{display:-ms-flexbox;display:flex;position:absolute;-ms-flex-direction:column;flex-direction:column;width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:auto;z-index:10}.popover-viewport.sc-ion-popover-md{--ion-safe-area-top:0px;--ion-safe-area-right:0px;--ion-safe-area-bottom:0px;--ion-safe-area-left:0px}.sc-ion-popover-md-h{--width:250px;--max-height:90%;--box-shadow:0 5px 5px -3px rgba(0,0,0,0.2),0 8px 10px 1px rgba(0,0,0,0.14),0 3px 14px 2px rgba(0,0,0,0.12)}.popover-content.sc-ion-popover-md{border-radius:4px;-webkit-transform-origin:left top;transform-origin:left top}[dir=rtl].sc-ion-popover-md-h .popover-content.sc-ion-popover-md, [dir=rtl] .sc-ion-popover-md-h .popover-content.sc-ion-popover-md, [dir=rtl].sc-ion-popover-md .popover-content.sc-ion-popover-md{-webkit-transform-origin:right top;transform-origin:right top}.popover-viewport.sc-ion-popover-md{-webkit-transition-delay:.1s;transition-delay:.1s}";
        }
      }]);

      return Popover;
    }();

    var LIFECYCLE_MAP = {
      'ionPopoverDidPresent': 'ionViewDidEnter',
      'ionPopoverWillPresent': 'ionViewWillEnter',
      'ionPopoverWillDismiss': 'ionViewWillLeave',
      'ionPopoverDidDismiss': 'ionViewDidLeave'
    };
    /***/
  }
}]);
//# sourceMappingURL=43-es5.js.map