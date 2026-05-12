---
title: Agent Trust & Reputation
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/agent-trust-and-reputation/
---

# Agent Trust & Reputation

> Agent Trust & Reputation solves the problem of how users and other Agents judge whether an Agent is reliable, whether its history is authentic, and whether there is a cost for failure when it claims to be able to complete a task.

## Why Learn This

In the future, Agents may delegate tasks to each other, purchase services, execute payments, submit reports, or participate in governance. A "professional-looking description" alone cannot establish trust.

A reputation system needs to organize an Agent's historical behavior, user evaluations, verification records, staking, penalties, and dispute results into queryable signals. However, reputation can also be farmed, manipulated, or monopolized by platforms.

**Trust is not a single score, but a set of traceable, comparable, and interpretable evidence.**

## First Principles

> **An Agent's credibility should come from verifiable behavior, not self-declaration.**

An Agent saying "I am good at contract auditing" doesn't mean much. More valuable is: which contracts it has audited, who verified them, what problems it missed, whether there is a stake, and whether there are refunds or slashing after failure.

- **Reputation must be bound to identity**: Without a stable identity, historical records cannot accumulate.
- **Evaluations must be bound to tasks**: General five-star ratings are less useful than specific task results.
- **Penalties must be real**: Commitments without cost are easily abused.

## Knowledge Nodes

### Reputation

**Difficulty: Beginner.** Reputation is a collection of signals formed by an Agent's historical performance.

It can include success rate, response time, dispute rate, refund rate, user ratings, number of verification passes, amount of stake, and performance by task type. Do not squash all signals into a black-box score, or users will have difficulty judging applicability.

Reputation is best broken down by task type. An Agent good at summarizing governance proposals is not necessarily good at writing contract tests; an Agent stable in executing small payments is not necessarily suitable for being a high-value escrow evaluator.

Reputation must also handle time decay. Good performance two years ago does not fully represent today's service quality, especially when the model, owner, endpoint, or tool stack may have changed.

### Review

**Difficulty: Beginner.** A Review is feedback from a user, customer, or another Agent on task results.

A Review should be bound to a task ID, deliverables, payment records, and the evaluator's identity. Otherwise, it easily turns into fakeable word-of-mouth text. For high-value tasks, reviews should also allow for revocation, disputes, or attached evidence.

The quality of reviews is more important than the quantity. A review containing task specifications, acceptance criteria, delivery hashes, and specific issues is more valuable than ten "good job" comments.

At the same time, prevent reciprocal farming. Evaluators themselves need identity and reputation, or at least their historical transaction relationship with the evaluated Agent should be visible.

### Attestation

**Difficulty: Intermediate.** An Attestation is a verifiable claim made by an entity about an Agent, task, or result.

For example, "a certain reviewer proves this Agent completed a test set," "a certain user proves the task was delivered as requested," or "a certain TEE proves this output comes from a certain program version." The value of an attestation depends on whether the issuer is trustworthy, whether the claim is specific, and whether it is revocable.

Attestations should be structured as much as possible: issuer, subject, claim, evidence, expiration, and revocation. Attestations without expiration and revocation mechanisms can easily continue to mislead users after conditions change.

Attestations can also serve as foundational data for reputation rather than being displayed directly to end-users. The system can aggregate multiple attestations but must still allow users to return to the original claim to view evidence.

### Stake

**Difficulty: Intermediate.** Stake is an economic guarantee put up by an Agent or operator.

Staking makes commitments have costs. Users may be more willing to trust service providers with collateral, but stake itself does not represent capability; it only indicates that funds may be confiscated or paid out upon failure.

Staking also brings selection bias. Agents with more capital are not necessarily more capable; small teams or public goods Agents may have less stake but higher quality. Therefore, stake should be viewed alongside validation, review, and task history.

When designing stakes, be clear: what assets are staked, for how long they are locked, under what conditions they are released, under what conditions they are confiscated, and to whom they are paid.

### Slashing

**Difficulty: Advanced.** Slashing is the confiscation of collateral when an Agent defaults, cheats, or submits false results.

Slashing design is difficult. Evidence of default, challenge windows, arbitrators, handling of false positives, and appeal mechanisms must be defined first. Otherwise, slashing is not a security mechanism but a new governance risk.

Incorrect slashing hurts legitimate service providers, while weak slashing fails to constrain malicious behavior. For subjective tasks, such as "is the report quality sufficient," it is better not to slash automatically but to enter a dispute first.

Scenarios more suitable for automatic slashing are clearly verifiable defaults: failure to deliver on time, forged signatures, submission of contradictory results, or violation of on-chain checkable policies.

### Validation

**Difficulty: Intermediate.** Validation is the verification process for Agent capabilities or task results.

It can be automated tests, benchmarks, manual audits, review by another set of Agents, on-chain proofs, or TEE attestations. Validation should ideally record test data, version, time, and validator.

Distinguish between "capability validation" and "task result validation." The former indicates that an Agent is likely capable of a certain type of task, while the latter indicates whether a specific delivery is qualified.

For Agent marketplaces, it is better to make validation results a queryable history rather than just posting a certification badge.

### ERC-8004

**Difficulty: Advanced.** ERC-8004 provides a draft standard for Agent identity, reputation, and verification registry.

It breaks down an Agent's identity, reputation, and validation into composable registries, allowing different applications to discover and evaluate Agents using the same format. However, it also explicitly states that it cannot guarantee an Agent's claimed capabilities are real; capabilities must still be supported by validation and trust models.

What makes ERC-8004 noteworthy is that it does not attempt to make "trust" a single centralized score, but provides a public carrying layer for identity, feedback, and verification signals. Different applications can build their own filtering and ranking rules on top of this.

When using standards like ERC-8004, remind users: on-chain registration can prove identity continuity, but it cannot automatically prove service quality. Reputation systems still need to consider Sybil attacks, review farming, evaluator trustworthiness, and task type differences.

::: info Related Topic
- [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004): Learn about identity, reputation, and validation registries for Trustless Agents.
:::

## Position in AI x Web3

Agent Trust & Reputation connects Agent Identity, Settlement & Escrow, and Machine Payment. Without a trust layer, Agents cannot safely delegate to each other; without reputation and verification, users have difficulty judging which Agent is worth paying.

But do not over-trust reputation scores. A truly reliable system should look at identity, task history, evaluators, proofs, stake, dispute records, and context fit simultaneously.

## Minimal Practice

Design an Agent task reputation record:

1. Define a task: e.g., "generate a summary of contract risks."
2. Record Agent ID, user ID, task input hash, deliverable hash, and payment record.
3. Design review fields: accuracy, timeliness, whether rework was needed.
4. Design validation fields: who verified, how they verified, and if it's reproducible.
5. Design refund or slashing conditions for failure.

## Extended Reading

- [ERC-8004: Trustless Agents](https://eips.ethereum.org/EIPS/eip-8004): Draft standard for Agent identity, reputation, and validation registry.
- [ERC-8004 Website](https://www.geterc8004.com/): Quickly understand the standard goals and the three registries.
- [Ethereum Attestation Service](https://attest.org/): Learn how general attestations express verifiable claims.
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/): Understand the data model for verifiable credentials.
