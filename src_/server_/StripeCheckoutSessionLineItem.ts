import { default as Stripe } from "stripe";
import { ProductOrder } from "src_/server_/Module";

export type StripeCheckoutSessionLineItem = Stripe.Checkout.SessionCreateParams.LineItem;

export function StripeCheckoutSessionLineItem(order: ProductOrder): StripeCheckoutSessionLineItem {
    return {
        quantity: Number(order.amount),
        price_data: {
            currency: "gbp",
            unit_amount: order.product().price(),
            product_data: {
                name: order.product().name().trim(),
                description: order.product().name()
            }
        }
    };
}