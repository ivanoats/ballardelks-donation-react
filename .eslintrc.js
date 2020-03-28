module.exports = {
  env: {
    browser: true,
    jasmine: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "plugin:react/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["react", "@typescript-eslint","prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      "jsx": true
    },
    project: './tsconfig.json',
    tsconfigRootDir: './'
  },
  settings: {
    react: {
      pragma: 'react',
      version: 'detect'
    }
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {vars: "all", args: "after-used", ignoreRestSiblings: false}
    ], //problematic for import React when needed but not 'used'
    "react/react-in-jsx-scope": "off" // why do I have to do this?
  }
}