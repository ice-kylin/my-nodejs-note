"use strict";

/*
 * # Promise 4
 *
 * - JS 是单线程的，它的运行时基于事件循环机制（Event Loop）
 * - 任务队列
 *   - 在 JS 中，任务队列有两种
 *     - 宏任务队列（Macro Task Queue）
 *       - 大部分代码都去宏任务队列中去排队
 *     - 微任务队列（Micro Task Queue）
 *       - Promise 的回调函数（`then()`、`catch()`、`finally()`）会去微任务队列中排队
 * - 整个流程
 *   1. 执行调用栈中的代码
 *   2. 执行微任务队列中的所有任务
 *   3. 执行宏任务队列中的所有任务
 * - Promise 的执行原理
 *   - Promise 在执行，`then()` 就相当于给 Promise 添加了一个回调函数
 *   - 当 Promise 的状态从 `pending` 变为 `fulfilled` 或者 `rejected` 时，就会执行 then 中的回调函数
 *
 * - `queueMicrotask()`：用来向微任务队列中添加一个任务
 */
queueMicrotask(() => {
    console.log("micro task 1");
});

Promise.resolve().then(() => {
    console.log("promise 1");
});

queueMicrotask(() => {
    console.log("micro task 2");
});
