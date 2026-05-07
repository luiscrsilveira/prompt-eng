#!/usr/bin/env node
/**
 * prompt-eng-skill installer.
 *
 * Copies SKILL.md + references/ + templates/ + examples/ + scripts/
 * into a Claude skills directory.
 *
 * Default scope: user  (~/.claude/skills/prompt-eng/)
 * Project scope: --scope=project  (./.claude/skills/prompt-eng/)
 * Custom path:   --dest=/path/to/dir
 * Dry run:       --dry-run
 * Force:         --force   (overwrite without prompt)
 */

const fs = require("fs");
const path = require("path");
const os = require("os");
const readline = require("readline");

const SKILL_NAME = "prompt-eng";
const SKILL_DIRS = ["references", "templates", "examples", "scripts"];
const SKILL_FILES = ["SKILL.md", "LICENSE", "README.md"];

function parseArgs(argv) {
  const args = { scope: "user", dryRun: false, force: false, dest: null };
  for (const a of argv.slice(2)) {
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--force" || a === "-f") args.force = true;
    else if (a.startsWith("--scope=")) args.scope = a.slice("--scope=".length);
    else if (a.startsWith("--dest=")) args.dest = a.slice("--dest=".length);
    else if (a === "--help" || a === "-h") {
      printHelp();
      process.exit(0);
    } else {
      console.error(`Unknown arg: ${a}`);
      printHelp();
      process.exit(2);
    }
  }
  return args;
}

function printHelp() {
  console.log(`prompt-eng-skill installer

Usage:
  npx prompt-eng-skill                  # install into ~/.claude/skills/prompt-eng
  npx prompt-eng-skill --scope=project  # install into ./.claude/skills/prompt-eng
  npx prompt-eng-skill --dest=/path     # install into custom dir
  npx prompt-eng-skill --force          # overwrite without prompt
  npx prompt-eng-skill --dry-run        # show what would happen
`);
}

function resolveDest(args) {
  if (args.dest) return path.resolve(args.dest);
  if (args.scope === "project") {
    return path.resolve(process.cwd(), ".claude", "skills", SKILL_NAME);
  }
  if (args.scope === "user") {
    return path.join(os.homedir(), ".claude", "skills", SKILL_NAME);
  }
  throw new Error(`Unknown scope: ${args.scope} (use 'user' or 'project')`);
}

function getSourceRoot() {
  // bin/install.js -> package root is one level up.
  return path.resolve(__dirname, "..");
}

function copyRecursive(src, dst, dryRun) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!dryRun) fs.mkdirSync(dst, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dst, entry), dryRun);
    }
  } else {
    if (dryRun) {
      console.log(`  would copy: ${src} -> ${dst}`);
    } else {
      fs.mkdirSync(path.dirname(dst), { recursive: true });
      fs.copyFileSync(src, dst);
    }
  }
}

function prompt(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase());
    });
  });
}

async function main() {
  const args = parseArgs(process.argv);
  const src = getSourceRoot();
  const dst = resolveDest(args);

  // Sanity: ensure source actually contains the skill.
  const skillMd = path.join(src, "SKILL.md");
  if (!fs.existsSync(skillMd)) {
    console.error(`ERROR: SKILL.md not found at ${skillMd}`);
    process.exit(1);
  }

  console.log(`prompt-eng-skill installer`);
  console.log(`  source: ${src}`);
  console.log(`  dest:   ${dst}`);
  console.log(`  scope:  ${args.dest ? "custom" : args.scope}`);
  if (args.dryRun) console.log(`  mode:   DRY RUN`);

  if (fs.existsSync(dst) && !args.force && !args.dryRun) {
    if (!process.stdin.isTTY) {
      console.error(`ERROR: ${dst} already exists. Re-run with --force to overwrite.`);
      process.exit(1);
    }
    const ans = await prompt(`Destination exists. Overwrite? [y/N] `);
    if (ans !== "y" && ans !== "yes") {
      console.log("Aborted.");
      process.exit(0);
    }
  }

  if (!args.dryRun && fs.existsSync(dst)) {
    fs.rmSync(dst, { recursive: true, force: true });
  }
  if (!args.dryRun) fs.mkdirSync(dst, { recursive: true });

  for (const f of SKILL_FILES) {
    const s = path.join(src, f);
    if (fs.existsSync(s)) copyRecursive(s, path.join(dst, f), args.dryRun);
  }
  for (const d of SKILL_DIRS) {
    const s = path.join(src, d);
    if (fs.existsSync(s)) copyRecursive(s, path.join(dst, d), args.dryRun);
  }

  if (args.dryRun) {
    console.log("\nDry run complete. No files written.");
  } else {
    console.log(`\n✔ Installed prompt-eng skill to: ${dst}`);
    console.log(`  Trigger in Claude with intents like "write a prompt for X" or "improve this prompt".`);
  }
}

main().catch((err) => {
  console.error(err.stack || err.message);
  process.exit(1);
});
