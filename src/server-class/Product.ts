import type { ProductOrderDataE } from "src/common/_";
import type { ProductDataE } from "src/common/_";
import type { PaymentProviderE } from "src/server-class/_";
import type { PaymentProvider } from "src/server-class/_";
import { Result } from "reliq";
import { Option } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { Stripe } from "stripe";
import { ProductData } from "src/common/_";
import { ProductOrderData } from "src/common/_";

export type ProductR = Result<ProductT, ProductE>;
export type ProductT = Product;
export type ProductE =
    | ProductOrderDataE
    | ProductDataE
    | PaymentProviderE
    | "PRODUCT.ERR_INVALID_NAME"
    | "PRODUCT.ERR_PRICE_BELOW_ZERO"
    | "PRODUCT.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER"
    | "PRODUCT.ERR_STOCK_BELOW_ZERO"
    | "PRODUCT.ERR_AMOUNT_BELOW_ZERO"
    | "PRODUCT.ERR_INSUFFICIENT_STOCK";
export type Product = {
    name(): string;
    price(): number;
    stock(): bigint;
    increaseStock(amount: bigint): Result<void, ProductE>;
    decreaseStock(amount: bigint): Result<void, ProductE>;
    purchase(amount: bigint, provider: PaymentProvider): Promise<Result<Option<Stripe.Checkout.Session>, ProductE>>;
};
export function Product(_name: string, _price: number, _stock: bigint): ProductR {
    /** @constructor */ {
        if (_name.trim().length === 0) return Err("PRODUCT.ERR_INVALID_NAME");
        if (_price < 0) return Err("PRODUCT.ERR_PRICE_BELOW_ZERO");
        if (_price > Number.MAX_SAFE_INTEGER) return Err("PRODUCT.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER");
        if (_stock < 0) return Err("PRODUCT.ERR_STOCK_BELOW_ZERO");
        return Ok({
            name,
            price,
            stock,
            increaseStock,
            decreaseStock,
            purchase
        });
    }

    function name(): ReturnType<Product["name"]> {
        return _name;
    }

    function price(): ReturnType<Product["price"]> {
        return _price;
    }

    function stock(): ReturnType<Product["stock"]> {
        return _stock;
    }

    function increaseStock(... [amount]: Parameters<Product["increaseStock"]>): ReturnType<Product["increaseStock"]> {
        if (amount < 0) return Err("PRODUCT.ERR_AMOUNT_BELOW_ZERO");
        _stock += amount;
        return Ok(undefined);
    }

    function decreaseStock(... [amount]: Parameters<Product["decreaseStock"]>): ReturnType<Product["decreaseStock"]> {
        if (amount < 0) return Err("PRODUCT.ERR_AMOUNT_BELOW_ZERO");
        if (stock() - amount < 0) return Err("PRODUCT.ERR_INSUFFICIENT_STOCK");
        _stock -= amount;
        return Ok(undefined);
    }

    async function purchase(... [amount, provider]: Parameters<Product["purchase"]>): ReturnType<Product["purchase"]> {
        let decreaseStockR = decreaseStock(amount);
        if (decreaseStockR.err()) return decreaseStockR;
        let productDataR = ProductData({
            name: name(),
            price: price(),
            stock: Number(stock())
        });
        if (productDataR.err()) return productDataR;
        let productData = productDataR.unwrapSafely();
        let productOrderDataR = ProductOrderData({
            product: productData,
            amount: Number(amount)
        });
        if (productOrderDataR.err()) return productOrderDataR;
        let productOrderData = productOrderDataR.unwrapSafely();
        let sessionR = await provider.receivePayment([productOrderData]);
        if (sessionR.err()) return sessionR;
        let sessionO = sessionR.unwrapSafely();
        if (sessionO.none()) return Ok(None);
        let session = sessionO.unwrapSafely();
        return Ok(Some(session));
    }
}