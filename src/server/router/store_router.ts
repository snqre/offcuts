import { Router } from "express";
import { Store } from "@server";
import { require } from "reliq";

export function StoreRouter(_store: Store): Router {
    return Router()
        .get("/products", async (__, rs) => {
            try {
                rs.send((await _store.products()));
                return;
            }
            catch (e) {
                rs.send(e);
                return;
            }
        })
        .get("/products-by-name", async (rq, rs) => {
            try {
                let { name } = rq.body;
                let match: boolean =
                    name !== null
                    && name !== undefined
                    && typeof name === "string"
                    && name.trim().length !== 0;
                require(match, "STORE_ROUTER.ERR_INVALID_REQUEST");
                rs.send((await _store.productsByName(name)));
                return;
            }
            catch (e) {
                rs.send(e);
                return;
            }
        });
}