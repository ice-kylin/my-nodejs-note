"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
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
    app.use(session({
        secret: "歪比巴卜",
        store: new FileStore({
            path: path.resolve(__dirname, "./data/session"),
            secret: "歪比歪比",
        }),
    }));
}

/*
 * # csrf 攻击
 *
 * - 跨站请求伪造
 * - 现在大部分的浏览器都不会在跨域的情况下自动发送 cookie
 *   - 这个设计就是为了避免 csrf 攻击
 * - 如何解决
 *   1. 使用 referer 头来检查请求的来源
 *   2. 使用验证码
 *   3. 尽量使用 post 请求（结合 token）
 * - token（令牌）
 *   - 可以在创建表单时，随机生成一个令牌，然后将令牌存储到 session 中，并通过 ejs 模板引擎将令牌渲染到表单中
 *   - 用户提交表单时，必须将令牌一起提交，然后在服务器端进行校验
 *   - 可以使用 uuid 来生成令牌
 */
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
