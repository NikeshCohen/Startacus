import eslintReact from "@eslint-react/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";
import eslintJs from "@eslint/js";
import noRelativeImportPaths from "eslint-plugin-no-relative-import-paths";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", ".git/**"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: ["**/*.ts", "**/*.tsx"],
    // Extend recommended rule sets from:
    // 1. ESLint JS's recommended rules
    // 2. TypeScript ESLint recommended rules
    // 3. ESLint React's recommended-typescript rules
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        // Enable project service for better TypeScript integration
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "no-relative-import-paths": noRelativeImportPaths,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@eslint-react/no-missing-key": "warn",
      "@typescript-eslint/no-explicit-any": "error",
      "@eslint-react/jsx-key-before-spread": "error",
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "warn",
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          prefix: "@",
        },
      ],
    },
  },
];

export default eslintConfig;
