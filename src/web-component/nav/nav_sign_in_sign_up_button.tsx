import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { NavButton } from "@web-component";
import { Theme } from "@web-constant";
import { useState } from "react";

export type NavSignInSignUpButtonNativeProps = {
    signUpForm: ReactNode;
    signInForm: ReactNode;
};

export type NavSignInSignUpButtonProps = 
    & Omit<ComponentPropsWithRef<"div">, "children">
    & NavSignInSignUpButtonNativeProps
    & {};

export function NavSignInSignUpButton(props: NavSignInSignUpButtonProps): ReactNode {
    let { signUpForm, signInForm, style, ... more } = props;
    let [toggled, setToggled] = useState<boolean>(false);
    let [signUp, setSignUp] = useState<boolean>(false);
    let [signIn, setSignIn] = useState<boolean>(false);

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
                <NavButton
                    onClick={
                        () => {
                            setToggled(true);
                            setSignIn(false);
                            setSignUp(true);
                            return;
                        }
                    }>
                    Sign Up
                </NavButton>
                <div
                    onClick={
                        () => {
                            setToggled(true);
                            setSignIn(true);
                            setSignUp(false);
                            return;
                        }
                    }
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        position: "absolute",
                        top: "120%",
                        fontSize: "0.60em",
                        fontWeight: "normal",
                        fontFamily: Theme.FONT_1,
                        color: Theme.DK_COLOR
                    }}>
                    Sign In
                </div>
                {
                    toggled ?
                    <div
                        onMouseLeave={
                            () => {
                                setToggled(false);
                                setSignIn(false);
                                setSignUp(false);
                                return;
                            }
                        }
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "start",
                            alignItems: "center",
                            position: "absolute",
                            top: "175%",
                            minWidth: "100%",
                            width: 400
                        }}>
                        {
                            signIn ?
                            signInForm :
                            signUp ?
                            signUpForm :
                            undefined
                        }
                    </div> :
                    undefined
                }
            </div>
        </>;
    }
}