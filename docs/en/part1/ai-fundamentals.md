---
title: AI Fundamentals
createTime: 2026/04/16 15:30:00
permalink: /en/ai-fundamentals/
---

# AI Fundamentals

## What this lesson solves

AI is not a single tool. It is a stack of capabilities that allows software to perceive, reason, generate, and act. Before moving into AI × Web3, it is worth drawing the boundary between models, products, agents, and automation. Without that, later concepts tend to collapse into one vague idea.

## A minimal mental map

It helps to split AI systems into four layers:

1. Data layer: the text, images, audio, and behavioral data used for training and inference.
2. Model layer: the system that learns patterns and produces outputs.
3. Application layer: the product capability built on top of the model, such as search, summarization, generation, or classification.
4. Execution layer: the part that allows a model to do more than answer, such as calling tools, writing to a database, or triggering onchain actions.

## Core concepts

### AI

AI is a broad term for methods that let machines perform tasks that previously required human judgment. The key question is not whether a system “thinks like a human,” but whether it can complete useful cognitive work.

### Machine Learning

Machine Learning is one of the main approaches inside AI. Instead of hard-coding every rule, the system learns patterns from data.

### Deep Learning

Deep Learning is a branch of Machine Learning built on neural networks with many layers. Most modern language models, image models, and speech systems belong to this family.

### Model

A model is the learned parameter set. Training is the phase where it learns. Inference is the phase where it is used.

### Prompt

A prompt is the instruction or context you provide to a model. Even strong models produce weak outputs when the input is vague.

### Agent

An Agent adds planning and execution on top of a model. It usually has a goal, memory, tool usage, and feedback loops instead of producing a single isolated answer.

## Why generative AI matters

Earlier AI systems were often designed to classify or detect. Generative AI moved one step further. It can write, summarize, code, plan, and call tools. That makes it much more relevant to AI × Web3, where useful systems often need to:

- read onchain state
- interpret transactions and contracts
- generate decisions or strategies
- execute actions under clear constraints

## Common misconceptions in AI × Web3

### Misconception 1: the model is the product

The model is only the capability layer. A real product still needs data flow, permissions, failure handling, and user experience.

### Misconception 2: an Agent automatically creates value

An Agent is an execution system, not a guarantee of strategy quality. In onchain contexts, bad execution is usually more expensive than a bad answer.

### Misconception 3: everything related to AI must go onchain

Not true. A component belongs onchain only when you actually need public verification, settlement, coordination, or tamper resistance.

## The questions to keep in mind

- Is this system recognizing, predicting, or generating?
- Does it only provide suggestions, or can it execute actions?
- Is the data trustworthy, traceable, and current?
- Is the failure cost limited to a UI, or does it affect assets and permissions?

## Minimum takeaway

After this lesson, you should be able to explain:

- the relationship between AI, Machine Learning, and Deep Learning
- why models, applications, and agents are different layers
- why generative AI matters for Web3 use cases
- why execution is more sensitive than text generation in onchain settings

## What comes next

The next lesson moves into Machine Learning basics: how models learn from data, why overfitting happens, and why training and validation sets must be separated.
