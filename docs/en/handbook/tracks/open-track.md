---
title: Open Track
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/tracks/open-track/
---

# Open Track

> The Open Track does not mean "anything goes." It is for projects that cannot be fully covered by one fixed direction, but can genuinely combine AI and Web3 into new workflows, new protocols, or new experiences.

## Why Explore This

AI x Web3 is still early, and many valuable projects will not fit neatly into fixed categories. The point of the Open Track is to leave builders room to explore: wallets, content, data analysis, research tools, identity, protocol UX, and community collaboration can all produce new combinations.

But open does not mean arbitrary. An Open Track project still needs to answer two questions:

- What indispensable work does AI specifically do?
- What indispensable capability does Web3 specifically provide?

If these two questions are unclear, the project easily becomes "AI wrapped around a Web3 concept" or "Web3 wrapped around an ordinary AI tool."

## First Principles

> **The core of the Open Track is not chasing trends, but discovering new user workflows.**

Truly valuable new directions usually come from a specific group of people, a specific pain point, and a specific process, not from combining a few popular terms.

- **Find the workflow first**: how users complete the task today, and where it is slow, expensive, difficult, opaque, or unverifiable.
- **Then separate the roles of AI and Web3**: AI handles understanding, generation, planning, and recommendation; Web3 handles assets, identity, permissions, records, incentives, or governance.
- **Finally build the minimal loop**: input, processing, output, permissions, and failure paths must all be clear.

## Knowledge Nodes

### AI-native Wallet

An AI-native Wallet is not a wallet with a chat box added to it. It is a wallet that understands user goals, explains transactions, manages permissions, warns about risks, and helps users complete multi-step on-chain tasks.

Possible features include:

- Explain transactions and authorizations in natural language.
- Generate transaction drafts from user goals.
- Detect phishing addresses, abnormal approvals, and high-risk calldata.
- Manage Agent session keys and spending limits.
- Organize DeFi positions, NFTs, governance votes, and historical actions into context.

The key to this type of project is the security boundary: AI can explain and suggest, but signatures, authorizations, and high-risk operations must be handled by an explicit wallet permission system.

::: info Related Topic
- [Wallet and Permission](/en/handbook/tracks/wallet-permission/): Understand AI wallet permissions, session keys, and revocation design.
- [Agent Wallet](/en/handbook/bridge/agent-wallet/): Understand how wallets carry capability boundaries from the Agent execution perspective.
:::

### Creator / Content Collaboration

AI can reduce content production costs, while Web3 can record identity, authorization, distribution, and revenue relationships. Creator / Content Collaboration is not about "AI-generated NFT images," but about multi-person collaboration, version evolution, and rights allocation.

Scenarios to explore include:

- Creators use AI to generate drafts, while the community helps select and remix them.
- Work versions, contributors, and authorization records are put on-chain.
- NFTs or credentials serve as access rights, membership rights, or co-creation rights.
- Revenue is automatically distributed according to contribution rules.
- AI helps organize the creative process, generate descriptions, and track authorization boundaries.

The easiest pitfall here is copyright and authorization. On-chain records can prove that a claim existed at a certain time, but they cannot automatically solve training data, commercial usage rights, or real-world legal issues.

### On-chain Data Analysis Agent

On-chain data is public, but that does not mean it is easy to understand. An On-chain Data Analysis Agent can help users explain address behavior, protocol risk, fund flows, governance votes, and asset changes.

A practical data analysis Agent should be able to:

- Query on-chain transactions, events, balances, and protocol state.
- Translate complex behavior into structured explanations.
- Distinguish facts, inferences, and uncertainty.
- Provide source links such as block explorers, Dune, Subgraph, or RPC results.
- Flag abnormal behavior as risk.

This type of tool must avoid overjudgment. For example, "an address may belong to an institution" is an inference, not a fact; "funds flowed to this contract" is a verifiable fact.

::: info Related Topic
- [Indexing and Data](/en/handbook/web3/indexing/): Understand how on-chain data is indexed, queried, and analyzed.
- [The Graph Docs](https://thegraph.com/docs/): Learn how subgraphs organize on-chain data queries.
:::

### Cross-track Combination

Many good projects are not a single direction, but a combination of several directions. For example:

- AI wallet + permission: turn natural-language goals into restricted session keys.
- Agentic commerce + settlement: use escrow acceptance after an Agent buys a service.
- Governance + source-preserving summary: preserve sources and disputes in DAO proposal summaries.
- Dev tooling + transaction interpreter: developer tools explain calldata and testing boundaries.
- Decentralized AI + verifiable AI: add proof or sampling verification to open inference networks.

Combination projects need to avoid scope expansion. The best approach is to choose one core loop and treat other capabilities as supporting layers, instead of building every concept at once.

### New Protocol / New Scenario

The Open Track is also suitable for exploring new protocols or scenarios, but new protocols must start from concrete friction.

Questions worth considering:

- Why can existing protocols not solve this problem?
- Is a new message format, payment format, identity format, or proof format needed?
- Which fields must be standardized, and which can be left to the application layer?
- What is the first runnable scenario for this protocol?
- Before network effects exist, can a single project still get value from it?

Do not build a protocol for the sake of "building a protocol." A good protocol usually grows out of repeated workflows.

::: info Related Topic
- [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004): Learn about standardization attempts related to Agent identity, reputation, and discovery.
- [Google A2A](https://google-a2a.github.io/A2A/latest/): Learn how Agent-to-Agent interaction protocols define capability discovery and task collaboration.
:::

### Research Visualization

AI x Web3 contains a lot of complex information: protocol architecture, fund flows, governance processes, attack paths, model evaluation, and Agent workflows. Research Visualization uses visualization to make these complex relationships clear.

Possible forms include:

- Contract call graphs.
- Fund-flow Sankey diagrams.
- Governance proposal timelines.
- Agent tool-call traces.
- Protocol risk maps.
- Model evaluation comparison charts.

AI can help extract structure and generate explanations, while Web3 data provides verifiable sources. A good visualization tool does not only make pretty charts. It helps users discover anomalies faster, understand causality, and return to evidence.

## Position in AI x Web3

The Open Track is where all previous foundational capabilities can be recombined. It is suitable for exploration, but it also requires the most discipline: do not only talk about concepts. Bring the project down to users, inputs, outputs, permissions, verification, and failure paths.

You can evaluate an Open Track project with four questions:

- Who is the user, and how do they do this today?
- Which step does AI make obviously better?
- Which step does Web3 make verifiable, ownable, settleable, or governable?
- Can the minimal version produce a demonstrable loop within two weeks?

## Minimal Practice

Choose an Open Track idea and write a one-page project spec.

It must include:

- User persona and concrete scenario.
- Pain points in the current workflow.
- Steps handled by AI.
- Steps handled by Web3.
- Minimal input, processing flow, and output.
- Permissions, privacy, and failure paths.
- How the first demo proves that it is not concept wrapping.

## Further Reading

- [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004): An EIP related to Agent discovery, identity, and reputation.
- [Google A2A](https://google-a2a.github.io/A2A/latest/): Reference implementation and specification for Agent-to-Agent collaboration protocols.
- [The Graph Docs](https://thegraph.com/docs/): Foundations of on-chain data indexing and querying.
- [Dune Docs](https://docs.dune.com/): Learn how to analyze public on-chain data and build dashboards.
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/): Understand common contract modules, permissions, and security components.
