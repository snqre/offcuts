import { ProductOrderData } from "src/common/_";
import { Stripe } from "stripe";
import { Result } from "reliq";
import { Option } from "reliq";

export type PaymentProviderT = PaymentProvider;
export type PaymentProviderE = [unknown];
export type PaymentProvider = {
    checkPayment(sessionId: string): Promise<Result<Option<Stripe.Checkout.Session>, PaymentProviderE>>;
    receivePayment(orders: Array<ProductOrderData>): Promise<Result<Option<Stripe.Checkout.Session>, PaymentProviderE>>;
};