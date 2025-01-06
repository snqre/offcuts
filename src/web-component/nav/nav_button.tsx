import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";

export type NavButtonNativeProps = {
    icon?: string;
};

export type NavButtonProps =
    & ComponentPropsWithRef<"button">
    & NavButtonNativeProps
    & {};

export function NavButton(props: NavButtonProps): ReactNode {
    let { icon, style, children, ... more } = props;

    /** @constructor */ {
        return <>
            <button
                style={{
                    all: "unset",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    padding: 10,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#F1E4E4",
                    gap: 5,
                    ... style
                }}
                { ... more }>
                {
                    icon ?
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundImage: `url(${ icon })`,
                            backgroundPositionX: "center",
                            backgroundPositionY: "center",
                            backgroundSize: "contain",
                            backgroundRepeat: "no-repeat",
                            width: 15,
                            aspectRatio: 1 / 1
                        }}/> :
                    undefined
                }
                {
                    children ?
                    <div
                        style={{
                            fontSize: "0.75em",
                            fontWeight: "normal",
                            fontFamily: Theme.FONT_1,
                            color: Theme.DK_COLOR
                        }}>
                        { children }
                    </div> :
                    undefined
                }
            </button>
        </>;
    }
}