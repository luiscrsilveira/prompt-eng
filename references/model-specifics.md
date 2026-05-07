# Model-Specific Tweaks

## Claude (Anthropic)
- Prefer XML tags: `<task>`, `<context>`, `<example>`, `<output_format>`, `<thinking>`.
- Long context: put documents BEFORE instructions.
- Encourage `<thinking>` block for CoT.
- Use system prompt for role/persona; user turn for task.
- Prefilling assistant turn forces format.

## GPT (OpenAI)
- Markdown headers (`## Task`, `## Context`).
- System message: persistent role + rules.
- Function/tool calling native — prefer over text ReAct.
- JSON mode + response_format for structured output.
- For o-series reasoning models: less hand-holding, drop CoT scaffolding.

## Gemini (Google)
- Similar to GPT; explicit role helps.
- Multimodal-strong; structured input via parts.
- JSON schema in `responseSchema` config beats prompt-level instruction.

## Open-source (Llama, Mistral, Qwen, etc.)
- Be more explicit; fewer implicit reasoning leaps.
- Use chat template tokens correctly (chat templates differ).
- Smaller models: few-shot > zero-shot more often.
- Lower temp (0-0.3) for instruction following.

## Universal
- Temperature: 0 for deterministic/structured, 0.7+ for creative.
- Top_p: leave default unless tuning.
- Max tokens: set explicitly; truncation corrupts JSON.
