import { defineConfig } from 'vite';
///  <reference types="vitest" />

export default defineConfig({
  test: {
    setupFiles: [`./test-setup/basic-setup.ts`],
  },
});
