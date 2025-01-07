import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { NavCallToActionButtonStar } from "@web-component";
import { NavButton } from "@web-component";
import { Link } from "@web-component";
import { Theme } from "@web-constant";

export type NavCallToActionButtonNativeProps = {
    to: string;
};

export type NavCallToActionButtonProps = 
    & ComponentPropsWithRef<"div">
    & NavCallToActionButtonNativeProps
    & {};

export function NavCallToActionButton(props: NavCallToActionButtonProps): ReactNode {
    let { to, style, children, ... more } = props;

    /** @constructor */ {
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                    position: "relative",
                    ... style
                }}
                { ... more }>
                <NavCallToActionButtonStar
                    style={{
                        position: "absolute",
                        right: "100%",
                        bottom: "100%"
                    }}/>
                <Link
                    to={ to }>
                    <NavButton
                        style={{
                            background: Theme.DK_COLOR
                        }}
                        childStyle={{
                            color: Theme.LT_COLOR
                        }}>
                        { children }
                    </NavButton>
                </Link>
            </div>
        </>;
    }
}