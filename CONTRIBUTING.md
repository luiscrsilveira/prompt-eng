# Contributing

Thanks for considering a contribution.

## Scope

This skill stays close to the DAIR.AI guide. Additions welcome:
- New technique reference (cite paper).
- New template / worked example.
- Improvements to the decision matrix.
- Bug fixes in `scripts/recommend.py`.

Out of scope:
- Vendor-specific marketing.
- Untested heuristics with no source.

## Process

1. Open an issue first for non-trivial changes.
2. Fork → branch → PR.
3. Keep `SKILL.md` under 500 lines. Long content → `references/`.
4. Use imperative voice in `SKILL.md` ("Do X", not "You can do X").
5. Cite sources (paper, guide page).

## File conventions

- One technique per `references/<technique>.md`.
- One template per `templates/<technique>.md`.
- Examples include input + expected output.

## Testing

```bash
python scripts/recommend.py --task reasoning --complexity complex
```

Should print `chain-of-thought + self-consistency`.

## Code of Conduct

Be respectful. Assume good faith.
