import { Router } from "express";
import { Store } from "@server";
import { ProductDataSchema } from "@common";
import { ProductData } from "@common";
import { require } from "reliq";

export function AdminRouter(_store: Store): Router {
    /** @constructor */ {
        return Router()
            .post("/store/set-stock", async (rq, rs) => {
                try {
                    let { password, name, amount } = rq.body;
                    let match: boolean =
                        password !== null
                        && password !== undefined
                        && typeof password === "string"
                        && password.trim().length !== 0
                        && name !== null
                        && name !== undefined
                        && typeof name === "string"
                        && name.trim().length !== 0
                        && amount !== null
                        && amount !== undefined
                        && typeof amount === "number"
                        && amount >= 0
                        && amount <= Number.MAX_SAFE_INTEGER
                        && Number.isSafeInteger(amount);
                    require(match, "ADMIN_ROUTER.ERR_INVALID_INPUT");
                    await _store.setStock(name, amount);
                    rs.send("ADMIN_ROUTER.OK");
                }
                catch (e) {
                    rs.send(e);
                } 
                return;
            })
            .post("/store/increase-stock", async (rq, rs) => {
                try {
                    let { password, name, amount } = rq.body;
                    let match: boolean =
                        password !== null
                        && password !== undefined
                        && typeof password === "string"
                        && password.trim().length !== 0
                        && name !== null
                        && name !== undefined
                        && typeof name === "string"
                        && name.trim().length !== 0
                        && amount !== null
                        && amount !== undefined
                        && typeof amount === "number"
                        && amount >= 0
                        && amount <= Number.MAX_SAFE_INTEGER
                        && Number.isSafeInteger(amount);
                    require(match, "ADMIN_ROUTER.ERR_INVALID_INPUT");
                    await _store.increaseStock(name, amount);
                    rs.send("ADMIN_ROUTER.OK");
                }
                catch (e) {
                    rs.send(e);
                } 
                return;
            })
            .post("/store/decrease-stock", async (rq, rs) => {
                try {
                    let { password, name, amount } = rq.body;
                    let match: boolean =
                        password !== null
                        && password !== undefined
                        && typeof password === "string"
                        && password.trim().length !== 0
                        && name !== null
                        && name !== undefined
                        && typeof name === "string"
                        && name.trim().length !== 0
                        && amount !== null
                        && amount !== undefined
                        && typeof amount === "number"
                        && amount >= 0
                        && amount <= Number.MAX_SAFE_INTEGER
                        && Number.isSafeInteger(amount);
                    require(match, "ADMIN_ROUTER.ERR_INVALID_INPUT");
                    await _store.decreaseStock(name, amount);
                    rs.send("ADMIN_ROUTER.OK");
                }
                catch (e) {
                    rs.send(e);
                } 
                return;
            })
            .post("/store/set-price", async (rq, rs) => {
                try {
                    let { password, name, price } = rq.body;
                    let match: boolean =
                        password !== null
                        && password !== undefined
                        && typeof password === "string"
                        && password.trim().length !== 0
                        && name !== null
                        && name !== undefined
                        && typeof name === "string"
                        && name.trim().length !== 0
                        && price !== null
                        && price !== undefined
                        && typeof price === "number"
                        && price >= 0
                        && price <= Number.MAX_SAFE_INTEGER
                        && Number.isSafeInteger(price);
                    require(match, "ADMIN_ROUTER.ERR_INVALID_INPUT");
                    await _store.setPrice(name, price);
                    rs.send("ADMIN_ROUTER.OK");
                }
                catch (e) {
                    rs.send(e);
                } 
                return;
            })
            .post("/store/increase-price", async (rq, rs) => {
                try {
                    let { password, name, amount } = rq.body;
                    let match: boolean =
                        password !== null
                        && password !== undefined
                        && typeof password === "string"
                        && password.trim().length !== 0
                        && name !== null
                        && name !== undefined
                        && typeof name === "string"
                        && name.trim().length !== 0
                        && amount !== null
                        && amount !== undefined
                        && typeof amount === "number"
                        && amount >= 0
                        && amount <= Number.MAX_SAFE_INTEGER
                        && Number.isSafeInteger(amount);
                    require(match, "ADMIN_ROUTER.ERR_INVALID_INPUT");
                    _checkPassword(password);
                    await _store.increasePrice(name, amount);
                    rs.send("OK");
                    return;
                }
                catch (e) {
                    rs.send(e);
                    return;
                }
            })
            .post("/store/decrease-price", async (rq, rs) => {
                try {
                    let { password, name, amount } = rq.body;
                    let match: boolean =
                        password !== null
                        && password !== undefined
                        && typeof password === "string"
                        && password.trim().length !== 0
                        && name !== null
                        && name !== undefined
                        && typeof name === "string"
                        && name.trim().length !== 0
                        && amount !== null
                        && amount !== undefined
                        && typeof amount === "number"
                        && amount >= 0
                        && amount <= Number.MAX_SAFE_INTEGER
                        && Number.isSafeInteger(amount);
                    require(match, "ADMIN_ROUTER.ERR_INVALID_INPUT");
                    _checkPassword(password);
                    await _store.decreasePrice(name, amount);
                    rs.send("OK");
                    return;
                }
                catch (e) {
                    rs.send(e);
                    return;
                }
            })
            .post("/store/list-product", async (rq, rs) => {
                try {
                    let { password, product } = rq.body;
                    let match: boolean =
                        password !== null
                        && password !== undefined
                        && typeof password === "string"
                        && ProductDataSchema.safeParse(product).success;
                    require(match, "ADMIN_ROUTER.ERR_INVALID_REQUEST");
                    _checkPassword(password);
                    await _store.listProduct((product as ProductData));
                    rs.send({ message: "OK" });
                    return;
                }
                catch (e) {
                    console.error(e);
                    rs.send(e);
                    return;
                }
            })
            .post("/store/de-list-product", async (rq, rs) => {
                try {
                    let { password, name } = rq.body;
                    let match: boolean =
                        password !== null
                        && password !== undefined
                        && typeof password === "string"
                        && name !== null
                        && name !== undefined
                        && typeof name === "string";
                    require(match, "ADMIN_ROUTER.ERR_INVALID_REQUEST");
                    _checkPassword(password);
                    await _store.deListProduct(name);
                    rs.send("ADMIN_ROUTER.OK");
                    return;
                }
                catch (e) {
                    rs.send(e);
                    return;
                }
            })
            .post("/store/de-list-product-by-product", async (rq, rs) => {
                try {
                    let { password, product } = rq.body;
                    let match: boolean =
                        password !== null
                        && password !== undefined
                        && typeof password === "string"
                        && ProductDataSchema.safeParse(product).success;
                    require(match, "ADMIN_ROUTER.ERR_INVALID_REQUEST");
                    _checkPassword(password);
                    await _store.deListProductByProduct((product as ProductData));
                    rs.send("ADMIN_ROUTER.OK");
                    return;
                }
                catch (e) {
                    rs.send(e);
                    return;
                }
            });
    }

    function _checkPassword(password: string): void {
        let adminPassword: string | undefined = process.env?.["ADMIN_PASSWORD"];
        require(adminPassword !== undefined, "ADMIN_ROUTER.ERR_ADMIN_PASSWORD_REQUIRED");
        require(adminPassword.trim().length !== 0, "ADMIN_ROUTER.ERR_INVALID_ADMIN_PASSWORD");
        require(adminPassword === password, "ADMIN_ROUTER.ERR_INCORRECT_PASSWORD");
        return;
    } 
}