import type { ReactNode } from "react";
import { ResponsiveAnchorPage } from "@web-component";
import { Table } from "@web-component";
import { TableItem } from "@web-component";
import { SymbolButton } from "@web-component";
import { Client } from "@web-client";
import { Theme } from "@web-constant";

export function BasketPage(): ReactNode {
    return <>
        <ResponsiveAnchorPage>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        height: "100%",
                        overflowX: "scroll",
                        overflowY: "auto"
                    }}>
                    <Table
                        style={{
                            width: 600,
                            height: "100%"
                        }}
                        caption={
                            "Checkout"
                        }
                        headings={
                            ["Product", "Price", "Amount", "Edit"]
                        }
                        contents={
                            [...Client.shoppingCartOrders().map(order => {
                                return [
                                    order.product.name,
                                    order.product.price,
                                    order.product.stock,
                                    <>
                                        <TableItem
                                            style={{
                                                gap: 10
                                            }}>
                                            <SymbolButton
                                                onClick={
                                                    () => Client.removeProductFromShoppingCart(order.product.name)
                                                }>
                                                -
                                            </SymbolButton>
                                            <SymbolButton
                                                onClick={
                                                    () => Client.addProductToShoppingCart(order.product.name)
                                                }>
                                                +
                                            </SymbolButton>
                                        </TableItem>
                                    </>
                                ]
                            })]
                        }/>
                </div>
            </div>
        </ResponsiveAnchorPage>
    </>;
}