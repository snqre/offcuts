import type { ReactNode } from "react";
import { render } from "src_/src/web-util/_";

function App(): ReactNode {
    return <>
        Hello
    </>
}

let renderR = render(<App/>);
renderR.unwrap();