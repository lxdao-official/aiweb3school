---
title: Oracle
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/web3/oracle/
---

# Oracle

> A blockchain cannot naturally know what happens outside the chain. An Oracle brings external information such as prices, weather, match results, proof of reserves, randomness, or computation results on-chain in a way contracts can use.

## Why Learn This

Many on-chain protocols depend on external data. Lending protocols need asset prices, derivatives need index prices, insurance protocols need event outcomes, and RWA protocols need reserves and asset status.

Oracle is the bridge between on-chain systems and the outside world. A bridge brings capability, but also risk: wrong data sources, delayed updates, price manipulation, feed interruption, and aggregation bugs can directly affect contract execution.

**An oracle is not a "real-world API." It is a data submission and verification mechanism that on-chain contracts are willing to trust.**

## First Principles

> **Contracts can only execute based on data visible on-chain, so once external data enters the chain, it becomes part of protocol rules.**

If a lending protocol uses a price feed to judge liquidation, then the feed's update frequency, data sources, aggregation method, and abnormal-case handling all affect user asset safety.

- **Data sources are trust boundaries**: who provides data, who aggregates it, and who can update it must be clear.
- **Latency becomes risk**: when prices move quickly, old data can cause wrong liquidation or bad debt.
- **Abnormal cases need protection**: contracts should handle stale prices, extreme jumps, and paused feeds.

## Knowledge Nodes

### Price Feed

**Difficulty: Beginner.** Price Feed is the most common oracle form, providing asset prices to contracts.

DeFi protocols use price feeds to calculate collateral ratios, liquidation lines, swap limits, borrowing capacity, and net asset value. A price looks like a number, but behind it are data sources, update time, precision, aggregation method, and abnormal handling.

When reading a price, check at least:

- which asset pair the feed represents
- what the decimals value is
- whether the update time is too old
- whether the returned value is abnormal
- whether the feed address on the current chain is correct

::: info Related Topic
- [Chainlink Data Feeds](https://docs.chain.link/data-feeds): learn how price feeds are used, updated, and exposed on-chain.
:::

### Data Feed

**Difficulty: Intermediate.** Data Feed includes not only prices, but also proof of reserves, interest rates, macro data, sports results, or other off-chain information.

Whenever contract execution depends on off-chain data, ask the same questions: where does data come from, how is it updated, who can submit it, whether it is verifiable, and what happens when it is wrong.

For example, RWA protocols may need reserve data; insurance protocols may need disaster or flight status; games may need randomness or match results. Contracts cannot directly know any of these by themselves.

### Oracle Risk

**Difficulty: Advanced.** Oracle Risk is the systemic risk introduced when off-chain data enters on-chain execution.

Common risks include:

- data source manipulation
- delayed feed updates
- aggregator nodes offline
- decimals or unit misunderstanding
- low-liquidity asset price attacks
- contracts not checking stale prices
- opaque oracle upgrade or permission changes

Oracle risk often compounds with DeFi risk. A wrong price feed can cause wrong liquidations, bad debt, arbitrage, and losses in asset pools.

### AI Oracle

**Difficulty: Advanced.** AI Oracle is a direction where model inference, scoring, classification, or generation results are submitted to on-chain systems.

It is more complex than ordinary price feeds because AI output is usually not a simple objective number. "Is this content violating rules," "is this task complete," or "is this address high risk" may all involve model version, input data, prompt, evaluation standard, and dispute handling.

If you design an AI Oracle, consider at least:

- whether input data is traceable
- whether model version and prompt are recorded
- whether output can be reviewed
- whether challenge or arbitration is allowed
- what on-chain consequences wrong output causes

## Where It Fits in AI x Web3

Oracle is one of the key bridges in AI x Web3. AI Agents need to read on-chain and off-chain data; if contracts use AI results, model output must also become on-chain data that is verifiable or disputable.

But do not imagine AI Oracle as "whatever the model says, the contract executes." A more reasonable approach is: AI produces a result, the system records sources and confidence, and high-risk scenarios introduce human-in-the-loop, challenge periods, multi-party validation, or economic penalties.

## Minimum Practice

Run a price-feed risk check:

1. Find an on-chain ETH/USD or BTC/USD price feed.
2. Check feed address, decimals, latest price, and update time.
3. Think through which protocol actions would be affected if this price were delayed by 30 minutes.
4. Write which conditions a contract should check when reading this feed.
5. Then design an AI Oracle output scenario and list the required input, model version, and dispute process records.

## Further Reading

- [Ethereum Oracles](https://ethereum.org/en/developers/docs/oracles/): understand why oracles exist and how off-chain data enters on-chain systems.
- [Chainlink Data Feeds](https://docs.chain.link/data-feeds): learn developer usage of price and data feeds.
- [Chainlink Data Feeds API Reference](https://docs.chain.link/data-feeds/api-reference): see common interfaces such as AggregatorV3Interface.
- [Pyth Docs](https://docs.pyth.network/): learn another type of low-latency price oracle network.
- [UMA Optimistic Oracle](https://docs.uma.xyz/developers/optimistic-oracle): learn the idea of optimistic oracles with challenge mechanisms.
