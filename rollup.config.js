import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/Drilldown.ts',
  plugins: [
    typescript(),
    terser()
  ],
  output: [
    {
      file: 'dist/drilldown.es.min.js',
      format: 'es',
      compact: true
    },
    {
      file: 'dist/drilldown.min.js',
      format: 'iife',
      compact: true,
      name: 'Drilldown'
    }
  ]
}