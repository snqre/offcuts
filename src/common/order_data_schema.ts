import { z as ZodValidator } from "zod";
import { ProductDataSchema } from "@common";

export const OrderDataSchema = ZodValidator.object({
    product: ProductDataSchema,
    amount: ZodValidator.number().min(1).int()
});