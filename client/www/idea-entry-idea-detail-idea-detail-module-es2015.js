(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["idea-entry-idea-detail-idea-detail-module"],{

/***/ "./node_modules/@ionic-native/in-app-browser/ngx/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@ionic-native/in-app-browser/ngx/index.js ***!
  \****************************************************************/
/*! exports provided: InAppBrowserObject, InAppBrowser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InAppBrowserObject", function() { return InAppBrowserObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InAppBrowser", function() { return InAppBrowser; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _ionic_native_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic-native/core */ "./node_modules/@ionic-native/core/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");




var InAppBrowserObject = /** @class */ (function () {
    /**
     * Opens a URL in a new InAppBrowser instance, the current browser instance, or the system browser.
     * @param {string} url     The URL to load.
     * @param {string} [target="self"]  The target in which to load the URL, an optional parameter that defaults to _self.
     *                 _self: Opens in the WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
     *                 _blank: Opens in the InAppBrowser.
     *                 _system: Opens in the system's web browser.
     * @param {string | InAppBrowserOptions} [options] Options for the InAppBrowser. Optional, defaulting to: location=yes.
     *                 The options string must not contain any blank space, and each feature's
     *                 name/value pairs must be separated by a comma. Feature names are case insensitive.
     */
    function InAppBrowserObject(url, target, options) {
        try {
            if (options && typeof options !== 'string') {
                options = Object.keys(options)
                    .map(function (key) { return key + "=" + options[key]; })
                    .join(',');
            }
            this._objectInstance = cordova.InAppBrowser.open(url, target, options);
        }
        catch (e) {
            if (typeof window !== 'undefined') {
                window.open(url, target);
            }
            console.warn('Native: InAppBrowser is not installed or you are running on a browser. Falling back to window.open.');
        }
    }
    InAppBrowserObject.prototype._loadAfterBeforeload = function (strUrl) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordovaInstance"])(this, "_loadAfterBeforeload", { "sync": true }, arguments); };
    InAppBrowserObject.prototype.show = function () { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordovaInstance"])(this, "show", { "sync": true }, arguments); };
    InAppBrowserObject.prototype.close = function () { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordovaInstance"])(this, "close", { "sync": true }, arguments); };
    InAppBrowserObject.prototype.hide = function () { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordovaInstance"])(this, "hide", { "sync": true }, arguments); };
    InAppBrowserObject.prototype.executeScript = function (script) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordovaInstance"])(this, "executeScript", {}, arguments); };
    InAppBrowserObject.prototype.insertCSS = function (css) { return Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["cordovaInstance"])(this, "insertCSS", {}, arguments); };
    InAppBrowserObject.prototype.on = function (event) {
        var _this = this;
        return (function () {
            if (Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["instanceAvailability"])(_this) === true) {
                return new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
                    _this._objectInstance.addEventListener(event, observer.next.bind(observer));
                    return function () { return _this._objectInstance.removeEventListener(event, observer.next.bind(observer)); };
                });
            }
        })();
    };
    InAppBrowserObject.prototype.on = function (event) {
        var _this = this;
        return (function () {
            if (Object(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["instanceAvailability"])(_this) === true) {
                return new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"](function (observer) {
                    _this._objectInstance.addEventListener(event, observer.next.bind(observer));
                    return function () { return _this._objectInstance.removeEventListener(event, observer.next.bind(observer)); };
                });
            }
        })();
    };
    return InAppBrowserObject;
}());

var InAppBrowser = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(InAppBrowser, _super);
    function InAppBrowser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Opens a URL in a new InAppBrowser instance, the current browser instance, or the system browser.
     * @param  url {string}     The URL to load.
     * @param  target {string}  The target in which to load the URL, an optional parameter that defaults to _self.
     * @param  options {string} Options for the InAppBrowser. Optional, defaulting to: location=yes.
     *                 The options string must not contain any blank space, and each feature's
     *                 name/value pairs must be separated by a comma. Feature names are case insensitive.
     * @returns {InAppBrowserObject}
     */
    InAppBrowser.prototype.create = function (url, target, options) {
        return new InAppBrowserObject(url, target, options);
    };
    InAppBrowser.pluginName = "InAppBrowser";
    InAppBrowser.plugin = "cordova-plugin-inappbrowser";
    InAppBrowser.pluginRef = "cordova.InAppBrowser";
    InAppBrowser.repo = "https://github.com/apache/cordova-plugin-inappbrowser";
    InAppBrowser.platforms = ["AmazonFire OS", "Android", "Browser", "iOS", "macOS", "Windows"];
    InAppBrowser = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])()
    ], InAppBrowser);
    return InAppBrowser;
}(_ionic_native_core__WEBPACK_IMPORTED_MODULE_2__["IonicNativePlugin"]));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvQGlvbmljLW5hdGl2ZS9wbHVnaW5zL2luLWFwcC1icm93c2VyL25neC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLDREQUE2RCxNQUFNLG9CQUFvQixDQUFDO0FBQy9GLE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7O0lBa0oxQzs7Ozs7Ozs7OztPQVVHO0lBQ0gsNEJBQVksR0FBVyxFQUFFLE1BQWUsRUFBRSxPQUFzQztRQUM5RSxJQUFJO1lBQ0YsSUFBSSxPQUFPLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUMxQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7cUJBQzNCLEdBQUcsQ0FBQyxVQUFDLEdBQVcsSUFBSyxPQUFHLEdBQUcsU0FBSyxPQUErQixDQUFDLEdBQUcsQ0FBRyxFQUFqRCxDQUFpRCxDQUFDO3FCQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDZDtZQUVELElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN4RTtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7Z0JBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzFCO1lBQ0QsT0FBTyxDQUFDLElBQUksQ0FDVixxR0FBcUcsQ0FDdEcsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQU9ELGlEQUFvQixhQUFDLE1BQWM7SUFPbkMsaUNBQUk7SUFNSixrQ0FBSztJQU9MLGlDQUFJO0lBUUosMENBQWEsYUFBQyxNQUF3QztJQVV0RCxzQ0FBUyxhQUFDLEdBQXFDO0lBVS9DLCtCQUFFLGFBQUMsS0FBNEI7OztzREFBaUM7Z0JBQzlELE9BQU8sSUFBSSxVQUFVLENBQW9CLFVBQUMsUUFBcUM7b0JBQzdFLEtBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzNFLE9BQU8sY0FBTSxPQUFBLEtBQUksQ0FBQyxlQUFlLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQTdFLENBQTZFLENBQUM7Z0JBQzdGLENBQUMsQ0FBQyxDQUFDO2FBQ0o7OztJQVFELCtCQUFFLGFBQUMsS0FBYTs7O3NEQUFpQztnQkFDL0MsT0FBTyxJQUFJLFVBQVUsQ0FBb0IsVUFBQyxRQUFxQztvQkFDN0UsS0FBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDM0UsT0FBTyxjQUFNLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBN0UsQ0FBNkUsQ0FBQztnQkFDN0YsQ0FBQyxDQUFDLENBQUM7YUFDSjs7OzZCQXpQSDs7OztJQW9Ta0MsZ0NBQWlCOzs7O0lBQ2pEOzs7Ozs7OztPQVFHO0lBQ0gsNkJBQU0sR0FBTixVQUFPLEdBQVcsRUFBRSxNQUFlLEVBQUUsT0FBc0M7UUFDekUsT0FBTyxJQUFJLGtCQUFrQixDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEQsQ0FBQzs7Ozs7O0lBWlUsWUFBWTtRQUR4QixVQUFVLEVBQUU7T0FDQSxZQUFZO3VCQXBTekI7RUFvU2tDLGlCQUFpQjtTQUF0QyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29yZG92YUluc3RhbmNlLCBJbnN0YW5jZUNoZWNrLCBJb25pY05hdGl2ZVBsdWdpbiwgUGx1Z2luIH0gZnJvbSAnQGlvbmljLW5hdGl2ZS9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbmRlY2xhcmUgY29uc3QgY29yZG92YTogQ29yZG92YSAmIHsgSW5BcHBCcm93c2VyOiBhbnkgfTtcblxuZXhwb3J0IGludGVyZmFjZSBJbkFwcEJyb3dzZXJPcHRpb25zIHtcbiAgLyoqXG4gICAqIChpT1MgT25seSkgU2V0IHRvIHllcyBvciBubyB0byBhbGxvdyBpbi1saW5lIEhUTUw1IG1lZGlhIHBsYXliYWNrLCBkaXNwbGF5aW5nIHdpdGhpbiB0aGUgYnJvd3NlciB3aW5kb3cgcmF0aGVyIHRoYW4gYSBkZXZpY2Utc3BlY2lmaWMgcGxheWJhY2sgaW50ZXJmYWNlLlxuICAgKiBUaGUgSFRNTCdzIHZpZGVvIGVsZW1lbnQgbXVzdCBhbHNvIGluY2x1ZGUgdGhlIHdlYmtpdC1wbGF5c2lubGluZSBhdHRyaWJ1dGUgKGRlZmF1bHRzIHRvIG5vKVxuICAgKi9cbiAgYWxsb3dJbmxpbmVNZWRpYVBsYXliYWNrPzogJ3llcycgfCAnbm8nO1xuICAvKipcbiAgICogc2V0IHRvIGVuYWJsZSB0aGUgYmVmb3JlbG9hZCBldmVudCB0byBtb2RpZnkgd2hpY2ggcGFnZXMgYXJlIGFjdHVhbGx5IGxvYWRlZCBpbiB0aGUgYnJvd3Nlci4gQWNjZXB0ZWQgdmFsdWVzIGFyZSBnZXQgdG9cbiAgICogaW50ZXJjZXB0IG9ubHkgR0VUIHJlcXVlc3RzLCBwb3N0IHRvIGludGVyY2VwdCBvbiBQT1NUIHJlcXVlc3RzIG9yIHllcyB0byBpbnRlcmNlcHQgYm90aCBHRVQgJiBQT1NUIHJlcXVlc3RzLlxuICAgKiBOb3RlIHRoYXQgUE9TVCByZXF1ZXN0cyBhcmUgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWQgYW5kIHdpbGwgYmUgaWdub3JlZCAoaWYgeW91IHNldCBiZWZvcmVsb2FkPXBvc3QgaXQgd2lsbCByYWlzZSBhbiBlcnJvcikuXG4gICAqL1xuICBiZWZvcmVsb2FkPzogJ3llcycgfCAnZ2V0JyB8ICdwb3N0JztcbiAgLyoqIFNldCB0byB5ZXMgdG8gaGF2ZSB0aGUgYnJvd3NlcidzIGNvb2tpZSBjYWNoZSBjbGVhcmVkIGJlZm9yZSB0aGUgbmV3IHdpbmRvdyBpcyBvcGVuZWQuICovXG4gIGNsZWFyY2FjaGU/OiAneWVzJyB8ICdubyc7XG4gIC8qKiAgc2V0IHRvIHllcyB0byBoYXZlIHRoZSBicm93c2VyJ3MgZW50aXJlIGxvY2FsIHN0b3JhZ2UgY2xlYXJlZCAoY29va2llcywgSFRNTDUgbG9jYWwgc3RvcmFnZSwgSW5kZXhlZERCLCBldGMuKSBiZWZvcmUgdGhlIG5ldyB3aW5kb3cgaXMgb3BlbmVkICovXG4gIGNsZWFyZGF0YT86ICd5ZXMnIHwgJ25vJztcbiAgLyoqXG4gICAqIFNldCB0byB5ZXMgdG8gaGF2ZSB0aGUgc2Vzc2lvbiBjb29raWUgY2FjaGUgY2xlYXJlZCBiZWZvcmUgdGhlIG5ldyB3aW5kb3cgaXMgb3BlbmVkLlxuICAgKiBGb3IgV0tXZWJWaWV3LCByZXF1aXJlcyBpT1MgMTErIG9uIHRhcmdldCBkZXZpY2UuXG4gICAqL1xuICBjbGVhcnNlc3Npb25jYWNoZT86ICd5ZXMnIHwgJ25vJztcbiAgLyoqXG4gICAqIChBbmRyb2lkKSBTZXQgdG8gYSBzdHJpbmcgdG8gdXNlIGFzIHRoZSBjbG9zZSBidXR0b24ncyBjYXB0aW9uIGluc3RlYWQgb2YgYSBYLiBOb3RlIHRoYXQgeW91IG5lZWQgdG8gbG9jYWxpemUgdGhpcyB2YWx1ZSB5b3Vyc2VsZi5cbiAgICogKGlPUykgU2V0IHRvIGEgc3RyaW5nIHRvIHVzZSBhcyB0aGUgRG9uZSBidXR0b24ncyBjYXB0aW9uLiBOb3RlIHRoYXQgeW91IG5lZWQgdG8gbG9jYWxpemUgdGhpcyB2YWx1ZSB5b3Vyc2VsZi5cbiAgICovXG4gIGNsb3NlYnV0dG9uY2FwdGlvbj86IHN0cmluZztcbiAgLyoqXG4gICAqIChBbmRyb2lkKSBTZXQgdG8gYSB2YWxpZCBoZXggY29sb3Igc3RyaW5nLCBmb3IgZXhhbXBsZTogIzAwZmYwMCwgYW5kIGl0IHdpbGwgY2hhbmdlIHRoZSBjbG9zZSBidXR0b24gY29sb3IgZnJvbSBkZWZhdWx0LCByZWdhcmRsZXNzIG9mIGJlaW5nIGEgdGV4dCBvciBkZWZhdWx0IFguIE9ubHkgaGFzIGVmZmVjdCBpZiB1c2VyIGhhcyBsb2NhdGlvbiBzZXQgdG8geWVzLlxuICAgKiAoaU9TKSBTZXQgYXMgYSB2YWxpZCBoZXggY29sb3Igc3RyaW5nLCBmb3IgZXhhbXBsZTogIzAwZmYwMCwgdG8gY2hhbmdlIGZyb20gdGhlIGRlZmF1bHQgRG9uZSBidXR0b24ncyBjb2xvci4gT25seSBhcHBsaWNhYmxlIGlmIHRvb2xiYXIgaXMgbm90IGRpc2FibGVkLlxuICAgKi9cbiAgY2xvc2VidXR0b25jb2xvcj86IHN0cmluZztcbiAgLyoqIChpT1MgT25seSkgU2V0IHRvIHllcyBvciBubyAoZGVmYXVsdCBpcyBubykuIFR1cm5zIG9uL29mZiB0aGUgVUlXZWJWaWV3Qm91bmNlIHByb3BlcnR5LiAqL1xuICBkaXNhbGxvd292ZXJzY3JvbGw/OiAneWVzJyB8ICdubyc7XG4gIC8qKiAoaU9TIE9ubHkpICBTZXQgdG8geWVzIG9yIG5vIHRvIHByZXZlbnQgdmlld3BvcnQgc2NhbGluZyB0aHJvdWdoIGEgbWV0YSB0YWcgKGRlZmF1bHRzIHRvIG5vKS4gKi9cbiAgZW5hYmxlVmlld3BvcnRTY2FsZT86ICd5ZXMnIHwgJ25vJztcbiAgLyoqIChBbmRyb2lkIE9ubHkpIFNldCB0byB5ZXMgdG8gc2hvdyBhIGNsb3NlIGJ1dHRvbiBpbiB0aGUgZm9vdGVyIHNpbWlsYXIgdG8gdGhlIGlPUyBEb25lIGJ1dHRvbi4gVGhlIGNsb3NlIGJ1dHRvbiB3aWxsIGFwcGVhciB0aGUgc2FtZSBhcyBmb3IgdGhlIGhlYWRlciBoZW5jZSB1c2UgY2xvc2VidXR0b25jYXB0aW9uIGFuZCBjbG9zZWJ1dHRvbmNvbG9yIHRvIHNldCBpdHMgcHJvcGVydGllcyAqL1xuICBmb290ZXI/OiAneWVzJyB8ICdubyc7XG4gIC8qKiAoQW5kcm9pZCBPbmx5KSBTZXQgdG8gYSB2YWxpZCBoZXggY29sb3Igc3RyaW5nLCBmb3IgZXhhbXBsZSAjMDBmZjAwIG9yICNDQzAwZmYwMCAoI2FhcnJnZ2JiKSwgYW5kIGl0IHdpbGwgY2hhbmdlIHRoZSBmb290ZXIgY29sb3IgZnJvbSBkZWZhdWx0LiBPbmx5IGhhcyBlZmZlY3QgaWYgdXNlciBoYXMgZm9vdGVyIHNldCB0byB5ZXMgKi9cbiAgZm9vdGVyY29sb3I/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiAoV2luZG93cyBvbmx5KSBTZXQgdG8geWVzIHRvIGNyZWF0ZSB0aGUgYnJvd3NlciBjb250cm9sIHdpdGhvdXQgYSBib3JkZXIgYXJvdW5kIGl0LlxuICAgKiBQbGVhc2Ugbm90ZSB0aGF0IGlmIGxvY2F0aW9uPW5vIGlzIGFsc28gc3BlY2lmaWVkLCB0aGVyZSB3aWxsIGJlIG5vIGNvbnRyb2wgcHJlc2VudGVkIHRvIHVzZXIgdG8gY2xvc2UgSUFCIHdpbmRvdy5cbiAgICovXG4gIGZ1bGxzY3JlZW4/OiAneWVzJyB8ICdubyc7XG4gIC8qKlxuICAgKiAoQW5kcm9pZCAmIFdpbmRvd3MgT25seSkgU2V0IHRvIHllcyB0byB1c2UgdGhlIGhhcmR3YXJlIGJhY2sgYnV0dG9uIHRvIG5hdmlnYXRlIGJhY2t3YXJkcyB0aHJvdWdoIHRoZSBJbkFwcEJyb3dzZXIncyBoaXN0b3J5LlxuICAgKiBJZiB0aGVyZSBpcyBubyBwcmV2aW91cyBwYWdlLCB0aGUgSW5BcHBCcm93c2VyIHdpbGwgY2xvc2UuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIHllcywgc28geW91IG11c3Qgc2V0IGl0IHRvIG5vIGlmIHlvdSB3YW50IHRoZSBiYWNrIGJ1dHRvbiB0byBzaW1wbHkgY2xvc2UgdGhlIEluQXBwQnJvd3Nlci5cbiAgICovXG4gIGhhcmR3YXJlYmFjaz86ICd5ZXMnIHwgJ25vJztcbiAgLyoqXG4gICAqIFNldCB0byB5ZXMgdG8gY3JlYXRlIHRoZSBicm93c2VyIGFuZCBsb2FkIHRoZSBwYWdlLCBidXQgbm90IHNob3cgaXQuIFRoZSBsb2Fkc3RvcCBldmVudCBmaXJlcyB3aGVuIGxvYWRpbmcgaXMgY29tcGxldGUuXG4gICAqIE9taXQgb3Igc2V0IHRvIG5vIChkZWZhdWx0KSB0byBoYXZlIHRoZSBicm93c2VyIG9wZW4gYW5kIGxvYWQgbm9ybWFsbHkuXG4gICAqL1xuICBoaWRkZW4/OiAneWVzJyB8ICdubyc7XG4gIC8qKlxuICAgKiAoQW5kcm9pZCkgU2V0IHRvIHllcyB0byBoaWRlIHRoZSBuYXZpZ2F0aW9uIGJ1dHRvbnMgb24gdGhlIGxvY2F0aW9uIHRvb2xiYXIsIG9ubHkgaGFzIGVmZmVjdCBpZiB1c2VyIGhhcyBsb2NhdGlvbiBzZXQgdG8geWVzLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBuby5cbiAgICogKGlPUykgU2V0IHRvIHllcyBvciBubyB0byB0dXJuIHRoZSB0b29sYmFyIG5hdmlnYXRpb24gYnV0dG9ucyBvbiBvciBvZmYgKGRlZmF1bHRzIHRvIG5vKS4gT25seSBhcHBsaWNhYmxlIGlmIHRvb2xiYXIgaXMgbm90IGRpc2FibGVkLlxuICAgKi9cbiAgaGlkZW5hdmlnYXRpb25idXR0b25zPzogJ3llcycgfCAnbm8nO1xuICAvKipcbiAgICogIChpT1MgT25seSkgU2V0IHRvIHllcyBvciBubyB0byBjaGFuZ2UgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGxvYWRpbmcgaW5kaWNhdG9yIChkZWZhdWx0cyB0byBubykuXG4gICAqL1xuICBoaWRlc3Bpbm5lcj86ICd5ZXMnIHwgJ25vJztcbiAgLyoqIChBbmRyb2lkKSBTZXQgdG8geWVzIHRvIGhpZGUgdGhlIHVybCBiYXIgb24gdGhlIGxvY2F0aW9uIHRvb2xiYXIsIG9ubHkgaGFzIGVmZmVjdCBpZiB1c2VyIGhhcyBsb2NhdGlvbiBzZXQgdG8geWVzLiBUaGUgZGVmYXVsdCB2YWx1ZSBpcyBuby4gKi9cbiAgaGlkZXVybGJhcj86ICd5ZXMnIHwgJ25vJztcbiAgLyoqIChpT1MgT25seSkgU2V0IHRvIHllcyBvciBubyB0byBvcGVuIHRoZSBrZXlib2FyZCB3aGVuIGZvcm0gZWxlbWVudHMgcmVjZWl2ZSBmb2N1cyB2aWEgSmF2YVNjcmlwdCdzIGZvY3VzKCkgY2FsbCAoZGVmYXVsdHMgdG8geWVzKS4gKi9cbiAga2V5Ym9hcmREaXNwbGF5UmVxdWlyZXNVc2VyQWN0aW9uPzogJ3llcycgfCAnbm8nO1xuICAvKipcbiAgICogKEFuZHJvaWQpIFNldCB0byB5ZXMgdG8gc3dhcCBwb3NpdGlvbnMgb2YgdGhlIG5hdmlnYXRpb24gYnV0dG9ucyBhbmQgdGhlIGNsb3NlIGJ1dHRvbi4gU3BlY2lmaWNhbGx5LCBuYXZpZ2F0aW9uIGJ1dHRvbnMgZ28gdG8gdGhlIGxlZnQgYW5kIGNsb3NlIGJ1dHRvbiB0byB0aGUgcmlnaHQuXG4gICAqIChpT1MpIFNldCB0byB5ZXMgdG8gc3dhcCBwb3NpdGlvbnMgb2YgdGhlIG5hdmlnYXRpb24gYnV0dG9ucyBhbmQgdGhlIGNsb3NlIGJ1dHRvbi4gU3BlY2lmaWNhbGx5LCBjbG9zZSBidXR0b24gZ29lcyB0byB0aGUgcmlnaHQgYW5kIG5hdmlnYXRpb24gYnV0dG9ucyB0byB0aGUgbGVmdC5cbiAgICovXG4gIGxlZnR0b3JpZ2h0PzogJ3llcycgfCAnbm8nO1xuICAvKiogU2V0IHRvIHllcyBvciBubyB0byB0dXJuIHRoZSBJbkFwcEJyb3dzZXIncyBsb2NhdGlvbiBiYXIgb24gb3Igb2ZmLiAqL1xuICBsb2NhdGlvbj86ICd5ZXMnIHwgJ25vJztcbiAgLyoqXG4gICAqICBTZXQgdG8geWVzIHRvIHByZXZlbnQgSFRNTDUgYXVkaW8gb3IgdmlkZW8gZnJvbSBhdXRvcGxheWluZyAoZGVmYXVsdHMgdG8gbm8pLlxuICAgKi9cbiAgbWVkaWFQbGF5YmFja1JlcXVpcmVzVXNlckFjdGlvbj86ICd5ZXMnIHwgJ25vJztcbiAgLyoqXG4gICAqIChBbmRyb2lkKSBTZXQgdG8gYSB2YWxpZCBoZXggY29sb3Igc3RyaW5nLCBmb3IgZXhhbXBsZTogIzAwZmYwMCwgYW5kIGl0IHdpbGwgY2hhbmdlIHRoZSBjb2xvciBvZiBib3RoIG5hdmlnYXRpb24gYnV0dG9ucyBmcm9tIGRlZmF1bHQuIE9ubHkgaGFzIGVmZmVjdCBpZiB1c2VyIGhhcyBsb2NhdGlvbiBzZXQgdG8geWVzIGFuZCBub3QgaGlkZW5hdmlnYXRpb25idXR0b25zIHNldCB0byB5ZXMuXG4gICAqIChpT1MpIFNldCBhcyBhIHZhbGlkIGhleCBjb2xvciBzdHJpbmcsIGZvciBleGFtcGxlOiAjMDBmZjAwLCB0byBjaGFuZ2UgZnJvbSB0aGUgZGVmYXVsdCBjb2xvci4gT25seSBhcHBsaWNhYmxlIGlmIG5hdmlnYXRpb24gYnV0dG9ucyBhcmUgdmlzaWJsZS5cbiAgICovXG4gIG5hdmlnYXRpb25idXR0b25jb2xvcj86IHN0cmluZztcbiAgLyoqIChpT1MgT25seSkgU2V0IHRvIHBhZ2VzaGVldCwgZm9ybXNoZWV0IG9yIGZ1bGxzY3JlZW4gdG8gc2V0IHRoZSBwcmVzZW50YXRpb24gc3R5bGUgKGRlZmF1bHRzIHRvIGZ1bGxzY3JlZW4pLiAqL1xuICBwcmVzZW50YXRpb25zdHlsZT86ICdwYWdlc2hlZXQnIHwgJ2Zvcm1zaGVldCcgfCAnZnVsbHNjcmVlbic7XG4gIC8qKiAoQW5kcm9pZCBPbmx5KSBTZXQgdG8geWVzIHRvIG1ha2UgSW5BcHBCcm93c2VyIFdlYlZpZXcgdG8gcGF1c2UvcmVzdW1lIHdpdGggdGhlIGFwcCB0byBzdG9wIGJhY2tncm91bmQgYXVkaW8gKHRoaXMgbWF5IGJlIHJlcXVpcmVkIHRvIGF2b2lkIEdvb2dsZSBQbGF5IGlzc3VlcykgKi9cbiAgc2hvdWxkUGF1c2VPblN1c3BlbmQ/OiAneWVzJyB8ICdubyc7XG4gIC8qKiAoaU9TIE9ubHkpIFNldCB0byB5ZXMgb3Igbm8gdG8gd2FpdCB1bnRpbCBhbGwgbmV3IHZpZXcgY29udGVudCBpcyByZWNlaXZlZCBiZWZvcmUgYmVpbmcgcmVuZGVyZWQgKGRlZmF1bHRzIHRvIG5vKS4gKi9cbiAgc3VwcHJlc3Nlc0luY3JlbWVudGFsUmVuZGVyaW5nPzogJ3llcycgfCAnbm8nO1xuICAvKiogKGlPUyBPbmx5KSBTZXQgdG8geWVzIG9yIG5vIHRvIHR1cm4gdGhlIHRvb2xiYXIgb24gb3Igb2ZmIGZvciB0aGUgSW5BcHBCcm93c2VyIChkZWZhdWx0cyB0byB5ZXMpICovXG4gIHRvb2xiYXI/OiAneWVzJyB8ICdubyc7XG4gIC8qKlxuICAgKiAoQW5kcm9pZCkgU2V0IHRvIGEgdmFsaWQgaGV4IGNvbG9yIHN0cmluZywgZm9yIGV4YW1wbGU6ICMwMGZmMDAsIGFuZCBpdCB3aWxsIGNoYW5nZSB0aGUgY29sb3IgdGhlIHRvb2xiYXIgZnJvbSBkZWZhdWx0LiBPbmx5IGhhcyBlZmZlY3QgaWYgdXNlciBoYXMgbG9jYXRpb24gc2V0IHRvIHllcy5cbiAgICogKGlPUykgU2V0IGFzIGEgdmFsaWQgaGV4IGNvbG9yIHN0cmluZywgZm9yIGV4YW1wbGU6ICMwMGZmMDAsIHRvIGNoYW5nZSBmcm9tIHRoZSBkZWZhdWx0IGNvbG9yIG9mIHRoZSB0b29sYmFyLiBPbmx5IGFwcGxpY2FibGUgaWYgdG9vbGJhciBpcyBub3QgZGlzYWJsZWQuXG4gICAqL1xuICB0b29sYmFyY29sb3I/OiBzdHJpbmc7XG4gIC8qKiAoaU9TIE9ubHkpIFNldCB0byB0b3Agb3IgYm90dG9tIChkZWZhdWx0IGlzIGJvdHRvbSkuIENhdXNlcyB0aGUgdG9vbGJhciB0byBiZSBhdCB0aGUgdG9wIG9yIGJvdHRvbSBvZiB0aGUgd2luZG93LiAqL1xuICB0b29sYmFycG9zaXRpb24/OiAndG9wJyB8ICdib3R0b20nO1xuICAvKiogKGlPUyBPbmx5KSBTZXQgdG8geWVzIG9yIG5vIHRvIG1ha2UgdGhlIHRvb2xiYXIgdHJhbnNsdWNlbnQoc2VtaS10cmFuc3BhcmVudCkgKGRlZmF1bHRzIHRvIHllcykuIE9ubHkgYXBwbGljYWJsZSBpZiB0b29sYmFyIGlzIG5vdCBkaXNhYmxlZC4gKi9cbiAgdG9vbGJhcnRyYW5zbHVjZW50PzogJ3llcycgfCAnbm8nO1xuICAvKiogKGlPUyBPbmx5KSBTZXQgdG8gZmxpcGhvcml6b250YWwsIGNyb3NzZGlzc29sdmUgb3IgY292ZXJ2ZXJ0aWNhbCB0byBzZXQgdGhlIHRyYW5zaXRpb24gc3R5bGUgKGRlZmF1bHRzIHRvIGNvdmVydmVydGljYWwpLiAqL1xuICB0cmFuc2l0aW9uc3R5bGU/OiAnZmxpcGhvcml6b250YWwnIHwgJ2Nyb3NzZGlzc29sdmUnIHwgJ2NvdmVydmVydGljYWwnO1xuICAvKiogKEFuZHJvaWQgT25seSkgU2V0cyB3aGV0aGVyIHRoZSBXZWJWaWV3IHNob3VsZCBlbmFibGUgc3VwcG9ydCBmb3IgdGhlIFwidmlld3BvcnRcIiBIVE1MIG1ldGEgdGFnIG9yIHNob3VsZCB1c2UgYSB3aWRlIHZpZXdwb3J0LiBXaGVuIHRoZSB2YWx1ZSBvZiB0aGUgc2V0dGluZyBpcyBubywgdGhlIGxheW91dCB3aWR0aCBpcyBhbHdheXMgc2V0IHRvIHRoZSB3aWR0aCBvZiB0aGUgV2ViVmlldyBjb250cm9sIGluIGRldmljZS1pbmRlcGVuZGVudCAoQ1NTKSBwaXhlbHMuIFdoZW4gdGhlIHZhbHVlIGlzIHllcyBhbmQgdGhlIHBhZ2UgY29udGFpbnMgdGhlIHZpZXdwb3J0IG1ldGEgdGFnLCB0aGUgdmFsdWUgb2YgdGhlIHdpZHRoIHNwZWNpZmllZCBpbiB0aGUgdGFnIGlzIHVzZWQuIElmIHRoZSBwYWdlIGRvZXMgbm90IGNvbnRhaW4gdGhlIHRhZyBvciBkb2VzIG5vdCBwcm92aWRlIGEgd2lkdGgsIHRoZW4gYSB3aWRlIHZpZXdwb3J0IHdpbGwgYmUgdXNlZC4gKGRlZmF1bHRzIHRvIHllcykuICovXG4gIHVzZVdpZGVWaWV3UG9ydD86ICd5ZXMnIHwgJ25vJztcbiAgLyoqIChpT1MgT25seSkgU2V0IHRvIHllcyB0byB1c2UgV0tXZWJWaWV3IGVuZ2luZSBmb3IgdGhlIEluYXBwQnJvd3Nlci4gT21pdCBvciBzZXQgdG8gbm8gKGRlZmF1bHQpIHRvIHVzZSBVSVdlYlZpZXcuICovXG4gIHVzZXdrd2Vidmlldz86ICd5ZXMnIHwgJ25vJztcbiAgLyoqIChBbmRyb2lkIE9ubHkpIFNldCB0byB5ZXMgdG8gc2hvdyBBbmRyb2lkIGJyb3dzZXIncyB6b29tIGNvbnRyb2xzLCBzZXQgdG8gbm8gdG8gaGlkZSB0aGVtLiBEZWZhdWx0IHZhbHVlIGlzIHllcy4gKi9cbiAgem9vbT86ICd5ZXMnIHwgJ25vJztcbiAgLyoqXG4gICAqIEBoaWRkZW5cbiAgICovXG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IHR5cGUgSW5BcHBCcm93c2VyRXZlbnRUeXBlID1cbiAgfCAnbG9hZHN0YXJ0J1xuICB8ICdsb2Fkc3RvcCdcbiAgfCAnbG9hZGVycm9yJ1xuICB8ICdleGl0J1xuICB8ICdiZWZvcmVsb2FkJ1xuICB8ICdtZXNzYWdlJ1xuICB8ICdjdXN0b21zY2hlbWUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEluQXBwQnJvd3NlckV2ZW50IGV4dGVuZHMgRXZlbnQge1xuICAvKiogdGhlIGV2ZW50IG5hbWUgKi9cbiAgdHlwZTogc3RyaW5nO1xuICAvKiogdGhlIFVSTCB0aGF0IHdhcyBsb2FkZWQuICovXG4gIHVybDogc3RyaW5nO1xuICAvKiogdGhlIGVycm9yIGNvZGUsIG9ubHkgaW4gdGhlIGNhc2Ugb2YgbG9hZGVycm9yLiAqL1xuICBjb2RlOiBudW1iZXI7XG4gIC8qKiB0aGUgZXJyb3IgbWVzc2FnZSwgb25seSBpbiB0aGUgY2FzZSBvZiBsb2FkZXJyb3IuICovXG4gIG1lc3NhZ2U6IHN0cmluZztcbiAgLyoqIHRoZSBwb3N0TWVzc2FnZSBkYXRhLCBvbmx5IGluIHRoZSBjYXNlIG9mIG1lc3NhZ2UuICovXG4gIGRhdGE6IGFueTtcbn1cblxuLyoqXG4gKiBAaGlkZGVuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbkFwcEJyb3dzZXJPYmplY3Qge1xuICBwcml2YXRlIF9vYmplY3RJbnN0YW5jZTogYW55O1xuXG4gIC8qKlxuICAgKiBPcGVucyBhIFVSTCBpbiBhIG5ldyBJbkFwcEJyb3dzZXIgaW5zdGFuY2UsIHRoZSBjdXJyZW50IGJyb3dzZXIgaW5zdGFuY2UsIG9yIHRoZSBzeXN0ZW0gYnJvd3Nlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAgICAgVGhlIFVSTCB0byBsb2FkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3RhcmdldD1cInNlbGZcIl0gIFRoZSB0YXJnZXQgaW4gd2hpY2ggdG8gbG9hZCB0aGUgVVJMLCBhbiBvcHRpb25hbCBwYXJhbWV0ZXIgdGhhdCBkZWZhdWx0cyB0byBfc2VsZi5cbiAgICogICAgICAgICAgICAgICAgIF9zZWxmOiBPcGVucyBpbiB0aGUgV2ViVmlldyBpZiB0aGUgVVJMIGlzIGluIHRoZSB3aGl0ZSBsaXN0LCBvdGhlcndpc2UgaXQgb3BlbnMgaW4gdGhlIEluQXBwQnJvd3Nlci5cbiAgICogICAgICAgICAgICAgICAgIF9ibGFuazogT3BlbnMgaW4gdGhlIEluQXBwQnJvd3Nlci5cbiAgICogICAgICAgICAgICAgICAgIF9zeXN0ZW06IE9wZW5zIGluIHRoZSBzeXN0ZW0ncyB3ZWIgYnJvd3Nlci5cbiAgICogQHBhcmFtIHtzdHJpbmcgfCBJbkFwcEJyb3dzZXJPcHRpb25zfSBbb3B0aW9uc10gT3B0aW9ucyBmb3IgdGhlIEluQXBwQnJvd3Nlci4gT3B0aW9uYWwsIGRlZmF1bHRpbmcgdG86IGxvY2F0aW9uPXllcy5cbiAgICogICAgICAgICAgICAgICAgIFRoZSBvcHRpb25zIHN0cmluZyBtdXN0IG5vdCBjb250YWluIGFueSBibGFuayBzcGFjZSwgYW5kIGVhY2ggZmVhdHVyZSdzXG4gICAqICAgICAgICAgICAgICAgICBuYW1lL3ZhbHVlIHBhaXJzIG11c3QgYmUgc2VwYXJhdGVkIGJ5IGEgY29tbWEuIEZlYXR1cmUgbmFtZXMgYXJlIGNhc2UgaW5zZW5zaXRpdmUuXG4gICAqL1xuICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgdGFyZ2V0Pzogc3RyaW5nLCBvcHRpb25zPzogc3RyaW5nIHwgSW5BcHBCcm93c2VyT3B0aW9ucykge1xuICAgIHRyeSB7XG4gICAgICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucyAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgb3B0aW9ucyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpXG4gICAgICAgICAgLm1hcCgoa2V5OiBzdHJpbmcpID0+IGAke2tleX09JHsob3B0aW9ucyBhcyBJbkFwcEJyb3dzZXJPcHRpb25zKVtrZXldfWApXG4gICAgICAgICAgLmpvaW4oJywnKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fb2JqZWN0SW5zdGFuY2UgPSBjb3Jkb3ZhLkluQXBwQnJvd3Nlci5vcGVuKHVybCwgdGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93Lm9wZW4odXJsLCB0YXJnZXQpO1xuICAgICAgfVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnTmF0aXZlOiBJbkFwcEJyb3dzZXIgaXMgbm90IGluc3RhbGxlZCBvciB5b3UgYXJlIHJ1bm5pbmcgb24gYSBicm93c2VyLiBGYWxsaW5nIGJhY2sgdG8gd2luZG93Lm9wZW4uJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIGJlIGNhbGxlZCBhZnRlciB0aGUgXCJiZWZvcmVsb2FkXCIgZXZlbnQgdG8gY29udGludWUgdGhlIHNjcmlwdFxuICAgKiBAcGFyYW0gc3RyVXJsIHtTdHJpbmd9IFRoZSBVUkwgdGhlIEluQXBwQnJvd3NlciBzaG91bGQgbmF2aWdhdGUgdG8uXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBfbG9hZEFmdGVyQmVmb3JlbG9hZChzdHJVcmw6IHN0cmluZyk6IHZvaWQge31cblxuICAvKipcbiAgICogRGlzcGxheXMgYW4gSW5BcHBCcm93c2VyIHdpbmRvdyB0aGF0IHdhcyBvcGVuZWQgaGlkZGVuLiBDYWxsaW5nIHRoaXMgaGFzIG5vIGVmZmVjdFxuICAgKiBpZiB0aGUgSW5BcHBCcm93c2VyIHdhcyBhbHJlYWR5IHZpc2libGUuXG4gICAqL1xuICBAQ29yZG92YUluc3RhbmNlKHsgc3luYzogdHJ1ZSB9KVxuICBzaG93KCk6IHZvaWQge31cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBJbkFwcEJyb3dzZXIgd2luZG93LlxuICAgKi9cbiAgQENvcmRvdmFJbnN0YW5jZSh7IHN5bmM6IHRydWUgfSlcbiAgY2xvc2UoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBIaWRlcyBhbiBJbkFwcEJyb3dzZXIgd2luZG93IHRoYXQgaXMgY3VycmVudGx5IHNob3duLiBDYWxsaW5nIHRoaXMgaGFzIG5vIGVmZmVjdFxuICAgKiBpZiB0aGUgSW5BcHBCcm93c2VyIHdhcyBhbHJlYWR5IGhpZGRlbi5cbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoeyBzeW5jOiB0cnVlIH0pXG4gIGhpZGUoKTogdm9pZCB7fVxuXG4gIC8qKlxuICAgKiBJbmplY3RzIEphdmFTY3JpcHQgY29kZSBpbnRvIHRoZSBJbkFwcEJyb3dzZXIgd2luZG93LlxuICAgKiBAcGFyYW0gc2NyaXB0IHtPYmplY3R9IERldGFpbHMgb2YgdGhlIHNjcmlwdCB0byBydW4sIHNwZWNpZnlpbmcgZWl0aGVyIGEgZmlsZSBvciBjb2RlIGtleS5cbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoKVxuICBleGVjdXRlU2NyaXB0KHNjcmlwdDogeyBmaWxlPzogc3RyaW5nOyBjb2RlPzogc3RyaW5nIH0pOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbmplY3RzIENTUyBpbnRvIHRoZSBJbkFwcEJyb3dzZXIgd2luZG93LlxuICAgKiBAcGFyYW0gY3NzIHtPYmplY3R9IERldGFpbHMgb2YgdGhlIHNjcmlwdCB0byBydW4sIHNwZWNpZnlpbmcgZWl0aGVyIGEgZmlsZSBvciBjb2RlIGtleS5cbiAgICogQHJldHVybnMge1Byb21pc2U8YW55Pn1cbiAgICovXG4gIEBDb3Jkb3ZhSW5zdGFuY2UoKVxuICBpbnNlcnRDU1MoY3NzOiB7IGZpbGU/OiBzdHJpbmc7IGNvZGU/OiBzdHJpbmcgfSk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbWV0aG9kIHRoYXQgYWxsb3dzIHlvdSB0byBsaXN0ZW4gdG8gZXZlbnRzIGhhcHBlbmluZyBpbiB0aGUgYnJvd3Nlci5cbiAgICogQHBhcmFtIGV2ZW50IHtJbkFwcEJyb3dzZXJFdmVudFR5cGV9IE5hbWUgb2YgdGhlIGV2ZW50XG4gICAqIEByZXR1cm5zIHtPYnNlcnZhYmxlPEluQXBwQnJvd3NlckV2ZW50Pn0gUmV0dXJucyBiYWNrIGFuIG9ic2VydmFibGUgdGhhdCB3aWxsIGxpc3RlbiB0byB0aGUgZXZlbnQgb24gc3Vic2NyaWJlLCBhbmQgd2lsbCBzdG9wIGxpc3RlbmluZyB0byB0aGUgZXZlbnQgb24gdW5zdWJzY3JpYmUuXG4gICAqL1xuICBASW5zdGFuY2VDaGVjaygpXG4gIG9uKGV2ZW50OiBJbkFwcEJyb3dzZXJFdmVudFR5cGUpOiBPYnNlcnZhYmxlPEluQXBwQnJvd3NlckV2ZW50PiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPEluQXBwQnJvd3NlckV2ZW50Pigob2JzZXJ2ZXI6IE9ic2VydmVyPEluQXBwQnJvd3NlckV2ZW50PikgPT4ge1xuICAgICAgdGhpcy5fb2JqZWN0SW5zdGFuY2UuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgb2JzZXJ2ZXIubmV4dC5iaW5kKG9ic2VydmVyKSk7XG4gICAgICByZXR1cm4gKCkgPT4gdGhpcy5fb2JqZWN0SW5zdGFuY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgb2JzZXJ2ZXIubmV4dC5iaW5kKG9ic2VydmVyKSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQSBtZXRob2QgdGhhdCBhbGxvd3MgeW91IHRvIGxpc3RlbiB0byBldmVudHMgaGFwcGVuaW5nIGluIHRoZSBicm93c2VyLlxuICAgKiBAcGFyYW0gZXZlbnQge3N0cmluZ30gTmFtZSBvZiB0aGUgZXZlbnRcbiAgICogQHJldHVybnMge09ic2VydmFibGU8SW5BcHBCcm93c2VyRXZlbnQ+fSBSZXR1cm5zIGJhY2sgYW4gb2JzZXJ2YWJsZSB0aGF0IHdpbGwgbGlzdGVuIHRvIHRoZSBldmVudCBvbiBzdWJzY3JpYmUsIGFuZCB3aWxsIHN0b3AgbGlzdGVuaW5nIHRvIHRoZSBldmVudCBvbiB1bnN1YnNjcmliZS5cbiAgICovXG4gIEBJbnN0YW5jZUNoZWNrKClcbiAgb24oZXZlbnQ6IHN0cmluZyk6IE9ic2VydmFibGU8SW5BcHBCcm93c2VyRXZlbnQ+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8SW5BcHBCcm93c2VyRXZlbnQ+KChvYnNlcnZlcjogT2JzZXJ2ZXI8SW5BcHBCcm93c2VyRXZlbnQ+KSA9PiB7XG4gICAgICB0aGlzLl9vYmplY3RJbnN0YW5jZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBvYnNlcnZlci5uZXh0LmJpbmQob2JzZXJ2ZXIpKTtcbiAgICAgIHJldHVybiAoKSA9PiB0aGlzLl9vYmplY3RJbnN0YW5jZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBvYnNlcnZlci5uZXh0LmJpbmQob2JzZXJ2ZXIpKTtcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIEBuYW1lIEluIEFwcCBCcm93c2VyXG4gKiBAcHJlbWllciBpbmFwcGJyb3dzZXJcbiAqIEBkZXNjcmlwdGlvbiBMYXVuY2hlcyBpbiBhcHAgQnJvd3NlclxuICogQHVzYWdlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBJbkFwcEJyb3dzZXIgfSBmcm9tICdAaW9uaWMtbmF0aXZlL2luLWFwcC1icm93c2VyL25neCc7XG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBpYWI6IEluQXBwQnJvd3NlcikgeyB9XG4gKlxuICpcbiAqIC4uLlxuICpcbiAqXG4gKiBjb25zdCBicm93c2VyID0gdGhpcy5pYWIuY3JlYXRlKCdodHRwczovL2lvbmljZnJhbWV3b3JrLmNvbS8nKTtcbiAqXG4gKiBicm93c2VyLmV4ZWN1dGVTY3JpcHQoLi4uKTtcbiAqXG4gKiBicm93c2VyLmluc2VydENTUyguLi4pO1xuICogYnJvd3Nlci5vbignbG9hZHN0b3AnKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICogICAgYnJvd3Nlci5pbnNlcnRDU1MoeyBjb2RlOiBcImJvZHl7Y29sb3I6IHJlZDtcIiB9KTtcbiAqIH0pO1xuICpcbiAqIGJyb3dzZXIuY2xvc2UoKTtcbiAqXG4gKiBgYGBcbiAqIEBjbGFzc2VzXG4gKiBJbkFwcEJyb3dzZXJPYmplY3RcbiAqIEBpbnRlcmZhY2VzXG4gKiBJbkFwcEJyb3dzZXJFdmVudFxuICogSW5BcHBCcm93c2VyT3B0aW9uc1xuICovXG5AUGx1Z2luKHtcbiAgcGx1Z2luTmFtZTogJ0luQXBwQnJvd3NlcicsXG4gIHBsdWdpbjogJ2NvcmRvdmEtcGx1Z2luLWluYXBwYnJvd3NlcicsXG4gIHBsdWdpblJlZjogJ2NvcmRvdmEuSW5BcHBCcm93c2VyJyxcbiAgcmVwbzogJ2h0dHBzOi8vZ2l0aHViLmNvbS9hcGFjaGUvY29yZG92YS1wbHVnaW4taW5hcHBicm93c2VyJyxcbiAgcGxhdGZvcm1zOiBbJ0FtYXpvbkZpcmUgT1MnLCAnQW5kcm9pZCcsICdCcm93c2VyJywgJ2lPUycsICdtYWNPUycsICdXaW5kb3dzJ10sXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEluQXBwQnJvd3NlciBleHRlbmRzIElvbmljTmF0aXZlUGx1Z2luIHtcbiAgLyoqXG4gICAqIE9wZW5zIGEgVVJMIGluIGEgbmV3IEluQXBwQnJvd3NlciBpbnN0YW5jZSwgdGhlIGN1cnJlbnQgYnJvd3NlciBpbnN0YW5jZSwgb3IgdGhlIHN5c3RlbSBicm93c2VyLlxuICAgKiBAcGFyYW0gIHVybCB7c3RyaW5nfSAgICAgVGhlIFVSTCB0byBsb2FkLlxuICAgKiBAcGFyYW0gIHRhcmdldCB7c3RyaW5nfSAgVGhlIHRhcmdldCBpbiB3aGljaCB0byBsb2FkIHRoZSBVUkwsIGFuIG9wdGlvbmFsIHBhcmFtZXRlciB0aGF0IGRlZmF1bHRzIHRvIF9zZWxmLlxuICAgKiBAcGFyYW0gIG9wdGlvbnMge3N0cmluZ30gT3B0aW9ucyBmb3IgdGhlIEluQXBwQnJvd3Nlci4gT3B0aW9uYWwsIGRlZmF1bHRpbmcgdG86IGxvY2F0aW9uPXllcy5cbiAgICogICAgICAgICAgICAgICAgIFRoZSBvcHRpb25zIHN0cmluZyBtdXN0IG5vdCBjb250YWluIGFueSBibGFuayBzcGFjZSwgYW5kIGVhY2ggZmVhdHVyZSdzXG4gICAqICAgICAgICAgICAgICAgICBuYW1lL3ZhbHVlIHBhaXJzIG11c3QgYmUgc2VwYXJhdGVkIGJ5IGEgY29tbWEuIEZlYXR1cmUgbmFtZXMgYXJlIGNhc2UgaW5zZW5zaXRpdmUuXG4gICAqIEByZXR1cm5zIHtJbkFwcEJyb3dzZXJPYmplY3R9XG4gICAqL1xuICBjcmVhdGUodXJsOiBzdHJpbmcsIHRhcmdldD86IHN0cmluZywgb3B0aW9ucz86IHN0cmluZyB8IEluQXBwQnJvd3Nlck9wdGlvbnMpOiBJbkFwcEJyb3dzZXJPYmplY3Qge1xuICAgIHJldHVybiBuZXcgSW5BcHBCcm93c2VyT2JqZWN0KHVybCwgdGFyZ2V0LCBvcHRpb25zKTtcbiAgfVxufVxuIl19

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/idea-entry/idea-detail/idea-detail.page.html":
/*!****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/idea-entry/idea-detail/idea-detail.page.html ***!
  \****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<ion-header>\r\n  <ion-toolbar color=\"primary\">\r\n\r\n    <ion-buttons slot=\"start\">\r\n      <ion-menu-button></ion-menu-button>\r\n      <ion-back-button></ion-back-button>\r\n    </ion-buttons>\r\n\r\n    <ion-title>Chi tiết ý tưởng</ion-title>\r\n\r\n  </ion-toolbar>\r\n</ion-header>\r\n\r\n<ion-content>\r\n\r\n  <!-- Hiển thị avatar -->\r\n  <ion-item lines=\"none\" class=\"idea-created\">\r\n    <ion-avatar slot=\"start\">\r\n      <img src=\"{{ideaInfo?.idea?.avatar}}\">\r\n    </ion-avatar>\r\n    <ion-label>\r\n      <strong>\r\n        {{ideaInfo?.idea?.username}}\r\n      </strong>\r\n      <br>\r\n      <ion-note>{{ideaInfo?.idea?.created_time | timeAgo}}</ion-note>\r\n    </ion-label>\r\n    <ion-button (click)=\"onClickMore($event)\" slot=\"end\" shape=\"round\" fill=\"clear\" size=\"small\">\r\n      <ion-icon slot=\"icon-only\" name=\"more\"></ion-icon>\r\n    </ion-button>\r\n  </ion-item>\r\n\r\n  <!-- Hiển thị thông tin chi tiết của ý tưởng -->\r\n  <ion-list>\r\n    <ion-item>\r\n      <strong slot=\"start\" *ngIf=\"!isMobile\">\r\n        Chủ đề:\r\n      </strong>\r\n      <ion-label class=\"ion-text-wrap\">\r\n        <strong slot=\"start\" *ngIf=\"isMobile\">\r\n          Chủ đề:<br>\r\n        </strong>\r\n        <strong>#{{ideaInfo?.idea?.id}}</strong> {{ideaInfo?.idea?.title}}\r\n      </ion-label>\r\n    </ion-item>\r\n    <ion-item>\r\n      <strong slot=\"start\" *ngIf=\"!isMobile\">\r\n        Nội dung:\r\n      </strong>\r\n      <ion-label class=\"ion-text-wrap\">\r\n        <strong slot=\"start\" *ngIf=\"isMobile\">\r\n          Nội dung:<br>\r\n        </strong>\r\n        <div [innerHTML]=\"ideaInfo?.idea?.description | linkUrl | newline\"></div>\r\n      </ion-label>\r\n    </ion-item>\r\n    <ion-item>\r\n      <strong slot=\"start\" *ngIf=\"!isMobile\">\r\n        Lĩnh vực:\r\n      </strong>\r\n      <ion-label class=\"ion-text-wrap\">\r\n        <strong slot=\"start\" *ngIf=\"isMobile\">\r\n          Lĩnh vực:<br>\r\n        </strong>\r\n        {{ideaInfo?.idea?.category_name}}\r\n      </ion-label>\r\n    </ion-item>\r\n    <ion-item>\r\n      <strong slot=\"start\" *ngIf=\"!isMobile\">\r\n        Giai đoạn:\r\n      </strong>\r\n      <ion-label class=\"ion-text-wrap\">\r\n        <strong slot=\"start\" *ngIf=\"isMobile\">\r\n          Giai đoạn:<br>\r\n        </strong>\r\n        {{ideaInfo?.idea?.status_name}}\r\n      </ion-label>\r\n    </ion-item>\r\n  </ion-list>\r\n\r\n\r\n  <ion-item lines=\"none\">\r\n\r\n    <!-- Hiện nút cho phép like ý tưởng -->\r\n    <ion-button slot=\"start\" color=\"{{(ideaInfo?.isUserVoted?'secondary':'light')}}\" (click)=\"likeIdea(ideaInfo?.idea)\"\r\n      shape=\"round\" size=\"small\">\r\n      <ion-icon slot=\"start\" name=\"thumbs-up\"></ion-icon>\r\n      {{ideaInfo?.idea?.voted_count}} <span *ngIf=\"!isMobile\">&nbsp;like(s)</span>\r\n    </ion-button>\r\n\r\n    <!-- Hiện nút để kích vào bình luận -->\r\n    <ion-button slot=\"start\" color=\"{{(ideaInfo?.isUserCommented?'success':'light')}}\" (click)=\"focusCommentIdea()\"\r\n      shape=\"round\" size=\"small\">\r\n      <ion-icon slot=\"start\" name=\"chatbubbles\"></ion-icon>\r\n      {{ideaInfo?.comments?.length}} <span *ngIf=\"!isMobile\">&nbsp;comment(s)</span>\r\n    </ion-button>\r\n\r\n    <!-- ý tưởng của mình thì hiện nút màu medium, của người khác thì hiện nút màu tertiary -->\r\n    <ion-button tappable slot=\"start\" color=\"{{(ideaInfo?.idea.user_id === this.userInfo.id?'medium':'tertiary')}}\"\r\n      (click)=\"markIdea(ideaInfo?.idea)\" shape=\"round\" size=\"small\">\r\n      <ion-icon slot=\"start\" name=\"switch\"></ion-icon>\r\n      {{ideaInfo?.idea?.total_point}} <span *ngIf=\"!isMobile\">&nbsp;điểm</span>\r\n    </ion-button>\r\n\r\n    <!-- Hiện số file đính kèm -->\r\n    <ion-label *ngIf=\"ideaInfo?.idea?.attach_id_list?.length>0\" class=\"ion-text-wrap\">\r\n      <ion-icon slot=\"start\" name=\"attach\"></ion-icon>\r\n      {{ideaInfo.idea.attach_id_list.length}}<span *ngIf=\"!isMobile\">&nbsp;File(s) đính kèm</span>\r\n    </ion-label>\r\n\r\n  </ion-item>\r\n\r\n  <!-- Hiển thị nội dung file và image đính kèm của ý tưởng -->\r\n  <div [style.padding-left]=\"'20px'\">\r\n    <img tappable *ngFor=\"let image of ideaInfo?.idea?.images;\" src=\"{{image.src}}\" (click)=\"onClickViewItem(image.id)\"\r\n      class=\"image-comment-size\">\r\n  </div>\r\n  <ion-item [style.padding-left]=\"'20px'\" *ngIf=\"ideaInfo?.idea?.attachs?.length>0\" lines=\"none\">\r\n    <ion-label class=\"ion-text-wrap\">\r\n      <span *ngFor=\"let file of ideaInfo?.idea?.attachs;\">\r\n        <ion-button color=\"primary\" (click)=\"onClickViewItem(file.id)\" fill=\"outline\" shape=\"round\"\r\n          style=\"text-transform:none\">\r\n          {{file.file_name}}\r\n          <ion-icon slot=\"end\" name=\"eye\"></ion-icon>\r\n        </ion-button>\r\n      </span>\r\n    </ion-label>\r\n  </ion-item>\r\n\r\n\r\n  <!-- Nhập nội dung comment để góp ý ở ô này -->\r\n  <ion-card class=\"input-comment\">\r\n    <!-- Hiện thị form để comment -->\r\n    <ion-item lines=\"none\">\r\n      <ion-avatar slot=\"start\">\r\n        <img src=\"{{userInfo?.avatar}}\">\r\n      </ion-avatar>\r\n      <ion-textarea #textComment autosize type=\"text\" placeholder=\"Đóng góp ý kiến ... \" [(ngModel)]=\"message\">\r\n      </ion-textarea>\r\n      <ion-button color=\"medium\" fill=\"clear\" shape=\"round\">\r\n        <input class=\"file-over\" type=\"file\" multiple=\"multiple\" (change)=\"uploadFilesEvent($event)\" accept=\"image/gif, image/jpeg, image/png\r\n                  , application/pdf\r\n                  , .txt, .md\r\n                  , .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel\r\n                  , application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document\" />\r\n        <ion-icon slot=\"icon-only\" name=\"attach\"></ion-icon>\r\n      </ion-button>\r\n      <ion-button color=\"{{(message||uploadingFiles.length>0?'secondary':'light')}}\" (click)=\"onClickSend()\"\r\n        fill=\"clear\" shape=\"round\">\r\n        <ion-icon slot=\"icon-only\" name=\"send\"></ion-icon>\r\n      </ion-button>\r\n    </ion-item>\r\n    <!-- Hiển thị những file, hình ảnh kèm theo trong commment -->\r\n    <ion-item *ngIf=\"uploadingFiles?.length>0\" lines=\"none\">\r\n      <ion-label class=\"ion-text-wrap\">\r\n        <span *ngFor=\"let file of uploadingFiles; let idx=index;\">\r\n          <ion-button *ngIf=\"!file.isImage\" color=\"secondary\" (click)=\"onClickRemoveFile(idx)\" fill=\"outline\"\r\n            shape=\"round\" style=\"text-transform:none\">\r\n            {{file.name}}\r\n            <ion-icon slot=\"end\" name=\"close\"></ion-icon>\r\n          </ion-button>\r\n          <div *ngIf=\"file.isImage\" class=\"image-upload-size\">\r\n            <img src=\"{{file.image}}\">\r\n            <div class='close-button' tappable>\r\n              <ion-icon slot=\"icon-only\" name=\"close\" color=\"medium\" (click)=\"onClickRemoveFile(idx)\"></ion-icon>\r\n            </div>\r\n          </div>\r\n        </span>\r\n      </ion-label>\r\n    </ion-item>\r\n  </ion-card>\r\n\r\n  <!-- Lịch sử góp ý hiển thị theo hình cây ở dưới đây -->\r\n  <ion-list class=\"comment-list\">\r\n    <div *ngFor=\"let comment of ideaInfo?.comments\" [style.padding-left]=\"comment.parent_id?'20px':'0px'\">\r\n      <ion-item lines=\"none\">\r\n        <ion-avatar slot=\"start\" tappable (click)=\"onViewUserPage(comment)\">\r\n          <img src=\"{{comment.avatar}}\">\r\n        </ion-avatar>\r\n        <ion-label class=\"ion-text-wrap comment-backgound\">\r\n          <strong slot=\"start\">\r\n            {{comment.username}}\r\n          </strong>\r\n          <br>\r\n          <ion-label class=\"ion-text-wrap\">\r\n            <div [innerHTML]=\"comment.content| linkUrl | newline | safe\"></div>\r\n          </ion-label>\r\n        </ion-label>\r\n      </ion-item>\r\n      <ion-note [style.padding-left]=\"comment.parent_id?'100px':'80px'\"> {{comment.created_time | timeAgo}} </ion-note>\r\n      <br>\r\n      <div [style.padding-left]=\"comment.parent_id?'80px':'60px'\">\r\n        <img tappable *ngFor=\"let image of comment.images;\" src=\"{{image.src}}\" (click)=\"onClickViewImage(image.id)\"\r\n          class=\"image-comment-size\">\r\n      </div>\r\n      <ion-item [style.padding-left]=\"comment.parent_id?'80px':'60px'\" *ngIf=\"comment.attachs?.length>0\" lines=\"none\">\r\n        <ion-label class=\"ion-text-wrap\">\r\n          <span *ngFor=\"let file of comment.attachs; let idx=index;\">\r\n            <ion-button color=\"dark\" (click)=\"onClickViewFile(file.id)\" fill=\"outline\" shape=\"round\"\r\n              style=\"text-transform:none\">\r\n              {{file.file_name}}\r\n              <ion-icon slot=\"end\" name=\"eye\"></ion-icon>\r\n            </ion-button>\r\n          </span>\r\n        </ion-label>\r\n      </ion-item>\r\n    </div>\r\n  </ion-list>\r\n\r\n</ion-content>");

/***/ }),

/***/ "./src/app/idea-entry/idea-detail/idea-detail-routing.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/idea-entry/idea-detail/idea-detail-routing.module.ts ***!
  \**********************************************************************/
/*! exports provided: IdeaDetailPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaDetailPageRoutingModule", function() { return IdeaDetailPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _idea_detail_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./idea-detail.page */ "./src/app/idea-entry/idea-detail/idea-detail.page.ts");




const routes = [
    {
        path: '',
        component: _idea_detail_page__WEBPACK_IMPORTED_MODULE_3__["IdeaDetailPage"]
    }
];
let IdeaDetailPageRoutingModule = class IdeaDetailPageRoutingModule {
};
IdeaDetailPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], IdeaDetailPageRoutingModule);



/***/ }),

/***/ "./src/app/idea-entry/idea-detail/idea-detail.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/idea-entry/idea-detail/idea-detail.module.ts ***!
  \**************************************************************/
/*! exports provided: IdeaDetailPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaDetailPageModule", function() { return IdeaDetailPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");
/* harmony import */ var _idea_detail_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./idea-detail-routing.module */ "./src/app/idea-entry/idea-detail/idea-detail-routing.module.ts");
/* harmony import */ var _idea_detail_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./idea-detail.page */ "./src/app/idea-entry/idea-detail/idea-detail.page.ts");
/* harmony import */ var src_app_shared_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared.module */ "./src/app/shared.module.ts");
/* harmony import */ var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngxi4-dynamic-service */ "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");
/* harmony import */ var _link_url_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./link.url.pipe */ "./src/app/idea-entry/idea-detail/link.url.pipe.ts");











let IdeaDetailPageModule = class IdeaDetailPageModule {
};
IdeaDetailPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_9__["Ngxi4DynamicServiceModule"],
            src_app_shared_module__WEBPACK_IMPORTED_MODULE_8__["SharedModule"],
            _idea_detail_routing_module__WEBPACK_IMPORTED_MODULE_6__["IdeaDetailPageRoutingModule"]
        ],
        declarations: [_idea_detail_page__WEBPACK_IMPORTED_MODULE_7__["IdeaDetailPage"], _link_url_pipe__WEBPACK_IMPORTED_MODULE_10__["LinkUrlPipe"]],
        providers: [_ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__["InAppBrowser"]]
    })
], IdeaDetailPageModule);



/***/ }),

/***/ "./src/app/idea-entry/idea-detail/idea-detail.page.scss":
/*!**************************************************************!*\
  !*** ./src/app/idea-entry/idea-detail/idea-detail.page.scss ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".file-over {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 2;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n}\n\n.idea-created {\n  border-radius: 2em;\n  opacity: 0.9;\n  margin: 5px;\n  border-style: solid;\n  border-color: gray;\n  border-width: 1px;\n}\n\n.input-comment {\n  border-radius: 2em;\n  opacity: 0.9;\n  margin: 15px;\n  border-style: solid;\n  border-color: green;\n  border-width: 1px;\n  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.5);\n}\n\n.comment-backgound {\n  position: relative;\n  border-radius: 1em;\n  opacity: 0.9;\n  padding: 8px;\n  background: whitesmoke;\n}\n\n.comment-list {\n  margin: 15px;\n}\n\n.image-comment-size {\n  max-width: 200px;\n  margin: 2px;\n  border-radius: 0.5em;\n  border-style: solid;\n  border-color: black;\n  border-width: 1px;\n}\n\n.image-upload-size {\n  position: relative;\n  max-width: 200px;\n  margin: 2px;\n  padding: 3px;\n  border-radius: 0.5em;\n  border-style: solid;\n  border-color: black;\n  border-width: 1px;\n}\n\n.image-upload-size .close-button {\n  position: absolute;\n  top: 2%;\n  left: 80%;\n  font-size: 30px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaWRlYS1lbnRyeS9pZGVhLWRldGFpbC9EOlxcRElOSE5WXFxNeURhdGFcXExBUFRSSU5IXFxOT0RFNFxcbm9kZTQtaW5vdmF0aW9uXFxjbGllbnQvc3JjXFxhcHBcXGlkZWEtZW50cnlcXGlkZWEtZGV0YWlsXFxpZGVhLWRldGFpbC5wYWdlLnNjc3MiLCJzcmMvYXBwL2lkZWEtZW50cnkvaWRlYS1kZXRhaWwvaWRlYS1kZXRhaWwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0FDQ0o7O0FERUE7RUFDSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FDQ0o7O0FEQ0E7RUFFSSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsMkNBQUE7QUNDSjs7QURDQTtFQUNJLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0FDRUo7O0FEQ0E7RUFDSSxZQUFBO0FDRUo7O0FEQ0E7RUFDSSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQ0VKOztBRENBO0VBQ0ksa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7QUNFSjs7QURDQTtFQUNJLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FDRUoiLCJmaWxlIjoic3JjL2FwcC9pZGVhLWVudHJ5L2lkZWEtZGV0YWlsL2lkZWEtZGV0YWlsLnBhZ2Uuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5maWxlLW92ZXIge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHotaW5kZXg6IDI7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIG9wYWNpdHk6IDA7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5pZGVhLWNyZWF0ZWR7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyZW07XHJcbiAgICBvcGFjaXR5OiAwLjk7XHJcbiAgICBtYXJnaW46IDVweDtcclxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICBib3JkZXItY29sb3I6IGdyYXk7XHJcbiAgICBib3JkZXItd2lkdGg6IDFweDtcclxufVxyXG4uaW5wdXQtY29tbWVudHtcclxuICAgIC8vIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDJlbTtcclxuICAgIG9wYWNpdHk6IDAuOTtcclxuICAgIG1hcmdpbjogMTVweDtcclxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICBib3JkZXItY29sb3I6IGdyZWVuO1xyXG4gICAgYm9yZGVyLXdpZHRoOiAxcHg7XHJcbiAgICBib3gtc2hhZG93OiAwcHggM3B4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xyXG59XHJcbi5jb21tZW50LWJhY2tnb3VuZHtcclxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDFlbTtcclxuICAgIG9wYWNpdHk6IDAuOTtcclxuICAgIHBhZGRpbmc6IDhweDtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlc21va2U7XHJcbn1cclxuXHJcbi5jb21tZW50LWxpc3R7XHJcbiAgICBtYXJnaW46IDE1cHg7XHJcbn1cclxuXHJcbi5pbWFnZS1jb21tZW50LXNpemV7XHJcbiAgICBtYXgtd2lkdGg6IDIwMHB4O1xyXG4gICAgbWFyZ2luOiAycHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAwLjVlbTtcclxuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICBib3JkZXItY29sb3I6YmxhY2s7XHJcbiAgICBib3JkZXItd2lkdGg6IDFweDtcclxufVxyXG5cclxuLmltYWdlLXVwbG9hZC1zaXple1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgbWF4LXdpZHRoOiAyMDBweDtcclxuICAgIG1hcmdpbjogMnB4O1xyXG4gICAgcGFkZGluZzogM3B4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMC41ZW07XHJcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xyXG4gICAgYm9yZGVyLWNvbG9yOiBibGFjaztcclxuICAgIGJvcmRlci13aWR0aDogMXB4O1xyXG59XHJcblxyXG4uaW1hZ2UtdXBsb2FkLXNpemUgLmNsb3NlLWJ1dHRvbiB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDIlO1xyXG4gICAgbGVmdDogODAlO1xyXG4gICAgZm9udC1zaXplOiAzMHB4O1xyXG59IiwiLmZpbGUtb3ZlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB6LWluZGV4OiAyO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBvcGFjaXR5OiAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5pZGVhLWNyZWF0ZWQge1xuICBib3JkZXItcmFkaXVzOiAyZW07XG4gIG9wYWNpdHk6IDAuOTtcbiAgbWFyZ2luOiA1cHg7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogZ3JheTtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG59XG5cbi5pbnB1dC1jb21tZW50IHtcbiAgYm9yZGVyLXJhZGl1czogMmVtO1xuICBvcGFjaXR5OiAwLjk7XG4gIG1hcmdpbjogMTVweDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiBncmVlbjtcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG4gIGJveC1zaGFkb3c6IDBweCAzcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuNSk7XG59XG5cbi5jb21tZW50LWJhY2tnb3VuZCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYm9yZGVyLXJhZGl1czogMWVtO1xuICBvcGFjaXR5OiAwLjk7XG4gIHBhZGRpbmc6IDhweDtcbiAgYmFja2dyb3VuZDogd2hpdGVzbW9rZTtcbn1cblxuLmNvbW1lbnQtbGlzdCB7XG4gIG1hcmdpbjogMTVweDtcbn1cblxuLmltYWdlLWNvbW1lbnQtc2l6ZSB7XG4gIG1heC13aWR0aDogMjAwcHg7XG4gIG1hcmdpbjogMnB4O1xuICBib3JkZXItcmFkaXVzOiAwLjVlbTtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiBibGFjaztcbiAgYm9yZGVyLXdpZHRoOiAxcHg7XG59XG5cbi5pbWFnZS11cGxvYWQtc2l6ZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWF4LXdpZHRoOiAyMDBweDtcbiAgbWFyZ2luOiAycHg7XG4gIHBhZGRpbmc6IDNweDtcbiAgYm9yZGVyLXJhZGl1czogMC41ZW07XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci1jb2xvcjogYmxhY2s7XG4gIGJvcmRlci13aWR0aDogMXB4O1xufVxuXG4uaW1hZ2UtdXBsb2FkLXNpemUgLmNsb3NlLWJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAyJTtcbiAgbGVmdDogODAlO1xuICBmb250LXNpemU6IDMwcHg7XG59Il19 */");

/***/ }),

/***/ "./src/app/idea-entry/idea-detail/idea-detail.page.ts":
/*!************************************************************!*\
  !*** ./src/app/idea-entry/idea-detail/idea-detail.page.ts ***!
  \************************************************************/
/*! exports provided: IdeaDetailPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IdeaDetailPage", function() { return IdeaDetailPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngxi4-dynamic-service */ "./node_modules/ngxi4-dynamic-service/fesm2015/ngxi4-dynamic-service.js");
/* harmony import */ var src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/main.service */ "./src/app/services/main.service.ts");
/* harmony import */ var _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic-native/in-app-browser/ngx */ "./node_modules/@ionic-native/in-app-browser/ngx/index.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");







let IdeaDetailPage = class IdeaDetailPage {
    constructor(route, apiCommons, apiAuth, mainService, iab) {
        this.route = route;
        this.apiCommons = apiCommons;
        this.apiAuth = apiAuth;
        this.mainService = mainService;
        this.iab = iab;
        this.uploadingFiles = [];
        this.isMobile = false;
        // hàm gọi lại xử lý form popup
        this.callbackProcess = function (res) {
            return new Promise((resolve, reject) => {
                // console.log(res);
                if (res.error) {
                    this.apiCommons.presentAlert('Error:<br>' + (res.message ? res.message : "Error Unknow: " + JSON.stringify(res.error, null, 2)));
                }
                else if (res.response_data) {
                    if (res.button.command === "MARK") {
                        this.refresh(res.button.id);
                    }
                    if (res.button.command === "EDIT") {
                        this.refresh(res.button.id);
                    }
                }
                resolve({ next: "CLOSE" });
            });
        }.bind(this);
        this.init();
    }
    ngOnInit() {
        this.route.queryParams.subscribe(item => {
            // console.log('item', item);
            // đọc chi tiết để hiển thị nội dung chi tiết ra
            this.refresh(item.id);
        });
    }
    init() {
        this.isMobile = this.apiCommons.isMobile();
        this.userInfo = this.mainService.getUserInfo();
    }
    // lấy ý tưởng theo id
    refresh(id) {
        this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea?id=' + id, true)
            .then(ideaDetail => {
            this.ideaInfo = ideaDetail;
            this.refreshUserAction();
            // console.log(this.ideaInfo);
        })
            .catch(err => console.log('Lỗi lấy chi tiết', err));
    }
    // Lấy file cho ý tưởng và comment
    // Kiểm tra userInfo này đã like, comment hoặc chấm điểm chưa?
    refreshUserAction() {
        if (this.ideaInfo && this.ideaInfo.likes && this.ideaInfo.comments) {
            //Lấy các file cho ý tưởng
            if (this.ideaInfo.idea && this.ideaInfo.idea.attach_id_list) {
                // thực hiện truy vấn lấy danh sách file đính kèm
                this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-attach-files?id_list=' + JSON.stringify(this.ideaInfo.idea.attach_id_list), true)
                    .then(list => {
                    if (list && Array.isArray(list.images)) {
                        this.ideaInfo.idea.images = list.images;
                        this.ideaInfo.idea.images.forEach(file => file.src = this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-file-id?id=" + file.id);
                    }
                    if (list && Array.isArray(list.files)) {
                        this.ideaInfo.idea.attachs = list.files;
                    }
                })
                    .catch(err => {
                    console.log('Lỗi lấy file: ', err);
                });
            }
            // Kiểm tra this.userInfo này đã like ý tưởng này chưa?
            this.ideaInfo.isUserVoted = this.ideaInfo.likes.findIndex(x => x.user_id === this.userInfo.id && x.activities_type > 0) >= 0;
            // Kiểm tra this.userInfo này đã comment ý tưởng này chưa?
            this.ideaInfo.isUserCommented = this.ideaInfo.comments.findIndex(x => x.user_id === this.userInfo.id) >= 0;
            //Kiểm tra this.userInfo này đã chấm điểm ý tưởng này chưa?
            this.ideaInfo.isUserMarked = this.ideaInfo.marks.findIndex(x => x.user_id === this.userInfo.id) >= 0;
            //Lấy các file cho các bình luận
            this.ideaInfo.comments.forEach(el => {
                if (el.attach_id_list) {
                    // thực hiện truy vấn lấy danh sách file đính kèm - tên file, kiểu file, id để hiển thị ra
                    this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-attach-files?id_list=' + JSON.stringify(el.attach_id_list), true)
                        .then(list => {
                        if (list && Array.isArray(list.images)) {
                            el.images = list.images;
                            el.images.forEach(file => file.src = this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-file-id?id=" + file.id);
                        }
                        if (list && Array.isArray(list.files)) {
                            el.attachs = list.files;
                        }
                    })
                        .catch(err => {
                        console.log('Lỗi lấy file: ', err);
                    });
                }
            });
        }
    }
    // focus đến ô comments
    focusCommentIdea() {
        this.textAreaElement.setFocus();
    }
    // Bấm vào nút more 
    onClickMore(ev) {
        /* kiểm tra quyền của userInfo mà hiển thị menu khác nhau
        + nếu user không thuộc ý tưởng, thì có quyền chấm điểm cho ý tưởng này
        + nếu là ý tưởng thuộc user thì cho phép sửa nội dung, chuyển trạng thái */
        // cụ thể như sau: Nếu role là
        /*
          1	User thường	User  -- hiển thị mỗi một menu chấm điểm (nếu không phải ý tưởng của mình)
                              -- Hoặc menu sửa ý tưởng, chuyển trạng thái (nếu là ý tưởng của mình)
          
          99	Developper	Người phát triển -- hiển thị hết menu
         */
        let settingsMenu = [];
        // menu đầy đủ
        // trường hợp nào thì sẽ xóa bỏ menu tương ứng
        const allMenu = [
            // Cho tất cả mọi người trừ userInfo==idea
            {
                id: 1,
                name: "Chấm điểm ý tưởng này",
                value: "MARK",
                icon: {
                    name: "microphone",
                    color: "warning"
                }
            },
            //Chỉnh sửa ý tưởng (cho user_id của ý tưởng đó)
            {
                id: 2,
                name: "Sửa ý tưởng này",
                value: "EDIT",
                icon: {
                    name: "create",
                    color: "primary"
                }
            },
            // chỉ cho admin 99, và user_id của ý tưởng trùng với nó
            {
                id: 3,
                name: "Chuyển trạng thái",
                value: "CHANGE",
                icon: {
                    name: "hourglass",
                    color: "primary"
                }
            },
            // chỉ cho admin 99
            {
                id: 4,
                name: "Xóa ý tưởng này",
                value: "TRASH",
                icon: {
                    name: "trash",
                    color: "danger"
                }
            }
        ];
        if (this.userInfo && this.ideaInfo && this.ideaInfo.idea) {
            //user_id của ý tưởng trùng với id của userInfo
            if (this.ideaInfo.idea.user_id === this.userInfo.id) {
                // cho phép sửa hoặc chuyển trạng thái
                settingsMenu = allMenu.filter(x => x.id === 2 || x.id === 3);
            }
            else {
                // chỉ cho phép chấm điểm
                settingsMenu = allMenu.filter(x => x.id === 1);
            }
            // Nếu là admin thì phân quyền như sau:
            if (this.userInfo.role === 99) {
                // Nếu là ý tưởng của admin thì không có quyền chấm điểm
                if (this.ideaInfo.idea.user_id === this.userInfo.id) {
                    settingsMenu = allMenu.filter(x => x.id !== 1);
                }
                else {
                    // toàn quyền
                    settingsMenu = allMenu;
                }
            }
        }
        this.apiCommons.presentPopover(ev, ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["PopoverCardComponent"], {
            type: 'single-choice',
            title: "Chọn chức năng",
            color: "primary",
            menu: settingsMenu
        })
            .then(data => {
            this.processDetails(data);
        })
            .catch(err => {
            console.log('err: ', err);
        });
    }
    // Thực thi lệnh khi chọn nút more
    processDetails(data) {
        let cmd = data.value;
        // console.log('lenh', cmd);
        if (this.ideaInfo && this.ideaInfo.idea) {
            if (cmd === 'MARK') {
                // gọi form chấm điểm
                this.markIdea(this.ideaInfo.idea);
            }
            else if (cmd === 'EDIT') {
                //  sửa ý tưởng này
                this.editIdea(this.ideaInfo.idea);
            }
            else if (cmd === 'CHANGE') {
                //  thay đổi trạng thái ý tưởng
                this.changeStatusIdea(this.ideaInfo.idea);
            }
            else if (cmd === 'TRASH') {
                //  loại bỏ ý tưởng này
                this.trashIdea(this.ideaInfo.idea);
            }
        }
    }
    // Người dùng bấm nút like
    likeIdea(item) {
        this.apiAuth.postDynamicJson(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/like-idea', { id: item.id }, true)
            .then(idea => {
            // console.log(idea);
            this.ideaInfo = idea; // lấy lại nội dung này
            this.refreshUserAction();
        })
            .catch(err => console.log(err));
    }
    // Sự kiện người dùng chọn file để upload khi comment
    uploadFilesEvent(evt) {
        if (!evt.target || !evt.target.files || !evt.target.files.length)
            return;
        for (let file of evt.target.files) {
            if (file.type.indexOf('image') >= 0) {
                file.isImage = true;
                const fr = new FileReader();
                fr.onloadend = () => {
                    file.image = fr.result;
                };
                fr.readAsDataURL(file);
            }
            if (!this.uploadingFiles.find(x => x.name === file.name))
                this.uploadingFiles.push(file);
        }
        // console.log(this.uploadingFiles);
    }
    //Xóa file đã chọn
    onClickRemoveFile(idx) {
        this.uploadingFiles.splice(idx, 1);
    }
    // hiển thị file hoặc ảnh ra
    onClickViewItem(fileId) {
        this.iab.create(this.apiAuth.serviceUrls.RESOURCE_SERVER + "/get-file-id?id=" + fileId, `_system`);
    }
    // Gửi nội dung comment đi
    onClickSend() {
        if (this.message || this.uploadingFiles.length > 0) {
            this.apiCommons.showLoader('Đang xử lý dữ liệu trên máy chủ...');
            let form_data = new FormData();
            form_data.append("id", this.ideaInfo.idea.id);
            form_data.append("content", this.message ? this.message : this.uploadingFiles.length + ' file(s)');
            let i = 0;
            for (let file of this.uploadingFiles) {
                form_data.append('file_' + i++, file, file.filename);
            }
            this.apiAuth.postDynamicFormData(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/comment-idea', form_data, true)
                .then(idea => {
                this.apiCommons.hideLoader();
                this.ideaInfo = idea; // lấy lại nội dung này
                this.refreshUserAction();
            })
                .catch(err => {
                this.apiCommons.hideLoader();
                // console.log('Lỗi: ', err);
            });
            this.message = '';
            this.uploadingFiles = [];
        }
    }
    // chấm điểm ý tưởng này theo các tiêu chí định nghĩa
    markIdea(idea) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (this.ideaInfo.idea.user_id === this.userInfo.id) {
                this.apiCommons.showToast('Bạn không tự chấm điểm cho mình được!', 2000, 'warning', 'middle');
                return;
            }
            let questions;
            let userMarkIdea;
            try {
                questions = yield this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-questions', true);
                userMarkIdea = yield this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/user-mark-idea?id=' + idea.id, true);
            }
            catch (_a) { }
            // Lấy lại điểm đã chấm trước đó
            let arrayTestDemo = [];
            for (let ques of questions) {
                let oldMarkQues = userMarkIdea.find(x => x.question_id === ques.id);
                let oldMark = oldMarkQues ? oldMarkQues.point : 0; // lấy lại điểm đã chấm trước đó
                let obj = {
                    type: "range-text",
                    key: "question_" + ques.id,
                    name: ques.question,
                    value: oldMark,
                    min: ques.min_point,
                    max: ques.max_point
                };
                arrayTestDemo.push(obj);
            }
            // Chấm điểm ý tưởng - popup cửa sổ chấm điểm
            let form = {
                title: 'Chấm điểm ý tưởng',
                buttons: [
                    { color: 'danger', icon: 'close', next: 'CLOSE' }
                ],
                items: [
                    { type: 'title', name: idea.title, key: 'id', value: idea.id },
                    ...arrayTestDemo // sử dụng spread operation ở đây để load động các questions chấm điểm
                    ,
                    {
                        type: 'button',
                        options: [
                            { name: "Reset", next: "RESET" },
                            {
                                name: 'Gửi chấm điểm',
                                next: 'CALLBACK',
                                id: idea.id,
                                url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/mark-idea',
                                token: true,
                                command: 'MARK'
                            }
                        ]
                    }
                ]
            };
            this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["DynamicFormMobilePage"], {
                parent: this,
                callback: this.callbackProcess,
                form: form
            });
        });
    }
    // sửa lại ý tưởng này
    editIdea(idea) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            // popup cửa sổ này lên và cho phép chỉnh sửa ý tưởng này
            let parameters;
            try {
                parameters = yield this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true);
            }
            catch (_a) { }
            let categoryOptions = parameters && parameters.ideas_categories ? parameters.ideas_categories : [];
            let statusOptions = parameters && parameters.ideas_statuses ? parameters.ideas_statuses : [];
            // Chỉnh sửa ý tưởng - popup cửa sổ chỉnh sửa
            let form = {
                title: 'Sửa ý tưởng',
                buttons: [
                    { color: 'danger', icon: 'close', next: 'CLOSE' }
                ],
                items: [
                    // Danh sách các trường nhập liệu
                    { type: "hidden", key: "id", value: idea.id },
                    { type: "text", key: "title", value: idea.title, name: "Chủ đề là gì? ", hint: "Nhập chủ đề của ý tưởng này từ 5-200 ký tự", input_type: "text", icon: "md-help", validators: [{ required: true, min: 1, max: 200 }] },
                    { type: "text_area", key: "description", value: idea.description, name: "Mô tả nội dung ý tưởng của bạn từ 50 đến 1000 từ", hint: "Nhập mô tả ý tưởng của bạn", input_type: "text", icon: "md-information-circle", validators: [{ required: true, min: 1 }] },
                    { type: "select", key: "category_id", value: "" + idea.category_id, name: "Phân loại ý tưởng?", icon: "contrast", options: categoryOptions, color: "warning" },
                    { type: "select", key: "status", value: "" + idea.status, name: "Trạng thái của ý tưởng?", icon: "clock", options: statusOptions, color: "secondary" },
                    {
                        type: 'button',
                        options: [
                            { name: "Reset", next: "RESET" },
                            {
                                name: 'Gửi sửa ý tưởng',
                                id: idea.id // trả lại id của ý tưởng này
                                ,
                                next: 'CALLBACK',
                                url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/edit-idea', type: "FORM-DATA", token: true,
                                command: 'EDIT'
                            }
                        ]
                    }
                ]
            };
            this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["DynamicFormMobilePage"], {
                parent: this,
                callback: this.callbackProcess,
                form: form
            });
        });
    }
    // Chuyển trạng thái của ý tưởng
    changeStatusIdea(idea) {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            let parameters;
            try {
                parameters = yield this.apiAuth.getDynamicUrl(this.apiAuth.serviceUrls.RESOURCE_SERVER + '/get-idea-parameters', true);
            }
            catch (_a) { }
            let statusOptions = parameters && parameters.ideas_statuses ? parameters.ideas_statuses : [];
            let form = {
                title: 'Thay đổi trạng thái',
                buttons: [
                    { color: 'danger', icon: 'close', next: 'CLOSE' }
                ],
                items: [
                    // Danh sách các trường nhập liệu
                    { type: "hidden", key: "id", value: idea.id },
                    { type: "select", key: "status", value: "" + idea.status, name: "Trạng thái của ý tưởng?", icon: "clock", options: statusOptions, color: "warning" },
                    {
                        type: 'button',
                        options: [
                            {
                                name: 'Chuyển trạng thái ý tưởng này',
                                id: idea.id // trả lại id của ý tưởng này
                                ,
                                next: 'CALLBACK',
                                url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/edit-idea', type: "FORM-DATA", token: true,
                                command: 'EDIT'
                            }
                        ]
                    }
                ]
            };
            this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["DynamicFormMobilePage"], {
                parent: this,
                callback: this.callbackProcess,
                form: form
            });
        });
    }
    // loại bỏ ý tưởng này
    trashIdea(idea) {
        let form = {
            title: 'Dừng ý tưởng',
            buttons: [
                { color: 'danger', icon: 'close', next: 'CLOSE' }
            ],
            items: [
                // Danh sách các trường nhập liệu
                { type: "hidden", key: "id", value: idea.id },
                { type: "select", key: "status", value: "0", name: "Trạng thái của ý tưởng?", icon: "clock", options: [{ value: "0", name: "Triển khai sau" }], color: "secondary" },
                {
                    type: 'button',
                    options: [
                        {
                            name: 'Dừng ý tưởng này',
                            id: idea.id,
                            next: 'CALLBACK',
                            url: this.apiAuth.serviceUrls.RESOURCE_SERVER + '/edit-idea', type: "FORM-DATA", token: true,
                            command: 'EDIT'
                        }
                    ]
                }
            ]
        };
        this.apiCommons.openModal(ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["DynamicFormMobilePage"], {
            parent: this,
            callback: this.callbackProcess,
            form: form
        });
    }
};
IdeaDetailPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
    { type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["CommonsService"] },
    { type: ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"] },
    { type: src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__["MainService"] },
    { type: _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__["InAppBrowser"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('textComment', { static: false }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _ionic_angular__WEBPACK_IMPORTED_MODULE_6__["IonTextarea"])
], IdeaDetailPage.prototype, "textAreaElement", void 0);
IdeaDetailPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-idea-detail',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./idea-detail.page.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/idea-entry/idea-detail/idea-detail.page.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./idea-detail.page.scss */ "./src/app/idea-entry/idea-detail/idea-detail.page.scss")).default]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
        ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["CommonsService"],
        ngxi4_dynamic_service__WEBPACK_IMPORTED_MODULE_3__["AuthService"],
        src_app_services_main_service__WEBPACK_IMPORTED_MODULE_4__["MainService"],
        _ionic_native_in_app_browser_ngx__WEBPACK_IMPORTED_MODULE_5__["InAppBrowser"]])
], IdeaDetailPage);



/***/ }),

/***/ "./src/app/idea-entry/idea-detail/link.url.pipe.ts":
/*!*********************************************************!*\
  !*** ./src/app/idea-entry/idea-detail/link.url.pipe.ts ***!
  \*********************************************************/
/*! exports provided: LinkUrlPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkUrlPipe", function() { return LinkUrlPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");

/**
 * Nội dung bảng pipe này sẽ chuyển đổi các mã #id sẽ liên kết với ý tưởng có số id đó
 */

let LinkUrlPipe = class LinkUrlPipe {
    transform(content) {
        return !content ? '' : content.replace(/(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim, (url) => `<a href="${url}" target="_blank">${(url.length > 30 ? "Link#" : url)}</a>`);
    }
};
LinkUrlPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
        name: 'linkUrl'
    })
], LinkUrlPipe);



/***/ })

}]);
//# sourceMappingURL=idea-entry-idea-detail-idea-detail-module-es2015.js.map