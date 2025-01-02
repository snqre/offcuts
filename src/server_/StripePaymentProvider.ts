import { default as Stripe } from "stripe";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Unsafe } from "@common";
import { PaymentProvider } from "src/server_/Module";
import { StripeCheckoutSession } from "src/server_/Module";
import { StripeCheckoutSessionLineItem } from "src/server_/Module";
import { Function } from "reliq";
import { wrapR } from "reliq";
import { wrapAsyncR } from "reliq";

export type StripePaymentProviderError = 
    | Unsafe 
    | "STRIPE_PAYMENT_PROVIDER.ERR_INVALID_API_KEY"
    | "STRIPE_PAYMENT_PROVIDER.ERR_URL_NOT_GIVEN";

export type StripePaymentProvider = 
    & PaymentProvider<StripeCheckoutSession, StripePaymentProviderError>
    & {};

export function StripePaymentProvider(_apiKey: string): Result<StripePaymentProvider, StripePaymentProviderError> {
    let _socket: Stripe;
    
    /** @constructor */ {
        if (_apiKey.trim().length === 0) return Err("STRIPE_PAYMENT_PROVIDER.ERR_INVALID_API_KEY");
        let socketR: Result<Stripe, Unsafe> = wrapR(() => new Stripe(_apiKey)).mapErr(e => Unsafe(e));
        if (socketR.err()) return socketR;
        _socket = socketR.unwrapSafely();
        return Ok({
            receive
        });
    }

    async function receive(... [orders, onSuccess, onFailure]: Parameters<StripePaymentProvider["receive"]>): ReturnType<StripePaymentProvider["receive"]> {
        let sessionR: Result<StripeCheckoutSession, Unsafe> = (await wrapAsyncR(async () => await _socket.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [... orders.map(order => StripeCheckoutSessionLineItem(order))],
            mode: "payment"
        }))).mapErr(e => Unsafe(e));
        if (sessionR.err()) return sessionR;
        let session: StripeCheckoutSession = sessionR.unwrapSafely();
        let sessionUrl: string | null = session.url;
        if (sessionUrl === null) return Err("STRIPE_PAYMENT_PROVIDER.ERR_URL_NOT_GIVEN");
        let sessionId: string = session.id;
        let timer: Timer = setInterval(async () => {
            let updatedSessionR: Result<StripeCheckoutSession, Unsafe> = (await wrapAsyncR(async () => await _socket.checkout.sessions.retrieve(sessionId))).mapErr(e => Unsafe(e));
            if (updatedSessionR.ok()) {
                let updatedSession: StripeCheckoutSession = updatedSessionR.unwrapSafely();
                let completed: boolean = updatedSession.payment_status === "paid" || updatedSession.status === "complete";
                let expired: boolean = updatedSession.status === "expired";
                if (expired) {
                    clearInterval(timer);
                    onFailure(updatedSession).mapErr(e => console.error(e));
                    return;
                }
                else if (completed) {
                    clearInterval(timer);
                    onSuccess(updatedSession).mapErr(e => console.error(e));
                    return;
                }
            }
        }, 9000);
        setTimeout(() => clearInterval(timer), 3600 * 1000);
        return Ok(sessionUrl);
    }
}