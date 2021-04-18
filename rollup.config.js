import autoprefixer from 'autoprefixer';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

export default {
    external: ['react', 'react-dom', 'page-flip'],
    input: 'src/index.ts',
    watch: {
        include: 'src/**',
    },
    output: [
        {
            // file: '../../..//index.js',
            file: 'build/index.js',
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        typescript({ useTsconfigDeclarationDir: true }),
        postcss({
            plugins: [autoprefixer()],
            minimize: true,
        }),
        terser(),
    ],
};
