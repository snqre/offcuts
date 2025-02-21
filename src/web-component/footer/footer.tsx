import { type ReactNode } from "react";
import { Link } from "@web-component";
import { Theme } from "@web-constant";

export function Footer(): ReactNode {
    return <>
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
            <Link
                to="/admin"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    color: Theme.DK_COLOR,
                    fontSize: "0.50em",
                    fontWeight: "normal",
                    fontFamily: Theme.FONT_1,
                    cursor: "pointer"
                }}>
                Admin CLI
            </Link>
        </div>
    </>;
}