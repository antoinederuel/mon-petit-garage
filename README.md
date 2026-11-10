# MonPetitGarage 🚲

**L'entretien de tes vélos**, dans un carnet qui se remplit tout seul.
Déclare tes vélos et leurs pièces, connecte Strava, et sois prévenu avant que ta chaîne ou tes plaquettes lâchent.

> Projet en cours de développement : voir [la roadmap](docs/ROADMAP.md).

## Structure
```
apps/web        Application web (Next.js)
apps/mobile     Application mobile (Expo), phase 2
packages/core   Logique métier partagée : modèle, calcul d'usure
docs/           Cadrage, roadmap, décisions d'architecture (ADR)
```

## Démarrer
```bash
pnpm install
pnpm test
```

## Contribuer
Conventions et workflow : [`CONTRIBUTING.md`](CONTRIBUTING.md).
