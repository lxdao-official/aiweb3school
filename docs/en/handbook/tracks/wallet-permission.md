---
title: Wallet and Permission
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/tracks/wallet-permission/
---

# Wallet and Permission

> Once an AI Agent can operate a wallet for a user, the product question changes from "can it complete the task" to "what exactly is it allowed to do." A wallet is not a signature popup. It is the permission boundary for an Agent's execution capabilities.

## Why Explore This

The most dangerous part of AI x Web3 products is not that the model may say something wrong. It is that a wrong judgment can become a real on-chain operation. An incorrect authorization, transfer, swap, or contract call usually cannot be rolled back like a normal web app action.

Wallets and permissions are therefore infrastructure for every execution-oriented Agent. They determine:

- Whether the Agent can only read data or can also generate transactions.
- Whether users can understand what they authorized.
- Whether permissions have limits by amount, time, target contract, and function scope.
- Whether permissions can be revoked, frozen, or recovered when the Agent makes a mistake.
- Whether high-risk actions must require human confirmation or multisig confirmation.

## First Principles

> **An Agent should not own a "wallet." It should only hold a set of capabilities that are limitable, auditable, and revocable.**

Giving a private key to an Agent is the most fragile design. A stronger approach is to let the wallet, smart account, or permission module hold assets and execution authority. The Agent only proposes intent, generates candidate transactions, requests limited permissions, and triggers actions when rules allow.

- **Permissions must be more specific than intent**: do not write only "help me manage funds"; restrict asset, amount, contract, function, time, and frequency.
- **Signing must be understandable**: the user should not see calldata only, but asset changes, authorized party, maximum loss, and failure path.
- **Revocation is a default capability**: any long-lived permission should be viewable, pausable, and revocable by the user.

## Knowledge Nodes

### AI Wallet UX

The core of AI Wallet UX is not connecting a chat box to a wallet. It is letting users know what the Agent is doing, why it is doing it, and what will happen next.

A qualified AI wallet interface should show at least:

- User objective: which task the Agent is currently executing.
- Action plan: what it will read, generate, and call next.
- Permission request: which assets, contracts, functions, and time ranges it needs.
- Transaction explanation: how assets and state will change after signing.
- Risk warning: what could be lost in the worst case.
- Revocation entry point: how the user can stop the Agent or withdraw permissions.

**The experience goal of an AI wallet is not "fewer confirmations," but making confirmations meaningful.**

::: info Related Topic
- [Agent Wallet](/en/handbook/bridge/agent-wallet/): Understand wallets, signatures, and execution boundaries from the Agent perspective.
- [Vitalik: What I would love to see in a wallet](https://vitalik.eth.limo/general/2024/12/03/wallets.html): Understand how wallets should help users understand transactions, permissions, and security.
:::

### Permission Policy

Permission Policy is a set of rules for the system execution layer, not a wish written for the user. It should be program-checkable, rather than relying only on the model to behave.

Common policy dimensions include:

- Asset scope: allow only USDC, not ETH or NFTs.
- Amount limits: per-transaction, daily, weekly, and total limits.
- Target contracts: only allow calls to whitelisted protocols.
- Function scope: allow `swapExactTokensForTokens`, but not arbitrary `approve`.
- Price and slippage: require reconfirmation above a threshold.
- Time window: permissions automatically expire after a few hours or days.
- Rate limits: prevent the Agent from executing continuously in a short period.

AI can help draft a policy, but final execution must be checked by a wallet, smart account, backend guard, or contract module.

### Session Key Flow

A Session Key is a restricted key used temporarily for a specific task. It fits low-risk, high-frequency, limitable operations such as game actions, small payments, repeated queries, and limited trades.

A basic flow:

1. The user creates a session key with the main wallet.
2. At the same time, the user sets the permission scope, such as target contract, amount, time, and function.
3. The Agent uses the session key to initiate operations that comply with the rules.
4. The wallet or smart account checks the policy.
5. After the permission expires, the limit is used up, or the user manually revokes it, the session key becomes invalid.

The value of a session key is reducing repeated signatures, but it cannot bypass risk control. If the amount is too large, the duration too long, or the function scope too broad, it is just main-wallet risk under another name.

::: info Related Topic
- [ERC-4337 Docs](https://docs.erc4337.io/): Understand how smart accounts, UserOperation, bundlers, and paymasters form the account abstraction flow.
- [ERC-7579](https://eips.ethereum.org/EIPS/eip-7579): Learn how modular smart accounts extend permission and execution modules.
:::

### Safe Guard

A Guard is a checker before transaction execution. It does not care why the model recommended the transaction. It only cares whether the transaction complies with the rules.

In Agent scenarios, a guard can check:

- Whether the target address is on the whitelist.
- Whether the calldata calls an allowed function.
- Whether token approval exceeds the limit.
- Whether swap slippage is too high.
- Whether the receiving address belongs to the user or an explicitly authorized party.
- Whether the transaction simulation result matches expectations.
- Whether the operation frequency is abnormal.

The design principle of a Guard is: **use deterministic rules to block actions that should not happen, and use human confirmation for gray areas that rules cannot cover.**

### ERC-4337 Workflow

ERC-4337 turns account abstraction into a process around `UserOperation`. For Agent products, its value is that a user account can be more than an EOA private key. It can be a programmable smart account.

A simplified ERC-4337 workflow:

1. The Agent generates transaction intent or a candidate call.
2. The frontend or backend wraps it as a `UserOperation`.
3. The smart account checks signature, nonce, permissions, and execution logic.
4. The bundler packages the UserOperation and submits it to the EntryPoint.
5. The paymaster can pay gas according to rules.
6. After on-chain execution, the system records the result and failure reason.

This matters for AI Agents because permissions, gas, batch execution, and recovery logic can move into the account layer instead of being stuffed into model prompts.

### Pre-transaction Simulation

Simulating a transaction before signing is a required baseline for Agent wallets. Model explanations of calldata can only assist. Real safety judgment needs simulation results.

Simulation should try to answer:

- Which token balances this transaction will change.
- Which approvals it will create.
- Which contracts it will call.
- Whether it may fail or revert.
- Whether price, slippage, and fees are within expectations.
- Whether additional risks will be triggered after execution, such as unlimited approval.

Simulation results need to be translated into human-understandable language, but they cannot be improvised by the model. Key fields should come from structured parsing and on-chain simulation, not only natural-language summarization.

### Recovery / Revocation

Once an Agent is given permissions, recovery and revocation must be designed.

Users should be able to see in one place:

- Which Agents or session keys currently exist.
- Which assets and contracts each permission can operate.
- How much of each limit has already been used.
- When each permission expires.
- Which actions were executed recently.
- How to pause, revoke, rotate, or recover the account.

In higher-value scenarios, guardian, multisig, delayed execution, social recovery, hardware wallet confirmation, and abnormal freeze mechanisms also need to be considered. Do not wait until an incident happens to add these entry points.

## Position in AI x Web3

Wallets and permissions are the foundation of execution-oriented Agents. Without a permission layer, Agents can only answer questions and make suggestions. If the permission layer is wrong, Agents directly threaten asset safety.

A reliable product usually opens capabilities gradually by risk:

- Stage 1: read-only wallet and on-chain data.
- Stage 2: generate transaction drafts, but require manual signing.
- Stage 3: small-value, whitelisted, short-lived session keys.
- Stage 4: more complex automation, but with guards, audits, and revocation.

## Minimal Practice

Design a permission strategy for an "AI automatic small-swap assistant."

Write down:

- The allowed tokens, target DEX, maximum amount per transaction, and daily limit.
- Which functions are allowed and which are forbidden.
- The validity period and revocation method for the session key.
- Which fields transaction simulation needs to show.
- Which situations must request user confirmation again.
- How execution logs let the user review actions.

## Further Reading

- [ERC-4337 Documentation](https://docs.erc4337.io/): Understand the standard account abstraction workflow and development components.
- [EIP-4337](https://eips.ethereum.org/EIPS/eip-4337): Read the original specification for UserOperation, EntryPoint, bundlers, and paymasters.
- [EIP-7579](https://eips.ethereum.org/EIPS/eip-7579): Learn how modular smart accounts support plugin-style permissions.
- [Safe Docs](https://docs.safe.global/): Learn how multisigs, modules, and guards are designed in real wallet systems.
- [OpenZeppelin Defender](https://docs.openzeppelin.com/defender): Understand deployment, monitoring, automation, and security operations tools.
