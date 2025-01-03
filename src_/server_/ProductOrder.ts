import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { ProductOrderData } from "@common";
import { Product } from "src_/server_/Module";

export type ProductOrderError = "";

export type ProductOrder = {
    product(): Product;
    amount(): bigint;
};

export function ProductOrder(_data: Readonly<ProductOrderData>): ProductOrder {
    let _product: Product;
    let _amount: bigint;

    /** @constructor */ {
        _product = Product(_data.product);
        _amount = BigInt(_data.amount);
        return {
            product,
            amount
        };
    }

    function product(): ReturnType<ProductOrder["product"]> {
        return _product;
    }

    function amount() {
        return _amount;
    }
}