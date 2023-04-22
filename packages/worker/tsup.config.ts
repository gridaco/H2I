import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  splitting: false,
  sourcemap: false,
  minify: true,
  dts: true,
  clean: true,
});
