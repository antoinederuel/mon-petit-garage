// @ts-check
import nextVitals from "eslint-config-next/core-web-vitals";
import { defineConfig, globalIgnores } from "eslint/config";
import rootConfig from "../../eslint.config.js";

export default defineConfig([
  ...nextVitals,
  ...rootConfig,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
