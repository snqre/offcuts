import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";

export type FormProps =
    & ComponentPropsWithRef<"div">
    & {};

export function Form(props: FormProps): ReactNode {
    let { style, children, ... more } = props;

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                fontSize: "1em",
                fontWeight: "normal",
                fontFamily: Theme.FONT_1,
                color: Theme.DK_COLOR,
                boxShadow: Theme.SHADOW,
                padding: 20,
                borderRadius: 5,
                gap: 20,
                background: "white",
                ... style
            }}
            { ... more }>
            { children }
        </div>
    </>;
}