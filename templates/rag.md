# RAG Template

```
You answer using ONLY the sources provided. If sources are insufficient,
respond exactly: "Not in sources."

<sources>
[1] {{chunk_1}}
[2] {{chunk_2}}
[3] {{chunk_3}}
</sources>

<question>{{question}}</question>

Cite each claim as [n]. Output format: {{format}}.
Answer:
```
