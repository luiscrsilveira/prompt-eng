# Retrieval-Augmented Generation (RAG)

Retrieve relevant passages, inject into prompt, then answer.

## When to use
- Facts beyond training cutoff or private data.
- Citations required.
- Hallucination unacceptable.

## Pipeline
1. Index corpus → embeddings (or BM25, hybrid).
2. At query time: retrieve top-k chunks.
3. Prompt:
```
Answer using ONLY the sources below. If insufficient, say "Not in sources."

<sources>
[1] ...
[2] ...
</sources>

Question: <q>
Cite sources as [n].
```

## Tips
- Chunk size 200-800 tokens, overlap 10-20%.
- Hybrid retrieval (dense + sparse) beats either alone.
- Re-rank top-k with cross-encoder if quality low.
- Force "Not in sources" path; otherwise model fills gaps with parametric memory.
- Combine with CoT for multi-hop questions.

## Pitfalls
- Retrieved chunks contradict → tell model to flag.
- Off-topic chunks dilute attention; tighten retriever before adding more chunks.
