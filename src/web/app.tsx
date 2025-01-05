import type { ReactNode } from "react";
import { HomePage } from "@web-page";
import { BasketPage } from "@web-page";
import { AdminPage } from "@web-page";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { render } from "@web-util";

function App(): ReactNode {
    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage/> }/>
                <Route path="/basket" element={ <BasketPage/> }/>
                <Route path="/admin" element={ <AdminPage/> }/>
            </Routes>
        </BrowserRouter>
    </>
}

render(<App/>);