import { default as Socket } from "stripe";
import { require } from "reliq";

export type StripeSocketAdaptorError = "STRIPE_SOCKET_ADAPTOR.ERR_INVALID_API_KEY";

export type StripeSocketAdaptor =
    & Socket
    & {};

export function StripeSocketAdaptor(_key: string): StripeSocketAdaptor {
    /** @constructor */ {
        require<StripeSocketAdaptorError>(_key.trim().length !== 0, "STRIPE_SOCKET_ADAPTOR.ERR_INVALID_API_KEY");
        return new Socket(_key);
    }
}