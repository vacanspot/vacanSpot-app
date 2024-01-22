module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'react*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@*/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'assets',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react*', '@*/**', 'assets'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    'import/no-duplicates': ['error', {'prefer-inline': true}],
    'react/react-in-jsx-scope': 'off',
  },
};
