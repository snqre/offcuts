import type { ReactNode } from "react";
import type { CardProps } from "@web-component";
import type { CSSProperties as Style } from "react";
import { Card } from "@web-component";
import { ProductData } from "@common";
import { Theme } from "@web-constant";

export type ProductCardNativeProps = {
    childCaption: ReactNode;
    childImage: ReactNode;
    childPrice: ReactNode;
    childStock: ReactNode;
    childDescription: ReactNode;
};

export type ProductCardProps = 
    & Omit<CardProps, "children"> 
    & ProductCardNativeProps;

export function ProductCard(props: ProductCardProps): ReactNode {
    let { 
        childCaption,
        childImage,
        childPrice,
        childStock,
        childDescription, 
        style, ... more } = props;

    /** @constructor */ {
        return <>
            <Card
                style={{
                    ... style
                }}
                { ... more }>
                { /** Caption */ }
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        flex: 1,
                        fontSize: "1em",
                        fontWeight: "normal",
                        fontFamily: Theme.FONT_1
                    }}>
                    { childCaption }
                </div>
                { /** Image */ }
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        flex: 1
                    }}>
                    { childImage }
                </div>
            </Card>
        </>;
    }
}