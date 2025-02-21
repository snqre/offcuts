import {
    type ReactNode,
    useEffect
} from "react";
import {
    type ComponentPropsWithRef,
    config,
    animated,
    useSpring
} from "react-spring";

export function RevealOnDependencyMut(props: RevealOnDependencyMut.Props): ReactNode {
    let { dependency, style, children, ...more } = props;
    let [spring, setSpring] = useSpring(() => ({
        opacity: 0
    }));

    useEffect(() => {
        setSpring.start({
            from: {
                opacity: 0
            },
            to: {
                opacity: 1
            },
            config: config.gentle
        });
        return;
    }, [dependency]);
    
    return <>
        <animated.div
            style={{
                ...style,
                ...spring
            }}
            { ...more }>
            { children }
        </animated.div>
    </>;
}

export namespace RevealOnDependencyMut {
    export type Props = 
        & ComponentPropsWithRef<"div">
        & {
        dependency: unknown;
    };
}