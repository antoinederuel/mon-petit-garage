import type { Lifespan } from "@mon-petit-garage/core";

const number = new Intl.NumberFormat("fr-FR");

/** Affiche une durée de vie en unités lisibles (km, h, mois). */
export function formatLifespan(lifespan: Lifespan): string {
  const parts: string[] = [];
  if (lifespan.meters) parts.push(`${number.format(lifespan.meters / 1000)} km`);
  if (lifespan.seconds) parts.push(`${number.format(lifespan.seconds / 3600)} h`);
  if (lifespan.months) parts.push(`${number.format(lifespan.months)} mois`);
  return parts.length > 0 ? parts.join(" · ") : "—";
}
