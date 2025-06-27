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
      react: 'src/react/index.ts',
    },
    dts: true,
    format: ['esm', 'cjs'],
    outDir: 'dist',
    clean: false,
  },
]);
