import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // pin the workspace root so Next stops walking up to the home directory
  turbopack: { root: __dirname },
  // don't auto-generate CLAUDE.md / AGENTS.md in the app folder
  agentRules: false,
};

export default nextConfig;
