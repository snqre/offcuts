import { default as Stripe } from "stripe";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Unsafe } from "@common";
import { wrapR } from "reliq";

export type StripeSocketError = Unsafe | "STRIPE_SOCKET.ERR_INVALID_API_KEY";

export type StripeSocket =
    & Stripe
    & {};

export function StripeSocket(_apiKey: string): Result<StripeSocket, StripeSocketError> {
    /** @constructor */ {
        if (_apiKey.trim().length === 0) return Err("STRIPE_SOCKET.ERR_INVALID_API_KEY");
        let socketR: Result<Stripe, Unsafe> = wrapR(() => new Stripe(_apiKey)).mapErr(e => Unsafe(e));
        if (socketR.err()) return socketR;
        let socket: Stripe = socketR.unwrapSafely();
        return Ok(socket);
    }
}