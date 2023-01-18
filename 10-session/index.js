"use strict";

const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session"); // 引入 session
const FileStore = require("session-file-store")(session); // 引入 session-file-store
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
            path: path.resolve(__dirname, "./data/session"), // 指定 session 本地文件的路径
            secret: "歪比歪比", // 加密
            ttl: 3600, // session 的有效时间，默认一个小时
            reapInterval: 3600, // 检查 session 的有效时间间隔，默认一个小时
        }),
    })); // 设置 session 中间件
}

/*
 * # Session
 *
 * ## cookie 的不足
 *
 * - cookie 是由服务器创建，浏览器保存
 *   - 每次浏览器访问服务器时都需要将 cookie 发回服务器
 *   - 导致不能在 cookie 中存储大量数据
 *   - 并且 cookie 是直接存储在客户端的，容易被篡改盗用
 * - 在使用 cookie 时一定不会在 cookie 中存储敏感数据
 * - 所以为了解决 cookie 的不足，希望可以这样
 *   - 将用户的数据统一存储在服务器中
 *   - 每一个用户的数据都有一个对应的 id
 *   - 只需通过 cookie 将 id 发送给浏览器
 *   - 浏览器只需每次访问时将 id 发回服务器即可读取到服务器中存储的数据
 *   - 这个技术称之为 session（会话）
 *
 * ## session
 *
 * - session 是服务器中的一个对象，这个对象用来存储用户的数据
 * - 每一个 session 对象都有一个唯一的 id，id 会通过 cookie 的形式发送给浏览器
 * - 客户端每次访问时只需将存储有 id 的 cookie 发回即可获取它在服务器中存储的数据
 * - 在 Express 中可以通过 `express-session` 中间件来实现 session
 * - 使用步骤
 *   1. 安装：`yarn add express-session`
 *   2. 引入：`const session = require("express-session");`
 *   3. 设置为中间件：`app.use(session());`
 * - session 什么时候会失效
 *   1. 浏览器的 cookie 失效
 *   2. 服务器中的 session 对象失效
 * - `express-session` 默认是将 session 存储在内存中的
 *   - 所以一旦服务器重启，所有的 session 都会丢失
 *   - 所以使用 session 通常会对 session 进行一个持久化的操作（写到文件或数据库）
 * - 如果将 session 存储到文件中，需要引入一个中间件：`session-file-store`
 *   - 使用步骤
 *     1. 安装：`yarn add session-file-store`
 *     2. 引入：`const FileStore = require("session-file-store")(session);`
 *     3. 设置：`app.use(session({store: new FileStore()}));`
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
