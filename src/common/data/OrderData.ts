import { z as ZodValidator } from "zod";
import { ProductDataSchema } from "@common";
import { require } from "reliq";

export const OrderDataSchema = ZodValidator.object({
    product: ProductDataSchema,
    amount: ZodValidator.number().min(1).int()
});

export type OrderDataError =
    | "ORDER_DATA.ERR_AMOUNT_BELOW_ZERO"
    | "ORDER_DATA.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER"
    | "ORDER_DATA.ERR_AMOUNT_NOT_AN_INTEGER"
    | "ORDER_DATA.ERR_SCHEMA_VALIDATION_FAILED";

export type OrderData = typeof OrderDataSchema._type;

export function OrderData(_instance: OrderData): OrderData {
    /** @constructor */ {
        require<OrderDataError>(_instance.amount >= 0, "ORDER_DATA.ERR_AMOUNT_BELOW_ZERO");
        require<OrderDataError>(_instance.amount <= Number.MAX_SAFE_INTEGER, "ORDER_DATA.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER");
        require<OrderDataError>(Number.isSafeInteger(_instance.amount), "ORDER_DATA.ERR_AMOUNT_NOT_AN_INTEGER");
        require<OrderDataError>(isOrderData(_instance), "ORDER_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return _instance;
    }
}

export function isOrderData(unknown: unknown): unknown is OrderData {
    return OrderDataSchema.safeParse(unknown).success;
}