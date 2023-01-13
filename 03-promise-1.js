"use strict";

/*
 * # Promise 1
 *
 * - 异步调用必须要通过回调函数来返回数据
 *   - 当进行一些复杂的调用时，会出现回调地狱
 * - Promise
 *   - 可以帮助解决异步中的回调函数的问题
 *   - 用来存储数据的容器
 *     - 它拥有着一套特殊的存取数据的方法
 *     - 这个方式使得它里面可以存储异步调用的结果
 *
 * ## 创建 Promise
 *   - 创建 Promise 对象的时候，构造函数需要一个函数作为参数
 *   - Promise 构造函数中的回调函数，会在创建 Promise 时调用；调用时会有两个参数传递进去
 *     - `resolve()` 在执行正常时存储数据
 *     - `reject()` 在执行异常时存储数据
 *       - 通过函数来向 Promise 中添加数据，好处就是可以用来添加异步调用的数据
 */
function sum(a, b, callback) {
    setTimeout(() => {
        let now = Date.now();
        while (Date.now() - now < 1000) {
            // do nothing
        }

        callback(a + b);
    }, 0);
}

const p1 = new Promise((resolve, reject) => {
    console.log("回调函数");

    setTimeout(() => {
        reject("Hello");
    }, 0);
});
const p2 = new Promise((resolve) => {
    sum(1, 2, resolve);
});

console.log(p1);
console.log(p2);

setTimeout(() => {
    console.log(p1);
    console.log(p2);
}, 3000);

/*
 * ## 从 Promise 中读取数据
 *
 * - 可以通过 Promise 的实例方法 `then()` 来读取 Promise 中存储的数据
 *   - `then()` 方法接收两个回调函数作为参数，用来获取 Promise 中存储的数据
 *     - 通过 `resolve()` 存储的数据，会调用第一个函数返回
 *       - 可以在第一个函数中编写处理数据的代码
 *     - 通过 `reject()` 存储的数据或者出现衣长时，会调用第二个函数返回
 *       - 可以在第二个函数中编写处理异常的代码
 */
p1.then(r => {
    console.log(`p1 中的数据：${r}`);
}, e => {
    console.log(`p1 中的错误：${e}`);
});
p2.then(r => {
    console.log(`p2 中的数据：${r}`);
});

/*
 * - Promise 中维护了两个隐藏属性
 *   - `PromiseResult`
 *      - 用来存储数据
 *   - `PromiseState`
 *      - 记录 Promise 的状态
 *        - `pending`：等待中
 *        - `fulfilled`：成功（通过 `resolve()` 存储数据时）
 *        - `rejected`：失败（通过 `reject` 存储数据时）
 *      - 只能修改一次，修改以后永远不会在变化
 * - 流程
 *   1. 当 Promise 创建时，`PromiseState` 初始值为 `pending`
 *   2. 当通过
 *      - `resolve()` 存储数据时
 *        - `PromiseState` 的值会变为 `fulfilled`
 *        - `PromiseResult` 的值会变为存储的数据
 *      - `reject()` 存储数据或出错时
 *        - `PromiseState` 的值会变为 `rejected`
 *        - `PromiseResult` 的值会变为存储的数据或异常对象
 *   3. 当通过 `then()` 读取数据时
 *      - 如果 `PromiseState` 的值为 `filled`，则会调用第一个回调函数来返回数据
 *      - 如果 `PromiseState` 的值为 `rejected`，则会调用第二个回调函数来返回数据
 */
const p3 = new Promise((resolve, reject) => {
    reject("Hello");
});
const p4 = new Promise((resolve, reject) => {
    reject("你好");
    resolve("World");
});
const p5 = new Promise((resolve) => {
    resolve("こんにちは");
});

console.log(p3);
console.log(p4);

p3.then(r => {
    console.log(`p3 中的数据：${r}`);
}, e => {
    console.log(`p3 中的错误：${e}`);
});

/*
 * - `catch()` 用法和 then 类似，但只需要一个回调函数作为参数
 *   - 只会在 Promise 被拒绝时才调用
 *   - 相当于 `then(null, callback)`
 *   - 就是一个专门处理 Promise 异常的方法
 * - `finally()`
 *   - 无论是正常存储数据还是出现异常，`finally()` 总会执行
 *   - 但是 `finally()` 的回调函数中不会接收到数据
 *   - 通常用来编写一些和无论成功与否都要执行的代码
 */
p4.catch(e => {
    console.log(`p4 中的错误：${e}`);
});
p5.finally(() => {
    console.log("p5 执行完毕");
});

console.log("2333");
