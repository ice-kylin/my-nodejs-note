# npm 包管理器

## package.json

- 包的描述文件
- Node.js 中通过该文件对项目进行描述
- 每一个 Node.js 项目都应该有一个 `package.json` 文件
- `script`：用于描述项目中的脚本
  - `start`、`test` 可以直接通过 `npm start`、`npm test` 执行
    - 其它命令需要通过 `npm run <script>` 执行
  - `npm run <script>`：执行 `package.json` 文件中的 `script` 脚本

## 命令

- `npm init`：初始化 `package.json` 文件（需要回答问题）
- `npm init -y`：初始化 `package.json` 文件（采用默认值，不需要回答问题）
- `npm install 包名`：将指定包下载到当前项目中
  - 发生了什么
    1. 将包下载到当前项目的 `node_modules` 目录中
    2. 会在 `package.json` 文件中的 `dependencies` 属性中添加一个新属性
    3. 会自动添加 `package-lock.json` 文件
       - 帮助加速 npm 下载的，不需要关心
- `npm install`：安装 `package.json` 文件中的依赖包
- `npm install 包名 -g`
  - 全局安装
  - 全局安装的通常都是一些工具
- `npm uninstall 包名`：卸载指定包
