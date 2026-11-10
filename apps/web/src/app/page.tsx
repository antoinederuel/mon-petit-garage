import { COMPONENT_TYPES } from "@mon-petit-garage/core";
import { formatLifespan } from "@/lib/format";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16">
      <header className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">MonPetitGarage 🚲</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          L&apos;entretien de tes vélos, dans un carnet qui se remplit tout seul.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Pièces suivies</h2>
        <ul className="divide-y divide-zinc-200 rounded-lg border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {COMPONENT_TYPES.map((type) => (
            <li key={type.id} className="flex items-center justify-between gap-4 px-4 py-3">
              <span>{type.name}</span>
              <span className="text-sm text-zinc-500 tabular-nums">{formatLifespan(type.defaultLifespan)}</span>
            </li>
          ))}
        </ul>
        <p className="text-sm text-zinc-500">Durées de vie indicatives, modifiables pour chaque pièce.</p>
      </section>
    </main>
  );
}
