module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
      ],
      settings: {
        react: {
          version: 'detect',
        },
        'import/resolver': {
          node: {
            paths: ['src'],
          },
        },
      },
      env: {
        browser: true,
      },
      rules: {},
    },
  ],
};
