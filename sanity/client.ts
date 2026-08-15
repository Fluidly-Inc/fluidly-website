import { createClient } from "next-sanity";
import "../sanity.types"; // activates generated query-result type overloads

// Fall back to placeholders so createClient never throws at module load when
// env is unset (e.g. a build without Sanity vars configured). Real fetches
// still fail without the true values, but the build and non-fetching pages
// like /_not-found no longer crash. Set the real values in Vercel env.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing-project-id";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-08-15"; // hard-coded UTC date, per Sanity guidance

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Blog fetches will fail until it is configured in the environment."
  );
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // token reads bypass the CDN
  // The dataset is private, so even published-content reads need the token.
  // This module is only imported by server code (pages, route handlers,
  // sitemap), so the token never ships to the browser. defineLive omits the
  // token on published fetches, which is why it must live on the client here.
  token: process.env.SANITY_API_READ_TOKEN,
});

// Alias kept for call sites that read at build/request time (sitemap,
// generateStaticParams). Same token-authed client.
export const serverClient = client;
