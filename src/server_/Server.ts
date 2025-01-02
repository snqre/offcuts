import { Result } from "reliq"
import { Ok } from "reliq"
import { Err } from "reliq"
import { Unsafe } from "@common";

export type ServerError = Unsafe;

export type Server = {
    run(): Promise<Result<void, ServerError>>;
};

export function Server(): Server {

    async function run(): ReturnType<Server["run"]> {
        
    }
}