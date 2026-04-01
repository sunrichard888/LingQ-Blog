# 每日科技新闻自动化流程

> 🦞 虾博自动生成的科技日报，每天午夜准时推送

---

## 📋 流程概览

```
每天 00:00 (Asia/Shanghai)
    ↓
[Tavily 搜索] 最近 24h 科技新闻
    ↓
[整理筛选] 前 20 条热点
    ↓
[生成 SVG 封面] 1200x630px，含日期 + 头条
    ↓
[生成 MD 文章] Frontmatter 引用封面
    ↓
[Git 推送] 提交到 GitHub (sunrichard888/LingQ-Blog)
    ↓
[QQ 汇报] 通知乔叔完成情况
```

---

## 🎨 封面生成规范

### 文件命名
- **SVG 文件**: `daily-tech-news-YYYY-MM-DD.svg`
- **MD 文件**: `daily-tech-news-YYYY-MM-DD.md`
- **存放路径**:
  - 封面：`/public/images/daily-tech-news-YYYY-MM-DD.svg`
  - 文章：`/content/posts/daily-tech-news-YYYY-MM-DD.md`

### 封面设计
```svg
尺寸：1200x630px (Open Graph 标准)
背景：深蓝渐变 (#1a1a2e → #16213e)
强调色：青色→绿色渐变 (#00d9ff → #00ff88)
元素：
  - 标题："每日科技新闻" + "Daily Tech News"
  - 日期：YYYY-MM-DD
  - 头条标题：当日最重要的新闻
  - 装饰：网格线 + 圆形装饰
```

### 文章 Frontmatter
```yaml
---
title: "每日科技新闻 YYYY-MM-DD | 头条 1 + 头条 2"
date: YYYY-MM-DDT00:00:00+08:00
draft: false
tags: ["科技新闻", "AI", "芯片", "半导体", ...]
categories: ["每日新闻"]
coverImage: "/images/daily-tech-news-YYYY-MM-DD.svg"  # ⚠️ 必须用 coverImage（博客模板要求）
summary: "简短摘要，包含 2-3 条核心新闻"
---
```

---

## ⚙️ Cron 任务配置

### Job 详情
- **Job ID**: `7fa7d832-0bf7-4ed6-b7b4-e3b39d7542e5`
- **名称**: 每日科技新闻推送
- **Schedule**: `0 0 * * *` (每天午夜 00:00，Asia/Shanghai)
- **Session Target**: `isolated` (独立会话执行)
- **Payload**:
  ```
  1. 用 tavily 搜索最近 24h 科技新闻
  2. 整理前 20 条
  3. 生成 md+SVG 封面到 /root/.openclaw/workspace-qq-writer/LingQ-Blog/
  4. SVG 封面到 /public/images/
  5. 在 LingQ-Blog 目录 git add/commit/push 到 GitHub
  6. QQ 汇报完成
  ```

### 查看任务状态
```bash
# 查看 cron 任务列表
openclaw cron list

# 查看任务运行历史
openclaw cron runs --job-id 7fa7d832-0bf7-4ed6-b7b4-e3b39d7542e5
```

---

## 📁 文件结构

```
LingQ-Blog/
├── content/
│   └── posts/
│       ├── daily-tech-news-2026-03-26.md
│       ├── daily-tech-news-2026-03-27.md
│       ├── daily-tech-news-2026-03-28.md
│       └── ...
├── public/
│   └── images/
│       ├── daily-tech-news-2026-03-26-cover.svg
│       ├── daily-tech-news-2026-03-27.svg
│       ├── daily-tech-news-2026-03-28.svg
│       └── ...
└── README-每日科技新闻.md (本文件)
```

---

## ✅ 验证清单

每次任务执行后，检查：

- [ ] SVG 封面文件已生成（`/public/images/daily-tech-news-YYYY-MM-DD.svg`）
- [ ] MD 文章已生成（`/content/posts/daily-tech-news-YYYY-MM-DD.md`）
- [ ] Frontmatter 中 `cover` 字段正确引用封面路径
- [ ] Git 提交已推送到 GitHub
- [ ] Next.js 博客能正常渲染封面（访问 `/posts/daily-tech-news-YYYY-MM-DD`）

---

## ⚠️ 已知问题

### QQ 消息偶尔失败
- **现象**: Cron 任务报告 `"⚠️ ✉️ Message failed"` 错误
- **影响**: 不影响封面生成和博客推送，仅 QQ 通知失败
- **状态**: `delivered: true, deliveryStatus: "delivered"` 说明 delivery 本身成功
- **后续**: 可优化 QQ 消息重试机制

### 封面命名不一致（历史遗留）
- 03-26: `daily-tech-news-2026-03-26-cover.svg` (旧规范)
- 03-27+: `daily-tech-news-2026-03-27.svg` (新规范)
- **建议**: 统一为不带 `-cover` 后缀的命名

---

## 🛠️ 手动触发

如需手动触发今日新闻生成：

```bash
openclaw cron run --job-id 7fa7d832-0bf7-4ed6-b7b4-e3b39d7542e5
```

---

## 📊 运行统计

- **首次运行**: 2026-03-26
- **累计运行**: 3 次 (03-26, 03-27, 03-28)
- **成功率**: 100% (封面生成 + 博客推送)
- **通知成功率**: ~67% (偶尔 QQ 消息失败)

---

_最后更新：2026-03-28 by 虾博 🦞_
