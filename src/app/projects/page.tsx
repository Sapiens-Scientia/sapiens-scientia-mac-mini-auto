import Link from "next/link";

const projectLinks = [
  {
    href: "https://github.com/Sapiens-Scientia/sapiensscientia.com",
    label: "SapiensScientia.com Repository",
  },
  {
    href: "https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/",
    label: "NASA Blue Marble",
  },
  {
    href: "https://threejs.org/",
    label: "Three.js",
  },
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-8 text-white sm:px-10">
      <nav className="mb-16">
        <Link
          href="/"
          className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
        >
          Back to home
        </Link>
      </nav>

      <section className="mx-auto flex max-w-3xl flex-col gap-10">
        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.24em] text-blue-300">
            Sapiens Scientia
          </p>
          <h1 className="text-5xl font-semibold tracking-normal sm:text-7xl">Projects</h1>
        </div>

        <div className="divide-y divide-white/15 border-y border-white/15">
          {projectLinks.map((project) => (
            <a
              key={project.href}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-6 py-6 text-xl font-medium text-slate-100 transition-colors hover:text-blue-200 sm:text-2xl"
            >
              <span>{project.label}</span>
              <span className="text-sm uppercase tracking-[0.2em] text-blue-300">Open</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
