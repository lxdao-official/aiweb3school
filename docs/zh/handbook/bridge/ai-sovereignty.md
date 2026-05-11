---
title: AI 主权（AI Sovereignty）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/bridge/ai-sovereignty/
---

# AI 主权（AI Sovereignty）

> AI Sovereignty 讨论的是用户、开发者和社区能否控制自己的数据、模型选择、记忆、工具权限和执行环境，而不是被单一平台锁定。

## 为什么要学这个

AI 系统越来越像个人和组织的操作层：它记住偏好、读取文件、调用工具、管理钱包、代办任务。如果这些能力完全被封在一个平台里，用户很难迁移、审计或替换。

Web3 关心开放协议、可验证记录和用户控制。AI 主权就是把这些问题带回 AI：数据能否导出，模型能否切换，工具权限能否撤销，本地 AI 是否可用，Agent 身份能否跨平台保留。

**AI 主权的核心，是让用户保留退出、迁移、选择和验证的能力。**

## 第一性原理

> **越靠近用户决策和资产的 AI，越不能只依赖平台承诺。**

如果 Agent 管理钱包、治理投票、支付或私有记忆，用户需要的不只是“平台会保护你”，还需要可检查、可撤销、可迁移的机制。

- **控制权要在用户侧可见**：用户知道哪些数据、权限和记忆被使用。
- **选择权要真实存在**：模型、钱包、工具和存储不应被单点锁死。
- **可验证性要保底**：关键行为要有日志、签名、证明或链上记录。

## 知识节点

### User Control

**难度：初级。** User Control 是用户能查看、修改、撤销 AI 代理的权限和数据使用。

这包括关闭记忆、撤销 session key、切换模型、删除数据、导出历史、禁用工具和停止自动化任务。

User Control 最重要的是“用户能不能看见并改变系统状态”。如果 Agent 正在用哪个模型、保存了哪些记忆、拿着哪些工具权限、能花多少钱，用户都看不见，那就谈不上控制权。

对 AI x Web3 产品来说，控制面板至少要显示：连接的钱包、session key、授权额度、启用的工具、记忆开关、数据导出入口和紧急停止按钮。不要把这些藏在高级设置里。

### Data Portability

**难度：中级。** Data Portability 让用户可以把自己的偏好、记忆、任务历史和凭证带走。

如果 Agent 的长期价值来自记忆和上下文，不能导出的记忆就是锁定。可迁移数据需要开放格式、权限边界和隐私保护。

可迁移不等于把所有原始数据打包下载。更合理的是分层导出：任务历史、用户偏好、工具日志、身份凭证、可公开声誉、私有记忆分别导出，并标明敏感等级。

如果数据要给另一个 Agent 使用，最好提供机器可读格式，例如 JSON schema、VC、签名日志或 profile 文件。否则“可导出”只是下载一堆人看不懂的文本。

### Model Choice

**难度：初级。** Model Choice 是用户或开发者可以根据任务选择不同模型。

高隐私任务可以用本地模型，高难任务可以用强模型，低成本任务可以用小模型。系统不应把所有任务绑死在单一模型和供应商上。

Model Choice 不是让用户每次手动选模型，而是系统允许策略化选择：隐私优先、成本优先、质量优先、开源优先、可验证优先。用户可以设默认偏好，Agent 在执行前解释为什么选择某个模型。

模型切换也要进入评估流程。换模型可能改变拒绝策略、工具调用风格和输出格式，所以高风险 Agent 不能随便热切换模型后继续自动执行。

### Local-first AI

**难度：中级。** Local-first AI 优先在本地处理敏感数据，必要时才调用云端模型。

它适合钱包历史摘要、私有文档处理、草稿生成和权限检查。local-first 不等于完全离线，而是默认减少不必要外发。

Vitalik 在关于钱包未来的文章里提到，AI 可能把界面从“点击和输入”推向“说出目标，让 bot 完成”。这让本地优先更重要：如果钱包、身份和资产操作都经过 AI，用户设备和钱包本身就需要承担更多数据保护和主动防御能力。

Local-first AI 的现实做法可以是混合架构：本地模型做过滤、脱敏、风险初筛；云端强模型只接收必要摘要；最终交易仍由钱包或智能账户确认。

### Censorship Resistance

**难度：高级。** Censorship Resistance 关注 AI 服务、模型、数据和 Agent 身份是否会被单点封锁或删除。

对公共物品、治理、跨境协作和开放开发者生态来说，抗审查不是口号，而是服务可用性、数据保留和身份连续性问题。

AI 系统一旦成为信息入口，审查风险就不只是“某个网页打不开”。它可能表现为模型拒绝某类合法任务、平台下架某个 Agent、API 封禁某个地区、训练数据过滤某些观点。

抗审查设计包括：开源客户端、多模型 fallback、可自托管 endpoint、可迁移身份、去中心化存储、链上或签名审计记录。不是所有产品都要完全去中心化，但关键公共基础设施应该避免单点控制。

### d/acc

**难度：高级。** d/acc 代表 defensive accelerationism，强调加速防御性、去中心化和人类增强技术。

放到 AI x Web3 中，它提醒我们：不要只追求更强自动化，也要建设权限隔离、隐私保护、开源工具、可验证执行和用户控制。

Vitalik 在《My techno-optimism》中提出 d/acc 作为一种技术乐观但重视防御、民主、去中心化和差异化发展的框架；在《d/acc: one year later》中，他进一步把 d/acc 和 crypto 的底层价值连接起来：去中心化、抗审查、开放全球协作，以及更强的防御性技术。

对本 handbook 来说，d/acc 的实际含义是：AI x Web3 不应该只做“更强的自动代理”，还要做“更好的防御工具”。例如更安全的钱包、抗钓鱼界面、可验证 Agent 日志、隐私保护数据协作、开源模型评测、去中心化身份和声誉。

::: info 相关 topic
- [Vitalik: My techno-optimism](https://vitalik.eth.limo/general/2023/11/27/techno_optimism.html)：d/acc 概念的重要源头，讨论技术乐观、AI 风险、开源和防御性技术。
- [Vitalik: d/acc: one year later](https://vitalik.eth.limo/general/2025/01/05/dacc2.html)：进一步讨论 d/acc、crypto、AI safety、公共物品资助和防御性技术路线。
:::

### CROPS

**难度：高级。** CROPS 在 Ethereum Foundation Mandate 和 Vitalik/以太坊近期语境里，用来概括 Ethereum 应守住的核心属性：Censorship resistance、Open source、Privacy、Security。

把 CROPS 放到 AI x Web3 里，可以理解成一个产品价值检查表：

- **Censorship resistance**：Agent 身份、工具入口、数据来源和执行记录是否过度依赖单一平台。
- **Open source**：关键客户端、合约、策略、评估集或工具接口是否可检查。
- **Privacy**：用户数据、钱包历史、记忆和模型上下文是否被最小化和隔离。
- **Security**：钱包、权限、session key、工具调用、交易模拟和日志是否有明确防线。

CROPS 和 d/acc 是相通的：它不是反对 AI，而是要求 AI 进入钱包、治理、身份和支付层时，不能牺牲用户控制、隐私和安全。Vitalik 在钱包文章里也强调，用户只有在钱包本身也具备去中心化、抗审查、安全和隐私属性时，才能真正享受到 Ethereum 这些属性。

::: info 相关 topic
- [Ethereum Foundation Mandate](https://ethereum.org/foundation/mandate/)：EF 对 CROPS、self-sovereign computation 和 coordination at scale 的正式表述。
- [Vitalik: What I would love to see in a wallet](https://vitalik.eth.limo/general/2024/12/03/wallets.html)：讨论钱包作为用户进入 Ethereum 的窗口，为什么安全、隐私、抗审查和 AI 交互范式会变得重要。
- [Vitalik: d/acc: one year later](https://vitalik.eth.limo/general/2025/01/05/dacc2.html)：把 crypto 价值和 d/acc 的防御性技术路线连接起来。
:::

## 在 AI x Web3 中的位置

AI Sovereignty 是整个路线的价值底层。Agent Wallet 让用户控制权限，Verifiable AI 让关键输出可证明，AI Privacy 让数据使用有边界，Agent Identity 让 Agent 能跨平台存在。

没有主权设计，AI x Web3 很容易变成“用链上资产喂给更中心化的 AI 平台”。

## 最小实践

做一个 Agent 主权检查表：

1. 用户能否导出聊天、记忆、任务记录和工具日志？
2. 用户能否切换模型和关闭云端推理？
3. 用户能否查看并撤销 wallet/session key 权限？
4. Agent 身份是否能跨平台验证？
5. 关键执行是否有审计日志或链上记录？

## 扩展阅读

- [Ethereum Account Abstraction](https://ethereum.org/en/roadmap/account-abstraction/)：理解可编程账户如何改善用户控制。
- [W3C DID Core](https://www.w3.org/TR/did/)：了解可解析、可控制的去中心化身份。
- [Oasis Documentation](https://docs.oasis.io/)：了解隐私和可验证计算基础设施。
- [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)：Agent 身份和声誉的开放标准草案。
- [Ethereum Foundation Mandate](https://ethereum.org/foundation/mandate/)：理解 CROPS 如何进入 Ethereum Foundation 的正式使命表述。
- [Vitalik: My techno-optimism](https://vitalik.eth.limo/general/2023/11/27/techno_optimism.html)：理解 d/acc 的思想背景。
- [Vitalik: What I would love to see in a wallet](https://vitalik.eth.limo/general/2024/12/03/wallets.html)：理解 AI、钱包、隐私、安全和用户控制之间的关系。
