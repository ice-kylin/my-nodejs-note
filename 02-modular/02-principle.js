"use strict";

/*
 * # 原理
 *
 * - 所有的 CommonJS 的模块都会被包装到一个函数中
 *   - `(function (exports, require, module, __filename, __dirname) {});`
 */
console.log(arguments);
console.log(__filename); // __filename 表示当前模块的绝对路径
console.log(__dirname); // __dirname 表示当前模块所在的目录的绝对路径
