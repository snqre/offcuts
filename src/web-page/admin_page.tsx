import type { ReactNode } from "react";
import { ResponsiveAnchorPage, Terminal } from "@web-component";
import { Table } from "@web-component";
import { Theme } from "@web-constant";
import { Form } from "@web-component";
import { FormButton } from "@web-component";
import { FormInput } from "@web-component";
import { Cli } from "@web-component";
import { ProductDataSchema, UserData } from "@common";
import { ProductData } from "@common";
import { Server } from "@web-server";
import { bigint, z as ZodValidator } from "zod";
import { toString, type AsyncFunction, type Closure } from "reliq";
import { useState } from "react";
import type { State } from "@web-util";

export function AdminPage(props: AdminPage.Props): ReactNode {
    let products = useState<Array<ProductData>>([]);
    
    return <>
        <ResponsiveAnchorPage tags={props.tags}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    flexGrow: 1
                }}>
                <Terminal
                    style={{
                        width: 600,
                        height: 600,
                    }}
                    execute={async commands => {
                        if (commands.length === 0) return [];
                        let selector: string = commands[0];
                        let map: Record<string, Closure<[], Promise<Array<string>>>> = {
                            "help": async () => [
                                "tags",
                                "products_with_tag|tag",
                                "products",
                                "set_price|password|product_key|product_price",
                                "set_stock|password|product_key|product_stock",
                                "list_product_without_image_url_and_description|password|product_key|product_name|product_price|product_stock|product_tag",
                                "list_product_without_image_url|password|product_key|product_name|product_price|product_stock|product_tag|product_description",
                                "list_product|password|product_key|product_name|product_price|product_stock|product_tag|product_image_url|product_description",
                                "delist_product|password|product_key",
                                "users|password",
                            ],
                            "tags": async () => (await Server.tags()).map(tag => toString(tag)),
                            "products_with_tag": async () => {
                                let tag: string = commands[1];
                                let map: Map<string, Array<ProductData> | undefined> = (await Server.sortedProducts());
                                let products: Array<ProductData> | undefined = map.get(tag);
                                return products?.map(product => `${product.name}`) || [];
                            },
                            "products": async () => (await Server.products()).map(product => `${product.name}`),
                            "set_price": async () => {
                                let password: string = commands[1];
                                let productKey: string = commands[2];
                                let productPrice: number = Number(commands[3]);
                                (await Server.setPrice(password, productKey, productPrice));
                                return [];
                            },
                            "set_stock": async () => {
                                let password: string = commands[1];
                                let productKey: string = commands[2];
                                let productStock: bigint = BigInt(Number(commands[3]));
                                (await Server.setStock(password, productKey, productStock));
                                return [];
                            },
                            "list_product_without_image_url_and_description": async () => {
                                let password: string = commands[1];
                                let productKey: string = commands[2];
                                let productName: string = commands[3];
                                let productPrice: number = Number(commands[4]);
                                let productStock: number = Number(BigInt(commands[5]));
                                let productTag: string = commands[6];
                                let product: ProductData = ProductData({
                                    key: productKey,
                                    name: productName,
                                    price: productPrice,
                                    stock: productStock,
                                    tags: [productTag],
                                });
                                (await Server.listProduct(password, product));
                                return [];
                            },
                            "list_product_without_image_url": async () => {
                                let password: string = commands[1];
                                let productKey: string = commands[2];
                                let productName: string = commands[3]
                                let productPrice: number = Number(commands[4]);
                                let productStock: number = Number(BigInt(commands[5]));
                                let productTag: string = commands[6];
                                let productDescription: string = commands[7];
                                let product: ProductData = ProductData({
                                    key: productKey,
                                    name: productName,
                                    price: productPrice,
                                    stock: productStock,
                                    tags: [productTag],
                                    description: productDescription,
                                });
                                (await Server.listProduct(password, product));
                                return [];
                            },
                            "list_product": async () => {
                                let password: string = commands[1];
                                let productKey: string = commands[2];
                                let productName: string = commands[3];
                                let productPrice: number = Number(commands[4]);
                                let productStock: number = Number(BigInt(commands[5]));
                                let productTag: string = commands[6];
                                let productImageUrl: string = commands[7];
                                let productDescription: string = commands[8];
                                let product: ProductData = ProductData({
                                    key: productKey,
                                    name: productName,
                                    price: productPrice,
                                    stock: productStock,
                                    tags: [productTag],
                                    imageUrl: productImageUrl,
                                    description: productDescription,
                                });
                                (await Server.listProduct(password, product));
                                return [];
                            },
                            "delist_product": async () => {
                                let password: string = commands[1];
                                let productKey: string = commands[2];
                                (await Server.delistProduct(password, productKey));
                                return [];
                            },
                            "users": async () => {
                                let password: string = commands[1];
                                return (await Server.users(password)).map(user => `${user.username}`); 
                            },
                        };
                        try {
                            return (await map[selector]());
                        }
                        catch (e) {
                            return [toString(e)];
                        }
                    }}/>
            </div>
        </ResponsiveAnchorPage>
    </>;
}

export namespace AdminPage {
    export type Props = {
        tags: State<Array<string>>;
    };
}

/**
 

                <Cli
                    style={{
                        width: 600
                    }}
                    execute={
                        async args => {
                            try {
                                args.shift();
                                let command: string = args[0];
                                let map: Record<string, AsyncFunction<void, string | Array<string> | null>> = {
                                    "tags": async () => {
                                        let trail: string = args[1];
                                        if (trail === "->") {
                                            let tag: string = args[2];
                                            let map: Map<string, Array<ProductData> | undefined> = (await Server.sortedProducts());
                                            let products: Array<ProductData> | undefined = map.get(tag);
                                            if (products === undefined) {
                                                return `No products tagged ${ tag } were found.`;
                                            }
                                            let result: string = "";
                                            for (let product of products) {
                                                if (product) {
                                                    result += toString(product);
                                                }
                                            }
                                            return result;
                                        }
                                        return toString((await Server.tags()));
                                    },
                                    "products": async () => toString((await Server.products())),
                                    "set-price": async () => {
                                        let password: string = args[1];
                                        let productName: string = args[2];
                                        let productPrice: number = Number(args[3]);
                                        (await Server.setPrice(password, productName, productPrice));
                                        return "Ok";
                                    },
                                    "set-stock": async () => {
                                        let password: string = args[1];
                                        let productName: string = args[2];
                                        let productAmount: bigint = BigInt(args[3]);
                                        (await Server.setStock(password, productName, productAmount));
                                        return "Ok";
                                    },
                                    "list-product-without-image-url": async () => {
                                        let password: string = args[1];
                                        let productName: string = args[2];
                                        let productPrice: number = Number(args[3]);
                                        let productStock: number = Number(BigInt(args[4]));
                                        let productTag: string = args[5];
                                        let product: ProductData = ProductData({
                                            name: productName,
                                            price: productPrice,
                                            stock: productStock,
                                            tags: [productTag],
                                        });
                                        (await Server.listProduct(password, product));
                                        return "Ok";
                                    },
                                    "list-product": async () => {
                                        let password: string = args[1];
                                        let productName: string = args[2];
                                        let productPrice: number = Number(args[3]);
                                        let productStock: number = Number(BigInt(args[4]));
                                        let productTag: string = args[5];
                                        let productImageUrl: string = args[6];
                                        let product: ProductData = ProductData({
                                            name: productName,
                                            price: productPrice,
                                            stock: productStock,
                                            tags: [productTag],
                                            imageUrl: productImageUrl,
                                        });
                                        (await Server.listProduct(password, product));
                                        return "Ok";
                                    },
                                    "users": async () => {
                                        let password: string = args[1];
                                        let users = (await Server.users(password));
                                        let result: string = "";
                                        for (let user of users) {
                                            result += user.username + "\n";
                                        }
                                        return result;  
                                    },

                                };
                                return (await map[command]());
                            }
                            catch (e) {
                                return toString(e);
                            }
                        }
                    }/>

*/