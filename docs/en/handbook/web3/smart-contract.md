---
title: Smart Contract
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/web3/smart-contract/
---

# Smart Contract

> A smart contract is not a "legal contract that executes automatically." It is a program deployed on-chain. It puts rules, assets, and state into a publicly verifiable execution environment, and also exposes bugs, permissions, and upgrade risks to everyone.

## Why Learn This

Many core Web3 product logics live in smart contracts: tokens, NFTs, DEXs, lending, governance, staking, airdrops, and account abstraction. Frontends can be replaced, backends can be refactored, but once a contract is deployed, modification cost and risk are usually much higher than ordinary application code.

Learning smart contracts is not about immediately writing complex protocols. It is about building judgment first: which rules belong on-chain, how contracts store state, how calls change state, how interfaces can be composed by other applications, and why testing and audits cannot be skipped.

**Smart contracts turn rules into public infrastructure, and bugs into public risk.**

A tiny example is enough to start: a counter contract stores one `count`. Anyone calls `increment()`, and `count` increases by one. Although simple, this already contains the core ideas: state variables, external calls, transaction execution, gas cost, event logs, and block-explorer visibility.

Real protocols simply scale this model up: balances, collateral, loans, orders, votes, permissions, and upgrade information are all more complex on-chain state.

## First Principles

> **A contract's value comes from verifiable execution, not from code that "looks clever."**

Smart contracts let anyone inspect rules, call interfaces, and verify state changes. This openness brings composability, but also attack surface. You are not writing ordinary functions; you are writing programs that manage real assets and public state.

- **State is publicly inspectable**: on-chain state is not a private database field; much of it can be seen by everyone.
- **Calls have cost and order**: every execution is affected by gas, block ordering, and external state.
- **Permissions must be explicit**: who can mint, pause, upgrade, or withdraw cannot rely on default trust.

## Knowledge Nodes

### Solidity

**Difficulty: Beginner.** Solidity is the most common contract language in the EVM ecosystem. Use it first to understand how on-chain programs are written and constrained.

Solidity looks like an ordinary programming language, but it runs in a completely different environment. Contract state is written on-chain, function calls may consume gas, and permission mistakes can directly affect asset safety.

When learning Solidity, do not only look at syntax. More important are chain-specific concepts such as storage, `msg.sender`, modifiers, events, external calls, revert, and access control.

A minimal contract looks like this:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;

    event CountChanged(uint256 newCount);

    function increment() external {
        count += 1;
        emit CountChanged(count);
    }
}
```

Here, `count` is on-chain state, `increment()` is a write operation that changes state, and `event` is a log external systems can index. A frontend can read `count()` without user signature, but calling `increment()` usually requires wallet signature and gas payment.

::: info Related Topic
- [Solidity Documentation](https://docs.soliditylang.org/): official language docs for learning contract structure, types, functions, events, error handling, and security notes.
:::

### EVM

**Difficulty: Intermediate.** The EVM is the contract execution environment. It determines how code is deployed, called, charged, and isolated.

EVM means Ethereum Virtual Machine. Solidity code is compiled into EVM bytecode, deployed on-chain, and executed by nodes.

Understanding the EVM helps explain many phenomena: why gas exists, why storage is expensive, why external calls are risky, and why the same contract can be deployed to many EVM-compatible chains.

::: info Related Topic
- [Network](/en/handbook/web3/network/): continue with how transactions are included, finalized, and confirmed by the network.
:::

### ABI

**Difficulty: Beginner.** ABI is the interface description between applications and contracts. Without ABI, frontends and tools cannot easily call contracts correctly.

ABI means Application Binary Interface. It describes a contract's functions, parameters, return values, and events. Frontend SDKs, scripts, block explorers, and AI tools can use ABI to understand how to encode calldata and decode results.

For AI x Web3, ABI is also important context for Agents to understand contract capabilities. But ABI only tells you "what can be called"; it does not guarantee "whether calling it is safe."

For example, if a contract has `transfer(address to, uint256 amount)`, the ABI tells tools that the function needs an address and a number. It does not automatically tell you:

- whether `to` is a malicious address;
- whether `amount` should be an integer scaled by token decimals;
- whether this call will trigger an external contract;
- whether the current account has enough balance or allowance;
- whether the function is paused or permission-restricted.

So ABI is a machine-readable interface, not a safety manual.

### Event

**Difficulty: Beginner.** Events are indexable logs that contracts leave for external systems. They are important data sources for frontends, indexers, and analytics tools.

Contracts can emit events during execution. Events do not become contract-readable state like storage, but they are very suitable for external systems to track what happened, such as transfers, order creation, parameter updates, and permission changes.

Many product pages do not scan contract storage every time. They build a query-friendly data layer by indexing events.

For example, an NFT marketplace may emit:

- `OrderCreated`
- `OrderCancelled`
- `OrderFilled`

Frontend order lists, user histories, and dashboards often do not read all orders one by one from the contract. They build query databases by indexing these events.

::: info Related Topic
- [Indexing](/en/handbook/web3/indexing/): continue with how events enter subgraphs, databases, and product query layers.
:::

### Upgrade

**Difficulty: Advanced.** Contract upgrades are a tradeoff between safety, governance, and product iteration. They cannot be treated only as a switch for "fixing bugs later."

Some contracts are immutable after deployment; some retain upgrade capability through proxies, governance, or multisigs. Immutability is closer to "fixed rules," but bug fixes are hard. Upgradeability is more flexible, but introduces admin permission, governance attack, and user-trust issues.

Product documentation should clearly state whether a contract is upgradeable, who holds upgrade permission, whether there is a timelock, and how users can monitor changes.

To judge upgrade risk, ask four questions directly:

- Who holds upgrade permission: a single EOA, multisig, DAO, or timelock contract?
- Can users see the upgrade proposal and new implementation address in advance?
- Can an upgrade change asset transfer, withdrawal, pause, or permission logic?
- If an admin key leaks, what is the worst outcome?

If a protocol says "the contract has been audited" but does not explain upgrade permissions, the security statement is still incomplete.

## How a Call Happens

Take "user clicks the vote button" as an example. The full chain usually is:

1. The frontend reads the wallet address and current network.
2. The frontend encodes `vote(proposalId)` calldata using ABI.
3. The wallet shows transaction information and asks the user to confirm signing.
4. The transaction is broadcast to an RPC node.
5. Validators include the transaction in a block.
6. The EVM executes contract logic; success updates state and emits events, failure reverts.
7. The frontend watches the transaction receipt and updates page state.
8. The indexer reads events and updates history or dashboards.

This is why smart-contract development cannot focus only on Solidity files. You need to understand wallets, RPC, block explorers, frontend SDKs, events, and indexing layers at the same time.

## Common Mistakes

- **Mixing `view` functions with write transactions**: reading state does not require signature; changing state usually requires a transaction.
- **Not handling decimals**: a token `amount` is usually not the human-visible "1.5"; it is an integer scaled by decimals.
- **Testing only the success path**: permission failure, insufficient balance, repeated calls, expiration, and paused state all need tests.
- **Treating owner as always trustworthy**: when owner permission is too broad, users are really trusting the admin.
- **Ignoring event design**: without events, frontend history, indexing, and audits become much harder later.

## Where It Fits in AI x Web3

When AI Agents enter on-chain execution, smart contracts should carry final rules and constraints instead of handing all judgment to the model. A model can help users understand ABI, generate call parameters, explain transaction results, and write test cases, but contracts enforce execution boundaries.

A steady design is usually: AI gives suggestions and orchestration, the wallet confirms authorization, the contract performs verifiable execution, and monitoring records results. Even if AI output is unstable, the on-chain rules still have clear boundaries.

## Minimum Practice

Do a minimal contract-reading exercise:

1. Find a simple ERC-20 or NFT contract with verified source code.
2. In a block explorer, view source code, ABI, events, and recent transactions.
3. Identify which functions change state and which only read state.
4. Identify permission functions, such as owner, admin, pause, mint, burn, upgrade.
5. Identify the most important event and explain which type of user action it corresponds to.
6. Explain in one sentence: what is the most important risk boundary of this contract?

## Further Reading

- [Solidity Documentation](https://docs.soliditylang.org/): learn the Solidity language, types, contract structure, and security notes.
- [Ethereum Smart Contracts](https://ethereum.org/en/developers/docs/smart-contracts/): understand basic smart-contract concepts from Ethereum developer docs.
- [Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/evm/): understand how the EVM executes contract code.
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/): learn common secure contract libraries and standard implementations.
- [OpenZeppelin Upgrades](https://docs.openzeppelin.com/upgrades-plugins/): understand proxy upgrade patterns and related risks.
