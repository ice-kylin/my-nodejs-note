"use strict";

/*
 * # Express
 *
 * - Express 是 Node.js 的服务器软件
 * - 通过 Express 可以快速的在 Node.js 中搭建一个 Web 服务器
 * - 使用步骤
 *   1. 创建并初始化项目
 *   2. 安装 Express
 *   3. 创建 `index.js` 并编写代码
 */
// 引入 express
const express = require("express");

// 获取服务器的实例（对象）
const app = express();

/*
 * - 如果希望服务器可以正常访问，则需要为服务器设置路由
 *   - 路由可以根据不同的请求方式和请求地址来处理用户的请求
 * - 在路由中应该做两件事
 *   1. 读取用户的请求（request）
 *   2. 根据用户的请求返回响应（response）
 * - 路由的回调函数执行时，会接收到三个参数
 *   1. request
 *      - 表示用户的请求信息
 *      - 通过 req 可以获取用户传递数据
 *   2. response
 *      - 表示服务器的响应信息
 *      - 通过 res 可以向用户返回数据
 *   3. next
 *      - 是一个函数
 *      - 调用函数后，可以触发后续的路由
 *      - 不能在响应处理完毕后调用
 * - 中间件
 *   - 在 Express 中，使用 `app.use()` 来注册中间件
 *   - 中间件的作用和路由类似，用法也类似
 *   - 但是中间件不区分请求的方式，只看路径
 *   - 和路由的区别
 *     - 会匹配所有请求
 *     - 路径设置的时父目录
 */
app.use((req, res, next) => {
    console.log(1, req.method, req.url);

    // res.send("<h1>这是通过中间件返回的响应 1</h1>");
    next();
});

app.use((req, res) => {
    console.log(2, req.method, req.url);

    res.send("<h1>这是通过中间件返回的响应 2</h1>");
});

app.use((req, res) => {
    console.log(3, req.method, req.url);

    res.send("<h1>这是通过中间件返回的响应 3</h1>");
});

// app.get("/", (req, res) => {
//     console.log("有人访问了服务器");
//     console.log(req.url);
//
//     /*
//      * - `res.sendStatus()`：向客户端发送响应状态码
//      * - `res.status()`：用来设置响应状态码，但是并不发送
//      * - `res.send()`：设置并发送响应体
//      */
//     // res.sendStatus(404);
//     // res.status(404);
//     res.status(200);
//     // res.send("<h1>你的请求没问题，但就是不给你看哈🤪</h1>");
//     res.send("<h1>歪比巴卜</h1>");
// });

/*
 * ## 启动服务器
 *
 * - `app.listen(端口号)`：用来启动服务器
 *   - 服务器启动后，便可以通过 `3000` 端口来访问了
 */
app.listen(3000, () => {
    console.log("服务器启动成功");
});

console.log("Hi, Express");
