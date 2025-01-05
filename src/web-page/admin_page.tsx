import type { ReactNode } from "react";
import { ResponsiveAnchorPage } from "@web-component";
import { Table } from "@web-component";
import { Theme } from "@web-constant";
import { Form } from "@web-component";
import { FormButton } from "@web-component";
import { FormInput } from "@web-component";
import { Cli } from "@web-component";
import { ProductData } from "@common";
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
                            if (args[1] === "help") {
                                return `
                                    Commands:\n
                                    -help 
                                `;
                            }

                            return "Hello World"
                        }
                    }/>
            </div>
        </ResponsiveAnchorPage>
    </>;
}