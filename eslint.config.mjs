// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import cypress from "eslint-plugin-cypress";

export default [
  js.configs.recommended,

  {
    files: ["cypress/**/*.ts", "cypress/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        ...globals.node,     // for Node.js stuff
        ...globals.mocha,    // adds describe, it, before, after
        ...globals.browser,  // adds window, document, etc.
        cy: true,            // explicitly add Cypress "cy"
        Cypress: true,       // explicitly add Cypress "Cypress"
      },
    },
    plugins: {
      cypress,
    },
    rules: {
      "cypress/no-assigning-return-values": "error",
      "cypress/no-unnecessary-waiting": "warn",
      "cypress/no-force": "warn",
      "cypress/no-async-tests": "error",
    },
  },
];
