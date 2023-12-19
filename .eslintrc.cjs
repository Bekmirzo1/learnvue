module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    // 'prettier'
    "plugin:prettier/recommended",
    // '@vue/eslint-config-prettier'
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["src/**/*.test.ts", "src/frontend/generated/*"],
  rules: {
    // "prefer-const": "error",
    "prettier/prettier": [
      "warn",
      {
        endOfLine: "auto",
      },
    ],
    "no-restricted-imports": [
      "error",
      { patterns: ["@/hooks/*", "!@/hooks/mouse.js"] },
    ],
    // 'vue/max-attributes-per-line': [
    //   'error',
    //   {
    //     singleline: 3,
    //     multiline: 1,
    //   },
    // ],
    "vue/first-attribute-linebreak": [
      "error",
      {
        singleline: "ignore",
        multiline: "below",
      },
    ],
    "vue/v-on-event-hyphenation": [
      "error",
      "always",
      {
        autofix: true,
      },
    ],
    // 'vue/attributes-order': [
    //   'error',
    //   {
    //     order: [
    //       'CONDITIONALS',
    //       'DEFINITION',
    //       'LIST_RENDERING',
    //       'RENDER_MODIFIERS',
    //       'TWO_WAY_BINDING',
    //       'GLOBAL',
    //       ['UNIQUE', 'SLOT'],
    //       'OTHER_DIRECTIVES',
    //       ['ATTR_STATIC', 'ATTR_DYNAMIC', 'ATTR_SHORTHAND_BOOL'],
    //       'EVENTS',
    //       'CONTENT',
    //     ],
    //     alphabetical: false,
    //   },
    // ],
    "vue/html-quotes": ["error", "double", { avoidEscape: false }],
    "vue/order-in-components": [
      "error",
      {
        order: [
          ["template", "render"],
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "ROUTER_GUARDS",
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          "emits",
          ["props", "propsData"],
          "setup",
          "asyncData",
          "data",
          "fetch",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "LIFECYCLE_HOOKS",
          "methods",
          "renderError",
        ],
      },
    ],
    "vue/block-tag-newline": [
      "error",
      {
        singleline: "ignore",
        multiline: "always",
        maxEmptyLines: 1,
      },
    ],
    "vue/html-button-has-type": [
      "error",
      {
        button: true,
        submit: true,
        reset: true,
      },
    ],
    "prefer-rest-params": 1,
  },
}

// module.exports = {
//     env: {
//       browser: true,
//       es2021: true,
//     },
//     extends: [
//       // 'airbnb-base',
//       'eslint:recomended',
//       'plugin:vue/vue3-essential',
//       "plugin:prettier/recomended"
//     ],
//     overrides: [
//       {
//         env: {
//           node: true,
//         },
//         files: [
//           '.eslintrc.{js,cjs}',
//         ],
//         parserOptions: {
//           sourceType: 'script',
//         },
//       },
//       {
//         files: ["src/**/*.js"],
//         // ignores: ["**/*.config.js"],
//         rules: {
//           semi: "error"
//         }
//       }
//     ],
//     parserOptions: {
//       ecmaVersion: 'latest',
//       sourceType: 'module',
//     },
//     plugins: [
//       'vue',
//     ],
//     rules: {
//       "prettier/prettier": [
//         "warn",
//         {
//           endOfLine: 'auto',
//           tabWidth: 4,
//         }
//       ]
//     },
//   };
