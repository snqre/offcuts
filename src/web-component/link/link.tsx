import type { ReactNode } from "react";
import type { LinkProps as ReactLinkProps } from "react-router-dom";
import { Link as ReactLink } from "react-router-dom";

export type LinkProps =
    & ReactLinkProps
    & {};

export function Link(props: LinkProps): ReactNode {
    let { style, children, ... more } = props;
    
    /** @constructor */ {
        return <>
            <Link
                style={{
                    all: "unset",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    ... style
                }}
                { ... more }>
                { children }
            </Link>
        </>;
    }
}