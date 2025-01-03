import { get } from "fast-levenshtein";
import * as React from "react";


export function NavSearchBar(): React.ReactNode {
    let container$: React.ComponentPropsWithRef<"div"> = {
        style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: 200,
            height: 50
        }
    };
    let input$: React.ComponentPropsWithRef<"input"> = {
        style: {

        }
    };

    return <>
        <div { ... container$ }>
            <input { ... input$ }/>
        </div>
    </>;
}