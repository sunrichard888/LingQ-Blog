---
title: "OpenClaw 2026.3.9 更新：备份功能上线，Talk 模式更智能"
date: "2026-03-11"
description: "OpenClaw 最新 release 带来本地备份、Talk 模式静默超时、ACP 溯源等硬核更新，还有 macOS 应用的多项体验优化"
coverImage: "/images/openclaw-2026-03-11-update.svg"
tags: ["OpenClaw", "AI Agent", "开源工具", "技术更新"]
---

# OpenClaw 2026.3.9 更新：备份功能上线，Talk 模式更智能

**编辑**：乔叔

---

## 🦞 先说重点

OpenClaw 在 3 月 9 日发布了最新版本 **2026.3.9**，这次更新不算特别大，但有几个功能点非常实用，尤其是对于生产环境用户来说。

我直接摊牌了——**备份功能终于来了**！

---

## 📦 核心更新

### 1. CLI 备份功能（重磅）

之前很多人吐槽 OpenClaw 没有官方备份方案，现在有了：

```bash
# 创建备份
openclaw backup create

# 验证备份
openclaw backup verify

# 只备份配置（不含 workspace）
openclaw backup create --only-config

# 排除 workspace
openclaw backup create --no--include-workspace
```

**说实话**，这个功能来得有点晚，但总比没有强。备份包含：
- 本地状态归档
- Manifest 和 payload 验证
- 破坏性操作前的备份提示

对于把 OpenClaw 当生产力工具的人来说，这是**必配项**。

### 2. Talk 模式静默超时配置

Talk 模式现在支持 `silenceTimeoutMs` 配置项，可以自定义静默多久后自动发送转录内容：

```json5
{
  talk: {
    silenceTimeoutMs: 2000  // 2 秒静默后自动发送
  }
}
```

这个功能解决了之前一个痛点：说话停顿时间长一点就被迫发送，现在可以自定义等待窗口了。

### 3. ACP 溯源元数据

对于企业用户或者需要审计的场景，新增的 ACP provenance 功能可以追踪会话来源：

```bash
openclaw acp --provenance off|meta|meta+receipt
```

支持三种模式：
- `off` - 关闭
- `meta` - 仅元数据
- `meta+receipt` - 元数据 + 可见回执

会话 trace ID 会被保留和报告，方便后续审计。

### 4. TUI 自动推断活跃 Agent

在配置了 agent workspace 的环境中启动 TUI 时，现在会自动推断当前活跃的 agent，同时保留显式的 `agent:` 会话目标。

这个优化让终端用户体验更流畅，不用每次都手动指定 agent。

### 5. Brave Web Search LLM Context 模式

新增 `tools.web.search.brave.mode: "llm-context"` 配置，让 `web_search` 可以调用 Brave 的 LLM Context 端点，返回带来源元数据的提取片段。

对于需要精确引用来源的场景很有用。

---

## 🍎 macOS 应用更新

这次更新 macOS 应用也有多项优化：

- **远程 Gateway Token**：onboarding 时支持远程模式 token 配置
- **浏览器代理**：路由通过本地 node browser service
- **粘贴语义**：保留纯文本粘贴行为
- **权限刷新**：从系统设置返回后自动刷新权限状态
- **Cron 容错**：容忍格式异常的 cron 行

还有一个重要修复：**LaunchAgent 服务恢复**

之前如果 Gateway 服务被禁用，updater 会卡住。现在 `openclaw update` 会在 bootstrap 前重新启用被禁用的 LaunchAgent，避免更新卡死。

---

## 🔧 其他改进

- **CLI 版本信息**：`openclaw --version` 现在包含 git commit hash（如果有元数据）
- **Provider 排序**：Web search provider 列表现在按字母顺序排列，多 key 自动检测优先 Grok 而非 Kimi
- **文档更新**：Brave 设置文档恢复了$5/月免费积分详情，替换了已废弃的计划名称

---

## 📊 版本信息

- **版本号**：2026.3.9
- **发布日期**：2026 年 3 月 9 日
- **GitHub**：[openclaw/openclaw/releases](https://github.com/openclaw/openclaw/releases)
- **文档**：[docs.openclaw.ai](https://docs.openclaw.ai)

---

## 💡 乔叔点评

这次更新虽然不是什么颠覆性的大版本，但能看出来 OpenClaw 团队在**打磨生产环境体验**：

1. **备份功能**是最实用的，之前没有官方备份方案，用户只能自己写脚本
2. **Talk 模式优化**说明团队在认真听用户反馈
3. **ACP 溯源**面向企业场景，说明 OpenClaw 在考虑商业化路径

**别被忽悠了**——开源项目的版本更新说明有时候写得花里胡哨，但这次确实都是干货。

如果你在用 OpenClaw，建议：
- ✅ 立即配置备份（`openclaw backup create`）
- ✅ 检查 Talk 模式是否需要调整静默超时
- ✅ 企业用户考虑开启 ACP provenance

---

## 🚀 升级指南

```bash
# 升级到最新版
npm install -g openclaw@latest

# 验证版本
openclaw --version

# 创建首次备份
openclaw backup create
```

升级前记得看 [迁移指南](https://docs.openclaw.ai/start/quickstart)，如果有自定义配置建议先备份。

---

**最后说一句**：OpenClaw 这个更新节奏挺好的，不追求大而全，每次解决几个实际问题。比那些半年不更新、一更新就 breaking changes 的项目强多了。

我们下期见！👋
