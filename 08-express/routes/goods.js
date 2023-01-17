"use strict";

const router = require("express").Router();

router.get("/hello", (req, res) => {
    res.send("<h1>Hello Goods</h1>");
});

module.exports = router;
