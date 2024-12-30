import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import * as FileSystem from "robus/fs";
import * as Bun from "bun";
import * as TypeScript from "tsup";

export type BuildScriptT = BuildScript;
export type BuildScriptE =
    | FileSystem.MountDirectoryActionE
    | FileSystem.CopyFileActionE
    | FileSystem.CopyDirectoryActionE
    | FileSystem.RemoveFileActionE
    | [unknown];
export type BuildScript = {
    run(): Promise<Result<void, BuildScriptE>>;
};
export function BuildScript(): BuildScript {
    /** @constructor */ {
        return {
            run
        };
    }

    async function run(): ReturnType<BuildScript["run"]> {
        let mountDirectoryR = await FileSystem.mountDirectory(FileSystem.MountDirectoryActionConfig({ at: "target/node/web/public", recursive: true }));
        if (mountDirectoryR.err) return Err([mountDirectoryR.val]);
        let buildReactAppR = await Result.wrapAsync(async () => await Bun.build({
            entrypoints: ["src/web/App.tsx"],
            format: "esm",
            minify: false,
            outdir: "target/node/web",
            plugins: [
                
            ]
        }));
        if (buildReactAppR.err()) return Err([buildReactAppR.val()]);
        let copyFileR = await FileSystem.copyFile(FileSystem.CopyFileActionConfig({
            from: "src/web/App.html",
            to: "target/node/web/App.html",
            encoding: "utf8",
            overwrite: true
        }));
        if (copyFileR.err) return Err([copyFileR.val]);
        let copyDirectoryR = await FileSystem.copyDirectory("src/web/public", "target/node/web/public");
        if (copyDirectoryR.err) return Err([copyDirectoryR.val]);
        let buildR = await Result.wrapAsync(async () => await TypeScript.build({
            entry: ["src/server/Server.ts"],
            format: "esm",
            outDir: "target/node",
            minify: false,
            tsconfig: "tsconfig.json",
            platform: "node"
        }));
        if (buildR.err()) return Err([buildR.val()]);
        return Ok(undefined);
    }
}

let script = BuildScript();
let runR = await script.run();
runR.unwrap();