# Tree of Thoughts (ToT)

Explore multiple reasoning branches; evaluate; expand most promising. Yao et al. 2023.

## When to use
- Search/planning problems (Game of 24, crossword, creative writing with constraints).
- Multiple viable paths; need to backtrack.

## Pattern (single-prompt approximation)
```
Imagine three different experts answering this question.
Each expert writes one step of their thinking, then shares with the group.
If any expert realizes they're wrong, they leave.
Continue until one answer remains.

Question: <q>
```

## Pattern (controller-style, multi-call)
1. Generate N candidate next-steps.
2. Evaluate each (`rate 1-10 likelihood of leading to solution`).
3. Keep top K. Recurse.
4. Terminate when leaf is final answer.

## Tips
- Define explicit state representation per step.
- Use BFS for short horizons, DFS+pruning for deep.
- Cost-heavy → use only when CoT fails.
