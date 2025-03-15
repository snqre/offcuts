import type { ReactNode } from "react";
import type { State } from "@web-util";
import type { ComponentPropsWithRef } from "react";
import { useState } from "react";
import { Theme } from "@web-constant";
import { toString, type Closure } from "reliq";

export type TerminalProps = 
    & Pick<ComponentPropsWithRef<"div">, "style">
    & {
    execute: Closure<[commands: Array<string>], Promise<Array<string>>>;
};

export function Terminal<T1 extends TerminalProps>(props: T1): ReactNode {
    let last: State<Array<Array<string>>> = useState<Array<Array<string>>>([]);
    let next: State<string> = useState<string>("");

    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "start",
                padding: 16,
                width: "100%",
                height: "100%",
                overflowX: "hidden",
                overflowY: "auto",
                ...props.style,
            }}> {
                last[0].map(section => <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "start",
                            width: "100%",
                            height: "auto",
                        }}> {
                        section.map(line => <>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "start",
                                    alignItems: "center",
                                    width: "100%",
                                    height: "auto",
                                    fontSize: "0.75em",
                                    fontWeight: "normal",
                                    fontFamily: Theme.MONOSPACE_FONT,
                                }}>
                                {line}
                            </div>
                        </>)    
                    }
                    </div>
                </>)
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
                    fontSize: "0.75em",
                    fontWeight: "normal",
                    fontFamily: Theme.MONOSPACE_FONT,
                }}
                placeholder="Commands"
                type="text"
                value={next[0]}
                onChange={e => next[1](e.target.value)}
                onKeyDown={async e => {
                    if (e.key !== "Enter" || next[0].trim() === "") return;
                    let input: string = next[0];
                    let commands: Array<string> = input.split("|");
                    next[1]("");
                    last[1](last => [...last, [input]]);
                    try {
                        let response: Array<string> = (await props.execute(commands));
                        if (response.length === 0) {
                            last[1](last => [...last, ["Ok"]]);
                            return;
                        }
                        last[1](last => [...last, response]);
                        return;
                    }
                    catch (e) {
                        last[1](last => [...last, [toString(e)]]);
                        return;
                    }
                }}/>
        </div>
    </>;
}