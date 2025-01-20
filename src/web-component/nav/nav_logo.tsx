import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Link } from "@web-component";

// @ts-ignore
import logo from "../../web/public/img/logo.png";

export type NavLogoProps = 
    & Omit<ComponentPropsWithRef<"div">, "children">;

export function NavLogo(props: NavLogoProps): ReactNode {
    let { style, ... more } = props;

    /** @constructor */ {
        return <>
            <Link
                to={
                    "/"
                }
                style={{
                    display: "contents"
                }}>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundImage: `url(${ logo })`,
                        backgroundSize: "contain",
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        backgroundRepeat: "no-repeat",
                        width: 150,
                        aspectRatio: 2 / 1,
                        ... style
                    }}
                    { ... more }/>
            </Link>
        </>;
    }
}