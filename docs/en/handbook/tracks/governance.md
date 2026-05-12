---
title: Governance
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/tracks/governance/
---

# Governance

> AI can reduce the information cost of governance participation, but it can also flatten complex disputes into summaries that look objective. The focus of governance Agents is not voting for people, but helping people understand, discuss, and execute public decisions more clearly.

## Why Explore This

Governance in DAOs, protocols, Public Goods funding, and open-source communities shares one problem: too much information and too high a participation cost. Proposals, forum discussions, meeting notes, budget sheets, on-chain votes, execution transactions, and historical commitments are scattered across different places, making it hard for ordinary members to keep up.

AI is well suited for organizing information, summarizing, comparing, flagging risks, and tracking actions. But governance is not ordinary content processing. Any summary can influence public decisions, so it must preserve sources, distinguish facts from judgment, and make points of dispute clear.

## First Principles

> **A governance Agent cannot replace public judgment. It can only reduce the cost of understanding and coordination.**

The core of governance is the allocation of power, resources, and responsibility. AI can help participants see information clearly, but it cannot disguise political questions as technical questions.

- **Summaries must be traceable**: every key judgment should be traceable back to the original text, meeting, or on-chain record.
- **Different positions must be preserved**: governance is not about eliminating disagreement, but making disagreement clearer.
- **Execution must be verifiable**: after a proposal passes, the budget, tasks, owners, and on-chain execution should all be trackable.

## Knowledge Nodes

### Proposal Summarizer

Proposal Summarizer is the most common AI application in governance. It breaks a long proposal into background, goals, budget, execution steps, risks, supporting arguments, and opposing arguments.

A good proposal summary should not give only a "conclusion." It should help readers quickly judge:

- What this proposal wants to change.
- How much funding or permission is involved.
- Who benefits and who bears the risk.
- Whether the execution path is clear.
- Where the disputed points are.
- Which original materials need further reading.

**The most important quality standard for governance summaries is source fidelity, not smooth writing.**

::: info Related Topic
- [Governance AI](/en/handbook/bridge/governance-ai/): Understand governance workflows from the AI x Web3 intersection.
- [Snapshot Docs](https://docs.snapshot.box/): Learn about common infrastructure for off-chain voting and governance proposals.
:::

### Meeting-to-Action Workflow

Many governance efforts fail not because there was no discussion, but because discussion did not become action. Meeting-to-Action Workflow turns meeting notes into tasks, owners, deadlines, and follow-up checkpoints.

A governance meeting Agent should output:

- Decisions made in this meeting.
- Issues where no consensus was reached.
- The owner of each action item.
- Items that need to be submitted to the forum, a vote, or a multisig.
- Materials that need to be prepared before the next meeting.
- Related links and original records.

Avoid a common mistake here: writing "someone mentioned it" as "it was decided." A governance Agent must distinguish discussion, suggestion, decision, and execution.

### Contribution Tracker

Contribution Tracker records the contributions of members, teams, or projects to an ecosystem. It can organize GitHub, forums, Discord, on-chain transactions, grant applications, meeting notes, and deliverables.

But contribution tracking is not simple ranking. Real contribution has many forms:

- Code commits, audits, documentation, translation.
- Community organizing, events, support, and education.
- Protocol research, data analysis, and risk warnings.
- Public Goods building and long-term maintenance.

AI can help aggregate evidence, but it cannot judge contribution value only from activity. Someone who speaks a lot is not necessarily the largest contributor. A low-frequency but critical security fix may be more valuable.

### Budget Checklist

The easiest place for governance budgets to go wrong is when proposals are visionary, but do not clearly explain how funds will be spent, who is responsible, and how acceptance will work.

Budget Checklist can help a community check:

- Total budget and payment asset.
- Conditions for staged payments.
- Deliverables and acceptance method.
- Owner, receiving address, and conflicts of interest.
- How to handle failure or delay.
- Whether comparable historical budgets exist.
- Whether multisig, streaming payment, or milestone escrow is needed.

AI can perform a first-pass budget review, but high-value budgets must be judged by people and the governance process.

### Public-goods Impact Dashboard

The hard part of Public Goods funding is that impact is difficult to measure. Downloads, stars, transaction counts, user counts, citation counts, and integrations are only partial signals.

A Public-goods Impact Dashboard should place multiple types of evidence together:

- Project outputs: code, documentation, tools, research, educational content.
- Usage: real users, integrators, on-chain interactions, community feedback.
- Ecosystem impact: whether it lowers development costs, improves security, or brings in new developers.
- Maintenance: whether it is continuously updated, responds to issues, and handles security problems.
- Fund usage: whether grants correspond to clear deliverables.

The value of this kind of dashboard is not making decisions for badgeholders or voters. It is reducing the time they spend collecting information.

::: info Related Topic
- [Optimism Retro Funding](https://community.optimism.io/citizens-house/how-retro-funding-works): Learn about governance practice in Public Goods impact evaluation and retroactive funding.
- [Gitcoin Docs](https://docs.gitcoin.co/): Understand Public Goods funding, grants, and community review mechanisms.
:::

### Source-preserving Summary

Source-preserving Summary is the baseline capability of governance AI. It requires key facts in a summary to be traceable to sources.

A practical format is:

- Conclusion: state the key point in one sentence.
- Evidence: list original paragraphs, meeting timestamps, on-chain transactions, or forum links.
- Uncertainty: explain which parts are inference and which lack evidence.
- Opposing view: preserve the main objections.
- Recommended reading: point out the parts of the original source that must be read.

If a governance summary has no sources, it is only a model opinion. If it has sources but misleads readers, it is more dangerous than having no summary.

## Position in AI x Web3

Governance is one of the best directions in AI x Web3 for starting with an "assistive Agent." It does not need to control assets at first, but it can immediately reduce information costs.

A steadier product path is:

- Start with proposal summaries and source tracking.
- Then build meeting-to-task workflows.
- Then build budget, contribution, and impact dashboards.
- Only later consider voting recommendations or execution automation.

## Minimal Practice

Choose a real DAO or protocol proposal and create a source-faithful governance summary.

The output should include:

- The problem the proposal wants to solve.
- Changes to budget, permissions, or protocol parameters.
- Supporting and opposing arguments.
- Source links for at least 5 key facts.
- Disputed points that require human judgment.
- Follow-up execution actions if it passes.

## Further Reading

- [Snapshot Docs](https://docs.snapshot.box/): Learn about governance proposals and off-chain voting infrastructure.
- [Tally Docs](https://docs.tally.xyz/): Learn on-chain governance, delegation, and proposal execution tools.
- [Optimism Retro Funding](https://community.optimism.io/citizens-house/how-retro-funding-works): Understand Public Goods impact evaluation and retroactive funding.
- [Gitcoin Docs](https://docs.gitcoin.co/): Learn about grants, Public Goods funding, and community review.
- [Vitalik: d/acc: one year later](https://vitalik.eth.limo/general/2025/01/05/dacc2.html): Understand how defensive, democratic, and differential acceleration affects technology governance.
