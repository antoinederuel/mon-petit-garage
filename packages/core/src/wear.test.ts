import { describe, expect, it } from "vitest";
import { computeWear } from "./wear";
import type { Component, Ride } from "./types";

const chain: Component = {
  id: "c1",
  bikeId: "b1",
  typeId: "chain",
  installedAt: "2026-01-01T00:00:00Z",
};

const ride = (id: string, date: string, km: number, bikeId = "b1"): Ride => ({
  id,
  bikeId,
  startedAt: date,
  distanceMeters: km * 1000,
  movingSeconds: km * 120,
  source: "manual",
});

describe("computeWear", () => {
  it("ne compte que les sorties du bon vélo après la pose", () => {
    const rides = [
      ride("r0", "2025-12-15T08:00:00Z", 100), // avant la pose
      ride("r1", "2026-02-01T08:00:00Z", 1000),
      ride("r2", "2026-03-01T08:00:00Z", 500, "b2"), // autre vélo
    ];
    const res = computeWear(chain, rides, { meters: 3_000_000 }, "2026-04-01T00:00:00Z");
    expect(res.usage.meters).toBe(1_000_000);
    expect(res.ratio).toBeCloseTo(1 / 3);
    expect(res.status).toBe("ok");
  });

  it("passe en 'watch' à 80 % et 'replace' à 100 %", () => {
    const watch = computeWear(chain, [ride("r", "2026-02-01T08:00:00Z", 2500)], { meters: 3_000_000 });
    const replace = computeWear(chain, [ride("r", "2026-02-01T08:00:00Z", 3100)], { meters: 3_000_000 });
    expect(watch.status).toBe("watch");
    expect(replace.status).toBe("replace");
  });

  it("prend le critère le plus pénalisant", () => {
    const res = computeWear(chain, [ride("r", "2026-02-01T08:00:00Z", 100)], { meters: 3_000_000, months: 6 }, "2026-06-15T00:00:00Z");
    expect(res.drivenBy).toBe("months");
    expect(res.status).toBe("watch");
  });

  it("gère une pièce sans durée de vie", () => {
    const res = computeWear(chain, [ride("r", "2026-02-01T08:00:00Z", 100)], {});
    expect(res.ratio).toBe(0);
    expect(res.drivenBy).toBeNull();
  });
});
