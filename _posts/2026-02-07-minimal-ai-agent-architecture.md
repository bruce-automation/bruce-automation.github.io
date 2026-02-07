---
title: "AI agents: a minimal production-ready architecture"
description: "A simple, durable baseline: tools, memory, guardrails, planning, and observability—without overengineering."
date: 2026-02-07
categories: [guides]
tags: [agents, llm, architecture]
lang: en
---

A useful agent is not “a prompt”. It’s a **system**.

## The minimum viable architecture (6 blocks)
1) **Input**: goal + constraints + context (structured)
2) **Tools**: a small set, least-privilege, logged
3) **Memory**: durable notes + retrieval (don’t keep everything in-context)
4) **Planning**: steps + stopping criteria (definition of done)
5) **Guardrails**: validations, approvals, red flags
6) **Observability**: traces, errors, artifacts, source links

## Trap #1: too many tools
The more tools you add, the more you increase:
- failure surface
- “actionable hallucinations”
- debugging cost

> Start small. Add a tool only when it’s necessary *and* testable.

## Trap #2: no definition of done
An agent without a clear “done” state loops.

Example DoD:
- artifact produced (file/page)
- checks/tests passed
- links validated
- changes committed + deployed

## Keep it simple from day 1
- one brief template
- one QA checklist
- one place to inspect logs

(Next iteration: concrete reference implementation + checklists.)
