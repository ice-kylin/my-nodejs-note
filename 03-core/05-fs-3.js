"use strict";

/*
 * # fs 3
 *
 * - `fs.readFile()`：读取文件
 * - `fs.appendFile()`：创建新文件，或将数据添加到已有文件中
 * - `fs.mkdir()`
 *   - 创建目录
 *   - 可以接收一个配置对象作为第二个参数
 *     - 通过该对象，可以对该方法的功能进行配置
 *     - `recursive`：是否递归创建目录
 * - `fs.rmdir()`：删除目录
 * - `fs.rm()`：删除文件
 * - `fs.rename()`：重命名
 * - `fs.copyFile()`：复制文件
 */
const fs = require("node:fs/promises");
const path = require("node:path");

// fs.mkdir(
//     path.resolve(__dirname, "./test-dir/hello"),
//     {recursive: true},
// ).then(() => {
//     console.log("文件夹创建成功");
// }, (err) => {
//     console.log(err.message);
//     console.log("文件夹创建失败");
// });

// fs.rmdir(
//     path.resolve(__dirname, "./test-dir")
//     , {recursive: true},
// ).then(() => {
//     console.log("文件夹删除成功");
// }, (err) => {
//     console.log(err.message);
//     console.log("文件夹删除失败");
// });

fs.rename(
    path.resolve(__dirname, "./hello.txt"),
    path.resolve(__dirname, "./hello.md"),
).then(() => {
    console.log("文件重命名成功");
}).catch((err) => {
    console.log(err.message);
    console.log("文件重命名失败");
});
