import type { Function } from "reliq";
import { ProductOrder } from "@server";

export type PaymentProvider<T> = {
    receive(orders: Array<ProductOrder>, onSuccess: Function<T, void>, onFailure: Function<T, void>): Promise<string>;
};