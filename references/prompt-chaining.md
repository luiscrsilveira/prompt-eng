# Prompt Chaining

Decompose task → sequence of prompts. Output of step N = input of step N+1.

## When to use
- Multi-stage workflows (extract → transform → summarize).
- Step diversity (different system prompts per stage).
- Need intermediate validation.

## Pattern
```
Stage 1 — Extract:
  Prompt: "From <doc>, extract entities as JSON."
Stage 2 — Enrich:
  Prompt: "For each entity, add metadata via <lookup>."
Stage 3 — Synthesize:
  Prompt: "Write summary using enriched entities."
```

## Tips
- Validate each stage's output schema before passing on.
- Cache intermediate results.
- Stages can use different techniques (zero-shot extract → CoT synthesize).
- Failure isolation: cheaper to debug than monolithic prompt.

## When NOT to use
- Simple task (single prompt suffices).
- Latency-critical (sequential = slow).
