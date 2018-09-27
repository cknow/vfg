import vue from 'rollup-plugin-vue';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';
import { camelCase, merge } from 'lodash';

import pkg from './package.json';

const name = pkg.name.replace(/^.+\//u, '');

const bundle = (file, format, plugins = []) => {
    const base = {
        input: 'src/index.js',
        output: {
            name: camelCase(name)
        },
        plugins: [
            vue(),
            buble({
                objectAssign: 'Object.assign',
                transforms: {
                    dangerousForOf: true
                }
            }),
            nodeResolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            commonjs()
        ]
    };

    return merge({}, base, {
        output: {
            file: `dist/${file}.js`,
            format
        },
        plugins: [...base.plugins, ...plugins]
    });
};

export default [
    bundle(`${name}.common`, 'cjs'),
    bundle(`${name}.esm`, 'es'),
    bundle(`${name}`, 'umd'),
    bundle(`${name}.min`, 'umd', [uglify()])
];
