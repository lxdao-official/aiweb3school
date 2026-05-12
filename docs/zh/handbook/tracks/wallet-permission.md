---
title: 钱包与权限（Wallet / Permission）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/tracks/wallet-permission/
---

# 钱包与权限（Wallet / Permission）

> AI Agent 一旦能帮用户操作钱包，产品问题就会从“能不能完成任务”变成“它到底被允许做什么”。钱包不是一个签名弹窗，而是 Agent 执行能力的权限边界。

## 为什么要探索这个

AI x Web3 产品最危险的地方，不是模型会说错话，而是错误判断可能变成真实链上操作。一次错误授权、错误转账、错误 swap 或错误合约调用，通常不能像普通 Web 应用那样撤回。

所以钱包与权限是所有执行型 Agent 的基础设施。它决定：

- Agent 是否只能读取数据，还是可以生成交易。
- 用户是否能看懂自己授权了什么。
- 权限是否有额度、时间、目标合约和函数范围。
- Agent 出错时能否撤销、冻结或恢复。
- 高风险操作是否必须人工确认或多签确认。

## 第一性原理

> **Agent 不应该拥有“钱包”，它只应该拥有一组可限制、可审计、可撤销的能力。**

把私钥交给 Agent 是最脆弱的设计。更稳的方式是让钱包、智能账户或权限模块来持有资产和执行权，Agent 只提出意图、生成候选交易、请求有限权限，并在规则允许时触发动作。

- **权限要比意图更具体**：不要只写“帮我管理资金”，要限制资产、额度、合约、函数、时间和频率。
- **签名前要可理解**：用户看到的不是 calldata，而是资产变化、授权对象、最大损失和失败路径。
- **撤销是默认能力**：任何长期权限都应该能被用户查看、暂停和撤销。

## 知识节点

### AI Wallet UX

AI Wallet UX 的核心不是把聊天框接到钱包，而是让用户知道 Agent 正在做什么、为什么要这么做、下一步会发生什么。

一个合格的 AI wallet 界面至少要展示：

- 用户目标：Agent 当前在执行哪个任务。
- 行动计划：接下来会读取什么、生成什么、调用什么。
- 权限请求：需要哪些资产、合约、函数和时间范围。
- 交易解释：签名后资产和状态会如何变化。
- 风险提示：最坏情况下可能损失什么。
- 撤销入口：用户如何停止 Agent 或收回权限。

**AI wallet 的体验重点不是“少点几次确认”，而是让确认变得有意义。**

::: info 相关 topic
- [Agent 钱包](/zh/handbook/bridge/agent-wallet/)：从 Agent 角度理解钱包、签名和执行边界。
- [Vitalik: What I would love to see in a wallet](https://vitalik.eth.limo/general/2024/12/03/wallets.html)：理解钱包应如何帮助用户理解交易、权限和安全。
:::

### Permission Policy

Permission Policy 是写给系统执行层看的规则，不是写给用户看的愿望。它应该能被程序检查，而不是只靠模型自觉遵守。

常见的 policy 维度包括：

- 资产范围：只允许 USDC，不允许 ETH 或 NFT。
- 金额上限：单笔、每日、每周、总额度。
- 目标合约：只能调用白名单协议。
- 函数范围：允许 `swapExactTokensForTokens`，不允许任意 `approve`。
- 价格和滑点：超过阈值必须重新确认。
- 时间窗口：权限几小时或几天后自动失效。
- 频率限制：防止 Agent 短时间连续执行。

AI 可以帮助生成 policy 草稿，但最终执行必须由钱包、智能账户、后端 guard 或合约模块校验。

### Session Key Flow

Session Key 是给特定任务临时使用的受限 key。它适合低风险、高频、可限制的操作，比如游戏动作、小额支付、重复查询、有限额度交易。

一个基本流程是：

1. 用户用主钱包创建一把 session key。
2. 同时设置权限范围，比如目标合约、额度、时间和函数。
3. Agent 使用 session key 发起符合规则的操作。
4. 钱包或 smart account 校验 policy。
5. 权限到期、额度用完或用户手动撤销后，session key 失效。

Session key 的价值是减少重复签名，但它不能绕过风险控制。额度太大、时间太长、函数太宽，就等于把主钱包风险换了一个名字。

::: info 相关 topic
- [ERC-4337 Docs](https://docs.erc4337.io/)：理解 smart account、UserOperation、bundler 和 paymaster 如何组成账户抽象流程。
- [ERC-7579](https://eips.ethereum.org/EIPS/eip-7579)：了解模块化智能账户如何扩展权限和执行模块。
:::

### Safe Guard

Guard 是交易执行前的检查器。它不关心模型为什么建议这笔交易，只关心这笔交易是否符合规则。

在 Agent 场景里，guard 可以检查：

- 目标地址是否在白名单。
- calldata 是否调用了允许的函数。
- token approval 是否超过额度。
- swap 滑点是否过大。
- 接收地址是否属于用户或明确授权对象。
- 交易模拟结果是否符合预期。
- 操作频率是否异常。

Guard 的设计原则是：**用确定性规则拦住不该发生的动作，用人工确认处理规则覆盖不了的灰区。**

### ERC-4337 Workflow

ERC-4337 把账户抽象变成一套围绕 `UserOperation` 的流程。对 Agent 产品来说，它的价值在于：用户账户可以不只是 EOA 私钥，而是一个可编程的 smart account。

一个简化的 ERC-4337 workflow：

1. Agent 生成交易意图或候选调用。
2. 前端或后端把它包装成 `UserOperation`。
3. Smart account 校验签名、nonce、权限和执行逻辑。
4. Bundler 把 UserOperation 打包提交给 EntryPoint。
5. Paymaster 可以按规则代付 gas。
6. 链上执行后，系统记录结果和失败原因。

这对 AI Agent 很重要，因为权限、gas、批量执行和恢复逻辑可以进入账户层，而不是全部塞进模型提示词。

### Pre-transaction Simulation

签名前模拟交易，是 Agent 钱包必须做的基础动作。模型解释 calldata 只能作为辅助，真正的安全判断需要看模拟结果。

模拟应该尽量回答：

- 这笔交易会改变哪些 token 余额。
- 会产生哪些授权。
- 会调用哪些合约。
- 是否可能失败或 revert。
- 价格、滑点和手续费是否在预期内。
- 交易执行后是否触发额外风险，比如无限授权。

模拟结果要翻译成人能理解的语言，但不能被模型自由发挥。关键字段应该来自结构化解析和链上模拟，而不是只靠自然语言总结。

### Recovery / Revocation

只要给了 Agent 权限，就必须设计恢复和撤销。

用户应该能在一个地方看到：

- 当前有哪些 Agent 或 session key。
- 每个权限能操作哪些资产和合约。
- 已经使用了多少额度。
- 什么时候过期。
- 最近执行了哪些动作。
- 如何暂停、撤销、轮换或恢复账户。

在更高价值场景里，还需要考虑 guardian、多签、延迟执行、社交恢复、硬件钱包确认和异常冻结。不要等事故发生后再补这些入口。

## 在 AI x Web3 中的位置

钱包与权限是执行型 Agent 的地基。没有权限层，Agent 只能停留在问答和建议；权限层做错，Agent 又会直接威胁资产安全。

一个靠谱的产品通常会按风险逐步开放：

- 第一阶段：只读钱包和链上数据。
- 第二阶段：生成交易草稿，但必须人工签名。
- 第三阶段：小额、白名单、短期 session key。
- 第四阶段：更复杂的自动化，但必须有 guard、审计和撤销。

## 最小实践

为一个“AI 自动小额换币助手”设计权限策略。

写清楚：

- 允许操作的 token、目标 DEX、最大单笔金额和每日上限。
- 允许调用哪些函数，禁止哪些函数。
- session key 的有效期和撤销方式。
- 交易模拟需要展示哪些字段。
- 哪些情况必须重新请求用户确认。
- 执行日志如何让用户复查。

## 扩展阅读

- [ERC-4337 Documentation](https://docs.erc4337.io/)：理解账户抽象的标准工作流和开发组件。
- [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337)：阅读 UserOperation、EntryPoint、bundler 和 paymaster 的规范原文。
- [EIP-7579](https://eips.ethereum.org/EIPS/eip-7579)：了解模块化智能账户如何支持插件化权限。
- [Safe Docs](https://docs.safe.global/)：学习多签、模块和 guard 在真实钱包系统里的设计。
- [OpenZeppelin Defender](https://docs.openzeppelin.com/defender)：了解部署、监控、自动化和安全运维工具。
