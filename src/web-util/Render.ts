import type { ReactNode } from "react";
import { Result } from "reliq";
import { Ok } from "reliq";
import { Err } from "reliq";
import { createRoot as Root } from "react-dom/client";

export type RenderE =
    | "RENDER.ERR_MISSING_ROOT_ELEMENT";
export function render(app: ReactNode): Result<void, RenderE> {
    let element = document.getElementById("root");
    if (element === null) return Err("RENDER.ERR_MISSING_ROOT_ELEMENT");   
    Root(element).render(app);
    return Ok(undefined);
}