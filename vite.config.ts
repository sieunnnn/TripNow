import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [vue({
        template: {
            compilerOptions: {
                isCustomElement: tag => tag.startsWith('gmp-') || tag.startsWith('gmpx-')
            }
        }
    })],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    define: {
        'process.env': process.env,
        global: 'globalThis',
    },
});
