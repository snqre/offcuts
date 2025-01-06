import { ProductDataSchema } from "@common";
import { ProductData } from "@common";
import { z as ZodValidator } from "zod";
import { NavButton } from "@web-component";
import { NavCallToActionButton } from "@web-component";
import { NavLogo } from "@web-component";
import { NavSearchBar } from "@web-component";
import { NavTagsDropDownButton } from "@web-component";
import { NavButtonGroup } from "@web-component";
import { Link } from "@web-component";
import { require } from "reliq";
import { useTags } from "@web-hook";
import * as React from "react";

// @ts-ignore
import basketIcon from "../../web/public/icon/shopping_bag.png";

// @ts-ignore
import adminIcon from "../../web/public/icon/admin.png";

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

            <NavButtonGroup>
                <Link
                    to={ "/basket" }>
                    <NavButton
                        icon={basketIcon}>
                        Basket
                    </NavButton>
                </Link>
                <Link
                    to={ "/admin" }>
                    <NavButton
                        icon={adminIcon}>
                    </NavButton>
                </Link>
            </NavButtonGroup>
        </div>
    </>;
}