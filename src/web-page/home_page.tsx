import type { ReactNode } from "react";
import { ResponsiveAnchorPage } from "@web-component";
import { Footer } from "@web-component";
import { Theme } from "@web-constant";
import { ImageSlider } from "@web-component";

// @ts-ignore
import PLACEHOLDER_PRODUCT from "../web/public/img/placeholder_product.jpg";

export function HomePage(): ReactNode {
    return <>
        <ResponsiveAnchorPage>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "95%",
                    flex: 1
                }}>
                <ImageSlider
                    style={{
                        width: "100%",
                        height: "auto",
                        flex: 1,
                        margin: 10,
                    }}
                    imageUrls={[
                        PLACEHOLDER_PRODUCT,
                        PLACEHOLDER_PRODUCT,
                        PLACEHOLDER_PRODUCT,
                        PLACEHOLDER_PRODUCT
                    ]}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "9em",
                            fontWeight: "normal",
                            fontFamily: Theme.FONT_0,
                            color: Theme.DK_COLOR
                        }}>
                        <>OFFCUTS</>
                    </div>
                </ImageSlider>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingTop: 16,
                        paddingBottom: 32
                    }}>
                    { 
                        ["Revive.", "Reuse.", "Rebuild."].map(subHeading => {
                            return <>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        fontSize: "3em",
                                        fontWeight: "normal",
                                        fontFamily: Theme.FONT_1,
                                        color: Theme.SP_COLOR,
                                        paddingLeft: 36,
                                        paddingRight: 36
                                    }}>
                                    { subHeading }
                                </div>  
                            </>;
                        })
                    }
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "start",
                    width: "100%",
                    height: "auto",
                    flex: 1
                }}>
                {
                    [{
                        heading: "Why Offcuts",
                        content: [
                            "Sustainable Solutions: Divert construction waste from landfills while supporting eco-friendly practices.",
                            "Affordable Materials: Access high-quality reclaimed materials at a fraction of the cost.",
                            "Fast & Easy: List, buy, or request lefttover materials with ease."
                        ]
                    }, {
                        heading: "For Contractors",
                        content: [
                            "Turn your surplus into profit with quick pickups and a seamless listing process."
                        ]
                    }, {
                        heading: "For Buyers",
                        content: [
                            "Find unique, sustainable materials for your next project -- big or small."
                        ]
                    }].map(card => {
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
                                    padding: 32
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
                                    { card.heading }
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "start",
                                        alignItems: "start",
                                        width: "100%",
                                    }}>
                                    {
                                        card.content.map(content => {
                                            return <>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        color: Theme.DK_COLOR,
                                                        fontSize: "0.60em",
                                                        fontWeight: "lighter",
                                                        fontFamily: Theme.FONT_1,
                                                        paddingTop: 8,
                                                        paddingBottom: 8,
                                                        textAlign: "left"
                                                    }}>
                                                    { content }
                                                </div>
                                            </>;
                                        })
                                    }
                                </div>
                            </div>
                        </>;
                    })
                }
            </div>
            <Footer/>
        </ResponsiveAnchorPage>
    </>;
}