"use strict";

/*
 * # fs 1
 *
 * - `fs` 用来帮助 Node.js 来操作磁盘中的文件
 * - 文件操作也就是所谓的 I/O 操作
 *
 */
// const fs = require("node:fs");
const fs = require("node:fs/promises");
const path = require("node:path");

/*
 * - `readFileSync()`：同步的读取的方法，会阻塞后边代码的执行
 *   - 当通过 fs 模块读取磁盘中的数据时，读取到的数据总会以 Buffer 对象的形式返回
 *   - Buffer 是一个临时用来存储数据的缓冲区
 */
// let buf = fs.readFileSync(
//     path.resolve(__dirname, "./hello.txt"),
// );
// console.log(buf);
// console.log(buf.toString());

/*
 * - `readFile()`：异步的读取的方法，不会阻塞后边代码的执行
 */
// fs.readFile(path.resolve(__dirname, "./hello.txt"), (err, buffer) => {
//     console.log(err);
//
//     if (err) {
//         console.log("出错了");
//     } else {
//         console.log(buffer);
//         console.log(buffer.toString());
//     }
// });

/*
 * - `Promise` 版本的 fs 的方法
 */
// fs.readFile(path.resolve(__dirname, "./hello.txt")).then(buf => {
//     console.log(buf);
//     console.log(buf.toString());
// }).catch(err => {
//     console.log(err);
//     console.log("出错了");
// });

(async () => {
    try {
        const buf = await fs.readFile(path.resolve(__dirname, "./hello.txt"));

        console.log(buf);
        console.log(buf.toString());
    } catch (e) {
        console.log(e);
        console.log("出错了");
    }
})();
