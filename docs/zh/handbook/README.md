---
title: AI × Web3 开源学习平台
description: AI x Web3 School 是面向 builders 的双语开源学习平台，系统学习 AI、区块链、智能合约、AI Agent 与去中心化 AI，并通过 Bootcamp 和项目实践连接真实协作。
createTime: 2026/03/31 09:53:27
permalink: /zh/handbook/
---

# AI x Web3 School

::: tip Learning Agent 启动入口
想用 Hermes Agent / Claude Code / Codex 辅助学习的同学，可以直接复制下面这句话，粘贴到你的 Agent 里：

```text
请作为我的 AI × Web3 School Learning Agent，先阅读启动 Prompt：https://aiweb3.school/learning-agent.zh.txt，并结合 Handbook：https://aiweb3.school/zh/handbook/，帮我初始化个人学习计划、GitHub 学习仓库、每日打卡草稿和 Handbook feedback 流程。
```
:::

AI x Web3 School 是一个面向 builders 的开源学习计划。这个站点承载其中的 Handbook：把 AI 和 Web3 真正交叉时会遇到的问题拆清楚，包括模型能力、Agent 工作流、工具调用、钱包、签名、支付、身份、权限、安全执行、治理协作和可验证记录。

Handbook 围绕 AI x Web3 的关键概念建立知识地图，适合查概念、补上下文、连接不同主题，也适合从零开始按侧边栏顺序学习。

## AI x Web3 School Bootcamp

如果你想参加训练营，可以先查看中文训练营页面：

- [AI x Web3 School Bootcamp 中文页面](https://web3career.build/zh/programs/AI-Web3-School)：查看介绍、日程和报名入口。

## 为什么需要这个学习手册

AI x Web3 不是把两个 buzzword 拼在一起。一个真实系统往往会同时涉及：

- 模型如何理解任务、组织上下文、调用工具
- Agent 如何从“回答问题”进入“执行流程”
- 钱包和账户如何表达权限、额度、时间和撤销条件
- 链上交易如何模拟、确认、记录和审计
- 支付、身份、声誉、治理如何接入自动化系统
- 隐私、安全和可验证性如何在产品里落地

这些问题如果只从 AI 侧看，会低估资产和权限风险；只从 Web3 侧看，又容易忽略模型、上下文和工具编排的复杂度。

所以这个站点的目标是先建立一套共同语言：**把概念讲清楚，把边界讲清楚，把最小实践讲清楚。**

## Handbook 大纲

这份 Handbook 按四组内容展开：AI 基础、Web3 基础、AI × Web3 Bridge，以及前沿探索。

可以把它当成四层地图：

### AI 基础

先理解模型和应用系统的基本组成：

- [LLM](/zh/handbook/ai/llm/)：大模型能做什么，不能替代什么。
- [Prompt](/zh/handbook/ai/prompt/)：如何把任务目标、边界和输出格式写清楚。
- [Context](/zh/handbook/ai/context/)：模型一次能看见什么，哪些信息可信，哪些会过期。
- [RAG](/zh/handbook/ai/rag/)：如何把外部知识、来源和引用接入模型。
- [Agent](/zh/handbook/ai/agent/)：如何让模型进入工具调用和多步执行。
- [Frameworks](/zh/handbook/ai/frameworks/)：理解 LangChain、LangGraph、Agents SDK 等框架解决的是哪一层编排问题。
- [MCP](/zh/handbook/ai/mcp/)：理解模型、工具和上下文如何通过协议连接。
- [Evaluation](/zh/handbook/ai/evaluation/)：让模型输出、Agent 行为和工具调用可以被测试、回放和持续改进。

### Web3 基础

再补上链上系统的基础直觉：

- [Network](/zh/handbook/web3/network/)：理解区块、共识、L2、RPC 和链上状态的基本环境。
- [Cryptography](/zh/handbook/web3/cryptography/)：哈希、公私钥、签名这些底层概念。
- [Wallet](/zh/handbook/web3/wallet/)：钱包不只是登录按钮，而是身份和签名入口。
- [Smart Contract](/zh/handbook/web3/smart-contract/)：链上规则如何部署、调用和更新状态。
- [Account Abstraction](/zh/handbook/web3/account-abstraction/)：为什么 Smart Account 更适合表达 Agent 权限。
- [DeFi](/zh/handbook/web3/defi/)：理解开放金融协议里的资产、流动性、借贷和风险传播。
- [Oracle](/zh/handbook/web3/oracle/)：理解链外数据如何进入链上系统，以及为什么数据源会变成风险点。
- [Indexing](/zh/handbook/web3/indexing/)：把链上事件、交易和状态整理成 AI 与产品可用的数据层。
- [Security](/zh/handbook/web3/security/)：合约、权限、模拟和监控里的风险边界。

### AI × Web3 Bridge

最后进入真正的交叉问题：

- [Chain-aware Context](/zh/handbook/bridge/chain-aware-context/)：链上状态如何进入 Agent 上下文。
- [Web3 Tool Use](/zh/handbook/bridge/web3-tool-use/)：RPC、钱包、合约工具如何被 Agent 调用。
- [Agent Workflow](/zh/handbook/bridge/agent-workflow/)：哪些步骤适合自动化，哪些必须 human-in-the-loop。
- [Agent Wallet](/zh/handbook/bridge/agent-wallet/)：Agent 能拿什么权限，如何限制和撤销。
- [Machine Payment](/zh/handbook/bridge/machine-payment/)：机器之间如何完成小额支付和服务结算。
- [Settlement & Escrow](/zh/handbook/bridge/settlement-and-escrow/)：自动化交易、服务交付和争议处理如何完成结算。
- [Agent Identity](/zh/handbook/bridge/agent-identity/)：Agent 如何被识别、授权和追踪责任边界。
- [Agent Trust & Reputation](/zh/handbook/bridge/agent-trust-and-reputation/)：如何记录 Agent 的行为、能力和可信历史。
- [Verifiable AI](/zh/handbook/bridge/verifiable-ai/)：模型输出、执行过程和结果如何被验证。
- [AI Security](/zh/handbook/bridge/ai-security/)：Prompt Injection、工具滥用、权限隔离和审计日志如何进入系统设计。
- [AI Privacy](/zh/handbook/bridge/ai-privacy/)：用户数据、链上身份和模型上下文之间的隐私边界。
- [Governance AI](/zh/handbook/bridge/governance-ai/)：AI 如何进入提案总结、治理协作、投票辅助和公共决策。

### 前沿探索

前沿探索会把前面的知识组合成可做、可演示、可继续扩展的原型：

- [智能体商业（Agentic Commerce）](/zh/handbook/tracks/agentic-commerce/)：Agent 如何发现服务、协商任务、完成支付和留下凭证。
- [钱包与权限（Wallet / Permission）](/zh/handbook/tracks/wallet-permission/)：围绕钱包、权限、Session Key、Policy 和 Guard 做产品原型。
- [AI 安全（AI Security）](/zh/handbook/tracks/ai-security/)：把攻击面、权限隔离、审计和告警做成可演示系统。
- [治理（Governance）](/zh/handbook/tracks/governance/)：面向 DAO、公共物品和协议治理的 AI 协作工具。
- [开发工具（Dev Tooling）](/zh/handbook/tracks/dev-tooling/)：面向合约理解、测试、文档、代码审查和开发工作流的工具。
- [开放赛道（Open Track）](/zh/handbook/tracks/open-track/)：留给新的交叉问题和还没被固定分类的实践方向。

## 如何阅读这个 Handbook

不需要把所有章节都当成线性课程从头读到尾。更合适的方式，是先判断自己缺哪一块基础，再沿着侧边栏补齐。

- 如果你缺少 AI 基础，可以先读 [LLM](/zh/handbook/ai/llm/)、[Prompt](/zh/handbook/ai/prompt/)、[Context](/zh/handbook/ai/context/)、[RAG](/zh/handbook/ai/rag/) 和 [Agent](/zh/handbook/ai/agent/)，先建立模型、上下文、检索和工具调用的共同语言。
- 如果你缺少 Web3 基础，可以先读 [Network](/zh/handbook/web3/network/)、[Cryptography](/zh/handbook/web3/cryptography/)、[Wallet](/zh/handbook/web3/wallet/)、[Smart Contract](/zh/handbook/web3/smart-contract/) 和 [Account Abstraction](/zh/handbook/web3/account-abstraction/)，补上账户、签名、合约、网络和权限边界。
- 如果你已经熟悉两边基础，可以直接进入 [AI × Web3 Bridge](/zh/handbook/bridge/chain-aware-context/)，重点看 Agent 如何读取链上状态、调用工具、管理权限、支付结算和留下可验证记录。
- 如果你正在准备项目或黑客松，可以从 [前沿探索](/zh/handbook/tracks/agentic-commerce/) 开始，把知识节点组合成一个小原型，而不是停留在概念讨论。

如果你已经在做 AI x Web3 产品，可以直接从问题开始：

- 在做交易解释器：先看 [LLM](/zh/handbook/ai/llm/)、[Context](/zh/handbook/ai/context/)、[Chain-aware Context](/zh/handbook/bridge/chain-aware-context/)。
- 在做链上 Agent：先看 [Agent](/zh/handbook/ai/agent/)、[Web3 Tool Use](/zh/handbook/bridge/web3-tool-use/)、[Agent Workflow](/zh/handbook/bridge/agent-workflow/)。
- 在做钱包或自动支付：先看 [Wallet](/zh/handbook/web3/wallet/)、[Account Abstraction](/zh/handbook/web3/account-abstraction/)、[Agent Wallet](/zh/handbook/bridge/agent-wallet/)。
- 在做安全和风控：先看 [Prompt](/zh/handbook/ai/prompt/)、[RAG](/zh/handbook/ai/rag/)、[AI Security](/zh/handbook/bridge/ai-security/)。

## 共学、项目和长期沉淀

AI x Web3 School 由 LXDAO 与 ETHPanda 共同发起，并会围绕共学营、黑客松、Handbook 和项目展示持续沉淀内容。

这条路径不是“先讲课，再办比赛”的松散组合，而是希望把学习和实践连起来：

> 问题定义 → 共学训练 → 项目实践 → 对外展示 → 人才与机会沉淀

Handbook 会把课程内容、问题地图、案例和优秀项目整理成长期可访问的双语资产。即使某一期共学结束，后续 builders 仍然可以从这里进入，继续学习、修正、补充和共建。

## 合作伙伴与支持方

AI x Web3 School 的 Handbook、共学和项目实践由社区伙伴共同推进。

<LogoWall variant="compact" />

## 参与共建

这份 Handbook 会持续完善。欢迎你参与：

- 补充还没有展开的知识节点
- 修正文档里的不准确表述
- 增加案例、图解、代码示例和最小实践
- 帮助中英文内容互译
- 提交你认为值得 builders 阅读的资料

协作入口：

- [参与共建](/zh/contribution/)
- [GitHub](https://github.com/lxdao-official/aiweb3school)
- [Telegram 社群](https://t.me/aiweb3school)
