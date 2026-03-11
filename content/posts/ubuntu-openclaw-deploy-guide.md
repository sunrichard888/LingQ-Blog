---
title: "Ubuntu 部署 OpenClaw 完整指南：从零到多通道 AI 网关"
date: "2026-03-11"
description: "手把手教你在 Ubuntu 服务器部署 OpenClaw，包含系统配置、安装、WhatsApp/Telegram 通道绑定、远程访问和常见问题排查"
coverImage: "/images/ubuntu-openclaw-deploy-cover.svg"
tags: ["OpenClaw", "Ubuntu", "AI Agent", "部署教程", "Linux"]
---

# Ubuntu 部署 OpenClaw 完整指南：从零到多通道 AI 网关

**编辑**：乔叔

---

## 🦞 先说重点

**OpenClaw** 是个自托管的多通道 AI 网关，能让你通过 WhatsApp、Telegram、Discord 等聊天工具与 AI Agent 对话。

**适用场景：**
- 个人 AI 助理（7×24 小时在线）
- 团队 AI 机器人（多用户访问）
- 生产环境部署（VPS/云服务器）

**部署时间：** 10-15 分钟
**系统要求：** Ubuntu 20.04+（推荐 22.04 LTS）

---

## 📋 部署前准备

### 1. 系统要求

| 项目 | 要求 |
|------|------|
| 操作系统 | Ubuntu 20.04+（推荐 22.04 LTS） |
| Node.js | 22+（安装脚本会自动处理） |
| 内存 | 最低 1GB，推荐 2GB+ |
| 磁盘 | 最低 500MB，推荐 2GB+ |
| 网络 | 需要访问 npm、GitHub |

### 2. 检查系统状态

```bash
# 检查 Ubuntu 版本
lsb_release -a

# 检查 Node.js（如果已安装）
node --version

# 检查可用内存
free -h

# 检查磁盘空间
df -h
```

### 3. 更新系统

```bash
sudo apt update && sudo apt upgrade -y
```

---

## 🚀 正式部署（推荐方式）

### Step 1: 运行官方安装脚本

**最简单的方式**，一条命令搞定：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**安装脚本会自动：**
- ✅ 检测并安装 Node.js 22+
- ✅ 安装 OpenClaw CLI
- ✅ 启动配置向导
- ✅ 可选安装系统服务（开机自启）

<Info>
**Windows 用户**：使用 PowerShell 运行：
```powershell
iwr -useb https://openclaw.ai/install.ps1 | iex
```

**WSL2 用户**：和 Linux 命令一样。
</Info>

### Step 2: 运行配置向导

安装完成后会自动启动配置向导，按照提示操作：

```bash
openclaw onboard --install-daemon
```

**向导会帮你配置：**
1. API Provider（Anthropic/OpenAI/本地模型等）
2. Gateway 设置（端口、认证等）
3. 可选的通道绑定（WhatsApp/Telegram 等）

### Step 3: 验证安装

```bash
# 检查 Gateway 状态
openclaw gateway status

# 查看版本信息
openclaw --version

# 运行健康检查
openclaw doctor
```

**预期输出：**
```
Gateway: running
Version: 2026.2.26
Config: OK
```

---

## 🔧 手动安装方式（可选）

如果你想更精细地控制安装过程：

### 方式一：npm 安装

```bash
# 安装 Node.js 22（如果系统没有）
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# 验证 Node 版本
node --version  # 应该是 v22.x

# 安装 OpenClaw
npm install -g openclaw@latest

# 如果遇到 sharp 构建错误
SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm install -g openclaw@latest

# 启动配置
openclaw onboard --install-daemon
```

### 方式二：pnpm 安装（推荐开发者）

```bash
# 安装 pnpm
curl -fsSL https://get.pnpm.io/install.sh | sh -
source ~/.bashrc

# 安装 OpenClaw
pnpm add -g openclaw@latest

# 批准构建脚本（pnpm 需要）
pnpm approve-builds -g
# 选择 openclaw, node-llama-cpp, sharp 等

# 启动配置
openclaw onboard --install-daemon
```

---

## 📱 配置通信通道

### WhatsApp 通道（最常用）

```bash
# 启动 WhatsApp 绑定
openclaw channels login whatsapp
```

**步骤：**
1. 命令会显示一个二维码
2. 用手机 WhatsApp 扫描二维码
3. 等待绑定完成

<Warning>
**注意**：WhatsApp 需要真实手机号，建议使用备用号码。
</Warning>

### Telegram 通道

```bash
# 创建 Telegram Bot（先找 @BotFather）
# 然后运行：
openclaw channels login telegram
```

**步骤：**
1. 在 Telegram 找 @BotFather 创建机器人
2. 获取 Bot Token
3. 运行命令，输入 Token
4. 完成绑定

### 多通道同时使用

OpenClaw 支持同时运行多个通道：

```bash
# 查看已配置的通道
openclaw channels list

# 启用/禁用通道
openclaw channels enable whatsapp
openclaw channels disable telegram
```

---

## 🌐 远程访问配置

### 方式一：Tailscale（推荐，最安全）

```bash
# 安装 Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# 启动并登录
sudo tailscale up

# 获取访问地址
tailscale ip
```

**访问 Control UI：** `http://<tailscale-ip>:18789`

### 方式二：Nginx 反向代理

```bash
# 安装 Nginx
sudo apt install -y nginx

# 创建配置文件
sudo nano /etc/nginx/sites-available/openclaw
```

**Nginx 配置：**
```nginx
server {
    listen 80;
    server_name your-domain.com;

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

**启用配置：**
```bash
sudo ln -s /etc/nginx/sites-available/openclaw /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 方式三：防火墙开放端口

```bash
# Ubuntu UFW 防火墙
sudo ufw allow 18789/tcp
sudo ufw reload

# 检查状态
sudo ufw status
```

<Warning>
**安全警告**：直接开放端口有风险，建议配合认证和 HTTPS。
</Warning>

---

## 🔐 安全加固

### 1. 配置访问控制

编辑配置文件：
```bash
nano ~/.openclaw/openclaw.json
```

**添加允许的用户/号码：**
```json5
{
  channels: {
    whatsapp: {
      allowFrom: ["+8613800138000", "+15555550123"]
    },
    telegram: {
      allowFrom: ["123456789"]  // Telegram user ID
    }
  },
  messages: {
    groupChat: {
      requireMention: true  // 群聊需要@才响应
    }
  }
}
```

### 2. 启用 Gateway 认证

```bash
# 生成认证 Token
openclaw config get gateway.auth.token

# 远程访问时需要这个 Token
```

### 3. 配置 HTTPS（生产环境必备）

```bash
# 使用 Let's Encrypt 免费证书
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 📊 日常运维

### 启动/停止/重启

```bash
# 查看状态
openclaw gateway status

# 启动
openclaw gateway start

# 停止
openclaw gateway stop

# 重启
openclaw gateway restart
```

### 查看日志

```bash
# 实时日志
openclaw logs --follow

# 最近 100 条
openclaw logs --limit 100

# 查看错误日志
openclaw logs --level error
```

### 备份配置

```bash
# 创建备份
openclaw backup create

# 只备份配置（不含 workspace）
openclaw backup create --only-config

# 验证备份
openclaw backup verify
```

### 升级到最新版

```bash
# 自动升级
openclaw update

# 手动升级
npm install -g openclaw@latest

# 升级后重启
openclaw gateway restart
```

---

## 🐛 常见问题排查

### 问题 1：`openclaw` 命令找不到

**原因**：npm 全局 bin 目录不在 PATH 中

**解决：**
```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
export PATH="$(npm prefix -g)/bin:$PATH"

# 重新加载
source ~/.bashrc

# 验证
which openclaw
```

### 问题 2：Gateway 启动失败

**检查端口占用：**
```bash
sudo lsof -i :18789
sudo netstat -tulpn | grep 18789
```

**解决：**
```bash
# 停止旧进程
sudo kill <PID>

# 或用不同端口启动
openclaw gateway --port 18790
```

### 问题 3：WhatsApp 二维码不显示

**检查：**
```bash
# 查看通道状态
openclaw channels list

# 重新登录
openclaw channels logout whatsapp
openclaw channels login whatsapp
```

### 问题 4：内存不足

**优化配置：**
```bash
# 编辑配置
nano ~/.openclaw/openclaw.json

# 限制并发会话数
{
  sessions: {
    maxConcurrent: 5
  }
}
```

### 问题 5：无法访问 Control UI

**检查防火墙：**
```bash
sudo ufw status
sudo ufw allow 18789/tcp
```

**检查 Gateway 是否运行：**
```bash
openclaw gateway status
ps aux | grep openclaw
```

---

## 📈 性能优化建议

### 1. 使用 SSD

OpenClaw 频繁读写状态文件，SSD 能显著提升响应速度。

### 2. 配置 Swap（小内存 VPS）

```bash
# 创建 2GB Swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 永久生效
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

### 3. 限制日志大小

```bash
# 编辑配置
nano ~/.openclaw/openclaw.json

# 添加
{
  logging: {
    maxFileSize: "10MB",
    maxFiles: 5
  }
}
```

---

## 🎯 下一步

部署完成后，你可以：

1. **打开 Control UI** - `openclaw dashboard` 或访问 `http://localhost:18789`
2. **绑定更多通道** - Discord、iMessage、Slack 等
3. **配置多 Agent** - 不同通道使用不同 AI 模型
4. **设置自动化** - Cron 定时任务、消息路由规则

**官方文档：**
- [完整文档](https://docs.openclaw.ai)
- [通道配置](https://docs.openclaw.ai/channels)
- [故障排查](https://docs.openclaw.ai/gateway/troubleshooting)

---

## 💡 乔叔点评

**说实话**，OpenClaw 的部署体验在自托管 AI 工具里算第一梯队的：

✅ **优点：**
- 安装脚本真的能用，不忽悠
- 文档齐全，踩坑概率低
- 多通道支持丰富，一个网关搞定所有
- 有 Control UI，不用纯命令行

⚠️ **注意点：**
- WhatsApp 需要真实手机号
- 生产环境一定要配 HTTPS
- 小内存 VPS 记得配置 Swap

**总的来说**，如果你想要一个能长期运行的个人 AI 助理，OpenClaw 值得折腾。比那些三天两头停服的云端服务靠谱多了。

---

**有问题？** 评论区见！👋

*最后更新：2026-03-11*
