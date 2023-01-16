"use strict";

const express = require("express");
const path = require("node:path");
const app = express();

// 创建一个数组来存储用户信息
const USERS = [
    {
        username: "admin",
        password: "123",
        nickname: "超管",
    }, {
        username: "satou",
        password: "123",
        nickname: "松坂砂糖",
    },
];

function getLoginInfo(username, password) {
    return new Promise(resolve => {
        setTimeout(() => {
            const user = USERS.find(
                user => user.username === username && user.password === password,
            );

            if (user !== undefined) {
                resolve({
                    status: true,
                    ...user,
                });
            } else {
                resolve({
                    status: false,
                });
            }
        }, 100);
    });
}

function getRegInfo(username, nickname, password) {
    return new Promise(resolve => {
        setTimeout(() => {
            const hasUsername = USERS.some(user => user.username === username);
            const hasNickname = USERS.some(user => user.nickname === nickname);

            if (!(hasUsername || hasNickname)) {
                USERS.push({
                    username,
                    password,
                    nickname,
                });

                resolve({
                    status: true,
                    username: false,
                    nickname: false,
                });
            } else {
                resolve({
                    status: false,
                    username: hasUsername,
                    nickname: hasNickname,
                });
            }
        }, 100);
    });
}

app.use(
    express.static(
        path.resolve(__dirname, "./public"),
    ),
);

app.use(
    express.urlencoded(),
);

app.post("/login", (req, res) => {
    const {username, password} = req.body;

    (async () => {
        const loginInfo = await getLoginInfo(username, password);

        if (loginInfo.status) {
            res.send(`<h1>登录成功：${loginInfo.nickname}</h1>`);
        } else {
            res.send("<h1>登录失败</h1>");
        }
    })();
});

app.post("/register", (req, res) => {
    const {username, nickname, password} = req.body;

    (async () => {
        const regInfo = await getRegInfo(username, nickname, password);

        if (regInfo.status) {
            res.send(`<h1>注册成功</h1>`);
        } else if (regInfo.username) {
            res.send("<h1>注册失败：用户名重复</h1>");
        } else if (regInfo.nickname) {
            res.send("<h1>注册失败：昵称重复</h1>");
        }
    })();
});

app.listen(3000, () => {
    console.log("http://localhost:3000");
});

console.log("Hi, Express");
