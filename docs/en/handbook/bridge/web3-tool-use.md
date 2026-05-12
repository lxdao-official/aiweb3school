---
title: Web3 Tool Use
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/web3-tool-use/
---

# Web3 Tool Use

> Web3 Tool Use is the process of turning RPC, contract reads, transaction generation, wallet confirmation, block explorers, and DeFi operations into tools callable by Agents. What is truly difficult is not "being able to call," but permissions, parameters, simulation, and logs.

## Why Learn This

For AI Agents to enter Web3, they cannot rely solely on model-generated text. They need tools to read on-chain state, interpret contracts, estimate gas, generate transactions, request signatures, and query transaction results.

But the risks of Web3 tools are higher than ordinary query tools. Reading data wrong can mislead judgment; writing transactions wrong can change assets and permissions. Tool design must clarify which are read-only, which write to the chain, and which require user confirmation.

**The core of Web3 Tool Use is ensuring every on-chain action by an Agent has structured input, clear permissions, and auditable results.**

## First Principles

> **Models can choose tools, but tools must use deterministic boundaries to limit the model.**

Do not let Agents directly splice arbitrary calldata or call arbitrary addresses. Tools should encapsulate dangerous capabilities into restricted interfaces and check network, address, limits, methods, simulation results, and user confirmation before execution.

- **Read-write separation**: Reading on-chain state and sending transactions must be different tools with different permissions.
- **Structured parameters**: chain ID, contract address, method, args, value, and slippage cannot be buried in natural language.
- **Logs cannot be omitted**: Every tool call must record inputs, outputs, time, source, and errors.

## Knowledge Nodes

### RPC Tool

**Difficulty: Beginner.** RPC Tools are used to read chain state, query blocks, estimate gas, get logs, or broadcast transactions.

Read-only RPC tools can be opened more widely, such as for reading balances, block numbers, and contract view functions. Writing capabilities should be split out and cannot be mixed into an "all-purpose RPC" tool.

Tool returns should include: chain ID, RPC provider, block number, method, result, and error. This way, an Agent's answer can state which block's data it is based on.

### Contract Read

**Difficulty: Beginner.** Contract Read is calling contract view / pure functions, which do not change on-chain state.

It is suitable for reading balances, configuration, owners, allowance, pool status, price parameters, nonces, and whether it is paused. For Agents, this is the most commonly used and relatively low-risk Web3 tool.

But Contract Read can also mislead: reading the wrong network, the wrong contract, ABI mismatch, or lagging RPC data can all lead the model to generate suggestions based on incorrect facts.

### Contract Write

**Difficulty: Advanced.** Contract Write changes on-chain state and must undergo stricter simulation, permission, and confirmation.

Before writing a transaction, at least the following are needed:

- chain ID and target contract address;
- ABI method and args;
- value and token change estimation;
- gas estimation;
- simulation results;
- policy checks;
- user or Smart Account authorization;
- transaction hash and receipt tracking.

Agents should not directly possess "arbitrary contract writing" capabilities. A better practice is to restrict writing tools to whitelisted contracts, whitelisted methods, and amount policies.

### Wallet Tool

**Difficulty: Advanced.** Wallet Tool is responsible for connecting accounts, requesting signatures, generating transactions, managing authorizations, and returning user confirmation results.

The wallet tool is the most sensitive boundary. It must separate "connection," "signing messages," "sending transactions," "authorizing tokens," and "revoking authorizations" into different actions, and clearly display what the user is approving.

AI-generated transaction drafts should not bypass wallet confirmation. High-risk actions must return to the user, Smart Account policy, or multi-sig process.

### Explorer Tool

**Difficulty: Beginner.** Explorer Tool is used to query transactions, contract source code, events, token transfers, and address history.

The value of the explorer is providing verifiable evidence. Agents can use it to answer:

- Was this transaction successful?
- Which method was called?
- Which tokens were transferred out?
- Is the contract source code verified?
- Has there been an upgrade or permission change recently?

### DeFi Tool

**Difficulty: Advanced.** DeFi Tool encapsulates capabilities like swap, lending, authorization, position query, and liquidation risk for Agents.

This type of tool must be particularly careful because it directly affects assets. A DeFi tool should require at least:

- Protocol whitelist;
- Maximum transaction amount;
- Maximum slippage;
- Price source;
- Simulation;
- Allowance check;
- Manual confirmation or session key policy.

Do not give an Agent a general tool to "help me call any DeFi protocol."

### Tool Permission

**Difficulty: Advanced.** Tool Permission defines which tools an Agent can call, under what conditions, and what parameters it can pass.

Permissions can be layered by tool, contract, method, amount, time, frequency, and user confirmation level. For example:

- Query balance: Automatically allowed;
- Generate transaction draft: Automatically allowed;
- Small whitelist payment: Allowed by session key;
- Large transfer or authorization: Must have manual confirmation;
- Arbitrary contract call: Prohibited by default.

### Tool Log

**Difficulty: Intermediate.** Tool Log is the foundation for Agent behavior auditability.

Every tool call records at least: user goal, tool name, input parameters, output result, error, time, chain ID, block number, transaction hash, confirmer, and policy judgment.

When an Agent makes a mistake, logs can answer: what the model saw, what it called, what the tool returned, whether the system intercepted it, and what the user confirmed.

## Where It Fits in AI x Web3

Web3 Tool Use is the key layer for moving from "AI can interpret on-chain information" to "AI can participate in on-chain execution." It connects Chain-aware Context, Agent Workflow, and Agent Wallet.

If the tool is read-only, the risk is mainly interpretation error; if the tool can write to the chain, the risk enters the asset and permission layer. The closer it is to execution, the more it needs policy, simulation, human check, and logs.

## Minimum Practice

Design a set of Agent Web3 tools:

1. Write a read-only tool: Read the ETH balance of an address on a certain chain.
2. Write a contract read tool: Read ERC-20 `allowance(owner, spender)`.
3. Write a transaction draft tool: Generate ERC-20 `approve` calldata but do not send the transaction.
4. Write a permission rule for a write transaction tool: Allow only specific tokens, specific spenders, and a maximum amount.
5. Define input schema, output fields, error types, and log fields for each tool.

The focus is not on implementing all tools immediately, but on distinguishing "read, write, sign, confirm, and record."

## Further Reading

- [OpenAI Tools Guide](https://platform.openai.com/docs/guides/tools): Understand how models call external tools and receive structured results.
- [Ethereum JSON-RPC API](https://ethereum.org/en/developers/docs/apis/json-rpc/): Understand how Web3 tools read the chain and send transactions at the base layer.
- [MetaMask Wallet Docs](https://docs.metamask.io/wallet/): Learn about wallet connection, signing, transaction requests, and provider APIs.
- [viem Documentation](https://viem.sh/): Suitable for implementing type-safe contract reads/writes and transaction tools.
- [Tenderly Simulations](https://docs.tenderly.co/simulations): Learn how to simulate execution results before transactions are sent.
