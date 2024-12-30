import type { StripeE } from "src/server-class/_";
import type { StoreE } from "src/server-class/_";
import { Router } from "express";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Stripe } from "src/server-class/_";
import { z as ZodValidator } from "zod";
import { ProductOrderDataSchema } from "src/common/_";
import { ProductOrderData } from "src/common/_";
import { Store } from "src/server-class/_";

export type CheckoutRouterApiT = string;
export type CheckoutRouterApiE = 
    | "CHECKOUT_ROUTER.ERR_STRIPE_API_KEY_REQUIRED"
    | "CHECKOUT_ROUTER.ERR_INVALID_RESPONSE"
    | "CHECKOUT_ROUTER.ERR_UNABLE_TO_RECEIVE_PAYMENT";
export type CheckoutRouterR = Result<CheckoutRouterT, CheckoutRouterE>;
export type CheckoutRouterT = Router;
export type CheckoutRouterE =
    | CheckoutRouterApiE
    | StoreE
    | StripeE
    | "CHECKOUT_ROUTER.ERR_SESSION_NOT_AVAILABLE"
    | "CHECKOUT_ROUTER.ERR_MISSING_STRIPE_LINE_ITEMS"
    | "CHECKOUT_ROUTER.ERR_MISSING_STRIPE_LINE_ITEM_PRODUCT_NAME"
    | "CHECKOUT_ROUTER.ERR_MISSING_STRIPE_LINE_ITEM_PRODUCT_AMOUNT"
    | [unknown];
export function CheckoutRouter(_store: Store): CheckoutRouterR {
    /** @constructor */ {
        let routerR = Result.wrap(() => 
            Router()
                .post("/checkout", async (rq, rs) => {
                    let stripeApiKey = process.env?.["STRIPE_API_KEY"];
                    if (stripeApiKey === undefined) {
                        let e: CheckoutRouterApiE = "CHECKOUT_ROUTER.ERR_STRIPE_API_KEY_REQUIRED";
                        rs.status(500).send(e);
                        return;
                    }
                    let stripeR = Stripe(stripeApiKey);
                    if (stripeR.err()) {
                        rs.status(500).send(stripeR.val());
                        return;
                    }
                    let stripe = stripeR.unwrapSafely();
                    let { orders } = rq.body;
                    let match = ZodValidator.array(ProductOrderDataSchema).safeParse(orders).success;
                    if (match === false) {
                        let e: CheckoutRouterApiE = "CHECKOUT_ROUTER.ERR_INVALID_RESPONSE";
                        rs.status(400).send(e);
                        return;
                    }
                    let sessionR = await stripe.receivePayment((orders as Array<ProductOrderData>));
                    if (sessionR.err()) {
                        if (Array.isArray(sessionR.val())) {
                            rs.send(sessionR.val()[0]);
                            return;
                        }
                        rs.send(sessionR.val());
                        return;
                    }
                    let sessionO = sessionR.unwrapSafely();
                    if (sessionO.none()) {
                        let e: CheckoutRouterApiE = "CHECKOUT_ROUTER.ERR_UNABLE_TO_RECEIVE_PAYMENT";
                        rs.status(500).send(e);
                        return;
                    }
                    let session = sessionO.unwrapSafely();
                    let url = session.url;
                    if (url === null) {
                        let e: CheckoutRouterApiE = "CHECKOUT_ROUTER.ERR_UNABLE_TO_RECEIVE_PAYMENT";
                        rs.status(500).send(e);
                        return;
                    }
                    let id = session.id;
                    rs.status(200).send(url);
                    _startPaymentPollTimeout(id, url, _startPaymentPoll(stripeApiKey, id, 9 * 1000), 3600 * 1000);
                    return;
                }));
        if (routerR.err()) return Err([routerR.val()]);
        return routerR;
    }

    async function _checkPayment(stripeApiKey: string, sessionId: string, timer: Timer): Promise<Result<void, CheckoutRouterE>> {
        let stripeR = Stripe(stripeApiKey);
        if (stripeR.err()) return stripeR;
        let stripe = stripeR.unwrapSafely();
        let sessionR = await stripe.checkPayment(sessionId);
        if (sessionR.err()) return sessionR;
        let sessionO = sessionR.unwrapSafely();
        if (sessionO.none()) return Err("CHECKOUT_ROUTER.ERR_SESSION_NOT_AVAILABLE");
        let session = sessionO.unwrapSafely();
        let products = session.line_items?.data;
        if (products === undefined) return Err("CHECKOUT_ROUTER.ERR_MISSING_STRIPE_LINE_ITEMS");
        let complete = session.payment_status === "paid" || session.status === "complete";
        let expired = session.status === "expired";
        if (expired) {
            clearInterval(timer);
            let i = 0n;
            while (i < products.length) {
                let product = products[Number(i)];
                let name = product.description;
                let amount = product.quantity;
                if (name === null) return Err("CHECKOUT_ROUTER.ERR_MISSING_STRIPE_LINE_ITEM_PRODUCT_NAME");
                if (amount === null) return Err("CHECKOUT_ROUTER.ERR_MISSING_STRIPE_LINE_ITEM_PRODUCT_AMOUNT");
                let increaseStockR = await _store.increaseStock(name, BigInt(amount));
                if (increaseStockR.err()) return increaseStockR;
                i++;
            }
            return Ok(undefined);
        }
        if (complete) {
            clearInterval(timer);
            return Ok(undefined);
        }
        return Ok(undefined);
    }

    function _startPaymentPoll(stripeApiKey: string, sessionId: string, interval: number): Timer {
        let timer = setInterval(async () => {
            let checkPaymentR = await _checkPayment(stripeApiKey, sessionId, timer);
            if (checkPaymentR.err()) {
                let e = checkPaymentR.val();
                console.error(e);
                return;
            }
            return;
        }, interval);
        return timer;
    }

    function _startPaymentPollTimeout(sessionId: string, sessionUrl: string, timer: Timer, duration: number) {
        setTimeout(() => {
            clearInterval(timer);
            let warning = `
            WARNING PAYMENT_POLL_WINDOW_CLOSURE
                SESSION_ID: ${ sessionId }
                SESSION_URL: ${ sessionUrl }
            `;
            console.warn(warning);
        }, duration);
    }
}