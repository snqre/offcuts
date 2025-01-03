import { Theme } from "@web-constant";
import * as React from "react";

export type NavTagsDropDownButtonProps = {
    tags: Array<string>;
    children: React.ReactNode;
};

export function NavTagsDropDownButton(props: NavTagsDropDownButtonProps): React.ReactNode {
    let { tags, children } = props;
    let [toggled, setToggled] = React.useState<boolean>(false);
    let container$: React.ComponentPropsWithRef<"div"> = {
        onMouseLeave: () => setToggled(false),
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            position: "relative"
        }
    };
    let button$: React.ComponentPropsWithRef<"div"> = {
        onClick: () => setToggled(true),
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "auto",
            cursor: "pointer",
            fontSize: "1em",
            fontWeight: "normal",
            fontFamily: Theme.FONT_0,
            color: Theme.DK_COLOR
        }
    };
    let dropDownContainer$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            paddingTop: 10,
            gap: 20,
            position: "absolute",
            top: "100%",
        }
    };
    let dropDownOption$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            pointerEvents: "auto",
            cursor: "pointer",
            fontSize: "0.75em",
            fontWeight: "normal",
            fontFamily: Theme.FONT_0,
            color: Theme.DK_COLOR
        }
    };

    return <>
        <div { ... container$ }>
            <div { ... button$ }>{ children }</div>
            { toggled ? <>
                <div { ... dropDownContainer$ }>
                    { tags.map(tag => <><div { ... dropDownOption$ }>{ tag }</div></>) }
                </div>
            </> : undefined }
        </div>
    </>;
}