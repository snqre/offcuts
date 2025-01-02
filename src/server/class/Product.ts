import { ProductData } from "@common";
import { require } from "reliq";

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
    increaseStock(amount: bigint): void;
    decreaseStock(amount: bigint): void;
    toData(): ProductData;
};

export function Product(_name: string, _price: number, _stock: bigint): Product {
    /** @constructor */ {
        require<ProductError>(_name.trim().length !== 0, "PRODUCT.ERR_INVALID_NAME");
        require<ProductError>(_price >= 0n, "PRODUCT.ERR_PRICE_BELOW_ZERO");
        require<ProductError>(_price <= Number.MAX_SAFE_INTEGER, "PRODUCT.ERR_PRICE_ABOVE_MAX_SAFE_INTEGER");
        require<ProductError>(_stock >= 0n, "PRODUCT.ERR_STOCK_BELOW_ZERO");
        return {
            name,
            price,
            stock,
            increaseStock,
            decreaseStock,
            toData
        };
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
        require<ProductError>(amount >= 0n, "PRODUCT.ERR_AMOUNT_BELOW_ZERO");
        _stock += amount;
        return;
    }

    function decreaseStock(... [amount]: Parameters<Product["decreaseStock"]>): ReturnType<Product["decreaseStock"]> {
        require<ProductError>(amount >= 0n, "PRODUCT.ERR_AMOUNT_BELOW_ZERO");
        require<ProductError>(stock() - amount >= 0n, "PRODUCT.ERR_INSUFFICIENT_STOCK");
        _stock -= amount;
        return;
    }

    function toData(): ReturnType<Product["toData"]> {
        return ProductData({
            name: name(),
            price: price(),
            stock: Number(stock())
        });
    }
}

export function ProductFromData(_data: Readonly<ProductData>): Product {
    let _name: string;
    let _price: number;
    let _stock: bigint;

    /** @constructor */ {
        let n: number = _data.stock;
        _name = _data.name;
        _price = _data.price;
        _stock = BigInt(n);
        return {
            name,
            price,
            stock,
            increaseStock,
            decreaseStock,
            toData
        };
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
        require<ProductError>(amount >= 0n, "PRODUCT.ERR_AMOUNT_BELOW_ZERO");
        _stock += amount;
        return;
    }

    function decreaseStock(... [amount]: Parameters<Product["decreaseStock"]>): ReturnType<Product["decreaseStock"]> {
        require<ProductError>(amount >= 0n, "PRODUCT.ERR_AMOUNT_BELOW_ZERO");
        require<ProductError>(stock() - amount >= 0n, "PRODUCT.ERR_INSUFFICIENT_STOCK");
        _stock -= amount;
        return;
    }

    function toData(): ReturnType<Product["toData"]> {
        return ProductData({
            name: name(),
            price: price(),
            stock: Number(stock())
        });
    }
}