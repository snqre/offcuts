import { OrderData } from "@common";
import { Server } from "@web-server";
import { require } from "reliq";
import { panic } from "reliq";

export type ClientShoppingCart = {
    orders(): ReadonlyArray<OrderData>;
    cost(): number;
    addProduct(name: string): Promise<void>;
    addProduct(name: string, amount: bigint): Promise<void>;
    removeProduct(name: string): void;
    removeProduct(name: string, amount: bigint): void;
    empty(): void;
    empty(name: string): void;
};

export function ClientShoppingCart(): ClientShoppingCart;
export function ClientShoppingCart(_orders: Array<OrderData>): ClientShoppingCart;
export function ClientShoppingCart(
    _args0?: Array<OrderData>
): ClientShoppingCart {    
    let _orders: Array<OrderData>;
    
    /** @constructor */ {
        _orders = _args0 ?? [];
        return {
            orders,
            cost, 
            addProduct, 
            removeProduct, 
            empty 
        };
    }

    function orders(): ReadonlyArray<OrderData> {
        return _orders;
    }

    function cost(): number {
        let result: number = 0;
        let i: bigint = 0n;
        while (i < _orders.length) {
            let order: OrderData = _orders[Number(i)];
            result += order.product.price * order.amount;
            i += 1n;
        }
        return result;
    }

    async function addProduct(name: string): Promise<void>;
    async function addProduct(name: string, amount: bigint): Promise<void>;
    async function addProduct(
        args0: string,
        args1?: bigint
    ): Promise<void> {
        args1 ??= 1n;
        require(await Server.hasProduct(args0), "SHOPPING_CART.ERR_PRODUCT_NOT_FOUND");
        let i: bigint = 0n;
        while (i < _orders.length) {
            let order: OrderData = _orders.at(Number(i))!;
            if (order.product.name === args0) {
                order.amount += Number(args1);
                return;
            }
            i += 1n;
        }
        panic("SHOPPING_CART.ERR_PRODUCT_NOT_FOUND_DESPITE_SERVER_CONFIRMATION");
    }

    function removeProduct(name: string): void;
    function removeProduct(name: string, amount: bigint): void;
    function removeProduct(
        args0: string,
        args1?: bigint
    ): void {
        args1 ??= 1n;
        let i: bigint = 0n;
        while (i < _orders.length) {
            let order: OrderData = _orders.at(Number(i))!;
            if (order.product.name === args0) {
                order.amount -= Number(args1);
                if (order.amount < 0) {
                    _orders.splice(Number(i), 1);
                }
                return;
            }
            i += 1n;
        }
        return;
    }

    function empty(): void;
    function empty(name: string): void;
    function empty(
        args0?: string
    ): void {
        if (args0) {
            let i: bigint = 0n;
            while (i < _orders.length) {
                let order: OrderData = _orders[Number(i)];
                if (order.product.name === args0) {
                    _orders.splice(Number(i), 1);
                }
                i += 1n;
            }
            return;
        }
        _orders = [];
        return;
    }
}