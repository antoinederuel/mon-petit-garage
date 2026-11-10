/** Unités internes : distances en mètres, durées en secondes, dates ISO UTC. */

export type ComponentCategory =
  | "drivetrain"
  | "brakes"
  | "tires"
  | "wheels"
  | "suspension"
  | "contact"
  | "other";

export interface Lifespan {
  meters?: number;
  seconds?: number;
  months?: number;
}

export interface ComponentType {
  id: string;
  name: string;
  category: ComponentCategory;
  defaultLifespan: Lifespan;
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
