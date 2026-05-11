---
title: Agent Wallet
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/bridge/agent-wallet/
---

# Agent Wallet

> Agent Wallet 不是“给 AI 一个钱包私钥”这么简单。真正要解决的问题是：Agent 可以代表用户做哪些链上动作，这些动作有没有额度、时间、对象和风险限制，用户什么时候必须重新确认。

## 为什么要学这个

当 Agent 只是在聊天窗口里回答问题时，出错的成本通常还可控。  
但当它开始连接钱包、生成交易、调用合约、支付服务费时，问题就变成了：这个 Agent 到底能不能花钱，能花多少钱，能对谁花，能不能修改授权，出错以后怎么停下来。

这就是 **Agent Wallet** 要处理的核心。

它不是为了让 AI 完全接管用户资产，而是让用户可以把一小部分、可撤销、可审计的权限交给 Agent。这样 Agent 才能做一些真正有用的事情，比如自动支付 API 调用费、提交低风险交易、执行固定策略，或者在用户确认后完成一组链上操作。

如果没有这层钱包和权限设计，很多 AI x Web3 项目会卡在两个极端：

- **Agent 只能给建议，不能执行**：产品看起来智能，但永远停在“生成方案”。
- **权限给得太大，风险不可接受**：Demo 很顺，但真实用户不敢把资产交进去。

Agent Wallet 要找的是中间那条路：**让 Agent 可以执行，但只能在用户预先允许的边界里执行。**

## 第一性原理

Agent Wallet 的第一性原理可以压成一句话：

> **控制权不能交给一个概率系统。Agent 只能拿到可验证、可限制、可撤销的行动空间。**

这里的关键不是“不相信 AI”，而是要承认 Agent 的判断来自模型、上下文和工具返回值。它可能很有用，也可能被错误信息、恶意文档或不完整状态带偏。  
所以 Agent Wallet 的设计重点，不是让 Agent 更像一个“真人钱包用户”，而是把它的行动范围变成账户和系统都能检查的规则。

从这个原则往下推，主要是三条：

- **Agent 不直接控制主资产**：模型可以生成计划和交易草稿，但不应该拿到用户主私钥。高风险动作要重新交回给人确认。
- **钱包不只是签名按钮，而是权限系统**：它要表达时间、金额、合约、方法、资产、接收方和撤销条件，让模糊授权变成可检查规则。
- **自动化必须绑定撤销能力**：用户随时要能看见 Agent 拿了什么权限、做过什么、还能做什么，以及在哪里关掉它。

## 知识节点

### AA Wallet

AA Wallet 通常指基于 Account Abstraction 的钱包设计。它的重点不是换一个钱包界面，而是让账户本身拥有更灵活的规则。

传统 EOA 钱包更像 **一把私钥控制一个账户**。AA Wallet 则可以把签名、权限、支付 gas、恢复、多签、限额、session key 等逻辑放到账户规则里。

对 Agent 来说，AA Wallet 的关键不是“钱包更高级”，而是账户终于可以表达规则：**谁能操作、能操作什么、什么时候失效、超出边界怎么办**。

::: info 相关 topic
- [Account Abstraction](/zh/handbook/web3/account-abstraction/)：先理解 AA 和普通钱包账户的区别。
- [ERC-4337 Documentation](https://docs.erc4337.io/core-standards/erc-4337)：继续看 `UserOperation`、EntryPoint、Bundler、Paymaster。
:::

### Smart Account

Smart Account 可以理解为“带规则的钱包账户”。

它不只是保存资产，还可以定义：

- 谁可以发起操作
- 哪些操作需要用户确认
- 哪些合约可以被调用
- 每天最多能花多少钱
- 什么时候权限自动失效
- 出现异常时如何暂停

如果要让 Agent 自动做一点事，Smart Account 往往比普通私钥账户更适合承载这些边界。

判断一个 Agent Wallet 是否靠谱，重点看它是不是把“授权给 Agent”拆成了 **可检查的规则**，而不是一句模糊的“允许自动操作”。

::: info 相关 topic
- [Wallet](/zh/handbook/web3/wallet/)：补上钱包、签名和账户的基础概念。
- [Safe Modules](https://docs.safefoundation.org/smart-account/modules)：看智能账户如何通过模块支持自动化和自定义授权。
:::

### Safe

Safe 是 Web3 里很常见的多签和智能账户基础设施。很多团队金库、DAO 资金和高价值账户都会用 Safe 来管理。

放到 Agent 场景里，Safe 的价值在于：它天然适合把执行权拆开，而不是让一个 Agent 或一个人单独控制全部资产。

例如 Agent 可以生成交易草稿，或者触发一个低风险模块；但真正转账、升级合约、大额支付时，仍然需要多签成员确认。这样 Agent 参与的是流程，而不是独占最终控制权。

这对团队和 DAO 尤其重要：**Agent 可以提高效率，但不应该绕过治理和多签。**

::: info 相关 topic
- [Governance AI](/zh/handbook/bridge/governance-ai/)：理解 Agent 进入治理流程时，为什么更需要审批和记录。
- [Safe Guards](https://docs.safe.global/advanced/smart-account-guards)：看 Safe 如何在交易执行前后做规则检查。
:::

### Session Key

Session Key 可以理解为一把临时、有限权限的小钥匙。

用户不想每次小操作都手动签名，但也不可能把主私钥交给 Agent。Session Key 就是在这两者之间找平衡：允许 Agent 在一段时间内、在指定范围内自动执行某些动作。

一个合格的 session key 至少应该限制：

- 有效时间
- 可调用的合约或方法
- 单笔金额和总额度
- 可操作的 token 或资产类型
- 是否允许转出到外部地址
- 是否可以被用户随时撤销

这里最关键的判断是：**Session Key 不是小号私钥，而是一组受限能力。**

::: info 相关 topic
- [Rhinestone Smart Sessions](https://docs.rhinestone.dev/smart-wallet/smart-sessions/overview)：看 session key 如何组合协议限制、额度和过期时间。
:::

### Policy

Policy 是 Agent 执行链上动作时必须遵守的规则。

不要只把 policy 想成一段法律条款。对 Agent Wallet 来说，它应该尽量变成系统可以检查的条件，比如：

- 每天最多支付 10 USDC
- 只能调用白名单合约
- 只能执行 swap，不能 approve 无限额度
- 价格滑点超过 1% 就停止
- 任何 NFT 转出都必须人工确认

Policy 越清楚，Agent 的执行空间越可控。模糊的“帮我低风险操作一下”，不适合直接变成链上权限。

一个好的 policy 应该让系统能回答：**这笔操作到底有没有越界？**

::: info 相关 topic
- [AI Security](/zh/handbook/bridge/ai-security/)：继续看 Prompt Injection、工具权限隔离和行为审计。
:::

### Guard

Guard 是执行前的检查层，用来拦住不符合规则的动作。

Agent 可能会因为模型误判、工具返回错误、Prompt Injection 或上下文污染，生成一笔不该发出的交易。Guard 的作用就是在交易真正出去之前，再用确定性规则检查一次。

它可以检查：

- 目标地址是否在白名单里
- 调用方法是否允许
- 金额是否超限
- 授权额度是否异常
- 交易模拟结果是否符合预期
- 当前市场状态是否已经变化

注意这里的分工：**Agent 可以负责生成候选动作，Guard 必须负责拒绝越界动作。**

::: info 相关 topic
- [Safe Guards](https://docs.safe.global/advanced/smart-account-guards)：看 Guard 在交易前后检查中的位置。
:::

### Simulation

Simulation 是在交易发出前，先预演它可能产生的结果。

Agent 生成交易之后，不能只把 calldata 丢给用户签名。更好的体验是把模拟结果翻译成人能看懂的内容：

- 你将支付多少 token
- 你会收到什么
- 哪些授权会改变
- 哪个合约会被调用
- 失败时可能损失什么成本
- 这笔交易是否和用户原始目标一致

Simulation 不能保证百分百安全，但它可以把很多明显错误提前暴露出来。

尤其在 Agent 场景里，simulation 不只是技术检查，也是用户理解和确认的入口。它要回答的不是“交易能不能发”，而是：**这笔交易会让用户失去什么、得到什么、承担什么风险。**

::: info 相关 topic
- [Tenderly Simulation API](https://docs.tenderly.co/)：看交易模拟、资产变化、gas 估算和 state override。
:::

### Revocation

Revocation 是撤销权限。

很多人设计 Agent 权限时只想“怎么授权”，但真正重要的是“怎么收回”。用户应该能清楚看到当前给了 Agent 哪些权限，并且可以随时关闭。

需要特别注意的是，撤销不应该只发生在用户主动操作时。系统也可以在这些情况下自动收紧权限：

- session key 到期
- 额度用完
- 多次交易失败
- 检测到异常目标地址
- Agent 行为偏离原始任务
- 用户长时间没有确认

一个简单但很重要的产品原则：**所有自动化权限，都应该有一个用户看得见的关闭入口。**

### Human Check

Human Check 不是把所有事情都丢回给用户手动确认。那样 Agent 就失去了意义。

更合理的做法是分层：

- 低风险、可逆、小额动作：可以自动执行
- 中等风险动作：先模拟，再让用户确认
- 高风险、不可逆、外部可见动作：必须明确展示影响，并要求用户确认
- 超出 policy 的动作：直接拒绝，而不是问用户“要不要继续”

好的 Human Check 应该让用户看懂自己在批准什么，而不是只看到一串哈希、合约地址和“Confirm”按钮。

真正要确认的不是“你要不要签名”，而是：**这笔动作会改变什么，风险在哪里，为什么现在需要你确认。**

::: info 相关 topic
- [Agent Workflow](/zh/handbook/bridge/agent-workflow/)：理解哪些步骤适合自动执行，哪些步骤需要 human-in-the-loop。
:::

## 在 AI x Web3 中的位置

Agent Wallet 处在 AI x Web3 的关键连接点上。

AI 负责 **理解目标、整理上下文、生成计划**；Web3 钱包负责 **身份、资产、签名和链上执行**。Agent Wallet 要做的是把这两边接起来，但不能让模型直接越过用户控制权。

一个比较稳的链路通常是：

1. 用户给出目标和约束
2. Agent 读取上下文并生成计划
3. 系统把计划转成受限交易或操作
4. Guard 和 simulation 检查风险
5. 用户确认关键动作
6. Smart Account 或 Safe 执行
7. 日志记录 Agent 做过什么

这里最容易出问题的是第 3 步到第 6 步。  
很多项目把“模型生成计划”做得很顺，但没有认真处理 **交易模拟、权限校验、撤销入口和审计记录**。结果就是 Demo 看起来像自动化，真实使用时却没有足够的安全边界。

## 最小实践

做一个“Agent 受限支付钱包”的最小练习。

场景可以很简单：用户允许 Agent 在一天内最多花 5 USDC，用来支付某个白名单 API 或工具服务。Agent 可以自动完成小额支付，但不能转账给任意地址，也不能修改授权。

你需要写清楚或实现：

- 用户授权的额度、时间和目标地址
- Agent 可以自动执行的操作
- 哪些操作必须人工确认
- 交易发出前如何模拟和展示结果
- 超出 policy 时系统如何拒绝
- 用户在哪里查看和撤销当前权限
- 每次支付如何留下可审计记录

这个练习的重点不是做一个复杂钱包，而是把“有限授权、自动执行、随时撤销、可追踪”这四件事串起来。

完成后，至少要能展示一个对比：

- 正常情况：Agent 在额度内自动支付，并留下记录
- 超限情况：Agent 想支付 6 USDC，被 policy 拒绝
- 异常情况：目标地址不在白名单内，被 Guard 拦截
- 用户操作：用户手动撤销 session key，Agent 失去执行能力

## 扩展阅读

- [EIP-4337: Account Abstraction Using Alt Mempool](https://eips.ethereum.org/EIPS/eip-4337)：标准原文，适合看 `UserOperation`、EntryPoint、validation / execution 分离这些底层概念。
- [ERC-4337 Documentation](https://docs.erc4337.io/core-standards/erc-4337)：比 EIP 更适合入门，解释了 Bundler、Paymaster、UserOperation 和安全检查流程。
- [Safe Modules](https://docs.safefoundation.org/smart-account/modules)：理解 Safe 如何通过模块支持自动化、限额、白名单等扩展能力。
- [Safe Guards](https://docs.safe.global/advanced/smart-account-guards)：理解 Guard 如何在交易执行前后做检查，以及为什么 Guard 本身也需要审计和恢复机制。
- [Rhinestone Smart Sessions](https://docs.rhinestone.dev/smart-wallet/smart-sessions/overview)：适合学习 session key 如何表达可组合的 onchain permissions，例如协议限制、额度和过期时间。
- [Tenderly Simulation API](https://docs.tenderly.co/)：看交易模拟、资产变化、gas 估算和 state override，理解为什么 Agent 生成交易后还需要先模拟。
