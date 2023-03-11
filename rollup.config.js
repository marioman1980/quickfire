import path from "path";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
// import copy from '@jonathanmoore/rollup-plugin-copy';
import multiInput from "rollup-plugin-multi-input";
import globImport from "rollup-plugin-glob-import";

export default {
  // Import multiples
  input: [
    "src/scripts/*.js",
    // "src/scripts/vendor/*.js",
    // "src/scripts/sections/*.js",
    // "src/scripts/utils/*.js",
    // "src/scripts/components/*.js",
  ],
  output: {
    format: "esm",
    dir: "./",
  },
  plugins: [
    globImport(),
    // multiInput(),
    multiInput({
      relative: "src/",
      transformOutputPath: (output, input) =>
        `assets/${path.basename(output, "js")}bundle${path.extname(output)}`,
    }),
    // copy({
    //   watch: process.env.NODE_ENV === 'development' ? [
    //     'src/assets/',
    //     'src/config/',
    //     'src/layout/',
    //     'src/locales',
    //     'src/sections/',
    //     'src/snippets/',
    //     'src/templates/',
    //   ] : null,
    //   targets: [
    //     {src: 'src/assets/**/*', dest: 'assets'},
    //     {src: 'src/config/*.json', dest: 'config'},
    //     {src: 'src/layout/*.liquid', dest: 'layout'},
    //     {src: 'src/locales/*.json', dest: 'locales'},
    //     {src: 'src/sections/*.liquid', dest: 'sections'},
    //     {src: 'src/snippets/*.liquid', dest: 'snippets'},
    //     {src: 'src/templates/**/*', dest: 'templates'},
    //   ],
    //   verbose: true,
    //   copyOnce: true,
    // }),
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      babelHelpers: "bundled",
    }),
  ],
};
