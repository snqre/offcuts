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
                <Cli/>
                
                <Form>
                    <FormInput 
                        type="text"
                        placeholder="Paint"/>
                    <FormInput
                        type="text"
                        placeholder="Price"/>
                    <FormInput
                        type="text"
                        placeholder="Stock"/>
                    <FormInput
                        type="text"
                        placeholder="Tags"/>
                    <FormButton
                        onClick={
                            () => {

                            }
                        }>
                        Confirm
                    </FormButton>
                </Form>

                <Table
                    caption={ "Products" }
                    headings={ ["Product", "Price", "Stock", "Tags"] }
                    contents={
                        [
                            ... products[0].map(product => [product.name, product.price, product.stock, product.tags])
                        ]
                    }
                    style={{
                        width: "100%",
                        height: "auto",
                        flexGrow: 1
                    }}/>
            </div>
        </ResponsiveAnchorPage>
    </>;
}