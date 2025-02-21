import {
    type ReactNode,
    useState,
    useEffect
} from "react";
import {
    type FormProps,
    Form,
    FormInput,
    FormButton
} from "@web-component";
import {
    default as Axios
} from "axios";
import {
    Client
} from "@web-client";

export type NavSignInFormProps =
    & Omit<FormProps, "children">
    & {};

export function NavSignInForm(props: NavSignInFormProps): ReactNode {
    let { style, ... more } = props;
    let [username, setUsername] = useState<string>("");
    let [password, setPassword] = useState<string>("");
    let [isValid, setIsValid] = useState<boolean>(false);
    let [isSignedIn, setIsSignedIn] = useState<boolean>(Client.cache() !== null);

    useEffect(() => {
        if (
            username.trim().length !== 0
            && password.trim().length !== 0
        ) setIsValid(true);
        setIsValid(false);
        return;
    }, [username, password]);

    /** @constructor */ {
        return <>
            <Form
                style={{
                    ... style
                }}
                { ... more }>
                {
                    isSignedIn ?
                    <div>
                        You are signed in.
                    </div> :
                    <>
                        <FormInput
                            placeholder="Username"
                            onChange={
                                e => {
                                    setUsername(e.target.value);
                                    return;
                                }
                            }/>
                        <FormInput
                            placeholder="Password"
                            onChange={
                                e => {
                                    setPassword(e.target.value);
                                    return;
                                }
                            }/>
                        <FormButton
                            onClick={
                                async () => {
                                    (await Client.signIn());
                                    setIsSignedIn(true);
                                }
                            }>
                            Sign In
                        </FormButton>
                    </>
                }
            </Form>
        </>;
    }
}