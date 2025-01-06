import type { ReactNode } from "react";
import type { FormProps } from "@web-component";
import { Form } from "@web-component";
import { FormInput } from "@web-component";
import { FormButton } from "@web-component";

export type NavSignUpFormProps =
    & Omit<FormProps, "children">
    & {};

export function NavSignUpForm(props: NavSignUpFormProps): ReactNode {
    let { style, ... more } = props;

    /** @constructor */ {
        return <>
            <Form
                style={{
                    ... style
                }}
                { ... more }>
                <FormInput
                    placeholder="Email"/>
                <FormInput
                    placeholder="Username"/>
                <FormInput
                    placeholder="Password"/>
                <FormButton>
                    Sign Up
                </FormButton>
            </Form>
        </>;
    }
}