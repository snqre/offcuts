import { ProductDataSchema } from "src/common/_";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Result } from "reliq";

export type ProductDataR = Result<ProductDataT, ProductDataE>;
export type ProductDataT = ProductData;
export type ProductDataE =
    | "PRODUCT_DATA.ERR_INVALID_NAME"
    | "PRODUCT_DATA.ERR_PRICE_BELOW_ZERO"
    | "PRODUCT_DATA.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER"
    | "PRODUCT_DATA.ERR_STOCK_BELOW_ZERO"
    | "PRODUCT_DATA.ERR_STOCK_ABOVE_MAX_SAFE_INTEGER"
    | "PRODUCT_DATA.ERR_STOCK_NOT_AN_INTEGER"
    | "PRODUCT_DATA.ERR_SCHEMA_VALIDATION_FAILED";
export type ProductData = {
    name: string;
    price: number;
    stock: number;
};
export function ProductData({ name, price, stock }: ProductData): ProductDataR {
    /** @constructor */ {
        let instance = {
            name,
            price,
            stock
        };
        if (name.trim().length === 0) return Err("PRODUCT_DATA.ERR_INVALID_NAME");
        if (price < 0) return Err("PRODUCT_DATA.ERR_PRICE_BELOW_ZERO");
        if (price > Number.MAX_SAFE_INTEGER) return Err("PRODUCT_DATA.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER");
        if (stock < 0) return Err("PRODUCT_DATA.ERR_STOCK_BELOW_ZERO");
        if (stock > Number.MAX_SAFE_INTEGER) return Err("PRODUCT_DATA.ERR_STOCK_ABOVE_MAX_SAFE_INTEGER");
        if (Number.isSafeInteger(stock) === false) return Err("PRODUCT_DATA.ERR_STOCK_NOT_AN_INTEGER");
        let match = ProductDataSchema.safeParse(instance).success;
        if (match === false) return Err("PRODUCT_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return Ok(instance);
    }
}