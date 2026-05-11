---
title: 安全（Security）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/web3/security/
---

# 安全（Security）

> Web3 安全不是上线前找人审一次代码，而是从合约设计、权限、测试、交易模拟、监控、应急暂停到权限撤销的一整套工程流程。

## 为什么要学这个

链上系统的错误成本比普通应用高。合约一旦部署，资产可能已经进入协议，攻击者可以直接和公开接口交互，交易执行结果也通常不能随意回滚。

安全不是只属于 auditor 的工作。产品、前端、后端、合约、运营和 AI Agent 都会影响安全边界：一个错误授权按钮、一个无限 approve、一个不受限的 Agent tool、一条没模拟的交易，都可能变成事故入口。

**Web3 安全的核心不是“没有 bug”，而是把可预见风险尽量挡在执行前，并在执行后能快速发现和止损。**

## 第一性原理

> **链上系统默认暴露在公开对抗环境里，任何可调用路径都要按攻击面看待。**

普通后端可以靠权限、网络隔离、人工回滚和数据库修复兜底。合约不同：代码公开，状态公开，资金公开，攻击者可以反复模拟和抢跑。

- **权限必须最小化**：owner、admin、upgrade、pause、withdraw 都要有清楚边界。
- **执行前要模拟**：交易能不能成功、会改什么资产、会调用哪些合约，都要尽量提前看见。
- **上线后要监控**：安全不是部署那一刻结束，异常转账、参数变更、失败交易和价格波动都要持续观察。

## 知识节点

### Reentrancy

**难度：中级。** Reentrancy 是合约在外部调用未完成前被再次调用，导致状态被重复利用的经典漏洞。

最常见的模式是：合约先向外部地址转账或调用外部合约，然后才更新内部余额。恶意合约可以在回调中再次进入原函数，在余额归零前重复提款。

防护思路包括：

- 使用 Checks-Effects-Interactions：先检查，再更新状态，最后外部调用。
- 对高风险函数使用 reentrancy guard。
- 避免在状态未更新前调用不可信合约。
- 测试多合约交互，而不是只测单个函数。

::: info 相关 topic
- [Solidity Security Considerations](https://docs.soliditylang.org/en/latest/security-considerations.html)：官方安全注意事项，包含 reentrancy、gas、随机数和合约交互风险。
- [OpenZeppelin Utils](https://docs.openzeppelin.com/contracts/5.x/api/utils)：查看 `ReentrancyGuard`、`Pausable` 等常用安全工具。
:::

### Access Control

**难度：中级。** Access Control 决定谁能执行敏感动作，是合约安全里最常见也最容易被低估的部分。

敏感动作包括 mint、burn、pause、upgrade、withdraw、setOracle、setFee、setRouter、changeOwner。任何一个权限过宽，都可能让协议规则被管理员或攻击者改写。

检查权限时，不要只问“有没有 onlyOwner”。更要问：

- owner 是 EOA、多签还是治理合约？
- 是否有 timelock？
- 角色能否相互授予？
- 权限变更是否发出 event？
- 紧急暂停和恢复由谁控制？
- 私钥泄漏时最坏结果是什么？

### Audit

**难度：中级。** Audit 是外部安全审查，不是安全保证书。

审计可以发现设计、实现和测试中的问题，但它不能保证协议永远安全。审计范围、代码版本、依赖版本、部署参数、升级权限、上线后的改动，都会影响结论。

阅读 audit report 时至少看：

- 审计覆盖了哪些 commit 和合约。
- 哪些问题已修复，哪些被项目方接受风险。
- 是否覆盖经济机制和外部依赖。
- 是否包含测试建议和部署注意事项。
- 上线代码是否和审计代码一致。

### Simulation

**难度：中级。** Simulation 是交易发出前的预演，用来发现执行失败、资产变化异常和权限越界。

在用户或 Agent 签名前，系统可以模拟交易：调用哪个合约、会转出哪些 token、会得到什么、gas 大概多少、是否 revert、是否触发授权变化。

Simulation 不能替代安全审计，因为真实链状态可能在交易打包前变化。但它能挡住很多明显错误：链 ID 错、合约地址错、授权额度异常、滑点过大、余额不足、调用方法不符合预期。

::: info 相关 topic
- [Tenderly Simulations](https://docs.tenderly.co/simulations)：了解交易模拟、资产变化和执行 trace 如何用于调试和风控。
:::

### Monitoring

**难度：高级。** Monitoring 是上线后的安全感知层，用来发现异常并触发响应。

链上监控可以关注：

- 大额转账或提款；
- 管理员权限变更；
- 合约升级；
- 预言机价格异常；
- 大量失败交易；
- TVL 快速流出；
- 未预期的 event；
- Agent 连续触发高风险工具。

监控本身还不够。真正有效的是“监控 + 响应”：谁收到告警，谁能 pause，谁确认误报，恢复流程是什么。

## 在 AI x Web3 中的位置

AI 会让安全边界更复杂。Agent 可以解释合约、生成交易、调用工具、执行策略，但它也可能读错上下文、被 prompt injection 影响、调用错误工具或生成危险交易。

所以 AI x Web3 的安全设计要把模型输出和链上执行分开：模型可以建议，工具返回事实，policy 限制权限，simulation 预演结果，human check 确认高风险动作，monitoring 记录执行后果。

## 最小实践

做一个交易安全检查表：

1. 选择一笔公开的合约调用交易。
2. 查看 from、to、method、value、token transfers、logs 和 gas used。
3. 判断这笔交易是否改变权限、资产或关键协议参数。
4. 写出如果这笔交易由 Agent 发起，执行前要做哪些 simulation 和 human check。
5. 写出上线后应该监控哪些 event 或异常指标。

## 扩展阅读

- [Solidity Security Considerations](https://docs.soliditylang.org/en/latest/security-considerations.html)：官方安全注意事项，适合建立合约安全基础。
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x)：学习常用安全组件、访问控制和标准合约实现。
- [OpenZeppelin Utils](https://docs.openzeppelin.com/contracts/5.x/api/utils)：查看 `ReentrancyGuard`、`Pausable`、`Nonces` 等工具。
- [Ethereum Smart Contract Security](https://ethereum.org/en/developers/docs/smart-contracts/security/)：从以太坊开发者文档理解常见安全实践。
- [Tenderly Simulations](https://docs.tenderly.co/simulations)：学习交易模拟和执行 trace 如何帮助排查风险。
