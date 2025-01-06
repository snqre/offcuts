import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";

// @ts-ignore
import icon from "../../web/public/icon/big_star_and_smaller_star.png";

export type NavCallToActionButtonStarProps = 
    & ComponentPropsWithRef<"div">
    & {};

export function NavCallToActionButtonStar(): ReactNode {

    /** @constructor */ {
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundImage: `url(${ icon })`,
                    backgroundSize: "contain",
                    backgroundPositionX: "center",
                    backgroundPositionY: "center",
                    backgroundRepeat: "no-repeat",
                    width: 25,
                    aspectRatio: 1 / 1
                }}/>
        </>;
    }
}