const path = require("path");
const fs = require("fs");
const babylon = require("babylon");
const t = require("@babel/types");
const traverse = require("@babel/traverse").default;
const generator = require("@babel/generator").default;
const ejs = require("ejs");

class Compiler {
  constructor(config) {
    this.config = config;
    // 保存入口文件的路径
    this.entryId; // ./src/index.js
    // 保存所有模块依赖
    this.modules = {};
    // 入口路径
    this.entry = config.entry; // ./src/index.js
    // 工作路径, mac 下执行终端命令 pwd
    this.root = process.cwd(); // /Users/devin.lin/Desktop/webpack-app
  }

  getSource(modulePath) {
    let content = fs.readFileSync(modulePath, "utf8");
    const { rules } = this.config.module;
    for (let i = 0, len = rules.length; i < len; i++) {
      const { test, use } = rules[i];
      let l = use.length - 1; // 需要反向解析loader
      // 这个模块需要loader来转换
      if (test.test(modulePath)) {
        function _loader() {
          const loader = require(use[l--]); // 获取对应的loader函数, 反向执行
          content = loader(content); // 执行转换
          // 递归调用loader实现转换功能
          if (l >= 0) {
            _loader();
          }
        }
        _loader();
      }
    }
    return content;
  }

  // 解析源码
  parse(source, parentPath) {
    // https://astexplorer.net/
    // use babylon7 see AST tree
    const ast = babylon.parse(source);
    const dependencies = []; // 依赖数组
    traverse(ast, {
      CallExpression(p) {
        // 替换 require() 方法
        const node = p.node; // 对应的节点
        if (node.callee.name === "require") {
          node.callee.name = "__webpack_require__";
          let moduleName = node.arguments[0].value; // 取到的模块名称 ./a
          moduleName = moduleName + (path.extname(moduleName) ? "" : ".js"); // ./a.js
          moduleName = "./" + path.join(parentPath, moduleName); // ./src/a.js
          dependencies.push(moduleName);
          node.arguments = [t.stringLiteral(moduleName)]; // 修改 AST 树 value
        }
      }
    });
    const sourceCode = generator(ast).code; // 重新生成源码
    return { sourceCode, dependencies };
  }

  // 构建模块
  buildModule(modulePath, isEntry) {
    // 获到源码
    const source = this.getSource(modulePath);
    // 模块名称 modulePath = modulePath - root = src/index.js
    const moduleName = "./" + path.relative(this.root, modulePath); // ./src/index.js
    if (isEntry) {
      this.entryId = moduleName; // todo 是否可以不需要
    }
    // 解析源码, 返回一个依赖列表
    const dirname = path.dirname(moduleName); // ./src
    const { sourceCode, dependencies } = this.parse(source, dirname);
    this.modules[moduleName] = sourceCode;
    // 递归解析
    dependencies.forEach(dep => {
      this.buildModule(path.join(this.root, dep), false);
    });
  }

  // 发射(打包)文件
  emitFile() {
    // 输出路径
    const { output } = this.config;
    const outPath = path.join(output.path, output.filename);
    // 模版路径
    const ejsPath = path.join(__dirname, "template.ejs");
    const template = this.getSource(ejsPath);
    const code = ejs.render(template, {
      entryId: this.entryId,
      modules: this.modules
    });
    this.assets = {};
    this.assets[outPath] = code;
    fs.writeFileSync(outPath, this.assets[outPath]);
  }
  run() {
    // 创建模块的依赖关系
    this.buildModule(path.resolve(this.root, this.entry), true);
    // 发射(打包)文件
    this.emitFile();
    console.log("文件打包成功");
  }
}

module.exports = Compiler;
