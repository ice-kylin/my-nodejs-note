"use strict";

/*
 * # 模块化 2
 *
 */
const a = require("./m1.js").a;
const {b, c, d} = require("./m1.js");

console.log(a);
console.log(b);
console.log(c);
console.log(d);
