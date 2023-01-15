"use strict";

/*
 * # fs 2
 *
 * - `fs.readFile()`：读取文件
 * - `fs.appendFile()`：创建新文件，或将数据添加到已有文件中
 * - `fs.mkdir()`：创建目录
 * - `fs.rmdir()`：删除目录
 * - `fs.rm()`：删除文件
 * - `fs.rename()`：重命名
 * - `fs.copyFile()`：复制文件
 */
const fs = require("node:fs/promises");
const path = require("node:path");

// fs.appendFile(
//     path.resolve(__dirname, "./hi.txt"),
//     "Hello World",
// ).then(r => {
//     console.log(r);
//     console.log("添加成功");
// }).catch(e => {
//     console.log(e);
//     console.log("添加失败");
// });

// 复制一个文件
(async () => {
    try {
        const buf = await fs.readFile(path.resolve(__dirname, "./hi.txt"));
        await fs.appendFile(path.resolve(__dirname, "./hi2.txt"), buf);

        console.log("复制成功");
    } catch (e) {
        console.log(e);
        console.log("复制失败");
    }
})();
