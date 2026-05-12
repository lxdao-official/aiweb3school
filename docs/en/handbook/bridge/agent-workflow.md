---
title: Agent Workflow
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/agent-workflow/
---

# Agent Workflow

> Agent Workflow is the organization of "user goals → context reading → plan generation → tool calling → risk check → execution → recording and review" into a controllable process, rather than letting the model improvise freely.

## Why Learn This

The difficulty of AI x Web3 is not in making the model say "I can help you operate," but in breaking down operations into verifiable steps. On-chain actions involve assets, permissions, and irreversible results; an Agent's workflow must be stricter than a regular chat.

A mature Agent is more than just a prompt. It needs a task graph, state machine, tool permissions, error handling, human confirmation, trace, and evaluation sets.

**The core of Agent Workflow is putting a probabilistic model into a deterministic process.**

## First Principles

> **High-risk Agents cannot rely solely on "next-step reasoning"; they must have states, boundaries, and stop conditions.**

Models can plan, but the system needs to know which step has been reached, which tools have been called, which results are trustworthy, which actions require confirmation, and how to stop upon failure.

- **Explicit Process**: Do not hide the entire execution chain within a long prompt.
- **Recoverable State**: The system must know how to continue or stop when a tool fails, a user rejects, or a transaction is pending.
- **Replayable Evaluation**: Without traces and regression sets, it is difficult to know if a model change has made the system safer.

## Knowledge Nodes

### Task Graph

**Difficulty: Intermediate.** A Task Graph breaks down goals into nodes and dependencies, rather than letting the Agent execute freely all at once.

For example, "help me evaluate and execute a low-risk swap" can be broken down into:

1. Read user goals and constraints;
2. Fetch balance and allowance;
3. Query price and liquidity;
4. Generate a candidate transaction;
5. Simulate the transaction;
6. Display risks;
7. User confirmation;
8. Send transaction;
9. Track results.

With this breakdown, each step can have its own input, output, permissions, and stop conditions.

### State Machine

**Difficulty: Advanced.** A State Machine gives the Agent execution process clear states rather than just a chat history.

Common states in on-chain workflows include: `draft`, `context_loaded`, `plan_ready`, `simulation_failed`, `waiting_user_confirmation`, `submitted`, `confirmed`, `reverted`, and `cancelled`.

The value of a state machine is that the system doesn't forget where it is or repeat dangerous actions when a user refreshes the page, a transaction is pending, an RPC fails, or a model retries.

### Human-in-the-loop

**Difficulty: Intermediate.** Human-in-the-loop places humans at critical risk points rather than requiring confirmation for every low-risk step.

A reasonable layering could be:

- Read-only analysis: Automatic execution;
- Transaction drafts: Automatic generation;
- Small-amount whitelisted operations: Executed via session keys;
- High-risk transactions: Must be manually confirmed;
- Exceeding policy: Reject directly.

The point is not whether there is human confirmation, but whether humans can understand asset changes, permission changes, and failure risks when they confirm.

### Retry / Fallback

**Difficulty: Intermediate.** Retry / Fallback handles tool failures, network anomalies, unqualified model outputs, and uncertain transaction states.

Web3 Agents cannot retry blindly. A failure to read balance can be retried; a failure to send a transaction requires judging whether it has already been broadcast; pending transactions cannot simply be re-sent; RPC anomalies can trigger a provider switch, but data sources must be logged.

Fallback must also be cautious. When a model is unavailable, it can degrade to read-only mode, but it should not automatically switch to an unevaluated model to continue sending transactions.

### Trace

**Difficulty: Beginner.** A Trace is a record of every input, judgment, tool call, and result of the Agent.

A useful trace includes at least: user goals, model version, context sources, tool inputs/outputs, policy judgments, simulation results, human confirmation, transaction hashes, and final status.

Without traces, you can only look at chat logs when problems arise; with traces, you can review whether it was a model misunderstanding, a tool error, a policy omission, or a user confirming the wrong action.

### Evaluation Harness

**Difficulty: Advanced.** An Evaluation Harness is used to systematically test Agent performance across different tasks, risks, and anomaly scenarios.

For on-chain Agents, evals should not only test if answers are good, but also:

- Whether unauthorized requests are correctly rejected;
- Whether wrong chains and wrong contracts are identified;
- Whether execution stops when data is missing;
- Whether human checks are requested;
- Whether citations are recorded;
- Whether generation of dangerous calldata is avoided.

::: info Related Topic
- [Evaluation](/en/handbook/ai/evaluation/): Understand how golden sets, regressions, and observability are used in AI systems.
:::

### Regression Set

**Difficulty: Intermediate.** A Regression Set is a fixed set of test cases used to prevent safety degradation after model, prompt, tool, or policy updates.

It can include:

- Normal swap requests;
- Requests for the wrong chain;
- Infinite approval requests;
- Malicious document inducement;
- Insufficient balance;
- Stale oracle prices;
- User refusing to sign;
- Transaction pending timeout.

Every time a model or tool is changed, this set of cases should be run to confirm that the Agent hasn't regressed from "rejecting dangerous requests" to "looking smoother but being more dangerous."

## Position in AI x Web3

Agent Workflow is the process skeleton of the bridge layer. [Chain-aware Context](/en/handbook/bridge/chain-aware-context/) provides facts, [Web3 Tool Use](/en/handbook/bridge/web3-tool-use/) provides capabilities, [Agent Wallet](/en/handbook/bridge/agent-wallet/) provides permission boundaries, and Workflow organizes them into executable but controllable paths.

Without a workflow, projects easily become "models directly calling tools." This is fast for demos but insufficient in the face of real assets and permissions.

## Minimal Practice

Design an on-chain Agent workflow:

1. Select a task: Explain and prepare a small ERC-20 swap.
2. Draw the task graph: Read context, query price, generate plan, simulate, confirm, execute, record.
3. Write inputs, outputs, available tools, and failure handling for each step.
4. Mark which steps must be human-in-the-loop.
5. Write 5 regression cases: normal, wrong chain, excessive slippage, insufficient balance, user rejection.

## Extended Reading

- [LangGraph Concepts](https://langchain-ai.github.io/langgraph/concepts/why-langgraph/): Understand why complex Agents need states, control flow, and persistence.
- [OpenAI Tools Guide](https://platform.openai.com/docs/guides/tools): Understand how inputs and outputs are organized when models call tools.
- [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/): Learn about Agent engineering concepts like trace, tool, handoff, and guardrail.
- [Tenderly Simulations](https://docs.tenderly.co/simulations): For transaction simulation and debugging before on-chain execution.
- [ERC-4337 Documentation](https://docs.erc4337.io/): Understand how smart accounts and UserOperation enter the Agent execution process.
