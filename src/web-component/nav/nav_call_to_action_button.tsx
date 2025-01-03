import * as React from "react";
import * as Constant from "@web-constant";

export type NavCallToActionButtonProps = {
    children: React.ReactNode;
};

export function NavCallToActionButton(props: NavCallToActionButtonProps): React.ReactNode {
    let { children } = props;
    let wrapper$: React.ComponentPropsWithRef<"button"> = {
        style: {
            all: "unset",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            pointerEvents: "auto",
            cursor: "pointer",
            fontSize: "0.75em",
            fontWeight: "normal",
            fontFamily: Constant.Theme.FONT_0,
            boxShadow: Constant.Theme.SHADOW,
            color: Constant.Theme.LT_COLOR,
            background: Constant.Theme.DK_COLOR
        }
    };

    return <>
        <button { ... wrapper$ }>{ children }</button>
    </>;
}