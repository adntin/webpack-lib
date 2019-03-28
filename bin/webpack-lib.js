#! /usr/bin/env node

"use strict"; // 不能少

// 需要找到当前(webpack-app)配置 webpack.config.js
const path = require("path");
const config = require(path.resolve("webpack.config.js"));
const Compiler = require("../lib/Compiler.js");

const compiler = new Compiler(config);
compiler.hooks.afterInstance.call(); // 实例化后, 调用钩子
compiler.run();
// 完成之后, 调用钩子
this.hooks.done.call();
console.log("文件打包成功");
