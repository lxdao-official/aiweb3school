---
title: Governance AI
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/bridge/governance-ai/
---

# Governance AI

> Governance AI is not about letting AI vote for the community, but about helping governance participants better read proposals, track meetings, understand budgets, preserve sources, discover collaboration relationships, and reduce information asymmetry in critical decisions.

## Why Learn This

DAOs, protocols, public goods, and open-source communities often have a vast amount of proposals, forum discussions, meeting minutes, budget requests, and contribution records. Too much information leads to a few people holding the context, while the majority can only vote passively.

AI can help governance systems organize information, but it can also create bias, omit sources, oversimplify complex disputes, or even be used to manipulate narratives.

**The core of Governance AI is to improve the quality of information for public decision-making, not to replace human political judgment.**

## First Principles

> **AI outputs in governance must preserve sources and uncertainties.**

Governance is not customer service Q&A. Proposals usually involve value trade-offs, resource allocation, and long-term impacts. AI can summarize, but it must lead readers back to original materials to see different perspectives rather than just providing a "should support" conclusion.

- **Traceable Sources**: Every key summary must be linkable back to proposals, forums, meetings, or on-chain records.
- **Separation of Perspectives**: Facts, inferences, opinions, and suggestions must not be lumped together.
- **Humans Retain Decision Power**: AI can assist, but voting and authorization should still be completed by humans or explicit rules.

## Knowledge Nodes

### Proposal Summary

**Difficulty: Beginner.** A Proposal Summary organizes long proposals into goals, background, budget, execution plan, risks, and pending questions.

A good summary doesn't just shorten the text; it also preserves key sources, objections, unanswered questions, and the scope of impact. Don't let AI summarize a controversial proposal into a single promotional piece.

Governance summaries are best structured with fixed sections: proposal goals, background, budget, executor, timeline, impact scope, reasons for support, reasons for opposition, pending questions, and relevant history. This allows for horizontal comparison between different proposals.

AI summaries should also mark uncertainty. For instance, "whether a budget is reasonable" is usually a judgment, not a fact; "the proposal requests 50,000 USDC" is a fact. Mixing the two can mislead readers into thinking an AI's judgment is a governance conclusion.

### Meeting Action

**Difficulty: Beginner.** Meeting Action converts meeting discussions into executable items.

It should record who is responsible, deadlines, context links, decision status, and follow-up check methods. Meeting summaries without an action owner quickly become useless records.

The difficulty of Meeting Action is extracting commitments from discussions. For example, "we should study this" is not an action; "Alice to organize three payment options by next Friday" is an action. AI should help convert vague discussions into checkable items.

Decision status should also be recorded: decided, pending confirmation, needs voting, needs budget, or needs legal/security review. Otherwise, minutes will mix items of different levels of maturity.

### Contribution Graph

**Difficulty: Intermediate.** A Contribution Graph helps the community see who is doing what, how contributions are connected, and which work is undervalued.

Data can come from GitHub, forums, on-chain payments, meeting records, and project management tools. Avoid simply quantifying contributions into a single score, especially for community care, coordination, and research work.

A Contribution Graph can help discover "invisible contributions": who does long-term reviews, who coordinates meetings, who maintains documentation, and who answers questions for newcomers. AI can organize evidence, but it shouldn't simplify complex contributions into a count of commits.

In public goods funding, a contribution graph can also help avoid duplicate or missed funding. It can show dependencies between projects, historical funding, delivery records, and contributor collaboration networks.

### Budget Check

**Difficulty: Intermediate.** Budget Check is used to review whether fund requests are clear, reasonable, and traceable.

AI can help check: whether budget items are complete, whether milestones are specific, whether past funding was completed, whether the amount matches the scope of work, and whether there are duplicate requests.

Budget Check is not about automatically cutting budgets but about letting the community see the issues clearly. A good budget check asks: what deliverables correspond to this money, is the payment pace tied to milestones, are there verifiable deliveries, and what happens in case of failure or delay?

On-chain payments also need to check addresses and permissions: does the receiving address belong to the proposer, is it a multi-sig, does it need vesting, and are there historical anomalies like unusual withdrawals or incomplete grants?

### Source Traceability

**Difficulty: Beginner.** Source Traceability is the bottom line for Governance AI.

Every key summary should be attached to a source: forum links, proposal numbers, meeting timestamps, on-chain transactions, voting records, or budget sheets. Governance summaries without sources should not be used as a basis for voting.

Source Traceability should also support reverse checks: readers seeing a summary can click back to the original text; seeing a budget conclusion can click back to tables and transactions; seeing an objection can find the specific speaker.

If an AI output cannot provide a source, it should be clearly labeled as "inference" or "uncertain." In governance scenarios, it's better to be slow than to push collective decisions with sourceless summaries.

### Deep Funding

**Difficulty: Advanced.** Deep Funding focuses on the allocation of funds for public goods and complex contributions.

AI can help organize project impacts, contribution relationships, and review materials, but fund allocation still requires human value judgment, diverse reviews, and transparent rules. Models should not become black-box grantors.

The challenge of Deep Funding is that impact is not linear. A low-level library might be used indirectly by many projects; a coordinator might make multiple teams successful; a documentation project might lower the barrier for many newcomers. These contributions are hard to measure with simple KPIs.

AI can assist in building evidence packages: project dependency graphs, use cases, contributor networks, historical funding, and user feedback. However, final allocation should retain diverse reviews, public reasoning, and appeal mechanisms.

### Plurality

**Difficulty: Advanced.** Plurality emphasizes preserving differences and coordinating cooperation within a diverse group, rather than compressing everyone into an average opinion.

Governance AI should help present the reasons, preferences, and concerns of different groups and support negotiation rather than just outputting the loudest or most common viewpoints.

The practical product meaning of Plurality is that AI summaries should not just give a "mainstream opinion" but also show minority concerns, stakeholder differences, regional/role differences, and room for negotiation.

For example, for a protocol fee proposal, the perspectives of LPs, traders, developers, treasury managers, and long-term token holders might differ. Governance AI should expand these perspectives rather than smoothing over conflicts with an average stance.

## Position in AI x Web3

Governance AI connects AI summarization capabilities with Web3 public decision-making. It can read on-chain voting, forum discussions, budget flows, and contribution records to help the community understand the state of governance.

However, governance values legitimacy more than transactions. AI-assisted tools must be transparent, questionable, and reviewable, especially not quietly voting for users or hiding objections.

## Minimal Practice

Create a governance proposal summary template:

1. Proposal goals and background.
2. Budget amount, payment address, and milestones.
3. Reasons for support and reasons for opposition.
4. Unanswered questions.
5. Related historical proposals or on-chain transactions.
6. Each key conclusion attached with source links.
7. Explicitly state "AI did not make voting recommendations for you."

## Extended Reading

- [Snapshot Docs](https://docs.snapshot.box/): Learn about off-chain governance voting tools and proposal processes.
- [Tally Docs](https://docs.tally.xyz/): Learn about on-chain governance, proposals, and voting interfaces.
- [Gitcoin Grants Stack Docs](https://docs.gitcoin.co/): Understand public goods funding and the grants process.
- [Plurality Institute](https://www.plurality.institute/): Learn about public collaboration ideas related to plurality.
- [OpenAI Safety Best Practices](https://platform.openai.com/docs/guides/safety-best-practices): Governance AI output also needs sources, boundaries, and security design.
- [Vitalik: My techno-optimism](https://vitalik.eth.limo/general/2023/11/27/techno_optimism.html): Discusses why more open, diverse governance and information collaboration tools are important.
