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
    setPrice(name: string, price: number): Promise<void>;
    increasePrice(name: string, amount: number): Promise<void>;
    decreasePrice(name: string, amount: number): Promise<void>;
    listProduct(product: ProductData): Promise<void>;
    deListProduct(name: string): Promise<void>;
    deListProduct(product: ProductData): Promise<void>;
    deListProduct(
        args: string | ProductData
    ): Promise<void>;
};

export function Store(_db: Database): Store {
    
    /** @constructor */ {
        return { products };
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
        require(amount >= 0, "STORE.ERR_AMOUNT_BELOW_ZERO");
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
}



export function Stores(_db: Database): Store {
    /** @constructor */ {
        return {
            products, 
            productsByName, 
            setStock, 
            increaseStock,
            decreaseStock,
            setPrice,
            increasePrice,
            decreasePrice,
            listProduct
        };
    }

    async function products(... []: Parameters<Store["products"]>): ReturnType<Store["products"]> {
        return (await _db.get()).products;
    }

    async function productsByName(... [name]: Parameters<Store["productsByName"]>): ReturnType<Store["productsByName"]> {
        let app: AppData = await _db.get();
        let result: Array<ProductData> = [];
        let i: bigint = 0n;
        while (i < app.products.length) {
            let product: ProductData = app.products[Number(i)];
            if (product.name === name) result.push(product);
            i++;
        }
        return result;
    }

    async function setStock(... [name, amount]: Parameters<Store["setStock"]>): ReturnType<Store["setStock"]> {
        require(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
        require(amount >= 0, "STORE.ERR_AMOUNT_BELOW_ZERO");
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

    async function increaseStock(... [name, amount]: Parameters<Store["increaseStock"]>): ReturnType<Store["increaseStock"]> {
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

    async function decreaseStock(... [name, amount]: Parameters<Store["decreaseStock"]>): ReturnType<Store["decreaseStock"]> {
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

    async function setPrice(... [name, price]: Parameters<Store["setPrice"]>): ReturnType<Store["setPrice"]> {
        require(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
        require(price >= 0, "STORE.ERR_PRICE_BELOW_ZERO");
        require(price <= Number.MAX_SAFE_INTEGER, "STORE.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER");
        let app: AppData = await _db.get();
        let i: bigint = 0n;
        while (i <  app.products.length) {
            let product: ProductData = app.products[Number(i)];
            if (product.name === name) product.stock = price;
            i++;
        }
        await _db.set(app);
        return;
    }

    async function increasePrice(... [name, amount]: Parameters<Store["increasePrice"]>): ReturnType<Store["increasePrice"]> {
        require(name.trim().length !== 0, "STORE.ERR_INVALID_NAME");
        require(amount >= 0, "STORE.ERR_AMOUNT_BELOW_ZERO");
        require(amount <= Number.MAX_SAFE_INTEGER, "STORE.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER");
        let app: AppData = await _db.get();
        let i: bigint = 0n;
        while (i < app.products.length) {
            let product: ProductData = app.products[Number(i)];
            if (product.name === name) product.price += amount;
            i++;
        }
        await _db.set(app);
        return;
    }

    async function decreasePrice(... [name, amount]: Parameters<Store["decreasePrice"]>): ReturnType<Store["decreasePrice"]> {
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
}