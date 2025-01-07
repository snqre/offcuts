import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";
import { Link } from "@web-component";
import { Client } from "@web-client";
import { useState } from "react";

export type NavTagsDropDownButtonNativeProps = {
    tags: Array<string>;
};

export type NavTagsDropDownButtonProps = 
    & ComponentPropsWithRef<"div">
    & NavTagsDropDownButtonNativeProps;

export function NavTagsDropDownButton({
    tags,
    style,
    children,
    ... more
}: NavTagsDropDownButtonProps): ReactNode {
    let [toggled, setToggled] = useState<boolean>(false);

    /** @constructor */ {
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    ... style
                }}
                { ... more }>
                <div
                    onClick={
                        () => setToggled(true)
                    }
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1em",
                        fontWeight: "normal",
                        fontFamily: Theme.FONT_1,
                        color: Theme.DK_COLOR,
                        cursor: "pointer"
                    }}>
                    { children }
                </div>
                {
                    toggled ?
                    <div
                        onMouseLeave={
                            () => setToggled(false)
                        }
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "center",
                            position: "absolute",
                            top: "120%",
                            gap: 20,
                            padding: 10,
                            boxShadow: Theme.SHADOW
                        }}>
                        {
                            tags.map(tag =>
                                <Link
                                    onClick={
                                        () => Client.setShowRoomTagFocus(tag)
                                    }
                                    to={ "/show-room" }>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontSize: "0.75em",
                                            fontWeight: "normal",
                                            fontFamily: Theme.FONT_1,
                                            color: Theme.DK_COLOR,
                                            cursor: "pointer"
                                        }}>
                                        { tag }
                                    </div>
                                </Link>
                            )
                        }
                    </div> :
                    undefined
                }
            </div>
        </>;
    }
}