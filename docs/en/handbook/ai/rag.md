---
title: Retrieval-Augmented Generation（RAG）
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/ai/rag/
---

# Retrieval-Augmented Generation（RAG）

> RAG is not as simple as "connecting a vector database to a model." It is an evidence chain that retrieves external knowledge, filters it, cites it, and gives it to the model so the system can reduce outdated knowledge and unsourced answers.

## Why Learn This

An LLM's training knowledge becomes outdated, and the context window cannot hold the entire internet, all protocol documentation, and every historical governance discussion. RAG exists so that when a user asks a question, the system first finds relevant material from a knowledge base, then asks the model to answer based on that material.

RAG is common in real AI applications: product-doc Q&A, codebase assistants, research summaries, customer-support knowledge bases, SDK copilots, and internal knowledge retrieval. But many RAG demos only reach "we can retrieve some paragraphs"; they have not reached "the answer can be verified."

The core of RAG is not to make answers longer. It is to make answers sourced, versioned, and bounded. **RAG without citation and freshness only moves hallucination from inside the model into the retrieval system.**

## First Principles

> **RAG reliability depends on the evidence chain, not on the label "vector database."**

A RAG system makes at least three judgments: how documents are chunked, what content is retrieved for a query, and how the answer cites or refuses to answer. If any layer is wrong, the model will speak smoothly using the wrong material.

- **Retrieved results are not facts**: they are candidate evidence, and you still need to check source, time, version, and applicability.
- **Citations must return to the original source**: key claims in the answer should trace back to a specific document, paragraph, or on-chain record.
- **Retrieval failure must allow refusal**: when evidence cannot be found, the system should say "uncertain" instead of letting the model fill the gap.

## Knowledge Nodes

### Chunking

Chunking splits long documents into retrievable pieces. If chunks are too small, semantics break. If chunks are too large, retrieval results are noisy and token cost rises.

Technical documentation needs especially careful chunking. Function descriptions, parameter tables, risk warnings, version notes, and code examples often span multiple paragraphs. If you split only by fixed character count, the model may get the function name without the constraints.

A steadier approach is to split by structure: headings, API endpoints, function descriptions, standard sections, FAQ pairs, audit notes, or changelogs. Each chunk should preserve source URL, heading path, update time, and version.

### Vector DB

A Vector DB stores embeddings and retrieves related chunks by similarity. It solves the problem of "how to quickly find semantically similar content."

But vector similarity does not mean the answer is correct. An old SDK document may be highly similar to the user's question but no longer applicable; a third-party blog may look very close to official documentation but lack authority.

So a Vector DB should not store only vectors. It should also store metadata: source, version, chain, update time, trust level, and deprecation status. Filter first, then rank.

::: info Related Topic
- [Embedding](/en/handbook/ai/llm/): first understand how text becomes comparable vectors.
- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings): see common embedding use cases and vector-similarity basics.
:::

### Retriever

A Retriever is the component that returns candidate material based on the user's question. It can be vector search, keyword search, hybrid search, graph search, or search with metadata filters.

A good retriever cannot look only at semantic similarity. It also needs to know which product, version, time period, official documentation, or community discussion the user is asking about. The same API may have different parameters across SDK versions.

A practical judgment: **if the user question contains a version, environment, time, address, or concrete object, your retriever should not rely only on pure vector search.**

### Rerank

Rerank reorders candidate material after initial retrieval, moving more relevant, more trusted, and more complete content to the front.

It is often used when there are many candidate results, similarity scores are close, or hybrid retrieval is involved. For technical-doc Q&A, rerank can reduce results that have similar titles but wrong content. For governance discussions, it can move paragraphs that discuss the core dispute ahead of casual conversation.

Rerank adds latency and cost, so it depends on the scenario. For asset-risk or developer-documentation Q&A, it is often worth adding. For small FAQs, it may not be necessary.

### Citation

Citation connects key conclusions in the answer back to sources. It is not decoration; it is the user's entry point for verifying the answer.

In technical Q&A, citation should at least explain:

- which document or on-chain record a statement came from
- whether the source is official
- document version or update time
- which conclusions are model summaries
- where evidence is insufficient

If a RAG system cannot show sources, users cannot know whether an answer is based on documentation, old model knowledge, or model completion.

## Where It Fits in AI x Web3

RAG sits between the Knowledge Base and the model. It helps Agents look up material, fill context, and cite evidence, but it is not responsible for final execution.

Common uses include:

- protocol documentation Q&A
- contract interface explanation
- governance proposal and forum summaries
- audit report retrieval
- SDK / API copilot
- adding project background during transaction interpretation

When RAG results affect on-chain actions, they still need simulation, policy, and human check. A document saying a function "can be called" does not mean the current user "should sign."

## Minimum Practice

Build a minimal "protocol documentation RAG Q&A."

Choose an official documentation site, crawl 10 to 20 pages, chunk them by heading structure, and store them in a vector database. When the user asks a question, the system returns an answer and citations.

Test at least three question types:

- API usage that clearly exists in the docs
- a question that does not exist in the docs, where the system should refuse
- an old-version or uncertain-version question, where the system should ask the user to verify the version

Force the output to distinguish:

- `answer`
- `sources`
- `uncertainties`
- `needs_version_check`

The point of this exercise is the evidence chain, not the UI.

## Further Reading

- [OpenAI Embeddings Guide](https://platform.openai.com/docs/guides/embeddings): understand how vector representations support semantic search, clustering, and RAG.
- [OpenAI File Search Guide](https://platform.openai.com/docs/guides/tools-file-search): learn how hosted file retrieval connects external material to model workflows.
- [LangChain Retrievers](https://docs.langchain.com/oss/python/integrations/retrievers/index): see common retrievers, vector databases, rerankers, and hybrid retrieval integrations.
- [Pinecone RAG Guide](https://docs.pinecone.io/guides/get-started/build-a-rag-chatbot): useful for seeing a RAG data flow from the perspective of a vector database.
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/): pay attention to vector and embedding risks, Prompt Injection, and the spread of incorrect information.
