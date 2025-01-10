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
    let [rows, setRows] = useState<Array<Array<ProductData>>>([]);
    let [rowsLength, setRowsLength] = useState<number>(4);

    useEffect(() => {
        setTag((Client.tagFocus()));
        return;
    }, []);

    useEffect(() => {
        let rows: Array<Array<ProductData>> = [];
        let i: number = 0;
        while (i < products.length) {
            rows.push(products.slice(i, i + rowsLength));
            i ++;
        }
        setRows(rows);
        return;
    }, [products, rowsLength]);

    useEffect(() => {
        (async () => {
            if (tag) {
                let map: Map<string, Array<ProductData> | undefined> = await Server.sortedProducts();
                let products: Array<ProductData> | undefined = map.get(tag);
                if (products) {
                    setProducts(products);
                    return;
                }
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
                <div>
                    {
                        rows.map(row =>
                            <div>
                                {
                                    row.map(product =>
                                        <ProductCard
                                            childCaption={
                                                <>{ product.name }</>
                                            }
                                            childDescription={
                                                <>{ }</>
                                            }
                                            childPrice={
                                                <>{ product.price }</>
                                            }
                                            childStock={
                                                <>{ product.stock }</>
                                            }
                                            childImage={
                                                <>{ product.imageUrl }</>
                                            }/>
                                    )
                                }
                            </div>
                        )
                    }
                </div>
            </ResponsiveAnchorPage>
        </>;
    }
}