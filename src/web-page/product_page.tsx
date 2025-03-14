/// @ts-ignore
import placeholderImage from "../web/public/img/placeholder_product.jpg";

import {type ReactNode} from "react";
import {type State} from "@web-util";
import {ResponsiveAnchorPage} from "@web-component";
import {ProductData} from "@common";
import {Theme} from "@web-constant";

export type ProductPageProps = {
    selectedProduct: State<ProductData | null>;
    tags: State<Array<string>>;
};

export function ProductPage(props: ProductPageProps): ReactNode {
    return <>
        <ResponsiveAnchorPage
            tags={props.tags}> {
            props.selectedProduct[0] === null ? <>
                <ProductPageContentWithNoProduct/>
            </> : <>
                <ProductPageContent 
                    selectedProduct={props.selectedProduct}/>
            </>
        } 
        </ResponsiveAnchorPage>
    </>;
}


export function ProductPageContentWithNoProduct(): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                background: Theme.LT_COLOR,
                color: Theme.DK_COLOR,
                fontSize: "1em",
                fontWeight: "normal",
                fontFamily: Theme.FONT_1,
            }}>
            Product Not Available
        </div>
    </>;
}


export type ProductPageContentProps = {
    selectedProduct: State<ProductData | null>;
};

export function ProductPageContent({selectedProduct: product}: ProductPageContentProps): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "100%",
                flex: 1,
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
                    backgroundImage: `url(${product[0]?.imageUrl || placeholderImage})`,
                    backgroundSize: "cover",
                    backgroundPositionX: "center",
                    backgroundPositionY: "center",
                    backgroundRepeat: "no-repeat",
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
                        fontSize: "1em",
                        fontWeight: "normal",
                        fontFamily: Theme.FONT_1,
                    }}>
                    {product[0]?.name || "Product Name Unavailable"}
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    height: "100%",
                    flex: 1,
                    padding: 20
                }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        padding: 10,
                        height: "100%",
                        minWidth: "50%",
                    }}>
                    <div
                        style={{
                            fontSize: "1em",
                            fontWeight: "normal",
                            fontFamily: Theme.FONT_1,
                        }}>
                        Description
                    </div>
                    <div>
                        {product[0]?.description}
                    </div>
                </div>
            </div>
        </div>
    </>;
}