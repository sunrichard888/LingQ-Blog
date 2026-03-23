---
title: "Ensemble Team + Pipeline 技能体系完整指南"
date: "2026-03-23"
tags: ["AI Agent", "多代理协作", "TDD", "代码质量", "工程效能"]
category: "技术"
---

> 🚀 **AI Agent 协作技能体系**
> 
> 完整的 AI 多代理协作系统 — 从团队组建到自动化构建的全流程指南

---

## 🏗️ 技能架构总览

10 个技能协同工作，构建完整的 AI 软件开发流水线

### 架构层次

```
🎯 ensemble-team v3.1.0
   团队组建与协调入口
   ⬇️
   ├── 👤 Supervised Mode (Coordinator 手动管理)
   └── 🏭 Factory Mode (Pipeline 自动编排)
   ⬇️
⚙️ pipeline v4.2.0
   8 阶段自动化构建流水线
   ⬇️
├── 🧪 tdd
├── 🔍 code-review
├── 🧬 mutation-testing
├── 📋 task-management
├── 🚦 ci-integration
├── 🎯 domain-modeling
└── 🐛 debugging-protocol
   ⬇️
🤝 agent-coordination v2.1.0 — 全局协调协议
```

---

## 📚 技能详解

### 🎯 ensemble-team v3.1.0

**核心职责**
- 创建 AI 专家团队结构（`.team/` 目录）
- 生成专家角色 profile（Kent Beck、Sandi Metz 等）
- 建立团队工作约定和架构决策
- 组织 Formation Session 形成会议
- 管理 Driver-Reviewer 轮换机制

**产出文件**
- `.team/<name>.md` — 团队成员 profile
- `AGENTS.md` — 团队约定
- `PROJECT.md` — 项目约束
- `docs/ARCHITECTURE.md` — 架构决策
- `docs/glossary.md` — 领域术语

**触发词**: `创建团队` `mob programming` `ensemble programming` `agent profiles`

**依赖**: 无 | **可选**: pipeline, agent-coordination

---

### 🏭 pipeline v4.2.0

**核心职责**
- 自动化构建阶段编排（Factory Mode）
- 管理垂直切片队列（walking skeleton 优先）
- 自动调度 TDD 配对（Driver + Reviewer）
- 执行 8 阶段质量门禁
- 维护审计追踪（`.factory/audit-trail/`）

**8 阶段流水线**
1. **Decompose** → 任务分解
2. **Slice Readiness** → 就绪评审
3. **Implement** → TDD 实现
4. **Code Review** → 三轮评审
5. **Address Feedback** → 修复反馈
6. **Mutation Testing** → 变异测试
7. **Push/CI** → 推送 + 等待
8. **Merge** → 合并或标记

**触发词**: `factory mode` `自动构建` `slice queue` `quality gates`

**依赖**: 5 个技能 | **独立**: 否

---

### 🧪 tdd v2.4.0

**核心职责**
- 执行 RED-DOMAIN-GREEN-DOMAIN-COMMIT 循环
- 编写失败测试 → 实现 → 重构
- 检测 harness 能力（自动/引导模式）
- 生成 TDD 循环证据
- 原子提交 + 推送

**五步循环**
- **RED** — 写一个失败测试
- **DOMAIN** — 审查领域类型
- **GREEN** — 让测试通过（最简实现）
- **DOMAIN** — 再次审查领域模型
- **COMMIT** — 原子提交

**触发词**: `TDD` `写测试` `test-first` `red green refactor`

**依赖**: 无 | **独立**: 是

---

### 🔍 code-review v2.2.0

**核心职责**
- 三阶段评审（规范→质量→领域）
- PASS/FAIL 裁决 + 严重性评级
- 关键问题阻塞机制
- 生成结构化评审报告
- 写入 `.reviews/` 文件（抗上下文压缩）

**评审阶段**
- **Stage 1:** Spec Compliance
- **Stage 2:** Code Quality
- **Stage 3:** Domain Integrity

**触发词**: `评审代码` `PR review` `代码质量` `检查规范`

**依赖**: domain-modeling | **独立**: 否

---

### 🎯 domain-modeling v1.2.0

**核心职责**
- 检测原始类型痴迷（Primitive Obsession）
- 设计语义类型和值对象
- 让无效状态不可表示
- 执行"解析而非验证"原则
- 避免布尔参数和可交换参数

**核心原则**
- ❌ `sendEmail(email: string)`
- ✅ `sendEmail(email: EmailAddress)`
- ❌ `transfer(amount: number)`
- ✅ `transfer(amount: Money)`

**触发词**: `领域建模` `primitive obsession` `value object` `semantic type`

**依赖**: 无 | **独立**: 是

---

### 🧬 mutation-testing v2.2.1

**核心职责**
- 运行变异测试（cargo-mutants/Stryker/mutmut）
- 强制 100% 杀死率质量门禁
- 分析存活的变异体
- 生成变异测试结果证据包
- 场景覆盖率检查

**变异类型**
- Arithmetic（算术运算）
- Comparison（比较运算）
- Boolean（布尔逻辑）
- Return Value（返回值）
- Statement Removal（语句删除）

**触发词**: `变异测试` `mutation score` `测试质量` `kill rate`

**依赖**: tdd | **独立**: 否

---

### 📋 task-management v1.3.0

**核心职责**
- 层次化任务分解（Feature → Story → Task）
- GWT 接受标准（Given-When-Then）
- 显式依赖声明
- Walking Skeleton 优先策略
- 任务生命周期管理

**任务生命周期**
- **Open** → 待处理
- **Active** → 进行中（仅一个）
- **Closed** → 已完成

**触发词**: `分解任务` `walking skeleton` `任务依赖`

**依赖**: 无 | **独立**: 是

---

### 🚦 ci-integration v1.2.1

**核心职责**
- CI 推送和等待纪律（一次一个 pending）
- 五类失败分类和修复策略
- 自愈能力（lint/format/infra 失败）
- 检测 flaky test
- 生成 CI 结果证据包

**失败分类**
- **Test Failure** → 修复测试或代码
- **Lint Failure** → 自动修复
- **Build Failure** → 修复构建
- **Flaky Test** → 检测并标记
- **Infra Failure** → 重试或修复

**触发词**: `CI 失败` `推送等待` `build broke` `flaky test`

**依赖**: debugging-protocol | **独立**: 否

---

### 🐛 debugging-protocol v1.2.0

**核心职责**
- 四阶段调试流程
- 三击规则（3 次失败后升级）
- 铁律（无调查不修复）
- 假设驱动调试
- 系统性错误调查

**四阶段流程**
1. **Understand** — 读取完整错误，复现
2. **Compare** — 查找工作示例对比
3. **Hypothesize** — 一次测试一个假设
4. **Fix & Verify** — 修复根因并验证

**触发词**: `调试` `为什么失败` `bug` `investigate`

**依赖**: 无 | **独立**: 是

---

### 🤝 agent-coordination v2.1.0

**核心职责**
- 一消息一等待协议（One-Message-Then-Wait）
- 空闲通知即心跳（不主动打扰）
- 禁止轮询循环
- 正确的代理生命周期管理
- 不伪造其他 agent 响应

**核心规则**
- 📬 发送一条完整消息 → 等待回复
- 💓 Idle 通知 = 心跳（默认不处理）
- 🚫 不写 while 轮询循环
- 🛑 不提前关闭 agent

**触发词**: `协调 agent` `多 agent` `agent handoff` `spawn agents`

**依赖**: 无 | **独立**: 是

---

## 🔄 Supervised Mode 工作流程

Coordinator 手动管理的完整开发流程：

```
🎯 用户请求
   ⬇️
👥 ensemble-team (创建团队 profile + Formation Session)
   ⬇️
📋 task-management (分解第一个垂直切片)
   ⬇️
🧪 tdd (RED-DOMAIN-GREEN) (Driver 执行 TDD 循环)
   ⬇️
🔍 code-review + domain-modeling (Reviewers 评审代码)
   ⬇️
🐛 debugging-protocol (修复反馈，如需要)
   ⬇️
🧬 mutation-testing (验证测试质量)
   ⬇️
🚦 ci-integration (推送 + 等待 CI 结果)
   ⬇️
✅ 合并 + 回顾会议 (记录经验教训)
```

---

## 🏭 Factory Mode 工作流程

Pipeline 自动编排的构建流程：

```
🎯 Phase 1: 规划 (coordinator 管理)
   ⬇️
⚙️ Phase 1.5: 工厂配置 (配置 autonomy level)
   ⬇️
🤖 Phase 2: 构建 (pipeline 接管，coordinator 休眠)
   ⬇️
1. Decompose → 2. Readiness → 3. TDD → 4. Review → 
5. Fix → 6. Mutation → 7. CI → 8. Merge
   ⬇️
👤 Phase 3: 评审 (coordinator 恢复 + 人类审查)
   ⬇️
✅ 回顾会议 + 下一切片 (持续交付)
```

---

## 📦 数据流与文件产出

### 📁 `.team/` 目录
- `<name>.md` — 团队成员 profile
- `coordinator-instructions.md` — 协调员指令
- `pairing-history.json` — 配对历史
- `eval-results.md` — 评估结果
- `decision-log.json` — 决策日志

### 📁 `.reviews/` 目录
- `<reviewer>-<task>.md` — 评审文件
- `retro/<member>-<date>.md` — 回顾观察
- `ready-for-rereview-*.md` — 重审信号
- `archive/` — 历史归档

### 📁 `.factory/` 目录 (Factory Mode)
- `config.yaml` — 工厂配置
- `slice-queue.json` — 切片队列
- `audit-trail/` — 审计追踪
- `worktrees/` — 并行工作树

### 📁 `docs/` 目录
- `ARCHITECTURE.md` — 架构决策
- `glossary.md` — 领域术语
- `deferred-items.md` — 延期事项
- `future-ideas.md` — 未来想法

### 📄 根目录文件
- `AGENTS.md` — 团队约定
- `PROJECT.md` — 项目约束
- `CLAUDE.md` / `.cursorrules` — harness 配置
- `.gitignore` — 排除临时文件

### 📊 证据包格式
- `TDD_CYCLE_RESULT` — TDD 循环证据
- `REVIEW_RESULT` — 评审结果
- `MUTATION_RESULT` — 变异测试
- `CI_RESULT` — CI 运行结果

---

## ⚖️ 模式对比

| 特性 | Supervised Mode | Factory Mode |
|------|-----------------|--------------|
| **构建编排** | Coordinator 手动管理每个交接 | Pipeline 控制器自动管理 |
| **决策协议** | 所有决策使用 Robert's Rules | 仅规划阶段使用共识协议 |
| **合并审批** | 人类审批每次合并 | 质量门禁替代人类审批 |
| **配对管理** | Coordinator 选择和监控 | Pipeline 自动调度 TDD 配对 |
| **评审流程** | 每个 PR 协调 mob 评审 | 推送前拉取完整团队评审 |
| **错误处理** | Coordinator 路由所有失败 | Pipeline 处理机械性失败 |
| **适用场景** | ✓ 学习阶段<br>✓ 透明度高<br>✓ 大多数项目 | ✓ 大型项目<br>✓ 高频提交<br>✓ 自动化需求高 |

---

## ⚡ 快速参考

| 场景 | 命令示例 |
|------|----------|
| 🚀 **启动项目** | "帮我创建一个 AI 团队来开发 [项目描述]" |
| 👥 **选择规模** | "用 Solo-plus/Lean/Full 团队规模" |
| 🏭 **Factory Mode** | "用 Factory Mode 运行，启用 pipeline" |
| 🧪 **单独 TDD** | "用 TDD 实现用户登录功能" |
| 🔍 **代码评审** | "评审这个 PR 的领域建模" |
| 📋 **任务分解** | "把这个功能分解成可执行任务" |

---

> 📚 **Ensemble Team + Pipeline 技能体系指南**
> 
> 基于 jwilger/agent-skills 套件整理
> 
> 文档生成时间：2026-03-23
