---
title: 微调（Fine-tuning）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/ai/fine-tuning/
---

# 微调（Fine-tuning）

> Fine-tuning 不是“模型效果不好就训练一下”。它适合让模型更稳定地学习某种格式、风格、领域任务或行为模式，但不适合用来补实时知识、修权限边界或替代评估。

## 为什么要学这个

很多人遇到模型回答不好，会第一时间想到 fine-tuning。实际工程里，fine-tuning 往往不是第一步。

你应该先问：

- 是 prompt 不清楚吗？
- 是上下文缺了吗？
- 是检索没拿到正确资料吗？
- 是输出格式没有 schema 吗？
- 是模型本身能力不够吗？
- 是否已经有 eval 证明问题稳定存在？

Fine-tuning 的价值在于让模型在一类任务上更一致，而不是让模型凭空知道最新事实。没有数据、没有评估、没有明确目标的微调，很容易只是把问题变得更难排查。

## 第一性原理

> **Fine-tuning 改的是模型行为分布，不是产品系统边界。**

微调可以让模型更像你的数据，但它不会自动带来事实正确、权限安全、引用可靠或工具调用安全。训练进去的偏差，也会更稳定地被模型复现。

- **先有 eval，再谈 fine-tuning**：否则你不知道微调后到底变好了还是只是在少数样本上变顺了。
- **先修数据，再修模型**：坏数据会把坏习惯训练得更稳定。
- **别用微调存实时知识**：实时状态、价格、文档更新和用户数据更适合放在检索或工具里。

## 知识节点

### SFT

SFT 是 Supervised Fine-Tuning，监督微调。它使用输入和期望输出样本，让模型学习某类任务的回答方式。

SFT 适合：

- 固定格式输出
- 特定语气或风格
- 特定任务流程
- 领域术语和回答习惯
- 工具调用样式

但 SFT 对数据质量非常敏感。如果样本里有错误、格式不一致、边界不清，模型会把这些问题学进去。

### LoRA

LoRA 是 Low-Rank Adaptation，一种参数高效微调方法。它不直接更新全部模型参数，而是训练较小的适配参数，从而降低训练成本和显存需求。

LoRA 常用于开源模型微调，适合资源有限、想快速试验特定任务的团队。

它的核心价值是降低实验成本，但不是魔法。任务定义、数据质量、评估方法仍然决定最终效果。

### PEFT

PEFT 是 Parameter-Efficient Fine-Tuning，参数高效微调方法的统称，LoRA 是其中一种。

PEFT 的意义在于：你不一定需要重新训练整个模型，也可以通过较小参数调整，让模型适配某个任务或领域。

适合 PEFT 的场景通常有：

- 模型较大，完全微调成本太高
- 任务范围明确
- 数据量中等
- 需要多版本 adapter 并行试验

### Dataset

Dataset 是 fine-tuning 的核心资产。

一个可用的数据集不只是“很多问答对”。它要有清楚的任务定义、输入来源、输出标准、质量检查和切分方式。

至少要区分：

- 训练集：用于训练
- 验证集：用于调参和选择版本
- 测试集：用于最终评估
- 回归集：用于防止历史问题复发

**不要把测试集拿去训练。** 这会让评估失去意义。

### Overfitting

Overfitting 是模型把训练数据记得太死，导致对新样本表现变差。

微调时尤其容易出现：

- 训练样本太少
- 样本风格太单一
- 训练轮数太多
- 目标格式过度僵化
- 验证集和训练集太像

过拟合的结果是：模型在你准备的例子上看起来很好，但真实用户一问就崩。

## 在 AI x Web3 中的位置

AI x Web3 场景里，fine-tuning 可以用于特定任务，例如交易解释风格、治理摘要格式、风险标签输出、合约注释风格、工具调用样式。

但它不适合替代：

- 链上实时状态查询
- 合约安全审计
- 交易模拟
- 钱包权限控制
- 用户确认
- 外部事实引用

换句话说，fine-tuning 可以让模型更懂你的任务格式，但不能让模型直接变成可信执行层。

## 最小实践

做一个“结构化摘要格式”的微调前评估。

先不要训练。先准备 50 条样本：

- 输入：一段技术文档或提案。
- 输出：固定 JSON 字段，例如 `summary`、`risks`、`open_questions`、`sources`。

然后比较三种方案：

1. 只改 prompt。
2. Prompt + few-shot。
3. 小规模 fine-tuning 或 adapter 方案。

每种方案都用同一套 eval 检查：

- 字段是否完整
- 是否编造来源
- 风险点是否漏掉
- 输出是否稳定

只有当前两种方案无法稳定解决问题时，再考虑 fine-tuning。

## 扩展阅读

- [OpenAI Fine-tuning Guide](https://platform.openai.com/docs/guides/fine-tuning)：了解 fine-tuning 的适用场景、数据格式和训练流程。
- [Hugging Face PEFT Documentation](https://huggingface.co/docs/peft/index)：学习 LoRA、adapter 等参数高效微调方法。
- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)：LoRA 原始论文，适合理解低秩适配的基本思想。
- [TRL Documentation](https://huggingface.co/docs/trl/index)：了解 SFT、偏好优化等训练流程工具。
- [OpenAI Evals API Reference](https://platform.openai.com/docs/api-reference/evals?api-mode=chat)：微调前后都需要用 eval 判断效果是否真的提升。
