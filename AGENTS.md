## Global Skills

- After completing a fix or feature, use the `ai-fix-closeout` skill when the resulting debugging steps or guardrails look reusable beyond the current repo.
- For item-scoped interactions in lists, tables, and card grids, model async UI state per entity id or with a by-id map. Do not bind loading/disabled/error/success for a single item action directly to a shared boolean such as `isPending`, because that causes cross-item state leakage.
- This site has separate light and dark themes. When adding or changing homepage/UI modules, explicitly design and implement both theme states; do not assume light-theme colors will work in dark mode.
