# Self-Consistency

Sample N reasoning chains at temperature>0; majority-vote final answer. Wang et al. 2022.

## When to use
- CoT chosen but reliability matters (math, finance, medical).
- Answer space is discrete/comparable.

## Procedure
1. Build CoT prompt.
2. Sample N=5..40 completions, temp 0.5-0.9.
3. Extract final answer from each.
4. Majority vote (or weighted by confidence).

## Tips
- Use lowest N that stabilizes.
- Output extraction must be deterministic — enforce `Answer: <X>` marker.
- For free-form text, cluster semantically before voting.

## Cost
N× CoT cost. Use only when stakes justify.
