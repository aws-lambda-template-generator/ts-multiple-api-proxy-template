module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['eslint-config-mdh-typescript-backend'],
  parserOptions: {
    project: './tsconfig-lint.json',
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [{ files: ['**/*.ts'] }],
  rules: {},
};
