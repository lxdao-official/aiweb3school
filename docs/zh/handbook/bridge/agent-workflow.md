---
title: 智能体工作流（Agent Workflow）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/bridge/agent-workflow/
---

# 智能体工作流（Agent Workflow）

> Agent Workflow 是把“用户目标 → 上下文读取 → 计划生成 → 工具调用 → 风险检查 → 执行 → 记录和复盘”组织成可控流程，而不是让模型自由发挥。

## 为什么要学这个

AI x Web3 的难点不在于让模型说出“我可以帮你操作”，而在于把操作拆成可验证步骤。链上动作有资产、权限和不可逆结果，Agent 的工作流必须比普通聊天更严格。

一个成熟的 Agent 不只是 prompt。它需要任务图、状态机、工具权限、错误处理、人工确认、trace 和评估集。

**Agent Workflow 的核心，是把概率模型放进确定性流程里。**

## 第一性原理

> **高风险 Agent 不能只有“下一步推理”，必须有状态、边界和停止条件。**

模型可以规划，但系统要知道当前到了哪一步、哪些工具已调用、哪些结果可信、哪些动作需要确认、失败后如何停止。

- **流程要显式**：不要把完整执行链路藏在一段长 prompt 里。
- **状态要可恢复**：工具失败、用户拒绝、交易 pending 时，系统要知道如何继续或停止。
- **评估要可回放**：没有 trace 和 regression set，就很难知道改模型后是否更安全。

## 知识节点

### Task Graph

**难度：中级。** Task Graph 把目标拆成节点和依赖，而不是让 Agent 一口气自由执行。

例如“帮我评估并执行一次低风险 swap”可以拆成：

1. 读取用户目标和限制；
2. 获取余额和 allowance；
3. 查询价格和流动性；
4. 生成候选交易；
5. 模拟交易；
6. 展示风险；
7. 用户确认；
8. 发送交易；
9. 追踪结果。

这样拆分后，每一步都可以设置输入、输出、权限和停止条件。

### State Machine

**难度：高级。** State Machine 让 Agent 执行过程有明确状态，而不是只有聊天历史。

链上工作流常见状态包括：`draft`、`context_loaded`、`plan_ready`、`simulation_failed`、`waiting_user_confirmation`、`submitted`、`confirmed`、`reverted`、`cancelled`。

状态机的价值在于：用户刷新页面、交易 pending、RPC 失败、模型重试时，系统不会忘记自己在哪里，也不会重复执行危险动作。

### Human-in-the-loop

**难度：中级。** Human-in-the-loop 是把人放在关键风险点，而不是让人确认每一个低风险步骤。

合理分层可以是：

- 只读分析：自动执行；
- 交易草稿：自动生成；
- 小额白名单操作：按 session key 执行；
- 高风险交易：必须人工确认；
- 超出 policy：直接拒绝。

重点不是“有没有人工确认”，而是人确认时能否看懂资产变化、权限变化和失败风险。

### Retry / Fallback

**难度：中级。** Retry / Fallback 处理工具失败、网络异常、模型输出不合格和交易状态不确定。

Web3 Agent 不能盲目重试。读取余额失败可以重试；发送交易失败要先判断是否已经广播；交易 pending 不能简单再发一笔；RPC 返回异常可以切换 provider，但要记录数据来源。

Fallback 也要谨慎。模型不可用时可以降级成只读模式，但不应该自动换一个未经评估的模型继续发交易。

### Trace

**难度：初级。** Trace 是 Agent 每一步输入、判断、工具调用和结果的记录。

一个有用 trace 至少包括：用户目标、模型版本、上下文来源、工具输入输出、policy 判断、simulation 结果、人工确认、交易哈希和最终状态。

没有 trace，出了问题只能看聊天记录；有 trace，才能复盘是模型理解错、工具返回错、policy 漏了，还是用户确认了错误动作。

### Evaluation Harness

**难度：高级。** Evaluation Harness 用来系统测试 Agent 在不同任务、风险和异常场景下的表现。

对链上 Agent 来说，eval 不应该只测回答好不好，还要测：

- 是否正确拒绝越权请求；
- 是否识别错误链和错误合约；
- 是否在缺少数据时停止；
- 是否要求 human check；
- 是否记录 citation；
- 是否避免生成危险 calldata。

::: info 相关 topic
- [评估（Evaluation）](/zh/handbook/ai/evaluation/)：先理解 golden set、regression 和 observability 如何用于 AI 系统。
:::

### Regression Set

**难度：中级。** Regression Set 是一组固定测试用例，用来防止模型、prompt、工具或策略更新后安全性退化。

可以包含：

- 正常 swap 请求；
- 错误链请求；
- 无限 approve 请求；
- 恶意文档诱导；
- 余额不足；
- 预言机价格过旧；
- 用户拒绝签名；
- 交易 pending 超时。

每次改模型或工具前，都应该跑这组用例，确认 Agent 没有从“会拒绝危险请求”退化成“看起来更顺但更危险”。

## 在 AI x Web3 中的位置

Agent Workflow 是桥接层的流程骨架。Chain-aware Context 提供事实，Web3 Tool Use 提供能力，Agent Wallet 提供权限边界，Workflow 把它们组织成可执行但可控的路径。

如果没有 workflow，项目很容易变成“模型直接调用工具”。这在 demo 里很快，在真实资产和权限面前不够用。

## 最小实践

设计一个链上 Agent 工作流：

1. 选择任务：解释并准备一笔小额 ERC-20 swap。
2. 画出 task graph：读取上下文、查询价格、生成计划、模拟、确认、执行、记录。
3. 为每一步写输入、输出、可用工具和失败处理。
4. 标出哪些步骤必须 human-in-the-loop。
5. 写 5 个 regression case：正常、错误链、滑点过大、余额不足、用户拒绝。

## 扩展阅读

- [LangGraph Concepts](https://langchain-ai.github.io/langgraph/concepts/why-langgraph/)：理解为什么复杂 Agent 需要状态、控制流和持久化。
- [OpenAI Tools Guide](https://platform.openai.com/docs/guides/tools)：理解模型调用工具时如何组织输入输出。
- [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)：了解 trace、tool、handoff 和 guardrail 等 Agent 工程概念。
- [Tenderly Simulations](https://docs.tenderly.co/simulations)：用于链上执行前的交易模拟和调试。
- [ERC-4337 Documentation](https://docs.erc4337.io/)：理解智能账户和 UserOperation 如何进入 Agent 执行流程。
