import type { ComponentPropsWithRef, ReactNode } from "react";
import { ResponsiveAnchorPage } from "@web-component";
import { Theme } from "@web-constant";
import { config as Config } from "react-spring";
import { animated } from "react-spring";
import { useSpring } from "react-spring";
import { useState } from "react";
import { useEffect } from "react";
import { RevealOnDependencyMut } from "@web-component";

// @ts-ignore
import placeholderImage from "../web/public/img/placeholder_product.jpg";
import type { State } from "@web-util";

export function ForYouPage(props: ForYouPage.Props): ReactNode {
    let [imagePool, setImagePool] = useState<Array<`url(${ string })`>>([]);
    let [image0, setImage0] = useState<`url(${ string })`>(`url(${ placeholderImage })`);
    let [image1, setImage1] = useState<`url(${ string })`>(`url(${ placeholderImage })`);
    let [image2, setImage2] = useState<`url(${ string })`>(`url(${ placeholderImage })`);
    let [image3, setImage3] = useState<`url(${ string })`>(`url(${ placeholderImage })`);
    let [flag, setFlag] = useState(0);

    useEffect(() => {
        let timer: Timer = setInterval(() => {
            if (imagePool.length === 0) {
                console.log("changing");
                [setImage0, setImage1, setImage2, setImage3].forEach(set => {
                    set(`url(${ placeholderImage })`);
                    setFlag(flag => flag += 1);
                    return;
                });
                return;
            }
            [setImage0, setImage1, setImage2, setImage3].forEach(set => {
                let random: number = Math.random();
                let randomPosition: number = Math.round((imagePool.length / 100) * (random * 100));
                set(imagePool.at(randomPosition)!);
                setFlag(flag => flag += 1);
                return;
            });
            return;
        }, 30000);
        return () => clearInterval(timer);
    }, []);

    /** @render */ {
        return <>
            <ResponsiveAnchorPage
                tags={props.tags}>
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
                        <_Caption
                            text0="Coming Soon..."
                            text1="For You"/>
                        <_Section
                            heading="Choose a Style"
                            content="Select your preferred architectural or design tyle for a tailored look."/>
                        <_Section
                            heading="Instance Visuals"
                            content="See photorealistic rendering of how materials can be used in your home."/>
                        <_Section
                            heading="Confidence"
                            content="Visualise your project before purchasing... blending creativity with sustainability."/>
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
                                    <RevealOnDependencyMut
                                        dependency={image}
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "100%",
                                            flex: 1
                                        }}>
                                        <animated.div
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
                                    </RevealOnDependencyMut> 
                                )
                            }
                        </div>
                        <RevealOnDependencyMut
                            dependency={image3}
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
                        </RevealOnDependencyMut>
                    </div>
                </div>
            </ResponsiveAnchorPage>
        </>;
    }
}

export namespace ForYouPage {
    export type Props = {
        tags: State<Array<string>>;
    };
}



type _CaptionProps =
    & Omit<ComponentPropsWithRef<"div">, "children">
    & {
    text0: string;
    text1: string;
};

function _Caption(props: _CaptionProps): ReactNode {
    let { text0, text1, style, ...more } = props;

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                width: "100%",
                height: "auto",
                gap: 20,
                flex: 1,
                ...style
            }}
            { ...more }>
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
                { text0 }
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
                { text1 }
            </div>
        </div>
    </>;
}


type _SectionProps = 
    & Omit<ComponentPropsWithRef<"div">, "children">
    & {
    heading: string;
    content: string;
};

function _Section(props: _SectionProps): ReactNode {
    let { heading, content, style, ...more } = props;
    
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "auto",
                flex: 1,
                ...style
            }}
            { ...more }>
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
                { heading }
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
                { content }
            </div>
        </div>
    </>;
}