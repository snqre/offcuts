import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { ResponsiveAnchorPage } from "@web-component";
import { Theme } from "@web-constant";

export function HomePage(): ReactNode {
    return <>
        <ResponsiveAnchorPage>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    fontSize: "10em",
                    fontWeight: "normal",
                    fontFamily: Theme.FONT_0,
                    color: Theme.DK_COLOR
                }}>
                OFFCUTS
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    gap: 20
                }}>
                <HomePageSubHeadingTag>Revive.</HomePageSubHeadingTag>
                <HomePageSubHeadingTag>Reuse.</HomePageSubHeadingTag>
                <HomePageSubHeadingTag>Rebuild.</HomePageSubHeadingTag>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    gap: 20
                }}>
                <HomePageCard>
                    <HomePageCardCaption>Why Offcuts?</HomePageCardCaption>
                    
                </HomePageCard>
                <HomePageCard>
                    <HomePageCardCaption>For Contractors</HomePageCardCaption>
                </HomePageCard>
                <HomePageCard>
                    <HomePageCardCaption>For Buyers</HomePageCardCaption>
                </HomePageCard>
            </div>
        </ResponsiveAnchorPage>
    </>;
}


export type HomePageSubHeadingTagProps = {
    children: ReactNode;
};

export function HomePageSubHeadingTag({ children }: HomePageSubHeadingTagProps): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2em",
                fontWeight: "normal",
                fontFamily: Theme.FONT_0,
                color: Theme.SP_COLOR
            }}>
            { children }
        </div>
    </>;
}


export type HomePageCardProps = {
    children?: ReactNode;
};

export function HomePageCard({ children }: HomePageCardProps): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center"
            }}>
            { children }
        </div>
    </>;
}


export type HomePageCardCaptionProps = {
    children?: ReactNode;
};

export function HomePageCardCaption({ children }: HomePageCardCaptionProps): ReactNode {
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "2em",
                fontWeight: "normal",
                fontFamily: Theme.FONT_0,
                color: Theme.SP_COLOR
            }}>
            { children }
        </div>
    </>;
}