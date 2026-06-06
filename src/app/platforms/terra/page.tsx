import Link from "next/link";

export default function TerraPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white sm:px-10">
      <nav className="mb-16 flex gap-6">
        <Link
          href="/"
          className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
        >
          Back to home
        </Link>
      </nav>

      <section className="mx-auto flex max-w-3xl flex-col gap-8">
        <div>
          <p className="mb-3 text-xl font-medium uppercase tracking-[0.24em] text-blue-400">
            Environmental Platform
          </p>
          <h1 className="text-5xl font-semibold tracking-normal sm:text-7xl">
            Sapiens Scientia Terra
          </h1>
        </div>

        <p className="max-w-2xl text-lg leading-8 text-slate-300">
          A future platform for Earth systems, ecology, climate, energy,
          resources, infrastructure, planetary health, and the environmental
          conditions of human civilization.
        </p>
      </section>
    </main>
  );
}
