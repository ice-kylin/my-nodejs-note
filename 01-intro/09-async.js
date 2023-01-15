"use strict";

/*
 * # async 和 await
 *
 * - Promise 解决了异步调用中回调函数问题
 *   - 虽然通过链式调用解决了回调地狱，但是链式调用太多后还是不好看
 *   - 希望以同步的方式调用异步的代码
 * - 通过 `async` 可以快速的创建异步函数
 *   - 异步函数的返回值会自动封装成一个 Promise 对象
 * - 在 `async` 函数中可以使用一个 `await` 关键字来调用异步函数
 *   - 当通过 `await` 调用异步函数时，会暂停代码的运行
 *   - 直到异步代码执行有结果时，才会将结果返回
 *   - `await` 只能用于 `async` 声明的函数中或 es 模块的顶级作用域中
 *   - `await` 阻塞的只是异步函数中内部的代码，不会影响外部代码
 *   - 通过 await 调用异步代码时，需要通过 try-catch 来捕获异常
 *   - 如果 async 声明的函数中没有写 `await`，那么它里边的代码就会依次执行
 *   - 当时使用 await 调用函数后，当前函数后边的所有代码会在当前函数执行完毕后被放入到微任务队列中
 */
function sum(a, b) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a !== "number" || typeof b !== "number") {
                reject("a or b is not a number");
            } else {
                resolve(a + b);
            }
        });
    });
}

async function asyncFn1() {
    console.log("asyncFn1 执行");

    return 1;
}

const asyncFnResult = asyncFn1();
console.log(asyncFnResult);

asyncFnResult.then(r => {
    console.log(r);
});

async function asyncFn2() {
    console.log("asyncFn2 开始执行");
    let rst = await sum(
        await sum(
            await sum(
                1,
                2,
            ),
            3),
        4);
    console.log(rst);
    console.log("asyncFn2 结束执行");
}

asyncFn2().then(() => {
});

console.log("全局中的代码");
