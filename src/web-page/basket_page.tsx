import type { ReactNode } from "react";
import { ResponsiveAnchorPage } from "@web-component";
import { Table } from "@web-component";
import { TableItem } from "@web-component";
import { SymbolButton } from "@web-component";
import { CheckoutButton } from "@web-component";
import { Client } from "@web-client";
import { Theme } from "@web-constant";
import { useState } from "react";
import { useEffect } from "react";

export function BasketPage(): ReactNode {
    let [cost, setCost] = useState<number>(0);

    useEffect(() => {
        _updateCost();
        return;
    }, []);

    /***/ {
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
                            width: "100%",
                            height: "100%",
                            flex: 2,
                            overflowX: "scroll",
                            overflowY: "auto"
                        }}>
                        <Table
                            style={{
                                width: 600,
                                height: "100%",
                                justifyContent: "start"
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
                                        order.amount,
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
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            flex: 1
                        }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                alignItems: "center",
                                fontSize: "1em",
                                fontWeight: "normal",
                                fontFamily: Theme.FONT_1
                            }}>
                            Total: £{ cost.toPrecision(3) }
                        </div>
                        <CheckoutButton/>
                    </div>
                </div>
            </ResponsiveAnchorPage>
        </>;
    }
    
    function _updateCost(): void {
        let cost: number = Client.shoppingCartCost();
        setCost(cost);
        return;
    }
}