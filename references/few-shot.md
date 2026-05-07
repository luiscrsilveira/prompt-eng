# Few-Shot Prompting

Show 2-8 input/output exemplars. Model infers pattern.

## When to use
- Custom output schema. Domain jargon. Pattern hard to describe verbally.
- Classification with non-obvious labels.

## When NOT to use
- Reasoning-heavy tasks (use CoT). Tasks needing fresh facts (use RAG).

## Pattern
```
[Task description]

Example 1:
Input: ...
Output: ...

Example 2:
Input: ...
Output: ...

Now:
Input: <real input>
Output:
```

## Tips
- Examples must match exact target format (whitespace, casing, delimiters).
- Cover edge cases. Include hard examples, not only easy ones.
- Order matters: recency bias → put strongest example last.
- 3-5 examples usually plateau; more rarely helps.
- Balance label distribution to avoid bias.

## Pitfalls
- Examples leaking into output ("Output: Output: ...").
- Inconsistent formatting between exemplars.
- Single label dominant → model copies it.

## Variant: Active-Prompt
Select examples adaptively based on uncertainty (high-disagreement cases get human-labeled exemplars).
