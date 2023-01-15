"use strict";

/*
 * - `window` 是浏览器的宿主对象，Node.js 中没有 `window` 对象
 * - `global` 是 Node.js 的全局对象，作用类似于 `window`
 * - ES 标准下，全局对象的标准名是 `globalThis`
 */
// console.log(global);
// console.log(globalThis === global);

/*
 * # 核心模块
 *
 * - 核心模块是 Node.js 自带的模块，可以在 Node.js 中直接使用
 *
 * ## process`
 *
 * - 表示当前的 node 进程
 * - 通过该对象可以获取进程的信息，或者对进程做各种操作
 * - 如何使用
 *   1. `process` 是一个全局对象，可以直接使用
 *   2. 属性和方法
 *      - `exit()`
 *        - 结束当前进程，终止 node 进程
 *      - `nextTick(callback, [...args])`
 *        - 将回调函数放到下一个事件循环中执行
 *        - 将函数插入到 `tick` 队列中
 *          - `tick` 队列中的代码会在下一次事件循环之前执行
 *        - 执行顺序
 *          1. 调用栈
 *          2. `tick` 队列
 *          3. 微任务队列
 *          4. 宏任务队列
 */
// console.log(process);

// console.log(1);
// process.exit();
// console.log(2);

setTimeout(() => {
    console.log(1); // 宏任务队列
});

queueMicrotask(() => {
    console.log(2);  // 微任务队列
});

process.nextTick(() => {
    console.log(3); // tick 队列
});

console.log(4); // 调用栈
