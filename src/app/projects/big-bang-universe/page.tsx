import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Big Bang Universe | Sapiens Scientia",
  description:
    "A standalone animated inflation diagram of 13.8 billion years of cosmic history.",
};

export default function BigBangUniversePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <iframe
        src="/standalone/big-bang-universe/index.html"
        title="Big Bang Universe"
        className="block h-screen w-screen border-0"
      />
    </main>
  );
}
