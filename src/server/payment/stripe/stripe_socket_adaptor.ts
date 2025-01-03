import { default as Socket } from "stripe";
import { require } from "reliq";

export type StripeSocketAdaptor =
    & Socket
    & {};

export function StripeSocketAdaptor(_apiKey: string): StripeSocketAdaptor {
    /** @constructor */ {
        require(_apiKey.trim().length !== 0, "STRIPE_SOCKET_ADAPTOR.ERR_INVALID_API_KEY");
        return new Socket(_apiKey);
    }
}