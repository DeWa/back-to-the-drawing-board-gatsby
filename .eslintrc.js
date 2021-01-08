module.exports = {
  root: true,
  plugins: ['eslint-plugin', '@typescript-eslint', 'import', 'eslint-comments'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    project: './tsconfig.json',
  },
  rules: {
    'react/display-name': 'off',
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
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
