import { z as ZodValidator } from "zod";
import { require } from "reliq";

export const ProductDataSchema = ZodValidator.object({
    name: ZodValidator.string().min(1).refine(x => x.trim().length > 0),
    price: ZodValidator.number().min(0).finite(),
    stock: ZodValidator.number().min(0).finite().int()
});

export type ProductDataError =
    | "PRODUCT_DATA.ERR_INVALID_NAME"
    | "PRODUCT_DATA.ERR_PRICE_BELOW_ZERO"
    | "PRODUCT_DATA.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER"
    | "PRODUCT_DATA.ERR_STOCK_BELOW_ZERO"
    | "PRODUCT_DATA.ERR_STOCK_ABOVE_MAX_SAFE_INTEGER"
    | "PRODUCT_DATA.ERR_STOCK_NOT_AN_INTEGER"
    | "PRODUCT_DATA.ERR_SCHEMA_VALIDATION_FAILED";

export type ProductData = typeof ProductDataSchema._type;

export function ProductData(_instance: ProductData): ProductData {
    /** @constructor */ {
        require<ProductDataError>(_instance.name.trim().length !== 0, "PRODUCT_DATA.ERR_INVALID_NAME");
        require<ProductDataError>(_instance.price >= 0, "PRODUCT_DATA.ERR_PRICE_BELOW_ZERO");
        require<ProductDataError>(_instance.price <= Number.MAX_SAFE_INTEGER, "PRODUCT_DATA.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER");
        require<ProductDataError>(_instance.stock >= 0, "PRODUCT_DATA.ERR_STOCK_BELOW_ZERO");
        require<ProductDataError>(_instance.stock <= Number.MAX_SAFE_INTEGER, "PRODUCT_DATA.ERR_STOCK_ABOVE_MAX_SAFE_INTEGER");
        require<ProductDataError>(Number.isSafeInteger(_instance.stock), "PRODUCT_DATA.ERR_STOCK_NOT_AN_INTEGER");
        require<ProductDataError>(isProductData(_instance), "PRODUCT_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return _instance;
    }
}

export function isProductData(unknown: unknown): unknown is ProductData {
    return ProductDataSchema.safeParse(unknown).success;
}