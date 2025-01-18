import { UserData } from "@common";
import { OrderData } from "@common";
import { ClientProduct } from "@web-client";
import { ClientShoppingCart } from "@web-client";
import { ClientShowRoomTag } from "@web-client";
import { ClientUserDriver } from "@web-client";

export type Client = {
    cached(): boolean;
    cache(): UserData | null;
    tagFocus(): string | null;
    productFocus(): string | null;
    shoppingCartOrders(): ReadonlyArray<OrderData>;
    shoppingCartCost(): number;
    setTagFocus(tag: string): void;
    setProductFocus(name: string): Promise<void>;
    addProductToShoppingCart(name: string): Promise<void>;
    addProductToShoppingCart(name: string, amount: bigint): Promise<void>;
    removeProductFromShoppingCart(name: string): void;
    removeProductFromShoppingCart(name: string, amount: bigint): void;
    signIn(): Promise<UserData>;
    signIn(username: string, password: string): Promise<UserData>;
    signUp(user: UserData): Promise<void>;
};

export const Client: Client = ((_cart: ClientShoppingCart, _tag: ClientShowRoomTag, _product: ClientProduct, _user: ClientUserDriver) => {
    /** @constructor */ {
        return {
            cached,
            cache,
            tagFocus,
            productFocus,
            shoppingCartOrders,
            shoppingCartCost,
            setTagFocus,
            setProductFocus,
            addProductToShoppingCart,
            removeProductFromShoppingCart,
            signIn,
            signUp
        };
    }

    function cached(): boolean {
        return !_user.empty();
    }

    function cache(): UserData | null {
        return _user.cache();
    }

    function tagFocus(): string | null {
        return _tag.get();
    }

    function productFocus(): string | null {
        return _product.get();
    }

    function shoppingCartOrders(): ReadonlyArray<OrderData> {
        return _cart.orders();
    }

    function shoppingCartCost(): number {
        return _cart.cost();
    }

    function setTagFocus(tag: string): void {
        return _tag.set(tag);
    }

    async function setProductFocus(name: string): Promise<void> {
        return await _product.set(name);
    }

    async function addProductToShoppingCart(name: string): Promise<void>;
    async function addProductToShoppingCart(name: string, amount: bigint): Promise<void>;
    async function addProductToShoppingCart(
        args0: string,
        args1?: bigint
    ): Promise<void> {
        if (args1) return await _cart.addProduct(args0, args1);
        else return await _cart.addProduct(args0);
    }

    function removeProductFromShoppingCart(name: string): void;
    function removeProductFromShoppingCart(name: string, amount: bigint): void;
    function removeProductFromShoppingCart(
        args0: string,
        args1?: bigint
    ): void {
        if (args1) return _cart.removeProduct(args0, args1);
        else return _cart.removeProduct(args0);
    }

    async function signIn(): Promise<UserData>;
    async function signIn(username: string, password: string): Promise<UserData>;
    async function signIn(
        args0?: string,
        args1?: string
    ): Promise<UserData> {
        if (args0 && args1) return await _user.signIn(args0, args1);
        else return await _user.signIn();
    }

    async function signUp(user: UserData): Promise<void> {
        return await _user.signUp(user);
    }
})(ClientShoppingCart(), ClientShowRoomTag(null), ClientProduct(null), ClientUserDriver());