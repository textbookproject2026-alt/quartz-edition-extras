import { defineConfig } from "vitest/config";
import { build } from "esbuild";
import { readFile } from "node:fs/promises";
import { dirname } from "node:path";

export default defineConfig({
  // .inline.ts files are browser scripts that tsup.config.ts bundles to a
  // string; tests import them the same way.
  plugins: [
    {
      name: "inline-script-as-string",
      enforce: "pre",
      async load(id) {
        if (!id.endsWith(".inline.ts")) return null;
        const text = (await readFile(id, "utf8"))
          .replace(/^export default /gm, "")
          .replace(/^export /gm, "");
        const out = await build({
          // resolveDir: the page script imports ./editor and ./source.
          stdin: { contents: text, loader: "ts", resolveDir: dirname(id) },
          write: false,
          bundle: true,
          minify: true,
          platform: "browser",
          format: "esm",
          target: "es2020",
        });
        return `export default ${JSON.stringify(out.outputFiles[0]!.text)}`;
      },
    },
  ],
  test: {
    environment: "node",
    include: ["test/**/*.test.ts"],
    reporters: ["default"],
  },
});
