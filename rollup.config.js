import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

const banner = `/**
 * Copyright 2025 A.S Nassiry
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @see https://github.com/nassiry/fanosjs
 */`;

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/fanos.umd.js',
            format: 'umd',
            name: 'Fanos',
            sourcemap: true,
            banner
        },
        {
            file: 'dist/fanos.umd.min.js',
            format: 'umd',
            name: 'Fanos',
            sourcemap: true,
            plugins: [terser()],
            banner
        },
        {
            file: 'dist/fanos.esm.js',
            format: 'esm',
            sourcemap: true,
            banner
        }
    ],
    plugins: [
        resolve(),
        commonjs()
    ],
};
