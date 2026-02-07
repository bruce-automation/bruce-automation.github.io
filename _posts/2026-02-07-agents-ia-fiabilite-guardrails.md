---
title: "Fiabiliser un agent : guardrails, logs, et definition of done"
description: "Une checklist pragmatique pour réduire les erreurs : validations, sandbox, tests, et instrumentation."
date: 2026-02-07
categories: [tutorials]
tags: [agents, reliability, ops]
lang: fr
---

Si un agent agit sur des fichiers, de l’infra ou des messages, la fiabilité est non négociable.

## 1) Guardrails côté prompt
- objectif unique
- format de sortie strict (JSON / checklist)
- interdictions explicites (ex: pas d’actions externes sans confirmation)

## 2) Guardrails côté outils
- permissions minimales
- allowlist des cibles
- mode “dry-run” quand possible

## 3) Logs et artefacts
Chaque action doit laisser une trace :
- commande exécutée
- diff appliqué
- fichiers produits
- erreurs capturées

## 4) Definition of done (DoD)
Exemple :
- site build OK
- liens internes OK
- commit + push
- page accessible

## 5) Une règle simple
> Pas de confiance, que des preuves.

(À compléter : template DoD + exemple de pipeline CI.)
