---
title: Frameworks
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/ai/frameworks/
---

# Frameworks

> An AI Framework is not for saving a few lines of API calls. It organizes models, tools, state, retrieval, evaluation, and deployment into a maintainable system. When you choose the wrong framework, the problem is usually not "it cannot run"; it is that later you cannot debug it, test it, or replace it.

## Why Learn This

When you first build AI applications, directly calling a model API is enough. Once you move into real products, you quickly meet more complex problems: prompts need version management, tool calls need schemas, Agents need state, failures need retries, user feedback needs to enter evaluation, and online behavior needs tracing.

Frameworks solve these engineering organization problems. They do not define product value for you, and they do not guarantee model correctness, but they can help you split complex systems into clearer modules.

The most important judgment when learning frameworks is not "which one is most popular," but: **which layer of complexity does it help you manage, and which complexity does it hide?**

## First Principles

> **A framework expresses system boundaries; it is not intelligence itself. Understand the workflow first, then decide whether to use a framework.**

Many failed AI projects do not fail because they lack a framework. They fail because they introduce a framework first, then bend product logic around that framework. A steadier path is to first draw inputs, state, tools, outputs, evaluation, and failure paths, then decide which parts deserve a framework.

- **Keep simple flows simple**: one model call, one retrieval step, and one formatted output do not necessarily need a complex Agent framework.
- **Long workflows need explicit state**: multi-step tasks, tool calls, human confirmation, and failure recovery should have queryable state, not only chat history.
- **Frameworks must be exit-able**: if a framework makes it hard to change models, vector databases, or deployment methods, the long-term cost will be high.

## Knowledge Nodes

### LangChain

LangChain is one of the most common LLM application development frameworks. It covers model integration, prompts, tool calls, retrievers, agents, output parsers, and other modules.

It is useful for quickly connecting model capabilities to external systems, and for learning common components of AI applications. But be careful with "abstracting too early." If you have not clarified your workflow, wrapping everything in chains and agents can make later debugging harder.

LangChain is more like a component library. It can help you compose capabilities, but it should not decide product boundaries for you.

::: info Related Topic
- [Prompt](/en/handbook/ai/prompt/): prompt management inside a framework still needs to return to task boundaries and output format.
- [LangChain Agents Docs](https://docs.langchain.com/oss/python/langchain-agents): see how LangChain organizes models, tools, and agent loops.
:::

### LangGraph

LangGraph leans more toward workflows and state machines. It represents an Agent or multi-step task as a graph: nodes execute actions, edges control flow, and state records the process.

If the task is only "ask once, answer once," LangGraph may be too heavy.  
But if the task needs multiple tool calls, retries, human confirmation, branching, recovery, and long-running execution, an explicit graph is more reliable than a long prompt history.

A practical judgment: **once you care about which step the task is on, whether it can recover, and where to resume after failure, you should consider a graph / state machine.**

::: info Related Topic
- [Agent](/en/handbook/ai/agent/): first understand why Agents need goals, tools, state, and stop conditions.
- [LangGraph Docs](https://docs.langchain.com/langgraph): official docs for the basic model of stateful Agents and workflows.
:::

### OpenAI Agents SDK

OpenAI Agents SDK is used to build Agent applications with tools, handoff, guardrails, and tracing. Its value is that it turns common engineering problems in Agent workflows into composable structures.

You can use it to organize:

- Agent instructions and tools
- handoff between multiple Agents
- tool calls and structured output
- guardrails and runtime tracing

The key is still the boundary: the SDK can help execute the flow, but you must define which tools are available, which actions require confirmation, and what counts as failure.

::: info Related Topic
- [OpenAI Agents Guide](https://platform.openai.com/docs/guides/agents/best-practices): understand tools, knowledge, guardrails, and monitoring when building Agents.
- [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents-sdk/): see the SDK's core concepts and implementation approach.
:::

### DSPy

DSPy focuses on writing prompt / LM pipelines as optimizable programs. It is not about manually tuning one prompt; it asks you to define inputs, outputs, modules, and metrics clearly, then use optimizers to improve prompts or calling strategies.

If your task is only to write a paragraph of copy, DSPy may not be necessary.  
When you have a clear dataset, evaluation metric, and repeatable task, it becomes more valuable: classification, extraction, Q&A, rerank, or complex reasoning chains.

The key lesson from DSPy is: **do not tune prompts only by feel; bring tasks, data, and metrics into the system.**

::: info Related Topic
- [Evaluation](/en/handbook/ai/evaluation/): without evals, automatic optimization can easily optimize toward the wrong target.
- [DSPy Documentation](https://dspy.ai/): learn core concepts such as signatures, modules, and optimizers.
:::

### Hermes

Hermes is better understood here as a model / agent ecosystem oriented around tool calling and structured output, rather than a general-purpose framework.

It reminds us of one thing: a framework is not the only abstraction layer. Whether the model itself is good at tool calling, JSON mode, long context, and reasoning also affects system design. A model with stable tool-calling ability can reduce a lot of parsing and fallback cost; conversely, when model capability is unstable, even a good framework needs many guards.

When looking at directions like Hermes, do not look only at benchmark scores. Look at whether it can reliably produce the structured output and tool-call format you need.

::: info Related Topic
- [Nous Hermes Function Calling](https://github.com/NousResearch/Hermes-Function-Calling): see examples of how the Hermes family handles function calling and JSON output.
- [Hermes Agent Docs](https://hermes-agent.nousresearch.com/docs/): learn the Hermes Agent toolchain from Nous Research.
:::

### Learning Agent

Learning Agent means a system can improve from feedback, logs, evaluation results, or user corrections. "Learning" here does not necessarily mean training the model; it can also mean updating prompts, adjusting retrievers, adding rules, or improving test sets.

In real products, the most common mistake is turning online feedback directly into behavior changes. This can introduce data pollution, unauthorized learning, and unexplained changes.

A steadier process is:

1. Record failure cases.
2. Label causes manually or with rules.
3. Add them to eval / regression sets.
4. Modify prompts, retrieval, tools, or model configuration.
5. Release only after tests pass.

**Learning ability should enter the evaluation loop first, then the production system.**

## Where It Fits in AI x Web3

Frameworks are responsible for connecting model capabilities to product workflows in AI x Web3: reading context, calling tools, generating structured actions, recording traces, and entering eval.

But they should not replace the Web3-side permissions, signatures, transaction simulation, and account rules. A framework can organize an Agent; it cannot take asset risk on behalf of the user.

A relatively stable division of labor is:

- AI Framework manages prompts, tools, state, eval, and traces.
- Web3 infrastructure manages accounts, signatures, contracts, transactions, and on-chain state.
- Product layer defines user goals, permission boundaries, confirmation flows, and failure handling.

## Minimum Practice

Build a minimal framework comparison for "documentation Q&A + tool call."

Implement the same task in two ways:

- Direct model API call: user question + retrieved result + JSON output.
- Using a framework: same input and output, but with tool schema, trace, failure retry, and test cases.

Compare four things:

- Which version is easier to read?
- Which version is easier to add tools to?
- Which version makes errors easier to locate?
- Which version makes regression tests easier to write?

The point is not to choose a champion, but to see clearly what the framework actually helps with.

## Further Reading

- [LangChain Agents Docs](https://docs.langchain.com/oss/python/langchain-agents): learn how LangChain organizes models, tools, and Agents.
- [LangGraph Docs](https://docs.langchain.com/langgraph): useful for learning stateful, recoverable Agent workflows.
- [OpenAI Agents SDK](https://platform.openai.com/docs/guides/agents-sdk/): see how Agents, handoff, guardrails, and tracing are organized in the OpenAI ecosystem.
- [DSPy Documentation](https://dspy.ai/): understand how signatures, modules, and optimizers can manage LM pipelines.
- [Nous Hermes Function Calling](https://github.com/NousResearch/Hermes-Function-Calling): see implementation examples for tool calling and structured output at the model layer.
