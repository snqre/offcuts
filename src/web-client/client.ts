import type { AxiosResponse } from "axios";
import { default as Axios } from "axios";
import { UserDataSchema } from "@common";
import { UserData } from "@common";
import { require } from "reliq";

export type Client = {
    hasUser(): boolean;
    showRoomTagFocus(): string | null;
    setShowRoomTagFocus(tag?: string): void;
    signIn(): Promise<UserData>;
    signIn(username: string, password: string): Promise<UserData>;
    signUp(user: UserData): Promise<void>;
};

export const Client: Client = (() => {
    let _showRoomTagFocus: string | null;
    let _user: UserData | null;
    let _username: string | null;
    let _password: string | null;
    
    /** @constructor */ {
        _showRoomTagFocus = null;
        _user = null;
        _username = null;
        _password = null;
        return {
            hasUser,
            showRoomTagFocus,
            setShowRoomTagFocus,
            signIn,
            signUp
        };
    }

    function hasUser(): boolean {
        if (_user === null) return false;
        return true;
    }

    function showRoomTagFocus(): string | null {
        return _showRoomTagFocus;
    }

    function setShowRoomTagFocus(tag?: string): void {
        _showRoomTagFocus = tag ?? null;
        return;
    }

    async function signIn(): Promise<UserData>;
    async function signIn(username: string, password: string): Promise<UserData>;
    async function signIn(username?: string, password?: string): Promise<UserData> {
        if (username === undefined || password === undefined) {
            require(_username !== null && _password !== null, "CLIENT.ERR_NOT_SIGNED_IN");
            username = _username;
            password = _password;
        }
        return _signIn(username, password);
    }

    async function signUp(user: UserData): Promise<void> {
        let response: AxiosResponse = await Axios.post("/sign-up", { user });
        let { result } = response.data;
        require(typeof result === "string", "CLIENT.ERR_INVALID_RESPONSE");
        require(result === "OK", result);
        return;
    }

    async function _signIn(username: string, password: string): Promise<UserData> {
        let response: AxiosResponse = await Axios.post("/sign-in", { username, password });
        let { user } = response.data;
        UserDataSchema.parse(user);
        _user = user;
        _username = username;
        _password = password;
        return user as UserData;
    }
})();