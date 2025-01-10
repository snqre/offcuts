import type { ReactNode } from "react";
import type { ResponsiveAnchorPageProps } from "@web-component";
import { ResponsiveAnchorPage } from "@web-component";
import { ProductData } from "@common";

export type ProductPageProps = 
    & ResponsiveAnchorPageProps;

export function ProductPage(props: ProductPageProps): ReactNode {
    let { style, ... more } = props;

    /** @constructor */ {
        return <>
            <ResponsiveAnchorPage>
                
            </ResponsiveAnchorPage>
        </>;
    }
}