import type { ReactNode } from "react";
import { HomePage } from "@web-page";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { render } from "@web-util";

function App(): ReactNode {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage/> }/>
            </Routes>
        </BrowserRouter>
    </>
}

render(<App/>);