import type { Function } from "reliq";
import { OrderData } from "@common";

export type PaymentProvider<T> = {
    receive(orders: Array<OrderData>, onSuccess: Function<T, void>, onFailure: Function<T, void>): Promise<string>;
}