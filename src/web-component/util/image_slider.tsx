import {
    type ComponentPropsWithRef,
    type ReactNode,
    useState,
    useEffect,
} from "react";

import {
    animated,
    config,
    useSprings,
} from "react-spring";

import { Theme } from "@web-constant";

export function ImageSlider(props: ImageSlider.Props): ReactNode {
    const { imageUrls, style, children, ...more } = props;
    const [key, setKey] = useState<number>(0);
    const springs = useSprings(
        imageUrls.length,
        imageUrls.map((_, imageUrlKey) => ({
            transform: `translateX(${100 * (imageUrlKey - key)}%)`,
            config: config.gentle
        }))
    );

    function nextImage(): void {
        setKey(last => (last + 1) % imageUrls.length);
        return;
    }

    function lastImage(): void {
        setKey(last => (last - 1 + imageUrls.length) % imageUrls.length);
        return;
    }

    useEffect(() => {
        let timer: Timer = setInterval(() => {
            nextImage();
            return;
        }, 30 * 1000);
        return () => clearInterval(timer);
    }, []);

    return <>
        <div
            style={{
                borderRadius: 10,
                boxShadow: Theme.SHADOW,
                position: "relative",
                overflowX: "hidden",
                overflowY: "hidden",
                ...style
            }}
            {...more}>
            {springs.map((spring, springKey) => (
                <animated.div
                    key={springKey}
                    style={{
                        ...spring,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        flex: 1,
                        backgroundImage: `url(${imageUrls[springKey]})`,
                        backgroundSize: "cover",
                        backgroundPositionX: "center",
                        backgroundPositionY: "center",
                        backgroundRepeat: "no-repeat"
                    }}/>
            ))}
            <div
                style={{
                    position: "relative",
                    zIndex: "2",
                    width: "100%",
                    height: "100%",
                    flex: 1
                }}>
                {children}
            </div>
        </div>
    </>;
}

export namespace ImageSlider {
    export type Props = 
        & ComponentPropsWithRef<"div">
        & {
        imageUrls: Array<string>;
    };
}