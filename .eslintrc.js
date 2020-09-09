module.exports = {
  extends: ['plugin:md/recommended'],
  overrides: [
    {
      files: ['*.md'],
      parser: 'markdown-eslint-parser',
    },
  ],
}