---
title: Security
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/web3/security/
---

# Security

> Web3 security is not asking someone to audit code once before launch. It is a full engineering process from contract design, permissions, tests, transaction simulation, monitoring, emergency pause, to permission revocation.

## Why Learn This

The cost of errors in on-chain systems is higher than in ordinary applications. Once a contract is deployed, assets may already be inside the protocol, attackers can directly interact with public interfaces, and transaction execution results usually cannot be casually rolled back.

Security is not only the auditor's job. Product, frontend, backend, contracts, operations, and AI Agents all affect safety boundaries: a wrong authorization button, an unlimited approval, an unrestricted Agent tool, or an unsimulated transaction can all become incident entry points.

**The core of Web3 security is not "having no bugs," but blocking predictable risks as much as possible before execution and quickly discovering and containing damage after execution.**

## First Principles

> **On-chain systems are exposed to a public adversarial environment by default, and every callable path should be treated as attack surface.**

Ordinary backends can rely on permissions, network isolation, manual rollback, and database repair. Contracts are different: code is public, state is public, funds are public, and attackers can repeatedly simulate and front-run.

- **Permissions must be minimized**: owner, admin, upgrade, pause, and withdraw all need clear boundaries.
- **Simulate before execution**: whether a transaction can succeed, which assets it changes, and which contracts it calls should be seen in advance whenever possible.
- **Monitor after launch**: security does not end at deployment; abnormal transfers, parameter changes, failed transactions, and price movements need continuous observation.

## Knowledge Nodes

### Reentrancy

**Difficulty: Intermediate.** Reentrancy is a classic vulnerability where a contract is called again before an external call has finished, allowing state to be reused repeatedly.

The most common pattern is: a contract transfers funds to an external address or calls an external contract before updating internal balances. A malicious contract can re-enter the original function in the callback and withdraw repeatedly before the balance is zeroed.

Defense ideas include:

- Use Checks-Effects-Interactions: check first, update state second, make external calls last.
- Use reentrancy guards on high-risk functions.
- Avoid calling untrusted contracts before state is updated.
- Test multi-contract interactions, not only single functions.

::: info Related Topic
- [Solidity Security Considerations](https://docs.soliditylang.org/en/latest/security-considerations.html): official security notes covering reentrancy, gas, randomness, and contract interaction risks.
- [OpenZeppelin Utils](https://docs.openzeppelin.com/contracts/5.x/api/utils): see common security utilities such as `ReentrancyGuard` and `Pausable`.
:::

### Access Control

**Difficulty: Intermediate.** Access Control determines who can execute sensitive actions. It is one of the most common and underestimated parts of contract security.

Sensitive actions include mint, burn, pause, upgrade, withdraw, setOracle, setFee, setRouter, and changeOwner. Any overly broad permission can let admins or attackers rewrite protocol rules.

When checking permissions, do not only ask "is there `onlyOwner`?" Ask further:

- Is the owner an EOA, multisig, or governance contract?
- Is there a timelock?
- Can roles grant each other?
- Are permission changes emitted as events?
- Who controls emergency pause and resume?
- What is the worst outcome if the private key leaks?

### Audit

**Difficulty: Intermediate.** Audit is external security review, not a safety certificate.

Audits can find problems in design, implementation, and tests, but they cannot guarantee a protocol is always safe. Audit scope, code version, dependency version, deployment parameters, upgrade permissions, and post-launch changes all affect conclusions.

When reading an audit report, check at least:

- which commits and contracts were covered
- which issues were fixed and which risks the project accepted
- whether economic mechanisms and external dependencies were covered
- whether it includes test suggestions and deployment notes
- whether deployed code matches audited code

### Simulation

**Difficulty: Intermediate.** Simulation is a transaction rehearsal before sending, used to discover execution failure, abnormal asset changes, and permission overreach.

Before a user or Agent signs, the system can simulate the transaction: which contract is called, which tokens will move out, what will be received, approximate gas, whether it reverts, and whether approval changes are triggered.

Simulation cannot replace security audits, because real chain state may change before the transaction is included. But it can block many obvious errors: wrong chain ID, wrong contract address, abnormal approval amount, excessive slippage, insufficient balance, or unexpected method calls.

::: info Related Topic
- [Tenderly Simulations](https://docs.tenderly.co/simulations): learn how transaction simulation, asset changes, and execution trace help debugging and risk control.
:::

### Monitoring

**Difficulty: Advanced.** Monitoring is the post-launch security awareness layer, used to discover anomalies and trigger responses.

On-chain monitoring can watch:

- large transfers or withdrawals
- admin permission changes
- contract upgrades
- oracle price anomalies
- many failed transactions
- rapid TVL outflows
- unexpected events
- Agents repeatedly triggering high-risk tools

Monitoring alone is not enough. What works is "monitoring + response": who receives alerts, who can pause, who confirms false positives, and what the recovery flow is.

## Where It Fits in AI x Web3

AI makes security boundaries more complex. Agents can explain contracts, generate transactions, call tools, and execute strategies, but they may also misread context, be affected by Prompt Injection, call the wrong tool, or generate dangerous transactions.

So AI x Web3 security design should separate model output from on-chain execution: models can suggest, tools return facts, policies limit permissions, simulation rehearses results, human check confirms high-risk actions, and monitoring records execution consequences.

## Minimum Practice

Build a transaction security checklist:

1. Choose a public contract-call transaction.
2. Inspect from, to, method, value, token transfers, logs, and gas used.
3. Judge whether this transaction changes permissions, assets, or key protocol parameters.
4. Write which simulation and human checks are needed if this transaction is initiated by an Agent.
5. Write which events or anomaly metrics should be monitored after launch.

## Further Reading

- [Solidity Security Considerations](https://docs.soliditylang.org/en/latest/security-considerations.html): official security notes for building contract-security foundations.
- [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x): learn common security components, access control, and standard contract implementations.
- [OpenZeppelin Utils](https://docs.openzeppelin.com/contracts/5.x/api/utils): see utilities such as `ReentrancyGuard`, `Pausable`, and `Nonces`.
- [Ethereum Smart Contract Security](https://ethereum.org/en/developers/docs/smart-contracts/security/): understand common security practices from Ethereum developer docs.
- [Tenderly Simulations](https://docs.tenderly.co/simulations): learn how transaction simulation and execution traces help diagnose risk.
