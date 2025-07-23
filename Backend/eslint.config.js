import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules', 'generated'] },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      // Formatting and whitespace rules
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'eol-last': ['error', 'always'],
      indent: ['error', 2],
      semi: ['error', 'always'],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'no-irregular-whitespace': 'error',
      // Node.js specific rules
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
];
