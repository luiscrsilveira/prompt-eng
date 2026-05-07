# Program-Aided Language Models (PAL)

Model emits code; runtime executes; result returned.

## When to use
- Math, date arithmetic, unit conversion, deterministic logic.
- Anything CoT gets wrong by arithmetic slip.

## Pattern
```
Solve by writing Python. Final line: print(answer).

Q: <problem>
# Python:
```

Execute, return stdout as answer.

## Tips
- Sandbox execution.
- Restrict imports.
- Combine with CoT: comments explain steps, code computes.
- For Claude/GPT, code interpreter / tool-use is the production form.
