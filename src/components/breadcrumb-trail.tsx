import { SiteNav } from "@/components/site-nav";
import { breadcrumbTrail, SITE_URL } from "@/lib/routes";

// Renders the breadcrumb trail for a deep page as the top nav, and emits the
// matching schema.org BreadcrumbList so the hierarchy is machine-readable.
// Deep pages pass their own path; the labels come from the shared route map.
export function BreadcrumbTrail({ path }: { path: string }) {
  const trail = breadcrumbTrail(path);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };

  return (
    <>
      <SiteNav links={trail} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
