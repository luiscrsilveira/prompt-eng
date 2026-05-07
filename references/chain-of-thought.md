# Chain-of-Thought (CoT)

Prompt model to produce intermediate reasoning steps before final answer. Wei et al. 2022.

## When to use
- Math, logic, multi-hop QA, planning, code debugging.
- Complexity ≥ moderate.

## Two flavors

### Zero-shot CoT
Append `"Let's think step by step."` (or equivalent). No examples.
```
Q: <problem>
A: Let's think step by step.
```

### Few-shot CoT
Provide exemplars with reasoning shown.
```
Q: Roger has 5 balls. He buys 2 cans of 3 balls. How many?
A: Roger started with 5. 2 cans × 3 = 6. 5+6 = 11. Answer: 11.

Q: <real>
A:
```

## Output format
- Separate reasoning from final answer. Use `<reasoning>...</reasoning><answer>...</answer>` or "Final answer:" marker. Easier to parse.

## Tips
- For Claude: ask for `<thinking>` tag.
- Combine with self-consistency for high-stakes.
- For non-reasoning models or small models, CoT can hurt; verify.

## Pitfalls
- Verbose answers when only label needed → extract final answer with marker.
- Reasoning sounds plausible but wrong (hallucinated steps) → use self-consistency or PAL.
