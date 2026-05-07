# Example: Entity Extraction (Zero-Shot, JSON)

**Inputs:** task_type=extraction, technique=zero-shot, output_format=json.

## Prompt
```
Extract entities from the text. Return JSON only, no prose.

Schema:
{
  "people": [string],
  "orgs": [string],
  "dates": [string]   // ISO 8601 if possible
}

<text>
On March 3, 2024, Maria Chen joined Acme Corp as CTO, replacing John Park.
</text>

JSON:
```

## Expected Output
```json
{
  "people": ["Maria Chen", "John Park"],
  "orgs": ["Acme Corp"],
  "dates": ["2024-03-03"]
}
```
