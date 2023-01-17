"use strict";

/*
 * # 模板引擎
 */
const express = require("express");
const fs = require("node:fs/promises");
const path = require("node:path");
const app = express();

const STUDENTS = require("./students.json");

async function updateJSON(o) {
    await fs.writeFile(
        path.join(__dirname, "./students.json"),
        JSON.stringify(o, null, 4),
    );
}

// 将 ejs 设置为默认的模板引擎
app.set("view engine", "ejs");
// 配置模板文件的存放路径
app.set("views", path.resolve(__dirname, "./views"));
app.use(
    express.static(
        path.resolve(__dirname, "./public"),
    ),
);
app.use(
    express.urlencoded({extended: true}),
);

/*
 * - HTML 页面属于静态页面，创建的时候什么样子，用户看到的就是什么样子
 *   - 不会自动跟随服务器中数据的变化而变化
 * - 希望有一个东西，它长得像网页，但是里边可以潜入变量
 *   - 在 Node.js 中被称为模板
 * - 在 Node.js 中，有很多模板引擎可以使用
 * - ejs 是 Node.js 中的一款模板引擎
 *   - 使用步骤
 *     1. 安装 ejs 模块
 *     2. 配置 Express 的模板引擎为 ejs
 *     3. 配置模板文件的存放路径
 *   - 模板引擎需要被 Express 渲染后才能使用
 */
app.get("/students", (req, res) => {
    /*
     * - `res.render()`：渲染一个模板引擎并将其返回给浏览器
     *   - 可以将一个对象作为 render 的第二个参数传递，这样在模板中可以访问到这个对象中的数据
     * - `<%= %>`：在 ejs 中输出内容时，它会自动对字符串中的特殊符号进行转义
     *   - 这个设计主要是为了防止 XSS 攻击
     * - `<%- %>`：输出原始的内容
     * - `<% %>`：在 ejs 中执行 JavaScript 代码
     */
    res.render("students", {
        students: STUDENTS,
    });
});

// 添加学生
app.post("/students/new", (req, res) => {
    // 获取表单数据
    const {name, age, gender, address} = req.body;
    const id = STUDENTS.length > 0 ? STUDENTS[STUDENTS.length - 1].id + 1 : 1;

    // 将数据添加到数组中
    STUDENTS.push({
        id,
        name,
        age,
        gender: gender === "male" ? "男" : "女",
        address,
    });

    (async () => {
        // 将数据写入 JSON 文件
        await updateJSON(STUDENTS);

        /*
         * - `res.redirect()`：用来发起请求重定向
         *   - 重定向的作用是告诉浏览器你向另外一个地址再发起一次请求
         */
        // 重定向到学生列表页面
        res.redirect("/students");
    })();
});

// 删除学生
app.get("/students/delete/:id", (req, res) => {
    const id = +(req.params.id);

    // 删除数组中的数据
    const index = STUDENTS.findIndex((student) => student.id === id);
    STUDENTS.splice(index, 1);

    (async () => {
        // 将数据写入 JSON 文件
        await updateJSON(STUDENTS);

        // 重定向到学生列表页面
        res.redirect("/students");
    })();
});

// 编辑学生
app.get("/students/edit/:id", (req, res) => {
    const id = Number(req.params.id);

    // 获取学生信息
    const student = STUDENTS.find((student) => student.id === id);

    res.render("edit", {
        student,
    });
});

// 修改学生
app.post("/students/modify", (req, res) => {
    // 获取表单数据
    const {id, name, age, gender, address} = req.body;

    // 修改数组中的数据
    const index = STUDENTS.findIndex((student) => student.id === Number(id));
    STUDENTS[index] = {
        id: +id,
        name,
        age,
        gender: gender === "male" ? "男" : "女",
        address,
    };

    (async () => {
        // 将数据写入 JSON 文件
        await updateJSON(STUDENTS);

        // 重定向到学生列表页面
        res.redirect("/students");
    })();
});

// 可以在所有路由的后边配置错误路由
app.use((req, res) => {
    // 只要这个中间件一执行，说明上边的地址都没有匹配到
    res.status(404).send("<h1>404 Not Found</h1>");
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
