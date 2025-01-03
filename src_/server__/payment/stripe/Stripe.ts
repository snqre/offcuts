import type { PaymentProvider } from "@server";
import type { StripeSocketCheckoutSession } from "./StripeSocketCheckoutSession";
import { default as Socket } from "stripe";
import { StripeSocketAdaptor } from "@server";

export type StripeError =
    | "STRIPE.ERR_INVAL"

export type Stripe =
    & PaymentProvider<StripeSocketCheckoutSession>
    & {};

export function Stripe(_socket: StripeSocket): Stripe {

    async function receive(... [orders]: Parameters<Stripe["receive"]>): ReturnType<Stripe["receive"]> {
        
    }
}