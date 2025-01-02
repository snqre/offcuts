import { Result } from "reliq";
import { Err } from "reliq";
import { Router } from "express";
import { Unsafe } from "@common";
import { wrapR } from "reliq";

export type ReactRouterError = Unsafe | "REACT_ROUTER.ERR_INVALID_ROUTE";

export function ReactRouter(route: string, htmlFilePath: string): Result<Router, ReactRouterError> {
    /** @constructor */ {
        if (route.startsWith("/") === false) return Err("REACT_ROUTER.ERR_INVALID_ROUTE");
        return wrapR(() => Router().get(route, (__, rs) => rs.sendFile(htmlFilePath))).mapErr(e => Unsafe(e));
    }
}