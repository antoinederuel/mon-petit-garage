import type { ComponentType } from "./types";

const km = (n: number) => n * 1000;
const h = (n: number) => n * 3600;

/**
 * Durées de vie indicatives, à affiner et sourcer (voir ROADMAP phase 1).
 * Elles varient beaucoup selon l'usage : l'utilisateur peut toujours les modifier.
 */
export const COMPONENT_TYPES: ComponentType[] = [
  { id: "chain", name: "Chaîne", category: "drivetrain", defaultLifespan: { meters: km(3000) } },
  { id: "cassette", name: "Cassette", category: "drivetrain", defaultLifespan: { meters: km(10000) } },
  { id: "chainrings", name: "Plateaux", category: "drivetrain", defaultLifespan: { meters: km(20000) } },
  { id: "tire-road", name: "Pneu route", category: "tires", defaultLifespan: { meters: km(4000) } },
  { id: "tire-gravel", name: "Pneu gravel", category: "tires", defaultLifespan: { meters: km(3000) } },
  { id: "brake-pads", name: "Plaquettes de frein", category: "brakes", defaultLifespan: { meters: km(2000) } },
  { id: "brake-rotor", name: "Disque de frein", category: "brakes", defaultLifespan: { meters: km(15000) } },
  { id: "bar-tape", name: "Guidoline", category: "contact", defaultLifespan: { months: 12 } },
  { id: "sealant", name: "Préventif tubeless", category: "tires", defaultLifespan: { months: 4 } },
  { id: "fork-service", name: "Révision fourche (bas de fourreaux)", category: "suspension", defaultLifespan: { seconds: h(50) } },
  { id: "shock-service", name: "Révision amortisseur", category: "suspension", defaultLifespan: { seconds: h(50) } },
];

export function getComponentType(id: string): ComponentType | undefined {
  return COMPONENT_TYPES.find((t) => t.id === id);
}
