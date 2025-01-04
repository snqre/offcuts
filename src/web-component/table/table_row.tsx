import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";

export type TableRowProps = 
    & ComponentPropsWithRef<"div">
    & {};

export function TableRow(props: TableRowProps): ReactNode {
    let { style, children, ... more } = props;
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
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