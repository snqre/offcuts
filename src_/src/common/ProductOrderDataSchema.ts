import { z as ZodValidator } from "zod";
import { ProductDataSchema } from "src_/src/common/_";

export const ProductOrderDataSchema = ZodValidator.object({
    product: ProductDataSchema,
    amount: ZodValidator.number().min(1).int()
});