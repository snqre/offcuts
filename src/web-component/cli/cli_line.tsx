import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";

export type CliLineProps =
    & ComponentPropsWithRef<"div">
    & {};

export function CliLine(props: CliLineProps): ReactNode {
    /** @constructor */ {
        let { style, children, ... more } = props;
        
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    padding: 5
                }}
                { ... more }>
                { children }
            </div>
        </>;
    }
}