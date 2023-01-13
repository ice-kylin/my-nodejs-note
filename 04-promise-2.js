"use strict";

/*
 * # Promise 2
 *
 * - 就是一个用来存储数据对象
 * - 但是由于 Promise 存取的方式的特殊，所以可以直接将异步调用的结果存储到 Promise 中
 */
const p1 = new Promise((resolve) => {
    resolve("Привіт");
});

p1.then(r => {
    console.log(r);
}, e => {
    console.log(e);
});

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
 * - Promise 对象中的 `then()`、`catch()`、`finally()` 这三个方法都会返回一个新的 Promise 对象
 *   - Promise 中会存储 `then()`、`catch()` 的回调函数中的返回值
 *   - `finally()` 中的回调函数中的返回值不会存储到新的 Promise 对象中
 */
const p2 = sum(1, 2).then(r => {
    console.log(`sum 1: ${r}`);

    return "Bonjour";
});

p2.then(r => {
    console.log(`p2: ${r}`);
});

setTimeout(() => {
    console.log(p2);
}, 1000);

sum(1, 2)
    .then(r => sum(r, 3))
    .then(r => sum(r, 4))
    .then(r => {
        console.log(`sum 2: ${r}`);
    });

/*
 * - 对 Promise 对象进行链式调用时，后边的方法（`then()` 和 `catch()`）读取的是上一步的执行结果
 * - 如果上一步的执行结果不是当前想要的结果，则跳过当前的方法
 * - 当 Promise 出现异常时，而整个调用链中没有出现 `catch()`，则异常会向外抛出
 */
new Promise((resolve, reject) => {
    reject("여보세요");
}).then(r => {
    console.log(`then 1: ${r}`);

    return "你好";
}).catch(e => {
    console.log(`catch: ${e}`);

    return "Ciao";
}).then(r => {
    console.log(`then 2：${r}`);
});
