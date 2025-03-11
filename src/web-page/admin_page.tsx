import type { ReactNode } from "react";
import { ResponsiveAnchorPage } from "@web-component";
import { Table } from "@web-component";
import { Theme } from "@web-constant";
import { Form } from "@web-component";
import { FormButton } from "@web-component";
import { FormInput } from "@web-component";
import { Cli } from "@web-component";
import { ProductDataSchema } from "@common";
import { ProductData } from "@common";
import { Server } from "@web-server";
import { bigint, z as ZodValidator } from "zod";
import { toString, type AsyncFunction } from "reliq";
import { useState } from "react";

export function AdminPage(): ReactNode {
    let products = useState<Array<ProductData>>([]);
    
    return <>
        <ResponsiveAnchorPage>
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
                                    "help": async () => {
                                        return [];
                                    },
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
            </div>
        </ResponsiveAnchorPage>
    </>;
}