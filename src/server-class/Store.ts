import type { Database } from "@server-class";
import type { DatabaseE } from "@server-class";
import type { ProductR } from "@server-class";
import type { ProductE } from "@server-class";
import type { ProductDataE } from "@common";
import { Option } from "reliq";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { AppData } from "@common";
import { Product } from "@server-class";
import { ProductData } from "@common";

export type StoreT = Store;
export type StoreE =
    | DatabaseE
    | ProductE
    | ProductDataE
    | "STORE.ERR_APP_DATA_UNAVAILABLE"
    | "STORE.ERR_PRODUCT_NOT_FOUND"
    | "STORE.ERR_PRODUCT_ALREADY_LISTED";
export type Store = {
    products(): Promise<Result<Array<ProductR>, StoreE>>;
    productsByName(name: string): Promise<Result<Option<ProductR>, StoreE>>;
    increaseStock(name: string, amount: bigint): Promise<Result<void, StoreE>>;
    decreaseStock(name: string, amount: bigint): Promise<Result<void, StoreE>>;
    listProduct(product: Product): Promise<Result<void, StoreE>>;
    deListProduct(name: string): Promise<Result<void, StoreE>>;
    deListProductByProduct(product: Product): Promise<Result<void, StoreE>>;
    setProductPrice(name: string, price: number): Promise<Result<void, StoreE>>;
};
export function Store(_database: Database): Store {
    /** @constructor */ {
        return {
            products,
            productsByName,
            increaseStock,
            decreaseStock,
            listProduct,
            deListProduct,
            deListProductByProduct,
            setProductPrice
        };
    }

    async function products(): ReturnType<Store["products"]> {
        let appDataR = await _appData();
        if (appDataR.err()) return appDataR;
        let appData = appDataR.unwrapSafely();
        let result: Array<ProductR> = [];
        let i = 0n;
        while (i < appData.products.length) {
            let productData = appData.products[Number(i)];
            let productR = Product(productData.name, productData.price, BigInt(productData.stock));
            result.push(productR);
            i++;
        }
        return Ok(result);
    }

    async function productsByName(... [name]: Parameters<Store["productsByName"]>): ReturnType<Store["productsByName"]> {
        let appDataR = await _appData();
        if (appDataR.err()) return appDataR;
        let appData = appDataR.unwrapSafely();
        let i = 0n;
        while (i < appData.products.length) {
            let productData = appData.products[Number(i)];
            if (productData.name === name) {
                let productR = Product(productData.name, productData.price, BigInt(productData.stock));
                return Ok(Some(productR));
            }
            i++;
        }
        return Ok(None);
    }

    async function increaseStock(... [name, amount]: Parameters<Store["increaseStock"]>): ReturnType<Store["increaseStock"]> {
        return _editStock(name, amount, "OP_INCREASE");
    }

    async function decreaseStock(... [name, amount]: Parameters<Store["decreaseStock"]>): ReturnType<Store["decreaseStock"]> {
        return _editStock(name, amount, "OP_DECREASE");
    }

    async function listProduct(... [product]: Parameters<Store["listProduct"]>): ReturnType<Store["listProduct"]> {
        let appDataR = await _appData();
        if (appDataR.err()) return appDataR;
        let appData = appDataR.unwrapSafely();
        let i = 0n;
        while (i < appData.products.length) {
            let productData = appData.products[Number(i)];
            if (productData.name === product.name()) return Err("STORE.ERR_PRODUCT_ALREADY_LISTED");
            i++;
        }
        let productDataR = ProductData({
            name: product.name(),
            price: product.price(),
            stock: Number(product.stock())
        });
        if (productDataR.err()) return productDataR;
        let productData = productDataR.unwrapSafely();
        appData.products.push(productData);
        let setR = await _database.set(appData);
        if (setR.err()) return setR;
        return Ok(undefined);
    }

    async function deListProduct(... [name]: Parameters<Store["deListProduct"]>): ReturnType<Store["deListProduct"]> {
        let appDataR = await _appData();
        if (appDataR.err()) return appDataR;
        let appData = appDataR.unwrapSafely();
        let match = appData.products.findIndex(productData => productData.name === name);
        if (match === -1) return Err("STORE.ERR_PRODUCT_NOT_FOUND");
        appData.products.splice(match, 1);
        let setR = await _database.set(appData);
        if (setR.err()) return setR;
        return Ok(undefined);
    }

    async function deListProductByProduct(... [product]: Parameters<Store["deListProductByProduct"]>): ReturnType<Store["deListProductByProduct"]> {
        return deListProduct(product.name());
    }

    async function setProductPrice(... [name, price]: Parameters<Store["setProductPrice"]>): ReturnType<Store["setProductPrice"]> {
        let appDataR = await _appData();
        if (appDataR.err()) return appDataR;
        let appData = appDataR.unwrapSafely();
        let match = appData.products.findIndex(productData => productData.name === name);
        if (match === -1) return Err("STORE.ERR_PRODUCT_NOT_FOUND");
        let i = 0n;
        while (i < appData.products.length) {
            let productData = appData.products[Number(i)];
            if (productData.name === name) {
                appData.products.splice(match, 1);
                productData.price = price;
                appData.products.push(productData);
            }
            i++;
        }
        let setR = await _database.set(appData);
        if (setR.err()) return setR;
        return Ok(undefined);
    }

    async function _editStock(name: string, amount: bigint, op: "OP_INCREASE" | "OP_DECREASE"): Promise<Result<void, StoreE>> {
        let appDataR = await _appData();
        if (appDataR.err()) return appDataR;
        let appData = appDataR.unwrapSafely();
        let match = false;
        let productsLike = appData
            .products
            .map(productData => {
                if (productData.name === name) {
                    match = true;
                    let productR = Product(productData.name, productData.price, BigInt(productData.stock));
                    if (productR.err()) return productR;
                    let product = productR.unwrapSafely();
                    let editR =
                        op === "OP_INCREASE"
                            ? product.increaseStock(amount)
                            : product.decreaseStock(amount);
                    if (editR.err()) return editR;
                    let productDataR = ProductData({
                        name: product.name(),
                        price: product.price(),
                        stock: Number(product.stock())
                    });
                    if (productDataR.err()) return productDataR;
                    productData = productDataR.unwrapSafely();
                }
                return productData;
            });
        if (match === false) return Err("STORE.ERR_PRODUCT_NOT_FOUND");
        let products: Array<ProductData> = [];
        let i = 0n;
        while (i < productsLike.length) {
            let productLike = productsLike[Number(i)];
            if (Result.isErr(productLike)) return productLike;
            products.push(productLike);
            i++;
        }
        appData.products = products;
        let setR = await _database.set(appData);
        if (setR.err()) return setR;
        return Ok(undefined);
    }

    async function _appData(): Promise<Result<AppData, StoreE>> {
        let appDataR = await _database.get();
        if (appDataR.err()) return appDataR;
        let appDataO = appDataR.unwrapSafely();
        if (appDataO.none()) return Err("STORE.ERR_APP_DATA_UNAVAILABLE");
        let appData = appDataO.unwrapSafely();
        return Ok(appData);
    }
}