---
title: Verifiable AI
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/verifiable-ai/
---

# Verifiable AI

> Verifiable AI focuses on: when AI outputs affect assets, permissions, reputation, or governance, can we verify its inputs, models, execution environment, inference process, or at least leave auditable evidence.

## Why Learn This

In ordinary AI products, if a model says something wrong, it can be regenerated. But in on-chain scenarios, AI output may trigger payments, liquidations, authorizations, arbitrations, or governance actions. Erroneous output enters executable systems.

Verifiable AI does not require every model token to be proven on-chain. A more realistic goal is layering by risk: low-risk scenarios leave logs, while high-risk scenarios require TEE, ZK, attestation, audit trails, challenges, or multi-party verification.

**The core of Verifiable AI is turning "believing the model" into "verifying evidence and constraints."**

## First Principles

> **Verification cost must match output impact.**

Summarizing news for a user doesn't necessarily need a ZK proof; releasing escrow or slashing stake cannot rely solely on a single model output. The system must choose verification strength based on risk.

- **Verify source first**: inputs, model version, service provider, execution time.
- **Verify process next**: whether it was executed in a trusted environment, whether it is replayable or provable.
- **Verify result impact last**: what on-chain state the output can change, whether a challenge period is needed.

## Knowledge Nodes

### TEE

**Difficulty: Intermediate.** TEE (Trusted Execution Environment) isolates code and data and proves through attestation that a program ran in a specific environment.

TEE is suitable for scenarios requiring privacy and lower proof costs, such as private data scoring, model inference, and agent runtime proof. Its limitation is its continued reliance on hardware and supply chain trust.

The strength of TEE is its relative engineering availability: it can run complex programs, handle private inputs, and has lower proof costs than ZK. It is suitable for scenarios like "I cannot disclose input or model details, but I need to prove that this program ran in a protected environment."

Weaknesses should also be stated: TEE is not pure cryptographic trust. Hardware vulnerabilities, remote attestation services, supply chains, and runtime configurations all become trust assumptions. Therefore, documentation should clearly state who is trusted, what is proven, and what is not.

### ZK

**Difficulty: Advanced.** ZK (Zero-Knowledge) allows proving that a certain calculation meets conditions without revealing all inputs or re-executing the entire calculation.

The advantage of ZK is strong cryptographic verification, but generating proofs can be costly and engineering-wise complex. For AI, not all models are suitable for direct ZK proofs.

ZK is more suitable for tasks with clear boundaries and controllable calculation scale. For example, proving that a small model classified an input, proving that a post-processing rule was executed correctly, or proving that a data aggregation meets constraints.

For LLMs, fully proving every step of token inference is usually not yet realistic. Many products choose to prove key parts rather than proving the entire model brain.

### zkML

**Difficulty: Advanced.** zkML is the direction of turning machine learning inference into provable calculations.

It is suitable for scenarios where models are small, structures are fixed, and outputs require strong verification. Full ZK proofs for large LLMs are still very expensive, so actual systems often use hybrid solutions: proving only key steps, or proving smaller models and post-processing logic.

When designing zkML, ask first: is it really necessary to hide inputs, is on-chain verification really needed, can proof latency be accepted, and can the model be converted into a circuit. Many scenarios that "need trusted AI" are actually more economical with signed logs, TEE, or manual review.

Examples suitable for zkML include: small risk models, eligibility judgments, key threshold judgments for image/text classification, and simple inferences on private data.

### Proof of Inference

**Difficulty: Advanced.** Proof of Inference attempts to prove that an output indeed comes from a certain model, input, and execution environment.

Implementation routes could be TEE attestation, ZK proof, signed execution logs, replayable inference, or service provider proof. Which one to choose depends on cost, privacy, latency, and trust assumptions.

Proof of Inference does not necessarily have to pursue the "strongest proof." If it only proves that a service once returned this result, signed logs might suffice; if proving the result comes from a specific binary and model, TEE is more appropriate; if minimizing trust in third parties, ZK is stronger but more expensive.

Product documentation should clarify the object of proof: proving inputs haven't changed, proving model version, proving execution environment, proving output hasn't been tampered with, or proving the entire calculation is correct. These goals are not the same thing.

### Verifiable Compute

**Difficulty: Intermediate.** Verifiable Compute focuses on making off-chain calculation results verifiable by on-chain or third parties.

AI inference is just one type of calculation. Broader scenarios include risk scoring, data aggregation, task evaluation, proof generation, and batch settlement. Off-chain execution and on-chain verification is a realistic path for many AI x Web3 systems.

Verifiable Compute is suitable for placing expensive calculations off-chain and putting summaries, proofs, or signed results on-chain. This retains on-chain verifiability while avoiding stuffing complex inference directly into contracts.

But pay attention to data availability. When there is only a hash or proof on-chain, users still need to know where the original input and output are, who can access them, and how long they are saved.

### Benchmark

**Difficulty: Intermediate.** Benchmarks are used to compare model or Agent capabilities, but they cannot replace task-level verification.

Public benchmarks can show general capability but cannot prove a specific output is correct. Agent systems need their own task sets: transaction interpretation, risk identification, rejecting unauthorized access, citing on-chain evidence, and handling failed tool calls.

Benchmarks are also prone to over-optimization. A model might be very good on general lists but frequently read decimals wrong, ignore chain IDs, or misjudge authorization risks in your on-chain tasks. Projects should establish their own benchmarks.

An AI x Web3 benchmark should contain normal samples, boundary samples, and attack samples: wrong chains, malicious contexts, expired prices, same-name tokens, revert transactions, and fake contract documents.

### Audit Trail

**Difficulty: Beginner.** Audit Trail is the most basic and practical verifiable layer.

It records inputs, outputs, model version, tool calls, time, user confirmation, transaction hashes, and errors. Even without TEE or ZK, a complete audit trail can support review, disputes, and improvement.

Audit Trail is the easiest starting point for landing verifiable AI. It cannot prove a model is absolutely correct, but it can prove what the system saw, what it called, and what the user confirmed at the time.

Logs must avoid leaking privacy and secrets. The usual practice is: sensitive original text is stored encrypted, while the public layer only puts hashes, summaries, and references with controllable permissions.

## Where It Fits in AI x Web3

Verifiable AI is the foundation of AI Oracles, Agent Trust, Settlement, and Governance AI. It isn't always on-chain proof, but key outputs must have traceable evidence.

A mature system usually uses a mix: logs for daily review, attestation for service proof, ZK/TEE for high-risk scenarios, and challenges for handling disputes.

## Minimum Practice

Design a verification scheme for an AI risk score:

1. Define input data source and update time.
2. Record model version, prompt template, and output schema.
3. Set low-risk outputs to only record audit trail.
4. Set high-risk outputs to require manual review or a challenge window.
5. Outline how to upgrade to TEE or ZK proof in the future.

## Further Reading

- [Oasis ROFL Documentation](https://docs.oasis.io/build/tools/cli/rofl/): Learn about verifiable off-chain execution in the TEE direction.
- [RISC Zero](https://github.com/risc0/risc0): Learn about general verifiable computing in the zkVM direction.
- [EZKL](https://github.com/zkonduit/ezkl): Learn about zkML inference proof tools.
- [Ethereum Oracles](https://ethereum.org/en/developers/docs/oracles/): Understand basic issues of external results entering on-chain.
- [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004): View how a validation registry supports Agent result verification.
