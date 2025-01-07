import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";

export type CardProps = ComponentPropsWithRef<"div">;

export function Card(props: CardProps): ReactNode {
    let { style, children, ... more } = props;

    /** @constructor */ {
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    overflowX: "hidden",
                    overflowY: "auto",
                    padding: 10,
                    boxShadow: Theme.SHADOW,
                    ... style
                }}
                { ... more }>
                { children }
            </div>
        </>;
    }
}