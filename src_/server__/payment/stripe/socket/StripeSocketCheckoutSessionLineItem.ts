import { StripeUtil } from "@server";
import { ProductOrder } from "@server";

export type StripeSocketCheckoutSessionLineItem = StripeUtil.Checkout.SessionCreateParams.LineItem;

export function StripeSocketCheckoutSessionLineItem(order: ProductOrder): StripeCheckoutSessionLineItem {
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