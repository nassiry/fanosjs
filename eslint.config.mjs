import globals from 'globals'
import pluginJs from '@eslint/js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["src/**/*.{js,ts}"],
    ignores: ["**/*.config.js", "!**/eslint.config.js", "dist/", "examples/"],
    rules: {
      eqeqeq: ["error", "always"],
      "no-unused-vars": ["error", { "args": "none" }],
      "prefer-const": "error",
      "no-var": "error",
      "arrow-body-style": ["error", "as-needed"],
      "no-console": ["warn", { "allow": ["debug", "log", "error"] }],
      "consistent-return": "error",
      "no-implicit-globals": "error",
      "prefer-template": "error",
    },
    languageOptions: {
      sourceType: 'module',
      globals: globals.browser,
    }
  },
  pluginJs.configs.recommended,
]
