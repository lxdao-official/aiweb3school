---
title: Model Context Protocol（MCP）
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/ai/mcp/
---

# Model Context Protocol（MCP）

> MCP tries to standardize the connection between models and external tools, data sources, and application context. It does not solve "whether the model becomes smarter"; it solves "how the model uses external capabilities in a describable, reusable, and manageable way."

## Why Learn This

Once AI applications enter real workflows, models cannot complete tasks using only the text inside a prompt. They need to read files, query databases, access documents, call APIs, operate tools, and receive user context.

If every application connects tools in its own way, the Agent ecosystem becomes fragmented: the same tool needs many adapters for different clients, and permissions, schemas, error handling, and logs are hard to unify.

The value of MCP is to abstract this connection layer into a protocol. You can think of it as a "tool interface standard" for AI applications: the client interacts with the model, while the server exposes resources, tools, and prompts.

## First Principles

> **A model should not directly own the world; it should access authorized context and tools through explicit protocols.**

The key of MCP is not "connecting more tools." It is making tool integration describable, discoverable, and limitable. What capabilities a server exposes, what the input schema is, what result it returns, and which actions have side effects should all be expressed clearly.

- **Tools need schemas**: without schemas, model tool calls become natural-language parameter guessing.
- **Permissions must also hold outside the protocol**: a protocol can describe capability, but real authorization, audit, and isolation still need to be implemented by the system.
- **Errors must be transmissible**: tool failure, timeout, and insufficient permission must be returned clearly instead of leaving the model to guess.

## Knowledge Nodes

### Server

An MCP Server provides capabilities. It can expose resources, tools, prompts, and more so AI clients can read information or call actions.

The design focus of a server is boundary:

- which resources are exposed
- which tools are read-only and which have side effects
- whether parameter schemas are clear
- how errors are returned
- whether user authorization is required
- where logs and audits are recorded

An unrestricted MCP server can easily expose local files, internal APIs, or high-risk actions to the model.

### Client

An MCP Client connects the model and MCP servers, such as a desktop application, IDE, Agent runtime, or chat client.

The client discovers server capabilities, gives tool information to the model, and turns model-generated call requests back into protocol messages. It should also handle user confirmation, permission prompts, session isolation, and tool-call display.

To judge whether a client is reliable, look at whether it tells the user: which servers are currently connected, which tools the model can call, and whether confirmation is required before calls.

### Tool Schema

Tool Schema describes a tool's name, purpose, parameters, return value, and constraints. It is key to correct model tool calls.

A good schema does more than specify field types. It should explain:

- when this tool should be used
- what each parameter means
- which fields are required
- whether it changes external state
- what is returned on failure

**If a tool schema is vague, the model will fill gaps with wrong parameters.**

::: info Related Topic
- [Prompt](/en/handbook/ai/prompt/): tool descriptions are also part of the prompt in practice.
- [Agent](/en/handbook/ai/agent/): an Agent's tool-calling ability must be designed together with state, permissions, and stop conditions.
:::

### Permission

Permission is the most underestimated issue when MCP enters real products.

MCP makes tools easier to connect, but convenience is not safety. Reading a document, checking an issue, creating a PR, sending a payment, and deleting a file are completely different risk levels.

Permission should at least distinguish:

- read-only vs write
- current-session authorization vs long-term authorization
- whether user confirmation is required
- whether sensitive information can be accessed
- whether external side effects are created
- whether the action is revocable and auditable

Before an MCP server exposes capability, it should define its permission model.

## Where It Fits in AI x Web3

In AI x Web3, MCP can serve as the interface layer for Agents connecting to on-chain tools and developer tools: reading block explorers, querying contract docs, calling RPC, generating transaction drafts, and reading project issues.

But MCP itself is not a wallet-security solution. It can standardize the tool entry point, but it cannot replace account permissions, transaction simulation, signing confirmation, session keys, and audit logs.

A steadier design is: MCP handles tool discovery and call format; the Web3 account system handles final permission and execution boundaries.

## Minimum Practice

Build a read-only MCP server.

It exposes only two tools:

- `search_docs(query)`: search local project documentation.
- `get_file(path)`: read files inside a whitelisted directory.

Requirements:

- It cannot read paths outside the whitelist.
- Returned results must include source paths.
- Tool calls must be logged.
- Errors must be returned explicitly instead of failing silently.

After that, design a permission-upgrade plan for a "write tool": when user confirmation is needed, how authorization is revoked, and how every call is audited.

## Further Reading

- [Model Context Protocol Architecture](https://modelcontextprotocol.io/docs/learn/architecture): official architecture explanation for understanding the division of labor between client, server, tools, and resources.
- [Model Context Protocol Specification](https://modelcontextprotocol.io/specification/2024-11-05/basic/index): the protocol source text, useful for message formats and JSON-RPC basics.
- [OpenAI MCP Overview](https://platform.openai.com/docs/mcp/overview): understand how the OpenAI API / ChatGPT ecosystem connects to MCP servers.
- [Claude Code MCP Docs](https://docs.claude.com/en/docs/claude-code/overview): see how MCP is used in local developer tools.
- [GitHub: modelcontextprotocol/mcp-docs](https://github.com/modelcontext-protocol/mcp-docs): the official docs repository, useful for tracking documentation and specification changes.
