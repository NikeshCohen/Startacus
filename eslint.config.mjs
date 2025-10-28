import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          prefix: "@",
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Additional ignores
    "node_modules/**",
    ".git/**",
  ]),
]);

export default eslintConfig;
