import { Router } from "express";
import { StripeSocketAdaptor } from "@server";
import { StripePaymentProvider } from "@server";
import { OrderData } from "@common";
import { OrderDataSchema } from "@common";
import { Store } from "@server";
import { z as ZodValidator } from "zod";

export function CheckoutRouter(_apiKey: string, _store: Store): Router {
    /** @constructor */ {
        return Router().post("/checkout", async (rq, rs) => {
            try {
                let { orders } = rq.body;
                if (orders.length === 0) {
                    let message = "NO_ORDERS";
                    rs.send({ message });
                    return;
                }
                (orders as Array<OrderData>).forEach(order => {
                    order.product.price *= 100;
                    return;
                });
                let domain: string | undefined = rq.headers.host;
                let baseUrl: string = `http://${ domain }`;
                let socket: StripeSocketAdaptor = StripeSocketAdaptor(_apiKey);
                let paymentProvider: StripePaymentProvider = StripePaymentProvider(socket);
                let url: string = await paymentProvider.receive(
                    baseUrl,
                    (orders as Array<OrderData>),
                    session => {
                        console.log("Purchase successful");
                        (orders as Array<OrderData>).forEach(async order => {
                            await _store.decreaseStock(order.product.name, BigInt(order.amount));
                            return;
                        });
                        return;
                    },
                    session => {
                        console.log("Purchase expired.");
                        return;
                    }
                );
                rs.send({ url });
                return;
            }
            catch (e) {
                rs.send({ e });
                return;
            }
        });
    }
}