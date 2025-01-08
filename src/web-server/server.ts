import type { AxiosResponse } from "axios";
import { default as Axios } from "axios";
import { ProductDataSchema } from "@common";
import { ProductData } from "@common";
import { z as ZodValidator } from "zod";
import { panic, require } from "reliq";

export type Server = {
    products(): Promise<Array<ProductData>>;
    products(name: string): Promise<Array<ProductData>>;
    products(
        name?: string
    ): Promise<Array<ProductData>>;
    setStock(password: string, name: string, amount: bigint): Promise<void>;
    increaseStock(password: string, name: string, amount: bigint): Promise<void>;
    decreaseStock(password: string, name: string, amount: bigint): Promise<void>;
    setPrice(password: string, name: string, amount: number): Promise<void>;
    increasePrice(password: string, name: string, amount: number): Promise<void>;
    decreasePrice(password: string, name: string, amount: number): Promise<void>;
    listProduct(password: string, product: ProductData): Promise<void>;
    delistProduct(password: string, name: string): Promise<void>;
    delistProduct(password: string, product: ProductData): Promise<void>;
    delistProduct(
        ... args: Array<unknown>
    ): Promise<void>;
};

export const Server: Server = (() => {
    /** @constructor */ {
        return {
            sortedProducts,
            products,
            tags,
            listProduct
        };
    }

    async function products(): Promise<Array<ProductData>>;
    async function products(name: string): Promise<Array<ProductData>>;
    async function products(
        name?: string
    ): Promise<Array<ProductData>> {
        if (name) {
            let { products } = (await Axios.get("/store/products-by-name")).data;
            return products;
        }
        let { products } = (await Axios.get("/store/products")).data;
        if (products) return products;
        else return [];
    }

    async function setStock(password: string, name: string, amount: bigint): Promise<void> {
        /// TODO
    }






    async function sortedProducts(): Promise<Map<string, Array<ProductData> | undefined>> {
        let products_: Array<ProductData> = await products(); 
        return _sort(products_, _tags(products_));
    }

    async function tags(): Promise<Array<string>> {
        return _tags((await products()));
    }

    async function listProduct(password: string, product: ProductData): Promise<void> {
        let response: AxiosResponse = await Axios.post("/store/list-product", { password, product });
        let { message } = response.data;
        if (!(
            message !== null
            && message !== undefined
            && typeof message === "string"
        )) panic("SERVER.ERR_INVALID_RESPONSE");
        require(message === "OK", "SERVER.ERR_OP_FAILURE");
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