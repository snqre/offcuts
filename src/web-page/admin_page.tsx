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
import { z as ZodValidator } from "zod";
import { toString } from "reliq";
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
                            args.shift();
                            if (args[0] === "help") {
                                return [
                                    "Commands",
                                    "tags",
                                    "tags -> *tag",
                                    "products",
                                    "list_product *admin_password *product_name *product_price *product_stock *product_tag",
                                    "delist_product *admin_password *product_name",
                                    "increase_stock *admin_password *product_name *amount_increased",
                                    "decrease_stock *admin_password *product_name *amount_decreased",
                                    "users *admin_password",
                                    "create_user *admin_password *username *user_password",
                                    "delete_user *admin_password *username"
                                ];
                            }

                            /** @command */
                            /** tags -> Test */
                            else if (args[0] === "tags" && args[1] === "->") {
                                try {
                                    let tag: string = args[2];
                                    let map: Map<string, Array<ProductData> | undefined> = await Server.sortedProducts();
                                    let products: Array<ProductData> | undefined = map.get(tag);
                                    if (products === undefined) return `No products with ${ tag } tag were found.`;
                                    let result: string = "";
                                    let i: bigint = 0n;
                                    while (i < products.length) {
                                        let product: ProductData | undefined = products[Number(i)];
                                        if (product) {
                                            result += toString(product);
                                        }
                                        i++;
                                    }
                                    return result; 
                                }
                                catch (e) {
                                    return toString(e);
                                }
                            }

                            /** @command */
                            /** tags */
                            else if (args[0] === "tags") {
                                try {
                                    return toString((await Server.tags()));
                                }
                                catch (e) {
                                    return toString(e);
                                }
                            }

                            /** @command */
                            else if (args[0] === "products") {
                                try {
                                    return toString((await Server.products()));
                                        
                                }
                                catch (e) {
                                    return toString(e);
                                }
                            }

                            /** @command */
                            else if (args[0] === "set-stock") {
                                try {
                                    let password: string = args[1];
                                    let name: string = args[2];
                                    let amount: bigint = BigInt(args[3]);
                                    await Server.setStock(password, name, amount);
                                    return "OK"; 
                                }
                                catch (e) {
                                    return toString(e);
                                }
                            }

                            /** @command */
                            /** list-product PASSWORD Brush 2.50 20 Test url */
                            else if (args[0] === "list-product") {
                                try {
                                    let passwordInput: string = args[1];
                                    let nameInput: string = args[2];
                                    let priceInput: string = args[3];
                                    let stockInput: string = args[4];
                                    let tagInput: string = args[5];
                                    let imageUrl: string = args[6];
                                    let password: string = passwordInput;
                                    let name: string = nameInput;
                                    let price: number = Number(priceInput);
                                    let stock: number = Number(stockInput);
                                    let product: ProductData = ProductData({
                                        name: name,
                                        price: price,
                                        stock: stock,
                                        tags: [tagInput]
                                    });
                                    await Server.listProduct(password, product);
                                    return "PRODUCT_LISTED_OK"
                                }
                                catch (e) {
                                    return String(e);
                                }
                            }

                            else if (args[0] === "users") {
                                
                            }

                            return "UNRECOGNIZED_COMMAND";
                        }
                    }/>
            </div>
        </ResponsiveAnchorPage>
    </>;
}