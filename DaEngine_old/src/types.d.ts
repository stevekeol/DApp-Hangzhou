// declare module global {
//   export interface Window {
//     // require?: Function,
//     // define?: Function,
//     Page?: Function,
//     App?: Function,
//     getApp?: Function,
//     getCurrentPages?: Function
//   }
// }

// declare global {
//   interface Window {
//     Page?: Function,
//     App?: Function,
//     getApp?: Function,
//     getCurrentPages?: Function
//   }
// }

export {}


declare global {
  // 可用Partial
  interface Window {
    // service/amdEngine.ts
    require?: Function,
    define?: Function,

    // service/engine/initApp(initPage)
    Page?: Function,
    App?: Function,
    getApp?: Function,
    getCurrentPages?: Function,

    // common/reporter.ts
    Reporter?: Object, // 日志

    // ！！！
    wx?: any
    __wxRoute?: any,
    __wxConfig__?: any,
    __wxRouteBegin?: any
  }
}

  // interface Window {
  //   // service/amdEngine.ts
  //   require?: Function,
  //   define?: Function,

  //   // service/engine/initApp(initPage)
  //   Page?: Function,
  //   App?: Function,
  //   getApp?: Function,
  //   getCurrentPages?: Function,

  //   // common/reporter.ts
  //   Reporter?: Object, // 日志

  //   // ！！！
  //   wx?: any
  //   __wxRoute?: any,
  //   __wxConfig__?: any,
  //   __wxRouteBegin?: any
  // }