import type { ReactNode } from "react";
import type { ResponsiveAnchorPageProps } from "@web-component";
import { ResponsiveAnchorPage } from "@web-component";
import { ProductData } from "@common";
import { Client } from "@web-client";
import { Server } from "@web-server";
import { useState } from "react";
import { useEffect } from "react";
/// @ts-ignore
import placeholderImage from "../web/public/img/placeholder_product.jpg";
import { Theme } from "@web-constant";

export type ProductPageProps = 
    & ResponsiveAnchorPageProps;

export function ProductPage(props: ProductPageProps): ReactNode {
    let { style, ... more } = props;
    let [product, setProduct] = useState<ProductData | null>(null);

    useEffect(() => {
        (async () => {
            let name: string | null = Client.productFocus();
            if (name === null) {
                console.error("No product focus available.");
                return;
            };
            let products: Array<ProductData> = (await Server.products(name));
            let product: ProductData | null = products.at(0) || null;
            if (product === null) {
                console.error("No product for product focus available.");
                return;
            }
            setProduct(product);
            return;
        })();
        return;
    }, []);

    /** @constructor */ {
        return <>
            <ResponsiveAnchorPage>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
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
                            alignItems: "end",
                            width: "100%",
                            height: "100%",
                            flex: 1,
                            padding: 20,
                            borderRadius: 10,
                            backgroundImage: `url(${ product?.imageUrl || placeholderImage })`,
                            backgroundSize: "cover",
                            backgroundPositionX: "center",
                            backgroundPositionY: "center",
                            backgroundRepeat: "no-repeat"
                        }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: 10,
                                borderRadius: 5,
                                background: Theme.LT_COLOR,
                                color: Theme.DK_COLOR,
                                fontSize: "1em",
                                fontWeight: "normal",
                                fontFamily: Theme.FONT_1,
                                cursor: "pointer"
                            }}>
                            { product?.name }
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            flex: 1,
                            padding: 20
                        }}>
                        
                    </div>
                </div>
            </ResponsiveAnchorPage>
        </>;
    }
}