import Link from "next/link";

const projectLinks = [
  {
    href: "/projects/sapiens-scientia-data-index",
    label: "Sapiens Scientia Data Index",
    external: false,
  },
  {
    href: "https://earthview3d.vercel.app/",
    label: "EarthView 3D",
    external: true,
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
          <p className="mb-3 text-xl font-medium uppercase tracking-[0.24em] text-blue-300">
            Sapiens Scientia
          </p>
          <h1 className="text-5xl font-semibold tracking-normal sm:text-7xl">Projects</h1>
        </div>

        <div className="divide-y divide-white/15 border-y border-white/15">
          {projectLinks.map((project) => (
            <Link
              key={project.href}
              href={project.href}
              target={project.external ? "_blank" : undefined}
              rel={project.external ? "noreferrer" : undefined}
              className="flex items-center justify-between gap-6 py-6 text-xl font-medium text-slate-100 transition-colors hover:text-blue-200 sm:text-2xl"
            >
              <span>{project.label}</span>
              <span className="text-sm uppercase tracking-[0.2em] text-blue-300">
                {project.external ? "Open" : "View"}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
