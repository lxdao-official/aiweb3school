---
title: 模型上下文协议（MCP）
createTime: 2026/05/12 00:00:00
permalink: /zh/handbook/ai/mcp/
---

# 模型上下文协议（MCP）

> MCP 试图把模型和外部工具、数据源、应用上下文之间的连接标准化。它解决的不是“模型会不会更聪明”，而是“模型如何以可描述、可复用、可管理的方式使用外部能力”。

## 为什么要学这个

AI 应用真正进入工作流后，模型不可能只靠 prompt 里的文本完成任务。它需要读取文件、查数据库、访问文档、调用 API、操作工具、拿到用户上下文。

如果每个应用都用自己的方式接工具，Agent 生态会非常碎：同一个工具要为不同客户端写很多适配层，权限、schema、错误处理和日志也难统一。

MCP 的价值在于把这层连接抽象成协议。你可以把它理解成 AI 应用的“工具接口标准”：客户端负责和模型交互，server 负责暴露资源、工具和 prompts。

## 第一性原理

> **模型不应该直接拥有世界；它应该通过明确协议访问被授权的上下文和工具。**

MCP 的关键不是“能接更多工具”，而是让工具接入变得可描述、可发现、可限制。一个 server 暴露了什么能力，输入 schema 是什么，返回什么结果，哪些动作有副作用，都应该被清楚表达。

- **工具要有 schema**：没有 schema，模型调用工具就会变成自然语言猜参数。
- **权限要在协议外也成立**：协议能描述能力，但真正的授权、审计和隔离仍要由系统实现。
- **错误要可传递**：工具失败、超时、权限不足，必须明确返回，而不是让模型猜。

## 知识节点

### Server

MCP Server 是提供能力的一侧。它可以暴露 resources、tools、prompts 等，让 AI 客户端读取信息或调用动作。

Server 的设计重点是边界：

- 暴露哪些资源
- 哪些工具只读，哪些有副作用
- 参数 schema 是否清楚
- 错误如何返回
- 是否需要用户授权
- 日志和审计在哪里记录

一个不加限制的 MCP server，很容易把本地文件、内部 API 或高风险动作暴露给模型。

### Client

MCP Client 是连接模型和 MCP server 的一侧，比如桌面应用、IDE、Agent runtime 或聊天客户端。

Client 负责发现 server 能力，把工具信息交给模型，并把模型生成的调用请求转回协议消息。它也应该负责用户确认、权限提示、会话隔离和工具调用展示。

判断一个 client 是否靠谱，重点看它是否让用户知道：当前连接了哪些 server，模型能调用哪些工具，调用前是否需要确认。

### Tool Schema

Tool Schema 描述工具名字、用途、参数、返回值和约束。它是模型正确调用工具的关键。

好的 schema 不只是字段类型，还要说明：

- 这个工具什么时候用
- 参数代表什么
- 哪些字段必填
- 是否会修改外部状态
- 失败时返回什么

**Tool schema 写得模糊，模型就会用错误参数填空。**

::: info 相关 topic
- [提示词（Prompt）](/zh/handbook/ai/prompt/)：工具描述本质上也是 prompt 的一部分。
- [智能体（Agent）](/zh/handbook/ai/agent/)：Agent 的工具调用能力必须和状态、权限、停止条件一起设计。
:::

### Permission

Permission 是 MCP 真正进入产品时最容易被低估的问题。

MCP 让工具连接更方便，但方便不等于安全。读一个文档、查一个 issue、创建一个 PR、发一笔支付、删除一个文件，这些动作风险完全不同。

Permission 至少要区分：

- 只读还是写入
- 当前会话授权还是长期授权
- 是否需要用户确认
- 是否能访问敏感信息
- 是否会产生外部副作用
- 是否可撤销和审计

MCP server 暴露能力之前，应该先定义权限模型。

## 在 AI x Web3 中的位置

MCP 在 AI x Web3 中可以作为 Agent 连接链上工具和开发工具的接口层。例如读取区块浏览器、查询合约文档、调用 RPC、生成交易草稿、读取项目 issue。

但 MCP 本身不是钱包安全方案。它可以标准化工具入口，不能替代账户权限、交易模拟、签名确认、session key 和审计日志。

比较稳的设计是：MCP 负责工具发现和调用格式；Web3 账户系统负责最终权限和执行边界。

## 最小实践

做一个只读 MCP server。

它只暴露两个工具：

- `search_docs(query)`：搜索本地项目文档。
- `get_file(path)`：读取白名单目录里的文件。

要求：

- 不能读取白名单外路径。
- 返回结果必须带来源路径。
- 工具调用要写日志。
- 错误要明确返回，而不是静默失败。

完成后，再设计一个“写入工具”的权限升级方案：什么时候需要用户确认，如何撤销授权，如何审计每次调用。

## 扩展阅读

- [Model Context Protocol Architecture](https://modelcontextprotocol.io/docs/learn/architecture)：官方架构说明，适合理解 client、server、tools、resources 的分工。
- [Model Context Protocol Specification](https://modelcontextprotocol.io/specification/2024-11-05/basic/index)：协议原文，适合查看消息格式和 JSON-RPC 基础。
- [OpenAI MCP Overview](https://platform.openai.com/docs/mcp/overview)：了解 OpenAI API / ChatGPT 生态如何接入 MCP server。
- [Claude Code MCP Docs](https://docs.claude.com/en/docs/claude-code/overview)：看 MCP 在本地开发工具中的使用方式。
- [GitHub: modelcontextprotocol/mcp-docs](https://github.com/modelcontext-protocol/mcp-docs)：官方文档仓库，适合跟踪文档和规范变化。
