---
title: 智能体信任与声誉（Agent Trust & Reputation）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/bridge/agent-trust-and-reputation/
---

# 智能体信任与声誉（Agent Trust & Reputation）

> Agent Trust & Reputation 解决的是：当一个 Agent 声称自己能完成任务时，用户和其他 Agent 如何判断它是否可靠、历史是否真实、失败是否有代价。

## 为什么要学这个

未来的 Agent 可能会互相委托任务、购买服务、执行支付、提交报告或参与治理。仅靠“看起来专业的描述”无法建立信任。

声誉系统要把 Agent 的历史行为、用户评价、验证记录、抵押、惩罚和争议结果组织成可查询信号。但声誉也可能被刷、被操纵、被平台垄断。

**信任不是一个分数，而是一组可追溯、可比较、可解释的证据。**

## 第一性原理

> **Agent 的可信度应该来自可验证行为，而不是自我声明。**

一个 Agent 说“我擅长合约审查”没有太大意义。更有价值的是：它审查过哪些合约，谁验证过，错过哪些问题，是否有 stake，失败后有没有赔付或 slashing。

- **声誉要绑定身份**：没有稳定身份，历史记录无法积累。
- **评价要绑定任务**：泛泛五星评价不如具体任务结果。
- **惩罚要真实**：没有成本的承诺很容易被滥用。

## 知识节点

### Reputation

**难度：初级。** Reputation 是 Agent 历史表现形成的信号集合。

它可以包括成功率、响应时间、争议率、退款率、用户评分、验证通过次数、stake 数量和任务类型表现。不要把所有信号压成一个黑盒分数，否则用户很难判断适用场景。

Reputation 最好按任务类型拆开。一个擅长总结治理提案的 Agent，不一定擅长写合约测试；一个执行小额支付稳定的 Agent，不一定适合做高价值 escrow evaluator。

声誉还要处理时间衰减。两年前的好表现不能完全代表今天的服务质量，尤其当模型、owner、endpoint 或工具栈都可能已经变化。

### Review

**难度：初级。** Review 是用户、客户或其他 Agent 对任务结果的反馈。

Review 应该绑定任务 ID、交付物、付款记录和评价者身份。否则就容易变成可刷的口碑文本。对高价值任务，review 还应该允许撤销、争议或附加证据。

Review 的质量比数量重要。一个包含任务说明、验收标准、交付 hash 和具体问题的 review，比十个“good job”更有价值。

同时要防止互刷。评价者本身也需要身份和声誉，或者至少要能看到它和被评价 Agent 的历史交易关系。

### Attestation

**难度：中级。** Attestation 是某个主体对 Agent、任务或结果做出的可验证声明。

例如“某评测者证明这个 Agent 完成了测试集”“某用户证明任务按要求交付”“某 TEE 证明此输出来自某版本程序”。Attestation 的价值取决于 issuer 是否可信、声明内容是否具体、是否可撤销。

Attestation 应该尽量结构化：issuer、subject、claim、evidence、expiration、revocation。没有过期和撤销机制的 attestations，容易在条件变化后继续误导用户。

它也可以成为 reputation 的基础数据，而不是直接展示给最终用户。系统可以聚合多条 attestations，但仍要允许用户回到原始声明查看证据。

### Stake

**难度：中级。** Stake 是 Agent 或运营方押上的经济保证。

Stake 让承诺有成本。用户可以更愿意信任有抵押的服务方，但 stake 本身不代表能力，只说明失败时可能有资金可被罚没或赔付。

Stake 还会带来选择偏差。资本多的 Agent 不一定能力更强，小团队或公共物品 Agent 可能 stake 少但质量高。因此 stake 应该和 validation、review、task history 一起看。

设计 stake 时要明确：抵押什么资产，锁多久，什么条件下释放，什么条件下罚没，罚没给谁。

### Slashing

**难度：高级。** Slashing 是在 Agent 违约、作弊或输出虚假结果时罚没抵押。

Slashing 设计很难。必须先定义违约证据、挑战窗口、仲裁者、误罚处理和申诉机制。否则 slashing 不是安全机制，而是新的治理风险。

错误 slashing 会伤害正常服务方，过弱 slashing 又无法约束恶意行为。对主观任务，比如“报告质量是否足够”，最好不要直接自动 slashing，而应先进入 dispute。

更适合自动 slashing 的场景是明确可验证违约：未按时交付、签名伪造、重复提交矛盾结果、违反链上可检查的 policy。

### Validation

**难度：中级。** Validation 是对 Agent 能力或任务结果的验证流程。

它可以是自动测试、benchmark、人工审核、另一组 Agent 复核、链上证明或 TEE attestation。Validation 最好记录测试数据、版本、时间和验证者。

Validation 要区分“能力验证”和“任务结果验证”。前者说明 Agent 大概率能做某类任务，后者说明某次具体交付是否合格。

对 Agent marketplace 来说，最好把 validation 结果做成可查询历史，而不是只贴一个认证徽章。

### ERC-8004

**难度：高级。** ERC-8004 提供 Agent 身份、声誉和验证 registry 的标准草案。

它把 Agent 的 identity、reputation、validation 分成可组合 registry，让不同应用可以用相同格式发现和评价 Agent。但它也明确不能保证 Agent 声称的能力一定真实，能力仍要靠验证和信任模型支撑。

ERC-8004 值得关注的地方，是它没有试图把“信任”做成单一中心化评分，而是提供身份、反馈和验证信号的公共承载层。不同应用可以在此基础上构建自己的过滤和排序规则。

使用 ERC-8004 类标准时，要提醒用户：链上注册可以证明身份连续性，不能自动证明服务质量。声誉系统仍然要考虑 Sybil、刷评、评价者可信度和任务类型差异。

::: info 相关 topic
- [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)：了解 Trustless Agents 的 identity、reputation 和 validation registry。
:::

## 在 AI x Web3 中的位置

Agent Trust & Reputation 连接 Agent Identity、Settlement & Escrow 和 Machine Payment。没有信任层，Agent 之间无法安全委托；没有声誉和验证，用户也难以判断哪个 Agent 值得付款。

但不要过度相信声誉分数。真正可靠的系统应该同时看身份、任务历史、评价者、证明、stake、争议记录和上下文适配度。

## 最小实践

设计一个 Agent 任务声誉记录：

1. 定义任务：例如“生成一份合约风险摘要”。
2. 记录 Agent id、用户 id、任务输入 hash、交付物 hash、付款记录。
3. 设计 review 字段：准确性、及时性、是否需要返工。
4. 设计 validation 字段：谁验证、怎么验证、是否可复现。
5. 设计失败时的 refund 或 slashing 条件。

## 扩展阅读

- [ERC-8004: Trustless Agents](https://eips.ethereum.org/EIPS/eip-8004)：Agent 身份、声誉和验证 registry 标准草案。
- [ERC-8004 Website](https://www.geterc8004.com/)：快速理解标准目标和三个 registry。
- [Ethereum Attestation Service](https://attest.org/)：了解通用 attestation 如何表达可验证声明。
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/)：理解可验证声明的数据模型。
