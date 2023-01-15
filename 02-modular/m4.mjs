/*
 * # ES 模块化
 */
// 向外部导出内容
export let a = 10;
export let b = "歪比巴卜";
export const c = {
    name: "御坂美琴",
};
// 设置默认导出，一个模块中只有一个默认导出
export default function sum(a, b) {
    return a + b;
}

// console.log("m4.mjs");
// a = 20;
