import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
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
import { Server } from "@web-server";
import { useState } from "react";
import { useEffect } from "react";

// @ts-ignore
import adminIcon from "../../web/public/icon/admin.png";

export type NavProps = Omit<ComponentPropsWithRef<"div">, "children">;

export function Nav(props: NavProps): React.ReactNode {
    let { style, ... more } = props;
    let [tags, setTags] = useState<Array<string>>();

    useEffect(() => {
        (async () => {
            setTags((await Server.tags()));
            return;
        })();
        return;
    }, []);

    /** @constructor */ {
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    height: "auto",
                    flex: 1,
                    paddingTop: 30,
                    paddingBottom: 30,
                    gap: 40,
                    zIndex: 2000,
                    ... style
                }}
                { ... more }>
                <NavLogo/>
                <NavButtonGroup>
                    <NavCallToActionButton
                        to="/for-you">
                        For You
                    </NavCallToActionButton>
                    <NavTagsDropDownButton
                        tags={ tags ?? [] }>
                        Materials
                    </NavTagsDropDownButton>
                </NavButtonGroup>
                <NavSearchBar/>
                <NavButtonGroup>
                    <Link
                        to="/basket">
                        <NavButton>
                            Basket
                        </NavButton>
                    </Link>
                    <NavSignInSignUpButton
                        signUpForm={
                            <NavSignUpForm/>
                        }
                        signInForm={
                            <NavSignInForm/>
                        }/>
                </NavButtonGroup>
            </div>
        </>;
    }
}