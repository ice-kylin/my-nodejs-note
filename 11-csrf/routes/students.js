"use strict";

const router = require("express").Router();
const fs = require("node:fs/promises");
const path = require("node:path");
const uuid = require("uuid").v4; // 引入 uuid

const STUDENTS = require("../data/students.json");
const ROOT_PATH = "/students";

async function updateJSON(o) {
  await fs.writeFile(
    path.join(__dirname, "../data/students.json"),
    JSON.stringify(o)
  );
}

router.use((req, res, next) => {
  if (req.session.username === "admin") {
    next();
  } else {
    res.redirect("/login");
  }
});

router.get("/", (req, res) => {
  if (req.session.csrfToken === null || req.session.csrfToken === undefined) {
    const csrfToken = uuid(); // 生成令牌
    console.log(csrfToken);
    req.session.csrfToken = csrfToken; // 将令牌存储到 session 中
    req.session.save(() => {
      res.render("students", {
        students: STUDENTS,
        username: req.session.username,
        csrfToken,
      });
    });
  } else {
    res.render("students", {
      students: STUDENTS,
      username: req.session.username,
      csrfToken: req.session.csrfToken,
    });
  }
});

// 添加学生
router.post("/new", (req, res) => {
  const { _csrf: csrfToken, name, age, gender, address } = req.body;
  console.log(csrfToken);
  console.log(req.session.csrfToken);

  if (csrfToken === req.session.csrfToken) {
    req.session.csrfToken = null;
    req.session.save(() => {
      const id = STUDENTS.length > 0 ? STUDENTS[STUDENTS.length - 1].id + 1 : 1;

      STUDENTS.push({
        id,
        name,
        age,
        gender: gender === "male" ? "男" : "女",
        address,
      });

      (async () => {
        await updateJSON(STUDENTS);
        res.redirect(ROOT_PATH);
      })();
    });
  } else {
    res.status(403).send("403 Forbidden");
  }
});

// 删除学生
router.get("/delete/:id", (req, res) => {
  const id = +req.params.id;

  const index = STUDENTS.findIndex((student) => student.id === id);
  STUDENTS.splice(index, 1);

  (async () => {
    await updateJSON(STUDENTS);
    res.redirect(ROOT_PATH);
  })();
});

// 编辑学生
router.get("/edit/:id", (req, res) => {
  const id = +req.params.id;

  const student = STUDENTS.find((student) => student.id === id);
  res.render("edit", {
    student,
  });
});

// 修改学生
router.post("/modify", (req, res) => {
  const { id, name, age, gender, address } = req.body;

  const index = STUDENTS.findIndex((student) => student.id === Number(id));
  STUDENTS[index] = {
    id: +id,
    name,
    age,
    gender: gender === "male" ? "男" : "女",
    address,
  };

  (async () => {
    await updateJSON(STUDENTS);
    res.redirect(ROOT_PATH);
  })();
});

module.exports = router;
