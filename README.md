# prompt-eng

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Skill Format](https://img.shields.io/badge/Claude-Skill-blueviolet)](https://docs.anthropic.com)
[![Source: DAIR.AI](https://img.shields.io/badge/source-DAIR.AI-orange)](https://github.com/dair-ai/Prompt-Engineering-Guide)

A Claude Skill that applies prompt engineering techniques systematically. Distills the [DAIR.AI Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide) into an actionable, on-demand skill for Claude Code / Claude.ai.

## What it does

Given a task description, the skill:
1. Picks the right technique (zero-shot, few-shot, CoT, ToT, ReAct, RAG, self-consistency, PAL, meta-prompting, prompt-chaining, generate-knowledge).
2. Loads a matching template.
3. Fills it with role, task, context, input, output format, and examples.
4. Applies model-specific tweaks (Claude / GPT / Gemini / open-source).
5. Validates against an injection/quality checklist.
6. Returns the final prompt + 2-3 line rationale.

## Install

### Quick install (npx)

User scope (`~/.claude/skills/prompt-eng/`):
```bash
npx github:luiscrsilveira/prompt-eng
```

Project scope (`./.claude/skills/prompt-eng/`):
```bash
npx github:luiscrsilveira/prompt-eng --scope=project
```

Custom path:
```bash
npx github:luiscrsilveira/prompt-eng --dest=/path/to/skills/prompt-eng
```

Flags: `--force` overwrite without prompt, `--dry-run` preview only.

Once published to npm:
```bash
npx prompt-eng-skill
```

### Manual install

Clone or copy the directory to your skills root:
```bash
git clone https://github.com/luiscrsilveira/prompt-eng ~/.claude/skills/prompt-eng
```
Project-scoped: clone into `./.claude/skills/prompt-eng`.

### Claude.ai
Upload the directory as a Skill via the Skills UI.

## Use

Trigger by intent — the skill auto-activates on phrases like:
- "Write a prompt for ..."
- "Improve this prompt"
- "Choose a prompting technique for ..."
- "Optimize my LLM output for ..."

You can also invoke explicitly: `Use prompt-eng to design a prompt for X`.

### Parameters
| Param | Values | Default |
|---|---|---|
| `task_type` | classification, generation, reasoning, extraction, summarization, code | required |
| `technique` | auto, zero-shot, few-shot, cot, tot, react, self-consistency, rag, meta, pal, generate-knowledge, prompt-chaining | auto |
| `complexity` | simple, moderate, complex | moderate |
| `output_format` | free, json, xml, markdown, structured | free |
| `target_model` | claude, gpt, gemini, open-source | claude |
| `domain` | free text | — |

## Technique Reference

| Technique | Best for | File |
|---|---|---|
| Zero-shot | Simple, common tasks | [references/zero-shot.md](references/zero-shot.md) |
| Few-shot | Custom schema, in-context patterns | [references/few-shot.md](references/few-shot.md) |
| Chain-of-Thought | Multi-step reasoning | [references/chain-of-thought.md](references/chain-of-thought.md) |
| Tree-of-Thoughts | Search/planning | [references/tree-of-thought.md](references/tree-of-thought.md) |
| Self-Consistency | High-stakes reasoning | [references/self-consistency.md](references/self-consistency.md) |
| ReAct | Tool-using agents | [references/react.md](references/react.md) |
| RAG | Fact-grounded answers | [references/rag.md](references/rag.md) |
| PAL | Math/algorithmic | [references/pal.md](references/pal.md) |
| Generate-Knowledge | Commonsense w/o corpus | [references/generate-knowledge.md](references/generate-knowledge.md) |
| Prompt Chaining | Multi-stage workflows | [references/prompt-chaining.md](references/prompt-chaining.md) |
| Meta-Prompting | Optimize a prompt | [references/meta-prompting.md](references/meta-prompting.md) |

Risks & mitigations (injection, jailbreak, bias, hallucination): [references/risks.md](references/risks.md).
Model-specific tweaks: [references/model-specifics.md](references/model-specifics.md).

## CLI helper

```bash
python scripts/recommend.py --task reasoning --complexity complex
# → chain-of-thought + self-consistency

python scripts/recommend.py --task extraction --has-examples
# → few-shot
```

## Examples

- [Classification (few-shot)](examples/classification-fewshot.md)
- [Reasoning (CoT)](examples/reasoning-cot.md)
- [Extraction (zero-shot, JSON)](examples/extraction-zero-shot.md)

## Attribution

Techniques and structure adapted from the [DAIR.AI Prompt Engineering Guide](https://github.com/dair-ai/Prompt-Engineering-Guide), licensed MIT. This skill is an independent derivative. See [LICENSE](LICENSE).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).
