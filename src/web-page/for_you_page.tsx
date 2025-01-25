import type { ReactNode } from "react";
import type { ResponsiveAnchorPageProps } from "@web-component";
import { ResponsiveAnchorPage } from "@web-component";
import { Theme } from "@web-constant";

export type ForYouPageProps =
    & Omit<ResponsiveAnchorPageProps, "children">;

export function ForYouPage(props: ForYouPageProps): ReactNode {
    /** @render */ {
        return <>
            <ResponsiveAnchorPage>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        flex: 1
                    }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            flex: 1,
                            paddingTop: 128,
                            paddingLeft: 16,
                            paddingRight: 16,
                            paddingBottom: 16
                        }}>
                        { /** Caption */ }
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "start",
                                alignItems: "center",
                                width: "100%",
                                height: "auto",
                                gap: 20,
                                flex: 1
                            }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: Theme.DK_COLOR,
                                    fontSize: "3em",
                                    fontWeight: "normal",
                                    fontFamily: Theme.FONT_0
                                }}>
                                Coming Soon...
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    color: Theme.SP_COLOR,
                                    fontSize: "3em",
                                    fontWeight: "normal",
                                    fontFamily: Theme.FONT_0
                                }}>
                                For You
                            </div>
                        </div>
                        { /** Choose a Style Sub-Section */ }
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "auto",
                                flex: 1
                            }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "auto",
                                    flex: 1,
                                    color: Theme.SP_COLOR,
                                    fontSize: "2em",
                                    fontWeight: "normal",
                                    fontFamily: Theme.FONT_0
                                }}>
                                Choose a Style
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "auto",
                                    flex: 1,
                                    color: Theme.DK_COLOR,
                                    fontSize: "1em",
                                    fontWeight: "normal",
                                    fontFamily: Theme.FONT_1
                                }}>
                                Select your preferred architectural or design tyle for a tailored look.
                            </div>
                        </div>
                        { /** Instant Visuals Sub-Section */ }
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "auto",
                                flex: 1
                            }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "auto",
                                    flex: 1,
                                    color: Theme.SP_COLOR,
                                    fontSize: "2em",
                                    fontWeight: "normal",
                                    fontFamily: Theme.FONT_0
                                }}>
                                Instant Visuals
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "auto",
                                    flex: 1,
                                    color: Theme.DK_COLOR,
                                    fontSize: "1em",
                                    fontWeight: "normal",
                                    fontFamily: Theme.FONT_1
                                }}>
                                See photorealistic rendering of how materials can be used in your home.
                            </div>
                        </div>
                        { /** Confidence Sub-Section */ }
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "auto",
                                flex: 1
                            }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "auto",
                                    flex: 1,
                                    color: Theme.SP_COLOR,
                                    fontSize: "2em",
                                    fontWeight: "normal",
                                    fontFamily: Theme.FONT_0
                                }}>
                                Confidence
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "auto",
                                    flex: 1,
                                    color: Theme.DK_COLOR,
                                    fontSize: "1em",
                                    fontWeight: "normal",
                                    fontFamily: Theme.FONT_1
                                }}>
                                Visualise your project before purchasing... blending creativity with sustainability.
                            </div>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                            flex: 1
                        }}>

                    </div>
                </div>
            </ResponsiveAnchorPage>
        </>;
    }
}