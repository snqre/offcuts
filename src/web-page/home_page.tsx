import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { ResponsiveAnchorPage } from "@web-component";
import { CaptionAndContentCard } from "@web-component";
import { Theme } from "@web-constant";

export function HomePage(): ReactNode {
    return <>
        <ResponsiveAnchorPage
            style={{
                gap: 20
            }}>
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
                    color: Theme.DK_COLOR,
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
                    gap: 20,
                    paddingTop: 10,
                    paddingBottom: 10
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
                    alignItems: "start",
                    width: "100%",
                    gap: 40
                }}>
                <CaptionAndContentCard
                    childCaption="Why Offcuts?"
                    childContent={
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "start",
                                alignItems: "center",
                                width: "100%",
                                height: "auto",
                                flex: 1,
                                gap: 10
                            }}>
                            <p>
                                <strong>Sustainable Solutions: </strong>Divert construction waste from landfills while supporting eco-friendly practices.
                            </p>
                            <p><strong>Affordable Materials: </strong>Access high-quality reclaimed materials at a fraction of the cost.</p>
                            <p><strong>Fast & Easy: </strong>List, buy, or request leftover materials with ease.</p>
                        </div>
                    }/>
                <CaptionAndContentCard
                    childCaption="For Contractors"
                    childContent="Turn your surplus into profit with quick pickups and a seamless listing process."/>
                <CaptionAndContentCard
                    childCaption="For Buyers"
                    childContent="Find unique, sustainable materials for your next project -- big or small."/>
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
                fontFamily: Theme.FONT_1,
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
                fontFamily: Theme.FONT_1,
                color: Theme.SP_COLOR
            }}>
            { children }
        </div>
    </>;
}