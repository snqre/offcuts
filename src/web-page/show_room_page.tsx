import type { ReactNode } from "react";
import type { State } from "@web-util";
import { ResponsiveAnchorPage } from "@web-component";
import { ProductData } from "@common";
import { ProductCard } from "@web-component";
import { Server } from "@web-server";
import { useState } from "react";
import { useEffect } from "react";

export function ShowRoomPage(props: ShowRoomPage.Props): ReactNode {
    let products: State<Array<ProductData>> = useState<Array<ProductData>>([]);

    useEffect(() => {
        (async () => {
            if (props.selectedTag[0]) {
                let map: Map<string, Array<ProductData> | undefined> = (await Server.sortedProducts());
                let products$: Array<ProductData> | undefined = map.get(props.selectedTag[0]);
                if (products$) {
                    products[1](products$);
                    return;
                }
                products[1]([]);
                return;
            }
            let products$: Array<ProductData> = (await Server.products());
            products[1](products$);
            return;
        })();
        return;
    }, [props.selectedTag[0]]);

    return <>
        <ResponsiveAnchorPage
            tags={props.tags}>
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
                    gap: 20,
                }}> {
                    products[0].map(product => <>
                        <ProductCard
                            product={product}
                            selectedProduct={props.selectedProduct}/>
                    </>)
                }
            </div>
        </ResponsiveAnchorPage>
    </>;
}

export namespace ShowRoomPage {
    export type Props = 
        & Omit<ResponsiveAnchorPage.Props, "children">
        & {
        selectedTag: State<string | null>;
        selectedProduct: State<ProductData | null>;
        tags: State<Array<string>>;
    };
}