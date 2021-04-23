import { readFileSync } from "fs"
import { terser } from "rollup-plugin-terser"
import commonjs from "@rollup/plugin-commonjs"
import { nodeResolve } from "@rollup/plugin-node-resolve"

const pkg = require("./package.json")

const isProduction = process.env.NODE_ENV === "production"

const banner = readFileSync("banner.js", "utf-8")
  .replace("${name}", pkg.name)
  .replace("${version}", pkg.version)
  .replace("${author}", pkg.author)
  .replace("${homepage}", pkg.homepage)

export default {
  input: pkg.module,
  plugins: [
    isProduction ? terser({}) : {},
    nodeResolve(),
    commonjs({ include: "./node_modules/**" })
  ],
  banner: banner,
  sourceMap: false,
  name: pkg.name,
  output: [
    {
      file: `./dist/${pkg.name}.${isProduction ? "min.js" : "js"}`,
      name: `${pkg.name}`,
      format: "umd"
    }
  ]
}
