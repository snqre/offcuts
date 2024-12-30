import type { StoreE } from "@server-class";
import { Router } from "express";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Store } from "@server-class";

export type AdminRouterApiT = 
    | "ADMIN_ROUTER.OK_INCREASE_STOCK"
    | "ADMIN_ROUTER.OK_DECREASE_STOCK"
    | "ADMIN_ROUTER.OK_LIST_PRODUCT"
    | "ADMIN_ROUTER.OK_DE_LIST_PRODUCT"
    | "ADMIN_ROUTER.OK_DE_LIST_PRODUCT_BY_NAME"
    | "ADMIN_ROUTER.OK_SET_PRODUCT_PRICE";
export type AdminRouterApiE =
    | StoreE
    | "ADMIN_ROUTER.ERR_INVALID_RESPONSE";
export type AdminRouterR = Result<AdminRouterT, AdminRouterE>;
export type AdminRouterT = Router;
export type AdminRouterE =
    | AdminRouterApiE
    | [unknown];
export function AdminRouter(_store: Store): AdminRouterR {
    /** @constructor */ {
        let routerR = Result.wrap(() =>
            Router()
                .post("/product/increase-stock", async (rq, rs) => {
                    let { password, name, amount } = rq.body;
                    let match =
                        typeof password !== null
                        && typeof password !== undefined
                        && typeof password === "string"
                        && typeof name !== null
                        && typeof name !== undefined
                        && typeof name === "string"
                        && typeof amount !== null
                        && typeof amount !== undefined
                        && typeof amount === "number"
                        && amount >= 0
                        && amount <= Number.MAX_SAFE_INTEGER
                        && Number.isSafeInteger(amount);
                    if (match === false) {
                        let e: AdminRouterApiE = "ADMIN_ROUTER.ERR_INVALID_RESPONSE";
                        rs.send(e);
                        return;
                    }
                    let increaseStockR = await _store.increaseStock(name, BigInt(amount));
                    if (increaseStockR.err()) {
                        rs.send(increaseStockR.val());
                        return;
                    }
                    let ok: AdminRouterApiT = "ADMIN_ROUTER.OK_INCREASE_STOCK";
                    rs.status(200).send(ok);
                    return;
                })
                .post("/product/decrease-stock", async (rq, rs) => {
                    
                }));
        if (routerR.err()) return Err([routerR.val()]);
        return routerR;
    }
}