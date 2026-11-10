# Guide de contribution — MonPetitGarage

Conventions du projet. À lire avant toute contribution.

## Le produit en une phrase
Une app (web d'abord, mobile ensuite) où un cycliste enregistre ses vélos et leurs pièces, et qui suit leur usure
automatiquement à partir de ses sorties pour le prévenir avant qu'une pièce lâche.

Détails : `docs/CADRAGE.md` · Roadmap : `docs/ROADMAP.md` · Décisions : `docs/decisions/`

## Stack (voir ADR 0001)
- Monorepo **pnpm workspaces** + Turborepo · ESLint + Prettier (voir ADR 0002)
- `apps/web` : **Next.js** (App Router) + TypeScript + Tailwind
- `apps/mobile` : **Expo / React Native** (phase 2, ne pas toucher avant la fin du MVP web)
- `packages/core` : logique métier pure en TypeScript (modèle de données, calcul d'usure). **Aucune dépendance à React, Next ou la BDD.**
- BDD : **PostgreSQL** + **Prisma** · Auth : Auth.js (email + Strava OAuth)
- Tests : **Vitest** (core) · Playwright (parcours web critiques)

## Règles de travail
- La logique d'usure vit dans `packages/core` et est testée unitairement. Le web et le mobile ne font que l'appeler.
- TypeScript strict, pas de `any`. Unités internes : distance en **mètres**, durée en **secondes**, dates en ISO UTC.
- Une tâche = une branche = une PR petite. Commits au format Conventional Commits (`feat:`, `fix:`, `chore:`…).
- Avant de dire qu'une tâche est finie : `pnpm lint && pnpm typecheck && pnpm test` doivent passer.
- Toute décision structurante (lib, archi, schéma) → un ADR court dans `docs/decisions/`.
- Ne jamais committer de secret. Les clés (Strava, BDD) vont dans `.env.local`, documentées dans `.env.example`.
- Interface et contenus en français ; code, noms de variables et commits en anglais.

## Commandes
```bash
pnpm install          # installer
pnpm dev              # lancer le web en local (http://localhost:3000)
pnpm build            # build de production
pnpm test             # tests (Vitest)
pnpm lint             # lint (ESLint)
pnpm format           # formater le code (Prettier) ; pnpm format:check pour vérifier
pnpm typecheck        # vérif TypeScript
pnpm db:migrate       # migrations Prisma (une fois apps/web initialisé)
```

## Workflow d'une tâche
1. Prendre la première tâche non cochée de `docs/ROADMAP.md`.
2. Écrire un plan court (fichiers touchés, tests, risques) avant de coder.
3. Branche `feat/<nom-court>`, implémentation + tests.
4. `pnpm lint && pnpm typecheck && pnpm test` au vert (la CI les relance sur chaque PR, avec `format:check` et `build`).
5. Cocher la tâche dans la roadmap, commit Conventional Commits, PR.

## Hors périmètre MVP (ne pas implémenter sans demande)
Paiement / premium, app mobile, social, marketplace de pièces, import Garmin/Wahoo, multi-langue.
