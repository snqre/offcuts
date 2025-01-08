import { Theme } from "@web-constant";
import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import type { AsyncFunction } from "reliq";
import { CliLine } from "@web-component";
import { CliInputLine } from "@web-component";
import { CliLoader } from "@web-component";
import { useState } from "react";
import { useEffect } from "react";

const _LINE_SYMBOL: string = ">";

export type CliNativeProps = {
    execute: AsyncFunction<Array<string>, string | undefined>;
};

export type CliProps = 
    & ComponentPropsWithRef<"div">
    & CliNativeProps
    & {};

export function Cli(props: CliProps): ReactNode {
    let { execute, style, children, ... more } = props;
    let [last, setLast] = useState<Array<string>>([]);
    let [input, setInput] = useState<string>("@admin: ");
    
    /** @constructor */ {
        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 20,
                    boxShadow: Theme.SHADOW,
                    width: "auto",
                    height: "auto",
                    overflowX: "hidden",
                    overflowY: "scroll",
                    ... style
                }}
                { ... more }>
                <div
                    style={{
                        all: "unset",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        flex: 1,
                        gap: 10
                    }}>
                    {
                        last.map(line => 
                            <>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "start",
                                        alignItems: "center",
                                        width: "100%",
                                        height: "auto",
                                        flex: 1,
                                        fontSize: "0.75em",
                                        fontWeight: "normal",
                                        fontFamily: Theme.MONOSPACE_FONT
                                    }}>
                                    { line }
                                </div>
                            </>
                        )
                    }
                    <input
                        style={{
                            all: "unset",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            alignItems: "center",
                            width: "100%",
                            height: "auto",
                            flex: 1,
                            fontSize: "0.75em",
                            fontWeight: "normal",
                            fontFamily: Theme.MONOSPACE_FONT
                        }}
                        type="text"
                        value={ input }
                        onChange={ e => setInput(e.target.value) }
                        onKeyDown={
                            e => {
                                if (e.key === "Enter" && input.trim() !== "") {
                                    let command: string = input;
                                    setInput("@admin ");
                                    setLast(last => [... last, command]);
                                    execute((command.split(" ")))
                                        .then(response => response ? setLast(last => [... last, `@offcuts: ${ response }`]) : undefined)
                                        .catch(e => [... last, `offcuts: ${ e }`]);
                                    return;
                                }
                                return;
                            }
                        }/>
                </div>
            </div>
        </>;
    }
}