import type { ReactNode } from "react";
import { createRoot as Root } from "react-dom/client";
import { require } from "reliq";

export function render(app: ReactNode): void {
    let element = document.getElementById("root");
    require(element !== null, "RENDER.ERR_MISSING_ROOT_ELEMENT");  
    Root(element).render(app);
    return;
}