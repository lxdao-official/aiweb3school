# Roadmap Content

这个文件只放 Roadmap 的内容数据。

修改方式：
- 只改每个 `json` 代码块里的值
- 不改字段名
- `foundation` 是左右双线
- `merge` 是中期主线
- `branch` 是后期分支
- 需要新增卡片时，直接复制同类对象再修改内容
- 需要删除卡片时，直接删掉对应对象
- `link` 是卡片跳转链接；保留就可点击，删掉就只显示不跳转
- `title` 和 `description` 是主要展示内容
- `topics` 是主节点旁边衍生的小知识点；基础课程会向外侧展开，AI × Web3 会向两边展开，赛道实践暂时不需要
- `icon` 可以换成任意简短符号或 emoji
- `kicker` 目前已不显示，可先保留，后面如果要恢复辅助标签可以直接继续用

## foundation

```json
[
  {
    "left": {
      "title": "区块链基础",
      "description": "理解账户模型、交易生命周期、共识机制与链上规则。",
      "icon": "⟠",
      "kicker": "Web3 Foundations",
      "tone": "web3",
      "variant": "foundation",
      "topics": ["账户模型", "交易生命周期", "共识机制"],
      "link": "/zh/blockchain-basics/"
    },
    "right": {
      "title": "机器学习基础",
      "description": "建立训练流程、数据意识、特征思维与模型评价框架。",
      "icon": "◎",
      "kicker": "AI Foundations",
      "tone": "ai",
      "variant": "foundation",
      "topics": ["数据集", "训练流程", "模型评估"],
      "link": "/zh/machine-learning-basics/"
    }
  },
  {
    "left": {
      "title": "智能合约开发",
      "description": "学习 Solidity、合约调用、权限设计与协议可组合性。",
      "icon": "□",
      "kicker": "Execution Layer",
      "tone": "web3",
      "variant": "foundation",
      "topics": ["Solidity", "权限设计", "合约调用"],
      "link": "/zh/smart-contracts/"
    },
    "right": {
      "title": "大模型原理",
      "description": "掌握 Transformer、上下文窗口、推理方式与能力边界。",
      "icon": "◌",
      "kicker": "Model Layer",
      "tone": "ai",
      "variant": "foundation",
      "topics": ["Transformer", "上下文窗口", "推理边界"],
      "link": "/zh/deep-learning-intro/"
    }
  },
  {
    "left": {
      "title": "DeFi 与支付",
      "description": "理解稳定币、DEX、借贷、支付结算和价值流动。",
      "icon": "◈",
      "kicker": "Value Flow",
      "tone": "web3",
      "variant": "foundation",
      "topics": ["稳定币", "DEX", "借贷协议"],
      "link": "/zh/defi-intro/"
    },
    "right": {
      "title": "Prompt 与工作流",
      "description": "把 Prompt、RAG、工具调用和工作流编排真正串起来。",
      "icon": "✦",
      "kicker": "Workflow Design",
      "tone": "ai",
      "variant": "foundation",
      "topics": ["Prompt", "RAG", "工具调用"],
      "link": "/zh/ai-tools/"
    }
  },
  {
    "left": {
      "title": "钱包与开发工具",
      "description": "掌握钱包、RPC、SDK、索引和链上产品的工程入口。",
      "icon": "⌘",
      "kicker": "Tooling",
      "tone": "web3",
      "variant": "foundation",
      "topics": ["钱包", "RPC", "SDK"],
      "link": "/zh/web3-tools/"
    },
    "right": {
      "title": "AI Agent 开发",
      "description": "从记忆、规划到工具使用，搭起多步骤执行系统。",
      "icon": "◍",
      "kicker": "Agent Systems",
      "tone": "ai",
      "variant": "foundation",
      "topics": ["记忆", "规划", "工具使用"],
      "link": "/zh/ai-agents/"
    }
  },
  {
    "left": {
      "title": "链上数据与安全",
      "description": "理解预言机、索引、权限风险、审计意识与协议边界。",
      "icon": "◫",
      "kicker": "Security + Data",
      "tone": "web3",
      "variant": "foundation",
      "topics": ["预言机", "索引", "审计意识"],
      "link": "/zh/resources/"
    },
    "right": {
      "title": "评估、多模态与记忆",
      "description": "把评估框架、长期记忆、多模态输入与质量监控纳入系统设计。",
      "icon": "◐",
      "kicker": "Evaluation Layer",
      "tone": "ai",
      "variant": "foundation",
      "topics": ["评估框架", "长期记忆", "多模态输入"],
      "link": "/zh/resources/"
    }
  }
]
```

## merge

```json
[
  {
    "title": "Agentic Wallet & Actions",
    "description": "把钱包、权限、工具调用和链上操作收束成一条可执行主线。",
    "icon": "⌁",
    "kicker": "Execution Spine",
    "tone": "fusion",
    "variant": "fusion",
    "topics": ["钱包权限", "链上动作", "工具编排", "安全确认"],
    "link": "/zh/project-guide/"
  },
  {
    "title": "Onchain Data & Feedback",
    "description": "把链上数据、记忆、检索、评估和执行结果形成可靠反馈闭环。",
    "icon": "◇",
    "kicker": "Cross-domain Ability",
    "tone": "fusion",
    "variant": "fusion",
    "topics": ["链上索引", "检索记忆", "执行回传", "质量评估"],
    "link": "/zh/case-studies/"
  },
  {
    "title": "Protocol Design & Safety",
    "description": "把协议理解、风险意识、产品设计和自动化体验放到同一张图里。",
    "icon": "△",
    "kicker": "Project Training",
    "tone": "fusion",
    "variant": "fusion",
    "topics": ["协议机制", "风险边界", "自动化体验", "产品判断"],
    "link": "/zh/project-guide/"
  },
  {
    "title": "Identity, Reputation & Context",
    "description": "把身份、上下文、信誉与用户状态接进执行系统，做出更像真实产品的交互闭环。",
    "icon": "◈",
    "kicker": "Context Systems",
    "tone": "fusion",
    "variant": "fusion",
    "topics": ["链上身份", "信誉状态", "用户上下文", "权限策略"],
    "link": "/zh/resources/"
  }
]
```

## branch

```json
[
  {
    "title": "Onchain Agent",
    "description": "让智能体持有钱包、调工具并在链上执行真实任务。",
    "icon": "◉",
    "kicker": "Agent Runtime",
    "tone": "future",
    "variant": "branch",
    "link": "/zh/ai-agents/"
  },
  {
    "title": "Agent Payments",
    "description": "让 Agent 直接支付 API、服务和结算流程，形成机器对机器支付。",
    "icon": "◔",
    "kicker": "Payments",
    "tone": "future",
    "variant": "branch",
    "link": "/zh/case-studies/"
  },
  {
    "title": "AI × DeFi",
    "description": "用模型做研究、资金分配、风险判断与自动化金融策略。",
    "icon": "◐",
    "kicker": "Finance",
    "tone": "future",
    "variant": "branch",
    "link": "/zh/ai-defi/"
  },
  {
    "title": "DeAI Networks",
    "description": "关注去中心化训练、推理、评估和模型/算力网络基础设施。",
    "icon": "◑",
    "kicker": "Infrastructure",
    "tone": "future",
    "variant": "branch",
    "link": "/zh/decentralized-ai/"
  },
  {
    "title": "Consumer AI dApps",
    "description": "把 AI 接进钱包体验、内容消费、社交协作和轻量任务场景，做面向用户的产品层应用。",
    "icon": "◒",
    "kicker": "Consumer",
    "tone": "future",
    "variant": "branch",
    "link": "/zh/project-guide/"
  },
  {
    "title": "Identity & Risk Systems",
    "description": "结合链上身份、行为数据和模型判断，进入信用、风控与协议安全辅助方向。",
    "icon": "◓",
    "kicker": "Risk",
    "tone": "future",
    "variant": "branch",
    "link": "/zh/resources/"
  }
]
```
