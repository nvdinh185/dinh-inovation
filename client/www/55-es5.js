function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[55], {
  /***/
  "./node_modules/@ionic/core/dist/esm/ion-route_4.entry.js":
  /*!****************************************************************!*\
    !*** ./node_modules/@ionic/core/dist/esm/ion-route_4.entry.js ***!
    \****************************************************************/

  /*! exports provided: ion_route, ion_route_redirect, ion_router, ion_router_link */

  /***/
  function node_modulesIonicCoreDistEsmIonRoute_4EntryJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_route", function () {
      return Route;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_route_redirect", function () {
      return RouteRedirect;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_router", function () {
      return Router;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ion_router_link", function () {
      return RouterLink;
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

    var Route = /*#__PURE__*/function () {
      function Route(hostRef) {
        _classCallCheck(this, Route);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * Relative path that needs to match in order for this route to apply.
         *
         * Accepts paths similar to expressjs so that you can define parameters
         * in the url /foo/:bar where bar would be available in incoming props.
         */

        this.url = '';
        this.ionRouteDataChanged = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionRouteDataChanged", 7);
      }

      _createClass(Route, [{
        key: "onUpdate",
        value: function onUpdate(newValue) {
          this.ionRouteDataChanged.emit(newValue);
        }
      }, {
        key: "onComponentProps",
        value: function onComponentProps(newValue, oldValue) {
          if (newValue === oldValue) {
            return;
          }

          var keys1 = newValue ? Object.keys(newValue) : [];
          var keys2 = oldValue ? Object.keys(oldValue) : [];

          if (keys1.length !== keys2.length) {
            this.onUpdate(newValue);
            return;
          }

          var _iterator = _createForOfIteratorHelper(keys1),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var key = _step.value;

              if (newValue[key] !== oldValue[key]) {
                this.onUpdate(newValue);
                return;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }, {
        key: "connectedCallback",
        value: function connectedCallback() {
          this.ionRouteDataChanged.emit();
        }
      }], [{
        key: "watchers",
        get: function get() {
          return {
            "url": ["onUpdate"],
            "component": ["onUpdate"],
            "componentProps": ["onComponentProps"]
          };
        }
      }]);

      return Route;
    }();

    var RouteRedirect = /*#__PURE__*/function () {
      function RouteRedirect(hostRef) {
        _classCallCheck(this, RouteRedirect);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.ionRouteRedirectChanged = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionRouteRedirectChanged", 7);
      }

      _createClass(RouteRedirect, [{
        key: "propDidChange",
        value: function propDidChange() {
          this.ionRouteRedirectChanged.emit();
        }
      }, {
        key: "connectedCallback",
        value: function connectedCallback() {
          this.ionRouteRedirectChanged.emit();
        }
      }], [{
        key: "watchers",
        get: function get() {
          return {
            "from": ["propDidChange"],
            "to": ["propDidChange"]
          };
        }
      }]);

      return RouteRedirect;
    }();

    var ROUTER_INTENT_NONE = 'root';
    var ROUTER_INTENT_FORWARD = 'forward';
    var ROUTER_INTENT_BACK = 'back';

    var generatePath = function generatePath(segments) {
      var path = segments.filter(function (s) {
        return s.length > 0;
      }).join('/');
      return '/' + path;
    };

    var chainToPath = function chainToPath(chain) {
      var path = [];

      var _iterator2 = _createForOfIteratorHelper(chain),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var route = _step2.value;

          var _iterator3 = _createForOfIteratorHelper(route.path),
              _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var segment = _step3.value;

              if (segment[0] === ':') {
                var param = route.params && route.params[segment.slice(1)];

                if (!param) {
                  return null;
                }

                path.push(param);
              } else if (segment !== '') {
                path.push(segment);
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return path;
    };

    var writePath = function writePath(history, root, useHash, path, direction, state) {
      var url = generatePath([].concat(_toConsumableArray(parsePath(root)), _toConsumableArray(path)));

      if (useHash) {
        url = '#' + url;
      }

      if (direction === ROUTER_INTENT_FORWARD) {
        history.pushState(state, '', url);
      } else {
        history.replaceState(state, '', url);
      }
    };

    var removePrefix = function removePrefix(prefix, path) {
      if (prefix.length > path.length) {
        return null;
      }

      if (prefix.length <= 1 && prefix[0] === '') {
        return path;
      }

      for (var i = 0; i < prefix.length; i++) {
        if (prefix[i].length > 0 && prefix[i] !== path[i]) {
          return null;
        }
      }

      if (path.length === prefix.length) {
        return [''];
      }

      return path.slice(prefix.length);
    };

    var readPath = function readPath(loc, root, useHash) {
      var pathname = loc.pathname;

      if (useHash) {
        var hash = loc.hash;
        pathname = hash[0] === '#' ? hash.slice(1) : '';
      }

      var prefix = parsePath(root);
      var path = parsePath(pathname);
      return removePrefix(prefix, path);
    };

    var parsePath = function parsePath(path) {
      if (path == null) {
        return [''];
      }

      var segments = path.split('/').map(function (s) {
        return s.trim();
      }).filter(function (s) {
        return s.length > 0;
      });

      if (segments.length === 0) {
        return [''];
      } else {
        return segments;
      }
    };

    var printRoutes = function printRoutes(routes) {
      console.group("[ion-core] ROUTES[".concat(routes.length, "]"));

      var _iterator4 = _createForOfIteratorHelper(routes),
          _step4;

      try {
        var _loop = function _loop() {
          var chain = _step4.value;
          var path = [];
          chain.forEach(function (r) {
            return path.push.apply(path, _toConsumableArray(r.path));
          });
          var ids = chain.map(function (r) {
            return r.id;
          });
          console.debug("%c ".concat(generatePath(path)), 'font-weight: bold; padding-left: 20px', '=>\t', "(".concat(ids.join(', '), ")"));
        };

        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          _loop();
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      console.groupEnd();
    };

    var printRedirects = function printRedirects(redirects) {
      console.group("[ion-core] REDIRECTS[".concat(redirects.length, "]"));

      var _iterator5 = _createForOfIteratorHelper(redirects),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var redirect = _step5.value;

          if (redirect.to) {
            console.debug('FROM: ', "$c ".concat(generatePath(redirect.from)), 'font-weight: bold', ' TO: ', "$c ".concat(generatePath(redirect.to)), 'font-weight: bold');
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      console.groupEnd();
    };

    var _writeNavState = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(root, chain, direction, index) {
        var changed,
            outlet,
            route,
            result,
            _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                changed = _args.length > 4 && _args[4] !== undefined ? _args[4] : false;
                _context.prev = 1;
                // find next navigation outlet in the DOM
                outlet = searchNavNode(root); // make sure we can continue interacting the DOM, otherwise abort

                if (!(index >= chain.length || !outlet)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", changed);

              case 5:
                _context.next = 7;
                return outlet.componentOnReady();

              case 7:
                route = chain[index];
                _context.next = 10;
                return outlet.setRouteId(route.id, route.params, direction);

              case 10:
                result = _context.sent;

                // if the outlet changed the page, reset navigation to neutral (no direction)
                // this means nested outlets will not animate
                if (result.changed) {
                  direction = ROUTER_INTENT_NONE;
                  changed = true;
                } // recursively set nested outlets


                _context.next = 14;
                return _writeNavState(result.element, chain, direction, index + 1, changed);

              case 14:
                changed = _context.sent;

                if (!result.markVisible) {
                  _context.next = 18;
                  break;
                }

                _context.next = 18;
                return result.markVisible();

              case 18:
                return _context.abrupt("return", changed);

              case 21:
                _context.prev = 21;
                _context.t0 = _context["catch"](1);
                console.error(_context.t0);
                return _context.abrupt("return", false);

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[1, 21]]);
      }));

      return function writeNavState(_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }();

    var readNavState = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(root) {
        var ids, outlet, node, id;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ids = [];
                node = root; // tslint:disable-next-line:no-constant-condition

              case 2:
                if (!true) {
                  _context2.next = 20;
                  break;
                }

                outlet = searchNavNode(node);

                if (!outlet) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 7;
                return outlet.getRouteId();

              case 7:
                id = _context2.sent;

                if (!id) {
                  _context2.next = 14;
                  break;
                }

                node = id.element;
                id.element = undefined;
                ids.push(id);
                _context2.next = 15;
                break;

              case 14:
                return _context2.abrupt("break", 20);

              case 15:
                _context2.next = 18;
                break;

              case 17:
                return _context2.abrupt("break", 20);

              case 18:
                _context2.next = 2;
                break;

              case 20:
                return _context2.abrupt("return", {
                  ids: ids,
                  outlet: outlet
                });

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function readNavState(_x5) {
        return _ref2.apply(this, arguments);
      };
    }();

    var waitUntilNavNode = function waitUntilNavNode() {
      if (searchNavNode(document.body)) {
        return Promise.resolve();
      }

      return new Promise(function (resolve) {
        window.addEventListener('ionNavWillLoad', resolve, {
          once: true
        });
      });
    };

    var QUERY = ':not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet';

    var searchNavNode = function searchNavNode(root) {
      if (!root) {
        return undefined;
      }

      if (root.matches(QUERY)) {
        return root;
      }

      var outlet = root.querySelector(QUERY);
      return outlet ? outlet : undefined;
    };

    var matchesRedirect = function matchesRedirect(input, route) {
      var from = route.from,
          to = route.to;

      if (to === undefined) {
        return false;
      }

      if (from.length > input.length) {
        return false;
      }

      for (var i = 0; i < from.length; i++) {
        var expected = from[i];

        if (expected === '*') {
          return true;
        }

        if (expected !== input[i]) {
          return false;
        }
      }

      return from.length === input.length;
    };

    var routeRedirect = function routeRedirect(path, routes) {
      return routes.find(function (route) {
        return matchesRedirect(path, route);
      });
    };

    var matchesIDs = function matchesIDs(ids, chain) {
      var len = Math.min(ids.length, chain.length);
      var i = 0;

      for (; i < len; i++) {
        if (ids[i].toLowerCase() !== chain[i].id) {
          break;
        }
      }

      return i;
    };

    var matchesPath = function matchesPath(inputPath, chain) {
      var segments = new RouterSegments(inputPath);
      var matchesDefault = false;
      var allparams;

      for (var i = 0; i < chain.length; i++) {
        var path = chain[i].path;

        if (path[0] === '') {
          matchesDefault = true;
        } else {
          var _iterator6 = _createForOfIteratorHelper(path),
              _step6;

          try {
            for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
              var segment = _step6.value;
              var data = segments.next(); // data param

              if (segment[0] === ':') {
                if (data === '') {
                  return null;
                }

                allparams = allparams || [];
                var params = allparams[i] || (allparams[i] = {});
                params[segment.slice(1)] = data;
              } else if (data !== segment) {
                return null;
              }
            }
          } catch (err) {
            _iterator6.e(err);
          } finally {
            _iterator6.f();
          }

          matchesDefault = false;
        }
      }

      var matches = matchesDefault ? matchesDefault === (segments.next() === '') : true;

      if (!matches) {
        return null;
      }

      if (allparams) {
        return chain.map(function (route, i) {
          return {
            id: route.id,
            path: route.path,
            params: mergeParams(route.params, allparams[i])
          };
        });
      }

      return chain;
    };

    var mergeParams = function mergeParams(a, b) {
      if (!a && b) {
        return b;
      } else if (a && !b) {
        return a;
      } else if (a && b) {
        return Object.assign(Object.assign({}, a), b);
      }

      return undefined;
    };

    var routerIDsToChain = function routerIDsToChain(ids, chains) {
      var match = null;
      var maxMatches = 0;
      var plainIDs = ids.map(function (i) {
        return i.id;
      });

      var _iterator7 = _createForOfIteratorHelper(chains),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var chain = _step7.value;
          var score = matchesIDs(plainIDs, chain);

          if (score > maxMatches) {
            match = chain;
            maxMatches = score;
          }
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }

      if (match) {
        return match.map(function (route, i) {
          return {
            id: route.id,
            path: route.path,
            params: mergeParams(route.params, ids[i] && ids[i].params)
          };
        });
      }

      return null;
    };

    var routerPathToChain = function routerPathToChain(path, chains) {
      var match = null;
      var matches = 0;

      var _iterator8 = _createForOfIteratorHelper(chains),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var chain = _step8.value;
          var matchedChain = matchesPath(path, chain);

          if (matchedChain !== null) {
            var score = computePriority(matchedChain);

            if (score > matches) {
              matches = score;
              match = matchedChain;
            }
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      return match;
    };

    var computePriority = function computePriority(chain) {
      var score = 1;
      var level = 1;

      var _iterator9 = _createForOfIteratorHelper(chain),
          _step9;

      try {
        for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
          var route = _step9.value;

          var _iterator10 = _createForOfIteratorHelper(route.path),
              _step10;

          try {
            for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
              var path = _step10.value;

              if (path[0] === ':') {
                score += Math.pow(1, level);
              } else if (path !== '') {
                score += Math.pow(2, level);
              }

              level++;
            }
          } catch (err) {
            _iterator10.e(err);
          } finally {
            _iterator10.f();
          }
        }
      } catch (err) {
        _iterator9.e(err);
      } finally {
        _iterator9.f();
      }

      return score;
    };

    var RouterSegments = /*#__PURE__*/function () {
      function RouterSegments(path) {
        _classCallCheck(this, RouterSegments);

        this.path = path.slice();
      }

      _createClass(RouterSegments, [{
        key: "next",
        value: function next() {
          if (this.path.length > 0) {
            return this.path.shift();
          }

          return '';
        }
      }]);

      return RouterSegments;
    }();

    var readRedirects = function readRedirects(root) {
      return Array.from(root.children).filter(function (el) {
        return el.tagName === 'ION-ROUTE-REDIRECT';
      }).map(function (el) {
        var to = readProp(el, 'to');
        return {
          from: parsePath(readProp(el, 'from')),
          to: to == null ? undefined : parsePath(to)
        };
      });
    };

    var readRoutes = function readRoutes(root) {
      return flattenRouterTree(readRouteNodes(root));
    };

    var readRouteNodes = function readRouteNodes(root) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : root;
      return Array.from(node.children).filter(function (el) {
        return el.tagName === 'ION-ROUTE' && el.component;
      }).map(function (el) {
        var component = readProp(el, 'component');

        if (component == null) {
          throw new Error('component missing in ion-route');
        }

        return {
          path: parsePath(readProp(el, 'url')),
          id: component.toLowerCase(),
          params: el.componentProps,
          children: readRouteNodes(root, el)
        };
      });
    };

    var readProp = function readProp(el, prop) {
      if (prop in el) {
        return el[prop];
      }

      if (el.hasAttribute(prop)) {
        return el.getAttribute(prop);
      }

      return null;
    };

    var flattenRouterTree = function flattenRouterTree(nodes) {
      var routes = [];

      var _iterator11 = _createForOfIteratorHelper(nodes),
          _step11;

      try {
        for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
          var node = _step11.value;
          flattenNode([], routes, node);
        }
      } catch (err) {
        _iterator11.e(err);
      } finally {
        _iterator11.f();
      }

      return routes;
    };

    var flattenNode = function flattenNode(chain, routes, node) {
      var s = chain.slice();
      s.push({
        id: node.id,
        path: node.path,
        params: node.params
      });

      if (node.children.length === 0) {
        routes.push(s);
        return;
      }

      var _iterator12 = _createForOfIteratorHelper(node.children),
          _step12;

      try {
        for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
          var sub = _step12.value;
          flattenNode(s, routes, sub);
        }
      } catch (err) {
        _iterator12.e(err);
      } finally {
        _iterator12.f();
      }
    };

    var Router = /*#__PURE__*/function () {
      function Router(hostRef) {
        _classCallCheck(this, Router);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        this.previousPath = null;
        this.busy = false;
        this.state = 0;
        this.lastState = 0;
        /**
         * By default `ion-router` will match the routes at the root path ("/").
         * That can be changed when
         *
         */

        this.root = '/';
        /**
         * The router can work in two "modes":
         * - With hash: `/index.html#/path/to/page`
         * - Without hash: `/path/to/page`
         *
         * Using one or another might depend in the requirements of your app and/or where it's deployed.
         *
         * Usually "hash-less" navigation works better for SEO and it's more user friendly too, but it might
         * requires additional server-side configuration in order to properly work.
         *
         * On the otherside hash-navigation is much easier to deploy, it even works over the file protocol.
         *
         * By default, this property is `true`, change to `false` to allow hash-less URLs.
         */

        this.useHash = true;
        this.ionRouteWillChange = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionRouteWillChange", 7);
        this.ionRouteDidChange = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["d"])(this, "ionRouteDidChange", 7);
      }

      _createClass(Router, [{
        key: "componentWillLoad",
        value: function () {
          var _componentWillLoad = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
            return _regeneratorRuntime().wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    console.debug('[ion-router] router will load');
                    _context3.next = 3;
                    return waitUntilNavNode();

                  case 3:
                    console.debug('[ion-router] found nav');
                    _context3.next = 6;
                    return this.onRoutesChanged();

                  case 6:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          }));

          function componentWillLoad() {
            return _componentWillLoad.apply(this, arguments);
          }

          return componentWillLoad;
        }()
      }, {
        key: "componentDidLoad",
        value: function componentDidLoad() {
          window.addEventListener('ionRouteRedirectChanged', Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["e"])(this.onRedirectChanged.bind(this), 10));
          window.addEventListener('ionRouteDataChanged', Object(_helpers_46f4a262_js__WEBPACK_IMPORTED_MODULE_2__["e"])(this.onRoutesChanged.bind(this), 100));
        }
      }, {
        key: "onPopState",
        value: function onPopState() {
          var direction = this.historyDirection();
          var path = this.getPath();
          console.debug('[ion-router] URL changed -> update nav', path, direction);
          return this.writeNavStateRoot(path, direction);
        }
      }, {
        key: "onBackButton",
        value: function onBackButton(ev) {
          var _this = this;

          ev.detail.register(0, function () {
            return _this.back();
          });
        }
        /**
         * Navigate to the specified URL.
         *
         * @param url The url to navigate to.
         * @param direction The direction of the animation. Defaults to `"forward"`.
         */

      }, {
        key: "push",
        value: function push(url) {
          var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'forward';

          if (url.startsWith('.')) {
            url = new URL(url, window.location.href).pathname;
          }

          console.debug('[ion-router] URL pushed -> updating nav', url, direction);
          var path = parsePath(url);
          this.setPath(path, direction);
          return this.writeNavStateRoot(path, direction);
        }
        /**
         * Go back to previous page in the window.history.
         */

      }, {
        key: "back",
        value: function back() {
          window.history.back();
          return Promise.resolve(this.waitPromise);
        }
        /** @internal */

      }, {
        key: "printDebug",
        value: function () {
          var _printDebug = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
            return _regeneratorRuntime().wrap(function _callee4$(_context4) {
              while (1) {
                switch (_context4.prev = _context4.next) {
                  case 0:
                    console.debug('CURRENT PATH', this.getPath());
                    console.debug('PREVIOUS PATH', this.previousPath);
                    printRoutes(readRoutes(this.el));
                    printRedirects(readRedirects(this.el));

                  case 4:
                  case "end":
                    return _context4.stop();
                }
              }
            }, _callee4, this);
          }));

          function printDebug() {
            return _printDebug.apply(this, arguments);
          }

          return printDebug;
        }()
        /** @internal */

      }, {
        key: "navChanged",
        value: function () {
          var _navChanged = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(direction) {
            var _yield$readNavState, ids, outlet, routes, chain, path;

            return _regeneratorRuntime().wrap(function _callee5$(_context5) {
              while (1) {
                switch (_context5.prev = _context5.next) {
                  case 0:
                    if (!this.busy) {
                      _context5.next = 3;
                      break;
                    }

                    console.warn('[ion-router] router is busy, navChanged was cancelled');
                    return _context5.abrupt("return", false);

                  case 3:
                    _context5.next = 5;
                    return readNavState(window.document.body);

                  case 5:
                    _yield$readNavState = _context5.sent;
                    ids = _yield$readNavState.ids;
                    outlet = _yield$readNavState.outlet;
                    routes = readRoutes(this.el);
                    chain = routerIDsToChain(ids, routes);

                    if (chain) {
                      _context5.next = 13;
                      break;
                    }

                    console.warn('[ion-router] no matching URL for ', ids.map(function (i) {
                      return i.id;
                    }));
                    return _context5.abrupt("return", false);

                  case 13:
                    path = chainToPath(chain);

                    if (path) {
                      _context5.next = 17;
                      break;
                    }

                    console.warn('[ion-router] router could not match path because some required param is missing');
                    return _context5.abrupt("return", false);

                  case 17:
                    console.debug('[ion-router] nav changed -> update URL', ids, path);
                    this.setPath(path, direction);
                    _context5.next = 21;
                    return this.safeWriteNavState(outlet, chain, ROUTER_INTENT_NONE, path, null, ids.length);

                  case 21:
                    return _context5.abrupt("return", true);

                  case 22:
                  case "end":
                    return _context5.stop();
                }
              }
            }, _callee5, this);
          }));

          function navChanged(_x6) {
            return _navChanged.apply(this, arguments);
          }

          return navChanged;
        }()
      }, {
        key: "onRedirectChanged",
        value: function onRedirectChanged() {
          var path = this.getPath();

          if (path && routeRedirect(path, readRedirects(this.el))) {
            this.writeNavStateRoot(path, ROUTER_INTENT_NONE);
          }
        }
      }, {
        key: "onRoutesChanged",
        value: function onRoutesChanged() {
          return this.writeNavStateRoot(this.getPath(), ROUTER_INTENT_NONE);
        }
      }, {
        key: "historyDirection",
        value: function historyDirection() {
          var win = window;

          if (win.history.state === null) {
            this.state++;
            win.history.replaceState(this.state, win.document.title, win.document.location && win.document.location.href);
          }

          var state = win.history.state;
          var lastState = this.lastState;
          this.lastState = state;

          if (state > lastState) {
            return ROUTER_INTENT_FORWARD;
          } else if (state < lastState) {
            return ROUTER_INTENT_BACK;
          } else {
            return ROUTER_INTENT_NONE;
          }
        }
      }, {
        key: "writeNavStateRoot",
        value: function () {
          var _writeNavStateRoot = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(path, direction) {
            var redirects, redirect, redirectFrom, routes, chain;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) {
                switch (_context6.prev = _context6.next) {
                  case 0:
                    if (path) {
                      _context6.next = 3;
                      break;
                    }

                    console.error('[ion-router] URL is not part of the routing set');
                    return _context6.abrupt("return", false);

                  case 3:
                    // lookup redirect rule
                    redirects = readRedirects(this.el);
                    redirect = routeRedirect(path, redirects);
                    redirectFrom = null;

                    if (redirect) {
                      this.setPath(redirect.to, direction);
                      redirectFrom = redirect.from;
                      path = redirect.to;
                    } // lookup route chain


                    routes = readRoutes(this.el);
                    chain = routerPathToChain(path, routes);

                    if (chain) {
                      _context6.next = 12;
                      break;
                    }

                    console.error('[ion-router] the path does not match any route');
                    return _context6.abrupt("return", false);

                  case 12:
                    return _context6.abrupt("return", this.safeWriteNavState(document.body, chain, direction, path, redirectFrom));

                  case 13:
                  case "end":
                    return _context6.stop();
                }
              }
            }, _callee6, this);
          }));

          function writeNavStateRoot(_x7, _x8) {
            return _writeNavStateRoot.apply(this, arguments);
          }

          return writeNavStateRoot;
        }()
      }, {
        key: "safeWriteNavState",
        value: function () {
          var _safeWriteNavState = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(node, chain, direction, path, redirectFrom) {
            var index,
                unlock,
                changed,
                _args7 = arguments;
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) {
                switch (_context7.prev = _context7.next) {
                  case 0:
                    index = _args7.length > 5 && _args7[5] !== undefined ? _args7[5] : 0;
                    _context7.next = 3;
                    return this.lock();

                  case 3:
                    unlock = _context7.sent;
                    changed = false;
                    _context7.prev = 5;
                    _context7.next = 8;
                    return this.writeNavState(node, chain, direction, path, redirectFrom, index);

                  case 8:
                    changed = _context7.sent;
                    _context7.next = 14;
                    break;

                  case 11:
                    _context7.prev = 11;
                    _context7.t0 = _context7["catch"](5);
                    console.error(_context7.t0);

                  case 14:
                    unlock();
                    return _context7.abrupt("return", changed);

                  case 16:
                  case "end":
                    return _context7.stop();
                }
              }
            }, _callee7, this, [[5, 11]]);
          }));

          function safeWriteNavState(_x9, _x10, _x11, _x12, _x13) {
            return _safeWriteNavState.apply(this, arguments);
          }

          return safeWriteNavState;
        }()
      }, {
        key: "lock",
        value: function () {
          var _lock = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
            var p, resolve;
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) {
                switch (_context8.prev = _context8.next) {
                  case 0:
                    p = this.waitPromise;
                    this.waitPromise = new Promise(function (r) {
                      return resolve = r;
                    });

                    if (!(p !== undefined)) {
                      _context8.next = 5;
                      break;
                    }

                    _context8.next = 5;
                    return p;

                  case 5:
                    return _context8.abrupt("return", resolve);

                  case 6:
                  case "end":
                    return _context8.stop();
                }
              }
            }, _callee8, this);
          }));

          function lock() {
            return _lock.apply(this, arguments);
          }

          return lock;
        }()
      }, {
        key: "writeNavState",
        value: function () {
          var _writeNavState2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(node, chain, direction, path, redirectFrom) {
            var index,
                routeEvent,
                changed,
                _args9 = arguments;
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) {
                switch (_context9.prev = _context9.next) {
                  case 0:
                    index = _args9.length > 5 && _args9[5] !== undefined ? _args9[5] : 0;

                    if (!this.busy) {
                      _context9.next = 4;
                      break;
                    }

                    console.warn('[ion-router] router is busy, transition was cancelled');
                    return _context9.abrupt("return", false);

                  case 4:
                    this.busy = true; // generate route event and emit will change

                    routeEvent = this.routeChangeEvent(path, redirectFrom);

                    if (routeEvent) {
                      this.ionRouteWillChange.emit(routeEvent);
                    }

                    _context9.next = 9;
                    return _writeNavState(node, chain, direction, index);

                  case 9:
                    changed = _context9.sent;
                    this.busy = false;

                    if (changed) {
                      console.debug('[ion-router] route changed', path);
                    } // emit did change


                    if (routeEvent) {
                      this.ionRouteDidChange.emit(routeEvent);
                    }

                    return _context9.abrupt("return", changed);

                  case 14:
                  case "end":
                    return _context9.stop();
                }
              }
            }, _callee9, this);
          }));

          function writeNavState(_x14, _x15, _x16, _x17, _x18) {
            return _writeNavState2.apply(this, arguments);
          }

          return writeNavState;
        }()
      }, {
        key: "setPath",
        value: function setPath(path, direction) {
          this.state++;
          writePath(window.history, this.root, this.useHash, path, direction, this.state);
        }
      }, {
        key: "getPath",
        value: function getPath() {
          return readPath(window.location, this.root, this.useHash);
        }
      }, {
        key: "routeChangeEvent",
        value: function routeChangeEvent(path, redirectFromPath) {
          var from = this.previousPath;
          var to = generatePath(path);
          this.previousPath = to;

          if (to === from) {
            return null;
          }

          var redirectedFrom = redirectFromPath ? generatePath(redirectFromPath) : null;
          return {
            from: from,
            redirectedFrom: redirectedFrom,
            to: to
          };
        }
      }, {
        key: "el",
        get: function get() {
          return Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["e"])(this);
        }
      }]);

      return Router;
    }();

    var RouterLink = /*#__PURE__*/function () {
      function RouterLink(hostRef) {
        var _this2 = this;

        _classCallCheck(this, RouterLink);

        Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["r"])(this, hostRef);
        /**
         * When using a router, it specifies the transition direction when navigating to
         * another page using `href`.
         */

        this.routerDirection = 'forward';

        this.onClick = function (ev) {
          Object(_theme_18cbe2cc_js__WEBPACK_IMPORTED_MODULE_3__["o"])(_this2.href, ev, _this2.routerDirection);
        };
      }

      _createClass(RouterLink, [{
        key: "render",
        value: function render() {
          var _Object$assign;

          var mode = Object(_core_feeeff0d_js__WEBPACK_IMPORTED_MODULE_0__["c"])(this);
          var attrs = {
            href: this.href,
            rel: this.rel,
            target: this.target
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

      return RouterLink;
    }();
    /***/

  }
}]);
//# sourceMappingURL=55-es5.js.map