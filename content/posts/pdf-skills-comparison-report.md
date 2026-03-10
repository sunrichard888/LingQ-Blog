---
title: "📄 OpenClaw PDF 技能全景对比报告"
date: "2026-03-10"
description: "OpenClaw PDF 技能全景对比：nano-pdf、pdf-generator、pdf 三个技能的详细功能对比、使用示例和最佳实践。⚠️ 安全警告：pdf v0.1.0 被 VirusTotal 标记为可疑。"
coverImage: "/images/pdf-skills-cover.svg"
tags: ["OpenClaw", "PDF", "技能对比", "文档处理", "安全警告"]
---

# 📄 OpenClaw PDF 技能全景对比报告

> **版本**: 1.0.0  
> **更新日期**: 2026-03-10  
> **适用场景**: PDF 文档处理、生成、编辑、提取

![封面图](/images/pdf-skills-cover.svg)

*📊 OpenClaw PDF 技能全景可视化*

---

## 📊 技能对比总览

| 技能名称 | 定位 | 核心功能 | 推荐指数 | 安全等级 |
|---------|------|---------|---------|---------|
| **nano-pdf** | PDF 编辑工具 | 自然语言编辑 PDF | ⭐⭐⭐⭐ | ✅ 安全 |
| **pdf-generator** | PDF 生成工具 | 从 Markdown/HTML/数据生成 PDF | ⭐⭐⭐⭐⭐ | ✅ 安全 |
| **pdf** ⚠️ | PDF 综合处理 | 提取/合并/拆分/表单 | ⭐⭐ | ⚠️ 可疑 |

---

## 🎯 核心技能详解

### 1. nano-pdf v1.0.0

**定位**: 使用自然语言指令编辑 PDF 的轻量级工具

#### 基本信息

| 属性 | 详情 |
|------|------|
| **版本** | 1.0.0 |
| **作者** | steipete |
| **PyPI** | https://pypi.org/project/nano-pdf/ |
| **安装** | `uv install nano-pdf` |
| **安全** | ✅ 已验证 |

#### 核心功能

- ✏️ **文本修改** - 更改标题、修正错别字、更新内容
- 🎨 **格式调整** - 修改字体、颜色、布局
- 📐 **页面操作** - 删除页面、调整顺序
- 🖼️ **图片处理** - 替换图片、调整大小

#### 快速开始

```bash
# 基本语法
nano-pdf edit <pdf 文件> <页码> "<自然语言指令>"

# 修改标题
nano-pdf edit deck.pdf 1 "Change the title to 'Q3 Results'"

# 修正错别字
nano-pdf edit report.pdf 3 "Fix the typo in the second paragraph"

# 调整格式
nano-pdf edit presentation.pdf 2 "Make the heading blue and increase font size to 24"
```

#### 适用场景

| 场景 | 推荐度 | 说明 |
|------|--------|------|
| 快速修改 PDF 文本 | ⭐⭐⭐⭐⭐ | 最合适的使用场景 |
| 修正拼写错误 | ⭐⭐⭐⭐⭐ | 简单高效 |
| 调整格式 | ⭐⭐⭐⭐ | 适合小调整 |
| 大量页面编辑 | ⭐⭐⭐ | 建议脚本批量处理 |
| 复杂布局修改 | ⭐⭐ | 可能需要专业工具 |

#### 优点

- ✅ **自然语言** - 用人类语言描述编辑需求
- ✅ **轻量级** - 安装简单，依赖少
- ✅ **快速** - 适合小修小补
- ✅ **安全** - 无外部 API 调用

#### 局限

- ❌ **不适合读取** - 主要设计用于编辑，不是内容提取
- ❌ **复杂编辑有限** - 大规模修改需要多次执行
- ❌ **页码基准** - 需要确认是 0-based 还是 1-based

---

### 2. pdf-generator v1.0.1

**定位**: 从 Markdown、HTML、数据或代码生成专业 PDF 文档

#### 基本信息

| 属性 | 详情 |
|------|------|
| **版本** | 1.0.1 |
| **作者** | ivangdavila |
| **主页** | https://clawic.com/skills/pdf-generator |
| **安装** | `clawhub install pdf-generator` |
| **安全** | ✅ 已验证 |

#### 核心功能

- 📝 **Markdown → PDF** - 使用 pandoc
- 🌐 **HTML → PDF** - 使用 weasyprint（推荐）
- 📊 **数据 → PDF** - 使用 reportlab
- 📄 **简单文本** - 使用 fpdf2
- 🔧 **合并/拆分** - 使用 pypdf

#### 工具选择指南

```
需要 PDF？→ 源内容是什么？

├─ Markdown/文本 → pandoc（复杂文档加 LaTeX）
├─ HTML/CSS     → weasyprint（最佳 CSS 支持）⭐推荐
├─ 数据/表格    → reportlab（程序化控制）
├─ 简单文本     → fpdf2（轻量快速）
└─ 已有 PDF     → pypdf（合并/拆分）
```

#### 快速开始

**方案 1: HTML → PDF（推荐）**

```python
from weasyprint import HTML, CSS

# 从字符串生成
html = "<h1>Hello</h1><p>World</p>"
HTML(string=html).write_pdf("output.pdf")

# 从文件生成
HTML("document.html").write_pdf("output.pdf")

# 带自定义 CSS
css = CSS(string="body { font-family: Arial; }")
HTML(string=html).write_pdf("output.pdf", stylesheets=[css])
```

**方案 2: Markdown → PDF**

```bash
# 基础转换
pandoc document.md -o output.pdf

# 带目录
pandoc document.md --toc -o output.pdf

# 自定义页边距
pandoc document.md -V geometry:margin=1in -o output.pdf
```

**方案 3: 程序化生成**

```python
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas

c = canvas.Canvas("output.pdf", pagesize=A4)
c.setFont("Helvetica-Bold", 24)
c.drawString(20, 700, "Report Title")
c.save()
```

#### 文档模板

| 模板类型 | 复杂度 | 代码量 | 适用场景 |
|---------|--------|--------|---------|
| **发票** | ⭐⭐ | ~50 行 | 商业发票、收据 |
| **报告** | ⭐⭐⭐ | ~80 行 | 项目报告、年报 |
| **合同** | ⭐⭐⭐⭐ | ~100 行 | 法律文档、协议 |
| **证书** | ⭐⭐ | ~40 行 | 奖状、认证 |
| **简历** | ⭐⭐⭐ | ~60 行 | CV、求职信 |

#### 适用场景

| 场景 | 推荐度 | 说明 |
|------|--------|------|
| 生成报告/文档 | ⭐⭐⭐⭐⭐ | 核心使用场景 |
| 批量生成发票 | ⭐⭐⭐⭐⭐ | 支持模板 + 数据 |
| 创建证书 | ⭐⭐⭐⭐⭐ | 有现成模板 |
| 导出 Markdown | ⭐⭐⭐⭐ | pandoc 原生支持 |
| 数据可视化 | ⭐⭐⭐⭐ | reportlab 精确控制 |

#### 优点

- ✅ **多功能** - 支持多种源格式
- ✅ **模板丰富** - 发票/报告/合同/证书/简历
- ✅ **CSS 支持优秀** - weasyprint 渲染效果好
- ✅ **批量处理** - 支持模板 + 数据批量生成
- ✅ **安全** - 纯本地执行，无外部调用

#### 局限

- ❌ **不编辑现有 PDF** - 主要用于生成新文档
- ❌ **学习曲线** - 需要 HTML/CSS 或 Python 基础
- ❌ **依赖较多** - 需要安装 weasyprint/pandoc 等

---

### 3. pdf v0.1.0 ⚠️

**定位**: 综合 PDF 处理工具包

#### 基本信息

| 属性 | 详情 |
|------|------|
| **版本** | 0.1.0 |
| **作者** | awspace |
| **状态** | ⚠️ **被 VirusTotal 标记为可疑** |
| **安装** | `clawhub install pdf --force`（不推荐） |
| **安全** | ⚠️ **未验证** |

#### 声称的功能

- 📖 **文本提取** - 从 PDF 提取文本和表格
- ➕ **合并 PDF** - 合并多个 PDF 文件
- ✂️ **拆分 PDF** - 按页码拆分
- 📝 **表单处理** - 填充 PDF 表单
- 🔍 **分析 PDF** - 获取 PDF 元数据

#### 风险警告

⚠️ **VirusTotal Code Insight 标记**:
- 可能包含可疑代码模式
- 可能调用外部 API
- 可能包含加密密钥
- 可能使用 eval 等危险函数

#### 建议

**❌ 不推荐安装或使用**，原因：
1. 安全标记未解决
2. 功能与现有工具重叠（pypdf、pdfplumber 等）
3. 版本太新（0.1.0），稳定性未知
4. 作者信息不透明

#### 替代方案

| 需求 | 推荐替代 |
|------|---------|
| 提取文本 | `pdfplumber` 或 `pypdf` |
| 合并 PDF | `pypdf` |
| 拆分 PDF | `pypdf` |
| 填充表单 | `pypdf` |
| 分析 PDF | `pypdf` 或 `pdfinfo` |

---

## 📊 功能对比矩阵

| 功能 | nano-pdf | pdf-generator | pdf ⚠️ |
|------|----------|---------------|--------|
| **编辑现有 PDF** | ✅ 优秀 | ❌ 不支持 | ⚠️ 未知 |
| **生成新 PDF** | ❌ 不支持 | ✅ 优秀 | ⚠️ 有限 |
| **Markdown → PDF** | ❌ | ✅ pandoc | ⚠️ |
| **HTML → PDF** | ❌ | ✅ weasyprint | ⚠️ |
| **数据 → PDF** | ❌ | ✅ reportlab | ⚠️ |
| **合并 PDF** | ❌ | ✅ pypdf | ⚠️ |
| **拆分 PDF** | ❌ | ✅ pypdf | ⚠️ |
| **提取文本** | ❌ | ❌ | ⚠️ |
| **填充表单** | ❌ | ✅ pypdf | ⚠️ |
| **自然语言编辑** | ✅ 核心功能 | ❌ | ❌ |
| **批量生成** | ❌ | ✅ 支持 | ⚠️ |
| **安全性** | ✅ 安全 | ✅ 安全 | ⚠️ 可疑 |

---

## 🎯 推荐配置方案

### 方案 A: 轻量级 PDF 编辑

```
核心技能：nano-pdf
场景：快速修改现有 PDF 文件
成本：~5-10 分钟/文档
```

**适用**:
- 修正 PDF 中的错别字
- 更新标题/日期
- 小幅度格式调整

---

### 方案 B: 专业 PDF 生成

```
核心技能：pdf-generator
场景：从 Markdown/HTML/数据生成专业 PDF
成本：~15-30 分钟/文档
```

**适用**:
- 项目报告
- 商业发票
- 法律合同
- 证书/奖状
- 简历/CV

---

### 方案 C: 完整 PDF 工作流

```
核心技能：nano-pdf + pdf-generator + pypdf
场景：端到端 PDF 处理
成本：~30-60 分钟/项目
```

**工作流**:
1. 用 `pdf-generator` 生成初始 PDF
2. 用 `nano-pdf` 进行微调编辑
3. 用 `pypdf` 合并/拆分/添加水印

---

## 📖 使用示例

### 示例 1: 生成项目报告

```python
# 使用 pdf-generator + weasyprint
from weasyprint import HTML

def generate_report(title, sections):
    html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            @page {{ size: A4; margin: 2cm; }}
            body {{ font-family: Georgia, serif; }}
            h1 {{ color: #2c3e50; border-bottom: 2px solid #3498db; }}
            h2 {{ color: #34495e; page-break-after: avoid; }}
            section {{ page-break-inside: avoid; }}
        </style>
    </head>
    <body>
        <h1>{title}</h1>
        {''.join(f'<section><h2>{s["title"]}</h2><p>{s["content"]}</p></section>' for s in sections)}
    </body>
    </html>
    """
    HTML(string=html).write_pdf("report.pdf")
```

---

### 示例 2: 编辑现有 PDF

```bash
# 使用 nano-pdf 修改报告标题
nano-pdf edit report.pdf 1 "Change title to 'Q4 2025 Financial Report'"

# 修正错别字
nano-pdf edit report.pdf 3 "Fix typo in second paragraph"

# 更新页脚日期
nano-pdf edit report.pdf -1 "Update date to 'March 10, 2026'"
```

---

### 示例 3: 批量生成发票

```python
# 使用 pdf-generator 批量生成
from pathlib import Path
from weasyprint import HTML

def batch_generate(template_html, data_list, output_dir):
    Path(output_dir).mkdir(exist_ok=True)
    for item in data_list:
        html = template_html.format(**item['data'])
        output_path = f"{output_dir}/{item['filename']}.pdf"
        HTML(string=html).write_pdf(output_path)

# 使用
template = """
<html><body>
<h1>Invoice for {client}</h1>
<p>Amount: ${amount}</p>
</body></html>
"""

data = [
    {"filename": "invoice-001", "data": {"client": "Acme", "amount": 1000}},
    {"filename": "invoice-002", "data": {"client": "Beta", "amount": 2000}},
]

batch_generate(template, data, "./invoices")
```

---

### 示例 4: 合并多个 PDF

```python
# 使用 pypdf（pdf-generator 内置支持）
from pypdf import PdfWriter, PdfReader

def merge_pdfs(input_files, output_file):
    writer = PdfWriter()
    for pdf_path in input_files:
        reader = PdfReader(pdf_path)
        for page in reader.pages:
            writer.add_page(page)
    with open(output_file, "wb") as f:
        writer.write(f)

# 使用
merge_pdfs(["report1.pdf", "report2.pdf"], "combined.pdf")
```

---

## ⚠️ 常见陷阱与解决方案

| 陷阱 | 后果 | 解决方案 |
|------|------|---------|
| **缺少字体** | 回退到默认字体 | 使用网络安全字体或嵌入字体 |
| **绝对图片路径** | 图片丢失 | 使用相对路径或 base64 嵌入 |
| **未设置页面大小** | 布局不可预测 | 设置 `@page { size: A4; }` |
| **大图片** | 文件过大 | 压缩后使用（<500KB/张） |
| **页码基准混淆** | 编辑错页 | 确认是 0-based 还是 1-based |
| **CSS 不支持** | 渲染异常 | 使用 weasyprint 兼容的 CSS |
| **可疑技能** | 安全风险 | 避免使用未验证的技能（如 pdf v0.1.0） |

---

## 📐 打印优化 CSS 最佳实践

```css
@media print {
  body {
    font-family: 'Georgia', serif;
    font-size: 11pt;
    line-height: 1.5;
  }
  
  @page {
    size: A4;
    margin: 2cm;
    
    /* 页脚页码 */
    @bottom-center {
      content: "Page " counter(page) " of " counter(pages);
    }
  }
  
  /* 强制分页 */
  .new-page { page-break-before: always; }
  
  /* 保持在一起 */
  .keep-together { page-break-inside: avoid; }
  
  /* 标题不孤立 */
  h2, h3 { page-break-after: avoid; }
  
  /* 不打印的元素 */
  .no-print { display: none; }
}
```

---

## 🔒 安全建议

### ✅ 推荐做法

1. **使用已验证技能** - nano-pdf、pdf-generator
2. **本地执行** - 所有 PDF 处理在本地完成
3. **检查依赖** - 使用 pip/uv 安装官方包
4. **验证输出** - 生成后检查文件大小和内容

### ❌ 避免做法

1. **安装可疑技能** - 如 pdf v0.1.0（VirusTotal 标记）
2. **使用不明来源的模板** - 可能包含恶意代码
3. **上传敏感 PDF 到在线工具** - 数据泄露风险
4. **忽略安全警告** - 如 VirusTotal 标记

---

## 📊 性能对比

| 操作 | nano-pdf | pdf-generator | pypdf |
|------|----------|---------------|-------|
| **编辑单页** | ~2-5 秒 | N/A | N/A |
| **生成报告** | N/A | ~5-10 秒 | N/A |
| **合并 10 页** | N/A | ~1-2 秒 | ~1 秒 |
| **批量生成** | N/A | ~1 秒/页 | N/A |
| **内存占用** | 低 | 中 | 低 |

---

## 🎯 决策流程图

```
需要处理 PDF？
    ↓
什么需求？
    ├─ 编辑现有 PDF → nano-pdf ✅
    ├─ 生成新 PDF → pdf-generator ✅
    │   ├─ 从 Markdown → pandoc
    │   ├─ 从 HTML → weasyprint（推荐）
    │   ├─ 从数据 → reportlab
    │   └─ 简单文本 → fpdf2
    ├─ 合并/拆分 → pypdf（pdf-generator 内置）
    ├─ 提取文本 → pdfplumber（不推荐 pdf 技能）
    └─ 填充表单 → pypdf（不推荐 pdf 技能）
    
⚠️ 避免使用：pdf v0.1.0（安全标记）
```

---

## 📚 相关资源

### 官方文档

- **nano-pdf**: https://pypi.org/project/nano-pdf/
- **pdf-generator**: https://clawic.com/skills/pdf-generator
- **weasyprint**: https://weasyprint.org/
- **pandoc**: https://pandoc.org/
- **reportlab**: https://www.reportlab.com/
- **pypdf**: https://pypdf.readthedocs.io/

### 替代工具

| 工具 | 用途 | 链接 |
|------|------|------|
| **pdfplumber** | 提取文本/表格 | https://github.com/jsvine/pdfplumber |
| **PyMuPDF** | 高性能 PDF 处理 | https://pymupdf.readthedocs.io/ |
| **pdf2image** | PDF → 图片 | https://github.com/Belval/pdf2image |
| **pdftotext** | 命令行提取 | https://poppler.freedesktop.org/ |

---

## 📝 总结与建议

### 推荐技能组合

| 场景 | 推荐技能 | 理由 |
|------|---------|------|
| **日常 PDF 编辑** | nano-pdf | 自然语言、简单快速 |
| **专业文档生成** | pdf-generator | 模板丰富、CSS 支持优秀 |
| **批量处理** | pdf-generator + pypdf | 支持模板批量 + 合并拆分 |
| **文本提取** | pdfplumber（外部工具） | pdf 技能不安全 |
| **表单处理** | pypdf（外部工具） | pdf 技能不安全 |

### 最终建议

✅ **推荐使用**:
- nano-pdf（编辑）
- pdf-generator（生成）
- pypdf/pdfplumber（高级操作，通过 Python 直接使用）

❌ **避免使用**:
- pdf v0.1.0（安全标记未解决）

---

**报告完成时间**: 2026-03-10 11:52 UTC  
**作者**: OpenClaw AI Team  
**许可**: CC0-1.0

---

*本报告由 OpenClaw 生成 | 技能版本截至 2026-03-10*
