# AI Web3 School

<div align="center">

**AI × Web3 融合学习手册，帮助学习者系统理解人工智能与区块链的交叉领域**

[在线阅读](./docs/README.md) | [中文入口](./docs/zh/README.md) | [官方平台](https://web3career.build/) | [GitHub](https://github.com/lxdao-official/aiweb3school)

</div>

---

## 关于项目

AI Web3 School 是一个面向中文学习者的开源学习项目，聚焦 AI 与 Web3 的交叉知识体系，内容覆盖 AI 基础、Web3 基础、融合应用案例和项目实践路径。

这个仓库适合：

- 想快速建立 AI 与 Web3 共同知识框架的初学者
- 希望理解 AI Agent、AI + DeFi、AI + NFT 等方向的开发者
- 想搭建课程、训练营或社区学习资料的教育组织与社区

---

## 内容结构

### 第一部分：AI 基础

1. [AI 基础概念](./docs/zh/part1/ai-fundamentals.md)
2. [机器学习基础](./docs/zh/part1/machine-learning-basics.md)
3. [深度学习简介](./docs/zh/part1/deep-learning-intro.md)
4. [AI 工具介绍](./docs/zh/part1/ai-tools.md)

### 第二部分：Web3 基础

1. [区块链基础](./docs/zh/part2/blockchain-basics.md)
2. [DeFi 简介](./docs/zh/part2/defi-intro.md)
3. [智能合约](./docs/zh/part2/smart-contracts.md)
4. [Web3 工具](./docs/zh/part2/web3-tools.md)

### 第三部分：AI × Web3 融合方向

1. [AI Agent](./docs/zh/part3/ai-agents.md)
2. [AI + DeFi](./docs/zh/part3/ai-defi.md)
3. [AI + NFT](./docs/zh/part3/ai-nft.md)
4. [去中心化 AI](./docs/zh/part3/decentralized-ai.md)

### 第四部分：案例与实践

1. [案例分析](./docs/zh/part4/case-studies.md)
2. [项目指南](./docs/zh/part4/project-guide.md)
3. [学习资源](./docs/zh/part4/resources.md)

---

## 如何阅读

- 文档主页：[`docs/README.md`](./docs/README.md)
- 中文学习入口：[`docs/zh/README.md`](./docs/zh/README.md)
- 推荐顺序：先学 AI 基础，再补 Web3 基础，最后进入融合专题和项目实践

---

## 本地运行

项目基于 VuePress 构建。

```bash
bun install
bun run docs:dev
```

常用命令：

```bash
bun run docs:build
bun run docs:preview
```

---

## 服务器部署

项目使用 `Dockerfile` 构建镜像，并直接通过 `docker run` 启动一个静态站点服务。

部署结构说明：

- `Dockerfile` 使用多阶段构建，先用 Bun 构建 VuePress 静态文件
- 最终镜像使用 Nginx 提供静态站点服务

首次部署：

```bash
docker build -t aiweb3school:latest .
docker run -d --name aiweb3school --restart unless-stopped -p 8080:80 aiweb3school:latest
```

默认会把站点映射到服务器的 `8080` 端口，你可以直接访问：

```text
http://<server-ip>:8080
```

如果要修改宿主机端口，可以在执行前设置环境变量：

```bash
docker run -d --name aiweb3school --restart unless-stopped -p 80:80 aiweb3school:latest
```

常用命令：

```bash
docker logs -f aiweb3school
docker stop aiweb3school && docker rm aiweb3school
docker build -t aiweb3school:latest .
docker run -d --name aiweb3school --restart unless-stopped -p 8080:80 aiweb3school:latest
```

如果服务器前面还有 Nginx、Caddy 或云负载均衡，建议将它们反向代理到容器暴露的端口。

---

## 参与贡献

欢迎提交 Issue 或 Pull Request，帮助补充课程内容、修正文档问题，或完善学习路径设计。

如果你准备贡献内容，建议优先补充以下方向：

- AI × Web3 的新案例与最佳实践
- 教程中的示例、图示与练习题
- 更完整的项目实战与工具对比

---

## 开源协议

本项目采用 [MIT License](./package.json)。
