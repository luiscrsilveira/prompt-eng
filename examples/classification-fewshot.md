# Example: Sentiment Classification (Few-Shot)

**Inputs:** task_type=classification, technique=few-shot, format=structured.

## Prompt
```
Classify product review sentiment as: positive | negative | neutral.

<examples>
<example>
<input>Battery dies after two hours, very disappointing.</input>
<output>negative</output>
</example>
<example>
<input>Arrived on time, works as described.</input>
<output>neutral</output>
</example>
<example>
<input>Best purchase this year, can't recommend enough!</input>
<output>positive</output>
</example>
</examples>

<input>The interface is clunky but the search is incredible.</input>
<output>
```

## Expected Output
```
positive
```

(Mixed signal; "incredible" outweighs "clunky" — model leans positive. If you want `mixed`, add it as a label and provide a mixed exemplar.)
