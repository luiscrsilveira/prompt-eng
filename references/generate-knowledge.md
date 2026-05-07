# Generate-Knowledge Prompting

Step 1: prompt model to generate facts about question. Step 2: feed facts back as context for final answer. Liu et al. 2022.

## When to use
- Commonsense QA.
- Domain knowledge needed but no retrieval corpus.

## Pattern
```
Step 1:
Generate 3-5 facts relevant to: <question>

Step 2 (new prompt):
Facts:
<facts from step 1>

Question: <question>
Answer using the facts.
```

## Tips
- Single-prompt variant: "First list relevant facts, then answer." Cheaper but less robust.
- If facts wrong → final answer wrong; verify on critical use.
- RAG > generate-knowledge when corpus exists.
