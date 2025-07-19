import { FlatCompat } from "@eslint/eslintrc";
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
