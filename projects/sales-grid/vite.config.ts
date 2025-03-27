import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[hash].js',
        chunkFileNames: '[hash].js',
        assetFileNames: '[hash][extname]',
      },
      onwarn: (warning, warn) => {
        if (warning.code === 'THIS_IS_UNDEFINED') return;
        warn(warning);
      },
    },
    target: 'es2021',
    minify: 'terser',
    emptyOutDir: false,
    chunkSizeWarningLimit: 10 * 1024 * 1024 // 10 MB
  },
  plugins: [
  ],
});
