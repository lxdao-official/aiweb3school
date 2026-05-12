---
title: AI Sovereignty
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/ai-sovereignty/
---

# AI Sovereignty

> AI Sovereignty is about whether users, developers, and communities can control their own data, model choices, memories, tool permissions, and execution environments, rather than being locked into a single platform.

## Why Learn This

AI systems are increasingly becoming the operational layer for individuals and organizations: they remember preferences, read files, call tools, manage wallets, and complete tasks. If these capabilities are completely enclosed within a single platform, users will find it difficult to migrate, audit, or replace them.

Web3 cares about open protocols, verifiable records, and user control. AI Sovereignty brings these issues back to AI: can data be exported, can models be switched, can tool permissions be revoked, is local AI available, and can Agent identities be preserved across platforms?

**The core of AI Sovereignty is allowing users to retain the ability to exit, migrate, choose, and verify.**

## First Principles

> **The closer an AI is to user decisions and assets, the less it should rely solely on platform promises.**

If an Agent manages a wallet, votes in governance, handles payments, or maintains private memories, the user needs more than just a "the platform will protect you" promise; they need checkable, revocable, and migratable mechanisms.

- **Control Must Be Visible to the User**: Users know which data, permissions, and memories are being used.
- **The Right to Choose Must Realistically Exist**: Models, wallets, tools, and storage should not be locked into a single point of failure.
- **Verifiability Must Be a Safety Net**: Critical behaviors must have logs, signatures, proofs, or on-chain records.

## Knowledge Nodes

### User Control

**Difficulty: Beginner.** User Control means users can view, modify, and revoke the permissions and data usage of an AI agent.

This includes turning off memories, revoking session keys, switching models, deleting data, exporting history, disabling tools, and stopping automated tasks.

The most important aspect of user control is "can the user see and change the system state." If a user cannot see which model an Agent is using, what memories it has saved, what tool permissions it holds, or how much money it can spend, then there is no real control.

For AI x Web3 products, the control panel should at least display: connected wallets, session keys, authorized limits, enabled tools, memory toggles, data export entries, and emergency stop buttons. Do not hide these in advanced settings.

### Data Portability

**Difficulty: Intermediate.** Data Portability allows users to take their preferences, memories, task history, and credentials with them.

If the long-term value of an Agent comes from memory and context, memory that cannot be exported is a form of lock-in. Migratable data requires open formats, permission boundaries, and privacy protection.

Migratability does not mean downloading a bundle of all raw data. A more reasonable approach is layered export: task history, user preferences, tool logs, identity credentials, public reputation, and private memories exported separately, with sensitivity levels marked.

If data is to be used by another Agent, it is best to provide machine-readable formats, such as JSON schemas, VCs, signed logs, or profile files. Otherwise, "exportable" just means downloading a pile of text that humans can't even parse easily.

### Model Choice

**Difficulty: Beginner.** Model Choice allows users or developers to select different models based on the task.

Local models can be used for high-privacy tasks, powerful models for difficult tasks, and small models for low-cost tasks. Systems should not lock all tasks to a single model and provider.

Model choice is not about making users manually select a model every time; instead, the system should allow strategic selection: privacy-first, cost-first, quality-first, open-source-first, or verifiability-first. Users can set default preferences, and the Agent can explain why a specific model was chosen before execution.

Model switching must also enter the evaluation process. Changing a model can alter rejection strategies, tool-calling styles, and output formats, so high-risk Agents cannot simply "hot-swap" models and continue automatic execution.

### Local-first AI

**Difficulty: Intermediate.** Local-first AI prioritizes processing sensitive data locally, calling cloud models only when necessary.

It is suitable for wallet history summaries, private document processing, draft generation, and permission checks. Local-first does not mean completely offline, but rather reducing unnecessary data transmission by default.

In an article about the future of wallets, Vitalik mentioned that AI might push the interface from "clicking and inputting" toward "saying the goal and letting the bot complete it." This makes local-first even more important: if wallets, identities, and asset operations all pass through AI, user devices and the wallets themselves need to take on more data protection and active defense capabilities.

A realistic approach to Local-first AI is a hybrid architecture: local models for filtering, de-identification, and initial risk screening; cloud models for receiving only necessary summaries; and final transactions still confirmed by the wallet or smart account.

### Censorship Resistance

**Difficulty: Advanced.** Censorship Resistance focuses on whether AI services, models, data, and Agent identities can be blocked or deleted by a single point of failure.

For public goods, governance, cross-border collaboration, and open developer ecosystems, censorship resistance is not just a slogan but an issue of service availability, data retention, and identity continuity.

Once AI systems become information gateways, censorship risk is not just "a certain webpage cannot be opened." It might manifest as a model refusing certain legal tasks, a platform taking down an Agent, an API banning a region, or training data filtering certain viewpoints.

Censorship-resistant design includes: open-source clients, multi-model fallbacks, self-hostable endpoints, migratable identities, decentralized storage, and on-chain or signed audit records. Not every product needs to be completely decentralized, but critical public infrastructure should avoid single-point control.

### d/acc

**Difficulty: Advanced.** d/acc stands for defensive accelerationism, emphasizing the acceleration of defensive, decentralized, and human-enhancement technologies.

In the context of AI x Web3, it reminds us: do not just pursue stronger automation; also build permission isolation, privacy protection, open-source tools, verifiable execution, and user control.

Vitalik proposed d/acc in "My techno-optimism" as a framework that is techno-optimistic but values defense, democracy, decentralization, and differential development. In "d/acc: one year later," he further connected d/acc with the underlying values of crypto: decentralization, censorship resistance, open global collaboration, and stronger defensive technologies.

For this handbook, the practical meaning of d/acc is: AI x Web3 should not just create "stronger automated agents" but also "better defensive tools." For example, safer wallets, anti-phishing interfaces, verifiable Agent logs, privacy-preserving data collaboration, open-source model evaluations, decentralized identity, and reputation.

::: info Related Topic
- [Vitalik: My techno-optimism](https://vitalik.eth.limo/general/2023/11/27/techno_optimism.html): An important source of the d/acc concept, discussing techno-optimism, AI risk, open source, and defensive technologies.
- [Vitalik: d/acc: one year later](https://vitalik.eth.limo/general/2025/01/05/dacc2.html): Further discussion of d/acc, crypto, AI safety, public goods funding, and defensive technology paths.
:::

### CROPS

**Difficulty: Advanced.** In the Ethereum Foundation Mandate and recent context from Vitalik/Ethereum, CROPS is used to summarize the core properties Ethereum should maintain: Censorship resistance, Open source, Privacy, Security.

Placing CROPS into AI x Web3 can be understood as a product value checklist:

- **Censorship Resistance**: Whether Agent identities, tool entry points, data sources, and execution records rely excessively on a single platform.
- **Open Source**: Whether critical clients, contracts, strategies, evaluation sets, or tool interfaces are checkable.
- **Privacy**: Whether user data, wallet history, memories, and model context are minimized and isolated.
- **Security**: Whether wallets, permissions, session keys, tool calls, transaction simulations, and logs have clear defensive lines.

CROPS and d/acc are interconnected: they are not against AI but require that when AI enters the wallet, governance, identity, and payment layers, it must not sacrifice user control, privacy, and security. Vitalik also emphasized in his wallet article that users can only truly enjoy these Ethereum properties if the wallet itself also possesses decentralized, censorship-resistant, secure, and private attributes.

::: info Related Topic
- [Ethereum Foundation Mandate](https://ethereum.org/foundation/mandate/): The EF's official statement on CROPS, self-sovereign computation, and coordination at scale.
- [Vitalik: What I would love to see in a wallet](https://vitalik.eth.limo/general/2024/12/03/wallets.html): Discusses the wallet as the user's window into Ethereum and why security, privacy, censorship resistance, and AI interaction paradigms will become important.
- [Vitalik: d/acc: one year later](https://vitalik.eth.limo/general/2025/01/05/dacc2.html): Connects crypto values with the defensive technology path of d/acc.
:::

## Position in AI x Web3

AI Sovereignty is the value foundation for the entire roadmap. [Agent Wallet](/en/handbook/bridge/agent-wallet/) gives users control over permissions, [Verifiable AI](/en/handbook/bridge/verifiable-ai/) makes critical outputs provable, [AI Privacy](/en/handbook/bridge/ai-privacy/) provides boundaries for data use, and [Agent Identity](/en/handbook/bridge/agent-identity/) allows Agents to exist across platforms.

Without sovereignty design, AI x Web3 could easily become "feeding on-chain assets into more centralized AI platforms."

## Minimal Practice

Create an AI Sovereignty checklist:

1. Can users export chats, memories, task records, and tool logs?
2. Can users switch models and turn off cloud inference?
3. Can users view and revoke wallet/session key permissions?
4. Can Agent identities be verified across platforms?
5. Are there audit logs or on-chain records for critical execution?

## Extended Reading

- [Ethereum Account Abstraction](https://ethereum.org/en/roadmap/account-abstraction/): Understand how programmable accounts improve user control.
- [W3C DID Core](https://www.w3.org/TR/did/): Learn about resolvable, controllable decentralized identity.
- [Oasis Documentation](https://docs.oasis.io/): Learn about privacy and verifiable computing infrastructure.
- [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004): Open standard draft for Agent identity and reputation.
- [Ethereum Foundation Mandate](https://ethereum.org/foundation/mandate/): Understand how CROPS enters the official mission statement of the Ethereum Foundation.
- [Vitalik: My techno-optimism](https://vitalik.eth.limo/general/2023/11/27/techno_optimism.html): Understand the conceptual background of d/acc.
- [Vitalik: What I would love to see in a wallet](https://vitalik.eth.limo/general/2024/12/03/wallets.html): Understand the relationship between AI, wallets, privacy, security, and user control.
