# Self-Consistency Template

Use the CoT template. Sample N completions at temperature 0.7.
Force final answer marker for parsing:

```
... <CoT prompt> ...

End with exactly: "ANSWER: <value>"
```

Aggregator (pseudocode):
```python
answers = [extract_answer(sample) for sample in samples]
final = Counter(answers).most_common(1)[0][0]
```
