import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
    entries: [
        {
            builder: 'mkdist',
            input: './server/src/core',
            format: 'esm',
            outDir: './dist',
            ext: 'js',
        },
    ],
    declaration: true,
    failOnWarn: false,
});
