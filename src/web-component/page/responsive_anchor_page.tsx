import type { Device } from "@web-hook";
import type { ComponentPropsWithRef } from "react";
import type { ReactNode } from "react";
import { Nav } from "@web-component";
import { useDevice } from "@web-hook";
import type { State } from "@web-util";

export function ResponsiveAnchorPage(props: ResponsiveAnchorPage.Props): ReactNode {
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
                ...props.style
            }}>
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
                <Nav
                    tags={props.tags}/>
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
                    {props.children}
                </div>
            </div>
        </div>
    </>;
}

export namespace ResponsiveAnchorPage {
    export type Props = 
        & ComponentPropsWithRef<"div">
        & {
        tags: State<Array<string>>;
    };
}