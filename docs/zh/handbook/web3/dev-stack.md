---
title: 开发栈（Dev Stack）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/web3/dev-stack/
---

# 开发栈（Dev Stack）

> Web3 开发栈不是一组随机工具名，而是一条从写合约、测合约、部署合约、连接钱包、调用合约到监控结果的工程链路。工具选型的目标是让链上开发更可验证、更可复现、更少事故。

## 为什么要学这个

写一个 Web3 demo 很容易：接钱包、调合约、发交易。但真正做项目时，你会马上遇到合约编译、测试、部署脚本、环境变量、RPC、前端 SDK、链切换、合约验证、权限管理和监控。

开发栈的作用不是让你收集更多工具，而是把开发流程变成可重复的系统。一个项目至少要做到：本地能跑、测试能复现、部署有记录、前端调用明确、合约地址可追踪。

**工具链越清楚，链上执行越可控。**

## 第一性原理

> **Web3 工具链的核心是把不可逆执行前移到可测试、可模拟、可审查的流程里。**

链上交易一旦成功，后悔成本很高。因此开发工具要尽量把错误暴露在本地、测试网、模拟环境和 code review 阶段，而不是等到主网上线后再发现。

- **本地优先复现**：合约逻辑、部署脚本和前端调用都应该能在本地或测试网跑通。
- **地址和 ABI 要版本化**：前端调用的到底是哪份合约，必须能追踪。
- **安全库不是免审计**：OpenZeppelin 等库降低基础风险，但组合逻辑仍要自己验证。

## 知识节点

### Remix

**难度：初级。** Remix 适合快速理解 Solidity、部署小合约和观察合约调用流程。

Remix 是浏览器里的 Solidity IDE。它可以编写、编译、部署和调试合约，适合入门、教学、原型和快速验证。

它的优势是低门槛，不需要先搭完整工程。但真实项目仍然需要进入 Git、测试框架、部署脚本和 CI，否则很难复现和协作。

### Hardhat

**难度：中级。** Hardhat 适合 JavaScript/TypeScript 项目，把合约开发接进测试、脚本和前端工程。

Hardhat 提供本地开发网络、编译、测试、部署脚本和插件生态。对前端团队来说，它和 TypeScript、ethers、CI 的结合比较自然。

学习 Hardhat 的重点不是记命令，而是理解本地链、测试网、部署脚本、合约验证和环境变量如何组成完整开发流程。

### Foundry

**难度：中级。** Foundry 更偏命令行和 Solidity-native 测试，适合高强度合约开发和快速反馈。

Foundry 常用工具包括 `forge`、`cast`、`anvil`。它可以用 Solidity 写测试，运行速度快，也适合做 fuzz testing、脚本部署和链上状态交互。

如果你更关注合约逻辑、测试深度和命令行工作流，Foundry 是非常重要的工具。

### OpenZeppelin

**难度：中级。** OpenZeppelin 提供常用合约标准和安全组件，但不能替代对业务逻辑的审查。

OpenZeppelin Contracts 包含 ERC-20、ERC-721、AccessControl、Ownable、Pausable 等常见模块。使用成熟库可以减少重复造轮子，也能避免很多基础实现错误。

但危险在于“用了库就安全”的错觉。权限组合、升级模式、参数设置、外部调用和经济设计仍然可能出问题。

::: info 相关 topic
- [智能合约（Smart Contract）](/zh/handbook/web3/smart-contract/)：先理解合约状态、ABI、事件和升级风险。
:::

### viem / wagmi

**难度：中级。** viem 和 wagmi 主要解决前端与链交互的问题：读合约、写合约、管理账户、处理网络和缓存。

viem 是 TypeScript 以太坊接口库，强调类型安全和底层调用能力。wagmi 则面向 React 应用，提供钱包连接、账户状态、合约读写和 hooks。

前端接链时，最容易出问题的是状态不一致：钱包网络、前端配置、合约地址、RPC 返回、交易 pending 状态都可能不同步。好的 SDK 只能降低复杂度，不能替你设计清楚用户流程。

## 在 AI x Web3 中的位置

AI 可以显著提升 Web3 开发效率：解释 ABI、生成部署脚本、补测试、排查交易失败、总结合约权限。但 AI 参与开发栈后，验证流程反而要更明确。

如果 Agent 能运行 `forge test`、读取部署配置、调用 `cast` 或生成前端合约调用代码，它就必须受到 repo workflow、测试、权限和 secret 管理约束。链上开发不是普通代码生成，高风险命令需要人工确认。

## 最小实践

搭一个最小 Web3 开发链路：

1. 用 Remix 部署一个极简合约到本地或测试网。
2. 用 Hardhat 或 Foundry 建一个本地工程，并写一条测试。
3. 记录合约地址和 ABI。
4. 用 viem 或 wagmi 从前端读取一次合约状态。
5. 写下这条链路中哪些信息必须进版本控制，哪些必须放在 `.env` 或密钥管理里。

## 扩展阅读

- [Remix Documentation](https://remix-ide.readthedocs.io/)：适合从浏览器 IDE 入门 Solidity 编译、部署和调试。
- [Hardhat Documentation](https://hardhat.org/docs)：学习 TypeScript/JavaScript 合约开发、测试和部署流程。
- [Foundry Book](https://book.getfoundry.sh/)：学习 `forge`、`cast`、`anvil` 和 Solidity-native 测试工作流。
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)：查看常见合约标准、安全组件和访问控制模块。
- [viem Documentation](https://viem.sh/)：学习 TypeScript 方式读取链、发送交易和调用合约。
- [wagmi Documentation](https://wagmi.sh/)：学习 React 应用中的钱包连接、账户状态和合约交互。
