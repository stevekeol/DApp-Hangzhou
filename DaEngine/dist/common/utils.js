var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
function addPXSuffix(num) {
    return typeof num === 'number' ? num + 'px' : num;
}
function addDegSuffix(num) {
    return num + 'deg';
}
// const words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
var btoa = window.btoa;
var atob = window.atob;
var SelQuery = /** @class */ (function () {
    function SelQuery(t, n, r) {
        this._selectorQuery = t;
        this._selector = n;
        this._single = r;
    }
    SelQuery.prototype.fields = function (e, t) {
        this._selectorQuery._push(this._selector, this._single, e, t);
        return this._selectorQuery;
    };
    SelQuery.prototype.boundingClientRect = function (e) {
        this._selectorQuery._push(this._selector, this._single, {
            id: !0,
            dataset: !0,
            rect: !0,
            size: !0
        }, e);
        return this._selectorQuery;
    };
    SelQuery.prototype.scrollOffset = function (e) {
        this._selectorQuery._push(this._selector, this._single, {
            id: !0,
            dataset: !0,
            scrollOffset: !0
        }, e);
        return this._selectorQuery;
    };
    return SelQuery;
}());
var getViewPortInfo = function (e) {
    var t = {};
    e.id && (t.id = '');
    e.dataset && (t.dataset = {});
    e.rect && ((t.left = 0), (t.right = 0), (t.top = 0), (t.bottom = 0));
    e.size &&
        ((t.width = document.documentElement.clientWidth),
            (t.height = document.documentElement.clientHeight));
    e.scrollOffset &&
        ((t.scrollLeft =
            document.documentElement.scrollLeft || document.body.scrollLeft || 0),
            (t.scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop || 0));
    return t;
};
var getInfoInFields = function (info, fields) {
    var dom = info.$$;
    var res = {};
    fields.id && (res.id = info.id || '');
    fields.dataset && (res.dataset = info.dataset || {});
    if (fields.rect || fields.size) {
        var domBounding = dom.getBoundingClientRect();
        fields.rect &&
            ((res.left = domBounding.left),
                (res.right = domBounding.right),
                (res.top = domBounding.top),
                (res.bottom = domBounding.bottom));
        fields.size &&
            ((res.width = domBounding.width), (res.height = domBounding.height));
    }
    fields.properties &&
        fields.properties.forEach(function (t) {
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
        }
        else {
            res.scrollLeft = 0;
            res.scrollTop = 0;
        }
    }
    return res;
};
var execQuery = function (viewId, reqs, cb) {
    var ret = [];
    reqs.forEach(function (req) {
        var selector = req.selector;
        var single = req.single;
        var fields = req.fields;
        var res = null;
        if (selector === 'viewport') {
            res = getViewPortInfo(fields);
        }
        else if (single) {
            var info = window.__DOMTree__.querySelector(selector);
            res = info ? getInfoInFields(info, fields) : null;
        }
        else {
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
var wxQuerySelector = /** @class */ (function () {
    function wxQuerySelector(t) {
        this._webviewId = t;
        this._queue = [];
        this._queueCb = [];
    }
    wxQuerySelector.prototype.select = function (e) {
        return new SelQuery(this, e, !0);
    };
    wxQuerySelector.prototype.selectAll = function (e) {
        return new SelQuery(this, e, !1);
    };
    wxQuerySelector.prototype.selectViewport = function () {
        return new SelQuery(this, 'viewport', !0);
    };
    wxQuerySelector.prototype._push = function (e, t, n, o) {
        this._queue.push({ selector: e, single: t, fields: n });
        this._queueCb.push(o || null);
    };
    wxQuerySelector.prototype.exec = function (e) {
        var self = this;
        execQuery(this._webviewId, this._queue, function (res) {
            var cbQueue = self._queueCb;
            res.forEach(function (data, idx) {
                typeof cbQueue[idx] === 'function' && cbQueue[idx].call(self, data);
            });
            typeof e === 'function' && e.call(self, res);
        });
    };
    return wxQuerySelector;
}());
var AppServiceSdkKnownError = /** @class */ (function (_super) {
    __extends(AppServiceSdkKnownError, _super);
    function AppServiceSdkKnownError(e) {
        var _this = _super.call(this, 'APP-SERVICE-SDK:' + e) || this;
        _this.type = 'AppServiceSdkKnownError';
        return _this;
    }
    return AppServiceSdkKnownError;
}(Error));
var AppServiceEngineKnownError = /** @class */ (function (_super) {
    __extends(AppServiceEngineKnownError, _super);
    function AppServiceEngineKnownError(e) {
        var _this = _super.call(this, 'APP-SERVICE-Engine:' + e) || this;
        _this.type = 'AppServiceEngineKnownError';
        return _this;
    }
    return AppServiceEngineKnownError;
}(Error));
var BASE_DEVICE_WIDTH = 750;
var ua = window.navigator.userAgent.toLowerCase();
var platform = /(iphone|ipad)/.test(ua)
    ? 'ios'
    : /android/.test(ua) ? 'android' : '';
var screenWidth = (platform && window.innerWidth) || 375;
var devicePixelRatio = window.devicePixelRatio || 2;
var SMALL_NUM = 1e-4;
var rpxToPxNum = function (rpxNum) {
    rpxNum = rpxNum / BASE_DEVICE_WIDTH * screenWidth;
    rpxNum = Math.floor(rpxNum + SMALL_NUM);
    return rpxNum === 0
        ? devicePixelRatio !== 1 && platform == 'ios' ? 0.5 : 1
        : rpxNum;
};
var parseRpx = function (matches) {
    var num = 0, decimalRadix = 1, isHandlingDecimal = !1, isNeg = !1, idx = 0;
    for (; idx < matches.length; ++idx) {
        var ch = matches[idx];
        if (ch >= '0' && ch <= '9') {
            if (isHandlingDecimal) {
                decimalRadix *= 0.1;
                num += (ch - '0') * decimalRadix;
            }
            else {
                num = 10 * num + (ch - '0');
            }
        }
        else {
            ch === '.' ? (isHandlingDecimal = !0) : ch === '-' && (isNeg = !0);
        }
    }
    isNeg && (num = -num);
    return rpxToPxNum(num);
};
var rpxInTemplate = /%%\?[+-]?\d+(\.\d+)?rpx\?%%/g;
var rpxInCSS = /(:|\s)[+-]?\d+(\.\d+)?rpx/g;
var utils = {
    copyObj: function (distObj, orgObj) {
        for (var attrName in orgObj) {
            ;
            (function (attrName) {
                distObj.__defineGetter__(attrName, function () {
                    return Reporter.surroundThirdByTryCatch(orgObj[attrName], 'wx.' + attrName);
                });
            })(attrName);
        }
    },
    getPlatform: function () {
        return platform;
    },
    transformRpx: function (propValue, isInCSS) {
        if (this.getDataType(propValue) !== 'String')
            return propValue;
        var matches;
        matches = isInCSS
            ? propValue.match(rpxInCSS)
            : propValue.match(rpxInTemplate);
        matches &&
            matches.forEach(function (match) {
                var pxNum = parseRpx(match);
                var cssValue = (isInCSS ? match[0] : '') + pxNum + 'px';
                propValue = propValue.replace(match, cssValue);
            });
        return propValue;
    },
    getRealRoute: function (pathPrefix, pathname) {
        if (pathPrefix === void 0) { pathPrefix = ''; }
        if (pathname === void 0) { pathname = ''; }
        // 格式化一个路径
        if (pathname.indexOf('/') === 0)
            return pathname.substr(1);
        if (pathname.indexOf('./') === 0) {
            return this.getRealRoute(pathPrefix, pathname.substr(2));
        }
        var index, folderLength, folderArr = pathname.split('/');
        for (index = 0, folderLength = folderArr.length; index < folderLength && folderArr[index] === '..'; index++)
            ;
        folderArr.splice(0, index);
        var prefixArr = pathPrefix.length > 0 ? pathPrefix.split('/') : [];
        prefixArr.splice(prefixArr.length - index - 1, index + 1);
        var pathArr = prefixArr.concat(folderArr);
        return pathArr.join('/');
    },
    animationToStyle: function (params) {
        var animates = params.animates, option = params.option, opts = void 0 === option ? {} : option, transformOrigin = opts.transformOrigin, transition = opts.transition;
        if (typeof transition === 'undefined' || typeof animates === 'undefined') {
            return {
                transformOrigin: '',
                transform: '',
                transition: ''
            };
        }
        var transform = animates
            .filter(function (animate) {
            var type = animate.type;
            return type !== 'style';
        })
            .map(function (animate) {
            var animateType = animate.type, animateArgs = animate.args;
            switch (animateType) {
                case 'matrix':
                    return 'matrix(' + animateArgs.join(',') + ')';
                case 'matrix3d':
                    return 'matrix3d(' + animateArgs.join(',') + ')';
                case 'rotate':
                    return ((animateArgs = animateArgs.map(addDegSuffix)),
                        'rotate(' + animateArgs[0] + ')');
                case 'rotate3d':
                    return ((animateArgs[3] = addDegSuffix(animateArgs[3])),
                        'rotate3d(' + animateArgs.join(',') + ')');
                case 'rotateX':
                    return ((animateArgs = animateArgs.map(addDegSuffix)),
                        'rotateX(' + animateArgs[0] + ')');
                case 'rotateY':
                    return ((animateArgs = animateArgs.map(addDegSuffix)),
                        'rotateY(' + animateArgs[0] + ')');
                case 'rotateZ':
                    return ((animateArgs = animateArgs.map(addDegSuffix)),
                        'rotateZ(' + animateArgs[0] + ')');
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
                    return ((animateArgs = animateArgs.map(addPXSuffix)),
                        'translate(' + animateArgs.join(',') + ')');
                case 'translate3d':
                    return ((animateArgs = animateArgs.map(addPXSuffix)),
                        'translate3d(' + animateArgs.join(',') + ')');
                case 'translateX':
                    return ((animateArgs = animateArgs.map(addPXSuffix)),
                        'translateX(' + animateArgs[0] + ')');
                case 'translateY':
                    return ((animateArgs = animateArgs.map(addPXSuffix)),
                        'translateY(' + animateArgs[0] + ')');
                case 'translateZ':
                    return ((animateArgs = animateArgs.map(addPXSuffix)),
                        'translateZ(' + animateArgs[0] + ')');
                case 'skew':
                    return ((animateArgs = animateArgs.map(addDegSuffix)),
                        'skew(' + animateArgs.join(',') + ')');
                case 'skewX':
                    return ((animateArgs = animateArgs.map(addDegSuffix)),
                        'skewX(' + animateArgs[0] + ')');
                case 'skewY':
                    return ((animateArgs = animateArgs.map(addDegSuffix)),
                        'skewY(' + animateArgs[0] + ')');
                default:
                    return '';
            }
        })
            .join(' ');
        var style = animates
            .filter(function (animate) {
            var type = animate.type;
            return type === 'style';
        })
            .reduce(function (res, cur) {
            return (res[cur.args[0]] = cur.args[1]), res;
        }, {});
        var transitionProperty = ['transform'].concat(Object.keys(style)).join(',');
        return {
            style: style,
            transformOrigin: transformOrigin,
            transform: transform,
            transitionProperty: transitionProperty,
            transition: transition.duration +
                'ms ' +
                transition.timingFunction +
                ' ' +
                transition.delay +
                'ms'
        };
    },
    // service
    anyTypeToString: function (data) {
        // 把e转成string并返回一个对象
        var dataType = this.getDataType(data);
        if (dataType == 'Array' || dataType == 'Object') {
            try {
                data = JSON.stringify(data);
            }
            catch (e) {
                e.type = 'AppServiceSdkKnownError';
                throw e;
            }
        }
        else {
            data =
                dataType == 'String' || dataType == 'Number' || dataType == 'Boolean'
                    ? data.toString()
                    : dataType == 'Date'
                        ? data.getTime().toString()
                        : dataType == 'Undefined'
                            ? 'undefined'
                            : dataType == 'Null' ? 'null' : '';
        }
        return {
            data: data,
            dataType: dataType
        };
    },
    stringToAnyType: function (data, type) {
        // 把e解码回来，和前面a相对应
        return (data =
            type == 'String'
                ? data
                : type == 'Array' || type == 'Object'
                    ? JSON.parse(data)
                    : type == 'Number'
                        ? parseFloat(data)
                        : type == 'Boolean'
                            ? data == 'true'
                            : type == 'Date'
                                ? new Date(parseInt(data))
                                : type == 'Undefined' ? void 0 : type == 'Null' ? null : '');
    },
    getDataType: function (data) {
        // get data type
        return Object.prototype.toString
            .call(data)
            .split(' ')[1]
            .split(']')[0];
    },
    isPlainObject: function (e) {
        return this.getDataType(e) === 'Object';
    },
    paramCheck: function (params, paramTpl) {
        // 比较e\t
        var result, name = arguments.length > 2 && void 0 !== arguments[2]
            ? arguments[2]
            : 'parameter', tplTpye = this.getDataType(paramTpl), pType = this.getDataType(params);
        if (pType != tplTpye) {
            return name + ' should be ' + tplTpye + ' instead of ' + pType + ';';
        }
        switch (((result = ''), tplTpye)) {
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
    urlEncodeFormData: function (data) {
        // 把对象生成queryString
        var needEncode = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if (typeof data !== 'object')
            return data;
        var tmpArr = [];
        for (var o in data) {
            if (data.hasOwnProperty(o)) {
                if (needEncode) {
                    try {
                        tmpArr.push(encodeURIComponent(o) + '=' + encodeURIComponent(data[o]));
                    }
                    catch (t) {
                        tmpArr.push(o + '=' + data[o]);
                    }
                }
                else
                    tmpArr.push(o + '=' + data[o]);
            }
        }
        return tmpArr.join('&');
    },
    addQueryStringToUrl: function (originalUrl, newParams) {
        // 生成url t:param obj
        if (typeof originalUrl === 'string' &&
            typeof newParams === 'object' &&
            Object.keys(newParams).length > 0) {
            var urlComponents = originalUrl.split('?'), host = urlComponents[0], oldParams = (urlComponents[1] || '')
                .split('&')
                .reduce(function (res, cur) {
                if (typeof cur === 'string' && cur.length > 0) {
                    var curArr = cur.split('='), key = curArr[0], value = curArr[1];
                    res[key] = value;
                }
                return res;
            }, {}), refinedNewParams = Object.keys(newParams).reduce(function (res, cur) {
                typeof newParams[cur] === 'object'
                    ? (res[encodeURIComponent(cur)] = encodeURIComponent(JSON.stringify(newParams[cur])))
                    : (res[encodeURIComponent(cur)] = encodeURIComponent(newParams[cur]));
                return res;
            }, {});
            return (host +
                '?' +
                this.urlEncodeFormData(this.assign(oldParams, refinedNewParams)));
        }
        return originalUrl;
    },
    validateUrl: function (url) {
        return /^(http|https):\/\/.*/i.test(url);
    },
    assign: function () {
        // endext 对象合并
        var args = Array.prototype.slice.apply(arguments);
        return args.reduce(function (res, cur) {
            for (var n in cur) {
                res[n] = cur[n];
            }
            return res;
        }, {});
    },
    encodeUrlQuery: function (url) {
        // 把url中的参数encode
        if (typeof url === 'string') {
            var urlArr = url.split('?'), urlPath = urlArr[0], queryParams = (urlArr[1] || '').split('&').reduce(function (res, cur) {
                if (typeof cur === 'string' && cur.length > 0) {
                    var curArr = cur.split('='), key = curArr[0], value = curArr[1];
                    res[key] = value;
                }
                return res;
            }, {}), urlQueryArr = [];
            for (var i in queryParams) {
                queryParams.hasOwnProperty(i) &&
                    urlQueryArr.push(i + '=' + encodeURIComponent(queryParams[i]));
            }
            return urlQueryArr.length > 0
                ? urlPath + '?' + urlQueryArr.join('&')
                : url;
        }
        return url;
    },
    addHTMLSuffix: function (url) {
        // 给url加上。html的扩展名
        if (typeof url !== 'string') {
            return url;
        }
        var urlArr = url.split('?');
        urlArr[0] += '.html';
        return typeof urlArr[1] !== 'undefined'
            ? urlArr[0] + '?' + urlArr[1]
            : urlArr[0];
    },
    arrayBufferToBase64: function (buffer) {
        for (var res = '', arr = new Uint8Array(buffer), arrLeng = arr.byteLength, r = 0; r < arrLeng; r++) {
            res += String.fromCharCode(arr[r]);
        }
        return btoa(res);
    },
    base64ToArrayBuffer: function (str) {
        for (var atobStr = atob(str), leng = atobStr.length, arr = new Uint8Array(leng), r = 0; r < leng; r++) {
            arr[r] = atobStr.charCodeAt(r);
        }
        return arr.buffer;
    },
    blobToArrayBuffer: function (blobStr, callback) {
        // readAsArrayBuffer t:callback
        var fileReader = new FileReader();
        fileReader.onload = function () {
            callback(this.result);
        };
        fileReader.readAsArrayBuffer(blobStr);
    },
    convertObjectValueToString: function (obj) {
        // 把对象元素都转成字符串
        return Object.keys(obj).reduce(function (res, cur) {
            typeof obj[cur] === 'string'
                ? (res[cur] = obj[cur])
                : typeof obj[cur] === 'number'
                    ? (res[cur] = obj[cur] + '')
                    : (res[cur] = Object.prototype.toString.apply(obj[cur]));
            return res;
        }, {});
    },
    renameProperty: function (obj, oldName, newName) {
        this.isPlainObject(obj) !== !1 &&
            oldName != newName &&
            obj.hasOwnProperty(oldName) &&
            ((obj[newName] = obj[oldName]), delete obj[oldName]);
    },
    toArray: function (arg) {
        // 把e转成array
        if (Array.isArray(arg)) {
            for (var t = 0, n = Array(arg.length); t < arg.length; t++) {
                n[t] = arg[t];
            }
            return n;
        }
        return Array.from(arg);
    },
    canIUse: function (params, version) {
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
    transWxmlToHtml: function (url) {
        if (typeof url !== 'string')
            return url;
        var urlArr = url.split('?');
        urlArr[0] += '.html';
        return void 0 !== urlArr[1] ? urlArr[0] + '?' + urlArr[1] : urlArr[0];
    },
    removeHtmlSuffixFromUrl: function (url) {
        return typeof url === 'string'
            ? url.indexOf('?') !== -1
                ? url.replace(/\.html\?/, '?')
                : url.replace(/\.html$/, '')
            : url;
    },
    AppServiceSdkKnownError: AppServiceSdkKnownError,
    AppServiceEngineKnownError: AppServiceEngineKnownError,
    defaultRunningStatus: 'active',
    wxQuerySelector: wxQuerySelector,
    safeInvoke: function () {
        // do page method
        var res = void 0, args = Array.prototype.slice.call(arguments), fn = args[0];
        args = args.slice(1);
        try {
            var startTime = Date.now();
            res = this[fn].apply(this, args);
            var doTime = Date.now() - startTime;
            doTime > 1e3 &&
                Reporter.slowReport({
                    key: 'pageInvoke',
                    cost: doTime,
                    extend: 'at ' + this.__route__ + ' page ' + fn + ' function'
                });
        }
        catch (e) {
            Reporter.thirdErrorReport({
                error: e,
                extend: 'at "' + this.__route__ + '" page ' + fn + ' function'
            });
        }
        return res;
    },
    isEmptyObject: function (obj) {
        for (var t in obj) {
            if (obj.hasOwnProperty(t)) {
                return false;
            }
        }
        return true;
    },
    noop: function () { },
    def: function (obj, attr, value, enumerable) {
        Object.defineProperty(obj, attr, {
            value: value,
            enumerable: !!enumerable,
            writable: true,
            configurable: true
        });
    },
    error: function (title, err) {
        console.group(new Date() + ' ' + title);
        console.error(err);
        console.groupEnd();
    },
    warn: function (title, warn) {
        this.error(title, warn);
    },
    info: function (msg) {
        __wxConfig__ && __wxConfig__.debug && console.info(msg);
    },
    publish: function () {
        var params = Array.prototype.slice.call(arguments), defaultOpt = {
            options: {
                timestamp: Date.now()
            }
        };
        params[1]
            ? (params[1].options = Object.assign(params[1].options || {}, defaultOpt.options))
            : (params[1] = defaultOpt);
        ServiceJSBridge.publish.apply(ServiceJSBridge, params);
    }
};
export default utils;
