import { Router } from "express";
import { Store } from "@server";
import { ProductDataSchema } from "@common";
import { require } from "reliq";

export function StoreRouter(_store: Store): Router {
    /** @constructor */ {
        return Router()
        .get("/store/products", async (__, rs) => {
            try {
                rs.send({ products: await _store.products() });
                return;
            }
            catch (e) {
                console.error(e);
                rs.send({ e });
                return;
            }
        })
        .get("/store/products-by-name", async (rq, rs) => {
            try {
                let { name } = rq.body;
                if (!(
                    name !== null
                    && name !== undefined
                    && typeof name === "string"
                )) {
                    rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
                    return;
                }
                rs.send({ products: await _store.products(name) });
                return;
            }
            catch (e) {
                console.error(e);
                rs.send({ e });
                return;
            }
        })
        .post("/store/set-stock", async (rq, rs) => {
            try {
                let { password, name, amount } = rq.body;
                if (!(
                    password !== null
                    && password !== undefined
                    && typeof password === "string"
                    && _hasPermission(password)
                    && name !== null
                    && name !== undefined
                    && typeof name === "string"
                    && amount !== null
                    && amount !== undefined
                    && typeof amount === "number"
                    && amount >= 0
                    && amount <= Number.MAX_SAFE_INTEGER
                    && Number.isSafeInteger(amount)
                )) {
                    rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST "});
                    return;
                }
                await _store.setStock(name, BigInt(amount));
                rs.send({ message: "OK" });
                return;
            }
            catch (e) {
                console.error(e);
                rs.send({ e });
                return;
            }
        })
        .post("/store/increase-stock", async (rq, rs) => {
            try {
                let { password, name, amount } = rq.body;
                if (!(
                    password !== null
                    && password !== undefined
                    && typeof password === "string"
                    && _hasPermission(password)
                    && name !== null
                    && name !== undefined
                    && typeof name === "string"
                    && amount !== null
                    && amount !== undefined
                    && typeof amount === "number"
                    && amount >= 0
                    && amount <= Number.MAX_SAFE_INTEGER
                    && Number.isSafeInteger(amount)
                )) {
                    rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
                    return;
                }
                await _store.increaseStock(name, BigInt(amount));
                rs.send({ message: "OK" });
                return;
            }
            catch (e) {
                console.error(e);
                rs.send({ e });
                return;
            }
        })
        .post("/store/decrease-stock", async (rq, rs) => {
            try {
                let { password, name, amount } = rq.body;
                if (!(
                    password !== null
                    && password !== undefined
                    && typeof password === "string"
                    && _hasPermission(password)
                    && name !== null
                    && name !== undefined
                    && typeof name === "string"
                    && amount !== null
                    && amount !== undefined
                    && typeof amount === "number"
                    && amount >= 0
                    && amount <= Number.MAX_SAFE_INTEGER
                    && Number.isSafeInteger(amount)
                )) {
                    rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
                    return;
                }
                await _store.decreaseStock(name, BigInt(amount));
                rs.send({ message: "OK" });
                return;
            }
            catch (e) {
                console.error(e);
                rs.send({ e });
                return;
            }
        })
        .post("/store/set-price", async (rq, rs) => {
            try {
                let { password, name, amount } = rq.body;
                if (!(
                    password !== null
                    && password !== undefined
                    && typeof password === "string"
                    && _hasPermission(password)
                    && name !== null
                    && name !== undefined
                    && typeof name === "string"
                    && amount !== null
                    && amount !== undefined
                    && typeof amount === "number"
                    && amount >= 0
                    && amount <= Number.MAX_SAFE_INTEGER
                    && Number.isSafeInteger(amount)
                )) {
                    rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
                    return;
                }
                await _store.setPrice(name, amount);
                rs.send({ message: "OK" });
                return;
            }
            catch (e) {
                console.error(e);
                rs.send({ e });
                return;
            }
        })
        .post("/store/increase-price", async (rq, rs) => {
            try {
                let { password, name, amount } = rq.body;
                if (!(
                    password !== null
                    && password !== undefined
                    && typeof password === "string"
                    && _hasPermission(password)
                    && name !== null
                    && name !== undefined
                    && typeof name === "string"
                    && amount !== null
                    && amount !== undefined
                    && typeof amount === "number"
                    && amount >= 0
                    && amount <= Number.MAX_SAFE_INTEGER
                    && Number.isSafeInteger(amount)
                )) {
                    rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
                    return;
                }
                await _store.increasePrice(name, amount);
                rs.send({ message: "OK" });
                return;
            }
            catch (e) {
                console.error(e);
                rs.send({ e });
                return;
            }
        })
        .post("/store/decrease-price", async (rq, rs) => {
            try {
                let { password, name, amount } = rq.body;
                if (!(
                    password !== null
                    && password !== undefined
                    && typeof password === "string"
                    && _hasPermission(password)
                    && name !== null
                    && name !== undefined
                    && typeof name === "string"
                    && amount !== null
                    && amount !== undefined
                    && typeof amount === "number"
                    && amount >= 0
                    && amount <= Number.MAX_SAFE_INTEGER
                    && Number.isSafeInteger(amount)
                )) {
                    rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
                    return;
                }
                await _store.decreasePrice(name, amount);
                rs.send({ message: "OK" });
                return;
            }
            catch (e) {
                console.error(e);
                rs.send({ e });
                return;
            }
        })
        .post("/store/list-product", async (rq, rs) => {
            try {
                let { password, product } = rq.body;
                if (!(
                    password !== null
                    && password !== undefined
                    && typeof password === "string"
                    && _hasPermission(password)
                    && ProductDataSchema.safeParse(product).success
                )) {
                    rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
                    return;
                }
                await _store.listProduct(product);
                rs.send({ message: "OK" });
                return;
            }
            catch (e) {
                console.error(e);
                rs.send({ e });
                return;
            }
        })
        .post("/store/delist-product-by-name", async (rq, rs) => {
            try {
                let { password, name } = rq.body;
                if (!(
                    password !== null
                    && password !== undefined
                    && typeof password === "string"
                    && _hasPermission(password)
                    && name !== null
                    && name !== undefined
                    && typeof name === "string"
                )) {
                    rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
                    return;
                }
                await _store.delistProduct(name);
                rs.send({ message: "OK" });
                return;
            }
            catch (e) {
                console.error(e);
                rs.send({ e });
                return;
            }
        })
        .post("/store/delist-product-by-product", async (rq, rs) => {
            try {
                let { password, product } = rq.body;
                if (!(
                    password !== null
                    && password !== undefined
                    && typeof password === "string"
                    && _hasPermission(password)
                    && ProductDataSchema.safeParse(product).success
                )) {
                    rs.send({ message: "STORE_ROUTER.ERR_INVALID_REQUEST" });
                    return;
                }
                await _store.delistProduct(product);
                rs.send({ message: "OK" });
                return;
            }
            catch (e) {
                console.error(e);
                rs.send({ e });
                return;
            }
        });
    }

    function _hasPermission(password: string): void {
        let correctPassword: string | undefined = process.env?.["ADMIN_PASSWORD"];
        require(correctPassword !== undefined, "ADMIN_ROUTER.ERR_ADMIN_PASSWORD_REQUIRED");
        require(correctPassword.trim().length !== 0, "ADMIN_ROUTER.ERR_INVALID_ADMIN_PASSWORD");
        require(correctPassword === password, "ADMIN_ROUTER.ERR_INCORRECT_PASSWORD");
        return;
    }
}