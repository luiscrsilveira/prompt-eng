# Meta-Prompting

Use LLM to write/improve prompts.

## When to use
- Existing prompt underperforms.
- Need to adapt prompt across tasks at scale.
- Bootstrap prompts (APE - Automatic Prompt Engineer).

## Patterns

### Improver
```
You are a prompt engineer. Below is a prompt and a failure case.
Rewrite the prompt to fix the failure without breaking other cases.

<prompt>...</prompt>
<failure_input>...</failure_input>
<expected>...</expected>
<actual>...</actual>

Output: rewritten prompt only.
```

### Generator (APE-style)
```
Given task description and 5 input/output pairs, produce 8 candidate
instructions that would yield the outputs from the inputs.
```
Then score candidates on held-out set; keep best.

## Tips
- Always evaluate against fixed test set; don't trust meta-LLM's self-assessment.
- Iterate small: change one element at a time.
