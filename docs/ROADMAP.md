# Roadmap

Cocher `[x]` quand une tâche est mergée.

## Phase 0 — Fondations
- [x] Structure du monorepo, guide de contribution, cadrage
- [x] Installer les outils du monorepo (Turborepo, ESLint, Prettier, Vitest) et faire passer `pnpm lint/typecheck/test`
- [ ] Initialiser `apps/web` avec Next.js (App Router, TS, Tailwind) et le brancher sur `@mon-petit-garage/core`
- [ ] CI GitHub Actions : lint + typecheck + test sur chaque PR

## Phase 1 — Cœur métier (packages/core)
- [ ] Compléter le catalogue `ComponentType` avec des durées de vie sourcées
- [ ] Tests de `computeWear` sur les cas limites (aucune durée de vie, pièce retirée, plusieurs critères)
- [ ] Fonction `rankComponentsByUrgency(bike)` pour le tableau de bord

## Phase 2 — Web MVP
- [ ] Schéma Prisma + PostgreSQL local (Docker) + seed du catalogue
- [ ] Auth.js : connexion par email
- [ ] CRUD vélos
- [ ] CRUD pièces + remplacement
- [ ] Saisie manuelle d'une sortie
- [ ] Tableau de bord d'usure

## Phase 3 — Strava
- [ ] Lire l'API Agreement Strava, noter les contraintes dans un ADR
- [ ] OAuth Strava + stockage des tokens (refresh)
- [ ] Import initial des vélos (`gear`) et des sorties
- [ ] Webhook Strava pour les nouvelles sorties

## Phase 4 — Mise en ligne
- [ ] Déploiement (Vercel + BDD managée), domaine
- [ ] Page d'accueil + README portfolio avec captures

## Plus tard
App mobile Expo · notifications · coûts · premium
