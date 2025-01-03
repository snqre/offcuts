import { ProductDataSchema } from "@common";
import { ProductData } from "@common";
import { z as ZodValidator } from "zod";
import { NavButton } from "@web-component";
import { NavCallToActionButton } from "@web-component";
import { NavLogo } from "@web-component";
import { NavSearchBar } from "@web-component";
import { NavTagsDropDownButton } from "@web-component";
import { require } from "reliq";
import { useTags } from "@web-hook";
import * as React from "react";

export type NavProps = {
    categories: Array<React.ReactNode>;
};

export function Nav(props: NavProps): React.ReactNode {
    let tags: Array<string> = useTags();
    let container$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingTop: 30,
            paddingBottom: 30,
            gap: 40
        }
    };

    return <>
        <div { ... container$ }>
            <NavLogo/>
            <NavCallToActionButton>For You</NavCallToActionButton>
            <NavTagsDropDownButton tags={["Paint", "Wallpaper"]}>Materials</NavTagsDropDownButton>
            <NavSearchBar/>
            <NavButton>Backet</NavButton>
        </div>
    </>;
}