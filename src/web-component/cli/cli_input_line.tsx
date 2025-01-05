import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { CliLine } from "@web-component";

export type CliInputLineProps =
    & ComponentPropsWithRef<"input">
    & {};

export function CliInputLine(props: CliInputLineProps): ReactNode {
    let { style, ... more } = props;

    /** @constructor */ {
        return <>
            <CliLine>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        flexGrow: 1
                    }}>
                    <input
                        style={{
                            all: "unset",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            width: "100%",
                            height: "auto",
                            flexGrow: 1
                        }}
                        { ... more }/>
                </div>
            </CliLine>
        </>;
    }
}