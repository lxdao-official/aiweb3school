---
title: Network
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/web3/network/
---

# Network

> In Web3, a "network" is not abstract background. It is the base environment that determines whether transactions can be included, whether state can sync, how fees arise, how long confirmation takes, and how L2s and mainnet divide responsibilities.

## Why Learn This

Many Web3 problems look like frontend or wallet problems on the surface, but are actually network problems underneath: users switch to the wrong chain, RPC latency, pending transactions, insufficient testnet assets, L2 withdrawal waits, or inconsistent state between the block explorer and the frontend.

Understanding Network means knowing which layers a transaction passes through from wallet signature to final user visibility: wallet, RPC, mempool, block, consensus, execution, confirmation, indexing, and explorer.

**An on-chain application does not directly write a database. It submits requests to a public state machine that advances by blocks and is maintained by network consensus.**

## First Principles

> **The core of a blockchain network is not "storing data," but letting mutually distrusting participants agree on state changes.**

In ordinary applications, a server can directly update a database. In on-chain systems, transactions must be propagated, executed, included, verified, and confirmed by nodes. This process brings public verifiability, but also latency, fees, and finality issues.

- **Blocks are the sync rhythm**: state does not update continuously every millisecond; it advances in batches by blocks.
- **Consensus is the trust source**: users trust the state not because one company decides it, but because the network reaches agreement by rules.
- **Network choice changes experience**: mainnet, testnets, and L2s differ in fees, speed, security assumptions, and tooling support.

## Knowledge Nodes

### Block

**Difficulty: Beginner.** A block is the unit in which transactions are submitted and ordered in batches.

A block usually contains a transaction list, a reference to the previous block, state root, timestamp, gas usage, and consensus-related information. After transactions enter a block, nodes execute them and update global state.

When looking at blocks, the point is not to memorize fields, but to understand three things:

- Transactions have order, and order affects results.
- Blocks have gas limits, so network throughput is not unlimited.
- New blocks reference previous blocks, forming verifiable history.

::: info Related Topic
- [Ethereum Blocks](https://ethereum.org/en/developers/docs/blocks/): understand blocks, transaction batching, block time, and block gas limits.
:::

### Consensus

**Difficulty: Intermediate.** Consensus is the mechanism by which the network decides "which history is valid."

Different nodes receive transactions, blocks, and network messages. Consensus lets these nodes form a shared view of block order and state changes without a central database.

For application developers, consensus affects:

- how many confirmations a transaction should wait before being considered safe
- whether blocks may be briefly reorganized, meaning the frontend should not assume finality too early
- whether state reads may be delayed when nodes fail or RPC behaves abnormally

### PoS

**Difficulty: Intermediate.** PoS uses staking and penalties to organize validators, replacing PoW mining to maintain network security.

Ethereum currently uses Proof of Stake. Validators stake ETH to participate in block proposal and attestation, and incorrect behavior can be penalized. Ordinary users do not necessarily need to run validators, but they should understand that network security is not "free"; it comes from economic stake, client implementations, and node participation.

PoS also explains why block time, finality, validators, staking, and slashing appear in network-layer discussions.

::: info Related Topic
- [Ethereum Proof-of-Stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/): learn about Ethereum PoS, validators, block proposal, and penalties.
:::

### Testnet

**Difficulty: Beginner.** Testnets are used to test contracts, frontends, and transaction flows in environments close to real chains.

Testnet assets have no real economic value, but they help you verify deployment scripts, wallet connections, RPC configuration, contract calls, explorer verification, and frontend state handling.

Testnets cannot replace mainnet security review. The reason is simple: testnet liquidity, MEV, attack incentives, asset scale, and user behavior are all different. Testnets are suitable for testing processes, not proving that economic mechanisms are safe.

When building a project, record at least:

- which testnet it is deployed on
- contract addresses and deployment transactions
- which RPC is used
- how the frontend switches chain id
- where test assets come from

### L2

**Difficulty: Intermediate.** L2 is a network layer that balances mainnet security with lower cost.

Layer 2 usually executes many transactions outside mainnet, then submits results or proofs back to mainnet. For users, common L2 advantages are lower fees and faster confirmation; but they also introduce bridges, withdrawal delays, sequencers, and cross-chain state synchronization.

Product design cannot only say "supports Ethereum." If multiple L2s are supported, the product should clearly show the current network, which chain assets are on, how long bridging takes, and whether contract addresses differ.

### Rollup

**Difficulty: Advanced.** Rollup is the mainstream L2 scaling path. It moves execution off L1 or onto L2, then submits data and results to L1.

Common rollup types include optimistic rollups and zero-knowledge rollups. They differ in proof method, withdrawal delay, data availability, developer experience, and ecosystem tooling.

For builders, start with one judgment: rollups reduce per-transaction cost, but do not remove on-chain system complexity. You still need to handle cross-chain assets, RPC, explorers, contract addresses, bridge risks, and user confirmation.

## Where It Fits in AI x Web3

If an AI Agent needs to read on-chain state or execute transactions, it must know which network it is operating on. Mainnet and testnet, L1 and L2, different chain ids, and different contract addresses cannot be guessed by the model.

A safer approach is to have tools return structured network information: chain id, RPC source, block height, transaction hash, confirmation count, and explorer link. The Agent summary should cite these verifiable fields instead of only saying "the transaction succeeded."

## Minimum Practice

Track one testnet transaction:

1. Claim a small amount of test ETH on a testnet.
2. Use a test wallet to send a transfer or call a simple contract.
3. Check transaction status, block number, gas used, from, to, and logs in a block explorer.
4. Record how long the transaction takes from pending to confirmed.
5. Switch to another network and observe whether the same address has different balance and transaction history.

After finishing, write down: if this flow were assisted by an AI Agent, which fields must be read by tools, and which descriptions can be generated by the model.

## Further Reading

- [Ethereum Blocks](https://ethereum.org/en/developers/docs/blocks/): understand how blocks organize transactions and state changes.
- [Ethereum Networks](https://ethereum.org/en/developers/docs/networks/): learn about mainnet, testnets, and network IDs.
- [Ethereum Proof-of-Stake](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/): learn Ethereum's current consensus mechanism.
- [Ethereum Layer 2](https://ethereum.org/en/layer-2/): understand L2 from user and developer perspectives.
- [Ethereum Rollups](https://ethereum.org/en/developers/docs/scaling/#rollups): continue with why rollups are the mainstream scaling path.
