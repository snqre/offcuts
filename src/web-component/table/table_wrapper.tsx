import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";

export type TableWrapperProps =
    & ComponentPropsWithRef<"div">
    & {}

export function TableWrapper(props: TableWrapperProps): ReactNode {
    let { style, children, ... more } = props;
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                gap: 20,
                overflowX: "hidden",
                overflowY: "scroll"
            }}
            { ... more }>
            { children }
        </div>
    </>;
}