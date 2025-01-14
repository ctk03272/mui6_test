import { defineConfig } from 'vite'

export default defineConfig({
    resolve: {
        alias: {
            '@': '/src',
        },
    },
    define: {
        'process.env': {},
    },
    build: {
        lib: {
            entry: 'src/main.tsx',
            name: 'HollowApp',
            fileName: 'hollow-app',
            formats: ['iife'],
        },
        rollupOptions: {
            output: {
                format: 'iife',
            },
        },
    },
})
