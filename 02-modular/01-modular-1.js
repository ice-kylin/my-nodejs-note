"use strict";

/*
 * # 模块化 1
 *
 * - 早期的网页中，是没有一个实质的模块规范的
 * - 实现模块化的方式，就是最原始的通过 script 标签来引入多个 JS 文件
 * - 问题
 *   1. 无法选择要引入模块的哪些内容
 *   2. 在复杂的模块场景下非常容易出错
 *   3. ...
 * - 于是，就需要在 JS 中引入一个模块化的解决方案
 * - 在 Node.js 中，默认支持的模块化规范叫做 CommonJS
 *   - 在 CommonJS 中，一个 JS 文件就是一个模块
 *
 * ## CommonJS
 *
 * - 引入模块
 *   - 使用 `require(模块的路径)` 函数来引入模块
 *   - 引入自定义模块时
 *     - 模块名需要以 `./` 或者 `../` 开头
 *     - 扩展名可以省略
 *       - 在 CommonJS 中，如果省略扩展名，会自动为文件补全扩展名
 *       - 优先级：`.js` > `.json` > `.node`
 *   - 引入核心模块时
 *     - 直接写核心模块的名字即可
 *     - 也可以在核心模块名前面加上 `node:` 前缀
 */
let m1 = require("./m1.js");
let m2 = require("./m2");
let m3 = require("./m3.cjs");
let path = require("path");
let fs = require("node:fs");
let hello = require("./hello");
console.log(m1);
console.log(m2);
console.log(m3);
console.log(path);
console.log(fs);
console.log(hello);

console.log("\n");

console.log(m1.a);
console.log(m1.b);
console.log(m1.c);
m1.d();
