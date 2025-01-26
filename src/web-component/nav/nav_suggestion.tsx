import { type ReactNode } from "react";
import { type ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";
import { Client } from "@web-client";
import { Link } from "@web-component";

export type NavSuggestionProps =
    & Omit<ComponentPropsWithRef<"div">, "children">
    & {
    name: string;
    price: number;
    stock: number;
};

export function NavSuggestion(props: NavSuggestionProps) {
    let { name, price, stock, style, ...more } = props;
    
    return <>
        <Link
            style={{
                display: "contents"
            }}
            to="/product">
            <div
                onClick={
                    async () => await Client.setProductFocus(name)
                }
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    height: "auto",
                    flex: 1,
                    padding: 8,
                    cursor: "pointer",
                    ...style
                }}
                { ...more }>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        flex: 1,
                        color: Theme.DK_COLOR,
                        fontSize: "1em",
                        fontWeight: "normal",
                        fontFamily: Theme.FONT_1
                    }}>
                    { name }
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        flex: 1,
                        color: Theme.DK_COLOR,
                        fontSize: "1em",
                        fontWeight: "normal",
                        fontFamily: Theme.FONT_1
                    }}>
                    £{ price.toFixed(2).toString() }
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        flex: 1,
                        color: Theme.DK_COLOR,
                        fontSize: "1em",
                        fontWeight: "normal",
                        fontFamily: Theme.FONT_1
                    }}>
                    { stock.toFixed(0) } left
                </div>
            </div>
        </Link>
    </>;
}