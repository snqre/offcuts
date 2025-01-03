import { default as Socket } from "stripe";
import { OrderData } from "@common";

export type StripeCheckoutSessionLineItem = Socket.Checkout.SessionCreateParams.LineItem;

export function StripeCheckoutSessionLineItem(order: Readonly<OrderData>): StripeCheckoutSessionLineItem {
    return {
        quantity: Number(order.amount),
        price_data: {
            currency: "gbp",
            unit_amount: order.product.price,
            product_data: {
                name: order.product.name,
                description: order.product.name
            }
        }
    };
}