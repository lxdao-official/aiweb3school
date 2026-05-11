---
title: Web3 工具调用（Web3 Tool Use）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/bridge/web3-tool-use/
---

# Web3 工具调用（Web3 Tool Use）

> Web3 Tool Use 是把 RPC、合约读取、交易生成、钱包确认、区块浏览器和 DeFi 操作变成 Agent 可调用工具的过程。真正难的不是“能调用”，而是权限、参数、模拟和日志。

## 为什么要学这个

AI Agent 要进入 Web3，不能只靠模型生成文本。它需要工具读取链上状态、解释合约、估算 gas、生成交易、请求签名、查询交易结果。

但 Web3 工具的风险比普通查询工具更高。读错数据会误导判断，写错交易会改变资产和权限。工具设计必须明确哪些是只读、哪些会写链、哪些需要用户确认。

**Web3 Tool Use 的核心，是让 Agent 的每次链上动作都有结构化输入、明确权限和可审计结果。**

## 第一性原理

> **模型可以选择工具，但工具必须用确定性边界限制模型。**

不要让 Agent 直接拼接任意 calldata 或调用任意地址。工具应该把危险能力封装成受限接口，并在执行前检查网络、地址、额度、方法、模拟结果和用户确认。

- **读写分离**：读取链上状态和发送交易必须是不同工具、不同权限。
- **参数结构化**：chain id、contract address、method、args、value、slippage 不能埋在自然语言里。
- **日志不可省**：每次工具调用都要记录输入、输出、时间、来源和错误。

## 知识节点

### RPC Tool

**难度：初级。** RPC Tool 用来读取链状态、查询区块、估算 gas、获取日志或广播交易。

只读 RPC 工具可以开放得更宽，例如读取余额、block number、合约 view 函数。写入能力则要拆出去，不能和查询混在一个“万能 RPC”工具里。

工具返回时应包含：chain id、RPC provider、block number、method、result、error。这样 Agent 的回答才能说明自己基于哪个区块的数据。

### Contract Read

**难度：初级。** Contract Read 是调用合约 view / pure 函数，不改变链上状态。

它适合读取余额、配置、owner、allowance、pool 状态、价格参数、nonce、是否 paused。对 Agent 来说，这是最常用也相对低风险的 Web3 工具。

但 Contract Read 也可能误导：读错网络、读错合约、ABI 不匹配、RPC 数据滞后，都会让模型基于错误事实生成建议。

### Contract Write

**难度：高级。** Contract Write 会改变链上状态，必须经过更严格的模拟、权限和确认。

写交易前至少需要：

- chain id 和目标合约地址；
- ABI method 和 args；
- value 和 token 变化预估；
- gas 估算；
- simulation 结果；
- policy 检查；
- 用户或 Smart Account 授权；
- 交易哈希和回执追踪。

Agent 不应该直接拥有“任意合约写入”能力。更好的做法是把写工具限制在白名单合约、白名单方法和额度策略里。

### Wallet Tool

**难度：高级。** Wallet Tool 负责连接账户、请求签名、生成交易、管理授权和返回用户确认结果。

钱包工具是最敏感的边界。它必须把“连接”“签名消息”“发送交易”“授权 token”“撤销授权”分成不同动作，并清楚展示用户正在批准什么。

AI 生成的交易草稿不应该绕过钱包确认。高风险动作必须回到用户、Smart Account policy 或多签流程。

### Explorer Tool

**难度：初级。** Explorer Tool 用来查询交易、合约源码、event、token transfer 和地址历史。

Explorer 的价值是提供可验证证据。Agent 可以用它回答：

- 这笔交易成功了吗？
- 调用了哪个方法？
- 转出了哪些 token？
- 合约源码是否 verified？
- 最近是否发生升级或权限变更？

### DeFi Tool

**难度：高级。** DeFi Tool 把 swap、借贷、授权、仓位查询、清算风险等能力封装给 Agent。

这类工具必须特别小心，因为它们直接影响资产。一个 DeFi tool 至少应该要求：

- 协议白名单；
- 最大交易额；
- 最大滑点；
- 价格来源；
- simulation；
- allowance 检查；
- 人工确认或 session key policy。

不要给 Agent 一个“帮我调用任意 DeFi 协议”的通用工具。

### Tool Permission

**难度：高级。** Tool Permission 定义 Agent 能调用哪些工具、在什么条件下调用、能传什么参数。

权限可以按工具、合约、方法、金额、时间、频率和用户确认级别分层。比如：

- 查询余额：自动允许；
- 生成交易草稿：自动允许；
- 小额白名单支付：session key 允许；
- 大额转账或授权：必须人工确认；
- 任意合约调用：默认禁止。

### Tool Log

**难度：中级。** Tool Log 是 Agent 行为可审计的基础。

每次工具调用至少记录：用户目标、工具名、输入参数、输出结果、错误、时间、链 ID、区块号、交易哈希、确认人和 policy 判断。

当 Agent 造成错误时，日志能回答：模型看到了什么、调用了什么、工具返回了什么、系统有没有拦截、用户确认了什么。

## 在 AI x Web3 中的位置

Web3 Tool Use 是从“AI 能解释链上信息”走向“AI 能参与链上执行”的关键层。它连接 Chain-aware Context、Agent Workflow 和 Agent Wallet。

如果工具只读，风险主要是解释错误；如果工具能写链，风险就进入资产和权限层。越靠近执行，越需要 policy、simulation、human check 和日志。

## 最小实践

设计一组 Agent Web3 工具：

1. 写出一个只读工具：读取某地址在某链上的 ETH 余额。
2. 写出一个合约读取工具：读取 ERC-20 `allowance(owner, spender)`。
3. 写出一个交易草稿工具：生成 ERC-20 `approve` calldata，但不发送交易。
4. 写出一个写交易工具的权限规则：只允许特定 token、特定 spender、最大额度。
5. 为每个工具定义输入 schema、输出字段、错误类型和日志字段。

重点不是马上实现所有工具，而是把“读、写、签名、确认、记录”分清楚。

## 扩展阅读

- [OpenAI Tools Guide](https://platform.openai.com/docs/guides/tools)：理解模型如何调用外部工具和接收结构化结果。
- [Ethereum JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/)：理解 Web3 工具底层如何读取链和发送交易。
- [MetaMask Wallet Docs](https://docs.metamask.io/wallet/)：学习钱包连接、签名、交易请求和 provider API。
- [viem Documentation](https://viem.sh/)：适合实现类型安全的合约读写和交易工具。
- [Tenderly Simulations](https://docs.tenderly.co/simulations)：了解交易发出前如何模拟执行结果。
