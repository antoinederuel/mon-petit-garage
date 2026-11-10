import { describe, expect, it } from "vitest";
import { COMPONENT_TYPES, getComponentType } from "./catalog";
import { computeWear } from "./wear";

describe("COMPONENT_TYPES", () => {
  it("a des identifiants uniques", () => {
    const ids = COMPONENT_TYPES.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(COMPONENT_TYPES)("$id : durée de vie, contrôle et sources renseignés", (type) => {
    const limits = Object.values(type.defaultLifespan);
    expect(limits.length).toBeGreaterThan(0);
    for (const limit of limits) expect(limit).toBeGreaterThan(0);

    expect(type.wearCheck.trim()).not.toBe("");

    expect(type.sources.length).toBeGreaterThan(0);
    for (const source of type.sources) {
      expect(source.label.trim()).not.toBe("");
      expect(source.claim.trim()).not.toBe("");
      expect(new URL(source.url).protocol).toBe("https:");
    }
  });
});

describe("getComponentType", () => {
  it("retrouve un type par son identifiant", () => {
    expect(getComponentType("chain")?.name).toBe("Chaîne");
  });

  it("renvoie undefined pour un identifiant inconnu", () => {
    expect(getComponentType("flux-capacitor")).toBeUndefined();
  });
});

describe("révision complète de fourche (heures ou mois, au premier atteint)", () => {
  const type = getComponentType("fork-full-service");
  const fork = { id: "f1", bikeId: "b1", typeId: "fork-full-service", installedAt: "2026-01-01T00:00:00Z" };

  it("est due après un an même avec peu d'heures", () => {
    const rides = [
      {
        id: "r1",
        bikeId: "b1",
        startedAt: "2026-03-01T08:00:00Z",
        distanceMeters: 30_000,
        movingSeconds: 10 * 3600,
        source: "manual" as const,
      },
    ];
    const res = computeWear(fork, rides, type?.defaultLifespan ?? {}, "2027-01-15T00:00:00Z");
    expect(res.drivenBy).toBe("months");
    expect(res.status).toBe("replace");
  });
});
