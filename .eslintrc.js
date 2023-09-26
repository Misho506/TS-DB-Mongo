module.exports = {
  env: {
    node: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  overrides: [
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
    es2022: true,
  },
  rules: {
    indent: ['error', 2],
    '@typescript-eslint/indent': 'off',
    'linebreak-style': [
      'error',
      'unix',
    ],
    quotes: ['error', 'single'],
    'max-len': ['error', 125],
  },
  'lines-between-class-members': [
    'error',
    'always',
    { 'exceptAfterSingleLine': true },
  ]
};
