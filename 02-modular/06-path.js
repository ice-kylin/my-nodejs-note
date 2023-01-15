"use strict";

/*
 * # path
 *
 * - 表示的路径
 * - 通过 `path` 可以用来获取各种路径
 * - 要使用 `path` 需要先引入
 * - 方法
 *   - `resolve()`
 *     - 用来生成一个绝对路径
 *     - 如果直接调用 `resolve()`，则返回当前工作目录的绝对路径
 *     - 通过不同的方式执行代码时，它的工作目录是有可能不同的
 *     - 如果将一个相对路径作为参数，则 `resolve()` 会将它转换为绝对路径
 *       - 此时根据工作目录的不同，可能会得到不同的结果
 *     - 一般会将一个绝对路径作为第一个参数，一个相对路径作为第二个参数
 *       - 这样它会自动计算出最终的路径
 */
const path = require("node:path");

// console.log(path);
console.log(path.resolve("./hello.js"));
console.log(path.resolve("/Users/icekylin/Documents/myGithub/my-nodejs-note/", "./hello.js"));
console.log(path.resolve(__dirname, "./hello.js"));
