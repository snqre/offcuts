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
                            if (args[0] === "poke") {
                                return "Hello World";
                            }
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
                                        tags: ["Test"]
                                    });
                                    await Server.listProduct(password, product);
                                    return "PRODUCT_LISTED_OK"
                                }
                                catch (e) {
                                    return String(e);
                                }
                            }
                            else if (args[0] === "products") {
                                try {
                                    return toString((await Server.products()));
                                }
                                catch (e) {
                                    return String(e);
                                }
                            }

                            return "UNRECOGNIZED_COMMAND";
                        }
                    }/>
            </div>
        </ResponsiveAnchorPage>
    </>;
}