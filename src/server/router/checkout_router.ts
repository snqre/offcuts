import type { PaymentProvider } from "@server";
import { Router } from "express";

export type CheckoutRouter = 
    & PaymentProvider<>
    & {
    
};

export function CheckoutRouter(): Router {
    /** @constructor */ {

    }
}