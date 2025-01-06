import { NavButton } from "@web-component";
import { NavCallToActionButton } from "@web-component";
import { NavLogo } from "@web-component";
import { NavSearchBar } from "@web-component";
import { NavTagsDropDownButton } from "@web-component";
import { NavButtonGroup } from "@web-component";
import { NavSignInSignUpButton } from "@web-component";
import { NavSignInForm } from "@web-component";
import { NavSignUpForm } from "@web-component";
import { Link } from "@web-component";
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

            <NavButtonGroup>
                <NavCallToActionButton>For You</NavCallToActionButton>
                <NavTagsDropDownButton tags={["Paint", "Wallpaper"]}>Materials</NavTagsDropDownButton>
            </NavButtonGroup>
            

            <NavSearchBar/>

            <NavButtonGroup>
                <Link
                    to={ "/basket" }>
                    <NavButton>
                        Basket
                    </NavButton>
                </Link>
                <NavSignInSignUpButton
                    signUpForm={ <NavSignUpForm/> }
                    signInForm={ <NavSignInForm/> }/>
                <Link
                    to={ "/admin" }>
                    <NavButton
                        icon={ adminIcon }>
                    </NavButton>
                </Link>
            </NavButtonGroup>
        </div>
    </>;
}