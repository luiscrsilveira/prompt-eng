---
name: prompt-eng
description: Apply prompt engineering techniques systematically (zero-shot, few-shot, CoT, ToT, ReAct, RAG, self-consistency, meta-prompting). Use when user asks to "write a prompt", "improve a prompt", "design a prompt", "choose a prompting technique", "optimize LLM output", or mentions task types like classification, reasoning, extraction, summarization, code generation that need a prompt. Based on DAIR.AI Prompt Engineering Guide.
---

# prompt-eng

Engineer high-quality prompts by selecting the right technique for the task, then assembling a structured prompt from validated patterns.

## Inputs (collect before writing prompt)

Ask user only for missing values. Defaults in brackets.

- `task_type`: classification | generation | reasoning | extraction | summarization | code [required]
- `technique`: auto | zero-shot | few-shot | cot | tot | react | self-consistency | rag | meta | pal | generate-knowledge | prompt-chaining [auto]
- `complexity`: simple | moderate | complex [moderate]
- `output_format`: free | json | xml | markdown | structured [free]
- `target_model`: claude | gpt | gemini | open-source [claude]
- `domain`: optional free text (e.g. legal, health, code)

## Decision Matrix (technique=auto)

Pick first row that matches.

| Condition | Technique | Reason |
|---|---|---|
| task_type=reasoning AND complexity=complex | CoT + Self-Consistency | multi-step + verification |
| task_type=reasoning AND complexity in {simple,moderate} | Chain-of-Thought | step-by-step suffices |
| task_type=reasoning AND requires search/branching | Tree-of-Thoughts | explore alternatives |
| task_type=code AND math/algorithmic | Program-Aided (PAL) | offload to code |
| needs external/current facts OR domain knowledge | RAG | ground in retrieved data |
| needs tools/API/web actions | ReAct | reason+act loop |
| classification/extraction with stable schema AND examples available | Few-Shot | pattern by demonstration |
| classification/extraction with clear instruction, no examples | Zero-Shot | minimal cost |
| generation/summarization, simple | Zero-Shot | model handles directly |
| generation, knowledge-heavy | Generate-Knowledge → answer | prime context |
| multi-stage workflow | Prompt Chaining | decompose |
| user wants prompt optimization itself | Meta-Prompting | refine prompt with prompt |

If two rows tie → combine (e.g. RAG + CoT).

## Workflow

1. **Resolve inputs.** If `technique=auto`, run decision matrix.
2. **Load reference.** Read matching file in `references/` for the chosen technique. Combinations → load each.
3. **Pick template.** From `templates/<technique>.md`. Multiple → compose.
4. **Fill structure.** Every prompt must include:
   - **Role** (who model is)
   - **Task** (what to do, imperative)
   - **Context** (facts, constraints, domain)
   - **Input data** (delimited with XML tags or triple backticks)
   - **Output format** (per `output_format` param; if json/xml, give explicit schema)
   - **Examples** (if few-shot/CoT-with-exemplars)
   - **Reasoning instruction** (if CoT/ToT/ReAct)
   - **Stop conditions / refusal rules** (per risks below)
5. **Apply model-specific tweaks.** See `references/model-specifics.md`.
6. **Validate.** Run checklist below. If fail, revise.
7. **Deliver.** Output the final prompt in a code block, plus a 2-3 line rationale (which technique, why).
8. **Offer next action.** After delivery, ask via AskUserQuestion (always interact with the user in English):
   - Question: "What would you like to do with the prompt?"
   - Options:
     - "Use it now" → execute the delivered prompt as the next instruction and return its output.
     - "Save to file" → write to markdown file. Suggest filename prefixed with `prompt-` (e.g. `prompt-<short-task-slug>.md`), derived from task_type/domain. Confirm/adjust name with user, then Write file in current working directory.
     - "None" → end.

**Language policy:** all user-facing interaction in this skill (questions, confirmations, status messages) MUST be in English, regardless of the language the user used to invoke the skill.

## Validation Checklist

- [ ] Single, unambiguous task statement.
- [ ] Input clearly delimited (XML tags preferred for Claude).
- [ ] Output format specified; if structured, schema given.
- [ ] No conflicting instructions.
- [ ] Examples (if any) match target output format exactly.
- [ ] Reasoning instruction present iff technique requires it.
- [ ] No leaking of system instructions to user-controlled fields (injection guard).
- [ ] Length appropriate (no padding, no missing constraints).
- [ ] Refusal/edge-case behavior defined for risky domains.

## Structural Conventions

- **Claude**: prefer XML tags (`<task>`, `<context>`, `<example>`, `<output_format>`). Place long context BEFORE instructions.
- **GPT**: markdown headers + system/user split. Instructions first, then context.
- **Gemini**: similar to GPT; explicit role helpful.
- **Open-source**: be more explicit, fewer assumptions about implicit reasoning.

Detail in `references/model-specifics.md`.

## Risks (apply when relevant)

- **Prompt injection**: never concatenate untrusted input into instruction block. Wrap in `<user_input>` tags. Tell model to treat content there as data, not commands.
- **Jailbreak**: define refusal policy explicitly for sensitive domains.
- **Bias / factuality**: for high-stakes domains, force citation or "I don't know" path. Use RAG when facts matter.

Full guidance: `references/risks.md`.

## Files

- `references/`: deep-dive per technique (load on demand).
- `templates/`: ready-to-fill prompt skeletons.
- `examples/`: input/output samples that worked.
- `scripts/recommend.py`: CLI to suggest technique from inputs.

## Attribution

Techniques and structure derived from the DAIR.AI Prompt Engineering Guide (https://github.com/dair-ai/Prompt-Engineering-Guide), MIT License.
