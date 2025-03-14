import type { ReactNode } from "react";
import type { State } from "@web-util";
import { HomePage } from "@web-page";
import { BasketPage } from "@web-page";
import { AdminPage } from "@web-page";
import { ShowRoomPage } from "@web-page";
import { ProductPage } from "@web-page";
import { ForYouPage } from "@web-page";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { ProductData } from "@common";
import { Server } from "@web-server";
import { render } from "@web-util";
import { useState } from "react";
import { useEffect } from "react";

function App(): ReactNode {
    let selectedProduct: State<ProductData | null> = useState<ProductData | null>(null);
    let selectedTag: State<string | null> = useState<string | null>(null);
    let tags: State<Array<string>> = useState<Array<string>>([]);

    useEffect(() => {
        Server
            .tags()
            .then(tags$ => tags[1](tags$));
        return;
    });

    return <>
        <BrowserRouter>
            <Routes>
                <Route 
                    path="/" 
                    element={<>
                        <HomePage
                            tags={tags}/>
                    </>}/>
                <Route 
                    path="/basket" 
                    element={<>
                        <BasketPage
                            tags={tags}/>
                    </>}/>
                <Route 
                    path="/admin" 
                    element={<>
                        <AdminPage
                            tags={tags}/>
                    </>}/>
                <Route
                    path="/show-room"
                    element={<>
                        <ShowRoomPage
                            tags={tags}
                            selectedTag={selectedTag}/>
                    </>}/>
                <Route
                    path="/product"
                    element={<>
                        <ProductPage
                            tags={tags}
                            selectedProduct={selectedProduct}/>
                    </>}/>
                <Route
                    path="/for-you"
                    element={<>
                        <ForYouPage
                            tags={tags}/>
                    </>}/>
            </Routes>
        </BrowserRouter>
    </>
}

render(<App/>);