import type { ReactNode } from "react";
import type { ComponentPropsWithRef } from "react";
import { TableBody } from "@web-component";
import { TableHeading } from "@web-component";
import { TableItem } from "@web-component";
import { TableRow } from "@web-component";

export type TableNativeProps = {
    headings: Array<ReactNode>;
    contents: Array<Array<ReactNode>>;
};

export type TableProps = 
    & Omit<ComponentPropsWithRef<"div">,
        | "children">
    & TableNativeProps
    & {};

export function Table(props: TableProps): ReactNode {
    let { headings, contents, style, ... more } = props;
    return <>
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                alignItems: "center",
                gap: 10,
                ... style
            }}
            { ... more }>
            <TableRow>
                { 
                    headings.map(heading => <TableItem><TableHeading>{ heading }</TableHeading></TableItem>) 
                }
            </TableRow>
            {
                contents.map(content =>
                    <TableRow>
                        {
                            content.map(item => <TableItem><TableBody>{ item }</TableBody></TableItem>)
                        }
                    </TableRow>
                )
            }
        </div>
    </>;
}