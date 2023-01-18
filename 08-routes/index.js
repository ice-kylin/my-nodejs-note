"use strict";

const express = require("express");
const path = require("node:path");
const app = express();
const userRoutes = require("./routes/user");
const goodsRoutes = require("./routes/goods");
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
}

// 使路由生效
app.use("/students", studentsRoutes);
app.use("/user", userRoutes);
app.use("/goods", goodsRoutes);

{
    app.use((req, res) => {
        res.status(404).send("<h1>404 Not Found</h1>");
    });
    app.listen(3000, () => {
        console.log("http://localhost:3000");
    });
}
