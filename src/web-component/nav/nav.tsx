// @ts-ignore
import { default as logo } from "./public/img/Logo.png";

import { NavButton } from "@web-component";
import { NavCallToActionButton } from "@web-component";
import * as React from "react";

export type NavProps = {
    categories: Array<React.ReactNode>;
};

export function Nav(props: NavProps): React.ReactNode {
    let { categories } = props;
    let container$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingTop: 30,
            paddingBottom: 30,
            gap: 40
        }
    };
    let logo$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${ logo })`,
            backgroundSize: "contain",
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            backgroundRepeat: "no-repeat",
            width: 150,
            aspectRatio: 2 / 1
        }
    };

    return <>
        <div { ... container$ }>
            <div { ... logo$ }/>
            <NavCallToActionButton>For You</NavCallToActionButton>
            
            
            <NavButton>Backet</NavButton>
        </div>
    </>;
}