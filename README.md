### 初始化

向 package.json 中添加 bin 配置

### 本地调试

1. 先让 webpack-lib 仓库执行, npm link
2. 再让 webpack-app 仓库执行, npm link webpack-lib

[//]: # "npm link 映射注释"
[//]: # "/Users/devin.lin/.nvm/versions/node/v10.2.0/bin/webpack-lib -> /Users/devin.lin/.nvm/versions/node/v10.2.0/lib/node_modules/webpack-lib/bin/webpack-lib.js"
[//]: # "/Users/devin.lin/.nvm/versions/node/v10.2.0/lib/node_modules/webpack-lib -> /Users/devin.lin/Desktop/webpack-lib"
