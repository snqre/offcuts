import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";

export type CaptionAndContentCardNativeProps = {
    childCaption: ReactNode;
    childContent: ReactNode;
};

export type CaptionAndContentCardProps =
    & Omit<ComponentPropsWithRef<"div">, "children">
    & CaptionAndContentCardNativeProps;

export function CaptionAndContentCard({
    childCaption,
    childContent,
    style,
    ... more
}: CaptionAndContentCardProps): ReactNode {
    /** @constructor */ {
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    width: "100%",
                    height: "auto",
                    flex: 1,
                    ... style
                }}
                { ... more }>
                { /** caption */ }
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        flex: 1,
                        fontSize: "2em",
                        fontWeight: "normal",
                        fontFamily: Theme.FONT_0,
                        color: Theme.SP_COLOR
                    }}>
                    { childCaption }
                </div>
                { /** content */ }
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        flex: 1,
                        fontSize: "1em",
                        fontWeight: "normal",
                        fontFamily: Theme.FONT_1,
                        color: Theme.DK_COLOR
                    }}>
                    { childContent }
                </div>
            </div>
        </>;
    }
}