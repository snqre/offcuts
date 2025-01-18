import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";

export type TableBodyProps = 
    & ComponentPropsWithRef<"div">
    & {};

export function TableBody(props: TableBodyProps): ReactNode {
    let { style, children, ... more } = props;
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                fontSize: "1em",
                fontWeight: "normal",
                fontFamily: Theme.FONT_1,
                color: Theme.DK_COLOR,
                width: "100%",
                height: "auto",
                flexGrow: 1,
                ... style
            }}
            { ... more }>
            { children }
        </div>
    </>;
}