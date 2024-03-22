module.exports = {
  extends: ['@solana/eslint-config-solana'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/sort-type-constituents': 'off',
    'prefer-destructuring': 'off',
    'simple-import-sort/imports': 'off',
    'sort-keys-fix/sort-keys-fix': 'off',
    'typescript-sort-keys/interface': 'off',
  },
};
