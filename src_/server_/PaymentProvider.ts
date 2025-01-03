import { Function } from "reliq";
import { ProductOrder } from "src_/server_/Module";
import { Result } from "reliq";

export type PaymentProviderListener<T, E> = Function<T, Result<void, E>>;

export type PaymentProvider<T, E> = {
    receive(orders: Array<ProductOrder>, onSuccess: PaymentProviderListener<T, E>, onFailure: PaymentProviderListener<T, E>): Promise<Result<string, E>>;
};