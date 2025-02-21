import type { Device } from "@web-hook";
import type { ComponentPropsWithRef } from "react";
import type { ReactNode } from "react";
import { Nav } from "@web-component";
import { useDevice } from "@web-hook";

export type ResponsiveAnchorPageProps =
    & ComponentPropsWithRef<"div">
    & {};
export function ResponsiveAnchorPage(props: ResponsiveAnchorPage.Props): ReactNode {
    let { style, children, ... more } = props;
    let device: Device = useDevice();

    function size(): number {
        if (device === "DEVICE.LAPTOP") return 1024;
        if (device === "DEVICE.TABLET") return 768;
        if (device === "DEVICE.MOBILE") return 320;
        return 0;
    }

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                width: "100vw",
                height: "100vh",
                background: "white",
                ...style
            }}
            { ...more }>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    minWidth: 1024,
                    maxWidth: 1440,
                    width: "100%",
                    height: "100%",
                    flex: 1,
                    paddingLeft: 64,
                    paddingRight: 64
                }}>
                <Nav/>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        flexGrow: 1,
                        width: "100%",
                        height: "100%"
                    }}>
                    { children }
                </div>
            </div>
        </div>
    </>;
}

export namespace ResponsiveAnchorPage {
    export type Props = 
        & ComponentPropsWithRef<"div">;
}