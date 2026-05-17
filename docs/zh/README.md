# AI x Web3 学院

<div align="center">

**一个面向 AI 与 Web3 交叉领域建设者的开放学习手册、训练营与协作网络。**

[官网](https://aiweb3.school/) | [英文文档](./docs/en/README.md) | [中文文档](./README.md) | [加入训练营](https://web3career.build/en/programs/AI-Web3-School?tab=apply) | [Telegram](https://t.me/aiweb3school) | [X](https://x.com/aiweb3school)

</div>

---

> [!IMPORTANT]
> 本手册正在持续完善中。路线图与学习材料均以公开方式编写，许多主题尚未完成。欢迎贡献内容、纠正错误、添加示例、翻译文档及分享学习资源。

## 当前训练营

<table>
  <tr>
    <td><strong>项目</strong></td>
    <td>AI x Web3 学院训练营</td>
  </tr>
  <tr>
    <td><strong>时间</strong></td>
    <td>2026 年 5 月 17 日 - 6 月 14 日</td>
  </tr>
  <tr>
    <td><strong>形式</strong></td>
    <td>3 周训练营 + 2 周黑客松</td>
  </tr>
  <tr>
    <td><strong>重点</strong></td>
    <td>AI 代理、钱包、链上自动化、支付、验证、隐私、去中心化 AI，以及 AI x Web3 产品的实战开发。</td>
  </tr>
  <tr>
    <td><strong>报名</strong></td>
    <td><a href="https://web3career.build/en/programs/AI-Web3-School?tab=apply">英文报名</a> · <a href="https://web3career.build/zh/programs/AI-Web3-School?tab=apply">中文报名</a></td>
  </tr>
  <tr>
    <td><strong>社区</strong></td>
    <td><a href="https://t.me/aiweb3school">Telegram</a> · <a href="https://x.com/aiweb3school">X</a></td>
  </tr>
</table>

## 项目简介

AI x Web3 学院是一个开源教育项目，面向希望理解、构建并参与 AI 原生 Web3 应用的人群。

本项目包含：

- 中英双语学习手册
- 从基础到 AI x Web3 应用方向的结构化学习路线图
- 面向建设者的训练营与黑客松项目
- 欢迎社区写作者、研究员、开发者与译者参与贡献的友好文档体系

## 学习内容

手册分为四大部分。

### 第一部分：AI 基础

- [AI 基本概念](./part1/ai-fundamentals.md)
- [机器学习基础](./part1/machine-learning-basics.md)
- [深度学习入门](./part1/deep-learning-intro.md)
- [AI 工具与平台](./part1/ai-tools.md)

### 第二部分：Web3 基础

- [区块链基础](./part2/blockchain-basics.md)
- [DeFi 入门](./part2/defi-intro.md)
- [智能合约](./part2/smart-contracts.md)
- [Web3 工具](./part2/web3-tools.md)

### 第三部分：AI x Web3 方向

- [AI 代理](./part3/ai-agents.md)
- [AI + DeFi](./part3/ai-defi.md)
- [AI + NFT](./part3/ai-nft.md)
- [去中心化 AI](./part3/decentralized-ai.md)

### 第四部分：案例与实践

- [案例研究](./part4/case-studies.md)
- [项目指南](./part4/project-guide.md)
- [资源汇总](./part4/resources.md)

中文版本位于 [`docs/zh/`](./docs/zh/) 目录下。

## 路线图状态

部分路线图主题仍在编写中。当某页内容尚未完成时，会指向贡献指南，而非展示未完成的内容。

贡献指南：

- [英文贡献指南](./docs/en/contribution.md)
- [中文贡献指南](.contribution.md)

## 参与贡献

欢迎各类贡献，包括：

- 补充缺失的路线图条目
- 修正不准确、不清晰或过时的说明
- 添加图表、示例、练习和案例研究
- 改进中英文翻译
- 分享面向 AI x Web3 建设者的工具与资源

贡献步骤：

1. Fork 本仓库。
2. 创建新分支。
3. 在 `docs/en/` 或 `docs/zh/` 下编辑或新增文档。
4. 在本地执行构建检查。
5. 提交 Pull Request，并说明你改进的主题。

```bash
bun install
bun run docs:build
```

如果希望在动笔前先讨论某个主题，可以提交 Issue 或加入 Telegram 群组：

<https://t.me/aiweb3school>

## 本地开发

本站使用 VuePress 与 vuepress-theme-plume 构建。

```bash
bun install
bun run docs:dev
```

常用命令：

```bash
bun run docs:dev-clean
bun run docs:build
bun run docs:preview
```

在开发服务器运行期间进行验证构建时，请避免将临时输出写入 VuePress 监听的目录。推荐的安全方式如下：

```bash
bunx vuepress build docs --clean-cache --clean-temp --dest docs/.vuepress/dist-check
rm -rf docs/.vuepress/dist-check
```

## 社区

- 官网：<https://aiweb3.school/>
- 训练营报名：<https://web3career.build/en/programs/AI-Web3-School?tab=apply>
- Telegram：<https://t.me/aiweb3school>
- X：<https://x.com/aiweb3school>
- GitHub：<https://github.com/lxdao-official/aiweb3school>

## 许可证

本项目基于 [MIT 许可证](./package.json) 授权。
