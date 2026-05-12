---
title: Agent Wallet
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/agent-wallet/
---

# Agent Wallet

> An Agent Wallet is not as simple as "giving an AI a wallet private key." The real problem to solve is: what on-chain actions can the Agent perform on behalf of the user, whether these actions have limits on amount, time, object, and risk, and when the user must re-confirm.

## Why Learn This

When an Agent only answers questions in a chat window, the cost of error is usually controllable.
But when it starts connecting wallets, generating transactions, calling contracts, and paying service fees, the question becomes: can this Agent spend money, how much can it spend, to whom, can it modify authorizations, and how can it be stopped if something goes wrong?

This is the core of what an **Agent Wallet** handles.

It is not designed to let AI completely take over a user's assets, but to allow users to delegate a small, revocable, and auditable portion of permissions to the Agent. Only then can the Agent perform truly useful tasks, such as automatically paying API call fees, submitting low-risk transactions, executing fixed strategies, or completing a set of on-chain operations after user confirmation.

Without this layer of wallet and permission design, many AI x Web3 projects get stuck between two extremes:

- **The Agent can only give suggestions, not execute**: The product looks smart but always stops at "generating a plan."
- **Permissions are too broad, risks are unacceptable**: The demo is smooth, but real users dare not entrust their assets.

Agent Wallet seeks the middle path: **allowing the Agent to execute, but only within the boundaries pre-permitted by the user.**

## First Principles

The first principle of an Agent Wallet can be compressed into one sentence:

> **Control cannot be handed over to a probabilistic system. Agents can only be given verifiable, restricted, and revocable action spaces.**

The key here is not "distrusting AI," but acknowledging that an Agent's judgment comes from models, context, and tool return values. It might be helpful, but it could also be misled by misinformation, malicious documents, or incomplete states.
Therefore, the design focus of an Agent Wallet is not to make the Agent more like a "human wallet user," but to turn its scope of action into rules that both the account and the system can check.

From this principle, three main points follow:

- **Agents do not directly control primary assets**: Models can generate plans and transaction drafts, but they should not have the user's primary private key. High-risk actions must be returned to the human for confirmation.
- **A wallet is not just a signature button, but a permission system**: It must express time, amount, contracts, methods, assets, recipients, and revocation conditions, turning vague authorizations into checkable rules.
- **Automation must be bound to revocation capability**: Users must always be able to see what permissions the Agent has, what it has done, what it can still do, and where to turn it off.

## Knowledge Nodes

### AA Wallet

**Difficulty: Intermediate.** First, understand how Account Abstraction allows accounts to express rules rather than being controlled solely by a private key.

AA Wallet usually refers to wallet designs based on Account Abstraction. Its focus is not on changing the wallet interface, but on giving the account itself more flexible rules.

Traditional EOA wallets are more like **one private key controlling one account**. An AA Wallet can place logic for signatures, permissions, gas payments, recovery, multi-sig, limits, session keys, etc., into the account rules.

For Agents, the key to AA Wallet is not that the "wallet is more advanced," but that the account can finally express rules: **who can operate, what can be operated, when it expires, and what to do if boundaries are exceeded.**

::: info Related Topic
- [Account Abstraction](/en/handbook/web3/account-abstraction/): Understand the difference between AA and regular wallet accounts.
- [ERC-4337 Documentation](https://docs.erc4337.io/core-standards/erc-4337): Continue to look at `UserOperation`, EntryPoint, Bundler, and Paymaster.
:::

### Smart Account

**Difficulty: Intermediate.** Smart Account is the execution boundary for the Agent Wallet, carrying permissions, recovery, and automation via contract rules.

A Smart Account can be understood as a "wallet account with rules."

It does more than just store assets; it can also define:

- Who can initiate operations
- Which operations require user confirmation
- Which contracts can be called
- The maximum amount that can be spent per day
- When permissions automatically expire
- How to pause in case of anomalies

If an Agent is to do something automatically, a Smart Account is often more suitable for carrying these boundaries than a regular private key account.

To judge whether an Agent Wallet is reliable, look at whether it breaks down "authorizing the Agent" into **checkable rules** rather than a vague "allow automatic operations."

::: info Related Topic
- [Wallet](/en/handbook/web3/wallet/): Brush up on basic concepts of wallets, signatures, and accounts.
- [Safe Modules](https://docs.safefoundation.org/smart-account/modules): See how smart accounts support automation and custom authorization through modules.
:::

### Safe

**Difficulty: Intermediate.** Safe is suitable for understanding how teams, DAOs, and high-value accounts use multi-sig and modules to decentralize execution power.

Safe is a very common multi-sig and smart account infrastructure in Web3. Many team treasuries, DAO funds, and high-value accounts use Safe for management.

In an Agent context, the value of Safe lies in its natural suitability for splitting execution power rather than letting one Agent or one person control all assets alone.

For example, an Agent can generate transaction drafts or trigger a low-risk module, but multi-sig members still need to confirm when transferring funds, upgrading contracts, or making large payments. In this way, the Agent participates in the process without having exclusive final control.

This is especially important for teams and DAOs: **Agents can improve efficiency, but they should not bypass governance and multi-sig.**

::: info Related Topic
- [Governance AI](/en/handbook/bridge/governance-ai/): Understand why Agents need more approval and logging when entering governance processes.
- [Safe Guards](https://docs.safe.global/advanced/smart-account-guards): See how Safe performs rule checks before and after transaction execution.
:::

### Session Key

**Difficulty: Advanced.** Session Keys are key to allowing Agents to automatically perform low-risk actions, but they must be limited by time, amount, target, and method.

A Session Key can be understood as a temporary, limited-permission key.

Users don't want to manually sign every small operation, but they also can't give their primary private key to the Agent. A Session Key finds a balance between the two: allowing the Agent to automatically perform certain actions within a specified range for a period of time.

A qualified session key should at least restrict:

- Validity period
- Contracts or methods that can be called
- Individual transaction amount and total limit
- Types of tokens or assets that can be operated
- Whether transfers to external addresses are allowed
- Whether it can be revoked by the user at any time

The most critical judgment here is: **A Session Key is not a sub-private key, but a set of restricted capabilities.**

::: info Related Topic
- [Rhinestone Smart Sessions](https://docs.rhinestone.dev/smart-wallet/smart-sessions/overview): See how session keys combine protocol restrictions, limits, and expiration times.
:::

### Policy

**Difficulty: Advanced.** Policies write "what the Agent can do" into rules that the system can check.

A Policy is a rule that an Agent must follow when performing on-chain actions.

Don't just think of a policy as a piece of legal text. For an Agent Wallet, it should ideally become a condition that the system can check, such as:

- Maximum payment of 10 USDC per day
- Only whitelisted contracts can be called
- Only swaps can be executed, no infinite allowance for approvals
- Stop if price slippage exceeds 1%
- Any NFT transfer out must be manually confirmed

The clearer the policy, the more controllable the Agent's execution space. Vague requests like "help me perform low-risk operations" are not suitable for direct translation into on-chain permissions.

A good policy should allow the system to answer: **Did this operation cross the line?**

::: info Related Topic
- [AI Security](/en/handbook/bridge/ai-security/): Continue to look at Prompt Injection, tool permission isolation, and behavior auditing.
:::

### Guard

**Difficulty: Advanced.** Guards are deterministic intercept layers responsible for rejecting transactions or tool calls that do not comply with the policy.

A Guard is a pre-execution check layer used to block actions that do not comply with rules.

An Agent might generate a transaction that shouldn't be sent due to model misjudgment, tool errors, Prompt Injection, or context contamination. The role of a Guard is to check one more time with deterministic rules before the transaction actually goes out.

It can check:

- Whether the target address is in the whitelist
- Whether the called method is allowed
- Whether the amount exceeds the limit
- Whether the authorized amount is abnormal
- Whether transaction simulation results meet expectations
- Whether the current market state has changed

Note the division of labor here: **The Agent can be responsible for generating candidate actions, but the Guard must be responsible for rejecting actions that exceed boundaries.**

::: info Related Topic
- [Safe Guards](https://docs.safe.global/advanced/smart-account-guards): See the position of Guards in pre- and post-transaction checks.
:::

### Simulation

**Difficulty: Intermediate.** Simulation is used to preview transaction results before signing and broadcasting, reducing the probability of erroneous execution.

Simulation is the preview of results a transaction might produce before it is sent.

After an Agent generates a transaction, it shouldn't just throw the calldata to the user for signing. A better experience is to translate simulation results into something a human can understand:

- How many tokens you will pay
- What you will receive
- Which authorizations will change
- Which contract will be called
- What costs might be lost upon failure
- Whether this transaction is consistent with the user's original goal

Simulation cannot guarantee 100% safety, but it can expose many obvious errors in advance.

Especially in Agent scenarios, simulation is not just a technical check, but also an entry point for user understanding and confirmation. It shouldn't just answer "can the transaction be sent," but rather: **what will the user lose, gain, and what risks will they take with this transaction.**

::: info Related Topic
- [Tenderly Simulation API](https://docs.tenderly.co/): See transaction simulation, asset changes, gas estimation, and state overrides.
:::

### Revocation

**Difficulty: Intermediate.** Revocation focuses on how permissions can be timely reclaimed by the user or the system.

Revocation is the withdrawal of permissions.

Many people only think about "how to authorize" when designing Agent permissions, but the truly important part is "how to reclaim." Users should be able to clearly see what permissions are currently given to the Agent and turn them off at any time.

It is particularly important to note that revocation should not only happen during active user operations. The system can also automatically tighten permissions in these situations:

- Session key expires
- Limit is used up
- Multiple transaction failures
- Anomalous target address detected
- Agent behavior deviates from the original task
- User has not confirmed for a long time

A simple but important product principle: **All automated permissions should have a closing entry point visible to the user.**

### Human Check

**Difficulty: Beginner.** Human Check is not about manually confirming every step, but about letting the user understand and decide at key risk points.

Human Check is not about throwing everything back to the user for manual confirmation. That would defeat the purpose of an Agent.

A more reasonable approach is layering:

- Low-risk, reversible, small-amount actions: can be executed automatically
- Medium-risk actions: simulate first, then let the user confirm
- High-risk, irreversible, externally visible actions: must clearly show impact and require user confirmation
- Actions exceeding policy: reject directly instead of asking the user "do you want to continue"

A good Human Check should let the user understand what they are approving, rather than just seeing a string of hashes, contract addresses, and a "Confirm" button.

The real thing to confirm is not "do you want to sign," but: **what will this action change, where is the risk, and why is your confirmation needed now.**

::: info Related Topic
- [Agent Workflow](/en/handbook/bridge/agent-workflow/): Understand which steps are suitable for automatic execution and which need a human-in-the-loop.
:::

## Position in AI x Web3

Agent Wallet sits at a critical junction in AI x Web3.

AI is responsible for **understanding goals, organizing context, and generating plans**; Web3 wallets are responsible for **identity, assets, signatures, and on-chain execution**. The Agent Wallet connects these two sides without letting the model bypass user control.

A stable pipeline usually looks like this:

1. User provides goals and constraints
2. Agent reads context and generates a plan
3. System converts the plan into restricted transactions or operations
4. Guards and simulations check for risks
5. User confirms critical actions
6. Smart Account or Safe executes
7. Logs record what the Agent has done

The most common point of failure is between step 3 and step 6.
Many projects make "model-generated plans" very smooth but fail to handle **transaction simulation, permission validation, revocation entry points, and audit logs** seriously. As a result, the demo looks like automation, but real usage lacks sufficient security boundaries.

## Minimal Practice

A minimal exercise for creating an "Agent-restricted payment wallet."

The scenario can be simple: a user allows an Agent to spend a maximum of 5 USDC per day to pay for a whitelisted API or tool service. The Agent can automatically complete small payments but cannot transfer funds to arbitrary addresses or modify authorizations.

You need to clearly specify or implement:

- User-authorized limits, time, and target addresses
- Operations the Agent can perform automatically
- Which operations must be manually confirmed
- How to simulate and display results before a transaction is sent
- How the system rejects when policy is exceeded
- Where users view and revoke current permissions
- How to leave an auditable record for each payment

The focus of this exercise is not to build a complex wallet, but to connect these four things: "limited authorization, automatic execution, anytime revocation, and traceability."

Upon completion, you should at least be able to demonstrate a comparison:

- Normal case: Agent automatically pays within the limit and leaves a record.
- Over-limit case: Agent tries to pay 6 USDC and is rejected by the policy.
- Anomalous case: Target address is not in the whitelist and is intercepted by the Guard.
- User action: User manually revokes the session key, and the Agent loses execution capability.

## Extended Reading

- [EIP-4337: Account Abstraction Using Alt Mempool](https://eips.ethereum.org/EIPS/eip-4337): The original standard, suitable for seeing underlying concepts like `UserOperation`, EntryPoint, and validation/execution separation.
- [ERC-4337 Documentation](https://docs.erc4337.io/core-standards/erc-4337): More beginner-friendly than the EIP, explaining Bundler, Paymaster, UserOperation, and security check processes.
- [Safe Modules](https://docs.safefoundation.org/smart-account/modules): Understand how Safe supports extended capabilities like automation, limits, and whitelists through modules.
- [Safe Guards](https://docs.safe.global/advanced/smart-account-guards): Understand how Guards perform checks before and after transaction execution, and why Guards themselves need auditing and recovery mechanisms.
- [Rhinestone Smart Sessions](https://docs.rhinestone.dev/smart-wallet/smart-sessions/overview): Suitable for learning how session keys express composable on-chain permissions, such as protocol restrictions, limits, and expiration times.
- [Tenderly Simulation API](https://docs.tenderly.co/): See transaction simulation, asset changes, gas estimation, and state overrides to understand why Agents need to simulate transactions after generating them.
