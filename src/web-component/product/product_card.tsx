import { type ReactNode } from "react";
import { type CardProps } from "@web-component";
import { SymbolButton } from "@web-component";
import { Link } from "@web-component";
import { ProductData } from "@common";
import { Card } from "@web-component";
import { Client } from "@web-client";
import { Theme } from "@web-constant";
import { useState } from "react";
import { useEffect } from "react";

// @ts-ignore
import placeholderImage from "../../web/public/img/placeholder_product.jpg";
import type { State } from "@web-util";

export type ProductCardProps = 
    & Omit<CardProps, "children"> 
    & {
    product: ProductData;
    selectedProduct: State<ProductData | null>;
};

export function ProductCard(props: ProductCardProps): ReactNode {
    let { 
        product,
        style, 
        ... more 
    } = props;
    let [shoppingCartAmount, setShoppingCartAmount] = useState<number>(0);

    useEffect(() => {
        _updateAmount();
        return;
    }, []);

    /** @constructor */ {
        return <>
            <Card
                style={{
                    justifyContent: "center",
                    width: 300,
                    aspectRatio: 1 / 1,
                    gap: 10,
                    borderRadius: 5,
                    borderBottomWidth: 5,
                    borderBottomColor: Theme.DK_COLOR,
                    borderBottomStyle: "solid",
                    ... style
                }}
                { ... more }>
                { /** Image */ }
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        flex: 4
                    }}>
                    <Link
                        onClick={() => props.selectedProduct[1](props.product)}
                        style={{
                            display: "contents"
                        }}
                        to={
                            "/product"
                        }>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundImage: `url(${ product.imageUrl ?? placeholderImage })`,
                                backgroundSize: "cover",
                                backgroundPositionX: "center",
                                backgroundPositionY: "center",
                                backgroundRepeat: "no-repeat",
                                borderRadius: 10,
                                cursor: "pointer",
                                width: "100%",
                                height: "100%",
                                flex: 4
                            }}>
                            <div
                                style={{

                                }}>

                            </div>
                        </div>
                    </Link>
                </div>
                { /** Header */ }
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        flex: 1,
                        paddingLeft: 10,
                        paddingRight: 10
                    }}>
                    { /** Metadata */ }
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: 10
                        }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "1.25em",
                                fontWeight: "normal",
                                fontFamily: Theme.FONT_1
                            }}>
                            { product.name }
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                fontSize: "0.75em",
                                fontWeight: "normal",
                                fontFamily: Theme.FONT_1,
                                opacity: 0.75
                            }}>
                            £{ product.price.toPrecision(3) }
                        </div>
                    </div>
                    { /** Stock */ }
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "0.75em",
                            fontWeight: "normal",
                            fontFamily: Theme.FONT_1,
                            opacity: 0.75
                        }}>
                        { product.stock } left
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        paddingLeft: 10,
                        paddingRight: 10,
                        flex: 1,
                        gap: 10
                    }}>
                    <SymbolButton
                        onClick={
                            async () => {
                                await Client.addProductToShoppingCart(product.name);
                                _updateAmount();
                                return;
                            }
                        }
                        inverse
                        style={{
                            width: 40,
                            aspectRatio: 1 / 1,
                            cursor: "pointer"
                        }}>
                        +
                    </SymbolButton>
                    <SymbolButton
                        onClick={
                            () => {
                                Client.removeProductFromShoppingCart(product.name);
                                _updateAmount();
                                return;
                            }
                        }
                        style={{
                            width: 40,
                            aspectRatio: 1 / 1,
                            cursor: "pointer"
                        }}>
                        -
                    </SymbolButton>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "end",
                            alignItems: "center",
                            fontSize: "0.75em",
                            fontWeight: "normal",
                            fontFamily: Theme.FONT_1,
                            width: "100%",
                            height: "auto",
                            flex: 1,
                            opacity: 0.75
                        }}>
                        { shoppingCartAmount } in your basket
                    </div>
                </div>
            </Card>
        </>;
    }

    function _updateAmount(): void {
        let amount: number = Client
            .shoppingCartOrders()
            .filter(order => order.product.name === product.name)
            .at(0)
            ?.amount || 0;
        setShoppingCartAmount(amount);
        return;
    }
}