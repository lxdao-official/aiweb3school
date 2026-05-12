---
title: Agentic Commerce
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/tracks/agentic-commerce/
---

# Agentic Commerce

> Agentic Commerce asks how business processes should be redesigned when an Agent can discover products, call APIs, compare quotes, initiate payments, and verify outcomes on behalf of a user.

## Why Explore This

Traditional e-commerce and SaaS subscriptions rely on people clicking buttons, filling out forms, and confirming payments. The shift in Agentic Commerce is that many purchasing actions become machine-to-machine collaboration: an Agent discovers that an API can complete a task, asks the provider for a quote, confirms the budget, pays, receives the result, and then hands the result back to the user.

This may look like "AI automatically buying things," but the real difficulty is at the transaction boundary:

- Can the Agent judge whether the service is worth buying?
- How can a user budget be expressed as machine-executable limits?
- How does the provider prove that the task was completed?
- How should refunds or arbitration work when the result is unsatisfactory?
- How should small, high-frequency, cross-platform machine payments work?

## First Principles

> **An Agent can initiate commercial actions for a user, but it cannot take on unlimited liability for the user.**

The core of commercial automation is not letting an Agent spend freely. It is turning purchase intent, budget, acceptance criteria, and dispute rules into structured protocols.

- **There must be intent before purchase**: what to buy, why to buy it, the maximum spend, and what result is acceptable.
- **There must be constraints during purchase**: quote, validity period, service terms, data usage scope, and refund conditions.
- **There must be evidence after purchase**: task result, receipt, logs, acceptance record, and dispute path.

## Knowledge Nodes

### Agents Purchasing APIs

Agents Purchasing APIs means an Agent can directly buy APIs, data, inference, storage, retrieval, and execution services. This is not a human developer registering an account in advance, copying a key, and topping up a plan. It is an Agent dynamically discovering a service and completing the call during a task.

A minimal flow usually looks like this:

1. The Agent identifies that the current task needs an external service.
2. It queries available services, prices, capabilities, and limits.
3. It generates a purchase request and budget constraints.
4. The provider returns a quote and invocation method.
5. The Agent pays and calls the service within the user's authorized scope.
6. The system records the result, cost, and failure reason.

The most important part here is not "automatic payment," but service discovery, price transparency, permission limits, and invocation logs.

::: info Related Topic
- [Machine Payment](/en/handbook/bridge/machine-payment/): Understand how Agents pay for APIs, data, and inference services.
- [x402](https://www.x402.org/): Learn about machine payment protocol design based on HTTP 402.
:::

### Payment Intent

Payment Intent is the structured expression of a user's authorization before an Agent spends money. It should be more specific than "help me buy the most suitable service."

A Payment Intent can include:

- Task objective: what needs to be completed.
- Budget: per-use, daily, or total limit.
- Payment asset: stablecoin, platform balance, or another token.
- Acceptable providers: whitelist, blacklist, or minimum reputation.
- Quality requirements: output format, response time, accuracy, or acceptance criteria.
- Refund conditions: timeout, failure, formatting error, or unusable result.
- Validity period: how long this authorization lasts.

The role of Payment Intent is to turn user intent into machine-checkable boundaries. The Agent can decide within those boundaries, but it cannot keep interpreting the boundaries more broadly.

### Budget Control

Budget control is the safety valve of Agentic Commerce. Without budget control, one Agent loop error could keep buying services, repeatedly call APIs, or initiate meaningless transactions.

Budgets should be layered:

- Task budget: the maximum spend for completing one task.
- Service budget: the limit for one API or provider.
- Time budget: total spend per hour, day, or week.
- Risk budget: high-risk services must require human confirmation.
- Failure budget: stop after several consecutive failures.

For users, the budget interface must be understandable. It should not be a pile of abstract parameters, but a clear answer to "how much can this Agent spend, on which services, and when will it stop automatically?"

### Proof of Task Completion

Before the provider receives funds, the system needs to judge whether the task has been completed. Proof of Task Completion is not one single proof type, but a set of evidence.

Different services need different evidence:

- API service: request ID, response status, structured output, timestamp.
- Data service: data hash, version, field description, authorization record.
- Inference service: model version, input summary, output hash, evaluation result.
- Execution service: transaction hash, event logs, state changes.
- Human service: deliverable, acceptance record, dispute window.

In low-value scenarios, logs and callbacks may be enough. In high-value scenarios, the system may need signed receipts, on-chain events, third-party evaluation, or escrow arbitration.

::: info Related Topic
- [Settlement and Escrow](/en/handbook/bridge/settlement-and-escrow/): A state machine for task completion, acceptance, refunds, and dispute handling.
- [ERC-8183](https://eips.ethereum.org/EIPS/eip-8183): Learn about standardization attempts around Agent tasks and payment settlement.
:::

### On-chain Receipt

An On-chain Receipt records key transaction results on-chain. It does not necessarily store full content. It stores enough evidence for both parties to reconcile later.

A receipt can include:

- payer, provider, agent, or task id.
- Payment amount, asset, chain, and transaction hash.
- Service type and quote id.
- Output hash or deliverable reference.
- Completion time, acceptance status, and dispute status.

The value of an on-chain receipt is that it makes cross-platform settlement easier to reconcile and makes an Agent's commercial behavior more traceable. But sensitive inputs and outputs should not all be written directly on-chain. Private data should only be stored as hashes or encrypted references.

### Escrow Flow

Escrow Flow uses an escrow state machine to reduce distrust between both sides of a transaction. Users do not want to pay first and receive no service; providers do not want to deliver first and receive no payment.

A basic escrow flow:

1. The user or Agent creates a task and budget.
2. Funds enter an escrow contract or controlled account.
3. The provider accepts the task and delivers the result.
4. The system checks the result against acceptance criteria.
5. If accepted, funds are released.
6. If rejected, funds are refunded or the task enters dispute.

Escrow in Agentic Commerce needs special attention to automated acceptance boundaries. Models can help judge whether a result is acceptable, but high-value or subjective results should not rely only on a model for automatic release.

## Position in AI x Web3

Agentic Commerce connects Agents, wallets, permissions, payments, escrow, reputation, and verification. It is not a single feature, but a complete commercial loop.

If you are building a project, you can start from three directions:

- Help Agents buy APIs, data, or inference services.
- Help providers accept Agent payments and deliver automatically.
- Help users manage budgets, permissions, and spending audits.

## Minimal Practice

Design a flow for "an Agent buying an on-chain data analytics API."

Write down:

- The user's objective and budget.
- How the Agent discovers API services.
- Which fields the provider quote includes.
- How Payment Intent limits amount, frequency, and service scope.
- How the API proves that the analysis was completed.
- How receipts and logs are stored.
- How refunds work when there is failure, timeout, or an unsatisfactory result.

## Further Reading

- [x402 Protocol](https://www.x402.org/): Learn the machine payment flow based on HTTP 402.
- [Coinbase x402 Docs](https://docs.cdp.coinbase.com/x402/): See how developers integrate x402 in practice.
- [Machine Payment Protocol](https://mpp.dev/): Understand protocol attempts around Agent payments, service discovery, and settlement.
- [Agent Payments Protocol](https://ap2-protocol.org/): Learn about protocol design for Agent payment authorization, intent, and commercial interactions.
- [ERC-8183](https://eips.ethereum.org/EIPS/eip-8183): Read the EIP related to Agent task payment and escrow.
