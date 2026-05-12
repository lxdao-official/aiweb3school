---
title: Chain-aware Context
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/chain-aware-context/
---

# Chain-aware Context

> Chain-aware Context refers to ensuring that an AI can see the correct chain, address, contract, transaction, event, balance, authorization, and data source before answering or acting, rather than guessing the on-chain state based on a single user statement.

## Why Learn This

The context for standard AI applications usually comes from documents, chat history, databases, and web pages. AI x Web3 adds another layer: the on-chain state changes continuously and is directly related to assets, permissions, and transaction execution.

If an Agent doesn't know the current chain ID, contract address, ABI, user authorization, transaction history, and data update time, it might give wrong suggestions or even generate dangerous transactions.

**The core of Chain-aware Context is turning on-chain facts into context that is readable, referenceable, and verifiable by the model.**

## First Principles

> **Models cannot judge on-chain facts based on linguistic memory; on-chain facts must be read from tools and indexing layers.**

It is useless for a model to know "Uniswap is a DEX"; during actual execution, it needs specific information: the network, the contract, the pool, current price, user balance, allowance, slippage, and transaction simulation results.

- **On-chain State is Time-sensitive**: The balance, authorization, and position of an address change with blocks.
- **Context Must Have Sources**: Contract addresses, block numbers, transaction hashes, and explorer links should all be traceable.
- **Context Must Distinguish Between Facts and Interpretations**: Tools return facts, and models are responsible for interpretation; do not treat model guesses as facts.

## Knowledge Nodes

### On-chain Data

**Difficulty: Beginner.** On-chain Data is data that can be directly verified on the chain, such as balances, transactions, logs, contract states, and block information.

Common sources include RPCs, block explorers, indexers, and protocol APIs. For an Agent reading on-chain data, it should at least include: chain ID, block number, contract address, method, return value, and read time.

Without these fields, a model can easily confuse data from different chains, times, and contracts.

### Contract Docs

**Difficulty: Beginner.** Contract Docs help the model understand the design intent, parameter meanings, permission boundaries, and usage patterns of a contract.

An ABI only tells you function signatures, not business semantics. For example, `execute(bytes calldata data)` might be a normal execution or a high-permission entry point. Documentation, NatSpec, READMEs, audit reports, and deployment instructions can fill in the semantic gaps.

However, documentation can also expire. After reading docs, an Agent must still verify with on-chain data: whether the contract address, version, owner, proxy implementation, events, and recent transactions match.

### ABI / Event

**Difficulty: Intermediate.** ABI and Events are the core structures through which an Agent understands a contract's capabilities and historical behavior.

ABIs let tools know how to encode function calls, decode return values, and parse events. Events are business logs left by contracts for external systems, such as `Transfer`, `Swap`, `Deposit`, and `VoteCast`.

Agents must use ABIs carefully: being able to call a function doesn't mean it should be called. Permission, balance, allowance, slippage, simulation, and policy checks are still required before writing a transaction.

::: info Related Topic
- [Smart Contract](/en/handbook/web3/smart-contract/): Understand the role of ABIs and events in contract interaction.
- [Indexing](/en/handbook/web3/indexing/): Learn how events enter the indexing layer.
:::

### Transaction History

**Difficulty: Intermediate.** Transaction History helps an Agent understand what a user or contract has done in the past.

Transaction history can be used to determine: whether a user has already given authorization, whether a strategy has been executed, whether an address has interacted with high-risk contracts, and whether a contract has been upgraded recently.

However, transaction history cannot be just a natural language summary. At a minimum, it must include transaction hash, block number, from, to, method, value, token transfers, and logs. The model can summarize, but the evidence must lead back to the chain.

### Explorer Context

**Difficulty: Beginner.** Explorer Context is visual on-chain evidence provided by block explorers.

Block explorers are suitable for providing checkable entry points for users and Agents: whether a transaction succeeded, whether a contract is verified, whether the source code is public, whether events were emitted, and whether token transfers occurred.

In AI products, providing an explorer link is more reliable than just saying "transaction successful." Users can verify the link themselves, and developers can troubleshoot errors.

### Indexing Context

**Difficulty: Intermediate.** Indexing Context is on-chain events organized as product-oriented queryable data.

The questions an Agent needs to answer are usually not "what's in a specific block" but "what DeFi operations has this user done in the last 30 days," "how has this pool's TVL changed," or "what payments has this Agent made." These queries require an indexing layer.

Indexing context must include timestamps and sync status. An indexing result that is 500 blocks behind should not be treated as a current fact by an Agent.

### Citation

**Difficulty: Beginner.** Citations allow model answers to lead back to specific on-chain evidence or document sources.

In on-chain scenarios, citations can be transaction hashes, block numbers, contract addresses, event logs, explorer links, document URLs, or sections of audit reports. The value of a citation is that it lets users and systems know what fact a statement is based on.

On-chain interpretations without citations are just opinions; interpretations with citations can be verified and held accountable.

## Position in AI x Web3

Chain-aware Context is the input layer for all on-chain Agents. Without this layer, [Web3 Tool Use](/en/handbook/bridge/web3-tool-use/), [Agent Workflow](/en/handbook/bridge/agent-workflow/), and [Agent Wallet](/en/handbook/bridge/agent-wallet/) would be built on unreliable context.

A good Chain-aware Context package should look like this:

- User goals;
- Current chain ID and network name;
- User address and balance;
- Relevant contract addresses, ABIs, documentation, and risk warnings;
- Recent transactions and authorizations;
- Indexing data update time;
- Citations for every key conclusion.

## Minimal Practice

Create a context package for a transaction:

1. Find a public transaction hash.
2. Collect chain ID, block number, from, to, method, value, token transfers, and logs.
3. Find the contract ABI or verified source.
4. Write a model-readable context, but attach transaction hashes or explorer links to every key conclusion.
5. Mark which content is on-chain fact and which is your interpretation.

## Extended Reading

- [Ethereum JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/): Understand how on-chain data is read through RPC.
- [Ethereum Events and Logs](https://ethereum.org/en/developers/docs/apis/backend/#events): Understand how events and logs become sources of on-chain context.
- [Etherscan API Docs](https://docs.etherscan.io/): Learn how block explorer data interfaces assist in querying transactions, contracts, and addresses.
- [The Graph Subgraphs](https://thegraph.com/docs/en/subgraphs/overview/): Learn how to organize events into queryable context.
- [OpenAI Tools Guide](https://platform.openai.com/docs/guides/tools): Understand how models read external facts through tools instead of relying on memory.
