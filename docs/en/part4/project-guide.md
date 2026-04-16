---
title: Project Guide
createTime: 2026/04/16 15:30:00
permalink: /en/project-guide/
---

# Project Guide

## What this lesson solves

At this point, many people hit the same problem: they understand some concepts and can discuss examples, but they still do not know how to begin an actual AI × Web3 project. This lesson turns “interesting idea” into “small executable project.”

## Do not start by building the entire system

The most common mistake is trying to build all of this at once:

- model capabilities
- onchain execution
- wallet logic
- community system
- incentives
- analytics

That usually makes the scope too large and the value proposition too unclear.  
The better approach is to build a product with one sharp value point first.

## Step 1: define the user problem first

Do not begin with a feature list. Begin with one question:

> Why should a real user use this?

A good problem definition should be specific about:

- who the user is
- what context they are in
- why the current workflow is inefficient
- why your approach is meaningfully better

Examples:

- helping DeFi users understand position risk faster
- helping researchers read governance proposals faster
- helping creators generate digital assets with onchain identity

If this layer is vague, every later decision will drift.

## Step 2: assign clear roles to AI and Web3

AI and Web3 should not both try to do everything.

A cleaner split is:

- AI handles understanding, generation, recommendation, and planning
- Web3 handles assets, identity, transparency, incentives, or governance

If the split is unclear, the product becomes hard to reason about.

## Step 3: reduce the idea into an MVP

A minimum viable version usually only needs to answer three questions:

1. What is the smallest input?  
2. What is the smallest processing flow?  
3. What is the smallest useful output?  

For example, a governance proposal assistant might be:

- input: a proposal link or proposal text
- process: AI summarizes and extracts risk points
- output: a structured summary and reading priorities

That is already enough to test user value.

## Common MVP shapes

### Type 1: research assistant

Good starting point for beginners because:

- risk is low
- data is accessible
- output is easy to evaluate

### Type 2: monitoring and alert tools

Examples:

- liquidation alerts
- position health reminders
- protocol update notifications

These are usually easier to ship than execution-heavy systems.

### Type 3: semi-automated execution

The system acts only after user confirmation.  
This is a much more realistic step than full automation.

## Step 4: split the product into minimal layers

Most AI × Web3 products can be described through four layers:

- input layer: user input, wallet state, onchain data
- processing layer: interpretation, rule checks, strategy generation
- output layer: summaries, suggestions, transaction candidates, generated content
- constraint layer: permissions, whitelists, amount limits, risk thresholds

The last layer is usually the most important.  
Without it, many products look powerful but are not actually safe or usable.

## Step 5: design failure before sophistication

For these projects, it is more useful to ask “how will this fail?” than “how smart can it become?”

You should decide early:

- what happens if data cannot be fetched
- what happens if the model makes a bad judgment
- what happens if an onchain call fails
- what happens if wallet permissions are too wide
- what happens if users do not trust the system

Clear failure handling is part of the product.

## A practical delivery rhythm

### Stage 1: solo demo

Prove the core value without building the full product.

### Stage 2: interactive prototype

Let users actually provide input and see output.

### Stage 3: connect real onchain data

Bring in live data once the core loop is meaningful.

### Stage 4: limited execution or continuous monitoring

Only add execution when the boundaries are clear.

## A simple test for whether a project deserves to continue

If users cannot clearly feel one of these after trying it:

- time saved
- risk reduced
- information clarified
- workflow simplified

then the project probably still has not found its core value.

## Minimum takeaway

After this lesson, you should be able to explain:

- why AI × Web3 projects should begin from the user problem, not the stack
- how to compress an idea into one MVP value point
- why constraints and failure modes are part of product design
- why research and monitoring products are usually more realistic starting points than full automation

## What comes next

The final lesson is about learning resources, so you can turn the first four parts into a longer-term study and building path.
