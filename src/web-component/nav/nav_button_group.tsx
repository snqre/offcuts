import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";

export type NavButtonGroupProps =
    & ComponentPropsWithRef<"div">
    & {};

export function NavButtonGroup(props: NavButtonGroupProps): ReactNode {
    let { style, children, ... more } = props;

    /** @constructor */ {
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    gap: 10,
                    ... style
                }}
                { ... more }>
                { children }
            </div>
        </>;
    }
}