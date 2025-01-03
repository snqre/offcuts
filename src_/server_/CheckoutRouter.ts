import { Unsafe } from "@common"
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Router } from "express";
import { StripePaymentProvider } from "src_/server_/Module";
import { wrapR } from "reliq";

export type CheckoutRouterError = Unsafe;

export function StripeCheckoutRouter(_route: string, _provider: StripePaymentProvider, _onSuccess: , _onFailure: StripePaymentProviderListener): Result<Router, CheckoutRouterError> {
    /** @constructor */ {
        return wrapR(() => Router()
            .post(_route, async (rq, rs) => {
                let providerReceiveR = _provider.receive([], _onSuccess, _onFailure);
                (await providerReceiveR).mapErr(e => {
                    e === "STRIPE_PAYMENT_PROVIDER.ERR_INVALID_API_KEY"
                });
            })).mapErr(e => Unsafe(e));
    }
}