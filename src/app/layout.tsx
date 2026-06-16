import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sapiensscientia.com"),
  title: "Sapiens Scientia",
  description:
    "A public knowledge project mapping human health, society, Earth systems, and digital knowledge.",
  openGraph: {
    title: "Sapiens Scientia",
    description:
      "A public knowledge project mapping human health, society, Earth systems, and digital knowledge.",
    url: "/",
    siteName: "Sapiens Scientia",
    type: "website",
  },
};

// Applied before first paint so a returning light-mode visitor (or one whose OS
// prefers light) never sees a flash of the dark theme. Mirrors the storage key
// and `.light-theme` class that SiteNav toggles.
const themeInitScript = `(function(){try{var t=localStorage.getItem('sapiens-theme');if(t==='light'||(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches)){document.documentElement.classList.add('light-theme');}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
      </body>
    </html>
  );
}
