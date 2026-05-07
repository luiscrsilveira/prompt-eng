#!/usr/bin/env python3
"""Recommend a prompting technique from task parameters.

Usage:
    python recommend.py --task reasoning --complexity complex
    python recommend.py --task extraction --has-examples
"""
import argparse
import sys

TASKS = {"classification", "generation", "reasoning", "extraction", "summarization", "code"}
COMPLEXITIES = {"simple", "moderate", "complex"}


def recommend(task, complexity, needs_facts, needs_tools, has_examples,
              math_heavy, multi_stage, optimize_prompt):
    if optimize_prompt:
        return ["meta-prompting"]
    if needs_tools:
        return ["react"]
    if needs_facts:
        techs = ["rag"]
        if complexity == "complex":
            techs.append("chain-of-thought")
        return techs
    if task == "code" and math_heavy:
        return ["program-aided (PAL)"]
    if task == "reasoning":
        if complexity == "complex":
            return ["chain-of-thought", "self-consistency"]
        return ["chain-of-thought"]
    if multi_stage:
        return ["prompt-chaining"]
    if task in {"classification", "extraction"}:
        return ["few-shot"] if has_examples else ["zero-shot"]
    if task == "summarization":
        return ["zero-shot"] if complexity != "complex" else ["chain-of-thought"]
    if task == "generation":
        return ["zero-shot"] if complexity == "simple" else ["generate-knowledge", "zero-shot"]
    return ["zero-shot"]


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--task", required=True, choices=sorted(TASKS))
    p.add_argument("--complexity", default="moderate", choices=sorted(COMPLEXITIES))
    p.add_argument("--needs-facts", action="store_true", help="external/current knowledge needed")
    p.add_argument("--needs-tools", action="store_true", help="tools / API / web access needed")
    p.add_argument("--has-examples", action="store_true")
    p.add_argument("--math-heavy", action="store_true")
    p.add_argument("--multi-stage", action="store_true")
    p.add_argument("--optimize-prompt", action="store_true", help="task is to improve a prompt")
    args = p.parse_args()

    techs = recommend(
        args.task, args.complexity, args.needs_facts, args.needs_tools,
        args.has_examples, args.math_heavy, args.multi_stage, args.optimize_prompt,
    )
    print(" + ".join(techs))


if __name__ == "__main__":
    main()
