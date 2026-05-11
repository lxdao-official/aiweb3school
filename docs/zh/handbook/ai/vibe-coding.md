---
title: 氛围编程（Vibe Coding）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/ai/vibe-coding/
---

# 氛围编程（Vibe Coding）

> Vibe Coding 不是“把需求丢给 AI 然后等代码出现”。更准确地说，它是一种人和 AI Coding Agent 共同迭代软件的工作方式：人负责方向、约束和验收，Agent 负责生成、修改、搜索和执行一部分工程动作。

## 为什么要学这个

AI Coding Agent 已经能读代码、改文件、跑测试、解释错误、生成 PR。对 builder 来说，这会明显改变开发速度。但速度变快之后，真正的问题变成：你能不能清楚描述任务，能不能审查结果，能不能控制改动范围，能不能验证没有引入新 bug。

Vibe Coding 最容易被误解成“凭感觉写代码”。实际可用的做法正好相反：你要更清楚地管理 repo、任务、上下文、测试和提交边界。

**AI 能帮你写更多代码，但不能替你承担工程判断。**

## 第一性原理

> **AI Coding 的核心不是自动生成代码，而是把工程反馈循环压短。**

过去你需要自己搜索文件、理解模块、改代码、跑测试、看错误、再修改。现在 Agent 可以并行承担很多步骤。但如果反馈循环里没有测试、审查和版本控制，速度只会放大混乱。

- **任务要小**：越具体、越有边界，Agent 越容易产出可审查结果。
- **上下文要准**：让 Agent 看对文件、设计约束和错误输出，比写长篇需求更重要。
- **验证要硬**：运行测试、类型检查、构建、截图或日志，比“看起来对”可靠。

## 知识节点

### Vibe Coding

**难度：初级。** 先理解人和 AI Coding Agent 怎么分工：人负责目标、边界和验收，Agent 负责搜索、生成、修改和执行。

Vibe Coding 是一种快速和 AI 共同探索代码的方式。你可以先描述目标，让 Agent 生成方案或 patch，再通过运行、检查、追问和迭代收敛。

它适合：

- 搭原型
- 修小 bug
- 补测试
- 写脚本
- 重构局部模块
- 解释陌生代码

它不适合无边界地“重写整个项目”。如果任务范围太大，Agent 很容易改到不该改的地方，或者引入看似合理但不符合项目约束的抽象。

### Claude Code / Codex CLI

**难度：初级。** 重点不是背命令，而是学会把 AI Agent 安全地接入本地 repo、终端和测试流程。

Claude Code、Codex CLI 这类工具把 AI Agent 放进本地开发环境，让它可以读文件、编辑文件、运行命令、理解测试输出。

这类工具的关键价值不是“聊天”，而是能在 repo 里行动。也正因为它能行动，你需要明确：

- 哪些文件可以改
- 哪些命令可以跑
- 是否允许安装依赖
- 是否允许访问网络
- 什么时候必须停下来让人确认

::: info 相关 topic
- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/overview)：了解 Claude Code 的本地开发工作流。
- [OpenAI Codex CLI Help](https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started)：了解 Codex CLI 的基础使用方式。
:::

### Model / API Config

**难度：中级。** 这一层要处理模型选择、API key、工具权限、上下文、成本和日志，不只是“能不能调用成功”。

AI Coding 不是只看“哪个模型最强”。你还要管理模型、API key、上下文窗口、工具权限、代理设置、成本和日志。

常见问题包括：

- 本地和 CI 用的模型不一致
- API key 泄漏到日志或提交里
- 上下文太长导致成本失控
- Agent 使用了不合适的工具权限
- 输出风格和项目规范不一致

好的配置应该能被团队复用，而不是每个人在本机随手调。

OpenCLI 是这一层可以关注的工具之一。它把网站、浏览器会话、Electron 应用和本地二进制工具统一成可被命令行调用的接口，让 AI Agent 可以通过更稳定的命令去发现、学习和执行工具，而不是每次都临时操作页面。它还可以复用本地浏览器登录态，并把 `gh`、`docker` 等本地 CLI 暴露到同一个工具入口里。

这类工具的价值不在于“又多一个 AI 编程产品”，而在于把 Agent 可调用的外部能力变得更清楚：有哪些命令、需要什么权限、输出格式是什么、失败时怎么诊断。

::: info 相关 topic
- [OpenCLI](https://github.com/jackwener/OpenCLI)：了解如何把网站、浏览器会话、Electron 应用和本地工具变成 Agent 可调用的 CLI 接口。
:::

### GitHub / gh

**难度：中级。** 你需要把 AI 生成的改动放回版本控制、issue、PR 和 review 流程里，而不是只看一次聊天输出。

GitHub 和 `gh` CLI 是 AI Coding 工作流里的协作边界。Agent 可以帮你看 issue、生成 branch、读 PR diff、写提交信息、整理 review，但版本控制仍然是人类审查的关键线。

一个实用原则：**让 Agent 多做局部 patch，少做不可追踪的大改动。**

每次改动后至少看：

- `git diff`
- 修改文件列表
- 测试结果
- 是否包含不该提交的密钥、日志、构建产物

### CLI / Script

**难度：中级。** 这一层开始把 Agent 输出变成真实命令和脚本，所以要特别关注读写范围、dry run 和外部副作用。

很多开发任务不需要完整应用界面，先写 CLI 或脚本更快。Agent 很适合帮你生成一次性脚本、数据迁移脚本、检查脚本和批量修改脚本。

但脚本有两个边界：

- 读写文件前要确认范围。
- 会修改外部状态的脚本要先 dry run。

如果脚本会删文件、发请求、改数据库、提交交易或调用生产 API，就不能只靠 Agent 判断。

### Repo Workflow

**难度：高级。** 你要把 AI Coding 接进完整工程流程，并能判断什么时候应该让 Agent 继续，什么时候必须由人停下来审查。

Repo Workflow 是把 AI Coding 放进正常工程流程：issue、branch、commit、test、review、merge、release。

不要让 AI 绕过这些流程。更好的方式是让它参与这些流程：

- 从 issue 提炼任务边界
- 搜索相关文件
- 生成最小 patch
- 跑测试并解释失败
- 补充 changelog 或文档
- 写 PR summary 和验证说明

AI Coding 的质量，最终还是要落到 repo workflow 里。

## 在 AI x Web3 中的位置

AI x Web3 项目通常同时有前端、合约、脚本、索引器、Agent 后端和文档。Vibe Coding 可以显著加快探索速度，尤其适合 hackathon 和早期原型。

但链上相关代码的风险更高。合约、签名、权限、支付、迁移脚本不能只靠 Agent 生成后直接上线。AI Coding 可以帮你写测试、解释 ABI、生成脚本，但高风险动作必须经过审查、模拟和多方确认。

## 最小实践

选择一个小功能，让 AI Coding Agent 完成一轮完整工程闭环：

1. 写清楚任务边界和不能改的文件。
2. 让 Agent 搜索相关代码并给出计划。
3. 让 Agent 做最小 patch。
4. 运行测试或构建。
5. 查看 `git diff`，手动审查结果。
6. 要求 Agent 写一段 PR summary 和验证说明。

完成后记录：哪些信息给少了，哪些测试缺失，哪些改动需要人类判断。

## 挑战

在自己的电脑上安装并配置至少一个 Vibe Coding 工具，例如 Claude Code、Codex CLI 或 OpenCLI，并确认它能在一个测试 repo 中正常使用。

完成标准：

- 能启动工具并读取当前项目。
- 已配置必要的模型、API key、浏览器桥接或本地工具权限。
- 能让工具完成一个只读任务，例如解释目录结构、搜索相关文件或总结某段代码。
- 能让工具完成一个低风险小改动，例如补一段注释、生成一个脚本或修改一处测试。
- 保留验证记录：工具版本、配置方式、执行命令、关键输出或截图。

## 扩展阅读

- [Claude Code Overview](https://docs.claude.com/en/docs/claude-code/overview)：了解 Claude Code 如何进入本地开发流程。
- [Claude Code CLI Reference](https://docs.claude.com/en/docs/claude-code/cli-reference)：查看常用命令和参数。
- [OpenAI Codex CLI Getting Started](https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started)：了解 Codex CLI 的基础使用方式。
- [OpenCLI](https://github.com/jackwener/OpenCLI)：了解 Agent 如何通过统一 CLI 接口调用网站、浏览器会话、桌面应用和本地工具。
- [GitHub CLI Manual](https://cli.github.com/manual/)：学习用 `gh` 管理 issue、PR、repo 和 CI 状态。
- [OpenAI Agents Guide](https://platform.openai.com/docs/guides/agents/best-practices)：理解 AI Agent 进入工具工作流时的 guardrails 和 tracing。
