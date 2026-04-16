---
title: Blockchain Basics
createTime: 2026/04/16 15:30:00
permalink: /en/blockchain-basics/
---

# Blockchain Basics

## What this lesson solves

Before going deeper into Web3, it is worth answering one basic question: why use a blockchain instead of a normal database? Once decentralization, consensus, immutability, and public verifiability are separated clearly, later topics such as wallets, contracts, DeFi, and agents become much easier to reason about.

## A practical definition

A blockchain can be understood as a shared ledger system maintained by multiple parties, updated under explicit rules, and verifiable by outsiders.

That definition contains four important ideas:

- multiple parties maintain the system
- records are appended under rules instead of rewritten at will
- state changes require consensus
- external observers can verify the result

## What blocks and chains mean

### Block

A block is a batch of data grouped together for a period of time. It usually contains:

- a list of transactions
- a timestamp
- a reference to the previous block
- information required by the consensus process

### Chain

The chain is the ordered connection between blocks. As more blocks are added, changing past history becomes increasingly difficult.

## Why it differs from a normal database

A traditional database usually has a clear administrator who can modify or rewrite data directly.  
A blockchain is not absolutely unchangeable, but changes are much more constrained and expensive because they require broader network coordination instead of a single operator.

Its value is not speed. Its value is:

- multi-party coordination
- asset settlement
- verifiable shared state
- reduced dependence on one trusted operator

## State, transactions, and block explorers

### State

State is the current global result of the chain, for example:

- an address balance
- a contract variable
- the size of a protocol pool

### Transaction

A transaction is an input that requests a state change.

### Block explorer

A block explorer is the easiest way to inspect chain activity. It does not define truth, but it helps you check:

- whether a transaction succeeded
- what an address has done
- where a contract was deployed

## What decentralization actually means

Decentralization is not one single property. It usually involves at least three layers:

### Infrastructure layer

Nodes are distributed across different operators.

### Permission layer

State changes cannot be decided unilaterally by one administrator.

### Economic layer

The system has incentives and constraints rather than relying entirely on one company to fund and operate it.

## Problems blockchains are good at

Blockchains are more suitable when:

- many parties need to read and write the same state
- asset transfers must be publicly verifiable
- execution rules should not depend on one platform
- history and outputs must remain traceable

They are less suitable when:

- a single organization controls the whole system
- latency and throughput are the highest priority
- the data should stay private
- no settlement or public verification is needed

## An AI × Web3 example

If an AI agent only reads data locally and produces suggestions, blockchain may be unnecessary.  
But if it needs to:

- manage onchain assets
- trigger publicly verifiable execution
- interact with multiple protocols
- prove what actions it performed

then blockchain starts to matter because it provides the trusted execution and state record layer.

## Minimum takeaway

After this lesson, you should be able to explain:

- the key difference between a blockchain and a normal database
- what blocks, chains, states, and transactions are
- why decentralization is a multi-layer property
- what kinds of problems are worth putting onchain

## What comes next

The next lesson moves into smart contracts and shifts the question from “who maintains the ledger” to “how rules are executed automatically.”
