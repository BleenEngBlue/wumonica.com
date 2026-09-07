import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { cormorant, dmMono, dmSans } from "./fonts";
import { SITE, JSON_LD } from "@/data/site";
import { THEME_INIT_SCRIPT } from "@/lib/theme";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: SITE.title,
  description: SITE.description,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE.url,
    title: SITE.ogTitle,
    description: SITE.ogDescription,
    siteName: "wumonica.com",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${SITE.name} — portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.ogTitle,
    description: SITE.ogDescription,
    images: ["/og.png"],
  },
  referrer: "strict-origin-when-cross-origin",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090f" },
    { media: "(prefers-color-scheme: light)", color: "#f5f0e8" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-theme defaults to dark and is overridden pre-paint by THEME_INIT_SCRIPT;
    // suppressHydrationWarning keeps React from flagging that expected difference.
    <html lang="en" data-theme="dark" className={`${cormorant.variable} ${dmMono.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <head>
        {/* Static constant, no interpolation — see src/lib/theme.ts. Hash is added to the CSP post-build. */}
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <JsonLd data={JSON_LD} />
      </head>
      <body>{children}</body>
    </html>
  );
}
