import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";

export type TableCaptionProps =
    & ComponentPropsWithRef<"div">
    & {};

export function TableCaption(props: TableCaptionProps): ReactNode {
    let { style, children, ... more } = props;
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2em",
                fontWeight: "normal",
                fontFamily: Theme.FONT_0,
                color: Theme.DK_COLOR,
                ... style
            }}
            { ... more }>
            { children }
        </div>
    </>;
}