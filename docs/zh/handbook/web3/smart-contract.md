---
title: 智能合约（Smart Contract）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/web3/smart-contract/
---

# 智能合约（Smart Contract）

> 智能合约不是“自动执行的法律合同”，而是部署在链上的程序。它把规则、资产和状态放到公开可验证的执行环境里，也把错误、权限和升级风险暴露给所有人。

## 为什么要学这个

Web3 产品的很多核心逻辑都在智能合约里：token、NFT、DEX、借贷、治理、质押、空投、账户抽象。前端可以换，后端可以重构，但合约一旦部署，修改成本和风险通常远高于普通应用代码。

学习智能合约，不是为了立刻写复杂协议，而是先建立判断力：哪些规则适合上链，合约如何保存状态，调用如何改变状态，接口如何被其他应用组合，为什么测试和审计不能省。

**智能合约把规则变成公共基础设施，也把 bug 变成公共风险。**

## 第一性原理

> **合约的价值来自可验证执行，不来自“代码看起来很聪明”。**

智能合约能让任何人检查规则、调用接口、验证状态变化。这个开放性带来了可组合性，也带来了攻击面。你写的不是普通函数，而是会管理真实资产和公共状态的程序。

- **状态公开可查**：链上状态不是私有数据库字段，很多信息会被所有人看到。
- **调用有成本和顺序**：每次执行都受 gas、区块顺序和外部状态影响。
- **权限必须显式**：谁能 mint、pause、upgrade、withdraw，不能靠默认信任。

## 知识节点

### Solidity

**难度：初级。** Solidity 是 EVM 生态最常见的合约语言，先用它理解链上程序的写法和限制。

Solidity 看起来像普通编程语言，但它运行在完全不同的环境里。合约状态会写入链上，函数调用可能消耗 gas，错误权限可能直接影响资产安全。

学习 Solidity 时，不要只看语法。更重要的是理解 storage、msg.sender、modifier、event、external call、revert 和权限控制这些链上特有概念。

### EVM

**难度：中级。** EVM 是合约执行环境，决定了代码如何被部署、调用、计费和隔离。

EVM（Ethereum Virtual Machine）可以理解成运行智能合约的虚拟机。Solidity 代码会被编译成 EVM 字节码，部署到链上后由节点执行。

理解 EVM 有助于解释很多现象：为什么要 gas，为什么 storage 贵，为什么外部调用有风险，为什么同一套合约可以部署到多个 EVM 兼容链。

::: info 相关 topic
- [网络（Network）](/zh/handbook/web3/network/)：继续看交易如何被网络打包、共识和确认。
:::

### ABI

**难度：初级。** ABI 是应用和合约沟通的接口说明，没有 ABI，前端和工具很难正确调用合约。

ABI（Application Binary Interface）描述合约有哪些函数、参数、返回值和事件。前端 SDK、脚本、区块浏览器和 AI 工具都可以通过 ABI 理解如何编码调用数据、解码返回结果。

对 AI x Web3 来说，ABI 也是 Agent 理解合约能力的重要上下文。但 ABI 只告诉你“能调用什么”，不保证“调用是否安全”。

### Event

**难度：初级。** Event 是合约向外部系统留下的可索引日志，是前端、索引器和分析工具的重要数据来源。

合约执行时可以 emit event。事件不会像 storage 那样直接成为合约可读取状态，但很适合让外部系统追踪发生过什么，例如转账、订单创建、参数更新、权限变更。

很多产品页面并不是每次都直接扫链上 storage，而是通过事件索引构建更适合查询的数据层。

::: info 相关 topic
- [索引（Indexing）](/zh/handbook/web3/indexing/)：继续看事件如何进入 subgraph、数据库和产品查询层。
:::

### Upgrade

**难度：高级。** 合约升级是安全、治理和产品迭代之间的权衡，不能只当成“方便以后改 bug”的开关。

有些合约部署后不可升级，有些通过 proxy、治理或多签保留升级能力。不可升级更接近“规则固定”，但 bug 修复困难；可升级更灵活，但也引入管理员权限、治理攻击和用户信任问题。

产品文档应该清楚说明合约是否可升级、谁有升级权限、是否有 timelock、用户如何监控变更。

## 在 AI x Web3 中的位置

AI Agent 进入链上执行时，智能合约应该承担最终规则和约束，而不是把所有判断交给模型。模型可以帮用户理解 ABI、生成调用参数、解释交易结果、写测试用例，但合约负责执行边界。

一个稳妥的设计通常是：AI 做建议和编排，钱包做授权确认，合约做可验证执行，监控系统记录结果。这样即使 AI 输出不稳定，链上规则仍然有明确边界。

## 最小实践

做一个最小合约阅读练习：

1. 找一个已验证源码的简单 ERC-20 或 NFT 合约。
2. 在区块浏览器里查看源码、ABI、事件和最近交易。
3. 找出哪些函数会改变状态，哪些只是读取状态。
4. 找出合约的权限函数，例如 owner、admin、pause、upgrade。
5. 用一句话解释：这个合约最重要的风险边界是什么。

## 扩展阅读

- [Solidity Documentation](https://docs.soliditylang.org/)：学习 Solidity 语言、类型、合约结构和安全注意事项。
- [Ethereum Smart Contracts](https://ethereum.org/en/developers/docs/smart-contracts/)：从以太坊开发者文档理解智能合约的基本概念。
- [Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/evm/)：理解 EVM 如何执行合约代码。
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)：学习常用安全合约库和标准实现。
- [OpenZeppelin Upgrades](https://docs.openzeppelin.com/upgrades-plugins/)：了解 proxy 升级模式和相关风险。
