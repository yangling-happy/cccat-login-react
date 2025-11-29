# CCcat Hub 项目说明文档 🐾

## 项目概述 📝
CCcat Hub（原 cccat-login-react）是一款以「萌系猫咪」为核心视觉主题的全栈轻量应用平台，基于 React + Vite + Express + SQLite 技术栈构建。这是我个人作为练习的练手项目，没有很好的架构设计，代码质量也比较粗糙（其实惨不忍睹！）。    

平台以简单的用户认证体系（注册/登录）为基础，整合了基于websocket的聊天页面（chat）、任务管理（Todo）等功能，同时简单做了响应式适配，能在 PC、平板、移动端勉强使用...UI设计上非常粗糙，希望以cc猫ip带来「可爱治愈」的体验，用了粉黄主色调搭配猫咪图片、爪印图标，还加了些图片悬停动效、表单实时反馈等小细节增加趣味性；前后端分离，node版本用nvm分别管理，需要终端拆分分别启动；ws通信相关在f12控制台有反馈打印，可验证交互；数据库采用轻量级数据库（使用 better-sqlite3 驱动），可以查询用户注册数据。

此项目纯粹是个人瞎折腾的产物———是本人摸索学习前端过程中造的不明物！Coding充满了bad case，更谈不上学习价值和技术深度，欢迎大家交流吐槽、一起学习进步，也期待能收到更多优化建议！   

谢谢您的阅读！

## 项目结构 📂

```
cccat-login-react/
├── client/                  # 前端 React 应用（Vite 构建）
│   ├── public/              # 静态资源目录
│   │   ├── imgs/            # 猫咪主题图片资源
│   │   └── catPaw.svg       # 猫咪爪印图标（主题元素）
│   ├── src/                 # 前端源代码
│   │   ├── components/      # 功能组件目录
│   │   │   ├── Chat.jsx     # 实时聊天组件
│   │   │   ├── LeftSide.jsx # 左侧布局组件
│   │   │   ├── LoginForm.jsx # 登录表单组件
│   │   │   ├── Navbar.jsx   # 导航栏组件
│   │   │   ├── RegisterForm.jsx # 注册表单组件
│   │   │   ├── Todo.jsx     # 任务管理组件
│   │   │   └── Welcome.jsx  # 欢迎页组件
│   │   ├── css/             # 样式文件目录（按组件拆分）
│   │   │   ├── Chat.css     # 聊天组件样式
│   │   │   ├── Todo.css     # 任务组件样式
│   │   │   ├── Welcome.css  # 欢迎页样式
│   │   │   └── index.css    # 全局样式
│   │   ├── router/          # 路由配置目录
│   │   │   └── AppRouter.jsx # 应用路由管理
│   │   ├── App.jsx          # 应用入口组件
│   │   └── main.jsx         # 渲染入口文件（Vite 入口）
│   ├── eslint.config.js     # ESLint 配置文件
│   ├── index.html           # 前端入口 HTML
│   ├── package-lock.json    # 前端依赖锁文件
│   ├── package.json         # 前端依赖配置
│   └── vite.config.js       # Vite 构建配置
├── server/                  # 后端 Express 应用
│   ├── db/                  # 数据库相关目录
│   │   ├── index.js         # 数据库连接配置（better-sqlite3）
│   │   └── schema.sql       # 数据库表结构定义
│   ├── routes/              # 接口路由目录
│   │   └── auth.js          # 登录/注册接口路由
│   ├── app.js               # Express 应用配置（中间件、跨域等）
│   ├── package-lock.json    # 后端依赖锁文件
│   ├── package.json         # 后端依赖配置
│   └── server.js            # 后端服务器启动入口
├── LICENSE                  # 项目许可证文件
├── README.md                # 项目说明文档
├── package-lock.json        # 根目录依赖锁文件（全局脚本）
└── package.json             # 根目录配置（全局脚本：安装依赖、启动服务）
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

优化后更清晰、有条理，合并重复内容，强化逻辑层次，同时保留所有核心亮点：

### 功能特点 ✨
1. **响应式适配设计** 📱💻  
   自动兼容 PC/平板/手机等全设备屏幕，移动端自动隐藏左侧非核心内容，聚焦主要操作区域，提升小屏使用体验。

2. **安全完整的认证体系** 🔐  
   - 双重表单验证：前端实时校验（用户名非空、密码规则校验）+ 后端安全校验，避免无效请求  
   - 全流程认证：支持用户注册（用户名唯一校验）、登录（身份验证+状态反馈），流程闭环  
   - 安全存储：基于 bcryptjs 算法加密存储密码，结合 SQLite 数据库实现用户数据持久化，保障数据安全。

3. **灵动交互体验** 🌟  
   - 猫咪主题动效：图片悬停时自动切换静态图→GIF 动画，增添萌感 🎞️  
   - 表单交互反馈：输入框焦点/悬停样式高亮、错误实时红色警示、登录按钮加载状态显示，操作反馈清晰  
   - 视觉过渡自然：页面切换、组件显隐添加柔和过渡动画，提升流畅度。

4. **便捷导航与视觉设计** 🧭🎨  
   - 顶部导航栏：聚合全站核心页面快速链接，跳转高效  
   - 统一萌系风格：以粉黄为主色调，猫咪图片+爪印图标贯穿始终，营造温馨可爱的视觉氛围。

5. **核心扩展功能** 🧩  
   - 实时聊天（Chat.jsx）：支持用户间即时沟通，提升互动性  
   - 任务管理（Todo.jsx）：可添加、管理待办事项，满足日常效率需求。

6. **技术架构亮点** 💡  
   - 前后端分离：React 前端 + Express 后端解耦设计，便于独立开发与维护  
   - 轻量易部署：SQLite 文件型数据库，无需额外配置数据库服务，开箱即用  
   - 高效开发：Vite 驱动前端构建，热更新特性大幅提升开发效率  
   - 规范保障：集成 ESLint 代码校验，确保团队协作时代码风格一致性。


## 组件说明 🔍
### 核心功能组件（`src/components/`）
1. **LoginForm.jsx** - 登录表单组件  
   🔸 功能：提供用户名/密码输入框、表单验证、登录提交按钮  
   🔸 特性：前端实时校验（非空、密码规则）、加载状态显示、错误提示反馈  
   🔸 交互：通过 fetch 调用 `/api/auth/login` 接口，实现身份验证与状态同步

2. **RegisterForm.jsx** - 注册表单组件  
   🔸 功能：新用户注册入口，包含用户名/密码输入、重复密码校验  
   🔸 特性：用户名唯一性校验（前端提示+后端验证）、密码强度提示  
   🔸 交互：调用 `/api/auth/register` 接口提交注册信息，成功后跳转至登录页

3. **Chat.jsx** - 实时聊天组件  
   🔸 功能：用户间即时消息收发、聊天窗口展示  
   🔸 特性：基于 WebSocket 协议（连接 `ws://localhost:${PORT}`），消息实时推送  
   🔸 依赖：配套 `css/Chat.css` 样式文件，确保聊天窗口布局美观

4. **Todo.jsx** - 任务管理组件  
   🔸 功能：待办事项添加、删除、状态切换（已完成/未完成）  
   🔸 特性：任务状态本地存储、列表布局响应式适配  
   🔸 依赖：配套 `css/Todo.css` 样式文件，优化任务卡片视觉效果

5. **Navbar.jsx** - 顶部导航组件  
   🔸 功能：提供全站页面快速跳转（Home、Catalog、About、Join us）  
   🔸 特性：响应式设计，移动端适配折叠样式  
   🔸 交互：登录状态联动（登录后显示用户名，未登录显示「登录/注册」入口）

6. **LeftSide.jsx** - 左侧主题组件  
   🔸 功能：展示猫咪主题图片、萌系文案，强化项目视觉风格  
   🔸 特性：响应式隐藏（移动设备自动折叠，点击图标展开）  
   🔸 资源：依赖 `public/imgs/` 目录下的猫咪图片资源，悬停时切换 GIF 动画

7. **Welcome.jsx** - 欢迎页组件  
   🔸 功能：用户登录后的首页内容展示，聚合核心功能入口（聊天、任务管理）  
   🔸 特性：猫咪主题欢迎文案、功能模块引导卡片  
   🔸 依赖：配套 `css/Welcome.css` 样式文件，营造温馨视觉氛围

### 核心入口与配置组件
8. **App.jsx** - 应用根组件  
   🔸 功能：整合所有子组件，搭建页面基础布局（导航栏+左侧栏+主内容区）  
   🔸 职责：管理全局基础状态（如登录状态、设备适配标识），协调组件间通信

9. **main.jsx** - 渲染入口文件  
   🔸 功能：React 应用启动入口，将 `App.jsx` 组件挂载到 `index.html` 的 DOM 节点上  
   🔸 依赖：基于 Vite 构建，支持快速热更新，提升开发效率

10. **AppRouter.jsx** - 路由配置组件（`src/router/`）  
    🔸 功能：管理全站页面路由映射，实现组件与 URL 地址的关联  
    🔸 核心路由：登录页（`/login`）、注册页（`/register`）、首页（`/`）、聊天页（`/chat`）、任务管理页（`/todo`）  
    🔸 特性：未登录状态拦截（跳转至登录页）、路由切换平滑过渡  
    🔸 依赖：基于 React Router 实现（需确保前端已安装对应依赖）

### 样式与资源关联说明
| 组件文件          | 配套样式文件          | 依赖资源                          |
|-------------------|-----------------------|-----------------------------------|
| `Chat.jsx`        | `css/Chat.css`        | WebSocket 服务、登录用户身份信息  |
| `Todo.jsx`        | `css/Todo.css`        | 本地存储（localStorage）          |
| `Welcome.jsx`     | `css/Welcome.css`     | `public/imgs/` 猫咪主题图片       |
| `LeftSide.jsx`    | `css/index.css`       | `public/imgs/` GIF/PNG 图片、`catPaw.svg` |
| 其他组件（通用）  | `css/index.css`       | 全局样式变量、响应式适配规则      |

### 组件层级关系
```
main.jsx（渲染入口）
└── App.jsx（根组件）
    ├── Navbar.jsx（顶部导航）
    ├── LeftSide.jsx（左侧主题区）
    └── AppRouter.jsx（路由容器）
        ├── LoginForm.jsx（/login 路由）
        ├── RegisterForm.jsx（/register 路由）
        ├── Welcome.jsx（/ 路由，登录后首页）
        ├── Chat.jsx（/chat 路由）
        └── Todo.jsx（/todo 路由）
```

### 组件设计亮点
1. **职责单一**：每个组件聚焦独立功能（如登录、聊天、路由），便于维护和复用；
2. **样式解耦**：组件样式按文件拆分（`css/` 目录），避免样式冲突，支持单独修改；
3. **响应式适配**：`Navbar.jsx`、`LeftSide.jsx` 均支持移动端适配，提升多设备体验；
4. **交互闭环**：表单组件（登录/注册）与后端接口联动，状态反馈清晰，用户操作无歧义。

## 安装与运行 🚀

### 前提条件

- 安装 Node.js（建议使用 nvm 管理版本）
- 安装 Git

### 步骤 1：克隆仓库并安装依赖

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

### 步骤 2：启动服务（手动启动）

#### 后端启动：

1. 打开终端（Git Bash 或其他终端工具）
2. 进入后端目录：

```bash
cd server
```
3.编译 better-sqlite3（必须执行，否则启动报错）

```bash
npm rebuild better-sqlite3
```

4. 切换到指定 Node.js 版本：

```bash
nvm use 22.17.1
```

5. 启动后端服务：

```bash
npm start
```

- 后端服务运行在：http://localhost:5000

#### 前端启动：

1. 打开新的终端
2. 进入前端目录：

```bash
cd client
```

3. 切换到指定 Node.js 版本：

```bash
nvm use 18.18.0
```

4. 启动前端开发服务：

```bash
npm run dev
```

- 前端服务运行在：http://localhost:3000


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
### 基础信息
- 服务器基础地址：`http://localhost:${PORT}`（`PORT` 为后端配置端口，默认通常为 5000，启动日志会显示实际端口）
- WebSocket 服务地址：`ws://localhost:${PORT}`（用于实时聊天功能）
- 数据交互格式：请求体/响应体均为 JSON 格式
- 启动日志示例（启动后终端输出）：
  ```
  🚀 后端服务器已启动：http://localhost:5000
  📌 登录接口：http://localhost:5000/api/auth/login
  📌 注册接口：http://localhost:5000/api/auth/register
  📌 测试接口：http://localhost:5000/api/test
  📌 查询所有用户：http://localhost:5000/api/auth/users
  🔄 WebSocket服务已启动：ws://localhost:5000
  ✅ 服务器已完全启动，可以接受请求
  ```

### 1. 登录接口（用户身份验证）
- 地址：`POST /api/auth/login`（完整地址：`http://localhost:${PORT}/api/auth/login`）
- 请求体：
  ```json
  { "username": "你的用户名", "password": "你的密码" }
  ```
- 成功响应（状态码 200）：
  ```json
  { "success": true, "message": "登录成功！", "username": "你的用户名" }
  ```
- 失败响应：
  - 状态码 400：`{ "success": false, "message": "用户名或密码不能为空" }`（参数校验失败）
  - 状态码 401：`{ "success": false, "message": "用户名或密码错误" }`（身份验证失败）
  - 状态码 500：`{ "success": false, "message": "服务器内部错误" }`（服务端异常）

### 2. 注册接口（新用户创建）
- 地址：`POST /api/auth/register`（完整地址：`http://localhost:${PORT}/api/auth/register`）
- 请求体：
  ```json
  { "username": "你的用户名", "password": "你的密码" }
  ```
- 成功响应（状态码 201）：
  ```json
  { "message": "注册成功！可以登录了" }
  ```
- 失败响应：
  - 状态码 400：`{ "message": "用户名或密码不能为空" }` 或 `{ "message": "用户名已存在" }`（参数校验/唯一性冲突）
  - 状态码 500：`{ "message": "服务器内部错误" }`（服务端异常）

### 3. 测试接口（服务可用性校验）
- 地址：`GET /api/test`（完整地址：`http://localhost:${PORT}/api/test`）
- 作用：快速验证后端服务器是否正常运行
- 响应（状态码 200）：
  ```json
  { "message": "后端服务器运行正常！" }
  ```

### 4. 查询所有用户接口（仅开发/测试用）
- 地址：`GET /api/auth/users`（完整地址：`http://localhost:${PORT}/api/auth/users`）
- 作用：获取数据库中所有已注册用户信息（非生产环境接口，用于测试数据存储效果）
- 成功响应（状态码 200）：
  ```json
  {
    "users": [
      { "id": 1, "username": "用户1", "created_at": "2024-01-01T00:00:00.000Z" },
      { "id": 2, "username": "用户2", "created_at": "2024-01-02T00:00:00.000Z" }
    ]
  }
  ```
- 失败响应（状态码 500）：
  ```json
  { "message": "查询用户失败" }
  ```

### 5. WebSocket 服务（实时聊天支持）
- 地址：`ws://localhost:${PORT}`（与服务器端口一致）
- 作用：为 `Chat.jsx` 组件提供实时通信能力，支持用户间即时消息收发
- 使用说明：前端通过 WebSocket 协议连接该地址，实现消息实时推送与接收

### 接口调用注意事项
1. 所有 POST 接口需设置请求头 `Content-Type: application/json`，否则后端无法解析请求体；
2. 注册/登录时，密码建议满足「6-20 位字符」规则（前端表单已校验，后端同步校验）；
3. `查询所有用户接口` 仅用于开发测试，生产环境需删除或添加权限控制（如管理员鉴权）；
4. WebSocket 连接需在前端登录成功后建立，确保聊天功能与用户身份绑定；
5. 实际接口地址以服务器启动日志输出为准（若修改 `PORT` 配置，需对应调整请求地址）。

## 数据库说明 🛢️

- 使用 SQLite 轻量级数据库，无需额外安装数据库服务
- 数据库文件：`server/db/cccat.db`（自动生成）
- 表结构定义：`server/db/schema.sql`
- 数据库连接配置：`server/db/index.js`（使用 better-sqlite3 驱动）



## 许可证 📜

本项目采用 MIT 许可证，详情请查看 [LICENSE](LICENSE) 文件。
