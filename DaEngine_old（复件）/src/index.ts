import './types.d.ts';

// declare global {
//   // 可用Partial
//   interface Window {
//     // service/amdEngine.ts
//     require?: Function,
//     define?: Function,
//     // service/engine/initApp(initPage)
//     Page?: Function,
//     App?: Function,
//     getApp?: Function,
//     getCurrentPages?: Function,
//     // common/reporter.ts
//     Reporter?: Object // 日志
//   }
// }

// import './common/global';

import './assets/css/index.css';
import './common/globalDefined';
import './common/reporter';

import './service/bridge';
import './service/api';
import './service/engine';
import './service/amdEngine';

import './view/api';
import './view/exparser';
import './view/exparser-component';
import './view/virtual-dom';
