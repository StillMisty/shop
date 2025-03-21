# Shop

作为某人在辜的Web前端框架应用与开发课的作业
开源地址 https://github.com/StillMisty/shop
为了整合近期所学，使用的技术栈比较激进。
你会看到有的地方使用比较老旧的写法，有的部分又十分激进，那就是我在边学边写。

- Nuxt3 : SSR 的全栈框架
- Vite : 构建工具
- Vue3 : 前端框架
- Vue Router : 路由
- Pinia : 状态管理
- Tailwind CSS :  原子化的 CSS 框架
- TypeScript : 为了更好的类型检查
- GSAP : 动画库
- auto-animate : 动画库
- Element Plus : 组件库
- TanStack Query : 数据请求库
- Lenis : 处理平滑滚动

本来还想用 shadcn-vue 这个无 UI 组件库，但在我开写之前它并未支持 Tailwind CSS v4，所以只能用 Element Plus 了

## Setup

使用 pnpm 作为包管理器

```bash
# 下载依赖
pnpm install
```

## Development Server

启动开发 `http://localhost:3000`:

```bash
pnpm dev
```

## Production

打包生产环境:

```bash
pnpm build
```
