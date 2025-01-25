import type { ReactNode } from "react";
import type { ResponsiveAnchorPageProps } from "@web-component";
import { ResponsiveAnchorPage } from "@web-component";
import { Theme } from "@web-constant";
import { useState } from "react";
import { useEffect } from "react";

// @ts-ignore
import placeholderImage from "../web/public/img/placeholder_product.jpg";

export type ForYouPageProps =
    & Omit<ResponsiveAnchorPageProps, "children">;

export function ForYouPage(props: ForYouPageProps): ReactNode {
    let [imagePool, setImagePool] = useState<Array<`url(${ string })`>>([]);
    let [image0, setImage0] = useState<`url(${ string })`>(`url(${ placeholderImage })`);
    let [image1, setImage1] = useState<`url(${ string })`>(`url(${ placeholderImage })`);
    let [image2, setImage2] = useState<`url(${ string })`>(`url(${ placeholderImage })`);
    let [image3, setImage3] = useState<`url(${ string })`>(`url(${ placeholderImage })`);

    useEffect(() => {
        let timer: Timer = setInterval(() => {
            if (imagePool.length === 0) return;
            [setImage0, setImage1, setImage2, setImage3].forEach(set => {
                let random: number = Math.random();
                let randomPosition: number = Math.round((imagePool.length / 100) * (random * 100));
                set(imagePool.at(randomPosition)!);
                return;
            });
            return;
        }, 30 * 1000);
        return () => clearInterval(timer);
    }, []);

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
                            flex: 1,
                            gap: 10
                        }}>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                                flex: 1,
                                paddingLeft: 20,
                                paddingTop: 20,
                                paddingBottom: 20,
                                gap: 10
                            }}>
                            {
                                [image0, image1, image2].map(image => 
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            backgroundImage: image,
                                            backgroundSize: "cover",
                                            backgroundPositionX: "center",
                                            backgroundPositionY: "center",
                                            backgroundRepeat: "no-repeat",
                                            borderRadius: 10,
                                            width: "100%",
                                            height: "100%",
                                            flex: 1
                                        }}/>
                                )
                            }
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                height: "100%",
                                flex: 1,
                                paddingRight: 20,
                                paddingTop: 20,
                                paddingBottom: 20
                            }}>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "100%",
                                    flex: 1,
                                    backgroundImage: image3,
                                    backgroundSize: "cover",
                                    backgroundPositionX: "center",
                                    backgroundPositionY: "center",
                                    backgroundRepeat: "no-repeat",
                                    borderRadius: 10
                                }}/>
                        </div>
                    </div>
                </div>
            </ResponsiveAnchorPage>
        </>;
    }
}