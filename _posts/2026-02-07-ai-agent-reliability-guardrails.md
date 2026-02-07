---
title: "Make an agent reliable: guardrails, logs, and definition of done"
description: "A pragmatic checklist to reduce mistakes: validations, least privilege, tests, and instrumentation."
date: 2026-02-07
categories: [tutorials]
tags: [agents, reliability, ops]
lang: en
---

If an agent can modify files, infrastructure, or messaging, reliability is non‑negotiable.

## 1) Prompt-level guardrails
- one primary objective
- strict output format (JSON / checklist)
- explicit prohibitions (e.g., no external actions without confirmation)

## 2) Tool-level guardrails
- least privilege
- allowlists for targets
- dry-run mode when possible

## 3) Logs and artifacts
Every action should leave a trace:
- what was executed
- what changed (diff)
- what was produced
- what failed (errors captured)

## 4) Definition of done (DoD)
Example:
- build passes
- internal links OK
- commit + deploy complete
- result page reachable

## 5) One rule
> Don’t trust. Verify.

(Next iteration: DoD template + CI examples.)
