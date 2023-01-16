"use strict";

/*
 * # param
 */
const express = require("express");
const path = require("node:path");
const app = express();

app.use(
    express.static(
        path.resolve(__dirname, "./public"),
    ),
);

/*
 * - 引入解析请求体的中间件
 */
app.use(
    express.urlencoded(),
);

app.get("/login", (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    console.log("--->8---");
    console.log(`用户名：${username}`);
    console.log(`密码：${password}`);

    if (username === "admin" && password === "123") {
        res.send("<h1>登录成功</h1>");
    } else {
        res.send("<h1>登录失败</h1>");
    }
});

/*
 * - `req.body`：获取请求体参数
 * - 默认情况下，Express 不支持解析 POST 请求体中的参数
 * - 需要通过中间件来为其增加功能
 */
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log("--->8---");
    console.log(`用户名：${username}`);
    console.log(`密码：${password}`);

    if (username === "admin" && password === "123") {
        res.send("<h1>登录成功</h1>");
    } else {
        res.send("<h1>登录失败</h1>");
    }
});

/*
 * - get 请求发送参数的第二种方式
 *   - 在路径中以冒号命名的部分称为 param，在 GET 请求中他可以被解析为请求参数
 *   - param 传参一般不会传递特别复杂的参数
 *   - 约定优于配置
 */
app.get("/hello/:id", (req, res) => {
    console.log(req.params);
    res.send("<h1>这是 Hello 路由</h1>");
});

app.listen(3000, () => {
    console.log("服务器启动成功");
});
