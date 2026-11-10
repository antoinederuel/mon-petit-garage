# ADR 0002 — Outillage du monorepo

- **Statut** : proposé (à valider par Antoine)
- **Date** : 10/11/2026

## Contexte
Il faut des commandes `pnpm lint`, `pnpm typecheck` et `pnpm test` uniques à la racine, qui marchent
pour `packages/core` aujourd'hui et pour `apps/web` / `apps/mobile` demain.

## Décision
- **Turborepo** orchestre les tâches (`lint`, `typecheck`, `test`, `dev`) de chaque package, avec cache local.
  Les scripts racine appellent `turbo run <tâche>`.
- **ESLint 10** en flat config unique à la racine (`eslint.config.js`) : `@eslint/js` recommended
  + `typescript-eslint` strict, `no-explicit-any` en erreur, imports de types explicites.
  Chaque package lance `eslint .`, qui remonte jusqu'à cette config.
- **Prettier** pour le formatage du code (largeur 120), `eslint-config-prettier` pour éviter les conflits.
  Les fichiers Markdown sont exclus (rédigés à la main). Commandes : `pnpm format` / `pnpm format:check`.
- **Vitest** reste déclaré par package (déjà en place dans `packages/core`).

## Alternatives écartées
- **Biome** (lint + format en un outil, plus rapide) : écosystème de règles encore moins riche que ESLint,
  et la config Next.js officielle cible ESLint.
- **Scripts `pnpm -r` sans Turborepo** : suffisant aujourd'hui, mais pas de cache ni d'ordre entre packages
  quand le web dépendra de `core`.

## Conséquences
- Un nouveau package ajoute simplement ses scripts `lint` / `typecheck` / `test` ; Turborepo les détecte.
- `apps/web` pourra étendre la config racine avec les règles Next.js.
