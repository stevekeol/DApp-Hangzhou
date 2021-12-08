import utils from '../../common/utils'
import { getObjectByPath } from './parsePath'
import organize from './iteratorHandle'

const sysEventKeys = [
  'onLoad',
  'onReady',
  'onShow',
  'onRouteEnd',
  'onHide',
  'onUnload'
]
const isSysAttr = function (key) {
  // 校验e是否为系统事件或属性
  for (var i = 0; i < sysEventKeys.length; ++i) {
    if (sysEventKeys[i] === key) {
      return true
    }
  }
  return key === 'data'
}
var baseAttrs = ['__wxWebviewId__', '__route__']

var isBaseAttr = function (name) {
  return baseAttrs.indexOf(name) !== -1
}

class PageParser {
  constructor () {
    var pageObj =
        arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
      curPage = this,
      webviewId = arguments[1],
      routePath = arguments[2]

    var pageBaseAttr = {
      __wxWebviewId__: webviewId,
      __route__: routePath
    }
    baseAttrs.forEach(function (key) {
      curPage.__defineSetter__(key, function () {
        utils.warn('关键字保护', 'should not change the protected attribute ' + key)
      })
      curPage.__defineGetter__(key, function () {
        return pageBaseAttr[key]
      })
    })
    pageObj.data = pageObj.data || {}
    if (pageObj.route == null) {
      pageObj.route = routePath
    }
    utils.isPlainObject(pageObj.data) ||
      utils.error(
        'Page data error',
        'data must be an object, your data is ' + JSON.stringify(pageObj.data)
      )
    this.data = JSON.parse(JSON.stringify(pageObj.data))
    sysEventKeys.forEach(function (eventName) {
      // 定义页面事件
      curPage[eventName] = function () {
        var eventFun = (pageObj[eventName] || utils.noop).bind(this),
          res
        utils.info(this.__route__ + ': ' + eventName + ' have been invoked')
        try {
          var startTime = Date.now()
          res = eventFun.apply(this, arguments)
          var runTime = Date.now() - startTime
          runTime > 1e3 &&
            Reporter.slowReport({
              key: 'pageInvoke',
              cost: runTime,
              extend:
                'at "' +
                this.__route__ +
                '" page lifeCycleMethod ' +
                eventName +
                ' function'
            })
        } catch (err) {
          Reporter.thirdErrorReport({
            error: err,
            extend:
              'at "' +
              this.__route__ +
              '" page lifeCycleMethod ' +
              eventName +
              ' function'
          })
        }
        return res
      }.bind(curPage)
    })
    var copyPageObjByKey = function (attrName) {
      // 定义页面其它方法与属性
      isBaseAttr(attrName)
        ? utils.warn('关键字保护', "Page's " + attrName + ' is write-protected')
        : isSysAttr(attrName) ||
          (utils.getDataType(pageObj[attrName]) === 'Function'
            ? (curPage[attrName] = function () {
              var res
              try {
                var startTime = Date.now()
                res = pageObj[attrName].apply(this, arguments)
                var runTime = Date.now() - startTime
                runTime > 1e3 &&
                    Reporter.slowReport({
                      key: 'pageInvoke',
                      cost: runTime,
                      extend:
                        'at ' +
                        this.__route__ +
                        ' page ' +
                        attrName +
                        ' function'
                    })
              } catch (err) {
                Reporter.thirdErrorReport({
                  error: err,
                  extend:
                      'at "' +
                      this.__route__ +
                      '" page ' +
                      attrName +
                      ' function'
                })
              }
              return res
            }.bind(curPage))
            : (curPage[attrName] = organize(pageObj[attrName])))
    }
    for (var key in pageObj) {
      copyPageObjByKey(key)
    }
    typeof pageObj.onShareAppMessage === 'function' &&
      ServiceJSBridge.invoke('showShareMenu', {}, utils.info)
  }

  update () {
    utils.warn(
      '将被废弃',
      'Page.update is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]'
    )
  }

  forceUpdate () {
    utils.warn(
      '将被废弃',
      'Page.forceUpdate is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]'
    )
  }

  setData (dataObj, callback) {
    try {
      var type = utils.getDataType(dataObj)
      type !== 'Object' &&
        utils.error(
          '类型错误',
          'setData accepts an Object rather than some ' + type
        )
      for (var key in dataObj) {
        var curValue = getObjectByPath(this.data, key),
          curObj = curValue.obj,
          curKey = curValue.key
        curObj && (curObj[curKey] = organize(dataObj[key]))
      }

      const execCallback = function () {
        callback()
        document.removeEventListener('pageReRender', execCallback)
      }
      if (callback) {
        document.addEventListener('pageReRender', execCallback)
      }
      if (window.reRender) {
        WeixinJSBridge.subscribeHandler('custom_event_appDataChange', {
          data: {
            data: dataObj
          }
        })
      } else {
        // 还没进行第一次渲染
        utils.publish(
          'appDataChange',
          {
            data: {
              data: dataObj
            }
          },
          [this.__wxWebviewId__]
        )
      }
    } catch (e) {
      Reporter.errorReport({
        key: 'jsEnginScriptError',
        error: e,
        extend: 'setData err'
      })
    }
  }
}

export default PageParser
