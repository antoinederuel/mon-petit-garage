# ADR 0001 — Stack technique

- **Statut** : proposé (à valider par Antoine)
- **Date** : 10/11/2026

## Contexte
App web d'abord, mobile ensuite, développée seul. Objectifs : portfolio et revenus secondaires.

## Décision
Monorepo TypeScript :
- `packages/core` : logique métier pure, partagée par le web et le mobile
- `apps/web` : Next.js + Tailwind
- `apps/mobile` : Expo (plus tard)
- PostgreSQL + Prisma, Auth.js, Vitest, Playwright

## Pourquoi
- Un seul langage du back au mobile, et la logique d'usure écrite une seule fois.
- Next.js et React Native sont très demandés en alternance et en freelance (bon pour le CV).
- Écosystème très documenté : beaucoup de ressources et de librairies.

## Alternatives écartées
- **Flutter** : un seul code mobile et web, mais le web Flutter est moins bon pour le SEO et la page d'accueil.
- **PWA seule** : la plus simple, mais limitée sur iOS (notifications, intégration au système).
- **Back séparé (NestJS, FastAPI)** : plus de maintenance pour un projet solo ; on pourra extraire une API plus tard.

## Conséquences
- Il faut garder `packages/core` sans dépendance au framework.
- Les routes API Next.js serviront aussi à l'app mobile au départ.
