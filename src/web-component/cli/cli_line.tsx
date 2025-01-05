import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";

export type CliLineProps =
    & ComponentPropsWithRef<"div">
    & {};

export function CliLine(props: CliLineProps): ReactNode {
    let { style, children, ... more } = props;

    /** @constructor */ {
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 5,
                    width: "100%",
                    height: "auto",
                    flexGrow: 1
                }}
                { ... more }>
                { children }
            </div>
        </>;
    }
}