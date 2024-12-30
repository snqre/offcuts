import type { PaymentProvider } from "src/server-class/_";
import { default as Socket } from "stripe";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Some } from "reliq";
import { ProductOrderData } from "src/common/_";

export type StripeR = Result<StripeT, StripeE>;
export type StripeT = Stripe;
export type StripeE = 
    | "STRIPE.ERR_INVALID_API_KEY"
    | [unknown];
export type Stripe =
    & PaymentProvider
    & {};
export function Stripe(_apiKey: string): StripeR {
    let _socket: Socket;
    
    /** @constructor */ {
        if (_apiKey.trim().length === 0) return Err("STRIPE.ERR_INVALID_API_KEY");
        let socketR = Result.wrap(() => new Socket(_apiKey));
        if (socketR.err()) return Err([socketR.val()]);
        _socket = socketR.unwrapSafely();
        return Ok({ checkPayment, receivePayment });
    }

    async function checkPayment(... [sessionId]: Parameters<Stripe["checkPayment"]>): ReturnType<Stripe["checkPayment"]> {
        let sessionR = await Result.wrapAsync(async () => await _socket.checkout.sessions.retrieve(sessionId));
        if (sessionR.err()) return Err([sessionR.val()]);
        let session = sessionR.unwrapSafely();
        return Ok(Some(session));
    }

    async function receivePayment(... [orders]: Parameters<Stripe["receivePayment"]>): ReturnType<Stripe["receivePayment"]> {
        let sessionR = await Result.wrapAsync(async () => await _socket.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [... orders.map(order => _toSessionCheckoutLineItem(order))],
            mode: "payment"
        }));
        if (sessionR.err()) return Err([sessionR.val()]);
        let session = sessionR.unwrapSafely();
        return Ok(Some(session));
    }

    function _toSessionCheckoutLineItem(order: ProductOrderData): Socket.Checkout.SessionCreateParams.LineItem {
        let id = order.product.name.trim();
        let currency = "gbp" as const;
        let productDataFragment = {
            name: id,
            description: order.product.name
        } as Socket.Checkout.SessionCreateParams.LineItem.PriceData.ProductData;
        let priceDataFragment = {
            currency,
            unit_amount: order.product.price,
            product_data: productDataFragment
        } as Socket.Checkout.SessionCreateParams.LineItem.PriceData;
        let item = {
            quantity: order.amount,
            price_data: priceDataFragment
        } as Socket.Checkout.SessionCreateParams.LineItem;
        return item;
    }
}