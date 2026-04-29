export interface RoadmapFlowNodeData {
  title: string
  tone: 'intro' | 'ai' | 'web3' | 'fusion' | 'security' | 'standard' | 'practice'
  variant: 'section-title' | 'group' | 'topic'
  isActive?: boolean
  isInteractive?: boolean
  link?: string
}
