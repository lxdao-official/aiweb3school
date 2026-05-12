---
title: Large Language Models（LLM）
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/ai/llm/
---

# Large Language Models（LLM）

> An LLM is not a chatty black box. It is a probabilistic model that compresses large amounts of text, code, and multimodal signals into parameters. You need to understand how it handles tokens, context, patterns, and uncertainty before you can know when to trust it and when to verify it.

## Why Learn This

Many AI applications start by saying, "we use a large model." That is not enough. You need to keep asking: is the model responsible for understanding user intent, or generating content? Is it only answering questions, or can it call tools? Do its errors stay inside text, or do they enter a real workflow?

LLMs are the capability base of most AI applications today. They can summarize documents, write code, generate plans, extract structured information, and turn natural language into formats that programs can handle more easily. But an LLM is not a database. It does not automatically know the latest state of the outside world, and it cannot take responsibility for fact checking on behalf of the system.

The goal of learning LLMs is not to memorize model parameters. It is to build one judgment: **model output is a candidate result, not the fact itself; model capability is an entry point for reasoning, not the final verification.**

## First Principles

> **An LLM generates outputs that are probabilistically reasonable, not facts that are trustworthy by default.**

This determines where LLMs belong in any serious system. They can help you understand, summarize, generate, and plan, but they cannot independently serve as the source of truth, the permission judge, or the final executor. The closer a system gets to real action, the more it needs external data, deterministic rules, and human or system verification.

- **Treat the model as a reasoning layer, not a truth source**: key facts must come from databases, APIs, logs, documentation sources, or other trusted systems.
- **Turn outputs into checkable objects**: summaries, classifications, plans, and action suggestions should land in schemas, parameters, citations, or logs whenever possible, not only in natural language.
- **Expose uncertainty early**: when the model does not know, the material is outdated, or context is insufficient, the system should degrade explicitly instead of inventing a smooth answer.

## Knowledge Nodes

### Token

A token is the basic unit a model uses to process text. It is not necessarily one Chinese character, one English word, or one symbol. It is a segment produced by the tokenizer.

Tokens directly affect three things: how much context can fit, how much a call costs, and whether the model can see key information completely. Long documents, code, JSON, logs, and multi-turn conversations can easily fill the context. You need to decide which information should be included as-is, which should be compressed first, and which should be retrieved on demand.

**Do not assume that a short page means few tokens.** Code, JSON, long identifiers, tables, and mixed-language text often consume more tokens than ordinary paragraphs.

### Embedding

An embedding maps text, code, or another object into a vector so the system can measure whether two things are semantically close. Embeddings are commonly used for search, clustering, recommendation, anomaly detection, and RAG.

Embeddings are good at helping you find relevant material from documents, knowledge bases, code repositories, discussions, and product logs. But they are not suitable for deciding whether a conclusion is correct on their own. Vector similarity only says that content is close; it cannot replace source verification, rule checks, or human judgment.

::: info Related Topic
- [RAG](/en/handbook/ai/rag/): continue with how embeddings enter retrieval-augmented generation systems.
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings): understand embedding use cases, vector distance, and API shape.
:::

### Transformer

Transformer is one of the core architectures behind modern LLMs. Its key capability comes from attention: the model can attend to different positions in the input while generating, learning relationships between words, code, facts, and context.

You do not need to start with formulas, but you should understand one engineering fact: Transformer models are good at finding patterns in context, but that does not mean they have a stable database. They can combine documents, code, and user goals to generate explanations, but they can also produce wrong summaries when context is missing or similar patterns mislead them.

**Transformers give models strong pattern-composition ability, but not final authority over facts.**

### Hallucination

Hallucination means the model generates content that looks reasonable but is not true or cannot be verified. It may invent APIs, explain code incorrectly, cite non-existent material, or treat outdated documentation as the current state.

In ordinary Q&A, hallucination may only be an answer-quality issue. In any system with execution ability, hallucination becomes workflow risk: wrong parameters, wrong permission explanations, and wrong action suggestions can all enter downstream automation.

Do not handle hallucination only by "writing a better prompt." A more reliable approach is to connect model output to external verification: source citations, schema validation, rule checks, human confirmation, and audit logs.

::: info Related Topic
- [Evaluation](/en/handbook/ai/evaluation/): use test sets and regression evaluation to continuously catch model errors.
- [AI Security](/en/handbook/bridge/ai-security/): see the risks when model errors and attack inputs enter tool execution.
:::

### Multimodal

Multimodal models can process text, images, audio, video, or screenshots. For builders, their value is not that they are "flashier"; it is that models can understand more real work surfaces: charts, consoles, mockups, application pages, error screenshots, and confirmation dialogs.

But multimodal input also needs boundaries. Text in a screenshot may be obscured, charts may lack axes, and pages may be forged. The model can help identify and explain, but key judgments still need to return to structured data and trusted sources.

## Where It Fits in AI x Web3

LLMs sit in the understanding and generation layer of AI x Web3 systems. They turn user goals into discussable plans, explain complex on-chain data in human language, and connect documents and code into executable thinking.

Real products usually need these layers working together:

- Data layer: RPC, indexers, oracles, vector databases, project documentation.
- Orchestration layer: Prompt, Context, RAG, Agent workflow.
- Execution layer: tool calls, wallets, Smart Accounts, contract interactions.
- Safety layer: Guard, simulation, permission policies, human confirmation, logs.

The closer an LLM gets to the execution layer, the more the system must turn its natural-language output into verifiable objects.

## Minimum Practice

Build a minimal "transaction interpreter."

Input a transaction hash, let the system read transaction details, event logs, and related contract ABI, then let the LLM generate an explanation. The output should include:

- what action the user initiated
- which assets and addresses are involved
- which information comes from on-chain data, and which is model inference
- where the model is uncertain
- what the user should check before signing a similar transaction

The point of the exercise is not to make the explanation beautiful. It is to separate **model generation, on-chain facts, source boundaries, and uncertainty**.

## Further Reading

- [OpenAI Text Generation Guide](https://platform.openai.com/docs/guides/text-generation): learn how LLMs receive input, generate text, and return structured content through APIs.
- [OpenAI Tokenizer](https://platform.openai.com/tokenizer): see directly how different text, code, addresses, and JSON are split into tokens.
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings): understand the basic role of embeddings in search, clustering, and RAG.
- [Attention Is All You Need](https://arxiv.org/abs/1706.03762): the original Transformer paper, useful for building technical background around attention and modern model architecture.
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/): understand common risks such as Prompt Injection, sensitive information disclosure, and excessive agency from a security perspective.
