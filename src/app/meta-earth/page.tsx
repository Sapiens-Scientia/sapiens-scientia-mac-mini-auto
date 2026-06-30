import type { Metadata } from "next";
import { MetaEarthExperience } from "@/components/meta-earth-experience";

export const metadata: Metadata = {
  title: "Meta Earth | Sapiens Scientia",
  description:
    "The original Sapiens Scientia homepage experience: Physical Earth, Digital Halo, Meta Earth, and the platform map.",
};

export default function MetaEarthPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <MetaEarthExperience />
    </main>
  );
}
