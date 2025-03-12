import { type ReactNode } from "react";
import { type State } from "@web-util";
import { HomePage } from "@web-page";
import { BasketPage } from "@web-page";
import { AdminPage } from "@web-page";
import { ShowRoomPage } from "@web-page";
import { ProductPage } from "@web-page";
import { ForYouPage } from "@web-page";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { render } from "@web-util";
import { useState } from "react";
import { ProductData } from "@common";

function App(): ReactNode {
    let product: State<ProductData | null> = useState<ProductData | null>(null);
    let focusTag: State<string | null> = useState<string | null>(null);

    return <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <HomePage/> }/>
                <Route path="/basket" element={ <BasketPage/> }/>
                <Route path="/admin" element={ <AdminPage/> }/>
                <Route path="/show-room" element={ <ShowRoomPage/> }/>
                <Route 
                    path="/product" 
                    element={<ProductPage product={product}/>}/>
                <Route
                    path="/for-you"
                    element={
                        <ForYouPage/>
                    }/>
            </Routes>
        </BrowserRouter>
    </>
}

render(<App/>);