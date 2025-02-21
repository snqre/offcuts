import type { Database } from "@server";
import { AppData } from "@common";
import { Router } from "express";
import { UserData } from "@common";
import { AuthFromPassword } from "@server";
import { hashSync } from "bcrypt";
import { compareSync } from "bcrypt";
import { require } from "reliq";

export function UserRouter(_database: Database): Router {
    /** @constructor */ {
        return Router()
            .post("/sign_up", async (rq, rs) => {
                try {
                    let { username, password } = rq.body;
                    let app: AppData = (await _database.get());
                    console.log(app.users.length);
                    /**
                    let match: boolean = app.users
                        .filter(user => user.username === username)
                        .length !== 0;
                    require(match === false, "USER_ROUTER.USERNAME_ALREADY_TAKEN");
                    */
                    (await _database.set({
                        ...app,
                        users: [...(app.users || []), UserData({
                            username,
                            hash: hashSync(password, 0),
                            orders: []
                        })],
                    }));
                    let appAfter: AppData = (await _database.get());
                    console.log(appAfter.users.length);
                    rs.send({ message: "OK" });
                    return;
                }
                catch (e) {
                    console.log(e);
                    rs.send({ message: String(e) });
                    return;
                }
            })
            .post("/sign_in", async (rq, rs) => {
                try {
                    let { username, password } = rq.body;
                    let app: AppData = (await _database.get());
                    let matchingUsers: UserData[] = app
                        .users
                        .filter(user => {
                            return user.username === username;
                        });
                    if (matchingUsers.length === 0) {
                        rs.send({ message: "ERR_INCORRECT_USERNAME_OR_PASSWORD" });
                        return;
                    }
                    let user: UserData = matchingUsers[0];
                    let isCorrectPassword: boolean = compareSync(password, user.hash);
                    if (isCorrectPassword === false) {
                        rs.send({ message: "ERR_INCORRECT_USERNAME_OR_PASSWORD" });
                        return;
                    }
                    rs.send({ user });
                    return;
                }
                catch (e) {
                    rs.send({ e });
                    return;
                }
            })
            .post("/users", async (rq, rs) => {                
                let { password } = rq.body;
                let correctPassword: string | null = process.env?.["ADMIN_PASSWORD"] ?? null;
                if (correctPassword === undefined) {
                    rs.send({ message: "ERR_INVALID_PASSWORD" });
                    return;
                }
                if (correctPassword !== password) {
                    rs.send({ message: "ERR_INVALID_PASSWORD" });
                    return;
                }
                let app: AppData = (await _database.get());
                let { users } = app;
                rs.send({ users });
                return;
            })
    }
}