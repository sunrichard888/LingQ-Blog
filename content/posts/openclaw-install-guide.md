---
title: "OpenClaw 完整安装指南 2026"
date: "2026-03-05"
description: "从零基础到生产部署，涵盖 Windows 11、腾讯云 VPS、国产模型配置、热门 Skills、多 Agent 和飞书集成"
coverImage: "/images/openclaw-install-cover.svg"
tags: ["OpenClaw", "AI", "教程", "部署"]
---

# OpenClaw 完整安装指南 2026 🚀

> 从零基础到生产部署，涵盖 Windows 11、腾讯云、国产模型、热门 Skills、多 Agent 和飞书集成

---

## 📋 目录

1. [系统要求](#一系统要求)
2. [Windows 11 安装](#二-windows-11-安装)
3. [腾讯云 VPS 安装](#三腾讯云-vps-安装)
4. [国产模型配置](#四国产模型配置)
5. [热门 Skills 推荐](#五热门-skills-推荐)
6. [多 Agent 配置](#六多-agent-配置)
7. [飞书集成](#七飞书集成)
8. [故障排查](#八故障排查)

---

## 一、系统要求

### 硬件要求

| 组件 | 最低配置 | 推荐配置 |
|------|----------|----------|
| CPU | 2 核心 | 4 核心+ |
| 内存 | 4GB | 8GB+ |
| 存储 | 10GB | 20GB+ SSD |
| 网络 | 1Mbps | 10Mbps+ |

### 软件要求

- **Node.js**: 22 或更高版本
- **包管理器**: npm / pnpm / bun (任选)
- **操作系统**: 
  - Windows 10/11 (推荐 WSL2)
  - macOS 12+
  - Linux (Ubuntu 20.04+, CentOS 7+, Debian 10+)

---

## 二、Windows 11 安装

### 方法一：WSL2 安装（强烈推荐）

#### 步骤 1：安装 WSL2

```powershell
# 以管理员身份运行 PowerShell
wsl --install

# 重启电脑后，WSL 会自动安装 Ubuntu
# 手动指定发行版（可选）
wsl --install -d Ubuntu-22.04
```

#### 步骤 2：进入 WSL 环境

```bash
# 打开 Ubuntu 终端
wsl

# 或者在开始菜单搜索 "Ubuntu"
```

#### 步骤 3：安装 Node.js

```bash
# 方法 A：使用官方脚本（推荐）
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证安装
node --version  # 应显示 v22.x.x
npm --version
```

#### 步骤 4：安装 OpenClaw

```bash
# 使用安装脚本（一键安装）
curl -fsSL https://openclaw.ai/install.sh | bash

# 或者使用 npm
npm install -g openclaw@latest
```

#### 步骤 5：运行向导

```bash
openclaw onboard --install-daemon
```

向导会引导你完成：
1. 模型提供商配置
2. 网关设置
3. 可选的渠道配置

#### 步骤 6：验证安装

```bash
# 检查网关状态
openclaw gateway status

# 打开控制面板
openclaw dashboard

# 运行健康检查
openclaw doctor
```

---

### 方法二：原生 Windows 安装（不推荐）

```powershell
# 1. 安装 Node.js（从 https://nodejs.org 下载）
# 2. 以管理员身份运行 PowerShell

# 安装 OpenClaw
iwr -useb https://openclaw.ai/install.ps1 | iex

# 或者使用 npm
npm install -g openclaw@latest

# 运行向导
openclaw onboard --install-daemon
```

⚠️ **注意**: 原生 Windows 可能遇到路径和权限问题，强烈建议使用 WSL2。

---

### 方法三：Docker 安装

```powershell
# 1. 安装 Docker Desktop for Windows
# 2. 创建 docker-compose.yml

version: '3.8'
services:
  openclaw:
    image: openclaw/openclaw:latest
    ports:
      - "18789:18789"
    volumes:
      - openclaw-data:/root/.openclaw
    environment:
      - OPENAI_API_KEY=your_key_here
    restart: unless-stopped

volumes:
  openclaw-data:

# 3. 启动
docker-compose up -d

# 4. 访问控制面板
# http://localhost:18789
```

---

## 三、腾讯云 VPS 安装

### 步骤 1：创建 CVM 实例

1. 登录 [腾讯云控制台](https://console.cloud.tencent.com)
2. 选择「云服务器 CVM」
3. 点击「新建」
4. 配置选择：
   - **地域**: 选择离你最近的节点
   - **镜像**: Ubuntu Server 22.04 LTS
   - **实例类型**: 
     - 入门：1 核 2GB（测试用）
     - 推荐：2 核 4GB（生产用）
   - **存储**: 50GB SSD
   - **带宽**: 1Mbps 起步
   - **安全组**: 开放端口 18789（控制面板）、22（SSH）

### 步骤 2：SSH 连接

```bash
# 获取公网 IP 后，使用 SSH 连接
ssh root@你的服务器 IP

# 首次登录需要设置密码
```

### 步骤 3：系统初始化

```bash
# 更新系统
apt update && apt upgrade -y

# 安装必要工具
apt install -y curl git wget vim

# 安装 Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt install -y nodejs

# 验证
node --version
npm --version
```

### 步骤 4：安装 OpenClaw

```bash
# 使用安装脚本
curl -fsSL https://openclaw.ai/install.sh | bash

# 或者使用 npm
npm install -g openclaw@latest
```

### 步骤 5：配置防火墙

```bash
# 开放网关端口（如果使用腾讯云安全组，在控制台配置）
ufw allow 18789/tcp
ufw allow 22/tcp
ufw enable
```

### 步骤 6：安装并启动网关

```bash
# 安装为系统服务
openclaw onboard --install-daemon

# 检查状态
openclaw gateway status

# 查看日志
openclaw logs --follow
```

### 步骤 7：配置远程访问

```bash
# 修改配置文件
openclaw config set gateway.bindHost 0.0.0.0

# 重启网关
openclaw gateway restart

# 现在可以通过 http://服务器 IP:18789 访问控制面板
```

### 步骤 8：配置 HTTPS（可选但推荐）

```bash
# 安装 Nginx
apt install -y nginx

# 安装 Certbot
apt install -y certbot python3-certbot-nginx

# 获取 SSL 证书
certbot --nginx -d your-domain.com

# Nginx 配置示例
# /etc/nginx/sites-available/openclaw
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    location / {
        proxy_pass http://127.0.0.1:18789;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 四、国产模型配置

### 4.1 智谱 AI (GLM)

#### 获取 API Key

1. 访问 [智谱 AI 开放平台](https://open.bigmodel.cn)
2. 注册/登录账号
3. 进入「API 密钥管理」
4. 创建新密钥

#### 配置 OpenClaw

```bash
# 使用向导配置
openclaw onboard --auth-choice zai-api-key

# 或手动配置
openclaw config set agents.defaults.model.primary zai/glm-5

# 设置 API Key
export ZAI_API_KEY="你的智谱 API 密钥"

# 永久保存（添加到 ~/.bashrc 或 ~/.zshrc）
echo 'export ZAI_API_KEY="你的智谱 API 密钥"' >> ~/.bashrc
source ~/.bashrc
```

#### 验证配置

```bash
openclaw models status
openclaw agent --message "你好，请介绍一下自己"
```

---

### 4.2 通义千问 (阿里云)

#### 获取 API Key

1. 访问 [阿里云百炼](https://bailian.console.aliyun.com)
2. 开通「模型服务」
3. 创建 API-KEY

#### 配置 OpenClaw

```bash
# 通义千问通过 OpenRouter 或兼容接口使用
# 配置 OpenRouter
export OPENROUTER_API_KEY="你的 OpenRouter 密钥"

# 设置模型
openclaw config set agents.defaults.model.primary openrouter/qwen/qwen-max

# 或使用兼容接口（需要配置自定义 provider）
openclaw config set models.providers.dashscope.baseUrl "https://dashscope.aliyuncs.com/compatible-mode/v1"
openclaw config set models.providers.dashscope.apiKey "你的阿里云 API 密钥"
```

---

### 4.3 文心一言 (百度)

#### 获取 API Key

1. 访问 [百度智能云](https://console.bce.baidu.com)
2. 进入「千帆大模型平台」
3. 创建应用获取 AK/SK

#### 配置 OpenClaw

```bash
# 通过 OpenRouter 使用
openclaw config set agents.defaults.model.primary openrouter/baidu/yi-34b-chat

# 或配置自定义 provider
openclaw config set models.providers.baidu.baseUrl "https://qianfan.baidubce.com/v2"
openclaw config set models.providers.baidu.apiKey "你的百度 API 密钥"
```

---

### 4.4 MiniMax

#### 获取 API Key

1. 访问 [MiniMax 开放平台](https://platform.minimaxi.com)
2. 注册并创建 API Key

#### 配置 OpenClaw

```bash
# MiniMax 已内置支持
export MINIMAX_API_KEY="你的 MiniMax API 密钥"

# 设置模型
openclaw config set agents.defaults.model.primary minimax/abab6.5s-chat

# 验证
openclaw models status
```

---

### 4.5 月之暗面 (Kimi)

#### 获取 API Key

1. 访问 [Moonshot AI](https://platform.moonshot.cn)
2. 注册并获取 API Key

#### 配置 OpenClaw

```bash
# 通过 OpenRouter 使用
export OPENROUTER_API_KEY="你的 OpenRouter 密钥"

# 设置 Kimi 模型
openclaw config set agents.defaults.model.primary openrouter/moonshotai/kimi-k2

# 或使用 Kilo Gateway（内置 Kimi）
export KILOCODE_API_KEY="你的 Kilo 密钥"
openclaw config set agents.defaults.model.primary kilocode/moonshot/kimi-k2
```

---

### 4.6 国产模型推荐配置

```json5
// ~/.openclaw/openclaw.json
{
  agents: {
    defaults: {
      model: {
        // 主模型 - 智谱 GLM-5
        primary: "zai/glm-5",
        // 备用模型 - Kimi
        fallbacks: [
          "openrouter/moonshotai/kimi-k2",
          "minimax/abab6.5s-chat"
        ]
      },
      // 图像模型
      imageModel: {
        primary: "google/gemini-3-pro-preview",
        fallbacks: ["openai/dall-e-3"]
      }
    }
  }
}
```

---

## 五、热门 Skills 推荐

### 5.1 效率工具类

#### ⚡ weather - 天气预报

```bash
# 安装（已内置）
# 无需额外安装

# 配置（需要 wttr.in 或 Open-Meteo）
# 无需 API Key

# 使用示例
# "@OpenClaw 今天北京天气怎么样？"
# "@OpenClaw 上海未来 3 天天气预报"
```

**功能**:
- 实时天气查询
- 多日预报
- 自动推送（配合 cron）

---

#### ⚡ cron - 定时任务

```bash
# 安装（已内置）

# 使用示例
# "设置每天早上 8 点的天气提醒"
# "每周一上午 9 点发送周报提醒"

# 查看任务
openclaw cron list

# 删除任务
openclaw cron cancel <任务 ID>
```

**功能**:
- 一次性提醒
- 周期性任务
- 自动降级确保送达

---

#### ⚡ healthcheck - 健康检查

```bash
# 手动运行
openclaw health

# 配置自动检查
# 添加到 HEARTBEAT.md
```

**功能**:
- 系统安全巡检
- 配置检查
- 漏洞扫描

---

### 5.2 办公集成类

#### 💼 feishu-doc - 飞书文档

```bash
# 已内置，需要配置飞书凭证

# 使用示例
# "读取飞书文档 XXX 的内容"
# "在飞书创建新文档，标题为 XXX"
# "更新飞书文档 XXX，添加以下内容..."
```

**前置条件**:
- 飞书开放平台应用
- App ID 和 App Secret
- 相关权限配置

---

#### 💼 notion - Notion 集成

```bash
# 安装
openclaw plugins install @openclaw/notion

# 配置
export NOTION_API_KEY="你的 Notion API Key"

# 使用示例
# "在 Notion 创建新页面"
# "读取 Notion 数据库 XXX"
```

---

#### 💼 gh-issues - GitHub Issues

```bash
# 已内置

# 配置
export GITHUB_TOKEN="你的 GitHub Token"

# 使用示例
# "创建一个新的 Issue"
# "列出所有未关闭的 Issue"
# "关闭 Issue #123"
```

---

### 5.3 自动化类

#### 🤖 browser - 浏览器自动化

```bash
# 已内置

# 使用示例
# "打开 https://example.com 并截图"
# "自动填写表单并提交"
# "抓取网页内容"
```

**功能**:
- 网页浏览
- 自动填表
- 内容抓取
- 截图监控

---

#### 🤖 message - 消息发送

```bash
# 已内置

# 使用示例
# "给 XXX 发送消息：..."
# "在群里发布通知"
```

**支持渠道**:
- WhatsApp
- Telegram
- Discord
- Slack
- 飞书
- 微信（企业微信）

---

### 5.4 多媒体类

#### 🎨 tts - 文字转语音

```bash
# 已内置

# 配置（ElevenLabs 或其他 TTS 服务）
export ELEVENLABS_API_KEY="你的 API Key"

# 使用示例
# "把这段话转成语音"
# "用英式英语朗读这篇文章"
```

---

#### 🎨 openai-image-gen - AI 绘图

```bash
# 已内置

# 配置
export OPENAI_API_KEY="你的 OpenAI API Key"

# 使用示例
# "生成一张赛博朋克风格的城市图片"
# "为这篇文章生成封面图"
```

---

#### 🎨 summarize - 内容摘要

```bash
# 已内置

# 使用示例
# "总结这篇文章的核心观点"
# "把这份会议记录整理成要点"
```

---

### 5.5 Skills 安装和管理

```bash
# 查看所有可用 skills
openclaw skills list

# 从 ClawHub 安装新 skill
clawhub install <skill-slug>

# 更新所有 skills
clawhub update --all

# 查看 skill 详情
openclaw skills show <skill-name>

# 禁用 skill
openclaw config set skills.entries.<skill-name>.enabled false
```

---

## 六、多 Agent 配置

### 6.1 什么是多 Agent？

多 Agent 允许你在**同一个网关**下运行**多个独立的 AI 助手**，每个 Agent 拥有：
- 独立的工作空间（SOUL.md、AGENTS.md、USER.md）
- 独立的会话历史
- 独立的模型配置
- 独立的技能集合

### 6.2 创建新 Agent

```bash
# 使用向导创建
openclaw agents add work

# 手动创建
openclaw agents add coding
openclaw agents add social
```

### 6.3 配置多 Agent

编辑 `~/.openclaw/openclaw.json`:

```json5
{
  agents: {
    list: [
      // 主 Agent
      {
        id: "main",
        workspace: "~/.openclaw/workspace",
        agentDir: "~/.openclaw/agents/main/agent"
      },
      // 工作助手
      {
        id: "work",
        workspace: "~/.openclaw/workspace-work",
        agentDir: "~/.openclaw/agents/work/agent",
        model: {
          primary: "zai/glm-5"  // 工作使用国产模型
        }
      },
      // 编程助手
      {
        id: "coding",
        workspace: "~/.openclaw/workspace-coding",
        agentDir: "~/.openclaw/agents/coding/agent",
        model: {
          primary: "openai-codex/gpt-5.3-codex"  // 编程用 Codex
        }
      }
    ],
    defaults: {
      model: {
        primary: "anthropic/claude-opus-4-6"
      }
    }
  }
}
```

### 6.4 配置路由规则（Bindings）

```json5
{
  bindings: [
    // 飞书私聊路由到工作助手
    {
      agentId: "work",
      match: {
        channel: "feishu",
        peer: { kind: "direct" }
      }
    },
    // 特定群组路由到编程助手
    {
      agentId: "coding",
      match: {
        channel: "feishu",
        groupId: "chat_xxx123"
      }
    },
    // Discord 特定角色路由
    {
      agentId: "coding",
      match: {
        channel: "discord",
        guildId: "guild_xxx",
        roles: ["developer"]
      }
    },
    // WhatsApp 不同联系人路由到不同 Agent
    {
      agentId: "main",
      match: {
        channel: "whatsapp",
        peer: { kind: "direct", id: "+8613800138000" }
      }
    },
    {
      agentId: "work",
      match: {
        channel: "whatsapp",
        peer: { kind: "direct", id: "+8613900139000" }
      }
    }
  ]
}
```

### 6.5 多账号配置

```json5
{
  channels: {
    whatsapp: {
      accounts: {
        personal: {
          // 个人账号
          sessionId: "session_xxx1"
        },
        work: {
          // 工作账号
          sessionId: "session_xxx2"
        }
      }
    },
    feishu: {
      appId: "cli_xxx",
      appSecret: "${FEISHU_APP_SECRET}"
    }
  }
}
```

### 6.6 验证配置

```bash
# 列出所有 Agents
openclaw agents list --bindings

# 检查路由规则
openclaw bindings list

# 测试特定 Agent
openclaw agent --agentId work --message "你好，工作助手"
```

### 6.7 实际应用场景

#### 场景 1：个人 + 工作分离

```bash
# 创建两个 Agent
openclaw agents add personal
openclaw agents add work

# 配置不同的模型
# personal: 使用 Claude（创意写作）
# work: 使用 GLM-5（中文办公）

# 配置不同的渠道
# personal: WhatsApp + Telegram
# work: 飞书 + 企业微信
```

#### 场景 2：团队协作

```bash
# 为每个团队成员创建 Agent
openclaw agents add alice
openclaw agents add bob
openclaw agents add charlie

# 配置不同的飞书机器人
# 每个 Agent 对应一个飞书机器人账号

# 配置路由
# Alice 的消息 → alice Agent
# Bob 的消息 → bob Agent
# 公共群组 → charlie Agent（共享助手）
```

---

## 七、飞书集成

### 7.1 创建飞书应用

#### 步骤 1：访问飞书开放平台

1. 访问 [飞书开放平台](https://open.feishu.cn/app)
2. 使用企业账号登录

#### 步骤 2：创建企业应用

1. 点击「创建企业应用」
2. 填写应用信息：
   - 应用名称：OpenClaw 助手
   - 应用描述：AI 智能助手
   - 应用图标：选择一个合适的图标

#### 步骤 3：获取凭证

1. 进入「凭证与基础信息」
2. 复制：
   - **App ID** (格式：`cli_xxx`)
   - **App Secret**

⚠️ **重要**: 妥善保管 App Secret，不要泄露

#### 步骤 4：配置权限

点击「权限管理」→「批量导入」，粘贴以下权限配置：

```json
{
  "scopes": {
    "tenant": [
      "aily:file:read",
      "aily:file:write",
      "application:application.app_message_stats.overview:readonly",
      "application:application:self_manage",
      "application:bot.menu:write",
      "cardkit:card:read",
      "cardkit:card:write",
      "contact:user.employee_id:readonly",
      "corehr:file:download",
      "event:ip_list",
      "im:chat.access_event.bot_p2p_chat:read",
      "im:chat.members:bot_access",
      "im:message",
      "im:message.group_at_msg:readonly",
      "im:message.p2p_msg:readonly",
      "im:message:readonly",
      "im:message:send_as_bot",
      "im:resource"
    ],
    "user": [
      "aily:file:read",
      "aily:file:write",
      "im:chat.access_event.bot_p2p_chat:read"
    ]
  }
}
```

#### 步骤 5：发布应用

1. 点击「版本管理与发布」
2. 创建新版本
3. 提交审核（通常几分钟内通过）

---

### 7.2 配置 OpenClaw

#### 方法一：使用向导（推荐）

```bash
# 运行配置向导
openclaw onboard

# 选择 Feishu 渠道
# 输入 App ID 和 App Secret
# 完成配置
```

#### 方法二：手动配置

```bash
# 安装飞书插件
openclaw plugins install @openclaw/feishu

# 添加渠道
openclaw channels add feishu

# 输入凭证
# App ID: cli_xxx
# App Secret: 你的密钥
```

#### 方法三：编辑配置文件

编辑 `~/.openclaw/openclaw.json`:

```json5
{
  channels: {
    feishu: {
      appId: "cli_xxx",
      appSecret: "${FEISHU_APP_SECRET}",
      // 国际版（Lark）用户添加此行
      // domain: "lark"
    }
  }
}
```

设置环境变量：

```bash
export FEISHU_APP_SECRET="你的 App Secret"
# 永久保存
echo 'export FEISHU_APP_SECRET="你的 App Secret"' >> ~/.bashrc
source ~/.bashrc
```

---

### 7.3 启动和测试

```bash
# 重启网关
openclaw gateway restart

# 查看状态
openclaw gateway status

# 查看日志
openclaw logs --follow
```

**测试步骤**:

1. 在飞书中找到你的机器人
2. 发送消息：`你好`
3. 检查网关日志，确认收到消息
4. 机器人应该回复消息

---

### 7.4 高级配置

#### 配置 DM 策略

```json5
{
  channels: {
    feishu: {
      appId: "cli_xxx",
      appSecret: "${FEISHU_APP_SECRET}",
      // DM 策略
      dmPolicy: "pairing",  // 需要配对（安全）
      // 或
      dmPolicy: "open",     // 开放（任何人可聊）
      // 或
      dmPolicy: "allowlist", // 白名单
      allowFrom: ["ou_xxx1", "ou_xxx2"]  // 允许的用户 ID
    }
  }
}
```

#### 配置群组策略

```json5
{
  channels: {
    feishu: {
      // ... 其他配置
      groupPolicy: "mention",  // 仅@机器人时回复
      // 或
      groupPolicy: "all"       // 所有消息都回复（不推荐）
    }
  }
}
```

#### 配置交互式卡片

```json5
{
  feishu: {
    capabilities: {
      inlineButtons: "all"  // 启用内联按钮
    }
  }
}
```

---

### 7.5 飞书使用示例

#### 私聊场景

```
用户：今天天气怎么样？
机器人：北京今天晴转多云，气温 15-25°C...
```

#### 群组场景

```
用户：@OpenClaw 帮我查一下这个文档
机器人：好的，正在读取文档...
```

#### 文档操作

```
用户：在飞书创建一个新文档，标题为会议纪要
机器人：已创建文档：会议纪要
链接：https://feishu.cn/docx/xxx123
```

---

## 八、故障排查

### 8.1 常见问题

#### 问题 1：`openclaw` 命令找不到

```bash
# 诊断
node -v
npm -v
npm prefix -g
echo $PATH

# 解决：添加全局 bin 到 PATH
export PATH="$(npm prefix -g)/bin:$PATH"
# 永久保存
echo 'export PATH="$(npm prefix -g)/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

---

#### 问题 2：网关无法启动

```bash
# 检查端口占用
netstat -tlnp | grep 18789

# 查看日志
openclaw logs --follow

# 常见错误：
# - 端口被占用：修改端口或停止占用进程
# - 配置错误：运行 openclaw doctor 检查
# - 权限问题：使用 sudo 或检查文件权限
```

---

#### 问题 3：模型返回 "Model is not allowed"

```bash
# 原因：agents.defaults.models 设置了白名单

# 解决 1：添加模型到白名单
openclaw config set agents.defaults.models."anthropic/claude-opus-4-6" '{"alias":"Opus"}'

# 解决 2：清除白名单
openclaw config unset agents.defaults.models

# 解决 3：使用白名单中的模型
/model list
/model <编号>
```

---

#### 问题 4：飞书机器人不回复

```bash
# 检查清单：
# 1. 网关是否运行：openclaw gateway status
# 2. 日志是否有错误：openclaw logs --follow
# 3. 飞书应用权限是否正确配置
# 4. App Secret 是否正确
# 5. 机器人是否已发布

# 测试连接
openclaw channels status --probe
```

---

#### 问题 5：WebSocket 连接失败

```bash
# 检查防火墙
ufw status
# 开放端口
ufw allow 18789/tcp

# 检查网关绑定地址
openclaw config get gateway.bindHost
# 应该是 0.0.0.0（远程访问）或 127.0.0.1（仅本地）

# 重启网关
openclaw gateway restart
```

---

### 8.2 诊断工具

```bash
# 完整健康检查
openclaw doctor

# 网关状态
openclaw gateway status

# 渠道状态
openclaw channels status --probe

# 模型状态
openclaw models status

# Agent 列表
openclaw agents list --bindings

# 查看日志
openclaw logs --follow

# 深度检查
openclaw gateway status --deep
```

---

### 8.3 获取帮助

- **官方文档**: https://docs.openclaw.ai
- **Discord 社区**: https://discord.gg/clawd
- **GitHub Issues**: https://github.com/openclaw/openclaw/issues
- **技能市场**: https://clawhub.com

---

## 附录

### A. 环境变量参考

```bash
# 模型 API Keys
export OPENAI_API_KEY="sk-..."
export ANTHROPIC_API_KEY="sk-ant-..."
export GEMINI_API_KEY="..."
export ZAI_API_KEY="..."  # 智谱

# 渠道配置
export FEISHU_APP_SECRET="..."
export TELEGRAM_BOT_TOKEN="..."
export DISCORD_BOT_TOKEN="..."

# 运行时配置
export OPENCLAW_HOME="/path/to/home"
export OPENCLAW_STATE_DIR="/path/to/state"
export OPENCLAW_CONFIG_PATH="/path/to/config.json"
```

---

### B. 配置文件位置

```
~/.openclaw/
├── openclaw.json          # 主配置文件
├── workspace/             # 默认工作空间
│   ├── SOUL.md
│   ├── AGENTS.md
│   ├── USER.md
│   └── skills/
├── agents/                # 多 Agent 配置
│   ├── main/
│   ├── work/
│   └── coding/
└── skills/                # 共享技能
```

---

### C. 常用命令速查

```bash
# 安装
openclaw onboard --install-daemon

# 启动/停止
openclaw gateway start
openclaw gateway stop
openclaw gateway restart

# 状态检查
openclaw gateway status
openclaw doctor
openclaw models status

# 配置
openclaw config get <key>
openclaw config set <key> <value>
openclaw config unset <key>

# Agent
openclaw agents add <name>
openclaw agents list --bindings

# 渠道
openclaw channels add
openclaw channels status --probe

# 日志
openclaw logs --follow

# 模型
/model
/model list
/model <编号>

# 技能
openclaw skills list
clawhub install <skill>
clawhub update --all
```

---

**文档版本**: 2026 年 3 月 5 日  
**适用版本**: OpenClaw 2026.2.26+  
**最后更新**: 2026-03-05

---

*希望这份指南能帮助你顺利部署 OpenClaw！如有问题，欢迎在评论区留言或加入 Discord 社区交流。* 🎉
