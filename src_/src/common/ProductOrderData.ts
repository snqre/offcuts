import { ProductData } from "src_/src/common/_";
import { ProductOrderDataSchema } from "src_/src/common/_";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Result } from "reliq";

export type ProductOrderDataR = Result<ProductOrderDataT, ProductOrderDataE>;
export type ProductOrderDataT = ProductOrderData;
export type ProductOrderDataE =
    | "PRODUCT_ORDER_DATA.ERR_AMOUNT_BELOW_ZERO"
    | "PRODUCT_ORDER_DATA.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER"
    | "PRODUCT_ORDER_DATA.ERR_AMOUNT_NOT_AN_INTEGER"
    | "PRODUCT_ORDER_DATA.ERR_SCHEMA_VALIDATION_FAILED";
export type ProductOrderData = {
    product: ProductData;
    amount: number;
};
export function ProductOrderData({ product, amount }: ProductOrderData): ProductOrderDataR {
    /** @constructor */ {
        let instance = {
            product,
            amount
        };
        if (amount < 0) return Err("PRODUCT_ORDER_DATA.ERR_AMOUNT_BELOW_ZERO");
        if (amount > Number.MAX_SAFE_INTEGER) return Err("PRODUCT_ORDER_DATA.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER");
        if (Number.isSafeInteger(amount) === false) return Err("PRODUCT_ORDER_DATA.ERR_AMOUNT_NOT_AN_INTEGER");
        let match = ProductOrderDataSchema.safeParse(instance).success;
        if (match === false) return Err("PRODUCT_ORDER_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return Ok(instance);
    }
}