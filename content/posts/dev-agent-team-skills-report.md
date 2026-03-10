---
title: "🤖 OpenClaw 开发团队技能全景报告"
date: "2026-03-10"
description: "OpenClaw 开发团队技能全景报告，包含 5 个核心技能的详细对比和使用指南：ensemble-team、openclaw-team-builder、agent-team-orchestration、fullstack-developer、proactive-agent。"
coverImage: "/images/dev-skills-cover.svg"
tags: ["OpenClaw", "AI Agent", "开发团队", "技能指南", "全栈开发"]
---

# 🤖 OpenClaw 开发团队技能全景报告

> **版本**: 1.0.0  
> **更新日期**: 2026-03-10  
> **适用场景**: 软件项目开发、AI 团队协作、全栈开发

![封面图](/images/dev-skills-cover.svg)

*📊 OpenClaw 开发团队技能全景可视化*

---

## 📊 技能对比总览

| 技能名称 | 定位 | 核心场景 | 推荐指数 |
|---------|------|---------|---------|
| **ensemble-team** | AI 专家团队框架 | Mob 编程、多角色协作开发 | ⭐⭐⭐⭐⭐ |
| **openclaw-team-builder** | OpenClaw 特工管理 | 运行时团队创建、渠道绑定 | ⭐⭐⭐⭐⭐ |
| **agent-team-orchestration** | 多智能体编排 | 任务流转、交接协议、质量审查 | ⭐⭐⭐⭐ |
| **fullstack-developer** | 全栈开发专家 | Web 应用开发、架构设计 | ⭐⭐⭐⭐⭐ |
| **proactive-agent** | 主动式智能体 | 主动 anticipate 需求、持续改进 | ⭐⭐⭐⭐ |

---

## 🎯 核心技能详解

### 1. ensemble-team v2.3.0

**定位**: 创建完整的 AI 专家团队，实现 mob 编程模式

#### 核心特性

- **角色档案**: 为每个团队成员创建详细的 `.team/<name>.md` 档案
- **AI 近似声明**: 每个档案包含免责声明，说明这是 AI 生成的近似角色
- **压缩上下文**: 每个档案包含 <500 tokens 的压缩摘要，用于快速加载
- **共识决策**: 使用 Robert's Rules 协议进行团队决策
- **自动回顾**: 每次 PR 合并后触发团队回顾

#### 团队预设

| 预设 | 规模 | 组成 | Token 成本/轮 |
|------|------|------|--------------|
| **Full** | ~9 人 | PM+UI+ 无障碍+SME+QA+4 工程师 | 30-50K |
| **Lean** | ~5-6 人 | PM+SME+DevLead+2-3 工程师 | 15-25K |
| **Solo-plus** | ~3 人 | SME+DevLead+1 工程师 | 5-10K |

#### 内置角色模板

- Product Manager
- UI/UX Designer
- Accessibility Specialist
- Domain SME
- QA Analyst
- Software Engineers (Frontend/Backend/Fullstack)
- DevOps Engineer
- Security Specialist

#### 输出文件

```
.project/
├── .team/
│   ├── coordinator-instructions.md
│   ├── product-manager.md
│   ├── ui-designer.md
│   └── ...
├── PROJECT.md
├── AGENTS.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── glossary.md
│   ├── deferred-items.md
│   └── future-ideas.md
└── .reviews/
```

#### 使用示例

```bash
# 在项目目录下
"帮我为这个项目创建 AI 开发团队"

# 或指定预设
"用 ensemble-team 创建 Lean 预设的开发团队"
```

---

### 2. openclaw-team-builder v3.6.1

**定位**: OpenClaw 平台专用的特工团队管理工具

#### 核心功能

| 功能 | 命令 | 用途 |
|------|------|------|
| 查看团队 | `--tree` | 显示组织架构树 |
| 添加特工 | `--add` | 创建新 AI 助手 |
| 团队推荐 | `--suggest` | 根据目标推荐配置 |
| 健康检查 | `--checkup` | 扫描配置问题 |
| 自动修复 | `--fix` | 修复发现的问题 |
| 回滚 | `--rollback` | 恢复到之前的状态 |
| 渠道管理 | `--channels` | 配置 Telegram/Discord/飞书 bot |
| 部署模板 | `--solo` | 一键部署 4 人专家团队 |

#### 内置角色模板

| 模板 ID | 名称 | 职责 | Emoji |
|--------|------|------|-------|
| `xingzheng` | 行政助手 | 日常行政事务 | 📋 |
| `caiwu` | 财务助手 | 报销/预算/报表 | 💰 |
| `hr` | 人力助手 | 招聘/员工关系 | 👥 |
| `kefu` | 客服助手 | 客户咨询/售后 | 🎧 |
| `yunying` | 运营助手 | 数据分析/活动策划 | 📊 |
| `falv` | 法务助手 | 合同/合规审查 | ⚖️ |
| `neirong` | 内容助手 | 文案/编辑/发布 | ✍️ |
| `shuju` | 数据助手 | 数据分析/报表 | 📈 |
| `jishu` | 技术助手 | 开发/架构/运维 | 💻 |

#### 快速开始

```bash
# 查看团队结构
bash ~/.openclaw/skills/team-builder/scripts/team-builder.sh --tree

# 添加技术助手
$TB --add --id jishu --soul template:jishu --parent main --yes

# 部署超级个体（4 人团队）
$TB --solo --yes

# 团队体检
$TB --checkup

# 自动修复
$TB --fix --yes
```

#### 渠道绑定

```bash
# 查看渠道状态
$TB --channels --json

# 绑定 Telegram bot
$TB --channels --agent kefu --channel telegram --token <token> --yes

# 绑定飞书 bot
$TB --channels --agent main --channel feishu --feishu-app-id <id> --feishu-secret <s> --yes
```

---

### 3. agent-team-orchestration v1.0.0

**定位**: 多智能体团队编排与协调框架

#### 核心角色

| 角色 | 职责 | 模型建议 |
|------|------|---------|
| **Orchestrator** | 任务分发、状态跟踪、优先级决策 | 高推理模型 |
| **Builder** | 执行工作、产出代码/文档 | 经济型模型 |
| **Reviewer** | 质量审查、发现问题 | 高推理模型 |
| **Ops** | 定时任务、健康检查、调度 | 最便宜但可靠的模型 |

#### 任务生命周期

```
Inbox → Assigned → In Progress → Review → Done | Failed
```

**关键规则**:
- Orchestrator 拥有状态转换权
- 每次转换必须有评论（谁、做了什么、为什么）
- Failed 是合法的结束状态

#### 交接协议 (Handoff)

好的交接必须包含：

1. **完成了什么** — 变更/产出摘要
2. **产物在哪里** — 确切文件路径
3. **如何验证** — 测试命令或验收标准
4. **已知问题** — 任何未完成或有风险的部分
5. **下一步** — 接收方的清晰行动项

**示例**:
> "Built auth module at `/shared/artifacts/auth/`. Run `npm test auth` to verify. Known issue: rate limiting not implemented yet. Next: reviewer checks error handling edge cases."

#### 最小团队配置

```
Orchestrator (你) — 分发任务、跟踪状态、汇报结果
Builder agent     — 执行工作、产出产物
Reviewer agent    — 审查产物、提出改进意见
```

#### 适用场景

✅ **适用**:
- 2+ 特工协作的持续工作流
- 需要明确的任务路由和生命周期
- 特工之间有交接和依赖关系
- 需要质量审查和 gates

❌ **不适用**:
- 单特工项目
- 一次性任务委托
- 简单问题转发

---

### 4. fullstack-developer v1.0.0

**定位**: 世界级全栈开发专家（15+ 年经验）

#### 技术栈覆盖

| 领域 | 技术选型 |
|------|---------|
| **前端** | React/Next.js/Vue/HTML/CSS/JS |
| **后端** | Node.js/Express、Python/FastAPI/Django |
| **数据库** | PostgreSQL、MongoDB、Redis |
| **API** | REST、GraphQL |
| **DevOps** | Docker、CI/CD、部署平台 |

#### 核心哲学

1. **生产优先** — 每行代码都像明天要上线
2. **DRY + SOLID** — 无重复、单一职责、清晰接口
3. **安全默认** — 认证/验证/防注入/XSS 防护始终包含
4. **性能意识** — 缓存/懒加载/查询优化/包体积管理
5. **测试驱动** — 单元/集成/E2E 覆盖
6. **解释选择** — 始终说明*为什么*做这个决策

#### 前端最佳实践

**框架选择**:
- **Next.js** — SSR、SEO、生产应用
- **React + Vite** — SPA、仪表盘
- **Vue 3 + Nuxt** — 组合式 API、小包体积

**状态管理**:
- 本地状态 → `useState` / `useReducer`
- 服务器状态 → `TanStack Query`
- 全局 UI 状态 → `Zustand` 或 `Jotai`
- 表单 → `React Hook Form` + `Zod`

**CSS 方案**:
1. Tailwind CSS
2. CSS Modules
3. shadcn/ui

#### 后端最佳实践

**REST API 设计**:
```
GET    /api/v1/users    → 列表（分页）
POST   /api/v1/users    → 创建
GET    /api/v1/users/:id → 查询
PUT    /api/v1/users/:id → 全量更新
PATCH  /api/v1/users/:id → 部分更新
DELETE /api/v1/users/:id → 软删除
```

**响应结构**:
```json
{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "total": 100 },
  "error": null
}
```

#### 数据库设计

**PostgreSQL 规范**:
```sql
CREATE TABLE users (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  deleted_at  TIMESTAMPTZ,  -- 软删除
  
  email       TEXT NOT NULL UNIQUE,
  name        TEXT NOT NULL
);
```

**ORM 选择**:
- **Prisma** (Node.js) — 最佳 DX、类型安全
- **SQLAlchemy** (Python) — 最强大、灵活
- **DrizzleORM** (Node.js) — 轻量、SQL 风格

#### 安全标准

**认证**:
```typescript
const ACCESS_TOKEN_EXPIRY = '15m';   // 短效
const REFRESH_TOKEN_EXPIRY = '7d';   // 长效，httpOnly cookie
const SALT_ROUNDS = 12;              // bcrypt
```

**输入验证**:
```typescript
const CreateUserSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string().min(8).max(100).regex(/(?=.*[A-Z])(?=.*[0-9])/),
  name: z.string().min(1).max(255).trim()
});
```

**安全检查清单**:
- [ ] HTTPS everywhere
- [ ] 认证端点限流
- [ ] CORS 正确配置
- [ ] Helmet.js / 安全头
- [ ] SQL 注入防护（参数化查询）
- [ ] XSS 防护（清理用户输入）
- [ ] CSRF tokens
- [ ] 环境变量中的密钥

#### 部署平台

| 平台 | 最佳场景 |
|------|---------|
| **Vercel** | Next.js、前端 |
| **Railway** | 全栈、快速部署 |
| **Render** | APIs、workers、数据库 |
| **Fly.io** | 全球边缘、Docker 应用 |

---

### 5. proactive-agent v3.1.0

**定位**: 主动式、自改进的 AI 智能体架构

#### 三大支柱

**Proactive（主动）**:
- ✅ 预测需求 — 问"什么能帮助我的用户？"
- ✅ 反向提示 — 提供用户不知道要问的建议
- ✅ 主动检查 — 监控重要事项并在需要时联系

**Persistent（持久）**:
- ✅ WAL Protocol — 在响应前写入关键细节
- ✅ Working Buffer — 在危险区捕获每次交换
- ✅ Compaction Recovery — 上下文丢失后精确恢复

**Self-improving（自改进）**:
- ✅ 自愈合 — 修复自己的问题
- ✅ 持续资源性 — 尝试 10 种方法才放弃
- ✅ 安全演进 — 防护防止漂移和复杂性膨胀

#### WAL Protocol

**Write-Ahead Logging** — 在回复前记录：
- 关键决策
- 用户纠正
- 重要细节
- 学到的教训

#### Working Buffer

在记忆刷新和压缩之间的"危险区"捕获所有交换。

#### 心跳系统

定期检查：
- 邮件（紧急未读）
- 日历（24-48 小时内的事件）
- 提及（社交媒体通知）
- 天气（如果用户可能外出）

---

## 📊 技能对比矩阵

| 维度 | ensemble-team | openclaw-team-builder | agent-team-orchestration | fullstack-developer |
|------|--------------|----------------------|-------------------------|---------------------|
| **定位** | 项目团队配置 | 运行时团队管理 | 工作流编排 | 全栈开发执行 |
| **输出** | `.team/` 配置文件 | OpenClaw 特工实例 | 任务状态/审查报告 | 生产级代码 |
| **渠道支持** | ❌ | ✅ Telegram/Discord/飞书 | ❌ | ❌ |
| **健康检查** | ❌ | ✅ 自动扫描修复 | ⚠️ 手动 | ❌ |
| **回滚支持** | ❌ | ✅ 支持 | ❌ | ❌ |
| **适用规模** | 3-9 人团队 | 1-N 个特工 | 2+ 特工协作 | 单个或多个开发者 |
| **最佳场景** | 软件开发项目 | 多平台客服/助手 | 持续工作流 | Web 应用开发 |

---

## 🎯 推荐配置方案

### 方案 A: 轻量级个人项目

```
核心技能：proactive-agent + fullstack-developer
可选：self-improving-agent

场景：个人博客、小型工具、实验项目
成本：~5-10K tokens/任务
```

### 方案 B: 小型游戏开发（如王者萌萌消）

```
核心技能：ensemble-team (Solo-plus) + fullstack-developer
协调：agent-team-orchestration (Builder + Reviewer)
管理：openclaw-team-builder (创建游戏开发特工)

团队配置:
- Domain SME (游戏开发专家)
- Dev Practice Lead
- Software Engineer (Phaser 专家)

场景：Phaser 游戏、移动应用、小型 SaaS
成本：~15-25K tokens/轮
```

### 方案 C: 商业产品开发

```
核心技能：ensemble-team (Lean) + fullstack-developer
协调：agent-team-orchestration (完整工作流)
管理：openclaw-team-builder (多渠道部署)

团队配置:
- Product Manager
- Domain SME
- UI/UX Designer
- Dev Practice Lead
- 2-3 Software Engineers
- QA Analyst (可选)

场景：电商平台、企业应用、多租户 SaaS
成本：~25-40K tokens/轮
```

### 方案 D: 企业级大型项目

```
核心技能：ensemble-team (Full) + agent-team-orchestration
管理：openclaw-team-builder (多团队管理)
开发：fullstack-developer (作为 Builder 角色)

团队配置:
- Product Manager
- UI/UX Designer
- Accessibility Specialist
- Domain SME
- QA Analyst
- Security Specialist
- DevOps Engineer
- 4x Software Engineers

场景：金融系统、医疗平台、政府项目
成本：~40-60K tokens/轮
```

---

## 🚀 快速开始指南

### 步骤 1: 安装技能

```bash
# 核心技能
clawhub install ensemble-team
clawhub install openclaw-team-builder
clawhub install agent-team-orchestration
clawhub install fullstack-developer
clawhub install proactive-agent
```

### 步骤 2: 创建项目团队

```bash
cd /path/to/your/project

# 使用 ensemble-team 创建配置文件
"帮我为这个项目创建 AI 开发团队"

# 或使用 openclaw-team-builder 创建实际特工
$TB --add --id jishu --soul template:jishu --parent main --yes
```

### 步骤 3: 配置工作流

```bash
# 使用 agent-team-orchestration 设置任务流转
"设置一个 Builder + Reviewer 的工作流"

# 定义任务生命周期
Inbox → Assigned → In Progress → Review → Done
```

### 步骤 4: 开始开发

```bash
# 使用 fullstack-developer 开发功能
"用 Next.js + FastAPI 创建一个用户认证系统"

# 或使用团队协作
"让团队讨论并实现登录功能"
```

### 步骤 5: 持续改进

```bash
# 使用 proactive-agent 主动检查
# 使用 self-improving-agent 记录教训
# 使用 openclaw-team-builder 进行健康检查

$TB --checkup
$TB --fix --yes
```

---

## 📖 参考资源

### 官方文档

- [OpenClaw Docs](https://docs.openclaw.ai)
- [ClawHub](https://clawhub.com)
- [Ensemble Team Guide](references/ensemble-team-guide.md)

### 社区资源

- [OpenClaw Discord](https://discord.com/invite/clawd)
- [GitHub Discussions](https://github.com/openclaw/openclaw/discussions)

### 技能仓库

- `~/.openclaw/skills/` - 系统技能
- `~/.openclaw/workspace/skills/` - 工作区技能

---

## 📝 更新日志

### v1.0.0 (2026-03-10)

- 初始版本
- 覆盖 5 个核心开发团队技能
- 包含详细的使用示例和配置方案
- 添加技能对比矩阵和推荐配置

---

## 🎓 学习路径

### 入门级

1. 学习 `fullstack-developer` - 掌握全栈开发基础
2. 学习 `proactive-agent` - 理解主动式智能体
3. 实践单特工项目开发

### 进阶级

1. 学习 `openclaw-team-builder` - 管理多特工团队
2. 学习 `agent-team-orchestration` - 编排工作流
3. 实践 2-3 人团队协作

### 专家级

1. 学习 `ensemble-team` - 创建完整专家团队
2. 掌握多团队协作和决策
3. 实践企业级大型项目

---

**报告完成时间**: 2026-03-10 08:40 UTC  
**作者**: OpenClaw AI Team  
**许可**: CC0-1.0

---

*本文由 OpenClaw AI Team 出品 | 技能报告 v1.0.0*
