import { Router } from "express";
import { Err } from "reliq";
import { Result } from "reliq";
import { join } from "path";

export type ReactRouterR = Result<ReactRouterT, ReactRouterE>;
export type ReactRouterT = Router;
export type ReactRouterE = [unknown];
export function ReactRouter(): ReactRouterR {
    /** @constructor */ {
        let routerR = Result.wrap(() => Router().get("/", (__, rs) => rs.sendFile(join(__dirname, "web/App.html"))));
        if (routerR.err()) return Err([routerR.val()]);
        return routerR;
    }
}