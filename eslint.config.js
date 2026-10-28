import {
  commencisTypescriptConfig,
  defineConfig,
} from '@commencis/eslint-config';

export default defineConfig(
  ...commencisTypescriptConfig,
  {
    files: ['lib/cli/**/*.js', 'tests/**/*.js'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  }
);
