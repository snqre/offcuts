import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";
import { ProductData } from "@common";
import { Server } from "@web-server";
import { useState } from "react";
import { useEffect } from "react";
import { get } from "fast-levenshtein";

// @ts-ignore
import icon from "../../web/public/icon/search.png";

export type NavSearchBarProps =
    & Omit<ComponentPropsWithRef<"div">, "children">
    & {};

export function NavSearchBar(props: NavSearchBarProps): ReactNode {
    let { style, ... more } = props;
    let [products, setProducts] = useState<Array<ProductData>>([]);
    let [toggled, setToggled] = useState<boolean>(false);
    let [input, setInput] = useState<string>("");
    let [suggestions, setSuggestions] = useState<Array<ProductData>>([]);

    useEffect(() => {
        _updateProducts();
        return;
    }, []);

    useEffect(() => {
        if (!_hasInput()) {
            _close();
            return;
        }
        _updateSuggestions();
        _open();
        return;
    }, [input]);

    /** @constructor */ {
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    width: "100%",
                    height: "auto",
                    flex: 1
                }}>
                { /** input-container */ }
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        boxShadow: Theme.SHADOW,
                        padding: 10,
                        flex: 1,
                        gap: 10,
                        ... style
                    }}
                    { ... more }>
                    { /** icon */ }
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundImage: `url(${ icon })`,
                            backgroundPositionX: "center",
                            backgroundPositionY: "center",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            width: 15,
                            aspectRatio: 1 / 1
                        }}/>
                    { /** input */ }
                    <input
                        value={ input }
                        onChange={
                            e => setInput(e.target.value)
                        }
                        style={{
                            all: "unset",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            width: "100%",
                            height: "auto",
                            flex: 1,
                            fontSize: "0.75em",
                            fontWeight: "normal",
                            fontFamily: Theme.FONT_1
                        }}/>
                </div>
                { toggled ? <>
                    { /** drop-down-container */ }
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "center",
                            position: "absolute",
                            top: "100%",
                            width: "100%",
                            height: "auto",
                            flex: 1,
                            boxShadow: Theme.SHADOW
                        }}>
                        { /** suggestion */ }
                        { suggestions.map(suggestion => <>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "auto",
                                    flex: 1,
                                    padding: 10,
                                    gap: 10
                                }}>
                                <div>{ suggestion.name }</div>
                                <div>{ suggestion.price }</div>
                                <div>{ suggestion.stock }</div>
                            </div>
                        </>) }
                    </div>
                </> : undefined }
            </div>
        </>;
    }
    
    function _hasInput(): boolean {
        return input.trim().length !== 0;
    }

    function _open(): void {
        setToggled(true);
        return;
    }

    function _close(): void {
        setToggled(false);
        return;
    }

    function _updateSuggestions(): void {
        let suggestions: Array<ProductData> = products
            .map(product => ({ ... product, score: get(input, product.name.toLowerCase()) }))
            .sort((x0, x1) => x0.score - x1.score)
            .slice(0, 10);
        setSuggestions(suggestions);
        return;
    }

    async function _updateProducts(): Promise<void> {
        let products: Array<ProductData> = await Server.products();
        setProducts(products);
        return;
    }
}