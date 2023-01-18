"use strict";

/*
 * # Router
 *
 * - router 是 Express 中创建的一个对象
 * - router 实际上是一个中间件，可以在该中间件上去绑定各种路由以及其它的中间件
 */
// 创建 router 对象
const router = require("express").Router();

// 绑定路由
router.get("/hello", (req, res) => {
    res.send("<h1>Hello User</h1>");
});

// 将 router 暴露到模块外
module.exports = router;
