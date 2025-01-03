import { OrderDataSchema } from "@common";
import { require } from "reliq";

export type OrderData = typeof OrderDataSchema._type;

export function OrderData(_instance: OrderData): OrderData {
    /** @constructor */ {
        require(_instance.amount >= 0, "ORDER_DATA.ERR_AMOUNT_BELOW_ZERO");
        require(_instance.amount <= Number.MAX_SAFE_INTEGER, "ORDER_DATA.ERR_AMOUNT_ABOVE_MAX_SAFE_INTEGER");
        require(Number.isSafeInteger(_instance.amount), "ORDER_DATA.ERR_AMOUNT_NOT_AN_INTEGER");
        require(isOrderData(_instance), "ORDER_DATA.ERR_SCHEMA_VALIDATION_FAILED");
        return _instance;
    }
}

export function isOrderData(unknown: unknown): unknown is OrderData {
    return OrderDataSchema.safeParse(unknown).success;
}