# AI x Web3 School

<div align="center">

**An open learning handbook, bootcamp, and collaboration network for builders working at the intersection of AI and Web3.**

[Website](https://aiweb3.school/) | [English Docs](./docs/en/README.md) | [Chinese Docs](./docs/zh/README.md) | [Join Bootcamp](https://web3career.build/en/programs/AI-Web3-School?tab=apply) | [Telegram](https://t.me/aiweb3school) | [X](https://x.com/aiweb3school)

</div>

---

> [!IMPORTANT]
> This handbook is a work in progress. The roadmap and learning materials are being written in public, and many topics are not complete yet. Contributions, corrections, examples, translations, and learning resources are welcome.

## Current Bootcamp

<table>
  <tr>
    <td><strong>Program</strong></td>
    <td>AI x Web3 School Bootcamp</td>
  </tr>
  <tr>
    <td><strong>Schedule</strong></td>
    <td>May 17 - June 14, 2026</td>
  </tr>
  <tr>
    <td><strong>Format</strong></td>
    <td>3-week Bootcamp + 2-week hackathon</td>
  </tr>
  <tr>
    <td><strong>Focus</strong></td>
    <td>AI agents, wallets, onchain automation, payments, verification, privacy, decentralized AI, and practical AI x Web3 product building.</td>
  </tr>
  <tr>
    <td><strong>Apply</strong></td>
    <td><a href="https://web3career.build/en/programs/AI-Web3-School?tab=apply">English application</a> · <a href="https://web3career.build/zh/programs/AI-Web3-School?tab=apply">中文报名</a></td>
  </tr>
  <tr>
    <td><strong>Community</strong></td>
    <td><a href="https://t.me/aiweb3school">Telegram</a> · <a href="https://x.com/aiweb3school">X</a></td>
  </tr>
</table>

## Overview

AI x Web3 School is an open-source education project for people who want to understand, build, and contribute to AI-native Web3 applications.

The project combines:

- a bilingual learning handbook in English and Chinese
- a structured roadmap from fundamentals to applied AI x Web3 topics
- a Bootcamp and hackathon program for builders
- contribution-friendly docs for community writers, researchers, developers, and translators

## Learning Content

The handbook is organized into four main parts.

### Part 1: AI Foundations

- [AI Fundamentals](./docs/en/part1/ai-fundamentals.md)
- [Machine Learning Basics](./docs/en/part1/machine-learning-basics.md)
- [Deep Learning Introduction](./docs/en/part1/deep-learning-intro.md)
- [AI Tools & Platforms](./docs/en/part1/ai-tools.md)

### Part 2: Web3 Foundations

- [Blockchain Basics](./docs/en/part2/blockchain-basics.md)
- [DeFi Introduction](./docs/en/part2/defi-intro.md)
- [Smart Contracts](./docs/en/part2/smart-contracts.md)
- [Web3 Tools](./docs/en/part2/web3-tools.md)

### Part 3: AI x Web3 Directions

- [AI Agents](./docs/en/part3/ai-agents.md)
- [AI + DeFi](./docs/en/part3/ai-defi.md)
- [AI + NFT](./docs/en/part3/ai-nft.md)
- [Decentralized AI](./docs/en/part3/decentralized-ai.md)

### Part 4: Cases and Practice

- [Case Studies](./docs/en/part4/case-studies.md)
- [Project Guide](./docs/en/part4/project-guide.md)
- [Resources](./docs/en/part4/resources.md)

Chinese versions live under [`docs/zh/`](./docs/zh/).

## Roadmap Status

Some roadmap topics are still being written. When a page is incomplete, it points to the contribution guide instead of pretending the content is finished.

Contribution guides:

- [English contribution guide](./docs/en/contribution.md)
- [Chinese contribution guide](./docs/zh/contribution.md)

## Contributing

Contributions are welcome. Useful contributions include:

- writing missing roadmap entries
- fixing incorrect, unclear, or outdated explanations
- adding diagrams, examples, exercises, and case studies
- improving Chinese and English translations
- sharing tools and resources for AI x Web3 builders

To contribute:

1. Fork this repository.
2. Create a new branch.
3. Edit or add documents under `docs/en/` or `docs/zh/`.
4. Run a local build check.
5. Open a Pull Request and explain which topic you improved.

```bash
bun install
bun run docs:build
```

If you want to discuss a topic before writing, open an Issue or join the Telegram group:

<https://t.me/aiweb3school>

## Local Development

This site is built with VuePress and vuepress-theme-plume.

```bash
bun install
bun run docs:dev
```

Useful commands:

```bash
bun run docs:dev-clean
bun run docs:build
bun run docs:preview
```

For verification builds while a dev server is running, avoid writing temporary output into watched VuePress directories. A safe pattern is:

```bash
bunx vuepress build docs --clean-cache --clean-temp --dest docs/.vuepress/dist-check
rm -rf docs/.vuepress/dist-check
```

## Community

- Website: <https://aiweb3.school/>
- Bootcamp application: <https://web3career.build/en/programs/AI-Web3-School?tab=apply>
- Telegram: <https://t.me/aiweb3school>
- X: <https://x.com/aiweb3school>
- GitHub: <https://github.com/lxdao-official/aiweb3school>

## License

This project is licensed under the [MIT License](./package.json).
