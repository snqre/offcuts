import { default as Axios } from "axios";
import { ProductDataSchema } from "@common";
import { ProductData } from "@common";
import { z as ZodValidator } from "zod";
import { panic } from "reliq";

export type Server = {
    hasProduct(name: string): Promise<boolean>;
    tags(): Promise<Array<string>>;
    sortedProducts(): Promise<Map<string, Array<ProductData> | undefined>>;
    products(): Promise<Array<ProductData>>;
    products(name: string): Promise<Array<ProductData>>;
    setStock(password: string, name: string, amount: bigint): Promise<void>;
    increaseStock(password: string, name: string, amount: bigint): Promise<void>;
    decreaseStock(password: string, name: string, amount: bigint): Promise<void>;
    setPrice(password: string, name: string, amount: number): Promise<void>;
    increasePrice(password: string, name: string, amount: number): Promise<void>;
    decreasePrice(password: string, name: string, amount: number): Promise<void>;
    listProduct(password: string, product: ProductData): Promise<void>;
    delistProduct(password: string, name: string): Promise<void>;
    delistProduct(password: string, product: ProductData): Promise<void>;
};

export const Server: Server = (() => {
    /** @constructor */ {
        return {
            hasProduct,
            tags,
            sortedProducts,
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

    async function hasProduct(name: string): Promise<boolean> {
        let products_: Array<ProductData> = await products();
        let i: bigint = 0n;
        while (i < products_.length) {
            let product: ProductData = products_.at(Number(i))!;
            if (product.name === name) return true;
            i ++;
        }
        return false;
    }

    async function tags(): Promise<Array<string>> {
        return _tags((await products()));
    }

    async function sortedProducts(): Promise<Map<string, Array<ProductData> | undefined>> {
        return _sort((await products()), (await tags()));
    }

    async function products(): Promise<Array<ProductData>>;
    async function products(name: string): Promise<Array<ProductData>>;
    async function products(
        name?: string
    ): Promise<Array<ProductData>> {
        if (name) {
            let response: unknown = (await Axios.get("/store/products-by-name")).data;
            let payload = ZodValidator.object({
                products: ZodValidator.array(ProductDataSchema)
            }).parse(response);
            if (payload.products) return payload.products;
            else return [];
        }
        let response: unknown = (await Axios.get("/store/products")).data;
        let payload = ZodValidator.object({
            products: ZodValidator.array(ProductDataSchema)
        }).parse(response);
        if (payload.products) return payload.products;
        else return [];
    }

    async function setStock(password: string, name: string, amount: bigint): Promise<void> {
        let n: number = Number(amount);
        let response: unknown = (await Axios.post("/store/set-stock", { password, name, amount: n })).data;
        let parsed = ZodValidator.object({
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse(response);
        let { message, e } = parsed;
        if (e) panic(String(e));
        if (message && message !== "OK") panic(message);
        return;
    }

    async function increaseStock(password: string, name: string, amount: bigint): Promise<void> {
        let n: number = Number(amount);
        let response: unknown = (await Axios.post("/store/increase-stock", { password, name, amount: n })).data;
        let payload = ZodValidator.object({
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse(response);
        let { message, e } = payload;
        if (e) panic(String(e));
        if (message && message !== "OK") panic(message);
        return;
    }

    async function decreaseStock(password: string, name: string, amount: bigint): Promise<void> {
        let n: number = Number(amount);
        let response: unknown = (await Axios.post("/store/decrease-stock", { password, name, amount: n })).data;
        let payload = ZodValidator.object({
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse(response);
        let { message, e } = payload;
        if (e) panic(String(e));
        if (message && message !== "OK") panic(message);
        return;
    }

    async function setPrice(password: string, name: string, amount: number): Promise<void> {
        let response: unknown = (await Axios.post("/store/set-price", { password, name, amount }));
        let payload = ZodValidator.object({
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse(response);
        let { message, e } = payload;
        if (e) panic(String(e));
        if (message && message !== "OK") panic(message);
        return;
    }

    async function increasePrice(password: string, name: string, amount: number): Promise<void> {
        let response: unknown = (await Axios.post("/store/increase-price", { password, name, amount }));
        let payload = ZodValidator.object({
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse(response);
        let { message, e } = payload;
        if (e) panic(String(e));
        if (message && message !== "OK") panic(message);
        return;
    }

    async function decreasePrice(password: string, name: string, amount: number): Promise<void> {
        let response: unknown = (await Axios.post("/store/increase-price", { password, name, amount }));
        let payload = ZodValidator.object({
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse(response);
        let { message, e } = payload;
        if (e) panic(String(e));
        if (message && message !== "OK") panic(message);
        return;
    }

    async function listProduct(password: string, product: ProductData): Promise<void> {
        let response: unknown = (await Axios.post("/store/list-product", { password, product }));
        let payload = ZodValidator.object({
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse(response);
        let { message, e } = payload;
        if (e) panic(String(e));
        if (message && message !== "OK") panic(message);
        return;
    }

    async function delistProduct(password: string, name: string): Promise<void>;
    async function delistProduct(password: string, product: ProductData): Promise<void>;
    async function delistProduct(
        x0: string,
        x1: string | ProductData
    ): Promise<void> {
        let password: string = x0;
        let name: string;
        if (typeof x1 === "object") name = x1.name;
        else name = x1;
        let response: unknown = (await Axios.post("/store/delist-product-by-name", { password, name }));
        let payload = ZodValidator.object({
            message: ZodValidator.string().optional(),
            e: ZodValidator.unknown().optional()
        }).parse(response);
        let { message, e } = payload;
        if (e) panic(String(e));
        if (message && message !== "OK") panic(message);
        return;
    }

    function _sort(products: Array<ProductData>, tags: Array<string>): Map<string, Array<ProductData> | undefined> {
        let map: Map<string, Array<ProductData>> = new Map();
        tags.forEach(tag => map.set(tag, []));
        products.forEach(product => {
            product.tags.forEach(tag => {
                let set: Array<ProductData> = map.get(tag) || [];
                set.push(product);
                map.set(tag, set);
                return;
            });
            return;
        });
        return map;
    }

    function _tags(products: Array<ProductData>): Array<string> {
        let result: Array<string> = [];
        let i: bigint = 0n;
        while (i < products.length) {
            let product: ProductData = products[Number(i)];
            let x: bigint = 0n;
            while (x < product.tags.length) {
                let tag: string = product.tags[Number(x)];
                if (result.includes(tag) === false) result.push(tag);
                x++;
            }
            i++;
        }
        return result;
    }
})();