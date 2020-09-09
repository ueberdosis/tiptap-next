module.exports = {
  extends: ['plugin:prettier/recommended', 'plugin:md/recommended'],
  env: {
    es6: true
  },
  rules: {
    'md/remark': [
      'error',
      {
        // This object corresponds to object you would export in .remarkrc file
        plugins: [
          ['remark-lint-maximum-line-length', false]
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
      rules: {
        'prettier/prettier': [
          'error',
          // Important to force prettier to use "markdown" parser - otherwise it wouldn't be able to parse *.md files.
          // You also can configure other options supported by prettier here - "prose-wrap" is
          // particularly useful for *.md files
          {
            parser: 'markdown',
          },
        ],
      },
    },
    {
      files: ['*.md.js'],  // Will match js code inside *.md files
      parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: true,
      },
      rules: {
        'prettier/prettier': [
          'error',
          {
            singleQuote: true,
            semi: false,
          },
        ],
      },
    },
  ],
}