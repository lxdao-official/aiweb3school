---
title: AI × Web3 Open Learning Platform
description: AI x Web3 School is a bilingual open learning platform for builders to systematically learn AI, blockchain, smart contracts, AI Agents, and decentralized AI, and to connect learning with real collaboration through Bootcamp and project practice.
createTime: 2026/03/31 09:53:27
permalink: /en/handbook/
---

# AI x Web3 School

::: tip Learning Agent Startup
Learners who want to use Hermes Agent / Claude Code / Codex for assisted learning can copy the sentence below and paste it into their Agent:

```text
Please act as my AI × Web3 School Learning Agent. First read the startup prompt at https://aiweb3.school/learning-agent.en.txt, then use the Handbook at https://aiweb3.school/en/handbook/ to help me initialize my personal learning plan, GitHub learning repository, daily check-in drafts, and Handbook feedback workflow.
```
:::

AI x Web3 School is an open learning program for builders. This site hosts its Handbook: a structured map of the real problems that appear when AI and Web3 intersect, including model capabilities, Agent workflows, tool use, wallets, signatures, payments, identity, permissions, safe execution, governance collaboration, and verifiable records.

The Handbook builds a knowledge map around key AI x Web3 concepts. It works for looking up concepts, filling missing context, connecting topics across domains, and learning from zero in the order of the sidebar.

## AI x Web3 School Bootcamp

If you want to join the training camp, start with the English Bootcamp page:

- [AI x Web3 School Bootcamp English page](https://web3career.build/programs/AI-Web3-School): view the introduction, schedule, and application entry.

## Why This Handbook Exists

AI x Web3 is not just two buzzwords placed together. A real system often involves all of these at the same time:

- how models understand tasks, organize context, and call tools
- how Agents move from "answering questions" into "execution workflows"
- how wallets and accounts express permissions, spending limits, time windows, and revocation conditions
- how on-chain transactions are simulated, confirmed, recorded, and audited
- how payments, identity, reputation, and governance connect to automated systems
- how privacy, security, and verifiability become part of the product

If you only look from the AI side, you will underestimate asset and permission risks. If you only look from the Web3 side, you will miss the complexity of models, context, and tool orchestration.

So the goal of this site is to establish a shared language first: **make the concepts clear, make the boundaries clear, and make the minimum practices clear.**

## Handbook Outline

This Handbook is organized into four groups: AI Foundations, Web3 Foundations, AI × Web3 Bridge, and Frontier Exploration.

You can think of it as a four-layer map:

### AI Foundations

Start by understanding the basic components of models and application systems:

- [LLM](/en/handbook/ai/llm/): what large models can do, and what they cannot replace.
- [Prompt](/en/handbook/ai/prompt/): how to write task goals, boundaries, and output formats clearly.
- [Context](/en/handbook/ai/context/): what a model can see in one run, which information is trustworthy, and what expires.
- [RAG](/en/handbook/ai/rag/): how to connect external knowledge, sources, and citations to a model.
- [Agent](/en/handbook/ai/agent/): how models enter tool use and multi-step execution.
- [Frameworks](/en/handbook/ai/frameworks/): understand which orchestration layer LangChain, LangGraph, Agents SDK, and similar frameworks solve.
- [MCP](/en/handbook/ai/mcp/): understand how models, tools, and context are connected through protocols.
- [Evaluation](/en/handbook/ai/evaluation/): make model outputs, Agent behavior, and tool calls testable, replayable, and continuously improvable.

### Web3 Foundations

Then add the basic intuition of on-chain systems:

- [Network](/en/handbook/web3/network/): understand the basic environment of blocks, consensus, L2, RPC, and on-chain state.
- [Cryptography](/en/handbook/web3/cryptography/): hashes, public/private keys, signatures, and other underlying concepts.
- [Wallet](/en/handbook/web3/wallet/): a wallet is not just a login button; it is the entry point for identity and signatures.
- [Smart Contract](/en/handbook/web3/smart-contract/): how on-chain rules are deployed, called, and used to update state.
- [Account Abstraction](/en/handbook/web3/account-abstraction/): why Smart Accounts are better suited for expressing Agent permissions.
- [DeFi](/en/handbook/web3/defi/): understand assets, liquidity, lending, and risk propagation in open financial protocols.
- [Oracle](/en/handbook/web3/oracle/): understand how off-chain data enters on-chain systems, and why data sources become risk points.
- [Indexing](/en/handbook/web3/indexing/): organize on-chain events, transactions, and state into a data layer usable by AI and products.
- [Security](/en/handbook/web3/security/): risk boundaries in contracts, permissions, simulation, and monitoring.

### AI × Web3 Bridge

Then move into the real intersection problems:

- [Chain-aware Context](/en/handbook/bridge/chain-aware-context/): how on-chain state enters Agent context.
- [Web3 Tool Use](/en/handbook/bridge/web3-tool-use/): how RPC, wallet, and contract tools are called by Agents.
- [Agent Workflow](/en/handbook/bridge/agent-workflow/): which steps are suitable for automation, and which must stay human-in-the-loop.
- [Agent Wallet](/en/handbook/bridge/agent-wallet/): what permissions an Agent can receive, and how to limit and revoke them.
- [Machine Payment](/en/handbook/bridge/machine-payment/): how machines complete micro-payments and service settlement.
- [Settlement & Escrow](/en/handbook/bridge/settlement-and-escrow/): how automated transactions, service delivery, and dispute handling complete settlement.
- [Agent Identity](/en/handbook/bridge/agent-identity/): how Agents are identified, authorized, and tracked for responsibility boundaries.
- [Agent Trust & Reputation](/en/handbook/bridge/agent-trust-and-reputation/): how to record Agent behavior, capabilities, and trustworthy history.
- [Verifiable AI](/en/handbook/bridge/verifiable-ai/): how model outputs, execution processes, and results can be verified.
- [AI Security](/en/handbook/bridge/ai-security/): how Prompt Injection, tool abuse, permission isolation, and audit logs enter system design.
- [AI Privacy](/en/handbook/bridge/ai-privacy/): privacy boundaries between user data, on-chain identity, and model context.
- [Governance AI](/en/handbook/bridge/governance-ai/): how AI enters proposal summarization, governance collaboration, voting assistance, and public decision-making.

### Frontier Exploration

Frontier Exploration combines the previous knowledge into prototypes that can be built, demoed, and extended:

- [Agentic Commerce](/en/handbook/tracks/agentic-commerce/): how Agents discover services, negotiate tasks, complete payments, and leave receipts.
- [Wallet / Permission](/en/handbook/tracks/wallet-permission/): product prototypes around wallets, permissions, Session Keys, Policies, and Guards.
- [AI Security](/en/handbook/tracks/ai-security/): turn attack surfaces, permission isolation, audits, and alerts into demonstrable systems.
- [Governance](/en/handbook/tracks/governance/): AI collaboration tools for DAOs, public goods, and protocol governance.
- [Dev Tooling](/en/handbook/tracks/dev-tooling/): tools for contract understanding, testing, documentation, code review, and developer workflows.
- [Open Track](/en/handbook/tracks/open-track/): reserved for new intersection problems and practice directions that have not yet become fixed categories.

## How to Read This Handbook

You do not need to read every chapter as a linear course from beginning to end. A better way is to first identify which foundation you are missing, then fill it in through the sidebar.

- If you lack AI foundations, start with [LLM](/en/handbook/ai/llm/), [Prompt](/en/handbook/ai/prompt/), [Context](/en/handbook/ai/context/), [RAG](/en/handbook/ai/rag/), and [Agent](/en/handbook/ai/agent/) to build a shared language around models, context, retrieval, and tool use.
- If you lack Web3 foundations, start with [Network](/en/handbook/web3/network/), [Cryptography](/en/handbook/web3/cryptography/), [Wallet](/en/handbook/web3/wallet/), [Smart Contract](/en/handbook/web3/smart-contract/), and [Account Abstraction](/en/handbook/web3/account-abstraction/) to fill in accounts, signatures, contracts, networks, and permission boundaries.
- If you already know both foundations, go directly into [AI × Web3 Bridge](/en/handbook/bridge/chain-aware-context/) and focus on how Agents read on-chain state, call tools, manage permissions, pay and settle, and leave verifiable records.
- If you are preparing for a project or hackathon, start with [Frontier Exploration](/en/handbook/tracks/agentic-commerce/) and combine knowledge nodes into a small prototype instead of staying at conceptual discussion.

If you are already building an AI x Web3 product, you can start directly from the problem:

- Building a transaction interpreter: start with [LLM](/en/handbook/ai/llm/), [Context](/en/handbook/ai/context/), and [Chain-aware Context](/en/handbook/bridge/chain-aware-context/).
- Building an on-chain Agent: start with [Agent](/en/handbook/ai/agent/), [Web3 Tool Use](/en/handbook/bridge/web3-tool-use/), and [Agent Workflow](/en/handbook/bridge/agent-workflow/).
- Building a wallet or automated payment flow: start with [Wallet](/en/handbook/web3/wallet/), [Account Abstraction](/en/handbook/web3/account-abstraction/), and [Agent Wallet](/en/handbook/bridge/agent-wallet/).
- Building security and risk controls: start with [Prompt](/en/handbook/ai/prompt/), [RAG](/en/handbook/ai/rag/), and [AI Security](/en/handbook/bridge/ai-security/).

## Co-learning, Projects, and Long-term Accumulation

AI x Web3 School was jointly initiated by LXDAO and ETHPanda. It will continue accumulating content around co-learning camps, hackathons, the Handbook, and project showcases.

This path is not a loose combination of "lectures first, competitions later." It aims to connect learning and practice:

> Problem definition → Co-learning training → Project practice → Public showcase → Talent and opportunity accumulation

The Handbook will organize course content, problem maps, cases, and strong projects into long-term accessible bilingual assets. Even after one co-learning cohort ends, future builders can still enter from here to continue learning, correcting, supplementing, and co-building.

## Partners and Supporters

The Handbook, co-learning, and project practice of AI x Web3 School are advanced together with community partners.

<LogoWall variant="compact" />

## Join Co-building

This Handbook will continue to improve. You are welcome to participate:

- supplement knowledge nodes that have not yet been expanded
- correct inaccurate statements in the docs
- add cases, diagrams, code examples, and minimum practices
- help translate content between Chinese and English
- submit materials you think are worth reading for builders

Collaboration entry points:

- [Join Co-building](/en/contribution/)
- [GitHub](https://github.com/lxdao-official/aiweb3school)
- [Telegram Community](https://t.me/aiweb3school)
