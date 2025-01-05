import type { ReactNode } from "react";
import type { CliLineProps } from "@web-component";
import { CliLine } from "@web-component";
import loader from "../../web/public/loader/motion_blur_loader.svg";

export type CliLoaderProps =
    & Omit<CliLineProps, "children">
    & {};

export function CliLoader(props: CliLoaderProps): ReactNode {

    /** @constructor */ {
        let { ... more } = props;

        return <>
            <CliLine
                { ... more }>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundImage: `url(${ loader })`,
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        width: 20,
                        aspectRatio: 1 / 1
                    }}/>
            </CliLine>
        </>;
    }
}