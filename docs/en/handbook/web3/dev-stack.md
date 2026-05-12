---
title: Dev Stack
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/web3/dev-stack/
---

# Dev Stack

> The Web3 dev stack is not a random list of tool names. It is an engineering chain from writing contracts, testing contracts, deploying contracts, connecting wallets, calling contracts, and monitoring results. Tool choice should make on-chain development more verifiable, reproducible, and less accident-prone.

## Why Learn This

Writing a Web3 demo is easy: connect a wallet, call a contract, send a transaction. But once you build a real project, you immediately meet contract compilation, tests, deployment scripts, environment variables, RPC, frontend SDKs, chain switching, contract verification, permission management, and monitoring.

The purpose of the dev stack is not to collect more tools. It is to turn development into a repeatable system. A project should at least be runnable locally, reproducible in tests, recorded in deployment, explicit in frontend calls, and traceable in contract addresses.

**The clearer the toolchain, the more controllable on-chain execution becomes.**

You can split a minimal development chain into six steps:

1. Write the contract locally or in a browser IDE.
2. Compile the contract to get bytecode and ABI.
3. Deploy the contract to a local chain or testnet.
4. Write tests for core state changes and permission boundaries.
5. Use contract address and ABI in the frontend to read or send transactions.
6. Verify source code, transactions, and events in a block explorer.

If any step is missing, it becomes debugging cost later. For example, a wrong ABI in the frontend causes parameter encoding errors; deployment addresses without version records make it unclear which contract users are interacting with; tests that only cover the happy path easily miss permissions and failure branches.

## First Principles

> **The core of a Web3 toolchain is to move irreversible execution into testable, simulatable, and reviewable processes before it happens.**

Once an on-chain transaction succeeds, regret is expensive. Development tools should expose errors as early as possible in local environments, testnets, simulations, and code review, rather than after mainnet launch.

- **Reproduce locally first**: contract logic, deployment scripts, and frontend calls should all run locally or on testnets.
- **Version addresses and ABI**: the exact contract the frontend calls must be traceable.
- **Security libraries are not audits**: OpenZeppelin and similar libraries reduce basic risk, but composition logic still needs your own verification.

## Knowledge Nodes

### Remix

**Difficulty: Beginner.** Remix is useful for quickly understanding Solidity, deploying small contracts, and observing contract-call flows.

Remix is a Solidity IDE in the browser. It can write, compile, deploy, and debug contracts, making it suitable for onboarding, teaching, prototyping, and quick verification.

Its advantage is low setup cost; you do not need a full engineering project first. But real projects still need Git, test frameworks, deployment scripts, and CI, otherwise collaboration and reproduction become difficult.

You can treat Remix as a "contract lab." It is best for:

- quickly pasting Solidity code and checking whether it compiles
- deploying contracts in JavaScript VM or testnets and observing constructors, calls, and events
- using Deploy & Run to understand the difference between `read` and `write` calls

Remix is not a long-term replacement for an engineered repo. Once a project enters multi-person collaboration, contracts should move into a Git repository, with tests and deployment flows fixed through Hardhat or Foundry.

::: info Related Topic
- [Remix Documentation](https://remix-ide.readthedocs.io/): official docs for Remix workspaces, compiler, Deploy & Run, debugger, and plugins.
- [Remix Online IDE](https://remix.ethereum.org/): browser IDE for writing, compiling, and deploying Solidity contracts.
:::

### Hardhat

**Difficulty: Intermediate.** Hardhat fits JavaScript/TypeScript projects and connects contract development with tests, scripts, and frontend engineering.

Hardhat provides a local development network, compilation, testing, deployment scripts, and a plugin ecosystem. For frontend teams, it fits naturally with TypeScript, ethers, and CI.

The point of learning Hardhat is not memorizing commands. It is understanding how local chain, testnet, deployment scripts, contract verification, and environment variables form a complete development flow.

Hardhat is more like a "contract engineering framework." A typical repo includes:

- `contracts/`: Solidity source code.
- `test/`: TypeScript or Solidity tests.
- `ignition/` or `scripts/`: deployment modules and scripts.
- `hardhat.config.ts`: networks, compiler, plugins, and variable configuration.
- `artifacts/`: generated ABI, bytecode, and metadata.

If your project needs tight collaboration with frontend, backend, and CI, Hardhat usually makes the flow easier to stabilize than Remix alone.

::: info Related Topic
- [Hardhat Documentation](https://hardhat.org/docs): official docs; focus on getting started, testing, deploying, configuration variables, and contract verification.
:::

### Foundry

**Difficulty: Intermediate.** Foundry leans toward command line and Solidity-native testing, and is suited for intensive contract development and fast feedback.

Common Foundry tools include `forge`, `cast`, and `anvil`. It can write tests in Solidity, runs fast, and is useful for fuzz testing, script deployment, and on-chain state interaction.

If you care more about contract logic, test depth, and command-line workflow, Foundry is a very important tool.

Common Foundry entry points:

- `forge test`: run contract tests.
- `forge build`: compile contracts.
- `anvil`: start a local test chain.
- `cast call`: read on-chain contracts.
- `cast send`: send transaction calls to contracts.

It is especially good for training the habit of "write tests first, then change contracts." For safety-sensitive contracts, quickly running unit tests, fuzz tests, and fork tests is more reliable than clicking through a UI a few times.

::: info Related Topic
- [Foundry Book](https://book.getfoundry.sh/): official docs for `forge`, `cast`, `anvil`, fuzz testing, and fork testing.
:::

### OpenZeppelin

**Difficulty: Intermediate.** OpenZeppelin provides common contract standards and safety components, but does not replace review of business logic.

OpenZeppelin Contracts includes common modules such as ERC-20, ERC-721, AccessControl, Ownable, and Pausable. Mature libraries reduce duplicated work and avoid many basic implementation mistakes.

The danger is the illusion that "using a library means safe." Permission composition, upgrade patterns, parameter settings, external calls, and economic design can still fail.

A common example: you can use OpenZeppelin's ERC-20 implementation for a token, but you still decide who can mint, whether it can pause, whether ownership can transfer, and whether upgrade permissions have a timelock. These are product decisions the library does not make for you.

::: info Related Topic
- [Smart Contract](/en/handbook/web3/smart-contract/): first understand contract state, ABI, events, and upgrade risk.
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/): official contract library docs for ERC implementations, AccessControl, Ownable, Pausable, and other modules.
- [OpenZeppelin Upgrades](https://docs.openzeppelin.com/upgrades-plugins/): understand proxy upgrade flows and upgrade-risk boundaries.
:::

### viem / wagmi

**Difficulty: Intermediate.** viem and wagmi mainly solve frontend-chain interaction: reading contracts, writing contracts, managing accounts, handling networks, and caching.

viem is a TypeScript Ethereum interface library focused on type safety and low-level call capability. wagmi targets React applications and provides wallet connection, account state, contract reads/writes, and hooks.

When frontends connect to chains, the easiest issue is inconsistent state: wallet network, frontend config, contract address, RPC return values, and transaction pending state can all drift. Good SDKs reduce complexity, but they cannot design user flow for you.

In the frontend, separate at least four kinds of state:

- whether the wallet is connected
- which chain the user is currently on
- whether contract-read results are loading or stale
- whether a write transaction is waiting for signature, broadcasted, waiting for confirmation, succeeded, or failed

If these states are mixed into one button, users cannot tell whether they are "connecting wallet," "signing authorization," or "waiting for the transaction to land."

::: info Related Topic
- [viem Documentation](https://viem.sh/): learn TypeScript-based chain reads, call encoding, transaction sending, and on-chain data handling.
- [wagmi Documentation](https://wagmi.sh/): learn wallet connection, account state, contract reads/writes, and transaction-state management in React applications.
:::

## How a Concrete Toolchain Fits Together

Suppose you want to build a minimal voting contract. You can combine tools like this:

1. Write the first version of `Voting.sol` in Remix to confirm syntax and basic call flow.
2. Move the contract into a Hardhat or Foundry repo.
3. Write tests for creating votes, duplicate voting, vote ending, and non-admin operation failure.
4. Deploy to a local chain and record address and ABI.
5. Use viem or wagmi in the frontend: read candidates, initiate voting transaction, show pending and confirmed states.
6. After deploying to a testnet, verify source code in a block explorer and check whether events can be queried correctly.

This flow looks slower than "write a page and call the contract directly," but it exposes errors earlier. The time-consuming part of Web3 projects is often not writing the first version, but discovering after launch that the contract address is wrong, ABI does not match, permissions were not tested, or transaction states were not handled.

## Where It Fits in AI x Web3

AI can significantly improve Web3 development efficiency: explaining ABI, generating deployment scripts, adding tests, debugging failed transactions, and summarizing contract permissions. But once AI enters the dev stack, verification flow needs to be even clearer.

If an Agent can run `forge test`, read deployment config, call `cast`, or generate frontend contract-call code, it must be constrained by repo workflow, tests, permissions, and secret management. On-chain development is not ordinary code generation; high-risk commands require human confirmation.

## Minimum Practice

Build a minimal Web3 development chain:

1. Use Remix to deploy a tiny counter contract containing `count()`, `increment()`, and a `CountChanged` event.
2. Create a local project with Hardhat or Foundry, and write tests for initial value and state change after `increment()`.
3. Record contract address, ABI, deployment network, deployer account, and transaction hash.
4. Use viem or wagmi to read `count()` from the frontend, then initiate one `increment()` transaction.
5. Confirm in a block explorer or local logs that the event was emitted correctly.
6. Write down which information in this chain must enter version control, and which must stay in `.env` or secret management.

## Further Reading

- [Remix Documentation](https://remix-ide.readthedocs.io/): a browser-IDE entry point for Solidity compilation, deployment, and debugging.
- [Hardhat Documentation](https://hardhat.org/docs): learn TypeScript/JavaScript contract development, testing, and deployment.
- [Foundry Book](https://book.getfoundry.sh/): learn `forge`, `cast`, `anvil`, and Solidity-native testing workflows.
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/): see common contract standards, safety components, and access-control modules.
- [viem Documentation](https://viem.sh/): learn TypeScript-based chain reads, transaction sending, and contract calls.
- [wagmi Documentation](https://wagmi.sh/): learn wallet connection, account state, and contract interaction in React applications.
