import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
// Patch eslint-plugin-react configs for flat config compatibility
// (Convert legacy 'plugins' array to object and move parserOptions to languageOptions)
const patchReactConfig = (config) => {
  config.plugins = { react };
  config.languageOptions = {
    ...config.languageOptions,
    parserOptions: config.parserOptions,
  };
  delete config.parserOptions;
  return config;
};

const patchedRecommended = patchReactConfig({ ...react.configs.recommended });
const patchedJsxRuntime = patchReactConfig({ ...react.configs["jsx-runtime"] });

export default [
  // Ignore built files

  {
    ...react.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  react.configs.flat["jsx-runtime"],
  {
    ignores: [
      "build/**",
      "dist/**",
      "node_modules/**",
      "**/*.cjs",
      "**/*.mjs",
      ".yarn/**",
    ],
  },
  // Base JavaScript recommended rules
  js.configs.recommended,
  // TypeScript recommended rules (includes parser setup)
  ...tseslint.configs.recommended,
  // Patched React recommended config
  patchedRecommended,
  // Patched React JSX runtime config
  patchedJsxRuntime,
  // Project-specific config
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "@stylistic/semi": ["error", "always"],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // React rules
      ...react.configs.recommended.rules,
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
  // Prettier config to disable conflicting ESLint rules
  prettierConfig,
];
