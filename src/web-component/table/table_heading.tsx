import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";

export type TableHeadingProps = 
    & ComponentPropsWithRef<"div">
    & {};

export function TableHeading(props: TableHeadingProps): ReactNode {
    let { style, children, ... more } = props;
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                fontSize: "1.25em",
                fontWeight: "normal",
                fontFamily: Theme.FONT_1,
                color: Theme.DK_COLOR,
                width: "100%",
                height: "auto",
                flexGrow: 1,
                paddingBottom: 10,
                ... style
            }}
            { ... more }>
            { children }
        </div>
    </>;
}