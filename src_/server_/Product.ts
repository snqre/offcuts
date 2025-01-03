import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { ProductData } from "@common";

export type ProductError =
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
    increaseStock(amount: bigint): Result<void, ProductError>;
    decreaseStock(amount: bigint): Result<void, ProductError>;
};

export function Product(_data: Readonly<ProductData>): Product {
    let _name: string;
    let _price: number;
    let _stock: bigint;

    /** @constructor */ {
        _name = _data.name;
        _price = _data.price;
        _stock = BigInt(_data.stock);
        return {
            name,
            price,
            stock,
            increaseStock,
            decreaseStock
        };
    }

    function name(): string {
        return _name;
    }

    function price(): number {
        return _price;
    }

    function stock(): ReturnType<Product["stock"]> {
        return _stock
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
}