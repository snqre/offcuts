import { NavCallToActionButtonStar } from "@web-component";
import * as React from "react";
import * as Constant from "@web-constant";

export type NavCallToActionButtonProps = {
    children: React.ReactNode;
};

export function NavCallToActionButton(props: NavCallToActionButtonProps): React.ReactNode {
    let { children } = props;
    let wrapper$: React.ComponentPropsWithRef<"div"> = {
        style: {
            all: "unset",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "auto",
            gap: 10,
            position: "relative"
        }
    };
    let leftWrapper$: React.ComponentPropsWithRef<"div"> = {
        style: {
            all: "unset",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            position: "absolute",
            left: -40,
            top: -10
        }
    };
    let rightWrapper$: React.ComponentPropsWithRef<"div"> = {
        style: {
            all: "unset",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        }
    };
    let button$: React.ComponentPropsWithRef<"button"> = {
        style: {
            all: "unset",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "auto",
            padding: 10,
            cursor: "pointer",
            fontSize: "0.75em",
            fontWeight: "normal",
            fontFamily: Constant.Theme.FONT_1,
            boxShadow: Constant.Theme.SHADOW,
            background: Constant.Theme.DK_COLOR,
            color: Constant.Theme.LT_COLOR,
            borderRadius: 5
        }
    };

    return <>
        <div { ... wrapper$ }>
            <div { ... leftWrapper$ }><NavCallToActionButtonStar/></div>
            <div { ... rightWrapper$ }><button { ... button$ }>{ children }</button></div>
        </div>
    </>;
}