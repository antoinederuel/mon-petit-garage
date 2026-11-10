import type { ComponentType } from "./types";

const km = (n: number) => n * 1000;
const h = (n: number) => n * 3600;

/**
 * Catalogue des types de pièces et de leurs durées de vie par défaut.
 *
 * Les durées varient beaucoup selon l'usage (météo, terrain, poids, entretien) :
 * l'utilisateur peut toujours les modifier, et `wearCheck` prime sur la durée théorique.
 * Pour une pièce d'usure, on retient le bas de la fourchette trouvée dans les sources
 * pour prévenir avant la casse plutôt qu'après.
 * Méthode et limites : docs/decisions/0003-durees-de-vie-sourcees.md
 */
export const COMPONENT_TYPES: ComponentType[] = [
  // --- Transmission --------------------------------------------------------
  {
    id: "chain",
    name: "Chaîne",
    category: "drivetrain",
    defaultLifespan: { meters: km(3000) },
    basis: "estimate",
    wearCheck:
      "Mesurer l'allongement avec un contrôleur d'usure : remplacer à 0,5 % (11-12 vitesses), 0,75 % (10 vitesses et moins), ou au repère de l'outil SRAM pour les chaînes Eagle et Flattop.",
    sources: [
      {
        label: "Park Tool — CC-3.2 Chain Wear Indicator",
        url: "https://www.parktool.com/en-us/product/chain-wear-indicator",
        claim: "Remplacer à 0,75 % pour les chaînes 5 à 10 vitesses, à 0,5 % pour les 11-12 vitesses.",
      },
      {
        label: "SRAM — outils compatibles Eagle, Flattop et 11 vitesses",
        url: "https://www.sram.com/globalassets/document-hierarchy/compatibility-map/road/sram-eagle-flattop-and-11-speed-chain-compatible-tools.pdf",
        claim: "Liste les contrôleurs d'usure validés pour les chaînes SRAM récentes.",
      },
      {
        label: "Roadman Cycling — How often to replace a bike chain",
        url: "https://roadmancycling.com/answers/how-often-to-replace-bike-chain",
        claim:
          "3 000 à 5 000 km sur une transmission propre et lubrifiée, 1 500 à 2 500 km par temps humide ou boueux.",
      },
    ],
  },
  {
    id: "cassette",
    name: "Cassette",
    category: "drivetrain",
    defaultLifespan: { meters: km(10000) },
    basis: "estimate",
    wearCheck:
      "Une chaîne neuve qui saute ou craque sur les pignons les plus utilisés signe une cassette usée. Elle dure environ 3 chaînes si celles-ci sont changées à temps.",
    sources: [
      {
        label: "road.cc — When should you replace your chainrings and cassette?",
        url: "https://road.cc/content/feature/256420-when-should-you-replace-your-chainrings-and-cassette",
        claim: "Une cassette bien entretenue tient plusieurs chaînes ; une chaîne neuve qui saute révèle son usure.",
      },
      {
        label: "CT Yeh — The Chain Is the Sacrifice, the Cassette Is the Victim",
        url: "https://ctyeh.com/articles/446?lang=en",
        claim: "Cassette : 10 000 à 15 000 km si la chaîne est remplacée à temps.",
      },
    ],
  },
  {
    id: "chainrings",
    name: "Plateaux",
    category: "drivetrain",
    defaultLifespan: { meters: km(20000) },
    basis: "estimate",
    wearCheck:
      "Dents en « aileron de requin » ou chaîne neuve qui saute sous effort. Les plateaux s'usent plus lentement que la cassette.",
    sources: [
      {
        label: "road.cc — When should you replace your chainrings and cassette?",
        url: "https://road.cc/content/feature/256420-when-should-you-replace-your-chainrings-and-cassette",
        claim: "Les plateaux durent plusieurs cassettes tant que la chaîne est changée à temps.",
      },
    ],
  },

  // --- Pneus ---------------------------------------------------------------
  {
    id: "tire-road",
    name: "Pneu route",
    category: "tires",
    defaultLifespan: { meters: km(4000) },
    basis: "estimate",
    wearCheck:
      "Témoins d'usure effacés, bande de roulement plate, coupures ou carcasse visible. Le pneu arrière s'use bien plus vite que l'avant.",
    sources: [
      {
        label: "Bicycle Rolling Resistance — Grand Prix 5000 Endurance Test",
        url: "https://www.bicyclerollingresistance.com/specials/grand-prix-5000-endurance-test",
        claim:
          "L'arrière s'use beaucoup plus que l'avant ; environ 10 000 km projetés pour un pneu route haut de gamme.",
      },
      {
        label: "TrainerRoad Forum — Tracking tire wear",
        url: "https://www.trainerroad.com/forum/t/tracking-tire-wear/71591",
        claim: "Retours de 3 700 à plus de 10 000 km à l'arrière selon le poids du cycliste et la route.",
      },
    ],
  },
  {
    id: "tire-gravel",
    name: "Pneu gravel",
    category: "tires",
    defaultLifespan: { meters: km(3000) },
    basis: "estimate",
    wearCheck: "Crampons usés ou arrachés, coupures sur les flancs, crevaisons à répétition.",
    sources: [
      {
        label: "BikeTips — How long do bike tires last?",
        url: "https://biketips.com/how-long-do-bike-tires-last/",
        claim: "1 600 à 4 800 km en moyenne pour un pneu gravel, moins sur graviers tranchants ou beaucoup de bitume.",
      },
    ],
  },
  {
    id: "sealant",
    name: "Préventif tubeless",
    category: "tires",
    defaultLifespan: { months: 3 },
    basis: "manufacturer",
    wearCheck:
      "Secouer la roue : plus de bruit de liquide, ou préventif pâteux à l'intérieur, il faut en remettre. Plus souvent par temps chaud et sec.",
    sources: [
      {
        label: "Stan's — Sealant support",
        url: "https://stans.com/pages/sealant-support",
        claim: "Le préventif dure 2 à 6 mois ; contrôle et appoint conseillés tous les trimestres.",
      },
    ],
  },

  // --- Freins --------------------------------------------------------------
  {
    id: "brake-pads",
    name: "Plaquettes de frein",
    category: "brakes",
    defaultLifespan: { meters: km(2000) },
    basis: "estimate",
    wearCheck:
      "Remplacer quand la garniture fait moins de 0,5 mm (hors support métallique), ou si elle est contaminée par de l'huile. Les plaquettes résine s'usent plus vite que les frittées, surtout sous la pluie.",
    sources: [
      {
        label: "Shimano — Service tips",
        url: "https://bike.shimano.com/en-US/service-upgradeparts/service-tips.html",
        claim: "Remplacer les plaquettes usées à 0,5 mm d'épaisseur ou contaminées par de l'huile.",
      },
      {
        label: "BikeTips — Organic vs sintered disc brake pads",
        url: "https://biketips.com/organic-vs-sintered-disc-brake-pads/",
        claim: "Plaquettes résine : environ 2 000 à 3 500 km, moins dans la boue et sous la pluie.",
      },
    ],
  },
  {
    id: "brake-rotor",
    name: "Disque de frein",
    category: "brakes",
    defaultLifespan: { meters: km(15000) },
    basis: "estimate",
    wearCheck:
      "Mesurer l'épaisseur au pied à coulisse et la comparer au minimum gravé sur le disque (Shimano 1,5 mm, SRAM 1,55 mm, Magura 1,8 mm). Changer les plaquettes avec le disque.",
    sources: [
      {
        label: "Unior — When to replace disc brake rotors",
        url: "https://uniorusa.com/blogs/tech-tips/when-to-replace-disc-brake-rotors",
        claim:
          "Disque Shimano à retirer à 1,5 mm ou dès que l'aluminium apparaît ; le minimum gravé sur le disque fait foi.",
      },
      {
        label: "BikeGremlin — When to replace bicycle brake discs",
        url: "https://bike.bikegremlin.com/20365/when-to-replace-bicycle-brake-discs-rotors",
        claim: "Épaisseurs minimales selon les marques (SRAM 1,55 mm, Magura 1,8 mm).",
      },
    ],
  },

  // --- Poste de pilotage ---------------------------------------------------
  {
    id: "bar-tape",
    name: "Guidoline",
    category: "contact",
    defaultLifespan: { months: 12 },
    basis: "estimate",
    wearCheck:
      "Guidoline tassée, déchirée ou qui glisse. En profiter pour inspecter le cintre (fissures, corrosion) et changer les câbles qui passent dessous.",
    sources: [
      {
        label: "BikeGremlin — Bicycle maintenance service intervals",
        url: "https://bike.bikegremlin.com/19342/bicycle-maintenance-service-intervals/",
        claim:
          "Range la guidoline parmi les remplacements périodiques et conseille de raccourcir les intervalles en conditions difficiles.",
      },
    ],
  },

  // --- Suspensions ---------------------------------------------------------
  {
    id: "fork-service",
    name: "Entretien bas de fourreaux (fourche)",
    category: "suspension",
    defaultLifespan: { seconds: h(50) },
    basis: "manufacturer",
    wearCheck: "Joints qui suintent, fourche qui colle ou perd de la sensibilité.",
    sources: [
      {
        label: "RockShox — How often should I service my RockShox product?",
        url: "https://support.rockshox.com/hc/en-us/articles/4412306753947-How-often-should-I-service-my-RockShox-product",
        claim: "Entretien des bas de fourreaux toutes les 50 heures.",
      },
    ],
  },
  {
    id: "fork-full-service",
    name: "Révision complète fourche",
    category: "suspension",
    defaultLifespan: { seconds: h(125), months: 12 },
    basis: "manufacturer",
    wearCheck:
      "Amortissement qui change de comportement, bruits, perte de débattement. Se référer au manuel du modèle : RockShox donne 100 ou 200 h selon l'année.",
    sources: [
      {
        label: "FOX — Why use FOX Service Centers?",
        url: "https://ridefox.com/blogs/stories/why-use-fox-service-centers",
        claim:
          "Révision complète des fourches, amortisseurs et tiges de selle toutes les 125 heures ou une fois par an, au premier atteint.",
      },
      {
        label: "RockShox — How often should I service my RockShox product?",
        url: "https://support.rockshox.com/hc/en-us/articles/4412306753947-How-often-should-I-service-my-RockShox-product",
        claim: "Entretien de l'amortissement et du ressort de fourche toutes les 100 ou 200 heures selon le modèle.",
      },
    ],
  },
  {
    id: "shock-service",
    name: "Entretien chambre à air (amortisseur)",
    category: "suspension",
    defaultLifespan: { seconds: h(50) },
    basis: "manufacturer",
    wearCheck: "Perte de pression, huile sur le corps de l'amortisseur, frottements.",
    sources: [
      {
        label: "RockShox — How often should I service my RockShox product?",
        url: "https://support.rockshox.com/hc/en-us/articles/4412306753947-How-often-should-I-service-my-RockShox-product",
        claim: "Entretien de la chambre à air de l'amortisseur toutes les 50 heures.",
      },
    ],
  },
  {
    id: "shock-full-service",
    name: "Révision complète amortisseur",
    category: "suspension",
    defaultLifespan: { seconds: h(125), months: 12 },
    basis: "manufacturer",
    wearCheck:
      "Amortissement qui change de comportement ou bruits. RockShox donne 100 h (Monarch, Vivid, Kage) ou 200 h (Deluxe, Super Deluxe).",
    sources: [
      {
        label: "FOX — Why use FOX Service Centers?",
        url: "https://ridefox.com/blogs/stories/why-use-fox-service-centers",
        claim:
          "Révision complète des fourches, amortisseurs et tiges de selle toutes les 125 heures ou une fois par an, au premier atteint.",
      },
      {
        label: "RockShox — How often should I service my RockShox product?",
        url: "https://support.rockshox.com/hc/en-us/articles/4412306753947-How-often-should-I-service-my-RockShox-product",
        claim: "Révision de la cartouche d'amortisseur toutes les 100 ou 200 heures selon le modèle.",
      },
    ],
  },
  {
    id: "dropper-service",
    name: "Révision tige de selle télescopique",
    category: "suspension",
    defaultLifespan: { seconds: h(125), months: 12 },
    basis: "manufacturer",
    wearCheck: "Tige qui ne remonte plus franchement, jeu latéral, descente spontanée sous le poids.",
    sources: [
      {
        label: "FOX — Why use FOX Service Centers?",
        url: "https://ridefox.com/blogs/stories/why-use-fox-service-centers",
        claim:
          "Révision complète des fourches, amortisseurs et tiges de selle toutes les 125 heures ou une fois par an, au premier atteint.",
      },
    ],
  },
];

export function getComponentType(id: string): ComponentType | undefined {
  return COMPONENT_TYPES.find((t) => t.id === id);
}
