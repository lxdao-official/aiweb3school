---
title: 框架（Frameworks）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/ai/frameworks/
---

# 框架（Frameworks）

> AI Framework 不是为了让你少写几行 API 调用，而是把模型、工具、状态、检索、评估和部署组织成一个可维护的系统。框架选错，问题通常不是“跑不起来”，而是后面调不动、测不了、换不掉。

## 为什么要学这个

刚开始做 AI 应用时，直接调用一个模型 API 就够了。真正进入产品后，你会很快遇到更复杂的问题：prompt 要版本管理，工具调用要有 schema，Agent 要记录 state，失败要重试，用户反馈要进入评估，线上行为要能追踪。

Frameworks 解决的是这些工程组织问题。它们不替你定义产品价值，也不保证模型输出正确，但可以帮你把复杂系统拆成更清楚的模块。

学框架时最重要的判断不是“哪个最流行”，而是：**它到底帮你管理了哪一层复杂度，又把哪些复杂度藏起来了。**

## 第一性原理

> **框架是系统边界的表达，不是智能本身。先理解工作流，再决定用不用框架。**

很多失败的 AI 项目不是输在没有框架，而是先引入框架，再让产品逻辑迁就框架。更稳的方式是先画清楚输入、状态、工具、输出、评估和失败路径，再看哪些部分值得交给框架。

- **简单链路先保持简单**：一次模型调用、一次检索、一次格式化输出，不一定需要复杂 Agent 框架。
- **长流程需要显式状态**：多步任务、工具调用、人工确认、失败恢复，应该有可查询的 state，而不是只靠聊天历史。
- **框架要能退出**：如果某个框架让你很难换模型、换向量库、换部署方式，长期成本会很高。

## 知识节点

### LangChain

LangChain 是最常见的 LLM 应用开发框架之一，覆盖模型接入、prompt、工具调用、retriever、agent、output parser 等模块。

它适合快速把模型能力和外部系统接起来，也适合学习 AI 应用常见组件。但使用时要小心“抽象太早”：如果你还没搞清楚自己的工作流，直接套一堆 chain 和 agent，后面排查问题会变难。

LangChain 更像一套组件库。它适合帮你组合能力，不适合替你决定产品边界。

::: info 相关 topic
- [提示词（Prompt）](/zh/handbook/ai/prompt/)：框架里的 prompt 管理仍然要回到任务边界和输出格式。
- [LangChain Agents Docs](https://docs.langchain.com/oss/python/langchain-agents)：看 LangChain 如何组织 model、tools 和 agent loop。
:::

### LangGraph

LangGraph 更偏向工作流和状态机。它把 Agent 或多步骤任务表示成 graph：节点负责执行动作，边负责控制流，state 负责记录过程。

当任务只是“问一次，答一次”，LangGraph 可能太重。  
但如果任务需要多轮工具调用、重试、人工确认、分支、恢复和长期运行，显式 graph 会比一长串 prompt 历史更可靠。

一个实用判断是：**只要你开始关心任务走到哪一步、能否恢复、失败后从哪里继续，就应该考虑 graph / state machine。**

::: info 相关 topic
- [智能体（Agent）](/zh/handbook/ai/agent/)：先理解 Agent 为什么需要目标、工具、状态和停止条件。
- [LangGraph Docs](https://docs.langchain.com/langgraph)：官方文档，适合看有状态 Agent 和 workflow 的基本模型。
:::

### OpenAI Agents SDK

OpenAI Agents SDK 用来构建带工具、handoff、guardrails、tracing 的 Agent 应用。它的价值在于把 Agent 工作流里的常见工程问题做成可组合结构。

你可以用它组织：

- Agent 的指令和工具
- 多 Agent 之间的 handoff
- 工具调用和结构化输出
- guardrails 和运行时追踪

关键仍然是边界：SDK 可以帮你执行流程，但你要定义哪些工具可用、哪些动作需要确认、什么输出算失败。

::: info 相关 topic
- [OpenAI Agents Guide](https://platform.openai.com/docs/guides/agents/best-practices)：理解构建 Agent 时的工具、知识、guardrails 和监控。
- [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents-sdk/)：查看 SDK 的核心概念和实现方式。
:::

### DSPy

DSPy 关注的是把 prompt / LM pipeline 写成可优化的程序。它不是让你手工调一句 prompt，而是把输入输出、模块和指标定义清楚，再用 optimizer 改进 prompt 或调用策略。

当你的任务只是写一段文案，DSPy 未必必要。  
当你有明确数据集、评估指标和可重复任务时，它会更有价值，比如分类、抽取、问答、rerank、复杂推理链。

DSPy 的关键启发是：**不要只靠感觉调 prompt，要让任务、数据和指标进入系统。**

::: info 相关 topic
- [评估（Evaluation）](/zh/handbook/ai/evaluation/)：没有 eval，自动优化很容易优化到错误目标。
- [DSPy Documentation](https://dspy.ai/)：了解 signatures、modules、optimizers 等核心概念。
:::

### Hermes

Hermes 在这里更适合作为“面向工具调用和结构化输出的模型 / agent 生态”来理解，而不是通用框架。

它提醒我们一件事：框架不是唯一抽象层。模型本身是否擅长 tool calling、JSON mode、long context、reasoning，也会影响系统设计。一个工具调用能力稳定的模型，可以减少很多解析和兜底成本；反过来，模型能力不稳定时，再好的框架也要补大量 guard。

看 Hermes 这类方向时，不要只看榜单分数，要看它是否能稳定地产生你需要的结构化输出和工具调用格式。

::: info 相关 topic
- [Nous Hermes Function Calling](https://github.com/NousResearch/Hermes-Function-Calling)：看 Hermes 系列如何处理 function calling 和 JSON 输出示例。
- [Hermes Agent Docs](https://hermes-agent.nousresearch.com/docs/)：了解 Nous Research 的 Hermes Agent 工具链。
:::

### Learning Agent

Learning Agent 指系统可以从反馈、日志、评估结果或用户修正中改进。这里的“学习”不一定是训练模型，也可以是更新 prompt、调整 retriever、补充规则、改进测试集。

真实产品里，Learning Agent 最容易踩的坑是把线上反馈直接变成行为变化。这样会引入数据污染、越权学习和不可解释变化。

更稳的流程是：

1. 记录失败样本。
2. 人工或规则标注原因。
3. 加入 eval / regression set。
4. 修改 prompt、检索、工具或模型配置。
5. 通过测试后再上线。

**学习能力要先进评估闭环，再进入生产系统。**

## 在 AI x Web3 中的位置

Frameworks 在 AI x Web3 里负责把模型能力接到产品流程里：读取上下文、调用工具、生成结构化动作、记录 trace、进入 eval。

但它不应该直接替代 Web3 侧的权限、签名、交易模拟和账户规则。框架可以组织 Agent，不能替用户承担资产风险。

比较稳的分工是：

- AI Framework 管理 prompt、tools、state、eval 和 trace。
- Web3 基础设施管理账户、签名、合约、交易和链上状态。
- 产品层定义用户目标、权限边界、确认流程和失败处理。

## 最小实践

做一个“文档问答 + 工具调用”的最小框架对比。

同一个任务，用两种方式实现：

- 直接调用模型 API：用户问题 + 检索结果 + JSON 输出。
- 使用一个框架：同样的输入输出，但加入 tool schema、trace、失败重试和测试样本。

对比四件事：

- 哪个版本更容易读懂？
- 哪个版本更容易加工具？
- 哪个版本更容易定位错误？
- 哪个版本更容易写回归测试？

这个练习的重点不是选冠军，而是看清框架到底帮了你什么。

## 扩展阅读

- [LangChain Agents Docs](https://docs.langchain.com/oss/python/langchain-agents)：了解 LangChain 如何组织模型、工具和 Agent。
- [LangGraph Docs](https://docs.langchain.com/langgraph)：适合学习有状态、可恢复的 Agent workflow。
- [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents-sdk/)：查看 OpenAI 生态里 Agent、handoff、guardrails、tracing 的组织方式。
- [DSPy Documentation](https://dspy.ai/)：理解用 signatures、modules 和 optimizers 管理 LM pipeline 的思路。
- [Nous Hermes Function Calling](https://github.com/NousResearch/Hermes-Function-Calling)：看工具调用和结构化输出在模型层的实现样例。
