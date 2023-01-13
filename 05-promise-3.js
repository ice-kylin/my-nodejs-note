"use strict";

function sum(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a !== "number" || typeof b !== "number") {
                reject("a or b is not a number");
            } else {
                resolve(a + b);
            }
        }, 1000);
    });
}

/*
 * # Promise 3
 *
 * ## 静态方法
 *
 * - `resolve()`：创建一个立即完成的 Promise 对象
 * - `reject()`：创建一个立即拒绝的 Promise 对象
 * - `all()`
 *   - 创建一个 Promise 对象，该对象在所有的 Promise 对象都完成时完成
 *   - 其中有一个报错，就返回错误
 * - `allSettled()`：同时返回多个 Promise 的执行结果（无论成功或失败）
 * - `race()`：返回执行最快的 Promise 对象，不考虑对错
 * - `any()`：返回第一个执行最快的成功的 Promise 对象；如果都失败，返回最后一个失败的结果
 */
// Promise
//     .resolve("Hello")
//     .then(r => console.log(r));
//
// Promise
//     .reject("สวัสดี")
//     .catch(e => console.log(e));
//
// Promise.all([
//     sum(1, 2),
//     sum(3, 4),
//     sum(5, 6),
// ]).then(r => console.log(r));
//
// Promise.all([
//     sum(1, 2),
//     sum(3, 4),
//     Promise.reject("Error"),
//     sum(5, 6),
// ])
//     .then(r => console.log(r))
//     .catch(e => console.log(e));
//
// Promise.allSettled([
//     sum(1, 2),
//     Promise.reject("Error"),
//     sum(3, 4),
//     sum(5, 6),
// ]).then(r => console.log(r));
//
// Promise.race([
//     Promise.reject("Error"),
//     sum(1, 2),
//     Promise.resolve("👋"),
//     sum(3, 4),
//     sum(5, 6),
// ])
//     .then(r => console.log(r))
//     .catch(e => console.log(e));

Promise.any([
    Promise.reject("Error"),
    sum(1, 2),
    Promise.resolve("👋"),
    sum(3, 4),
    sum(5, 6),
])
    .then(r => console.log(r))
    .catch(e => console.log(e));
