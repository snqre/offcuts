import type { ReactNode } from "react";
import { ResponsiveAnchorPage } from "@web-component";
import { Table } from "@web-component";
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
                        caption={ "Checkout" }
                        headings={ ["Product", "Price", "Amount"] }
                        contents={
                            [
                                ["Wallpaper", "£69.43", "12"],
                                ["Paint", "£30.00", "2"]
                            ]
                        }
                        style={{
                            width: 400,
                            height: "100%"
                        }}/>
                </div>
            </div>
        </ResponsiveAnchorPage>
    </>;
}