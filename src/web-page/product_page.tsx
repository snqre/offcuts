import type { ReactNode } from "react";
import type { ResponsiveAnchorPageProps } from "@web-component";
import { ResponsiveAnchorPage } from "@web-component";
import { ProductData } from "@common";

export type ProductPageNativeProps = {
    products: Array<ProductData>;
};

export type ProductPageProps = 
    & ResponsiveAnchorPageProps
    & ProductPageNativeProps;

export function ProductPage(props: ProductPageProps): ReactNode {
    let { style, ... more } = props;

    /** @constructor */ {
        return <>
            <ResponsiveAnchorPage>
                
            </ResponsiveAnchorPage>
        </>;
    }
}