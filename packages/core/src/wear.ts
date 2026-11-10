import type { Component, Lifespan, Ride } from "./types";

export type WearStatus = "ok" | "watch" | "replace";

export interface WearResult {
  /** 0 = neuf, 1 = fin de vie théorique (peut dépasser 1). */
  ratio: number;
  status: WearStatus;
  /** Critère qui détermine l'usure. */
  drivenBy: keyof Lifespan | null;
  usage: { meters: number; seconds: number; months: number };
}

const WATCH_THRESHOLD = 0.8;

function monthsBetween(fromIso: string, toIso: string): number {
  const ms = new Date(toIso).getTime() - new Date(fromIso).getTime();
  return Math.max(0, ms / (1000 * 60 * 60 * 24 * 30.44));
}

/**
 * Calcule l'usure d'une pièce à partir des sorties du vélo.
 * Seules les sorties faites pendant que la pièce était montée sont comptées.
 */
export function computeWear(
  component: Component,
  rides: Ride[],
  lifespan: Lifespan,
  now: string = new Date().toISOString(),
): WearResult {
  const installed = new Date(component.installedAt).getTime();
  const end = component.retiredAt ?? now;
  const endTime = new Date(end).getTime();

  const relevant = rides.filter((r) => {
    const t = new Date(r.startedAt).getTime();
    return r.bikeId === component.bikeId && t >= installed && t <= endTime;
  });

  const usage = {
    meters: relevant.reduce((sum, r) => sum + r.distanceMeters, 0),
    seconds: relevant.reduce((sum, r) => sum + r.movingSeconds, 0),
    months: monthsBetween(component.installedAt, end),
  };

  let ratio = 0;
  let drivenBy: keyof Lifespan | null = null;
  for (const key of ["meters", "seconds", "months"] as const) {
    const limit = lifespan[key];
    if (limit && limit > 0) {
      const r = usage[key] / limit;
      if (drivenBy === null || r > ratio) {
        ratio = r;
        drivenBy = key;
      }
    }
  }

  const status: WearStatus = ratio >= 1 ? "replace" : ratio >= WATCH_THRESHOLD ? "watch" : "ok";
  return { ratio, status, drivenBy, usage };
}
