import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: {
      index: 'src/index.ts',
    },
    dts: true,
    format: ['esm', 'cjs'],
    outDir: 'dist',
    clean: true,
  },
  {
    entry: {
      webview: 'src/webview/index.ts',
      native: 'src/native/index.ts',
    },
    dts: true,
    format: ['esm', 'cjs'],
    outDir: 'dist',
    clean: false,
  },
]);
