import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { Theme } from "@web-constant";

export type FormInputProps =
    & ComponentPropsWithRef<"input">
    & {};

export function FormInput(props: FormInputProps): ReactNode {
    let { style, children, ... more } = props;

    return <>
        <input
            style={{
                all: "unset",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "auto",
                flexGrow: 1,
                ... style
            }}
            { ... more }>
            { children }
        </input>
    </>;
}