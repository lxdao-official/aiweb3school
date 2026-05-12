---
title: AI Oracle
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/ai-oracle/
---

# AI Oracle

> An AI Oracle is a mechanism that submits model outputs, scores, classifications, or inference results to on-chain systems for use. Its challenge is not just "how to get data on-chain," but how to record inputs, models, versions, proofs, and disputes.

## Why Learn This

Standard oracles bring external data like prices, weather, or match results on-chain. AI Oracles go a step further: they can bring model judgments such as "whether a task is completed," "whether content is non-compliant," "whether an address is high-risk," or "whether an image matches its description" on-chain.

These outputs are often not objective, single answers. Models can be wrong, inputs can be contaminated, prompts can change, and versions can be updated. Therefore, AI Oracles must incorporate the results and the generation process into a trust design.

**The core of an AI Oracle is not to let a model make judgments for a contract, but to turn model judgments into recordable, verifiable, and challengeable inputs.**

## First Principles

> **When AI output affects on-chain assets or permissions, the output itself must have a source, boundary, and dispute mechanism.**

If a contract releases escrow based on AI output, an incorrect judgment could directly result in financial loss. The system cannot just record "the model said pass"; it must also record the input, model version, execution environment, time, and validator.

- **Inputs must be traceable**: What the model saw must be recorded, not just the final answer.
- **Results must be structured**: On-chain systems are not suited for consuming long natural language; they need clear fields.
- **Disputes must be designed upfront**: Who can challenge, how long is the challenge period, and how is it reviewed?

## Knowledge Nodes

### AI Output

**Difficulty: Beginner.** AI Output is the result given by a model, which can be text, labels, scores, structured JSON, or decision suggestions.

On-chain systems should ideally consume only structured outputs, such as `accepted: true`, `riskScore: 72`, or `category: "spam"`, rather than long text. Long text can be stored off-chain as evidence and associated via hashes.

AI Output is best split into two layers: "machine fields" and "human explanation." Machine fields enter contracts or backend rules, while human explanations enter UIs, reports, or dispute materials. Don't let a contract depend on natural language text for critical judgments.

If an output affects funds or permissions, record the confidence, model version, input hash, output hash, and generation time. Otherwise, it will be hard to determine later why the model gave that specific result.

### Data Feed

**Difficulty: Intermediate.** An AI Oracle can also manifest as a data feed, continuously providing model-processed data.

Examples include address risk scores, content moderation labels, transaction intent classifications, and market sentiment indices. Continuous feeds must handle update times, version changes, outliers, and historical playback.

AI data feeds are more prone to drift than price feeds. Model upgrades, training data changes, prompt adjustments, and input source variations can cause the score for the same object to change. Feeds should specify versions and allow historical queries.

If a feed is used for automatic execution, the contract or backend should at least check for stale data, abnormal jumps, and source signatures. Don't let expired AI scores continue to affect liquidations, fund releases, or user bans.

### Model Result

**Difficulty: Intermediate.** A Model Result needs to include the model version, prompt or task template, input references, and output fields.

If only results are saved without the generation conditions, they are difficult to review later. Especially after a model upgrade, the same input may yield different results.

A Model Result should also include the output schema. For instance, whether a risk score is 0-100 or 0-1, and whether higher means higher or lower risk, and who defined the threshold. If these aren't clear, integrators can easily misuse the data.

In multi-model systems, routing information should also be recorded: why this model was chosen, whether a fallback was used, and whether it underwent human review. These all contribute to the credibility of the result.

### Oracle Risk

**Difficulty: Advanced.** AI Oracle risks include model errors, input contamination, prompt injection, data bias, tampered execution environments, non-reviewable outputs, and economic attacks.

The magnitude of risk depends on what the output affects. If it's just for displaying labels, the risk is low; if it determines the release of funds, slashing stakes, or rejecting users, the risk increases significantly.

The key to Oracle Risk is the "consequence of incorrect output." The same misclassification might only be a UX issue in content recommendation but could lead to incorrect payments in escrow or destroy a service provider's history in a reputation system.

Therefore, AI Oracles should be layered by impact: low-risk outputs can be displayed directly, medium-risk outputs require human review, and high-risk outputs require challenges, multi-evaluators, or verifiable execution.

### Attestation

**Difficulty: Intermediate.** An Attestation can prove that an entity or execution environment has made a claim about an AI output.

For example, a TEE attestation proves a model ran in a specific environment; a validator attests that an output passed a test; a service provider's signature proves a result came from its API. An attestation does not equal a correct result, but it proves "who gave this result under what conditions."

Attestation fields must be specific. Just writing "verified" has little meaning; more useful is: who the validator is, what is being verified, what the input/output hashes are, the model version, when the proof expires, and whether it's revocable.

For on-chain systems, attestations often serve as consumable signals rather than final truth. A contract can require a certain type of attestation before moving to the next step while still allowing a dispute window.

### Proof of Inference

**Difficulty: Advanced.** Proof of Inference attempts to prove that an output definitely came from a specific model and input.

Implementation paths may include TEE, ZK, signed logs, replayable inference, or trusted service proofs. Different paths vary greatly in cost, privacy, verifiability, and engineering complexity.

Proof of Inference needs to first define "what is being proven": that a certain model was used, that the input hasn't changed, that the output was generated by a specific environment, or that the inference process was complete and correct. Different goals correspond to different technologies.

Full inference proof for large LLMs is currently very costly. Real-world systems often adopt compromises: TEE for the execution environment, signed logs for inputs/outputs, ZK for critical post-processing, and challenges for handling disputes.

### Dispute / Challenge

**Difficulty: Advanced.** Dispute / Challenge is a mechanism for raising objections to AI Oracle outputs.

It can adopt an optimistic model: accept the result first, providing a challenge window; if someone submits evidence, enter review, arbitration, or multi-party verification. An AI Oracle without a challenge mechanism risks hardcoding model errors into on-chain states.

Challenge mechanisms must set reasonable windows and costs. If the window is too short, users won't have time to find errors; if too long, settlement efficiency is low. If challenge costs are too low, they will be spammed; if too high, victims won't be able to appeal.

A practical approach is layering by amount and risk: short windows for small tasks, longer windows for higher-value tasks, and human or multi-party evaluators for high-dispute tasks.

## Position in AI x Web3

AI Oracle sits at the intersection of Oracles, Verifiable AI, and Settlement & Escrow. It helps on-chain systems use AI judgments but must carefully limit the scope of impact.

The safest path usually starts with low-risk scenarios: labeling, summarization, early warning, and auxiliary scoring. When fund release, punishment, or permission changes are involved, proofs, challenge periods, and human reviews are necessary.

## Minimal Practice

Design an AI Oracle for "task completion judgment":

1. Define inputs: task description, deliverable hash, acceptance criteria.
2. Define outputs: `accepted`, `score`, `reason`, `modelVersion`.
3. Record input hash, prompt template, model version, and time.
4. Design a challenge window: e.g., counter-evidence can be submitted within 24 hours.
5. Specify how funds are paused or rolled back into a dispute process if the output is incorrect.

## Extended Reading

- [Ethereum Oracles](https://ethereum.org/en/developers/docs/oracles/): Understand the basic problems of oracles.
- [ERC-8183: Agentic Commerce](https://eips.ethereum.org/EIPS/eip-8183): See how Agentic Commerce discusses proofs, evaluators, and escrow.
- [ERC-8004: Trustless Agents](https://eips.ethereum.org/EIPS/eip-8004): Learn how validation registries provide verification signals for Agent outputs.
- [Oasis ROFL Documentation](https://docs.oasis.io/build/tools/cli/rofl/): Learn about verifiable off-chain computation in the TEE direction.
- [RISC Zero](https://github.com/risc0/risc0): Learn about general verifiable computation in the zkVM direction.
