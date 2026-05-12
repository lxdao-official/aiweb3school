---
title: Indexing
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/web3/indexing/
---

# Indexing

> On-chain data is public, but that does not mean it is easy to use. Indexing organizes blocks, transactions, events, and contract state into structured data that products, analytics tools, and AI Agents can query quickly.

## Why Learn This

A contract can emit many events, and a chain produces large numbers of blocks and transactions every day. You can read directly through RPC, but if you want user history, leaderboards, protocol dashboards, risk monitoring, or Agent context, you need a stable data indexing layer.

Indexing does not solve "whether data exists"; it solves "whether data can be queried quickly, accurately, and replayably according to product needs."

**The chain is the source of truth; the indexing layer is the usable data layer.**

## First Principles

> **Products need problem-oriented data models, not raw block streams.**

Blockchains organize data by blocks and transactions, but users and products care about "this address's position," "this protocol's TVL," "whether this order was filled," or "which actions this Agent executed." The indexing layer turns underlying facts into these query objects.

- **Events are an important entry point**: contract events are the main signals indexers use to build state.
- **RPC is not a database**: RPC is good for reading chain state and sending transactions, not for all complex historical queries.
- **Indexing must be replayable**: when contracts upgrade, reorgs happen, or bugs are fixed, data may need to be rebuilt from a certain block.

## Knowledge Nodes

### Event Indexing

**Difficulty: Beginner.** Event Indexing listens to contract logs and organizes on-chain actions into queryable records.

For example, a contract emits `Transfer`, `OrderCreated`, `Deposit`, `Withdraw`, or `VoteCast`; the indexer can turn these events into database tables or search indexes. The frontend can then query "all orders for a user" or "recent deposits for a pool."

When designing events, consider future queries:

- whether the event contains key addresses
- whether indexed parameters are needed
- whether business state can be reconstructed from events
- failed transactions do not emit success events
- whether events remain compatible after contract upgrades

::: info Related Topic
- [Smart Contract](/en/handbook/web3/smart-contract/): first understand why events are logs contracts leave for external systems.
:::

### Subgraph

**Difficulty: Intermediate.** A Subgraph declaratively describes how to index contract events and expose queries through GraphQL.

A The Graph subgraph usually includes three parts: contracts and events to listen to, mapping from events to entities, and GraphQL schema. It is useful for building protocol data APIs such as token, pool, swap, position, and vote.

The value of Subgraph is that developers do not have to write the entire indexer from scratch. But it still needs maintenance: contract-address changes, event-structure changes, reorgs, sync delays, and schema design all affect data quality.

::: info Related Topic
- [The Graph Subgraphs](https://thegraph.com/docs/en/subgraphs/overview/): learn about subgraphs, schema, mappings, and GraphQL queries.
:::

### RPC

**Difficulty: Beginner.** RPC is the interface between applications and nodes, used to read chain state, query logs, estimate gas, and send transactions.

RPC is important, but it is not a universal indexing service. You can use `eth_call` to read current contract state, `eth_getLogs` to query event logs, and `eth_sendRawTransaction` to broadcast transactions. But if you frequently scan large historical logs, public RPC can easily rate-limit or slow down.

Common RPC problems include:

- rate limits
- node not synced
- archive data unavailable
- different RPCs returning inconsistent data
- query block range too large
- unstable WebSocket connections

### Data Pipeline

**Difficulty: Advanced.** Data Pipeline combines on-chain data, off-chain data, indexing results, and business events into a data system for analysis, monitoring, and AI use.

A complete pipeline may include:

- RPC or node data source
- event listener
- ABI decoding
- database writes
- reorg handling
- data validation and compensation jobs
- API / GraphQL / vector store
- dashboard, alert, and Agent context

AI x Web3 projects especially need to care about data sources. If an Agent receives stale indexes or wrongly decoded results, stronger downstream reasoning will still be built on wrong facts.

## Where It Fits in AI x Web3

AI Agents need context, and on-chain context usually comes from the indexing layer. Transaction history, contract events, user positions, protocol state, and risk signals are not suitable to search from raw blocks every time.

A good indexing layer should provide Agents with structured, sourced, timestamped, replayable data. The model explains and reasons; the indexing layer provides facts.

## Minimum Practice

Design an event index:

1. Choose a simple contract, such as voting, counter, or NFT mint.
2. List the events it should emit.
3. Design one query table, such as `votes`, `transfers`, or `mints`.
4. Mark which event parameter or transaction field each column comes from.
5. Write how to handle reorgs, duplicate events, and contract upgrades.

Then ask: if this data is used by an AI Agent, which source fields and update times must be attached?

## Further Reading

- [Ethereum JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/): understand the low-level interface for reading chain state, querying logs, and sending transactions.
- [Ethereum Events and Logs](https://ethereum.org/en/developers/docs/apis/backend/#events): understand how backends listen to on-chain events.
- [The Graph Subgraphs](https://thegraph.com/docs/en/subgraphs/overview/): learn schema, mappings, and query patterns for subgraphs.
- [Substreams Documentation](https://substreams.streamingfast.io/): understand another high-throughput on-chain data pipeline approach.
- [Dune Docs](https://docs.dune.com/): useful for SQL analysis of on-chain data and dashboard building.
