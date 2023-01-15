/*
 * - 在定义模块时，模块中的内容默认是不能被外部查看的
 *   - 可以通过 `exports` 来向外部暴露模块中的成员
 * - 访问 exports 的方式有两种
 *   - `exports`
 *   - `module.exports`
 * - 当在其它模块中引入当前模块时，`require()` 返回的就是 `exports` 对象
 * - 可以将希望暴露给外部的成员，设置为 `exports` 的属性
 */
// console.log("我是 m1 模块");
// console.log(exports === module.exports);
// console.log(exports);

/*
 * - 可以通过 `exports` 一个一个的导出值
 */
// exports.a = "松坂砂糖";
// exports.b = "神户盐";
// exports.c = {
//     name: "松坂砂糖",
//     age: 18,
// };
// exports.d = function () {
//     console.log("我是 d");
// };

/*
 * - 也可以通过 `module.exports` 同时导出多个值
 */
module.exports = {
    a: "松坂砂糖",
    b: "神户盐",
    c: {
        name: "松坂砂糖",
        age: 18,
    },
    d() {
        console.log("我是 d");
    },
};
