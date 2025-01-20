import type { ReactNode } from "react";
import type { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { require } from "reliq";

let _socket: Promise<Stripe | null> = loadStripe("pk_test_51QKRBU2K2roHgsZDHs8cgu29fIqzRlvzF1nmV5mPdSHZhe93bgEQ9HqwoDTderzA7DWwDfFDpiJTMfjqHvgjIDQx00bF0qqWUL");

export function CheckoutButton(): ReactNode {

    /** @constructor */ {
        return <>
            <button
                onClick={
                    async () => {
                        let socket: Stripe | null = await _socket;
                        require(socket !== null, "CHECKOUT_BUTTON.ERR_STRIPE_COULD_NOT_BE_LOADED.");
                        
                        
                    }
                }
                style={{

                }}>

            </button>
        </>;
    }

    async function _receivePayment(): Promise<string> {
        
    }
}