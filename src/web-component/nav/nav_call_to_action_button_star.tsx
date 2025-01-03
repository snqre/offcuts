import star from "../../web/public/icon/big_star_and_smaller_star.png";
import * as React from "react";

export function NavCallToActionButtonStar(): React.ReactNode {
    let image$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: `url(${ star })`,
            backgroundSize: "contain",
            backgroundPositionX: "center",
            backgroundPositionY: "center",
            backgroundRepeat: "no-repeat",
            width: 25,
            aspectRatio: 1 / 1
        }
    };
    
    return <>
        <div { ... image$ }/>
    </>;
}