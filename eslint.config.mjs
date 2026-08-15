import next from "eslint-config-next";

const config = [
  ...next,
  {
    ignores: [".next/**", "node_modules/**", "sanity.types.ts"],
  },
];

export default config;
