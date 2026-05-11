const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')

const root = path.resolve(__dirname, '..')
const roadmapPath = path.join(root, 'docs/.vuepress/content/playground-roadmap-data.ts')
const source = fs.readFileSync(roadmapPath, 'utf8')

function extractRoadmap(sourceText) {
  const marker = 'export const playgroundRoadmap: RoadmapData ='
  const start = sourceText.indexOf(marker)
  if (start === -1) throw new Error('playgroundRoadmap export not found')
  const objectSource = sourceText.slice(start + marker.length)
  const sandbox = { DEMO_LINK: '/zh/part1/' }
  vm.createContext(sandbox)
  vm.runInContext(`data = ${objectSource}`, sandbox)
  return sandbox.data
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/×/g, 'x')
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function permalink(section, title) {
  return `/zh/handbook/${section}/${slugify(title)}/`
}

function pagePath(section, title) {
  return path.join(root, 'docs/zh/handbook', section, `${slugify(title)}.md`)
}

function sectionIntro(sectionLabel) {
  const intros = {
    AI: '这一组内容用于建立 AI 系统的共同语言：模型如何处理信息、如何接入工具、如何组织工作流，以及如何判断输出是否可靠。',
    Web3: '这一组内容用于建立 Web3 系统的共同语言：账户、合约、网络、数据、工具链和安全边界如何共同组成链上应用。',
    'AI × Web3 Bridge': '这一组内容关注 AI 与 Web3 真正交叉的位置：Agent 如何读取链上上下文、调用工具、管理权限、完成支付与结算。',
    'Frontier Directions': '这一组内容面向项目实践和黑客松方向，用来把前面的基础知识组合成可演示、可验证、可继续扩展的产品原型。',
  }
  return intros[sectionLabel] ?? '这一页是 AI × Web3 handbook 的知识节点，后续会持续扩充定义、案例、实践任务和外部资料。'
}

function whyLearn(title, sectionLabel) {
  return `${title} 是 ${sectionLabel} 路线里的关键节点。先掌握它，可以帮助你判断一个 AI x Web3 项目到底是在解决模型能力、链上执行、权限控制、支付结算，还是产品落地问题。`
}

function itemParagraph(itemTitle, pageTitle) {
  return `${itemTitle} 是理解 ${pageTitle} 时需要先建立的基础概念。本节先保留简短定义位，后续可以继续补充原理解释、代码示例、常见误区和真实项目案例。`
}

function renderPage({ title, section, sectionLabel, items }) {
  const lines = [
    '---',
    `title: ${title}`,
    'createTime: 2026/05/12 00:00:00',
    `permalink: ${permalink(section, title)}`,
    '---',
    '',
    `# ${title}`,
    '',
    '> 本页是 AI x Web3 School handbook 的框架页。当前先提供稳定结构和最小解释，方便后续逐步补充案例、图示、练习和精选外部资料。',
    '',
    '## 为什么要学这个',
    '',
    whyLearn(title, sectionLabel),
    '',
    sectionIntro(sectionLabel),
    '',
    '## 核心问题',
    '',
    `学习 ${title} 时，建议先围绕三个问题展开：`,
    '',
    `- 它解决的是哪一层问题：理解、规划、执行、验证、支付、权限，还是协作？`,
    '- 它需要哪些前置知识，哪些概念只是工程细节？',
    '- 当它进入链上或 Agent 场景后，会引入哪些新的风险和约束？',
    '',
  ]

  if (items.length > 0) {
    lines.push('## 知识节点', '')
    for (const item of items) {
      lines.push(`### ${item.title}`, '', itemParagraph(item.title, title), '')
    }
  } else {
    lines.push('## 知识节点', '', '这个节点暂时不继续拆分子主题，后续可以根据课程内容和项目案例再扩展。', '')
  }

  lines.push(
    '## 在 AI x Web3 中的位置',
    '',
    `${title} 不应该只作为孤立概念学习。更重要的是理解它如何进入完整产品链路：用户目标如何被表达，系统如何读取上下文，Agent 如何选择工具，权限如何被限制，结果如何被验证和记录。`,
    '',
    '## 最小实践',
    '',
    `围绕 ${title} 做一个最小练习：选一个具体场景，写清楚输入、处理步骤、输出、失败情况和需要人工确认的边界。先不用追求完整产品，重点是把概念和流程连接起来。`,
    '',
    '## 扩展阅读',
    '',
    '- 待补充：优先收录官方文档、标准原文、可运行 demo 和高质量技术文章。',
    '- 维护建议：每条外部资料都补一句“为什么值得读”，避免变成链接列表。',
    '',
  )

  return `${lines.join('\n')}\n`
}

function writePage(section, sectionLabel, title, items) {
  const filePath = pagePath(section, title)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, renderPage({ title, section, sectionLabel, items }), 'utf8')
}

const roadmap = extractRoadmap(source)

for (const node of roadmap.topLeft.nodes) {
  writePage('ai', roadmap.topLeft.label, node.title, node.subCard?.items ?? [])
}

for (const node of roadmap.topRight.nodes) {
  writePage('web3', roadmap.topRight.label, node.title, node.subCard?.items ?? [])
}

for (const card of roadmap.fusion.cards) {
  writePage('bridge', roadmap.fusion.label, card.title, card.items ?? [])
}

for (const split of roadmap.splits) {
  writePage('tracks', 'Frontier Directions', split.label, split.nodes ?? [])
}

console.log('Generated zh handbook pages from playgroundRoadmap.')
