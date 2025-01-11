import vue from "eslint-plugin-vue";
import parser from "vue-eslint-parser";

export default [
  {
    files: ["**/*.vue"], // Match Vue files
    languageOptions: {
      parser, // Use vue-eslint-parser
      parserOptions: {
        ecmaVersion: "latest", // Use the latest ECMAScript features
        sourceType: "module", // Support ES modules
        vueFeatures: {
          filter: true, // Enable Vue filters
          interpolationAsNonHTML: true, // Treat interpolation as non-HTML
        },
      },
    },
    plugins: {
      vue,
    },
    rules: {
      "vue/no-unused-vars": "warn", // Warn for unused Vue variables
      "no-console": "off", // Allow console.log
    },
  },
];
