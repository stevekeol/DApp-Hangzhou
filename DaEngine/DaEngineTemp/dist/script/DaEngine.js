/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 8049:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var tap = __webpack_require__(2496)
var domify = __webpack_require__(1137)
var template = __webpack_require__(2703)
var classes = __webpack_require__(2809)
var event = __webpack_require__(7161)
var detect = __webpack_require__(5537)
var transitionEnd = detect.transitionend

var hasTouch = __webpack_require__(8906)


document.addEventListener('touchstart', function(){}, true)
var shown

/**
 * create action sheet
 * option contains key for actions.
 * action should contain text and callback
 *
 * @public
 * @param {Object} option
 * @returns {Promise}
 */
module.exports = function (option) {
  if (shown) return
  var el = domify(template)
  var body = el.querySelector('.actionsheet-body')
  Object.keys(option).forEach(function (key) {
    if (key == 'cancel') return
    var o = option[key]
    if (o.hide === true) return
    body.appendChild(domify('<div class="actionsheet-item" data-action="' + key + '">' + o.text + '</div>'))
  })
  if (option.cancel) {
    var text = option.cancel.text || 'cancel'
    body.parentNode.appendChild(domify('<div class="actionsheet-foot"><div class="actionsheet-item cancel">' + text + '</div></div>'))
  }
  document.body.appendChild(el)
  shown = true

  function onClick(e) {
    var target = e.target
    if (target.hasAttribute('data-action')){
      var action = target.dataset.action
      var opt = option[action]
      var cb = opt.callback
      if (opt.redirect) cb = function () {
        window.location.href = opt.redirect
      }
      var nowait = opt.nowait
      if (!cb) return
      if (nowait) {
        cleanUp()
        cb()
      } else {
        if (cb) cleanUp().then(cb)
      }
    } else {
      cleanUp()
    }
  }
  var ontap = tap(onClick)
  if (hasTouch) {
    event.bind(el, 'touchstart', ontap)
  } else {
    event.bind(el, 'click', onClick)
  }


  function cleanUp() {
    return new Promise(function (resolve) {
      event.unbind(el, 'touchstart', ontap)
      event.unbind(el, 'click', onClick)
      event.bind(el, transitionEnd, end)
      classes(el).remove('active')
      function end() {
        shown = false
        event.unbind(el, transitionEnd, end)
        if (el.parentNode) el.parentNode.removeChild(el)
        resolve()
      }
    })
  }
  return new Promise(function (resolve) {
    setTimeout(function () {
      classes(el).add('active')
      resolve()
    }, 20)
  })
}


/***/ }),

/***/ 7161:
/***/ ((__unused_webpack_module, exports) => {

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};

/***/ }),

/***/ 8940:
/***/ ((module) => {


/**
 * Retina-enable the given `canvas`.
 *
 * @param {Canvas} canvas
 * @return {Canvas}
 * @api public
 */

module.exports = function(canvas){
  var ctx = canvas.getContext('2d');
  var ratio = window.devicePixelRatio || 1;
  if (1 != ratio) {
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width *= ratio;
    canvas.height *= ratio;
    ctx.scale(ratio, ratio);
  }
  return canvas;
};

/***/ }),

/***/ 3313:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/**
 * Created by pengguanfa on 2017/11/7.
 */
window.Promise = __webpack_require__(5001);

/***/ }),

/***/ 5904:
/***/ ((module) => {

"use strict";


var errListenerFns = function errListenerFns() {};
var utils = {
  // log report obj
  surroundThirdByTryCatch: function surroundThirdByTryCatch(fn, extend) {
    return function () {
      var res;
      try {
        res = fn.apply(fn, arguments);
      } catch (error) {
        console.error(error);
        var key = 'thirdScriptError';
        var content = extend ? error.message + ';' + extend : error.message;
        utils.triggerErrorMessage(key + '\n' + content + '\n' + error.stack);
      }
      return res;
    };
  },
  slowReport: function slowReport(params) {
    console.log('SLOW!!!!!', params);
  },
  reportKeyValue: function reportKeyValue(params) {},
  reportIDKey: function reportIDKey(params) {},
  thirdErrorReport: function thirdErrorReport(params) {
    var error = params.error,
        extend = params.extend;
    // utils.errorReport
    // console.log({
    //     key: 'thirdScriptError',
    //     error: error,
    //     extend: extend
    // })
    console.group('thirdScriptError', extend);
    console.log(error);
    console.groupEnd();
  },
  errorReport: function errorReport(params) {},
  registerErrorListener: function registerErrorListener(fn) {
    typeof fn === 'function' && (errListenerFns = fn);
  },
  unRegisterErrorListener: function unRegisterErrorListener() {
    errListenerFns = function errListenerFns() {};
  },
  triggerErrorMessage: function triggerErrorMessage(params) {
    errListenerFns(params);
  }
};
window.Reporter = utils;
module.exports = utils;

/***/ }),

/***/ 3370:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _assign = __webpack_require__(2945);

var _assign2 = _interopRequireDefault(_assign);

var _defineProperty = __webpack_require__(2242);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _from = __webpack_require__(4043);

var _from2 = _interopRequireDefault(_from);

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = __webpack_require__(3239);

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = __webpack_require__(8902);

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = __webpack_require__(5105);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = __webpack_require__(9135);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3196);

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addPXSuffix(num) {
  return typeof num === 'number' ? num + 'px' : num;
}

function addDegSuffix(num) {
  return num + 'deg';
}

// const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
var btoa = window.btoa;
var atob = window.atob;

var SelQuery = function () {
  function SelQuery(t, n, r) {
    (0, _classCallCheck3.default)(this, SelQuery);

    this._selectorQuery = t;
    this._selector = n;
    this._single = r;
  }

  (0, _createClass3.default)(SelQuery, [{
    key: 'fields',
    value: function fields(e, t) {
      this._selectorQuery._push(this._selector, this._single, e, t);
      return this._selectorQuery;
    }
  }, {
    key: 'boundingClientRect',
    value: function boundingClientRect(e) {
      this._selectorQuery._push(this._selector, this._single, {
        id: !0,
        dataset: !0,
        rect: !0,
        size: !0
      }, e);
      return this._selectorQuery;
    }
  }, {
    key: 'scrollOffset',
    value: function scrollOffset(e) {
      this._selectorQuery._push(this._selector, this._single, {
        id: !0,
        dataset: !0,
        scrollOffset: !0
      }, e);
      return this._selectorQuery;
    }
  }]);
  return SelQuery;
}();

var getViewPortInfo = function getViewPortInfo(e) {
  var t = {};
  e.id && (t.id = '');
  e.dataset && (t.dataset = {});
  e.rect && (t.left = 0, t.right = 0, t.top = 0, t.bottom = 0);
  e.size && (t.width = document.documentElement.clientWidth, t.height = document.documentElement.clientHeight);
  e.scrollOffset && (t.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0, t.scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0);
  return t;
};

var getInfoInFields = function getInfoInFields(info, fields) {
  var dom = info.$$;
  var res = {};
  fields.id && (res.id = info.id || '');
  fields.dataset && (res.dataset = info.dataset || {});
  if (fields.rect || fields.size) {
    var domBounding = dom.getBoundingClientRect();
    fields.rect && (res.left = domBounding.left, res.right = domBounding.right, res.top = domBounding.top, res.bottom = domBounding.bottom);
    fields.size && (res.width = domBounding.width, res.height = domBounding.height);
  }
  fields.properties && fields.properties.forEach(function (t) {
    var n = t.replace(/-([a-z])/g, function (e, t) {
      return t.toUpperCase();
    });
    window.exparser.Component.hasPublicProperty(info, n) && (res[n] = info[n]);
  });
  if (fields.scrollOffset) {
    if (info.hasBehavior('wx-positioning-container')) {
      var r = info.getScrollPosition();
      res.scrollLeft = r.scrollLeft;
      res.scrollTop = r.scrollTop;
    } else {
      res.scrollLeft = 0;
      res.scrollTop = 0;
    }
  }

  return res;
};

var execQuery = function execQuery(viewId, reqs, cb) {
  var ret = [];
  reqs.forEach(function (req) {
    var selector = req.selector;
    var single = req.single;
    var fields = req.fields;
    var res = null;
    if (selector === 'viewport') {
      res = getViewPortInfo(fields);
    } else if (single) {
      var info = window.__DOMTree__.querySelector(selector);
      res = info ? getInfoInFields(info, fields) : null;
    } else {
      var c = window.__DOMTree__.querySelectorAll(selector);
      res = [];
      for (var u = 0; u < c.length; u++) {
        res.push(getInfoInFields(c[u], fields));
      }
    }
    ret.push(res);
  });
  cb(ret);
};

var wxQuerySelector = function () {
  function wxQuerySelector(t) {
    (0, _classCallCheck3.default)(this, wxQuerySelector);

    this._webviewId = t;
    this._queue = [];
    this._queueCb = [];
  }

  (0, _createClass3.default)(wxQuerySelector, [{
    key: 'select',
    value: function select(e) {
      return new SelQuery(this, e, !0);
    }
  }, {
    key: 'selectAll',
    value: function selectAll(e) {
      return new SelQuery(this, e, !1);
    }
  }, {
    key: 'selectViewport',
    value: function selectViewport() {
      return new SelQuery(this, 'viewport', !0);
    }
  }, {
    key: '_push',
    value: function _push(e, t, n, o) {
      this._queue.push({ selector: e, single: t, fields: n });
      this._queueCb.push(o || null);
    }
  }, {
    key: 'exec',
    value: function exec(e) {
      var self = this;
      execQuery(this._webviewId, this._queue, function (res) {
        var cbQueue = self._queueCb;
        res.forEach(function (data, idx) {
          typeof cbQueue[idx] === 'function' && cbQueue[idx].call(self, data);
        });
        typeof e === 'function' && e.call(self, res);
      });
    }
  }]);
  return wxQuerySelector;
}();

var AppServiceSdkKnownError = function (_Error) {
  (0, _inherits3.default)(AppServiceSdkKnownError, _Error);

  function AppServiceSdkKnownError(e) {
    (0, _classCallCheck3.default)(this, AppServiceSdkKnownError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AppServiceSdkKnownError.__proto__ || (0, _getPrototypeOf2.default)(AppServiceSdkKnownError)).call(this, 'APP-SERVICE-SDK:' + e));

    _this.type = 'AppServiceSdkKnownError';
    return _this;
  }

  return AppServiceSdkKnownError;
}(Error);

var AppServiceEngineKnownError = function (_Error2) {
  (0, _inherits3.default)(AppServiceEngineKnownError, _Error2);

  function AppServiceEngineKnownError(e) {
    (0, _classCallCheck3.default)(this, AppServiceEngineKnownError);

    var _this2 = (0, _possibleConstructorReturn3.default)(this, (AppServiceEngineKnownError.__proto__ || (0, _getPrototypeOf2.default)(AppServiceEngineKnownError)).call(this, 'APP-SERVICE-Engine:' + e));

    _this2.type = 'AppServiceEngineKnownError';
    return _this2;
  }

  return AppServiceEngineKnownError;
}(Error);

/*
var Components = {
  //components
  audio: {"1.0.0": ["id", "src", "loop", "controls", "poster", "name", "author", "binderror", "bindplay", "bindpause", "bindtimeupdate", "bindended"]},
  button: {
    "1.0.0": [{size: ["default", "mini"]}, {type: ["primary", "default", "warn"]}, "plain", "disabled", "loading", {"form-type": ["submit", "reset"]}, "hover-class", "hover-start-time", "hover-stay-time"],
    "1.1.0": [{"open-type": ["contact"]}],
    "1.2.0": [{"open-type": ["share"]}],
    "1.4.0": ["session-from"],
    "1.3.0": [{"open-type": ["getUserInfo"]}]
  },
  canvas: {"1.0.0": ["canvas-id", "disable-scroll", "bindtouchstart", "bindtouchmove", "bindtouchend", "bindtouchcancel", "bindlongtap", "binderror"]},
  "checkbox-group": {"1.0.0": ["bindchange"]},
  checkbox: {"1.0.0": ["value", "disabled", "checked", "color"]},
  "contact-button": {"1.0.0": ["size", {type: ["default-dark", "default-light"]}, "session-from"]},
  "cover-view": {"1.4.0": []},
  "cover-image": {"1.4.0": ["src"]},
  form: {"1.0.0": ["report-submit", "bindsubmit", "bindreset"], "1.2.0": ["bindautofill"]},
  icon: {"1.0.0": [{type: ["success", "success_no_circle", "info", "warn", "waiting", "cancel", "download", "search", "clear"]}, "size", "color"]},
  image: {"1.0.0": ["src", {mode: ["scaleToFill", "aspectFit", "aspectFill", "widthFix", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right"]}, "binderror", "bindload"]},
  input: {
    "1.0.0": ["value", {type: ["text", "number", "idcard", "digit"]}, "password", "placeholder", "placeholder-style", "placeholder-class", "disabled", "maxlength", "cursor-spacing", "auto-focus", "focus", "bindinput", "bindfocus", "bindblur", "bindconfirm"],
    "1.1.0": [{"confirm-type": ["send", "search", "next", "go", "done"]}, "confirm-hold"],
    "1.2.0": ["auto-fill"]
  },
  label: {"1.0.0": ["for"]},
  map: {
    "1.0.0": ["longitude", "latitude", "scale", {markers: ["id", "latitude", "longitude", "title", "iconPath", "rotate", "alpha", "width", "height"]}, "covers", {polyline: ["points", "color", "width", "dottedLine"]}, {circles: ["latitude", "longitude", "color", "fillColor", "radius", "strokeWidth"]}, {controls: ["id", "position", "iconPath", "clickable"]}, "include-points", "show-location", "bindmarkertap", "bindcontroltap", "bindregionchange", "bindtap"],
    "1.2.0": [{markers: ["callout", "label", "anchor"]}, {polyline: ["arrowLine", "borderColor", "borderWidth"]}, "bindcallouttap"]
  },
  modal: {"1.0.0": []},
  "movable-area": {"1.2.0": []},
  "movable-view": {"1.2.0": ["direction", "inertia", "out-of-bounds", "x", "y", "damping", "friction"]},
  navigator: {
    "1.0.0": ["url", {"open-type": ["navigate", "redirect", "switchTab"]}, "delta", "hover-class", "hover-start-time", "hover-stay-time"],
    "1.1.0": [{"open-type": ["reLaunch", "navigateBack"]}]
  },
  "open-data": {"1.4.0": [{type: ["groupName"]}, "open-gid"]},
  "picker-view": {"1.0.0": ["value", "indicator-style", "bindchange"], "1.1.0": ["indicator-class"]},
  "picker-view-column": {"1.0.0": []},
  picker: {
    "1.0.0": ["range", "range-key", "value", "bindchange", "disabled", "start", "end", {fields: ["year", "month", "day"]}, {mode: ["selector", "date", "time"]}],
    "1.2.0": ["auto-fill"],
    "1.4.0": ["bindcolumnchange", {mode: ["multiSelector", "region"]}]
  },
  progress: {"1.0.0": ["percent", "show-info", "stroke-width", "color", "activeColor", "backgroundColor", "active"]},
  "radio-group": {"1.0.0": ["bindchange"]},
  radio: {"1.0.0": ["value", "checked", "disabled", "color"]},
  "rich-text": {"1.4.0": [{nodes: ["name", "attrs", "children"]}]},
  "scroll-view": {"1.0.0": ["scroll-x", "scroll-y", "upper-threshold", "lower-threshold", "scroll-top", "scroll-left", "scroll-into-view", "scroll-with-animation", "enable-back-to-top", "bindscrolltoupper", "bindscrolltolower", "bindscroll"]},
  slider: {"1.0.0": ["min", "max", "step", "disabled", "value", "color", "selected-color", "activeColor", "backgroundColor", "show-value", "bindchange"]},
  swiper: {
    "1.0.0": ["indicator-dots", "autoplay", "current", "interval", "duration", "circular", "vertical", "bindchange"],
    "1.1.0": ["indicator-color", "indicator-active-color"]
  },
  "swiper-item": {"1.0.0": []},
  "switch": {"1.0.0": ["checked", {type: ["switch", "checkbox"]}, "bindchange", "color"]},
  text: {"1.0.0": [], "1.1.0": ["selectable"], "1.4.0": [{space: ["ensp", "emsp", "nbsp"]}, "decode"]},
  textarea: {
    "1.0.0": ["value", "placeholder", "placeholder-style", "placeholder-class", "disabled", "maxlength", "auto-focus", "focus", "auto-height", "fixed", "cursor-spacing", "bindfocus", "bindblur", "bindlinechange", "bindinput", "bindconfirm"],
    "1.2.0": ["auto-fill"]
  },
  video: {
    "1.0.0": ["src", "controls", "danmu-list", "danmu-btn", "enable-danmu", "autoplay", "bindplay", "bindpause", "bindended", "bindtimeupdate", "objectFit", "poster"],
    "1.1.0": ["duration"],
    "1.4.0": ["loop", "muted", "bindfullscreenchange"]
  },
  view: {"1.0.0": ["hover-class", "hover-start-time", "hover-stay-time"]}
};
var APIs = {
  //APIS
  onAccelerometerChange: {"1.2.1": [{callback: ["x", "y", "z"]}]},
  startAccelerometer: {"1.1.0": []},
  stopAccelerometer: {"1.1.0": []},
  chooseAddress: {"1.1.0": [{success: ["userName", "postalCode", "provinceName", "cityName", "countyName", "detailInfo", "nationalCode", "telNumber"]}]},
  createAnimation: {"1.0.0": [{object: ["duration", {timingFunction: ["linear", "ease", "ease-in", "ease-in-out", "ease-out", "step-start", "step-end"]}, "delay", "transformOrigin"]}]},
  createAudioContext: {"1.0.0": []},
  canIUse: {"1.0.0": []},
  login: {"1.0.0": [{success: ["code"]}]},
  checkSession: {"1.0.0": []},
  createMapContext: {"1.0.0": []},
  requestPayment: {"1.0.0": [{object: ["timeStamp", "nonceStr", "package", "signType", "paySign"]}]},
  showToast: {"1.0.0": [{object: ["title", "icon", "duration", "mask"]}], "1.1.0": [{object: ["image"]}]},
  showLoading: {"1.1.0": [{object: ["title", "mask"]}]},
  hideToast: {"1.0.0": []},
  hideLoading: {"1.1.0": []},
  showModal: {
    "1.0.0": [{object: ["title", "content", "showCancel", "cancelText", "cancelColor", "confirmText", "confirmColor"]}, {success: ["confirm"]}],
    "1.1.0": [{success: ["cancel"]}]
  },
  showActionSheet: {"1.0.0": [{object: ["itemList", "itemColor"]}, {success: ["tapIndex"]}]},
  arrayBufferToBase64: {"1.1.0": []},
  base64ToArrayBuffer: {"1.1.0": []},
  createVideoContext: {"1.0.0": []},
  authorize: {"1.2.0": [{object: ["scope"]}]},
  openBluetoothAdapter: {"1.1.0": []},
  closeBluetoothAdapter: {"1.1.0": []},
  getBluetoothAdapterState: {"1.1.0": [{success: ["discovering", "available"]}]},
  onBluetoothAdapterStateChange: {"1.1.0": [{callback: ["available", "discovering"]}]},
  startBluetoothDevicesDiscovery: {"1.1.0": [{object: ["services", "allowDuplicatesKey", "interval"]}, {success: ["isDiscovering"]}]},
  stopBluetoothDevicesDiscovery: {"1.1.0": []},
  getBluetoothDevices: {"1.1.0": [{success: ["devices"]}]},
  onBluetoothDeviceFound: {"1.1.0": [{callback: ["devices"]}]},
  getConnectedBluetoothDevices: {"1.1.0": [{object: ["services"]}, {success: ["devices"]}]},
  createBLEConnection: {"1.1.0": [{object: ["deviceId"]}]},
  closeBLEConnection: {"1.1.0": [{object: ["deviceId"]}]},
  getBLEDeviceServices: {"1.1.0": [{object: ["deviceId"]}, {success: ["services"]}]},
  getBLEDeviceCharacteristics: {"1.1.0": [{object: ["deviceId", "serviceId"]}, {success: ["characteristics"]}]},
  readBLECharacteristicValue: {"1.1.0": [{object: ["deviceId", "serviceId", "characteristicId"]}, {success: ["characteristic"]}]},
  writeBLECharacteristicValue: {"1.1.0": [{object: ["deviceId", "serviceId", "characteristicId", "value"]}]},
  notifyBLECharacteristicValueChange: {"1.1.1": [{object: ["deviceId", "serviceId", "characteristicId", "state"]}]},
  onBLEConnectionStateChange: {"1.1.1": [{callback: ["deviceId", "connected"]}]},
  onBLECharacteristicValueChange: {"1.1.0": [{callback: ["deviceId", "serviceId", "characteristicId", "value"]}]},
  captureScreen: {"1.4.0": [{success: ["tempFilePath"]}]},
  addCard: {"1.1.0": [{object: ["cardList"]}, {success: ["cardList"]}]},
  openCard: {"1.1.0": [{object: ["cardList"]}]},
  setClipboardData: {"1.1.0": [{object: ["data"]}]},
  getClipboardData: {"1.1.9": [{success: ["data"]}]},
  onCompassChange: {"1.0.0": [{callback: ["direction"]}]},
  startCompass: {"1.1.0": []},
  stopCompass: {"1.1.0": []},
  setStorage: {"1.0.0": [{object: ["key", "data"]}]},
  getStorage: {"1.0.0": [{object: ["key"]}, {success: ["data"]}]},
  getStorageSync: {"1.0.0": []},
  getStorageInfo: {"1.0.0": [{success: ["keys", "currentSize", "limitSize"]}]},
  removeStorage: {"1.0.0": [{object: ["key"]}]},
  removeStorageSync: {"1.0.0": []},
  clearStorage: {"1.0.0": []},
  clearStorageSync: {"1.0.0": []},
  getNetworkType: {"1.0.0": [{success: ["networkType"]}]},
  onNetworkStatusChange: {"1.1.0": [{callback: ["isConnected", {networkType: ["wifi", "2g", "3g", "4g", "none", "unknown"]}]}]},
  setScreenBrightness: {"1.2.0": [{object: ["value"]}]},
  getScreenBrightness: {"1.2.0": [{success: ["value"]}]},
  vibrateLong: {"1.2.0": []},
  vibrateShort: {"1.2.0": []},
  getExtConfig: {"1.1.0": [{success: ["extConfig"]}]},
  getExtConfigSync: {"1.1.0": []},
  saveFile: {"1.0.0": [{object: ["tempFilePath"]}, {success: ["savedFilePath"]}]},
  getSavedFileList: {"1.0.0": [{success: ["fileList"]}]},
  getSavedFileInfo: {"1.0.0": [{object: ["filePath"]}, {success: ["size", "createTime"]}]},
  removeSavedFile: {"1.0.0": [{object: ["filePath"]}]},
  openDocument: {"1.0.0": [{object: ["filePath"]}], "1.4.0": [{object: ["fileType"]}]},
  getBackgroundAudioManager: {"1.2.0": []},
  getFileInfo: {"1.4.0": [{object: ["filePath", {digestAlgorithm: ["md5", "sha1"]}]}, {success: ["size", "digest"]}]},
  startBeaconDiscovery: {"1.2.0": [{object: ["uuids"]}]},
  stopBeaconDiscovery: {"1.2.0": []},
  getBeacons: {"1.2.0": [{success: ["beacons"]}]},
  onBeaconUpdate: {"1.2.0": [{callback: ["beacons"]}]},
  onBeaconServiceChange: {"1.2.0": [{callback: ["available", "discovering"]}]},
  getLocation: {
    "1.0.0": [{object: ["type"]}, {success: ["latitude", "longitude", "speed", "accuracy"]}],
    "1.2.0": [{success: ["altitude", "verticalAccuracy", "horizontalAccuracy"]}]
  },
  chooseLocation: {"1.0.0": [{object: ["cancel"]}, {success: ["name", "address", "latitude", "longitude"]}]},
  openLocation: {"1.0.0": [{object: ["latitude", "longitude", "scale", "name", "address"]}]},
  getBackgroundAudioPlayerState: {"1.0.0": [{success: ["duration", "currentPosition", "status", "downloadPercent", "dataUrl"]}]},
  playBackgroundAudio: {"1.0.0": [{object: ["dataUrl", "title", "coverImgUrl"]}]},
  pauseBackgroundAudio: {"1.0.0": []},
  seekBackgroundAudio: {"1.0.0": [{object: ["position"]}]},
  stopBackgroundAudio: {"1.0.0": []},
  onBackgroundAudioPlay: {"1.0.0": []},
  onBackgroundAudioPause: {"1.0.0": []},
  onBackgroundAudioStop: {"1.0.0": []},
  chooseImage: {
    "1.0.0": [{object: ["count", "sizeType", "sourceType"]}, {success: ["tempFilePaths"]}],
    "1.2.0": [{success: ["tempFiles"]}]
  },
  previewImage: {"1.0.0": [{object: ["current", "urls"]}]},
  getImageInfo: {"1.0.0": [{object: ["src"]}, {success: ["width", "height", "path"]}]},
  saveImageToPhotosAlbum: {"1.2.0": [{object: ["filePath"]}]},
  startRecord: {"1.0.0": [{success: ["tempFilePath"]}]},
  stopRecord: {"1.0.0": []},
  chooseVideo: {"1.0.0": [{object: ["sourceType", "maxDuration", "camera"]}, {success: ["tempFilePath", "duration", "size", "height", "width"]}]},
  saveVideoToPhotosAlbum: {"1.2.0": [{object: ["filePath"]}]},
  playVoice: {"1.0.0": [{object: ["filePath"]}]},
  pauseVoice: {"1.0.0": []},
  stopVoice: {"1.0.0": []},
  navigateBackMiniProgram: {"1.3.0": [{object: ["extraData"]}]},
  navigateToMiniProgram: {"1.3.0": [{object: ["appId", "path", "extraData", "envVersion"]}]},
  uploadFile: {"1.0.0": [{object: ["url", "filePath", "name", "header", "formData"]}, {success: ["data", "statusCode"]}]},
  downloadFile: {"1.0.0": [{object: ["url", "header"]}]},
  request: {
    "1.0.0": [{object: ["url", "data", "header", {method: ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"]}, "dataType"]}, {success: ["data", "statusCode"]}],
    "1.2.0": [{success: ["header"]}]
  },
  connectSocket: {
    "1.0.0": [{object: ["url", "data", "header", {method: ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"]}]}],
    "1.4.0": [{object: ["protocols"]}]
  },
  onSocketOpen: {"1.0.0": []},
  onSocketError: {"1.0.0": []},
  sendSocketMessage: {"1.0.0": [{object: ["data"]}]},
  onSocketMessage: {"1.0.0": [{callback: ["data"]}]},
  closeSocket: {"1.0.0": [], "1.4.0": [{object: ["code", "reason"]}]},
  onSocketClose: {"1.0.0": []},
  onUserCaptureScreen: {"1.4.0": []},
  chooseContact: {"1.0.0": [{success: ["phoneNumber", "displayName"]}]},
  getUserInfo: {
    "1.0.0": [{success: ["userInfo", "rawData", "signature", "encryptedData", "iv"]}],
    "1.1.0": [{object: ["withCredentials"]}],
    "1.4.0": [{object: ["lang"]}]
  },
  addPhoneContact: {"1.2.0": [{object: ["photoFilePath", "nickName", "lastName", "middleName", "firstName", "remark", "mobilePhoneNumber", "weChatNumber", "addressCountry", "addressState", "addressCity", "addressStreet", "addressPostalCode", "organization", "title", "workFaxNumber", "workPhoneNumber", "hostNumber", "email", "url", "workAddressCountry", "workAddressState", "workAddressCity", "workAddressStreet", "workAddressPostalCode", "homeFaxNumber", "homePhoneNumber", "homeAddressCountry", "homeAddressState", "homeAddressCity", "homeAddressStreet", "homeAddressPostalCode"]}]},
  makePhoneCall: {"1.0.0": [{object: ["phoneNumber"]}]},
  stopPullDownRefresh: {"1.0.0": []},
  scanCode: {
    "1.0.0": [{success: ["result", "scanType", "charSet", "path"]}],
    "1.2.0": [{object: ["onlyFromCamera"]}]
  },
  pageScrollTo: {"1.4.0": [{object: ["scrollTop"]}]},
  setEnableDebug: {"1.4.0": [{object: ["enableDebug"]}]},
  setKeepScreenOn: {"1.4.0": [{object: ["keepScreenOn"]}]},
  setNavigationBarColor: {"1.4.0": [{object: ["frontColor", "backgroundColor", "animation", "animation.duration", {"animation.timingFunc": ["linear", "easeIn", "easeOut", "easeInOut"]}]}]},
  openSetting: {"1.1.0": [{success: ["authSetting"]}]},
  getSetting: {"1.2.0": [{success: ["authSetting"]}]},
  showShareMenu: {"1.1.0": [{object: ["withShareTicket"]}]},
  hideShareMenu: {"1.1.0": []},
  updateShareMenu: {"1.2.0": [{object: ["withShareTicket"]}], "1.4.0": [{object: ["dynamic", "widget"]}]},
  getShareInfo: {"1.1.0": [{object: ["shareTicket"]}, {callback: ["encryptedData", "iv"]}]},
  getSystemInfo: {
    "1.0.0": [{success: ["model", "pixelRatio", "windowWidth", "windowHeight", "language", "version", "system", "platform"]}],
    "1.1.0": [{success: ["screenWidth", "screenHeight", "SDKVersion"]}]
  },
  getSystemInfoSync: {
    "1.0.0": [{return: ["model", "pixelRatio", "windowWidth", "windowHeight", "language", "version", "system", "platform"]}],
    "1.1.0": [{return: ["screenWidth", "screenHeight", "SDKVersion"]}]
  },
  navigateTo: {"1.0.0": [{object: ["url"]}]},
  redirectTo: {"1.0.0": [{object: ["url"]}]},
  reLaunch: {"1.1.0": [{object: ["url"]}]},
  switchTab: {"1.0.0": [{object: ["url"]}]},
  navigateBack: {"1.0.0": [{object: ["delta"]}]},
  setNavigationBarTitle: {"1.0.0": [{object: ["title"]}]},
  showNavigationBarLoading: {"1.0.0": []},
  hideNavigationBarLoading: {"1.0.0": []},
  setTopBarText: {"1.4.2": [{object: ["text"]}]},
  getWeRunData: {"1.2.0": [{success: ["encryptedData", "iv"]}]},
  createSelectorQuery: {"1.4.0": []},
  createCanvasContext: {"1.0.0": []},
  canvasToTempFilePath: {
    "1.0.0": [{object: ["canvasId"]}],
    "1.2.0": [{object: ["x", "y", "width", "height", "destWidth", "destHeight"]}]
  },
  canvasContext: {
    "1.0.0": ["addColorStop", "arc", "beginPath", "bezierCurveTo", "clearActions", "clearRect", "closePath", "createCircularGradient", "createLinearGradient", "drawImage", "draw", "fillRect", "fillText", "fill", "lineTo", "moveTo", "quadraticCurveTo", "rect", "rotate", "save", "scale", "setFillStyle", "setFontSize", "setGlobalAlpha", "setLineCap", "setLineJoin", "setLineWidth", "setMiterLimit", "setShadow", "setStrokeStyle", "strokeRect", "stroke", "translate"],
    "1.1.0": ["setTextAlign"],
    "1.4.0": ["setTextBaseline"]
  },
  animation: {"1.0.0": ["opacity", "backgroundColor", "width", "height", "top", "left", "bottom", "right", "rotate", "rotateX", "rotateY", "rotateZ", "rotate3d", "scale", "scaleX", "scaleY", "scaleZ", "scale3d", "translate", "translateX", "translateY", "translateZ", "translate3d", "skew", "skewX", "skewY", "matrix", "matrix3d"]},
  audioContext: {"1.0.0": ["setSrc", "play", "pause", "seek"]},
  mapContext: {
    "1.0.0": ["getCenterLocation", "moveToLocation"],
    "1.2.0": ["translateMarker", "includePoints"],
    "1.4.0": ["getRegion", "getScale"]
  },
  videoContext: {
    "1.0.0": ["play", "pause", "seek", "sendDanmu"],
    "1.4.0": ["playbackRate", "requestFullScreen", "exitFullScreen"]
  },
  backgroundAudioManager: {"1.2.0": ["play", "pause", "stop", "seek", "onCanplay", "onPlay", "onPause", "onStop", "onEnded", "onTimeUpdate", "onPrev", "onNext", "onError", "onWaiting", "duration", "currentTime", "paused", "src", "startTime", "buffered", "title", "epname", "singer", "coverImgUrl", "webUrl"]},
  uploadTask: {"1.4.0": ["onProgressUpdate", "abort"]},
  downloadTask: {"1.4.0": ["onProgressUpdate", "abort"]},
  requestTask: {"1.4.0": ["abort"]},
  selectorQuery: {"1.4.0": ["select", "selectAll", "selectViewport", "exec"]},
  onBLEConnectionStateChanged: {"1.1.0": [{callback: ["deviceId", "connected"]}]},
  notifyBLECharacteristicValueChanged: {"1.1.0": [{object: ["deviceId", "serviceId", "characteristicId", "state"]}]},
  sendBizRedPacket: {"1.2.0": [{object: ["timeStamp", "nonceStr", "package", "signType", "paySign"]}]}
};
*/


var BASE_DEVICE_WIDTH = 750;
var ua = window.navigator.userAgent.toLowerCase();
var platform = /(iphone|ipad)/.test(ua) ? 'ios' : /android/.test(ua) ? 'android' : '';
var screenWidth = platform && window.innerWidth || 375;
var devicePixelRatio = window.devicePixelRatio || 2;
var SMALL_NUM = 1e-4;
var rpxToPxNum = function rpxToPxNum(rpxNum) {
  rpxNum = rpxNum / BASE_DEVICE_WIDTH * screenWidth;
  rpxNum = Math.floor(rpxNum + SMALL_NUM);
  return rpxNum === 0 ? devicePixelRatio !== 1 && platform == 'ios' ? 0.5 : 1 : rpxNum;
};
var parseRpx = function parseRpx(matches) {
  var num = 0,
      decimalRadix = 1,
      isHandlingDecimal = !1,
      isNeg = !1,
      idx = 0;
  for (; idx < matches.length; ++idx) {
    var ch = matches[idx];
    if (ch >= '0' && ch <= '9') {
      if (isHandlingDecimal) {
        decimalRadix *= 0.1;
        num += (ch - '0') * decimalRadix;
      } else {
        num = 10 * num + (ch - '0');
      }
    } else {
      ch === '.' ? isHandlingDecimal = !0 : ch === '-' && (isNeg = !0);
    }
  }
  isNeg && (num = -num);
  return rpxToPxNum(num);
};
var rpxInTemplate = /%%\?[+-]?\d+(\.\d+)?rpx\?%%/g;
var rpxInCSS = /(:|\s)[+-]?\d+(\.\d+)?rpx/g;

var utils = {
  copyObj: function copyObj(distObj, orgObj) {
    for (var attrName in orgObj) {
      ;(function (attrName) {
        distObj.__defineGetter__(attrName, function () {
          return Reporter.surroundThirdByTryCatch(orgObj[attrName], 'wx.' + attrName);
        });
      })(attrName);
    }
  },

  getPlatform: function getPlatform() {
    return platform;
  },
  transformRpx: function transformRpx(propValue, isInCSS) {
    if (this.getDataType(propValue) !== 'String') return propValue;
    var matches = void 0;
    matches = isInCSS ? propValue.match(rpxInCSS) : propValue.match(rpxInTemplate);
    matches && matches.forEach(function (match) {
      var pxNum = parseRpx(match);
      var cssValue = (isInCSS ? match[0] : '') + pxNum + 'px';
      propValue = propValue.replace(match, cssValue);
    });
    return propValue;
  },
  getRealRoute: function getRealRoute() {
    var pathPrefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var pathname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    // 格式化一个路径
    if (pathname.indexOf('/') === 0) return pathname.substr(1);
    if (pathname.indexOf('./') === 0) {
      return this.getRealRoute(pathPrefix, pathname.substr(2));
    }
    var index,
        folderLength,
        folderArr = pathname.split('/');
    for (index = 0, folderLength = folderArr.length; index < folderLength && folderArr[index] === '..'; index++) {}
    folderArr.splice(0, index);
    var prefixArr = pathPrefix.length > 0 ? pathPrefix.split('/') : [];
    prefixArr.splice(prefixArr.length - index - 1, index + 1);
    var pathArr = prefixArr.concat(folderArr);
    return pathArr.join('/');
  },
  animationToStyle: function animationToStyle(params) {
    var animates = params.animates,
        option = params.option,
        opts = void 0 === option ? {} : option,
        transformOrigin = opts.transformOrigin,
        transition = opts.transition;
    if (typeof transition === 'undefined' || typeof animates === 'undefined') {
      return {
        transformOrigin: '',
        transform: '',
        transition: ''
      };
    }

    var transform = animates.filter(function (animate) {
      var type = animate.type;
      return type !== 'style';
    }).map(function (animate) {
      var animateType = animate.type,
          animateArgs = animate.args;
      switch (animateType) {
        case 'matrix':
          return 'matrix(' + animateArgs.join(',') + ')';
        case 'matrix3d':
          return 'matrix3d(' + animateArgs.join(',') + ')';
        case 'rotate':
          return animateArgs = animateArgs.map(addDegSuffix), 'rotate(' + animateArgs[0] + ')';
        case 'rotate3d':
          return animateArgs[3] = addDegSuffix(animateArgs[3]), 'rotate3d(' + animateArgs.join(',') + ')';
        case 'rotateX':
          return animateArgs = animateArgs.map(addDegSuffix), 'rotateX(' + animateArgs[0] + ')';
        case 'rotateY':
          return animateArgs = animateArgs.map(addDegSuffix), 'rotateY(' + animateArgs[0] + ')';
        case 'rotateZ':
          return animateArgs = animateArgs.map(addDegSuffix), 'rotateZ(' + animateArgs[0] + ')';
        case 'scale':
          return 'scale(' + animateArgs.join(',') + ')';
        case 'scale3d':
          return 'scale3d(' + animateArgs.join(',') + ')';
        case 'scaleX':
          return 'scaleX(' + animateArgs[0] + ')';
        case 'scaleY':
          return 'scaleY(' + animateArgs[0] + ')';
        case 'scaleZ':
          return 'scaleZ(' + animateArgs[0] + ')';
        case 'translate':
          return animateArgs = animateArgs.map(addPXSuffix), 'translate(' + animateArgs.join(',') + ')';
        case 'translate3d':
          return animateArgs = animateArgs.map(addPXSuffix), 'translate3d(' + animateArgs.join(',') + ')';
        case 'translateX':
          return animateArgs = animateArgs.map(addPXSuffix), 'translateX(' + animateArgs[0] + ')';
        case 'translateY':
          return animateArgs = animateArgs.map(addPXSuffix), 'translateY(' + animateArgs[0] + ')';
        case 'translateZ':
          return animateArgs = animateArgs.map(addPXSuffix), 'translateZ(' + animateArgs[0] + ')';
        case 'skew':
          return animateArgs = animateArgs.map(addDegSuffix), 'skew(' + animateArgs.join(',') + ')';
        case 'skewX':
          return animateArgs = animateArgs.map(addDegSuffix), 'skewX(' + animateArgs[0] + ')';
        case 'skewY':
          return animateArgs = animateArgs.map(addDegSuffix), 'skewY(' + animateArgs[0] + ')';
        default:
          return '';
      }
    }).join(' ');

    var style = animates.filter(function (animate) {
      var type = animate.type;
      return type === 'style';
    }).reduce(function (res, cur) {
      return res[cur.args[0]] = cur.args[1], res;
    }, {});

    var transitionProperty = ['transform'].concat((0, _keys2.default)(style)).join(',');

    return {
      style: style,
      transformOrigin: transformOrigin,
      transform: transform,
      transitionProperty: transitionProperty,
      transition: transition.duration + 'ms ' + transition.timingFunction + ' ' + transition.delay + 'ms'
    };
  },

  // service
  anyTypeToString: function anyTypeToString(data) {
    // 把e转成string并返回一个对象
    var dataType = this.getDataType(data);
    if (dataType == 'Array' || dataType == 'Object') {
      try {
        data = (0, _stringify2.default)(data);
      } catch (e) {
        e.type = 'AppServiceSdkKnownError';
        throw e;
      }
    } else {
      data = dataType == 'String' || dataType == 'Number' || dataType == 'Boolean' ? data.toString() : dataType == 'Date' ? data.getTime().toString() : dataType == 'Undefined' ? 'undefined' : dataType == 'Null' ? 'null' : '';
    }
    return {
      data: data,
      dataType: dataType
    };
  },
  stringToAnyType: function stringToAnyType(data, type) {
    // 把e解码回来，和前面a相对应

    return data = type == 'String' ? data : type == 'Array' || type == 'Object' ? JSON.parse(data) : type == 'Number' ? parseFloat(data) : type == 'Boolean' ? data == 'true' : type == 'Date' ? new Date(parseInt(data)) : type == 'Undefined' ? void 0 : type == 'Null' ? null : '';
  },
  getDataType: function getDataType(data) {
    // get data type
    return Object.prototype.toString.call(data).split(' ')[1].split(']')[0];
  },
  isPlainObject: function isPlainObject(e) {
    return this.getDataType(e) === 'Object';
  },
  paramCheck: function paramCheck(params, paramTpl) {
    // 比较e\t
    var result,
        name = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 'parameter',
        tplTpye = this.getDataType(paramTpl),
        pType = this.getDataType(params);
    if (pType != tplTpye) {
      return name + ' should be ' + tplTpye + ' instead of ' + pType + ';';
    }
    switch (result = '', tplTpye) {
      case 'Object':
        for (var i in paramTpl) {
          result += this.paramCheck(params[i], paramTpl[i], name + '.' + i);
        }
        break;
      case 'Array':
        if (params.length < paramTpl.length) {
          return name + ' should have at least ' + paramTpl.length + ' item;';
        }
        for (var a = 0; a < paramTpl.length; ++a) {
          result += this.paramCheck(params[a], paramTpl[a], name + '[' + a + ']');
        }
    }
    return result;
  },
  urlEncodeFormData: function urlEncodeFormData(data) {
    // 把对象生成queryString
    var needEncode = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) !== 'object') return data;
    var tmpArr = [];
    for (var o in data) {
      if (data.hasOwnProperty(o)) {
        if (needEncode) {
          try {
            tmpArr.push(encodeURIComponent(o) + '=' + encodeURIComponent(data[o]));
          } catch (t) {
            tmpArr.push(o + '=' + data[o]);
          }
        } else tmpArr.push(o + '=' + data[o]);
      }
    }
    return tmpArr.join('&');
  },
  addQueryStringToUrl: function addQueryStringToUrl(originalUrl, newParams) {
    // 生成url t:param obj
    if (typeof originalUrl === 'string' && (typeof newParams === 'undefined' ? 'undefined' : (0, _typeof3.default)(newParams)) === 'object' && (0, _keys2.default)(newParams).length > 0) {
      var urlComponents = originalUrl.split('?'),
          host = urlComponents[0],
          oldParams = (urlComponents[1] || '').split('&').reduce(function (res, cur) {
        if (typeof cur === 'string' && cur.length > 0) {
          var curArr = cur.split('='),
              key = curArr[0],
              value = curArr[1];
          res[key] = value;
        }
        return res;
      }, {}),
          refinedNewParams = (0, _keys2.default)(newParams).reduce(function (res, cur) {
        (0, _typeof3.default)(newParams[cur]) === 'object' ? res[encodeURIComponent(cur)] = encodeURIComponent((0, _stringify2.default)(newParams[cur])) : res[encodeURIComponent(cur)] = encodeURIComponent(newParams[cur]);
        return res;
      }, {});
      return host + '?' + this.urlEncodeFormData(this.assign(oldParams, refinedNewParams));
    }
    return originalUrl;
  },
  validateUrl: function validateUrl(url) {
    return (/^(http|https):\/\/.*/i.test(url)
    );
  },
  assign: function assign() {
    // endext 对象合并
    var args = Array.prototype.slice.apply(arguments);
    return args.reduce(function (res, cur) {
      for (var n in cur) {
        res[n] = cur[n];
      }
      return res;
    }, {});
  },
  encodeUrlQuery: function encodeUrlQuery(url) {
    // 把url中的参数encode
    if (typeof url === 'string') {
      var urlArr = url.split('?'),
          urlPath = urlArr[0],
          queryParams = (urlArr[1] || '').split('&').reduce(function (res, cur) {
        if (typeof cur === 'string' && cur.length > 0) {
          var curArr = cur.split('='),
              key = curArr[0],
              value = curArr[1];
          res[key] = value;
        }
        return res;
      }, {}),
          urlQueryArr = [];
      for (var i in queryParams) {
        queryParams.hasOwnProperty(i) && urlQueryArr.push(i + '=' + encodeURIComponent(queryParams[i]));
      }
      return urlQueryArr.length > 0 ? urlPath + '?' + urlQueryArr.join('&') : url;
    }
    return url;
  },
  addHTMLSuffix: function addHTMLSuffix(url) {
    // 给url加上。html的扩展名
    if (typeof url !== 'string') {
      return url;
    }
    var urlArr = url.split('?');
    urlArr[0] += '.html';
    return typeof urlArr[1] !== 'undefined' ? urlArr[0] + '?' + urlArr[1] : urlArr[0];
  },
  arrayBufferToBase64: function arrayBufferToBase64(buffer) {
    for (var res = '', arr = new Uint8Array(buffer), arrLeng = arr.byteLength, r = 0; r < arrLeng; r++) {
      res += String.fromCharCode(arr[r]);
    }
    return btoa(res);
  },
  base64ToArrayBuffer: function base64ToArrayBuffer(str) {
    for (var atobStr = atob(str), leng = atobStr.length, arr = new Uint8Array(leng), r = 0; r < leng; r++) {
      arr[r] = atobStr.charCodeAt(r);
    }
    return arr.buffer;
  },
  blobToArrayBuffer: function blobToArrayBuffer(blobStr, callback) {
    // readAsArrayBuffer t:callback
    var fileReader = new FileReader();
    fileReader.onload = function () {
      callback(this.result);
    };
    fileReader.readAsArrayBuffer(blobStr);
  },
  convertObjectValueToString: function convertObjectValueToString(obj) {
    // 把对象元素都转成字符串
    return (0, _keys2.default)(obj).reduce(function (res, cur) {
      typeof obj[cur] === 'string' ? res[cur] = obj[cur] : typeof obj[cur] === 'number' ? res[cur] = obj[cur] + '' : res[cur] = Object.prototype.toString.apply(obj[cur]);
      return res;
    }, {});
  },
  renameProperty: function renameProperty(obj, oldName, newName) {
    this.isPlainObject(obj) !== !1 && oldName != newName && obj.hasOwnProperty(oldName) && (obj[newName] = obj[oldName], delete obj[oldName]);
  },
  toArray: function toArray(arg) {
    // 把e转成array
    if (Array.isArray(arg)) {
      for (var t = 0, n = Array(arg.length); t < arg.length; t++) {
        n[t] = arg[t];
      }
      return n;
    }
    return (0, _from2.default)(arg);
  },
  canIUse: function canIUse(params, version) {
    return true;
    /*
    var name = params[0];//API或组件名
    if(Components[name]){
      return this.isComponentExist(params);
    } else if(APIs[name]){
      return this.isAPIExist(params);
    } else{
      return false;
    }
    */
  },

  /*  isComponentExist(params){
    var name = params[0],//组件名
      attribute = params[1],//属性名
      option = params[2],//组件属性可选值
      component = Components[name];
    if(!attribute){
      return true;
    } else{
      for(var key in component){
        for(var i=0;i<component[key].length;i++){
          if("string" == typeof component[key][i] && component[key][i] == attribute) {
            return true;
          } else if(component[key][i][attribute]){
            if(!option){
              return true;
            } else if(component[key][i][attribute].indexOf(option)>-1){
              return true;
            }
          }
        }
      }
      return false;
    }
  },
  isAPIExist(params){
    var name = params[0],//API名
      method = params[1],//调用方式：有效值为return, success, object, callback
      param = params[2],//组件属性可选值
      options = params[3],
      methods = ["return", "success", "object", "callback"],
      api = APIs[name];
    if(!method){
      return true;
    } else if(methods.indexOf(method)<0){
      return false;
    } else{
      for(var key in api){
        for(var i=0;i<key.length;i++){
          if("object" == typeof api[key][i] && api[key][i][method]) {
            if(!param){
              return true;
            } else{
              for(var j= 0;j<api[key][i][method].length;j++){
                if(typeof api[key][i][method][j] == "string" &&api[key][i][method][j] == param){
                  return true;
                } else if (typeof api[key][i][method][j] == "object" && api[key][i][method][j][param]){
                  if(!options){
                    return true;
                  } else if(api[key][i][method][j][param].indexOf(options)>-1){
                    return true;
                  }
                }
              }
            }
          }
        }
      }
      return false;
    }
  }, */
  transWxmlToHtml: function transWxmlToHtml(url) {
    if (typeof url !== 'string') return url;
    var urlArr = url.split('?');
    urlArr[0] += '.html';
    return void 0 !== urlArr[1] ? urlArr[0] + '?' + urlArr[1] : urlArr[0];
  },
  removeHtmlSuffixFromUrl: function removeHtmlSuffixFromUrl(url) {
    return typeof url === 'string' ? url.indexOf('?') !== -1 ? url.replace(/\.html\?/, '?') : url.replace(/\.html$/, '') : url;
  },

  AppServiceSdkKnownError: AppServiceSdkKnownError,
  AppServiceEngineKnownError: AppServiceEngineKnownError,
  defaultRunningStatus: 'active',
  wxQuerySelector: wxQuerySelector,

  safeInvoke: function safeInvoke() {
    // do page method
    var res = void 0,
        args = Array.prototype.slice.call(arguments),
        fn = args[0];
    args = args.slice(1);
    try {
      var startTime = Date.now();
      res = this[fn].apply(this, args);
      var doTime = Date.now() - startTime;
      doTime > 1e3 && Reporter.slowReport({
        key: 'pageInvoke',
        cost: doTime,
        extend: 'at ' + this.__route__ + ' page ' + fn + ' function'
      });
    } catch (e) {
      Reporter.thirdErrorReport({
        error: e,
        extend: 'at "' + this.__route__ + '" page ' + fn + ' function'
      });
    }
    return res;
  },
  isEmptyObject: function isEmptyObject(obj) {
    for (var t in obj) {
      if (obj.hasOwnProperty(t)) {
        return false;
      }
    }
    return true;
  },
  noop: function noop() {},
  def: function def(obj, attr, value, enumerable) {
    (0, _defineProperty2.default)(obj, attr, {
      value: value,
      enumerable: !!enumerable,
      writable: true,
      configurable: true
    });
  },
  error: function error(title, err) {
    console.group(new Date() + ' ' + title);
    console.error(err);
    console.groupEnd();
  },
  warn: function warn(title, _warn) {
    this.error(title, _warn);
  },
  info: function info(msg) {
    __wxConfig__ && __wxConfig__.debug && console.info(msg);
  },
  publish: function publish() {
    var params = Array.prototype.slice.call(arguments),
        defaultOpt = {
      options: {
        timestamp: Date.now()
      }
    };
    params[1] ? params[1].options = (0, _assign2.default)(params[1].options || {}, defaultOpt.options) : params[1] = defaultOpt;
    ServiceJSBridge.publish.apply(ServiceJSBridge, params);
  }
};
exports["default"] = utils;
module.exports = exports['default'];

/***/ }),

/***/ 5767:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
var statusDefineFlag = 1;
var statusRequireFlag = 2;
var moduleArr = {};

var define = function define(path, fun) {
  moduleArr[path] = {
    status: statusDefineFlag,
    factory: fun
  };
};

var getPathPrefix = function getPathPrefix(pathname) {
  // 返回path
  var res = pathname.match(/(.*)\/([^\/]+)?$/);
  return res && res[1] ? res[1] : './';
};

var getRequireFun = function getRequireFun(pathname) {
  // e:path 返回相对e的require
  var pathPrefix = getPathPrefix(pathname);
  return function (path) {
    if (typeof path !== 'string') {
      throw new Error('require args must be a string');
    }
    var floderArr = [];
    var folders = (pathPrefix + '/' + path).split('/');
    var pathLength = folders.length;
    for (var i = 0; i < pathLength; ++i) {
      var folder = folders[i];
      if (folder != '' && folder != '.') {
        if (folder == '..') {
          if (floderArr.length == 0) {
            throw new Error("can't find module : " + path);
          }
          floderArr.pop();
        } else {
          i + 1 < pathLength && folders[i + 1] == '..' ? i++ : floderArr.push(folder);
        }
      }
    }
    try {
      var pathname = floderArr.join('/');
      if (!/\.js$/.test(pathname)) {
        pathname += '.js';
      }
      return _require(pathname);
    } catch (e) {
      throw e;
    }
  };
};
var _require = function _require(path) {
  // exports o
  if (typeof path !== 'string') {
    throw new Error('require args must be a string');
  }
  var moduleObj = moduleArr[path];
  if (!moduleObj) throw new Error('module "' + path + '" is not defined');
  if (moduleObj.status === statusDefineFlag) {
    var factoryFun = moduleObj.factory;
    var module = {
      exports: {}
    };
    var exports;
    if (factoryFun) {
      exports = factoryFun(getRequireFun(path), module, module.exports);
    }

    moduleObj.exports = module.exports || exports;
    moduleObj.status = statusRequireFlag;
  }
  return moduleObj.exports;
};

__webpack_unused_export__ = define;
__webpack_unused_export__ = _require;

window.define = define;
window.require = _require;

wx.version = {
  updateTime: '2017.12.14 16:51:56',
  info: '',
  version: 32
};

/***/ }),

/***/ 8062:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _keys = __webpack_require__(8902);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Animation = function () {
  function Animation() {
    (0, _classCallCheck3.default)(this, Animation);

    var option = arguments.length <= 0 ? undefined : arguments[0];
    this.actions = [];
    this.currentTransform = [];
    this.currentStepAnimates = [];
    this.option = {
      transition: {
        duration: typeof option.duration !== 'undefined' ? option.duration : 400,
        timingFunction: typeof option.timingFunction !== 'undefined' ? option.timingFunction : 'linear',
        delay: typeof option.delay !== 'undefined' ? option.delay : 0
      },
      transformOrigin: option.transformOrigin || '50% 50% 0'
    };
  }

  (0, _createClass3.default)(Animation, [{
    key: 'export',
    value: function _export() {
      var temp = this.actions;
      this.actions = [];
      return { actions: temp };
    }
  }, {
    key: 'step',
    value: function step() {
      var that = this,
          params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};

      this.currentStepAnimates.forEach(function (animate) {
        animate.type !== 'style' ? that.currentTransform[animate.type] = animate : that.currentTransform[animate.type + '.' + animate.args[0]] = animate;
      });
      this.actions.push({
        animates: (0, _keys2.default)(this.currentTransform).reduce(function (res, cur) {
          return [].concat(_utils2.default.toArray(res), [that.currentTransform[cur]]);
        }, []),
        option: {
          transformOrigin: typeof params.transformOrigin !== 'undefined' ? params.transformOrigin : this.option.transformOrigin,
          transition: {
            duration: typeof params.duration !== 'undefined' ? params.duration : this.option.transition.duration,
            timingFunction: typeof params.timingFunction !== 'undefined' ? params.timingFunction : this.option.transition.timingFunction,
            delay: typeof params.delay !== 'undefined' ? params.delay : this.option.transition.delay
          }
        }
      });
      this.currentStepAnimates = [];
      return this;
    }
  }, {
    key: 'matrix',
    value: function matrix() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
          r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
          i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1;
      this.currentStepAnimates.push({
        type: 'matrix',
        args: [e, t, n, o, r, i]
      });
      return this;
    }
  }, {
    key: 'matrix3d',
    value: function matrix3d() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
          r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
          i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1,
          a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
          s = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0,
          c = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0,
          u = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : 0,
          f = arguments.length > 10 && void 0 !== arguments[10] ? arguments[10] : 1,
          l = arguments.length > 11 && void 0 !== arguments[11] ? arguments[11] : 0,
          d = arguments.length > 12 && void 0 !== arguments[12] ? arguments[12] : 0,
          p = arguments.length > 13 && void 0 !== arguments[13] ? arguments[13] : 0,
          h = arguments.length > 14 && void 0 !== arguments[14] ? arguments[14] : 0,
          v = arguments.length > 15 && void 0 !== arguments[15] ? arguments[15] : 1;
      this.currentStepAnimates.push({
        type: 'matrix3d',
        args: [e, t, n, o, r, i, a, s, c, u, f, l, d, p, h, v]
      });
      this.stepping = !1;
      return this;
    }
  }, {
    key: 'rotate',
    value: function rotate() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
      this.currentStepAnimates.push({
        type: 'rotate',
        args: [e]
      });
      return this;
    }
  }, {
    key: 'rotate3d',
    value: function rotate3d() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
          o = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
      this.currentStepAnimates.push({
        type: 'rotate3d',
        args: [e, t, n, o]
      });
      this.stepping = !1;
      return this;
    }
  }, {
    key: 'rotateX',
    value: function rotateX() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
      this.currentStepAnimates.push({
        type: 'rotateX',
        args: [e]
      });
      this.stepping = !1;
      return this;
    }
  }, {
    key: 'rotateY',
    value: function rotateY() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
      this.currentStepAnimates.push({
        type: 'rotateY',
        args: [e]
      });
      this.stepping = !1;
      return this;
    }
  }, {
    key: 'rotateZ',
    value: function rotateZ() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
      this.currentStepAnimates.push({
        type: 'rotateZ',
        args: [e]
      });
      this.stepping = !1;
      return this;
    }
  }, {
    key: 'scale',
    value: function scale() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
          t = arguments[1];
      t = typeof t !== 'undefined' ? t : e;
      this.currentStepAnimates.push({
        type: 'scale',
        args: [e, t]
      });
      return this;
    }
  }, {
    key: 'scale3d',
    value: function scale3d() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
      this.currentStepAnimates.push({
        type: 'scale3d',
        args: [e, t, n]
      });
      return this;
    }
  }, {
    key: 'scaleX',
    value: function scaleX() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
      this.currentStepAnimates.push({
        type: 'scaleX',
        args: [e]
      });
      return this;
    }
  }, {
    key: 'scaleY',
    value: function scaleY() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
      this.currentStepAnimates.push({
        type: 'scaleY',
        args: [e]
      });
      return this;
    }
  }, {
    key: 'scaleZ',
    value: function scaleZ() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
      this.currentStepAnimates.push({
        type: 'scaleZ',
        args: [e]
      });
      return this;
    }
  }, {
    key: 'skew',
    value: function skew() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      this.currentStepAnimates.push({
        type: 'skew',
        args: [e, t]
      });
      return this;
    }
  }, {
    key: 'skewX',
    value: function skewX() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
      this.currentStepAnimates.push({
        type: 'skewX',
        args: [e]
      });
      return this;
    }
  }, {
    key: 'skewY',
    value: function skewY() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
      this.currentStepAnimates.push({
        type: 'skewY',
        args: [e]
      });
      return this;
    }
  }, {
    key: 'translate',
    value: function translate() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      this.currentStepAnimates.push({
        type: 'translate',
        args: [e, t]
      });
      return this;
    }
  }, {
    key: 'translate3d',
    value: function translate3d() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
      this.currentStepAnimates.push({
        type: 'translate3d',
        args: [e, t, n]
      });
      return this;
    }
  }, {
    key: 'translateX',
    value: function translateX() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
      this.currentStepAnimates.push({
        type: 'translateX',
        args: [e]
      });
      return this;
    }
  }, {
    key: 'translateY',
    value: function translateY() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
      this.currentStepAnimates.push({
        type: 'translateY',
        args: [e]
      });
      return this;
    }
  }, {
    key: 'translateZ',
    value: function translateZ() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
      this.currentStepAnimates.push({
        type: 'translateZ',
        args: [e]
      });
      return this;
    }
  }, {
    key: 'opacity',
    value: function opacity(e) {
      this.currentStepAnimates.push({
        type: 'style',
        args: ['opacity', e]
      });
      return this;
    }
  }, {
    key: 'backgroundColor',
    value: function backgroundColor(e) {
      this.currentStepAnimates.push({
        type: 'style',
        args: ['backgroundColor', e]
      });
      return this;
    }
  }, {
    key: 'width',
    value: function width(e) {
      typeof e === 'number' && (e += 'px');
      this.currentStepAnimates.push({
        type: 'style',
        args: ['width', e]
      });
      return this;
    }
  }, {
    key: 'height',
    value: function height(e) {
      typeof e === 'number' && (e += 'px');
      this.currentStepAnimates.push({
        type: 'style',
        args: ['height', e]
      });
      return this;
    }
  }, {
    key: 'left',
    value: function left(e) {
      typeof e === 'number' && (e += 'px');
      this.currentStepAnimates.push({
        type: 'style',
        args: ['left', e]
      });
      return this;
    }
  }, {
    key: 'right',
    value: function right(e) {
      typeof e === 'number' && (e += 'px');
      this.currentStepAnimates.push({
        type: 'style',
        args: ['right', e]
      });
      return this;
    }
  }, {
    key: 'top',
    value: function top(e) {
      typeof e === 'number' && (e += 'px');
      this.currentStepAnimates.push({
        type: 'style',
        args: ['top', e]
      });
      return this;
    }
  }, {
    key: 'bottom',
    value: function bottom(e) {
      typeof e === 'number' && (e += 'px');
      this.currentStepAnimates.push({
        type: 'style',
        args: ['bottom', e]
      });
      return this;
    }
  }]);
  return Animation;
}();

exports["default"] = Animation;
module.exports = exports['default'];

/***/ }),

/***/ 6556:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _bridge = __webpack_require__(498);

var _bridge2 = _interopRequireDefault(_bridge);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

var _configFlags = __webpack_require__(3242);

var _configFlags2 = _interopRequireDefault(_configFlags);

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 1-15 绑定AppEnterForeground与AppEnterBackground

var eventEmitter = new _emitter2.default();
_bridge2.default.onMethod('onAppEnterForeground', function () {
  var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  eventEmitter.emit('onAppEnterForeground', params);
});
_bridge2.default.onMethod('onAppEnterBackground', function () {
  var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  eventEmitter.emit('onAppEnterBackground', params);
});
_bridge2.default.onMethod('onAppRunningStatusChange', function () {
  var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  _utils2.default.defaultRunningStatus = params.status;
  eventEmitter.emit('onAppRunningStatusChange', params);
});

var onAppEnterForeground = function onAppEnterForeground(fn) {
  var self = this;
  typeof fn === 'function' && setTimeout(fn, 0);
  eventEmitter.on('onAppEnterForeground', function (params) {
    _bridge2.default.publish('onAppEnterForeground', params), self.appStatus = _configFlags2.default.AppStatus.FORE_GROUND, typeof fn === 'function' && fn(params);
  });
};

var onAppEnterBackground = function onAppEnterBackground(fn) {
  var self = this;
  eventEmitter.on('onAppEnterBackground', function (params) {
    params = params || {};
    _bridge2.default.publish('onAppEnterBackground', params);
    params.mode === 'hide' ? self.appStatus = _configFlags2.default.AppStatus.LOCK : self.appStatus = _configFlags2.default.AppStatus.BACK_GROUND, params.mode === 'close' ? self.hanged = !1 : params.mode === 'hang' && (self.hanged = !0), typeof fn === 'function' && fn(params);
  });
};
var onAppRunningStatusChange = function onAppRunningStatusChange(fn) {
  eventEmitter.on('onAppRunningStatusChange', function (params) {
    typeof fn === 'function' && fn(params);
  });
};

exports["default"] = {
  onAppEnterForeground: onAppEnterForeground,
  onAppEnterBackground: onAppEnterBackground,
  onAppRunningStatusChange: onAppRunningStatusChange
};
module.exports = exports['default'];

/***/ }),

/***/ 498:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

var _native = __webpack_require__(6286);

var Native = _interopRequireWildcard(_native);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function invoke() {
  // ServiceJSBridge.invoke
  ServiceJSBridge.invoke.apply(ServiceJSBridge, arguments);
}

function on() {
  // ServiceJSBridge.on
  ServiceJSBridge.on.apply(ServiceJSBridge, arguments);
}

function publish() {
  // ServiceJSBridge.publish
  var args = Array.prototype.slice.call(arguments);
  args[1] = {
    data: args[1],
    options: {
      timestamp: Date.now()
    }
  };
  ServiceJSBridge.publish.apply(ServiceJSBridge, args);
}

function subscribe() {
  // ServiceJSBridge.subscribe
  var args = Array.prototype.slice.call(arguments),
      callback = args[1];
  args[1] = function (params, viewId) {
    var data = params.data; /*,
                            options = params.options,
                            timeMark = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
                            timestamp = options && options.timestamp || 0,
                            curTime = Date.now() */
    typeof callback === 'function' && callback(data, viewId);
    // Reporter.speedReport({
    //     key: "webview2AppService",
    //     data: data || {},
    //     timeMark: {
    //         startTime: timestamp,
    //         endTime: curTime,
    //         nativeTime: timeMark.nativeTime || 0
    //     }
    // })
  };
  ServiceJSBridge.subscribe.apply(ServiceJSBridge, args);
}

function invokeMethodSync(apiName, options, innerFns) {
  var params = {};
  for (var i in options) {
    typeof options[i] === 'function' && (params[i] = Reporter.surroundThirdByTryCatch(options[i], 'at api ' + apiName + ' ' + i + ' callback function'), delete options[i]);
  }
  var sysEventFns = {};
  for (var s in innerFns) {
    typeof innerFns[s] === 'function' && (sysEventFns[s] = Reporter.surroundThirdByTryCatch(innerFns[s], 'at api ' + apiName + ' ' + s + ' callback function'));
  }
  var callback = function callback(res) {
    res.errMsg = res.errMsg || apiName + ':ok';
    var isOk = res.errMsg.indexOf(apiName + ':ok') === 0,
        isCancel = res.errMsg.indexOf(apiName + ':cancel') === 0,
        isFail = res.errMsg.indexOf(apiName + ':fail') === 0;
    typeof sysEventFns.beforeAll === 'function' && sysEventFns.beforeAll(res);
    if (isOk) {
      typeof sysEventFns.beforeSuccess === 'function' && sysEventFns.beforeSuccess(res);
      typeof params.success === 'function' && params.success(res);
      typeof sysEventFns.afterSuccess === 'function' && sysEventFns.afterSuccess(res);
    } else if (isCancel) {
      ;res.errMsg = res.errMsg.replace(apiName + ':cancel', apiName + ':fail cancel'), typeof params.fail === 'function' && params.fail(res), typeof sysEventFns.beforeCancel === 'function' && sysEventFns.beforeCancel(res), typeof params.cancel === 'function' && params.cancel(res), typeof sysEventFns.afterCancel === 'function' && sysEventFns.afterCancel(res);
    } else if (isFail) {
      typeof sysEventFns.beforeFail === 'function' && sysEventFns.beforeFail(res), typeof params.fail === 'function' && params.fail(res);
      var rt = !0;
      typeof sysEventFns.afterFail === 'function' && (rt = sysEventFns.afterFail(res)), rt !== !1 && Reporter.reportIDKey({
        key: apiName + '_fail'
      });
    }
    typeof params.complete === 'function' && params.complete(res), typeof sysEventFns.afterAll === 'function' && sysEventFns.afterAll(res);
  };
  var opt = {};
  opt.sdkName = apiName;
  opt.args = options;

  var res = Native[apiName](opt);
  callback(res.msg);

  Reporter.reportIDKey({
    key: apiName
  });
}

function invokeMethod(apiName, options, innerFns) {
  var params = {};
  for (var i in options) {
    typeof options[i] === 'function' && (params[i] = Reporter.surroundThirdByTryCatch(options[i], 'at api ' + apiName + ' ' + i + ' callback function'), delete options[i]);
  }
  var sysEventFns = {};
  for (var s in innerFns) {
    typeof innerFns[s] === 'function' && (sysEventFns[s] = Reporter.surroundThirdByTryCatch(innerFns[s], 'at api ' + apiName + ' ' + s + ' callback function'));
  }
  invoke(apiName, options, function (res) {
    res.errMsg = res.errMsg || apiName + ':ok';
    var isOk = res.errMsg.indexOf(apiName + ':ok') === 0,
        isCancel = res.errMsg.indexOf(apiName + ':cancel') === 0,
        isFail = res.errMsg.indexOf(apiName + ':fail') === 0;
    typeof sysEventFns.beforeAll === 'function' && sysEventFns.beforeAll(res);
    if (isOk) {
      typeof sysEventFns.beforeSuccess === 'function' && sysEventFns.beforeSuccess(res), typeof params.success === 'function' && params.success(res), typeof sysEventFns.afterSuccess === 'function' && sysEventFns.afterSuccess(res);
    } else if (isCancel) {
      ;res.errMsg = res.errMsg.replace(apiName + ':cancel', apiName + ':fail cancel'), typeof params.fail === 'function' && params.fail(res), typeof sysEventFns.beforeCancel === 'function' && sysEventFns.beforeCancel(res), typeof params.cancel === 'function' && params.cancel(res), typeof sysEventFns.afterCancel === 'function' && sysEventFns.afterCancel(res);
    } else if (isFail) {
      typeof sysEventFns.beforeFail === 'function' && sysEventFns.beforeFail(res), typeof params.fail === 'function' && params.fail(res);
      var rt = !0;
      typeof sysEventFns.afterFail === 'function' && (rt = sysEventFns.afterFail(res)), rt !== !1 && Reporter.reportIDKey({
        key: apiName + '_fail'
      });
    }
    typeof params.complete === 'function' && params.complete(res), typeof sysEventFns.afterAll === 'function' && sysEventFns.afterAll(res);
  });
  Reporter.reportIDKey({
    key: apiName
  });
}

function noop() {}

function onMethod(apiName, callback) {
  // onMethod
  on(apiName, Reporter.surroundThirdByTryCatch(callback, 'at api ' + apiName + ' callback function'));
}
function beforeInvoke(apiName, params, paramTpl) {
  var res = _utils2.default.paramCheck(params, paramTpl);
  return !res || (beforeInvokeFail(apiName, params, 'parameter error: ' + res), !1);
}

function beforeInvokeFail(apiName) {
  var params = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      errMsg = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '',
      err = apiName + ':fail ' + errMsg;
  console.error(err);
  var fail = Reporter.surroundThirdByTryCatch(params.fail || noop, 'at api ' + apiName + ' fail callback function'),
      complete = Reporter.surroundThirdByTryCatch(params.complete || noop, 'at api ' + apiName + ' complete callback function');
  fail({ errMsg: err });
  complete({ errMsg: err });
}

function checkUrlInConfig(apiName, url, params) {
  var path = url.replace(/\.html\?.*|\.html$/, '');
  return __wxConfig.pages.indexOf(path) !== -1 || (beforeInvokeFail(apiName, params, 'url "' + _utils2.default.removeHtmlSuffixFromUrl(url) + '" is not in app.json'), !1);
}

exports["default"] = {
  invoke: invoke,
  on: on,
  publish: publish,
  subscribe: subscribe,
  invokeMethod: invokeMethod,
  invokeMethodSync: invokeMethodSync,
  onMethod: onMethod,
  noop: noop,
  beforeInvoke: beforeInvoke,
  beforeInvokeFail: beforeInvokeFail,
  checkUrlInConfig: checkUrlInConfig
};
module.exports = exports['default'];

/***/ }),

/***/ 393:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _bridge = __webpack_require__(498);

var _bridge2 = _interopRequireDefault(_bridge);

var _context = __webpack_require__(3765);

var _context2 = _interopRequireDefault(_context);

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function canvasDesString(webviewID, canvasId) {
  return webviewID + 'canvas' + canvasId;
}

function clearOldWebviewCanvas() {
  for (var key in canvasIDs) {
    if (key.indexOf(webviewID + 'canvas') == 0) {
      canvasIDs[key];
      delete canvasIDs[key];
    }
  }
}

function notifyWebviewIdtoCanvas(e) {
  webviewID = e;
}

function invokeDrawCanvas(canvasId, actions) {
  var reserve = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
  /*
        success = arguments[3],
        fail = arguments[4],
        complte = arguments[5],
        platform = utils.getPlatform();
    "ios" == platform || "android" == platform ?
        ServiceJSBridge.invoke("drawCanvas", {
            canvasId: canvasId,
            reserve: reserve,
            actions: actions
        },
        function (e) {
            e.errMsg && /ok/.test(e.errMsg) ?
            "function" == typeof success && success(e) :
            "function" == typeof fail && fail(e)
            "function" == typeof complte && complte(e)
        }) :
  */
  ServiceJSBridge.publish('canvas' + canvasId + 'actionsChanged', {
    actions: actions,
    reserve: reserve
  });
}

function drawCanvas(params) {
  var canvasId = params.canvasId,
      actions = params.actions,
      reserve = params.reserve,
      success = params.success,
      fail = params.fail,
      complete = params.complete;
  if (canvasId && Array.isArray(actions)) {
    var key = canvasDesString(webviewID, canvasId);
    if (typeof canvasIDs[key] === 'number') {
      var canvasId = canvasIDs[key];
      invokeDrawCanvas(canvasId, actions, reserve, success, fail, complete);
    } else {
      canvasOptions[key] = canvasOptions[key] || [];
      canvasOptions[key] = canvasOptions[key].concat({
        actions: actions,
        reserve: reserve,
        success: success,
        fail: fail,
        complete: complete
      });
    }
  }
}

function canvasToTempFilePathImpl(obj) {
  ServiceJSBridge.subscribe('onCanvasToDataUrl_' + obj.canvasId, function (params) {
    var dataUrl = params.dataUrl;
    _bridge2.default.invokeMethod('base64ToTempFilePath', _utils2.default.assign({ base64Data: dataUrl }, obj), {
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('base64ToTempFilePath', 'canvasToTempFilePath');
      }
    });
  }), _bridge2.default.publish('invokeCanvasToDataUrl_' + obj.canvasId, {
    canvasId: obj.canvasId
  });
}

function canvasToTempFilePath(obj) {
  if (obj.canvasId) {
    var key = canvasDesString(webviewID, obj.canvasId);
    if (typeof canvasIDs[key] === 'number') {
      obj.canvasId = canvasIDs[key];
      canvasToTempFilePathImpl(obj);
    } else {
      var res = {
        errMsg: 'canvasToTempFilePath: fail canvas is empty'
      };
      typeof obj.fail === 'function' && obj.fail(res), typeof obj.complete === 'function' && obj.complete(res);
    }
  }
}

var webviewID = 0,
    canvasInfo = {},
    canvasIDs = {},
    canvasOptions = {};

ServiceJSBridge.subscribe('canvasInsert', function (event, t) {
  var canvasId = event.canvasId,
      canvasNumber = event.canvasNumber,
      data = event.data,
      key = canvasDesString(webviewID, canvasId);

  canvasInfo[canvasNumber] = {
    lastTouches: [],
    data: data
  };

  canvasIDs[key] = canvasIDs[key] || canvasNumber;

  Array.isArray(canvasOptions[key]) && (canvasOptions[key].forEach(function (e) {
    invokeDrawCanvas(canvasNumber, e.actions, e.reserve, e.success, e.fail, e.complete);
  }), delete canvasOptions[key]);
});

ServiceJSBridge.subscribe('canvasRemove', function (params, t) {
  var canvasId = params.canvasId,
      canvasIndex = canvasDesString(webviewID, canvasId);
  canvasIDs[canvasIndex] && delete canvasIDs[canvasIndex];
});

var createContext = function createContext() {
  return new _context2.default.Context();
},
    createCanvasContext = function createCanvasContext(e) {
  return new _context2.default.Context(e);
};

exports["default"] = {
  canvasInfo: canvasInfo,
  clearOldWebviewCanvas: clearOldWebviewCanvas,
  notifyWebviewIdtoCanvas: notifyWebviewIdtoCanvas,
  drawCanvas: drawCanvas,
  canvasToTempFilePath: canvasToTempFilePath,
  createContext: createContext,
  createCanvasContext: createCanvasContext
};
module.exports = exports['default'];

/***/ }),

/***/ 3242:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// module6

exports["default"] = {
  AppStatus: {
    FORE_GROUND: 0,
    BACK_GROUND: 1,
    LOCLOCKK: 2
  }
};
module.exports = exports["default"];

/***/ }),

/***/ 3765:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

var _canvas = __webpack_require__(393);

var _canvas2 = _interopRequireDefault(_canvas);

var _predefinedColor = __webpack_require__(1076);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Canvas Context API
function notifyCurrentRoutetoContext(url) {
  curUrl = url;
}

function isNum(e) {
  return typeof e === 'number';
}

function parseColorValue(colorStr) {
  var matchArr = null;
  if ((matchArr = /^#([0-9|A-F|a-f]{6})$/.exec(colorStr)) != null) {
    var red = parseInt(matchArr[1].slice(0, 2), 16),
        green = parseInt(matchArr[1].slice(2, 4), 16),
        blue = parseInt(matchArr[1].slice(4), 16);
    return [red, green, blue, 255];
  }

  if ((matchArr = /^rgb\((.+)\)$/.exec(colorStr)) != null) {
    return matchArr[1].split(',').map(function (e) {
      return parseInt(e.trim());
    }).concat(255);
  }

  if ((matchArr = /^rgba\((.+)\)$/.exec(colorStr)) != null) {
    return matchArr[1].split(',').map(function (e, t) {
      return t == 3 ? Math.floor(255 * parseFloat(e.trim())) : parseInt(e.trim());
    });
  }

  var color = colorStr.toLowerCase();

  if (_predefinedColor.predefinedColor.hasOwnProperty(color)) {
    matchArr = /^#([0-9|A-F|a-f]{6})$/.exec(_predefinedColor.predefinedColor[color]);
    var red = parseInt(matchArr[1].slice(0, 2), 16),
        green = parseInt(matchArr[1].slice(2, 4), 16),
        blue = parseInt(matchArr[1].slice(4), 16);
    return [red, green, blue, 255];
  }

  console.group('非法颜色: ' + colorStr);
  console.error('不支持颜色：' + colorStr);
  console.groupEnd();
}

function deepCopy(obj) {
  // 复制对象
  if (Array.isArray(obj)) {
    var res = [];
    obj.forEach(function (e) {
      res.push(deepCopy(e));
    });
    return res;
  }
  if ((typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object') {
    var res = {};
    for (var n in obj) {
      res[n] = deepCopy(obj[n]);
    }return res;
  }
  return obj;
}

var transformAndOthersAPI = ['scale', 'rotate', 'translate', 'save', 'restore'],
    drawingAPI = ['drawImage', 'fillText', 'fill', 'stroke', 'fillRect', 'strokeRect', 'clearRect'],
    drawPathAPI = ['beginPath', 'moveTo', 'lineTo', 'rect', 'arc', 'quadraticCurveTo', 'bezierCurveTo', 'closePath'],
    styleAPI = ['setFillStyle', 'setStrokeStyle', 'setGlobalAlpha', 'setShadow', 'setFontSize', 'setLineCap', 'setLineJoin', 'setLineWidth', 'setMiterLimit'],
    curUrl = '';

var ColorStop = function () {
  function ColorStop(type, data) {
    (0, _classCallCheck3.default)(this, ColorStop);

    this.type = type;
    this.data = data;
    this.colorStop = [];
  }

  (0, _createClass3.default)(ColorStop, [{
    key: 'addColorStop',
    value: function addColorStop(e, t) {
      this.colorStop.push([e, parseColorValue(t)]);
    }
  }]);
  return ColorStop;
}();

var Context = function () {
  function Context(t) {
    (0, _classCallCheck3.default)(this, Context);

    this.actions = [];
    this.path = [];
    this.canvasId = t;
  }

  (0, _createClass3.default)(Context, [{
    key: 'getActions',
    value: function getActions() {
      var actions = deepCopy(this.actions);
      this.actions = [];
      this.path = [];
      return actions;
    }
  }, {
    key: 'clearActions',
    value: function clearActions() {
      this.actions = [];
      this.path = [];
    }
  }, {
    key: 'draw',
    value: function draw() {
      var reserve = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          canvasId = this.canvasId,
          actions = deepCopy(this.actions);
      this.actions = [];
      this.path = [];
      _canvas2.default.drawCanvas({
        canvasId: canvasId,
        actions: actions,
        reserve: reserve
      });
    }
  }, {
    key: 'createLinearGradient',
    value: function createLinearGradient(e, t, n, o) {
      return new ColorStop('linear', [e, t, n, o]);
    }
  }, {
    key: 'createCircularGradient',
    value: function createCircularGradient(e, t, n) {
      return new ColorStop('radial', [e, t, n]);
    }
  }]);
  return Context;
}();

;[].concat(transformAndOthersAPI, drawingAPI).forEach(function (apiName) {
  var data = void 0;
  apiName == 'fill' || apiName == 'stroke' ? Context.prototype[apiName] = function () {
    this.actions.push({
      method: apiName + 'Path',
      data: deepCopy(this.path)
    });
  } : apiName === 'fillRect' ? Context.prototype[apiName] = function (e, t, n, o) {
    this.actions.push({
      method: 'fillPath',
      data: [{
        method: 'rect',
        data: [e, t, n, o]
      }]
    });
  } : apiName === 'strokeRect' ? Context.prototype[apiName] = function (e, t, n, o) {
    this.actions.push({
      method: 'strokePath',
      data: [{
        method: 'rect',
        data: [e, t, n, o]
      }]
    });
  } : apiName == 'fillText' ? Context.prototype[apiName] = function (t, n, o) {
    this.actions.push({
      method: apiName,
      data: [t.toString(), n, o]
    });
  } : apiName == 'drawImage' ? Context.prototype[apiName] = function (t, n, o, r, a) {
    isNum(r) && isNum(a) ? data = [t, n, o, r, a] : data = [t, n, o], this.actions.push({
      method: apiName,
      data: data
    });
  } : Context.prototype[apiName] = function () {
    this.actions.push({
      method: apiName,
      data: [].slice.apply(arguments)
    });
  };
});
drawPathAPI.forEach(function (apiName) {
  apiName == 'beginPath' ? Context.prototype[apiName] = function () {
    this.path = [];
  } : apiName == 'lineTo' ? Context.prototype.lineTo = function () {
    this.path.length == 0 ? this.path.push({
      method: 'moveTo',
      data: [].slice.apply(arguments)
    }) : this.path.push({
      method: 'lineTo',
      data: [].slice.apply(arguments)
    });
  } : Context.prototype[apiName] = function () {
    this.path.push({
      method: apiName,
      data: [].slice.apply(arguments)
    });
  };
});
styleAPI.forEach(function (apiName) {
  apiName == 'setFillStyle' || apiName == 'setStrokeStyle' ? Context.prototype[apiName] = function () {
    var params = arguments[0];
    typeof params === 'string' ? this.actions.push({
      method: apiName,
      data: ['normal', parseColorValue(params)]
    }) : (typeof params === 'undefined' ? 'undefined' : (0, _typeof3.default)(params)) === 'object' && params instanceof ColorStop && this.actions.push({
      method: apiName,
      data: [params.type, params.data, params.colorStop]
    });
  } : apiName === 'setGlobalAlpha' ? Context.prototype[apiName] = function () {
    var data = [].slice.apply(arguments, [0, 1]);
    data[0] = Math.floor(255 * parseFloat(data[0]));
    this.actions.push({
      method: apiName,
      data: data
    });
  } : apiName == 'setShadow' ? Context.prototype[apiName] = function () {
    var data = [].slice.apply(arguments, [0, 4]);
    data[3] = parseColorValue(data[3]);
    this.actions.push({
      method: apiName,
      data: data
    });
  } : Context.prototype[apiName] = function () {
    this.actions.push({
      method: apiName,
      data: [].slice.apply(arguments, [0, 1])
    });
  };
});

exports["default"] = {
  notifyCurrentRoutetoContext: notifyCurrentRoutetoContext,
  Context: Context
};
module.exports = exports['default'];

/***/ }),

/***/ 7889:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

__webpack_require__(498);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

var _configFlags = __webpack_require__(3242);

var _configFlags2 = _interopRequireDefault(_configFlags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createAudio(e, t) {
  var self = this,
      audioObj = new Audio(e, t);
  audioObj._getAppStatus = function () {
    return self.appStatus;
  };
  audioObj._getHanged = function () {
    return self.hanged;
  };
  this.onAppEnterBackground(function () {
    audioObj.pause();
  });
  return audioObj;
}

var audioFlags = {},
    eventBus = new _emitter2.default();

ServiceJSBridge.subscribe('audioInsert', function (params, webviewId) {
  var audioId = params.audioId;
  audioFlags[webviewId + '_' + audioId] = !0;
  eventBus.emit('audioInsert_' + webviewId + '_' + audioId);
});

var Audio = function () {
  function Audio(audioId, webviewId) {
    (0, _classCallCheck3.default)(this, Audio);

    if (typeof audioId !== 'string') {
      throw new Error('audioId should be a String');
    }
    this.audioId = audioId;
    this.webviewId = webviewId;
  }

  (0, _createClass3.default)(Audio, [{
    key: 'setSrc',
    value: function setSrc(data) {
      this._sendAction({
        method: 'setSrc',
        data: data
      });
    }
  }, {
    key: 'play',
    value: function play() {
      var status = this._getAppStatus();
      this._getHanged();
      status === _configFlags2.default.AppStatus.BACK_GROUND || this._sendAction({
        method: 'play'
      });
    }
  }, {
    key: 'pause',
    value: function pause() {
      this._sendAction({
        method: 'pause'
      });
    }
  }, {
    key: 'seek',
    value: function seek(data) {
      this._sendAction({
        method: 'setCurrentTime',
        data: data
      });
    }
  }, {
    key: '_ready',
    value: function _ready(fn) {
      audioFlags[this.webviewId + '_' + this.audioId] ? fn() : eventBus.on('audioInsert_' + this.webviewId + '_' + this.audioId, function () {
        fn();
      });
    }
  }, {
    key: '_sendAction',
    value: function _sendAction(params) {
      var self = this;
      this._ready(function () {
        ServiceJSBridge.publish('audio_' + self.audioId + '_actionChanged', params, [self.webviewId]);
      });
    }
  }]);
  return Audio;
}();

exports["default"] = createAudio;
module.exports = exports['default'];

/***/ }),

/***/ 6785:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

var _configFlags = __webpack_require__(3242);

var _configFlags2 = _interopRequireDefault(_configFlags);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createVideo(videoId, t) {
  var self = this,
      videoObj = new VideoControl(videoId, t);
  videoObj._getAppStatus = function () {
    return self.appStatus;
  };
  videoObj._getHanged = function () {
    return self.hanged;
  };
  this.onAppEnterBackground(function () {
    videoObj.pause();
  });
  return videoObj;
}

var videoPlayerIds = {},
    EventEmitter = new _emitter2.default();

ServiceJSBridge.subscribe('videoPlayerInsert', function (params, t) {
  var domId = params.domId,
      videoPlayerId = params.videoPlayerId;
  videoPlayerIds[domId] = videoPlayerIds[domId] || videoPlayerId;
  EventEmitter.emit('videoPlayerInsert', domId);
});

ServiceJSBridge.subscribe('videoPlayerRemoved', function (params, t) {
  var domId = params.domId;
  params.videoPlayerId;
  delete videoPlayerIds[domId];
});

var VideoControl = function () {
  function VideoControl(videoId) {
    (0, _classCallCheck3.default)(this, VideoControl);

    if (typeof videoId !== 'string') {
      throw new Error('video ID should be a String');
    }
    this.domId = videoId;
  }

  (0, _createClass3.default)(VideoControl, [{
    key: 'play',
    value: function play() {
      var appStatus = this._getAppStatus();
      appStatus === _configFlags2.default.AppStatus.BACK_GROUND || appStatus === _configFlags2.default.AppStatus.LOCK || this._invokeMethod('play');
    }
  }, {
    key: 'pause',
    value: function pause() {
      this._invokeMethod('pause');
    }
  }, {
    key: 'seek',
    value: function seek(e) {
      this._invokeMethod('seek', [e]);
    }
  }, {
    key: 'sendDanmu',
    value: function sendDanmu(params) {
      var text = params.text,
          color = params.color;
      this._invokeMethod('sendDanmu', [text, color]);
    }
  }, {
    key: '_invokeMethod',
    value: function _invokeMethod(type, data) {
      function invoke() {
        this.action = { method: type, data: data };
        this._sendAction();
      }

      var self = this;
      typeof videoPlayerIds[this.domId] === 'number' ? invoke.apply(this) : EventEmitter.on('videoPlayerInsert', function (e) {
        invoke.apply(self);
      });
    }
  }, {
    key: '_sendAction',
    value: function _sendAction() {
      ServiceJSBridge.publish('video_' + this.domId + '_actionChanged', this.action, [window.__wxConfig.viewId]);
    }
  }]);
  return VideoControl;
}();

exports["default"] = createVideo;
module.exports = exports['default'];

/***/ }),

/***/ 2511:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = __webpack_require__(3239);

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = __webpack_require__(8902);

var _keys2 = _interopRequireDefault(_keys);

var _assign = __webpack_require__(2945);

var _assign2 = _interopRequireDefault(_assign);

var _bridge = __webpack_require__(498);

var _bridge2 = _interopRequireDefault(_bridge);

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

var _Animation = __webpack_require__(8062);

var _Animation2 = _interopRequireDefault(_Animation);

var _createAudio = __webpack_require__(7889);

var _createAudio2 = _interopRequireDefault(_createAudio);

var _createVideo = __webpack_require__(6785);

var _createVideo2 = _interopRequireDefault(_createVideo);

var _map = __webpack_require__(4928);

var _map2 = _interopRequireDefault(_map);

var _configFlags = __webpack_require__(3242);

var _configFlags2 = _interopRequireDefault(_configFlags);

var _context = __webpack_require__(3765);

var _context2 = _interopRequireDefault(_context);

var _canvas = __webpack_require__(393);

var _canvas2 = _interopRequireDefault(_canvas);

var _appContextSwitch = __webpack_require__(6556);

var _appContextSwitch2 = _interopRequireDefault(_appContextSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function paramCheck(apiName, params, paramTpl) {
  var res = _utils2.default.paramCheck(params, paramTpl);
  return !res || (logErr(apiName, params, apiName + ':fail parameter error: ' + res), !1);
}

function paramCheckFail(apiName) {
  var res = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '',
      errMsg = apiName + ':fail ' + n;
  console.error(errMsg);
  var fail = Reporter.surroundThirdByTryCatch(options.fail || emptyFn, 'at api ' + apiName + ' fail callback function'),
      complete = Reporter.surroundThirdByTryCatch(options.complete || emptyFn, 'at api ' + apiName + ' complete callback function');
  fail({
    errMsg: errMsg
  });
  complete({
    errMsg: errMsg
  });
}

function checkUrl(apiName, params) {
  // 判断当前页面是否在app.json里
  var matchArr = /^(.*)\.html/gi.exec(params.url);
  return !matchArr || __wxConfig__.pages.indexOf(matchArr[1]) !== -1 || (logErr(apiName, params, apiName + ':fail url not in app.json'), !1);
}

typeof logxx === 'function' && logxx('sdk start');

var emptyFn = function emptyFn() {},
    pageData = {},
    currUrl = '',
    SDKVersion = '1.4.2',
    appRouteCallbacks = [],
    appRouteDoneCallback = [],
    pageEventFn = void 0,
    wx = {},
    hasInvokeEnableAccelerometer = !1,
    hasInvokeEnableCompass = !1,
    accelerometerChangeFns = [],
    compassChangeFns = [],
    refreshSessionTimeHander = void 0,
    curWebViewId = void 0,
    currentClipBoardData = void 0,
    loginSourceUrl = '';

_bridge2.default.subscribe('SPECIAL_PAGE_EVENT', function (params) {
  var data = params.data,
      eventName = params.eventName,
      ext = params.ext,
      webViewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  if (data && data.type == 'input' && typeof pageEventFn === 'function') {
    var res = pageEventFn({
      data: data,
      eventName: eventName,
      webviewId: webViewId
    }),
        value = data.detail.value;
    if (ext && ext.setKeyboardValue) {
      if (res === undefined) {} else if (_utils2.default.getDataType(res) === 'Object') {
        var params = {};
        value != res.value && (params.value = res.value + '');
        isNaN(parseInt(res.cursor)) || (params.cursor = parseInt(res.cursor));
        _bridge2.default.publish('setKeyboardValue', params, [webViewId]);
      } else {
        value != res && _bridge2.default.publish('setKeyboardValue', {
          value: res + '',
          cursor: -1
        }, [webViewId]);
      }
    }
  }
});

var logErr = function logErr(apiName) {
  var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      errMsg = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
  console.error(errMsg);
  Reporter.triggerErrorMessage(errMsg);
  var fail = Reporter.surroundThirdByTryCatch(options.fail || emptyFn, 'at api ' + apiName + ' fail callback function'),
      complete = Reporter.surroundThirdByTryCatch(options.complete || emptyFn, 'at api ' + apiName + ' complete callback function');
  fail({
    errMsg: errMsg
  });
  complete({
    errMsg: errMsg
  });
};

var apiObj = {
  // wx对象
  invoke: _bridge2.default.invoke,
  on: _bridge2.default.on,
  drawCanvas: _canvas2.default.drawCanvas,
  createContext: _canvas2.default.createContext,
  createCanvasContext: _canvas2.default.createCanvasContext,
  canvasToTempFilePath: _canvas2.default.canvasToTempFilePath,
  reportIDKey: function reportIDKey(e, t) {},
  reportKeyValue: function reportKeyValue(e, t) {},
  onPullDownRefresh: function onPullDownRefresh(e) {
    console.log('onPullDownRefresh has been removed from api list');
  },
  setNavigationBarColor: function setNavigationBarColor() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    if (paramCheck('setNavigationBarColor', params, {
      frontColor: '',
      backgroundColor: ''
    })) {
      if (['#ffffff', '#000000'].indexOf(params.frontColor) === -1) {
        logErr('setNavigationBarColor', params, 'invalid frontColor "' + params.frontColor + '"');
      }

      params.frontColor === '#ffffff' ? _bridge2.default.invokeMethod('setStatusBarStyle', {
        color: 'white'
      }) : params.frontColor === '#000000' && _bridge2.default.invokeMethod('setStatusBarStyle', {
        color: 'black'
      });

      var t = (0, _assign2.default)({}, params);
      delete t.alpha;
      _bridge2.default.invokeMethod('setNavigationBarColor', t);
    }
  },
  setNavigationBarTitle: function setNavigationBarTitle() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    paramCheck('setNavigationBarTitle', params, {
      title: ''
    }) && _bridge2.default.invokeMethod('setNavigationBarTitle', params);
  },
  showNavigationBarLoading: function showNavigationBarLoading(e) {
    _bridge2.default.invokeMethod('showNavigationBarLoading', e);
  },
  hideNavigationBarLoading: function hideNavigationBarLoading(e) {
    _bridge2.default.invokeMethod('hideNavigationBarLoading', e);
  },
  stopPullDownRefresh: function stopPullDownRefresh(e) {
    _bridge2.default.invokeMethod('stopPullDownRefresh', e);
  },
  redirectTo: function redirectTo(params) {
    arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (paramCheck('redirectTo', params, { url: '' })) {
      params.url = _utils2.default.getRealRoute(currUrl, params.url);
      params.url = _utils2.default.encodeUrlQuery(params.url);
      checkUrl('redirectTo', params) && _bridge2.default.invokeMethod('redirectTo', params, {
        afterSuccess: function afterSuccess() {
          currUrl = params.url;
        }
      });
    }
  },
  // 关闭所有页面，打开到应用内的某个页面
  reLaunch: function reLaunch(params) {
    arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (_utils2.default.defaultRunningStatus != 'active') {
      return paramCheckFail('reLaunch', params, 'can not invoke reLaunch in background');
    }
    if (paramCheck('reLaunch', params, { url: '' })) {
      params.url = _utils2.default.getRealRoute(currUrl, params.url);
      params.url = _utils2.default.encodeUrlQuery(params.url);
      checkUrl('reLaunch', params) && _bridge2.default.invokeMethod('reLaunch', params, {
        afterSuccess: function afterSuccess() {
          currUrl = params.url;
        },
        afterFail: function afterFail() {
          console.log('failed');
        }
      });
    }
  },
  createSelectorQuery: function createSelectorQuery(e) {
    // 返回一个SelectorQuery对象实例
    var t = null;
    if (e && e.page) {
      t.e.page__wxWebViewId__;
    } else {
      var n = getCurrentPages();
      t = n[n.length - 1].__wxWebviewId__;
    }
    return new _utils2.default.wxQuerySelector(t);
  },

  pageScrollTo: function pageScrollTo(param) {
    // 将页面滚动到目标位置
    var target = getCurrentPages(),
        viewId = target[target.length - 1].__wxWebviewId__;
    if (param.hasOwnProperty('page') && param.page.hasOwnProperty('__wxWebviewId__')) {
      viewId = param.page.__wxWebviewId__;
    }

    _bridge2.default.invokeMethod('pageScrollTo', param, [viewId]);
  },

  navigateTo: function navigateTo(params) {
    arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    if (paramCheck('navigateTo', params, { url: '' })) {
      params.url = _utils2.default.getRealRoute(currUrl, params.url);
      params.url = _utils2.default.encodeUrlQuery(params.url);
      checkUrl('navigateTo', params) && _bridge2.default.invokeMethod('navigateTo', params, {
        afterSuccess: function afterSuccess() {
          currUrl = params.url;
          _context2.default.notifyCurrentRoutetoContext(currUrl);
        }
      });
    }
  },
  switchTab: function switchTab() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    if (paramCheck('switchTab', params, { url: '' })) {
      ;/\?.*$/.test(params.url) && (console.warn('wx.switchTab: url 不支持 queryString'), params.url = params.url.replace(/\?.*$/, ''));
      params.url = _utils2.default.getRealRoute(currUrl, params.url);
      params.url = _utils2.default.encodeUrlQuery(params.url);
      checkUrl('switchTab', params) && _bridge2.default.invokeMethod('switchTab', params, {
        afterSuccess: function afterSuccess() {
          currUrl = params.url;
          _context2.default.notifyCurrentRoutetoContext(currUrl);
        }
      });
    }
  },
  navigateBack: function navigateBack() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    typeof params.delta !== 'number' ? params.delta = 1 : (params.delta = parseInt(params.delta), params.delta < 1 && (params.delta = 1));
    _bridge2.default.invokeMethod('navigateBack', params);
  },
  getStorage: function getStorage(params) {
    if (paramCheck('getStorage', params, { key: '' })) {
      _bridge2.default.invokeMethod('getStorage', params, {
        beforeSuccess: function beforeSuccess(res) {
          res.data = _utils2.default.stringToAnyType(res.data, res.dataType);
          delete res.dataType;
        },
        afterFail: function afterFail() {
          var res = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (res.errMsg && res.errMsg.indexOf('data not found') > 0) return !1;
        }
      });
    }
  },
  getStorageSync: function getStorageSync(key) {
    if (paramCheck('getStorageSync', key, '')) {
      var rt;
      _bridge2.default.invokeMethodSync('getStorageSync', { key: key }, {
        beforeAll: function beforeAll(res) {
          res = res || {};
          rt = _utils2.default.stringToAnyType(res.data, res.dataType);
        },
        afterFail: function afterFail() {
          var res = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (res.errMsg && res.errMsg.indexOf('data not found') > 0) {
            return !1;
          }
        }
      });
      return rt;
    }
  },
  setStorage: function setStorage(params) {
    if (paramCheck('setStorage', params, { key: '' })) {
      try {
        var opt = _utils2.default.anyTypeToString(params.data),
            data = opt.data,
            dataType = opt.dataType;
        _bridge2.default.invokeMethod('setStorage', {
          key: params.key,
          data: data,
          dataType: dataType,
          success: params.success,
          fail: params.fail,
          complete: params.complete
        });
      } catch (e) {
        typeof params.fail === 'function' && params.fail({
          errMsg: 'setStorage:fail ' + e.message
        }), typeof params.complete === 'function' && params.complete({
          errMsg: 'setStorage:fail ' + e.message
        });
      }
    }
  },
  setStorageSync: function setStorageSync(key, value) {
    value = value || '';
    if (paramCheck('setStorageSync', key, '')) {
      var dataObj = _utils2.default.anyTypeToString(value),
          data = dataObj.data,
          dataType = dataObj.dataType;
      _bridge2.default.invokeMethodSync('setStorageSync', {
        key: key,
        data: data,
        dataType: dataType
      });
    }
  },
  removeStorage: function removeStorage(params) {
    paramCheck('removeStorage', params, { key: '' }) && _bridge2.default.invokeMethod('removeStorage', params);
  },
  removeStorageSync: function removeStorageSync(key) {
    paramCheck('removeStorageSync', key, '') && _bridge2.default.invokeMethodSync('removeStorageSync', { key: key });
  },
  clearStorage: function clearStorage() {
    _bridge2.default.invokeMethod('clearStorage');
  },
  clearStorageSync: function clearStorageSync() {
    _bridge2.default.invokeMethodSync('clearStorageSync');
  },
  getStorageInfo: function getStorageInfo(params) {
    _bridge2.default.invokeMethod('getStorageInfo', params);
  },
  getStorageInfoSync: function getStorageInfoSync() {
    var rt = void 0;
    _bridge2.default.invokeMethodSync('getStorageInfoSync', {}, {
      beforeAll: function beforeAll(t) {
        rt = t;
        delete t.errMsg;
      }
    });
    return rt;
  },
  request: function request() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    if (paramCheck('request', params, { url: '' })) {
      if (_utils2.default.validateUrl(params.url) === !1) {
        return logErr('request', params, 'request:fail invalid url "' + params.url + '"');
      }
      if (params.data === 'function') {
        return logErr('request', params, 'request:fail data should not be Function');
      }
      var headerType = _utils2.default.getDataType(params.header);
      params.header = params.header || {};
      params.header = _utils2.default.convertObjectValueToString(params.header);
      headerType !== 'Undefined' && headerType !== 'Object' && (console.warn('wx.request: header must be an object'), params.header = {});
      params.header = (0, _keys2.default)(params.header).reduce(function (res, cur) {
        cur.toLowerCase() === 'content-type' ? res[cur.toLowerCase()] = params.header[cur] : res[cur] = params.header[cur];
        return res;
      }, {});
      params.method && (params.method = params.method.toUpperCase());
      var headers = params.header || {},
          requestMethod = 'GET';
      typeof params.method === 'string' && (requestMethod = params.method.toUpperCase());
      var data;
      params.dataType = params.dataType || 'json';
      headers['content-type'] = headers['content-type'] || 'application/json';
      data = !params.data ? '' : typeof params.data !== 'string' ? headers['content-type'].indexOf('application/x-www-form-urlencoded') > -1 ? _utils2.default.urlEncodeFormData(params.data, !0) : headers['content-type'].indexOf('application/json') > -1 ? (0, _stringify2.default)(params.data) : (0, _typeof3.default)(params.data) === 'object' ? (0, _stringify2.default)(params.data) : data.toString() : params.data;(requestMethod == 'GET' || !__wxConfig__.requestProxy) && (params.url = _utils2.default.addQueryStringToUrl(params.url, params.data));
      _bridge2.default.invokeMethod('request', {
        url: params.url,
        data: data,
        header: headers,
        method: requestMethod,
        success: params.success,
        fail: params.fail,
        complete: params.complete
      }, {
        beforeSuccess: function beforeSuccess(res) {
          if (params.dataType === 'json') {
            try {
              res.data = JSON.parse(res.data);
            } catch (e) {}
          }
          res.statusCode = parseInt(res.statusCode);
        }
      });
    }
  },
  connectSocket: function connectSocket(params) {
    if (paramCheck('connectSocket', params, { url: '' })) {
      (0, _typeof3.default)(params.header) !== 'object' && typeof params.header !== 'undefined' && (console.warn('connectSocket: header must be an object'), delete params.header);
      var header = {};
      params.header && (header = _utils2.default.convertObjectValueToString(params.header));

      _bridge2.default.invokeMethod('connectSocket', _utils2.default.assign({}, params, {
        header: header
      }), {
        beforeSuccess: function beforeSuccess(e) {
          e.statusCode = parseInt(e.statusCode);
        }
      });
    }
  },
  closeSocket: function closeSocket(e) {
    _bridge2.default.invokeMethod('closeSocket', e);
  },
  sendSocketMessage: function sendSocketMessage(params) {
    var paramType = _utils2.default.getDataType(params.data);
    _bridge2.default.invokeMethod('sendSocketMessage', params);
  },
  onSocketOpen: function onSocketOpen(callback) {
    paramCheck('onSocketOpen', callback, emptyFn) && _bridge2.default.onMethod('onSocketOpen', Reporter.surroundThirdByTryCatch(callback, 'at onSocketOpen callback function'));
  },
  onSocketClose: function onSocketClose(callback) {
    paramCheck('onSocketClose', callback, emptyFn) && _bridge2.default.onMethod('onSocketClose', Reporter.surroundThirdByTryCatch(callback, 'at onSocketClose callback function'));
  },
  onSocketMessage: function onSocketMessage(callback) {
    if (paramCheck('onSocketMessage', callback, emptyFn)) {
      callback = Reporter.surroundThirdByTryCatch(callback, 'at onSocketMessage callback function');
      _bridge2.default.onMethod('onSocketMessage', function (params) {
        delete params.isBuffer;
        _utils2.default.getDataType(params.data) === 'Blob' ? _utils2.default.blobToArrayBuffer(params.data, function (data) {
          ;params.data = data, callback(params);
        }) : callback(params);
      });
    }
  },
  onSocketError: function onSocketError(callback) {
    _bridge2.default.onMethod('onSocketError', Reporter.surroundThirdByTryCatch(callback, 'at onSocketError callback function'));
  },
  uploadFile: function uploadFile(params) {
    if (paramCheck('uploadFile', params, { url: '', filePath: '', name: '' })) {
      (0, _typeof3.default)(params.header) !== 'object' && typeof params.header !== 'undefined' && (console.warn('uploadFile: header must be an object'), delete params.header), (0, _typeof3.default)(params.formData) !== 'object' && typeof params.formData !== 'undefined' && (console.warn('uploadFile: formData must be an object'), delete params.formData);
      var header = {},
          formData = {};
      params.header && (header = _utils2.default.convertObjectValueToString(params.header));
      params.formData && (formData = _utils2.default.convertObjectValueToString(params.formData));
      _bridge2.default.invokeMethod('uploadFile', _utils2.default.assign({}, params, {
        header: header,
        formData: formData
      }), {
        beforeSuccess: function beforeSuccess(res) {
          res.statusCode = parseInt(res.statusCode);
        }
      });
    }
  },
  downloadFile: function downloadFile(params) {
    paramCheck('downloadFile', params, { url: '' }) && _bridge2.default.invokeMethod('downloadFile', params, {
      beforeSuccess: function beforeSuccess(res) {
        res.statusCode = parseInt(res.statusCode);
        var statusArr = [200, 304];
        statusArr.indexOf(res.statusCode) === -1 && delete res.tempFilePath;
      }
    });
  },
  chooseImage: function chooseImage() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    _bridge2.default.invokeMethod('chooseImage', _utils2.default.assign({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera']
    }, params));
  },
  previewImage: function previewImage(params) {
    paramCheck('previewImage', params, { urls: [''] }) && _bridge2.default.invokeMethod('previewImage', params);
  },
  getImageInfo: function getImageInfo(params) {
    paramCheck('getImageInfo', params, { src: '' }) && (/^(http|https):\/\//.test(params.src) ? _bridge2.default.invokeMethod('downloadFile', { url: params.src }, {
      afterSuccess: function afterSuccess(res) {
        params.src = res.tempFilePath;
        _bridge2.default.invokeMethod('getImageInfo', params, {
          beforeSuccess: function beforeSuccess(rt) {
            rt.path = params.src;
          }
        });
      },
      afterFail: function afterFail() {
        logErr('getImageInfo', params, 'getImageInfo:fail download image fail');
      }
    }) : /^wdfile:\/\//.test(params.src) ? _bridge2.default.invokeMethod('getImageInfo', params, {
      beforeSuccess: function beforeSuccess(rt) {
        rt.path = params.src;
      }
    }) : (params.src = _utils2.default.getRealRoute(currUrl, params.src, !1), _bridge2.default.invokeMethod('getImageInfo', params, {
      beforeSuccess: function beforeSuccess(rt) {
        rt.path = params.src;
      }
    })));
  },
  startRecord: function startRecord(params) {
    ;apiObj.appStatus === _configFlags2.default.AppStatus.BACK_GROUND && apiObj.hanged === !1 || _bridge2.default.invokeMethod('startRecord', params);
  },
  stopRecord: function stopRecord(params) {
    _bridge2.default.invokeMethod('stopRecord', params);
  },
  playVoice: function playVoice(params) {
    paramCheck('playVoice', params, { filePath: '' }) && _bridge2.default.invokeMethod('playVoice', params);
  },
  pauseVoice: function pauseVoice(e) {
    _bridge2.default.invokeMethod('pauseVoice', e);
  },
  stopVoice: function stopVoice(e) {
    _bridge2.default.invokeMethod('stopVoice', e);
  },
  onVoicePlayEnd: function onVoicePlayEnd(callback) {
    _bridge2.default.onMethod('onVoicePlayEnd', Reporter.surroundThirdByTryCatch(callback, 'at onVoicePlayEnd callback function'));
  },
  chooseVideo: function chooseVideo() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    params.sourceType = params.sourceType || ['album', 'camera'];
    params.camera = params.camera || ['front', 'back'];
    _bridge2.default.invokeMethod('chooseVideo', params);
  },
  getLocation: function getLocation(params) {
    console.log('getLocation', params, apiObj.appStatus, apiObj.hanged);apiObj.appStatus === _configFlags2.default.AppStatus.BACK_GROUND && apiObj.hanged === !1 || _bridge2.default.invokeMethod('getLocation', params);
  },
  openLocation: function openLocation() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    paramCheck('openLocation', params, { latitude: 0.1, longitude: 0.1 }) && _bridge2.default.invokeMethod('openLocation', params);
  },
  chooseLocation: function chooseLocation() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    _bridge2.default.invokeMethod('chooseLocation', params);
  },
  getNetworkType: function getNetworkType(params) {
    _bridge2.default.invokeMethod('getNetworkType', params);
  },
  getSystemInfo: function getSystemInfo(params) {
    var platform = _utils2.default.getPlatform();
    _bridge2.default.invokeMethodSync('getSystemInfo', params, {
      beforeSuccess: function beforeSuccess(rt) {
        rt.platform = platform;
      }
    });
  },
  getSystemInfoSync: function getSystemInfoSync(params) {
    var rt = {},
        platform = _utils2.default.getPlatform();
    _bridge2.default.invokeMethodSync('getSystemInfo', {}, {
      beforeSuccess: function beforeSuccess(res) {
        rt = res || {};
        rt.platform = platform;
        delete rt.errMsg;
      }
    });
    return rt;
  },
  onAccelerometerChange: function onAccelerometerChange(callback) {
    hasInvokeEnableAccelerometer || (_bridge2.default.invokeMethod('enableAccelerometer', { enable: !0 }), hasInvokeEnableAccelerometer = !0);
    accelerometerChangeFns.push(Reporter.surroundThirdByTryCatch(callback, 'at onAccelerometerChange callback function'));
  },
  onCompassChange: function onCompassChange(callback) {
    hasInvokeEnableCompass || (_bridge2.default.invokeMethod('enableCompass', { enable: !0 }), hasInvokeEnableCompass = !0);
    compassChangeFns.push(Reporter.surroundThirdByTryCatch(callback, 'at onCompassChange callback function'));
  },
  reportAction: function reportAction(params) {
    _bridge2.default.invokeMethod('reportAction', params);
  },
  getBackgroundAudioPlayerState: function getBackgroundAudioPlayerState(params) {
    _bridge2.default.invokeMethod('getMusicPlayerState', params, {
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('getBackgroundAudioPlayerState', 'getMusicPlayerState');
      }
    });
  },
  playBackgroundAudio: function playBackgroundAudio() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};apiObj.appStatus === _configFlags2.default.AppStatus.BACK_GROUND && apiObj.hanged === !1 || _bridge2.default.invokeMethod('operateMusicPlayer', _utils2.default.assign({ operationType: 'play' }, params), {
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('operateMusicPlayer', 'playBackgroundAudio');
      }
    });
  },
  pauseBackgroundAudio: function pauseBackgroundAudio() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    _bridge2.default.invokeMethod('operateMusicPlayer', _utils2.default.assign({ operationType: 'pause' }, params), {
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('operateMusicPlayer', 'pauseBackgroundAudio');
      }
    });
  },
  seekBackgroundAudio: function seekBackgroundAudio() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    paramCheck('seekBackgroundAudio', params, { position: 1 }) && _bridge2.default.invokeMethod('operateMusicPlayer', _utils2.default.assign({ operationType: 'seek' }, params), {
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('operateMusicPlayer', 'seekBackgroundAudio');
      }
    });
  },
  stopBackgroundAudio: function stopBackgroundAudio() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    console.log('stopBackgroundAudio');
    _bridge2.default.invokeMethod('operateMusicPlayer', _utils2.default.assign({ operationType: 'stop' }, params), {
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('operateMusicPlayer', 'stopBackgroundAudio');
      }
    });
  },
  onBackgroundAudioPlay: function onBackgroundAudioPlay(callback) {
    _bridge2.default.onMethod('onMusicPlay', Reporter.surroundThirdByTryCatch(callback, 'at onBackgroundAudioPlay callback function'));
  },
  onBackgroundAudioPause: function onBackgroundAudioPause(callback) {
    _bridge2.default.onMethod('onMusicPause', Reporter.surroundThirdByTryCatch(callback, 'at onBackgroundAudioPause callback function'));
  },
  onBackgroundAudioStop: function onBackgroundAudioStop(callback) {
    _bridge2.default.onMethod('onMusicEnd', Reporter.surroundThirdByTryCatch(callback, 'at onBackgroundAudioStop callback function'));
  },
  login: function login(params) {
    if (__wxConfig__ && __wxConfig__.weweb && __wxConfig__.weweb.loginUrl) {
      // 引导到自定义的登录页面
      if (__wxConfig__.weweb.loginUrl.indexOf('/') != 0) {
        __wxConfig__.weweb.loginUrl = '/' + __wxConfig__.weweb.loginUrl;
      }
      loginSourceUrl = __curPage__.url;
      apiObj.redirectTo({
        url: __wxConfig__.weweb.loginUrl
      });
    } else {
      _bridge2.default.invokeMethod('login', params);
    }
  },
  loginSuccess: function loginSuccess() {
    var url = loginSourceUrl && (loginSourceUrl.indexOf('/') === 0 ? loginSourceUrl : '/' + loginSourceUrl) || '/' + __root__;
    loginSourceUrl = '';
    apiObj.redirectTo({
      url: url
    });
  },
  checkLogin: function checkLogin(params) {
    _bridge2.default.invokeMethod('checkLogin', params);
  },
  checkSession: function checkSession(params) {
    refreshSessionTimeHander && clearTimeout(refreshSessionTimeHander);
    _bridge2.default.invokeMethod('refreshSession', params, {
      beforeSuccess: function beforeSuccess(res) {
        refreshSessionTimeHander = setTimeout(function () {
          _bridge2.default.invokeMethod('refreshSession');
        }, 1e3 * res.expireIn);
        delete res.err_code;
        delete res.expireIn;
      },
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('refreshSession', 'checkSession');
      }
    });
  },
  authorize: function authorize(params) {
    _bridge2.default.invokeMethod('authorize', params);
  },
  getUserInfo: function getUserInfo(params) {
    _bridge2.default.invokeMethod('operateWXData', _utils2.default.assign({
      data: {
        api_name: 'webapi_getuserinfo',
        data: params.data || {}
      }
    }, params), {
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('operateWXData', 'getUserInfo');
      },
      beforeSuccess: function beforeSuccess(res) {
        res.rawData = res.data.data;
        try {
          res.userInfo = JSON.parse(res.data.data);
          res.signature = res.data.signature;
          res.data.encryptData && (console.group(new Date() + ' encryptData 字段即将废除'), console.warn('请使用 encryptedData 和 iv 字段进行解密，详见：https://mp.weixin.qq.com/debug/wxadoc/dev/api/open.html'), console.groupEnd(), res.encryptData = res.data.encryptData);
          res.data.encryptedData && (res.encryptedData = res.data.encryptedData, res.iv = res.data.iv);
          delete res.data;
        } catch (e) {}
      }
    });
  },
  getFriends: function getFriends(params) {
    _bridge2.default.invokeMethod('operateWXData', {
      data: {
        api_name: 'webapi_getfriends',
        data: params.data || {}
      },
      success: params.success,
      fail: params.fail,
      complete: params.complete
    }, {
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('operateWXData', 'getFriends');
      },
      beforeSuccess: function beforeSuccess(res) {
        res.rawData = res.data.data;
        try {
          res.friends = JSON.parse(res.data.data);
          res.signature = res.data.signature;
          delete res.data;
        } catch (e) {}
      }
    });
  },
  requestPayment: function requestPayment(params) {
    paramCheck('requestPayment', params, {
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: '',
      paySign: ''
    }) && _bridge2.default.invokeMethod('requestPayment', params);
  },
  verifyPaymentPassword: function verifyPaymentPassword(params) {
    _bridge2.default.invokeMethod('verifyPaymentPassword', params);
  },
  bindPaymentCard: function bindPaymentCard(params) {
    _bridge2.default.invokeMethod('bindPaymentCard', params);
  },
  requestPaymentToBank: function requestPaymentToBank(params) {
    _bridge2.default.invokeMethod('requestPaymentToBank', params);
  },
  addCard: function addCard(params) {
    paramCheck('addCard', params, { cardList: [] }) && _bridge2.default.invokeMethod('addCard', params);
  },
  openCard: function openCard(params) {
    paramCheck('openCard', params, { cardList: [] }) && _bridge2.default.invokeMethod('openCard', params);
  },
  scanCode: function scanCode() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    paramCheck('scanCode', params, {}) && _bridge2.default.invokeMethod('scanCode', params, {
      beforeSuccess: function beforeSuccess(res) {
        typeof res.path === 'string' && (res.path = res.path.replace(/\.html$/, ''), res.path = res.path.replace(/\.html\?/, '?'));
      }
    });
  },
  openAddress: function openAddress(params) {
    _bridge2.default.invokeMethod('openAddress', params);
  },
  saveFile: function saveFile(params) {
    paramCheck('saveFile', params, { tempFilePath: '' }) && _bridge2.default.invokeMethod('saveFile', params);
  },
  openDocument: function openDocument(params) {
    paramCheck('openDocument', params, { filePath: '' }) && _bridge2.default.invokeMethod('openDocument', params);
  },
  chooseContact: function chooseContact(params) {
    _bridge2.default.invokeMethod('chooseContact', params);
  },
  makePhoneCall: function makePhoneCall() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    paramCheck('makePhoneCall', params, { phoneNumber: '' }) && _bridge2.default.invokeMethod('makePhoneCall', params);
  },
  onAppRoute: function onAppRoute(params, t) {
    appRouteCallbacks.push(params);
  },
  onAppRouteDone: function onAppRouteDone(params, t) {
    appRouteDoneCallback.push(params);
  },
  onAppEnterBackground: function onAppEnterBackground(params) {
    _appContextSwitch2.default.onAppEnterBackground.call(apiObj, params);
  },
  onAppEnterForeground: function onAppEnterForeground(params) {
    _appContextSwitch2.default.onAppEnterForeground.call(apiObj, params);
  },
  onAppRunningStatusChange: function onAppRunningStatusChange(params) {
    _appContextSwitch2.default.onAppRunningStatusChange.call(apiObj, params);
  },
  setAppData: function setAppData(data) {
    var options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
        webviewIds = arguments[2];
    arguments[3];
    options.forceUpdate = typeof options.forceUpdate !== 'undefined' && options.forceUpdate;
    if (_utils2.default.isPlainObject(data) === !1) {
      throw new _utils2.default.AppServiceSdkKnownError('setAppData:data should be an object');
    }
    !function () {
      var hasUpdate = !1,
          tmpData = {},
          setCurData = function setCurData(key, value, type) {
        hasUpdate = !0;
        tmpData[key] = value;
        type === 'Array' || type === 'Object' ? pageData[key] = JSON.parse((0, _stringify2.default)(value)) : pageData[key] = value;
      };
      for (var oKey in data) {
        var curValue = data[oKey],
            gValue = pageData[oKey],
            gValueType = _utils2.default.getDataType(gValue),
            curValueType = _utils2.default.getDataType(curValue);
        gValueType !== curValueType ? setCurData(oKey, curValue, curValueType) : gValueType == 'Array' || gValueType == 'Object' ? (0, _stringify2.default)(gValue) !== (0, _stringify2.default)(curValue) && setCurData(oKey, curValue, curValueType) : gValueType == 'String' || gValueType == 'Number' || gValueType == 'Boolean' ? gValue.toString() !== curValue.toString() && setCurData(oKey, curValue, curValueType) : gValueType == 'Date' ? gValue.getTime().toString() !== curValue.getTime().toString() && setCurData(oKey, curValue, curValueType) : gValue !== curValue && setCurData(oKey, curValue, curValueType);
      }
      options.forceUpdate ? _bridge2.default.publish('appDataChange', {
        data: data,
        option: {
          timestamp: Date.now(),
          forceUpdate: !0
        }
      }, webviewIds) : hasUpdate && _bridge2.default.publish('appDataChange', {
        data: tmpData
      }, webviewIds);
    }();
  },
  onPageEvent: function onPageEvent(e, t) {
    console.warn("'onPageEvent' is deprecated, use 'Page[eventName]'");
  },
  createAnimation: function createAnimation() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    if (paramCheck('createAnimation', params, {})) return new _Animation2.default(params);
  },
  createAudioContext: function createAudioContext(e) {
    return _createAudio2.default.call(apiObj, e, curWebViewId);
  },
  createVideoContext: function createVideoContext(e) {
    return _createVideo2.default.call(apiObj, e, curWebViewId);
  },
  createMapContext: function createMapContext(e) {
    return new _map2.default.MapContext(e);
  },
  onWebviewEvent: function onWebviewEvent(fn, t) {
    pageEventFn = fn;
    _bridge2.default.subscribe('PAGE_EVENT', function (params) {
      var data = params.data,
          eventName = params.eventName,
          webviewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
      fn({
        data: data,
        eventName: eventName,
        webviewId: webviewId
      });
    });
  },
  onNativeEvent: function onNativeEvent(fn) {
    ;['onCanvasTouchStart', 'onCanvasTouchMove', 'onCanvasTouchEnd'].forEach(function (key) {
      _bridge2.default.onMethod(key, function (data, webviewId) {
        fn({
          data: data,
          eventName: key,
          webviewId: webviewId
        });
      });
    });
  },
  hideKeyboard: function hideKeyboard(params) {
    _bridge2.default.publish('hideKeyboard', {});
  },
  getPublicLibVersion: function getPublicLibVersion() {
    var rt;
    _bridge2.default.invokeMethod('getPublicLibVersion', {
      complete: function complete(res) {
        res.version ? rt = res.version : (rt = res, delete rt.errMsg);
      }
    });
    return rt;
  },
  showModal: function showModal() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        options = {
      title: '',
      content: '',
      confirmText: '确定',
      cancelText: '取消',
      showCancel: !0,
      confirmColor: '#3CC51F',
      cancelColor: '#000000'
    };
    options = (0, _assign2.default)(options, params);
    if (paramCheck('showModal', options, {
      title: '',
      content: '',
      confirmText: '',
      cancelText: '',
      confirmColor: '',
      cancelColor: ''
    })) {
      return options.confirmText.length > 4 ? void logErr('showModal', params, 'showModal:fail confirmText length should not large then 4') : options.cancelText.length > 4 ? void logErr('showModal', params, 'showModal:fail cancelText length should not large then 4') : _bridge2.default.invokeMethod('showModal', options, {
        beforeSuccess: function beforeSuccess(rt) {
          rt.confirm = Boolean(rt.confirm);
        }
      });
    }
  },
  showToast: function showToast() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        options = {
      duration: 1500,
      title: '',
      icon: 'success',
      mask: !1
    };
    options = (0, _assign2.default)(options, params);
    delete options.image;['success', 'loading'].indexOf(options.icon) < 0 && (options.icon = 'success');
    options.duration > 1e4 && (options.duration = 1e4);
    paramCheck('showToast', options, {
      duration: 1,
      title: '',
      icon: ''
    }) && _bridge2.default.invokeMethod('showToast', options);
  },
  hideToast: function hideToast(e) {
    _bridge2.default.invokeMethod('hideToast', e);
  },
  showLoading: function showLoading() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        defaultArgs = { title: '', icon: 'loading', mask: !1, duration: 1e8 };
    defaultArgs = (0, _assign2.default)(defaultArgs, params);
    params.image && (defaultArgs.image = _utils2.default.getRealRoute(currUrl, params.image, !1));
    paramCheck('showLoading', defaultArgs, {
      duration: 1,
      title: ''
    }) && _bridge2.default.invokeMethod('showToast', defaultArgs, {
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('showToast', 'showLoading');
      }
    });
  },
  hideLoading: function hideLoading(args) {
    _bridge2.default.invokeMethod('hideToast', args, {
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('hideToast', 'hideLoading');
      }
    });
  },
  showActionSheet: function showActionSheet() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        options = {
      itemList: [],
      itemColor: '#000000'
    };
    options = (0, _assign2.default)(options, params);
    options.cancelText = '取消';
    options.cancelColor = '#000000';
    if (paramCheck('showActionSheet', options, { itemList: ['1'], itemColor: '' })) {
      return params.itemList.length > 6 ? void logErr('showActionSheet', params, 'showActionSheet:fail parameter error: itemList should not be large than 6') : _bridge2.default.invokeMethod('showActionSheet', options, {
        beforeCancel: function beforeCancel(t) {
          try {
            typeof params.success === 'function' && params.success({
              errMsg: 'showActionSheet:ok',
              cancel: !0
            });
          } catch (e) {
            Reporter.thirdErrorReport({
              error: e,
              extend: 'showActionSheet success callback error'
            });
          }
        }
      });
    }
  },
  getSavedFileList: function getSavedFileList() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    _bridge2.default.invokeMethod('getSavedFileList', params);
  },
  getSavedFileInfo: function getSavedFileInfo() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    paramCheck('getSavedFileInfo', params, { filePath: '' }) && _bridge2.default.invokeMethod('getSavedFileInfo', params);
  },
  getFileInfo: function getFileInfo() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    if (_bridge2.default.beforeInvoke('getFileInfo', params, { filePath: '' })) {
      if (void 0 !== params.digestAlgorithm) {
        var res = _utils2.default.paramCheck(params, { digestAlgorithm: '' });
        if (res) {
          _bridge2.default.beforeInvokeFail('getFileInfo', params, 'parameter error: ' + res);
        }
        if (['md5', 'sha1'].indexOf(params.digestAlgorithm) === -1) {
          _bridge2.default.beforeInvokeFail('getFileInfo', params, 'parameter error: invalid digestAlgorithm "' + params.digestAlgorithm + '"');
        }
      }
      _bridge2.default.invokeMethod('getFileInfo', params, {});
    }
  },
  removeSavedFile: function removeSavedFile() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    paramCheck('removeSavedFile', params, { filePath: '' }) && _bridge2.default.invokeMethod('removeSavedFile', params);
  },
  getExtConfig: function getExtConfig() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    setTimeout(function () {
      var res = {
        errMsg: 'getExtConfig: ok',
        extConfig: (0, apiObj.getExtConfigSync)()
      };
      typeof params.success === 'function' && params.success(res);
      typeof params.complete === 'function' && params.complete(res);
    }, 0);
  },
  getClipboardData: function getClipboardData() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    _bridge2.default.invokeMethod('getClipboardData', params, {});
    // bridge.invokeMethod("getClipboardData",params,{})
  },
  setClipboardData: function setClipboardData() {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    paramCheck('setClipboardData', params, { data: '' }) && _bridge2.default.invokeMethod('setClipboardData', params, {
      beforeSuccess: function beforeSuccess() {
        currentClipBoardData = params.data;
        apiObj.reportClipBoardData(!0);
      }
    });
  },
  reportClipBoardData: function reportClipBoardData(param) {
    if (currentClipBoardData !== '') {
      var t = getCurrentPages().find(function (e) {
        return e.webviewId === curWebViewId;
      }) || {},
          value = [currentClipBoardData, t.route, param ? 1 : 0, (0, _keys2.default)(t.options).map(function (e) {
        return encodeURIComponent(e) + '=' + encodeURIComponent(t.options[e]);
      }).join('&')].map(encodeURIComponent).join(',');
      Reporter.reportKeyValue({
        key: 'Clipboard',
        value: value,
        force: !0
      });
    }
  },
  getExtConfigSync: function getExtConfigSync() {
    if (!__wxConfig__.ext) return {};
    try {
      return JSON.parse((0, _stringify2.default)(__wxConfig__.ext));
    } catch (e) {
      return {};
    }
  },
  chooseAddress: function chooseAddress(params) {
    _bridge2.default.invokeMethod('openAddress', params, {
      beforeSuccess: function beforeSuccess(res) {
        _utils2.default.renameProperty(res, 'addressPostalCode', 'postalCode');
        _utils2.default.renameProperty(res, 'proviceFirstStageName', 'provinceName');
        _utils2.default.renameProperty(res, 'addressCitySecondStageName', 'cityName');
        _utils2.default.renameProperty(res, 'addressCountiesThirdStageName', 'countyName');
        _utils2.default.renameProperty(res, 'addressDetailInfo', 'detailInfo');
      },
      beforeAll: function beforeAll(res) {
        res.errMsg = res.errMsg.replace('openAddress', 'chooseAddress');
        delete res.err_msg;
      }
    });
  },
  canIuse: function canIuse() {
    var param1 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '',
        param2 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : SDKVersion;
    if (typeof param1 !== 'string') {
      throw new _utils2.default.AppServiceSdkKnownError('canIUse: schema should be an object');
    }
    var params = param1.split('.');
    return _utils2.default.canIUse(params, param2);
  }
};

apiObj.onAppEnterBackground(function () {
  apiObj.getClipboardData({
    success: function success(e) {
      e.data !== currentClipBoardData && (currentClipBoardData = e.data, apiObj.reportClipBoardData)(!1);
    }
  });
}), apiObj.onAppEnterForeground(), apiObj.appStatus = _configFlags2.default.AppStatus.FORE_GROUND, apiObj.hanged = !1, _bridge2.default.subscribe('INVOKE_METHOD', function (params, t) {
  var name = params.name,
      args = params.args;
  apiObj[name](args, !0);
}), _bridge2.default.subscribe('WEBVIEW_ERROR_MSG', function (params, t) {
  var msg = params.msg;
  Reporter.triggerErrorMessage(msg);
}), _bridge2.default.onMethod('onAppRoute', function (params) {
  var webviewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  params.path = params.path.replace(/\.\w+(\?|$)/, '$1'); // .substring(0, params.path.length - 5);
  params.webviewId = params.webviewId ? params.webviewId : webviewId;
  currUrl = params.path;
  if (params.openType !== 'appLaunch') {
    for (var n in params.query) {
      params.query[n] = decodeURIComponent(params.query[n]);
    }
  }
  if (params.openType == 'navigateBack' || params.openType == 'redirectTo') {
    _canvas2.default.clearOldWebviewCanvas();
  }
  _canvas2.default.notifyWebviewIdtoCanvas(params.webviewId);
  _map2.default.notifyWebviewIdtoMap(params.webviewId);
  curWebViewId = params.webviewId;
  appRouteCallbacks.forEach(function (callback) {
    callback(params);
  });
}), _bridge2.default.onMethod('onAppRouteDone', function (params) {
  var webviewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  params.path = params.path.replace(/\.\w+(\?|$)/, '$1'); // params.path.substring(0, params.path.length - 5);
  params.webviewId = typeof params.webviewId !== 'undefined' ? params.webviewId : webviewId;
  currUrl = params.path;
  appRouteDoneCallback.forEach(function (fn) {
    fn(params);
  });
  _bridge2.default.publish('onAppRouteDone', {}, [webviewId]);
}), _bridge2.default.onMethod('onKeyboardValueChange', function (params) {
  var webviewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
      pValue = params.value,
      pCursor = params.cursor;
  if (params.data && typeof pageEventFn === 'function') {
    var data = JSON.parse(params.data);
    if (data.bindinput) {
      var peRes;
      try {
        peRes = pageEventFn({
          data: {
            type: 'input',
            target: data.target,
            currentTarget: data.target,
            timeStamp: Date.now(),
            touches: [],
            detail: {
              value: params.value,
              cursor: params.cursor
            }
          },
          eventName: data.bindinput,
          webviewId: webviewId
        });
      } catch (e) {
        throw new _utils2.default.AppServiceSdkKnownError('bind key input error');
      }
      if (data.setKeyboardValue) {
        if (void 0 === peRes || peRes === null || peRes === !1) ;else if (_utils2.default.getDataType(peRes) === 'Object') {
          var opt = {
            inputId: params.inputId
          };
          pValue != peRes.value && (opt.value = peRes.value + '');
          isNaN(parseInt(peRes.cursor)) || (opt.cursor = parseInt(peRes.cursor), typeof opt.value === 'undefined' && (opt.value = pValue), opt.cursor > opt.value.length && (opt.cursor = -1));
          _bridge2.default.invokeMethod('setKeyboardValue', opt);
        } else {
          pValue != peRes && _bridge2.default.invokeMethod('setKeyboardValue', {
            value: peRes + '',
            cursor: -1,
            inputId: params.inputId
          });
        }
      }
    }
  }
  _bridge2.default.publish('setKeyboardValue', {
    value: pValue,
    cursor: pCursor,
    inputId: params.inputId
  }, [webviewId]);
});

var getTouchInfo = function getTouchInfo(touchInfo, eventKey, eventInfo) {
  // 返回touch信息
  var touches = [],
      changedTouches = [];
  if (eventKey === 'onTouchStart') {
    for (var i in touchInfo) {
      touches.push(touchInfo[i]);
    }var touchObj = {
      x: eventInfo.touch.x,
      y: eventInfo.touch.y,
      identifier: eventInfo.touch.id
    };
    changedTouches.push(touchObj);
    touches.push(touchObj);
  } else if (eventKey === 'onTouchMove') {
    for (var s in touchInfo) {
      var curTouchInfo = touchInfo[s],
          hasUpdate = !1;
      for (var f in eventInfo.touches) {
        var touchObj = {
          x: eventInfo.touches[f].x,
          y: eventInfo.touches[f].y,
          identifier: eventInfo.touches[f].id
        };
        if (touchObj.identifier === curTouchInfo.identifier && (curTouchInfo.x !== touchObj.x || curTouchInfo.y !== touchObj.y)) {
          touches.push(touchObj);
          changedTouches.push(touchObj);
          hasUpdate = !0;
          break;
        }
      }
      hasUpdate || touches.push(curTouchInfo);
    }
  } else if (eventKey === 'onTouchEnd') {
    var touchObj = {
      x: eventInfo.touch.x,
      y: eventInfo.touch.y,
      identifier: eventInfo.touch.id
    };
    for (var p in touchInfo) {
      var curTouchInfo = touchInfo[p];
      curTouchInfo.identifier === touchObj.identifier ? changedTouches.push(touchObj) : touches.push(curTouchInfo);
    }
  } else if (eventKey === 'onTouchCancel') {
    for (var v in eventInfo.touches) {
      var touchObj = {
        x: eventInfo.touches[v].x,
        y: eventInfo.touches[v].y,
        identifier: eventInfo.touches[v].id
      };
      changedTouches.push(touchObj);
    }
  } else if (eventKey === 'onLongPress') {
    var touchObj = {
      x: eventInfo.touch.x,
      y: eventInfo.touch.y,
      identifier: eventInfo.touch.id
    };
    for (var b in touchInfo) {
      touchInfo[b].identifier === touchObj.identifier ? touches.push(touchObj) : touches.push(touchInfo[b]);
    }
    changedTouches.push(touchObj);
  }
  return {
    touches: touches,
    changedTouches: changedTouches
  };
},
    touchEvents = {
  onTouchStart: 'touchstart',
  onTouchMove: 'touchmove',
  onTouchEnd: 'touchend',
  onTouchCancel: 'touchcancel',
  onLongPress: 'longtap'
};['onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel', 'onLongPress'].forEach(function (eventName) {
  _bridge2.default.onMethod(eventName, function (params) {
    var webviewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
        data = JSON.parse(params.data),
        canvasNumber = data.canvasNumber;
    _canvas2.default.canvasInfo.hasOwnProperty(canvasNumber) || console.error('No such canvas ' + canvasNumber + ' register in ' + webviewId + ', but trigger ' + eventName + ' event.');
    var canvasData = _canvas2.default.canvasInfo[canvasNumber].data;
    if (canvasData[eventName] && typeof pageEventFn === 'function') {
      var touchInfo = getTouchInfo(canvasData.lastTouches, eventName, params),
          touches = touchInfo.touches,
          changedTouches = touchInfo.changedTouches;canvasData.lastTouches = touches, eventName === 'onTouchMove' && changedTouches.length === 0 || pageEventFn({
        data: {
          type: touchEvents[eventName],
          timeStamp: new Date() - canvasData.startTime,
          target: canvasData.target,
          touches: touches,
          changedTouches: changedTouches
        },
        eventName: canvasData[eventName],
        webviewId: webviewId
      });
    }
  });
}), ['onVideoPlay', 'onVideoPause', 'onVideoEnded', 'onVideoTimeUpdate', 'onVideoClickFullScreenBtn', 'onVideoClickDanmuBtn'].forEach(function (eventName) {
  _bridge2.default.onMethod(eventName, function () {
    var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
        webviewId = arguments[1],
        bindEventName = 'bind' + eventName.substring(7).toLowerCase(),
        dataObj = JSON.parse(params.data),
        handlers = dataObj.handlers,
        event = dataObj.event,
        createdTimestamp = dataObj.createdTimestamp;
    if (handlers[bindEventName] && typeof pageEventFn === 'function') {
      var data = {
        type: bindEventName.substring(4),
        target: event.target,
        currentTarget: event.currentTarget,
        timeStamp: Date.now() - createdTimestamp,
        detail: {}
      };
      bindEventName === 'bindtimeupdate' && (data.detail = { currentTime: params.position });
      pageEventFn({
        data: data,
        eventName: handlers[bindEventName],
        webviewId: webviewId
      });
    }
  });
}), _bridge2.default.onMethod('onAccelerometerChange', function () {
  var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  accelerometerChangeFns.forEach(function (fn) {
    typeof fn === 'function' && fn(params);
  });
}), _bridge2.default.onMethod('onCompassChange', function () {
  var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  compassChangeFns.forEach(function (fn) {
    typeof fn === 'function' && fn(params);
  });
}), _bridge2.default.onMethod('onError', function () {
  var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
  arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  console.error('thirdScriptError', '\n', 'sdk uncaught third Error', '\n', params.message, '\n', params.stack);
}), _bridge2.default.onMethod('onMapMarkerClick', function () {
  var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      webViewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  if (params.data && typeof pageEventFn === 'function') {
    var data = JSON.parse(params.data);
    data.bindmarkertap && pageEventFn({
      data: {
        markerId: data.markerId
      },
      eventName: data.bindmarkertap,
      webviewId: webViewId
    });
  }
}), _bridge2.default.onMethod('onMapControlClick', function () {
  var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      webviewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  if (params.data && typeof pageEventFn === 'function') {
    var data = JSON.parse(params.data);
    data.bindcontroltap && pageEventFn({
      data: {
        controlId: data.controlId
      },
      eventName: data.bindcontroltap,
      webviewId: webviewId
    });
  }
}), _bridge2.default.onMethod('onMapRegionChange', function () {
  var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      webviewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
      mapInfo = _map2.default.mapInfo[webviewId + '_' + params.mapId];
  mapInfo && mapInfo.bindregionchange && typeof pageEventFn === 'function' && pageEventFn({
    data: {
      type: params.type
    },
    eventName: mapInfo.bindregionchange,
    webviewId: webviewId
  });
}), _bridge2.default.onMethod('onMapClick', function () {
  var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
      webviewId = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
      mapInfo = _map2.default.mapInfo[webviewId + '_' + params.mapId];
  mapInfo && mapInfo.bindtap && typeof pageEventFn === 'function' && pageEventFn({
    data: {},
    eventName: mapInfo.bindtap,
    webviewId: webviewId
  });
});

_utils2.default.copyObj(wx, apiObj);
window.wx = wx;
exports["default"] = wx;
module.exports = exports['default'];

/***/ }),

/***/ 4928:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _bridge = __webpack_require__(498);

var _bridge2 = _interopRequireDefault(_bridge);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 1-8 map相关事件和方法

function notifyWebviewIdtoMap(e) {
  webviewID = e;
}

var mapIds = {},
    mapInfo = {},
    EventEmitter = new _emitter2.default(),
    webviewID = 0,
    callbackIndex = 0;

ServiceJSBridge.subscribe('mapInsert', function (params, viewId) {
  var domId = params.domId,
      mapId = params.mapId,
      bindregionchange = params.bindregionchange,
      bindtap = params.bindtap,
      showLocation = params.showLocation,
      key = viewId + '_' + domId;
  mapIds[key] = mapIds[key] || mapId;

  mapInfo[viewId + '_' + mapId] = {
    bindregionchange: bindregionchange,
    bindtap: bindtap,
    showLocation: showLocation
  };
  EventEmitter.emit('mapInsert');
});

var MapContext = function () {
  function MapContext(mapId) {
    (0, _classCallCheck3.default)(this, MapContext);

    var that = this;
    if (typeof mapId !== 'string') throw new Error('map ID should be a String');
    this.domId = mapId;

    ServiceJSBridge.subscribe('doMapActionCallback', function (event, t) {
      var callbackId = event.callbackId;
      event.method === 'getMapCenterLocation' && callbackId && typeof that[callbackId] === 'function' && (that[callbackId]({
        longitude: event.longitude,
        latitude: event.latitude
      }), delete that[callbackId]);
    });
  }

  (0, _createClass3.default)(MapContext, [{
    key: '_invoke',
    value: function _invoke(methodName, params) {
      params.method = methodName;
      var callbackId = 'callback' + webviewID + '_' + params.mapId + '_' + callbackIndex++;
      this[callbackId] = params.success;
      params.callbackId = callbackId;
      _bridge2.default.publish('doMapAction' + params.mapId, params, [webviewID]);
    }
  }, {
    key: '_invokeMethod',
    value: function _invokeMethod(name, params) {
      var self = this,
          index = webviewID + '_' + this.domId;
      typeof mapIds[index] === 'number' || mapIds[index] ? (params.mapId = mapIds[index], this._invoke(name, params)) : EventEmitter.on('mapInsert', function () {
        params.mapId = mapIds[index];
        self._invoke(name, params);
      });
    }
  }, {
    key: 'getCenterLocation',
    value: function getCenterLocation() {
      var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      this._invokeMethod('getMapCenterLocation', params);
    }
  }, {
    key: 'moveToLocation',
    value: function moveToLocation() {
      var params = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      this._invokeMethod('moveToMapLocation', params);
    }
  }]);
  return MapContext;
}();

exports["default"] = {
  notifyWebviewIdtoMap: notifyWebviewIdtoMap,
  MapContext: MapContext, // class
  mapInfo: mapInfo
};
module.exports = exports['default'];

/***/ }),

/***/ 6286:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _assign = __webpack_require__(2945);

var _assign2 = _interopRequireDefault(_assign);

exports.setStorageSync = setStorageSync;
exports.getStorageSync = getStorageSync;
exports.clearStorageSync = clearStorageSync;
exports.removeStorageSync = removeStorageSync;
exports.getStorageInfoSync = getStorageInfoSync;
exports.getSystemInfoSync = getSystemInfoSync;
exports.getSystemInfo = getSystemInfo;

var _storage = __webpack_require__(1657);

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function systemInfo() {
  return {
    model: /iPhone/.test(navigator.userAgent) ? 'iPhone' : 'Android',
    pixelRatio: window.devicePixelRatio || 1,
    windowWidth: window.innerWidth || 0,
    windowHeight: window.innerHeight || 0,
    language: window.navigator.userLanguage || window.navigator.language,
    platform: 'weweb',
    version: '0.0.1'
  };
}

function toResult(msg, data, command) {
  var obj = {
    ext: data, // 传过来的数据
    msg: msg // 调用api返回的结果
  };
  if (command) obj.command = command;
  return obj;
}

function toError(data) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // let name = data.sdkName.replace(/Sync$/, '')
  var name = data.sdkName;
  var obj = (0, _assign2.default)({
    errMsg: name + ':fail'
  }, extra);
  return toResult(obj, data, result ? 'GET_ASSDK_RES' : null);
}

function toSuccess(data) {
  var result = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  // let name = data.sdkName.replace(/Sync$/, '')
  var name = data.sdkName;
  var obj = (0, _assign2.default)({
    errMsg: name + ':ok'
  }, extra);
  return toResult(obj, data, result ? 'GET_ASSDK_RES' : null);
}

function setStorageSync(data) {
  var args = data.args;
  if (args.key == null || args.data == null) return toError(data, true);
  _storage2.default.set(args.key, args.data, args.dataType);
  return toSuccess(data, true);
}

function getStorageSync(data) {
  var args = data.args;
  if (args.key == null || args.key == '') return toError(data, true);
  var res = _storage2.default.get(args.key);
  return toSuccess(data, true, {
    data: res.data,
    dataType: res.dataType
  });
}

function clearStorageSync(data) {
  _storage2.default.clear();
  return toSuccess(data, true);
}

function removeStorageSync(data) {
  var args = data.args;
  if (args.key == null || args.key == '') return toError(data, true);
  _storage2.default.remove(args.key);
  return toSuccess(data, true);
}

function getStorageInfoSync(data) {
  var obj = _storage2.default.info();
  return toSuccess(data, true, obj);
}

function getSystemInfoSync(data) {
  var info = systemInfo();
  return toSuccess(data, true, info);
}

function getSystemInfo(data) {
  var info = systemInfo();
  return toSuccess(data, true, info);
}

/***/ }),

/***/ 1076:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// module14 predefinedColor

var predefinedColor = exports.predefinedColor = {
  aliceblue: '#f0f8ff',
  antiquewhite: '#faebd7',
  aqua: '#00ffff',
  aquamarine: '#7fffd4',
  azure: '#f0ffff',
  beige: '#f5f5dc',
  bisque: '#ffe4c4',
  black: '#000000',
  blanchedalmond: '#ffebcd',
  blue: '#0000ff',
  blueviolet: '#8a2be2',
  brown: '#a52a2a',
  burlywood: '#deb887',
  cadetblue: '#5f9ea0',
  chartreuse: '#7fff00',
  chocolate: '#d2691e',
  coral: '#ff7f50',
  cornflowerblue: '#6495ed',
  cornsilk: '#fff8dc',
  crimson: '#dc143c',
  cyan: '#00ffff',
  darkblue: '#00008b',
  darkcyan: '#008b8b',
  darkgoldenrod: '#b8860b',
  darkgray: '#a9a9a9',
  darkgrey: '#a9a9a9',
  darkgreen: '#006400',
  darkkhaki: '#bdb76b',
  darkmagenta: '#8b008b',
  darkolivegreen: '#556b2f',
  darkorange: '#ff8c00',
  darkorchid: '#9932cc',
  darkred: '#8b0000',
  darksalmon: '#e9967a',
  darkseagreen: '#8fbc8f',
  darkslateblue: '#483d8b',
  darkslategray: '#2f4f4f',
  darkslategrey: '#2f4f4f',
  darkturquoise: '#00ced1',
  darkviolet: '#9400d3',
  deeppink: '#ff1493',
  deepskyblue: '#00bfff',
  dimgray: '#696969',
  dimgrey: '#696969',
  dodgerblue: '#1e90ff',
  firebrick: '#b22222',
  floralwhite: '#fffaf0',
  forestgreen: '#228b22',
  fuchsia: '#ff00ff',
  gainsboro: '#dcdcdc',
  ghostwhite: '#f8f8ff',
  gold: '#ffd700',
  goldenrod: '#daa520',
  gray: '#808080',
  grey: '#808080',
  green: '#008000',
  greenyellow: '#adff2f',
  honeydew: '#f0fff0',
  hotpink: '#ff69b4',
  indianred: '#cd5c5c',
  indigo: '#4b0082',
  ivory: '#fffff0',
  khaki: '#f0e68c',
  lavender: '#e6e6fa',
  lavenderblush: '#fff0f5',
  lawngreen: '#7cfc00',
  lemonchiffon: '#fffacd',
  lightblue: '#add8e6',
  lightcoral: '#f08080',
  lightcyan: '#e0ffff',
  lightgoldenrodyellow: '#fafad2',
  lightgray: '#d3d3d3',
  lightgrey: '#d3d3d3',
  lightgreen: '#90ee90',
  lightpink: '#ffb6c1',
  lightsalmon: '#ffa07a',
  lightseagreen: '#20b2aa',
  lightskyblue: '#87cefa',
  lightslategray: '#778899',
  lightslategrey: '#778899',
  lightsteelblue: '#b0c4de',
  lightyellow: '#ffffe0',
  lime: '#00ff00',
  limegreen: '#32cd32',
  linen: '#faf0e6',
  magenta: '#ff00ff',
  maroon: '#800000',
  mediumaquamarine: '#66cdaa',
  mediumblue: '#0000cd',
  mediumorchid: '#ba55d3',
  mediumpurple: '#9370db',
  mediumseagreen: '#3cb371',
  mediumslateblue: '#7b68ee',
  mediumspringgreen: '#00fa9a',
  mediumturquoise: '#48d1cc',
  mediumvioletred: '#c71585',
  midnightblue: '#191970',
  mintcream: '#f5fffa',
  mistyrose: '#ffe4e1',
  moccasin: '#ffe4b5',
  navajowhite: '#ffdead',
  navy: '#000080',
  oldlace: '#fdf5e6',
  olive: '#808000',
  olivedrab: '#6b8e23',
  orange: '#ffa500',
  orangered: '#ff4500',
  orchid: '#da70d6',
  palegoldenrod: '#eee8aa',
  palegreen: '#98fb98',
  paleturquoise: '#afeeee',
  palevioletred: '#db7093',
  papayawhip: '#ffefd5',
  peachpuff: '#ffdab9',
  peru: '#cd853f',
  pink: '#ffc0cb',
  plum: '#dda0dd',
  powderblue: '#b0e0e6',
  purple: '#800080',
  rebeccapurple: '#663399',
  red: '#ff0000',
  rosybrown: '#bc8f8f',
  royalblue: '#4169e1',
  saddlebrown: '#8b4513',
  salmon: '#fa8072',
  sandybrown: '#f4a460',
  seagreen: '#2e8b57',
  seashell: '#fff5ee',
  sienna: '#a0522d',
  silver: '#c0c0c0',
  skyblue: '#87ceeb',
  slateblue: '#6a5acd',
  slategray: '#708090',
  slategrey: '#708090',
  snow: '#fffafa',
  springgreen: '#00ff7f',
  steelblue: '#4682b4',
  tan: '#d2b48c',
  teal: '#008080',
  thistle: '#d8bfd8',
  tomato: '#ff6347',
  turquoise: '#40e0d0',
  violet: '#ee82ee',
  wheat: '#f5deb3',
  white: '#ffffff',
  whitesmoke: '#f5f5f5',
  yellow: '#ffff00',
  yellowgreen: '#9acd32'
};

/***/ }),

/***/ 9571:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _assign = __webpack_require__(2945);

var _assign2 = _interopRequireDefault(_assign);

exports.onLaunch = onLaunch;
exports.redirectTo = redirectTo;
exports.navigateTo = navigateTo;
exports.reLaunch = reLaunch;
exports.switchTab = switchTab;
exports.navigateBack = navigateBack;
exports.previewImage = previewImage;
exports.stopPullDownRefresh = stopPullDownRefresh;
exports.publish = publish;
exports.pageScrollTo = pageScrollTo;
exports.setNavigationBarTitle = setNavigationBarTitle;
exports.setStatusBarStyle = setStatusBarStyle;
exports.setNavigationBarColor = setNavigationBarColor;
exports.showNavigationBarLoading = showNavigationBarLoading;
exports.hideNavigationBarLoading = hideNavigationBarLoading;
exports.chooseImage = chooseImage;
exports.chooseVideo = chooseVideo;
exports.saveFile = saveFile;
exports.enableCompass = enableCompass;
exports.enableAccelerometer = enableAccelerometer;
exports.getNetworkType = getNetworkType;
exports.getLocation = getLocation;
exports.openLocation = openLocation;
exports.chooseLocation = chooseLocation;
exports.setStorage = setStorage;
exports.getStorage = getStorage;
exports.clearStorage = clearStorage;
exports.startRecord = startRecord;
exports.stopRecord = stopRecord;
exports.playVoice = playVoice;
exports.pauseVoice = pauseVoice;
exports.stopVoice = stopVoice;
exports.getMusicPlayerState = getMusicPlayerState;
exports.operateMusicPlayer = operateMusicPlayer;
exports.uploadFile = uploadFile;
exports.downloadFile = downloadFile;
exports.getSavedFileList = getSavedFileList;
exports.removeSavedFile = removeSavedFile;
exports.getSavedFileInfo = getSavedFileInfo;
exports.openDocument = openDocument;
exports.getStorageInfo = getStorageInfo;
exports.removeStorage = removeStorage;
exports.showToast = showToast;
exports.hideToast = hideToast;
exports.showModal = showModal;
exports.showActionSheet = showActionSheet;
exports.getImageInfo = getImageInfo;
exports.base64ToTempFilePath = base64ToTempFilePath;
exports.refreshSession = refreshSession;
exports.showPickerView = showPickerView;
exports.insertHTMLWebView = insertHTMLWebView;
exports.updateHTMLWebView = updateHTMLWebView;
exports.showDatePickerView = showDatePickerView;

var _filePicker = __webpack_require__(8532);

var _filePicker2 = _interopRequireDefault(_filePicker);

var _upload = __webpack_require__(3662);

var _upload2 = _interopRequireDefault(_upload);

var _index = __webpack_require__(5235);

var _index2 = _interopRequireDefault(_index);

var _header = __webpack_require__(1899);

var _header2 = _interopRequireDefault(_header);

var _tabbar = __webpack_require__(8475);

var _tabbar2 = _interopRequireDefault(_tabbar);

var _throttleit = __webpack_require__(9623);

var _throttleit2 = _interopRequireDefault(_throttleit);

var _record = __webpack_require__(2434);

var _record2 = _interopRequireDefault(_record);

var _compass = __webpack_require__(8827);

var _compass2 = _interopRequireDefault(_compass);

var _storage = __webpack_require__(1657);

var _storage2 = _interopRequireDefault(_storage);

var _picker = __webpack_require__(2641);

var _picker2 = _interopRequireDefault(_picker);

var _timePicker = __webpack_require__(202);

var _timePicker2 = _interopRequireDefault(_timePicker);

var _datePicker = __webpack_require__(9676);

var _datePicker2 = _interopRequireDefault(_datePicker);

var _fileList = __webpack_require__(7858);

var fileList = _interopRequireWildcard(_fileList);

var _toast = __webpack_require__(6870);

var _toast2 = _interopRequireDefault(_toast);

var _image = __webpack_require__(7643);

var _image2 = _interopRequireDefault(_image);

var _modal = __webpack_require__(5444);

var _modal2 = _interopRequireDefault(_modal);

var _actionsheet = __webpack_require__(8937);

var _actionsheet2 = _interopRequireDefault(_actionsheet);

var _preview = __webpack_require__(1453);

var _preview2 = _interopRequireDefault(_preview);

var _util = __webpack_require__(525);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bus = (0, _util.getBus)();
var fileIndex = 0;
var fileStore = {};

function toAppService(obj) {
  if (obj.command == 'GET_ASSDK_RES') {
    ServiceJSBridge.invokeCallbackHandler(obj.ext.callbackID, obj.msg);
  } else {
    var view = _index2.default.currentView();
    var id = view ? view.id : 0;
    ServiceJSBridge.subscribeHandler(obj.msg.eventName, obj.msg.data || {}, id);
  }
}

function getAudioElement() {
  var audioTagId = 'wx-audio-component-inside';
  var audio = document.getElementById(audioTagId);
  if (audio == null) {
    var audioTag = document.createElement('audio');
    document.body.appendChild(audioTag);
    audioTag.outerHTML = '<audio id="' + audioTagId + '" type="audio/mp3" style="display:none;"></audio>';
    audio = audioTag;
  }
  return audio;
}

function getBackgroundAudioElement() {
  var audioTagId = 'wx-background-audio-component-inside';
  var audio = document.getElementById(audioTagId);
  if (audio == null) {
    var audioTag = document.createElement('audio');
    document.body.appendChild(audioTag);
    audioTag.outerHTML = '<audio id="' + audioTagId + '" type="audio/mp3" style="display:none;"></audio>';
    audio = audioTag;
    audio.addEventListener('error', function () {
      toAppService({
        msg: {
          eventName: 'onMusicError',
          type: 'ON_MUSIC_EVENT'
        }
      });
    }, false);
  }
  return audio;
}

function requiredArgs(keys, data) {
  var args = data.args;
  for (var i = 0, l = keys.length; i < l; i++) {
    if (!args.hasOwnProperty(keys[i])) {
      onError(data, 'key ' + keys[i] + ' required for ' + data.sdkName);
      return true;
    }
  }
  return false;
}

function onError(data, message) {
  var obj = {
    command: 'GET_ASSDK_RES',
    ext: (0, _assign2.default)({}, data),
    msg: {
      errMsg: data.sdkName + ':fail'
    }
  };
  if (message) obj.msg.message = message;
  toAppService(obj);
}

function onSuccess(data) {
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!data.sdkName) throw new Error('sdkName not found');
  var obj = {
    command: 'GET_ASSDK_RES',
    ext: (0, _assign2.default)({}, data),
    msg: {
      errMsg: data.sdkName + ':ok'
    }
  };
  obj.msg = (0, _assign2.default)(obj.msg, extra);
  toAppService(obj);
}

function onCancel(data) {
  var extra = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var obj = {
    command: 'GET_ASSDK_RES',
    ext: (0, _assign2.default)({}, data),
    msg: {
      errMsg: data.sdkName + ':cancel'
    }
  };
  obj.msg = (0, _assign2.default)(obj.msg, extra);
  toAppService(obj);
}

function publishPagEevent(eventName, extra) {
  var obj = {
    command: 'MSG_FROM_WEBVIEW',
    msg: {
      data: {
        data: {
          data: extra,
          eventName: eventName
        }
      },
      eventName: 'custom_event_PAGE_EVENT'
    }
  };
  toAppService(obj);
}

function getWindowHeight() {
  var scrollable = document.querySelector('.scrollable');
  return scrollable.clientHeight;
}

function getScrollHeight() {
  var scrollable = document.querySelector('.scrollable');
  return scrollable && scrollable.scrollHeight;
}

function onLaunch() {
  _header2.default.init();
  _tabbar2.default.init();
  _index2.default.onLaunch();
}

function redirectTo(data) {
  _index2.default.redirectTo(data.args.url);
}

function navigateTo(data) {
  _index2.default.navigateTo(data.args.url);
}

function reLaunch(data) {
  _index2.default.reLaunch(data.args.url);
}

function switchTab(data) {
  _index2.default.switchTab(data.args.url);
}

function navigateBack(data) {
  data.args = data.args || {};
  var delta = data.args.delta ? Number(data.args.delta) : 1;
  _index2.default.navigateBack(delta);
}

function previewImage(data) {
  var args = data.args;
  var urls = args.urls;
  var current = args.current;
  var preview = new _preview2.default(urls, {});
  preview.show();
  preview.active(current);
  onSuccess(data);
}

function stopPullDownRefresh(data) {
  var curr = _index2.default.currentView();
  if (curr) {
    curr.postMessage({
      command: 'STOP_PULL_DOWN_REFRESH'
    });
  }
  data.sdkName = 'stopPullDownRefresh';
  onSuccess(data);
}

// publish event to views
function publish(data) {
  var all_ids = _index2.default.getViewIds();
  var ids = (0, _util.toNumber)(data.webviewIds) || all_ids;

  var obj = {
    msg: data,
    command: 'MSG_FROM_APPSERVICE'
  };
  _index2.default.eachView(function (view) {
    if (ids.indexOf(view.id) !== -1) {
      view.postMessage(obj);
    }
  });
}

// 页面滚动API
function pageScrollTo(param) {
  var scrollable = document.querySelector('.scrollable'),
      scrollTop = param.args.scrollTop;
  if (void 0 !== scrollTop) {
    scrollTop < 0 && (scrollTop = 0);
    var clientHeight = getWindowHeight(),
        scrollHeight = getScrollHeight();
    scrollTop > scrollHeight - clientHeight && (scrollTop = scrollHeight - clientHeight);
    var init = function init() {
      scrollable.style.transition = '';
      scrollable.style.webkitTransition = '';
      scrollable.style.transform = '';
      scrollable.style.webkitTransform = '';
      scrollable.scrollTop = scrollTop;
      scrollable.removeEventListener('transitionend', init);
      scrollable.removeEventListener('webkitTransitionEnd', init);
    },
        l = 'translateY(' + (scrollable.scrollTop - scrollTop) + 'px) translateZ(0)';
    scrollable.style.transition = 'transform .3s ease-out';
    scrollable.style.webkitTransition = '-webkit-transform .3s ease-out';
    scrollable.addEventListener('transitionend', init);
    scrollable.addEventListener('webkitTransitionEnd', init);
    scrollable.style.transform = l;
    scrollable.style.webkitTransform = l;
    scrollable.style.scrollTop = scrollTop;
  }
}

function setNavigationBarTitle(data) {
  var title = data.args.title;
  if (title) _header2.default.setTitle(title);
}

function setStatusBarStyle(data) {
  var color = data.args.color;
  if (color) _header2.default.setState({ color: color });
}

function setNavigationBarColor(data) {
  var styles = data.args;
  if (styles) _header2.default.setNavigationBarColor(styles);
}

function showNavigationBarLoading() {
  _header2.default.showLoading();
}

function hideNavigationBarLoading() {
  _header2.default.hideLoading();
}

function chooseImage(data) {
  var URL = window.URL || window.webkitURL;
  (0, _filePicker2.default)({ multiple: true, accept: 'image/*' }, function (files) {
    files = [].slice.call(files).slice(0, data.args.count || files.length);
    var paths = files.map(function (file) {
      var blob = URL.createObjectURL(file);
      fileStore[blob] = file;
      return blob;
    });
    onSuccess(data, { tempFilePaths: paths });
  });
}

function chooseVideo(data) {
  var URL = window.URL || window.webkitURL;
  (0, _filePicker2.default)({ accept: 'video/*' }, function (files) {
    var path = URL.createObjectURL(files[0]);
    fileStore[path] = files[0];
    var video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = function () {
      var duration = video.duration;
      var size = files[0].size;
      onSuccess(data, {
        duration: duration,
        size: size,
        height: video.videoHeight,
        width: video.videoWidth,
        tempFilePath: path
      });
    };
    video.src = path;
  });
}

function saveFile(data) {
  var blob = data.args.tempFilePath;
  if (!blob) return onError(data, 'file path required');
  var file = fileStore[blob];
  if (!file) return onError(data, 'file not found');
  var upload = new _upload2.default(file);
  upload.to('/upload');
  upload.on('end', function (xhr) {
    if (xhr.status / 100 | 0 === 2) {
      var result = JSON.parse(xhr.responseText);
      onSuccess(data, {
        statusCode: xhr.status,
        savedFilePath: result.file_path
      });
    } else {
      onError(data, 'request error ' + xhr.status);
    }
  });
  upload.on('error', function (err) {
    onError(data, err.message);
  });
}

function enableCompass() {
  var id = _compass2.default.watch((0, _throttleit2.default)(function (head) {
    toAppService({
      msg: {
        eventName: 'onCompassChange',
        data: {
          direction: head
        }
      }
    });
  }, 200));
  _index2.default.currentView().on('destroy', function () {
    _compass2.default.unwatch(id);
  });
}

function enableAccelerometer() {
  if (window.DeviceMotionEvent) {
    var handler = (0, _throttleit2.default)(function (event) {
      var _x$y$z = {
        x: event.accelerationIncludingGravity.x,
        y: event.accelerationIncludingGravity.y,
        z: event.accelerationIncludingGravity.z
      },
          x = _x$y$z.x,
          y = _x$y$z.y,
          z = _x$y$z.z;

      if (x == null || y == null || z == null) return;
      toAppService({
        msg: {
          eventName: 'onAccelerometerChange',
          data: { x: x, y: y, z: z }
        }
      });
    }, 200);
    window.addEventListener('devicemotion', handler, false);
    _index2.default.currentView().on('destroy', function () {
      window.removeEventListener('devicemotion', handler, false);
    });
  } else {
    console.warn('DeviceMotionEvent is not supported');
  }
}

function getNetworkType(data) {
  var connection = navigator.connection;
  var type = connection == null ? 'WIFI' : connection.type ? connection.type : connection.effectiveType;
  onSuccess(data, {
    networkType: type
  });
}

function getLocation(data) {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var coords = position.coords;
      onSuccess(data, {
        longitude: coords.longitude,
        latitude: coords.latitude
      });
    });
  } else {
    onError(data, {
      message: 'geolocation not supported'
    });
  }
}

function openLocation(data) {
  var args = data.args;
  var url = 'http://apis.map.qq.com/tools/poimarker?type=0&marker=coord:' + args.latitude + ',' + args.longitude + '&key=JMRBZ-R4HCD-X674O-PXLN4-B7CLH-42BSB&referer=wxdevtools';
  _index2.default.openExternal(url);
  onSuccess(data, {
    latitude: args.latitude,
    longitude: args.longitude
  });
}

function chooseLocation(data) {
  var url = 'https://3gimg.qq.com/lightmap/components/locationPicker2/index.html?search=1&type=1&coord=39.90403%2C116.407526&key=JMRBZ-R4HCD-X674O-PXLN4-B7CLH-42BSB&referer=wxdevtools';
  _index2.default.openExternal(url);
  var called = false;
  Bus.once('back', function (send) {
    if (!called && !send) {
      called = true;
      onCancel(data);
    }
  });
  Bus.once('location', function (location) {
    if (!called) {
      called = true;
      if (location) {
        onSuccess(data, location);
      } else {
        onCancel(data);
      }
    }
  });
}

function setStorage(data) {
  var args = data.args;
  _storage2.default.set(args.key, args.data, args.dataType);
  if (args.key == null || args.key == '') {
    return onError(data, 'key required');
  }
  onSuccess(data);
}

function getStorage(data) {
  var args = data.args;
  if (args.key == null || args.key == '') {
    return onError(data, 'key required');
  }
  var res = _storage2.default.get(args.key);
  onSuccess(data, {
    data: res.data,
    dataType: res.dataType
  });
}

function clearStorage(data) {
  _storage2.default.clear();
  onSuccess(data);
}

function startRecord(data) {
  _record2.default.startRecord({
    success: function success(url) {
      onSuccess(data, {
        tempFilePath: url
      });
    },
    fail: function fail(err) {
      return onError(data, err.message);
    }
  }).catch(function (e) {
    console.warn('Audio record failed: ' + e.message);
  });
}

function stopRecord() {
  _record2.default.stopRecord().then(function (blob) {
    var filename = 'audio' + fileIndex;
    fileIndex++;
    var file = new File([blob], filename, {
      type: 'audio/x-wav',
      lastModified: Date.now()
    });
    fileStore[blob] = file;
  });
}

function playVoice(data) {
  var url = data.args.filePath;
  var audio = getAudioElement();
  if (audio.src == url && audio.paused && !audio.ended) {
    // resume
    audio.play();
  } else {
    audio.src = url;
    audio.load();
    audio.play();
    (0, _util.once)(audio, 'error', function (e) {
      onError(data, e.message);
    });
    (0, _util.once)(audio, 'ended', function () {
      onSuccess(data);
    });
  }
}

function pauseVoice() {
  var audio = getAudioElement();
  audio.pause();
}

function stopVoice() {
  var audio = getAudioElement();
  audio.pause();
  audio.currentTime = 0;
  audio.src = '';
}

// window.addEventListener('DOMContentLoaded', function () {
//   let audio = getBackgroundAudioElement()
//   audio.addEventListener('error', function () {
//     toAppService({
//       msg: {
//         eventName: 'onMusicError',
//         type: 'ON_MUSIC_EVENT'
//       }
//     })
//   }, false)
// }, false)

function getMusicPlayerState(data) {
  var a = getBackgroundAudioElement();
  var obj = {
    status: a.src ? a.paused ? 0 : 1 : 2,
    currentPosition: Math.floor(a.currentTime) || -1
  };
  if (a.src && !a.paused) {
    obj.duration = a.duration || 0;
    try {
      obj.downloadPercent = Math.round(100 * a.buffered.end(0) / a.duration);
    } catch (e) {}
    obj.dataUrl = a.currentSrc;
  }
  onSuccess(data, obj);
}

function operateMusicPlayer(data) {
  var args = data.args;
  var a = getBackgroundAudioElement();
  switch (args.operationType) {
    case 'play':
      if (a.src == args.dataUrl && a.paused && !a.ended) {
        a.play();
      } else {
        a.src = args.dataUrl;
        a.load();
        a.loop = true;
        a.play();
      }
      toAppService({
        msg: {
          eventName: 'onMusicPlay',
          type: 'ON_MUSIC_EVENT'
        }
      });
      break;
    case 'pause':
      a.pause();
      toAppService({
        msg: {
          eventName: 'onMusicPause',
          type: 'ON_MUSIC_EVENT'
        }
      });
      break;
    case 'seek':
      a.currentTime = args.position;
      break;
    case 'stop':
      a.pause();
      a.currentTime = 0;
      a.src = '';
      toAppService({
        msg: {
          eventName: 'onMusicEnd',
          type: 'ON_MUSIC_EVENT'
        }
      });
      break;
  }
  onSuccess(data);
}

function uploadFile(data) {
  var args = data.args;
  if (!args.filePath || !args.url || !args.name) {
    return onError(data, 'filePath, url and name required');
  }
  var file = fileStore[args.filePath];
  if (!file) return onError(data, args.filePath + ' not found');

  var headers = args.header || {};
  if (headers.Referer || headers.rederer) {
    console.warn('请注意，微信官方不允许设置请求 Referer');
  }
  var formData = args.formData || {};
  var xhr = new XMLHttpRequest();
  var reqUrl = args.url.indexOf('http') === 0 && args.url.indexOf(location.host) === -1 && __wxConfig__.weweb && (__wxConfig__.weweb.requestProxy || '/remoteProxy') || args.url;
  xhr.open('POST', reqUrl);
  xhr.onload = function () {
    if (xhr.status / 100 | 0 === 2) {
      onSuccess(data, { statusCode: xhr.status, data: xhr.responseText });
    } else {
      onError(data, 'request error ' + xhr.status);
    }
  };
  xhr.onerror = function (e) {
    onError(data, 'request error ' + e.message);
  };
  var key = void 0;
  for (key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  xhr.setRequestHeader('X-Remote', args.url);
  var body = new FormData();
  body.append(args.name, file);
  for (key in formData) {
    body.append(key, formData[key]);
  }
  xhr.send(body);
}

function downloadFile(data) {
  var URL = window.URL || window.webkitURL;
  var args = data.args;
  if (!args.url) return onError(data, 'url required');
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'arraybuffer';
  var headers = args.header || {};
  var reqUrl = args.url.indexOf('http') === 0 && args.url.indexOf(location.host) === -1 && __wxConfig__.weweb && (__wxConfig__.weweb.requestProxy || '/remoteProxy') + '?' + encodeURIComponent(args.url) || args.url;

  xhr.open('GET', reqUrl, true);
  xhr.onload = function () {
    if (xhr.status / 100 | 0 === 2 || xhr.status == 304) {
      var b = new Blob([xhr.response], {
        type: xhr.getResponseHeader('Content-Type')
      });
      var blob = URL.createObjectURL(b);
      fileStore[blob] = b;
      onSuccess(data, {
        statusCode: xhr.status,
        tempFilePath: blob
      });
    } else {
      onError(data, 'request error ' + xhr.status);
    }
  };
  xhr.onerror = function (e) {
    onError(data, 'request error ' + e.message);
  };
  var key = void 0;
  for (key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  xhr.setRequestHeader('X-Remote', args.url);
  xhr.send(null);
}

function getSavedFileList(data) {
  fileList.getFileList().then(function (list) {
    onSuccess(data, {
      fileList: list
    });
  }, function (err) {
    onError(data, err.message);
  });
}

function removeSavedFile(data) {
  var args = data.args;
  if (requiredArgs(['filePath'], data)) return;
  fileList.removeFile(args.filePath).then(function () {
    onSuccess(data, {});
  }, function (err) {
    onError(data, err.message);
  });
}

function getSavedFileInfo(data) {
  var args = data.args;
  if (requiredArgs(['filePath'], data)) return;
  fileList.getFileInfo(args.filePath).then(function (info) {
    onSuccess(data, info);
  }, function (err) {
    onError(data, err.message);
  });
}

function openDocument(data) {
  var args = data.args;
  if (requiredArgs(['filePath'], data)) return;
  (0, _modal2.default)({
    title: '确认打开',
    content: 'openDocument ' + args.filePath
  }).then(function (confirm) {
    onSuccess(data, { confirm: confirm });
  });
}

function getStorageInfo(data) {
  var info = _storage2.default.info();
  onSuccess(data, info);
}

function removeStorage(data) {
  var args = data.args;
  if (requiredArgs(['key'], data)) return;

  var o = _storage2.default.remove(args.key);
  onSuccess(data, { data: o });
}

function showToast(data) {
  if (requiredArgs(['title'], data)) return;
  _toast2.default.show(data.args);
  onSuccess(data);
}

function hideToast(data) {
  _toast2.default.hide();
  onSuccess(data);
}

function showModal(data) {
  if (requiredArgs(['title', 'content'], data)) return;
  (0, _modal2.default)(data.args).then(function (confirm) {
    onSuccess(data, { confirm: confirm });
  });
}

function showActionSheet(data) {
  var args = data.args;
  if (requiredArgs(['itemList'], data)) return;
  if (!Array.isArray(args.itemList)) {
    return onError(data, 'itemList must be Array');
  }
  args.itemList = args.itemList.slice(0, 6);
  (0, _actionsheet2.default)(args).then(function (res) {
    onSuccess(data, res);
  });
}

function getImageInfo(data) {
  if (requiredArgs(['src'], data)) return;
  (0, _image2.default)(data.args.src).then(function (res) {
    onSuccess(data, res);
  }, function (err) {
    onError(data, err.message);
  });
}

function base64ToTempFilePath(data) {
  var uri = data.args.base64Data;
  // args.canvasId
  onSuccess(data, {
    filePath: (0, _util.dataURItoBlob)(uri)
  });
}

function refreshSession(data) {
  onSuccess(data);
}

function showPickerView(args) {
  var picker = new _picker2.default(args);
  picker.show();
  // picker.on('cancel', () => {})
  picker.on('select', function (n) {
    WeixinJSBridge.subscribeHandler('showPickerView', {
      errMsg: 'showPickerView:ok',
      index: n
    });
  });
}

function insertHTMLWebView(args) {
  (0, _util.createWebview)('webview_site_' + args.htmlId, document.querySelector('#weweb-view-' + window.__webviewId__));
  WeixinJSBridge.subscribeHandler('insertHTMLWebView', {
    errMsg: 'insertHTMLWebView:ok'
  });
}

function updateHTMLWebView(args) {
  (0, _util.updateWebView)('webview_site_' + args.htmlId, args.src);
}

function showDatePickerView(args) {
  var picker = void 0;
  if (args.mode == 'time') {
    picker = new _timePicker2.default(args);
  } else {
    picker = new _datePicker2.default(args);
  }

  picker.show();
  picker.on('select', function (val) {
    WeixinJSBridge.subscribeHandler('showDatePickerView', {
      errMsg: 'showDatePickerView:ok',
      value: val
    });
  });
}

/***/ }),

/***/ 167:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _stringify = __webpack_require__(3239);

var _stringify2 = _interopRequireDefault(_stringify);

var _proxyRequest = __webpack_require__(1411);

var _proxyRequest2 = _interopRequireDefault(_proxyRequest);

var _command = __webpack_require__(9571);

var command = _interopRequireWildcard(_command);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var callbacks = {},
    callbackIndex = 0,
    defaultEventHandlers = {},
    eventPrefix = 'custom_event_',
    firstEnter = false,
    handlers = {},
    showWarning = false;

function isLimitedApi(event) {
  var limitedApi = ['openAddress', 'chooseContact'];
  if (~limitedApi.indexOf(event)) {
    return true;
  }
}

var callSystemCmd = function callSystemCmd(sdkName, args, callbackID) {
  var config = {
    sdkName: sdkName,
    args: args,
    callbackID: callbackID
  };
  doCommand(config);
};

var doCommand = function doCommand(config) {
  // args webviewIds sdkName eventName res data
  var sdkName = config.sdkName;
  if (command.hasOwnProperty(sdkName)) {
    command[sdkName](config);
  } else {
    console.warn('Method ' + sdkName + ' not implemented for command!');
  }
};
var userApi = {
  login: function login(event, temp, sendMsg) {
    sendMsg({
      errMsg: 'login:ok',
      code: 'the code is a mock one'
    });
  },
  authorize: function authorize(event, temp, sendMsg) {
    sendMsg({
      errMsg: 'authorize:fail'
    });
  },
  operateWXData: function operateWXData(event, temp, sendMsg) {
    var obj = __wxConfig__.userInfo;
    sendMsg({
      errMsg: 'operateWXData:ok',
      data: {
        data: (0, _stringify2.default)({
          nickName: obj.nickName,
          avatarUrl: obj.headUrl,
          gender: obj.sex === 'male' ? 1 : 2,
          province: obj.province,
          city: obj.city,
          country: obj.country
        })
      }
    });
  }
};

function showSdk(msg) {
  if (msg) {
    var sdkName = msg.sdkName;
    if (sdkName == 'showPickerView') {
      command.showPickerView(msg.args);
    } else if (sdkName == 'showDatePickerView') {
      command.showDatePickerView(msg.args);
    } else if (sdkName == 'updateHTMLWebView') {
      command.updateHTMLWebView(msg.args);
    } else if (sdkName == 'insertHTMLWebView') {
      command.insertHTMLWebView(msg.args);
    } else if (sdkName == 'onKeyboardComplete' || sdkName == 'getPublicLibVersion' || sdkName == 'onKeyboardConfirm' || sdkName == 'disableScrollBounce' || sdkName == 'onTextAreaHeightChange' || sdkName == 'onKeyboardShow') {
      // do nothing
    } else {
      console.warn('Ignored EXEC_JSSDK ' + (0, _stringify2.default)(msg));
    }
  }
}

var invoke = function invoke(eventName, params, callback) {
  if (~['reportKeyValue', 'reportIDKey'].indexOf(eventName)) {
    return;
  }
  if (userApi.hasOwnProperty(eventName)) {
    userApi[eventName](eventName, params, callback);
    // 这是需要限制频次的API？
  } else if (!isLimitedApi(eventName)) {
    if (_proxyRequest2.default[eventName]) {
      _proxyRequest2.default[eventName].apply(this, arguments);
    } else {
      var callbackId = ++callbackIndex;
      callbacks[callbackId] = callback;
      callSystemCmd(eventName, params, callbackId); // eventName->sdkName
    }
  } else if (!showWarning) {
    showWarning = true;
    var callbackId = ++callbackIndex;
    var callbackRes = function callbackRes(params) {};
    callbacks[callbackId] = callbackRes;
    callSystemCmd('showModal', {
      title: '请注意，转成h5以后，依赖微信相关的接口调用将无法支持，请自行改造成h5的兼容方式',
      content: '',
      confirmText: '确定',
      cancelText: '取消',
      showCancel: !0,
      confirmColor: '#3CC51F',
      cancelColor: '#000000'
    }, callbackId); // eventName->sdkName
  }
},
    invokeCallbackHandler = function invokeCallbackHandler(callbackId, params) {
  var callback = callbacks[callbackId];
  typeof callback === 'function' && callback(params), delete callbacks[callbackId];
},
    publish = function publish(eventName, data, webviewIds) {
  doCommand({
    eventName: eventPrefix + eventName, // 对应view subscribe
    data: data,
    webviewIds: webviewIds,
    sdkName: 'publish'
  });
},
    on = function on(eventName, handler) {
  if (eventName === 'onAppEnterForeground') {
    if (!firstEnter) {
      handler && handler({});
      firstEnter = true;
    }
  }

  defaultEventHandlers[eventName] = handler;
},
    subscribe = function subscribe(eventName, handler) {
  handlers[eventPrefix + eventName] = handler;
},
    subscribeHandler = function subscribeHandler(eventName, data, webviewId, reportParams) {
  // 执行注册的回调
  var handler;handler = eventName.indexOf(eventPrefix) != -1 ? handlers[eventName] : defaultEventHandlers[eventName], typeof handler === 'function' && handler(data, webviewId, reportParams);
};

window.DeviceOrientation = function (x, y, z) {
  defaultEventHandlers['onAccelerometerChange'] && defaultEventHandlers['onAccelerometerChange']({
    x: x,
    y: y,
    z: z
  });
};

window.ServiceJSBridge = {
  showSdk: showSdk,
  doCommand: doCommand,
  invoke: invoke,
  invokeCallbackHandler: invokeCallbackHandler,
  on: on,
  publish: publish,
  subscribe: subscribe,
  subscribeHandler: subscribeHandler
};

/***/ }),

/***/ 1411:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var webSocket = null,
    requestIndex = 0;
var jsonp = function jsonp(params, callback, networkTimeout) {
  var jsonpName = 'jsonp_' + Date.now() + '_' + Math.random().toString().substr(2),
      callbackName = 'callback',
      url = params.url,
      timeOut,
      script = document.createElement('script');

  url += (url.indexOf('?') === -1 ? '?' : '&') + callbackName + '=' + jsonpName;
  script.src = url;
  if (typeof networkTimeout === 'number') {
    timeOut = setTimeout(function () {
      window[jsonpName] = function () {};
      callback && callback({
        errMsg: 'request:fail'
      });
    }, networkTimeout);
  }

  window[jsonpName] = function (response) {
    try {
      timeOut && clearTimeout(timeOut);
      callback && callback({
        errMsg: 'request:ok',
        data: response,
        statusCode: 200
      });
    } finally {
      delete window[jsonpName];
      script.parentNode.removeChild(script);
    }
  };
  document.body.appendChild(script);
};
var request = function request(event, params, callback) {
  requestIndex++;
  var url = params.url,
      headers = params.header || {},
      timeOut,
      xhr = new XMLHttpRequest(),
      method = params.method || 'POST',
      networkTimeout = 3e4;

  if (__wxConfig__ && __wxConfig__.weweb && (__wxConfig__.weweb.requestProxy || __wxConfig__.weweb.requestType == 'ajax')) {
    // 配置了 reqProxy， 使用代理来请求
    if (__wxConfig__.weweb.requestProxy) {
      url = __wxConfig__.weweb.requestProxy;
    }

    xhr.open(method, url, true);

    if (__wxConfig__.weweb.requestType == 'ajax') {
      xhr.withCredentials = true;
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 3, xhr.readyState == 4) {
        xhr.onreadystatechange = null;
        var statusCode = xhr.status;
        if (statusCode != 0) {
          requestIndex--;
          timeOut && clearTimeout(timeOut);
          callback && callback({
            errMsg: 'request:ok',
            data: xhr.responseText,
            statusCode: statusCode
          });
        }
      }
    };

    xhr.onerror = function () {
      callback && callback({
        errMsg: 'request:fail'
      });
    };

    if (__wxConfig__.weweb.requestType != 'ajax') {
      xhr.setRequestHeader('X-Remote', params.url);
      xhr.setRequestHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      xhr.setRequestHeader('Pragma', 'no-cache');
      xhr.setRequestHeader('Expires', '0');
    }

    // 不晓得为啥会有两个 content-type
    var attrCount = 0;
    for (var attr in headers) {
      attr.toLowerCase() === 'content-type' && attrCount++;
    }
    attrCount >= 2 && delete headers['content-type'];

    // 设置 请求的 header
    var hasContentType = false;
    for (var headerKey in headers) {
      if (headers.hasOwnProperty(headerKey)) {
        var headerValue = headerKey.toLowerCase();
        hasContentType = headerValue == 'content-type' || hasContentType;
        if (headerValue === 'cookie') {
          xhr.setRequestHeader('_Cookie', headers[headerKey]);
        } else {
          xhr.setRequestHeader(headerKey, headers[headerKey]);
        }
      }
    }

    method != 'POST' || hasContentType || xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    xhr.setRequestHeader('X-Requested-With', 'requestObj');

    // 手动模拟超时
    if (typeof networkTimeout === 'number') {
      timeOut = setTimeout(function () {
        xhr.abort('timeout');
        params.complete && params.complete();
        params.complete = null;
        requestIndex--;
        callback && callback({
          errMsg: 'request:fail'
        });
      }, networkTimeout);
    }

    var reqData = typeof params.data === 'string' ? params.data : null;

    try {
      xhr.send(reqData);
    } catch (y) {
      requestIndex--;
      callback && callback({
        errMsg: 'request:fail'
      });
    }
  } else {
    // 不配置 requestPrxy，默认走 jsonp
    jsonp(params, callback, networkTimeout);
  }
};

var connectSocket = function connectSocket(event, temp, callback) {
  var url = temp.url,
      header = temp.header;
  /* 安全域名检测
    if (!loadFile.checkUrl(url, "webscoket")) {
        return void(callback && callback({
            errMsg: "connectSocket:fail"
        }));
    }
  */
  webSocket = new WebSocket(url);
  for (var attr in header) {
    header.hasOwnProperty(attr);
  }
  webSocket.onopen = function (data) {
    ServiceJSBridge.subscribeHandler('onSocketOpen', data);
  };
  webSocket.onmessage = function (data) {
    ServiceJSBridge.subscribeHandler('onSocketMessage', {
      data: data.data
    });
  };
  webSocket.onclose = function (data) {
    ServiceJSBridge.subscribeHandler('onSocketClose', data);
  };
  webSocket.onerror = function (data) {
    ServiceJSBridge.subscribeHandler('onSocketError', data);
  };
  callback && callback({
    errMsg: 'connectSocket:ok'
  });
};
var closeSocket = function closeSocket(event, temp, callback) {
  if (webSocket) {
    webSocket.close();
    webSocket = null;
    callback && callback({
      errMsg: 'closeSocket:ok'
    });
  } else {
    callback && callback({
      errMsg: 'closeSocket:fail'
    });
  }
};
var sendSocketMessage = function sendSocketMessage(event, temp, callback) {
  var data = temp.data;
  if (webSocket) {
    try {
      webSocket.send(data);
      callback && callback({
        errMsg: 'sendSocketMessage:ok'
      });
    } catch (Event) {
      callback && callback({
        errMsg: 'sendSocketMessage:fail ' + Event.message
      });
    }
  } else {
    callback && callback({
      errMsg: 'sendSocketMessage:fail'
    });
  }
};
exports["default"] = {
  request: request,
  connectSocket: connectSocket,
  sendSocketMessage: sendSocketMessage,
  closeSocket: closeSocket
};
module.exports = exports['default'];

/***/ }),

/***/ 5192:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var DOM_READY_EVENT = '__DOMReady';
// var UPDATE_APP_DATA = "__updateAppData";

exports.DOM_READY_EVENT = DOM_READY_EVENT;

/***/ }),

/***/ 1859:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copy(obj, customizerFn) {
  var res = copyValue(obj);
  return res !== null ? res : copyCollection(obj, customizerFn);
}
function copyCollection(obj, customizerFn) {
  if (typeof customizerFn !== 'function') {
    throw new TypeError('customizer is must be a Function');
  }
  if (typeof obj === 'function') {
    return obj;
  }
  var typeString = toString.call(obj);
  if (typeString === '[object Array]') {
    return [];
  }
  if (typeString === '[object Object]' && obj.constructor === Object) {
    return {};
  }
  if (typeString === '[object Date]') {
    return new Date(obj.getTime());
  }
  if (typeString === '[object RegExp]') {
    var toStr = String(obj),
        pos = toStr.lastIndexOf('/');
    return new RegExp(toStr.slice(1, pos), toStr.slice(pos + 1));
  }
  var res = customizerFn(obj);
  return undefined !== res ? res : null;
}
function copyValue(param) {
  var type = typeof param === 'undefined' ? 'undefined' : (0, _typeof3.default)(param);
  return param !== null && type !== 'object' && type !== 'function' ? param : null;
}
var toString = Object.prototype.toString;
exports["default"] = {
  copy: copy,
  copyCollection: copyCollection,
  copyValue: copyValue
};
module.exports = exports['default'];

/***/ }),

/***/ 1866:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _pageInit = __webpack_require__(8996);

var _pageInit2 = _interopRequireDefault(_pageInit);

var _initApp = __webpack_require__(8032);

var _initApp2 = _interopRequireDefault(_initApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.Page = _pageInit2.default.pageHolder;
window.App = _initApp2.default.appHolder;
window.getApp = _initApp2.default.getApp;
window.getCurrentPages = _pageInit2.default.getCurrentPages;

/***/ }),

/***/ 8032:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

var _pageInit = __webpack_require__(8996);

var _pageInit2 = _interopRequireDefault(_pageInit);

var _logReport = __webpack_require__(7951);

var reportRealtimeAction = _interopRequireWildcard(_logReport);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = ['onLaunch', 'onShow', 'onHide', 'onUnlaunch'];

var firstRender = true;

var isSysEvent = function isSysEvent(key) {
  // 判断是否为app 事件
  for (var index = 0; index < events.length; ++index) {
    if (events[index] === key) {
      return true;
    }
  }
  return false;
};
var isGetCurrentPage = function isGetCurrentPage(key) {
  return key === 'getCurrentPage';
};

var appClass = function () {
  function appClass(appObj) {
    (0, _classCallCheck3.default)(this, appClass);

    // t:app
    var self = this;
    events.forEach(function (eventKey) {
      // 给app绑定事件
      var tempFun = function tempFun() {
        var eventFun = (appObj[eventKey] || _utils2.default.noop).bind(this);
        _utils2.default.info('App: ' + eventKey + ' have been invoked');
        try {
          eventFun.apply(this, arguments);
        } catch (t) {
          Reporter.thirdErrorReport({
            error: t,
            extend: 'App catch error in lifeCycleMethod ' + eventKey + ' function'
          });
        }
      };
      self[eventKey] = tempFun.bind(self);
    });
    var bindApp = function bindApp(attrKey) {
      // 给app绑定其它方法与属性
      isGetCurrentPage(attrKey) ? _utils2.default.warn('关键字保护', "App's " + attrKey + ' is write-protected') : isSysEvent(attrKey) || (Object.prototype.toString.call(appObj[attrKey]) === '[object Function]' ? self[attrKey] = function () {
        var method;
        try {
          method = appObj[attrKey].apply(this, arguments);
        } catch (t) {
          Reporter.thirdErrorReport({
            error: t,
            extend: 'App catch error in  ' + attrKey + ' function'
          });
        }
        return method;
      }.bind(self) : self[attrKey] = appObj[attrKey]);
    };
    for (var attrKey in appObj) {
      bindApp(attrKey);
    }
    this.onError && Reporter.registerErrorListener(this.onError);
    this.onLaunch();
    reportRealtimeAction.triggerAnalytics('launch', null, '小程序启动');
    var hide = function hide() {
      // hide
      var pages = _pageInit2.default.getCurrentPages();
      pages.length && pages[pages.length - 1].onHide();
      this.onHide();
      reportRealtimeAction.triggerAnalytics('background', null, '小程序转到后台');
    };
    var show = function show() {
      // show
      this.onShow();
      if (firstRender) {
        firstRender = false;
      } else {
        var pages = _pageInit2.default.getCurrentPages();
        pages.length && (pages[pages.length - 1].onShow(), reportRealtimeAction.triggerAnalytics('foreground', null, '小程序转到前台'));
      }
    };
    wx.onAppEnterBackground(hide.bind(this));
    wx.onAppEnterForeground(show.bind(this));
  }

  (0, _createClass3.default)(appClass, [{
    key: 'getCurrentPage',
    value: function getCurrentPage() {
      _utils2.default.warn('将被废弃', 'App.getCurrentPage is deprecated, please use getCurrentPages. [It will be removed in 2016.11]');
      var currentPage = _pageInit2.default.getCurrentPage();
      if (currentPage) {
        return currentPage.page;
      }
    }
  }]);
  return appClass;
}();

var tempObj;

var appHolder = Reporter.surroundThirdByTryCatch(function (appObj) {
  tempObj = new appClass(appObj);
}, 'create app instance');
var getApp = function getApp() {
  return tempObj;
};

exports["default"] = { appHolder: appHolder, getApp: getApp };
module.exports = exports['default'];

/***/ }),

/***/ 8330:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

var _copyUtils = __webpack_require__(1859);

var _copyUtils2 = _interopRequireDefault(_copyUtils);

var _symbolHandle = __webpack_require__(2082);

var _symbolHandle2 = _interopRequireDefault(_symbolHandle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function emptyFn(e) {}
function copyHandle(data) {
  var method = arguments.length <= 1 || undefined === arguments[1] ? emptyFn : arguments[1];
  if (data === null) {
    return null;
  }
  var value = _copyUtils2.default.copyValue(data);
  if (value !== null) {
    return value;
  }
  var coll = _copyUtils2.default.copyCollection(data, method),
      newAttr = coll !== null ? coll : data,
      attrArr = [data],
      newAttrArr = [newAttr];
  return iteratorHandle(data, method, newAttr, attrArr, newAttrArr);
}
function iteratorHandle(data, method, newAttr, attrArr, newAttrArr) {
  // 处理对象循环引用情况
  if (data === null) {
    return null;
  }
  var value = _copyUtils2.default.copyValue(data);
  if (value !== null) {
    return value;
  }
  var keys = _symbolHandle2.default.getKeys(data).concat(_symbolHandle2.default.getSymbols(data));
  var index, length, key, attrValue, attrValueIndex, newAttrValue, curAttrValue, tmpObj;
  for (index = 0, length = keys.length; index < length; ++index) {
    key = keys[index];
    attrValue = data[key];
    attrValueIndex = _symbolHandle2.default.indexOf(attrArr, attrValue); // 确定data的子属性有没引用自身
    tmpObj = undefined;
    curAttrValue = undefined;
    newAttrValue = undefined;
    attrValueIndex === -1 ? (newAttrValue = _copyUtils2.default.copy(attrValue, method), curAttrValue = newAttrValue !== null ? newAttrValue : attrValue, attrValue !== null && /^(?:function|object)$/.test(typeof attrValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(attrValue)) && (attrArr.push(attrValue), newAttrArr.push(curAttrValue))) : tmpObj = newAttrArr[attrValueIndex];
    newAttr[key] = tmpObj || iteratorHandle(attrValue, method, curAttrValue, attrArr, newAttrArr);
  }
  return newAttr;
}

exports["default"] = copyHandle;
module.exports = exports['default'];

/***/ }),

/***/ 7951:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var triggerAnalytics = exports.triggerAnalytics = function triggerAnalytics(eventName, pageObj, desc) {
  var data = {};
  if (pageObj) {
    data.pageRoute = pageObj.__route__;
  }
  if (desc) {
    data.desc = desc;
  }
  ServiceJSBridge.publish('H5_LOG_MSG', { event: eventName, desc: data }, [pageObj && pageObj.__wxWebviewId__ || '']);
};

/***/ }),

/***/ 8996:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _stringify = __webpack_require__(3239);

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

var _parsePage = __webpack_require__(7253);

var _parsePage2 = _interopRequireDefault(_parsePage);

var _constants = __webpack_require__(5192);

var _logReport = __webpack_require__(7951);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pageStack = [];
var tabBars = []; // tab栏url列表
var currentPage;
__wxConfig__.tabBar && __wxConfig__.tabBar.list && (0, _typeof3.default)(__wxConfig__.tabBar.list) === 'object' && typeof __wxConfig__.tabBar.list.forEach === 'function' && __wxConfig__.tabBar.list.forEach(function (item) {
  tabBars.push(item.pagePath);
});

var app = {
  appRouteTime: 0,
  newPageTime: 0,
  pageReadyTime: 0
};

var pageStackObjs = {};
var pageRegObjs = {}; // key:pathname
var pageIndex = 0;

var getCurrentPage = function getCurrentPage() {
  return currentPage;
};
var getCurrentPages = function getCurrentPages() {
  var pageArr = [];
  pageStack.forEach(function (pageObj) {
    pageArr.push(pageObj.page);
  });
  return pageArr;
};
var pageHolder = function pageHolder(pageObj) {
  // Page 接口
  if (!__wxRouteBegin) {
    throw _utils2.default.error('Page 注册错误', 'Please do not register multiple Pages in ' + __wxRoute + '.js');
    new _utils2.default.AppServiceEngineKnownError('Please do not register multiple Pages in ' + __wxRoute + '.js');
  }

  __wxRouteBegin = !1;
  var pages = __wxConfig__.pages,
      pagePath = __wxRoute || pages[pageIndex];
  pageIndex++;
  if (_utils2.default.getDataType(pageObj) !== 'Object') {
    throw _utils2.default.error('Page 注册错误', 'Options is not object: ' + (0, _stringify2.default)(pageObj) + ' in ' + __wxRoute + '.js');
    new _utils2.default.AppServiceEngineKnownError('Options is not object: ' + (0, _stringify2.default)(pageObj) + ' in ' + __wxRoute + '.js');
  }
  _utils2.default.info('Register Page: ' + pagePath);
  pageRegObjs[pagePath] = pageObj;
};

var pageInitData = Reporter.surroundThirdByTryCatch(function (pageObj, webviewId) {
  _utils2.default.info('Update view with init data');
  var ext = {};
  ext.webviewId = webviewId;
  ext.enablePullUpRefresh = pageObj.hasOwnProperty('onReachBottom');
  var params = {
    data: {
      data: pageObj.data,
      ext: ext,
      options: {
        firstRender: !0
      }
    }
  };
  _utils2.default.publish('appDataChange', params, [webviewId]);
});

var pageParse = function pageParse(routePath, webviewId, params) {
  // 解析page e:pagepath t:webviewId params:
  var curPageObj = void 0;
  if (pageRegObjs.hasOwnProperty(routePath)) {
    curPageObj = pageRegObjs[routePath];
  } else {
    _utils2.default.warn('Page route 错误', 'Page[' + routePath + '] not found. May be caused by: 1. Forgot to add page route in app.json. 2. Invoking Page() in async task.');
    curPageObj = {};
  }
  app.newPageTime = Date.now();
  var page = new _parsePage2.default(curPageObj, webviewId, routePath);
  currentPage = {
    page: page,
    webviewId: webviewId,
    route: routePath
  };
  pageStack.push(currentPage);
  pageStackObjs[webviewId] = {
    params: params,
    page: page,
    route: routePath
  };
  pageInitData(page, webviewId);
  (0, _logReport.triggerAnalytics)('enterPage', page);
};

var pageHide = function pageHide(pageItem) {
  // 执行page hide event
  document.dispatchEvent(new CustomEvent('leavePage', {}));
  pageItem.page.onHide();
  (0, _logReport.triggerAnalytics)('leavePage', pageItem.page);
};

var pageUnload = function pageUnload(pageItem) {
  // do page unload
  pageItem.page.onUnload();
  delete pageStackObjs[pageItem.webviewId];
  pageStack = pageStack.slice(0, pageStack.length - 1);
  (0, _logReport.triggerAnalytics)('leavePage', pageItem.page);
};

var isTabBarsPage = function isTabBarsPage(pageItem) {
  //
  return tabBars.indexOf(pageItem.route) !== -1 || tabBars.indexOf(pageItem.route + '.html') !== -1;
};

var skipPage = function skipPage(routePath, pWebViewId, pageParams, pApiKey) {
  // 打开、跳转页面
  _utils2.default.info('On app route: ' + routePath);
  app.appRouteTime = Date.now();
  if (pApiKey === 'navigateTo') {
    currentPage && pageHide(currentPage);
    pageStackObjs.hasOwnProperty(pWebViewId) ? _utils2.default.error('Page route 错误(system error)', 'navigateTo with an already exist webviewId ' + pWebViewId) : pageParse(routePath, pWebViewId, pageParams);
  } else if (pApiKey === 'redirectTo') {
    currentPage && pageUnload(currentPage);
    pageStackObjs.hasOwnProperty(pWebViewId) ? _utils2.default.error('Page route 错误(system error)', 'redirectTo with an already exist webviewId ' + pWebViewId) : pageParse(routePath, pWebViewId, pageParams);
  } else if (pApiKey === 'navigateBack') {
    for (var isExist = !1, i = pageStack.length - 1; i >= 0; i--) {
      var pageItem = pageStack[i];
      if (pageItem.webviewId === pWebViewId) {
        isExist = !0;
        currentPage = pageItem;
        pageItem.page.onShow();
        (0, _logReport.triggerAnalytics)('enterPage', pageItem);
        break;
      }
      pageUnload(pageItem);
    }
    isExist || _utils2.default.error('Page route 错误(system error)', 'navigateBack with an unexist webviewId ' + pWebViewId);
  } else if (pApiKey === 'reLaunch') {
    currentPage && pageUnload(currentPage);
    pageStackObjs.hasOwnProperty(pWebViewId) ? _utils2.default.error('Page route 错误(system error)', 'redirectTo with an already exist webviewId ' + pWebViewId) : pageParse(routePath, pWebViewId, pageParams);
  } else if (pApiKey === 'switchTab') {
    for (var onlyOnePage = !0; pageStack.length > 1;) {
      pageUnload(pageStack[pageStack.length - 1]);
      onlyOnePage = !1;
    }
    if (pageStack[0].webviewId === pWebViewId) {
      currentPage = pageStack[0];
      onlyOnePage || currentPage.page.onShow();
    } else if (isTabBarsPage(pageStack[0]) ? onlyOnePage && pageHide(pageStack[0]) : pageUnload(pageStack[0]), pageStackObjs.hasOwnProperty(pWebViewId)) {
      var pageObj = pageStackObjs[pWebViewId].page;
      currentPage = {
        webviewId: pWebViewId,
        route: routePath,
        page: pageObj
      };
      pageStack = [currentPage];
      pageObj.onShow();
      (0, _logReport.triggerAnalytics)('enterPage', pageObj);
    } else {
      pageStack = [];
      pageParse(routePath, pWebViewId, pageParams);
    }
  } else {
    pApiKey === 'appLaunch' ? pageStackObjs.hasOwnProperty(pWebViewId) ? _utils2.default.error('Page route 错误(system error)', 'appLaunch with an already exist webviewId ' + pWebViewId) : pageParse(routePath, pWebViewId, pageParams) : _utils2.default.error('Page route 错误(system error)', 'Illegal open type: ' + pApiKey);
  }
};

var doWebviewEvent = function doWebviewEvent(pWebviewId, pEvent, params) {
  // do dom ready

  if (!pageStackObjs.hasOwnProperty(pWebviewId)) {
    return _utils2.default.warn('事件警告', 'OnWebviewEvent: ' + pEvent + ', WebviewId: ' + pWebviewId + ' not found');
  }
  var pageItem = pageStackObjs[pWebviewId];
  var pageObj = pageItem.page;
  if (pEvent === _constants.DOM_READY_EVENT) {
    pageObj.onLoad(pageItem.params);
    pageObj.onShow();
    app.pageReadyTime = Date.now();
    _utils2.default.info('Invoke event onReady in page: ' + pageItem.route);
    pageObj.onReady();
  } else {
    _utils2.default.info('Invoke event ' + pEvent + ' in page: ' + pageItem.route);
    if (pageObj.hasOwnProperty(pEvent)) {
      _utils2.default.safeInvoke.call(pageObj, pEvent, params);
    } else {
      _utils2.default.warn('事件警告', 'Do not have ' + pEvent + ' handler in current page: ' + pageItem.route + '. Please make sure that ' + pEvent + ' handler has been defined in ' + pageItem.route + ', or ' + pageItem.route + ' has been added into app.json');
    }
  }
};

var pullDownRefresh = function pullDownRefresh(pWebviewId) {
  // do pulldownrefresh
  pageStackObjs.hasOwnProperty(pWebviewId) || _utils2.default.warn('事件警告', 'onPullDownRefresh WebviewId: ' + pWebviewId + ' not found');
  var pageItem = pageStackObjs[pWebviewId],
      pageObj = pageItem.page;
  if (pageObj.hasOwnProperty('onPullDownRefresh')) {
    _utils2.default.info('Invoke event onPullDownRefresh in page: ' + pageItem.route);
    _utils2.default.safeInvoke.call(pageObj, 'onPullDownRefresh');
    (0, _logReport.triggerAnalytics)('pullDownRefresh', pageObj);
  }
};

var invokeShareAppMessage = function invokeShareAppMessage(params, pWebviewId) {
  // invoke event onShareAppMessage
  var shareParams = params,
      pageItem = pageStackObjs[pWebviewId],
      pageObj = pageItem.page,
      eventName = 'onShareAppMessage';
  if (pageObj.hasOwnProperty(eventName)) {
    _utils2.default.info('Invoke event onShareAppMessage in page: ' + pageItem.route);
    var shareObj = _utils2.default.safeInvoke.call(pageObj, eventName) || {};
    shareParams.title = shareObj.title || params.title;
    shareParams.desc = shareObj.desc || params.desc;
    shareParams.path = shareObj.path ? _utils2.default.addHTMLSuffix(shareObj.path) : params.path;
    shareParams.path.length > 0 && shareParams.path[0] === '/' && (shareParams.path = shareParams.path.substr(1));
    shareParams.success = shareObj.success;
    shareParams.cancel = shareObj.cancel;
    shareParams.fail = shareObj.fail;
    shareParams.complete = shareObj.complete;
  }
  return shareParams;
};

var shareAppMessage = function shareAppMessage(params, webviewId) {
  var shareInfo = invokeShareAppMessage(params, webviewId);
  ServiceJSBridge.invoke('shareAppMessage', shareInfo, function (res) {
    ;/ ^shareAppMessage: ok /.test(res.errMsg) && typeof shareInfo.success === 'function' ? shareInfo.success(res) : /^shareAppMessage:cancel/.test(res.errMsg) && typeof shareInfo.cancel === 'function' ? shareInfo.cancel(res) : /^shareAppMessage:fail/.test(res.errMsg) && typeof shareInfo.fail === 'function' && shareInfo.fail(res), typeof shareInfo.complete === 'function' && shareInfo.complete(res); // bug?? 原代码：shareInfo.fail && shareInfo.cancel(res)
  });
};

var reset = function reset() {
  currentPage = undefined;
  pageStackObjs = {};
  pageRegObjs = {};
  pageStack = [];
  pageIndex = 0;
};
var setWxConfig = function setWxConfig(e) {
  __wxConfig__ = e;
};
var setWxRoute = function setWxRoute(e) {
  __wxRoute = e;
};
var setWxRouteBegin = function setWxRouteBegin(e) {
  __wxRouteBegin = e;
};
var getWebviewIdToPage = function getWebviewIdToPage() {
  return pageStackObjs;
};
var getRouteToPage = function getRouteToPage() {
  return pageRegObjs;
};

wx.onAppRoute(Reporter.surroundThirdByTryCatch(function (params) {
  var path = params.path,
      webviewId = params.webviewId,
      query = params.query || {},
      openType = params.openType;
  skipPage(path, webviewId, query, openType);
}), 'onAppRoute');

wx.onWebviewEvent(Reporter.surroundThirdByTryCatch(function (params) {
  var webviewId = params.webviewId,
      eventName = params.eventName,
      data = params.data;
  return doWebviewEvent(webviewId, eventName, data);
}, 'onWebviewEvent'));

ServiceJSBridge.on('onPullDownRefresh', Reporter.surroundThirdByTryCatch(function (e, pWebViewId) {
  pullDownRefresh(pWebViewId);
}, 'onPullDownRefresh'));

ServiceJSBridge.on('onShareAppMessage', Reporter.surroundThirdByTryCatch(shareAppMessage, 'onShareAppMessage'));

exports["default"] = {
  getRouteToPage: getRouteToPage,
  getWebviewIdToPage: getWebviewIdToPage,
  setWxRouteBegin: setWxRouteBegin,
  setWxRoute: setWxRoute,
  setWxConfig: setWxConfig,
  reset: reset,
  pageHolder: pageHolder,
  getCurrentPages: getCurrentPages,
  getCurrentPage: getCurrentPage
};
module.exports = exports['default'];

/***/ }),

/***/ 7253:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _stringify = __webpack_require__(3239);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

var _parsePath = __webpack_require__(2464);

var _iteratorHandle = __webpack_require__(8330);

var _iteratorHandle2 = _interopRequireDefault(_iteratorHandle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sysEventKeys = ['onLoad', 'onReady', 'onShow', 'onRouteEnd', 'onHide', 'onUnload'];
var isSysAttr = function isSysAttr(key) {
  // 校验e是否为系统事件或属性
  for (var i = 0; i < sysEventKeys.length; ++i) {
    if (sysEventKeys[i] === key) {
      return true;
    }
  }
  return key === 'data';
};
var baseAttrs = ['__wxWebviewId__', '__route__'];

var isBaseAttr = function isBaseAttr(name) {
  return baseAttrs.indexOf(name) !== -1;
};

var PageParser = function () {
  function PageParser() {
    (0, _classCallCheck3.default)(this, PageParser);

    var pageObj = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
        curPage = this,
        webviewId = arguments[1],
        routePath = arguments[2];

    var pageBaseAttr = {
      __wxWebviewId__: webviewId,
      __route__: routePath
    };
    baseAttrs.forEach(function (key) {
      curPage.__defineSetter__(key, function () {
        _utils2.default.warn('关键字保护', 'should not change the protected attribute ' + key);
      });
      curPage.__defineGetter__(key, function () {
        return pageBaseAttr[key];
      });
    });
    pageObj.data = pageObj.data || {};
    if (pageObj.route == null) {
      pageObj.route = routePath;
    }
    _utils2.default.isPlainObject(pageObj.data) || _utils2.default.error('Page data error', 'data must be an object, your data is ' + (0, _stringify2.default)(pageObj.data));
    this.data = JSON.parse((0, _stringify2.default)(pageObj.data));
    sysEventKeys.forEach(function (eventName) {
      // 定义页面事件
      curPage[eventName] = function () {
        var eventFun = (pageObj[eventName] || _utils2.default.noop).bind(this),
            res;
        _utils2.default.info(this.__route__ + ': ' + eventName + ' have been invoked');
        try {
          var startTime = Date.now();
          res = eventFun.apply(this, arguments);
          var runTime = Date.now() - startTime;
          runTime > 1e3 && Reporter.slowReport({
            key: 'pageInvoke',
            cost: runTime,
            extend: 'at "' + this.__route__ + '" page lifeCycleMethod ' + eventName + ' function'
          });
        } catch (err) {
          Reporter.thirdErrorReport({
            error: err,
            extend: 'at "' + this.__route__ + '" page lifeCycleMethod ' + eventName + ' function'
          });
        }
        return res;
      }.bind(curPage);
    });
    var copyPageObjByKey = function copyPageObjByKey(attrName) {
      // 定义页面其它方法与属性
      isBaseAttr(attrName) ? _utils2.default.warn('关键字保护', "Page's " + attrName + ' is write-protected') : isSysAttr(attrName) || (_utils2.default.getDataType(pageObj[attrName]) === 'Function' ? curPage[attrName] = function () {
        var res;
        try {
          var startTime = Date.now();
          res = pageObj[attrName].apply(this, arguments);
          var runTime = Date.now() - startTime;
          runTime > 1e3 && Reporter.slowReport({
            key: 'pageInvoke',
            cost: runTime,
            extend: 'at ' + this.__route__ + ' page ' + attrName + ' function'
          });
        } catch (err) {
          Reporter.thirdErrorReport({
            error: err,
            extend: 'at "' + this.__route__ + '" page ' + attrName + ' function'
          });
        }
        return res;
      }.bind(curPage) : curPage[attrName] = (0, _iteratorHandle2.default)(pageObj[attrName]));
    };
    for (var key in pageObj) {
      copyPageObjByKey(key);
    }
    typeof pageObj.onShareAppMessage === 'function' && ServiceJSBridge.invoke('showShareMenu', {}, _utils2.default.info);
  }

  (0, _createClass3.default)(PageParser, [{
    key: 'update',
    value: function update() {
      _utils2.default.warn('将被废弃', 'Page.update is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]');
    }
  }, {
    key: 'forceUpdate',
    value: function forceUpdate() {
      _utils2.default.warn('将被废弃', 'Page.forceUpdate is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]');
    }
  }, {
    key: 'setData',
    value: function setData(dataObj, callback) {
      try {
        var type = _utils2.default.getDataType(dataObj);
        type !== 'Object' && _utils2.default.error('类型错误', 'setData accepts an Object rather than some ' + type);
        for (var key in dataObj) {
          var curValue = (0, _parsePath.getObjectByPath)(this.data, key),
              curObj = curValue.obj,
              curKey = curValue.key;
          curObj && (curObj[curKey] = (0, _iteratorHandle2.default)(dataObj[key]));
        }

        var execCallback = function execCallback() {
          callback();
          document.removeEventListener('pageReRender', execCallback);
        };
        if (callback) {
          document.addEventListener('pageReRender', execCallback);
        }
        if (window.reRender) {
          WeixinJSBridge.subscribeHandler('custom_event_appDataChange', {
            data: {
              data: dataObj
            }
          });
        } else {
          // 还没进行第一次渲染
          _utils2.default.publish('appDataChange', {
            data: {
              data: dataObj
            }
          }, [this.__wxWebviewId__]);
        }
      } catch (e) {
        Reporter.errorReport({
          key: 'jsEnginScriptError',
          error: e,
          extend: 'setData err'
        });
      }
    }
  }]);
  return PageParser;
}();

exports["default"] = PageParser;
module.exports = exports['default'];

/***/ }),

/***/ 2464:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.parsePath = parsePath;
exports.getObjectByPath = getObjectByPath;

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parsePath(pathStr) {
  // 解析data path
  for (var length = pathStr.length, paths = [], key = '', arrKey = 0, hasNum = false, arrStartFlag = false, index = 0; index < length; index++) {
    var curStr = pathStr[index];
    if (curStr === '\\') {
      index + 1 < length && (pathStr[index + 1] === '.' || pathStr[index + 1] === '[' || pathStr[index + 1] === ']') ? (key += pathStr[index + 1], index++) : key += '\\';
    } else if (curStr === '.') {
      key && (paths.push(key), key = '');
    } else if (curStr === '[') {
      if (key && (paths.push(key), key = ''), paths.length === 0) {
        throw _utils2.default.error('数据路径错误', 'Path can not start with []: ' + pathStr);
        new _utils2.default.AppServiceEngineKnownError('Path can not start with []: ' + pathStr);
      }
      arrStartFlag = true;
      hasNum = false;
    } else if (curStr === ']') {
      if (!hasNum) {
        throw _utils2.default.error('数据路径错误', 'Must have number in []: ' + pathStr);
        new _utils2.default.AppServiceEngineKnownError('Must have number in []: ' + pathStr);
      }
      arrStartFlag = false;
      paths.push(arrKey);
      arrKey = 0;
    } else if (arrStartFlag) {
      if (curStr < '0' || curStr > '9') {
        throw _utils2.default.error('数据路径错误', 'Only number 0-9 could inside []: ' + pathStr);
        new _utils2.default.AppServiceEngineKnownError('Only number 0-9 could inside []: ' + pathStr);
      }
      hasNum = true;
      arrKey = 10 * arrKey + curStr.charCodeAt(0) - 48;
    } else {
      key += curStr;
    }
  }
  if (key && paths.push(key), paths.length === 0) {
    throw _utils2.default.error('数据路径错误', 'Path can not be empty');
    new _utils2.default.AppServiceEngineKnownError('Path can not be empty');
  }
  return paths;
}
function getObjectByPath(data, pathString) {
  var paths = parsePath(pathString),
      obj,
      curKey,
      curData = data;
  for (var index = 0; index < paths.length; index++) {
    Number(paths[index]) === paths[index] && paths[index] % 1 === 0 // isint
    ? Array.isArray(curData) || (curData = []) : _utils2.default.isPlainObject(curData) || (curData = {});
    curKey = paths[index]; // key
    obj = curData; // parentObj
    curData = curData[paths[index]]; // node value
  }
  return {
    obj: obj,
    key: curKey
  };
}

/***/ }),

/***/ 2082:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _getOwnPropertySymbols = __webpack_require__(7079);

var _getOwnPropertySymbols2 = _interopRequireDefault(_getOwnPropertySymbols);

var _symbol = __webpack_require__(3516);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(8902);

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function indexOf(arr, element) {
  if (toString.call(arr) !== '[object Array]') {
    throw new TypeError('array must be an Array');
  }
  var index = void 0,
      arrLen = void 0,
      cur = void 0;
  for (index = 0, arrLen = arr.length; index < arrLen; ++index) {
    cur = arr[index];
    if (cur === element || cur !== cur && element !== element) {
      return index;
    }
  }
  return -1;
}

var toString = Object.prototype.toString;
var getKeys = typeof _keys2.default === 'function' ? function (obj) {
  return (0, _keys2.default)(obj);
} : function (obj) {
  var type = typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj);
  if (obj === null || type !== 'function' && type !== 'object') {
    throw new TypeError('obj must be an Object');
  }
  var res = [],
      key;
  for (key in obj) {
    Object.prototype.hasOwnProperty.call(obj, key) && res.push(key);
  }
  return res;
};
var getSymbols = typeof _symbol2.default === 'function' ? function (e) {
  return (0, _getOwnPropertySymbols2.default)(e);
} : function () {
  return [];
};

exports["default"] = {
  getKeys: getKeys,
  getSymbols: getSymbols,
  indexOf: indexOf
};
module.exports = exports['default'];

/***/ }),

/***/ 8131:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _defineProperty2 = __webpack_require__(8106);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _propDetect = __webpack_require__(5537);

var _objectAssign = __webpack_require__(7418);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _spin = __webpack_require__(3487);

var _spin2 = _interopRequireDefault(_spin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var body = document.body;

module.exports = {
  show: function show() {
    var overlay = this.overlay = document.createElement('div');
    var middle = document.createElement('div');
    (0, _objectAssign2.default)(middle.style, {
      height: '48px',
      width: '48px'
    });
    overlay.appendChild(middle);
    (0, _objectAssign2.default)(overlay.style, (0, _defineProperty3.default)({
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      zIndex: 9999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0)'
    }, _propDetect.transition, 'background-color 200ms linear'));
    body.appendChild(overlay);
    this.stop = (0, _spin2.default)(middle, {});
    setTimeout(function () {
      overlay.style.backgroundColor = 'rgba(0,0,0,0.3)';
    }, 20);
  },
  hide: function hide() {
    var _this = this;

    this.overlay.style.backgroundColor = 'rgba(0,0,0,0.0)';
    setTimeout(function () {
      _this.stop();
      body.removeChild(_this.overlay);
    });
  }
};

/***/ }),

/***/ 1453:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _promise = __webpack_require__(6593);

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__(5105);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(9135);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3196);

var _inherits3 = _interopRequireDefault(_inherits2);

var _radioComponent = __webpack_require__(2146);

var _radioComponent2 = _interopRequireDefault(_radioComponent);

var _query = __webpack_require__(9804);

var _query2 = _interopRequireDefault(_query);

var _event = __webpack_require__(2962);

var _event2 = _interopRequireDefault(_event);

var _raf = __webpack_require__(3649);

var _raf2 = _interopRequireDefault(_raf);

var _tween = __webpack_require__(302);

var _tween2 = _interopRequireDefault(_tween);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

var _tapEvent = __webpack_require__(2496);

var _tapEvent2 = _interopRequireDefault(_tapEvent);

var _pinchZoom = __webpack_require__(6552);

var _pinchZoom2 = _interopRequireDefault(_pinchZoom);

var _objectAssign = __webpack_require__(7418);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _domify = __webpack_require__(1137);

var _domify2 = _interopRequireDefault(_domify);

var _closest = __webpack_require__(2796);

var _closest2 = _interopRequireDefault(_closest);

var _events = __webpack_require__(1671);

var _events2 = _interopRequireDefault(_events);

var _spin = __webpack_require__(3487);

var _spin2 = _interopRequireDefault(_spin);

var _propDetect = __webpack_require__(5537);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var doc = document;
var body = doc.body;

var ImagesPreview = function (_Emitter) {
  (0, _inherits3.default)(ImagesPreview, _Emitter);

  /**
   * Constructor
   *
   * @public
   * @param {Array|DomCollection} imgs
   * @param {Object} opts
   */
  function ImagesPreview(imgs) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    (0, _classCallCheck3.default)(this, ImagesPreview);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ImagesPreview.__proto__ || (0, _getPrototypeOf2.default)(ImagesPreview)).call(this));

    _this.opts = opts;
    // maximun duration in ms for fast swipe
    _this.threshold = opts.threshold || 200;
    // minimum moved distance for fast swipe
    _this.fastThreshold = opts.fastThreshold || 30;
    _this.imgs = imgs;
    _this._containerTap = (0, _tapEvent2.default)(_this.hide.bind(_this));
    _this.status = [];
    _this.loaded = [];
    _this.tx = 0;
    if (opts.bind !== false) _event2.default.bind(doc, 'touchstart', _this._ontap);
    return _this;
  }
  /**
   * Show container
   *
   * @public
   */


  (0, _createClass3.default)(ImagesPreview, [{
    key: 'show',
    value: function show() {
      var div = this.container = doc.createElement('div');
      div.id = 'images-preview';
      var vw = viewportWidth();
      div.style.width = vw * this.imgs.length + 40 + 'px';
      this.setTransform(-20);
      body.appendChild(div);
      var dots = this.dots = (0, _domify2.default)('<div class="imgs-preview-dots"><ul></ul></div>');
      body.appendChild(dots);
      var ul = (0, _query2.default)('ul', dots);
      var fragment = doc.createDocumentFragment();
      for (var i = 0, l = this.imgs.length; i < l; i++) {
        ul.appendChild(doc.createElement('li'));
        var el = doc.createElement('div');
        el.style.width = vw + 'px';
        var wrapper = doc.createElement('div');
        var src = this.imgs[i];
        wrapper.className = 'wrapper';
        var img = this.createImage(wrapper, src);
        img.style.display = 'block';
        this.positionWrapper(wrapper, img);
        el.appendChild(wrapper);
        fragment.appendChild(el);
      }
      div.appendChild(fragment);
      this.zooms = [];
      this.emit('hide');

      this.events = (0, _events2.default)(div, this);
      this.docEvents = (0, _events2.default)(document, this);
      this.events.bind('touchstart');
      this.events.bind('touchmove');
      this.events.bind('touchend');
      this.docEvents.bind('touchend', 'ontouchend');
      _event2.default.bind(div, 'touchstart', this._containerTap);
      _event2.default.bind(doc, 'touchmove', preventDefault);
    }
  }, {
    key: 'ontouchstart',
    value: function ontouchstart(e) {
      var _this2 = this;

      if (this.animating) this.tween.stop();
      var wrapper = (0, _closest2.default)(e.target, '.wrapper');
      if (e.touches.length > 1 || wrapper) return;
      var t = e.touches[0];
      var sx = t.clientX;
      this.down = { x: sx, at: Date.now() };
      var tx = this.tx;
      var vw = viewportWidth();
      this.move = function (e, touch) {
        var x = tx + touch.clientX - sx;
        x = _this2.limit(x, vw);
        if (isNaN(x)) return;
        _this2.setTransform(x);
      };
    }
  }, {
    key: 'ontouchmove',
    value: function ontouchmove(e) {
      if (e.touches.length > 1 || this.move == null) return;
      e.preventDefault();
      e.stopPropagation();
      var touch = e.touches[0];
      this.move(e, touch);
    }
  }, {
    key: 'ontouchend',
    value: function ontouchend(e) {
      if (this.move == null) return;
      if (this.animating) this.tween.stop();
      var down = this.down;
      this.move = this.down = null;
      var touch = e.changedTouches[0];
      var x = touch.clientX;
      var t = Date.now();
      if (Math.abs(x - down.x) > this.fastThreshold && t - down.at < this.threshold) {
        var dir = down.x > x ? 'left' : 'right';
        this.onswipe(dir);
      } else {
        this.restore();
      }
    }

    /**
     * Active a specfic image
     *
     * @public
     * @param {String} src
     * @param {Number} idx
     */

  }, {
    key: 'active',
    value: function active(src, idx) {
      var _this3 = this;

      idx = idx == null ? this.imgs.indexOf(src) : idx;
      if (idx == -1) return;
      var vw = viewportWidth();
      var state = this.status[idx];
      this.idx = idx;
      var wrapper = this.container.querySelectorAll('.wrapper')[idx];
      (0, _radioComponent2.default)(this.dots.querySelectorAll('li')[idx]);
      this.emit('active', idx);
      var tx = idx * vw;
      this.setTransform(-tx - 20);
      // not loaded
      if (!state) {
        this.status[idx] = 'loading';
        var image = this.createImage(wrapper, src);
        image.style.display = 'block';

        var pz = this.pz = new _pinchZoom2.default(wrapper, {
          threshold: this.threshold,
          fastThreshold: this.fastThreshold,
          padding: 5,
          tapreset: false,
          draggable: true,
          maxScale: 4
        });
        pz.on('swipe', this.onswipe.bind(this));
        pz.on('move', function (dx) {
          var x = -20 - tx - dx;
          x = _this3.limit(x, vw);
          _this3.setTransform(x);
        });
        // pz.on('tap', this.hide.bind(this))
        pz.on('end', this.restore.bind(this));
        this.zooms.push(pz);
        this.loadImage(image, wrapper).then(function () {
          _this3.loaded.push(idx);
        }, function () {});
      }
    }
  }, {
    key: 'onswipe',
    value: function onswipe(dir) {
      var _this4 = this;

      var vw = viewportWidth();
      var i = dir == 'left' ? this.idx + 1 : this.idx - 1;
      i = Math.max(0, i);
      i = Math.min(this.imgs.length - 1, i);
      this.animate(-i * vw - 20).then(function () {
        if (i == _this4.idx) return;
        var src = _this4.imgs[i];
        _this4.active(src, i);
      });
    }
  }, {
    key: 'limit',
    value: function limit(x, vw) {
      x = Math.min(0, x);
      x = Math.max(-40 - (this.imgs.length - 1) * vw, x);
      return x;
    }
    /**
     * Restore container transform to sane position
     *
     * @private
     */

  }, {
    key: 'restore',
    value: function restore() {
      var _this5 = this;

      var vw = viewportWidth();
      var idx = Math.round((-this.tx - 20) / vw);
      this.animate(-idx * vw - 20).then(function () {
        if (idx == _this5.idx) return;
        var src = _this5.imgs[idx];
        _this5.active(src, idx);
      });
    }
    /**
     * Load image inside wrapper
     *
     * @private
     * @param {Element} image
     * @param {Element} wrapper
     */

  }, {
    key: 'loadImage',
    value: function loadImage(image, wrapper) {
      var _this6 = this;

      if (image.complete) {
        this.positionWrapper(wrapper, image);
        return this.positionHolder(wrapper, image.src, false).then(function () {
          image.style.display = 'block';
        });
      } else {
        return this.positionHolder(wrapper).then(function () {
          image.style.display = 'block';
          var spinEl = (0, _domify2.default)('<div class="spin"></div>');
          if (wrapper.clientHeight > _this6.container.clientHeight) {
            spinEl.style.top = _this6.container.clientHeight / 2 + 'px';
          }
          wrapper.appendChild(spinEl);
          var stop = (0, _spin2.default)(spinEl, {
            color: '#ffffff',
            duration: 1000,
            width: 4
          });
          var self = _this6;
          return new _promise2.default(function (resolve, reject) {
            function onload() {
              stop();
              if (spinEl.parentNode) wrapper.removeChild(spinEl);
              self.positionWrapper(wrapper, image);
              resolve();
            }
            if (image.complete) return onload();
            image.onload = onload;
            image.onerror = function (e) {
              stop();
              reject(e);
            };
          });
        });
      }
    }
  }, {
    key: 'positionWrapper',
    value: function positionWrapper(wrapper, image) {
      var vw = Math.max(doc.documentElement.clientWidth, window.innerWidth || 0);
      var dims = imgDimension(image);
      var h = (vw - 10) * dims.height / dims.width;
      var top = Math.min(this.container.clientHeight - 10, h) / 2;

      (0, _objectAssign2.default)(wrapper.style, {
        left: '5px',
        width: vw - 10 + 'px',
        height: h + 'px',
        marginTop: '-' + top + 'px'
      });
    }
  }, {
    key: 'createImage',
    value: function createImage(wrapper, src) {
      var img = (0, _query2.default)('.image', wrapper);
      if (img) return img;
      img = doc.createElement('img');
      img.className = 'image';
      img.src = src;
      wrapper.appendChild(img);
      return img;
    }
    /**
     * Set translateX of container
     *
     * @private
     * @param {Number} x
     */

  }, {
    key: 'setTransform',
    value: function setTransform(x) {
      var el = this.container;
      this.tx = x;
      if (_propDetect.has3d) {
        el.style[_propDetect.transform] = 'translate3d(' + x + 'px,0,0)';
      } else {
        el.style[_propDetect.transform] = 'translate(' + x + 'px)';
      }
    }
    /**
     * Animate container for active image
     *
     * @private
     * @param {Number} x
     * @param {Number} duration = 200
     * @param {String} ease = 'out-circ'
     * @returns {Promise}
     */

  }, {
    key: 'animate',
    value: function animate(x) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
      var ease = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'out-circ';

      if (x == this.tx) return _promise2.default.resolve(null);
      this.animating = true;
      var tween = this.tween = (0, _tween2.default)({ x: this.tx }).ease(ease).to({ x: x }).duration(duration);

      tween.update(function (o) {
        self.setTransform(o.x);
      });
      var self = this;
      var promise = new _promise2.default(function (resolve) {
        tween.on('end', function () {
          animate = function animate() {}; // eslint-disable-line
          self.animating = false;
          resolve();
        });
      });

      function animate() {
        (0, _raf2.default)(animate);
        tween.update();
      }

      animate();
      return promise;
    }
    /**
     * Animate holder to match wrapper
     *
     * @private
     * @param {Element} wrapper
     * @param {String} src optional new src
     * @returns {undefined}
     */

  }, {
    key: 'positionHolder',
    value: function positionHolder(wrapper, src) {
      var opacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var el = this.holder;
      if (!el) return _promise2.default.resolve(null);
      if (src) el.style.backgroundImage = 'url(\'' + src + '\')';
      var tween = (0, _tween2.default)({
        width: parseInt(el.style.width, 10),
        height: parseInt(el.style.height, 10),
        left: parseInt(el.style.left, 10),
        top: parseInt(el.style.top, 10),
        opacity: 0.3
      }).ease('out-cube').to({
        width: parseInt(wrapper.style.width, 10),
        height: parseInt(wrapper.style.height, 10),
        left: parseInt(wrapper.style.left, 10),
        top: this.container.clientHeight / 2 + parseInt(wrapper.style.marginTop, 10),
        opacity: 1
      }).duration(300);

      tween.update(function (o) {
        var n = opacity ? o.opacity : 1;
        (0, _objectAssign2.default)(el.style, {
          width: o.width + 'px',
          height: o.height + 'px',
          left: o.left + 'px',
          top: o.top + 'px',
          opacity: n
        });
      });

      var self = this;
      var promise = new _promise2.default(function (resolve) {
        tween.on('end', function () {
          if (el.parentNode) el.parentNode.removeChild(el);
          self.holder = null;
          animate = function animate() {}; // eslint-disable-line
          resolve();
        });
      });

      function animate() {
        (0, _raf2.default)(animate);
        tween.update();
      }

      animate();
      return promise;
    }
    /**
     * hide container and unbind events
     *
     * @public
     */

  }, {
    key: 'hide',
    value: function hide() {
      if (this.dots) body.removeChild(this.dots);
      this.zooms.forEach(function (pz) {
        pz.unbind();
      });
      this.zooms = [];
      this.status = [];
      this.container.style.backgroundColor = 'rgba(0,0,0,0)';
      this.emit('hide');
      body.removeChild(this.container);
      this.unbind();
    }
    /**
     * unbind tap event
     *
     * @public
     */

  }, {
    key: 'unbind',
    value: function unbind() {
      this.docEvents.unbind();
      this.events.unbind();
      if (this.pz) this.pz.unbind();
      _event2.default.unbind(this.container, 'touchstart', this._containerTap);
      _event2.default.unbind(doc, 'touchmove', preventDefault);
    }
  }]);
  return ImagesPreview;
}(_emitter2.default);

function imgDimension(image) {
  if (image.naturalWidth) {
    return {
      height: image.naturalHeight,
      width: image.naturalWidth
    };
  } else {
    var i = new Image();
    i.src = image.src;
    return {
      height: i.height,
      width: i.width
    };
  }
}

function viewportWidth() {
  return Math.max(doc.documentElement.clientWidth, window.innerWidth || 0);
}

function preventDefault(e) {
  e.preventDefault();
}
exports["default"] = ImagesPreview;
module.exports = exports['default'];

/***/ }),

/***/ 3487:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

exports["default"] = function (node, opts) {
  opts = opts || [];
  var ctx = createCtx(node);
  var h = node.clientHeight || 32;
  var w = node.clientWidth || 32;
  var duration = opts.duration || 1000;
  var color = opts.color || '#ffffff';
  var rgb = torgb(color);
  var x = h / 2;
  var y = w / 2;
  var r = Math.min(h, w) / 2 - 4;
  var stop = void 0;
  var start = void 0;
  function step(timestamp) {
    ctx.clearRect(0, 0, w, h);
    if (stop) return;
    if (!start) start = timestamp;
    if (!node.parentNode) stop = true;
    var ts = (timestamp - start) % duration;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.4)';
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.lineWidth = opts.width || 4;
    ctx.lineCap = 'round';
    ctx.stroke();
    var a = -Math.PI / 2 + Math.PI * 2 * ts / duration;
    var e = a + Math.PI / 2;
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 1)';
    ctx.arc(x, y, r, a, e);
    ctx.stroke();
    (0, _raf2.default)(step);
  }
  (0, _raf2.default)(step);
  return function () {
    stop = true;
  };
};

var _autoscaleCanvas = __webpack_require__(8940);

var _autoscaleCanvas2 = _interopRequireDefault(_autoscaleCanvas);

var _raf = __webpack_require__(3649);

var _raf2 = _interopRequireDefault(_raf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCtx(node) {
  var canvas = document.createElement('canvas');
  node.appendChild(canvas);
  var rect = node.getBoundingClientRect();
  var ctx = canvas.getContext('2d');
  canvas.height = rect.height;
  canvas.width = rect.width;
  (0, _autoscaleCanvas2.default)(canvas);
  return ctx;
}

var hex_reg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
function torgb(hex) {
  if (hex.length == 4) {
    hex = hex.replace(/[^#]/g, function (p) {
      return p + p;
    });
  }
  var result = hex_reg.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

module.exports = exports['default'];

/***/ }),

/***/ 1899:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _assign = __webpack_require__(2945);

var _assign2 = _interopRequireDefault(_assign);

var _actionsheet = __webpack_require__(8049);

var _actionsheet2 = _interopRequireDefault(_actionsheet);

var _index = __webpack_require__(5235);

var _index2 = _interopRequireDefault(_index);

var _storage = __webpack_require__(1657);

var _storage2 = _interopRequireDefault(_storage);

var _toast = __webpack_require__(6870);

var _toast2 = _interopRequireDefault(_toast);

var _util = __webpack_require__(525);

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bus = util.getBus();

Bus.on('back', function () {
  var curr = _index2.default.currentView();
  _index2.default.navigateBack();
});
var win = window.__wxConfig__['window'];
var header = {
  dom: null,
  init: function init() {
    this.state = {
      backgroundColor: win.navigationBarBackgroundColor,
      color: win.navigationBarTextStyle,
      title: win.navigationBarTitleText,
      loading: false,
      // 各个字段代表的含义，和被更改的时机？（因为默认页面并不是“返回”二字）
      backText: '返回',
      back: false,
      sendText: false
    };
    if (!this.dom) {
      this.dom = {
        // 所以此处其实就可以利用类似web-component标签 <dapp-xxx>，本质一样
        head: this.$('.jshook-ws-head'),
        headBack: this.$('.jshook-ws-head-back'),
        headBackText: this.$('.jshook-ws-head-back-text'),
        headHome: this.$('.jshook-ws-head-home'),
        headTitle: this.$('.jshook-ws-head-title'),
        headOption: this.$('.jshook-ws-head-option')
      };
      this.dom.headBackSpan = this.dom.headBack.querySelector('span');
      this.dom.headTitleSpan = this.dom.headTitle.querySelector('span');
      this.dom.headBackI = this.dom.headBack.querySelector('i');
      this.dom.headHomeI = this.dom.headHome.querySelector('i');
      this.dom.headTitleI = this.dom.headTitle.querySelector('i');

      // header中三个核心按钮的点击事件“置空”
      this.dom.headBack.onclick = this.onBack.bind(null);
      this.dom.headHome.onclick = this.onHome.bind(null);
      this.dom.headOption.onclick = this.onOptions.bind(null);
    }
    // 让整个header由不显示转为显示
    this.dom.head.style.display = 'block';
    // xxx?
    Bus.on('route', this.reset.bind(this));
    // xxx?
    this.setState();
  },
  $: function $(name) {
    return document.querySelector(name);
  },
  reset: function reset() {
    var d = {
      backgroundColor: win.navigationBarBackgroundColor,
      color: win.navigationBarTextStyle,
      title: win.navigationBarTitleText,
      loading: false,
      back: false
    };
    var curr = _index2.default.currentView();

    var winConfig = win.pages[curr.path] || {};
    var tabBar = window.__wxConfig__.tabBar;

    var top = tabBar && tabBar.position == 'top';
    var hide = top && util.isTabbar(curr.url);
    if (curr.isMap) {
      this.setState({
        hide: false,
        backgroundColor: 'rgb(0, 0, 0)',
        color: '#ffffff',
        title: '位置',
        loading: false,
        backText: '取消',
        sendText: true
      });
    } else {
      this.setState({
        hide: hide,
        backgroundColor: winConfig.navigationBarBackgroundColor || d.backgroundColor,
        color: winConfig.navigationBarTextStyle || d.color,
        title: winConfig.navigationBarTitleText || d.title,
        loading: false,
        backText: '返回',
        sendText: false,
        back: curr.pid != null
      });
    }
  },
  onBack: function onBack(e, send) {
    e.preventDefault();
    Bus.emit('back', send);
  },
  onSend: function onSend(e) {
    // TODO send location
    e.stopPropagation();
    var data = (0, _assign2.default)({}, _index2.default.currentView().location);
    this.onBack(e, true);
    Bus.emit('location', data);
  },
  onOptions: function onOptions(e) {
    e.preventDefault();
    (0, _actionsheet2.default)({
      refresh: {
        text: '回主页',
        callback: function callback() {
          window.sessionStorage.removeItem('routes');
          util.navigateHome();
        }
      },
      clear: {
        text: '清除数据缓存',
        callback: function callback() {
          if (window.localStorage != null) {
            _storage2.default.clear();
            _toast2.default.show({ title: '数据缓存已清除', icon: 'success' });
          }
        }
      },
      cancel: {
        text: '取消'
      }
    }).then(function () {
      header.sheetShown = true;
    });
  },
  setTitle: function setTitle(title) {
    this.dom.headTitleSpan.innerHTML = title;
  },
  showLoading: function showLoading() {
    this.dom.headTitleI.style.display = 'inline-block';
  },
  hideLoading: function hideLoading() {
    this.dom.headTitleI.style.display = 'none';
  },
  onHome: function onHome() {
    util.navigateHome();
  },
  setNavigationBarColor: function setNavigationBarColor(style) {
    // insert keyframes
    // https://stackoverflow.com/questions/18481550/how-to-dynamically-create-keyframe-css-animations
    // https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet/insertRule
    var styleEl = document.createElement('style'),
        addKeyFrames = null;
    document.head.appendChild(styleEl);
    var styleSheet = styleEl.sheet;
    if (CSS && CSS.supports && CSS.supports('animation: name')) {
      // we can safely assume that the browser supports unprefixed version.
      addKeyFrames = function addKeyFrames(name, frames) {
        var pos = styleSheet.cssRules.length;
        styleSheet.insertRule('@keyframes ' + name + '{' + frames + '}', pos);
      };
    } else {
      addKeyFrames = function addKeyFrames(name, frames) {
        // Ugly and terrible, but users with this terrible of a browser
        // *cough* IE *cough* don't deserve a fast site
        var str = name + '{' + frames + '}',
            pos = styleSheet.cssRules.length;
        styleSheet.insertRule('@-webkit-keyframes ' + str, pos);
        styleSheet.insertRule('@keyframes ' + str, pos + 1);
      };
    }

    var timingFuncMapping = {
      linear: 'linear',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out'
    };
    if (style.animation) {
      console.log(this.state.backgroundColor, style.backgroundColor);
      addKeyFrames('bgcAnimation', '0% {background-color: ' + this.state.backgroundColor + '} 100% {background-color: ' + style.backgroundColor);
      this.dom.head.style.animation = 'bgcAnimation ' + (style.animation.duration || 0) + 'ms ' + (timingFuncMapping[style.animation.timingFunc] || 'linear') + ' forwards';
    } else {
      this.dom.head.style.backgroundColor = style.backgroundColor;
    }
    this.state.backgroundColor = style.backgroundColor;
  },
  setState: function setState(data) {
    if (data) (0, _assign2.default)(this.state, data);
    var state = this.state;
    this.dom.head.style.backgroundColor = state.backgroundColor;
    this.dom.head.style.display = state.hide ? 'none' : 'flex';
    this.dom.headBack.style.display = state.back ? 'flex' : 'none';
    this.dom.headBackSpan.style.color = state.color;
    this.dom.headTitle.style.color = state.color;
    this.dom.headBackSpan.innerHTML = state.backText;
    this.dom.headTitleSpan.innerHTML = state.title;
    this.dom.headBackI.style.display = !state.sendText ? 'inline-block' : 'none';
    this.dom.headTitleI.style.display = state.loading ? 'inline-block' : 'none';
    this.dom.headBackI.style.borderLeft = '1px solid ' + state.color;
    this.dom.headBackI.style.borderBottom = '1px solid ' + state.color;
    this.dom.headHome.style.display = state.back ? 'none' : 'flex';
    this.dom.headHomeI.className = state.color == 'white' ? 'head-home-icon white' : 'head-home-icon';
    this.dom.headHomeI.style.display = state.back ? 'none' : 'flex';
    if (state.sendText) {
      this.dom.headOption.innerHTML = '<div>发送</div>';
      this.dom.headOption.querySelector('div').onclick = this.onSend.bind(this);
    } else {
      this.dom.headOption.innerHTML = '<i class="head-option-icon' + (state.color == 'white' ? ' white' : '') + '"></i>';
    }
  }
};
exports["default"] = header;
module.exports = exports['default'];

/***/ }),

/***/ 5678:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.Recorder = undefined;

var _assign = __webpack_require__(2945);

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inlineWorker = __webpack_require__(854);

var _inlineWorker2 = _interopRequireDefault(_inlineWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Recorder = exports.Recorder = function () {
  function Recorder(source, cfg) {
    var _this = this;

    (0, _classCallCheck3.default)(this, Recorder);
    this.config = {
      bufferLen: 4096,
      numChannels: 2,
      mimeType: 'audio/wav'
    };
    this.recording = false;
    this.callbacks = {
      getBuffer: [],
      exportWAV: []
    };

    (0, _assign2.default)(this.config, cfg);
    this.context = source.context;
    this.node = (this.context.createScriptProcessor || this.context.createJavaScriptNode).call(this.context, this.config.bufferLen, this.config.numChannels, this.config.numChannels);

    this.node.onaudioprocess = function (e) {
      if (!_this.recording) return;

      var buffer = [];
      for (var channel = 0; channel < _this.config.numChannels; channel++) {
        buffer.push(e.inputBuffer.getChannelData(channel));
      }
      _this.worker.postMessage({
        command: 'record',
        buffer: buffer
      });
    };

    source.connect(this.node);
    this.node.connect(this.context.destination); // this should not be necessary

    var self = {};
    this.worker = new _inlineWorker2.default(function () {
      var recLength = 0,
          recBuffers = [],
          sampleRate = void 0,
          numChannels = void 0;

      this.onmessage = function (e) {
        switch (e.data.command) {
          case 'init':
            init(e.data.config);
            break;
          case 'record':
            record(e.data.buffer);
            break;
          case 'exportWAV':
            exportWAV(e.data.type);
            break;
          case 'getBuffer':
            getBuffer();
            break;
          case 'clear':
            clear();
            break;
        }
      };

      function init(config) {
        sampleRate = config.sampleRate;
        numChannels = config.numChannels;
        initBuffers();
      }

      function record(inputBuffer) {
        for (var channel = 0; channel < numChannels; channel++) {
          recBuffers[channel].push(inputBuffer[channel]);
        }
        recLength += inputBuffer[0].length;
      }

      function exportWAV(type) {
        var buffers = [];
        for (var channel = 0; channel < numChannels; channel++) {
          buffers.push(mergeBuffers(recBuffers[channel], recLength));
        }
        var interleaved = void 0;
        if (numChannels === 2) {
          interleaved = interleave(buffers[0], buffers[1]);
        } else {
          interleaved = buffers[0];
        }
        var dataview = encodeWAV(interleaved);
        var audioBlob = new Blob([dataview], { type: type });

        this.postMessage({ command: 'exportWAV', data: audioBlob });
      }

      function getBuffer() {
        var buffers = [];
        for (var channel = 0; channel < numChannels; channel++) {
          buffers.push(mergeBuffers(recBuffers[channel], recLength));
        }
        this.postMessage({ command: 'getBuffer', data: buffers });
      }

      function clear() {
        recLength = 0;
        recBuffers = [];
        initBuffers();
      }

      function initBuffers() {
        for (var channel = 0; channel < numChannels; channel++) {
          recBuffers[channel] = [];
        }
      }

      function mergeBuffers(recBuffers, recLength) {
        var result = new Float32Array(recLength);
        var offset = 0;
        for (var i = 0; i < recBuffers.length; i++) {
          result.set(recBuffers[i], offset);
          offset += recBuffers[i].length;
        }
        return result;
      }

      function interleave(inputL, inputR) {
        var length = inputL.length + inputR.length;
        var result = new Float32Array(length);

        var index = 0,
            inputIndex = 0;

        while (index < length) {
          result[index++] = inputL[inputIndex];
          result[index++] = inputR[inputIndex];
          inputIndex++;
        }
        return result;
      }

      function floatTo16BitPCM(output, offset, input) {
        for (var i = 0; i < input.length; i++, offset += 2) {
          var s = Math.max(-1, Math.min(1, input[i]));
          output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
        }
      }

      function writeString(view, offset, string) {
        for (var i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      }

      function encodeWAV(samples) {
        var buffer = new ArrayBuffer(44 + samples.length * 2);
        var view = new DataView(buffer);

        /* RIFF identifier */
        writeString(view, 0, 'RIFF');
        /* RIFF chunk length */
        view.setUint32(4, 36 + samples.length * 2, true);
        /* RIFF type */
        writeString(view, 8, 'WAVE');
        /* format chunk identifier */
        writeString(view, 12, 'fmt ');
        /* format chunk length */
        view.setUint32(16, 16, true);
        /* sample format (raw) */
        view.setUint16(20, 1, true);
        /* channel count */
        view.setUint16(22, numChannels, true);
        /* sample rate */
        view.setUint32(24, sampleRate, true);
        /* byte rate (sample rate * block align) */
        view.setUint32(28, sampleRate * 4, true);
        /* block align (channel count * bytes per sample) */
        view.setUint16(32, numChannels * 2, true);
        /* bits per sample */
        view.setUint16(34, 16, true);
        /* data chunk identifier */
        writeString(view, 36, 'data');
        /* data chunk length */
        view.setUint32(40, samples.length * 2, true);

        floatTo16BitPCM(view, 44, samples);

        return view;
      }
    }, self);

    this.worker.postMessage({
      command: 'init',
      config: {
        sampleRate: this.context.sampleRate,
        numChannels: this.config.numChannels
      }
    });

    this.worker.onmessage = function (e) {
      var cb = _this.callbacks[e.data.command].pop();
      if (typeof cb === 'function') {
        cb(e.data.data);
      }
    };
  }

  (0, _createClass3.default)(Recorder, [{
    key: 'record',
    value: function record() {
      this.recording = true;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.recording = false;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.worker.postMessage({ command: 'clear' });
    }
  }, {
    key: 'getBuffer',
    value: function getBuffer(cb) {
      cb = cb || this.config.callback;
      if (!cb) throw new Error('Callback not set');

      this.callbacks.getBuffer.push(cb);

      this.worker.postMessage({ command: 'getBuffer' });
    }
  }, {
    key: 'exportWAV',
    value: function exportWAV(cb, mimeType) {
      mimeType = mimeType || this.config.mimeType;
      cb = cb || this.config.callback;
      if (!cb) throw new Error('Callback not set');

      this.callbacks.exportWAV.push(cb);

      this.worker.postMessage({
        command: 'exportWAV',
        type: mimeType
      });
    }
  }], [{
    key: 'forceDownload',
    value: function forceDownload(blob, filename) {
      var url = (window.URL || window.webkitURL).createObjectURL(blob);
      var link = window.document.createElement('a');
      link.href = url;
      link.download = filename || 'output.wav';
      var click = document.createEvent('Event');
      click.initEvent('click', true, true);
      link.dispatchEvent(click);
    }
  }]);
  return Recorder;
}();

exports["default"] = Recorder;

/***/ }),

/***/ 8937:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _promise = __webpack_require__(6593);

var _promise2 = _interopRequireDefault(_promise);

exports["default"] = function (_ref) {
  var itemList = _ref.itemList,
      _ref$itemColor = _ref.itemColor,
      itemColor = _ref$itemColor === undefined ? '#000000' : _ref$itemColor;

  if (el && el.parentNode) el.parentNode.removeChild(el);

  el = (0, _domify2.default)(fn({ itemList: itemList, itemColor: itemColor }));
  setTimeout(function () {
    // 必须延迟一些，要不然会立即触发click
    document.body.appendChild(el);
  }, 100);
  var called = false;
  return new _promise2.default(function (resolve) {
    el.addEventListener('click', function (e) {
      if (called) return;
      if ((0, _classes2.default)(e.target).has('wx-action-sheet-mask')) {
        called = true;
        resolve({ cancel: true });
      } else if ((0, _classes2.default)(e.target).has('wx-action-sheet-item')) {
        called = true;
        resolve({
          cancel: false,
          tapIndex: Number(e.target.getAttribute('data-index'))
        });
      } else if ((0, _classes2.default)(e.target).has('wx-action-sheet-cancel')) {
        called = true;
        resolve({ cancel: true });
      }
      if (called && el && el.parentNode) el.parentNode.removeChild(el);
    }, false);
  });
};

var _etImprove = __webpack_require__(2905);

var _etImprove2 = _interopRequireDefault(_etImprove);

var _domify = __webpack_require__(1137);

var _domify2 = _interopRequireDefault(_domify);

var _classes = __webpack_require__(2809);

var _classes2 = _interopRequireDefault(_classes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tmpl = '\n<div>\n  <div class="wx-action-sheet-mask"></div>\n  <div class="wx-action-sheet wx-action-sheet-show">\n    <div class="wx-action-sheet-menu">\n      {{each _.itemList as item, index}}\n      <div class="wx-action-sheet-item" data-index="{{= index}}" style="color: {{= _.itemColor}};">{{= item}}</div>\n      {{/}}\n      <div class="wx-action-sheet-item-cancel">\n      <div class="wx-action-sheet-middle"></div>\n      <div class="wx-action-sheet-cancel" style="color: rgb(0, 0, 0);">\u53D6\u6D88</div>\n      </div>\n    </div>\n  </div>\n</div>\n';
var fn = _etImprove2.default.compile(tmpl);

var el = null;

module.exports = exports['default'];

/***/ }),

/***/ 276:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _promise = __webpack_require__(6593);

var _promise2 = _interopRequireDefault(_promise);

exports["default"] = api;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// send XMR request to server
var request = __webpack_require__(6200);

function api(_ref) {
  var _ref$method = _ref.method,
      method = _ref$method === undefined ? 'get' : _ref$method,
      _ref$headers = _ref.headers,
      headers = _ref$headers === undefined ? {} : _ref$headers,
      url = _ref.url,
      _ref$data = _ref.data,
      data = _ref$data === undefined ? null : _ref$data,
      _ref$query = _ref.query,
      query = _ref$query === undefined ? {} : _ref$query;

  return new _promise2.default(function (resolve, reject) {
    var req = request(method, url);
    req.accept('json').type('json');
    req.query(query);
    if (data) req.send(data);

    for (var key in headers) {
      req.set(key, headers[key]);
    }
    req.end(function (res) {
      if (res.ok) return resolve(res.body);
      reject(new Error(res.text));
    });
  });
}
module.exports = exports['default'];

/***/ }),

/***/ 8827:
/***/ ((module) => {

"use strict";


;(function (e) {
  'use strict';

  var t = function t(_t) {
    return _t != null || _t != e;
  },
      n = function n(e, t) {
    var n = i._callbacks[e];
    for (var r = 0; r < n.length; r++) {
      n[r].apply(window, t);
    }
  },
      r = function r(e) {
    var t = 0;
    for (var n = e.length - 1; n > e.length - 6; n--) {
      t += e[n];
    }return t / 5;
  },
      i = module.exports = {
    method: e,
    watch: function watch(e) {
      var t = ++i._lastId;
      return i.init(function (n) {
        if (n == 'phonegap') i._watchers[t] = i._nav.compass.watchHeading(e);else if (n == 'webkitOrientation') {
          var r = function r(t) {
            e(t.webkitCompassHeading);
          };
          i._win.addEventListener('deviceorientation', r), i._watchers[t] = r;
        } else if (n == 'orientationAndGPS') {
          var s,
              d = function d(t) {
            ;s = -t.alpha + i._gpsDiff, s < 0 ? s += 360 : s > 360 && (s -= 360), e(s);
          };
          i._win.addEventListener('deviceorientation', d), i._watchers[t] = d;
        }
      }), t;
    },
    unwatch: function unwatch(e) {
      return i.init(function (t) {
        t == 'phonegap' ? i._nav.compass.clearWatch(i._watchers[e]) : (t == 'webkitOrientation' || t == 'orientationAndGPS') && i._win.removeEventListener('deviceorientation', i._watchers[e]), delete i._watchers[e];
      }), i;
    },
    needGPS: function needGPS(e) {
      return i._callbacks.needGPS.push(e), i;
    },
    needMove: function needMove(e) {
      return i._callbacks.needMove.push(e), i;
    },
    noSupport: function noSupport(e) {
      return i.method === !1 ? e() : t(i.method) || i._callbacks.noSupport.push(e), i;
    },
    init: function init(e) {
      if (t(i.method)) {
        e(i.method);
        return;
      }
      i._callbacks.init.push(e);
      if (i._initing) return;
      return i._initing = !0, i._nav.compass ? i._start('phonegap') : i._win.DeviceOrientationEvent ? (i._checking = 0, i._win.addEventListener('deviceorientation', i._checkEvent), setTimeout(function () {
        i._checking !== !1 && i._start(!1);
      }, 500)) : i._start(!1), i;
    },
    _lastId: 0,
    _watchers: {},
    _win: window,
    _nav: navigator,
    _callbacks: {
      init: [],
      noSupport: [],
      needGPS: [],
      needMove: []
    },
    _initing: !1,
    _gpsDiff: e,
    _start: function _start(e) {
      ;i.method = e, i._initing = !1, n('init', [e]), i._callbacks.init = [], e === !1 && n('noSupport', []), i._callbacks.noSupport = [];
    },
    _checking: !1,
    _checkEvent: function _checkEvent(e) {
      i._checking += 1;
      var n = !1;
      t(e.webkitCompassHeading) ? i._start('webkitOrientation') : t(e.alpha) && i._nav.geolocation ? i._gpsHack() : i._checking > 1 ? i._start(!1) : n = !0, n || (i._checking = !1, i._win.removeEventListener('deviceorientation', i._checkEvent));
    },
    _gpsHack: function _gpsHack() {
      var e = !0,
          s = [],
          o = [];
      n('needGPS');
      var u = function u(e) {
        s.push(e.alpha);
      };
      i._win.addEventListener('deviceorientation', u);
      var a = function a(_a) {
        var f = _a.coords;
        if (!t(f.heading)) return;
        e && (e = !1, n('needMove')), f.speed > 1 ? (o.push(f.heading), o.length >= 5 && s.length >= 5 && (i._win.removeEventListener('deviceorientation', u), i._nav.geolocation.clearWatch(l), i._gpsDiff = r(o) + r(s), i._start('orientationAndGPS'))) : o = [];
      },
          f = function f() {
        i._win.removeEventListener('deviceorientation', u), i._start(!1);
      },
          l = i._nav.geolocation.watchPosition(a, f, {
        enableHighAccuracy: !0
      });
    }
  };
})();

/***/ }),

/***/ 9676:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _from = __webpack_require__(4043);

var _from2 = _interopRequireDefault(_from);

var _getPrototypeOf = __webpack_require__(5105);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(9135);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3196);

var _inherits3 = _interopRequireDefault(_inherits2);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

var _domify = __webpack_require__(1137);

var _domify2 = _interopRequireDefault(_domify);

var _events = __webpack_require__(1671);

var _events2 = _interopRequireDefault(_events);

var _scrollable = __webpack_require__(3666);

var _scrollable2 = _interopRequireDefault(_scrollable);

var _picker = __webpack_require__(3277);

var _picker2 = _interopRequireDefault(_picker);

var _util = __webpack_require__(525);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = function (_Emitter) {
  (0, _inherits3.default)(DatePicker, _Emitter);

  function DatePicker(opts) {
    (0, _classCallCheck3.default)(this, DatePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || (0, _getPrototypeOf2.default)(DatePicker)).call(this));

    _this.opts = opts;
    _this.root = document.createElement('div');
    document.body.appendChild(_this.root);
    _this.events = (0, _events2.default)(_this.root, _this);
    _this.events.bind('click .cancel', 'cancel');
    _this.events.bind('click .confirm', 'confirm');
    var r = opts.range;
    _this.sy = Number(r.start.split('-')[0]);
    _this.ey = Number(r.end.split('-')[0]);
    return _this;
  }

  (0, _createClass3.default)(DatePicker, [{
    key: 'show',
    value: function show() {
      var _this2 = this;

      this.root.appendChild((0, _domify2.default)('<div class="wx-picker-mask"></div>'));
      var group = [];
      group.push((0, _util.range)(this.ey, this.sy).map(function (o) {
        return { text: o + '\u5E74', value: o };
      }));
      group.push((0, _util.range)(12, 1).map(function (o) {
        return { text: o + '\u6708', value: o };
      }));
      group.push((0, _util.range)(31, 1).map(function (o) {
        return { text: o + '\u65E5', value: o };
      }));
      console.log(group);
      var el = (0, _domify2.default)((0, _picker2.default)({ group: group }));
      this.root.appendChild(el);

      var ps = (0, _from2.default)(this.root.querySelectorAll('.wx-picker-content'));
      var curr = this.getCurrent();
      this.scrollables = ps.map(function (el, i) {
        var s = new _scrollable2.default(el, curr[i]);
        s.on('end', function () {
          _this2.checkValue(s, s.currentValue());
        });
        return s;
      });
    }
  }, {
    key: 'checkValue',
    value: function checkValue(s, value) {
      // TODO validate value
    }
  }, {
    key: 'getCurrent',
    value: function getCurrent() {
      var str = this.opts.current;
      var parts = str.split('-');
      return [Number(parts[0]) - this.sy, Number(parts[1]) - 1, Number(parts[2]) - 1];
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.events.unbind();
      this.scrollables.forEach(function (s) {
        s.unbind();
      });
      document.body.removeChild(this.root);
    }
  }, {
    key: 'cancel',
    value: function cancel(e) {
      e.preventDefault();
      this.hide();
      this.emit('cancel');
    }
  }, {
    key: 'confirm',
    value: function confirm(e) {
      e.preventDefault();
      var vals = this.scrollables.map(function (s) {
        return s.currentValue();
      });
      this.hide();
      this.emit('select', vals.join('-'));
    }
  }]);
  return DatePicker;
}(_emitter2.default);

exports["default"] = DatePicker;
module.exports = exports['default'];

/***/ }),

/***/ 7858:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getFileList = getFileList;
exports.getFileInfo = getFileInfo;
exports.removeFile = removeFile;

var _api = __webpack_require__(276);

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFileList() {
  return (0, _api2.default)({
    url: '/fileList'
  });
}

function getFileInfo(filePath) {
  return (0, _api2.default)({
    url: '/fileInfo',
    query: { filePath: filePath }
  });
}

function removeFile(filePath) {
  return (0, _api2.default)({
    method: 'post',
    url: '/removeFile',
    query: { filePath: filePath }
  });
}

/***/ }),

/***/ 7643:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _promise = __webpack_require__(6593);

var _promise2 = _interopRequireDefault(_promise);

exports["default"] = function (src) {
  var img = document.createElement('img');
  img.src = src;
  if (img.complete) return _promise2.default.resolve(imgDimension(img));
  return new _promise2.default(function (resolve, reject) {
    img.onload = function () {
      resolve(imgDimension(img));
    };
    img.onerror = function (e) {
      reject(e);
    };
  });
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function imgDimension(image) {
  if (image.naturalWidth) {
    return {
      height: image.naturalHeight,
      width: image.naturalWidth
    };
  } else {
    var i = new Image();
    i.src = image.currentSrc || image.src;
    return {
      height: i.height,
      width: i.width
    };
  }
}
module.exports = exports['default'];

/***/ }),

/***/ 854:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var WORKER_ENABLED = !!(__webpack_require__.g === __webpack_require__.g.window && __webpack_require__.g.URL && __webpack_require__.g.Blob && __webpack_require__.g.Worker);

function InlineWorker(func, self) {
  var _this = this;
  var functionBody;

  self = self || {};

  if (WORKER_ENABLED) {
    functionBody = func.toString().trim().match(/^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/)[1];

    return new __webpack_require__.g.Worker(__webpack_require__.g.URL.createObjectURL(new __webpack_require__.g.Blob([functionBody], { type: 'text/javascript' })));
  }

  function postMessage(data) {
    setTimeout(function () {
      _this.onmessage({ data: data });
    }, 0);
  }

  this.self = self;
  this.self.postMessage = postMessage;

  setTimeout(func.bind(self, self), 0);
}

InlineWorker.prototype.postMessage = function postMessage(data) {
  var _this = this;

  setTimeout(function () {
    _this.self.onmessage({ data: data });
  }, 0);
};

module.exports = InlineWorker;

/***/ }),

/***/ 3813:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = Mask;

var _objectAssign = __webpack_require__(7418);

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mask() {
  var el = document.createElement('div');
  el.className = 'mask';
  (0, _objectAssign2.default)(el.style, {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 999
  });
  document.body.appendChild(el);
  return function () {
    if (el.parentNode) document.body.removeChild(el);
  };
}
module.exports = exports['default'];

/***/ }),

/***/ 5444:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _promise = __webpack_require__(6593);

var _promise2 = _interopRequireDefault(_promise);

exports["default"] = function (_ref) {
  var _ref$title = _ref.title,
      title = _ref$title === undefined ? '' : _ref$title,
      _ref$content = _ref.content,
      content = _ref$content === undefined ? '' : _ref$content,
      imgUrl = _ref.imgUrl,
      _ref$showCancel = _ref.showCancel,
      showCancel = _ref$showCancel === undefined ? true : _ref$showCancel,
      _ref$cancelText = _ref.cancelText,
      cancelText = _ref$cancelText === undefined ? '取消' : _ref$cancelText,
      _ref$cancelColor = _ref.cancelColor,
      cancelColor = _ref$cancelColor === undefined ? '#000000' : _ref$cancelColor,
      _ref$confirmText = _ref.confirmText,
      confirmText = _ref$confirmText === undefined ? '确定' : _ref$confirmText,
      _ref$confirmColor = _ref.confirmColor,
      confirmColor = _ref$confirmColor === undefined ? '#3CC51F' : _ref$confirmColor;

  var called = false;
  var createModal = function createModal(imgUrl, title, content, showCancel, cancelText, cancelColor, confirmText, confirmColor) {
    el = (0, _domify2.default)(fn({
      imgUrl: imgUrl,
      title: title,
      content: content,
      showCancel: showCancel,
      cancelText: cancelText,
      cancelColor: cancelColor,
      confirmText: confirmText,
      confirmColor: confirmColor
    }));
    document.body.appendChild(el);
    called = false;
  };
  if (el && el.parentNode) {
    closeCallback = function closeCallback() {
      createModal(imgUrl, title, content, showCancel, cancelText, cancelColor, confirmText, confirmColor);
    };
    // el.parentNode.removeChild(el)
  } else {
    createModal(imgUrl, title, content, showCancel, cancelText, cancelColor, confirmText, confirmColor);
  }
  return new _promise2.default(function (resolve) {
    el.addEventListener('click', function (e) {
      if (called) return;else if (this != el) {
        el.addEventListener('click', function (e) {
          if (called) return;
          if ((0, _classes2.default)(e.target).has('confirm-btn')) {
            called = true;
            resolve(true);
          } else if ((0, _classes2.default)(e.target).has('cancel-btn')) {
            called = true;
            resolve(false);
          }
          if (called && el && el.parentNode) el.parentNode.removeChild(el);
        });
        return;
      }
      if ((0, _classes2.default)(e.target).has('confirm-btn')) {
        called = true;
        resolve(true);
      } else if ((0, _classes2.default)(e.target).has('cancel-btn')) {
        called = true;
        resolve(false);
      }
      if (called && el && el.parentNode) el.parentNode.removeChild(el);
      if (closeCallback) {
        closeCallback();
        closeCallback = null;
      }
    }, false);
  });
};

var _etImprove = __webpack_require__(2905);

var _etImprove2 = _interopRequireDefault(_etImprove);

var _domify = __webpack_require__(1137);

var _domify2 = _interopRequireDefault(_domify);

var _classes = __webpack_require__(2809);

var _classes2 = _interopRequireDefault(_classes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tmpl = '\n<div class="wx-modal">\n  <div class="wx-modal-mask"></div>\n  <div class="wx-modal-dialog">\n    <div class="wx-modal-dialog-hd">\n      <strong>{{= _.title}}</strong>\n    </div>\n    <div class="wx-modal-dialog-bd">\n      {{if _.imgUrl}}\n        <img src="{{= _.imgurl}}" class="wx-modal-dialog-img"/>\n      {{/}}\n      {{= _.content}}\n    </div>\n    <div class="wx-modal-dialog-ft">\n    {{if _.showCancel}}\n        <a class="wx-modal-btn-default cancel-btn" style="color: {{=_.cancelColor}};">{{= _.cancelText}}</a>\n    {{/}}\n    <a class="wx-modal-btn-primary confirm-btn" style="color: {{= _.confirmColor}};">{{= _.confirmText}}</a></div>\n  </div>\n</div>\n';
var fn = _etImprove2.default.compile(tmpl);

var el = null;
var closeCallback = null;

module.exports = exports['default'];

/***/ }),

/***/ 2641:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _getPrototypeOf = __webpack_require__(5105);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(9135);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3196);

var _inherits3 = _interopRequireDefault(_inherits2);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

var _domify = __webpack_require__(1137);

var _domify2 = _interopRequireDefault(_domify);

var _events = __webpack_require__(1671);

var _events2 = _interopRequireDefault(_events);

var _scrollable = __webpack_require__(3666);

var _scrollable2 = _interopRequireDefault(_scrollable);

var _picker = __webpack_require__(3277);

var _picker2 = _interopRequireDefault(_picker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Picker = function (_Emitter) {
  (0, _inherits3.default)(Picker, _Emitter);

  function Picker(opts) {
    (0, _classCallCheck3.default)(this, Picker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Picker.__proto__ || (0, _getPrototypeOf2.default)(Picker)).call(this));

    _this.opts = opts;
    _this.root = document.createElement('div');
    document.body.appendChild(_this.root);
    _this.events = (0, _events2.default)(_this.root, _this);
    _this.events.bind('click .cancel', 'cancel');
    _this.events.bind('click .confirm', 'confirm');
    return _this;
  }

  (0, _createClass3.default)(Picker, [{
    key: 'show',
    value: function show() {
      this.root.appendChild((0, _domify2.default)('<div class="wx-picker-mask"></div>'));
      var items = this.opts.array.map(function (text) {
        return { text: text, value: text };
      });
      var el = (0, _domify2.default)((0, _picker2.default)({ group: [items] }));
      this.root.appendChild(el);
      var container = this.root.querySelector('.wx-picker-content');
      this.scrollable = new _scrollable2.default(container, this.opts.current);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.events.unbind();
      this.scrollable.unbind();
      document.body.removeChild(this.root);
    }
  }, {
    key: 'cancel',
    value: function cancel(e) {
      e.preventDefault();
      this.hide();
      this.emit('cancel');
    }
  }, {
    key: 'confirm',
    value: function confirm(e) {
      var index = this.scrollable.current();
      e.preventDefault();
      this.hide();
      this.emit('select', index);
    }
  }]);
  return Picker;
}(_emitter2.default);

exports["default"] = Picker;
module.exports = exports['default'];

/***/ }),

/***/ 2434:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _promise = __webpack_require__(6593);

var _promise2 = _interopRequireDefault(_promise);

var _Recorder = __webpack_require__(5678);

var _Recorder2 = _interopRequireDefault(_Recorder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global Recorder */
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = window.AudioContext && new AudioContext();
var audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var analyserNode;

function initAudio() {
  if (!navigator.getUserMedia) {
    navigator.getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  }
  return new _promise2.default(function (resolve, reject) {
    if (audioRecorder) return resolve();
    navigator.getUserMedia({
      audio: {
        mandatory: {
          googEchoCancellation: 'false',
          googAutoGainControl: 'false',
          googNoiseSuppression: 'false',
          googHighpassFilter: 'false'
        },
        optional: []
      }
    }, function (stream) {
      inputPoint = audioContext.createGain();
      // Create an AudioNode from the stream.
      realAudioInput = audioContext.createMediaStreamSource(stream);
      audioInput = realAudioInput;
      audioInput.connect(inputPoint);
      // audioInput = convertToMono( input );
      analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 2048;
      inputPoint.connect(analyserNode);

      audioRecorder = new _Recorder2.default(inputPoint);

      var zeroGain = audioContext.createGain();
      zeroGain.gain.value = 0.0;
      inputPoint.connect(zeroGain);
      zeroGain.connect(audioContext.destination);
      resolve();
    }, function (e) {
      reject(e);
    });
  });
}

function emptyFn() {}

var recording = false;

exports["default"] = {
  startRecord: function startRecord(o) {
    var _this = this;

    var fail = o.fail || emptyFn;
    if (!window.AudioContext) {
      fail(new Error('No audio API detected'));
      return _promise2.default.reject();
    }
    return initAudio().then(function () {
      _this.success = o.success;
      _this.stopRecord().then(function () {
        recording = true;
        audioRecorder.clear();
        audioRecorder.record();
      });
      setTimeout(function () {
        _this.stopRecord();
      }, 60000);
    }, fail);
  },
  stopRecord: function stopRecord() {
    var _this2 = this;

    if (!recording) return _promise2.default.resolve(null);
    recording = false;
    audioRecorder.stop();
    return new _promise2.default(function (resolve) {
      audioRecorder.exportWAV(function (blob) {
        var url = (window.URL || window.webkitURL).createObjectURL(blob);
        if (_this2.success) _this2.success(url);
        resolve(url);
      });
    });
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 3666:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _promise = __webpack_require__(6593);

var _promise2 = _interopRequireDefault(_promise);

var _getPrototypeOf = __webpack_require__(5105);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(9135);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3196);

var _inherits3 = _interopRequireDefault(_inherits2);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

var _tween = __webpack_require__(302);

var _tween2 = _interopRequireDefault(_tween);

var _raf = __webpack_require__(3649);

var _raf2 = _interopRequireDefault(_raf);

var _events = __webpack_require__(1671);

var _events2 = _interopRequireDefault(_events);

var _propDetect = __webpack_require__(5537);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scrollable = function (_Emitter) {
  (0, _inherits3.default)(Scrollable, _Emitter);

  function Scrollable(root, curr) {
    (0, _classCallCheck3.default)(this, Scrollable);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Scrollable.__proto__ || (0, _getPrototypeOf2.default)(Scrollable)).call(this));

    if (root.firstElementChild) {
      _this.el = root;
      _this.touchAction('none');
      _this.itemHeight = root.firstElementChild.clientHeight;
      _this.events = (0, _events2.default)(root.parentNode.querySelector('.wx-picker-mask2'), _this);
      _this.events.bind('touchstart');
      _this.events.bind('touchmove');
      _this.events.bind('touchend');
      _this.docEvents = (0, _events2.default)(document, _this);
      _this.docEvents.bind('touchend');
      _this.maxY = _this.itemHeight * 3;
      _this.minY = (4 - root.children.length) * _this.itemHeight;
      var n = 3 - (curr || 0);
      _this.translate(n * _this.itemHeight);
    }
    return _this;
  }

  (0, _createClass3.default)(Scrollable, [{
    key: 'current',
    value: function current() {
      return 3 - Math.floor(this.y / this.itemHeight);
    }
  }, {
    key: 'currentValue',
    value: function currentValue() {
      var n = this.current();
      var el = this.el.children[n];
      return el.getAttribute('data-value');
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      if (!this.el) return;
      this.events.unbind();
      this.docEvents.unbind();
    }
  }, {
    key: 'ontouchstart',
    value: function ontouchstart(e) {
      if (this.tween) this.tween.stop();
      e.preventDefault();
      var touch = this.getTouch(e);
      this.down = {
        sy: this.y,
        x: touch.clientX,
        y: touch.clientY,
        at: Date.now()
      };
    }
  }, {
    key: 'ontouchmove',
    value: function ontouchmove(e) {
      if (!this.down || this.tween) return;
      e.preventDefault();
      var touch = this.getTouch(e);
      var y = touch.clientY;
      var down = this.down;
      var dy = y - down.y;
      var dest = down.sy + dy;
      this.translate(dest);
    }
  }, {
    key: 'ontouchend',
    value: function ontouchend(e) {
      if (!this.down) return;
      this.down = null;
      e.preventDefault();
      var n = Math.round(this.y / this.itemHeight);
      this.select(n);
    }
  }, {
    key: 'select',
    value: function select(index) {
      var y = index * this.itemHeight;
      this.scrollTo(y, 200, 'inQuad');
    }
    /**
     * Scroll to potions y with optional duration and ease function
     *
     * @param {Number} y
     * @param {Number} duration
     * @param {String} easing
     * @api public
     */

  }, {
    key: 'scrollTo',
    value: function scrollTo(y, duration, easing) {
      var _this2 = this;

      if (this.tween) this.tween.stop();
      var transition = duration > 0 && y !== this.y;
      if (!transition) {
        this.direction = 0;
        this.translate(y);
        return;
      }

      this.direction = y > this.y ? -1 : 1;

      easing = easing || 'out-circ';
      var tween = this.tween = (0, _tween2.default)({
        y: this.y
      }).ease(easing).to({
        y: y
      }).duration(duration);

      var self = this;
      tween.update(function (o) {
        self.translate(o.y);
      });
      var promise = new _promise2.default(function (resolve) {
        tween.on('end', function () {
          _this2.emit('end');
          resolve();
          self.tween = null;
          self.animating = false;
          animate = function animate() {}; // eslint-disable-line
        });
      });

      function animate() {
        (0, _raf2.default)(animate);
        tween.update();
      }

      animate();
      this.animating = true;
      return promise;
    }
  }, {
    key: 'getTouch',
    value: function getTouch(e) {
      // "mouse" and "Pointer" events just use the event object itself
      var touch = e;
      if (e.changedTouches && e.changedTouches.length > 0) {
        // W3C "touch" events use the `changedTouches` array
        touch = e.changedTouches[0];
      }
      return touch;
    }

    /**
     * Translate to `y`.
     *
     *
     * @api private
     */

  }, {
    key: 'translate',
    value: function translate(y) {
      var s = this.el.style;
      if (isNaN(y)) return;
      y = Math.min(y, this.maxY);
      y = Math.max(y, this.minY);
      this.y = y;
      s[_propDetect.transform] = 'translate3d(0, ' + y + 'px, 0)';
    }
    /**
     * Sets the "touchAction" CSS style property to `value`.
     *
     * @api private
     */

  }, {
    key: 'touchAction',
    value: function touchAction(value) {
      var s = this.el.style;
      if (_propDetect.touchAction) {
        s[_propDetect.touchAction] = value;
      }
    }
  }]);
  return Scrollable;
}(_emitter2.default);

exports["default"] = Scrollable;
module.exports = exports['default'];

/***/ }),

/***/ 1657:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _keys = __webpack_require__(8902);

var _keys2 = _interopRequireDefault(_keys);

var _stringify = __webpack_require__(3239);

var _stringify2 = _interopRequireDefault(_stringify);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 5MB
var LIMIT_SIZE = 5 * 1024;

var directory = '__weweb__storage__';

function currentSize() {
  var total = 0;
  for (var x in localStorage) {
    var amount = localStorage[x].length * 2 / 1024;
    total += amount;
  }
  return Math.ceil(total);
}

function getType(key) {
  var str = localStorage.getItem(directory + '_type');
  if (!str) return;
  var obj = JSON.parse(str);
  return obj[key];
}

function getTypes() {
  var str = localStorage.getItem(directory + '_type');
  if (!str) return {};
  return JSON.parse(str);
}

var storage = {
  set: function set(key, value, dataType) {
    if (window.localStorage == null) {
      return console.error('localStorage not supported');
    }
    var str = localStorage.getItem(directory);
    var obj = void 0;
    obj = str ? JSON.parse(str) : {};
    obj[key] = value;
    localStorage.setItem(directory, (0, _stringify2.default)(obj));
    var types = getTypes();
    types[key] = dataType;
    localStorage.setItem(directory + '_type', (0, _stringify2.default)(types));
    this.emit('change');
  },
  get: function get(key) {
    if (window.localStorage == null) {
      return console.error('localStorage not supported');
    }
    var str = localStorage.getItem(directory);
    var obj = void 0;
    obj = str ? JSON.parse(str) : {};
    return {
      data: obj[key],
      dataType: getType(key)
    };
  },
  remove: function remove(key) {
    if (window.localStorage == null) {
      return console.error('localStorage not supported');
    }
    var str = localStorage.getItem(directory);
    if (!str) return;
    var obj = JSON.parse(str);
    var data = obj[key];
    delete obj[key];
    localStorage.setItem(directory, (0, _stringify2.default)(obj));
    var types = getTypes();
    delete types[key];
    localStorage.setItem(directory + '_type', (0, _stringify2.default)(types));
    this.emit('change');
    return data;
  },
  clear: function clear() {
    if (window.localStorage == null) {
      return console.error('localStorage not supported');
    }
    localStorage.removeItem(directory);
    localStorage.removeItem(directory + '_type');
    this.emit('change');
  },
  getAll: function getAll() {
    if (window.localStorage == null) {
      return console.error('localStorage not supported');
    }
    var str = localStorage.getItem(directory);
    var obj = str ? JSON.parse(str) : {};
    var res = {};
    (0, _keys2.default)(obj).forEach(function (key) {
      res[key] = {
        data: obj[key],
        dataType: getType(key)
      };
    });
    return res;
  },
  info: function info() {
    if (window.localStorage == null) {
      return console.error('localStorage not supported');
    }
    var str = localStorage.getItem(directory);
    var obj = str ? JSON.parse(str) : {};
    return {
      keys: (0, _keys2.default)(obj),
      limitSize: LIMIT_SIZE,
      currentSize: currentSize()
    };
  }
};

(0, _emitter2.default)(storage);

exports["default"] = storage;
module.exports = exports['default'];

/***/ }),

/***/ 202:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _from = __webpack_require__(4043);

var _from2 = _interopRequireDefault(_from);

var _getPrototypeOf = __webpack_require__(5105);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(9135);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3196);

var _inherits3 = _interopRequireDefault(_inherits2);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

var _domify = __webpack_require__(1137);

var _domify2 = _interopRequireDefault(_domify);

var _events = __webpack_require__(1671);

var _events2 = _interopRequireDefault(_events);

var _scrollable = __webpack_require__(3666);

var _scrollable2 = _interopRequireDefault(_scrollable);

var _picker = __webpack_require__(3277);

var _picker2 = _interopRequireDefault(_picker);

var _util = __webpack_require__(525);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimePicker = function (_Emitter) {
  (0, _inherits3.default)(TimePicker, _Emitter);

  function TimePicker(opts) {
    (0, _classCallCheck3.default)(this, TimePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TimePicker.__proto__ || (0, _getPrototypeOf2.default)(TimePicker)).call(this));

    _this.opts = opts;
    _this.root = document.createElement('div');
    document.body.appendChild(_this.root);
    _this.events = (0, _events2.default)(_this.root, _this);
    _this.events.bind('click .cancel', 'cancel');
    _this.events.bind('click .confirm', 'confirm');
    return _this;
  }

  (0, _createClass3.default)(TimePicker, [{
    key: 'show',
    value: function show() {
      var _this2 = this;

      this.root.appendChild((0, _domify2.default)('<div class="wx-picker-mask"></div>'));
      var group = [];
      group.push((0, _util.range)(23, 0).map(function (o) {
        return { text: o, value: o };
      }));
      group.push((0, _util.range)(59, 0).map(function (o) {
        return { text: o, value: o };
      }));
      var el = (0, _domify2.default)((0, _picker2.default)({ group: group }));
      this.root.appendChild(el);

      var ps = (0, _from2.default)(this.root.querySelectorAll('.wx-picker-content'));
      var curr = this.getCurrent();
      this.scrollables = ps.map(function (el, i) {
        var s = new _scrollable2.default(el, curr[i]);
        s.on('end', function () {
          _this2.checkValue(s, s.currentValue());
        });
        return s;
      });
    }
  }, {
    key: 'checkValue',
    value: function checkValue(s, value) {
      // TODO validate value
    }
  }, {
    key: 'getCurrent',
    value: function getCurrent() {
      var str = this.opts.current;
      var parts = str.split(':');
      return [Number(parts[0]), Number(parts[1])];
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.events.unbind();
      this.scrollables.forEach(function (s) {
        s.unbind();
      });
      document.body.removeChild(this.root);
    }
  }, {
    key: 'cancel',
    value: function cancel(e) {
      e.preventDefault();
      this.hide();
      this.emit('cancel');
    }
  }, {
    key: 'confirm',
    value: function confirm(e) {
      e.preventDefault();
      var vals = this.scrollables.map(function (s) {
        return s.currentValue();
      });
      this.hide();
      this.emit('select', vals.join(':'));
    }
  }]);
  return TimePicker;
}(_emitter2.default);

exports["default"] = TimePicker;
module.exports = exports['default'];

/***/ }),

/***/ 6870:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _etImprove = __webpack_require__(2905);

var _etImprove2 = _interopRequireDefault(_etImprove);

var _domify = __webpack_require__(1137);

var _domify2 = _interopRequireDefault(_domify);

var _mask = __webpack_require__(3813);

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tmpl = '\n<div>\n  <div class="wx-toast-mask"></div>\n  <div class="wx-toast">\n    {{if _.icon}}\n      <i class="wx-toast-icon wx-icon-{{= _.icon}}" style="font-size: 55px; color: rgb(255, 255, 255);display: block;">\n    {{/}}\n    </i><p class="wx-toast-content">{{= _.title}}</p>\n  </div>\n</div>\n';
var fn = _etImprove2.default.compile(tmpl);
var hideMask = null;

exports["default"] = {
  show: function show(_ref) {
    var _this = this;

    var _ref$duration = _ref.duration,
        duration = _ref$duration === undefined ? 1500 : _ref$duration,
        icon = _ref.icon,
        title = _ref.title,
        mask = _ref.mask;

    this.hide();
    duration = Math.min(duration, 10000);
    var el = (0, _domify2.default)(fn({
      title: title,
      icon: icon
    }));
    this.el = el;
    document.body.appendChild(el);
    if (mask) {
      hideMask = (0, _mask2.default)();
    }
    this.timeout = setTimeout(function () {
      if (el.parentNode) document.body.removeChild(el);
      if (hideMask) hideMask();
      _this.el = null;
    }, duration);
  },
  hide: function hide() {
    window.clearTimeout(this.timeout);
    if (hideMask) hideMask();
    if (this.el) {
      this.el.parentNode.removeChild(this.el);
      this.el = null;
    }
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 8475:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _assign = __webpack_require__(2945);

var _assign2 = _interopRequireDefault(_assign);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

var _index = __webpack_require__(5235);

var _index2 = _interopRequireDefault(_index);

var _util = __webpack_require__(525);

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bus = util.getBus();
var tabBar = (0, _assign2.default)({}, {
  color: '#7A7E83',
  selectedColor: '#3cc51f',
  borderStyle: 'black',
  backgroundColor: '#ffffff'
}, window.__wxConfig__.tabBar);

var Tabbar = {
  init: function init() {
    this.activeIdx = 0;
    this.scrollable = document.querySelector('.scrollable');
    this.tabbar = document.querySelector('.jshook-ws-tabbar');
    if (!this.tabbar) return;
    var self = this;
    this.tabbarItems = this.tabbar.querySelectorAll('.jshook-ws-tabbar-item');[].forEach.call(this.tabbarItems, function (item, i) {
      item.addEventListener('touchstart', self.onItemTap.bind(self, i, item));
    });
  },
  reset: function reset() {
    var p = _index2.default.currentView().path;
    this.select(p);
  },
  show: function show(path) {
    if (!this.tabbar) return;
    var p = path.replace(/\?(.*)$/, '').replace(/\.wxml$/, '');
    this.select(p);
  },
  select: function select(path) {
    var list = tabBar.list || [];
    this.activeIdx = -1;
    for (var i in list) {
      if (list[i].pagePath === path) {
        this.activeIdx = i;
      }
    }
    // this.activeIdx = (list || []).findIndex(item => item.pagePath === path)
    this.doUpdate();
  },
  onItemTap: function onItemTap(idx, elemt) {
    if (idx == this.activeIdx) return;
    var item = void 0,
        list = tabBar.list || [];
    for (var i in list) {
      if (i == idx) {
        item = list[i];
      }
    }
    /*
     let item = tabBar.list.find((item, index) => {
      return idx == index
    })
    */
    this.activeIdx = idx;
    // this.doUpdate();
    var curr = _index2.default.currentView();
    if (curr && curr.url == item.pagePath) return;
    _index2.default.switchTab(item.pagePath);
  },
  doUpdate: function doUpdate() {
    var active = this.activeIdx;
    var hidden = active == -1 || active == null;
    var top = tabBar.position == 'top';
    if (hidden || top) {
      this.scrollable.style.bottom = '0px';
    } else {
      this.scrollable.style.bottom = '56px';
    }
    if (top && active != -1) {
      this.scrollable.style.top = '47px';
    } else {
      this.scrollable.style.top = '42px';
    }
    if (this.tabbar) {
      this.tabbar.style.display = hidden ? 'none' : 'flex';[].forEach.call(this.tabbarItems, function (item, idx) {
        // var idx = item.getAttribute('key');
        var iconDom = item.querySelector('.tabbar-icon');
        var iDom = item.querySelector('.tabbar-label-indicator');
        var labelDom = item.querySelector('.tabbar-label');
        // fix tabbar no iconPath bug
        if (iconDom && !iconDom.getAttribute('src')) {
          iconDom.style.display = 'none';
        }
        if (active == idx) {
          if (!top) {
            iconDom && (iconDom.src = iconDom.getAttribute('select-icon'));
          } else {
            iDom.style.color = tabBar.selectedColor;
            iDom.style.display = 'inline-block';
          }
          labelDom.style.color = tabBar.selectedColor;
        } else {
          if (!top) {
            iconDom && (iconDom.src = iconDom.getAttribute('icon'));
          } else {
            iDom.style.color = tabBar.color;
            iDom.style.display = 'none';
          }
          labelDom.style.color = tabBar.color;
        }
      });
    }
  }
};

(0, _emitter2.default)(Tabbar);

Bus.on('route', function (curr) {
  Tabbar.show(curr.url);
});
exports["default"] = Tabbar;
module.exports = exports['default'];

/***/ }),

/***/ 525:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.uid = uid;
exports.getBus = getBus;
exports.once = once;
exports.normalize = normalize;
exports.createFrame = createFrame;
exports.createWebview = createWebview;
exports.updateWebView = updateWebView;
exports.parsePath = parsePath;
exports.validPath = validPath;
exports.isTabbar = isTabbar;
exports.reload = reload;
exports.navigateHome = navigateHome;
exports.dataURItoBlob = dataURItoBlob;
exports.range = range;
exports.toNumber = toNumber;

var _querystring = __webpack_require__(1434);

var _querystring2 = _interopRequireDefault(_querystring);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bus = null;

var id = 0;
function uid() {
  return id++;
}

function getBus() {
  if (!Bus) {
    Bus = new _emitter2.default();
  }
  return Bus;
}

function once(el, name, listener) {
  var fn = function fn(e) {
    el.removeEventListener(name, fn, false);
    listener.call(el, e);
  };
  el.addEventListener(name, fn, false);
}

function normalize(p) {
  return p.replace(/\.html/, '').replace(/^\.?\//, '');
}

function createFrame(id, src, hidden) {
  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document.body;

  var el = document.createElement('iframe');
  el.setAttribute('src', src);
  el.setAttribute('id', id);
  el.setAttribute('seamless', 'seamless');
  el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-modals');
  el.setAttribute('frameborder', '0');
  el.setAttribute('width', hidden ? '0' : '100%');
  el.setAttribute('height', hidden ? '0' : '100%');
  if (hidden) {
    el.setAttribute('style', 'width:0;height:0;border:0; display:none;');
  }
  parent.appendChild(el);
  return el;
}

function createWebview(id) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

  var el = document.createElement('iframe');
  var hidden = true;
  // el.setAttribute('src', src) // 即没有src的iframe就是一个webview
  el.setAttribute('id', id);
  el.setAttribute('seamless', 'seamless');
  el.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-modals');
  el.setAttribute('frameborder', '0');
  el.setAttribute('width', hidden ? '0' : '100%');
  el.setAttribute('height', hidden ? '0' : '100%');
  if (hidden) {
    el.setAttribute('style', 'width:0;height:0;border:0; display:none;');
  }
  parent.appendChild(el);
  return el;
}

function updateWebView(id, src) {
  var el = document.querySelector('#' + id);
  var hidden = false;
  el.setAttribute('src', src);
  // el.setAttribute('id', id)
  // el.setAttribute('seamless', 'seamless')
  // el.setAttribute(
  //   'sandbox',
  //   'allow-scripts allow-same-origin allow-forms allow-modals'
  // )
  // el.setAttribute('frameborder', '0')
  el.setAttribute('width', hidden ? '0' : '100%');
  el.setAttribute('height', hidden ? '0' : '100%');
  // if (hidden) {
  //   el.setAttribute('style', 'width:0;height:0;border:0; display:none;')
  // }
  el.setAttribute('style', '');
  return el;
}

function parsePath(path) {
  var parts = path.split(/\?/);
  return {
    path: parts[0],
    query: _querystring2.default.parse(parts[1])
  };
}

function validPath(p) {
  // 是否是有效页面地址
  var pages = window.__wxConfig__.pages;

  var _parsePath = parsePath(p),
      path = _parsePath.path;

  return pages.indexOf(path) !== -1;
}

function isTabbar(url) {
  var list = window.__wxConfig__.tabBar && window.__wxConfig__.tabBar.list;
  if (!list) return;
  var pages = list.map(function (o) {
    return o.pagePath;
  });
  return pages.indexOf(url) !== -1;
}

function reload() {
  location.reload();
}

function navigateHome() {
  var home = location.protocol + '//' + location.host + location.pathname;
  if (typeof location.replace === 'function') {
    location.replace(home);
  } else if (typeof history.replaceState === 'function') {
    window.history.replaceState({}, '', home);
    location.reload();
  } else {
    location.hash = '#';
    location.reload();
  }
}

function dataURItoBlob(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var bb = new Blob([ab], { type: mimeString });
  return URL.createObjectURL(bb);
}

function range(n) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var suffix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var arr = [];
  for (var i = start; i <= n; i++) {
    arr.push(i < 10 ? '0' + i + suffix : '' + i + suffix);
  }
  return arr;
}

function toNumber(arr) {
  if (Array.isArray(arr)) return arr.map(function (n) {
    return Number(n);
  });
  if (typeof arr === 'string') return Number(arr);
  return arr;
}

/***/ }),

/***/ 5235:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _keys = __webpack_require__(8902);

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = __webpack_require__(6378);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

exports.lifeSycleEvent = lifeSycleEvent;

var _util = __webpack_require__(525);

var util = _interopRequireWildcard(_util);

var _view = __webpack_require__(8310);

var _view2 = _interopRequireDefault(_view);

var _mask = __webpack_require__(8131);

var _mask2 = _interopRequireDefault(_mask);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bus = util.getBus(); /**
                          * Created by pengguanfa on 2017/8/31.
                          */


var curr = null;
var views = {};
var tabViews = {};
if (!window.__wxConfig) {
  Object.defineProperty(window, '__wxConfig', {
    get: function get() {
      return curr ? curr.getConfig() : __wxConfig__;
    }
  });
  Object.defineProperty(window, '__curPage__', {
    get: function get() {
      return curr;
    },
    set: function set(obj) {
      curr[obj.name] = obj.value;
    }
  });
  window.addEventListener('message', function (event) {
    // 处理地图相关通讯
    var data = event.data || {};
    if ((typeof data === 'undefined' ? 'undefined' : (0, _typeof3.default)(data)) === 'object' && (data.module === 'geolocation' || data.module === 'locationPicker')) {
      if (data.module == 'geolocation') {
        data = {
          module: 'locationPicker',
          latlng: {
            lat: data.lat,
            lng: data.lng
          },
          poiaddress: '' + data.province + data.city,
          poiname: data.addr,
          cityname: data.city
        };
      }
      curr.setLocation(data);
    }
  });
}

function lifeSycleEvent(path, query, openType) {
  toAppService({
    msg: {
      eventName: 'onAppRoute',
      data: {
        path: path + '.wxml',
        query: query,
        openType: openType
      }
    }
  });
}

function toAppService(obj) {
  var id = curr ? curr.id : 0;
  var msg = obj.msg || {};
  ServiceJSBridge.subscribeHandler(msg.eventName, msg.data || {}, id);
}

function getRoutes() {
  var root = window.__root__;
  var path = location.hash.replace(/^#!/, '');
  var result = path ? [path] : [root];
  if (sessionStorage) {
    var routesStr = sessionStorage.getItem('weweb_routes');
    if (routesStr) {
      var routes = routesStr.split('|');
      if (routes.indexOf(path) === routes.length - 1) {
        result = routes;
      }
    }
  }
  return result;
}

function onRoute() {
  // 改变地址栏
  var home = location.protocol + '//' + location.host + location.pathname;
  if (typeof history.replaceState === 'function') {
    history.replaceState({}, '', home + '#!' + curr.url);
  }
  Bus.emit('route', curr); // tabbar状态变化
  var arr = [];
  var view = curr;
  while (view) {
    arr.push(view.url);
    if (view.pid != null) {
      view = views[view.pid];
    } else {
      view = null;
    }
  }
  var str = arr.reverse().join('|');
  sessionStorage.setItem('weweb_routes', str);
}

function onBack() {
  if (!curr.external) {
    lifeSycleEvent(curr.path, curr.query, 'navigateBack');
  }
}

function onNavigate(url) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'navigateTo';

  if (!url) throw new Error('url not found');
  if (type == 'reLaunch' && util.isTabbar(curr.path) && curr.query) {
    console.error('wx.reLaunch 跳转到 tabbar 页面时不允许携带参数，请去除参数或使用 wx.switchTab');
    return;
  }
  curr.onReady(function () {
    lifeSycleEvent(curr.path, curr.query, type);
  });
}

var router = {
  onLaunch: function onLaunch() {
    //eslint-disable-line
    var routes = getRoutes();
    var first = routes.shift();
    var valid = util.validPath(first);
    // make sure root is valid page
    var root = valid ? first : window.__root__;
    this.navigateTo(root, true); // 页面切换，路由表更新

    if (!valid) {
      console.warn('Invalid route: ' + first + ', redirect to root');
      return;
    }
    if (routes.length) {
      _mask2.default.show();
      var cid = curr.id;
      Bus.once('ready', function (id) {
        _mask2.default.hide();
        if (id !== cid) return;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = (0, _getIterator3.default)(routes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var route = _step.value;

            // 为路由表中的页面注册ready事件
            // check if in pages
            valid = util.validPath(route);
            if (!valid) {
              console.warn('\u65E0\u6CD5\u5728 pages \u914D\u7F6E\u4E2D\u627E\u5230 ' + route + '\uFF0C\u505C\u6B62\u8DEF\u7531');
              break;
            }
            toAppService({
              msg: {
                eventName: 'custom_event_INVOKE_METHOD',
                data: {
                  data: {
                    name: 'navigateTo',
                    args: {
                      url: '/' + route
                    }
                  }
                }
              }
            });
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    }
  },
  redirectTo: function redirectTo(path) {
    path = util.normalize(path);
    if (!curr) throw new Error('Current view not exists');
    var pid = curr.pid;
    curr.destroy();
    delete views[curr.id];
    var v = curr = new _view2.default(path);
    curr.pid = pid;
    views[curr.id] = v;
    onRoute();
    onNavigate(path, 'redirectTo');
  },
  navigateTo: function navigateTo(path, isLaunch) {
    path = util.normalize(path);
    var exists = tabViews[path];
    if (curr) curr.hide();
    if (exists && exists.__DOMTree__) {
      curr = exists;
      exists.show();
    } else {
      var isTabView = util.isTabbar(path);
      var pid = curr ? curr.id : null;
      var v = curr = new _view2.default(path);
      curr.pid = isTabView ? null : pid;
      views[v.id] = v;
      if (isTabView) tabViews[path] = curr;
    }
    onRoute();
    if (isLaunch) {
      onNavigate(path, 'appLaunch');
    } else {
      onNavigate(path, 'navigateTo');
    }
  },
  reLaunch: function reLaunch(path) {
    sessionStorage.clear();
    path = util.normalize(path);
    var exists = tabViews[path];
    if (curr) curr.hide();
    if (exists && exists.__DOMTree__) {
      curr = exists;
      exists.show();
    } else {
      var isTabView = util.isTabbar(path);
      var v = curr = new _view2.default(path);
      curr.pid = null;
      views = [];
      views[v.id] = v;
      if (isTabView) tabViews[path] = curr;
    }
    onRoute();
    onNavigate(path, 'reLaunch');
  },
  switchTab: function switchTab(path) {
    path = util.normalize(path);
    if (util.isTabbar(curr.path)) curr.hide();
    var exists = tabViews[path];
    (0, _keys2.default)(views).forEach(function (key) {
      var view = views[key];
      if (!util.isTabbar(view.path)) {
        view.destroy();
        delete views[key];
      }
    });
    if (exists && exists.__DOMTree__) {
      curr = exists;
      exists.show();
    } else {
      var isTabView = util.isTabbar(path);
      var pid = curr ? curr.id : null;
      var v = curr = new _view2.default(path);
      curr.pid = isTabView ? null : pid;
      views[v.id] = v;
      if (isTabView) tabViews[path] = curr;
      // return Toast(`无法找到存在的 ${path} 页面`, {type: 'error'})
    }
    onRoute();
    onNavigate(path, 'switchTab');
  },
  navigateBack: function navigateBack() {
    var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    if (!curr) throw new Error('Current page not exists');
    if (curr.pid == null) return;
    for (var i = delta; i > 0; i--) {
      if (curr.pid == null) break;
      curr.destroy();
      delete views[curr.id];
      curr = views[curr.pid];
      onBack();
    }
    curr.show();
    onRoute();
    onNavigate(curr.path, 'navigateBack');
  },
  openExternal: function openExternal(url) {
    console.log('openExternal start!!!');
    if (curr) curr.hide();
    var pid = curr ? curr.id : null;
    var v = curr = new _view2.default(url);
    views[v.id] = v;
    v.pid = pid;
    v.show();
    onRoute();
  },
  currentView: function currentView() {
    return curr;
  },
  getViewById: function getViewById(id) {
    return views[id];
  },
  getViewIds: function getViewIds() {
    var ids = (0, _keys2.default)(views).map(function (id) {
      return Number(id);
    });
    return ids;
  },
  eachView: function eachView(fn) {
    var ids = this.getViewIds();
    ids.forEach(function (id) {
      fn.call(null, views[id]);
    });
  }
};

exports["default"] = router;

/***/ }),

/***/ 8310:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _keys = __webpack_require__(8902);

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = __webpack_require__(6378);

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _getPrototypeOf = __webpack_require__(5105);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(9135);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(3196);

var _inherits3 = _interopRequireDefault(_inherits2);

var _emitter = __webpack_require__(8767);

var _emitter2 = _interopRequireDefault(_emitter);

var _util = __webpack_require__(525);

var _pull = __webpack_require__(4802);

var _pull2 = _interopRequireDefault(_pull);

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { lifeSycleEvent } from './index'
__webpack_require__(7147);
var Bus = (0, _util.getBus)();
function isMap(path) {
  return (/^http(s)?:\/\/(apis\.map|3gimg\.qq\.com)/.test(path)
  );
}
var loadedApp = false;

var View = function (_Emitter) {
  (0, _inherits3.default)(View, _Emitter);

  function View(path) {
    (0, _classCallCheck3.default)(this, View);

    if (!path) throw new Error('path required for view');

    var _this = (0, _possibleConstructorReturn3.default)(this, (View.__proto__ || (0, _getPrototypeOf2.default)(View)).call(this));

    var id = _this.id = (0, _util.uid)();
    var o = (0, _util.parsePath)(path);
    _this.url = path;
    _this.path = o.path;
    _this.query = o.query;
    _this.isMap = isMap(path);
    var external = _this.external = /^http(s)?:\/\//.test(path);
    var root = document.querySelector('.scrollable');
    _this.ready = false;
    window.__webviewId__ = _this.id;
    if (external) {
      _this.el = (0, _util.createFrame)('view-' + id, path, false, root);
      if (_this.isMap) {
        _this.el.contentWindow.addEventListener('load', function () {
          _this._onReady();
        });
      }
    } else {
      window.reRender = 0;
      window.__pageFrameStartTime__ = Date.now();
      _this.el = _this.createPage(id, false, root);
      _this.loadWxml();
      if (!loadedApp) {
        loadedApp = true;
        _this.loadWxss('./css/app.css');
      }
      // this.loadWxss()
      Bus.on('ready', function (viewId) {
        if (viewId == id) {
          _this._onReady();
        }
      });
    }
    _this.readyCallbacks = [];
    return _this;
  }

  (0, _createClass3.default)(View, [{
    key: '_onReady',
    value: function _onReady() {
      this.ready = true;
      var cbs = this.readyCallbacks;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = (0, _getIterator3.default)(cbs), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var cb = _step.value;

          cb();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.readyCallbacks = null;
    }
  }, {
    key: 'onReady',
    value: function onReady(cb) {
      if (!cb) return;
      if (this.ready) return cb();
      this.readyCallbacks.push(cb);
    }
  }, {
    key: 'setLocation',
    value: function setLocation(data) {
      this.location = {
        name: data.poiname,
        address: data.poiaddress,
        latitude: data.latlng.lat,
        longitude: data.latlng.lng
      };
      console.log(this.location);
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      var win = window.__wxConfig__.window;
      var obj = {
        backgroundTextStyle: win.backgroundTextStyle || 'dark',
        backgroundColor: win.backgroundColor || '#fff',
        enablePullDownRefresh: win.enablePullDownRefresh || false
      };
      var winConfig = win.pages[this.path] || {};
      (0, _keys2.default)(obj).forEach(function (key) {
        if (winConfig.hasOwnProperty(key)) {
          obj[key] = winConfig[key];
        }
      });
      return { window: obj, viewId: this.id };
    }
  }, {
    key: 'hide',
    value: function hide() {
      // this.el.style.display = 'none'
      // 移除当前页面css
      if (this.el && this.el.parentNode) {
        this.elParent.removeChild(this.el);
      }
    }
  }, {
    key: 'show',
    value: function show() {
      if (this.el && !this.el.parentNode) {
        this.elParent.appendChild(this.el);
      } // 增加当前页面css
      // this.el.style.display = 'block'
      window.__webviewId__ = this.id;
      this.__DOMTree__ && (window.__DOMTree__ = this.__DOMTree__);
      window.__enablePullUpRefresh__ = !!this.__enablePullUpRefresh__;
      window.__generateFunc__ = this.__generateFunc__;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.emit('destroy');
      /*
       let cssObj = this.cssDom//document.querySelector('#view-css-'+this.id)
       if(cssObj){
       document.querySelector('head').removeChild(cssObj)
       }
       */
      if (this.el && this.el.parentNode) {
        this.el.parentNode.removeChild(this.el);
      }
    }
  }, {
    key: 'postMessage',
    value: function postMessage(data) {
      this.onReady(function () {
        data.msg = data.msg || {};

        var msg = data.msg,
            command = data.command,
            ext = data.ext;

        if (command === 'MSG_FROM_APPSERVICE') {
          WeixinJSBridge.subscribeHandler(msg.eventName, msg.data);
        } else if (command == 'GET_JSSDK_RES' || command == 'INVOKE_SDK' || /^private_/.test(msg.sdkName)) {
          WeixinJSBridge.subscribeHandler(msg.sdkName, msg.res, ext); // ext其实也没用 了
        } else if (command === 'STOP_PULL_DOWN_REFRESH') {
          WeixinJSBridge.pull.reset();
        }
      });
    }
  }, {
    key: 'loadWxss',
    value: function loadWxss(path) {
      var p = path || this.path;
      var self = this;
      fetch(path).then(function (response) {
        return response.text();
      }).then(function (cssBody) {
        self.inlineCss(cssBody, p);
      });
    }
  }, {
    key: 'resizeWxss',
    value: function resizeWxss() {}
  }, {
    key: 'createPage',
    value: function createPage(id, hidden) {
      var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.body;

      var el = document.createElement('div');
      el.setAttribute('id', 'weweb-view-' + id);
      el.setAttribute('view-id', id);
      el.style.height = '100%';
      if (hidden) {
        el.style.display = 'none';
      }
      parent.appendChild(el);
      this.elParent = parent;
      el.innerHTML = '<div id="view-body-' + id + '"></div>';
      return el;
    }
  }, {
    key: 'inlineCss',
    value: function inlineCss(content, path) {
      content = _utils2.default.transformRpx(content, false);
      if (!content) return;
      /*
       content = content.split('\n').map(function(value){
       return value==''?value:"#weweb-view-"+self.id+" "+value.replace(/([^\{]+?,)([^\{]+?)/g,"$1#weweb-view-"+self.id+" $2")
       }).join('\n');
       */

      var link = document.createElement('style');
      link.setAttribute('type', 'text/css');
      link.setAttribute('page', path);
      link.appendChild(document.createTextNode(content));
      if (path != './css/app.css') {
        link.id = 'view-css-' + this.id;
        link.setAttribute('scoped', '');
        this.el.appendChild(link);
      } else {
        document.querySelector('head').appendChild(link);
      }
    }
  }, {
    key: 'loadWxml',
    value: function loadWxml() {
      // load generateFn and notify view
      // this.el.contentWindow.__gen()
      var self = this;
      var p = './src/' + this.path + '.js';
      fetch(p).then(function (response) {
        return response.text();
      }).then(function (res) {
        if (window.__curPage__ && window.__curPage__.id != self.id) {
          // 确保是当前页面
          return;
        }
        var resArr = res.split('@code-separator-line:');
        try {
          new Function(resArr[2] + '\n //# sourceURL=' + window.location.origin + '/' + self.path + '.js')(); // define page service
        } catch (e) {
          console.error(e);
        }
        var func = new Function(resArr[0] + ' \n return $gwx("./' + self.path + '.wxml") \n //# sourceURL=' + window.location.origin + '/' + self.path + '.wxml');

        try {
          self.__generateFunc__ = window.__generateFunc__ = func();
        } catch (e) {
          console.error(e);
        }

        if (resArr[1]) {
          self.inlineCss(resArr[1], self.path);
        }

        function componentLoaded() {
          window.reRender = 0; // 重置
          Bus.emit('ready', self.id);
          _pull2.default.register(function () {
            ServiceJSBridge.subscribeHandler('onPullDownRefresh', {}, self.id);
          });
        }

        if (resArr[3]) {
          var deps = JSON.parse(resArr[3]).map(function (name) {
            return 'wx-' + name;
          });
          window.exparser.registerAsyncComp(deps, function () {
            componentLoaded();
          });
        } else {
          componentLoaded();
        }
      });
    }
  }]);
  return View;
}(_emitter2.default);

exports["default"] = View;
module.exports = exports['default'];

/***/ }),

/***/ 6066:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _pull = __webpack_require__(4802);

var _pull2 = _interopRequireDefault(_pull);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var curViewId = function curViewId() {
  return window.__wxConfig && window.__wxConfig.viewId || 0;
},
    defaultEventHandlers = {},
    eventPrefix = 'custom_event_',
    handlers = {},
    limitedApi = ['insertShareButton', 'updateShareButton', 'removeShareButton', 'insertContactButton', 'updateContactButton', 'removeContactButton', 'reportKeyValue', 'reportIDKey', 'systemLog'];

function send(sdkName, args, isOn) {
  // send notice
  var sdk = {
    sdkName: sdkName,
    args: args || {}
  };
  ServiceJSBridge.showSdk(sdk);
}

function invoke(event, args, callback) {
  if (!args) {
    args = {};
  }
  if (limitedApi.indexOf(event) != -1) {
    console.log(event);
  } else {
    defaultEventHandlers[event] = callback;
    if (/^private_/.test(event)) {
      return;
    }
    event === 'disableScrollBounce' ? _pull2.default.togglePullDownRefresh(args.disable) : send(event, args);
  }
}

function on(eventName, handler) {
  defaultEventHandlers[eventName] = handler;
  send(eventName, {}, true);
}
window.WeixinJSBridge = {
  pull: _pull2.default,
  invoke: invoke,
  on: on,
  publish: function publish(eventName, params, isOn) {
    eventName = isOn ? eventName : eventPrefix + eventName;
    var msg = {
      eventName: eventName,
      data: params,
      webviewID: curViewId()
    };
    ServiceJSBridge.subscribeHandler(msg.eventName, msg.data || {}, msg.webviewID);
  },
  subscribe: function subscribe(eventName, handler) {
    handlers[eventPrefix + eventName] = handler;
  },
  subscribeHandler: function subscribeHandler(eventName, data) {
    // 执行注册的回调
    var handler;handler = eventName.indexOf(eventPrefix) != -1 ? handlers[eventName] : defaultEventHandlers[eventName], typeof handler === 'function' && handler(data);
  }
  // pull.register(function () {
  //   ServiceJSBridge.subscribeHandler('onPullDownRefresh', {}, curViewId())
  // })

};function publish() {
  var params = Array.prototype.slice.call(arguments);
  params[1] = {
    data: params[1],
    options: {
      timestamp: Date.now()
    }
  };
  WeixinJSBridge.publish.apply(WeixinJSBridge, params);
}

function subscribe() {
  var params = Array.prototype.slice.call(arguments),
      callback = params[1];
  params[1] = function (args, ext) {
    var data = args.data;
    typeof callback === 'function' && callback(data, ext);
  };
  WeixinJSBridge.subscribe.apply(WeixinJSBridge, params);
}

function invokeMethod(eventName, params, innerParams) {
  // invoke 事件
  params = params || {};
  innerParams = innerParams || {};
  var callbacks = {};
  for (var r in params) {
    typeof params[r] === 'function' && (callbacks[r] = params[r], delete params[r]);
  }
  invoke(eventName, params, function (res) {
    res.errMsg = res.errMsg || eventName + ':ok';
    var isOk = res.errMsg.indexOf(eventName + ':ok') === 0,
        isCancel = res.errMsg.indexOf(eventName + ':cancel') === 0,
        isFail = res.errMsg.indexOf(eventName + ':fail') === 0;
    typeof innerParams.beforeAll === 'function' && innerParams.beforeAll(res);
    isOk ? (typeof innerParams.beforeSuccess === 'function' && innerParams.beforeSuccess(res), typeof callbacks.success === 'function' && callbacks.success(res), typeof innerParams.afterSuccess === 'function' && innerParams.afterSuccess(res)) : isCancel ? (typeof callbacks.cancel === 'function' && callbacks.cancel(res), typeof innerParams.cancel === 'function' && innerParams.cancel(res)) : isFail && (typeof callbacks.fail === 'function' && callbacks.fail(res), typeof innerParams.fail === 'function' && innerParams.fail(res)), typeof callbacks.complete === 'function' && callbacks.complete(res), typeof innerParams.complete === 'function' && innerParams.complete(res);
  });
}

exports["default"] = {
  invoke: invoke,
  on: on,
  publish: publish,
  subscribe: subscribe,
  invokeMethod: invokeMethod,
  onMethod: on
};
module.exports = exports['default'];

/***/ }),

/***/ 2821:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _bridge = __webpack_require__(6066);

var _bridge2 = _interopRequireDefault(_bridge);

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var localImgDataIng = !1,
    imgData = [],
    wdApi = {},
    foregroundCallbacks = [],
    backgroundCallbacks = [],
    publish = function publish(name, args) {
  // publish
  _bridge2.default.publish('INVOKE_METHOD', {
    name: name,
    args: args
  });
},
    apiObj = {
  invoke: _bridge2.default.invoke,
  on: _bridge2.default.on,
  getPlatform: _utils2.default.getPlatform,
  onAppEnterForeground: function onAppEnterForeground(fn) {
    foregroundCallbacks.push(fn);
  },
  onAppEnterBackground: function onAppEnterBackground(fn) {
    backgroundCallbacks.push(fn);
  },
  reportIDKey: function reportIDKey(e, t) {
    console.warn('reportIDKey has been removed wx');
  },
  reportKeyValue: function reportKeyValue(e, t) {
    console.warn('reportKeyValue has been removed from wx');
  },
  redirectTo: function redirectTo(params) {
    publish('redirectTo', params);
  },
  navigateTo: function navigateTo(params) {
    publish('navigateTo', params);
  },
  reLaunch: function reLaunch(params) {
    publish('reLaunch', params);
  },
  switchTab: function switchTab(params) {
    publish('switchTab', params);
  },
  clearStorage: function clearStorage() {
    publish('clearStorage', {});
  },
  showKeyboard: function showKeyboard(params) {
    _bridge2.default.invokeMethod('showKeyboard', params);
  },
  showDatePickerView: function showDatePickerView(params) {
    _bridge2.default.invokeMethod('showDatePickerView', params);
  },
  hideKeyboard: function hideKeyboard(params) {
    _bridge2.default.invokeMethod('hideKeyboard', params);
  },
  insertMap: function insertMap(params) {
    _bridge2.default.invokeMethod('insertMap', params);
  },
  removeMap: function removeMap(params) {
    _bridge2.default.invokeMethod('removeMap', params);
  },
  updateMapCovers: function updateMapCovers(params) {
    _bridge2.default.invokeMethod('updateMapCovers', params);
  },
  getRealRoute: _utils2.default.getRealRoute,
  getCurrentRoute: function getCurrentRoute(params) {
    _bridge2.default.invokeMethod('getCurrentRoute', params, {
      beforeSuccess: function beforeSuccess(res) {
        res.route = res.route.split('?')[0];
      }
    });
  },
  getLocalImgData: function getLocalImgData(params) {
    function beforeAllFn() {
      localImgDataIng = !1;
      if (imgData.length > 0) {
        var item = imgData.shift();
        apiObj.getLocalImgData(item);
      }
    }

    if (localImgDataIng === !1) {
      localImgDataIng = !0;
      if (typeof params.path === 'string') {
        apiObj.getCurrentRoute({
          success: function success(res) {
            var route = res.route;
            params.path = _utils2.default.getRealRoute(route || 'index.html', params.path);
            _bridge2.default.invokeMethod('getLocalImgData', params, {
              beforeAll: beforeAllFn
            });
          }
        });
      } else {
        _bridge2.default.invokeMethod('getLocalImgData', params, {
          beforeAll: beforeAllFn
        });
      }
    } else {
      imgData.push(params);
    }
  },
  insertVideoPlayer: function insertVideoPlayer(e) {
    _bridge2.default.invokeMethod('insertVideoPlayer', e);
  },
  removeVideoPlayer: function removeVideoPlayer(e) {
    _bridge2.default.invokeMethod('removeVideoPlayer', e);
  },
  insertShareButton: function insertShareButton(e) {
    _bridge2.default.invokeMethod('insertShareButton', e);
  },
  updateShareButton: function updateShareButton(e) {
    _bridge2.default.invokeMethod('updateShareButton', e);
  },
  removeShareButton: function removeShareButton(e) {
    _bridge2.default.invokeMethod('removeShareButton', e);
  },
  onAppDataChange: function onAppDataChange(callback) {
    _bridge2.default.subscribe('appDataChange', function (params) {
      callback(params);
    });
  },
  onPageScrollTo: function onPageScrollTo(callback) {
    _bridge2.default.subscribe('pageScrollTo', function (params) {
      callback(params);
    });
  },
  publishPageEvent: function publishPageEvent(eventName, data) {
    _bridge2.default.publish('PAGE_EVENT', {
      eventName: eventName,
      data: data
    });
  },
  animationToStyle: _utils2.default.animationToStyle
};
_bridge2.default.subscribe('onAppEnterForeground', function (e) {
  foregroundCallbacks.forEach(function (fn) {
    fn(e);
  });
});
_bridge2.default.subscribe('onAppEnterBackground', function (e) {
  backgroundCallbacks.forEach(function (fn) {
    fn(e);
  });
});

_utils2.default.copyObj(wdApi, apiObj);

// export default wx
module.exports = wdApi;
window.wd = wdApi;

/***/ }),

/***/ 4802:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var pullLoadingImgBlack = 'data:image/gif;base64,R0lGODlhQAAMAMQZAPT09Orq6ubm5unp6dPT06ysrPz8/NbW1q+vr9fX1+vr687Ozv39/fr6+tXV1Z6ens3NzZ2dnZubm66urpycnKurq+Xl5czMzJmZmf///wAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MjFEQzRGRkU4NkU4MTFFNjkwOTg4NjNGN0JEMzY0OTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MjFEQzRGRkQ4NkU4MTFFNjkwOTg4NjNGN0JEMzY0OTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDplY2RjM2MyNC03NDBkLTQ1NzMtOTc0Ni1iZGQ2MzhlMjEyYjUiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo3MGUzZDU2Ny1jZTk1LTExNzktYWFmZC04MmQ1NzRhYmI2YzIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJFAAZACwAAAAAQAAMAAAFvmCWMQTyPAjBiGzrukOyLMnw3jegCIICtIACZkgs/HC3xuHCbB4ayJshYKlaA4aRkMgtZKOtZXPsALuo1nQgQ+C6MQSzaDCuX2xyQHpvASDeXAhyGQl2YwmDCnxpChKARBSDEIZNEIMCi1YCjo8YD5KUTAuXmVUCf52CcoWhiHKKpQptnXFydKF4ZnqlAAZbbxVfcg6UZYMZaHxrGUFvRscZSnYOUMdTysIkExEREyrQLAMHMwe54AABPAFHGSEAIfkECRQAGQAsAAAAAEAADAAABb9gJgKKICiAqK4syxDI8yAE097tkCxLMqyGgGVIDBhwOEABw2wWUshW43CpWg8NkZDIDURdy6a4cPyqqNa0IwPgui1QM0FMxxDMokF6fxko3lwKeBkIdWIIgwl8aQkCgEQCgxKGTRSDEItWEI6PFpF4k5QYD5eZVQt/nYJ4haKIeIqmCW2dcV9zond4eqY/W29egwZhdRVleA6ZaxlBwMd4SnVPgyJTfA5ZKgABJgG21C8TERETNdQrAwc8Bz8iIQAh+QQFFAAZACwAAAAAQAAMAAAFv2AmDsmyJIOormwLKIKgAG3dMgTyPAjBqI3DZUg8NGw2Q8DCbAYMyBqggKlaC7SMkMh1RFvLpjjwXTGo1nTBMOC6L6lyBiCuW7JlQnqPISTeXAlyGQp2YgqDCHxpCBCARBCDAoZNAoMSi1YUjo8XC5KUTJZymJkYD3+dgnKFoYhyiqYIbZ1xZXSheF96pgQZDo9egxlhdmSDBmh8FVBBbw5Hw0rGUMNTfFgrAwcmB7bDIgABMQG6wzgTERETPiIhADs=';
var pullLoadingImgWhite = 'data:image/gif;base64,R0lGODlhQAAMAIABAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6M0Q5MjI2RkE4NkU1MTFFNkFDRDc5Mjc3OTE2NjVFRTMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6M0Q5MjI2Rjk4NkU1MTFFNkFDRDc5Mjc3OTE2NjVFRTMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDphODFiMWQ5My0wMDIwLTRiYmItYjVlMS04YjI4NTFkMzMzMjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6YTgxYjFkOTMtMDAyMC00YmJiLWI1ZTEtOGIyODUxZDMzMzIyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkECRQAAQAsAAAAAEAADAAAAkVMgInG7a7Wmy+CZhWlOe3ZLaH3YWEJnaOErhd6uCscj7Q8w+6Nn3re6nV4tp/QQvQFjxFaLeN8IqVNZzE5pbKi2SiVUQAAIfkECRQAAQAsAAAAAEAADAAAAkWMgWnL3QmBmy7KZSGlWe3aXeH1YSNZBqN6pkfrnjL6yS47h7cd53q/AvosO1hq2CkGj60l01kKQqM/ZYZBvGGvWpPGUAAAIfkEBRQAAQAsAAAAAEAADAAAAkWMgWnL7amcbBCuWufEVj+OHCDgfWDJjGqGBivZvm/rrrRsxzmKq/de6o1+Pp0QQxwah8Uk0smpnWjSKLVZDVFTrG02UgAAOw==';

var m = 100,
    leastHeight = 50,
    isTouching = !1,
    pageY = 0,
    height = 0,
    containerDiv = null,
    touchendCallback = null,
    isPullDown = !1;

function CreateContainer() {
  // 生成下拉时看到的logo容器
  if (!containerDiv) {
    containerDiv = document.createElement('div');
    var logoEle = document.createElement('i');
    if (__wxConfig.window.backgroundTextStyle === 'dark') {
      logoEle.style.backgroundImage = 'url(' + pullLoadingImgWhite + ')';
    } else {
      logoEle.style.backgroundImage = 'url(' + pullLoadingImgBlack + ')';
    }
    logoEle.style.width = '32px';
    logoEle.style.position = 'absolute';
    logoEle.style.height = '6px';
    logoEle.style.left = '50%';
    logoEle.style.bottom = '20px';
    logoEle.style.backgroundRepeat = 'no-repeat';
    logoEle.style.marginLeft = '-16px';
    logoEle.style.backgroundSize = 'cover';
    containerDiv.appendChild(logoEle);
    containerDiv.style.width = '100%';
    containerDiv.style.position = 'fixed';
    containerDiv.style.top = '0px';
    containerDiv.style.backgroundColor = __wxConfig.window.backgroundColor;
    window.__curPage__.el.parentNode.insertBefore(containerDiv, window.__curPage__.el);
  }
}

var navbarHeight = 42;

function handleTouchStart() {
  window.__curPage__.el.addEventListener('touchstart', function (event) {
    if (window.scrollY == 0) {
      CreateContainer();
      isTouching = !0;
      pageY = event.touches[0].pageY;
      window.__curPage__.el.style.transition = 'all linear 0';
      containerDiv.style.transition = 'all linear 0';
    }
  }, !0);
}

function handleTouchMove() {
  window.__curPage__.el.addEventListener('touchmove', function (e) {
    if (isTouching && __wxConfig.window.enablePullDownRefresh && !isPullDown) {
      height = e.touches[0].pageY - pageY;
      height = Math.max(0, height);
      height = Math.min(m, height);
      window.__curPage__.el.style.marginTop = height + 'px';
      height += navbarHeight;
      containerDiv.style.height = height + 'px';
    }
  });
}

function handleTouchEnd() {
  window.__curPage__.el.addEventListener('touchend', function (e) {
    isTouching = !1;
    if (height > leastHeight) {
      typeof touchendCallback === 'function' && touchendCallback();
      height = leastHeight;
      // window.document.body.style.marginTop = height + 'px'
      window.__curPage__.el.style.marginTop = height + 'px';
      containerDiv.style.height = height + navbarHeight + 'px';
      setTimeout(reset, 3e3);
    } else {
      reset();
    }
  });
}

function reset() {
  window.__curPage__.el.style.transition = 'all linear 0.3s';
  window.__curPage__.el.style.marginTop = '0px';
  if (containerDiv) {
    containerDiv.style.transition = 'all linear 0.3s';
    containerDiv.style.height = navbarHeight + 'px';
  }
}

function togglePullDownRefresh(isPullDownAgs) {
  // 禁用回弹
  isPullDown = isPullDownAgs;
}

var registered = {};

exports["default"] = {
  // 下拉手势注册以及相关事件
  register: function register(callback) {
    if (window.__wxConfig && !registered[window.__wxConfig.viewId] && window.__wxConfig.window && window.__wxConfig.window.enablePullDownRefresh) {
      touchendCallback = callback;
      handleTouchStart();
      handleTouchMove();
      handleTouchEnd();
      registered[window.__wxConfig.viewId] = true;
    }
  },
  reset: reset,
  togglePullDownRefresh: togglePullDownRefresh
};
module.exports = exports['default'];

/***/ }),

/***/ 944:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = window.exparser.registerBehavior({
  // 使用 exparser.registerBehavior 和exparser.registerElement 方法注册各种以 wx- 做为标签开头的元素到 exparser
  is: 'wx-base',
  properties: {
    id: {
      type: String,
      public: !0
    },
    hidden: {
      type: Boolean,
      public: !0
    }
  },
  debounce: function debounce(id, func, waitTime) {
    var _this = this;
    this.__debouncers = this.__debouncers || {};
    this.__debouncers[id] && clearTimeout(this.__debouncers[id]);
    this.__debouncers[id] = setTimeout(function () {
      typeof func === 'function' && func();
      _this.__debouncers[id] = void 0;
    }, waitTime);
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 3827:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-data-Component
exports["default"] = window.exparser.registerBehavior({
  is: 'wx-data-Component',
  properties: {
    name: {
      type: String,
      public: !0
    }
  },
  getFormData: function getFormData() {
    return this.value || '';
  },
  resetFormData: function resetFormData() {}
});
module.exports = exports['default'];

/***/ }),

/***/ 9225:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-disabled
exports["default"] = window.exparser.registerBehavior({
  is: 'wx-disabled',
  properties: {
    disabled: {
      type: Boolean,
      value: !1,
      public: !0
    }
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 2538:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-group
exports["default"] = window.exparser.registerBehavior({
  is: 'wx-group',
  listeners: {
    'this.wxItemValueChanged': '_handleItemValueChanged',
    'this.wxItemCheckedChanged': '_handleItemCheckedChanged',
    'this.wxItemAdded': '_handleItemAdded',
    'this.wxItemRemoved': '_handleItemRemoved',
    'this.wxItemChangedByTap': '_handleChangedByTap'
  },
  _handleItemValueChanged: function _handleItemValueChanged(event) {
    this.renameItem(event.detail.item, event.detail.newVal, event.detail.oldVal);
  },
  _handleItemCheckedChanged: function _handleItemCheckedChanged(event) {
    this.changed(event.detail.item);
  },
  _handleItemAdded: function _handleItemAdded(event) {
    event.detail.item._relatedGroup = this;
    this.addItem(event.detail.item);
    return !1;
  },
  _handleItemRemoved: function _handleItemRemoved(event) {
    this.removeItem(event.detail.item);
    return !1;
  },
  _handleChangedByTap: function _handleChangedByTap() {
    this.triggerEvent('change', {
      value: this.value
    });
  },
  addItem: function addItem() {},
  removeItem: function removeItem() {},
  renameItem: function renameItem() {},
  changed: function changed() {},
  resetFormData: function resetFormData() {
    if (this.hasBehavior('wx-data-Component')) {
      var checkChilds = function checkChilds(element) {
        element.childNodes.forEach(function (childNode) {
          if (childNode instanceof exparser.Element && !childNode.hasBehavior('wx-group')) {
            return childNode.hasBehavior('wx-item') ? void childNode.resetFormData() : void checkChilds(childNode);
          }
        });
      };
      checkChilds(this);
    }
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 8667:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-hover
exports["default"] = window.exparser.registerBehavior({
  is: 'wx-hover',
  properties: {
    hoverStartTime: {
      type: Number,
      value: 50,
      public: !0
    },
    hoverStayTime: {
      type: Number,
      value: 400,
      public: !0
    },
    hoverClass: {
      type: String,
      value: '',
      public: !0,
      observer: '_hoverClassChange'
    },
    hoverStyle: {
      type: String,
      value: '',
      public: !0
    },
    hover: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: '_hoverChanged'
    }
  },
  attached: function attached() {
    this.hover && this.hoverStyle != 'none' && this.hoverClass != 'none' && (this.bindHover(), this._hoverClassChange(this.hoverClass));
  },
  isScrolling: function isScrolling() {
    for (var ele = this.$$; ele; ele = ele.parentNode) {
      var wxElement = ele.__wxElement || ele;
      if (wxElement.__wxScrolling && Date.now() - wxElement.__wxScrolling < 50) {
        return !0;
      }
    }
    return !1;
  },
  detached: function detached() {
    this.unbindHover();
  },
  _hoverChanged: function _hoverChanged(bind, t) {
    bind ? this.bindHover() : this.unbindHover();
  },
  _hoverClassChange: function _hoverClassChange(className) {
    var classArr = className.split(/\s/);
    this._hoverClass = [];
    for (var n = 0; n < classArr.length; n++) {
      classArr[n] && this._hoverClass.push(classArr[n]);
    }
  },
  bindHover: function bindHover() {
    this._hoverTouchStart = this.hoverTouchStart.bind(this);
    this._hoverTouchEnd = this.hoverTouchEnd.bind(this);
    this._hoverCancel = this.hoverCancel.bind(this);
    this._hoverTouchMove = this.hoverTouchMove.bind(this);
    this.$$.addEventListener('touchstart', this._hoverTouchStart);
    window.__DOMTree__.addListener('canceltap', this._hoverCancel);
    window.addEventListener('touchcancel', this._hoverCancel, !0);
    window.addEventListener('touchmove', this._hoverTouchMove, !0);
    window.addEventListener('touchend', this._hoverTouchEnd, !0);
  },
  unbindHover: function unbindHover() {
    this.$$.removeEventListener('touchstart', this._hoverTouchStart);
    window.__DOMTree__.removeListener('canceltap', this._hoverCancel);
    window.removeEventListener('touchcancel', this._hoverCancel, !0);
    window.removeEventListener('touchmove', this._hoverTouchMove, !0);
    window.removeEventListener('touchend', this._hoverTouchEnd, !0);
  },
  hoverTouchMove: function hoverTouchMove(e) {
    this.hoverCancel();
  },
  hoverTouchStart: function hoverTouchStart(event) {
    var self = this;
    if (!this.isScrolling()) {
      this.__touch = !0;
      if (this.hoverStyle == 'none' || this.hoverClass == 'none' || this.disabled) ;else {
        if (event.touches.length > 1) return;
        if (window.__hoverElement__) {
          window.__hoverElement__._hoverReset();
          window.__hoverElement__ = void 0;
        }
        this.__hoverStyleTimeId = setTimeout(function () {
          self.__hovering = !0;
          window.__hoverElement__ = self;
          if (self._hoverClass && self._hoverClass.length > 0) {
            for (var e = 0; e < self._hoverClass.length; e++) {
              self.$$.classList.add(self._hoverClass[e]);
            }
          } else {
            self.$$.classList.add(self.is.replace('wx-', '') + '-hover');
          }
          self.__touch || window.requestAnimationFrame(function () {
            clearTimeout(self.__hoverStayTimeId);
            self.__hoverStayTimeId = setTimeout(function () {
              self._hoverReset();
            }, self.hoverStayTime);
          });
        }, this.hoverStartTime);
      }
    }
  },
  hoverTouchEnd: function hoverTouchEnd() {
    var self = this;
    this.__touch = !1;
    if (this.__hovering) {
      clearTimeout(this.__hoverStayTimeId);
      window.requestAnimationFrame(function () {
        self.__hoverStayTimeId = setTimeout(function () {
          self._hoverReset();
        }, self.hoverStayTime);
      });
    }
  },
  hoverCancel: function hoverCancel() {
    this.__touch = !1;
    clearTimeout(this.__hoverStyleTimeId);
    this.__hoverStyleTimeId = void 0;
    this._hoverReset();
  },
  _hoverReset: function _hoverReset() {
    if (this.__hovering) {
      this.__hovering = !1;
      window.__hoverElement__ = void 0;
      if (this.hoverStyle == 'none' || this.hoverClass == 'none') ;else if (this._hoverClass && this._hoverClass.length > 0) {
        for (var e = 0; e < this._hoverClass.length; e++) {
          this.$$.classList.contains(this._hoverClass[e]) && this.$$.classList.remove(this._hoverClass[e]);
        }
      } else {
        this.$$.classList.remove(this.is.replace('wx-', '') + '-hover');
      }
    }
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 6034:
/***/ (() => {

"use strict";


window.exparser.registerBehavior({
  is: 'wx-input-base',
  properties: {
    focus: {
      type: Boolean,
      value: 0,
      coerce: '_focusChange',
      public: !0
    },
    autoFocus: {
      type: Boolean,
      value: !1,
      public: !0
    },
    placeholder: {
      type: String,
      value: '',
      observer: '_placeholderChange',
      public: !0
    },
    placeholderStyle: {
      type: String,
      value: '',
      public: !0
    },
    placeholderClass: {
      type: String,
      value: '',
      public: !0
    },
    value: {
      type: String,
      value: '',
      coerce: 'defaultValueChange',
      public: !0
    },
    showValue: {
      type: String,
      value: ''
    },
    maxlength: {
      type: Number,
      value: 140,
      observer: '_maxlengthChanged',
      public: !0
    },
    type: {
      type: String,
      value: 'text',
      public: !0
    },
    password: {
      type: Boolean,
      value: !1,
      public: !0
    },
    disabled: {
      type: Boolean,
      value: !1,
      public: !0
    },
    bindinput: {
      type: String,
      value: '',
      public: !0
    }
  },
  resetFormData: function resetFormData() {
    this._keyboardShow && (this.__formResetCallback = !0, wd.hideKeyboard());
    this.value = '';
    this.showValue = '';
  },
  getFormData: function getFormData(callback) {
    this._keyboardShow ? this.__formCallback = callback : typeof callback === 'function' && callback(this.value);
  },
  _formGetDataCallback: function _formGetDataCallback() {
    typeof this.__formCallback === 'function' && this.__formCallback(this.value);
    this.__formCallback = void 0;
  },
  _focusChange: function _focusChange(isFocusChange) {
    this._couldFocus(isFocusChange);
    return isFocusChange;
  },
  _couldFocus: function _couldFocus(isFocusChange) {
    var self = this;
    !this._keyboardShow && this._attached && isFocusChange && (window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, window.requestAnimationFrame ? window.requestAnimationFrame(function () {
      self._inputFocus();
    }) : this._inputFocus());
  },
  _getPlaceholderClass: function _getPlaceholderClass(name) {
    return 'input-placeholder ' + name;
  },
  _showValueFormate: function _showValueFormate(value) {
    this.password || this.type == 'password' ? this.showValue = value ? new Array(value.length + 1).join('●') : '' : this.showValue = value || '';
  },
  _maxlengthChanged: function _maxlengthChanged(length, t) {
    var curVal = this.value.slice(0, length);
    curVal != this.value && (this.value = curVal);
  },
  _showValueChange: function _showValueChange(e) {
    return e;
  },
  _placeholderChange: function _placeholderChange() {
    this._checkPlaceholderStyle(this.value);
  }
});

/***/ }),

/***/ 8414:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-item
exports["default"] = window.exparser.registerBehavior({
  is: 'wx-item',
  properties: {
    value: {
      type: String,
      public: !0,
      observer: 'valueChange'
    },
    checked: {
      type: Boolean,
      value: !1,
      observer: 'checkedChange',
      public: !0
    }
  },
  valueChange: function valueChange(newVal, oldVal) {
    this._relatedGroup && this._relatedGroup.triggerEvent('wxItemValueChanged', {
      item: this,
      newVal: newVal,
      oldVal: oldVal
    });
  },
  checkedChange: function checkedChange(newVal, oldVal) {
    newVal !== oldVal && this._relatedGroup && this._relatedGroup.triggerEvent('wxItemCheckedChanged', {
      item: this
    });
  },
  changedByTap: function changedByTap() {
    this._relatedGroup && this._relatedGroup.triggerEvent('wxItemChangedByTap');
  },
  attached: function attached() {
    this.triggerEvent('wxItemAdded', {
      item: this
    }, {
      bubbles: !0
    });
  },
  moved: function moved() {
    this._relatedGroup && (this._relatedGroup.triggerEvent('wxItemRemoved'), this._relatedGroup = null), this.triggerEvent('wxItemAdded', { item: this }, { bubbles: !0 });
  },
  detached: function detached() {
    this._relatedGroup && (this._relatedGroup.triggerEvent('wxItemRemoved', {
      item: this
    }), this._relatedGroup = null);
  },
  resetFormData: function resetFormData() {
    this.checked = !1;
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 7891:
/***/ (() => {

"use strict";


// wx-label-target
window.exparser.registerBehavior({
  is: 'wx-label-target',
  properties: {},
  handleLabelTap: function handleLabelTap(event) {}
});

/***/ }),

/***/ 9022:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-mask-Behavior
exports["default"] = window.exparser.registerBehavior({
  is: 'wx-mask-Behavior',
  properties: {
    mask: {
      type: Boolean,
      value: !1,
      public: !0
    }
  },
  _getMaskStyle: function _getMaskStyle(showMask) {
    return showMask ? '' : 'background-color: transparent';
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 4339:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-native
exports["default"] = window.exparser.registerBehavior({
  is: 'wx-native',
  properties: {
    hidden: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: 'hiddenChanged'
    },
    _isReady: {
      type: Boolean,
      value: !1
    },
    _deferred: {
      type: Array,
      value: []
    },
    _isError: {
      type: Boolean,
      value: !1
    },
    _box: {
      type: Object,
      value: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      }
    }
  },
  _getBox: function _getBox() {
    var pos = this.$$.getBoundingClientRect(),
        res = {
      left: pos.left + window.scrollX,
      top: pos.top + window.scrollY,
      width: this.$$.offsetWidth,
      height: this.$$.offsetHeight
    };
    return res;
  },
  _diff: function _diff() {
    var pos = this._getBox();
    for (var attr in pos) {
      if (pos[attr] !== this._box[attr]) return !0;
    }
    return !1;
  },
  _ready: function _ready() {
    this._isReady = !0;
    this._deferred.forEach(function (e) {
      this[e.callback].apply(this, e.args);
    }, this);
    this._deferred = [];
  },
  hiddenChanged: function hiddenChanged(e, t) {
    if (!this._isError) {
      return this._isReady ? void this._hiddenChanged(e, t) : void this._deferred.push({ callback: 'hiddenChanged', args: [e, t] });
    }
  },
  _pageReRenderCallback: function _pageReRenderCallback() {
    this._isError || this._diff() && (this._box = this._getBox(), this._updatePosition());
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 6060:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-player
exports["default"] = window.exparser.registerBehavior({
  is: 'wx-player',
  isBackground: !1,
  properties: {
    src: {
      type: String,
      observer: 'srcChanged',
      public: !0
    },
    poster: {
      type: String,
      observer: 'posterChanged',
      public: !0
    },
    playing: {
      type: Boolean,
      value: !1
    },
    _buttonType: {
      type: String,
      value: 'play'
    },
    _currentTime: {
      type: String,
      value: '00:00'
    },
    _duration: {
      type: String,
      value: '00:00'
    },
    isLive: {
      type: Boolean,
      value: !1
    }
  },
  _formatTime: function _formatTime(time) {
    if (time === 1 / 0) return '00:00';
    var hour = Math.floor(time / 3600),
        min = Math.floor((time - 3600 * hour) / 60),
        sencod = time - 3600 * hour - 60 * min;
    return hour == 0 ? (min >= 10 ? min : '0' + min) + ':' + (sencod >= 10 ? sencod : '0' + sencod) : (hour >= 10 ? hour : '0' + hour) + ':' + (min >= 10 ? min : '0' + min) + ':' + (sencod >= 10 ? sencod : '0' + sencod);
  },
  _publish: function _publish(eventName, param) {
    this.triggerEvent(eventName, param);
  },
  attached: function attached() {
    var self = this,
        playDom = this.$.player,
        tmpObj = {};
    for (var o in MediaError) {
      tmpObj[MediaError[o]] = o;
    }
    playDom.onerror = function (event) {
      event.stopPropagation();
      if (event.srcElement.error) {
        var t = event.srcElement.error.code;
        self._publish('error', {
          errMsg: tmpObj[t]
        });
      }
    };
    playDom.onplay = function (event) {
      self.playing = !0;
      event.stopPropagation();
      self._publish('play', {});
      self._buttonType = 'pause';
      typeof self.onPlay === 'function' && self.onPlay(event);
    };
    playDom.onpause = function (event) {
      self.playing = !1;
      event.stopPropagation();
      self._publish('pause', {});
      self._buttonType = 'play';
      typeof self.onPause === 'function' && self.onPause(event);
    };
    playDom.onended = function (event) {
      self.playing = !1;
      event.stopPropagation();
      self._publish('ended', {});
      typeof self.onEnded === 'function' && self.onEnded(event);
    };
    playDom.tagName == 'AUDIO' && (playDom.onratechange = function (event) {
      event.stopPropagation();
      self._publish('ratechange', {
        playbackRate: playDom.playbackRate
      });
    });
    var prevTime = 0;
    playDom.addEventListener('timeupdate', function (event) {
      event.stopPropagation();
      Math.abs(playDom.currentTime - prevTime) % playDom.duration >= 1 && (self._publish('timeupdate', {
        currentTime: playDom.currentTime,
        duration: playDom.duration
      }), prevTime = 1e3 * playDom.currentTime);
      self._currentTime = self._formatTime(Math.floor(playDom.currentTime));
      typeof self.onTimeUpdate === 'function' && self.onTimeUpdate(event);
    });
    playDom.addEventListener('durationchange', function () {
      playDom.duration === 1 / 0 ? self.isLive = !0 : self.isLive = !1;
      NaN !== playDom.duration && self.duration === 0 && (self._duration = self._formatTime(Math.floor(playDom.duration)));
    });
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 9545:
/***/ (() => {

"use strict";


var e = 1;
window.exparser.registerBehavior({
  is: 'wx-positioning-target',
  created: function created() {
    this._positioningId = e++;
    this._parentPositioningContainer = null;
    this._positioningSyncing = !1;
  },
  detached: function detached() {
    this._positioningId = e++;
  },
  _requestPositioningContainer: function _requestPositioningContainer() {
    this.triggerEvent('wxAddPositionTracker', { element: this }, { bubbles: !0, composed: !0 });
  },
  trackPositionInDocument: function trackPositionInDocument() {
    this._positioningSyncing || (this._positioningSyncing = !0, this._parentPositioningContainer = document);
  },
  trackPositionInContainer: function trackPositionInContainer(e) {
    this._positioningSyncing || (this._positioningSyncing = !0, this._parentPositioningContainer = e);
  },
  getPositioningOffset: function getPositioningOffset() {
    var e = this.$$.getBoundingClientRect();
    if (this._parentPositioningContainer === document) {
      return {
        left: e.left + window.scrollX,
        top: e.top + window.scrollY,
        width: this.$$.offsetWidth,
        height: this.$$.offsetHeight
      };
    }
    var t = this._parentPositioningContainer.$$.getBoundingClientRect();
    return {
      left: e.left - t.left,
      top: e.top - t.top,
      width: this.$$.offsetWidth,
      height: this.$$.offsetHeight
    };
  },
  fetchPositioningParentId: function fetchPositioningParentId() {
    return 0;
  },
  getPositioningId: function getPositioningId() {
    return this._positioningId;
  }
});

// window.exparser.registerBehavior({
//   is: 'wx-positioning-container',
//   behaviors: ['wx-positioning-target'],
//   attached: function () {
//     var e = this
//     document.addEventListener('pageReRender', function () {
//       if (e._positioningSyncing) {
//         var t = e.getPositioningOffset(),
//           n = e.getScrollPosition(),
//           i = n.scrollLeft,
//           o = n.scrollTop
//         e._sendContainerUpdate(i, o, t)
//       }
//     })
//   },
//   detached: function () {
//     this._positioningSyncing && this._sendContainerRemoval()
//   },
//   listeners: { 'this.wxAddPositionTracker': '_addPositionTracker' },
//   methods: {
//     _addPositionTracker: function (e) {
//       if (e.target !== this) {
//         return this._positioningSyncing ||
//           (this._requestPositioningContainer(), this._positioningSyncing ||
//             this.trackPositionInDocument()), e.detail.element.trackPositionInContainer(
//           this
//         ), !1
//       }
//     },
//     trackPositionInDocument: function () {
//       this._positioningSyncing ||
//         ((this._positioningSyncing = !0), (this._parentPositioningContainer = document), this._initPositioningContainer())
//     },
//     trackPositionInContainer: function (e) {
//       this._positioningSyncing ||
//         ((this._positioningSyncing = !0), (this._parentPositioningContainer = e), this._initPositioningContainer())
//     },
//     _initPositioningContainer: function () {
//       var e = this.getPositioningOffset(),
//         t = this.getScrollPosition(),
//         n = t.scrollLeft,
//         i = t.scrollTop
//       this._sendContainerCreation(n, i, e)
//     },
//     _sendContainerCreation: function (e, t, n) {
//       this._positioningId, this._parentPositioningContainer === document ||
//         this._parentPositioningContainer._positioningId
//     },
//     _sendContainerUpdate: function (e, t, n) {
//       this._positioningId
//     },
//     _sendContainerRemoval: function () {},
//     getScrollPosition: function () {
//       return { scrollLeft: 0, scrollTop: 0 }
//     },
//     updateScrollPosition: function (e) {
//       if (this._positioningSyncing) {
//         var t = this.getScrollPosition(), n = t.scrollLeft, i = t.scrollTop
//         return (
//           !(!e && this._prevScrollLeft === n && this._prevScrollTop === i) &&
//           ((this._prevScrollLeft = n), (this._prevScrollTop = i), this._sendContainerUpdate(
//             n,
//             i,
//             e
//           ), !0)
//         )
//       }
//     }
//   }
// })

/***/ }),

/***/ 1255:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-touchtrack
exports["default"] = exparser.registerBehavior({
  is: 'wx-touchtrack',
  touchtrack: function touchtrack(element, handlerName) {
    var that = this,
        startX = 0,
        startY = 0,
        dx = 0,
        dy = 0,
        handleEvent = function handleEvent(event, state, x, y) {
      var res = that[handlerName].call(that, {
        target: event.target,
        currentTarget: event.currentTarget,
        preventDefault: event.preventDefault,
        stopPropagation: event.stopPropagation,
        detail: {
          state: state,
          x: x,
          y: y,
          dx: x - startX,
          dy: y - startY,
          ddx: x - dx,
          ddy: y - dy
        }
      });
      if (res === !1) return !1;
    },
        originalEvent = null;
    exparser.addListenerToElement(element, 'touchstart', function (event) {
      if (event.touches && event.touches.length === 1 && !originalEvent) {
        originalEvent = event;
        startX = dx = event.touches[0].pageX;
        startY = dy = event.touches[0].pageY;
        return handleEvent(event, 'start', startX, startY);
      }
    });
    exparser.addListenerToElement(element, 'touchmove', function (event) {
      if (event.touches && event.touches.length === 1 && originalEvent) {
        var res = handleEvent(event, 'move', event.touches[0].pageX, event.touches[0].pageY);
        dx = event.touches[0].pageX;
        dy = event.touches[0].pageY;
        return res;
      }
    });
    exparser.addListenerToElement(element, 'touchend', function (event) {
      if (event.touches && event.touches.length === 0 && originalEvent) {
        originalEvent = null;
        return handleEvent(event, 'end', event.changedTouches[0].pageX, event.changedTouches[0].pageY);
      }
    });
    exparser.addListenerToElement(element, 'touchcancel', function (event) {
      if (event.touches && event.touches.length === 0 && originalEvent) {
        var t = originalEvent;
        originalEvent = null;
        return handleEvent(event, 'end', t.touches[0].pageX, t.touches[0].pageY);
      }
    });
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 8312:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-button
exports["default"] = window.exparser.registerElement({
  is: 'wx-button',
  template: '\n    <slot></slot>\n  ',
  behaviors: ['wx-base', 'wx-hover', 'wx-label-target'],
  properties: {
    type: {
      type: String,
      value: 'default',
      public: !0
    },
    size: {
      type: String,
      value: 'default',
      public: !0
    },
    disabled: {
      type: Boolean,
      public: !0
    },
    plain: {
      type: Boolean,
      public: !0
    },
    loading: {
      type: Boolean,
      public: !0
    },
    formType: {
      type: String,
      public: !0
    },
    hover: {
      type: Boolean,
      value: !0
    }
  },
  listeners: {
    tap: '_preventTapOnDisabled',
    longtap: '_preventTapOnDisabled',
    canceltap: '_preventTapOnDisabled',
    'this.tap': '_onThisTap'
  },
  _preventTapOnDisabled: function _preventTapOnDisabled() {
    if (this.disabled) return !1;
  },
  _onThisTap: function _onThisTap() {
    this.formType === 'submit' ? this.triggerEvent('formSubmit', void 0, { bubbles: !0 }) : this.formType === 'reset' && this.triggerEvent('formReset', void 0, { bubbles: !0 });
  },
  handleLabelTap: function handleLabelTap(event) {
    exparser.triggerEvent(this.shadowRoot, 'tap', event.detail, {
      bubbles: !0,
      composed: !0,
      extraFields: {
        touches: event.touches,
        changedTouches: event.changedTouches
      }
    });
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 5372:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-checkbox-group
exports["default"] = window.exparser.registerElement({
  is: 'wx-checkbox-group',
  template: '\n    <slot></slot>\n  ',
  behaviors: ['wx-base', 'wx-data-Component', 'wx-group'],
  properties: {
    value: {
      type: Array,
      value: []
    }
  },
  addItem: function addItem(checkbox) {
    checkbox.checked && this.value.push(checkbox.value);
  },
  removeItem: function removeItem(checkbox) {
    if (checkbox.checked) {
      var index = this.value.indexOf(checkbox.value);
      index >= 0 && this.value.splice(index, 1);
    }
  },
  renameItem: function renameItem(checkbox, newVal, oldVal) {
    if (checkbox.checked) {
      var index = this.value.indexOf(oldVal);
      index >= 0 && (this.value[index] = newVal);
    }
  },
  changed: function changed(checkbox) {
    if (checkbox.checked) {
      this.value.push(checkbox.value);
    } else {
      var index = this.value.indexOf(checkbox.value);
      index >= 0 && this.value.splice(index, 1);
    }
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 9725:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-checkbox
exports["default"] = window.exparser.registerElement({
  is: 'wx-checkbox',
  template: '\n    <div class="wx-checkbox-wrapper">\n      <div id="input" class="wx-checkbox-input" class.wx-checkbox-input-checked="{{checked}}" class.wx-checkbox-input-disabled="{{disabled}}" style.color="{{_getColor(checked,color)}}"></div>\n      <slot></slot>\n    </div>\n  ',
  behaviors: ['wx-base', 'wx-label-target', 'wx-item', 'wx-disabled'],
  properties: {
    color: {
      type: String,
      value: '#09BB07',
      public: !0
    }
  },
  listeners: {
    tap: '_inputTap'
  },
  _getColor: function _getColor(notEmpty, def) {
    return notEmpty ? def : '';
  },
  _inputTap: function _inputTap() {
    return !this.disabled && (this.checked = !this.checked, void this.changedByTap());
  },
  handleLabelTap: function handleLabelTap() {
    this._inputTap();
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 743:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-icon
exports["default"] = window.exparser.registerElement({
  is: 'wx-icon',
  template: '<i class$="wx-icon-{{type}}" style.color="{{color}}" style.font-size="{{size}}px"></i>',
  behaviors: ['wx-base'],
  properties: {
    type: {
      type: String,
      public: !0
    },
    size: {
      type: Number,
      value: 23,
      public: !0
    },
    color: {
      type: String,
      public: !0
    }
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 3572:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-image
exports["default"] = window.exparser.registerElement({
  is: 'wx-image',
  template: '<div id="div"></div>',
  behaviors: ['wx-base'],
  properties: {
    src: {
      type: String,
      observer: 'srcChanged',
      public: !0
    },
    mode: {
      type: String,
      observer: 'modeChanged',
      public: !0
    },
    _disableSizePositionRepeat: {
      type: Boolean,
      value: !1
    },
    backgroundSize: {
      type: String,
      observer: 'backgroundSizeChanged',
      value: '100% 100%',
      public: !0
    },
    backgroundPosition: {
      type: String,
      observer: 'backgroundPositionChanged',
      public: !0
    },
    backgroundRepeat: {
      type: String,
      observer: 'backgroundRepeatChanged',
      value: 'no-repeat',
      public: !0
    },
    _img: {
      type: Object
    }
  },
  _publishError: function _publishError(errMsg) {
    this.triggerEvent('error', errMsg);
  },
  _ready: function _ready() {
    if (!(this._img && this._img instanceof Image)) {
      this._img = new Image();
      var self = this;
      this._img.onerror = function (event) {
        event.stopPropagation();
        var data = {
          errMsg: 'GET ' + self._img.src + ' 404 (Not Found)'
        };
        self._publishError(data);
      };
      this._img.onload = function (event) {
        event.stopPropagation();
        self.triggerEvent('load', {
          width: this.width,
          height: this.height
        });
        if (self.mode === 'widthFix') {
          self.rate = this.width / this.height;
          self.$$.style.height = (self.$.div.offsetWidth || self.$$.offsetWidth) / self.rate + 'px';
        }
      };
      var cb = this._pageReRenderCallback.bind(this);
      document.addEventListener('leavePage', function () {
        document.removeEventListener('pageReRender', cb);
      });
      document.addEventListener('pageReRender', cb);
    }
  },
  attached: function attached() {
    this._ready();
    this.backgroundSizeChanged(this.backgroundSize);
    this.backgroundRepeatChanged(this.backgroundRepeat);
  },
  detached: function detached() {
    document.removeEventListener('pageReRender', this._pageReRenderCallback.bind(this));
  },
  _pageReRenderCallback: function _pageReRenderCallback() {
    this.mode === 'widthFix' && typeof this.rate !== 'undefined' && (this.$$.style.height = this.$$.offsetWidth / this.rate + 'px');
  },
  _srcChanged: function _srcChanged(url) {
    if (!/https?:/i.test(url)) {
      if (url.indexOf('/') === 0) {
        url = url.substr(1);
      } else {
        var currPath = window.__curPage__.url.split('/').slice(0, -1);
        if (currPath.length) {
          url = currPath.join('/') + '/' + url;
        }
      }
    }
    this._img.src = url;
    this.$.div.style.backgroundImage = 'url(\'' + url + '\')';
  },
  srcChanged: function srcChanged(filePath, t) {
    if (filePath) {
      var ua = (this.$.div, window.navigator.userAgent.toLowerCase()),
          self = this;
      this._ready();
      var opts = {
        success: function success(e) {
          self._srcChanged(e.localData);
        },
        fail: function fail(e) {
          self._publishError(e);
        } //! /wechatdevtools/.test(ua)
      };this._srcChanged(filePath);
    }
  },
  _checkMode: function _checkMode(styleKey) {
    var styles = ['scaleToFill', 'aspectFit', 'aspectFill', 'top', 'bottom', 'center', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'],
        res = !1,
        i = 0;
    for (; i < styles.length; i++) {
      if (styleKey == styles[i]) {
        res = !0;
        break;
      }
    }
    return res;
  },
  modeChanged: function modeChanged(mode, t) {
    if (!this._checkMode(mode)) {
      return void (this._disableSizePositionRepeat = !1);
    }
    this._disableSizePositionRepeat = !0;
    this.$.div.style.backgroundSize = 'auto auto';
    this.$.div.style.backgroundPosition = '0% 0%';
    this.$.div.style.backgroundRepeat = 'no-repeat';
    switch (mode) {
      case 'scaleToFill':
        this.$.div.style.backgroundSize = '100% 100%';
        break;
      case 'aspectFit':
        ;this.$.div.style.backgroundSize = 'contain', this.$.div.style.backgroundPosition = 'center center';
        break;
      case 'aspectFill':
        ;this.$.div.style.backgroundSize = 'cover', this.$.div.style.backgroundPosition = 'center center';
        break;
      case 'widthFix':
        this.$.div.style.backgroundSize = '100% 100%';
        break;
      case 'top':
        this.$.div.style.backgroundPosition = 'top center';
        break;
      case 'bottom':
        this.$.div.style.backgroundPosition = 'bottom center';
        break;
      case 'center':
        this.$.div.style.backgroundPosition = 'center center';
        break;
      case 'left':
        this.$.div.style.backgroundPosition = 'center left';
        break;
      case 'right':
        this.$.div.style.backgroundPosition = 'center right';
        break;
      case 'top left':
        this.$.div.style.backgroundPosition = 'top left';
        break;
      case 'top right':
        this.$.div.style.backgroundPosition = 'top right';
        break;
      case 'bottom left':
        this.$.div.style.backgroundPosition = 'bottom left';
        break;
      case 'bottom right':
        this.$.div.style.backgroundPosition = 'bottom right';
    }
  },
  backgroundSizeChanged: function backgroundSizeChanged(value, t) {
    this._disableSizePositionRepeat || (this.$.div.style.backgroundSize = value);
  },
  backgroundPositionChanged: function backgroundPositionChanged(value, t) {
    this._disableSizePositionRepeat || (this.$.div.style.backgroundPosition = value);
  },
  backgroundRepeatChanged: function backgroundRepeatChanged(value, t) {
    this._disableSizePositionRepeat || (this.$.div.style.backgroundRepeat = value);
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 7191:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-input if in wechatdevtools
exports["default"] = !function () {
  window.exparser.registerElement({
    is: 'wx-input',
    template: '\n      <div id="wrapper" disabled$="{{disabled}}">\n        <input id="input" type$="{{_getType(type,password)}}" maxlength$="{{maxlength}}" value$="{{showValue}}" disabled$="{{disabled}}" >\n        <div id="placeholder" class$="{{_getPlaceholderClass(placeholderClass)}}" style$="{{_getPlaceholderStyle(placeholderStyle)}}" parse-text-content>{{placeholder}}</p>\n      </div>\n      ',
    behaviors: ['wx-base', 'wx-data-Component'],
    properties: {
      focus: {
        type: Boolean,
        value: 0,
        coerce: '_focusChange',
        public: !0
      },
      autoFocus: {
        type: Boolean,
        value: !1,
        public: !0
      },
      placeholder: {
        type: String,
        value: '',
        observer: '_placeholderChange',
        public: !0
      },
      placeholderStyle: {
        type: String,
        value: '',
        public: !0
      },
      placeholderClass: {
        type: String,
        value: '',
        public: !0,
        observer: '_placeholderClassChange'
      },
      value: {
        type: String,
        value: '',
        coerce: 'defaultValueChange',
        public: !0
      },
      showValue: {
        type: String,
        value: ''
      },
      maxlength: {
        type: Number,
        value: 140,
        observer: '_maxlengthChanged',
        public: !0
      },
      type: {
        type: String,
        value: 'text',
        public: !0
      },
      password: {
        type: Boolean,
        value: !1,
        public: !0
      },
      disabled: {
        type: Boolean,
        value: !1,
        public: !0
      },
      bindinput: {
        type: String,
        value: '',
        public: !0
      },
      confirmHold: {
        type: Boolean,
        value: !1,
        public: !0
      }
    },
    listeners: {
      tap: '_inputFocus',
      'input.focus': '_inputFocus',
      'input.blur': '_inputBlur',
      'input.input': '_inputKey'
    },
    resetFormData: function resetFormData() {
      this._keyboardShow && (this.__formResetCallback = !0, wd.hideKeyboard()), this.value = '', this.showValue = '';
    },
    getFormData: function getFormData(callback) {
      this._keyboardShow ? this.__formCallback = callback : typeof callback === 'function' && callback(this.value);
    },
    _formGetDataCallback: function _formGetDataCallback() {
      typeof this.__formCallback === 'function' && this.__formCallback(this.value), this.__formCallback = void 0;
    },
    _focusChange: function _focusChange(getFocus) {
      return this._couldFocus(getFocus), getFocus;
    },
    _couldFocus: function _couldFocus(getFocus) {
      var self = this;
      this._attached && (!this._keyboardShow && getFocus ? window.requestAnimationFrame(function () {
        self._inputFocus();
      }) : this._keyboardShow && !getFocus && this.$.input.blur());
    },
    _getPlaceholderClass: function _getPlaceholderClass(name) {
      return 'input-placeholder ' + name;
    },
    _maxlengthChanged: function _maxlengthChanged(length, t) {
      var vaildVal = this.value.slice(0, length);
      vaildVal != this.value && (this.value = vaildVal);
    },
    _placeholderChange: function _placeholderChange() {
      this._checkPlaceholderStyle(this.value);
    },
    attached: function attached() {
      var self = this;
      this._placeholderClassChange(this.placeholderClass), this._checkPlaceholderStyle(this.value), this._attached = !0, this._value = this.value, this.updateInput(), window.__onAppRouteDone && this._couldFocus(this.autoFocus || this.focus), this.__routeDoneId = exparser.addListenerToElement(document, 'routeDone', function () {
        self._couldFocus(self.autoFocus || self.focus);
      }), this.__setKeyboardValueId = exparser.addListenerToElement(document, 'setKeyboardValue', function (event) {
        if (self._keyboardShow) {
          var value = event.detail.value,
              cursor = event.detail.cursor;
          typeof value !== 'undefined' && (self._value = value, self.value = value), typeof cursor !== 'undefined' && cursor != -1 && self.$.input.setSelectionRange(cursor, cursor);
        }
      }), this.__hideKeyboardId = exparser.addListenerToElement(document, 'hideKeyboard', function (t) {
        self._keyboardShow && self.$.input.blur();
      }), this.__onDocumentTouchStart = this.onDocumentTouchStart.bind(this), this.__updateInput = this.updateInput.bind(this), this.__inputKeyUp = this._inputKeyUp.bind(this), this.$.input.addEventListener('keyup', this.__inputKeyUp), document.addEventListener('touchstart', this.__onDocumentTouchStart), document.addEventListener('pageReRender', this.__updateInput), (this.autoFocus || this.focus) && setTimeout(function () {
        self._couldFocus(self.autoFocus || self.focus);
      }, 500);
    },
    detached: function detached() {
      document.removeEventListener('pageReRender', this.__updateInput), document.removeEventListener('touchstart', this.__onDocumentTouchStart), this.$.input.removeEventListener('keyup', this.__inputKeyUp), exparser.removeListenerFromElement(document, 'routeDone', this.__routeDoneId), exparser.removeListenerFromElement(document, 'hideKeyboard', this.__hideKeyboardId), exparser.removeListenerFromElement(document, 'onKeyboardComplete', this.__onKeyboardCompleteId), exparser.removeListenerFromElement(document, 'setKeyboardValue', this.__setKeyboardValueId);
    },
    onDocumentTouchStart: function onDocumentTouchStart() {
      this._keyboardShow && this.$.input.blur();
    },
    _getType: function _getType(type, isPswd) {
      var typeTable = {
        digit: 'number',
        number: 'number',
        email: 'email',
        password: 'password'
      };
      return isPswd && 'password' || typeTable[type] || 'text';
    },
    _showValueChange: function _showValueChange(value) {
      this.$.input.value = value;
    },
    _inputFocus: function _inputFocus(e) {
      this.disabled || this._keyboardShow || (this._keyboardShow = !0, this.triggerEvent('focus', {
        value: this.value
      }), this.$.input.focus());
    },
    _inputBlur: function _inputBlur(e) {
      ;this._keyboardShow = !1, this.value = this._value, this._formGetDataCallback(), this.triggerEvent('change', { value: this.value }), this.triggerEvent('blur', {
        value: this.value
      }), this._checkPlaceholderStyle(this.value);
    },
    _inputKeyUp: function _inputKeyUp(event) {
      if (event.keyCode == 13) {
        this.triggerEvent('confirm', { value: this._value });
        return void (this.confirmHold || (this.value = this._value, this.$.input.blur()));
      }
    },
    _inputKey: function _inputKey(event) {
      var value = event.target.value;
      this._value = value;
      this._checkPlaceholderStyle(value);
      if (this.bindinput) {
        var target = {
          id: this.$$.id,
          dataset: this.dataset,
          offsetTop: this.$$.offsetTop,
          offsetLeft: this.$$.offsetLeft
        };
        WeixinJSBridge.publish('SPECIAL_PAGE_EVENT', {
          eventName: this.bindinput,
          data: {
            ext: {
              setKeyboardValue: !0
            },
            data: {
              type: 'input',
              timestamp: Date.now(),
              detail: {
                value: event.target.value,
                cursor: this.$.input.selectionStart
              },
              target: target,
              currentTarget: target,
              touches: []
            },
            eventName: this.bindinput
          }
        });
      }
      return !1;
    },
    updateInput: function updateInput() {
      var styles = window.getComputedStyle(this.$$),
          bounds = this.$$.getBoundingClientRect(),
          pos = (['Left', 'Right'].map(function (type) {
        return parseFloat(styles['border' + type + 'Width']) + parseFloat(styles['padding' + type]);
      }), ['Top', 'Bottom'].map(function (type) {
        return parseFloat(styles['border' + type + 'Width']) + parseFloat(styles['padding' + type]);
      })),
          inputObj = this.$.input,
          height = bounds.height - pos[0] - pos[1];
      height != this.__lastHeight && (inputObj.style.height = height + 'px', inputObj.style.lineHeight = height + 'px', this.__lastHeight = height), inputObj.style.color = styles.color;
      var ele = this.$.placeholder;ele.style.height = bounds.height - pos[0] - pos[1] + 'px', ele.style.lineHeight = ele.style.height;
    },
    defaultValueChange: function defaultValueChange(value, t) {
      this.maxlength > 0 && (value = value.slice(0, this.maxlength)), this._checkPlaceholderStyle(value), this._showValueChange(value), this._value = value;
      return value;
    },
    _getPlaceholderStyle: function _getPlaceholderStyle(placeholderStyle) {
      return placeholderStyle;
    },
    _placeholderClassChange: function _placeholderClassChange(className) {
      var classs = className.split(/\s/);
      this._placeholderClass = [];
      for (var n = 0; n < classs.length; n++) {
        classs[n] && this._placeholderClass.push(classs[n]);
      }
    },
    _checkPlaceholderStyle: function _checkPlaceholderStyle(hide) {
      var phClasss = this._placeholderClass || [],
          placeholderNode = this.$.placeholder;
      if (hide) {
        if (this._placeholderShow && (placeholderNode.classList.remove('input-placeholder'), placeholderNode.setAttribute('style', ''), phClasss.length > 0)) {
          for (var i = 0; i < phClasss.length; i++) {
            placeholderNode.classList.contains(phClasss[i]) && placeholderNode.classList.remove(phClasss[i]);
          }
        }
        ;placeholderNode.style.display = 'none', this._placeholderShow = !1;
      } else {
        if (!this._placeholderShow && (placeholderNode.classList.add('input-placeholder'), this.placeholderStyle && placeholderNode.setAttribute('style', this.placeholderStyle), phClasss.length > 0)) {
          for (var i = 0; i < phClasss.length; i++) {
            placeholderNode.classList.add(phClasss[i]);
          }
        }
        ;placeholderNode.style.display = '', this.updateInput(), this._placeholderShow = !0;
      }
    }
  });
}();
module.exports = exports['default'];

/***/ }),

/***/ 9942:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-label
exports["default"] = window.exparser.registerElement({
  is: 'wx-label',
  template: '\n    <slot></slot>\n  ',
  properties: {
    for: {
      type: String,
      public: !0
    }
  },
  listeners: {
    tap: 'onTap'
  },
  behaviors: ['wx-base'],
  _handleNode: function _handleNode(ele, event) {
    return !!(ele instanceof exparser.Element && ele.hasBehavior('wx-label-target')) && (ele.handleLabelTap(event), !0);
  },
  dfs: function dfs(ele, event) {
    if (this._handleNode(ele, event)) return !0;
    if (!ele.childNodes) return !1;
    for (var idx = 0; idx < ele.childNodes.length; ++idx) {
      if (this.dfs(ele.childNodes[idx], event)) return !0;
    }
    return !1;
  },
  onTap: function onTap(event) {
    for (var target = event.target; target instanceof exparser.Element && target !== this; target = target.parentNode) {
      if (target.hasBehavior('wx-label-target')) return;
    }
    if (this.for) {
      var boundEle = document.getElementById(this.for);
      boundEle && this._handleNode(boundEle.__wxElement, event);
    } else {
      this.dfs(this, event);
    }
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 2571:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-loading
exports["default"] = window.exparser.registerElement({
  is: 'wx-loading',
  template: '\n    <div class="wx-loading-mask" style$="background-color: transparent;"></div>\n    <div class="wx-loading">\n      <i class="wx-loading-icon"></i><p class="wx-loading-content"><slot></slot></p>\n    </div>\n  ',
  // template: '\n    <div class="wx-loading-mask" style$="background-color: transparent;"></div>\n    <div class="wx-loading">\n      <invoke class="wx-loading-icon"></invoke><p class="wx-loading-content"><slot></slot></p>\n    </div>\n  ',
  behaviors: ['wx-base']
});
module.exports = exports['default'];

/***/ }),

/***/ 3302:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-mask
exports["default"] = window.exparser.registerElement({
  is: 'wx-mask',
  template: '\n    <div class="wx-mask" id="mask" style="display: none;">\n  ',
  behaviors: ['wx-base'],
  properties: {
    hidden: {
      type: Boolean,
      value: !0,
      observer: 'hiddenChange',
      public: !0
    }
  },
  hiddenChange: function hiddenChange(hide) {
    var mask = this.$.mask;
    hide === !0 ? (setTimeout(function () {
      mask.style.display = 'none';
    }, 300), this.$.mask.classList.add('wx-mask-transparent')) : (mask.style.display = 'block', mask.focus(), mask.classList.remove('wx-mask-transparent'));
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 7375:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-navigator
exports["default"] = window.exparser.registerElement({
  is: 'wx-navigator',
  behaviors: ['wx-base', 'wx-hover'],
  template: '<slot></slot>',
  properties: {
    url: {
      type: String,
      public: !0
    },
    redirect: {
      type: Boolean,
      value: !1,
      public: !0
    },
    openType: {
      type: String,
      value: 'navigate',
      public: !0
    },
    hoverClass: {
      type: String,
      value: '',
      public: !0
    },
    hoverStyle: {
      type: String,
      value: '',
      public: !0
    },
    hover: {
      type: Boolean,
      value: !0
    },
    hoverStayTime: {
      type: Number,
      value: 600,
      public: !0
    }
  },
  listeners: {
    tap: 'navigateTo'
  },
  navigateTo: function navigateTo() {
    if (!this.url) {
      return void console.error('navigator should have url attribute');
    }
    if (this.redirect) {
      return void wd.redirectTo({
        url: this.url
      });
    }
    switch (this.openType) {
      case 'navigate':
        return void wd.navigateTo({
          url: this.url
        });
      case 'redirect':
        return void wd.redirectTo({
          url: this.url
        });
      case 'switchTab':
        return void wd.switchTab({
          url: this.url
        });
      case 'reLaunch':
        return void wd.reLaunch({
          url: this.url
        });
      default:
        return void console.error('navigator: invalid openType ' + this.openType);
    }
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 6298:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var textParser = function () {
  var parserCreator = function () {
    var creator = function creator() {};
    creator.prototype = (0, _create2.default)(Object.prototype, {
      constructor: { value: creator, writable: !0, configurable: !0 }
    });
    var t = function t(e, _t) {
      var n = _t - 30 + 1;
      n < 0 && (n = 0);
      return 'L' + ((e.slice(0, _t).match(/(\r|\n|\r\n)/g) || []).length + 1) + ': ' + e.slice(n, _t + 1);
    };
    creator.create = function (t, n) {
      var i = (0, _create2.default)(creator.prototype);
      i._cbs = n;
      var o = i._stateTable = {},
          r = i._stateRecTable = {},
          a = {},
          s = {},
          l = function l(e, n, i, o, r) {
        if (Object.prototype.hasOwnProperty.call(t, i)) {
          if (r[i]) {
            if (!r[i].overwrite) {
              throw new Error('State "' + e + '" has multiple possible rules on symbol "' + i + '".');
            }
          } else r[i] = n;
        } else if (i !== 'ALL' && i !== 'NULL' && i.length > 1) {
          if (o[i]) {
            if (!o[i].overwrite) {
              throw new Error('State "' + e + '" has multiple possible rules on symbol "' + i + '".');
            }
          } else {
            for (var a = 0; a < i.length; a++) {
              if (i[a + 1] === '-' && i[a + 2]) {
                for (var s = i.charCodeAt(a + 2), l = i.charCodeAt(a); l <= s; l++) {
                  o[String.fromCharCode(l)] = n;
                }
                a += 2;
              } else o[i[a]] = n;
            }
          }
        } else if (o[i]) {
          if (!o[i].overwrite) {
            throw new Error('State "' + e + '" has multiple possible rules on symbol "' + i + '".');
          }
        } else o[i] = n;
      },
          c = '';
      for (c in t) {
        for (var d = t[c], u = o[c] = {}, h = r[c] = {}, p = a[c] = {}, f = s[c] = {}, A = 0; A < d.length; A++) {
          var g = d[A],
              _ = g.states[0];
          _ === c ? (_ = g.states[1], l(c, g, _, h, f)) : l(c, g, _, u, p);
        }
      }
      var v = null,
          w = function e(t, n, i) {
        if (v[t] !== 2) {
          if (v[t] === 1) {
            throw new Error('State "' + t + '" has illegal recursive rule definition.');
          }
          v[t] = 1;
          var r = n[t],
              a = i[t];
          for (var s in r) {
            e(s, n, i);
            var l = o[s];
            for (var c in l) {
              if (a[c]) {
                if (!a[c].overwrite) {
                  throw new Error('State "' + t + '" has multiple possible rules on symbol "' + c + '".');
                }
              } else a[c] = r[s];
            }
          }
          v[t] = 2;
        }
      };
      v = {};
      for (c in a) {
        w(c, a, o);
      }
      v = {};
      for (c in s) {
        w(c, s, r);
      }
      return i;
    };
    creator.prototype.parse = function (e, i, o) {
      var r = { str: i, pos: 0 };
      var a = n(this._stateTable, this._stateRecTable, e, r, this._cbs, o);
      if (r.str.length > r.pos) {
        throw new Error('Unexpected character "' + r.str[r.pos] + '" in position ' + t(r.str, r.pos) + r.pos + ', near ');
      }
      return a;
    };
    var n = function e(n, i, o, r, a, s) {
      var l = n[o],
          c = null;
      r.str.length > r.pos && (c = l[r.str[r.pos]]);
      if (!c && (r.str.length > r.pos && (c = l.ALL), !c)) {
        if (!(c = l.NULL)) {
          throw new Error('Unexpected character "' + r.str[r.pos] + '" in position ' + r.pos + ' (in state "' + o + '"), near ' + t(r.str, r.pos));
        }
        if (c.states[0] === 'NULL') {
          return a[c.id] ? a[c.id]([], s) : { r: c.id, c: [] };
        }
      }
      var d = function d(l, c, _d) {
        var u = l.states,
            h = [];
        c && h.push(_d);
        for (var p = c ? 1 : 0; p < u.length; p++) {
          var f = u[p];
          if (Object.prototype.hasOwnProperty.call(n, f)) {
            h.push(e(n, i, f, r, a, s));
          } else if (f === 'ALL') h.push(r.str[r.pos]), r.pos++;else {
            for (var A = r.str[r.pos], g = r.str.charCodeAt(r.pos), _ = 0; _ < f.length; _++) {
              if (f[_ + 1] === '-' && f[_ + 2]) {
                var v = f.charCodeAt(_),
                    w = f.charCodeAt(_ + 2);
                if (v <= g && g <= w) break;
                _ += 2;
              } else if (A === f[_]) break;
            }
            if (_ === f.length) {
              throw new Error('Unexpected character "' + A + '" in position ' + r.pos + ' (expect "' + f + '" in state "' + o + '"), near ' + t(r.str, r.pos));
            }
            h.push(A), r.pos++;
          }
        }
        return a[l.id] ? a[l.id](h, s) : { r: l.id, c: h };
      };
      for (u = d(c); r.str.length > r.pos && ((c = i[o][r.str[r.pos]]) || (c = i[o].ALL));) {
        u = d(c, !0, u);
      }
      return u;
    };
    return creator;
  }();
  var t = { TAG_START: 1, TAG_END: -1, TEXT: 3, COMMENT: 8 };
  var entities = {
    amp: '&',
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
    apos: "'"
  };
  var decodeEntities = function decodeEntities(text) {
    return text.replace(/&([a-zA-Z]*?);/g, function (match, p1) {
      if (entities.hasOwnProperty(p1) && entities[p1]) return entities[p1];
      if (/^#[0-9]{1,4}$/.test(p1)) return String.fromCharCode(p1.slice(1));
      if (/^#x[0-9a-f]{1,4}$/i.test(p1)) {
        return String.fromCharCode('0' + p1.slice(1));
      }
      throw new Error('HTML Entity "' + match + '" is not supported.');
    });
  };
  var o = function o(e) {
    switch (e) {
      case 'area':
      case 'base':
      case 'basefont':
      case 'br':
      case 'col':
      case 'frame':
      case 'hr':
      case 'img':
      case 'input':
      case 'keygen':
      case 'link':
      case 'meta':
      case 'param':
      case 'source':
      case 'track':
        return !0;
      default:
        return !1;
    }
  };
  var parser = null;
  var init = function init() {
    var tags = {
      TEXT: [{ id: 'tag', states: ['TEXT', 'TAG'] }, { id: 'text', states: ['TEXT', 'ALL'] }, { id: 'tag1', states: ['TAG'] }, { id: 'text1', states: ['ALL'] }, { id: '_null', states: ['NULL'], overwrite: !0 }],
      TAG: [{ id: '_blank', states: ['<', 'TAG_START'] }],
      TAG_END: [{ id: '_concat', states: ['/', '>'] }, { id: '_jump', states: ['>'] }],
      TAG_START: [{ id: 'comment', states: ['!', '-', '-', 'COMMENT_CONTENT'] }, { id: 'endTag', states: ['/', 'TAG_NAME', '>'] }, { id: 'startTag', states: ['TAG_NAME', 'ATTRS', 'TAG_END'] }],
      TAG_NAME: [{ id: '_concat', states: ['TAG_NAME', '-_a-zA-Z0-9.:'] }, { id: '_jump', states: ['a-zA-Z'] }],
      ATTRS: [{ id: '_blank', states: [' \n\r\t\f', 'ATTRS'] }, { id: '_jump', states: ['ATTRS', ' \n\r\t\f'] }, { id: 'attrs', states: ['ATTR', 'ATTRS'] }, { id: '_null', states: ['NULL'], overwrite: !0 }],
      ATTR: [{ id: 'attr', states: ['ATTR_NAME', 'ATTR_NAME_AFTER'] }],
      ATTR_NAME: [{ id: '_concat', states: ['ATTR_NAME', '-_a-zA-Z0-9.:$&'] }, { id: '_jump', states: ['-_a-zA-Z0-9.:$&'] }],
      ATTR_NAME_AFTER: [{ id: '_blank', states: ['=', 'ATTR_VALUE'] }, { id: '_empty', states: ['NULL'] }],
      ATTR_VALUE: [{ id: '_blank', states: ['"', 'ATTR_VALUE_INNER_1'] }, { id: '_blank', states: ["'", 'ATTR_VALUE_INNER_2'] }],
      ATTR_VALUE_INNER_1: [{ id: '_empty', states: ['"'] }, { id: '_concat', states: ['ALL', 'ATTR_VALUE_INNER_1'] }],
      ATTR_VALUE_INNER_2: [{ id: '_empty', states: ["'"] }, { id: '_concat', states: ['ALL', 'ATTR_VALUE_INNER_2'] }],
      COMMENT_CONTENT: [{ id: '_concat', states: ['ALL', 'COMMENT_CONTENT'] }, { id: '_concat', states: ['-', 'COMMENT_CONTENT_DASH_1'] }],
      COMMENT_CONTENT_DASH_1: [{ id: '_concat', states: ['ALL', 'COMMENT_CONTENT'] }, { id: '_concat', states: ['-', 'COMMENT_CONTENT_DASH_2'] }],
      COMMENT_CONTENT_DASH_2: [{ id: '_concat', states: ['ALL', 'COMMENT_CONTENT'] }, { id: '_concat', states: ['-', 'COMMENT_CONTENT_DASH_2'] }, { id: '_jump', states: ['>'] }]
    };
    var tagPoints = {
      _null: function _null() {},
      _empty: function _empty() {
        return '';
      },
      _jump: function _jump(e) {
        return e[0];
      },
      _concat: function _concat(e) {
        return e[0] + e[1];
      },
      _blank: function _blank(e) {
        return e[1];
      },
      attr: function attr(e) {
        return { n: e[0], v: e[1] };
      },
      attrs: function attrs(e) {
        var t = e[1] || {};
        t[e[0].n] = e[0].v;
        return t;
      },
      startTag: function startTag(e) {
        var n = e[0].toLowerCase();
        return {
          t: t.TAG_START,
          n: n,
          a: e[1] || {},
          selfClose: e[2] === '/>' || o(n)
        };
      },
      endTag: function endTag(e) {
        return { t: t.TAG_END, n: e[1].toLowerCase() };
      },
      comment: function comment(e) {
        return { t: t.COMMENT, c: e[3].slice(0, -3) };
      },
      tag1: function tag1(e) {
        return [e[0]];
      },
      text1: function text1(e) {
        return [{ t: t.TEXT, c: e[0] }];
      },
      tag: function tag(e) {
        return e[0].push(e[1]), e[0];
      },
      text: function text(e) {
        var n = e[0];
        return n[n.length - 1].t === t.TEXT ? n[n.length - 1].c += e[1] : n.push({ t: t.TEXT, c: e[1] }), n;
      }
    };
    parser = parserCreator.create(tags, tagPoints);
  };
  var s = function s(e) {
    var rootNode = { children: [] },
        i = rootNode,
        o = [],
        r = null;
    for (var a = 0; a < e.length; a++) {
      var s = e[a];
      r = { name: s.n, attrs: s.a, children: [] };
      i.children.push(r);
      if (s.t === t.TAG_START) {
        s.selfClose || (o.push(i), i = r);
      } else if (s.t === t.TAG_END) {
        for (; s.n !== i.name;) {
          if (!(i = o.pop())) {
            throw new Error('No matching start tag found for "</' + s.n + '>"');
          }
        }
        i = o.pop();
      } else {
        s.t === t.TEXT && s.c && i.children.push({ type: 'text', text: s.c });
      }
    }
    return rootNode;
  };
  return {
    parse: function parse(txt) {
      parser || init();
      var t = parser.parse('TEXT', txt) || [];
      return s(t).children;
    },
    decodeEntities: decodeEntities
  };
}();

var nodeParser = {
  rules: {
    a: 'nA',
    abbr: 'nA',
    b: 'nA',
    blockquote: 'nA',
    br: 'nA',
    code: 'nA',
    col: 'fA',
    colgroup: 'fA',
    dd: 'nA',
    del: 'nA',
    div: 'nA',
    dl: 'nA',
    dt: 'nA',
    em: 'nA',
    fieldset: 'nA',
    h1: 'nA',
    h2: 'nA',
    h3: 'nA',
    h4: 'nA',
    h5: 'nA',
    h6: 'nA',
    hr: 'nA',
    i: 'nA',
    img: 'fA',
    ins: 'nA',
    label: 'nA',
    legend: 'nA',
    li: 'nA',
    ol: 'fA',
    p: 'nA',
    q: 'nA',
    span: 'nA',
    strong: 'nA',
    sub: 'nA',
    sup: 'nA',
    table: 'fA',
    tbody: 'nA',
    td: 'fA',
    tfoot: 'nA',
    th: 'fA',
    thead: 'nA',
    tr: 'nA',
    ul: 'nA'
  },
  fA: function fA(t, n, i, o) {
    var r = {
      col: { span: 'nF', width: 'nF' },
      colgroup: { span: 'nF', width: 'nF' },
      img: { alt: 'nF', src: 'fL', height: 'nF', width: 'nF' },
      ol: { start: 'nF', type: 'nF' },
      table: { width: 'nF' },
      td: { colspan: 'nF', height: 'nF', rowspan: 'nF', width: 'nF' },
      th: { colspan: 'nF', height: 'nF', rowspan: 'nF', width: 'nF' }
    };
    var a = r[i][t];
    if (r.hasOwnProperty(i) && r[i].hasOwnProperty(t)) {
      switch (a) {
        case void 0:
          break;
        case 'nF':
          o.setAttribute(t, n);
          break;
        default:
          return nodeParser[a] && nodeParser[a](t, n, i, o);
      }
    }
  },
  fL: function fL(e, t, n, i) {
    i.setAttribute(e, t);
  },
  parse: function parse(nodes, i, o) {
    nodes.map(function (node) {
      if ((void 0 === node ? 'undefined' : typeof node === 'undefined' ? 'undefined' : (0, _typeof3.default)(node)) === 'object') {
        if (void 0 === node.type || node.type === 'node' || node.type === '') {
          if (typeof node.name === 'string' && node.name !== '') {
            var r = node.name.toLowerCase();
            if (nodeParser.rules.hasOwnProperty(r)) {
              var a = nodeParser.rules[r],
                  s = document.createElement(r);
              if (s) {
                if ((0, _typeof3.default)(node.attrs) === 'object') {
                  for (var l in node.attrs) {
                    var c = l.toLowerCase(),
                        d = textParser.decodeEntities(node.attrs[l]);
                    if (c === 'class') {
                      var u = o ? d.replace(/\S+/g, function (e) {
                        return o + e;
                      }) : d;
                      s.setAttribute('class', u);
                    } else {
                      c === 'style' ? s.setAttribute('style', d) : a !== 'nA' && nodeParser[a] && nodeParser[a](c, d, r, s);
                    }
                  }
                }
                (0, _typeof3.default)(node.children) === 'object' && node.children instanceof Array && node.children.length && nodeParser.parse(node.children, s, o), i.appendChild(s);
              }
            }
          }
        } else {
          node.type === 'text' && typeof node.text === 'string' && node.text !== '' && i.appendChild(document.createTextNode(textParser.decodeEntities(node.text)));
        }
      }
    });
    return i;
  }
};

window.exparser.registerElement({
  is: 'wx-rich-text',
  template: '<div id="rich-text"><slot></slot></div>',
  // template: function (e, t, n) {
  //   return [
  //     {
  //       t: 1,
  //       n: 'div',
  //       id: 'rich-text',
  //       a: [],
  //       c: [{ t: 1, n: 'slot', v: !0, sn: '', a: [], c: [] }]
  //     }
  //   ]
  // },
  behaviors: ['wx-base'],
  properties: {
    nodes: { value: [], public: !0, observer: '_nodesObserver' }
  },
  created: function created() {
    this._ready = !1;
    this._cachedVal = null;
  },
  attached: function attached() {
    this._classPrefix = '';
    if (this.ownerShadowRoot) {
      var e = this.classList._prefix;
      e && (this._classPrefix = e + '--');
    }
    this._ready = !0;
    if (this._cachedVal) {
      var t = this._cachedVal;
      this._cachedVal = null;
      this._nodesObserver(t);
    }
  },
  _nodesObserver: function _nodesObserver(nodes) {
    if (!this._ready) return void (this._cachedVal = nodes);
    this.$['rich-text'].innerHTML = '';
    if (Array.isArray(nodes)) {
      this.$['rich-text'].appendChild(nodeParser.parse(nodes, document.createDocumentFragment(), this._classPrefix));
    } else if (typeof nodes === 'string') {
      this.$['rich-text'].innerHTML = nodes;
    } else {
      console.group(new Date() + ' nodes属性只支持 String 和 Array 类型');
      console.warn('nodes属性只支持 String 和 Array 类型，请检查输入的值。');
      console.groupEnd();
    }
  }
});

/***/ }),

/***/ 41:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// wx-text
exports["default"] = window.exparser.registerElement({
  is: 'wx-text',
  template: '\n    <span id="raw" style="display:none;"><slot></slot></span>\n    <span id="main"></span>\n  ',
  behaviors: ['wx-base'],
  properties: {
    style: {
      type: String,
      public: !0,
      observer: '_styleChanged'
    },
    class: {
      type: String,
      public: !0,
      observer: '_classChanged'
    },
    selectable: {
      type: Boolean,
      value: !1,
      public: !0
    },
    decode: {
      type: Boolean,
      value: !1,
      public: !0
    },
    space: {
      type: String,
      value: '',
      public: !0
    }
  },
  _styleChanged: function _styleChanged(styles) {
    this.$$.setAttribute('style', styles);
  },
  _classChanged: function _classChanged(cls) {
    this.$$.setAttribute('class', cls);
  },
  _htmlDecode: function _htmlDecode(txt) {
    this.space && (this.space === 'nbsp' ? txt = txt.replace(/ /g, ' ') : this.space === 'ensp' ? txt = txt.replace(/ /g, ' ') : this.space === 'emsp' && (txt = txt.replace(/ /g, ' ')));

    return this.decode ? txt.replace(/&nbsp;/g, ' ').replace(/&ensp;/g, ' ').replace(/&emsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&') : txt;
  },
  _update: function _update() {
    var rawEle = this.$.raw,
        fragment = document.createDocumentFragment(),
        idx = 0,
        len = rawEle.childNodes.length;
    for (; idx < len; idx++) {
      var childNode = rawEle.childNodes.item(idx);
      if (childNode.nodeType === childNode.TEXT_NODE) {
        var txtList = this._htmlDecode(decodeURIComponent(childNode.textContent)).split('\n');
        for (var i = 0; i < txtList.length; i++) {
          i && fragment.appendChild(document.createElement('br'));
          fragment.appendChild(document.createTextNode(txtList[i]));
        }
      } else {
        childNode.nodeType === childNode.ELEMENT_NODE && childNode.tagName === 'WX-TEXT' && fragment.appendChild(childNode.cloneNode(!0));
      }
    }
    this.$.main.innerHTML = '';
    this.$.main.appendChild(fragment);
  },
  created: function created() {
    this._observer = exparser.Observer.create(function () {
      this._update();
    });
    this._observer.observe(this, {
      childList: !0,
      subtree: !0,
      characterData: !0,
      properties: !0
    });
  },
  attached: function attached() {
    this._update();
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 5570:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// prettier-ignore
exports["default"] = window.exparser.registerElement({
  is: 'wx-view',
  template: '<slot></slot>',
  behaviors: ['wx-base', 'wx-hover'],
  properties: {
    inline: {
      type: Boolean,
      public: !0
    },
    hover: {
      type: Boolean,
      value: !1,
      public: !0
    }
  }
});
module.exports = exports['default'];

/***/ }),

/***/ 4365:
/***/ (() => {

"use strict";


// let e = !1
window.exparser.registerElement({
  is: 'wx-web-view',
  // template: function (e, t, n) {
  //   return [{ t: 1, n: 'div', a: [], c: [] }]
  // },
  template: '<div></div>',
  behaviors: ['wx-base', 'wx-native', 'wx-positioning-target'],
  properties: { src: { type: String, public: !0, observer: 'srcChange' } },
  srcChange: function srcChange(e, t) {
    if (this._isReady) {
      var n = this.uuid;
      WeixinJSBridge.invoke('updateHTMLWebView', { htmlId: n, src: (e || '').trim() }, function (e) {});
    } else this._deferred.push({ callback: 'srcChange', args: [e, t] });
  },
  _hiddenChanged: function _hiddenChanged(e, t) {},
  inserted: !1,
  attached: function attached() {
    if (this.inserted) return void console.warn('一个页面只能插入一个 `wx-web-view`。');
    this.uuid = this.getPositioningId();
    var t = this,
        n = this.uuid;
    wx.getSystemInfo({
      success: function success(e) {
        t.$$.style.width = e.windowWidth + 'px';
        t.$$.style.height = e.windowHeight + 'px';
        // var i = document.querySelector('body')
        // i.style.height = e.windowHeight + 'px'
        // i.style.overflowY = 'hidden'
        WeixinJSBridge.invoke('insertHTMLWebView', {
          htmlId: n,
          position: {
            left: 0,
            top: 0,
            width: e.windowWidth,
            height: e.windowHeight
          }
        }, function (e) {
          ;/ok/.test(e.errMsg) && t._ready();
        });
      }
    });
    this.inserted = !0;
  },
  detached: function detached() {
    var _this = this;

    var t = this.uuid;
    WeixinJSBridge.invoke('removeHTMLWebView', { htmlId: t }, function (t) {
      document.body.style.height = '';
      document.body.style.overflowY = '';
      _this.inserted = !1;
    });
  }
});

/***/ }),

/***/ 4052:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// 转发 window 上的 animation 和 transition 相关的动画事件到 exparser
;(function (win) {
  var getOpt = function getOpt(args) {
    return {
      animationName: args.animationName,
      elapsedTime: args.elapsedTime
    };
  },
      isWebkit = null;
  var animationAPIList = ['webkitAnimationStart', 'webkitAnimationIteration', 'webkitAnimationEnd', 'animationstart', 'animationiteration', 'animationend', 'webkitTransitionEnd', 'transitionend'];
  animationAPIList.forEach(function (key) {
    isWebkit = key.slice(0, 6) === 'webkit';
    if (isWebkit) {
      key = key.slice(6).toLowerCase();
    }

    win.addEventListener(key, function (event) {
      event.target.__wxElement && exparser.triggerEvent(event.target.__wxElement, key, getOpt(event));
      document.dispatchEvent(new CustomEvent('pageReRender', {}));
    }, !0);
  });
})(window)

// 订阅并转发 WeixinJSBridge 提供的全局事件到 exparser
;(function (glob) {
  WeixinJSBridge.subscribe('onAppRouteDone', function () {
    window.__onAppRouteDone = !0;
    exparser.triggerEvent(document, 'routeDone', {}, {
      bubbles: !0
    });
    document.dispatchEvent(new CustomEvent('pageReRender', {}));
  });
  WeixinJSBridge.subscribe('setKeyboardValue', function (event) {
    event && event.data && exparser.triggerEvent(document, 'setKeyboardValue', {
      value: event.data.value,
      cursor: event.data.cursor,
      inputId: event.data.inputId
    }, {
      bubbles: !0
    });
  });
  WeixinJSBridge.subscribe('hideKeyboard', function (e) {
    exparser.triggerEvent(document, 'hideKeyboard', {}, {
      bubbles: !0
    });
  });
  WeixinJSBridge.on('onKeyboardComplete', function (event) {
    exparser.triggerEvent(document, 'onKeyboardComplete', {
      value: event.value,
      inputId: event.inputId
    }, {
      bubbles: !0
    });
  });
  WeixinJSBridge.on('onKeyboardConfirm', function (event) {
    exparser.triggerEvent(document, 'onKeyboardConfirm', {
      value: event.value,
      inputId: event.inputId
    }, {
      bubbles: !0
    });
  });
  WeixinJSBridge.on('onTextAreaHeightChange', function (event) {
    exparser.triggerEvent(document, 'onTextAreaHeightChange', {
      height: event.height,
      lineCount: event.lineCount,
      inputId: event.inputId
    }, {
      bubbles: !0
    });
  });
  WeixinJSBridge.on('onKeyboardShow', function (event) {
    exparser.triggerEvent(document, 'onKeyboardShow', {
      inputId: event.inputId
    }, {
      bubbles: !0
    });
  });
})(window)

// 转发 window 上的 error 以及各种表单事件到 exparser
;(function (window) {
  exparser.globalOptions.renderingMode = 'native';

  window.addEventListener('change', function (event) {
    exparser.triggerEvent(event.target, 'change', {
      value: event.target.value
    });
  }, !0);

  window.addEventListener('input', function (event) {
    exparser.triggerEvent(event.target, 'input');
  }, !0);

  window.addEventListener('load', function (event) {
    exparser.triggerEvent(event.target, 'load');
  }, !0);

  window.addEventListener('error', function (event) {
    exparser.triggerEvent(event.target, 'error');
  }, !0);

  window.addEventListener('focus', function (event) {
    exparser.triggerEvent(event.target, 'focus'), event.preventDefault();
  }, !0);

  window.addEventListener('blur', function (event) {
    exparser.triggerEvent(event.target, 'blur');
  }, !0);

  window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame || (window.requestAnimationFrame = function (func) {
    typeof func === 'function' && setTimeout(function () {
      func();
    }, 17);
  });
})(window);(function (win) {
  // touch events
  var triggerEvent = function triggerEvent(event, name, params) {
    exparser.triggerEvent(event.target, name, params, {
      originalEvent: event,
      bubbles: !0,
      composed: !0,
      extraFields: {
        touches: event.touches,
        changedTouches: event.changedTouches
      }
    });
  },
      distanceThreshold = 10,
      longtapGapTime = 350,
      wxScrollTimeLowestValue = 50,
      setTouches = function setTouches(event, change) {
    event[change ? 'changedTouches' : 'touches'] = [{
      identifier: 0,
      pageX: event.pageX,
      pageY: event.pageY,
      clientX: event.clientX,
      clientY: event.clientY,
      screenX: event.screenX,
      screenY: event.screenY,
      target: event.target
    }];
    return event;
  },
      isTouchstart = !1,
      oriTimeStamp = 0,
      curX = 0,
      curY = 0,
      curEvent = 0,
      longtapTimer = null,
      isCancletap = !1,
      canceltap = function canceltap(node) {
    for (; node; node = node.parentNode) {
      var element = node.__wxElement || node;
      if (element.__wxScrolling && Date.now() - element.__wxScrolling < wxScrollTimeLowestValue) {
        return !0;
      }
    }
    return !1;
  },
      triggerLongtap = function triggerLongtap() {
    triggerEvent(curEvent, 'longtap', {
      x: curX,
      y: curY
    });
  },
      touchstart = function touchstart(event, x, y) {
    if (!oriTimeStamp) {
      oriTimeStamp = event.timeStamp;
      curX = x;
      curY = y;
      if (canceltap(event.target)) {
        longtapTimer = null;
        isCancletap = !0;
        triggerEvent(event, 'canceltap', {
          x: x,
          y: y
        });
      } else {
        longtapTimer = setTimeout(triggerLongtap, longtapGapTime);
        isCancletap = !1;
      }
      curEvent = event;
      event.defaultPrevented && (oriTimeStamp = 0);
    }
  },
      touchmove = function touchmove(e, x, y) {
    if (oriTimeStamp) {
      if (!(Math.abs(x - curX) < distanceThreshold && Math.abs(y - curY) < distanceThreshold)) {
        longtapTimer && (clearTimeout(longtapTimer), longtapTimer = null);
        isCancletap = !0;
        triggerEvent(curEvent, 'canceltap', {
          x: x,
          y: y
        });
      }
    }
  },
      touchend = function touchend(event, x, y, isTouchcancel) {
    if (oriTimeStamp) {
      oriTimeStamp = 0;
      longtapTimer && (clearTimeout(longtapTimer), longtapTimer = null);
      if (isTouchcancel) {
        event = curEvent;
        x = curX;
        y = curY;
      } else {
        if (!isCancletap) {
          triggerEvent(curEvent, 'tap', {
            x: x,
            y: y
          });
          readyAnalyticsReport(curEvent);
        }
      }
    }
  };
  win.addEventListener('scroll', function (event) {
    event.target.__wxScrolling = Date.now();
  }, {
    capture: !0,
    passive: !1
  });
  win.addEventListener('touchstart', function (event) {
    isTouchstart = !0;
    triggerEvent(event, 'touchstart');
    event.touches.length === 1 && touchstart(event, event.touches[0].pageX, event.touches[0].pageY);
  }, {
    capture: !0,
    passive: !1
  });
  win.addEventListener('touchmove', function (event) {
    triggerEvent(event, 'touchmove');
    event.touches.length === 1 && touchmove(event, event.touches[0].pageX, event.touches[0].pageY);
  }, {
    capture: !0,
    passive: !1
  });
  win.addEventListener('touchend', function (event) {
    triggerEvent(event, 'touchend');
    event.touches.length === 0 && touchend(event, event.changedTouches[0].pageX, event.changedTouches[0].pageY);
  }, {
    capture: !0,
    passive: !1
  });
  win.addEventListener('touchcancel', function (event) {
    triggerEvent(event, 'touchcancel');
    touchend(null, 0, 0, !0);
  }, {
    capture: !0,
    passive: !1
  });
  window.addEventListener('blur', function () {
    touchend(null, 0, 0, !0);
  });
  win.addEventListener('mousedown', function (event) {
    if (!isTouchstart && !oriTimeStamp) {
      setTouches(event, !1);
      triggerEvent(event, 'touchstart');
      touchstart(event, event.pageX, event.pageY);
    }
  }, {
    capture: !0,
    passive: !1
  });
  win.addEventListener('mousemove', function (event) {
    if (!isTouchstart && oriTimeStamp) {
      setTouches(event, !1);
      triggerEvent(event, 'touchmove');
      touchmove(event, event.pageX, event.pageY);
    }
  }, {
    capture: !0,
    passive: !1
  });
  win.addEventListener('mouseup', function (event) {
    if (!isTouchstart && oriTimeStamp) {
      setTouches(event, !0);
      triggerEvent(event, 'touchend');
      touchend(event, event.pageX, event.pageY);
    }
  }, {
    capture: !0,
    passive: !1
  });
  var analyticsConfig = {},
      readyAnalyticsReport = function readyAnalyticsReport(event) {
    if (analyticsConfig.selector) {
      for (var selector = analyticsConfig.selector, target = event.target; target;) {
        if (target.tagName && target.tagName.indexOf('WX-') === 0) {
          var classNames = target.className.split(' ').map(function (className) {
            return '.' + className;
          });['#' + target.id].concat(classNames).forEach(function (curSelector) {
            selector.indexOf(curSelector) > -1 && analyticsReport(target, curSelector);
          });
        }
        target = target.parentNode;
      }
    }
  },
      analyticsReport = function analyticsReport(ele, selector) {
    for (var i = 0; i < analyticsConfig.data.length; i++) {
      var curData = analyticsConfig.data[i];
      if (curData.element === selector) {
        var data = {
          eventID: curData.eventID,
          page: curData.page,
          element: curData.element,
          action: curData.action,
          time: Date.now()
        };
        selector.indexOf('.') === 0 && (data.index = Array.prototype.indexOf.call(document.body.querySelectorAll(curData.element), ele));
        WeixinJSBridge.publish('analyticsReport', {
          data: data
        });
        break;
      }
    }
  };
  WeixinJSBridge.subscribe('analyticsConfig', function (params) {
    if (Object.prototype.toString.call(params.data) === '[object Array]') {
      analyticsConfig.data = params.data;
      analyticsConfig.selector = [];
      analyticsConfig.data.forEach(function (e) {
        e.element && analyticsConfig.selector.push(e.element);
      });
    }
  });
})(window);

__webpack_require__(944);
__webpack_require__(3827);
__webpack_require__(9225);
__webpack_require__(2538);
__webpack_require__(8667);
__webpack_require__(6034);
__webpack_require__(8414);
__webpack_require__(7891);
__webpack_require__(9022);
__webpack_require__(4339);
__webpack_require__(6060);
__webpack_require__(1255);
__webpack_require__(9545);

__webpack_require__(8312);
__webpack_require__(9725);
__webpack_require__(5372);
__webpack_require__(743);
__webpack_require__(3572);
__webpack_require__(7191);
__webpack_require__(9942);
__webpack_require__(2571);
__webpack_require__(3302);
__webpack_require__(7375);
__webpack_require__(41);
__webpack_require__(5570);
__webpack_require__(4365);
__webpack_require__(6298);

window.exparser.registerAsyncComp = function (names, cb) {
  var len = names.length;
  names.filter(function (name) {
    if (window.exparser.componentList[name]) {
      checkState();
      return false;
    }
    return true;
  }).map(function (name) {
    return requireAsync(name);
  });

  function checkState(name) {
    len--;
    if (len == 0) {
      cb();
    }
  }

  function requireAsync(name) {
    switch (name) {
      case 'wx-map':
        var script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = 'https://map.qq.com/api/js?v=2.exp&callback=__map_jssdk_init';
        document.body.appendChild(script);
        window.__map_jssdk_id = 0;
        window.__map_jssdk_ready = !1;
        window.__map_jssdk_callback = [];
        window.__map_jssdk_init = function () {
          for (window.__map_jssdk_ready = !0; window.__map_jssdk_callback.length;) {
            var e = window.__map_jssdk_callback.pop();
            e();
          }
        };

        __webpack_require__.e(/* import() | wx-map */ 336).then(__webpack_require__.t.bind(__webpack_require__, 3559, 23)).then(checkState);
        break;
      case 'wx-canvas':
        __webpack_require__.e(/* import() | wx-canvas */ 425).then(__webpack_require__.t.bind(__webpack_require__, 7878, 23)).then(checkState);
        break;
      case 'wx-picker-view':
        __webpack_require__.e(/* import() | wx-picker-view */ 142).then(__webpack_require__.t.bind(__webpack_require__, 4015, 23)).then(checkState);
        break;
      case 'wx-picker':
        __webpack_require__.e(/* import() | wx-picker */ 647).then(__webpack_require__.t.bind(__webpack_require__, 1751, 23)).then(checkState);
        break;
      case 'wx-picker-view-column':
        __webpack_require__.e(/* import() | wx-picker-view-column */ 968).then(__webpack_require__.t.bind(__webpack_require__, 7169, 23)).then(checkState);
        break;
      case 'wx-video':
        __webpack_require__.e(/* import() | wx-video */ 834).then(__webpack_require__.bind(__webpack_require__, 7842)).then(checkState);
        break;
      case 'wx-radio-group':
        __webpack_require__.e(/* import() | wx-radio-group */ 399).then(__webpack_require__.t.bind(__webpack_require__, 4836, 23)).then(checkState);
        break;
      case 'wx-swiper':
        __webpack_require__.e(/* import() | wx-swiper */ 626).then(__webpack_require__.t.bind(__webpack_require__, 706, 23)).then(checkState);
        break;
      case 'wx-modal':
        __webpack_require__.e(/* import() | wx-modal */ 172).then(__webpack_require__.t.bind(__webpack_require__, 4290, 23)).then(checkState);
        break;
      case 'wx-switch':
        __webpack_require__.e(/* import() | wx-switch */ 77).then(__webpack_require__.t.bind(__webpack_require__, 1807, 23)).then(checkState);
        break;
      case 'wx-toast':
        __webpack_require__.e(/* import() | wx-toast */ 786).then(__webpack_require__.t.bind(__webpack_require__, 8673, 23)).then(checkState);
        break;
      case 'wx-radio':
        __webpack_require__.e(/* import() | wx-radio */ 272).then(__webpack_require__.t.bind(__webpack_require__, 2039, 23)).then(checkState);
        break;
      case 'wx-scroll-view':
        __webpack_require__.e(/* import() | wx-scroll-view */ 700).then(__webpack_require__.t.bind(__webpack_require__, 8128, 23)).then(checkState);
        break;
      case 'wx-textarea':
        __webpack_require__.e(/* import() | wx-textarea */ 235).then(__webpack_require__.t.bind(__webpack_require__, 8453, 23)).then(checkState);
        break;
      case 'wx-input':
        Promise.resolve(/* import() */).then(__webpack_require__.t.bind(__webpack_require__, 7191, 23)).then(checkState);
        break;
      case 'wx-contact-button':
        __webpack_require__.e(/* import() | wx-contact-button */ 801).then(__webpack_require__.t.bind(__webpack_require__, 5531, 23)).then(checkState);
        break;
      case 'wx-audio':
        __webpack_require__.e(/* import() | wx-audio */ 293).then(__webpack_require__.t.bind(__webpack_require__, 5205, 23)).then(checkState);
        break;
      case 'wx-form':
        __webpack_require__.e(/* import() | wx-form */ 508).then(__webpack_require__.t.bind(__webpack_require__, 7522, 23)).then(checkState);
        break;
      case 'wx-slider':
        __webpack_require__.e(/* import() | wx-slider */ 0).then(__webpack_require__.t.bind(__webpack_require__, 3877, 23)).then(checkState);
        break;
      case 'wx-swiper-item':
        __webpack_require__.e(/* import() | wx-swiper-item */ 108).then(__webpack_require__.t.bind(__webpack_require__, 1843, 23)).then(checkState);
        break;
      case 'wx-progress':
        __webpack_require__.e(/* import() | wx-progress */ 884).then(__webpack_require__.t.bind(__webpack_require__, 3710, 23)).then(checkState);
        break;
      case 'wx-action-sheet-cancel':
        __webpack_require__.e(/* import() | wx-action-sheet-cancel */ 532).then(__webpack_require__.t.bind(__webpack_require__, 2881, 23)).then(checkState);
        break;
      case 'wx-action-sheet':
        __webpack_require__.e(/* import() | wx-action-sheet */ 820).then(__webpack_require__.t.bind(__webpack_require__, 3790, 23)).then(checkState);
        break;
      case 'wx-action-sheet-item':
        __webpack_require__.e(/* import() | wx-action-sheet-item */ 149).then(__webpack_require__.t.bind(__webpack_require__, 8395, 23)).then(checkState);
        break;
      case 'wx-template':
      case 'wx-div':
      case 'wx-import':
      case 'wx-include':
      case 'wx-block':
        checkState();
        break;
      default:
        console.log('Unknown Tag: ' + name);
        checkState();
        break;
    }
  }
};

/***/ }),

/***/ 2277:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

var _Events = __webpack_require__(1939);

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Behavior = function Behavior() {};

Behavior.prototype = (0, _create2.default)(Object.prototype, {
  constructor: {
    value: Behavior,
    writable: true,
    configurable: true
  }
});

var cycle = ['created', 'attached', 'detached'];
var index = 1;

// registerBehavior
Behavior.create = function (opt) {
  var id = String(index++);
  var insBehavior = Behavior.list[opt.is || ''] = (0, _create2.default)(Behavior.prototype, {
    is: {
      value: opt.is || ''
    },
    _id: {
      value: id
    }
  });
  insBehavior.template = opt.template;
  insBehavior.properties = (0, _create2.default)(null);
  insBehavior.methods = (0, _create2.default)(null);
  insBehavior.listeners = (0, _create2.default)(null);
  var ancestors = insBehavior.ancestors = [],
      prop = '',
      idx = 0;
  for (; idx < (opt.behaviors || []).length; idx++) {
    var currBehavior = opt.behaviors[idx];
    typeof currBehavior === 'string' && (currBehavior = Behavior.list[currBehavior]);
    for (prop in currBehavior.properties) {
      insBehavior.properties[prop] = currBehavior.properties[prop];
    }
    for (prop in currBehavior.methods) {
      insBehavior.methods[prop] = currBehavior.methods[prop];
    }
    for (var i = 0; i < currBehavior.ancestors.length; i++) {
      if (ancestors.indexOf(currBehavior.ancestors[i]) < 0) {
        ancestors.push(currBehavior.ancestors[i]);
      }
    }
  }
  for (prop in opt.properties) {
    insBehavior.properties[prop] = opt.properties[prop];
  }
  for (prop in opt.listeners) {
    insBehavior.listeners[prop] = opt.listeners[prop];
  }
  for (prop in opt) {
    if (typeof opt[prop] === 'function') {
      if (cycle.indexOf(prop) < 0) {
        insBehavior.methods[prop] = opt[prop];
      } else {
        insBehavior[prop] = opt[prop];
      }
    }
  }
  ancestors.push(insBehavior);
  return insBehavior;
};

Behavior.list = (0, _create2.default)(null);

Behavior.prototype.hasBehavior = function (beh) {
  for (var idx = 0; idx < this.ancestors.length; idx++) {
    if (this.ancestors[idx].is === beh) {
      return true;
    }
  }
  return false;
};

Behavior.prototype.getAllListeners = function () {
  var tempObj = (0, _create2.default)(null),
      ancestors = this.ancestors,
      idx = 0;
  for (; idx < ancestors.length; idx++) {
    var ancestor = this.ancestors[idx];
    for (var key in ancestor.listeners) {
      if (tempObj[key]) {
        tempObj[key].push(ancestor.listeners[key]);
      } else {
        tempObj[key] = [ancestor.listeners[key]];
      }
    }
  }
  return tempObj;
};

Behavior.prototype.getAllLifeTimeFuncs = function () {
  var tempObj = (0, _create2.default)(null),
      ancestors = this.ancestors;
  cycle.forEach(function (key) {
    var lifeTimeFunc = tempObj[key] = _Events2.default.create('Lifetime Method'),
        idx = 0;
    for (; idx < ancestors.length; idx++) {
      var ancestor = ancestors[idx];
      ancestor[key] && lifeTimeFunc.add(ancestor[key]);
    }
  });
  return tempObj;
};

exports["default"] = Behavior;
module.exports = exports['default'];

/***/ }),

/***/ 8538:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 管理data与绑定元素的更新
var BoundProps = function BoundProps() {};

BoundProps.prototype = (0, _create2.default)(Object.prototype, {
  constructor: {
    value: BoundProps,
    writable: true,
    configurable: true
  }
});

BoundProps.create = function () {
  var tempObj = (0, _create2.default)(BoundProps.prototype);
  tempObj._bindings = (0, _create2.default)(null);
  return tempObj;
};

BoundProps.prototype.add = function (exp, targetElem, targetProp, updateFunc) {
  var propDes = {
    exp: exp,
    targetElem: targetElem,
    targetProp: targetProp,
    updateFunc: updateFunc
  };

  var bindings = this._bindings;
  var bindedProps = exp.bindedProps;

  for (var idx = 0; idx < bindedProps.length; idx++) {
    var prop = bindedProps[idx];
    bindings[prop] || (bindings[prop] = []);
    bindings[prop].push(propDes);
  }
};
// 更新变量propKey相关联的元素ele属性
BoundProps.prototype.update = function (ele, propData, propKey) {
  var _binding = this._bindings[propKey];
  if (_binding) {
    for (var idx = 0; idx < _binding.length; idx++) {
      var boundProp = _binding[idx];
      boundProp.updateFunc(boundProp.targetElem, boundProp.targetProp, boundProp.exp.calculate(ele, propData));
    }
  }
};
exports["default"] = BoundProps;
module.exports = exports["default"];

/***/ }),

/***/ 8818:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _keys = __webpack_require__(8902);

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = __webpack_require__(3239);

var _stringify2 = _interopRequireDefault(_stringify);

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

var _Events = __webpack_require__(1939);

var _Events2 = _interopRequireDefault(_Events);

var _EventManager = __webpack_require__(18);

var EventManager = _interopRequireWildcard(_EventManager);

var _Template = __webpack_require__(8585);

var _Template2 = _interopRequireDefault(_Template);

var _Behavior = __webpack_require__(2277);

var _Behavior2 = _interopRequireDefault(_Behavior);

var _Element = __webpack_require__(1981);

var _Element2 = _interopRequireDefault(_Element);

var _Observer = __webpack_require__(2086);

var _Observer2 = _interopRequireDefault(_Observer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function camelToDashed(txt) {
  return txt.replace(/[A-Z]/g, function (ch) {
    return '-' + ch.toLowerCase();
  });
}

var addListenerToElement = EventManager.addListenerToElement;

var Component = function Component() {};

Component.prototype = (0, _create2.default)(Object.prototype, {
  constructor: {
    value: Component,
    writable: true,
    configurable: true
  }
});

Component.list = (0, _create2.default)(null);
_Template2.default._setCompnentSystem(Component);
_Element2.default._setCompnentSystem(Component);

Component._setGlobalOptionsGetter = function (GlobalOptionsGetter) {
  _Template2.default._setGlobalOptionsGetter(GlobalOptionsGetter);
};

// attribute(this, prop, propKey, value)
var setAttribute = function setAttribute(ele, opt, propKey, value) {
  var propName = camelToDashed(propKey);
  if (opt.type === Boolean) {
    value ? ele.__domElement.setAttribute(propName, '') : ele.__domElement.removeAttribute(propName);
  } else {
    if (opt.type !== Object) {
      if (opt.type === Array) {
        ele.__domElement.setAttribute(propName, (0, _stringify2.default)(value));
      } else {
        ele.__domElement.setAttribute(propName, value);
      }
    }
  }
};

var normalizeValue = function normalizeValue(value, type) {
  switch (type) {
    case String:
      return value === null || undefined === value ? '' : String(value);
    case Number:
      return isFinite(value) ? Number(value) : false;
    case Boolean:
      return !!value;
    case Array:
      return value instanceof Array ? value : [];
    case Object:
      return (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' ? value : null;
    default:
      return void 0 === value ? null : value;
  }
};

// registerElement
Component.register = function (nElement) {
  var opts = nElement.options || {};
  var propDefination = {
    is: {
      value: nElement.is || ''
    }
  };
  var componentBehavior = _Behavior2.default.create(nElement);
  var behaviorProperties = (0, _create2.default)(null);

  (0, _keys2.default)(componentBehavior.properties).forEach(function (propKey) {
    var behaviorProperty = componentBehavior.properties[propKey];behaviorProperty !== String && behaviorProperty !== Number && behaviorProperty !== Boolean && behaviorProperty !== Object && behaviorProperty !== Array || (behaviorProperty = {
      type: behaviorProperty
    });
    if (undefined === behaviorProperty.value) {
      behaviorProperty.type === String ? behaviorProperty.value = '' : behaviorProperty.type === Number ? behaviorProperty.value = 0 : behaviorProperty.type === Boolean ? behaviorProperty.value = !1 : behaviorProperty.type === Array ? behaviorProperty.value = [] : behaviorProperty.value = null;
    }

    behaviorProperties[propKey] = {
      type: behaviorProperty.type,
      value: behaviorProperty.value,
      coerce: componentBehavior.methods[behaviorProperty.coerce],
      observer: componentBehavior.methods[behaviorProperty.observer],
      public: !!behaviorProperty.public
    };

    propDefination[propKey] = {
      enumerable: true,
      get: function get() {
        var propData = this.__propData[propKey];
        return void 0 === propData ? behaviorProperties[propKey].value : propData;
      },
      set: function set(value) {
        var behProp = behaviorProperties[propKey];
        value = normalizeValue(value, behProp.type);
        var propData = this.__propData[propKey]; // old value

        if (behProp.coerce) {
          var realVal = _Events2.default.safeCallback('Property Filter', behProp.coerce, this, [value, propData]);
          void 0 !== realVal && (value = realVal);
        }

        if (value !== propData) {
          // value changed
          this.__propData[propKey] = value;
          behProp.public && setAttribute(this, behProp, propKey, value);
          this.__templateInstance.updateValues(this, this.__propData, propKey);
          behProp.observer && _Events2.default.safeCallback('Property Observer', behProp.observer, this, [value, propData]);
          if (behProp.public) {
            if (this.__propObservers && !this.__propObservers.empty || this.__subtreeObserversCount) {
              _Observer2.default._callObservers(this, '__propObservers', {
                type: 'properties',
                target: this,
                propertyName: propKey
              });
            }
          }
        }
      }
    };
  }); // end forEach

  var proto = (0, _create2.default)(_Element2.default.prototype, propDefination);
  proto.__behavior = componentBehavior;
  for (var methodName in componentBehavior.methods) {
    proto[methodName] = componentBehavior.methods[methodName];
  }
  proto.__lifeTimeFuncs = componentBehavior.getAllLifeTimeFuncs();
  var publicProps = (0, _create2.default)(null),
      defaultValuesJSON = {};
  for (var propName in behaviorProperties) {
    defaultValuesJSON[propName] = behaviorProperties[propName].value;
    publicProps[propName] = !!behaviorProperties[propName].public;
  }

  var insElement = document.getElementById(componentBehavior.is);
  if (!componentBehavior.template && insElement && insElement.tagName === 'TEMPLATE') {} else {
    insElement = document.createElement('template');
    insElement.innerHTML = componentBehavior.template || '';
  }

  var template = _Template2.default.create(insElement, defaultValuesJSON, componentBehavior.methods, opts);
  proto.__propPublic = publicProps;
  var allListeners = componentBehavior.getAllListeners(),
      innerEvents = (0, _create2.default)(null);
  for (var listenerName in allListeners) {
    var listener = allListeners[listenerName],
        eventList = [],
        idx = 0;
    for (; idx < listener.length; idx++) {
      eventList.push(componentBehavior.methods[listener[idx]]);
    }
    innerEvents[listenerName] = eventList;
  }
  Component.list[componentBehavior.is] = {
    proto: proto,
    template: template,
    defaultValuesJSON: (0, _stringify2.default)(defaultValuesJSON),
    innerEvents: innerEvents
  };
};

// createElement
Component.create = function (tagName) {
  tagName = tagName ? tagName.toLowerCase() : 'virtual';
  var newElement = document.createElement(tagName);
  var sysComponent = Component.list[tagName] || Component.list[''];
  var newComponent = (0, _create2.default)(sysComponent.proto); // 虚拟dom

  _Element2.default.initialize(newComponent);
  newComponent.__domElement = newElement;
  newElement.__wxElement = newComponent;
  newComponent.__propData = JSON.parse(sysComponent.defaultValuesJSON);
  var templateInstance = newComponent.__templateInstance = sysComponent.template.createInstance(newComponent); // 参数多余？

  if (templateInstance.shadowRoot instanceof _Element2.default) {
    // VirtualNode
    _Element2.default._attachShadowRoot(newComponent, templateInstance.shadowRoot);
    newComponent.shadowRoot = templateInstance.shadowRoot;
    newComponent.__slotChildren = [templateInstance.shadowRoot];
    templateInstance.shadowRoot.__slotParent = newComponent;
  } else {
    newComponent.__domElement.appendChild(templateInstance.shadowRoot);
    newComponent.shadowRoot = newElement;
    newComponent.__slotChildren = newElement.childNodes;
  }

  newComponent.shadowRoot.__host = newComponent;
  newComponent.$ = templateInstance.idMap;
  newComponent.$$ = newElement;
  templateInstance.slots[''] || (templateInstance.slots[''] = newElement);
  newComponent.__slots = templateInstance.slots; // 占位节点
  newComponent.__slots[''].__slotChildren = newComponent.childNodes;

  var innerEvents = sysComponent.innerEvents;
  for (var innerEventName in innerEvents) {
    var innerEventNameSlice = innerEventName.split('.', 2);
    var listenerName = innerEventNameSlice[innerEventNameSlice.length - 1];
    var nComponent = newComponent;
    var isRootNode = true;
    if (innerEventNameSlice.length === 2) {
      if (innerEventNameSlice[0] !== '') {
        isRootNode = !1;
        innerEventNameSlice[0] !== 'this' && (nComponent = newComponent.$[innerEventNameSlice[0]]);
      }
    }
    if (nComponent) {
      var innerEvent = innerEvents[innerEventName],
          listenerIdx = 0;
      for (; listenerIdx < innerEvent.length; listenerIdx++) {
        if (isRootNode) {
          addListenerToElement(nComponent.shadowRoot, listenerName, innerEvent[listenerIdx].bind(newComponent));
        } else {
          addListenerToElement(nComponent, listenerName, innerEvent[listenerIdx].bind(newComponent));
        }
      }
    }
  }
  Component._callLifeTimeFuncs(newComponent, 'created');
  return newComponent;
};
Component.hasProperty = function (ele, propName) {
  return undefined !== ele.__propPublic[propName];
};
Component.hasPublicProperty = function (ele, propName) {
  return ele.__propPublic[propName] === !0;
};
Component._callLifeTimeFuncs = function (ele, funcName) {
  var func = ele.__lifeTimeFuncs[funcName];
  func.call(ele, []);
};
Component.register({
  is: '',
  template: '<wx-content></wx-content>',
  properties: {}
});

exports["default"] = Component;
module.exports = exports['default'];

/***/ }),

/***/ 1981:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

var _EventManager = __webpack_require__(18);

var EventManager = _interopRequireWildcard(_EventManager);

var _Observer = __webpack_require__(2086);

var _Observer2 = _interopRequireDefault(_Observer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Element = function Element() {};
Element.prototype = (0, _create2.default)(Object.prototype, {
  constructor: {
    value: Element,
    writable: true,
    configurable: true
  }
});

var componentSystem = null;
Element._setCompnentSystem = function (componentSys) {
  componentSystem = componentSys;
};
Element.initialize = function (ele) {
  ele.__attached = false;
  ele.parentNode = null;
  ele.childNodes = [];
  ele.__slotParent = null;
  ele.__slotChildren = ele.childNodes;
  ele.__subtreeObserversCount = 0;
};

var attachedElement = function attachedElement(ele) {
  if (!ele.parentNode || ele.parentNode.__attached) {
    var setAttachedRecursively = function setAttachedRecursively(ele) {
      ele.__attached = !0;
      ele.shadowRoot instanceof Element && setAttachedRecursively(ele.shadowRoot);
      var childNodes = ele.childNodes;
      if (childNodes) {
        for (var idx = 0; idx < childNodes.length; idx++) {
          setAttachedRecursively(childNodes[idx]);
        }
      }
    };
    setAttachedRecursively(ele);

    var callAttachedLifeTimeFuncRecursively = function callAttachedLifeTimeFuncRecursively(ele) {
      ele.__lifeTimeFuncs && componentSystem._callLifeTimeFuncs(ele, 'attached');
      ele.shadowRoot instanceof Element && callAttachedLifeTimeFuncRecursively(ele.shadowRoot);
      var childNodes = ele.childNodes;
      if (childNodes) {
        for (var idx = 0; idx < childNodes.length; idx++) {
          callAttachedLifeTimeFuncRecursively(childNodes[idx]);
        }
      }
    };
    callAttachedLifeTimeFuncRecursively(ele);
  }
};
var detachedElement = function detachedElement(ele) {
  if (ele.__attached) {
    var detachRecursively = function detachRecursively(ele) {
      ele.__attached = !1;
      ele.shadowRoot instanceof Element && detachRecursively(ele.shadowRoot);
      var childNodes = ele.childNodes;
      if (childNodes) {
        for (var idx = 0; idx < childNodes.length; idx++) {
          detachRecursively(childNodes[idx]);
        }
      }
    };
    detachRecursively(ele);

    var callLifeTimeFuncRecursively = function callLifeTimeFuncRecursively(ele) {
      ele.__lifeTimeFuncs && componentSystem._callLifeTimeFuncs(ele, 'detached');
      ele.shadowRoot instanceof Element && callLifeTimeFuncRecursively(ele.shadowRoot);
      var childNodes = ele.childNodes;
      if (childNodes) {
        for (var idx = 0; idx < childNodes.length; idx++) {
          callLifeTimeFuncRecursively(childNodes[idx]);
        }
      }
    };
    callLifeTimeFuncRecursively(ele);
  }
};
var childObserver = function childObserver(ele, observerName, targetNode) {
  if (ele.__childObservers && !ele.__childObservers.empty || ele.__subtreeObserversCount) {
    var opt = null;
    if (observerName === 'add') {
      opt = {
        type: 'childList',
        target: ele,
        addedNodes: [targetNode]
      };
    } else {
      opt = {
        type: 'childList',
        target: ele,
        removedNodes: [targetNode]
      };
    }
    _Observer2.default._callObservers(ele, '__childObservers', opt);
  }
};
var attachShadowRoot = function attachShadowRoot(componentObj, newNode, oldNode, isRemoveOldNode) {
  // 增、删、改节点
  var copyOfOriginalElement = componentObj;
  // 找dom根节点
  if (copyOfOriginalElement instanceof Element) {
    for (; copyOfOriginalElement.__virtual;) {
      var slotParent = copyOfOriginalElement.__slotParent;
      if (!slotParent) {
        return;
      }
      if (newNode && !oldNode) {
        // 为插入新节点做铺垫
        var oldNodeIdx = slotParent.__slotChildren.indexOf(copyOfOriginalElement);
        oldNode = slotParent.__slotChildren[oldNodeIdx + 1];
      }
      copyOfOriginalElement = slotParent;
    }
    copyOfOriginalElement instanceof Element && (copyOfOriginalElement = copyOfOriginalElement.__domElement);
  }

  var newDomEle = null;
  if (newNode) {
    // 找newNode的dom节点
    if (newNode.__virtual) {
      var fragment = document.createDocumentFragment();
      var appendDomElement = function appendDomElement(ele) {
        for (var slotChildIdx = 0; slotChildIdx < ele.__slotChildren.length; slotChildIdx++) {
          var slotChild = ele.__slotChildren[slotChildIdx];
          slotChild.__virtual ? appendDomElement(slotChild) : fragment.appendChild(slotChild.__domElement);
        }
      };
      appendDomElement(newNode);
      newDomEle = fragment;
    } else {
      newDomEle = newNode.__domElement;
    }
  }

  var oldDomEle = null;
  if (oldNode) {
    if (oldNode.__virtual) {
      var oldParentNode = componentObj;
      var _oldNodeIdx = 0;
      if (isRemoveOldNode) {
        var removeDomElement = function removeDomElement(ele) {
          for (var slotChildIdx = 0; slotChildIdx < ele.__slotChildren.length; slotChildIdx++) {
            var slotChild = ele.__slotChildren[slotChildIdx];
            slotChild.__virtual ? removeDomElement(slotChild) : copyOfOriginalElement.removeChild(slotChild.__domElement);
          }
        };
        removeDomElement(oldNode);
        isRemoveOldNode = !1;
        _oldNodeIdx = componentObj.__slotChildren.indexOf(oldNode) + 1;
      } else {
        oldParentNode = oldNode.__slotParent;
        _oldNodeIdx = oldParentNode.__slotChildren.indexOf(oldNode);
      }
      if (newNode) {
        var findNonVirtualNode = function findNonVirtualNode(ele, idx) {
          for (; idx < ele.__slotChildren.length; idx++) {
            var slotChild = ele.__slotChildren[idx];
            if (!slotChild.__virtual) {
              return slotChild;
            }
            var childNode = findNonVirtualNode(slotChild, 0);
            if (childNode) {
              return childNode;
            }
          }
        };
        oldNode = null;
        var curOldParentNode = oldParentNode;
        for (; oldNode = findNonVirtualNode(curOldParentNode, _oldNodeIdx), !oldNode && curOldParentNode.__virtual; curOldParentNode = curOldParentNode.__slotParent) {
          _oldNodeIdx = curOldParentNode.__slotParent.__slotChildren.indexOf(curOldParentNode) + 1;
        }
        oldNode && (oldDomEle = oldNode.__domElement); // ??是否存在的!oldNode 但nOrigParentNode.__virtual为false?
      }
    } else {
      oldDomEle = oldNode.__domElement;
    }
  }

  if (isRemoveOldNode) {
    newDomEle ? copyOfOriginalElement.replaceChild(newDomEle, oldDomEle) : copyOfOriginalElement.removeChild(oldDomEle);
  } else {
    newDomEle && (oldDomEle ? copyOfOriginalElement.insertBefore(newDomEle, oldDomEle) : copyOfOriginalElement.appendChild(newDomEle));
  }
};
var updateSubtree = function updateSubtree(ele, newNode, oldNode, willRemoveOldNode) {
  var oldNodeIndex = -1;

  if (oldNode) {
    oldNodeIndex = ele.childNodes.indexOf(oldNode);
    if (oldNodeIndex < 0) {
      return false;
    }
  }

  if (willRemoveOldNode) {
    if (newNode === oldNode) {
      willRemoveOldNode = !1;
    } else {
      if (ele.__subtreeObserversCount) {
        _Observer2.default._updateSubtreeCaches(oldNode, -ele.__subtreeObserversCount);
      }
      oldNode.parentNode = null;
      oldNode.__slotParent = null;
    }
  }

  var parentNode = null;
  var originalParentNode = ele;
  ele.__slots && (originalParentNode = ele.__slots['']);

  if (newNode) {
    parentNode = newNode.parentNode;
    newNode.parentNode = ele;
    newNode.__slotParent = originalParentNode;
    var subtreeObserversCount = ele.__subtreeObserversCount;
    if (parentNode) {
      var originalIndexOfNewNode = parentNode.childNodes.indexOf(newNode);
      parentNode.childNodes.splice(originalIndexOfNewNode, 1);
      parentNode === ele && originalIndexOfNewNode < oldNodeIndex && oldNodeIndex--;
      subtreeObserversCount -= parentNode.__subtreeObserversCount;
    }
    subtreeObserversCount && _Observer2.default._updateSubtreeCaches(newNode, subtreeObserversCount);
  }
  attachShadowRoot(originalParentNode, newNode, oldNode, willRemoveOldNode);
  oldNodeIndex === -1 && (oldNodeIndex = ele.childNodes.length);
  if (newNode) {
    ele.childNodes.splice(oldNodeIndex, willRemoveOldNode ? 1 : 0, newNode);
  } else {
    ele.childNodes.splice(oldNodeIndex, willRemoveOldNode ? 1 : 0);
  }
  if (willRemoveOldNode) {
    detachedElement(oldNode);
    childObserver(ele, 'remove', oldNode);
  }

  if (newNode) {
    if (parentNode) {
      detachedElement(newNode);
      childObserver(parentNode, 'remove', newNode);
    }
    attachedElement(newNode);
    childObserver(ele, 'add', newNode);
  }

  return true;
};
var childHandle = function childHandle(element, newNode, oldNode, willRemoveOldNode) {
  var retNode = willRemoveOldNode ? oldNode : newNode;
  var isDone = updateSubtree(element, newNode, oldNode, willRemoveOldNode);
  return isDone ? retNode : null;
};

Element._attachShadowRoot = function (ele, node) {
  attachShadowRoot(ele, node, null, !1);
};
Element.appendChild = function (ele, newChild) {
  return childHandle(ele, newChild, null, false);
};
Element.insertBefore = function (ele, newNode, refNode) {
  return childHandle(ele, newNode, refNode, false);
};
Element.removeChild = function (ele, removedChild) {
  return childHandle(ele, null, removedChild, true);
};
Element.replaceChild = function (ele, newNode, oldNode) {
  return childHandle(ele, newNode, oldNode, true);
};
Element.replaceDocumentElement = function (ele, oldChild) {
  if (!ele.__attached) {
    oldChild.parentNode.replaceChild(ele.__domElement, oldChild);
    attachedElement(ele);
  }
};

var parseSimpleSelector = function parseSimpleSelector(simpleSelector, relation) {
  // simpleSelector => #a.b
  // primitiveSelector => ["#a", ".b"]
  var primitiveSelector = simpleSelector.match(/^(#[_a-zA-Z][-_a-zA-Z0-9:]*|)((?:\.-?[_a-zA-Z][-_a-zA-Z0-9]*)+|)$/);
  if (!primitiveSelector) return null;
  var idSelectors = primitiveSelector[1].slice(1);
  var classSelectors = primitiveSelector[2].split('.');
  classSelectors.shift();
  return idSelectors || classSelectors.length ? {
    id: idSelectors,
    classes: classSelectors,
    relation: relation || ''
  } : null;
};

Element.parseSelector = function (selectorStr) {
  // origin => a.b.c, b.c#d {}
  // complex => ["a.b.c>d", "a>b.c#d"]
  // simple => ["a.b.c", ">", "d"]
  var complexSelector = selectorStr.split(',');
  var res = [];
  for (var i = 0; i < complexSelector.length; i++) {
    var simpleSelectors = complexSelector[i].split(/( |\t|>)/g);
    var parsedSelector = [];
    var relation = '';
    var s = 0;
    for (; s < simpleSelectors.length; s++) {
      var simpleSelector = simpleSelectors[s];
      if (simpleSelector && simpleSelector !== ' ' && simpleSelector !== '\t') {
        if (simpleSelector !== '>') {
          var selectorQueryObj = parseSimpleSelector(simpleSelector, relation);
          relation = '';
          if (!selectorQueryObj) break;
          parsedSelector.push(selectorQueryObj);
        } else {
          if (relation !== '') break;
          relation = 'child';
        }
      }
    }
    s === simpleSelectors.length && parsedSelector.length && res.push(parsedSelector);
  }
  return res.length ? res : null;
};

var parseSelector = Element.parseSelector;

Element.prototype.appendChild = function (child) {
  return childHandle(this, child, null, false);
};
Element.prototype.insertBefore = function (newChild, targetChild) {
  return childHandle(this, newChild, targetChild, false);
};
Element.prototype.removeChild = function (targetChild) {
  return childHandle(this, null, targetChild, true);
};
Element.prototype.replaceChild = function (newChild, targetChild) {
  return childHandle(this, newChild, targetChild, true);
};
Element.prototype.triggerEvent = function (type, detail, opt) {
  EventManager.triggerEvent(this, type, detail, opt);
};
Element.prototype.addListener = function (eventName, handler) {
  EventManager.addListenerToElement(this, eventName, handler);
};
Element.prototype.removeListener = function (eventName, handler) {
  EventManager.removeListenerFromElement(this, eventName, handler);
};
Element.prototype.hasBehavior = function (behavior) {
  return !!this.__behavior && this.__behavior.hasBehavior(behavior);
};
var x = function x(e, t, n, i, o, r) {
  var a = n[i],
      s = !0;
  a.id && a.id !== t.__id && (s = !1);
  for (var l = a.classes, c = 0; s && c < l.length; c++) {
    t.classList.contains(l[c]) || (s = !1);
  }if (s && 0 === i) return !0;
  if (t === e) return !1;
  for (var u = o ? t.__wxSlotParent : t.parentNode; u && u.__virtual;) {
    if (u === e) return !1;
    u = o ? u.__wxSlotParent : u.parentNode;
  }
  return !!u && (s ? x(e, u, n, i - 1, o, '' === a.relation) : !!r && x(e, u, n, i, o, !0));
},
    C = function C(e, t, n, i) {
  if (n.__virtual) return !1;
  for (var o = 0; o < e.length; o++) {
    var r = e[o];
    if (x(t, n, r, r.length - 1, i, !1)) return !0;
  }
  return !1;
},
    E = function E(e, t, n, i, o, r) {
  if (C(t, n, i, o) && (e.push(i), r)) return !0;
  for (var a = o ? i.__wxSlotChildren : i.childNodes, l = 0; l < a.length; l++) {
    if (a[l] instanceof Element && E(e, t, n, a[l], o, r) && r) return !0;
  }return !1;
};
Element.prototype.querySelector = function (selector, t) {
  var n = (typeof selector === 'undefined' ? 'undefined' : (0, _typeof3.default)(selector)) === 'object' ? selector : parseSelector(selector);
  if (!n) return null;
  var i = [];
  E(i, n, this, this, t, !0);
  return i[0] || null;
};

exports["default"] = Element;
module.exports = exports['default'];

/***/ }),

/***/ 18:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

exports.triggerEvent = triggerEvent;
exports.addListenerToElement = addListenerToElement;
exports.removeListenerFromElement = removeListenerFromElement;

var _Events = __webpack_require__(1939);

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var now = Date.now();

function triggerEvent(target, type, detail, options) {
  options = options || {};
  var originalEvent = options.originalEvent,
      noBubbles = !options.bubbles,
      noComposed = !options.composed,
      extraFields = options.extraFields || {},
      stopTarget = false,
      timeStamp = Date.now() - now,
      nTarget = target.__wxElement || target;

  target === nTarget.shadowRoot && (nTarget = target); // _renderingMode === 'native'

  var preventDefault = function preventDefault() {
    originalEvent && originalEvent.preventDefault();
  };

  var stopPropagation = function stopPropagation() {
    stopTarget = true;
  };

  var eventOpt = {
    target: nTarget,
    currentTarget: nTarget,
    type: type,
    timeStamp: timeStamp,
    detail: detail,
    preventDefault: preventDefault,
    stopPropagation: stopPropagation
  };

  for (var f in extraFields) {
    eventOpt[f] = extraFields[f];
  }

  var exeEvent = function exeEvent(event, targetEle) {
    eventOpt.currentTarget = targetEle;
    var res = event.call(targetEle, [eventOpt]);
    if (res === !1) {
      preventDefault();
      stopPropagation();
    }
  };
  var targetParent = nTarget.parentNode;
  var targetEle = nTarget;

  var goAhead = function goAhead() {
    // 冒泡执行事件
    if (targetEle) {
      targetParent === targetEle && (targetParent = targetEle.parentNode);
      if (targetEle.__wxEvents) {
        targetEle.__wxEvents[type] && exeEvent(targetEle.__wxEvents[type], targetEle);
      }
      return !noBubbles && !stopTarget;
    }
    return false;
  };

  for (; goAhead();) {
    if (targetEle.__host) {
      if (noComposed) break;
      if (!(targetParent && targetParent.__domElement)) {
        targetParent = targetEle.__host;
        eventOpt.target = targetParent;
      }
      targetEle = targetEle.__host;
    } else {
      var isRealDom = !0;
      if (targetEle.__domElement || targetEle.__virtual) {
        isRealDom = !1;
      }
      targetEle = isRealDom || noComposed ? targetEle.parentNode : targetEle.__slotParent;
    }
  }
}

function addListenerToElement(ele, eventName, handler) {
  var targetEle = ele.__wxElement || ele; // vnode
  ele === targetEle.shadowRoot && (targetEle = ele);
  targetEle.__wxEvents || (targetEle.__wxEvents = (0, _create2.default)(null));
  targetEle.__wxEvents[eventName] || (targetEle.__wxEvents[eventName] = _Events2.default.create('Event Listener'));
  return targetEle.__wxEvents[eventName].add(handler);
}

function removeListenerFromElement(ele, eventName, handler) {
  var targetEle = ele.__wxElement || ele;
  ele === targetEle.shadowRoot && (targetEle = ele);
  targetEle.__wxEvents && targetEle.__wxEvents[eventName] && targetEle.__wxEvents[eventName].remove(handler);
}

/***/ }),

/***/ 1939:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Events = function Events() {};
var globalOptions = null;

Events.prototype = (0, _create2.default)(Object.prototype, {
  constructor: {
    value: Events,
    writable: true,
    configurable: true
  }
});

Events._setGlobalOptionsGetter = function (opt) {
  globalOptions = opt;
};

Events.create = function (type) {
  var viewUtilObject = (0, _create2.default)(Events.prototype);
  viewUtilObject.empty = true;
  viewUtilObject._type = type; // 错误报告用到区分事件类型
  viewUtilObject._arr = [];
  viewUtilObject._index = 0;
  return viewUtilObject;
};

Events.prototype.add = function (func) {
  var id = this._index++;
  this._arr.push({
    id: id,
    func: func
  });
  this.empty = false;
  return id;
};

Events.prototype.remove = function (itemToRemove) {
  var _arr = this._arr,
      idx = 0;
  if (typeof itemToRemove === 'function') {
    for (idx = 0; idx < _arr.length; idx++) {
      if (_arr[idx].func === itemToRemove) {
        _arr.splice(idx, 1);
        this.empty = !_arr.length;
        return true;
      }
    }
  } else {
    for (idx = 0; idx < _arr.length; idx++) {
      if (_arr[idx].id === itemToRemove) {
        _arr.splice(idx, 1);
        this.empty = !_arr.length;
        return true;
      }
    }
  }
  return false;
};

Events.prototype.call = function (ele, args) {
  // 以element执行注册的所有方法
  var _arr = this._arr,
      isPreventDefault = false,
      idx = 0;
  for (; idx < _arr.length; idx++) {
    var res = safeCallback(this._type, _arr[idx].func, ele, args);
    res === false && (isPreventDefault = true);
  }
  if (isPreventDefault) {
    return false;
  }
};

var globalError = Events.create();
var errHandle = function errHandle(err, errData) {
  if (!errData.type || globalError.call(null, [err, errData]) !== false) {
    console.error(errData.message);
    if (globalOptions().throwGlobalError) {
      // 是否扔出错误
      throw err;
    }
    console.error(err.stack);
  }
};
var safeCallback = function safeCallback(type, method, element, args) {
  // 以element执行注册的method
  try {
    return method.apply(element, args);
  } catch (err) {
    var message = 'Exparser ' + (type || 'Error Listener') + ' Error @ ';
    element && (message += element.is);
    message += '#' + (method.name || '(anonymous)');
    errHandle(err, {
      message: message,
      type: type,
      element: element,
      method: method,
      args: args
    });
  }
};

Events.safeCallback = safeCallback;

Events.addGlobalErrorListener = function (func) {
  // 注册出错时的处理方法
  return globalError.add(func);
};

Events.removeGlobalErrorListener = function (func) {
  return globalError.remove(func);
};

exports["default"] = Events;
module.exports = exports['default'];

/***/ }),

/***/ 2086:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

var _Events = __webpack_require__(1939);

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 监视器模块
var Observer = function Observer() {};

Observer.prototype = (0, _create2.default)(Object.prototype, {
  constructor: {
    value: Observer,
    writable: true,
    configurable: true
  }
});

Observer.create = function (cb) {
  var tempObj = (0, _create2.default)(Observer.prototype);
  tempObj._cb = cb;
  tempObj._noSubtreeCb = function (opt) {
    opt.target === this && cb.call(this, opt);
  };
  tempObj._binded = [];
  return tempObj;
};

var updateSubtreeCaches = Observer._updateSubtreeCaches = function (ele, count) {
  ele.__subtreeObserversCount += count;
  var childNodes = ele.childNodes;
  if (childNodes) {
    for (var idx = 0; idx < childNodes.length; idx++) {
      updateSubtreeCaches(childNodes[idx], count);
    }
  }
};

Observer.prototype.observe = function (ele, opt) {
  opt = opt || {};
  var count = 0;
  var subtree = opt.subtree ? this._cb : this._noSubtreeCb; // 是否对子节点observe
  if (opt.properties) {
    ele.__propObservers || (ele.__propObservers = _Events2.default.create('Observer Callback'));
    this._binded.push({
      funcArr: ele.__propObservers,
      id: ele.__propObservers.add(subtree),
      subtree: opt.subtree ? ele : null
    });
    count++;
  }
  if (opt.childList) {
    ele.__childObservers || (ele.__childObservers = _Events2.default.create('Observer Callback'));
    this._binded.push({
      funcArr: ele.__childObservers,
      id: ele.__childObservers.add(subtree),
      subtree: opt.subtree ? ele : null
    });
    count++;
  }

  if (opt.characterData) {
    ele.__textObservers || (ele.__textObservers = _Events2.default.create('Observer Callback'));
    this._binded.push({
      funcArr: ele.__textObservers,
      id: ele.__textObservers.add(subtree),
      subtree: opt.subtree ? ele : null
    });
    count++;
  }
  opt.subtree && updateSubtreeCaches(ele, count);
};

Observer.prototype.disconnect = function () {
  var bound = this._binded;
  var idx = 0;
  for (; idx < bound.length; idx++) {
    var boundObserver = bound[idx];
    boundObserver.funcArr.remove(boundObserver.id);
    boundObserver.subtree && updateSubtreeCaches(boundObserver.subtree, -1);
  }
  this._binded = [];
};

Observer._callObservers = function (ele, observeName, opt) {
  do {
    ele[observeName] && ele[observeName].call(ele, [opt]);
    ele = ele.parentNode;
  } while (ele && ele.__subtreeObserversCount);
};

exports["default"] = Observer;
module.exports = exports['default'];

/***/ }),

/***/ 6817:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

var _Element = __webpack_require__(1981);

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlotNode = function SlotNode() {};

SlotNode.prototype = (0, _create2.default)(_Element2.default.prototype, {
  constructor: {
    value: SlotNode,
    writable: true,
    configurable: true
  }
});

// 对dom元素时行封装，返回虚拟dom
SlotNode.wrap = function (ele) {
  var tempObj = (0, _create2.default)(SlotNode.prototype);
  _Element2.default.initialize(tempObj);
  tempObj.__domElement = ele;
  ele.__wxElement = tempObj;
  tempObj.$$ = ele;
  return tempObj;
};

exports["default"] = SlotNode;
module.exports = exports['default'];

/***/ }),

/***/ 8585:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

var _BoundProps = __webpack_require__(8538);

var _BoundProps2 = _interopRequireDefault(_BoundProps);

var _TemplateExparser = __webpack_require__(53);

var _TemplateExparser2 = _interopRequireDefault(_TemplateExparser);

var _Element = __webpack_require__(1981);

var _Element2 = _interopRequireDefault(_Element);

var _SlotNode = __webpack_require__(6817);

var _SlotNode2 = _interopRequireDefault(_SlotNode);

var _VirtualNode = __webpack_require__(10);

var _VirtualNode2 = _interopRequireDefault(_VirtualNode);

var _TextNode = __webpack_require__(7713);

var _TextNode2 = _interopRequireDefault(_TextNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dollarSign = String.fromCharCode(36);

function dashToCamel(txt) {
  return txt.replace(/-([a-z])/g, function (match, p1) {
    return p1.toUpperCase();
  });
}

var Instance = function Instance() {};
Instance.prototype = (0, _create2.default)(Object.prototype, {
  constructor: {
    value: Instance,
    writable: true,
    configurable: true
  }
});

function getAttributes(attributes) {
  var tempObj = (0, _create2.default)(null);
  var idx = 0;
  for (; idx < attributes.length; idx++) {
    tempObj[attributes[idx].name] = attributes[idx].value;
  }
  return tempObj;
}

var setObjAttr = function setObjAttr(obj, key, value) {
  obj[key] = value;
};

function domRendering(nodes, shadowRoot, idMap, slots, binding) {
  // 把nodes追加到shadowRoot下
  var newNode = null,
      attrIdx = 0,
      attr = null,
      rootIdx = 0;
  for (; rootIdx < nodes.length; rootIdx++) {
    var node = nodes[rootIdx];
    if (node.name === undefined) {
      newNode = _TextNode2.default.create(node.text);
      node.exp && binding.add(node.exp, newNode.__domElement, 'textContent', setObjAttr);
      _Element2.default.appendChild(shadowRoot, newNode);
    } else {
      var attributes = node.attrs;
      if (node.name === 'virtual') {
        newNode = _VirtualNode2.default.create(node.virtual);
      } else if (node.custom) {
        newNode = componentSystem.create(node.name);
        attrIdx = 0;
        for (; attrIdx < attributes.length; attrIdx++) {
          attr = attributes[attrIdx];
          if (attr.updater) {
            attr.updater(newNode, attr.name, attr.value);
          } else {
            if (newNode.__behavior.properties[attr.name].type === Boolean) {
              newNode[attr.name] = !0;
            } else {
              newNode[attr.name] = attr.value;
            }
          }
          attr.exp && binding.add(attr.exp, newNode, attr.name, attr.updater);
        }
      } else {
        newNode = _SlotNode2.default.wrap(document.importNode(node.prerendered, !1)); // 以real dom创建Vnode
        attrIdx = 0;
        for (; attrIdx < attributes.length; attrIdx++) {
          attr = attributes[attrIdx];
          binding.add(attr.exp, newNode.__domElement, attr.name, attr.updater);
        }
      }
      _Element2.default.appendChild(shadowRoot, newNode);
      node.id && (idMap[node.id] = newNode);
      node.slot !== undefined && (slots[node.slot] = newNode);
      domRendering(node.children, newNode, idMap, slots, binding);
    }
  }
}

function nativeRendering(nodes, shadowRoot, idMap, slots, binding) {
  var tempNode = null,
      attrIdx = 0,
      attr = null,
      idx = 0;
  for (; idx < nodes.length; idx++) {
    var nodeItem = nodes[idx];
    if (void 0 === nodeItem.name) {
      tempNode = document.createTextNode(nodeItem.text);
      nodeItem.exp && binding.add(nodeItem.exp, tempNode, 'textContent', setObjAttr);
      shadowRoot.appendChild(tempNode);
    } else {
      var attributes = nodeItem.attrs;
      tempNode = document.importNode(nodeItem.prerendered, false);
      attrIdx = 0;
      for (; attrIdx < attributes.length; attrIdx++) {
        attr = attributes[attrIdx];
        binding.add(attr.exp, tempNode, attr.name, attr.updater);
      }
      shadowRoot.appendChild(tempNode);
      nodeItem.id && (idMap[nodeItem.id] = tempNode);
      undefined !== nodeItem.slot && (slots[nodeItem.slot] = tempNode);
      nativeRendering(nodeItem.children, tempNode, idMap, slots, binding);
    }
  }
}

var Template = function Template() {};
Template.prototype = (0, _create2.default)(Object.prototype, {
  constructor: {
    value: Template,
    writable: true,
    configurable: true
  }
});

var componentSystem = null;
Template._setCompnentSystem = function (obj) {
  componentSystem = obj;
};

var globalOptions = function globalOptions() {
  return {
    renderingMode: 'native',
    keepWhiteSpace: false,
    parseTextContent: false
  };
};
Template._setGlobalOptionsGetter = function (opt) {
  globalOptions = opt;
};

var toggleDomClassAttr = function toggleDomClassAttr(ele, classname, force) {
  ele.__domElement.classList.toggle(classname, !!force);
};

var setDomStyle = function setDomStyle(ele, attr, value) {
  ele.__domElement.style[attr] = value;
};

var setAttr = function setAttr(ele, attr, value) {
  if (value === !0) {
    ele.setAttribute(attr, '');
  } else {
    if (value === false || undefined === value || value === null) {
      ele.removeAttribute(attr);
    } else {
      ele.setAttribute(attr, value);
    }
  }
};

var toggleClassAttr = function toggleClassAttr(ele, classname, force) {
  ele.classList.toggle(classname, !!force);
};

var setStyle = function setStyle(ele, attr, value) {
  ele.style[attr] = value;
};

var slot = {
  name: 'virtual',
  virtual: 'slot',
  slot: '',
  attrs: [],
  children: []
};
var virtual = {
  name: 'virtual',
  slot: '',
  attrs: [],
  prerendered: document.createElement('virtual'),
  children: []

  // create(insElement, defaultValuesJSON, componentBehavior.methods, opts)
};Template.create = function (ele, data, behaviorMethods, opts) {
  // opts:Element.options ele：dom
  var globOpt = globalOptions();
  var renderingMode = opts.renderingMode || globOpt.renderingMode;
  var slotRef = slot;
  if (renderingMode === 'native') {
    slotRef = virtual;
  }
  // 确定配置项
  var eleAttributes = getAttributes(ele.attributes);
  var textParseOpt = {
    parseTextContent: undefined !== eleAttributes['parse-text-content'] || opts.parseTextContent || globOpt.parseTextContent,
    keepWhiteSpace: undefined !== eleAttributes['keep-white-space'] || opts.keepWhiteSpace || globOpt.keepWhiteSpace
  };

  var content = ele.content;
  if (ele.tagName !== 'TEMPLATE') {
    content = document.createDocumentFragment();
    for (; ele.childNodes.length;) {
      content.appendChild(ele.childNodes[0]);
    }
  }

  var isSlotPused = false;

  var childNodeFn = function childNodeFn(tagTree, contentChildNodes, tempArr, textParseOpt) {
    var exp = void 0,
        nodeIdx = 0;
    for (; nodeIdx < contentChildNodes.length; nodeIdx++) {
      var nodeItem = contentChildNodes[nodeIdx];
      var treeLengthList = tempArr.concat(tagTree.length);
      if (nodeItem.nodeType !== 8) {
        // if not Node.COMMENT_NODE
        if (nodeItem.nodeType !== 3) {
          // if not Node.TEXT_NODE
          if (nodeItem.tagName !== 'WX-CONTENT' && nodeItem.tagName !== 'SLOT') {
            // 不是占位标签
            var isCustomEle = nodeItem.tagName.indexOf('-') >= 0 && renderingMode !== 'native';
            var prerendered = null;
            isCustomEle || (prerendered = document.createElement(nodeItem.tagName));
            var id = '';
            var nodeItemAttributes = nodeItem.attributes;
            var attrs = [];
            if (nodeItemAttributes) {
              var pareOpts = {},
                  attrIdx = 0;
              for (; attrIdx < nodeItemAttributes.length; attrIdx++) {
                var nodeItemAttr = nodeItemAttributes[attrIdx];
                if (nodeItemAttr.name === 'id') {
                  id = nodeItemAttr.value;
                } else if (nodeItemAttr.name === 'parse-text-content') {
                  pareOpts.parseTextContent = true;
                } else if (nodeItemAttr.name === 'keep-white-space') {
                  pareOpts.keepWhiteSpace = true;
                } else {
                  exp = undefined;
                  var attrSetter = void 0;
                  var attrName = nodeItemAttr.name;

                  if (nodeItemAttr.name.slice(-1) === dollarSign) {
                    // 属性名末尾是$
                    if (isCustomEle) {
                      attrSetter = setObjAttr;
                      attrName = dashToCamel(nodeItemAttr.name.slice(0, -1));
                    } else {
                      // dom
                      attrSetter = setAttr;
                      attrName = nodeItemAttr.name.slice(0, -1);
                    }
                  } else {
                    if (nodeItemAttr.name.slice(-1) === ':') {
                      attrSetter = setObjAttr; // 整理后isCustomEle ? setAttr : setObjAttr 这是有误的
                      attrName = dashToCamel(nodeItemAttr.name.slice(0, -1));
                    } else {
                      if (nodeItemAttr.name.slice(0, 6) === 'class.') {
                        attrSetter = isCustomEle ? toggleDomClassAttr : toggleClassAttr;
                        attrName = nodeItemAttr.name.slice(6);
                      } else {
                        if (nodeItemAttr.name.slice(0, 6) === 'style.') {
                          attrSetter = isCustomEle ? setDomStyle : setStyle;
                          attrName = nodeItemAttr.name.slice(6);
                        }
                      }
                    }
                  }
                  attrSetter && (exp = _TemplateExparser2.default.parse(nodeItemAttr.value, behaviorMethods));
                  var value = exp ? exp.calculate(null, data) : nodeItemAttr.value;
                  isCustomEle || (attrSetter || setAttr)(prerendered, attrName, value);(isCustomEle || exp) && attrs.push({
                    // isCustomEle 为后面设置属性用
                    name: attrName,
                    value: value,
                    updater: attrSetter,
                    exp: exp
                  });
                }
              }

              var elementNode = {
                name: nodeItem.tagName.toLowerCase(),
                id: id,
                custom: isCustomEle,
                attrs: attrs,
                prerendered: prerendered,
                children: []
              };
              tagTree.push(elementNode);
              nodeItem.tagName === 'VIRTUAL' && (elementNode.virtual = 'virtual');
              nodeItem.childNodes && childNodeFn(elementNode.children, nodeItem.childNodes, treeLengthList, pareOpts);
              if (elementNode.children.length === 1 && elementNode.children[0] === slotRef) {
                elementNode.children.pop();
                elementNode.slot = '';
              }
            }
          } else {
            isSlotPused = true;
            tagTree.push(slotRef);
          }
        } else {
          var text = nodeItem.textContent;
          if (!textParseOpt.keepWhiteSpace) {
            text = text.trim();
            if (text === '') continue;
            nodeItem.textContent = text;
          }
          exp = undefined;
          textParseOpt.parseTextContent && (exp = _TemplateExparser2.default.parse(text, behaviorMethods));
          tagTree.push({
            exp: exp,
            text: exp ? exp.calculate(null, data) : text
          });
        }
      }
    }
  };

  var tagTree = [];
  childNodeFn(tagTree, content.childNodes, [], textParseOpt);
  isSlotPused || tagTree.push(slotRef);
  tagTree.length === 1 && tagTree[0] === slotRef && tagTree.pop();
  var tempTemplate = (0, _create2.default)(Template.prototype);
  tempTemplate._tagTreeRoot = tagTree;
  tempTemplate._renderingMode = renderingMode;
  return tempTemplate;
};

Template.prototype.createInstance = function () {
  var ins = (0, _create2.default)(Instance.prototype);
  var idMap = (0, _create2.default)(null);
  var slots = (0, _create2.default)(null);
  var _binding = _BoundProps2.default.create();
  var shadowRoot = document.createDocumentFragment();

  if (this._renderingMode === 'native') {
    // console.log(this._tagTreeRoot, shadowRoot, idMap, slots, _binding)
    nativeRendering(this._tagTreeRoot, shadowRoot, idMap, slots, _binding);
  } else {
    shadowRoot = _VirtualNode2.default.create('shadow-root');
    domRendering(this._tagTreeRoot, shadowRoot, idMap, slots, _binding);
  }

  ins.shadowRoot = shadowRoot;
  ins.idMap = idMap;
  ins.slots = slots;
  ins._binding = _binding;
  return ins;
};

Instance.prototype.updateValues = function (ele, propData, propKey) {
  propKey && this._binding.update(ele, propData, propKey);
};

exports["default"] = Template;
module.exports = exports['default'];

/***/ }),

/***/ 53:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

var _Events = __webpack_require__(1939);

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateExparser = function TemplateExparser() {};
TemplateExparser.prototype = (0, _create2.default)(Object.prototype, {
  constructor: {
    value: TemplateExparser,
    writable: true,
    configurable: true
  }
});

TemplateExparser.parse = function (value, methods) {
  var tempObj = (0, _create2.default)(TemplateExparser.prototype);
  var slices = value.split(/\{\{(.*?)\}\}/g);
  var boundPropList = [];
  for (var idx = 0; idx < slices.length; idx++) {
    if (idx % 2) {
      var methodSlices = slices[idx].match(/^(!?)([-_a-zA-Z0-9]+)(?:\((([-_a-zA-Z0-9]+)(,[-_a-zA-Z0-9]+)*)\))?$/) || [!1, '']; // "test(a,b,c)"
      var args = null;
      if (methodSlices[3]) {
        args = methodSlices[3].split(',');
        for (var argIdx = 0; argIdx < args.length; argIdx++) {
          boundPropList.indexOf(args[argIdx]) < 0 && boundPropList.push(args[argIdx]);
        }
      } else {
        // single arg
        boundPropList.indexOf(methodSlices[2]) < 0 && boundPropList.push(methodSlices[2]);
      }
      slices[idx] = {
        not: !!methodSlices[1],
        prop: methodSlices[2], // 方法名
        callee: args // 参数
      };
    }
  }

  tempObj.bindedProps = boundPropList; // 相关联的data key
  tempObj.isSingleletiable = slices.length === 3 && slices[0] === '' && slices[2] === ''; // 仅表达式
  tempObj._slices = slices;
  tempObj._methods = methods;
  return tempObj;
};

var propCalculate = function propCalculate(ele, data, methods, opt) {
  // 解析模板
  var res = '';
  if (opt.callee) {
    var args = [],
        idx = 0;
    for (; idx < opt.callee.length; idx++) {
      args[idx] = data[opt.callee[idx]];
    }
    res = _Events2.default.safeCallback('TemplateExparser Method', methods[opt.prop], ele, args);undefined !== res && res !== null || (res = '');
  } else {
    res = data[opt.prop];
  }
  if (opt.not) {
    return !res;
  } else {
    return res;
  }
};

TemplateExparser.prototype.calculate = function (ele, data) {
  // 解析模板返回结果
  var slices = this._slices;
  var opt = null;
  var value = '';
  if (this.isSingleletiable) {
    opt = slices[1];
    value = propCalculate(ele, data, this._methods, opt);
  } else {
    for (var idx = 0; idx < slices.length; idx++) {
      opt = slices[idx];
      if (idx % 2) {
        value += propCalculate(ele, data, this._methods, opt);
      } else {
        value += opt;
      }
    }
  }
  return value;
};

exports["default"] = TemplateExparser;
module.exports = exports['default'];

/***/ }),

/***/ 7713:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

var _Observer = __webpack_require__(2086);

var _Observer2 = _interopRequireDefault(_Observer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextNode = function TextNode() {};
TextNode.prototype = (0, _create2.default)(Object.prototype, {
  constructor: {
    value: TextNode,
    writable: true,
    configurable: true
  }
});

// createTextNode
TextNode.create = function (txt) {
  var tempObj = (0, _create2.default)(TextNode.prototype);
  tempObj.$$ = tempObj.__domElement = document.createTextNode(txt || '');
  tempObj.__domElement.__wxElement = tempObj;
  tempObj.__subtreeObserversCount = 0;
  tempObj.parentNode = null;
  return tempObj;
};

Object.defineProperty(TextNode.prototype, 'textContent', {
  get: function get() {
    return this.__domElement.textContent;
  },
  set: function set(txt) {
    this.__domElement.textContent = txt;
    if (this.__textObservers && !this.__textObservers.empty || this.__subtreeObserversCount) {
      _Observer2.default._callObservers(this, '__textObservers', {
        type: 'characterData',
        target: this
      });
    }
  }
});
exports["default"] = TextNode;
module.exports = exports['default'];

/***/ }),

/***/ 10:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

var _Element = __webpack_require__(1981);

var _Element2 = _interopRequireDefault(_Element);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VirtualNode = function VirtualNode() {};
VirtualNode.prototype = (0, _create2.default)(_Element2.default.prototype, {
  constructor: {
    value: VirtualNode,
    writable: true,
    configurable: true
  }
});

// createVirtualNode
VirtualNode.create = function (is) {
  var insVirtualNode = (0, _create2.default)(VirtualNode.prototype);
  insVirtualNode.__virtual = true;
  insVirtualNode.is = is;
  _Element2.default.initialize(insVirtualNode, null); // 第二个null参数没用？
  return insVirtualNode;
};

exports["default"] = VirtualNode;
module.exports = exports['default'];

/***/ }),

/***/ 3492:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _main = __webpack_require__(8677);

var main = _interopRequireWildcard(_main);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

window.exparser = main;

/***/ }),

/***/ 8677:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.removeGlobalErrorListener = exports.addGlobalErrorListener = exports.triggerEvent = exports.removeListenerFromElement = exports.addListenerToElement = exports.replaceChild = exports.removeChild = exports.insertBefore = exports.appendChild = exports.createVirtualNode = exports.createTextNode = exports.createElement = exports.componentList = exports.registerElement = exports.registerBehavior = exports.globalOptions = exports.Observer = exports.Component = exports.VirtualNode = exports.TextNode = exports.Element = exports.Behavior = undefined;

var _Events = __webpack_require__(1939);

var _Events2 = _interopRequireDefault(_Events);

var _EventManager = __webpack_require__(18);

var EventManager = _interopRequireWildcard(_EventManager);

var _Behavior = __webpack_require__(2277);

var _Behavior2 = _interopRequireDefault(_Behavior);

var _Element = __webpack_require__(1981);

var _Element2 = _interopRequireDefault(_Element);

var _Component = __webpack_require__(8818);

var _Component2 = _interopRequireDefault(_Component);

var _TextNode = __webpack_require__(7713);

var _TextNode2 = _interopRequireDefault(_TextNode);

var _VirtualNode = __webpack_require__(10);

var _VirtualNode2 = _interopRequireDefault(_VirtualNode);

var _Observer = __webpack_require__(2086);

var _Observer2 = _interopRequireDefault(_Observer);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalOptions = {
  renderingMode: 'full',
  keepWhiteSpace: false,
  parseTextContent: true,
  throwGlobalError: false
};

_Component2.default._setGlobalOptionsGetter(function () {
  return globalOptions;
});
_Events2.default._setGlobalOptionsGetter(function () {
  return globalOptions;
});

// Expose all related class
exports.Behavior = _Behavior2.default;
exports.Element = _Element2.default;
exports.TextNode = _TextNode2.default;
exports.VirtualNode = _VirtualNode2.default;
exports.Component = _Component2.default;
exports.Observer = _Observer2.default;
exports.globalOptions = globalOptions;

// Register

var registerBehavior = exports.registerBehavior = _Behavior2.default.create;
var registerElement = exports.registerElement = _Component2.default.register;
var componentList = exports.componentList = _Component2.default.list;

// Create node
var createElement = exports.createElement = _Component2.default.create;
var createTextNode = exports.createTextNode = _TextNode2.default.create;
var createVirtualNode = exports.createVirtualNode = _VirtualNode2.default.create;

// Dom manipulation
var appendChild = exports.appendChild = _Element2.default.appendChild;
var insertBefore = exports.insertBefore = _Element2.default.insertBefore;
var removeChild = exports.removeChild = _Element2.default.removeChild;
var replaceChild = exports.replaceChild = _Element2.default.replaceChild;

// Event
var addListenerToElement = exports.addListenerToElement = EventManager.addListenerToElement;
var removeListenerFromElement = exports.removeListenerFromElement = EventManager.removeListenerFromElement;
var triggerEvent = exports.triggerEvent = EventManager.triggerEvent;
var addGlobalErrorListener = exports.addGlobalErrorListener = _Events2.default.addGlobalErrorListener;
var removeGlobalErrorListener = exports.removeGlobalErrorListener = _Events2.default.removeGlobalErrorListener;

/***/ }),

/***/ 4761:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _stringify = __webpack_require__(3239);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _objPath = __webpack_require__(1450);

var _objPath2 = _interopRequireDefault(_objPath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var data = {};

var AppData = function () {
  function AppData() {
    (0, _classCallCheck3.default)(this, AppData);
  }

  (0, _createClass3.default)(AppData, null, [{
    key: 'getAppData',
    value: function getAppData() {
      return data;
    }
  }, {
    key: 'mergeData',
    value: function mergeData(originObj, anotherObj) {
      var originData = JSON.parse((0, _stringify2.default)(originObj));
      for (var dataName in anotherObj) {
        var paths = _objPath2.default.parsePath(dataName);
        var _data = _objPath2.default.getObjectByPath(originObj, paths, !1);
        var dObj = _data.obj,
            dKey = _data.key,
            sData = _objPath2.default.getObjectByPath(originData, paths, !0),
            sObj = sData.obj,
            sKey = sData.key,
            sChanged = sData.changed;

        dObj && (dObj[dKey] = anotherObj[dataName]);

        if (sObj) {
          if (sChanged) {
            sObj[sKey] = anotherObj[dataName];
          } else {
            sObj[sKey] = {
              __value__: anotherObj[dataName],
              __wxspec__: !0
            };
          }
        }
      }
      return originData;
    }
  }]);
  return AppData;
}();

exports["default"] = AppData;
module.exports = exports['default'];

/***/ }),

/***/ 1270:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _VPatch = __webpack_require__(5645);

var _VPatch2 = _interopRequireDefault(_VPatch);

var _Patch = __webpack_require__(6825);

var _Patch2 = _interopRequireDefault(_Patch);

var _Utils = __webpack_require__(2353);

var _Utils2 = _interopRequireDefault(_Utils);

var _ListDiff = __webpack_require__(1515);

var _ListDiff2 = _interopRequireDefault(_ListDiff);

var _Enums = __webpack_require__(1316);

var _Enums2 = _interopRequireDefault(_Enums);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var diff = function diff(oriEle, newEle) {
  var patches = {};
  diffNode(oriEle, newEle, patches, 0);
  return new _Patch2.default(oriEle, patches);
};

var diffNode = function diffNode(oriEle, newEle, patches, index) {
  if (oriEle !== newEle) {
    var patch = patches[index];
    if (newEle == null) {
      patch = appendPatch(patch, new _VPatch2.default(_Enums2.default.PATCH_TYPE.REMOVE, oriEle));
    } else if (_Utils2.default.isVirtualNode(newEle)) {
      if (_Utils2.default.isVirtualNode(oriEle)) {
        if (oriEle.tagName === newEle.tagName && oriEle.wxKey === newEle.wxKey) {
          if (oriEle.tagName === 'virtual' && oriEle.wxVkey !== newEle.wxVkey) {
            // 虚拟节点变化
            patch = appendPatch(patch, new _VPatch2.default(_Enums2.default.PATCH_TYPE.VNODE, oriEle, newEle));
          } else {
            var propPatches = diffProps(newEle.props, newEle.newProps); // 属性变化
            propPatches && (patch = appendPatch(patch, new _VPatch2.default(_Enums2.default.PATCH_TYPE.PROPS, oriEle, propPatches)));
            patch = diffChildren(oriEle, newEle, patches, patch, index);
          }
        } else {
          patch = appendPatch(patch, new _VPatch2.default(_Enums2.default.PATCH_TYPE.VNODE, oriEle, newEle));
        }
      } else {
        patch = appendPatch(patch, new _VPatch2.default(_Enums2.default.PATCH_TYPE.VNODE, oriEle, newEle));
      }
    } else {
      if (!_Utils2.default.isVirtualText(newEle)) {
        console.log('unknow node type', oriEle, newEle);
        throw {
          message: 'unknow node type',
          node: newEle
        };
      }
      newEle.text !== oriEle.text && (patch = appendPatch(patch, new _VPatch2.default(_Enums2.default.PATCH_TYPE.TEXT, oriEle, newEle)));
    }
    patch && (patches[index] = patch);
  }
};

var diffChildren = function diffChildren(old, newEle, patches, patch, index) {
  var oldChildren = old.children;
  var orderedSet = _ListDiff2.default.listDiff(oldChildren, newEle.children);
  var newChildren = orderedSet.children;
  var len = oldChildren.length > newChildren.length ? oldChildren.length : newChildren.length;
  var idx = 0;
  for (; idx < len; ++idx) {
    var oldChild = oldChildren[idx],
        newChild = newChildren[idx];
    ++index;

    if (oldChild) {
      diffNode(oldChild, newChild, patches, index);
    } else {
      if (newChild) {
        patch = appendPatch(patch, new _VPatch2.default(_Enums2.default.PATCH_TYPE.INSERT, oldChild, newChild));
      }
    }
    _Utils2.default.isVirtualNode(oldChild) && (index += oldChild.descendants);
  }
  orderedSet.moves && (patch = appendPatch(patch, new _VPatch2.default(_Enums2.default.PATCH_TYPE.REORDER, old, orderedSet.moves)));
  return patch;
};
// 设置属性
var diffProps = function diffProps(props, newProps) {
  var tempObj = {};
  for (var key in newProps) {
    var newPropName = newProps[key];
    tempObj[newPropName] = props[newPropName];
  }
  return _Utils2.default.isEmptyObject(tempObj) ? void 0 : tempObj;
};
// 将newPatch加入到patches数组
var appendPatch = function appendPatch(patches, newPatch) {
  if (patches) {
    patches.push(newPatch);
    return patches;
  } else {
    return [newPatch];
  }
};

exports["default"] = {
  diff: diff,
  diffChildren: diffChildren,
  diffNode: diffNode,
  diffProps: diffProps,
  appendPatch: appendPatch
};
module.exports = exports['default'];

/***/ }),

/***/ 9799:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
// 通过遍历tree找出patchIndexs中相应索引对应的node,返回nodes
var getDomIndex = function getDomIndex(rootNode, tree, patchIndexs) {
  if (patchIndexs && patchIndexs.length != 0) {
    patchIndexs = patchIndexs.sort(function (a, b) {
      // 升序
      return a - b;
    });
    var nodes = {}; // real dom <-> vdom : key = nodeindex, value = real node
    mapIndexToDom(rootNode, tree, patchIndexs, nodes, 0);
    return nodes;
  }
  return {};
};

var mapIndexToDom = function mapIndexToDom(realDomRootNode, vDomRootNode, patchIndexs, nodes, rootIndex) {
  if (realDomRootNode) {
    // real place to add node to maps
    oneOfIndexesInRange(patchIndexs, rootIndex, rootIndex) && (nodes[rootIndex] = realDomRootNode);
    var vDomChildren = vDomRootNode.children;
    if (vDomChildren) {
      var realDomChildren = realDomRootNode.childNodes,
          idx = 0;
      for (; idx < vDomChildren.length; ++idx) {
        var vChild = vDomChildren[idx];
        ++rootIndex;
        var lastIndex = rootIndex + (vChild.descendants || 0);
        oneOfIndexesInRange(patchIndexs, rootIndex, lastIndex) && mapIndexToDom(realDomChildren[idx], vChild, patchIndexs, nodes, rootIndex);
        rootIndex = lastIndex;
      }
    }
  }
};

// Binary search for an index in the interval [left, right]
var oneOfIndexesInRange = function oneOfIndexesInRange(indices, left, right) {
  var index = 0,
      length = indices.length - 1;
  for (; index <= length;) {
    var pivotKey = length + index >> 1,
        pivotValue = indices[pivotKey];
    if (pivotValue < left) {
      index = pivotKey + 1;
    } else {
      if (!(pivotValue > right)) return !0;
      length = pivotKey - 1;
    }
  }
  return !1;
};

exports["default"] = { getDomIndex: getDomIndex, mapIndexToDom: mapIndexToDom, oneOfIndexesInRange: oneOfIndexesInRange };
module.exports = exports["default"];

/***/ }),

/***/ 1316:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = {
  PATCH_TYPE: {
    NONE: 0,
    TEXT: 1,
    VNODE: 2,
    PROPS: 3,
    REORDER: 4,
    INSERT: 5,
    REMOVE: 6
  },
  WX_KEY: 'wxKey',
  ATTRIBUTE_NAME: ['class', 'style'],
  RPX_RATE: 20,
  BASE_DEVICE_WIDTH: 750,
  INLINE_STYLE: ['placeholderStyle', 'hoverStyle', 'style']
};
module.exports = exports['default'];

/***/ }),

/***/ 8598:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _Enums = __webpack_require__(1316);

var _Enums2 = _interopRequireDefault(_Enums);

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var init = function init() {
  window.__webview_engine_version__ = 0.02;
  document.addEventListener('DOMContentLoaded', function () {
    var screenWidth = _utils2.default.getPlatform() && window.innerWidth || 375;
    document.documentElement.style.fontSize = screenWidth / _Enums2.default.RPX_RATE + 'px';
  }, 1e3);
};

exports["default"] = { init: init };
module.exports = exports['default'];

/***/ }),

/***/ 1515:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _Utils = __webpack_require__(2353);

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// a for old, b for new
var listDiff = function listDiff(aChildren, bChildren) {
  function remove(arr, index, key) {
    arr.splice(index, 1);
    return {
      index: index,
      key: key
    };
  }

  var aChildIndex = makeKeyAndFreeIndexes(aChildren);
  var aKeys = aChildIndex.keyIndexes;

  // remove original child if it has no keyed child
  if (_Utils2.default.isEmptyObject(aKeys)) {
    return {
      children: bChildren,
      moves: null
    };
  }

  var bChildIndex = makeKeyAndFreeIndexes(bChildren);
  var bKeys = bChildIndex.keyIndexes;
  var bFree = bChildIndex.freeIndexes;

  // remove original child if newChild has no keyed child
  if (_Utils2.default.isEmptyObject(bKeys)) {
    return {
      children: bChildren,
      moves: null
    };
  }

  var newChildren = [];
  var freeIndex = 0;
  var deletedItems = 0;

  // Iterate through oldChs and match oldChs node in newChs
  // O(N) time
  for (var idx = 0; idx < aChildren.length; ++idx) {
    var aItem = aChildren[idx];
    var aItemKey = getItemKey(aItem);
    if (aItemKey) {
      if (bKeys.hasOwnProperty(aItemKey)) {
        // Match up the old keys
        var itemIndex = bKeys[aItemKey];
        newChildren.push(bChildren[itemIndex]);
      } else {
        // Remove old keyed items
        ++deletedItems;
        newChildren.push(null);
      }
    } else if (freeIndex < bFree.length) {
      // Match the item in a with the next free item in b
      var _itemIndex = bFree[freeIndex];
      newChildren.push(bChildren[_itemIndex]);
      ++freeIndex;
    } else {
      // There are no free items in b to match with
      // the free items in a, so the extra free nodes
      // are deleted.
      ++deletedItems;
      newChildren.push(null);
    }
  }

  var lastFreeIndex = bFree[freeIndex] || bChildren.length;

  // Iterate through b and append any new keys
  // O(M) time
  for (var _idx = 0; _idx < bChildren.length; ++_idx) {
    var newItem = bChildren[_idx],
        bItemKey = getItemKey(newItem);
    if (bItemKey) {
      aKeys.hasOwnProperty(bItemKey) || newChildren.push(newItem);
    } else if (_idx >= lastFreeIndex) {
      newChildren.push(newItem);
    }
  }

  var simulate = newChildren.slice(0);
  var simulateIndex = 0;
  var removes = [];
  var inserts = [];

  for (var _idx2 = 0; _idx2 < bChildren.length;) {
    var itemNode = bChildren[_idx2];
    var itemKey = getItemKey(itemNode);

    var simulateItem = simulate[simulateIndex];
    var newItemKey = getItemKey(simulateItem);

    // remove items
    for (; simulateItem === null;) {
      // if null remove it
      removes.push(remove(simulate, simulateIndex, newItemKey));

      // update simulateItem info
      simulateItem = simulate[simulateIndex];
      newItemKey = getItemKey(simulateItem);
    }

    if (newItemKey === itemKey) {
      ++simulateIndex;
      ++_idx2;
    } else {
      // if we need a key in this position...
      if (itemKey) {
        if (newItemKey) {
          if (bKeys[newItemKey] === _idx2 + 1) {
            inserts.push({
              key: itemKey,
              index: _idx2
            });
          } else {
            // if an insert doesn't put this key in place, it needs to move
            removes.push(remove(simulate, simulateIndex, newItemKey));
            simulateItem = simulate[simulateIndex];

            // items are matching, so skip ahead
            if (simulateItem && getItemKey(simulateItem) === itemKey) {
              ++simulateIndex;
            } else {
              // if the remove didn't put the wanted item in place, we need to insert it
              inserts.push({
                key: itemKey,
                index: _idx2
              });
            }
          }
        } else {
          // insert a keyed wanted item
          inserts.push({
            key: itemKey,
            index: _idx2
          });
        }
        ++_idx2;
      } else {
        // a key in simulate has no matching wanted key, remove it
        removes.push(remove(simulate, simulateIndex, newItemKey));

        // simulateItem will update at the beginning of  next iteration
      }
    }
  }

  // remove all the remaining nodes from simulate
  for (; simulateIndex < simulate.length;) {
    var _simulateItem = simulate[simulateIndex];
    var _itemKey = getItemKey(_simulateItem);
    removes.push(remove(simulate, simulateIndex, _itemKey));
  }

  if (removes.length === deletedItems && inserts.length == 0) {
    return {
      children: newChildren,
      moves: null
    };
  } else {
    return {
      children: newChildren,
      moves: {
        removes: removes,
        inserts: inserts
      }
    };
  }
};

var makeKeyAndFreeIndexes = function makeKeyAndFreeIndexes(children) {
  var keyIndexes = {},
      freeIndexes = [];
  for (var idx = 0; idx < children.length; ++idx) {
    var child = children[idx];
    var wxKey = getItemKey(child);
    if (wxKey) {
      if (keyIndexes.hasOwnProperty(wxKey)) {
        console.error('\u591A\u6B21\u4F7F\u7528 ' + wxKey + ' \u4F5C\u4E3A wxKey');
        child.wxKey = void 0;
        freeIndexes.push(idx);
      } else {
        keyIndexes[wxKey] = idx;
      }
    } else {
      freeIndexes.push(idx);
    }
  }
  return {
    keyIndexes: keyIndexes,
    freeIndexes: freeIndexes
  };
};

var getItemKey = function getItemKey(ele) {
  if (ele) return ele.wxKey;
};

exports["default"] = {
  listDiff: listDiff,
  makeKeyAndFreeIndexes: makeKeyAndFreeIndexes,
  getItemKey: getItemKey
};
module.exports = exports['default'];

/***/ }),

/***/ 6825:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _keys = __webpack_require__(8902);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _DomIndex = __webpack_require__(9799);

var _DomIndex2 = _interopRequireDefault(_DomIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Patch = function () {
  function Patch(oldTree, patches) {
    (0, _classCallCheck3.default)(this, Patch);

    this.oldTree = oldTree;
    this.patches = patches;
    this.patchIndexes = (0, _keys2.default)(this.patches).map(function (idx) {
      return Number(idx);
    });
  }

  (0, _createClass3.default)(Patch, [{
    key: 'apply',
    value: function apply(rootNode) {
      var that = this;
      if (this.patchIndexes.length === 0) return rootNode;

      var doms = _DomIndex2.default.getDomIndex(rootNode, this.oldTree, this.patchIndexes);

      this.patchIndexes.forEach(function (patchIdx) {
        var dom = doms[patchIdx];
        if (dom) {
          var patches = that.patches[patchIdx];
          patches.forEach(function (vpatch) {
            vpatch.apply(dom);
          });
        }
      });
      return rootNode;
    }
  }]);
  return Patch;
}();

exports["default"] = Patch;
module.exports = exports['default'];

/***/ }),

/***/ 502:
/***/ ((module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var cache = {};
var regexDict = {
  dashToCamel: /-[a-z]/g,
  camelToDash: /([A-Z])/g
};

var dashToCamelCase = function dashToCamelCase(str) {
  if (cache[str]) {
    return cache[str];
  } else {
    if (str.indexOf('-') <= 0) {
      cache[str] = str;
    } else {
      cache[str] = str.replace(regexDict.dashToCamel, function (match) {
        return match[1].toUpperCase();
      });
    }
    return cache[str];
  }
};

var camelToDashCase = function camelToDashCase(str) {
  return cache[str] || (cache[str] = str.replace(regexDict.camelToDash, '-$1').toLowerCase());
};

exports["default"] = {
  dashToCamelCase: dashToCamelCase,
  camelToDashCase: camelToDashCase
};
module.exports = exports['default'];

/***/ }),

/***/ 2052:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = __webpack_require__(8902);

var _keys2 = _interopRequireDefault(_keys);

var _Enums = __webpack_require__(1316);

var _Enums2 = _interopRequireDefault(_Enums);

var _PropNameConverter = __webpack_require__(502);

var _PropNameConverter2 = _interopRequireDefault(_PropNameConverter);

var _utils = __webpack_require__(3370);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataPrefixReg = /^data-/;

function removeProperty(ele, props) {
  var hasProp = exparser.Component.hasProperty(ele, props);
  if (hasProp) {
    ele[props] = void 0;
  } else {
    if (props.slice(0, 4) === 'bind') {
      addEventHandler(ele, props.slice(4), '');
    } else {
      if (props.slice(0, 5) === 'catch') {
        addEventHandler(ele, props.slice(5), '', !0);
      } else {
        if (props.slice(0, 2) === 'on') {
          addEventHandler(ele, props.slice(2), '');
        } else {
          if (_Enums2.default.ATTRIBUTE_NAME.indexOf(props) !== -1 || dataPrefixReg.test(props)) {
            ele.$$.removeAttribute(props);
          }
        }
      }
    }
  }
}
// 设置ele属性
function applyProperties(ele, props) {
  ele.dataset = ele.dataset || {};

  var _loop = function _loop(propName) {
    var propValue = props[propName],
        propExist = exparser.Component.hasProperty(ele, propName);
    if (/^data-/.test(propName)) {
      var convertedPropName = _PropNameConverter2.default.dashToCamelCase(propName.substring(5).toLowerCase());
      ele.dataset[convertedPropName] = propValue;
    }

    if (void 0 === propValue) {
      removeProperty(ele, propName);
    } else {
      if (propExist) {
        if (_Enums2.default.INLINE_STYLE.indexOf(propName) !== -1) {
          ele[propName] = _utils2.default.transformRpx(propValue, !0);
        } else {
          ele[propName] = propValue;
        }
      } else {
        if (propName.slice(0, 4) === 'bind') {
          addEventHandler(ele, propName.slice(4), propValue);
        } else {
          if (propName.slice(0, 5) === 'catch') {
            addEventHandler(ele, propName.slice(5), propValue, !0);
          } else {
            if (propName.slice(0, 2) === 'on') {
              addEventHandler(ele, propName.slice(2), propValue);
            } else {
              var isElementAttribute = _Enums2.default.ATTRIBUTE_NAME.indexOf(propName) !== -1 || dataPrefixReg.test(propName);
              if (isElementAttribute) {
                if (propName === 'style') {
                  !function () {
                    var animationStyle = ele.animationStyle || {},
                        // 动画执行结果样式
                    transition = animationStyle.transition,
                        transform = animationStyle.transform,
                        transitionProperty = animationStyle.transitionProperty,
                        transformOrigin = animationStyle.transformOrigin,
                        cssAttributes = {
                      transition: transition,
                      transform: transform,
                      transitionProperty: transitionProperty,
                      transformOrigin: transformOrigin
                    };
                    cssAttributes['-webkit-transition'] = cssAttributes.transition;
                    cssAttributes['-webkit-transform'] = cssAttributes.transform;
                    cssAttributes['-webkit-transition-property'] = cssAttributes.transitionProperty;
                    cssAttributes['-webkit-transform-origin'] = cssAttributes.transformOrigin;

                    var refinedAttrs = (0, _keys2.default)(cssAttributes).filter(function (attribute) {
                      return !(/transform|transition/i.test(attribute) && cssAttributes[attribute] === '' || attribute.trim() === '' || void 0 === cssAttributes[attribute] || cssAttributes[attribute] === '' || !isNaN(parseInt(attribute)));
                    }).map(function (attr) {
                      var dashedProp = attr.replace(/([A-Z]{1})/g, function (str) {
                        return '-' + str.toLowerCase();
                      });
                      return dashedProp + ':' + cssAttributes[attr];
                    }).join(';');

                    ele.$$.setAttribute(propName, _utils2.default.transformRpx(propValue, !0) + refinedAttrs);
                  }();
                } else {
                  ele.$$.setAttribute(propName, propValue);
                }
              } else {
                var isAnimationProp = propName === 'animation' && (typeof propValue === 'undefined' ? 'undefined' : (0, _typeof3.default)(propValue)) === 'object';
                var isPropHasActions = propValue.actions && propValue.actions.length > 0;
                if (isAnimationProp && isPropHasActions) {
                  !function () {
                    var execAnimationAction = function execAnimationAction() {
                      if (turns < actonsLen) {
                        var styles = wd.animationToStyle(actons[turns]),
                            transition = styles.transition,
                            transitionProperty = styles.transitionProperty,
                            transform = styles.transform,
                            transformOrigin = styles.transformOrigin,
                            style = styles.style;
                        ele.$$.style.transition = transition;
                        ele.$$.style.transitionProperty = transitionProperty;
                        ele.$$.style.transform = transform;
                        ele.$$.style.transformOrigin = transformOrigin;
                        ele.$$.style.webkitTransition = transition;
                        ele.$$.style.webkitTransitionProperty = transitionProperty;
                        ele.$$.style.webkitTransform = transform;
                        ele.$$.style.webkitTransformOrigin = transformOrigin;
                        for (var idx in style) {
                          ele.$$.style[idx] = _utils2.default.transformRpx(' ' + style[idx], !0);
                        }

                        ele.animationStyle = {
                          transition: transition,
                          transform: transform,
                          transitionProperty: transitionProperty,
                          transformOrigin: transformOrigin
                        };
                      }
                    };
                    var turns = 0;
                    var actons = propValue.actions;
                    var actonsLen = propValue.actions.length;

                    ele.addListener('transitionend', function () {
                      ;turns += 1, execAnimationAction();
                    });
                    execAnimationAction();
                  }();
                }
              }
            }
          }
        }
      }
    }
  };

  for (var propName in props) {
    _loop(propName);
  }
}

var getEleInfo = function getEleInfo(ele) {
  return {
    id: ele.id,
    offsetLeft: ele.$$.offsetLeft,
    offsetTop: ele.$$.offsetTop,
    dataset: ele.dataset
  };
};
var getTouchInfo = function getTouchInfo(touches) {
  if (touches) {
    var touchInfo = [],
        idx = 0;
    for (; idx < touches.length; idx++) {
      var touch = touches[idx];
      touchInfo.push({
        identifier: touch.identifier,
        pageX: touch.pageX,
        pageY: touch.pageY,
        clientX: touch.clientX,
        clientY: touch.clientY
      });
    }
    return touchInfo;
  }
};
// 事件绑定
var addEventHandler = function addEventHandler(ele, eventName, pageEventName, useCapture) {
  ele.__wxEventHandleName || (ele.__wxEventHandleName = (0, _create2.default)(null));
  void 0 === ele.__wxEventHandleName[eventName] && ele.addListener(eventName, function (event) {
    if (ele.__wxEventHandleName[eventName]) {
      window.wd.publishPageEvent(ele.__wxEventHandleName[eventName], {
        type: event.type,
        timeStamp: event.timeStamp,
        target: getEleInfo(event.target),
        currentTarget: getEleInfo(this),
        detail: event.detail,
        touches: getTouchInfo(event.touches),
        changedTouches: getTouchInfo(event.changedTouches)
      });
      return !useCapture && void 0;
    }
  });
  ele.__wxEventHandleName[eventName] = pageEventName;
};

exports["default"] = {
  removeProperty: removeProperty,
  applyProperties: applyProperties
};
module.exports = exports['default'];

/***/ }),

/***/ 116:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

__webpack_require__(2353);

var bottomCheckDistance = 20,
    windowScrollY = 0,
    stopedTouch = !1,
    refreshFinish = !0;

var getWindowHeight = function getWindowHeight() {
  return document.compatMode === 'CSS1Compat' ? document.documentElement.clientHeight : document.body.clientHeight;
};

var getScrollHeight = function getScrollHeight() {
  var bodyScrollHeight = 0,
      documentElementScrollHeight = 0;
  document.body && (bodyScrollHeight = document.body.scrollHeight);
  document.documentElement && (documentElementScrollHeight = document.documentElement.scrollHeight);
  return Math.max(bodyScrollHeight, documentElementScrollHeight);
};

var checkScrollBottom = function checkScrollBottom() {
  var isGoingBottom = windowScrollY - window.scrollY <= 0;
  windowScrollY = window.scrollY;
  var ref = window.scrollY + getWindowHeight() + bottomCheckDistance;
  return !!(ref >= getScrollHeight() && isGoingBottom);
};

var triggerPullUpRefresh = function triggerPullUpRefresh() {
  if (refreshFinish && !stopedTouch) {
    wd.publishPageEvent('onReachBottom', {});
    refreshFinish = !1;
    setTimeout(function () {
      refreshFinish = !0;
    }, 350);
  }
};

var enablePullUpRefresh = function enablePullUpRefresh() {
  if (window.__enablePullUpRefresh__) {
    !function () {
      window.onscroll = function () {
        checkScrollBottom() && triggerPullUpRefresh();
      };
      var startPoint = 0;
      window.__DOMTree__.addListener('touchstart', function (event) {
        startPoint = event.touches[0].pageY;
        stopedTouch = !1;
      });
      window.__DOMTree__.addListener('touchmove', function (event) {
        if (!stopedTouch) {
          var currentPoint = event.touches[0].pageY;
          if (currentPoint < startPoint && checkScrollBottom()) {
            triggerPullUpRefresh();
            stopedTouch = !0;
          }
        }
      });
      window.__DOMTree__.addListener('touchend', function (event) {
        stopedTouch = !1;
      });
    }();
  }
};

exports["default"] = {
  getScrollHeight: getScrollHeight,
  getWindowHeight: getWindowHeight,
  checkScrollBottom: checkScrollBottom,
  triggerPullUpRefresh: triggerPullUpRefresh,
  enablePullUpRefresh: enablePullUpRefresh
};
module.exports = exports['default'];

/***/ }),

/***/ 2353:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _assign = __webpack_require__(2945);

var _assign2 = _interopRequireDefault(_assign);

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

var _getPrototypeOf = __webpack_require__(5105);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isString = function isString(target) {
  return Object.prototype.toString.call(target) === '[object String]';
};

exports["default"] = {
  isString: isString,
  isArray: function isArray(target) {
    return Array.isArray ? Array.isArray(target) : Object.prototype.toString.call(target) === '[object Array]';
  },
  getPrototype: function getPrototype(obj) {
    return _getPrototypeOf2.default ? (0, _getPrototypeOf2.default)(obj) : obj.__proto__ ? obj.__proto__ : obj.constructor ? obj.constructor.prototype : void 0;
  },
  isObject: function isObject(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object' && obj !== null;
  },
  isEmptyObject: function isEmptyObject(obj) {
    for (var key in obj) {
      return !1;
    }
    return !0;
  },
  isVirtualNode: function isVirtualNode(node) {
    return node && node.type === 'WxVirtualNode';
  },
  isVirtualText: function isVirtualText(node) {
    return node && node.type === 'WxVirtualText';
  },
  isUndefined: function isUndefined(obj) {
    return Object.prototype.toString.call(obj) === '[object Undefined]';
  },
  uuid: function uuid() {
    var uuidPart = function uuidPart() {
      return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
    };
    return uuidPart() + uuidPart() + '-' + uuidPart() + '-' + uuidPart() + '-' + uuidPart() + '-' + uuidPart() + uuidPart() + uuidPart();
  },
  getDataType: function getDataType(obj) {
    return Object.prototype.toString.call(obj).split(' ')[1].split(']')[0];
  },
  getPageConfig: function getPageConfig() {
    var configs = {};
    if (window.__wxConfig && window.__wxConfig.window) {
      configs = window.__wxConfig.window;
    } else {
      var globConfig = {};
      window.__wxConfig && window.__wxConfig.global && window.__wxConfig.global.window && (globConfig = window.__wxConfig.global.window);

      var pageConfig = {};
      window.__wxConfig && window.__wxConfig.page && window.__wxConfig.page[window.__route__] && window.__wxConfig.page[window.__route__].window && (pageConfig = window.__wxConfig.page[window.__route__].window);
      configs = (0, _assign2.default)({}, globConfig, pageConfig);
    }
    return configs;
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 5645:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Properties = __webpack_require__(2052);

var _Properties2 = _interopRequireDefault(_Properties);

var _Enums = __webpack_require__(1316);

var _Enums2 = _interopRequireDefault(_Enums);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VPatch = function () {
  function VPatch(type, vNode, patch) {
    (0, _classCallCheck3.default)(this, VPatch);

    this.type = Number(type);
    this.vNode = vNode;
    this.patch = patch;
  }

  (0, _createClass3.default)(VPatch, [{
    key: 'apply',
    value: function apply(node) {
      switch (this.type) {
        case _Enums2.default.PATCH_TYPE.TEXT:
          return VPatch.stringPatch(node, this.patch);
        case _Enums2.default.PATCH_TYPE.VNODE:
          return VPatch.vNodePatch(node, this.patch);
        case _Enums2.default.PATCH_TYPE.PROPS:
          return VPatch.applyProperties(node, this.patch, this.vNode.props);
        case _Enums2.default.PATCH_TYPE.REORDER:
          return VPatch.reorderChildren(node, this.patch);
        case _Enums2.default.PATCH_TYPE.INSERT:
          return VPatch.insertNode(node, this.patch);
        case _Enums2.default.PATCH_TYPE.REMOVE:
          return VPatch.removeNode(node);
        default:
          return node;
      }
    }
  }], [{
    key: 'stringPatch',
    value: function stringPatch(node, patch) {
      var parent = node.parentNode;
      var newEle = patch.render();
      parent && newEle !== node && parent.replaceChild(newEle, node);
      return newEle;
    }
  }, {
    key: 'vNodePatch',
    value: function vNodePatch(node, patch) {
      var parent = node.parentNode;
      var newEle = patch.render();
      parent && newEle !== node && parent.replaceChild(newEle, node);
      return newEle;
    }
  }, {
    key: 'applyProperties',
    value: function applyProperties(node, patch, prop) {
      _Properties2.default.applyProperties(node, patch, prop);
      return node;
    }
  }, {
    key: 'reorderChildren',
    value: function reorderChildren(node, moves) {
      var removes = moves.removes;
      var inserts = moves.inserts;
      var childNodes = node.childNodes;
      var removedChildren = {};

      removes.forEach(function (remove) {
        var childNode = childNodes[remove.index];
        remove.key && (removedChildren[remove.key] = childNode);
        node.removeChild(childNode);
      });

      inserts.forEach(function (insert) {
        var childNode = removedChildren[insert.key];
        node.insertBefore(childNode, childNodes[insert.index]);
      });

      return node;
    }
  }, {
    key: 'insertNode',
    value: function insertNode(node, patch) {
      var newEle = patch.render();
      node && node.appendChild(newEle);
      return node;
    }
  }, {
    key: 'removeNode',
    value: function removeNode(node) {
      var parent = node.parentNode;
      parent && parent.removeChild(node);
      return null;
    }
  }]);
  return VPatch;
}();

exports["default"] = VPatch;
module.exports = exports['default'];

/***/ }),

/***/ 9310:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

var _Utils = __webpack_require__(2353);

var _Utils2 = _interopRequireDefault(_Utils);

var _Properties = __webpack_require__(2052);

var _Properties2 = _interopRequireDefault(_Properties);

var _Diff = __webpack_require__(1270);

var _Diff2 = _interopRequireDefault(_Diff);

var _WxVirtualText = __webpack_require__(5771);

var _WxVirtualText2 = _interopRequireDefault(_WxVirtualText);

__webpack_require__(1316);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WxVirtualNode = function () {
  function WxVirtualNode(tagName, props, newProps, wxKey, wxVkey, children) {
    (0, _classCallCheck3.default)(this, WxVirtualNode);

    this.tagName = tagName || 'div';
    this.props = props || {};
    this.children = children || [];
    this.newProps = newProps || [];
    this.wxVkey = wxVkey;
    _Utils2.default.isUndefined(wxKey) ? this.wxKey = void 0 : this.wxKey = String(wxKey);
    this.descendants = 0; // 子节点数
    for (var c = 0; c < this.children.length; ++c) {
      var child = this.children[c];
      if (_Utils2.default.isVirtualNode(child)) {
        this.descendants += child.descendants;
      } else {
        if (_Utils2.default.isString(child)) {
          this.children[c] = new _WxVirtualText2.default(child);
        } else {
          _Utils2.default.isVirtualText(child) || console.log('invalid child', tagName, props, children, child);
        }
      }
      ++this.descendants;
    }
  }

  (0, _createClass3.default)(WxVirtualNode, [{
    key: 'render',
    value: function render() {
      var ele = this.tagName !== 'virtual' ? exparser.createElement(this.tagName) : exparser.VirtualNode.create('virtual');

      _Properties2.default.applyProperties(ele, this.props);

      this.children.forEach(function (child) {
        var dom = child.render();
        ele.appendChild(dom);
      });

      return ele;
    }
  }, {
    key: 'diff',
    value: function diff(newNode) {
      return _Diff2.default.diff(this, newNode);
    }
  }]);
  return WxVirtualNode;
}();

WxVirtualNode.prototype.type = 'WxVirtualNode';

exports["default"] = WxVirtualNode;
module.exports = exports['default'];

/***/ }),

/***/ 5771:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _classCallCheck2 = __webpack_require__(9663);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(2600);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var wxVirtualText = function () {
  function wxVirtualText(txt) {
    (0, _classCallCheck3.default)(this, wxVirtualText);

    this.text = String(txt);
  }

  (0, _createClass3.default)(wxVirtualText, [{
    key: 'render',
    value: function render(global) {
      var parser = global ? global.document || exparser : exparser;
      return parser.createTextNode(this.text);
    }
  }]);
  return wxVirtualText;
}();

wxVirtualText.prototype.type = 'WxVirtualText';

exports["default"] = wxVirtualText;
module.exports = exports['default'];

/***/ }),

/***/ 2455:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _WxVirtualNode = __webpack_require__(9310);

var _WxVirtualNode2 = _interopRequireDefault(_WxVirtualNode);

var _Utils = __webpack_require__(2353);

var _Utils2 = _interopRequireDefault(_Utils);

var _WxVirtualText = __webpack_require__(5771);

var _WxVirtualText2 = _interopRequireDefault(_WxVirtualText);

var _AppData = __webpack_require__(4761);

var _AppData2 = _interopRequireDefault(_AppData);

var _TouchEvents = __webpack_require__(116);

var _TouchEvents2 = _interopRequireDefault(_TouchEvents);

var _Init = __webpack_require__(8598);

var _Init2 = _interopRequireDefault(_Init);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Init2.default.init();

window.__mergeData__ = _AppData2.default.mergeData;
window.__DOMTree__ = void 0; // 虚拟dom生成的domtree
window.reRender = 0;
var rootNode = void 0;

function setGlobalPageAttr(name, value) {
  window[name] = value;
  window.__curPage__ = {
    name: name,
    value: value
  };
}
function setRootNode(value) {
  rootNode = value;
  window.__curPage__ = {
    name: 'rootNode',
    value: value
  };
}

var createWXVirtualNode = function createWXVirtualNode(tagName, props, newProps, wxkey, wxVkey, children) {
  return new _WxVirtualNode2.default(tagName, props, newProps, wxkey, wxVkey, children);
};
var createWxVirtualText = function createWxVirtualText(txt) {
  return new _WxVirtualText2.default(txt);
};
var createWXVirtualNodeRec = function createWXVirtualNodeRec(opt) {
  // Recursively
  if (_Utils2.default.isString(opt) || Number(opt) === opt && Number(opt) % 1 === 0) {
    return createWxVirtualText(String(opt));
  }
  var children = [];
  opt.children.forEach(function (child) {
    children.push(createWXVirtualNodeRec(child));
  });
  return createWXVirtualNode(opt.tag, opt.attr, opt.n, opt.wxKey, opt.wxVkey, children);
};
var createBodyNode = function createBodyNode(data) {
  window.__curPage__.envData || (window.__curPage__.envData = {});
  var root = window.__generateFunc__(window.__curPage__.envData, // AppData.getAppData(),
  data);
  // t.tag = "body"
  return createWXVirtualNodeRec(root);
};

var firstTimeRender = function firstTimeRender(event) {
  if (event.ext) {
    event.ext.enablePullUpRefresh && setGlobalPageAttr('__enablePullUpRefresh__', !0);
  }
  setRootNode(createBodyNode(event.data));
  setGlobalPageAttr('__DOMTree__', rootNode.render());
  exparser.Element.replaceDocumentElement(window.__DOMTree__, document.querySelector('#view-body-' + window.__wxConfig.viewId));
  var domReady = '__DOMReady';
  wd.publishPageEvent(domReady, {});
  _TouchEvents2.default.enablePullUpRefresh();
};

var reRender = function reRender(event) {
  var newBodyNode = createBodyNode(event.data);
  if (window.__curPage__ && window.__curPage__.rootNode != rootNode) {
    // 切换页面了
    rootNode = window.__curPage__.rootNode;
  }
  var patch = rootNode.diff(newBodyNode);
  patch.apply(window.__DOMTree__);
  setRootNode(newBodyNode);
};

var renderOnDataChange = function renderOnDataChange(event) {
  if (window.reRender) {
    reRender(event);
    document.dispatchEvent(new CustomEvent('pageReRender', {}));
  } else {
    window.reRender = !0;
    firstTimeRender(event);
    if (!(event.options && event.options.firstRender)) {
      console.log(event);
      console.error('firstRender not the data from Page.data');
      Reporter.errorReport({
        key: 'webviewScriptError',
        error: new Error('firstRender not the data from Page.data'),
        extend: 'firstRender not the data from Page.data'
      });
    }
    document.dispatchEvent(new CustomEvent('pageReRender', {}));
  }
};

window.onerror = function (messageOrEvent, source, lineno, colno, error) {
  console.error(error && error.stack);
  Reporter.errorReport({
    key: 'webviewScriptError',
    error: error
  });
};

wd.onAppDataChange(Reporter.surroundThirdByTryCatch(function (event) {
  renderOnDataChange(event);
}));

exparser.addGlobalErrorListener(function (error, errData) {
  Reporter.errorReport({
    key: 'webviewScriptError',
    error: error,
    extend: errData.message
  });
});

exports["default"] = {
  reset: function reset() {
    rootNode = void 0;
    window.__DOMTree__ = void 0;
    // nonsenselet = {}
  }
};
module.exports = exports['default'];

/***/ }),

/***/ 1450:
/***/ ((module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));

var _Utils = __webpack_require__(2353);

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parsePath = function parsePath(path) {
  var pathLen = path.length,
      strs = [],
      tempstr = '',
      numInBracket = 0,
      haveNumber = !1,
      inBracket = !1,
      index = 0;
  for (; index < pathLen; index++) {
    var ch = path[index];
    if (ch === '\\') {
      if (index + 1 < pathLen) {
        if (path[index + 1] === '.' || path[index + 1] === '[' || path[index + 1] === ']') {
          tempstr += path[index + 1];
          index++;
        } else {
          tempstr += '\\';
        }
      }
    } else if (ch === '.') {
      if (tempstr) {
        strs.push(tempstr);
        tempstr = '';
      }
    } else if (ch === '[') {
      if (tempstr) {
        strs.push(tempstr);
        tempstr = '';
      }

      if (strs.length === 0) {
        throw new Error('path can not start with []: ' + path);
      }
      inBracket = !0;
      haveNumber = !1;
    } else if (ch === ']') {
      if (!haveNumber) {
        throw new Error('must have number in []: ' + path);
      }
      inBracket = !1;
      strs.push(numInBracket);
      numInBracket = 0;
    } else if (inBracket) {
      if (ch < '0' || ch > '9') {
        throw new Error('only number 0-9 could inside []: ' + path);
      }
      haveNumber = !0;
      numInBracket = 10 * numInBracket + ch.charCodeAt(0) - 48;
    } else {
      tempstr += ch;
    }
  }
  tempstr && strs.push(tempstr);
  if (strs.length === 0) {
    throw new Error('path can not be empty');
  }
  return strs;
};

var getObjectByPath = function getObjectByPath(obj, paths, spec) {
  for (var tempObj = void 0, key = void 0, originObj = obj, changed = !1, idx = 0; idx < paths.length; idx++) {
    if (Number(paths[idx]) === paths[idx] && paths[idx] % 1 === 0) {
      if (_Utils2.default.getDataType(originObj) !== 'Array') {
        if (spec && !changed) {
          changed = !0;
          tempObj[key] = { __value__: [], __wxspec__: !0 };
          originObj = tempObj[key].__value__;
        } else {
          tempObj[key] = [];
          originObj = tempObj[key];
        }
      }
    } else {
      if (_Utils2.default.getDataType(originObj) !== 'Object') {
        if (spec && !changed) {
          changed = !0;
          tempObj[key] = { __value__: {}, __wxspec__: !0 };
          originObj = tempObj[key].__value__;
        } else {
          tempObj[key] = {};
          originObj = tempObj[key];
        }
      }
    }
    key = paths[idx];
    tempObj = originObj;
    originObj = originObj[paths[idx]];
    originObj && originObj.__wxspec__ && (originObj = originObj.__value__, changed = !0);
  }
  return {
    obj: tempObj,
    key: key,
    changed: changed
  };
};
exports["default"] = {
  parsePath: parsePath,
  getObjectByPath: getObjectByPath
};
module.exports = exports['default'];

/***/ }),

/***/ 4043:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(7185), __esModule: true };

/***/ }),

/***/ 6378:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(3597), __esModule: true };

/***/ }),

/***/ 3239:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(2742), __esModule: true };

/***/ }),

/***/ 2945:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(6981), __esModule: true };

/***/ }),

/***/ 5861:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(5627), __esModule: true };

/***/ }),

/***/ 2242:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(3391), __esModule: true };

/***/ }),

/***/ 7079:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(4511), __esModule: true };

/***/ }),

/***/ 5105:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(381), __esModule: true };

/***/ }),

/***/ 8902:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(8613), __esModule: true };

/***/ }),

/***/ 5345:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(433), __esModule: true };

/***/ }),

/***/ 6593:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),

/***/ 3516:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(25), __esModule: true };

/***/ }),

/***/ 4275:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = { "default": __webpack_require__(2392), __esModule: true };

/***/ }),

/***/ 9663:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.__esModule = true;

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),

/***/ 2600:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(2242);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),

/***/ 8106:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(2242);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),

/***/ 3196:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(5345);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(5861);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),

/***/ 9135:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(2444);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),

/***/ 2444:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(4275);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(3516);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports["default"] = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),

/***/ 2809:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

try {
  var index = __webpack_require__(4155);
} catch (err) {
  var index = __webpack_require__(4155);
}

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el || !el.nodeType) {
    throw new Error('A DOM element reference is required');
  }
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force){
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var className = this.el.getAttribute('class') || '';
  var str = className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};


/***/ }),

/***/ 8153:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

var type;
try {
  type = __webpack_require__(2417);
} catch (_) {
  type = __webpack_require__(2417);
}

/**
 * Module exports.
 */

module.exports = clone;

/**
 * Clones objects.
 *
 * @param {Mixed} any object
 * @api public
 */

function clone(obj){
  switch (type(obj)) {
    case 'object':
      var copy = {};
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          copy[key] = clone(obj[key]);
        }
      }
      return copy;

    case 'array':
      var copy = new Array(obj.length);
      for (var i = 0, l = obj.length; i < l; i++) {
        copy[i] = clone(obj[i]);
      }
      return copy;

    case 'regexp':
      // from millermedeiros/amd-utils - MIT
      var flags = '';
      flags += obj.multiline ? 'm' : '';
      flags += obj.global ? 'g' : '';
      flags += obj.ignoreCase ? 'i' : '';
      return new RegExp(obj.source, flags);

    case 'date':
      return new Date(obj.getTime());

    default: // string, number, boolean, …
      return obj;
  }
}


/***/ }),

/***/ 2417:
/***/ ((module) => {

/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  if (isBuffer(val)) return 'buffer';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val);

  return typeof val;
};

// code borrowed from https://github.com/feross/is-buffer/blob/master/index.js
function isBuffer(obj) {
  return !!(obj != null &&
    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
      (obj.constructor &&
      typeof obj.constructor.isBuffer === 'function' &&
      obj.constructor.isBuffer(obj))
    ))
}


/***/ }),

/***/ 2796:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Module Dependencies
 */

try {
  var matches = __webpack_require__(6647)
} catch (err) {
  var matches = __webpack_require__(6647)
}

/**
 * Export `closest`
 */

module.exports = closest

/**
 * Closest
 *
 * @param {Element} el
 * @param {String} selector
 * @param {Element} scope (optional)
 */

function closest (el, selector, scope) {
  scope = scope || document.documentElement;

  // walk up the dom
  while (el && el !== scope) {
    if (matches(el, selector)) return el;
    el = el.parentNode;
  }

  // check scope for match
  return matches(el, selector) ? el : null;
}


/***/ }),

/***/ 5834:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

try {
  var closest = __webpack_require__(2796);
} catch(err) {
  var closest = __webpack_require__(2796);
}

try {
  var event = __webpack_require__(2962);
} catch(err) {
  var event = __webpack_require__(2962);
}

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, selector, type, fn, capture){
  return event.bind(el, type, function(e){
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  event.unbind(el, type, fn, capture);
};


/***/ }),

/***/ 8767:
/***/ ((module) => {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ 2962:
/***/ ((__unused_webpack_module, exports) => {

var bind, unbind, prefix;

function detect () {
  bind = window.addEventListener ? 'addEventListener' : 'attachEvent';
  unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent';
  prefix = bind !== 'addEventListener' ? 'on' : '';
}

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  if (!bind) detect();
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  if (!unbind) detect();
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};


/***/ }),

/***/ 1671:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Module dependencies.
 */

try {
  var events = __webpack_require__(92);
} catch(err) {
  var events = __webpack_require__(92);
}

try {
  var delegate = __webpack_require__(5834);
} catch(err) {
  var delegate = __webpack_require__(5834);
}

/**
 * Expose `Events`.
 */

module.exports = Events;

/**
 * Initialize an `Events` with the given
 * `el` object which events will be bound to,
 * and the `obj` which will receive method calls.
 *
 * @param {Object} el
 * @param {Object} obj
 * @api public
 */

function Events(el, obj) {
  if (!(this instanceof Events)) return new Events(el, obj);
  if (!el) throw new Error('element required');
  if (!obj) throw new Error('object required');
  this.el = el;
  this.obj = obj;
  this._events = {};
}

/**
 * Subscription helper.
 */

Events.prototype.sub = function(event, method, cb){
  this._events[event] = this._events[event] || {};
  this._events[event][method] = cb;
};

/**
 * Bind to `event` with optional `method` name.
 * When `method` is undefined it becomes `event`
 * with the "on" prefix.
 *
 * Examples:
 *
 *  Direct event handling:
 *
 *    events.bind('click') // implies "onclick"
 *    events.bind('click', 'remove')
 *    events.bind('click', 'sort', 'asc')
 *
 *  Delegated event handling:
 *
 *    events.bind('click li > a')
 *    events.bind('click li > a', 'remove')
 *    events.bind('click a.sort-ascending', 'sort', 'asc')
 *    events.bind('click a.sort-descending', 'sort', 'desc')
 *
 * @param {String} event
 * @param {String|function} [method]
 * @return {Function} callback
 * @api public
 */

Events.prototype.bind = function(event, method){
  var e = parse(event);
  var el = this.el;
  var obj = this.obj;
  var name = e.name;
  var method = method || 'on' + name;
  var args = [].slice.call(arguments, 2);

  // callback
  function cb(){
    var a = [].slice.call(arguments).concat(args);
    obj[method].apply(obj, a);
  }

  // bind
  if (e.selector) {
    cb = delegate.bind(el, e.selector, name, cb);
  } else {
    events.bind(el, name, cb);
  }

  // subscription for unbinding
  this.sub(name, method, cb);

  return cb;
};

/**
 * Unbind a single binding, all bindings for `event`,
 * or all bindings within the manager.
 *
 * Examples:
 *
 *  Unbind direct handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * Unbind delegate handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * @param {String|Function} [event]
 * @param {String|Function} [method]
 * @api public
 */

Events.prototype.unbind = function(event, method){
  if (0 == arguments.length) return this.unbindAll();
  if (1 == arguments.length) return this.unbindAllOf(event);

  // no bindings for this event
  var bindings = this._events[event];
  if (!bindings) return;

  // no bindings for this method
  var cb = bindings[method];
  if (!cb) return;

  events.unbind(this.el, event, cb);
};

/**
 * Unbind all events.
 *
 * @api private
 */

Events.prototype.unbindAll = function(){
  for (var event in this._events) {
    this.unbindAllOf(event);
  }
};

/**
 * Unbind all events for `event`.
 *
 * @param {String} event
 * @api private
 */

Events.prototype.unbindAllOf = function(event){
  var bindings = this._events[event];
  if (!bindings) return;

  for (var method in bindings) {
    this.unbind(event, method);
  }
};

/**
 * Parse `event`.
 *
 * @param {String} event
 * @return {Object}
 * @api private
 */

function parse(event) {
  var parts = event.split(/ +/);
  return {
    name: parts.shift(),
    selector: parts.join(' ')
  }
}


/***/ }),

/***/ 92:
/***/ ((__unused_webpack_module, exports) => {

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};

/***/ }),

/***/ 8532:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Module Dependencies
 */

var event = __webpack_require__(7192);

/**
 * Expose `FilePicker`
 */

module.exports = FilePicker;

/**
 * Input template
 */

var form = document.createElement('form');
form.innerHTML = '<input type="file" style="top: -1000px; position: absolute" aria-hidden="true">';
document.body.appendChild(form);
var input = form.childNodes[0];

/**
 * Already bound
 */

var bound = false;

/**
 * Opens a file picker dialog.
 *
 * @param {Object} options (optional)
 * @param {Function} fn callback function
 * @api public
 */

function FilePicker(opts, fn){
  if ('function' == typeof opts) {
    fn = opts;
    opts = {};
  }
  opts = opts || {};

  // multiple files support
  input.multiple = !!opts.multiple;

  // directory support
  input.webkitdirectory = input.mozdirectory = input.directory = !!opts.directory;

  // accepted file types support
  if (null == opts.accept) {
    delete input.accept;
  } else if (opts.accept.join) {
    // got an array
    input.accept = opts.accept.join(',');
  } else if (opts.accept) {
    // got a regular string
    input.accept = opts.accept;
  }

  // listen to change event (unbind old one if already listening)
  if (bound) event.unbind(input, 'change', bound);
  event.bind(input, 'change', onchange);
  bound = onchange;

  function onchange(e) {
    fn(input.files, e, input);
    event.unbind(input, 'change', onchange);
    bound = false;
  }

  // reset the form
  form.reset();

  // trigger input dialog
  input.click();
}


/***/ }),

/***/ 7192:
/***/ ((__unused_webpack_module, exports) => {

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};

/***/ }),

/***/ 4155:
/***/ ((module) => {

module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),

/***/ 6647:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Module dependencies.
 */

try {
  var query = __webpack_require__(9804);
} catch (err) {
  var query = __webpack_require__(9804);
}

/**
 * Element prototype.
 */

var Element = (__webpack_require__(1008).Element);
var proto = Element && Element.prototype || {};

/**
 * Vendor function.
 */

var vendor = proto.matches
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (!el || el.nodeType !== 1) return false;
  if (vendor) return vendor.call(el, selector);
  var nodes = query.all(selector, el.parentNode);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}


/***/ }),

/***/ 9804:
/***/ ((module, exports) => {

function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function(selector, el){
  el = el || document;
  return one(selector, el);
};

exports.all = function(selector, el){
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function(obj){
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
  return exports;
};


/***/ }),

/***/ 1434:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/**
 * Module dependencies.
 */

var trim = __webpack_require__(2745);
var type = __webpack_require__(2593);

var pattern = /(\w+)\[(\d+)\]/;

/**
 * Safely encode the given string
 * 
 * @param {String} str
 * @return {String}
 * @api private
 */

var encode = function(str) {
  try {
    return encodeURIComponent(str);
  } catch (e) {
    return str;
  }
};

/**
 * Safely decode the string
 * 
 * @param {String} str
 * @return {String}
 * @api private
 */

var decode = function(str) {
  try {
    return decodeURIComponent(str.replace(/\+/g, ' '));
  } catch (e) {
    return str;
  }
}

/**
 * Parse the given query `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api public
 */

exports.parse = function(str){
  if ('string' != typeof str) return {};

  str = trim(str);
  if ('' == str) return {};
  if ('?' == str.charAt(0)) str = str.slice(1);

  var obj = {};
  var pairs = str.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var parts = pairs[i].split('=');
    var key = decode(parts[0]);
    var m;

    if (m = pattern.exec(key)) {
      obj[m[1]] = obj[m[1]] || [];
      obj[m[1]][m[2]] = decode(parts[1]);
      continue;
    }

    obj[parts[0]] = null == parts[1]
      ? ''
      : decode(parts[1]);
  }

  return obj;
};

/**
 * Stringify the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api public
 */

exports.stringify = function(obj){
  if (!obj) return '';
  var pairs = [];

  for (var key in obj) {
    var value = obj[key];

    if ('array' == type(value)) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
      }
      continue;
    }

    pairs.push(encode(key) + '=' + encode(obj[key]));
  }

  return pairs.join('&');
};


/***/ }),

/***/ 3649:
/***/ ((module, exports) => {

/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

/**
 * Cancel.
 */

var cancel = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};


/***/ }),

/***/ 2496:
/***/ ((module) => {

var endEvents = [
  'touchend'
]

module.exports = Tap

// default tap timeout in ms
Tap.timeout = 200

function Tap(callback, options) {
  options = options || {}
  // if the user holds his/her finger down for more than 200ms,
  // then it's not really considered a tap.
  // however, you can make this configurable.
  var timeout = options.timeout || Tap.timeout

  // to keep track of the original listener
  listener.handler = callback

  return listener

  // el.addEventListener('touchstart', listener)
  function listener(e1) {
    // tap should only happen with a single finger
    if (!e1.touches || e1.touches.length > 1) return

    var el = e1.target
    var context = this
    var args = arguments;

    var timeout_id = setTimeout(cleanup, timeout)

    el.addEventListener('touchmove', cleanup)

    endEvents.forEach(function (event) {
      el.addEventListener(event, done)
    })

    function done(e2) {
      // since touchstart is added on the same tick
      // and because of bubbling,
      // it'll execute this on the same touchstart.
      // this filters out the same touchstart event.
      if (e1 === e2) return

      cleanup()

      // already handled
      if (e2.defaultPrevented) return

      // overwrite these functions so that they all to both start and events.
      var preventDefault = e1.preventDefault
      var stopPropagation = e1.stopPropagation

      e1.stopPropagation = function () {
        stopPropagation.call(e1)
        stopPropagation.call(e2)
      }

      e1.preventDefault = function () {
        //preventDefault.call(e1)
        preventDefault.call(e2)
      }

      // calls the handler with the `end` event,
      // but i don't think it matters.
      callback.apply(context, args)
    }

    // cleanup end events
    // to cancel the tap, just run this early
    function cleanup(e2) {
      // if it's the same event as the origin,
      // then don't actually cleanup.
      // hit issues with this - don't remember
      if (e1 === e2) return

      clearTimeout(timeout_id)

      el.removeEventListener('touchmove', cleanup)

      endEvents.forEach(function (event) {
        el.removeEventListener(event, done)
      })
    }
  }
}


/***/ }),

/***/ 302:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Module dependencies.
 */

var Emitter = __webpack_require__(3692);
var clone = __webpack_require__(8153);
var type = __webpack_require__(2593);
var ease = __webpack_require__(372);

/**
 * Expose `Tween`.
 */

module.exports = Tween;

/**
 * Initialize a new `Tween` with `obj`.
 *
 * @param {Object|Array} obj
 * @api public
 */

function Tween(obj) {
  if (!(this instanceof Tween)) return new Tween(obj);
  this._from = obj;
  this.ease('linear');
  this.duration(500);
}

/**
 * Mixin emitter.
 */

Emitter(Tween.prototype);

/**
 * Reset the tween.
 *
 * @api public
 */

Tween.prototype.reset = function(){
  this.isArray = 'array' === type(this._from);
  this._curr = clone(this._from);
  this._done = false;
  this._start = Date.now();
  return this;
};

/**
 * Tween to `obj` and reset internal state.
 *
 *    tween.to({ x: 50, y: 100 })
 *
 * @param {Object|Array} obj
 * @return {Tween} self
 * @api public
 */

Tween.prototype.to = function(obj){
  this.reset();
  this._to = obj;
  return this;
};

/**
 * Set duration to `ms` [500].
 *
 * @param {Number} ms
 * @return {Tween} self
 * @api public
 */

Tween.prototype.duration = function(ms){
  this._duration = ms;
  return this;
};

/**
 * Set easing function to `fn`.
 *
 *    tween.ease('in-out-sine')
 *
 * @param {String|Function} fn
 * @return {Tween}
 * @api public
 */

Tween.prototype.ease = function(fn){
  fn = 'function' == typeof fn ? fn : ease[fn];
  if (!fn) throw new TypeError('invalid easing function');
  this._ease = fn;
  return this;
};

/**
 * Stop the tween and immediately emit "stop" and "end".
 *
 * @return {Tween}
 * @api public
 */

Tween.prototype.stop = function(){
  this.stopped = true;
  this._done = true;
  this.emit('stop');
  this.emit('end');
  return this;
};

/**
 * Perform a step.
 *
 * @return {Tween} self
 * @api private
 */

Tween.prototype.step = function(){
  if (this._done) return;

  // duration
  var duration = this._duration;
  var now = Date.now();
  var delta = now - this._start;
  var done = delta >= duration;

  // complete
  if (done) {
    this._from = this._to;
    this._update(this._to);
    this._done = true;
    this.emit('end');
    return this;
  }

  // tween
  var from = this._from;
  var to = this._to;
  var curr = this._curr;
  var fn = this._ease;
  var p = (now - this._start) / duration;
  var n = fn(p);

  // array
  if (this.isArray) {
    for (var i = 0; i < from.length; ++i) {
      curr[i] = from[i] + (to[i] - from[i]) * n;
    }

    this._update(curr);
    return this;
  }

  // objech
  for (var k in from) {
    curr[k] = from[k] + (to[k] - from[k]) * n;
  }

  this._update(curr);
  return this;
};

/**
 * Set update function to `fn` or
 * when no argument is given this performs
 * a "step".
 *
 * @param {Function} fn
 * @return {Tween} self
 * @api public
 */

Tween.prototype.update = function(fn){
  if (0 == arguments.length) return this.step();
  this._update = fn;
  return this;
};

/***/ }),

/***/ 3692:
/***/ ((module) => {


/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ 2593:
/***/ ((module) => {

/**
 * toString ref.
 */

var toString = Object.prototype.toString;

/**
 * Return the type of `val`.
 *
 * @param {Mixed} val
 * @return {String}
 * @api public
 */

module.exports = function(val){
  switch (toString.call(val)) {
    case '[object Date]': return 'date';
    case '[object RegExp]': return 'regexp';
    case '[object Arguments]': return 'arguments';
    case '[object Array]': return 'array';
    case '[object Error]': return 'error';
  }

  if (val === null) return 'null';
  if (val === undefined) return 'undefined';
  if (val !== val) return 'nan';
  if (val && val.nodeType === 1) return 'element';

  val = val.valueOf
    ? val.valueOf()
    : Object.prototype.valueOf.apply(val)

  return typeof val;
};


/***/ }),

/***/ 3662:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Module dependencies.
 */

var Emitter = __webpack_require__(8767);

/**
 * Expose `Upload`.
 */

module.exports = Upload;

/**
 * Initialize a new `Upload` file`.
 * This represents a single file upload.
 *
 * Events:
 *
 *   - `error` an error occurred
 *   - `abort` upload was aborted
 *   - `progress` upload in progress (`e.percent` etc)
 *   - `end` upload is complete
 *
 * @param {File} file
 * @api private
 */

function Upload(file) {
  if (!(this instanceof Upload)) return new Upload(file);
  Emitter.call(this);
  this.file = file;
  file.slice = file.slice || file.webkitSlice;
}

/**
 * Mixin emitter.
 */

Emitter(Upload.prototype);

/**
 * Upload to the given `path`.
 *
 * @param {String} options
 * @param {Function} [fn]
 * @api public
 */

Upload.prototype.to = function(options, fn){
  // TODO: x-browser
  var path;
  if (typeof options == 'string') {
    path = options;
    options = {};
  } else {
    path = options.path;
  }
  var self = this;
  fn = fn || function(){};
  var req = this.req = new XMLHttpRequest;
  req.open('POST', path);
  req.onload = this.onload.bind(this);
  req.onerror = this.onerror.bind(this);
  req.upload.onprogress = this.onprogress.bind(this);
  req.onreadystatechange = function(){
    if (4 == req.readyState) {
      var type = req.status / 100 | 0;
      if (2 == type) return fn(null, req);
      var err = new Error(req.statusText + ': ' + req.response);
      err.status = req.status;
      fn(err);
    }
  };
  var key, headers = options.headers || {};
  for (key in headers) {
    req.setRequestHeader(key, headers[key]);
  }
  var body = new FormData;
  body.append(options.name || 'file', this.file);
  var data = options.data || {};
  for (key in data) {
    body.append(key, data[key]);
  }
  req.send(body);
};

/**
 * Abort the XHR.
 *
 * @api public
 */

Upload.prototype.abort = function(){
  this.emit('abort');
  this.req.abort();
};

/**
 * Error handler.
 *
 * @api private
 */

Upload.prototype.onerror = function(e){
  this.emit('error', e);
};

/**
 * Onload handler.
 *
 * @api private
 */

Upload.prototype.onload = function(e){
  this.emit('end', this.req);
};

/**
 * Progress handler.
 *
 * @api private
 */

Upload.prototype.onprogress = function(e){
  e.percent = e.loaded / e.total * 100;
  this.emit('progress', e);
};


/***/ }),

/***/ 5001:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(4058);
__webpack_require__(1867);
__webpack_require__(3871);
__webpack_require__(2878);
module.exports = __webpack_require__(4579).Promise;


/***/ }),

/***/ 7185:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(1867);
__webpack_require__(2586);
module.exports = __webpack_require__(4579).Array.from;


/***/ }),

/***/ 3597:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(3871);
__webpack_require__(1867);
module.exports = __webpack_require__(6459);


/***/ }),

/***/ 2742:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var core = __webpack_require__(4579);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),

/***/ 6981:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(2699);
module.exports = __webpack_require__(4579).Object.assign;


/***/ }),

/***/ 5627:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(6760);
var $Object = (__webpack_require__(4579).Object);
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),

/***/ 3391:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(1477);
var $Object = (__webpack_require__(4579).Object);
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),

/***/ 4511:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(6840);
module.exports = __webpack_require__(4579).Object.getOwnPropertySymbols;


/***/ }),

/***/ 381:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(7220);
module.exports = __webpack_require__(4579).Object.getPrototypeOf;


/***/ }),

/***/ 8613:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(961);
module.exports = __webpack_require__(4579).Object.keys;


/***/ }),

/***/ 433:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(9349);
module.exports = __webpack_require__(4579).Object.setPrototypeOf;


/***/ }),

/***/ 112:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(4058);
__webpack_require__(1867);
__webpack_require__(3871);
__webpack_require__(2878);
__webpack_require__(5971);
__webpack_require__(2526);
module.exports = __webpack_require__(4579).Promise;


/***/ }),

/***/ 25:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(6840);
__webpack_require__(4058);
__webpack_require__(8174);
__webpack_require__(6461);
module.exports = __webpack_require__(4579).Symbol;


/***/ }),

/***/ 2392:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(1867);
__webpack_require__(3871);
module.exports = (__webpack_require__(5103).f)('iterator');


/***/ }),

/***/ 5663:
/***/ ((module) => {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ 9003:
/***/ ((module) => {

module.exports = function () { /* empty */ };


/***/ }),

/***/ 9142:
/***/ ((module) => {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ 2159:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(6727);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ 7428:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(7932);
var toLength = __webpack_require__(8728);
var toAbsoluteIndex = __webpack_require__(6531);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ 4677:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(2894);
var TAG = __webpack_require__(2939)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ 2894:
/***/ ((module) => {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ 4579:
/***/ ((module) => {

var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 2445:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $defineProperty = __webpack_require__(4743);
var createDesc = __webpack_require__(3101);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ 9216:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// optional / simple context binding
var aFunction = __webpack_require__(5663);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 8333:
/***/ ((module) => {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ 9666:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(7929)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 7467:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isObject = __webpack_require__(6727);
var document = (__webpack_require__(3938).document);
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ 3338:
/***/ ((module) => {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ 337:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(6162);
var gOPS = __webpack_require__(8195);
var pIE = __webpack_require__(6274);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ 3856:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(3938);
var core = __webpack_require__(4579);
var ctx = __webpack_require__(9216);
var hide = __webpack_require__(1818);
var has = __webpack_require__(7069);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ 7929:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ 5576:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ctx = __webpack_require__(9216);
var call = __webpack_require__(5602);
var isArrayIter = __webpack_require__(5991);
var anObject = __webpack_require__(2159);
var toLength = __webpack_require__(8728);
var getIterFn = __webpack_require__(3728);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ 3938:
/***/ ((module) => {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ 7069:
/***/ ((module) => {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ 1818:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var dP = __webpack_require__(4743);
var createDesc = __webpack_require__(3101);
module.exports = __webpack_require__(9666) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 4881:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var document = (__webpack_require__(3938).document);
module.exports = document && document.documentElement;


/***/ }),

/***/ 3758:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = !__webpack_require__(9666) && !__webpack_require__(7929)(function () {
  return Object.defineProperty(__webpack_require__(7467)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ 6778:
/***/ ((module) => {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ 799:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(2894);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ 5991:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// check on default Array iterator
var Iterators = __webpack_require__(5449);
var ITERATOR = __webpack_require__(2939)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ 1421:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(2894);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ 6727:
/***/ ((module) => {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ 5602:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(2159);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ 3945:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var create = __webpack_require__(8989);
var descriptor = __webpack_require__(3101);
var setToStringTag = __webpack_require__(5378);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(1818)(IteratorPrototype, __webpack_require__(2939)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ 5700:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var LIBRARY = __webpack_require__(6227);
var $export = __webpack_require__(3856);
var redefine = __webpack_require__(7470);
var hide = __webpack_require__(1818);
var Iterators = __webpack_require__(5449);
var $iterCreate = __webpack_require__(3945);
var setToStringTag = __webpack_require__(5378);
var getPrototypeOf = __webpack_require__(5089);
var ITERATOR = __webpack_require__(2939)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ 6630:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ITERATOR = __webpack_require__(2939)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ 5084:
/***/ ((module) => {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ 5449:
/***/ ((module) => {

module.exports = {};


/***/ }),

/***/ 6227:
/***/ ((module) => {

module.exports = true;


/***/ }),

/***/ 7177:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var META = __webpack_require__(5730)('meta');
var isObject = __webpack_require__(6727);
var has = __webpack_require__(7069);
var setDesc = (__webpack_require__(4743).f);
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(7929)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ 1601:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(3938);
var macrotask = (__webpack_require__(2569).set);
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(2894)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ 9304:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(5663);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ 8082:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(9666);
var getKeys = __webpack_require__(6162);
var gOPS = __webpack_require__(8195);
var pIE = __webpack_require__(6274);
var toObject = __webpack_require__(6530);
var IObject = __webpack_require__(799);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(7929)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ 8989:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(2159);
var dPs = __webpack_require__(7856);
var enumBugKeys = __webpack_require__(3338);
var IE_PROTO = __webpack_require__(7281)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(7467)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  (__webpack_require__(4881).appendChild)(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ 4743:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var anObject = __webpack_require__(2159);
var IE8_DOM_DEFINE = __webpack_require__(3758);
var toPrimitive = __webpack_require__(3206);
var dP = Object.defineProperty;

exports.f = __webpack_require__(9666) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 7856:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var dP = __webpack_require__(4743);
var anObject = __webpack_require__(2159);
var getKeys = __webpack_require__(6162);

module.exports = __webpack_require__(9666) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ 6183:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var pIE = __webpack_require__(6274);
var createDesc = __webpack_require__(3101);
var toIObject = __webpack_require__(7932);
var toPrimitive = __webpack_require__(3206);
var has = __webpack_require__(7069);
var IE8_DOM_DEFINE = __webpack_require__(3758);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9666) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ 4368:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(7932);
var gOPN = (__webpack_require__(3230).f);
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ 3230:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(2963);
var hiddenKeys = (__webpack_require__(3338).concat)('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ 8195:
/***/ ((__unused_webpack_module, exports) => {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 5089:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(7069);
var toObject = __webpack_require__(6530);
var IE_PROTO = __webpack_require__(7281)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ 2963:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var has = __webpack_require__(7069);
var toIObject = __webpack_require__(7932);
var arrayIndexOf = __webpack_require__(7428)(false);
var IE_PROTO = __webpack_require__(7281)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ 6162:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(2963);
var enumBugKeys = __webpack_require__(3338);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ 6274:
/***/ ((__unused_webpack_module, exports) => {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ 2584:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(3856);
var core = __webpack_require__(4579);
var fails = __webpack_require__(7929);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ 931:
/***/ ((module) => {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ 7790:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(2159);
var isObject = __webpack_require__(6727);
var newPromiseCapability = __webpack_require__(9304);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ 3101:
/***/ ((module) => {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 8144:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var hide = __webpack_require__(1818);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),

/***/ 7470:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(1818);


/***/ }),

/***/ 2906:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(6727);
var anObject = __webpack_require__(2159);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(9216)(Function.call, (__webpack_require__(6183).f)(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),

/***/ 9967:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var global = __webpack_require__(3938);
var core = __webpack_require__(4579);
var dP = __webpack_require__(4743);
var DESCRIPTORS = __webpack_require__(9666);
var SPECIES = __webpack_require__(2939)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ 5378:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var def = (__webpack_require__(4743).f);
var has = __webpack_require__(7069);
var TAG = __webpack_require__(2939)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ 7281:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var shared = __webpack_require__(250)('keys');
var uid = __webpack_require__(5730);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ 250:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var core = __webpack_require__(4579);
var global = __webpack_require__(3938);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(6227) ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ 2707:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(2159);
var aFunction = __webpack_require__(5663);
var SPECIES = __webpack_require__(2939)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ 510:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(1052);
var defined = __webpack_require__(8333);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ 2569:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var ctx = __webpack_require__(9216);
var invoke = __webpack_require__(6778);
var html = __webpack_require__(4881);
var cel = __webpack_require__(7467);
var global = __webpack_require__(3938);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(2894)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ 6531:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var toInteger = __webpack_require__(1052);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ 1052:
/***/ ((module) => {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ 7932:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(799);
var defined = __webpack_require__(8333);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ 8728:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.15 ToLength
var toInteger = __webpack_require__(1052);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ 6530:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(8333);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ 3206:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(6727);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 5730:
/***/ ((module) => {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ 6640:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(3938);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ 6347:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var global = __webpack_require__(3938);
var core = __webpack_require__(4579);
var LIBRARY = __webpack_require__(6227);
var wksExt = __webpack_require__(5103);
var defineProperty = (__webpack_require__(4743).f);
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ 5103:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

exports.f = __webpack_require__(2939);


/***/ }),

/***/ 2939:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var store = __webpack_require__(250)('wks');
var uid = __webpack_require__(5730);
var Symbol = (__webpack_require__(3938).Symbol);
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ 3728:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classof = __webpack_require__(4677);
var ITERATOR = __webpack_require__(2939)('iterator');
var Iterators = __webpack_require__(5449);
module.exports = (__webpack_require__(4579).getIteratorMethod) = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ 6459:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var anObject = __webpack_require__(2159);
var get = __webpack_require__(3728);
module.exports = (__webpack_require__(4579).getIterator) = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),

/***/ 2586:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var ctx = __webpack_require__(9216);
var $export = __webpack_require__(3856);
var toObject = __webpack_require__(6530);
var call = __webpack_require__(5602);
var isArrayIter = __webpack_require__(5991);
var toLength = __webpack_require__(8728);
var createProperty = __webpack_require__(2445);
var getIterFn = __webpack_require__(3728);

$export($export.S + $export.F * !__webpack_require__(6630)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ 3882:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var addToUnscopables = __webpack_require__(9003);
var step = __webpack_require__(5084);
var Iterators = __webpack_require__(5449);
var toIObject = __webpack_require__(7932);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(5700)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ 2699:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(3856);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(8082) });


/***/ }),

/***/ 6760:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(3856);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(8989) });


/***/ }),

/***/ 1477:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

var $export = __webpack_require__(3856);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9666), 'Object', { defineProperty: (__webpack_require__(4743).f) });


/***/ }),

/***/ 7220:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(6530);
var $getPrototypeOf = __webpack_require__(5089);

__webpack_require__(2584)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),

/***/ 961:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(6530);
var $keys = __webpack_require__(6162);

__webpack_require__(2584)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ 9349:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(3856);
$export($export.S, 'Object', { setPrototypeOf: (__webpack_require__(2906).set) });


/***/ }),

/***/ 4058:
/***/ (() => {



/***/ }),

/***/ 2878:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var LIBRARY = __webpack_require__(6227);
var global = __webpack_require__(3938);
var ctx = __webpack_require__(9216);
var classof = __webpack_require__(4677);
var $export = __webpack_require__(3856);
var isObject = __webpack_require__(6727);
var aFunction = __webpack_require__(5663);
var anInstance = __webpack_require__(9142);
var forOf = __webpack_require__(5576);
var speciesConstructor = __webpack_require__(2707);
var task = (__webpack_require__(2569).set);
var microtask = __webpack_require__(1601)();
var newPromiseCapabilityModule = __webpack_require__(9304);
var perform = __webpack_require__(931);
var userAgent = __webpack_require__(6640);
var promiseResolve = __webpack_require__(7790);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(2939)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(8144)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(5378)($Promise, PROMISE);
__webpack_require__(9967)(PROMISE);
Wrapper = __webpack_require__(4579)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(6630)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ 1867:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

var $at = __webpack_require__(510)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(5700)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ 6840:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(3938);
var has = __webpack_require__(7069);
var DESCRIPTORS = __webpack_require__(9666);
var $export = __webpack_require__(3856);
var redefine = __webpack_require__(7470);
var META = (__webpack_require__(7177).KEY);
var $fails = __webpack_require__(7929);
var shared = __webpack_require__(250);
var setToStringTag = __webpack_require__(5378);
var uid = __webpack_require__(5730);
var wks = __webpack_require__(2939);
var wksExt = __webpack_require__(5103);
var wksDefine = __webpack_require__(6347);
var enumKeys = __webpack_require__(337);
var isArray = __webpack_require__(1421);
var anObject = __webpack_require__(2159);
var isObject = __webpack_require__(6727);
var toObject = __webpack_require__(6530);
var toIObject = __webpack_require__(7932);
var toPrimitive = __webpack_require__(3206);
var createDesc = __webpack_require__(3101);
var _create = __webpack_require__(8989);
var gOPNExt = __webpack_require__(4368);
var $GOPD = __webpack_require__(6183);
var $GOPS = __webpack_require__(8195);
var $DP = __webpack_require__(4743);
var $keys = __webpack_require__(6162);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  (__webpack_require__(3230).f) = gOPNExt.f = $getOwnPropertyNames;
  (__webpack_require__(6274).f) = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(6227)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(1818)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ 5971:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(3856);
var core = __webpack_require__(4579);
var global = __webpack_require__(3938);
var speciesConstructor = __webpack_require__(2707);
var promiseResolve = __webpack_require__(7790);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),

/***/ 2526:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(3856);
var newPromiseCapability = __webpack_require__(9304);
var perform = __webpack_require__(931);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),

/***/ 8174:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(6347)('asyncIterator');


/***/ }),

/***/ 6461:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(6347)('observable');


/***/ }),

/***/ 3871:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

__webpack_require__(3882);
var global = __webpack_require__(3938);
var hide = __webpack_require__(1818);
var Iterators = __webpack_require__(5449);
var TO_STRING_TAG = __webpack_require__(2939)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),

/***/ 1137:
/***/ ((module) => {


/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = Object.prototype.hasOwnProperty.call(map, tag) ? map[tag] : map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}


/***/ }),

/***/ 372:
/***/ ((__unused_webpack_module, exports) => {


// easing functions from "Tween.js"

exports.linear = function(n){
  return n;
};

exports.inQuad = function(n){
  return n * n;
};

exports.outQuad = function(n){
  return n * (2 - n);
};

exports.inOutQuad = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n;
  return - 0.5 * (--n * (n - 2) - 1);
};

exports.inCube = function(n){
  return n * n * n;
};

exports.outCube = function(n){
  return --n * n * n + 1;
};

exports.inOutCube = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n;
  return 0.5 * ((n -= 2 ) * n * n + 2);
};

exports.inQuart = function(n){
  return n * n * n * n;
};

exports.outQuart = function(n){
  return 1 - (--n * n * n * n);
};

exports.inOutQuart = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n * n;
  return -0.5 * ((n -= 2) * n * n * n - 2);
};

exports.inQuint = function(n){
  return n * n * n * n * n;
}

exports.outQuint = function(n){
  return --n * n * n * n * n + 1;
}

exports.inOutQuint = function(n){
  n *= 2;
  if (n < 1) return 0.5 * n * n * n * n * n;
  return 0.5 * ((n -= 2) * n * n * n * n + 2);
};

exports.inSine = function(n){
  return 1 - Math.cos(n * Math.PI / 2 );
};

exports.outSine = function(n){
  return Math.sin(n * Math.PI / 2);
};

exports.inOutSine = function(n){
  return .5 * (1 - Math.cos(Math.PI * n));
};

exports.inExpo = function(n){
  return 0 == n ? 0 : Math.pow(1024, n - 1);
};

exports.outExpo = function(n){
  return 1 == n ? n : 1 - Math.pow(2, -10 * n);
};

exports.inOutExpo = function(n){
  if (0 == n) return 0;
  if (1 == n) return 1;
  if ((n *= 2) < 1) return .5 * Math.pow(1024, n - 1);
  return .5 * (-Math.pow(2, -10 * (n - 1)) + 2);
};

exports.inCirc = function(n){
  return 1 - Math.sqrt(1 - n * n);
};

exports.outCirc = function(n){
  return Math.sqrt(1 - (--n * n));
};

exports.inOutCirc = function(n){
  n *= 2
  if (n < 1) return -0.5 * (Math.sqrt(1 - n * n) - 1);
  return 0.5 * (Math.sqrt(1 - (n -= 2) * n) + 1);
};

exports.inBack = function(n){
  var s = 1.70158;
  return n * n * (( s + 1 ) * n - s);
};

exports.outBack = function(n){
  var s = 1.70158;
  return --n * n * ((s + 1) * n + s) + 1;
};

exports.inOutBack = function(n){
  var s = 1.70158 * 1.525;
  if ( ( n *= 2 ) < 1 ) return 0.5 * ( n * n * ( ( s + 1 ) * n - s ) );
  return 0.5 * ( ( n -= 2 ) * n * ( ( s + 1 ) * n + s ) + 2 );
};

exports.inBounce = function(n){
  return 1 - exports.outBounce(1 - n);
};

exports.outBounce = function(n){
  if ( n < ( 1 / 2.75 ) ) {
    return 7.5625 * n * n;
  } else if ( n < ( 2 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
  } else if ( n < ( 2.5 / 2.75 ) ) {
    return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
  } else {
    return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
  }
};

exports.inOutBounce = function(n){
  if (n < .5) return exports.inBounce(n * 2) * .5;
  return exports.outBounce(n * 2 - 1) * .5 + .5;
};

// aliases

exports["in-quad"] = exports.inQuad;
exports["out-quad"] = exports.outQuad;
exports["in-out-quad"] = exports.inOutQuad;
exports["in-cube"] = exports.inCube;
exports["out-cube"] = exports.outCube;
exports["in-out-cube"] = exports.inOutCube;
exports["in-quart"] = exports.inQuart;
exports["out-quart"] = exports.outQuart;
exports["in-out-quart"] = exports.inOutQuart;
exports["in-quint"] = exports.inQuint;
exports["out-quint"] = exports.outQuint;
exports["in-out-quint"] = exports.inOutQuint;
exports["in-sine"] = exports.inSine;
exports["out-sine"] = exports.outSine;
exports["in-out-sine"] = exports.inOutSine;
exports["in-expo"] = exports.inExpo;
exports["out-expo"] = exports.outExpo;
exports["in-out-expo"] = exports.inOutExpo;
exports["in-circ"] = exports.inCirc;
exports["out-circ"] = exports.outCirc;
exports["in-out-circ"] = exports.inOutCirc;
exports["in-back"] = exports.inBack;
exports["out-back"] = exports.outBack;
exports["in-out-back"] = exports.inOutBack;
exports["in-bounce"] = exports.inBounce;
exports["out-bounce"] = exports.outBounce;
exports["in-out-bounce"] = exports.inOutBounce;


/***/ }),

/***/ 3277:
/***/ ((module) => {

module.exports = function anonymous(_, filters, escape
) {
escape = escape || function escape(html){
  html = html == null ? '': html;
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
};
var _str="";
_str += '<div class="wx-picker">\n';
_str += '  <div class="wx-picker-hd">\n';
_str += '    <a class="wx-picker-action cancel">取消</a>\n';
_str += '    <a class="wx-picker-action confirm">确定</a>\n';
_str += '  </div>\n';
_str += '  <div class="wx-picker-bd">\n';
_.group.forEach(function(items,i){
_str += '    <div class="wx-picker-group">\n';
_str += '      <div class="wx-picker-mask2" data-index="';
_str+=escape(i);
_str += '"></div>';
_str +='\n'
_str += '      <div class="wx-picker-indicator"></div>\n';
_str += '      <div class="wx-picker-content">\n';
items.forEach(function(item,j){
_str += '        <div class="wx-picker-item" data-value="';
_str+=escape(item.value);
_str += '">';
_str +='\n'
_str += '          ';
_str+=escape(item.text);
_str +='\n'
_str += '        </div>\n';
})
_str += '      </div>\n';
_str += '    </div>\n';
})
_str += '  </div>\n';
_str += '</div>\n';
_str += '';
return _str

}

/***/ }),

/***/ 2905:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* provided dependency */ var process = __webpack_require__(46);
/*eslint "quotes": 0*/
var dev =  process == null ? false : "production" === 'development'

/**
 * Compile template to function with option
 *
 * @public
 * @param {String} template
 * @param {Object} opt
 * @returns {Function}
 */
exports.compile = function (template, opt) {
  opt = opt || {};
  var debug = dev || opt.debug;
  var str

  if (debug) {
    // Adds the fancy stack trace meta info
    var input = template.replace(/['\n]/g, function (_) {
      if (_ === "'") return "\\'"
      return '\\n'
    })
    str = [
      'var __stack = { linenr: 1, input: \'' + input + '\'};',
        rethrow.toString(),
      'try {',
        parse(template, opt),
      '} catch (err) {',
      '  rethrow(err, __stack.input, __stack.linenr);',
      '}'
    ].join("\n");
  } else {
    str = parse(template, opt);
  }

  str = 'escape = escape || ' + escape.toString() + ';\n' + str;
  var fn;
  try {
    fn = new Function('_, filters, escape', str);
  } catch (err) {
    if ('SyntaxError' == err.name) {
      err.message += ' while compiling ejs';
    }
    throw err;
  }

  return fn;
}

var control = /^\s*\{\{[\w|\/][^}]*\}\}\s*$/

function parse(str, opt) {
  opt = opt || {};
  var debug =  dev || opt.debug
    , buf = '';

  buf += 'var _str="";\n';

  var linenr = 1;
  var closes = [];
  var line = ''
  var js
  var res

  for (var i = 0; i <= str.length; i++) {
    var ch = str[i]
    if (ch === '\r') {
      continue;
    } else if (ch === '\\') {
      line += '\\\\'
    } else if(ch === '\n' || typeof ch === 'undefined') {
      if (debug) buf += "__stack.linenr=" + linenr + ';'
      if (control.test(line)) {
        js = line.match(/\{\{(.*)\}\}/)[1]
        res = parseKeyword(js, closes)
        if (res instanceof Error) rethrow(res, str, linenr)
        buf += res + "\n"
      } else {
        // no interpolation
        if (!/\{\{/.test(line)) {
          buf += "_str += '" + gsub(line, "'", "\\'") + (ch === '\n' ? '\\n' : '') + "';\n"
        } else {
          var text = ''
          var expr
          for (var j = 0; j < line.length; j++) {
            if (line[j] === '{' && line[j + 1] === '{') {
              if (text.length) buf += "_str += '" + gsub(text, "'", "\\'") + "';\n"
              text = ''
              var end = line.indexOf('}}', j);
              js = line.substring(j + 2, end);
              // parse = !
              switch (js[0]) {
                case '=':
                  expr = js.replace(/^=\s*/, '')
                  expr = parseFilters(expr)
                  res = '_str+=escape(' + expr + ');'
                  break
                case '!':
                  expr = js.replace(/^!\s*/, '')
                  expr = parseFilters(expr)
                  res = '_str+=' + expr + ';'
                  break
                default:
                  res = parseKeyword(js, closes)
              }
              if (res instanceof Error) rethrow(res, str, linenr)
              buf += res + "\n"
              j = end + 1
            } else {
              text += line[j]
            }
          }
          if (text.length) buf += "_str += '" + gsub(text, "'", "\\'") + "';\n"
          if (ch === '\n') buf += "_str +='\\n'\n"
        }
      }
      line = ''
      linenr += 1
    } else {
      line += str[i]
    }
  }
  if (closes.length) rethrow(new Error('tag not closed'), str, linenr)
  buf += 'return _str\n'
  return buf
}

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

function escape(html){
  html = html == null ? '': html;
  return String(html)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
}

/**
 * Re-throw the given `err` in context to the
 * `str` of et, and `linenr`.
 *
 * @param {Error} err
 * @param {String} str
 * @param {String} filename
 * @param {String} linenr
 * @api private
 */

function rethrow(err, input, linenr){
  // str from context
  var lines = input.split('\n')
    , start = Math.max(linenr - 3, 0)
    , end = Math.min(lines.length, linenr + 3);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == linenr ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.message = 'et compile error:'
    + linenr + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
}

function gsub(str, pat, sub) {
  return str.replace(new RegExp(pat, 'g'), sub)
}

function parseKeyword(js, closes) {
  if (js === '\/') {
    if (closes.length === 0) {
      return new Error("no matched begin tag")
    } else {
      return closes.pop()
    }
  }
  if (!/^each|if|elif|else(\s|$)/.test(js)) {
    return new Error("expression {{" + js +"}} not recognized")
  }
  var prefix;
  var expression = js.replace(/^\w+\s*/, '');
  if (js.indexOf('each') === 0) {
    var o = parseForExpression(expression)
    if (!o.attr) return new Error("attribute not found for " + expression)
    o.as = o.as || '__val'
    var args = o.as + (o.index ? ',' + o.index : '')
    prefix  = o.attr + '.forEach(function(' + args + '){';
    closes.push('})')
  } else if (js.indexOf('if') === 0) {
    prefix  = 'if (' + expression + '){';
    closes.push('}')
  } else if (js.indexOf('elif') === 0) {
    prefix  = '} else if (' + expression + '){';
  } else if (js.indexOf('else') === 0) {
    prefix  = '} else {';
  }
  return prefix
}

// posts as post, i
function parseForExpression(str) {
  var parts = str.split(/,\s*/)
  var index = parts[1]
  parts = parts[0].split(/\s+as\s+/)
  return {
    index: index,
    attr: parts[0],
    as: parts[1]
  }
}

function parseFilters(js) {
  if (!/\s\|\s/.test(js)) return js
  var arr = js.split(/\s*\|\s*/)
  var res = arr[0]

  for (var i = 1; i < arr.length; i++) {
    var f = arr[i].trim()
    if (f) {
      var parts = f.match(/^([\w$_]+)(.*)$/)
      var args
      if (parts[2]) {
        args = parseArgs(parts[2].trim())
        res = 'filters.' + parts[1] + '(' + res + ', ' + args.join(', ') + ')'
      } else {
        res = 'filters.' + f + '(' + res + ')'
      }
    }
  }
  return res
}


/**
 * Parse arguments from string eg:
 * 'a' false 3 => ['a', false, 3]
 *
 * @param {String} str
 * @return {Array}
 * @api public
 */
function parseArgs(str) {
  var strings = []
  var s = str.replace(/(['"]).+?\1/g, function (str) {
    strings.push(str)
    return '$'
  })
  var arr = s.split(/\s+/)
  for (var i = 0, l = arr.length; i < l; i++) {
    var v= arr[i]
    if (v === '$') {
      arr[i] = strings.shift()
    }
  }
  return arr
}


/***/ }),

/***/ 1008:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

(function($){try{$('export default global')}catch(e){try{$('export default self')}catch(e){try{module.exports=__webpack_require__.g}catch(e){try{self.global=self}catch(e){window.global=window}}}}}(eval))

/***/ }),

/***/ 8906:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = 'ontouchstart' in __webpack_require__.g || (__webpack_require__.g.DocumentTouch && document instanceof DocumentTouch)

/***/ }),

/***/ 773:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var prop = __webpack_require__(7719);

// IE <=8 doesn't have `getComputedStyle`
if (!prop || !window.getComputedStyle) {
  module.exports = false;

} else {
  var map = {
    webkitTransform: '-webkit-transform',
    OTransform: '-o-transform',
    msTransform: '-ms-transform',
    MozTransform: '-moz-transform',
    transform: 'transform'
  };

  // from: https://gist.github.com/lorenzopolidori/3794226
  var el = document.createElement('div');
  el.style[prop] = 'translate3d(1px,1px,1px)';
  document.body.insertBefore(el, null);
  var val = getComputedStyle(el).getPropertyValue(map[prop]);
  document.body.removeChild(el);
  module.exports = null != val && val.length && 'none' != val;
}


/***/ }),

/***/ 2703:
/***/ ((module) => {

module.exports = "<div class=\"actionsheet-overlay\">\n  <div class=\"actionsheet\">\n    <div class=\"actionsheet-body\">\n    </div>\n  </div>\n</div>\n";

/***/ }),

/***/ 7418:
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 6361:
/***/ ((module) => {

/**
 * Expose `E`
 */

module.exports = function(e) {
  // any property it doesn't find on the object
  // itself, look up prototype for original `e`
  E.prototype = e;
  return new E();
};

/**
 * Initialize `E`
 */

function E() {}


/***/ }),

/***/ 6552:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var events = __webpack_require__(1671)
var event = __webpack_require__(5143)
var Emitter = __webpack_require__(8767)
var tap = __webpack_require__(2496)
var raf = __webpack_require__(3649)
var Tween = __webpack_require__(302)
var detect = __webpack_require__(5537)
var util = __webpack_require__(9729)
var Pinch = __webpack_require__(310)
var has3d = detect.has3d
var transform = detect.transform
var PI = Math.PI

/**
 * Init PinchZoom with element and optional opt
 *
 * @public
 * @param  {Element}  el
 * @param {Object} opt
 */
function PinchZoom(el, opt) {
  if (!(this instanceof PinchZoom)) return new PinchZoom(el, opt)
  opt = opt || {}
  this.el = el
  this.padding = opt.padding || 0
  this.container = el.parentNode
  this.container.style.overflow = 'hidden'
  this.scale = 1
  this.maxScale = opt.maxScale || 5
  // maximun duration in ms for fast swipe
  this.threshold = opt.threshold || 200
  // minimum moved distance for fast swipe
  this.fastThreshold = opt.fastThreshold || 30
  var rect = el.getBoundingClientRect()
  this.tapreset = opt.tapreset || false
  this.sx = rect.left + rect.width/2
  this.sy = rect.top + rect.height/2
  // transform x y
  this.tx = this.ty = 0
  this.animating = false
  this.pinch = new Pinch(el, this.onPinchMove.bind(this))
  this.pinch.on('start', this.onPinchStart.bind(this))
  this.pinch.on('end', this.onPinchEnd.bind(this))
  if (has3d) {
    this.el.style[transform + 'Origin'] = 'center center 0px'
  } else {
    this.el.style[transform + 'Origin'] = 'center center'
  }
  var _ontap = this._ontap = tap(this.ontap.bind(this))
  event.bind(el, 'touchstart', _ontap)
  this.events = events(el, this)
  this.docEvents = events(document, this);
  if (opt.draggable) {
    this.events.bind('touchstart')
    this.events.bind('touchmove')
    this.events.bind('touchend')
    this.docEvents.bind('touchend', 'ontouchend')
  }
}

Emitter(PinchZoom.prototype)

/**
 * touchstart event listener for single touch
 *
 * @private
 * @param  {Event}  e
 */
PinchZoom.prototype.ontouchstart = function (e) {
  var touches = e.touches
  if (this.animating) {
    e.stopPropagation()
    this.tween.stop()
  }
  if (!touches || 1 != touches.length) return
  var rect = this.el.getBoundingClientRect()
  this.translateY = rect.top < 0 || rect.bottom > this.container.clientHeight
  this.speed = 0
  var d = Date.now()
  var t = e.touches[0]
  var sx = t.clientX
  var sy = t.clientY
  var self = this
  var start = {x: this.tx, y: this.ty}
  var limit = this.getLimitation(100)
  this.move = function (e, touch) {
    self.down = {
      x: sx,
      y: sy,
      at: d
    }
    var cx = touch.clientX
    var cy = touch.clientY
    var px = this.prev ? this.prev.x : sx
    var py = this.prev ? this.prev.y : sy
    e.preventDefault()
    var leftOrRight = Math.abs(cx - px) > Math.abs(cy - py)
    if (self.scale != 1 && !leftOrRight) e.stopPropagation()
    self.calcuteSpeed(cx, cy)
    var tx = start.x + cx - sx
    var ty = start.y + cy - sy
    var res = util.limit(tx, ty, limit)
    var dx = res.x - tx
    if (self.scale == 1 && leftOrRight) {
      res.y = this.ty
      this.angle = cx - px > 0 ? 0 : PI
    }
    if (leftOrRight) this.emit('move', dx)
    if (!this.translateY) res.y = start.y
    self.setTransform(res.x, res.y, self.scale)
  }
}

/**
 * touchmove event listener for single touch
 *
 * @private
 * @param  {Event}  e
 */
PinchZoom.prototype.ontouchmove = function (e) {
  if (!this.move || this.animating ||this.pinch.pinching) return
  var touches = e.touches
  if (!touches || 1 != touches.length) {
    this.move = null
    return
  }
  var touch = touches[0]
  this.move(e, touch)
}

/**
 * touchend event listener for single touch
 *
 * @private
 * @param  {Event}  e
 */
PinchZoom.prototype.ontouchend = function (e) {
  if (this.move == null) return
  if (this.down == null) return this.move = null
  //if (this.tween) this.tween.stop()
  if (this.pinch.pinching || this.animating) return

  var t = Date.now()
  var touch = e.changedTouches[0]
  var x = touch.clientX
  var y = touch.clientY
  var sx = this.down.x
  var sy = this.down.y

  this.calcuteSpeed(x, y)
  var dx = Math.abs(x - sx)
  var limit = this.getLimitation()
  if (dx > this.fastThreshold && dx > Math.abs(y - sy) &&
    (t - this.down.at) < this.threshold && (this.tx <= limit.minx || this.tx >= limit.maxx)) {
    var dir = x > sx ? 'right' : 'left'
    this.down = this.move = null
    return this.emit('swipe', dir)
  }

  this.down = this.move = null
  this.emit('end')
  if (this.speed) this.momentum()
}

PinchZoom.prototype.momentum = function () {
  var deceleration = 0.001
  var limit = this.getLimitation(this.padding)
  var speed = Math.min(this.speed, 4)
  var rate = (4 - PI)/2
  var dis = rate * (speed * speed) / (2 * deceleration)
  var tx = this.tx + dis*Math.cos(this.angle)
  var ty = this.ty + dis*Math.sin(this.angle)
  var res = util.limit(tx, ty, limit)
  var changed = ((this.scale > 1 && (tx < limit.minx || tx > limit.maxx))
                || ty < limit.miny || ty > limit.maxy)
  var ease = changed ? outBack : 'out-circ'
  var d = util.distance([tx, ty, res.x, res.y])

  var duration = (1 - d/dis) * speed/deceleration
  if (this.ty < limit.miny || this.ty > limit.maxy) {
    duration = 500
    ease = 'out-circ'
  }
  if (!this.translateY) res.y = this.ty
  return this.animate({x: res.x, y: res.y, scale: this.scale}, duration, ease)
}

/**
 * get limitation values
 *
 * @private
 */
PinchZoom.prototype.getLimitation = function (padY) {
  padY = padY || 0
  var viewport = util.viewport
  var vw = viewport.width
  var vh = viewport.height
  var rect = this.el.getBoundingClientRect()
  var prect = this.el.parentNode.getBoundingClientRect()
  return {
    maxx: this.tx - rect.left + prect.left + this.padding,
    minx: this.tx - (rect.left - prect.left + rect.width - vw) - this.padding,
    miny: vh > rect.height ? this.ty - rect.top
            : this.ty - rect.top - (rect.height - vh) - padY,
    maxy: vh > rect.height ? this.ty + (vh - rect.top - rect.height)
            : this.ty  - rect.top + padY
    }
}

/**
 * tap event handler
 *
 * @private
 */
PinchZoom.prototype.ontap = function () {
  if (this.animating) return this.tween.stop()
  var ts = Date.now()
  // double tap
  if (this.lastTap && ts - this.lastTap < 300) {
    this.emit('tap')
    return
  }
  if (this.scale == 1) {
    //could be used for reset popup
    this.emit('tap')
    return
  }
  this.lastTap = Date.now()
  if (this.tapreset) {
    this.reset()
  } else {
    this.emit('tap')
  }
}

/**
 * Reset to initial state with animation
 *
 * @public
 * @returns {Promise}
 */
PinchZoom.prototype.reset = function () {
  this.emit('scale', {x: 0, y: 0, scale: 1})
  var promise = this.animate({x: 0, y: 0, scale: 1}, 200)
  return promise
}

/**
 * PinchStart event handler
 * @param {Obejct} point
 * @private
 */
PinchZoom.prototype.onPinchStart = function (point) {
  if (this.animating) this.tween.stop()
  this.start = point
  this.bx = this.sx + this.tx
  this.by = this.sy + this.ty
  this.startScale = this.scale
  this.emit('start')
}

/**
 * PinchMove event handler
 * @param {Event} e
 * @private
 */
PinchZoom.prototype.onPinchMove = function (e) {
  if (this.animating) return
  this.point = {x: e.x, y: e.y}
  var mx = e.x - this.start.x
  var my = e.y - this.start.y
  // center position
  var x = this.bx + mx
  var y = this.by + my
  var a = util.getAngle(x, y, e.x, e.y)
  var dis = util.distance([e.y, e.x, y, x]) * (e.scale - 1)
  var tx = this.bx - this.sx + mx - dis*Math.cos(a)
  var ty = this.by - this.sy + my - dis*Math.sin(a)
  this.setTransform(tx, ty, e.scale * this.startScale)
}

/**
 * PinchEnd event handler
 *
 * @private
 */
PinchZoom.prototype.onPinchEnd = function () {
  if (this.scale !== this.startScale) {
    this.emit('scale', {x: this.tx, y: this.ty, scale: this.scale})
  }
  this.startScale = this.scale
  var p = this.checkScale()
  if (!p) this.checkPosition()
}

/**
 * set transform properties of element
 *
 * @public
 * @param {Number} x
 * @param {Number} y
 * @param {Number} scale
 */
PinchZoom.prototype.setTransform = function (x, y, scale) {
  if (isNaN(x) || isNaN(y)) return
  this.tx = x
  this.ty = y
  this.scale = scale
  if (has3d) {
    this.el.style[transform] = 'translate3d(' + x + 'px, ' + y + 'px, 0) '
    + ' scale3d(' + scale + ',' + scale + ', 1)'
  } else {
    this.el.style[transform] = 'translate(' + x + 'px, ' + y + 'px) '
    + ' scale(' + scale + ','  + scale + ')'
  }
}

/**
 * animate transoform properties
 *
 * @public
 * @param  {Element}  o
 * @param {Number} duration
 * @param {String} ease
 */
PinchZoom.prototype.animate = function (o, duration, ease) {
  var current = {x: this.tx, y: this.ty, scale: this.scale}
  ease = ease || 'out-circ'
  var self = this
  this.animating = true
  var tween = this.tween = Tween(current)
    .ease(ease)
    .to(o)
    .duration(duration)

  tween.update(function(o){
    self.setTransform(o.x, o.y, o.scale)
  })

  var promise = new Promise(function (resolve) {
    tween.on('end', function(){
      animate = function(){} // eslint-disable-line
      self.animating = false
      resolve()
    })
  })

  function animate() {
    raf(animate)
    tween.update()
  }

  animate()
  return promise
}

/**
 * unbind all event listeners and reset element
 *
 * @public
 */
PinchZoom.prototype.unbind = function () {
  this.setTransform(0, 0, 1)
  this.pinch.unbind()
  this.events.unbind()
  this.docEvents.unbind()
  event.unbind(this.el, 'touchstart', this._ontap)
}

/**
 * Reset position if invalid scale or offset.
 *
 * @private
 */
PinchZoom.prototype.checkPosition = function () {
  var rect = this.el.getBoundingClientRect()
  var dest = {x: this.tx, y: this.ty, scale: this.scale}

  var viewport = util.viewport
  var vw = viewport.width
  var vh = viewport.height
  var pad = this.padding
  if (rect.left > pad) {
    dest.x = this.tx - rect.left + pad
  } else if (rect.left + rect.width < vw - pad) {
    dest.x = this.tx + (vw - rect.left - rect.width - pad)
  }
  var bottom = rect.top + rect.height
  if (rect.top > 0 && bottom > vh - pad) {
    // too low
    dest.y = this.ty - (bottom - vh + pad)
  } else if (rect.top < pad && bottom < vh - pad) {
    // too high
    dest.y = this.ty - rect.top + pad
  }
  if (dest.x !== this.tx || dest.y !== this.ty) {
    return this.animate(dest, 200)
  }
  return Promise.resolve()
}

/**
 * Reset scale if scale not valid
 *
 * @private
 */
PinchZoom.prototype.checkScale = function () {
  if (this.scale < 1) return this.reset()
  if (this.scale > this.maxScale) {
    var p = this.point
    return this.scaleAt(p.x, p.y, this.maxScale)
  }
}

/**
 * Limit scale to pinch point
 * @param {Number} scale
 * @private
 */
PinchZoom.prototype.limitScale = function (scale) {
  var x = this.sx + this.tx
  var y = this.sy + this.ty
  var point = this.point
  var a = Math.atan((point.y - y)/(point.x - x))
  if ((point.y < y && point.x < x) || (point.y > y && point.x < x)) {
    a = a + PI
  }
  var dis = util.distance([point.y, point.x, y, x]) * (this.scale - scale)
  var tx = this.tx + dis*Math.cos(a)
  var ty = this.ty + dis*Math.sin(a)
  return this.animate({x: tx, y: ty, scale: scale}, 200)
}

/**
 * change el to scale at x,y with specified scale
 *
 * @public
 * @param {Number} x
 * @param {Number} y
 * @param {Number} scale
 * @returns {Promise}
 */
PinchZoom.prototype.scaleAt = function (x, y, scale) {
  var cx = this.sx + this.tx
  var cy = this.sy + this.ty
  var a = util.getAngle(cx, cy, x, y)
  var dis = util.distance([y, x, cy, cx]) * (1 - scale/this.scale)
  var tx = this.tx + dis*Math.cos(a)
  var ty = this.ty + dis*Math.sin(a)
  return this.animate({x: tx, y: ty, scale: scale}, 300)
}

PinchZoom.prototype.calcuteSpeed = function(x, y) {
  var prev = this.prev || this.down
  var ts = Date.now()
  var dt = ts - prev.at
  if (ts - this.down.at < 50 || dt > 50) {
    var distance = util.distance([prev.x, prev.y, x, y])
    this.speed = Math.abs(distance / dt)
    this.angle = util.getAngle(prev.x, prev.y, x, y)
  }
  if (dt > 50) {
    this.prev = {x: x, y: y, at: ts}
  }
}

function outBack(n) {
  var s = 1.20158;
  return --n * n * ((s + 1) * n + s) + 1;
}

module.exports = PinchZoom


/***/ }),

/***/ 310:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
 * Module dependencies
 */

var events = __webpack_require__(1671)
var Emitter = __webpack_require__(8767)
var E = __webpack_require__(6361)
var util = __webpack_require__(9729)

/**
 * Export `Pinch`
 */

module.exports = Pinch

/**
 * Initialize `Pinch`
 *
 * @param {Element} el
 * @param {Function} fn
 * @return {Pinch}
 * @api public
 */

function Pinch(el, fn) {
  if (!(this instanceof Pinch)) return new Pinch(el, fn)
  this.el = el
  this.parent = el.parentNode
  this.fn = fn || function(){}
  this.midpoint = null
  this.scale = 1
  this.lastScale = 1
  this.pinching = false
  this.events = events(el, this)
  this.events.bind('touchstart')
  this.events.bind('touchmove')
  this.events.bind('touchend')
  this.fingers = {}
}

Emitter(Pinch.prototype)

/**
 * Touch start
 *
 * @param {Event} e
 * @return {Pinch}
 * @api private
 */

Pinch.prototype.ontouchstart = function(e) {
  var touches = e.touches
  if (!touches || 2 != touches.length) return this
  e.preventDefault()
  e.stopPropagation()

  var coords = []
  for(var i = 0, finger; i < touches.length; i++) {
    finger = touches[i]
    coords.push(finger.clientX, finger.clientY)
  }

  this.pinching = true
  this.distance = util.distance(coords)
  this.midpoint = util.midpoint(coords)
  this.emit('start', this.midpoint)
  return this
}

/**
 * Touch move
 *
 * @param {Event} e
 * @return {Pinch}
 * @api private
 */

Pinch.prototype.ontouchmove = function(e) {
  var touches = e.touches
  if (!touches || touches.length != 2 || !this.pinching) return this
  e.preventDefault()
  e.stopPropagation()
  var coords = []
  for(var i = 0, finger; i < touches.length ; i++) {
    finger = touches[i]
    coords.push(finger.clientX, finger.clientY)
  }

  var dist = util.distance(coords)
  var mid = util.midpoint(coords)

  // make event properties mutable
  e = E(e)

  // iphone does scale natively, just use that
  //let scale = dist / this.distance * this.scale
  var scale = dist / this.distance * this.scale
  Object.defineProperty(e, 'scale', {
    get: function () {
      return scale
    }
  })

  e.x = mid.x
  e.y = mid.y

  this.fn(e)

  this.lastScale = e.scale
  return this
}

/**
 * Touchend
 *
 * @param {Event} e
 * @return {Pinch}
 * @api private
 */

Pinch.prototype.ontouchend = function(e) {
  var touches = e.touches
  if (!touches || touches.length == 2 || !this.pinching) return this
  this.scale = this.lastScale
  this.pinching = false
  this.emit('end')
  return this
}

/**
 * Unbind
 *
 * @return {Pinch}
 * @api public
 */

Pinch.prototype.unbind = function() {
  this.events.unbind()
  return this
}


/***/ }),

/***/ 9729:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Get the distance between two points
 *
 * @param {Array} arr [x1, y1, x2, y2]
 * @return {Number}
 * @api private
 */

exports.distance = function (arr) {
  var x = Math.pow(arr[0] - arr[2], 2);
  var y = Math.pow(arr[1] - arr[3], 2);
  return Math.sqrt(x + y);
}

/**
 * Get the midpoint
 *
 * @param {Array} arr
 * @return {Object} coords
 * @api private
 */

exports.midpoint = function (arr) {
  var coords = {};
  coords.x = (arr[0] + arr[2]) / 2;
  coords.y = (arr[1] + arr[3]) / 2;
  return coords;
}

Object.defineProperty(exports, "viewport", ({
  get: function () {
    return {
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    }
  }
}))

/**
 * getAngle
 *
 * @public
 * @param {Number} x
 * @param {Number} y
 * @param {Number} x1
 * @param {Number} y1
 * @returns {undefined}
 */
exports.getAngle = function (x, y, x1, y1) {
  if (x == x1 && y == y1) return 0
  var a = Math.atan((y1 - y)/(x1 - x))
  if (x1 < x) return a + Math.PI
  return a
}

exports.limit = function (x, y, limit) {
  if (x < limit.minx) {
    x = limit.minx
  } else if (x > limit.maxx) {
    x = limit.maxx
  }
  if (y < limit.miny) {
    y = limit.miny
  } else if (y > limit.maxy) {
    y = limit.maxy
  }
  return {
    x: x,
    y: y
  }
}


/***/ }),

/***/ 5143:
/***/ ((__unused_webpack_module, exports) => {

var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};

/***/ }),

/***/ 46:
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 5537:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var transform = null
;(function () {
  var styles = [
    'webkitTransform',
    'MozTransform',
    'msTransform',
    'OTransform',
    'transform'
  ];

  var el = document.createElement('p');

  for (var i = 0; i < styles.length; i++) {
    if (null != el.style[styles[i]]) {
      transform = styles[i];
      break;
    }
  }
})()

/**
 * Transition-end mapping
 */
var transitionEnd = null
;(function () {
  var map = {
    'WebkitTransition' : 'webkitTransitionEnd',
    'MozTransition' : 'transitionend',
    'OTransition' : 'oTransitionEnd',
    'msTransition' : 'MSTransitionEnd',
    'transition' : 'transitionend'
  };

  /**
  * Expose `transitionend`
  */

  var el = document.createElement('p');

  for (var transition in map) {
    if (null != el.style[transition]) {
      transitionEnd = map[transition];
      break;
    }
  }
})()

exports.transitionend = transitionEnd

exports.transition = __webpack_require__(2830)

exports.transform = transform

exports.touchAction = __webpack_require__(1037)

exports.has3d = __webpack_require__(773)


/***/ }),

/***/ 2146:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var classes = __webpack_require__(2809)

/**
 * add class to el and remove it from the same tagName siblings
 *
 * @param {Element} el
 * @param {String} [default:active] [className] optional class added for el
 * @api public
 */
module.exports = function (el, className) {
  var children = el.parentNode.childNodes
  var tagName = el.tagName
  className = className || 'active'
  for (var i = 0, l = children.length; i < l; i++) {
    var node = children[i]
    if (!node || (node.nodeType !== 1) || (node.tagName !== tagName)) continue
    if (node === el) {
      classes(node).add(className)
    } else {
      classes(node).remove(className)
    }
  }
}


/***/ }),

/***/ 981:
/***/ ((module) => {


/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};

/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var Emitter = __webpack_require__(8767);
var reduce = __webpack_require__(981);

/**
 * Root reference for iframes.
 */

var root = 'undefined' == typeof window
  ? this
  : window;

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Determine XHR.
 */

function getXHR() {
  if (root.XMLHttpRequest
    && ('file:' != root.location.protocol || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
}

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(obj[key]));
    }
  }
  return pairs.join('&');
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  this.text = this.xhr.responseText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  if (!str) return null
  return parse
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  var type = status / 100 | 0;

  // status / class
  this.status = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status || 1223 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.set('X-Requested-With', 'XMLHttpRequest')
  this.on('end', function(){
    var res = new Response(self);
    if ('HEAD' == method) res.text = null;
    self.callback(null, res);
  });
}

/**
 * Mixin `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Allow for extension
 */

Request.prototype.use = function(fn) {
  fn(this);
  return this;
}

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */

Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.field = function(name, val){
  if (!this._formData) this._formData = new FormData();
  this._formData.append(name, val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new FormData();
  this._formData.append(field, file, filename);
  return this;
};

/**
 * Send `data`, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // querystring
 *       request.get('/search')
 *         .end(callback)
 *
 *       // multiple data "writes"
 *       request.get('/search')
 *         .send({ search: 'query' })
 *         .send({ range: '1..5' })
 *         .send({ order: 'desc' })
 *         .end(callback)
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"})
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this.getHeader('Content-Type');

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  if (!err && res && res.status/100 > 3) {
    if (res.body && res.body.message) {
      err = new Error(res.body.message);
    } else {
      err = new Error('cannot GET /error (' + res.status + ')');
    }
  }
  if (2 == fn.length || 0 === fn.length) return fn(err, res);
  res = res || {}
  res.error = err;
  if (err) this.emit('error', err);
  fn(res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
  err.crossDomain = true;
  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;
    if (0 == xhr.status) {
      if (self.aborted) return self.timeoutError();
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  if (xhr.upload) {
    xhr.upload.onprogress = function(e){
      e.percent = e.loaded / e.total * 100;
      self.emit('progress', e);
    };
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var serialize = request.serialize[this.getHeader('Content-Type')];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  this.emit('request', this);
  xhr.send(data);
  return this;
};

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(method, url) {
  // callback
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new Request('GET', method);
  }

  return new Request(method, url);
}

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.del = function(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * Expose `request`.
 */

module.exports = request;


/***/ }),

/***/ 9623:
/***/ ((module) => {

module.exports = throttle;

/**
 * Returns a new function that, when invoked, invokes `func` at most once per `wait` milliseconds.
 *
 * @param {Function} func Function to wrap.
 * @param {Number} wait Number of milliseconds that must elapse between `func` invocations.
 * @return {Function} A new function that wraps the `func` function passed in.
 */

function throttle (func, wait) {
  var ctx, args, rtn, timeoutID; // caching
  var last = 0;

  return function throttled () {
    ctx = this;
    args = arguments;
    var delta = new Date() - last;
    if (!timeoutID)
      if (delta >= wait) call();
      else timeoutID = setTimeout(call, wait - delta);
    return rtn;
  };

  function call () {
    timeoutID = 0;
    last = +new Date();
    rtn = func.apply(ctx, args);
    ctx = null;
    args = null;
  }
}


/***/ }),

/***/ 1037:
/***/ ((module) => {


/**
 * Module exports.
 */

module.exports = touchActionProperty();

/**
 * Returns "touchAction", "msTouchAction", or null.
 */

function touchActionProperty(doc) {
  if (!doc) doc = document;
  var div = doc.createElement('div');
  var prop = null;
  if ('touchAction' in div.style) prop = 'touchAction';
  else if ('msTouchAction' in div.style) prop = 'msTouchAction';
  div = null;
  return prop;
}


/***/ }),

/***/ 7719:
/***/ ((module) => {


var styles = [
  'webkitTransform',
  'MozTransform',
  'msTransform',
  'OTransform',
  'transform'
];

var el = document.createElement('p');
var style;

for (var i = 0; i < styles.length; i++) {
  style = styles[i];
  if (null != el.style[style]) {
    module.exports = style;
    break;
  }
}


/***/ }),

/***/ 2830:
/***/ ((module) => {

var styles = [
  'webkitTransition',
  'MozTransition',
  'OTransition',
  'msTransition',
  'transition'
]

var el = document.createElement('p')
var style

for (var i = 0; i < styles.length; i++) {
  if (null != el.style[styles[i]]) {
    style = styles[i]
    break
  }
}
el = null

module.exports = style


/***/ }),

/***/ 2745:
/***/ ((module, exports) => {

exports = module.exports = trim;

function trim(str){
  if (str.trim) return str.trim();
  return exports.right(exports.left(str));
}

exports.left = function(str){
  if (str.trimLeft) return str.trimLeft();

  return str.replace(/^\s\s*/, '');
};

exports.right = function(str){
  if (str.trimRight) return str.trimRight();

  var whitespace_pattern = /\s/,
      i = str.length;
  while (whitespace_pattern.test(str.charAt(--i)));

  return str.slice(0, i + 1);
};


/***/ }),

/***/ 7147:
/***/ (function() {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status === undefined ? 200 : options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + {"0":"wx-slider","77":"wx-switch","108":"wx-swiper-item","142":"wx-picker-view","149":"wx-action-sheet-item","172":"wx-modal","235":"wx-textarea","272":"wx-radio","293":"wx-audio","336":"wx-map","399":"wx-radio-group","425":"wx-canvas","508":"wx-form","532":"wx-action-sheet-cancel","626":"wx-swiper","647":"wx-picker","700":"wx-scroll-view","786":"wx-toast","801":"wx-contact-button","820":"wx-action-sheet","834":"wx-video","884":"wx-progress","968":"wx-picker-view-column"}[chunkId] + ".wd.chunk.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "DaEngine:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "script/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			98: 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkIds[i]] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkDaEngine"] = self["webpackChunkDaEngine"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _common_globalDefined__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3313);
/* harmony import */ var _common_globalDefined__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_common_globalDefined__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _common_reporter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5904);
/* harmony import */ var _common_reporter__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_common_reporter__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _service_bridge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(167);
/* harmony import */ var _service_bridge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_service_bridge__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _service_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2511);
/* harmony import */ var _service_api__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_service_api__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _service_engine__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1866);
/* harmony import */ var _service_engine__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_service_engine__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _service_amdEngine__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5767);
/* harmony import */ var _view_api__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2821);
/* harmony import */ var _view_api__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_view_api__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _view_exparser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3492);
/* harmony import */ var _view_exparser__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_view_exparser__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _view_exparser_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4052);
/* harmony import */ var _view_exparser_component__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_view_exparser_component__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _view_virtual_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(2455);
/* harmony import */ var _view_virtual_dom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_view_virtual_dom__WEBPACK_IMPORTED_MODULE_9__);












})();

/******/ })()
;