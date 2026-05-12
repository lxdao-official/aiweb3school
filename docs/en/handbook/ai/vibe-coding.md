---
title: Vibe Coding
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/ai/vibe-coding/
---

# Vibe Coding

> Vibe Coding is not "throw the requirement to AI and wait for code to appear." More accurately, it is a way for humans and AI Coding Agents to iterate software together: humans own direction, constraints, and acceptance; Agents handle generation, modification, search, and part of the engineering actions.

## Why Learn This

AI Coding Agents can already read code, edit files, run tests, explain errors, and generate PRs. For builders, this clearly changes development speed. But once speed increases, the real questions become: can you describe the task clearly, review the result, control the change scope, and verify that no new bug was introduced?

Vibe Coding is easily misunderstood as "coding by feeling." The usable version is the opposite: you need to manage the repo, task, context, tests, and commit boundaries more clearly.

**AI can help you write more code, but it cannot take over engineering judgment for you.**

## First Principles

> **The core of AI Coding is not automatic code generation, but shortening the engineering feedback loop.**

In the past, you had to search files, understand modules, modify code, run tests, read errors, and modify again by yourself. Now an Agent can take on many of those steps in parallel. But if the feedback loop lacks tests, review, and version control, speed only amplifies disorder.

- **Tasks should be small**: the more specific and bounded the task, the easier it is for the Agent to produce reviewable results.
- **Context should be accurate**: letting the Agent see the right files, design constraints, and error output matters more than writing a long requirement.
- **Verification should be hard**: tests, type checks, builds, screenshots, and logs are more reliable than "it looks right."

## Knowledge Nodes

### Vibe Coding

**Difficulty: Beginner.** First understand the division of labor between humans and AI Coding Agents: humans own goals, boundaries, and acceptance; Agents handle search, generation, modification, and execution.

Vibe Coding is a fast way to explore code together with AI. You can describe a goal, let the Agent generate a plan or patch, then converge through running, checking, asking follow-up questions, and iterating.

It is suitable for:

- building prototypes
- fixing small bugs
- adding tests
- writing scripts
- refactoring local modules
- explaining unfamiliar code

It is not suitable for unboundedly "rewriting the whole project." If the task scope is too large, the Agent can easily change files it should not touch or introduce abstractions that look reasonable but do not fit project constraints.

### Claude Code / Codex CLI

**Difficulty: Beginner.** The point is not to memorize commands, but to learn how to safely connect an AI Agent to a local repo, terminal, and test flow.

Tools such as Claude Code and Codex CLI put an AI Agent into the local development environment, allowing it to read files, edit files, run commands, and understand test output.

The key value of these tools is not "chatting"; it is that they can act inside the repo. Because they can act, you must define:

- which files can be changed
- which commands can be run
- whether dependency installation is allowed
- whether network access is allowed
- when the Agent must stop and ask for human confirmation

::: info Related Topic
- [Claude Code Docs](https://docs.claude.com/en/docs/claude-code/overview): learn Claude Code's local development workflow.
- [OpenAI Codex CLI Help](https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started): learn the basics of Codex CLI.
:::

### Model / API Config

**Difficulty: Intermediate.** This layer handles model choice, API keys, tool permissions, context, cost, and logs; it is not only about whether the call succeeds.

AI Coding is not only about "which model is strongest." You also need to manage models, API keys, context windows, tool permissions, proxy settings, cost, and logs.

Common problems include:

- local and CI using different models
- API keys leaking into logs or commits
- context becoming too long and cost going out of control
- Agents using inappropriate tool permissions
- output style not matching project conventions

Good configuration should be reusable by the team, not something every person tweaks casually on their own machine.

OpenCLI is one tool worth watching at this layer. It unifies websites, browser sessions, Electron apps, and local binary tools into command-line callable interfaces, allowing AI Agents to discover, learn, and execute tools through more stable commands instead of manipulating pages ad hoc each time. It can also reuse local browser login state and expose local CLIs such as `gh` and `docker` through the same tool entry point.

The value of this kind of tool is not "one more AI coding product." It is that the external capabilities callable by an Agent become clearer: what commands exist, what permissions they need, what output format they return, and how to diagnose failure.

::: info Related Topic
- [OpenCLI](https://github.com/jackwener/OpenCLI): learn how to turn websites, browser sessions, Electron apps, and local tools into Agent-callable CLI interfaces.
:::

### GitHub / gh

**Difficulty: Intermediate.** You need to put AI-generated changes back into version control, issues, PRs, and review flow instead of only looking at one chat output.

GitHub and the `gh` CLI are collaboration boundaries in AI Coding workflows. An Agent can help inspect issues, generate branches, read PR diffs, write commit messages, and organize reviews, but version control remains the critical line for human review.

A practical principle: **let Agents do more local patches and fewer untraceable large changes.**

After each change, at least check:

- `git diff`
- modified file list
- test results
- whether secrets, logs, or build artifacts were included by mistake

### CLI / Script

**Difficulty: Intermediate.** At this layer, Agent output becomes real commands and scripts, so pay close attention to read/write scope, dry runs, and external side effects.

Many development tasks do not need a full application interface; writing a CLI or script first is faster. Agents are well suited to generate one-off scripts, data migration scripts, check scripts, and bulk-edit scripts.

But scripts have two boundaries:

- Confirm scope before reading or writing files.
- Scripts that modify external state should run in dry-run mode first.

If a script deletes files, sends requests, changes a database, submits transactions, or calls production APIs, you cannot rely only on Agent judgment.

### Repo Workflow

**Difficulty: Advanced.** You need to connect AI Coding to the full engineering process and judge when the Agent should continue and when humans must stop and review.

Repo Workflow means putting AI Coding into normal engineering flow: issue, branch, commit, test, review, merge, release.

Do not let AI bypass these flows. A better approach is to let it participate in them:

- extract task boundaries from issues
- search related files
- generate the smallest patch
- run tests and explain failures
- supplement changelog or docs
- write PR summary and verification notes

The quality of AI Coding ultimately has to land inside the repo workflow.

## Where It Fits in AI x Web3

AI x Web3 projects often have frontend, contracts, scripts, indexers, Agent backends, and documentation at the same time. Vibe Coding can significantly speed up exploration, especially for hackathons and early prototypes.

But chain-related code is higher risk. Contracts, signatures, permissions, payments, and migration scripts cannot go live just because an Agent generated them. AI Coding can help write tests, explain ABI, and generate scripts, but high-risk actions must go through review, simulation, and multi-party confirmation.

## Minimum Practice

Choose a small feature and let an AI Coding Agent complete one full engineering loop:

1. Write the task boundary and files that must not be changed.
2. Ask the Agent to search related code and propose a plan.
3. Ask the Agent to make the smallest patch.
4. Run tests or build.
5. Inspect `git diff` and manually review the result.
6. Ask the Agent to write a PR summary and verification note.

After finishing, record: what information was missing, which tests were absent, and which changes required human judgment.

## Challenge

Install and configure at least one Vibe Coding tool on your own computer, such as Claude Code, Codex CLI, or OpenCLI, and confirm it works in a test repo.

Completion standard:

- The tool can start and read the current project.
- Necessary model, API key, browser bridge, or local tool permissions are configured.
- The tool can complete a read-only task, such as explaining directory structure, searching related files, or summarizing code.
- The tool can complete a low-risk small change, such as adding a comment, generating a script, or modifying a test.
- Keep verification records: tool version, configuration method, executed commands, key output, or screenshots.

## Further Reading

- [Claude Code Overview](https://docs.claude.com/en/docs/claude-code/overview): learn how Claude Code enters the local development flow.
- [Claude Code CLI Reference](https://docs.claude.com/en/docs/claude-code/cli-reference): see common commands and parameters.
- [OpenAI Codex CLI Getting Started](https://help.openai.com/en/articles/11096431-openai-codex-cli-getting-started): learn the basics of Codex CLI.
- [OpenCLI](https://github.com/jackwener/OpenCLI): learn how Agents can call websites, browser sessions, desktop apps, and local tools through one CLI interface.
- [GitHub CLI Manual](https://cli.github.com/manual/): learn to use `gh` to manage issues, PRs, repos, and CI status.
- [OpenAI Agents Guide](https://platform.openai.com/docs/guides/agents/best-practices): understand guardrails and tracing when AI Agents enter tool workflows.
