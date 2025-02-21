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

export type NavSignUpFormProps =
    & Omit<FormProps, "children">
    & {};

export function NavSignUpForm(props: NavSignUpFormProps): ReactNode {
    let { style, ... more } = props;
    let [username, setUsername] = useState<string>("");
    let [password, setPassword] = useState<string>("");
    let [email, setEmail] = useState<string>("");
    let [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        setSuccess(true);
        return;
    }, [username, password]);

    return <>
        <Form
            style={{
                ... style
            }}
            { ... more }>
            <FormInput
                placeholder="Email"
                onChange={
                    e => {
                        setEmail(e.target.value);
                        return;
                    }
                }
                required/>
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
                        //if (!success) return;
                        console.log("SIGNING_IN");
                        let { message } = (await Axios.post("/sign_up", { username, password })).data;
                        console.log(message);
                        return;
                    }
                }>
                Sign Up
            </FormButton>
        </Form>
    </>;
}