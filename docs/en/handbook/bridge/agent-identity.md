---
title: Agent Identity
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/agent-identity/
---

# Agent Identity

> Agent Identity is not about giving an Agent a name, but about allowing users, services, and other Agents to verify who it is, who controls it, what capabilities it provides, where the service entry point is, and whether historical records can be traced.

## Why Learn This

When an Agent runs only inside a single application, identity can be managed by a platform database. But once an Agent needs to purchase services across applications, accept delegations, call tools, receive payments, and accumulate reputation, it needs a verifiable identity.

Without identity, long-term trust cannot be established between Agents: a "high-quality Agent" today might change its backend, owner, or capability description tomorrow, and users would have no way to judge.

**The core of Agent Identity is to turn an Agent from a temporary session into a discoverable, verifiable, and accountable economic participant.**

## First Principles

> **Agent identity must be bound to control, capability declarations, and service entry points, not just a display name.**

A truly usable Agent identity must answer at least: who owns this Agent, what can the Agent do, how to call it, which wallets or keys does it use, and where are its historical reputation and verification records.

- **Identity must be resolvable**: Others can find the profile and endpoint from the identifier.
- **Control must be provable**: The person updating the profile or receiving payments must be able to prove they are the owner.
- **Capabilities must be verifiable**: Capability declarations need to be supported by tests, proofs, evaluations, or historical records.

## Knowledge Nodes

### Agent Profile

**Difficulty: Beginner.** An Agent Profile is the public specification document of an Agent.

It typically includes name, description, service scope, price, interface, wallet address, capability list, model or tool descriptions, privacy policy, owner, and version. A Profile should not just be marketing copy; it must contain machine-readable fields.

A more practical profile should be readable by both humans and machines. Humans need to understand what this Agent does, who operates it, and how it charges; machines need to parse endpoints, capabilities, schemas, auth, payment, terms, and versions.

Profiles should also consider update history. If an Agent changes its model, backend, payment address, or adds high-risk capabilities, it should not happen silently. The update record itself is a trust signal.

### Capability

**Difficulty: Intermediate.** Capability describes what tasks an Agent can complete, as well as the inputs and permissions it needs.

For example, "summarizing governance proposals," "generating Solidity tests," and "executing small stablecoin payments" are completely different capabilities. Capability declarations are best bound to schemas, prices, limits, test records, and failure conditions.

Capability should not be written as "I can do anything." The more specific, the more useful: what the input types are, what the output format is, whether wallet permissions are needed, whether external APIs will be called, what the maximum execution time is, and how refunds are handled upon failure.

If a capability triggers on-chain actions, it should also be marked with a risk level. For example, "read-only analysis" is low risk, "generating transaction drafts" is medium risk, and "automatically executing transactions" is high risk.

### Service Endpoint

**Difficulty: Beginner.** A Service Endpoint is the entry point for external systems to call an Agent.

It can be an HTTPS API, an A2A endpoint, an MCP server, a Webhook, or a service address pointed to by an on-chain registry. Endpoints must handle authentication, rate limiting, versioning, availability, and logging.

The security of an endpoint directly affects the credibility of an identity. If an attacker hijacks an endpoint, even if the on-chain Agent ID hasn't changed, what the user actually calls might be a malicious service. Therefore, endpoint updates should require an owner signature and maintain a history.

Service entry points should also describe supported protocols and versions. Since A2A, MCP, REST API, and WebSocket have different interaction methods, Agents need to negotiate capabilities and task formats first.

### Registry

**Difficulty: Intermediate.** A Registry is used to register, discover, and update Agent identities.

On-chain registries can provide publicly searchable identity anchors, such as Agent ID, owner, profile URI, service endpoint, and update records. Off-chain registries are more flexible, but their trust boundaries are more centralized.

The value of a Registry lies in discovery and continuity. Users should not have to judge whether an Agent is authentic every time from social media links; they can find the same Agent ID, owner, and profile through a registry.

A Registry is not an all-powerful trust layer. It can prove "who registered this identity," but it cannot prove "this Agent is definitely useful or safe." Capabilities and reputation need subsequent verification.

### DID / VC

**Difficulty: Intermediate.** DID and Verifiable Credentials provide a more universal decentralized identity and verifiable claim model.

DIDs can express resolvable identities, and VCs can express claims issued by a certain issuer, such as "this Agent passed a certain capability test" or "this Agent is operated by a certain team."

The advantage of DID/VC is its universality, not being limited to a specific chain. An Agent can use a DID to express cross-platform identity and a VC to carry capability proofs, organizational affiliations, audit passes, and compliance declarations.

However, the credibility of a VC depends on the issuer. Anyone can issue a claim, but that doesn't mean any claim is trustworthy. Products should display the issuer, issuance time, revocation status, and verification path.

::: info Related Topic
- [W3C DID Core](https://www.w3.org/TR/did/): Understand the basic model of Decentralized Identifiers.
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/): Understand how verifiable credentials express claims and proofs.
:::

### A2A

**Difficulty: Intermediate.** A2A focuses on how Agents discover each other, communicate, negotiate tasks, and exchange results.

If Agents are to delegate tasks to each other, having just a wallet address is not enough. They need to know what protocols the other supports, how to authenticate, how task status is synchronized, and how results are returned.

A2A is more like a communication layer for Agents rather than the identity layer itself. The identity system tells you "who I am talking to," and A2A handles "how to collaborate." When combined, Agents can discover, negotiate, delegate, and return results across platforms.

In payment scenarios, A2A messages are best associated with Payment Intent, Receipt, and Escrow states; otherwise, dialogue and settlement will split into two systems that cannot be reconciled.

::: info Related Topic
- [Agent2Agent Protocol](https://google-a2a.github.io/A2A/latest/): Learn about open protocols for Agent interoperability and task collaboration.
:::

### Ownership

**Difficulty: Advanced.** Ownership determines who can update the Agent profile, payment address, service endpoint, and permissions.

An Agent owner can be an EOA, Smart Account, multi-sig, DAO, or corporate account. High-value Agents should not be controlled by a single hot wallet. Identity updates, endpoint updates, and payment address changes should all leave verifiable records.

Ownership also involves accountability. If an Agent provides paid services, who handles refunds, disputes, and compensation if something goes wrong? If the owner is a DAO or multi-sig, governance and operational processes should also be understandable by users.

When displaying externally, it is recommended to separate the operator from the owner: the operator runs the service, and the owner controls the identity and key updates. Both can be the same entity or separate.

## Position in AI x Web3

Agent Identity is a prerequisite for Agent Trust, Machine Payment, and Agentic Commerce. If a user is to pay an Agent, they must know who the payment recipient is; if another Agent is to delegate a task, it also needs to verify the other's service entry point and historical record.

Identity itself does not equal trust. It is just the first layer of a trust system: first knowing who the object is, then looking at what it has done, who has evaluated it, whether it has a stake, and whether there are verification proofs.

## Minimal Practice

Design an Agent Profile:

1. Write the Agent name, description, owner, and endpoint.
2. List 3 capabilities, each with input, output, price, and limits.
3. Design a profile URI, which can be HTTPS or IPFS.
4. Write down who can update the profile and how to notify users after an update.
5. Write down how to prove that this endpoint indeed belongs to the Agent.

## Extended Reading

- [ERC-8004: Trustless Agents](https://eips.ethereum.org/EIPS/eip-8004): Learn about the draft standard for Agent identity, reputation, and verification registry.
- [ERC-8004 Website](https://www.geterc8004.com/): Quickly understand the identity and registry model of ERC-8004.
- [W3C DID Core](https://www.w3.org/TR/did/): Decentralized Identity standard.
- [W3C Verifiable Credentials](https://www.w3.org/TR/vc-data-model/): Data model for verifiable claims.
- [Agent2Agent Protocol](https://google-a2a.github.io/A2A/latest/): Communication and interoperability protocol between Agents.
