---
title: Settlement & Escrow
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/settlement-and-escrow/
---

# Settlement & Escrow

> Settlement & Escrow addresses "when money is released, how service is considered complete, how to refund on failure, and how to handle disputes" in the Agent economy. It turns payment from a single transfer into a complete transaction process.

## Why Learn This

Agents can purchase APIs, delegate another Agent to write code, have a service provider run a model, or complete an on-chain operation. But there is a time gap between payment and delivery: paying first might result in being cheated by the service provider, while delivering first might result in not getting paid.

Escrow provides an intermediate layer: funds are first locked, released after the service is completed and accepted, and refunded or arbitrated according to rules in case of failure or dispute.

**The core of settlement is not "sending the money," but binding task, delivery, acceptance, and payment into a verifiable process.**

## First Principles

> **Automated transactions must have clear completion conditions; otherwise, payment cannot be safely automated.**

If task definitions are vague, it is hard for both the Agent and the service provider to judge when it is finished, who confirms it, and what to do on failure. Escrow design must first define the state machine, rather than writing payment code first.

- **Fund states must be clear**: pending, locked, released, refunded, disputed.
- **Delivery proof must be preservable**: results, hashes, logs, model outputs, and transaction hashes can all become evidence.
- **Dispute flows must be designed in advance**: do not wait until after failure to discuss who has the right to judge.

## Knowledge Nodes

### Escrow

**Difficulty: Beginner.** Escrow is locking funds temporarily in a contract or trusted account, waiting for delivery conditions to be met before release.

In Agent scenarios, escrow can bind task ID, payer, service provider, amount, deadline, acceptance rules, and refund conditions. It is suitable for one-time tasks, API packages, model inference, data delivery, and cross-Agent delegation.

The key to escrow is the state machine. Minimum states usually include `Created`, `Funded`, `Delivered`, `Accepted`, `Refunded`, `Disputed`, and `Released`. Each state should stipulate who can trigger it, what evidence is needed, and how to handle it after timeout.

Do not treat escrow only as a "money-locking contract." Without task descriptions, delivery standards, and dispute paths, locking money will only trap both parties in the contract. Good escrow defines the business flow first, then the fund flow.

### Receipt

**Difficulty: Beginner.** A Receipt is a credential after payment and delivery.

A receipt is not just "paid." It should record: who paid whom, amount, currency, task ID, quote ID, time, transaction hash, service result reference, and acceptance status. Without receipts, subsequent reconciliation, reputation, and disputes are all difficult.

In the Agent economy, receipts also become input for reputation. Whether an Agent pays on time, whether a service provider delivers on time, and whether tasks are refunded can all be extracted from receipts and state changes.

Receipts are best served for both humans and machines: humans can understand the task and amount described, and machines can parse task IDs, payment transactions, delivery hashes, and acceptance status.

### Delivery Proof

**Difficulty: Intermediate.** Delivery Proof proves that a service provider has indeed delivered a certain result.

It can be a file hash, an API return log, a model output signature, an on-chain event, a TEE attestation, a manual acceptance record, or the verification result of another Agent. The key is: the proof must correspond to the original task.

Delivery Proof must avoid "the result exists but is unverifiable." For example, if a service provider says they have generated a report but there is no hash, no timestamp, and no version information, it is hard to prove later whether the deliverable was replaced.

Different tasks need different proofs. API calls can use request/response hashes, code tasks can use commit hashes and test results, data tasks can use dataset hashes, and model tasks can use model versions, input hashes, and output hashes.

### Acceptance

**Difficulty: Intermediate.** Acceptance is the action by the payer or the rule system confirming that "delivery meets requirements."

Acceptance can be confirmed by a user click or judged by an automatic evaluator. But high-value tasks should not rely only on a model saying "it looks finished." Clear acceptance criteria, deadlines, and failure paths are needed.

Acceptance should be broken down into checkable conditions as much as possible: whether fields are complete, whether tests passed, whether results were submitted within time, whether hashes match, and whether the budget was not exceeded. Subjective judgments can exist but must indicate who made them.

If acceptance is completed by AI, it is recommended to use a combination of "AI preliminary review + challenge window + human review." This way, low-risk tasks can pass automatically, and high-dispute tasks will not be decided by a single model judgment.

### Refund

**Difficulty: Beginner.** Refund is returning funds when delivery fails, times out, or is cancelled.

Refund rules must be written clearly before the task starts: who can trigger it, how long after it can be triggered, whether part of the fee is deducted, and whether the service provider can appeal.

Refund is not a temporary kindness after failure, but part of the protocol. Common refund triggers include: service provider timeout, delivery format error, acceptance failure, task cancellation, quote expiration, and service provider endpoint unavailability.

Refunds must also consider partial delivery. For example, if a service provider completes data scraping but fails in analysis, do they get paid proportionally? Without partial refund rules, both parties easily enter a dispute.

### Dispute

**Difficulty: Advanced.** Dispute handles disagreements between the payer and the service provider regarding whether delivery is qualified.

Disputes can be handled by manual arbitration, multi-sig, DAO, optimistic challenge, third-party evaluators, or on-chain rules. The key is not to completely remove subjective judgment, but to make the dispute flow predictable, recordable, and executable.

Dispute design must at least answer: who can initiate it, what is the cost of initiation, what is the evidence submission format, who has the right to adjudicate, and whether an appeal is possible after adjudication. Disputes without cost are easily abused; costs that are too high make it impossible for small tasks to protect rights.

For Agent-to-Agent transactions, dispute records are also important input for reputation systems. Service providers or customers who frequently enter disputes should be visible to subsequent transactions.

### Evaluator

**Difficulty: Advanced.** An Evaluator is a role or system that judges whether delivery is qualified.

Evaluators can be scripts, test suites, models, human reviewers, multiple validators, or on-chain contracts. AI evaluators are suitable for preliminary judgments, but high-value tasks usually require re-reviewable evidence and challenge mechanisms.

Evaluators themselves also need to be evaluated. An evaluator with a high error rate will turn escrow into a random judgment. The system should record evaluator versions, inputs, outputs, error rates, and historical dispute results.

For code, data, and report tasks, evaluators can be combined: scripts check formats, test suites check functionality, AI checks semantics, and humans handle disputes. Do not press all responsibility onto one model.

### ERC-8183

**Difficulty: Advanced.** ERC-8183 is a draft standard around agentic commerce, focusing on how Agent tasks, payments, escrow, delivery, and verification form a unified process.

It advances agent commerce from "just sending some money" to a more structured transaction model: tasks, states, proof, settlement, and disputes should all be understandable by the system.

When understanding ERC-8183, the focus is not on adopting the standard immediately, but on learning the abstractions it tries to solve: transactions in the Agent economy are not simple token transfers, but state transitions around the task lifecycle.

It also complements ERC-8004: ERC-8004 is more about Agent identity, reputation, and verification; ERC-8183 is more about tasks, payments, escrow, and delivery. A complete agent commerce system usually needs ideas from both.

::: info Related Topic
- [ERC-8183: Agentic Commerce](https://eips.ethereum.org/EIPS/eip-8183): Learn about the draft standard for Agentic Commerce.
:::

## Where It Fits in AI x Web3

Settlement & Escrow is the second half of Machine Payment. The former solves "how to pay," while here we solve "how to confirm value exchange is complete after payment."

For Agents, escrow makes automatic delegation safer: Agents can lock budgets, wait for service results and proof, and then release funds. For service providers, escrow also provides payment guarantees.

## Minimum Practice

Design an escrow flow for "Agent pays for report generation":

1. User locks 2 USDC.
2. Service provider promises to deliver the report within 10 minutes.
3. After the report is submitted, the IPFS hash or file hash is recorded.
4. Evaluator checks if the report contains specified fields.
5. If passed, payment is released; if failed or timed out, a refund is issued.
6. If there is a dispute, it enters human or multi-sig arbitration.

## Further Reading

- [ERC-8183: Agentic Commerce](https://eips.ethereum.org/EIPS/eip-8183): Draft standard for tasks, payments, and settlement in Agentic Commerce.
- [ERC-8004: Trustless Agents](https://eips.ethereum.org/EIPS/eip-8004): Understand how Agent identity, reputation, and verification assist transaction trust.
- [AP2 Documentation](https://ap2-protocol.org/): Learn about Agent payment authorization and auditable proof.
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x): Learn basic contract design for escrow, payment, and access control.
