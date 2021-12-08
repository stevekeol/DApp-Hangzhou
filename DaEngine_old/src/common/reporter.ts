class Reporter {
  surroundThirdByTryCatch(fn, extend) {
    return function () {
      var res
      try {
        res = fn.apply(fn, arguments)
      } catch (error) {
        console.error(error)
        var key = 'thirdScriptError'
        var content = extend ? error.message + ';' + extend : error.message
        this.triggerErrorMessage(key + '\n' + content + '\n' + error.stack)
      }
      return res
    }
  }
  errListenerFns(params) {}
  slowReport(params) {
    console.log('SLOW!!!!!', params)
  }
  thirdErrorReport(params) {
    var error = params.error,
       extend = params.extend;
    console.group('thirdScriptError', extend)
    console.log(error)
    console.groupEnd()
  }
  reportKeyValue(params) {}
  reportIDKey(params) {}
  errorReport(params) {}
  registerErrorListener(fn) {
    typeof fn === 'function' && (this.errListenerFns = fn)
  }
  unRegisterErrorListener() {
    this.errListenerFns = function () {}
  }
  triggerErrorMessage(params) {
    this.errListenerFns(params)
  }  
}

// window.Reporter = 
export default new Reporter();

// var errListenerFns = function () {}
// var utils = {
//   surroundThirdByTryCatch: function (fn, extend) {
//     return function () {
//       var res
//       try {
//         res = fn.apply(fn, arguments)
//       } catch (error) {
//         console.error(error)
//         var key = 'thirdScriptError'
//         var content = extend ? error.message + ';' + extend : error.message
//         utils.triggerErrorMessage(key + '\n' + content + '\n' + error.stack)
//       }
//       return res
//     }
//   },
//   slowReport: function (params) {
//     console.log('SLOW!!!!!', params)
//   },
//   thirdErrorReport: function (params) {
//     var error = params.error,
//       extend = params.extend
//     // utils.errorReport
//     // console.log({
//     //     key: 'thirdScriptError',
//     //     error: error,
//     //     extend: extend
//     // })
//     console.group('thirdScriptError', extend)
//     console.log(error)
//     console.groupEnd()
//   },
//   reportKeyValue: function (params) {},
//   reportIDKey: function (params) {},
//   errorReport: function (params) {},
//   registerErrorListener: function (fn) {
//     typeof fn === 'function' && (errListenerFns = fn)
//   },
//   unRegisterErrorListener: function () {
//     errListenerFns = function () {}
//   },
//   triggerErrorMessage: function (params) {
//     errListenerFns(params)
//   }
// }
// window.Reporter = utils // 全局的变量，不应该随便到处挂载
// module.exports = utils