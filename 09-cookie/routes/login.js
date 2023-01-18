"use strict";

const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/set", (req, res) => {
    if (req.cookies.username === undefined) {
        const {username, password} = req.body;

        if (username === "admin" && password === "123456") {
            res.cookie("username", "admin");
            res.redirect("/students");
        } else {
            res.send("<h1>用户名或密码错误</h1>");
        }
    }
});

router.get("/get", (req, res) => {
    if (req.cookies.username === undefined) {
        res.redirect("/login");
    } else {
        res.send(`<h1>欢迎 ${req.cookies.username} 登录</h1>`);
    }
});

router.get("/logout", (req, res) => {
    res.cookie("username", "", {maxAge: 0});
    res.redirect("/login");
});

module.exports = router;
