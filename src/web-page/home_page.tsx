import { ResponsiveAnchorPage } from "@web-component";
import * as React from "react";
import * as Constant from "@web-constant";

export function HomePage(): React.ReactNode {
    let container$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            gap: 80
        }
    };

    return <>
        <ResponsiveAnchorPage>
            <div { ... container$ }>
                Hello World
            </div>
        </ResponsiveAnchorPage>
    </>;
}