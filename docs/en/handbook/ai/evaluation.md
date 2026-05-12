---
title: Evaluation
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/ai/evaluation/
---

# Evaluation

> Evaluation turns "it feels pretty good" into "the system can keep improving." Without evals, changes to prompts, models, RAG, Agents, and tool calls can only be judged by subjective trial use, and regression problems will eventually slow the team down.

## Why Learn This

One of the biggest problems in AI applications is unstable output quality. You change one prompt; some questions improve while others get worse. You switch models; average performance improves, but a critical scenario fails. You add RAG; answers become longer, but citations become less accurate.

Evaluation exists to solve these problems: using explicit samples, metrics, grading methods, and regression tests to decide whether the system really got better.

The goal of learning eval is not to make a beautiful report. It is to let the team answer: **did this change make key tasks more reliable? Did it introduce new failure modes?**

## First Principles

> **AI behavior that cannot be measured repeatedly cannot be improved reliably.**

AI system outputs are probabilistic, and user questions are open-ended. Without fixed samples and evaluation standards, it is hard to know whether system change came from real improvement, luck, or too few test cases.

- **Test tasks first, not only models**: users care whether the whole chain completes the task, not only model leaderboard scores.
- **Protect key failure cases first**: high-risk errors, common questions, and edge cases should enter the regression set.
- **Evaluation should stay close to the product**: the further it is from real input, the more eval becomes self-comfort.

## Knowledge Nodes

### Harness

A Harness is the framework that runs evals. It feeds samples, calls the system, collects outputs, runs graders, and records results.

A minimal harness needs at least:

- input samples
- expected outputs or grading rules
- system version under test
- model and parameter configuration
- run logs
- result report

The value of a harness is repeatability. Without repeatable evals, it is hard to compare different prompts, models, and retrieval strategies.

### Golden Set

A Golden Set is a carefully selected and labeled group of test samples.

It does not have to be large. In early stages, 30 to 100 high-quality samples are often more useful than many casually collected questions. The key is to cover real tasks and key failure modes.

A Golden Set should include:

- common normal questions
- boundary questions
- questions easy to misjudge
- high-risk questions
- historical bugs
- real user feedback samples

**Every time you fix an important bug, consider turning it into a regression sample.**

### LLM-as-Judge

LLM-as-Judge uses a model to score model outputs. It works for evaluating open-ended answers, such as summary quality, completeness, format following, and source citation.

But it should not be mythologized. Judge models also have bias, miss issues, and can be influenced by output style. A steadier approach is:

- Use rule scoring for fields that can be judged automatically.
- Use LLM judge for open-ended quality.
- Keep human spot checks for high-risk samples.
- Regularly calibrate consistency between judge and human scoring.

LLM-as-Judge is an evaluation tool, not final truth.

### Regression

Regression prevents old problems from returning.

AI applications easily get "fix A, break B." One prompt change, model upgrade, or retriever adjustment can affect many old scenarios. A regression set fixes historical problems in place and reruns them for every change.

A practical workflow:

1. A user reports an error.
2. Reproduce and record the input.
3. Label the expected output or refusal condition.
4. Add it to the regression set.
5. Run it before every release afterward.

### Observability

Observability is the ability to observe system behavior online. Eval mostly happens before release; observability happens during real use.

You should record at least:

- input type and source
- retrieval results
- tool calls
- model output
- errors and retries
- user feedback
- cost and latency

Without observability, you do not know where real users fail, and you do not know what to add to the golden set.

## Where It Fits in AI x Web3

Eval is even more important in AI x Web3 systems because errors can affect assets, permissions, governance judgment, and on-chain execution.

You should especially evaluate:

- whether transaction explanations are accurate
- whether risk warnings miss issues
- whether tool-call parameters go out of bounds
- whether the system can refuse uncertain requests
- whether it can identify Prompt Injection
- whether citations and sources are traceable
- whether high-risk actions require human check

Eval does not replace transaction simulation and permission control, but it helps you continuously discover where the system is unreliable.

## Minimum Practice

Build a minimal eval for a "transaction explanation / documentation Q&A / Agent tool-call" prototype.

Prepare 30 samples:

- 10 normal questions
- 10 boundary or easily confused questions
- 5 historical bugs or expected-failure samples
- 5 malicious or injection samples

For each sample, define:

- input
- expected behavior
- information that must be included
- cases that must be refused or warned
- whether source citation is required

Then run the eval before and after every prompt, model, or retrieval-strategy change, and record the difference.

## Further Reading

- [OpenAI Evals API Reference](https://platform.openai.com/docs/api-reference/evals?api-mode=chat): see how the OpenAI platform creates and runs evals.
- [OpenAI: How evals drive the next chapter in AI](https://openai.com/index/evals-drive-next-chapter-of-ai/): understand why evals matter from a product and business perspective.
- [OpenAI Evals GitHub](https://github.com/openai/evals): open-source eval framework and examples, useful for understanding benchmark / grader organization.
- [LangSmith Evaluation Docs](https://docs.smith.langchain.com/evaluation): learn about datasets, experiments, feedback, and tracing for LLM applications.
- [RAGAS Documentation](https://docs.ragas.io/): useful for learning answer quality, context relevance, and faithfulness evaluation in RAG scenarios.
