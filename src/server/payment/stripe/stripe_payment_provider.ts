import type { PaymentProvider } from "@server";
import type { StripeCheckoutSession } from "@server";
import type { StripeSocketAdaptor } from "@server";
import type { Function } from "reliq";
import { StripeCheckoutSessionLineItem } from "@server";
import { OrderData } from "@common";
import { require } from "reliq";

export type StripePaymentProvider = 
    & PaymentProvider<StripeCheckoutSession>;

export function StripePaymentProvider(_socket: StripeSocketAdaptor) {
    /** @constructor */ {
        return { receive };
    }

    async function receive(orders: Array<OrderData>, onSuccess: Function<StripeCheckoutSession, void>, onFailure: Function<StripeCheckoutSession, void>): Promise<string> {
        let session: StripeCheckoutSession = await _socket.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [...orders.map(order => {
                return StripeCheckoutSessionLineItem(order);
            })],
            mode: "payment"
        });
        let sessionUrl: string | null = session.url;
        require(sessionUrl !== null, "STRIPE_PAYMENT_PROVIDER.ERR_MISSING_SESSION_URL");
        let sessionId: string = session.id;
        let timer: Timer = setInterval(async () => {
            let updatedSession: StripeCheckoutSession = await _socket.checkout.sessions.retrieve(sessionId);
            let isComplete: boolean = updatedSession.payment_status === "paid" || updatedSession.status === "complete";
            let isExpired: boolean = updatedSession.status === "expired";
            if (isExpired) {
                clearInterval(timer);
                onFailure(updatedSession);
                return;
            }
            else if (isComplete) {
                clearInterval(timer);
                onSuccess(updatedSession);
                return;
            }
        }, _seconds(9)); 
        setTimeout(() => {
            clearInterval(timer);
            return;
        }, _seconds(3600));
        return sessionUrl;
    }

    function _seconds(ms: number): number {
        return ms * 1000;
    }
}