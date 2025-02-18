module.exports = {
  extends: ['@solana/eslint-config-solana'],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/sort-type-constituents': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'prefer-destructuring': 'off',
    'simple-import-sort/imports': 'off',
    'sort-keys-fix/sort-keys-fix': 'off',
    'typescript-sort-keys/interface': 'off',
  },
};
