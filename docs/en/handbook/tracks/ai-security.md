---
title: AI Security
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/tracks/ai-security/
---

# AI Security

> When an AI Agent starts reading documents, calling tools, connecting wallets, and initiating transactions, security is no longer just about "whether the model answers incorrectly." The real questions are: what can it see, what can it call, and who can notice after something goes wrong.

## Why Explore This

AI x Web3 projects often start with a smooth demo: the user enters a goal, the Agent reads materials, generates a plan, calls tools, and finally completes an on-chain operation. The demo looks powerful, but once it enters a real environment, risks come from both AI and Web3 at the same time.

Common problems include:

- Malicious prompts hidden in external documents or web pages.
- The Agent treats untrusted content as system instructions.
- Tool permissions are too broad, turning model errors into real operations.
- API keys, private keys, or session tokens are placed in the model context.
- Transactions, authorizations, and governance votes are hard to revoke once sent.

## First Principles

> **A secure Agent is not a "more obedient model." It is an Agent placed inside a smaller, clearer, and more auditable action space.**

Do not expect the model to always distinguish materials, commands, suggestions, and attacks. The system should limit losses through permissions, isolation, validation, simulation, logging, and human confirmation.

- **Context must be layered**: system rules, user goals, external materials, and tool returns cannot be mixed into the same permission level.
- **Tools must use least privilege**: reading, writing, signing, transferring, and deploying are completely different risk levels.
- **High-risk actions must be auditable**: it should be possible to replay what the Agent read, what it called, and why it executed or refused.

## Knowledge Nodes

### Agent Threat Model

A Threat Model first makes clear which paths in the system are actually dangerous. An Agent system should ask at least:

- Which contexts can the Agent read?
- Which tools can the Agent call?
- Which accounts, funds, or external systems are connected behind the tools?
- Which outputs are only suggestions, and which will execute for real?
- Where does the user confirm, and what exactly is confirmed?
- After an error, can the cause be traced?

In Web3 scenarios, risk levels can be layered by action: reading on-chain data is the lowest risk, generating transaction drafts is medium risk, and automatic signing and authorization are the highest risk.

### Prompt Injection Defense

The trouble with Prompt Injection is that malicious instructions are often hidden inside materials the Agent needs to read, such as READMEs, web pages, PDFs, governance proposals, chat records, or on-chain metadata.

The defense focus is not adding one more sentence to the prompt saying "do not follow malicious instructions." It is structural isolation:

- External materials can only be data; they cannot override system rules.
- Retrieval results should carry source and trust level.
- Tool calls should be checked against the user goal and permissions.
- High-risk instructions must require reconfirmation.
- Model outputs should pass structured validation.

::: info Related Topic
- [Context Engineering](/en/handbook/ai/context/): Understand how information from different sources enters model context.
- [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/): Systematically study the main risk types in LLM applications.
:::

### Tool Permission Isolation

An Agent usually becomes dangerous because it can call tools. Tool permissions should be split by risk instead of giving the Agent one all-powerful API key.

They can be divided into several layers:

- Public read-only tools: read public documents, on-chain data, and price information.
- User read-only tools: read a user's wallet, positions, and transaction history, requiring login and scope limits.
- Draft tools: generate transactions, proposals, and messages, but do not execute them.
- Write tools: publish content, modify configuration, and call backends.
- Asset tools: sign, authorize, transfer, swap, and deploy contracts.

The further down the list, the more the tool needs whitelists, limits, simulation, human confirmation, multisig, or delayed execution.

### Malicious Document Demo

A malicious document demo is one of the best entry exercises for security. Prepare a normal-looking project document and hide an instruction inside it, such as asking the Agent to leak environment variables, skip checks, call a dangerous tool, or ignore the user's request.

Observe whether the system:

- Marks document content as external material.
- Refuses unauthorized requests inside the document.
- Keeps secrets out of the model context.
- Checks permissions before tool calls.
- Explains the refusal reason in the output.

This demo can be very small, but it directly exposes the most common security gaps in Agent applications.

### Key / Secret Isolation

Private keys, API keys, database passwords, and session tokens should not directly enter the model context.

A more reasonable design lets the Agent request a controlled action instead of receiving the secret itself. For example:

- Request "query balance" instead of receiving the RPC provider's admin key.
- Request "generate a transaction draft" instead of receiving the user's private key.
- Request "call a backend function" instead of reading the production token.
- Request "sign this explicit message" instead of holding signing capability long term.

In Web3, signing should be completed by a wallet, smart account, multisig, or permission module. The Agent should not hold the main private key.

### Privacy-preserving Workflow

Privacy problems are often not a single data leak, but the system combining wallets, chats, identities, transactions, and preferences.

A privacy-preserving workflow should:

- Read only the data necessary to complete the task.
- Desensitize or summarize data before external model calls.
- Hide unnecessary addresses, amounts, and identities by default.
- Show users the authorization scope.
- Allow users to inspect which information the Agent used.
- Prefer local models, TEEs, or encrypted data flows for sensitive tasks.

### AI Behavior Audit

What an Agent did cannot be understood only from the final answer. Audit logs should record:

- The user's original goal.
- Which materials were retrieved and read.
- Which tools were called.
- The input, output, and error for each tool call.
- Which steps triggered human confirmation.
- The final result, failure reason, and refusal reason.

These logs are not about looking "enterprise-grade." They are for knowing which layer failed after an incident: data, model, tool, permission, wallet, or interface.

## Position in AI x Web3

AI Security is a baseline requirement for every execution-oriented Agent. It is related to wallets, permissions, privacy, verifiable AI, and transaction explanation.

A healthy path is:

- First let the Agent only read and explain.
- Then allow it to generate drafts.
- Then connect low-risk tools.
- Only finally open restricted execution.

Every step needs corresponding permissions, simulation, logs, and human confirmation.

## Minimal Practice

Build a minimal security exercise for "malicious document + tool permission isolation."

Write down:

- What the normal document and malicious document contain.
- How the Agent distinguishes system rules, user goals, and external materials.
- Which tools are read-only, which are disabled, and which require confirmation.
- How the system refuses when a malicious instruction is triggered.
- How logs record the reading, judgment, and refusal process.

## Further Reading

- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/): Build a risk map for LLM application security.
- [OpenAI Function Calling / Tools Docs](https://platform.openai.com/docs/guides/function-calling): Understand tool calls, structured parameters, and execution boundaries.
- [LangChain Security Policy](https://python.langchain.com/docs/security/): Learn security considerations for Agent tools and external inputs.
- [Safe Docs](https://docs.safe.global/): Learn how multisigs, modules, and guards limit on-chain execution risk.
- [ERC-4337 Docs](https://docs.erc4337.io/): Understand how smart accounts can carry finer-grained permissions and execution logic.
