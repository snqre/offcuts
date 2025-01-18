import { type ReactNode } from "react";
import { type ResponsiveAnchorPageProps } from "@web-component";
import { ResponsiveAnchorPage } from "@web-component";
import { ProductData } from "@common";
import { ProductCard } from "@web-component";
import { Server } from "@web-server";
import { Client } from "@web-client";
import { useState } from "react";
import { useEffect } from "react";

export type ShowRoomPageProps = 
    & Omit<ResponsiveAnchorPageProps, "children">;

export function ShowRoomPage(props: ShowRoomPageProps): ReactNode {
    let { style, ... more } = props;
    let [tag, setTag] = useState<string | null>();
    let [products, setProducts] = useState<Array<ProductData>>([]);

    useEffect(() => {
        setTag((Client.tagFocus()));
        return;
    });

    useEffect(() => {
        (async () => {
            if (tag) {
                let map: Map<string, Array<ProductData> | undefined> = await Server.sortedProducts();
                let products: Array<ProductData> | undefined = map.get(tag);
                if (products) {
                    setProducts(products);
                    return;
                }
                setProducts([]);
                return;
            }
            let products: Array<ProductData> = await Server.products();
            setProducts(products);
            return;
        })();
        return;
    }, [tag]);

    /** @constructor */ {
        return <>
            <ResponsiveAnchorPage
                style={{
                    ... style
                }}
                { ... more }>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        flexWrap: "wrap",
                        width: "100%",
                        height: "100%",
                        flex: 1,
                        gap: 20
                    }}>
                    {
                        products.map(product => {
                            return <ProductCard
                                product={
                                    product
                                }/>
                        })
                    }
                </div>
            </ResponsiveAnchorPage>
        </>;
    }
}