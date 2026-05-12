---
title: Inference
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/ai/inference/
---

# Inference

> Training determines what a model has learned; inference determines how the model responds to users in a real product. For builders, Inference is not a cloud-service button. It is a combined choice across latency, cost, context, stability, and deployment boundaries.

## Why Learn This

The first demo of many AI applications directly calls a model API. But once a product reaches real users, real traffic, and real tasks, the questions become concrete: what if the response is too slow, how do we control cost, will changing models break output, can private data be sent to a third-party API, is a local model good enough, and how does the service degrade if it fails?

The inference layer determines how model capability is consumed by the product. It connects upstream models, prompts, RAG, and Agents, and downstream interfaces, queues, caches, monitoring, and user experience.

**Model capability only enters a product system when it can be called stably, controllably, and observably.**

## First Principles

> **The core of inference service is not "producing an answer," but delivering a usable answer under constraints.**

The same model can behave very differently through an API, GPU service, local quantized model, or edge device. You are not choosing a single model; you are choosing a balance between latency, cost, quality, privacy, and operational complexity.

- **Quality has a cost**: stronger models usually mean higher cost, longer latency, or more complex deployment.
- **Deployment changes boundaries**: API models reduce infrastructure burden; local models give you more control.
- **Services should be replaceable**: clear model-call encapsulation makes fallback, rollout, and evaluation possible.

## Knowledge Nodes

### API Model

**Difficulty: Beginner.** First understand how hosted model APIs are called, what parameters and limits they have, and how their cost structure works.

API Model means calling a model through a cloud service: sending input to a model provider and receiving text, structured output, tool-call results, or multimodal results. Its advantages are fast onboarding, fast model updates, and low infrastructure burden.

But API does not mean "no engineering problems." You still need to handle rate limits, timeouts, retries, log redaction, billing control, version changes, and output regression. In Agent scenarios especially, one user request may trigger multiple model calls, amplifying cost and latency.

::: info Related Topic
- [Prompt](/en/handbook/ai/prompt/): input quality in API calls directly affects output stability.
- [Evaluation](/en/handbook/ai/evaluation/): before changing a model or parameter, use an eval set to check whether output regressed.
:::

### Local Model

**Difficulty: Intermediate.** You need to understand why running models locally gives more control, and why it demands more hardware, deployment, and tuning ability.

Local Model means running a model on your own device, server, or private environment. It fits scenarios with high privacy requirements, cost sensitivity, offline operation, or deep customization needs.

Its limitations are also direct: model weights, VRAM, context window, concurrency, quantization method, and inference framework all affect quality. For many teams, local models do not replace all APIs. They take specific tasks: classification, extraction, code completion, lightweight Agents, private-data processing, or fallback.

::: info Related Topic
- [Fine-tuning](/en/handbook/ai/fine-tuning/): local or private models often appear together with fine-tuning, LoRA, and domain data.
:::

### Quantization

**Difficulty: Intermediate.** Quantization trades off model size, inference speed, and output quality; you cannot only look at whether it can run.

Quantization reduces model weights or computation precision, such as going from FP16 to INT8 or INT4, so the model can run with less VRAM and compute. It makes running large models on personal computers, smaller GPUs, or edge devices possible.

The issue is that quantization may reduce output quality, especially in long reasoning, code generation, multilingual tasks, math, and tool calls. Whether a quantized model is usable should not be judged only by subjective chat experience; it should be tested on your own task samples.

### Serving

**Difficulty: Advanced.** Serving focuses on turning a model into a stable service: concurrency, queues, streaming output, caching, monitoring, failure handling, and version management.

Serving deploys a model as a service callable by applications. It usually involves model loading, request queues, batching, GPU utilization, token streaming, logs, metrics, health checks, and scaling.

A mature inference service should at least answer:

- How are failed requests retried or degraded?
- How are model versions rolled out gradually?
- How are input and output logs redacted?
- Should long requests enter a queue?
- How are cost, latency, and error rate monitored?

**If serving is weak, the stronger the model is, the harder online problems become to debug.**

## Where It Fits in AI x Web3

AI x Web3 projects often need to send on-chain data, user intent, contract interfaces, and risk warnings into models. The inference layer directly affects whether users can safely wait for results, whether they are willing to pay the cost, and whether Agents can complete pre-chain checks in a reasonable time.

If a model participates in transaction explanation, contract analysis, strategy suggestions, or Agent execution, the inference service must leave auditable records: which model was used, where inputs came from, what the output was, whether tools were triggered, and how failures were handled. On-chain actions are hard to reverse, so the inference layer cannot behave as casually as ordinary chat.

## Minimum Practice

Run a minimal inference comparison:

1. Choose one task, such as "summarize the risk of a transaction" or "extract callable methods from a contract ABI."
2. Run it once with a hosted API model.
3. Run it once with a local model or smaller model.
4. Record latency, cost, output quality, privacy boundary, and failures.
5. Write down which one you would choose in a product, and how fallback would be designed.

The point is not to prove which model is best, but to learn how to place model choice inside real constraints.

## Further Reading

- [OpenAI Text Generation Guide](https://platform.openai.com/docs/guides/text-generation): learn the basic calling pattern and output control for hosted model APIs.
- [OpenAI Models](https://platform.openai.com/docs/models): see differences in capability, cost, and context windows across models.
- [vLLM Documentation](https://docs.vllm.ai/): learn high-throughput inference service, continuous batching, and OpenAI-compatible serving.
- [llama.cpp](https://github.com/ggml-org/llama.cpp): learn local model inference, quantized models, and lightweight deployment.
- [Ollama Documentation](https://github.com/ollama/ollama): a good entry point for local model running and developer experience.
