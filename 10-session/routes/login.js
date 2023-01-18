"use strict";

const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/login", (req, res) => {
    const {username, password} = req.body;

    if (username === "admin" && password === "123456") {
        req.session.username = "admin";

        req.session.save(() => {
            res.redirect("/students");
        });
    } else {
        res.send("<h1>用户名或密码错误</h1>");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;
