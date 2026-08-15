"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { StudioLogo } from "./sanity/StudioLogo";

// Read public env directly (never import the token-carrying client here:
// this config runs in the browser).
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "default",
  title: "Fluidly Blog",
  basePath: "/studio",
  projectId,
  dataset,
  icon: StudioLogo,
  studio: {
    components: { logo: StudioLogo },
  },
  plugins: [
    structureTool({ structure }),
    // Vision (GROQ playground) is a power-user tool; keep it out of the way.
    visionTool({ defaultApiVersion: "2026-08-15" }),
    codeInput(),
  ],
  schema: { types: schemaTypes },
});
