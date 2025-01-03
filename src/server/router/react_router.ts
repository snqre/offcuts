import { Router } from "express";
import { require } from "reliq";

export function ReactRouter(route: string, htmlFilePath: string): Router {
    /** @constructor */ {
        require(route.trim().length !== 0, "REACT_ROUTER.ERR_INVALID_ROUTE");
        require(route.startsWith("/"), "REACT_ROUTER.ERR_INVALID_ROUTE");
        return Router().get(route, (__, rs) => rs.sendFile(htmlFilePath));
    }
}