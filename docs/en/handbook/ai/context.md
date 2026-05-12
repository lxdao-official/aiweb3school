---
title: Context
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/ai/context/
---

# Context

> Context is the information space the model can see, use, and be influenced by in this run. The hard part is not putting more content in; it is separating system rules, user goals, historical state, tool results, and external documents.

## Why Learn This

An LLM is not automatically connected to your database, file system, APIs, user history, or project documentation. It only generates output based on the current context. If the context is wrong, missing, or outdated, even a strong model will produce unreliable answers.

Many AI application problems look like "the model is not smart enough" on the surface, but are actually context design problems: treating an untrusted webpage as a system instruction, treating old docs as the latest rules, treating a user wish as fact, or leaking the previous task state into the next task.

In any scenario with tool calls, this directly affects safety. If the model cannot see the real tool result, it can only guess. If an Agent does not know the current state, permissions, and budget, it may generate out-of-bounds actions.

## First Principles

> **A model can only act based on the context it sees; the system must decide what enters context, with what identity, and how it exits after expiration.**

Context is not simply long-text concatenation. It is an information governance problem. You need to label each type of information by source, freshness, permission, and trust level. Otherwise the model will process "what the user said," "what a webpage wrote," "what the chain returned," and "what the system requires" at the same level.

- **Trusted sources must be explicitly marked**: system state, user input, retrieved documents, and tool results should be placed in separate zones.
- **Context must be refreshable**: state, configuration, permissions, prices, versions, and task progress cannot be cached for a long time and then reused as if still current.
- **Memory must be revocable**: user preferences and historical tasks can improve the experience, but they must not become hidden permissions or permanent identity assumptions.

## Knowledge Nodes

### Context Window

Context Window is the maximum amount of context a model can process in one request. A larger window allows more material to be included, but it does not mean the model will use every detail perfectly.

A common long-context problem is "the model saw it but did not focus on the right thing." If you put contract source code, audit reports, governance discussions, and transaction logs all into one context, the model may be distracted by irrelevant content or cite outdated sections.

In real products, the context window should be used together with retrieval, summarization, and structured data. Key state should be provided directly, long documents should be fetched on demand, and low-trust content should be isolated and labeled.

### Context Engineering

Context Engineering is the design of how context enters the model. It includes choosing data sources, ordering, trimming, labeling sources, isolating untrusted content, and deciding which information must be re-queried every time.

A stable tool-using Agent context is usually not just "user question + a JSON blob." It should also include:

- current task state
- tool return values
- relevant logs or evidence
- trusted data sources
- external check results
- the user's original intent
- system prohibitions and output schema

**The goal of Context Engineering is not to fill the window, but to let the model work at the right information layer.**

::: info Related Topic
- [Chain-aware Context](/en/handbook/bridge/chain-aware-context/): continue with how on-chain state enters Agent context.
- [RAG](/en/handbook/ai/rag/): when context comes from large document collections, retrieval and citation mechanisms are needed.
:::

### Memory

Memory is information retained across requests, such as user preferences, historical tasks, commonly used wallets, project configuration, and previous analysis results.

Memory can make an Agent smoother to use, but it also introduces hidden risk. For example, a system may remember that "the user commonly uses address 0xabc" and then default to it as a recipient next time; or remember that "the user has high risk tolerance" and loosen confirmation on high-risk transactions.

Memory cannot replace real-time authorization. A user allowing an action in the past does not mean they still allow it now. **Any memory related to identity, permissions, assets, or external side effects must be rebound to the current session and current authorization.**

### Knowledge Base

A Knowledge Base is an external repository the system can retrieve from, such as product docs, SDK docs, code explanations, forum discussions, FAQs, or internal runbooks.

It is useful for solving model knowledge staleness, but it does not automatically guarantee correctness. A knowledge base needs to maintain source, update time, version, applicable network, and deprecation status. Otherwise RAG will only deliver old errors to the model more reliably.

For builders, a knowledge base should at least record:

- document source and URL
- last update time
- applicable protocol version
- applicable version or runtime environment
- whether it comes from an official source or a third party
- whether human review is needed

## Where It Fits in AI x Web3

Context is the entry point connecting models with real systems. AI is responsible for reasoning, while Web3 provides state and settlement; context determines whether the model sees user imagination, outdated documentation, or verifiable on-chain facts.

A reliable Agent context is usually layered:

- Instruction layer: system rules, tool-use rules, prohibitions.
- Task layer: user goal and current session parameters.
- Fact layer: on-chain state, tool results, simulation.
- Knowledge layer: documents, standards, forums, historical cases.
- Memory layer: user preferences and project configuration.

The clearer the layers, the easier it becomes to do permission control, Prompt Injection defense, and audit.

## Minimum Practice

Design a context spec for a "wallet approval check Agent."

Choose a scenario: the user asks, "this dApp wants me to approve, can I sign it?" List the context the model must have before answering:

- chain id and current block
- token contract, spender address, approval amount
- user's current allowance and balance
- whether the spender is on a trusted list
- simulation or static check result
- explanation provided by the dApp page, marked as untrusted external content
- the user's intent in this session

Then write down which fields must be queried in real time, which can come from cache, and which must not be treated as facts by the model.

## Further Reading

- [OpenAI Text Generation Guide](https://platform.openai.com/docs/guides/text-generation): understand model inputs, message roles, outputs, and context management basics.
- [OpenAI Prompt Engineering Guide](https://platform.openai.com/docs/guides/prompt-engineering): see how to organize context, examples, and format boundaries.
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings): understand how knowledge bases and semantic retrieval provide material for context.
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/): focus on Prompt Injection, sensitive information disclosure, and vector/embedding-related risks.
- [LangChain Retrieval Documentation](https://docs.langchain.com/oss/python/integrations/retrievers/index): learn how different retrievers send external knowledge into model context.
