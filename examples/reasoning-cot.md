# Example: Math Word Problem (CoT)

**Inputs:** task_type=reasoning, technique=cot, complexity=moderate.

## Prompt
```
Solve the problem.

<problem>
A bakery sells muffins for $3 and croissants for $4. On Monday they sold
twice as many muffins as croissants and made $200. How many muffins?
</problem>

Think step by step inside <thinking></thinking>.
Final answer inside <answer></answer> as a single integer.
```

## Expected Output
```
<thinking>
Let c = croissants, m = muffins. m = 2c.
Revenue: 3m + 4c = 200.
Substitute: 3(2c) + 4c = 200 → 10c = 200 → c = 20.
m = 2 × 20 = 40.
</thinking>
<answer>40</answer>
```
