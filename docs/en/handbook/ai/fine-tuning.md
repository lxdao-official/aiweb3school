---
title: Fine-tuning
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/ai/fine-tuning/
---

# Fine-tuning

> Fine-tuning is not "the model performs poorly, so train it." It is useful for making a model learn a certain format, style, domain task, or behavior pattern more consistently, but it is not suitable for filling real-time knowledge, fixing permission boundaries, or replacing evaluation.

## Why Learn This

When many people see a model answer poorly, their first thought is fine-tuning. In real engineering, fine-tuning is often not the first step.

You should first ask:

- Is the prompt unclear?
- Is context missing?
- Did retrieval fail to get the right material?
- Does the output format lack a schema?
- Is the model itself not capable enough?
- Is there already an eval proving the problem is stable?

The value of fine-tuning is to make the model more consistent on a class of tasks, not to make it magically know the latest facts. Fine-tuning without data, evaluation, and a clear goal often only makes problems harder to debug.

## First Principles

> **Fine-tuning changes the model's behavior distribution, not the boundaries of the product system.**

Fine-tuning can make the model look more like your data, but it does not automatically bring factual correctness, permission safety, reliable citations, or safe tool calling. Bias trained into the model will also be reproduced more consistently.

- **Have evals before fine-tuning**: otherwise you do not know whether the tuned model improved or only became smoother on a few samples.
- **Fix data before fixing the model**: bad data trains bad habits more stably.
- **Do not use fine-tuning to store real-time knowledge**: real-time state, prices, documentation updates, and user data belong in retrieval or tools.

## Knowledge Nodes

### SFT

SFT means Supervised Fine-Tuning. It uses input and expected-output samples to teach the model how to answer a certain class of tasks.

SFT is suitable for:

- fixed-format output
- specific tone or style
- specific task flows
- domain terminology and answer habits
- tool-call style

But SFT is very sensitive to data quality. If samples contain errors, inconsistent formats, or unclear boundaries, the model will learn those problems.

### LoRA

LoRA means Low-Rank Adaptation, a parameter-efficient fine-tuning method. It does not directly update all model parameters; instead, it trains smaller adapter parameters, reducing training cost and VRAM requirements.

LoRA is commonly used for open-source model fine-tuning and fits teams with limited resources who want to quickly experiment on specific tasks.

Its core value is reducing experiment cost, but it is not magic. Task definition, data quality, and evaluation still determine the final result.

### PEFT

PEFT means Parameter-Efficient Fine-Tuning, the general category of parameter-efficient methods. LoRA is one of them.

The point of PEFT is that you do not always need to retrain the entire model. You can adapt a model to a task or domain through smaller parameter changes.

Scenarios suitable for PEFT usually have:

- a large model where full fine-tuning is too expensive
- a clearly scoped task
- a medium-sized dataset
- a need to test multiple adapter versions in parallel

### Dataset

Dataset is the core asset of fine-tuning.

A usable dataset is not just "many Q&A pairs." It needs a clear task definition, input sources, output standards, quality checks, and split strategy.

At minimum, distinguish:

- training set: used for training
- validation set: used for tuning and version selection
- test set: used for final evaluation
- regression set: used to prevent historical problems from returning

**Do not train on the test set.** That destroys the meaning of evaluation.

### Overfitting

Overfitting means the model memorizes training data too tightly and performs worse on new samples.

It is especially easy during fine-tuning when:

- training samples are too few
- sample style is too uniform
- training runs for too many epochs
- the target format is overly rigid
- validation and training sets are too similar

The result of overfitting is: the model looks good on your prepared examples, but falls apart when real users ask questions.

## Where It Fits in AI x Web3

In AI x Web3, fine-tuning can be used for specific tasks such as transaction-explanation style, governance-summary format, risk-label output, contract-comment style, and tool-call style.

But it is not a replacement for:

- real-time on-chain state queries
- smart-contract security audits
- transaction simulation
- wallet permission control
- user confirmation
- external fact citation

In other words, fine-tuning can make the model understand your task format better, but it cannot directly turn the model into a trusted execution layer.

## Minimum Practice

Run a pre-fine-tuning evaluation for a "structured summary format."

Do not train yet. First prepare 50 samples:

- Input: a technical document or proposal.
- Output: fixed JSON fields such as `summary`, `risks`, `open_questions`, `sources`.

Then compare three approaches:

1. Prompt only.
2. Prompt + few-shot.
3. Small-scale fine-tuning or adapter approach.

Use the same eval for each approach:

- whether fields are complete
- whether sources are fabricated
- whether risks are missed
- whether output is stable

Only consider fine-tuning when the first two approaches cannot solve the problem consistently.

## Further Reading

- [OpenAI Fine-tuning Guide](https://platform.openai.com/docs/guides/fine-tuning): learn fine-tuning use cases, data format, and training flow.
- [Hugging Face PEFT Documentation](https://huggingface.co/docs/peft/index): learn parameter-efficient fine-tuning methods such as LoRA and adapters.
- [LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685): the original LoRA paper, useful for understanding low-rank adaptation.
- [TRL Documentation](https://huggingface.co/docs/trl/index): learn tools for SFT, preference optimization, and related training flows.
- [OpenAI Evals API Reference](https://platform.openai.com/docs/api-reference/evals?api-mode=chat): use evals before and after fine-tuning to determine whether performance actually improved.
