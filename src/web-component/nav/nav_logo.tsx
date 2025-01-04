import logo from "../../web/public/img/logo.png";
import * as React from "react";

export function NavLogo(): React.ReactNode {
    let image: React.ComponentPropsWithRef<"div"> = {};



    let image$: React.ComponentPropsWithRef<"div"> = {
        style: {
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
            aspectRatio: 2 / 1
        }
    };

    return <>
        <div { ... image$ }/>
    </>;
}