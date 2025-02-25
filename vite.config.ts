import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['**/*.{test,spec}.{ts,tsx}'],
    // exclude: [...configDefaults.exclude, "tests/**"],
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});
