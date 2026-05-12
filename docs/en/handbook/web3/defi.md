---
title: Decentralized Finance（DeFi）
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/web3/defi/
---

# Decentralized Finance（DeFi）

> DeFi is an open financial system built on smart contracts. It lets assets, trading, lending, stablecoins, and liquidity be combined through protocols, and it also lets risk propagate along protocol dependency chains.

## Why Learn This

Many AI x Web3 projects touch DeFi: transaction interpretation, yield strategies, risk monitoring, liquidation alerts, automated rebalancing, asset management, and protocol data analysis. Even if you are not building a financial product, you need to understand basic concepts such as tokens, liquidity, prices, lending, and oracles.

The hard part of DeFi is not only "whether the contract can run," but how assets and mechanisms affect each other. A simple-looking swap may involve AMM curves, slippage, liquidity depth, fees, MEV, and price oracles.

**The core of DeFi is not "removing intermediaries," but turning financial rules into on-chain protocols that are composable, verifiable, and attackable.**

## First Principles

> **DeFi protocols manage asset state, not only application interfaces.**

In traditional finance, much state lives in institutional ledgers. DeFi puts balances, collateral, debt, liquidity, trading, and liquidation into contract systems. Transparency improves, but mechanism errors, price shocks, and external dependencies are exposed faster.

- **Assets are protocol inputs**: token standards, decimals, approvals, and balances all affect protocol behavior.
- **Liquidity determines executability**: having a price does not mean a trade can execute; executing does not mean it executes cheaply.
- **Composability amplifies risk**: when one protocol breaks, many protocols depending on it may be affected.

## Knowledge Nodes

### Token

**Difficulty: Beginner.** Token is the asset unit of DeFi, but different tokens vary greatly in standard, precision, permissions, and risk.

ERC-20 is the most common fungible token standard. User balances, transfers, approvals, trading, and lending usually revolve around tokens.

When looking at a token, do not only look at name and icon. Check at least:

- whether the contract address is correct
- what the decimals value is
- total supply and issuance permission
- whether it can be paused, frozen, minted, or upgraded
- whether it has special transfer tax or blacklist logic

Wrong token addresses and decimals handling are very common risk sources in DeFi frontends and Agent tools.

### AMM

**Difficulty: Intermediate.** AMM replaces traditional order books with liquidity pools and pricing formulas, allowing users to trade directly with contracts.

In AMMs such as Uniswap, users deposit two assets into a pool, traders swap one asset for another, and price is determined by pool state and formula. The deeper the liquidity, the smaller the price impact for the same trade size in general.

Several key AMM concepts:

- **Slippage**: the gap between expected price and actual execution price.
- **Liquidity provider**: provides assets to the pool, earns fees, and bears impermanent loss.
- **Price impact**: large trades change pool ratios and worsen execution price.
- **MEV risk**: transaction ordering can be exploited, for example in sandwich attacks.

::: info Related Topic
- [Uniswap: How Uniswap Works](https://developers.uniswap.org/docs/get-started/concepts/how-uniswap-works): understand the basics of AMMs, liquidity pools, and swaps.
:::

### Lending

**Difficulty: Intermediate.** Lending protocols put deposits, borrowing, collateral ratios, interest rates, and liquidation rules into contracts.

Users can deposit assets to earn interest, or collateralize assets to borrow another asset. Whether a loan can remain open depends on collateral value, debt value, liquidation threshold, and oracle prices.

Lending-protocol risk is often not a single point:

- collateral price drops quickly
- oracle price is delayed or abnormal
- insufficient liquidity causes liquidation failure
- parameters are set too aggressively
- dependent assets depeg or contracts break

If AI gives lending suggestions, it must explain collateral ratio, health factor, liquidation price, and price source. It cannot only say "higher yield."

### Stablecoin

**Difficulty: Intermediate.** Stablecoins are the unit of account and settlement base in DeFi, but "stable" comes from different mechanisms and is not guaranteed by nature.

Common stablecoins may be backed by fiat reserves, over-collateralized crypto assets, algorithmic mechanisms, or hybrid structures. Their risks also differ: reserve transparency, redemption ability, collateral volatility, governance parameters, regulation, and liquidity all affect stability.

When looking at a stablecoin, ask:

- What maintains the peg?
- Who can issue and burn?
- Where are reserves or collateral?
- Who bears loss during depeg?
- How deep is liquidity in major pools?

### Liquidity

**Difficulty: Beginner.** Liquidity determines whether assets can be bought, sold, borrowed, liquidated, or exited at reasonable prices.

In DeFi, if "price" is not backed by liquidity, it is only a number on the screen. A token marked at $1 does not mean you can sell a large position at $1.

Liquidity problems show up as:

- swap slippage increases
- lending liquidation becomes hard
- oracle prices are easier to manipulate
- LP withdrawals increase protocol risk
- cross-protocol strategies cannot exit in time

## Where It Fits in AI x Web3

When AI enters DeFi, the safest starting point is information organization and risk assistance: explaining transactions, summarizing positions, monitoring liquidation, identifying abnormal prices, and drafting strategies. The truly high-risk part is automatic execution: swaps, lending, leverage, approvals, cross-chain actions, and liquidation.

If an Agent executes DeFi operations, it needs at least amount limits, protocol allowlists, slippage caps, simulation results, oracle checks, human confirmation, and post-transaction audit records.

## Minimum Practice

Break down one DeFi transaction:

1. Choose a public swap transaction hash.
2. In a block explorer, inspect input token, output token, route, slippage, and fee.
3. Find the pool or router contract involved.
4. Explain how much asset the user actually received and how it differed from the expected price.
5. Write which limits must be set if an AI Agent executes similar trades.

## Further Reading

- [Ethereum DeFi](https://ethereum.org/en/defi/): understand DeFi concepts and risks from a user perspective.
- [ERC-20 Token Standard](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/): understand the basic interface of fungible tokens.
- [Uniswap Docs](https://developers.uniswap.org/docs/get-started/concepts/how-uniswap-works): learn how AMMs and liquidity pools work.
- [Aave Developers](https://aave.com/docs/developers/overview): developer entry point and core concepts for lending protocols.
- [Chainlink Data Feeds](https://docs.chain.link/data-feeds): understand how price data enters on-chain systems in DeFi.
