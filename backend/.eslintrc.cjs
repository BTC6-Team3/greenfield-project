module.exports = {
  root: true,
  env: { browser: false, es2020: true },
  extends: ["eslint:recommended", "prettier"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "commonjs" },
  settings: {},
  plugins: [],
  rules: {},
};
