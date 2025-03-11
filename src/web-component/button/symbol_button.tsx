import {
    type ReactNode,
    type ComponentPropsWithRef
} from "react";
import {
    Theme
} from "@web-constant";

export type SymbolButtonProps = 
    & ComponentPropsWithRef<"div">
    & {
    inverse?: boolean;
};

export function SymbolButton(props: SymbolButtonProps): ReactNode {
    let {
        inverse,
        style,
        children,
        ... more
    } = props;
    
    /** @constructor */ {
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 10,
                    background: inverse ? Theme.DK_COLOR : Theme.LT_COLOR,
                    color: inverse ? Theme.LT_COLOR : Theme.DK_COLOR,
                    borderRadius: 5,
                    fontSize: "1em",
                    fontWeight: "normal",
                    fontFamily: Theme.FONT_1,
                    boxShadow: Theme.SHADOW,
                    cursor: "pointer",
                    ... style,
                }}
                { ... more }>
                { children }
            </div>
        </>;
    }
}