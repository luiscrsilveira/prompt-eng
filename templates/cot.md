# Chain-of-Thought Template

## Zero-shot CoT
```
{{task}}

<problem>
{{problem}}
</problem>

Think step by step inside <thinking></thinking>.
Then give final answer inside <answer></answer>.
```

## Few-shot CoT
```
{{task}}

<example>
<problem>{{ex_problem}}</problem>
<thinking>{{ex_steps}}</thinking>
<answer>{{ex_answer}}</answer>
</example>

<problem>{{real_problem}}</problem>
<thinking>
```
