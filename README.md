# LingQ Blog - 乔的博客 📝

一个美观、现代的个人博客系统，基于 Next.js 14 + Tailwind CSS 构建。

## ✨ 特性

- 🎨 **美观设计** - 简洁现代的 UI，响应式布局
- 📝 **Markdown 支持** - 使用 Markdown 编写文章，支持图文混排
- ⚡ **高性能** - 基于 Next.js 静态生成，加载飞快
- 📱 **响应式** - 完美适配手机、平板、桌面
- 🔍 **SEO 友好** - 内置 SEO 优化
- 🚀 **一键部署** - 支持 Vercel 零配置部署

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
lingq-blog/
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # 全局布局
│   ├── page.tsx           # 首页
│   ├── blog/
│   │   ├── page.tsx       # 博客列表页
│   │   └── [slug]/
│   │       └── page.tsx   # 文章详情页
│   └── about/
│       └── page.tsx       # 关于页面
├── content/               # Markdown 文章
│   └── posts/
│       └── hello-world.md # 示例文章
├── components/            # React 组件
├── public/                # 静态资源（图片等）
└── styles/                # 样式文件
```

## ✍️ 发布文章

在 `content/posts/` 目录下创建新的 `.md` 文件：

```markdown
---
title: "文章标题"
date: "2026-03-04"
description: "文章简介"
coverImage: "/images/cover.jpg"
---

这里是文章内容，支持 **Markdown** 语法！

## 插入图片

![图片描述](/images/photo.jpg)
```

## 🌐 部署

### 部署到 Vercel

1. 推送代码到 GitHub
2. 访问 https://vercel.com/new
3. 导入你的仓库
4. 点击 Deploy

### 部署到其他平台

```bash
npm run build
# 输出目录：.next/
# 或使用 npm run start 运行生产服务器
```

## 📄 许可证

MIT

---

**Happy Blogging!** 🎉
