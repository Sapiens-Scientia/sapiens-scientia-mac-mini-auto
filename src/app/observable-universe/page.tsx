import type { Metadata } from "next";
import { ObservableUniverseView } from "@/components/observable-universe-view";

export const metadata: Metadata = {
  title: "Observable Universe | Sapiens Scientia",
  description:
    "A compact graphic view of the observable universe, from Earth and the Milky Way to the cosmic horizon.",
};

export default function ObservableUniversePage() {
  return (
    <main className="relative min-h-screen bg-black">
      <ObservableUniverseView />
    </main>
  );
}
