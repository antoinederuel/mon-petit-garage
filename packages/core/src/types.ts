/** Unités internes : distances en mètres, durées en secondes, dates ISO UTC. */

export type ComponentCategory = "drivetrain" | "brakes" | "tires" | "wheels" | "suspension" | "contact" | "other";

export interface Lifespan {
  meters?: number;
  seconds?: number;
  months?: number;
}

/**
 * Origine d'une durée de vie par défaut :
 * - `manufacturer` : intervalle publié par un fabricant (révisions de suspension, préventif…) ;
 * - `estimate` : ordre de grandeur tiré d'essais et de retours d'usage. Les fabricants donnent
 *   rarement une durée en km pour les pièces d'usure : ils fixent un seuil mesurable (voir `wearCheck`).
 */
export type LifespanBasis = "manufacturer" | "estimate";

export interface LifespanSource {
  /** Nom lisible de la source (fabricant, média, atelier). */
  label: string;
  url: string;
  /** Ce que la source affirme, en une phrase. */
  claim: string;
}

export interface ComponentType {
  id: string;
  name: string;
  category: ComponentCategory;
  defaultLifespan: Lifespan;
  basis: LifespanBasis;
  /** Contrôle concret qui décide du remplacement, quelle que soit la durée de vie théorique. */
  wearCheck: string;
  sources: LifespanSource[];
}

export interface Component {
  id: string;
  bikeId: string;
  typeId: string;
  label?: string;
  installedAt: string;
  /** Lifespan personnalisé : remplace celui du type s'il est défini. */
  lifespan?: Lifespan;
  retiredAt?: string;
}

export interface Ride {
  id: string;
  bikeId: string;
  startedAt: string;
  distanceMeters: number;
  movingSeconds: number;
  source: "strava" | "manual";
  externalId?: string;
}

export interface Bike {
  id: string;
  name: string;
  stravaGearId?: string;
  archivedAt?: string;
}
