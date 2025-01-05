import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";

export type FormButtonProps =
    & ComponentPropsWithRef<"button">
    & {};

export function FormButton(props: FormButtonProps): ReactNode {
    let { style, children, ... more } = props;

    return <>
        <button
            style={{
                all: "unset",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
                fontSize: "1em",
                fontWeight: "normal",
                fontFamily: Theme.FONT_0,
                color: Theme.LT_COLOR,
                boxShadow: Theme.SHADOW,
                background: Theme.DK_COLOR,
                padding: 5,
                borderRadius: 5,
                width: "100%",
                height: "auto",
                flexGrow: 1,
                ... style
            }}
            { ... more }>
            { children }
        </button>
    </>;
}