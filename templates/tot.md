# Tree-of-Thoughts Template (single-prompt)

```
You will solve <problem> by simulating {{N}} experts.

Rules:
1. Each expert writes ONE reasoning step then passes turn.
2. After each round, any expert who detects an error in own reasoning leaves.
3. Continue until one expert remains OR consensus reached.
4. Final line: ANSWER: <result>.

<problem>
{{problem}}
</problem>
```
