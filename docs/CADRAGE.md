# Cadrage — MonPetitGarage

_Version 0.1 — 10/11/2026 — Antoine_

## 1. Vision
Le carnet d'entretien de tous tes vélos, qui se remplit tout seul.
Tu déclares tes vélos et leurs pièces une fois ; tes sorties (Strava) font tourner les compteurs ;
l'app te prévient quand une chaîne, des plaquettes ou des pneus arrivent en fin de vie.

## 2. Problème
- Les cyclistes ne savent pas combien de km ont fait leur chaîne ou leurs pneus.
- Une chaîne changée trop tard use la cassette et les plateaux : ça coûte 3 à 5 fois plus cher.
- Les outils existants sont abandonnés, trop limités ou noyés dans une app d'entraînement.

## 3. Personas
| Persona | Profil | Ce qu'il veut |
|---|---|---|
| **Le régulier** | Route/gravel, 5 000 à 10 000 km/an, 1 à 3 vélos, sur Strava | Ne plus rater un remplacement, savoir ce que lui coûte son vélo |
| **Le vélotafeur** | Trajets quotidiens, entretien minimal | Une alerte simple avant la panne |
| **Le VTTiste** | Usure liée aux heures et au terrain (fourche, amortisseur) | Suivre les révisions en heures, pas en km |

**Cible du MVP : le régulier.** C'est le plus simple à servir et le plus susceptible de payer.

## 4. Concurrence (à approfondir)
- ProBikeGarage : référence historique du créneau, plus maintenue depuis 2025 selon Antoine → fenêtre à saisir, et ses utilisateurs cherchent une alternative.
- Strava : suivi du kilométrage par vélo et rappels de composants basiques, mais ce n'est pas son cœur de métier.
- Applis récentes de suivi d'entretien sur l'App Store (vues en nov. 2026) : Velo Garage, Velox, Velo Buddy. À tester pour repérer leurs manques.
- Apps d'atelier (côté réparateurs) : autre cible.
- Nom « MonPetitGarage » : « garage » évoque la voiture sur les stores, donc le vélo doit être porté par le logo et le sous-titre (« l'entretien de tes vélos »).

**Angle différenciant à valider :** usure par type de pièce réaliste, coût d'entretien au km, UX mobile soignée.

## 5. Périmètre du MVP (v1)
**Dedans**
1. Compte utilisateur (email + connexion Strava)
2. Garage : créer / modifier / archiver des vélos
3. Pièces : ajouter des pièces à un vélo depuis un catalogue de types (chaîne, cassette, pneus, plaquettes…), avec date de pose et km de départ
4. Synchro Strava : import des sorties et rattachement au bon vélo (via le `gear_id` Strava)
5. Calcul d'usure : % d'usure par pièce selon sa durée de vie (km, heures ou mois)
6. Tableau de bord : état de chaque vélo, pièces à surveiller en premier
7. Remplacement : marquer une pièce remplacée → historique + nouvelle pièce à 0
8. Saisie manuelle d'une sortie (pour ceux qui n'ont pas Strava)

**Dehors (v2 et plus)**
App mobile Expo, notifications push, coûts et budget, freemium/paiement, Garmin/Wahoo, partage, multi-langue.

## 6. Modèle de données (première version)
```
User 1─n Bike 1─n Component n─1 ComponentType
User 1─n Ride n─1 Bike
Component 1─n ServiceEvent   (pose, entretien, remplacement)
```
- **ComponentType** : nom, catégorie, durée de vie par défaut (`lifespanKm`, `lifespanHours`, `lifespanMonths`, nullable).
- **Component** : vélo, type, marque/modèle, date de pose, km au compteur à la pose, durée de vie personnalisée, statut (actif/retiré).
- **Ride** : vélo, date, distance (m), durée (s), source (`strava` | `manual`), `externalId`.
- **Usure d'une pièce** = max(km depuis pose / durée de vie km, heures / durée de vie h, mois / durée de vie mois).

## 7. Indicateurs de réussite
- **Portfolio** : app en ligne, code propre et testé, README avec démo.
- **Produit** : 50 utilisateurs avec Strava connecté 3 mois après la mise en ligne ; 30 % reviennent chaque mois.

## 8. Risques
| Risque | Parade |
|---|---|
| Conditions de l'API Strava (quotas, usages autorisés, monétisation) | Lire l'API Agreement avant de coder la synchro ; prévoir la saisie manuelle |
| Durées de vie par défaut contestables | Valeurs modifiables par l'utilisateur, sources affichées |
| Dérive du périmètre | Ce document + la section « Hors périmètre » du CONTRIBUTING.md |

## 9. Questions ouvertes
- Nom du produit et nom de domaine
- Modèle de revenus : freemium (ex. gratuit jusqu'à 2 vélos) ou affiliation pièces ?
- Hébergement : Vercel + Neon/Supabase (gratuit au début) ?
