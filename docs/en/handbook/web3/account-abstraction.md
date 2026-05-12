---
title: Account Abstraction
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/web3/account-abstraction/
---

# Account Abstraction

> Account Abstraction releases "how an account verifies operations, who pays gas, and which permissions can execute automatically" from the fixed EOA model, making wallets more like programmable account systems.

## Why Learn This

Ordinary EOA wallets have clear limits: users must manage private keys, must pay gas with the native token, signatures are coarse-grained, automation is hard, and recovery experience is unfriendly.

Account Abstraction tries to turn accounts into smart contracts so accounts can define their own verification logic and execution policies. This can support multisig, social recovery, gas sponsorship, session keys, spending limits, batched transactions, and finer-grained permissions.

**The core of account abstraction is not "gasless transactions," but expanding account control from a single private key into programmable rules.**

## First Principles

> **When the account itself is programmable, permission can move from "has private key / no private key" to "what action is allowed under what condition."**

This is especially important for AI x Web3. An Agent should not hold the user's main private key, and should not have unlimited transaction permission. A better approach is to give the Agent an action space that is limitable, expirable, revocable, and auditable.

- **Verification logic is customizable**: accounts can verify operations with multisig, Passkeys, social recovery, or module rules.
- **Payment logic is customizable**: gas can be paid by the user, the application, a paymaster, or another asset.
- **Permissions can be minimized**: session keys can allow only specific contracts, amounts, time windows, and methods.

## Knowledge Nodes

### ERC-4337

**Difficulty: Intermediate.** ERC-4337 is one of the most important account-abstraction standards in the Ethereum ecosystem. It uses an alt mempool and EntryPoint to implement smart-account transaction flow.

In ERC-4337, users do not directly send ordinary transactions. They create a `UserOperation`. Bundlers collect these operations and submit them to the on-chain EntryPoint contract. EntryPoint then calls the smart account's validation and execution logic.

A simplified flow:

1. The user or application generates a `UserOperation`.
2. The smart account validates signature, nonce, balance, or policy.
3. The Bundler packages and submits the operation.
4. EntryPoint calls the account to execute the target action.
5. A Paymaster may sponsor gas.

::: info Related Topic
- [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337): the standard text for understanding `UserOperation`, EntryPoint, Bundler, and Paymaster.
- [ERC-4337 Documentation](https://docs.erc4337.io/): developer docs for account-abstraction components and ecosystem implementations.
:::

### Smart Account

**Difficulty: Intermediate.** A Smart Account is an account controlled by a contract. It can put permissions, recovery, batched execution, and policies into account logic.

EOA validation logic is basically fixed: whoever has the private key can sign. A Smart Account can define:

- large transfers require multiple signatures
- small transactions can pass automatically
- certain dApps can call within a limited allowance
- lost wallets can be recovered through guardians or devices
- transactions can be batched to reduce user confirmations

Risk also increases. The smart account itself is a contract, so contract bugs, module permissions, upgrade logic, and external dependencies all become account risks.

::: info Related Topic
- [Wallet](/en/handbook/web3/wallet/): first understand EOA, signatures, transactions, and gas in the basic experience.
- [Smart Contract](/en/handbook/web3/smart-contract/): a Smart Account is also a contract system managing assets and permissions.
:::

### Bundler

**Difficulty: Intermediate.** A Bundler collects `UserOperation`s, simulates validation, and submits them to EntryPoint.

In ERC-4337, a Bundler is similar to a transaction packaging service, but it handles `UserOperation`s rather than ordinary transactions directly sent by wallets. A Bundler needs to judge whether an operation is valid, whether it can pay gas, and whether it will fail during execution.

For applications, Bundler is an infrastructure dependency. If the Bundler is unstable, user operations may get stuck. If simulation is insufficient, failed operations cause experience and cost problems.

### Paymaster

**Difficulty: Intermediate.** Paymaster allows a third party to pay gas for user operations, or lets users bear fees with non-native assets.

Paymaster is often used for onboarding: new users without ETH can still complete their first operation. It can also be used for campaign subsidies, subscriptions, whitelisted transactions, or in-app gas abstraction.

But Paymaster is not free lunch. It needs risk control:

- Which methods are sponsored?
- What is each user's limit?
- Are target contracts restricted?
- How are spam and arbitrage prevented?
- Who bears the cost of failed operations?

### Session Key

**Difficulty: Advanced.** A Session Key is temporary permission for an application or Agent, and should not be treated as the user's main private key.

A Session Key can be limited by time, contract, method, spending amount, and chain.

This is a key basis for Agent Wallets. You do not want an AI Agent to interrupt users for signatures every time, and you do not want it to have unlimited permissions. Session Keys provide a middle state: the Agent can automatically execute low-risk actions, while high-risk actions still require user confirmation.

## Where It Fits in AI x Web3

Account Abstraction is an important base for AI Agents executing on-chain. Without account abstraction, Agents often remain at "give suggestions" or "ask users to sign every step." With Smart Accounts, Paymasters, and Session Keys, Agents can execute automatically within a constrained scope.

But the more automated it becomes, the clearer the policy must be: what can be called, what the amount limit is, when it expires, who can revoke it, where logs are stored, and how failure is handled. Account abstraction does not make AI freer; it wraps AI freedom in rules.

## Minimum Practice

Design an Agent Session Key policy:

1. Choose a concrete scenario, such as "rebalance a small amount of testnet assets at most once per hour."
2. Specify allowed contract addresses and methods.
3. Set amount limits, expiration time, chain ID, and maximum transaction count.
4. Write which actions must return to the user's wallet for confirmation.
5. Explain how to revoke the session key and audit what it executed.

The point is not to deploy a full AA wallet immediately, but to learn how to split permission from "allow everything" into verifiable rules.

## Further Reading

- [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337): the account-abstraction standard text.
- [ERC-4337 Documentation](https://docs.erc4337.io/): understand EntryPoint, Bundler, Paymaster, and Smart Account from a developer perspective.
- [Ethereum Account Abstraction](https://ethereum.org/en/roadmap/account-abstraction/): understand why account abstraction matters from the Ethereum roadmap perspective.
- [Safe Smart Accounts](https://docs.safe.global/): learn how multisig and smart accounts are used in real projects.
- [Rhinestone Smart Sessions](https://docs.rhinestone.dev/smart-wallet/smart-sessions/overview): learn session keys, permission policies, and modular smart-account design.
