---
title: "Agents IA : l’architecture minimale qui tient en prod"
description: "Le socle pour éviter les agents fragiles : outils, mémoire, garde-fous, observabilité — en restant simple."
date: 2026-02-07
categories: [guides]
tags: [agents, llm, architecture]
lang: fr
---

Un agent utile n’est pas “un prompt”. C’est un **système**.

## Le minimum viable (en 6 briques)
1) **Entrée** : contexte + objectif + contraintes (format strict)
2) **Outils** : liste courte, permissions minimales, logs
3) **Mémoire** : notes durables + recherche (pas tout dans le contexte)
4) **Planification** : étapes + critères d’arrêt (definition of done)
5) **Garde-fous** : validations, limites, red flags, approvals
6) **Observabilité** : traces, erreurs, artefacts, lien vers la source

## Le piège #1 : trop d’outils
Plus tu ajoutes d’outils, plus tu augmentes :
- la surface d’erreur
- les hallucinations “actionnables”
- le coût cognitif

> Commence petit. Ajoute un outil quand il est nécessaire *et* testable.

## Le piège #2 : pas de “done”
Un agent sans définition de “terminé” boucle.

Exemple de DoD simple :
- fichier produit
- tests passés
- liens vérifiés
- changement pushé

## À garder simple dès le jour 1
- 1 format de brief (template)
- 1 checklist QA
- 1 endroit où lire les logs

(À compléter : exemples concrets d’implémentation + checklists.)
