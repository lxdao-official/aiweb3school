---
title: AI 预言机（AI Oracle）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/bridge/ai-oracle/
---

# AI 预言机（AI Oracle）

> AI Oracle 是把模型输出、评分、分类或推理结果提交给链上系统使用的机制。它的问题不只是“如何上链”，而是如何记录输入、模型、版本、证明和争议。

## 为什么要学这个

普通预言机把价格、天气、比赛结果等外部数据带上链。AI Oracle 更进一步：它可能把“这个任务是否完成”“这个内容是否违规”“这个地址是否高风险”“这个图片是否匹配描述”这类模型判断带上链。

这些输出往往不是客观单一答案。模型可能错，输入可能被污染，prompt 可能变化，版本可能更新。所以 AI Oracle 必须把结果和生成过程一起纳入信任设计。

**AI Oracle 的核心，不是让模型替合约做判断，而是让模型判断变成可记录、可验证、可挑战的输入。**

## 第一性原理

> **当 AI 输出会影响链上资产或权限时，输出本身必须有来源、边界和争议机制。**

如果一个合约根据 AI 输出释放 escrow，错误判断就会直接造成资金损失。系统不能只记录“模型说通过”，还要记录输入、模型版本、执行环境、时间和验证人。

- **输入要可追溯**：模型看到了什么，不能只留最终答案。
- **结果要结构化**：链上不适合消费长篇自然语言，需要明确字段。
- **争议要提前设计**：谁能挑战，挑战期多久，如何复核。

## 知识节点

### AI Output

**难度：初级。** AI Output 是模型给出的结果，可以是文本、标签、分数、结构化 JSON 或决策建议。

链上系统最好只消费结构化输出，例如 `accepted: true`、`riskScore: 72`、`category: "spam"`，而不是直接消费长文本。长文本可以作为 evidence 存储在链下，并用 hash 关联。

AI Output 最好分成“机器字段”和“人类解释”两层。机器字段进入合约或后端规则，人类解释进入 UI、报告或争议材料。不要让合约依赖一段自然语言文本做关键判断。

如果输出会影响资金或权限，还要记录 confidence、模型版本、输入 hash、输出 hash 和生成时间。否则后续很难判断模型为什么给出这个结果。

### Data Feed

**难度：中级。** AI Oracle 也可以表现为一种 data feed，持续提供模型处理后的数据。

例如地址风险评分、内容审核标签、交易意图分类、市场情绪指数。持续 feed 必须处理更新时间、版本变更、异常值和历史回放。

AI data feed 比价格 feed 更容易漂移。模型升级、训练数据变化、prompt 调整、输入来源变化，都会让同一个对象的评分发生变化。feed 应该明确版本，并允许查询历史。

如果 feed 用于自动执行，合约或后端至少要检查 stale data、异常跳变和来源签名。不要让过期的 AI 评分继续影响清算、释放资金或封禁用户。

### Model Result

**难度：中级。** Model Result 需要包含模型版本、prompt 或任务模板、输入引用和输出字段。

如果只保存结果，不保存生成条件，后续很难复核。尤其当模型升级后，同样输入可能得到不同结果。

Model Result 还应包含输出 schema。比如风险评分是 0-100 还是 0-1，越高代表风险越高还是越低，阈值是谁定义的。这些不清楚，后续集成方很容易误用。

在多模型系统里，还要记录路由信息：为什么选择这个模型，是否用了 fallback，是否经过人工复核。这些都属于结果可信度的一部分。

### Oracle Risk

**难度：高级。** AI Oracle 风险包括模型错误、输入污染、prompt injection、数据偏差、执行环境被篡改、输出不可复核和经济攻击。

风险大小取决于输出影响什么。如果只是展示标签，风险较低；如果决定释放资金、罚没 stake 或拒绝用户，风险会显著上升。

Oracle Risk 的关键是“错误输出的后果”。同样一个错误分类，在内容推荐里可能只是体验问题，在 escrow 里可能直接导致错误付款，在声誉系统里可能毁掉服务方历史。

因此 AI Oracle 应该按影响范围分层：低风险输出可以直接展示，中风险输出需要人工复核，高风险输出需要 challenge、multi-evaluator 或可验证执行。

### Attestation

**难度：中级。** Attestation 可以证明某个主体或执行环境对 AI 输出作出了声明。

例如 TEE 证明某模型在特定环境中运行，验证者证明某输出通过测试，服务方签名证明这份结果来自它的 API。Attestation 不等于结果正确，但能证明“谁在什么条件下给出了这个结果”。

Attestation 的字段要具体。只写“verified”意义很小；更有用的是：验证者是谁，验证对象是什么，输入/输出 hash 是什么，模型版本是什么，证明何时过期，是否可撤销。

对链上系统而言，attestation 往往作为可消费信号，而不是最终真理。合约可以要求有某类 attestation 才进入下一步，但仍可保留争议窗口。

### Proof of Inference

**难度：高级。** Proof of Inference 试图证明某个输出确实来自某个模型和输入。

实现路线可能包括 TEE、ZK、签名日志、可重放推理或可信服务证明。不同路线在成本、隐私、可验证性和工程复杂度上差异很大。

Proof of Inference 需要先明确“证明什么”：证明用了某个模型，证明输入没变，证明输出由某环境生成，还是证明推理过程完整正确。不同目标对应不同技术。

大型 LLM 的完整推理证明目前成本很高，现实系统往往采用折中：TEE 证明运行环境，签名日志证明输入输出，ZK 证明关键后处理，challenge 处理争议。

### Dispute / Challenge

**难度：高级。** Dispute / Challenge 是对 AI Oracle 输出提出异议的机制。

它可以采用 optimistic 模式：先接受结果，给出挑战窗口；若有人提出证据，则进入复核、仲裁或多方验证。没有 challenge 机制的 AI Oracle，很容易把模型错误硬写进链上状态。

Challenge 机制要设置合理窗口和成本。窗口太短，用户来不及发现错误；窗口太长，结算效率低。挑战成本太低会被 spam，太高会让受害者无法申诉。

一个实用做法是按金额和风险分层：小额任务短窗口，较高价值任务长窗口，高争议任务进入人工或多方 evaluator。

## 在 AI x Web3 中的位置

AI Oracle 位于 Oracle、Verifiable AI、Settlement & Escrow 的交叉点。它可以帮助链上系统使用 AI 判断，但必须谨慎限制影响范围。

最稳妥的路径通常是从低风险场景开始：标注、摘要、预警、辅助评分。涉及资金释放、惩罚或权限变更时，需要证明、挑战期和人工复核。

## 最小实践

设计一个“任务完成判断”的 AI Oracle：

1. 定义输入：任务说明、交付物 hash、验收标准。
2. 定义输出：`accepted`、`score`、`reason`、`modelVersion`。
3. 记录输入 hash、prompt 模板、模型版本和时间。
4. 设计 challenge window：例如 24 小时内可提交反证。
5. 写出如果输出错误，资金如何暂停或回滚到争议流程。

## 扩展阅读

- [Ethereum Oracles](https://ethereum.org/en/developers/docs/oracles/)：理解预言机的基本问题。
- [ERC-8183: Agentic Commerce](https://eips.ethereum.org/EIPS/eip-8183)：查看 Agentic Commerce 如何讨论 proof、evaluator 和 escrow。
- [ERC-8004: Trustless Agents](https://eips.ethereum.org/EIPS/eip-8004)：了解 validation registry 如何为 Agent 输出提供验证信号。
- [Oasis ROFL Documentation](https://docs.oasis.io/build/tools/cli/rofl/)：了解 TEE 方向的可验证离线计算。
- [RISC Zero](https://github.com/risc0/risc0)：了解 zkVM 方向的通用可验证计算。
