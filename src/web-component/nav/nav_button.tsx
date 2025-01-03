import * as React from "react";
import * as Constant from "@web-constant";

export type NavButtonProps = {
    children: React.ReactNode;
};

export function NavButton(props: NavButtonProps): React.ReactNode {
    let { children } = props;
    let wrapper$: React.ComponentPropsWithRef<"button"> = {
        style: {
            all: "unset",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "auto",
            cursor: "pointer",
            fontSize: "0.75em",
            fontWeight: "normal",
            fontFamily: Constant.Theme.FONT_0,
            boxShadow: Constant.Theme.SHADOW,
            color: Constant.Theme.DK_COLOR
        }
    };

    return <>
        <button { ... wrapper$ }>{ children }</button>
    </>;
}