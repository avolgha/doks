import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import postcss from "rollup-plugin-postcss";

import presentEnv from "postcss-preset-env";
import nested from "postcss-nested";
import cssnano from "cssnano";

const production = !process.env.ROLLUP_WATCH;

// TODO(avolgha): outsource `util/renderContent.ts` because of
//                being an huge library that doesn't need to be
//                recompiled everytime.

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "iife",
    sourcemap: true,
  },
  plugins: [
    postcss({
      extensions: [".css"],
      plugins: [presentEnv(), nested(), cssnano()],
    }),
    commonjs(),
    resolve(),
    typescript(),
    production && terser(),
  ],
});
