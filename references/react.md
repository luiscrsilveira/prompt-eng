# ReAct (Reason + Act)

Interleave reasoning traces with tool/action calls. Yao et al. 2022.

## When to use
- Agent needs external tools (search, calculator, API, code exec).
- Task requires up-to-date or external info.

## Pattern
```
You can use these tools: search(q), lookup(id), calc(expr), finish(answer).

Loop:
  Thought: <reason>
  Action: <tool>(<args>)
  Observation: <result>

End with: Action: finish(<answer>).
```

## Tips
- Constrain action grammar tightly; parse strictly.
- Cap loop iterations; force `finish` on timeout.
- Validate tool outputs before feeding back (injection vector).
- For Claude/GPT, prefer native tool-use API over text-based ReAct when available.

## Pitfalls
- Model loops on failed search. Add "if same query twice, change strategy".
- Hallucinated tool names → constrain via system prompt + parser rejection.
