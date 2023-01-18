"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("node:path");
const app = express();
const userRoutes = require("./routes/user");
const goodsRoutes = require("./routes/goods");
const loginRoutes = require("./routes/login");
const studentsRoutes = require("./routes/students");

{
    app.set("view engine", "ejs");
    app.set("views", path.resolve(__dirname, "./views"));
    app.use(
        express.static(
            path.resolve(__dirname, "./public"),
        ),
    );
    app.use(express.urlencoded({extended: true}));
    app.use(cookieParser());
}

/*
 * # cookie
 *
 * - cookie 是 HTTP 协议中用来解决无状态问题的技术
 * - cookie 的本质就是一个头
 *   - 服务器以响应头的形式将 cookie 发送给客户端
 *   - 客户端收到以后会将其存储，并在下次向服务器发送请求时将其传回
 *   - 这样服务器就可以根据 cookie 来识别出客户端了
 * - 需要安装中间件来使得 Express 可以解析 cookie
 *   1. 安装 `cookie-parser`
 *   2. 引入
 *   3. 设置为中间件
 * - cookie 是有有效期的
 *   - 默认情况下，cookie 会在浏览器关闭时失效（一次会话）
 * - cookie 一旦发送给浏览器，就不能在修改了
 *   - 但是可以通过发送新的 cookie 来覆盖旧的 cookie，从而达到修改的目的
 */

// 使路由生效
app.use("/user", userRoutes);
app.use("/goods", goodsRoutes);
app.use("/login", loginRoutes);
app.use("/students", studentsRoutes);

{
    app.use((req, res) => {
        res.status(404).send("<h1>404 Not Found</h1>");
    });
    app.listen(3000, () => {
        console.log("http://localhost:3000");
    });
}
