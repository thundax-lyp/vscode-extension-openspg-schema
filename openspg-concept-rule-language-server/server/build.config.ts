import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
    entries: [
        {
            builder: "mkdist",
            input: "./src/core",
            format: "esm",
            outDir: "./dist",
            ext: "js",
            declaration: true
        },
        {
            builder: "mkdist",
            input: "./src/core",
            format: "cjs",
            ext: "cjs",
            declaration: false
        }
    ],
    clean: true,
    failOnWarn: false
});
