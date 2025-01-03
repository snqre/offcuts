import { ProductDataSchema } from "@common";
import { require } from "reliq";

export type ProductData = typeof ProductDataSchema._type;

export function ProductData(_instance: ProductData): ProductData {
    /** @constructor */ {
        require(_instance.name.trim().length !== 0, "PRODUCT_DATA.ERR_INVALID_NAME");
        require(_instance.price >= 0, "PRODUCT_DATA.ERR_PRICE_BELOW_ZERO");
        require(_instance.price <= Number.MAX_SAFE_INTEGER, "PRODUCT_DATA.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER");
        require(_instance.stock >= 0, "PRODUCT_DATA.ERR_STOCK_BELOW_ZERO");
        require(_instance.stock <= Number.MAX_SAFE_INTEGER, "PRODUCT_DATA.ERR_STOCK_ABOVE_MAX_SAFE_INTEGER");
        require(Number.isSafeInteger(_instance.stock), "PRODUCT_DATA.ERR_STOCK_NOT_AN_INTEGER");
        require(isProductData(_instance), "PRODUCT_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return _instance;
    }
}

export function isProductData(unknown: unknown): unknown is ProductData {
    return ProductDataSchema.safeParse(unknown).success;
}