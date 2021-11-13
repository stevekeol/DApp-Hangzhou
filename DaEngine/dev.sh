#!/bin/bash

# 可以将 app 替换成本地小程序的地址
app='demos/demo_tencent'

# 加了 dev 参数就不编译 framwork
if [ "$1" != "dev" ]; then
  # 不压缩代码
  npm run dev:nowatch # 根据webpack配置文件，会将src/index.ts中引入的所有文件编译后写入lib/templates/assets/scripts下面
fi

./bin/DaEngine -b $app # 2 将demo_dapp按内部规则编译后，结合lib/templates/assets/scripts中的js文件，生成wewebTemp的最终文件。