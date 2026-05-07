# Zero-Shot Prompting

Direct instruction, no examples. Relies on model's pretraining + instruction tuning.

## When to use
- Task common in pretraining (sentiment, translation, basic summarization).
- Output format simple.
- Cost/latency matters.

## When NOT to use
- Niche schema. Specialized domain. Multi-step reasoning. Stable structured output required.

## Pattern
```
[Role]
[Task imperative]
[Constraints]
Input: <data>...</data>
Output:
```

## Tips
- Add explicit format spec ("Answer with one word: positive, negative, neutral").
- Add "Let's think step by step" → upgrades to zero-shot CoT for reasoning tasks (Kojima et al.).
- If output drifts, escalate to few-shot.

## Example
```
Classify sentiment as positive, negative, or neutral.

Text: <text>The service was slow but the food made up for it.</text>
Sentiment:
```
