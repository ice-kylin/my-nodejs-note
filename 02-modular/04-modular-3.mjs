/*
 * # 模块化 3
 *
 * - 默认情况下，node 中的模块化标准是 CommonJS 规范
 * - 要想使用 ES6 的模块化标准，可以采用以下两种方式
 *   - 使用 `.mjs` 后缀名
 *   - 在 `package.json` 中添加 `"type": "module"` 字段
 *     - 当设置 `"type": "module"` 时，所有的 `.js` 文件都会被当作 ES6 模块来处理
 * - ES 模块不能省略扩展名（官方标准）
 * - ES 模块都是运行在严格模式下的
 * - ES 模块化，在浏览器中同样支持，但是通常不会直接使用
 *   - 通常都会结合打包工具使用
 * - 可以通过 `as` 指定别名
 */
import {a, b, c} from "./m4.mjs"; // 通过 ES 模块化导入的内容都是常量
// import {a as num, b as str, c} from "./m4.mjs";
// import * as m4 from "./m4.mjs"; // 开发时尽量避免 `import *` 的情况
// import sum, {a, b, c} from "./m4.mjs"; // 导入模块的默认导出，默认导出的内容可以随意命名

// console.log(a, b, c);
// console.log(num, str, c);
// console.log(m4.a, m4.b, m4.c);
// console.log(sum(1, 2));
console.log(a, b, c);
