import type { Database } from "@server";
import { ProductData } from "@common";
import { AppData } from "@common";
import { require } from "reliq";

export type Store = {
    products(): Promise<Array<ProductData>>;
    products(name: string): Promise<Array<ProductData>>;
    products(
        name?: string
    ): Promise<Array<ProductData>>;
    setStock(name: string, amount: bigint): Promise<void>;
    increaseStock(name: string, amount: bigint): Promise<void>;
    decreaseStock(name: string, amount: bigint): Promise<void>;
    setPrice(name: string, amount: number): Promise<void>;
    increasePrice(name: string, amount: number): Promise<void>;
    decreasePrice(name: string, amount: number): Promise<void>;
    listProduct(product: ProductData): Promise<void>;
    delistProduct(name: string): Promise<void>;
    delistProduct(product: ProductData): Promise<void>;
    delistProduct(
        args: string | ProductData
    ): Promise<void>;
};

export function Store(_db: Database): Store {
    
    /** @constructor */ {
        return { 
            products, 
            setStock, 
            increaseStock, 
            decreaseStock,
            setPrice,
            increasePrice,
            decreasePrice,
            listProduct,
            delistProduct
        };
    }

    async function products(): Promise<Array<ProductData>>;
    async function products(name: string): Promise<Array<ProductData>>;
    async function products(
        name?: string
    ): Promise<Array<ProductData>> {
        let app: AppData = await _db.get();
        if (name) {
            let result: Array<ProductData> = [];
            let i: bigint = 0n;
            while (i < app.products.length) {
                let product: ProductData = app.products[Number(i)];
                if (product.name === name) result.push(product);
                i++
            }
            return result;
        }
        return app.products;
    }

    async function setStock(name: string, amount: bigint): Promise<void> {
        require(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
        require(amount >= 0n, "STORE.ERR_AMOUNT_BELOW_ZERO");
        let app: AppData = await _db.get();
        let i: bigint = 0n;
        while (i < app.products.length) {
            let product: ProductData = app.products[Number(i)];
            if (product.name === name) product.stock = Number(amount);
            i++;
        }
        await _db.set(app);
        return;
    }

    async function increaseStock(name: string, amount: bigint): Promise<void> {
        require(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
        require(amount >= 0n, "STORE.ERR_AMOUNT_BELOW_ZERO");
        let app: AppData = await _db.get();
        let i: bigint = 0n;
        while (i < app.products.length) {
            let product: ProductData = app.products[Number(i)];
            if (product.name === name) product.stock += Number(amount);
            i++;
        }
        await _db.set(app);
        return;
    }

    async function decreaseStock(name: string, amount: bigint): Promise<void> {
        require(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
        require(amount >= 0n, "STORE.ERR_AMOUNT_BELOW_ZERO");
        let app: AppData = await _db.get();
        let i: bigint = 0n;
        while (i < app.products.length) {
            let product: ProductData = app.products[Number(i)];
            if (product.name === name) {
                require(product.stock - Number(amount) > 0, "STORE.ERR_INSUFFICIENT_STOCK");
                product.stock -= Number(amount);
            }
            i++;
        }
        await _db.set(app);
        return;
    }

    async function setPrice(name: string, amount: number): Promise<void> {
        require(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
        require(amount >= 0, "STORE.ERR_AMOUNT_BELOW_ZERO");
        require(amount <= Number.MAX_SAFE_INTEGER, "STORE.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER");
        let app: AppData = await _db.get();
        let i: bigint = 0n;
        while (i < app.products.length) {
            let product: ProductData = app.products[Number(i)];
            if (product.name === name) product.stock = amount;
            i++;
        }
        await _db.set(app);
        return;
    }

    async function increasePrice(name: string, amount: number): Promise<void> {
        require(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
        require(amount >= 0, "STORE.ERR_AMOUNT_BELOW_ZERO");
        require(amount <= Number.MAX_SAFE_INTEGER, "STORE.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER");
        let app: AppData = await _db.get();
        let i: bigint = 0n;
        while (i < app.products.length) {
            let product: ProductData = app.products[Number(i)];
            if (product.name === name) {
                require(product.price + amount <= Number.MAX_SAFE_INTEGER, "STORE.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER");
                product.price += amount;
            }
            i++;
        }
        await _db.set(app);
        return;
    }

    async function decreasePrice(name: string, amount: number): Promise<void> {
        require(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
        require(amount >= 0, "STORE.ERR_AMOUNT_BELOW_ZERO");
        require(amount <= Number.MAX_SAFE_INTEGER, "STORE.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER");
        let app: AppData = await _db.get();
        let i: bigint = 0n;
        while (i < app.products.length) {
            let product: ProductData = app.products[Number(i)];
            if (product.name === name) {
                require(product.price - amount >= 0, "STORE.ERR_PRICE_BELOW_ZERO");
                product.price -= amount;
            }
            i++;
        }
        await _db.set(app);
        return;
    }

    async function listProduct(product: ProductData): Promise<void> {
        let app: AppData = await _db.get();
        app.products.push(product);
        await _db.set(app);
        return;
    }

    async function delistProduct(name: string): Promise<void>;
    async function delistProduct(product: ProductData): Promise<void>;
    async function delistProduct(
        args: string | ProductData
    ): Promise<void> {
        let name: string;
        if (typeof args === "string") name = args;
        else name = args.name;
        let app: AppData = await _db.get();
        let i: bigint = 0n;
        while (i < app.products.length) {
            let product: ProductData = app.products[Number(i)];
            if (product.name === name) app.products.splice(Number(i), 1);
            i++;
        }
        return;
    }
}