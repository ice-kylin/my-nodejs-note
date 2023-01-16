"use strict";

/*
 * # nodemon
 *
 * - 服务器代码修改后必须要重启
 * - 希望有一种方式可以自动监视代码的修改，代码修改后可以自动的重启服务器
 * - 要实现这个功能，需要安装一个模块：nodemon
 * - 使用方式
 *   - 全局安装
 *     - `npm install -g nodemon`
 *     - `yarn global add nodemon`
 *       - 通过 `yarn` 进行全局安装时，默认 `yarn` 的目录不在全局变量中
 *       - 需要手动将路径添加到环境变量中
 *     - 启动
 *       - `nodemon`：运行 `index.js`
 *       - `nodemon 文件名`：运行指定的 JS 文件
 *   - 在项目中安装
 *     - `npm i nodemon -D`
 *     - `yarn add nodemon -D`
 *     - 启动
 *       - `npx nodemon`：运行 `index.js`
 *       - `npx nodemon 文件名`：运行指定的 JS 文件
 */
const express = require("express");
const path = require("node:path");
const app = express();

/*
 * - 服务器中的代码，对于外部来说都是不可见的
 *   - 所以写的 HTML 页面，浏览器是无法直接访问到的
 *   - 如果希望浏览器可以访问，则需要将页面所在目录设置为静态资源目录
 * - 设置 `static` 中间件后，浏览器访问时，会自动去 `public` 目录中查找对应的资源
 */
app.use(
    express.static(
        path.resolve(__dirname, "./public"),
    ),
);

/*
 * - `req.query`：表示查询字符串中的请求参数
 */
app.get("/login", (req, res) => {
    // 获取到用户输入的用户名和密码
    const username = req.query.username;
    const password = req.query.password;
    console.log("--->8---");
    console.log(`用户名：${username}`);
    console.log(`密码：${password}`);

    // 验证用户输入的用户名和密码是否正确
    if (username === "admin" && password === "123") {
        res.send("<h1>登录成功</h1>");
    } else {
        res.send("<h1>登录失败</h1>");
    }
});

app.listen(3000, () => {
    console.log("服务器启动成功");
});
