import type { ReactNode } from "react";
import { render } from "@web-util";

function App(): ReactNode {
    return <>
        Hello
    </>
}

let renderR = render(<App/>);
renderR.unwrap();