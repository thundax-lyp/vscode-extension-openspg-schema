import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            include: ['test/**/*.ts'],
            exclude: ['.idea', '.git', 'node_modules', 'dist', 'docs', 'grammar', 'scripts', 'src/antlr4'],
        },
    },
});
