import { Router } from "express";

export function DatabaseAccessRouter(): Router {
    return Router()
        .post("/get_database", async (__dirname, rs) => {
            
        })
}