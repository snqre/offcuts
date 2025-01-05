import { Theme } from "@web-constant";
import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import type { AsyncFunction } from "reliq";
import { CliLine } from "@web-component";
import { CliLoader } from "@web-component";
import { useState } from "react";

const _LINE_SYMBOL: string = ">";

export type CliNativeProps = {

};

export type CliProps = 
    & ComponentPropsWithRef<"div">
    & CliNativeProps
    & {};

export function Cli(props: CliProps): ReactNode {
    let [_history, _setHistory] = useState<Array<ReactNode>>([]);
    let [_input, _setInput] = useState<string>(_line());

    /** @constructor */ {
        let { style, children, ... more } = props;

        return <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "start",
                    fontSize: "0.75em",
                    fontWeight: "normal",
                    fontFamily: "monospace",
                    overflowX: "hidden",
                    overflowY: "scroll",
                    boxShadow: Theme.SHADOW,
                    gap: 10,
                    padding: 10,
                    ... style
                }}
                { ... more }>
                {
                    _history.map((line, k) => <div key={k}>{ line }</div>)
                }
                <input
                    type="text"
                    value={ _input }
                    onChange={ e => _setInput(e.target.value) }
                    onKeyDown={
                        e => {
                            _output()
                            new Promise(resolve => {

                            })
                                .then()
                            async () => {

                            }
                            if (e.key === "Enter" && _input.trim() !== "") {
                                _output(_input);
                                _setInput(_line());
                                
                                return;
                            }
                            return;
                        }
                    }
                    style={{
                        all: "unset",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "start",
                        alignItems: "center",
                        width: "100%",
                        height: "auto",
                        flexGrow: 1
                    }}/>
            </div>
        </>;
    }

    async function _execute(command: string): string {

    }


    async function _load(outcome: AsyncFunction<void, ReactNode>) {
        _addToHistory(<CliLoader/>);
        _addToHistory((await outcome()));
        return;
    }

    function _addToHistory(line: ReactNode): void {
        _setHistory(history => [... history, line]);
        return;
    }

    function _line(): string {
        return `${ _LINE_SYMBOL } `;
    }
}