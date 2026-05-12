---
title: 开放赛道（Open Track）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/tracks/open-track/
---

# 开放赛道（Open Track）

> 开放赛道不是“什么都可以做”。它适合那些无法被单一方向完全覆盖，但确实能把 AI 和 Web3 结合出新工作流、新协议或新体验的项目。

## 为什么要探索这个

AI x Web3 还在早期，很多有价值的项目不会刚好落在固定分类里。开放赛道的意义，是给 builder 留出探索空间：钱包、内容、数据分析、研究工具、身份、协议 UX、社区协作，都可能出现新的组合方式。

但开放不等于随意。一个开放赛道项目仍然要回答两个问题：

- AI 具体承担了什么不可替代的工作？
- Web3 具体提供了什么不可替代的能力？

如果这两个问题答不清，项目就容易变成“AI 包装一个 Web3 概念”或“Web3 包装一个普通 AI 工具”。

## 第一性原理

> **开放赛道的核心不是追热点，而是发现新的用户工作流。**

真正有价值的新方向，通常来自一个具体的人群、一个具体痛点和一个具体流程，而不是从几个热门名词拼出来。

- **先找工作流**：用户现在如何完成任务，哪里慢、贵、难、不透明或不可验证。
- **再拆 AI 和 Web3 的职责**：AI 负责理解、生成、规划、推荐；Web3 负责资产、身份、权限、记录、激励或治理。
- **最后做最小闭环**：输入、处理、输出、权限、失败路径都要讲清楚。

## 知识节点

### AI-native Wallet

AI-native Wallet 不是在钱包里加一个聊天框，而是让钱包理解用户目标、解释交易、管理权限、提醒风险，并帮助用户完成多步骤链上任务。

可能的功能包括：

- 用自然语言解释交易和授权。
- 根据用户目标生成交易草稿。
- 识别钓鱼地址、异常授权和高风险 calldata。
- 管理 Agent session key 和 spending limit。
- 把 DeFi 仓位、NFT、治理投票和历史操作整理成上下文。

这类项目的关键是安全边界：AI 可以解释和建议，但签名、授权和高风险操作必须交给明确的钱包权限系统。

::: info 相关 topic
- [钱包与权限](/zh/handbook/tracks/wallet-permission/)：理解 AI wallet 的权限、session key 和撤销设计。
- [Agent 钱包](/zh/handbook/bridge/agent-wallet/)：从 Agent 执行角度理解钱包如何承载能力边界。
:::

### Creator / Content Collaboration

AI 能降低内容生产成本，Web3 能记录身份、授权、分发和收益关系。Creator / Content Collaboration 关注的不是“AI 生成 NFT 图片”，而是多人协作、版本演化和权益分配。

可以探索的场景：

- 创作者用 AI 生成草稿，社区共同筛选和二创。
- 作品版本、贡献者和授权记录上链。
- NFT 或凭证作为访问权、会员权或共创权益。
- 收益按贡献规则自动分配。
- AI 帮助整理创作过程、生成说明、追踪授权边界。

这里最容易踩的坑是版权和授权。链上记录可以证明某个时间点的声明，但不能自动解决训练数据、商业使用权和现实法律问题。

### On-chain Data Analysis Agent

链上数据公开，但并不等于容易理解。On-chain Data Analysis Agent 可以帮助用户解释地址行为、协议风险、资金流向、治理投票和资产变化。

一个实用的数据分析 Agent 应该能：

- 查询链上交易、事件、余额和协议状态。
- 把复杂行为翻译成结构化解释。
- 区分事实、推断和不确定性。
- 给出来源链接，比如区块浏览器、Dune、Subgraph 或 RPC 结果。
- 对异常行为做风险提示。

这类工具必须避免过度判断。比如“某地址可能属于某机构”是推断，不是事实；“资金流向某合约”才是可验证事实。

::: info 相关 topic
- [索引与数据](/zh/handbook/web3/indexing/)：理解链上数据如何被索引、查询和分析。
- [The Graph Docs](https://thegraph.com/docs/)：学习 subgraph 如何组织链上数据查询。
:::

### Cross-track Combination

很多好项目不是单一方向，而是几个方向的组合。例如：

- AI wallet + permission：自然语言目标转成受限 session key。
- Agentic commerce + settlement：Agent 购买服务后用 escrow 验收。
- Governance + source-preserving summary：DAO 提案摘要保留来源和争议。
- Dev tooling + transaction interpreter：开发者工具解释 calldata 和测试边界。
- Decentralized AI + verifiable AI：开放推理网络加入证明或抽样验证。

组合项目要小心范围膨胀。最好的做法是选一个核心闭环，把其他能力作为支撑层，而不是一开始把所有概念都做进去。

### New Protocol / New Scenario

开放赛道也适合探索新协议或新场景，但新协议必须从具体摩擦出发。

值得考虑的问题：

- 现有协议为什么解决不了这个问题？
- 是否需要新的消息格式、支付格式、身份格式或证明格式？
- 哪些字段必须标准化，哪些可以留给应用层？
- 这个协议的第一个可运行场景是什么？
- 没有网络效应之前，单个项目是否也能获得价值？

不要为了“做协议”而做协议。一个好协议通常先从重复出现的工作流里长出来。

::: info 相关 topic
- [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)：了解 Agent 身份、信誉和发现相关的标准化尝试。
- [Google A2A](https://google-a2a.github.io/A2A/latest/)：学习 Agent-to-Agent 交互协议如何定义能力发现和任务协作。
:::

### Research Visualization

AI x Web3 里有大量复杂信息：协议架构、资金流、治理过程、攻击路径、模型评测、Agent workflow。Research Visualization 用可视化把这些复杂关系讲清楚。

可能的形式包括：

- 合约调用图。
- 资金流 Sankey 图。
- 治理提案时间线。
- Agent 工具调用 trace。
- 协议风险地图。
- 模型评测对比图。

AI 可以帮助抽取结构和生成解释，Web3 数据提供可验证来源。一个好的可视化工具不是只做漂亮图，而是让用户更快发现异常、理解因果、回到证据。

## 在 AI x Web3 中的位置

开放赛道是把前面所有基础能力重新组合的地方。它适合探索，但也最需要纪律：不要只讲概念，要落到用户、输入、输出、权限、验证和失败路径。

评估一个开放赛道项目，可以用四个问题：

- 用户是谁，今天怎么做这件事？
- AI 让哪一步变得明显更好？
- Web3 让哪一步变得可验证、可拥有、可结算或可治理？
- 最小版本是否可以在两周内做出可演示闭环？

## 最小实践

选择一个开放赛道想法，写一页项目规格。

必须包括：

- 用户画像和具体场景。
- 现在的工作流痛点。
- AI 负责的步骤。
- Web3 负责的步骤。
- 最小输入、处理流程和输出。
- 权限、隐私和失败路径。
- 第一个 demo 如何证明它不是概念包装。

## 扩展阅读

- [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)：Agent 发现、身份和信誉相关的 EIP。
- [Google A2A](https://google-a2a.github.io/A2A/latest/)：Agent 间协作协议的参考实现和规范。
- [The Graph Docs](https://thegraph.com/docs/)：链上数据索引与查询基础。
- [Dune Docs](https://docs.dune.com/)：学习如何用公开链上数据做分析和 dashboard。
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)：理解常见合约模块、权限和安全组件。
