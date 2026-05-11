const fs = require('node:fs')
const path = require('node:path')

const root = path.resolve(__dirname, '..')

const imports = [
  ['docs/zh/part1/ai-fundamentals.md', 'docs/zh/handbook/ai/agent.md'],
  ['docs/zh/part1/machine-learning-basics.md', 'docs/zh/handbook/ai/evaluation.md'],
  ['docs/zh/part1/deep-learning-intro.md', 'docs/zh/handbook/ai/llm.md'],
  ['docs/zh/part1/ai-tools.md', 'docs/zh/handbook/ai/frameworks.md'],
  ['docs/zh/part2/blockchain-basics.md', 'docs/zh/handbook/web3/network.md'],
  ['docs/zh/part2/smart-contracts.md', 'docs/zh/handbook/web3/smart-contract.md'],
  ['docs/zh/part2/defi-intro.md', 'docs/zh/handbook/web3/defi.md'],
  ['docs/zh/part2/web3-tools.md', 'docs/zh/handbook/web3/dev-stack.md'],
  ['docs/zh/part3/ai-agents.md', 'docs/zh/handbook/bridge/agent-workflow.md'],
  ['docs/zh/part3/ai-defi.md', 'docs/zh/handbook/bridge/machine-payment.md'],
  ['docs/zh/part3/ai-nft.md', 'docs/zh/handbook/tracks/open-track.md'],
  ['docs/zh/part3/decentralized-ai.md', 'docs/zh/handbook/bridge/decentralized-ai.md'],
  ['docs/zh/part4/project-guide.md', 'docs/zh/handbook/tracks/dev-tooling.md'],
  ['docs/zh/part4/case-studies.md', 'docs/zh/handbook/tracks/agentic-commerce.md'],
  ['docs/zh/part4/resources.md', 'docs/zh/handbook/tracks/open-track.md'],
]

function stripFrontmatter(markdown) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n+/, '')
}

function stripTitle(markdown) {
  return markdown.replace(/^# .+\n+/, '')
}

function demoteHeadings(markdown) {
  return markdown.replace(/^(#{2,5}) /gm, '#$1 ')
}

function sourceTitle(markdown, fallback) {
  const match = markdown.match(/^# (.+)$/m)
  return match?.[1] ?? fallback
}

function cleanLegacyContent(sourceFile) {
  const absoluteSource = path.join(root, sourceFile)
  const raw = fs.readFileSync(absoluteSource, 'utf8')
  const title = sourceTitle(raw, path.basename(sourceFile, '.md'))
  const body = demoteHeadings(stripTitle(stripFrontmatter(raw)).trim())
  return [
    `### ${title}`,
    '',
    body,
  ].join('\n')
}

const grouped = new Map()
for (const [source, target] of imports) {
  if (!grouped.has(target)) grouped.set(target, [])
  grouped.get(target).push(cleanLegacyContent(source))
}

for (const [target, sections] of grouped.entries()) {
  const absoluteTarget = path.join(root, target)
  const original = fs.readFileSync(absoluteTarget, 'utf8')
  const withoutPreviousImport = original
    .replace(/\n## 旧版内容整理\n[\s\S]*$/m, '')
    .replace(/\n### [^\n]+\n\n> 迁移自旧版页面 `[^`]+`。这部分内容先作为可继续打磨的素材保留，后续可以拆进上方具体知识节点。\n\n[\s\S]*$/m, '')
    .trimEnd()
  const next = [
    withoutPreviousImport,
    '',
    ...sections.flatMap((section, index) => index === 0 ? [section] : ['', section]),
    '',
  ].join('\n')
  fs.writeFileSync(absoluteTarget, next, 'utf8')
}

console.log(`Imported legacy zh content into ${grouped.size} handbook pages.`)
