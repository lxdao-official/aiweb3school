---
title: 结算与托管（Settlement & Escrow）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/bridge/settlement-and-escrow/
---

# 结算与托管（Settlement & Escrow）

> Settlement & Escrow 解决的是 Agent 经济里的“钱什么时候释放、服务怎么算完成、失败怎么退款、争议怎么处理”。它把支付从一次转账变成完整交易流程。

## 为什么要学这个

Agent 可以购买 API、委托另一个 Agent 写代码、让服务商跑一个模型、或者完成一段链上操作。但付款和交付之间有时间差：先付钱可能被服务方骗，先交付可能收不到钱。

Escrow 提供一个中间层：资金先被锁定，服务完成并被接受后释放，失败或争议时按规则退款或仲裁。

**结算的核心不是“把钱打过去”，而是把任务、交付、验收和付款绑定成可验证流程。**

## 第一性原理

> **自动化交易必须有明确完成条件，否则支付就无法安全自动化。**

如果任务定义模糊，Agent 和服务方就很难判断何时完成、谁来确认、失败怎么办。Escrow 设计首先要定义状态机，而不是先写付款代码。

- **资金状态要清楚**：pending、locked、released、refunded、disputed。
- **交付证明要可保存**：结果、hash、日志、模型输出、交易哈希都可能成为证据。
- **争议流程要提前设计**：不要等失败后才讨论谁有权判定。

## 知识节点

### Escrow

**难度：初级。** Escrow 是把资金暂时锁在合约或可信账户里，等待交付条件满足后再释放。

在 Agent 场景里，escrow 可以绑定任务 ID、付款方、服务方、金额、截止时间、验收规则和退款条件。它适合一次性任务、API 包、模型推理、数据交付和跨 Agent 委托。

Escrow 的关键是状态机。最小状态通常包括 `Created`、`Funded`、`Delivered`、`Accepted`、`Refunded`、`Disputed`、`Released`。每个状态都应该规定谁能触发、需要什么证据、超时后怎么处理。

不要把 escrow 只当成“锁钱合约”。如果没有任务描述、交付标准和争议路径，锁钱只会把双方困在合约里。好的 escrow 先定义业务流程，再定义资金流。

### Receipt

**难度：初级。** Receipt 是支付和交付后的凭证。

收据不只是“已付款”。它应记录：谁付给谁、金额、币种、任务 ID、quote id、时间、交易哈希、服务结果引用和验收状态。没有 receipt，后续对账、声誉和争议都很困难。

Agent 经济里，receipt 还会成为 reputation 的输入。一个 Agent 是否按时付款、服务方是否按时交付、任务是否被退款，都可以从 receipt 和状态变更中提取。

Receipt 最好同时服务人和机器：人能看懂它描述的任务和金额，机器能解析任务 ID、付款 tx、交付 hash、验收状态。

### Delivery Proof

**难度：中级。** Delivery Proof 证明服务方确实交付了某个结果。

它可以是文件 hash、API 返回日志、模型输出签名、链上 event、TEE attestation、人工验收记录或另一个 Agent 的验证结果。关键是：证明必须能和原始任务对应起来。

Delivery Proof 要避免“结果存在但不可验证”。例如服务方说已经生成报告，但没有 hash、没有时间戳、没有版本信息，后续很难证明交付物是否被替换。

不同任务需要不同 proof。API 调用可以用请求/响应 hash，代码任务可以用 commit hash 和测试结果，数据任务可以用 dataset hash，模型任务可以用模型版本、输入 hash 和输出 hash。

### Acceptance

**难度：中级。** Acceptance 是付款方或规则系统确认“交付满足要求”的动作。

验收可以由用户点击确认，也可以由自动 evaluator 判断。但高价值任务不要只靠模型一句“看起来完成了”。需要明确验收标准、截止时间和失败路径。

Acceptance 应该尽量拆成可检查条件：字段是否完整、测试是否通过、结果是否在时间内提交、hash 是否匹配、预算是否未超出。主观判断可以存在，但要标明由谁作出。

如果验收由 AI 完成，建议使用“AI 初审 + challenge window + 人工复核”的组合。这样低风险任务可以自动通过，高争议任务也不会被模型一次判断决定资金归属。

### Refund

**难度：初级。** Refund 是交付失败、超时或取消时把资金退回。

退款规则要在任务开始前写清楚：谁能触发，多久后可以触发，是否扣除部分费用，服务方是否能申诉。

Refund 不是失败后的临时善意，而是协议的一部分。常见退款触发条件包括：服务方超时、交付格式错误、验收失败、任务被取消、quote 过期、服务方 endpoint 不可用。

退款也要考虑部分交付。例如服务方完成了数据抓取但分析失败，是否按比例付款？如果没有部分退款规则，双方容易进入 dispute。

### Dispute

**难度：高级。** Dispute 处理付款方和服务方对交付是否合格的分歧。

争议可以由人工仲裁、多签、DAO、optimistic challenge、第三方 evaluator 或链上规则处理。关键不是完全去掉主观判断，而是让争议流程可预期、可记录、可执行。

Dispute 设计至少要回答：谁能发起，发起成本是多少，证据提交格式是什么，谁有裁决权，裁决后是否可申诉。没有成本的争议容易被滥用；成本过高又会让小额任务无法维权。

对 Agent-to-Agent 交易来说，争议记录也是声誉系统的重要输入。频繁进入 dispute 的服务方或客户，都应该被后续交易看到。

### Evaluator

**难度：高级。** Evaluator 是判断交付是否合格的角色或系统。

Evaluator 可以是脚本、测试套件、模型、人工审核员、多个验证者或链上合约。AI evaluator 适合做初步判断，但高价值任务通常需要可复核证据和挑战机制。

Evaluator 本身也需要被评估。一个错误率很高的 evaluator 会把 escrow 变成随机判决。系统应该记录 evaluator 版本、输入、输出、错误率和历史争议结果。

对于代码、数据、报告类任务，可以组合 evaluator：脚本检查格式，测试套件检查功能，AI 检查语义，人类处理争议。不要把所有责任压给一个模型。

### ERC-8183

**难度：高级。** ERC-8183 是围绕 agentic commerce 的草案标准，关注 Agent 任务、支付、escrow、交付和验证如何形成统一流程。

它把 agent commerce 从“随便发一笔钱”推进到更结构化的交易模型：任务、状态、proof、settlement、dispute 都应该能被系统理解。

理解 ERC-8183 时，重点不是马上采用标准，而是学习它试图解决的抽象：Agent 经济里的交易不是单纯 token transfer，而是围绕任务生命周期的状态转换。

它也和 ERC-8004 互补：ERC-8004 更偏 Agent 身份、声誉和验证；ERC-8183 更偏任务、支付、托管和交付。一个完整 agent commerce 系统通常需要两者的思路。

::: info 相关 topic
- [ERC-8183: Agentic Commerce](https://eips.ethereum.org/EIPS/eip-8183)：了解 Agentic Commerce 的标准草案。
:::

## 在 AI x Web3 中的位置

Settlement & Escrow 是 Machine Payment 的后半段。前者解决“如何付款”，这里解决“付款后如何确认价值交换完成”。

对 Agent 来说，escrow 让自动委托更安全：Agent 可以锁定预算，等待服务结果和 proof，再释放资金。对服务方来说，escrow 也提供付款保障。

## 最小实践

设计一个“Agent 付费生成报告”的 escrow 流程：

1. 用户锁定 2 USDC。
2. 服务方承诺 10 分钟内交付报告。
3. 报告提交后记录 IPFS hash 或文件 hash。
4. Evaluator 检查报告是否包含指定字段。
5. 通过则释放付款，失败或超时则退款。
6. 有争议时进入人工或多签仲裁。

## 扩展阅读

- [ERC-8183: Agentic Commerce](https://eips.ethereum.org/EIPS/eip-8183)：Agentic Commerce 的任务、支付和结算标准草案。
- [ERC-8004: Trustless Agents](https://eips.ethereum.org/EIPS/eip-8004)：理解 Agent 身份、声誉和验证如何辅助交易信任。
- [AP2 Documentation](https://ap2-protocol.org/)：了解 Agent 支付授权和可审计证明。
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x)：学习 escrow、payment 和 access control 相关合约设计基础。
