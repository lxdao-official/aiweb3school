---
title: AI Privacy
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/ai-privacy/
---

# AI Privacy

> AI Privacy focuses on what can be shared and what must be isolated or processed only locally among user data, wallet identities, on-chain behaviors, private memories, API keys, and model contexts.

## Why Learn This

The fact that Web3 data is public does not mean users have no privacy. Combining address associations, transaction history, holdings, governance votes, Agent preferences, private tasks, and chat content can form a very specific user profile.

AI systems expand the data surface: they read more context, retain memories, call third-party models, write logs, upload files, and use tools. Privacy design must be integrated into the architecture from the beginning.

**The privacy problem in AI x Web3 is not just about single-point data leaks, but the stitching together of public on-chain identities and private AI contexts.**

## First Principles

> **Models should only see the minimum data required to complete a task.**

Do not cram wallet history, private chats, API keys, full documents, and user preferences into the context just because the model "might find them helpful." The more context, the larger the leak surface and the higher the risk of misuse.

- **Data Boundaries Must Be Explicit**: What goes into the model, what only goes into tools, and what stays only on the local device.
- **Memory Must Be Manageable**: Users must be able to view, delete, export, or turn off memories.
- **On-chain Identity Association Must Be Cautious**: Do not merge multiple addresses and real identities for display by default.

## Knowledge Nodes

### Data Boundary

**Difficulty: Beginner.** Data Boundary defines how data flows between user devices, application backends, model services, on-chain, and third-party tools.

For every data field, ask: Is it necessary? Can it be de-identified? Can it be processed locally? Will it enter logs? Will it be sent to third-party models?

Data boundaries are best drawn as data flow diagrams rather than long privacy policy texts. Where user input is, where wallet addresses are, where transaction history comes from, who the model service provider is, and how long logs are kept must all be clear.

For Agents, boundaries should also be divided by tool. Data seen by browser tools, wallet tools, model tools, and indexing tools should not be shared by default.

### Local AI

**Difficulty: Intermediate.** Local AI places part of the inference on the user's device or in a private environment to reduce the transmission of sensitive data.

It is suitable for tasks like processing private documents, summarizing wallet history, generating drafts, and sensitive classification. However, local models have costs: model capability, device performance, updates, privacy protection, and security sandboxes must all be handled.

A good principle for Local AI is: filter and de-identify locally first, then send necessary summaries to a more powerful model. For example, extract "3 transactions related to this task" from wallet history locally rather than uploading the entire history.

Local does not mean absolutely safe. Local Agents can still be attacked by malicious files, plugins, or web pages, so local execution also requires sandboxing and permission control.

### Private Memory

**Difficulty: Intermediate.** Private Memory is the long-term preferences, historical tasks, and private context that an Agent maintains for a user.

It cannot be an invisible black box. Users should know what is recorded, why it's recorded, how to delete it, whether it's used for model training, and whether it syncs across devices.

Private memory can be layered: short-term task memory, long-term preferences, sensitive identity info, and wallet-related records. Different layers have different retention periods and access permissions.

A common risk is "saving everything forever to be smarter." This makes the Agent behave more like a private database, which can be very damaging if leaked. Minimization, visibility, and deletability should be the defaults.

### Secret Management

**Difficulty: Advanced.** Secret Management handles private keys, API keys, session tokens, JWTs, wallet credentials, and encryption keys.

These secrets should never enter prompts, model outputs, regular logs, or analytics. When an Agent needs to call a service, it should use secrets via controlled tools rather than letting the model read them directly.

Secret management must also handle rotation and revocation. Can an API key be quickly replaced if leaked? Are session tokens short-lived? Are production keys isolated from test keys?

In Web3 scenarios, mnemonics and private keys should never appear in any Agent prompt. Even if a user pastes them voluntarily, the system should recognize and refuse to process them.

### Minimal Disclosure

**Difficulty: Beginner.** Minimal Disclosure is about exposing only the minimum information necessary to complete a task.

For example, proving "sufficient balance to pay 10 USDC" doesn't necessarily mean exposing all holdings; proving "user has permission" doesn't necessarily mean revealing real identity; summarizing transaction risks doesn't necessarily mean uploading the full wallet history.

Minimal disclosure can be achieved through both technology and product: sending only necessary fields, using zero-knowledge proofs, using one-time addresses, isolating identities by application, and using summaries instead of original text.

For AI products, the most common minimal disclosure is "summary instead of raw data." Models don't necessarily need full chat logs, just a few structured facts related to the current task.

### Encrypted Data

**Difficulty: Intermediate.** Encrypted Data can protect privacy during storage and transmission, but it doesn't automatically solve leaks during model usage.

Data usually needs to be decrypted or processed in a trusted environment during model inference. Encryption must be combined with access control, key management, TEE, and minimized context.

Encrypted data must also consider who holds the keys. The trust models are completely different depending on whether the platform, the user, multiple parties (sharding), or hardware holds the keys.

If data is merely "encrypted on the server" but decrypted and sent to the model for every inference, it solves for storage security, not privacy during model use.

### User Consent

**Difficulty: Beginner.** User Consent should ensure users clearly know how their data will be used.

Consenting to connect a wallet is not consenting to analyze full history; consenting to use an Agent is not consenting to send data to all third-party models; consenting to save memories is not consenting to save them forever.

User consent should be specific to actions and data types. For example, "allow reading current address balance," "allow analyzing the last 30 days of transactions," "allow saving risk preferences," and "allow sending summaries to cloud models" should be separate toggles.

Consent should also be revocable. Upon revocation, the system should explain which data will be deleted, which public on-chain records cannot be deleted, and which logs must be kept for security or compliance.

## Position in AI x Web3

AI Privacy is the foundational boundary for [Agent Wallet](/en/handbook/bridge/agent-wallet/), [Chain-aware Context](/en/handbook/bridge/chain-aware-context/), and [Governance AI](/en/handbook/bridge/governance-ai/). Without privacy design, the more an Agent knows about a user, the more harm it can do if leaked.

Pay special attention to the risk of combining public on-chain data and private data. A single address might just be public information, but when combined with chat logs, emails, geographic locations, and community identities, it can become a profile of a real identity.

## Minimal Practice

Draw an Agent data flow diagram:

1. List user inputs, wallet addresses, transaction history, API keys, model context, logs, and memory.
2. Mark where each piece of data is stored.
3. Mark which data is sent to third-party models or tools.
4. Mark which fields can be de-identified, hashed, aggregated, or processed locally.
5. Specify how users can view, revoke, and delete this data.

## Extended Reading

- [W3C DID Core](https://www.w3.org/TR/did/): Understand how decentralized identity expresses control and resolution.
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/): Understand the basic model of minimal disclosure and verifiable claims.
- [OpenAI Safety Best Practices](https://platform.openai.com/docs/guides/safety-best-practices): Learn about sensitive data and security design recommendations.
- [Oasis Documentation](https://docs.oasis.io/): Learn about privacy computing and TEE in Web3 scenarios.
