---
title: Wallet
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/web3/wallet/
---

# Wallet

> A wallet is not Web3's "login button." It is the entry point where users manage accounts, sign authorizations, send transactions, switch networks, and confirm risks. Product quality often first shows up in whether wallet interactions are clear.

## Why Learn This

Web3 applications cannot avoid wallets. Users connect wallets, read addresses, sign messages, send transactions, approve tokens, and switch networks at the wallet boundary. Treating the wallet only as an SDK integration makes it easy to ignore safety and experience problems.

A successful wallet connection does not mean the user understands the next action. The real questions are: does the user know which chain they are on, which contract they are interacting with, which asset they authorized, how much gas they will pay, and whether recovery is possible after failure?

**The wallet is the final confirmation interface before user intent enters on-chain execution.**

In products, wallet interactions should at least distinguish three types of actions:

- **Connect wallet**: the application reads address and network; this does not mean it can move assets.
- **Sign message**: the user proves control of an address, possibly for login, authorization, or order creation.
- **Send transaction**: the user requests a change to on-chain state, which may transfer funds, approve tokens, call contracts, or pay gas.

These three actions have completely different risks. Page copy, button states, and confirmation prompts should also be different.

## First Principles

> **A wallet manages on-chain control, not "account profile data."**

In traditional login systems, platforms can reset passwords, ban accounts, and recover state. In wallet systems, control comes from private keys or smart-account rules. Applications can request connection and signature, but should not assume they own the user's account.

- **Connection is not asset authorization**: reading an address and initiating a transaction are two completely different permission layers.
- **Signatures must be explainable**: users need to know the purpose of the signature, not only see hexadecimal data.
- **Network is context**: the same address can have different assets and state on different chains.

## Knowledge Nodes

### EOA

**Difficulty: Beginner.** First understand that the most common wallet account is an externally owned account controlled by a private key.

EOA means Externally Owned Account. It is controlled by a private key. It can sign messages, initiate transactions, pay gas, and call contracts. Most browser wallets and mobile wallets create this type of account for users by default.

EOAs are simple, general, and widely compatible with the ecosystem, but they have obvious limits: private-key loss is hard to recover from, permissions are hard to split, automation is weak, and user experience is often interrupted by gas, network switching, and signature popups.

::: info Related Topic
- [Account Abstraction](/en/handbook/web3/account-abstraction/): continue with how Smart Accounts extend account control logic from private keys to programmable rules.
:::

### Mnemonic

**Difficulty: Beginner.** A mnemonic is a high-risk secret used to recover a wallet. It is not an ordinary verification code, and no application should ask for it.

A Mnemonic is usually a set of words used to recover private keys inside a wallet. It exists to make backup easier for users, but it also makes phishing attacks easier to disguise as "enter your seed phrase to recover your account."

Any webpage, support agent, AI Agent, form, or script asking you to input a mnemonic should be treated as dangerous by default. Real products should not ask users to hand seed phrases to the application.

Do not design flows like "enter mnemonic to connect wallet" in a product. The correct approach is to let users recover accounts inside the wallet application, then let the dApp request wallet connection.

### Transaction

**Difficulty: Intermediate.** A transaction is a formal request to change on-chain state. Once successfully included on-chain, it usually cannot be casually rolled back like a database record.

A Transaction can be a transfer or a contract method call. The wallet asks the user to confirm transaction content, chain, contract address, gas, and possible asset changes. The application should explain this information as clearly as possible.

A common misunderstanding is treating "clicking a button" as the transaction itself. In reality, the button only initiates a request; the transaction still goes through wallet confirmation, signing, broadcasting, inclusion, and execution. Every step can fail.

The frontend should at least display or handle these states:

- waiting for the user to confirm in the wallet
- user rejected signature
- transaction broadcasted, waiting for block confirmation
- transaction succeeded
- transaction failed or reverted
- transaction pending for too long, requiring retry or explorer guidance

### Gas

**Difficulty: Beginner.** Gas is the cost of on-chain execution. It affects both user payment and whether the transaction can be processed in time.

Gas pays for network execution and storage resources. Users usually pay gas fees when sending transactions. If gas estimation is wrong, the network is congested, or balance is insufficient, a transaction may fail or get stuck.

Products should not only show "confirm transaction." They should tell the user roughly how much it costs, which asset pays the fee, whether fees may still be consumed on failure, and whether retry is possible.

### Explorer

**Difficulty: Beginner.** A block explorer is the window through which users and developers view on-chain facts, but it is not the chain itself.

Explorers can show addresses, transactions, contracts, events, token transfers, and execution state. For users, they confirm whether a transaction succeeded; for developers, they help debug failures, verify contracts, and trace state.

If an AI product cites on-chain information, it should ideally provide an explorer link or transaction hash so users can verify it themselves instead of only trusting the model summary.

When reading a transaction, check at least:

- Status: success or failure.
- From / To: who initiated it and which address was called.
- Method: which contract method was called.
- Value: whether native asset was transferred directly.
- Token Transfers: whether token transfers happened.
- Logs: which events the contract emitted.
- Gas Used: how much gas was actually consumed.

## Where It Fits in AI x Web3

When an AI Agent wants to enter on-chain execution, it eventually hits the wallet boundary. It can help explain transactions, prepare parameters, check risks, and generate operation plans, but signatures and permissions cannot be casually handed to the model.

A more reasonable design is: AI handles understanding and assistance, the wallet handles confirmation and authorization, and a policy contract or smart account enforces execution constraints. This gives users AI efficiency while preserving control over assets and permissions.

## Minimum Practice

Create a wallet-interaction map:

1. Use a test wallet to connect to a testnet dApp.
2. Record the full flow: connect wallet, switch network, sign message, send transaction, view explorer.
3. Mark which actions only read information and which actions change on-chain state.
4. Write the key information the user should see at each step.
5. Consider which actions must retain human confirmation if assisted by an AI Agent.

## Further Reading

- [MetaMask Wallet Docs](https://docs.metamask.io/wallet/): learn developer interfaces for wallet connection, accounts, signatures, and transaction requests.
- [Ethereum Accounts](https://ethereum.org/en/developers/docs/accounts/): understand the basic difference between EOAs and contract accounts.
- [Ethereum Transactions](https://ethereum.org/en/developers/docs/transactions/): learn transaction structure, signatures, and execution flow.
- [WalletConnect Docs](https://docs.walletconnect.network/): understand cross-wallet connections and session management.
- [EIP-1193](https://eips.ethereum.org/EIPS/eip-1193): an important interface standard for wallet Provider APIs.
