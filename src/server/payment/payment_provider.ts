import type { Function } from "reliq";
import { OrderData } from "@common";

export type PaymentProvider<T> = {
    receive(baseUrl: string, orders: Array<OrderData>, onSuccess: Function<T, void>, onFailure: Function<T, void>): Promise<string>;
}