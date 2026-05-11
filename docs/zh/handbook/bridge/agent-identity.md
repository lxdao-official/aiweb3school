---
title: 智能体身份（Agent Identity）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/bridge/agent-identity/
---

# 智能体身份（Agent Identity）

> Agent Identity 不是给 Agent 起个名字，而是让用户、服务和其他 Agent 能验证：它是谁、谁控制它、能提供什么能力、服务入口在哪里、历史记录能不能追溯。

## 为什么要学这个

当 Agent 只在一个应用内部运行时，身份可以由平台数据库管理。但一旦 Agent 要跨应用购买服务、接受委托、调用工具、收款、积累声誉，就需要可验证身份。

没有身份，Agent 之间无法建立长期信任：今天的“高质量 Agent”明天可能换了服务端、换了 owner、换了能力描述，用户却无法判断。

**Agent Identity 的核心，是把 Agent 从临时会话变成可发现、可验证、可追责的经济参与者。**

## 第一性原理

> **Agent 身份必须绑定控制权、能力声明和服务入口，而不只是一个显示名称。**

一个真正可用的 Agent 身份，至少要回答：谁拥有这个 Agent，Agent 能做什么，如何调用它，它使用哪些钱包或密钥，历史声誉和验证记录在哪里。

- **身份要可解析**：别人能从 identifier 找到 profile 和 endpoint。
- **控制权要可证明**：更新 profile 或接收付款的人要能证明自己是 owner。
- **能力要可验证**：能力声明需要测试、证明、评价或历史记录支撑。

## 知识节点

### Agent Profile

**难度：初级。** Agent Profile 是 Agent 的公开说明文件。

它通常包含名称、描述、服务范围、价格、接口、钱包地址、能力列表、模型或工具说明、隐私政策、owner 和版本。Profile 不应只写营销文案，还要包含机器可读字段。

一个更实用的 profile 应该同时给人和机器看。人要能理解这个 Agent 是做什么的、由谁运营、收费如何；机器要能解析 endpoint、capabilities、schemas、auth、payment、terms 和版本。

Profile 还要考虑更新历史。Agent 换了模型、换了服务端、换了收款地址、增加高风险能力，都不应该静默发生。更新记录本身就是信任信号。

### Capability

**难度：中级。** Capability 描述 Agent 能完成什么任务，以及它需要哪些输入和权限。

例如“总结治理提案”“生成 Solidity 测试”“执行小额稳定币支付”是完全不同能力。能力声明最好绑定 schema、价格、限制、测试记录和失败条件。

Capability 不应该写成“我什么都能做”。越具体越有用：输入类型是什么，输出格式是什么，是否需要钱包权限，是否会调用外部 API，最长执行时间是多少，失败如何退款。

如果能力会触发链上动作，还要标记风险等级。比如“只读分析”是低风险，“生成交易草稿”是中风险，“自动执行交易”是高风险。

### Service Endpoint

**难度：初级。** Service Endpoint 是外部系统调用 Agent 的入口。

它可以是 HTTPS API、A2A endpoint、MCP server、Webhook 或链上 registry 指向的服务地址。Endpoint 必须处理认证、限流、版本、可用性和日志。

Endpoint 的安全性直接影响身份可信度。攻击者如果劫持 endpoint，即使链上 Agent id 没变，用户实际调用的也可能是恶意服务。因此 endpoint 更新应该需要 owner 签名，并保留历史。

服务入口还要描述支持的协议和版本。A2A、MCP、REST API、WebSocket 的交互方式不同，Agent 之间需要先协商能力和任务格式。

### Registry

**难度：中级。** Registry 用来登记、发现和更新 Agent 身份。

链上 registry 可以提供公开可查的身份锚点，例如 agent id、owner、profile URI、服务 endpoint 和更新记录。链下 registry 则更灵活，但信任边界更中心化。

Registry 的价值在于发现和连续性。用户不应该每次都从社交媒体链接判断 Agent 是否真实，而可以通过 registry 找到同一个 agentId、owner 和 profile。

Registry 也不是万能信任层。它能证明“这个身份是谁注册的”，不能证明“这个 Agent 一定好用或安全”。能力和声誉需要后续验证。

### DID / VC

**难度：中级。** DID 和 Verifiable Credential 提供更通用的去中心化身份和可验证声明模型。

DID 可以表达可解析身份，VC 可以表达由某个 issuer 签发的声明，例如“这个 Agent 通过了某个能力测试”“这个 Agent 由某团队运营”。

DID/VC 的优势是通用，不局限于某条链。一个 Agent 可以用 DID 表达跨平台身份，用 VC 承载能力证明、组织隶属、审计通过、合规声明。

但 VC 的可信度取决于 issuer。任何人都能签发声明并不等于任何声明都可信。产品要展示 issuer、签发时间、撤销状态和验证路径。

::: info 相关 topic
- [W3C DID Core](https://www.w3.org/TR/did/)：理解 Decentralized Identifiers 的基本模型。
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/)：理解可验证凭证如何表达声明和证明。
:::

### A2A

**难度：中级。** A2A 关注 Agent 与 Agent 之间如何发现、通信、协商任务和交换结果。

如果 Agent 要互相委托任务，仅有钱包地址不够。它们需要知道对方支持什么协议、如何认证、任务状态如何同步、结果如何返回。

A2A 更像 Agent 的通信层，而不是身份层本身。身份系统需要告诉你“我在和谁说话”，A2A 负责“怎么协作”。两者结合后，Agent 才能跨平台发现、协商、委托和返回结果。

在支付场景中，A2A 消息最好和 Payment Intent、Receipt、Escrow 状态关联，否则对话和结算会分裂成两套不可对账系统。

::: info 相关 topic
- [Agent2Agent Protocol](https://google-a2a.github.io/A2A/latest/)：了解 Agent 之间互操作和任务协作的开放协议。
:::

### Ownership

**难度：高级。** Ownership 决定谁能更新 Agent profile、收款地址、服务 endpoint 和权限。

Agent owner 可以是 EOA、Smart Account、多签、DAO 或企业账户。高价值 Agent 不应该由单个热钱包控制。身份更新、endpoint 更新和收款地址变更都应该留下可验证记录。

Ownership 还涉及责任归属。如果一个 Agent 提供付费服务，出了错由谁处理退款、争议和赔偿？如果 owner 是 DAO 或多签，治理和运营流程也要能被用户理解。

对外展示时，建议把 operator 和 owner 分开：operator 运行服务，owner 控制身份和关键更新。两者可以是同一个主体，也可以分离。

## 在 AI x Web3 中的位置

Agent Identity 是 Agent Trust、Machine Payment 和 Agentic Commerce 的前置条件。用户要付款给 Agent，必须知道付款对象是谁；另一个 Agent 要委托任务，也需要验证对方服务入口和历史记录。

身份本身不等于可信。它只是信任系统的第一层：先知道对象是谁，再看它做过什么、谁评价过它、是否有 stake、是否有验证证明。

## 最小实践

设计一个 Agent Profile：

1. 写出 Agent 名称、描述、owner、endpoint。
2. 列出 3 个 capability，每个 capability 写输入、输出、价格和限制。
3. 设计一个 profile URI，可以是 HTTPS 或 IPFS。
4. 写出谁能更新 profile，更新后如何通知用户。
5. 写出如何证明这个 endpoint 确实属于该 Agent。

## 扩展阅读

- [ERC-8004: Trustless Agents](https://eips.ethereum.org/EIPS/eip-8004)：了解 Agent 身份、声誉和验证 registry 的标准草案。
- [ERC-8004 Website](https://www.geterc8004.com/)：快速理解 ERC-8004 的身份和 registry 模型。
- [W3C DID Core](https://www.w3.org/TR/did/)：去中心化身份标准。
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/)：可验证声明的数据模型。
- [Agent2Agent Protocol](https://google-a2a.github.io/A2A/latest/)：Agent 间通信和互操作协议。
