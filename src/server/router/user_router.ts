import type { Database } from "@server";
import { AppData } from "@common";
import { Router } from "express";
import { UserData } from "@common";
import { AuthFromPassword } from "@server";
import { require } from "reliq";

export function UserRouter(_database: Database): Router {
    /** @constructor */ {
        return Router()
            .post("/sign-up", async (rq, rs) => {
                try {
                    let { username, password } = rq.body;
                    let app: AppData = await _database.get();
                    let match: boolean = app.users
                        .filter(user => user.username === username)
                        .length !== 0;
                    require(match === false, "USER_ROUTER.USERNAME_ALREADY_TAKEN");
                    app.users.push(UserData({
                        username,
                        hash: (await AuthFromPassword(password)).get(),
                        orders: []
                    }));
                    await _database.set(app);
                    let message: string = "OK";
                    rs.send({ message });
                    return;
                }
                catch (e) {
                    rs.send({ e });
                    return;
                }
            })
            .post("/sign-in", async (rq, rs) => {

            });
    }
}