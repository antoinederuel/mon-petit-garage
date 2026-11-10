# ADR 0003 — Durées de vie par défaut sourcées

- **Statut** : proposé (à valider par Antoine)
- **Date** : 10/11/2026

## Contexte
Les durées de vie par défaut du catalogue servent à calculer l'usure dès qu'une pièce est ajoutée.
Le cadrage cite le risque « durées de vie contestables » et prévoit d'afficher les sources.
Or les fabricants ne publient presque jamais de durée en km pour les pièces d'usure : ils fixent
un **seuil mesurable** (allongement de chaîne, épaisseur de plaquette ou de disque). Seuls les
entretiens périodiques (suspensions, préventif tubeless) ont un intervalle officiel.

## Décision
Chaque `ComponentType` porte, en plus de `defaultLifespan` :
- `basis` : `manufacturer` (intervalle publié par un fabricant) ou `estimate` (ordre de grandeur
  issu d'essais et de retours d'usage) ;
- `sources` : liste `{ label, url, claim }`, où `claim` résume en une phrase ce que dit la source ;
- `wearCheck` : le contrôle concret qui décide du remplacement.

Règles de choix des valeurs :
- intervalle constructeur quand il existe ; si les marques divergent, la valeur la plus prudente
  des grandes marques (ex. FOX 125 h ou 1 an pour une révision complète, RockShox 100 à 200 h) ;
- pour une estimation, le **bas de la fourchette** trouvée : l'app doit prévenir avant la casse ;
- les critères se combinent (ex. heures **et** mois) : `computeWear` retient le plus pénalisant.

Un test vérifie que chaque type a une durée de vie, un contrôle d'usure et au moins une source https.

## Limites connues
- Les sources ont été relevées par recherche web en novembre 2026 ; leurs URL n'ont pas pu être
  ouvertes une à une depuis l'environnement de développement. À revérifier avant d'afficher les
  sources dans l'interface.
- Les durées en km des disques (15 000 km), plateaux (20 000 km) et de la guidoline (12 mois)
  sont des ordres de grandeur peu documentés : pour ces pièces, `wearCheck` compte plus que le chiffre.
- Pas encore de type pour les câbles, le boîtier de pédalier ou la purge des freins : aucune source
  fiable avec un intervalle chiffré n'a été trouvée.

## Conséquences
- Le front pourra afficher « pourquoi cette durée » et « comment vérifier » pour chaque pièce.
- Ajouter un type de pièce impose de citer au moins une source.
