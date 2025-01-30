import type { ReactNode } from "react";
import type { Stripe } from "@stripe/stripe-js";
import { default as Axios } from "axios";
import { OrderData } from "@common";
import { Client } from "@web-client";
import { Theme } from "@web-constant";
import { loadStripe } from "@stripe/stripe-js";
import { require } from "reliq";

let _socket: Promise<Stripe | null> = loadStripe("pk_test_51QKRBU2K2roHgsZDHs8cgu29fIqzRlvzF1nmV5mPdSHZhe93bgEQ9HqwoDTderzA7DWwDfFDpiJTMfjqHvgjIDQx00bF0qqWUL");

export function CheckoutButton(): ReactNode {

    /** @constructor */ {
        return <>
            <button
                onClick={
                    async () => {
                        let orders: ReadonlyArray<OrderData> = Client.shoppingCartOrders();
                        let socket: Stripe | null = await _socket;
                        require(socket !== null, "CHECKOUT_BUTTON.ERR_STRIPE_COULD_NOT_BE_LOADED.");
                        let { url, message, e } = (await Axios.post("/checkout", { orders })).data;
                        if (e) {
                            console.error("SERVER_ERROR", e);
                            return;
                        }
                        if (message) {
                            console.error("SERVER_MESSAGE", e);
                            return;
                        }
                        if (url) {
                            window.location.href = url;
                        }
                        else {
                            console.error("No Checkout returned.");
                        }                        
                    }
                }
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    background: Theme.DK_COLOR,
                    color: Theme.LT_COLOR,
                    padding: 10,
                    borderRadius: 5,
                    cursor: "pointer",
                    width: "100%",
                    height: "auto"
                }}>
                Pay Now
            </button>
        </>;
    }
}