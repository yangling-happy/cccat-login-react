# CCCAT Login React 项目说明文档 🐾

## 项目概述 📝

CCCAT Login React 是一个基于 React 框架开发的登录页面应用，采用现代化 UI 设计，融入了超萌的猫咪元素 😺，为用户带来简洁又治愈的登录体验。该项目包含完整的前后端实现，支持用户注册与登录功能，并具备响应式设计，可适配不同设备屏幕。

## 项目结构 📂

```
cccat-login-react/
├── .gitignore
├── LICENSE
├── README.md
├── package.json          # 项目总配置
├── start-dev.bat         # 一键启动开发环境脚本（Windows）
├── client/               # 前端 React 应用
│   ├── .env
│   ├── .env.production
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html        # 入口 HTML
│   ├── package-lock.json
│   ├── package.json      # 前端依赖配置
│   ├── public/           # 静态资源
│   │   ├── catPaw.svg    # 猫咪爪印图标
│   │   └── imgs/         # 猫咪图片资源 🖼️
│   ├── src/              # 前端源代码
│   │   ├── components/   # 组件目录
│   │   │   ├── LoginForm.jsx  # 登录表单组件 ✏️
│   │   │   ├── Navbar.jsx     # 导航栏组件 🧭
│   │   │   └── LeftSide.jsx   # 左侧内容组件 🐱
│   │   ├── App.jsx       # 应用入口组件
│   │   ├── main.jsx      # 渲染入口文件
│   │   └── index.css     # 样式文件 🎨
│   └── vite.config.js    # Vite 配置文件
└── server/               # 后端 Express 应用
    ├── app.js            # Express 应用配置
    ├── db/               # 数据库相关
    │   ├── index.js      # 数据库连接配置
    │   ├── cccat.db      # SQLite 数据库文件
    │   └── schema.sql    # 数据库表结构
    ├── node_modules/
    ├── package-lock.json
    ├── package.json      # 后端依赖配置
    ├── routes/           # 路由定义
    │   └── auth.js       # 登录/注册路由
    └── server.js         # 服务器启动文件
```

## 技术栈 🛠️

### 前端

- React 18.2.0：构建用户界面的核心库
- React DOM 18.2.0：浏览器端渲染引擎
- CSS：实现响应式布局与精美样式
- HTML5：搭建页面基础结构
- Vite 5.4.1：前端构建工具（替代传统 Webpack）
- @vitejs/plugin-react：React 集成插件

### 后端

- Node.js：运行环境（前端推荐 v18.18.0，后端推荐 v22.17.1）
- Express 5.1.0：Web 框架
- SQLite：轻量级数据库（使用 better-sqlite3 驱动）
- bcryptjs 3.0.3：密码加密与验证
- cors 2.8.5：处理跨域请求
- nodemon 3.1.10：开发环境自动重启工具

## 功能特点 ✨

1. **响应式设计** 📱💻：自动适配不同屏幕尺寸，移动设备上左侧内容自动隐藏
2. **完整认证流程** 🔐：
   - 前端表单验证（用户名非空、密码规则校验）
   - 后端用户注册与登录逻辑
   - 密码加密存储（bcrypt 算法）
   - 数据库持久化存储（SQLite）
3. **交互效果** 🌟：
   - 猫咪图片悬停时静态图切换为 GIF 动画 🎞️
   - 输入框焦点/悬停时样式变化
   - 表单错误实时提示（红色警示效果）
   - 登录按钮加载状态显示
4. **导航功能** 🧭：顶部导航栏提供全站页面快速链接
5. **视觉设计** 🎨：猫咪主题贯穿始终，粉黄主色调营造温馨可爱氛围

## 组件说明 🔍

1. **LoginForm**：登录表单核心组件，包含输入框、验证逻辑和提交功能，通过 fetch 调用后端接口
2. **Navbar**：顶部导航组件，提供网站各页面入口（Home、Catalog、About、Join us）
3. **LeftSide**：左侧展示组件，猫咪主题内容集中营（移动设备自动隐藏）
4. **App**：应用入口组件，整合所有子组件形成完整页面
5. **main.jsx**：React 渲染入口，将 App 组件挂载到 DOM

## 安装与运行 🚀

### 方法一：一键启动（推荐，Windows 系统）

1. 克隆仓库：

```bash
git clone https://github.com/yangling-happy/cccat-login-react.git
```

2. 进入项目目录：

```bash
cd cccat-login-react
```

3. 安装所有依赖：

```bash
npm run install-all
```

4. 双击运行 `start-dev.bat` 脚本，自动启动前后端服务：
   - 后端服务（Node.js 22.17.1）运行在：http://localhost:5000
   - 前端服务（Node.js 18.18.0）运行在：http://localhost:3000

### 方法二：手动启动

1. 安装依赖（同方法一步骤 1-3）

2. 启动后端服务：

```bash
npm run server
```

3. 启动前端服务（新终端）：

```bash
npm run client
```

4. 或同时启动前后端：

```bash
npm run dev
```

## 构建生产版本 📦

1. 构建前端生产版本：

```bash
npm run build
```

构建完成后，优化后的生产文件将生成在 `client/dist` 目录。

2. 启动生产环境服务器：

```bash
npm start
```

## API 接口说明 🔌

1. **登录接口**：`POST http://localhost:5000/api/auth/login`

   - 请求体：`{ "username": "用户名", "password": "密码" }`
   - 成功响应：`{ "success": true, "message": "登录成功！", "username": "用户名" }`
   - 失败响应：`{ "message": "错误信息" }`（状态码 400/401/500）

2. **注册接口**：`POST http://localhost:5000/api/auth/register`

   - 请求体：`{ "username": "用户名", "password": "密码" }`
   - 成功响应：`{ "message": "注册成功！可以登录了" }`（状态码 201）
   - 失败响应：`{ "message": "错误信息" }`（状态码 400/500）

3. **测试接口**：`GET http://localhost:5000/api/test`
   - 响应：`{ "message": "后端服务器运行正常！" }`

## 数据库说明 🛢️

- 使用 SQLite 轻量级数据库，无需额外安装数据库服务
- 数据库文件：`server/db/cccat.db`（自动生成）
- 表结构定义：`server/db/schema.sql`
- 数据库连接配置：`server/db/index.js`（使用 better-sqlite3 驱动）

## 扩展建议 💡

1. 完善用户认证机制，添加 JWT 令牌验证 🔑
2. 增加"记住密码"功能和自动登录 🔐
3. 开发密码重置流程 🔄
4. 支持多语言切换 🌍
5. 添加社交媒体登录选项（微信/QQ/GitHub）📱
6. 增加用户头像上传功能 🖼️
7. 实现更完善的错误处理和日志记录 📝

## 许可证 📜

本项目采用 MIT 许可证，详情请查看 [LICENSE](LICENSE) 文件。
