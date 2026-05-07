# Meta-Prompt Template (Improver)

```
You are a senior prompt engineer.

Below is a prompt and one failure case.
Rewrite the prompt to fix the failure WITHOUT breaking previously-working
cases. Change the minimum necessary.

<current_prompt>
{{current_prompt}}
</current_prompt>

<failure>
<input>{{fail_input}}</input>
<expected>{{expected}}</expected>
<actual>{{actual}}</actual>
</failure>

<known_good_cases>
{{good_cases}}
</known_good_cases>

Output: the rewritten prompt only, inside <prompt></prompt> tags.
After the prompt, in <changes></changes>, list each change as a bullet.
```
