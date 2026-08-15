import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SanityLive } from "@/sanity/live";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { FAQS } from "@/components/sections/FAQ";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const TITLE = "Fluidly | The Process Intelligence Operating System";
const DESCRIPTION =
  "Fluidly makes organizational work visible, explainable, executable, and continuously improvable. A shared execution and intelligence layer beneath every application.";

export const metadata: Metadata = {
  title: { default: TITLE, template: "%s / Fluidly" },
  description: DESCRIPTION,
  keywords: [
    "process intelligence operating system",
    "process intelligence",
    "workflow automation platform",
    "decision intelligence software",
    "digital twin for business processes",
    "healthcare workflow automation",
    "medication refill automation",
  ],
  metadataBase: new URL("https://fluidly.ai"),
  alternates: { canonical: "/" },
  authors: [{ name: "Fluidly, Inc." }],
  openGraph: {
    title: TITLE,
    description:
      "The operating system for how work actually moves. Visible state. Explainable decisions. Executable policy. Traceable outcomes.",
    type: "website",
    url: "https://fluidly.ai",
    siteName: "Fluidly",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://fluidly.ai/#organization",
      name: "Fluidly",
      url: "https://fluidly.ai",
      logo: "https://fluidly.ai/fluidly-logo.png",
      description: DESCRIPTION,
      email: "contact@fluidly.ai",
    },
    {
      "@type": "SoftwareApplication",
      name: "Fluidly",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: DESCRIPTION,
      url: "https://fluidly.ai",
      offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
      publisher: { "@id": "https://fluidly.ai/#organization" },
    },
    {
      "@type": "WebSite",
      "@id": "https://fluidly.ai/#website",
      url: "https://fluidly.ai",
      name: "Fluidly",
      publisher: { "@id": "https://fluidly.ai/#organization" },
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050f16" },
    { media: "(prefers-color-scheme: light)", color: "#f6f7f4" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${manrope.variable} ${jetbrains.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem>
          <div className="grain" aria-hidden />
          <SmoothScroll />
          {children}
        </ThemeProvider>
        <SanityLive />
      </body>
    </html>
  );
}
