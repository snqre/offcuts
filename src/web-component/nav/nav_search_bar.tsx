import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";
import { get } from "fast-levenshtein";

// @ts-ignore
import icon from "../../web/public/icon/search.png";

export type NavSearchBarProps =
    & Omit<ComponentPropsWithRef<"div">, "children">
    & {};

export function NavSearchBar(props: NavSearchBarProps): ReactNode {
    let { style, ... more } = props;

    /** @constructor */ {
        return <>
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
                <input
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
        </>;
    }
}