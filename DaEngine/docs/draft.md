# 一些释疑

## 啥叫DApp
可简单类为部署运行在P2P网络上的应用，因此：
- DApp需完全开源，自主运行，没有实体控制；
- DApp必须要使用加密货币（不一定是宿主系统本身的代币）；

> 前期的开发中，可将DApp暂时收敛为和链无关的轻应用（如寄生在微信中的小程序等）。

因此有四个方面的重点：
- 自定义一套（不会增加开发者认知负荷）的 `View` 规范：以web-component标签（或manifest配置）形式，或自定义DSL形式来约束业务开发方式（基于安全等角度的考虑）
- 编译器Compiler：用来AST转换；
- 运行时框架Runtime：用来暴露各种基本接口，包括DApp的加载，运行，生命周期，路由，插件系统，通信等；
- 提供链接口，以使DApp能具有上链的能力；

## 特征前缀
- DaEngine（文件名等）
- da（前缀）

---

## 为何需要amdEngine.ts
需要在内存中构建一套模块定义和导入的方式。(能否替换成非define和require模式？)