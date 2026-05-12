---
title: Cryptography
createTime: 2026/05/12 00:00:00
permalink: /en/handbook/web3/cryptography/
---

# Cryptography

> In Web3, "accounts," "signatures," "addresses," and "ownership" are all built on cryptography. You do not need to become a cryptography researcher first, but you must know which actions prove identity, which actions authorize assets, and which things cannot be recovered once lost.

## Why Learn This

Many Web3 beginners understand wallets as account systems, signatures as login confirmations, and addresses as usernames. This becomes dangerous later, because on-chain systems do not have centralized customer support or password recovery like the traditional internet.

Cryptography here is not abstract theory; it is the product boundary. Private keys control assets, signatures express authorization, hashes fix data, and Merkle Trees let large amounts of data be verified efficiently.

**Understanding basic cryptography is about knowing when you must not "click confirm."**

This section does not require you to derive elliptic-curve formulas. A more realistic goal is: when you see a wallet popup, signature request, transaction hash, Merkle proof, or contract verification, you can judge what it is proving.

## First Principles

> **On-chain identity is not issued to you by a platform; it is determined by whether you can prove control of a private key.**

Web3 account systems turn "who has permission" from a centralized database record into a verifiable mathematical relationship. The benefit is openness, composability, and no platform permission. The cost is that users and applications must take key and signature risks more explicitly.

- **Private key is control**: losing the private key usually means losing control; leaking it means others gain control.
- **Signature is authorization evidence**: signed content must be human-readable, not only an unreadable data string.
- **Hash is commitment**: a hash cannot recover the original content, but it can verify whether data was changed.

## Knowledge Nodes

### Hash

**Difficulty: Beginner.** First understand that a hash turns arbitrary data into a fixed-length fingerprint, used to verify whether data is consistent.

A hash function maps input data into a fixed-length output. Ideally, changing even one character in the input produces a completely different output. On-chain systems commonly use hashes to identify transactions, blocks, data commitments, and contract bytecode.

A hash is not encryption. It usually cannot be "decrypted back to the original text." Its purpose is identity and integrity verification. For example, when you receive contract source code, you can use a hash or compilation result to check whether it matches deployed on-chain code.

Common uses include:

- Transaction hash: locate a transaction.
- Block hash: locate a block.
- Contract bytecode hash: check whether deployed code is consistent.
- Data commitment: publish the hash first, then reveal the original content later so others can verify it was not changed.

### Public Key

**Difficulty: Beginner.** A public key can be public. It is used to derive addresses or verify signatures, but it is not your login password.

Public Key is public information paired with a private key. Others can use the public key to verify that a signature came from the corresponding private key, but they cannot derive the private key from the public key.

In Ethereum contexts, users usually see addresses rather than full public keys. An address can be understood as a shorter identifier derived from the public key. Addresses can be public; private keys must never be public.

An address is not identity itself. It is only an identifier for a verifiable control relationship. It is meaningless that an address "looks official"; what matters is whether it comes from a trusted source and matches contract docs, the official website, and explorer verification information.

### Private Key

**Difficulty: Beginner.** A private key is account control itself. Any action that exposes it to webpages, screenshots, logs, or chat tools is extremely dangerous.

Private Key is used to generate signatures and prove that you control an account. In the traditional internet, leaked passwords can often be recovered or reset. In Web3, once a private key leaks, attackers can directly move assets or authorize malicious contracts.

Wallets, seed phrases, hardware wallets, multisigs, and account abstraction are all solving the same core problem: how to make key control safer, more recoverable, and more suitable for real users.

Basic private-key management rules are simple:

- Do not screenshot it.
- Do not upload it to cloud drives.
- Do not paste it into webpages.
- Do not send it to AI tools or customer support.
- Do not put it in code repositories or `.env.example`.
- Do not use your main wallet to test unfamiliar dApps.

::: info Related Topic
- [Wallet](/en/handbook/web3/wallet/): continue with how private keys are managed by wallets, and how users initiate signatures and transactions.
:::

### Signature

**Difficulty: Intermediate.** A signature is not a "login popup"; it is authorization proof over a specific message or transaction.

A Signature is generated by using the private key over a message. Verifiers can use the public key or address to check whether the signature is valid, confirming that the authorization came from the corresponding account.

The easiest place for signatures to go wrong is that users cannot understand what they are signing. Products should show readable content whenever possible, such as signing purpose, domain, chain ID, contract address, amount, expiration time, and risk warning. For Agents, signatures need permission boundaries even more; the model should not be able to freely trigger high-risk authorization.

### Merkle Tree

**Difficulty: Intermediate.** A Merkle Tree uses hashes to organize large amounts of data so that you can verify one piece of data belongs to the whole set with only a small proof.

A Merkle Tree hashes many pieces of data layer by layer until it produces one root. As long as the root is recorded in a trusted place, a user can use a Merkle proof to prove "my data is in this batch" without downloading all data.

It is common in airdrop lists, light clients, state proofs, and verifiable data structures. Understanding Merkle Trees helps you understand why blockchains can organize large amounts of state into verifiable structures.

## Where It Fits in AI x Web3

If an AI Agent wants to explain transactions, judge authorization, generate on-chain actions, or help users manage permissions, it must understand signature and key boundaries. A model can explain that "this approval appears to approve a token allowance," but it cannot keep private keys for users, and it must not push signatures when users do not understand the content.

Further, AI output itself may need to be signed, hashed, or recorded as audit evidence: what advice an Agent gave under what input, whether the user confirmed it, and whether the execution result matched the advice.

## Minimum Practice

Do a signature observation exercise:

1. Create a test wallet with no real assets.
2. In a test environment, initiate a normal transfer or message signature.
3. In the block explorer or wallet UI, observe the address, transaction hash, signature prompt, and chain ID.
4. Write down which information can be public and which must never be public.
5. Compare the difference between "signing a message" and "sending a transaction."

Do not use your main wallet for practice. Do not paste seed phrases or private keys into any webpage, chat tool, or code repository.

## Further Reading

- [Ethereum: Cryptography](https://ethereum.org/en/developers/docs/cryptography/): understand hashes, public/private keys, and signatures from the Ethereum perspective.
- [Ethereum Accounts](https://ethereum.org/en/developers/docs/accounts/): understand accounts, addresses, externally owned accounts, and contract accounts.
- [Ethereum Transactions](https://ethereum.org/en/developers/docs/transactions/): continue with how signatures enter transaction structure.
- [EIP-712](https://eips.ethereum.org/EIPS/eip-712): learn typed structured data signing and why readable signatures matter for user safety.
