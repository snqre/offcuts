import * as FileSystem from "fs";
import * as Bun from "bun";
import * as TypeScript from "tsup";
import * as RobusFileSystem from "robus/fs";

export type BuildScript = {
    run(): Promise<void>;
};

export function BuildScript(): BuildScript {
    /** @constructor */ {
        return { run };
    }

    async function run(): ReturnType<BuildScript["run"]> {
        FileSystem.mkdirSync("target/node/web/public", { recursive: true });
        (await RobusFileSystem.copyDirectory("src/web/public", "target/node/web/public"))
            .unwrap()
        await Bun.build({
            entrypoints: ["src/web/app.tsx"],
            format: "esm",
            minify: false,
            outdir: "target/node/web"
        });
        FileSystem.copyFileSync("src/web/app.html", "target/node/web/app.html");
        await TypeScript.build({
            entry: ["src/server/server.ts"],
            format: "cjs",
            outDir: "target/node",
            minify: false,
            tsconfig: "tsconfig",
            platform: "node"
        });
        return;
    }
}

await BuildScript().run();