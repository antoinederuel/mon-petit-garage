import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MonPetitGarage — l'entretien de tes vélos",
  description: "Le carnet d'entretien de tous tes vélos, qui se remplit tout seul.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
