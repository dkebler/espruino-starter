// rollup.config.js
import json from '@rollup/plugin-json'
import {terser} from 'rollup-plugin-terser'
import bubleP from '@rollup/plugin-buble'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babelP from '@rollup/plugin-babel'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import yaml from '@rollup/plugin-yaml'

const buble = bubleP({
  objectAssign: 'Object.assign',
  transforms:{
    // modules: false // default is false since this is rollup plugin
    arrow: false,
    classes: false,
    computedProperty: true,
    conciseMethodProperty: true,
    dangerousForOf: true,
    dangerousTaggedTemplateString: false,
    defaultParameter: true,
    destructuring: true,
    forOf: true,
    generator: false,
    letConst: true,
    numericLiteral: true,
    parameterDestructuring: true,
    reservedProperties: false,
    spreadRest: true,
    stickyRegExp: true,
    templateString: false,
    unicodeRegExp: true
  }
})

const babel = babelP({
  babelrc: false,
  babelHelpers: 'bundled',
  plugins: [
    'babel-plugin-transform-async-to-promises',
  ]
})

export default {
  input: './main.js',
  plugins: [
    resolve(),
    commonjs(),
    babel,
    yaml(),
    json(),
    injectProcessEnv({
      PRODUCTION: !!process.env.PRODUCTION || !!process.env.PRO || false
    }),
    buble,
  ],
  output: [
    {
      file: './build/espruino.dev.js',
      format: 'cjs',
      interop: false
      // external: [ 'Wifi' ] // <-- suppresses the warning
    },
    {
      file: './build/espruino.js',
      format: 'cjs',
      interop: false,
      // external: [ 'Wifi' ], // <-- suppresses the warning
      plugins: [terser()]
    },
    {
      file: './build/esm.js',
      format: 'es',
      interop: false,
      // external: [ 'Wifi' ] // <-- suppresses the warning
    },
  ],
}
