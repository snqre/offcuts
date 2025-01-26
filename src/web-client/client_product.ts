import { Server } from "@web-server";
import { require } from "reliq";

export type ClientProduct = {
    get(): string | null;
    set(name: string): Promise<void>;
};

export function ClientProduct(): ClientProduct;
export function ClientProduct(_name: string | null): ClientProduct;
export function ClientProduct(
    _args0?: string | null
): ClientProduct {
    let _name: string | null;

    /** @constructor */ {
        _name = _args0 ?? null;
        return { get, set };
    }

    function get(): string | null {
        return _name;
    }

    async function set(name: string): Promise<void> {
        require(await Server.hasProduct(name), "CLIENT_PRODUCT.ERR_PRODUCT_NOT_FOUND");
        _name = name;
        return;
    }
}