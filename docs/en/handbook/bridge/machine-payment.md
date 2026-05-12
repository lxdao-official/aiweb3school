---
title: Machine Payment
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/machine-payment/
---

# Machine Payment

> Machine Payment discusses how Agents, APIs, services, and wallets automatically complete quoting, authorization, payment, receipts, and budget control. The focus is not on "AI spending money," but on making payments between machines limitable, verifiable, and traceable.

## Why Learn This

If Agents can only call tools for free, their capabilities will remain at the demo stage. Real services require payment: model inference, data APIs, browser environments, on-chain transactions, storage, human review, and task execution by another Agent.

Machine Payment allows Agents to purchase services within budgets authorized by users, and also allows service providers to deliver results after receiving verifiable payment. The challenge here is not the transfer itself, but: who authorizes it, what is the price, when is it deducted, how to refund on failure, how to verify receipts, and how to ensure budgets are not abused.

**The core of Machine Payment is to decouple "payment intent" from "actual settlement" and ensure every step has evidence.**

## First Principles

> **Agents should not have unlimited payment capabilities; they should only receive payment permissions within the scope of specific tasks, budgets, and recipients.**

Payment is part of the execution capability. Once an Agent can pay, it can consume user funds, trigger on-chain state changes, purchase external services, or be induced by malicious contexts.

- **Budget Precedes Execution**: Without budget boundaries, there is no safe automatic payment.
- **Quotes Must Be Comparable**: Agents need to know the price, currency, validity period, service scope, and refund conditions.
- **Receipts Must Be Verifiable**: After payment, it must be provable to whom it was paid, why it was paid, and what was delivered.

## Knowledge Nodes

### Stablecoin Payment

**Difficulty: Beginner.** Stablecoins are suitable for machine payments because their prices are relatively stable, settlement is fast, they are programmable, and they are easily verified by contracts and services.

When Agents pay API call fees or service fees, they usually do not want prices to fluctuate drastically with native assets. Stablecoins can serve as the unit of account, but one must still handle chain ID, token address, decimals, allowance, gas, and cross-chain availability.

In real products, a distinction is also made between "pricing currency" and "settlement currency." A service provider might quote in USD, while the user pays in USDC, or other tokens might be converted into stablecoins through a Paymaster or intermediate router. An Agent cannot just see "0.1"; it must know if it is 0.1 USDC, 0.1 USDT, or 0.1 native gas token.

When evaluating a stablecoin payment solution, look at at least four things: whether the payment token has enough liquidity on the target chain, whether the recipient accepts that token, whether payment failure consumes gas, and whether the user needs to approve in advance. For an Agent, approval itself is a high-risk action and cannot be mixed with ordinary payments.

### Budget

**Difficulty: Beginner.** Budget is the maximum spending scope authorized by the user to the Agent.

Budgets can be defined by time, task, service provider, currency, and amount—for example, "spend at most 5 USDC today to call data APIs" or "a single browser task does not exceed 0.2 USDC." Budgets should not just exist in chats but should enter wallet policies, session keys, or backend ledgers.

Budgets are best split into multiple layers: global budget, task budget, single call limit, service provider limit, and emergency stop conditions. This way, even if an Agent is induced to repeatedly call tools, it can only consume funds within a very small range.

A common mistake is setting only a total budget without setting frequency or service provider scope. The result is that an Agent could spend the entire budget on an abnormal quote or be induced by a malicious webpage to repeatedly purchase the same service. The budget system should be able to answer: does this payment belong to the current task, is it within the service scope authorized by the user, and does it exceed frequency or amount limits?

### Quote

**Difficulty: Intermediate.** A Quote is an executable price offer given by a service provider to an Agent.

A qualified quote contains at least: service content, price, currency, recipient address, validity period, delivery conditions, refund conditions, and a quote ID. Before an Agent accepts a quote, it must check if it is within budget, if the service provider is trustworthy, and if the quote has expired.

The validity period of a quote is important. Prices, exchange rates, service capacity, and on-chain gas all change. Expired quotes cannot continue to be used by the Agent; otherwise, the issue of "the user thought they were buying a 0.1 USDC service, but the price had already become 1 USDC at the time of execution" might occur.

Quotes should also be signable or source-verifiable. If a quote returned by a service provider has no signature, no quote ID, and no bound recipient address, it will be very difficult to prove what conditions the Agent actually accepted during a subsequent dispute.

### Payment Intent

**Difficulty: Intermediate.** Payment Intent expresses that "a user or Agent wants to pay for a specific service," but it is not equivalent to having settled.

Payment Intent should be bound to a task, amount, recipient, validity period, and acceptable results. This way, even if it is subsequently executed automatically by the Agent, it can trace back to the user's original authorization, rather than letting the Agent decide to spend money on the fly.

Payment Intent can be understood as "the user authorizes this type of payment," rather than "a specific transaction has already occurred." It is usually created before actual settlement to provide context for subsequent payment, escrow, and receipts.

In Agent payments, a Payment Intent should at least include: user goal, service provider, maximum amount, currency, chain, expiration time, quote reference, whether automatic retry is allowed, and whether human confirmation is required. Without these fields, the Agent's payment behavior is hard to audit.

### x402

**Difficulty: Intermediate.** x402 attempts to turn HTTP 402 Payment Required into an internet-native payment flow, allowing services to use standard responses to request payment.

In an x402-style flow, the client requests a resource, the service returns a payment requirement, and the client re-requests with proof of payment after completing the payment. It is suitable for small, per-use payments for APIs, data, content, and agent services.

The value of x402 is putting "payment required to access resources" back into HTTP semantics. For an Agent, this means tools can handle 402 payments just like 401 logins: first read the payment requirement, then check the budget, then complete the payment, then replay the request.

It should be noted that x402 only solves part of the payment protocol. It does not automatically solve service quality, refunds, delivery disputes, and long-term subscriptions. High-value services still require escrow, receipt, and dispute mechanisms.

::: info Related Topic
- [x402](https://www.x402.org/): Learn about the open payment standard around HTTP 402.
:::

### MPP

**Difficulty: Intermediate.** MPP (Machine Payments Protocol) focuses on payment negotiation and settlement between machines.

Its value lies in protocolizing the payment process for agent services: discovering services, obtaining quotes, authorizing payments, settlement, and returning receipts. For builders, the key is understanding that machine payment requires more than just on-chain transfers; it also includes quotes, credentials, and error handling.

MPP-like protocols are suitable for thinking about "how machines do business": service discovery, price negotiation, payment credentials, delivery receipts, and failure retries should all have machine-readable formats. Without a protocol, Agents can only read webpages or API documents to temporarily piece together flows, which results in poor reliability.

In implementation, do not understand MPP as all steps that must go on-chain. Many steps can be completed off-chain, with the chain only bearing final settlement, collateral, receipt anchoring, or dispute evidence.

::: info Related Topic
- [MPP](https://mpp.dev/): Learn about the basic direction of the Machine Payments Protocol.
:::

### Subscription

**Difficulty: Intermediate.** Subscription is a payment model for continuous services, such as monthly API packages, continuous monitoring, or long-term Agent tasks.

Subscriptions require cancellation capabilities even more than one-time payments. Users must be able to see current authorizations, the next deduction time, remaining limits, service scope, and be able to stop at any time.

Agent subscriptions especially must be careful of "silent renewals." If an Agent subscribes to a data source to continuously monitor risks, the system must let the user know: when the subscription renews, what the maximum monthly budget is, whether the service provider can raise prices, and whether to continue deductions on failure.

Subscriptions are better suited for integration with smart account policies: monthly limits, service provider whitelists, deduction time windows, and abnormal deduction alerts. Do not let Agents implement subscriptions through infinite allowance.

### Micropayment

**Difficulty: Advanced.** Micropayment is suitable for high-frequency, small-amount, automated services, but requires higher standards for fees, batch settlement, and fraud control.

If every call is settled on-chain, the cost may exceed the service itself. Actual systems may need L2, payment channels, batch settlement, prepaid balances, or off-chain ledgers plus on-chain final settlement.

The design of Micropayment must first calculate the economic account: single service value, on-chain fees, failure rate, fraud cost, and reconciliation cost. Many scenarios are not suitable for sending on-chain transactions every time, but are suitable for prepaid limits, cumulative consumption, and periodic settlement.

This is especially true for AI tools. A search, a lightweight inference, or a webpage crawl might only have a few tenths or cents of value, suitable for batch settlement; a high-value report, audit, or transaction execution is better suited for escrow and individual receipts.

## Where It Fits in AI x Web3

Machine Payment is the foundation of Agentic Commerce. Whether an Agent is purchasing data, delegating to another Agent, calling a paid API, or completing a task for a user, it needs payment capabilities.

But payment capabilities must be connected with Agent Wallet, Policy, Settlement, and Receipt. A usable chain should be: user authorizes budget, Agent gets quote, system checks policy, payment enters escrow or direct settlement, service is delivered, and receipt leaves evidence.

## Minimum Practice

Design a payment flow for an Agent to purchase an API:

1. User authorization: At most 3 USDC today.
2. API returns quote: 0.1 USDC per call, valid for 5 minutes.
3. Agent checks budget and service provider identity.
4. Wallet or payment tool completes the payment.
5. API returns result and receipt.
6. System records quote, payment intent, transaction hash, result, and remaining budget.

## Further Reading

- [x402](https://www.x402.org/): Learn about the internet-native payment standard based on HTTP 402.
- [MPP](https://mpp.dev/): Learn about the design direction of machine-to-machine payment protocols.
- [AP2 Documentation](https://ap2-protocol.org/): Learn how the Agent Payments Protocol expresses authorization, payment, and proof.
- [Coinbase x402 Docs](https://docs.cdp.coinbase.com/x402/): View the implementation entry for x402 in developer tools.
- [ERC-4337 Documentation](https://docs.erc4337.io/): Understand how smart accounts, Paymasters, and session keys support payment permissions.
