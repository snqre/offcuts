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
        await _buildPublic();
        await _buildReactApp();
        await _buildServer();
        return;
    }

    async function _buildPublic(): Promise<void> {
        (await RobusFileSystem.copyDirectory("src/web/public", "target/node/web/public"))
            .unwrap();
    }

    async function _buildServer(): Promise<void> {
        await TypeScript.build({
            entry: ["src/server/server.ts"],
            format: "cjs",
            outDir: "target/node",
            minify: true,
            tsconfig: "tsconfig",
            platform: "node"
        });
    }

    async function _buildReactApp(): Promise<void> {
        FileSystem.mkdirSync("target/node/web", { recursive: true });
        FileSystem.copyFileSync("src/web/app.html", "target/node/web/app.html");
        let output = await Bun.build({
            entrypoints: ["src/web/app.tsx"],
            format: "esm",
            minify: true,
            outdir: "target/node/web",
            sourcemap: "inline"
        });
        output.logs.forEach(log => console.log(log));
        return;
    }
}

await BuildScript().run();