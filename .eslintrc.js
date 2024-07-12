const path = require('node:path');

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:unicorn/recommended', 'airbnb', 'plugin:storybook/recommended'],
  ignorePatterns: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-perf',
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname)],
      },
      alias: {
        map: [
          ['src', path.resolve(__dirname, 'src')],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'linebreak-style': 0,
    'max-len': ['error', {
      code: 120,
      ignoreComments: true,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],
    'no-unused-vars': ['error', { varsIgnorePattern: '_' }],
    'react/jsx-props-no-spreading': 'off',
    'no-nested-ternary': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/control-has-associated-label': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'unicorn/filename-case': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/no-array-for-each': 'off',
    'unicorn/no-null': 'off',
    'import/prefer-default-export': 'off',
    'no-case-declarations': 'off',
    'no-param-reassign': 'off',
    'react/no-array-index-key': 'off',
    'unicorn/prefer-module': 'off',
    'unicorn/no-negated-condition': 'off',
    'no-use-before-define': ['error', 'nofunc'],
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'import/no-extraneous-dependencies': [0, { devDependencies: true }],
    'react/prop-types': 'off',
    'no-mixed-operators': 'off',
    'unicorn/no-array-reduce': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'eol-last': 0,
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'react/button-has-type': 0,
  },
};
